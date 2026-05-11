import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Review, Cat, Mood, Season } from '../../lib/types';
import { CATEGORIES, CAT_VALUES, MOODS, SEASONS } from '../../data/reviews';

// ──────────────────────────────────────────────────────────────────────────────
// 設計メモ
// - desktop / mobile で同時 hydrate されても DOM 操作が衝突しないよう、
//   各インスタンスは「自分の祖先要素 [data-rf-scope]」配下しか触らない。
//   global な document.querySelectorAll は使わない。
// - cat は mood / season と同様に「複数選択」可能な配列で持つ。
//   - URL は `cat=コラボ,期間限定` のようにカンマ区切り。
//   - 「すべて」chip はリセット用（cats=[]）として動作。
//   - 0 件選択 = フィルタなし（= 全件）として扱う。
// - URL 同期は cat / mood / season / page の 4 種を対象にする。
// ──────────────────────────────────────────────────────────────────────────────

interface Props {
  reviews: Review[];
  initialCats?: string[];
  initialMoods?: string[];
  initialSeasons?: string[];
  initialPage?: number;
  pageSize?: number;
}

const DEFAULT_PAGE_SIZE = 15; // 5 cols × 3 rows

export default function ReviewFilters({
  reviews,
  initialCats = [],
  initialMoods = [],
  initialSeasons = [],
  initialPage = 1,
  pageSize = DEFAULT_PAGE_SIZE,
}: Props) {
  const [cats, setCats] = useState<string[]>(initialCats);
  const [moods, setMoods] = useState<string[]>(initialMoods);
  const [seasons, setSeasons] = useState<string[]>(initialSeasons);
  const [page, setPage] = useState<number>(Math.max(1, initialPage));

  const rootRef = useRef<HTMLDivElement>(null);
  const [scopeRoot, setScopeRoot] = useState<HTMLElement | null>(null);
  const [paginationTarget, setPaginationTarget] = useState<HTMLElement | null>(null);

  // 件数集計はフィルタ前の元データに対して行う。
  const catCount = (c: Cat) => reviews.filter((r) => r.cat === c).length;
  const moodCount = (m: Mood) => reviews.filter((r) => r.mood?.includes(m)).length;
  const seasonCount = (s: Season) => reviews.filter((r) => r.season === s).length;

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtered = useMemo(() => {
    let list = reviews;
    if (cats.length) list = list.filter((r) => cats.includes(r.cat));
    if (moods.length) list = list.filter((r) => r.mood?.some((m) => moods.includes(m)));
    if (seasons.length) list = list.filter((r) => seasons.includes(r.season));
    return list;
  }, [reviews, cats, moods, seasons]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  // フィルタ変更時はページを 1 に戻す。
  // ただし initialPage（URL 復元）は最初のレンダで適用済みなので、
  // フィルタ変化が無ければここで上書きはしない。
  const isFirstFilterEffect = useRef(true);
  useEffect(() => {
    if (isFirstFilterEffect.current) {
      isFirstFilterEffect.current = false;
      return;
    }
    setPage(1);
  }, [cats, moods, seasons]);

  // ページ番号がはみ出たら丸める
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  // scope ルート（祖先 data-rf-scope）と pagination target を解決する。
  // 1 インスタンスにつき 1 つの scope。複数 ReviewFilters が同時 hydrate しても、
  // 別 scope ならお互いの DOM を書き換えない。
  useEffect(() => {
    const scope = rootRef.current?.closest<HTMLElement>('[data-rf-scope]') ?? null;
    setScopeRoot(scope);
    setPaginationTarget(scope?.querySelector<HTMLElement>('[data-pagination]') ?? null);
  }, []);

  // URL 同期（hydration 後）
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    if (cats.length) sp.set('cat', cats.join(','));
    else sp.delete('cat');
    if (moods.length) sp.set('mood', moods.join(','));
    else sp.delete('mood');
    if (seasons.length) sp.set('season', seasons.join(','));
    else sp.delete('season');
    if (page > 1) sp.set('page', String(page));
    else sp.delete('page');
    const qs = sp.toString();
    const url = qs ? `?${qs}` : window.location.pathname;
    window.history.replaceState({}, '', url);
  }, [cats, moods, seasons, page]);

  // カードリスト（DOM の data-attr で表示制御）— scope 内のみ操作。
  useEffect(() => {
    if (!scopeRoot) return;
    const start = (page - 1) * pageSize;
    const pageSlugs = new Set(filtered.slice(start, start + pageSize).map((r) => r.slug));
    scopeRoot.querySelectorAll<HTMLElement>('[data-review-slug]').forEach((el) => {
      el.style.display = pageSlugs.has(el.dataset.reviewSlug ?? '') ? '' : 'none';
    });
    scopeRoot.querySelectorAll<HTMLElement>('[data-result-count]').forEach((meta) => {
      meta.textContent = `${filtered.length}件の商品`;
    });
  }, [filtered, page, scopeRoot, pageSize]);

  const isAllActive = cats.length === 0;

  return (
    <div ref={rootRef} className="rf">
      <FilterGroup title="カテゴリ">
        {CATEGORIES.map((c) => {
          const active = c === 'すべて' ? isAllActive : cats.includes(c);
          const onClick = () => {
            if (c === 'すべて') {
              setCats([]);
            } else {
              toggle(cats, setCats, c);
            }
          };
          const cnt = c === 'すべて' ? reviews.length : catCount(c as Cat);
          return (
            <button
              key={c}
              type="button"
              className={`row ${active ? 'active' : ''}`}
              onClick={onClick}
              aria-pressed={active}
            >
              <span>{active ? '✓ ' : ''}{c}</span>
              <span className="cnt">({cnt})</span>
            </button>
          );
        })}
      </FilterGroup>
      <FilterGroup title="味のタイプ">
        {MOODS.map((m) => (
          <button
            key={m}
            type="button"
            className="row"
            onClick={() => toggle(moods, setMoods, m)}
            aria-pressed={moods.includes(m)}
          >
            <span className="check">
              <span className={`box ${moods.includes(m) ? 'checked' : ''}`}>{moods.includes(m) ? '✓' : ''}</span>
              {m}
            </span>
            <span className="cnt">{moodCount(m)}</span>
          </button>
        ))}
      </FilterGroup>
      <FilterGroup title="季節">
        {SEASONS.map((s) => (
          <button
            key={s}
            type="button"
            className="row"
            onClick={() => toggle(seasons, setSeasons, s)}
            aria-pressed={seasons.includes(s)}
          >
            <span className="check">
              <span className={`box ${seasons.includes(s) ? 'checked' : ''}`}>{seasons.includes(s) ? '✓' : ''}</span>
              {s}
            </span>
            <span className="cnt">{seasonCount(s)}</span>
          </button>
        ))}
      </FilterGroup>

      {paginationTarget && totalPages > 1 && createPortal(
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />,
        paginationTarget,
      )}

      {/* hydration mismatch 回避: <style> 内の特殊文字は React が SSR で
          escape するが <style> は RAW_TEXT で browser が decode しない。
          dangerouslySetInnerHTML で escape を回避する。 */}
      <style dangerouslySetInnerHTML={{ __html: `
        .rf { display: flex; flex-direction: column; gap: 18px; font-family: var(--font-jp); }
        .rf .group {
          background: #fff;
          border: 1px solid rgba(168, 200, 232, 0.3);
          border-radius: 14px;
          padding: 12px;
        }
        .rf .group h4 { font-size: 12px; font-weight: 600; color: #3a5a82; margin: 0 0 8px; }
        .rf .group .body { display: flex; flex-direction: column; gap: 4px; }
        .rf .row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 4px 8px; font-size: 12px; border-radius: 8px;
          border: none; background: transparent;
          color: #5a7a98; cursor: pointer; text-align: left; font-family: inherit;
        }
        .rf .row.active { background: #eaf2f9; color: #7aa9d9; }
        .rf .check { display: inline-flex; align-items: center; gap: 6px; }
        .rf .box {
          width: 12px; height: 12px; border-radius: 3px;
          border: 1.5px solid #cfe0f0;
          display: inline-flex; align-items: center; justify-content: center;
          color: #fff; font-size: 9px;
        }
        .rf .box.checked { background: #7aa9d9; border-color: #7aa9d9; }
        .rf .cnt { font-size: 10px; opacity: 0.7; }
      ` }} />
    </div>
  );
}

