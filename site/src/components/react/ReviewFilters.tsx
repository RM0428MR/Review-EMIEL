import { useEffect, useMemo, useState } from 'react';
import type { Review, Cat, Mood, Season } from '../../lib/types';

interface Props {
  reviews: Review[];
  initialCat?: string;
  initialMoods?: string[];
  initialSeasons?: string[];
  initialSort?: 'new' | 'rating';
  initialView?: 'grid' | 'list';
}

const CATEGORIES = ['すべて', '定番', '期間限定', 'コラボ', 'その他'];
const MOODS: Mood[] = ['さっぱり', '濃厚', 'フルーティー', '甘め', 'すっきり'];
const SEASONS: Season[] = ['春', '夏', '秋', '冬', '通年'];

export default function ReviewFilters({
  reviews,
  initialCat = 'すべて',
  initialMoods = [],
  initialSeasons = [],
  initialSort = 'new',
  initialView = 'grid',
}: Props) {
  const [cat, setCat] = useState<string>(initialCat);
  const [moods, setMoods] = useState<string[]>(initialMoods);
  const [seasons, setSeasons] = useState<string[]>(initialSeasons);
  const [sort, setSort] = useState<'new' | 'rating'>(initialSort);
  const [view, setView] = useState<'grid' | 'list'>(initialView);

  const counts = (key: keyof Review, val: string) => reviews.filter((r) => r[key] === val).length;
  const moodCount = (m: Mood) => reviews.filter((r) => r.mood?.includes(m)).length;
  const seasonCount = (s: Season) => reviews.filter((r) => r.season === s).length;
  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtered = useMemo(() => {
    let list = reviews.filter((r) => cat === 'すべて' || r.cat === (cat as Cat));
    if (moods.length) list = list.filter((r) => r.mood?.some((m) => moods.includes(m)));
    if (seasons.length) list = list.filter((r) => seasons.includes(r.season));
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [reviews, cat, moods, seasons, sort]);

  // URL 同期（hydration 後）
  useEffect(() => {
    const sp = new URLSearchParams();
    if (cat !== 'すべて') sp.set('cat', cat);
    if (moods.length) sp.set('mood', moods.join(','));
    if (seasons.length) sp.set('season', seasons.join(','));
    if (sort !== 'new') sp.set('sort', sort);
    if (view !== 'grid') sp.set('view', view);
    const qs = sp.toString();
    const url = qs ? `?${qs}` : window.location.pathname;
    window.history.replaceState({}, '', url);
  }, [cat, moods, seasons, sort, view]);

  // カードリスト（DOM の data-attr で表示制御）
  useEffect(() => {
    const slugs = new Set(filtered.map((r) => r.slug));
    document.querySelectorAll<HTMLElement>('[data-review-slug]').forEach((el) => {
      el.style.display = slugs.has(el.dataset.reviewSlug ?? '') ? '' : 'none';
    });
    const meta = document.querySelector('[data-result-count]');
    if (meta) meta.textContent = `${filtered.length}件の商品`;
    const grid = document.querySelector<HTMLElement>('[data-card-grid]');
    if (grid) grid.dataset.view = view;
  }, [filtered, view]);

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

      <div className="sort-bar">
        <label>
          並び替え：
          <select value={sort} onChange={(e) => setSort(e.target.value as 'new' | 'rating')}>
            <option value="new">新着順</option>
            <option value="rating">評価順</option>
          </select>
        </label>
        <span className="view-label">表示：</span>
        <div className="view-toggle">
          <button onClick={() => setView('grid')} className={view === 'grid' ? 'on' : ''} aria-pressed={view === 'grid'}>▦</button>
          <button onClick={() => setView('list')} className={view === 'list' ? 'on' : ''} aria-pressed={view === 'list'}>☰</button>
        </div>
      </div>

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
        .sort-bar {
          display: flex; align-items: center; gap: 12px;
          margin-top: 8px;
          font-size: 11px; color: #7a98b8;
        }
        .sort-bar select {
          font-size: 11px; padding: 4px 10px; border-radius: 999px;
          border: 1px solid #cfe0f0; background: #fff; color: #3a5a82;
          font-family: inherit;
        }
        .view-toggle {
          display: flex; border-radius: 8px; overflow: hidden;
          border: 1px solid #cfe0f0;
        }
        .view-toggle button {
          padding: 4px 10px; font-size: 11px;
          background: transparent; color: #7a98b8; border: none; cursor: pointer;
        }
        .view-toggle button.on { background: #7aa9d9; color: #fff; }
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
