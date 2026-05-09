import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Review, Cat, Mood, Season } from '../../lib/types';

interface Props {
  reviews: Review[];
  initialCat?: string;
  initialMoods?: string[];
  initialSeasons?: string[];
}

const CATEGORIES = ['すべて', '定番', '期間限定', 'コラボ', 'その他'];
const MOODS: Mood[] = ['さっぱり', '濃厚', 'フルーティー', '甘め', 'すっきり'];
const SEASONS: Season[] = ['春', '夏', '秋', '冬', '通年'];
const PAGE_SIZE = 15; // 5 cols × 3 rows

export default function ReviewFilters({
  reviews,
  initialCat = 'すべて',
  initialMoods = [],
  initialSeasons = [],
}: Props) {
  const [cat, setCat] = useState<string>(initialCat);
  const [moods, setMoods] = useState<string[]>(initialMoods);
  const [seasons, setSeasons] = useState<string[]>(initialSeasons);
  const [page, setPage] = useState<number>(1);
  const [paginationTarget, setPaginationTarget] = useState<HTMLElement | null>(null);

  const counts = (key: keyof Review, val: string) => reviews.filter((r) => r[key] === val).length;
  const moodCount = (m: Mood) => reviews.filter((r) => r.mood?.includes(m)).length;
  const seasonCount = (s: Season) => reviews.filter((r) => r.season === s).length;
  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtered = useMemo(() => {
    let list = reviews.filter((r) => cat === 'すべて' || r.cat === (cat as Cat));
    if (moods.length) list = list.filter((r) => r.mood?.some((m) => moods.includes(m)));
    if (seasons.length) list = list.filter((r) => seasons.includes(r.season));
    return list;
  }, [reviews, cat, moods, seasons]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  // フィルタ変更時はページを 1 に戻す
  useEffect(() => {
    setPage(1);
  }, [cat, moods, seasons]);

  // ページ番号がはみ出たら丸める
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  // ページネーション描画先 DOM の取得
  useEffect(() => {
    setPaginationTarget(document.querySelector<HTMLElement>('[data-pagination]'));
  }, []);

  // URL 同期（hydration 後）
  useEffect(() => {
    const sp = new URLSearchParams();
    if (cat !== 'すべて') sp.set('cat', cat);
    if (moods.length) sp.set('mood', moods.join(','));
    if (seasons.length) sp.set('season', seasons.join(','));
    if (page !== 1) sp.set('page', String(page));
    const qs = sp.toString();
    const url = qs ? `?${qs}` : window.location.pathname;
    window.history.replaceState({}, '', url);
  }, [cat, moods, seasons, page]);

  // カードリスト（DOM の data-attr で表示制御）— フィルタ × ページ
  useEffect(() => {
    const start = (page - 1) * PAGE_SIZE;
    const pageSlugs = new Set(filtered.slice(start, start + PAGE_SIZE).map((r) => r.slug));
    document.querySelectorAll<HTMLElement>('[data-review-slug]').forEach((el) => {
      el.style.display = pageSlugs.has(el.dataset.reviewSlug ?? '') ? '' : 'none';
    });
    const meta = document.querySelector('[data-result-count]');
    if (meta) meta.textContent = `${filtered.length}件の商品`;
  }, [filtered, page]);

  return (
    <div className="rf">
      <FilterGroup title="カテゴリ">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`row ${cat === c ? 'active' : ''}`}
            onClick={() => setCat(c)}
          >
            <span>{cat === c ? '✓ ' : ''}{c}</span>
            <span className="cnt">({c === 'すべて' ? reviews.length : counts('cat', c)})</span>
          </button>
        ))}
      </FilterGroup>
      <FilterGroup title="味のタイプ">
        {MOODS.map((m) => (
          <button key={m} className="row" onClick={() => toggle(moods, setMoods, m)}>
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
          <button key={s} className="row" onClick={() => toggle(seasons, setSeasons, s)}>
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

      <style>{`
        .rf { display: flex; flex-direction: column; gap: 18px; font-family: var(--font-jp); }
        .group {
          background: #fff;
          border: 1px solid rgba(168, 200, 232, 0.3);
          border-radius: 14px;
          padding: 12px;
        }
        .group h4 { font-size: 12px; font-weight: 600; color: #3a5a82; margin: 0 0 8px; }
        .group .body { display: flex; flex-direction: column; gap: 4px; }
        .row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 4px 8px; font-size: 12px; border-radius: 8px;
          border: none; background: transparent;
          color: #5a7a98; cursor: pointer; text-align: left; font-family: inherit;
        }
        .row.active { background: #eaf2f9; color: #7aa9d9; }
        .check { display: inline-flex; align-items: center; gap: 6px; }
        .box {
          width: 12px; height: 12px; border-radius: 3px;
          border: 1.5px solid #cfe0f0;
          display: inline-flex; align-items: center; justify-content: center;
          color: #fff; font-size: 9px;
        }
        .box.checked { background: #7aa9d9; border-color: #7aa9d9; }
        .cnt { font-size: 10px; opacity: 0.7; }
      `}</style>
    </div>
  );
}

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
      <style>{`
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
      `}</style>
    </nav>
  );
}