// CAT_VALUES 経由でランタイム検証可能にしておく（pages 側で URL → state に変換するときに参照）。
export { CAT_VALUES };

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="group">
      <h4>{title}</h4>
      <div className="body">{children}</div>
    </div>
  );
}

function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (n: number) => void }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav className="pg" aria-label="ページネーション">
      <button
        className="pg-arrow"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        aria-label="前のページ"
      >
        ‹
      </button>
      {pages.map((n) => (
        <button
          key={n}
          className={`pg-num ${n === page ? 'active' : ''}`}
          onClick={() => onChange(n)}
          aria-current={n === page ? 'page' : undefined}
          aria-label={`${n}ページ目`}
        >
          {n}
        </button>
      ))}
      <button
        className="pg-arrow"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        aria-label="次のページ"
      >
        ›
      </button>
      {/* hydration mismatch 回避: 同上 */}
      <style dangerouslySetInnerHTML={{ __html: `
        .pg {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 24px;
        }
        .pg-arrow,
        .pg-num {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: #7a98b8;
          cursor: pointer;
          font-size: 12px;
          font-family: var(--font-jp);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s ease;
        }
        .pg-arrow:hover:not(:disabled),
        .pg-num:hover:not(.active) {
          background: #eaf4fc;
        }
        .pg-num.active {
          background: #7aa9d9;
          color: #fff;
        }
        .pg-arrow:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
      ` }} />
    </nav>
  );
}
