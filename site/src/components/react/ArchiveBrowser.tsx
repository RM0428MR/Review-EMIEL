import { useEffect, useState } from 'react';

interface Props {
  yearList: string[];
}

type Mode = 'year' | 'month';

export default function ArchiveBrowser({ yearList }: Props) {
  const [mode, setMode] = useState<Mode>('year');
  const [year, setYear] = useState<string>('すべての年代');

  // Initial state from URL
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const m = sp.get('mode');
    const y = sp.get('year');
    if (m === 'month') setMode('month');
    if (y && yearList.includes(y)) setYear(y);
  }, []);

  // Wire toggle clicks
  useEffect(() => {
    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-archive-mode]'));
    const handler = (b: HTMLButtonElement) => () => setMode(b.dataset.archiveMode as Mode);
    const pairs = buttons.map((b) => [b, handler(b)] as const);
    pairs.forEach(([b, h]) => b.addEventListener('click', h));
    return () => pairs.forEach(([b, h]) => b.removeEventListener('click', h));
  }, []);

  // Wire sidebar year clicks
  useEffect(() => {
    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-archive-year]'));
    const handler = (b: HTMLButtonElement) => () => setYear(b.dataset.archiveYear ?? 'すべての年代');
    const pairs = buttons.map((b) => [b, handler(b)] as const);
    pairs.forEach(([b, h]) => b.addEventListener('click', h));
    return () => pairs.forEach(([b, h]) => b.removeEventListener('click', h));
  }, []);

  // URL sync
  useEffect(() => {
    const sp = new URLSearchParams();
    if (mode !== 'year') sp.set('mode', mode);
    if (year !== 'すべての年代') sp.set('year', year);
    const qs = sp.toString();
    window.history.replaceState({}, '', qs ? `?${qs}` : window.location.pathname);
  }, [mode, year]);

  // Apply DOM updates
  useEffect(() => {
    document.querySelectorAll<HTMLElement>('[data-archive-mode]').forEach((b) => {
      b.classList.toggle('on', b.dataset.archiveMode === mode);
    });
    document.querySelectorAll<HTMLElement>('[data-archive-year]').forEach((b) => {
      b.classList.toggle('on', b.dataset.archiveYear === year);
    });

    const yv = document.querySelector<HTMLElement>('[data-archive-year-view]');
    const mv = document.querySelector<HTMLElement>('[data-archive-month-view]');
    if (yv) yv.hidden = mode !== 'year';
    if (mv) mv.hidden = mode !== 'month';

    const isMatch = (cy: string) => year === 'すべての年代' || cy === year;

    document.querySelectorAll<HTMLElement>('[data-archive-card]').forEach((el) => {
      el.style.display = isMatch(el.dataset.year ?? '') ? '' : 'none';
    });

    const activeView = mode === 'year' ? yv : mv;
    if (activeView) {
      activeView.querySelectorAll<HTMLElement>('[data-archive-section]').forEach((sec) => {
        const cards = Array.from(sec.querySelectorAll<HTMLElement>('[data-archive-card]'));
        const visible = cards.filter((el) => isMatch(el.dataset.year ?? '')).length;
        const cntEl = sec.querySelector<HTMLElement>('[data-archive-section-count]');
        if (cntEl) cntEl.textContent = `${visible}件のレビュー`;
        sec.style.display = visible === 0 ? 'none' : '';
      });
    }
  }, [mode, year]);

  return null;
}
