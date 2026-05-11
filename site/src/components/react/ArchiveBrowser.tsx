import { useEffect, useState } from 'react';

// ──────────────────────────────────────────────────────────────────────────────
// ArchiveBrowser
// - desktop / mobile 双方の archive UI を同一 island で制御する。
// - 旧実装は「アクティブな view (yv|mv) 内の section だけ」を走査していたため、
//   archive/Mobile.astro の年セクション（どちらの view の外にある）が更新対象から漏れ、
//   モバイルで年フィルタを切替えても空セクションのヘッダが残っていた。
// - 本実装ではすべての [data-archive-section] を一度に走査して、
//   個々の section 内に表示中のカードが 1 件もなければ section ごと隠す方針に統一する。
//   → desktop の year/month 両 view、mobile の年セクションが同じルールで動く。
// ──────────────────────────────────────────────────────────────────────────────

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

    // year/month の view 切替（desktop のみが該当。mobile は CSS 側で常に visible）
    const yv = document.querySelector<HTMLElement>('[data-archive-year-view]');
    const mv = document.querySelector<HTMLElement>('[data-archive-month-view]');
    if (yv) yv.hidden = mode !== 'year';
    if (mv) mv.hidden = mode !== 'month';

    const isMatch = (cy: string) => year === 'すべての年代' || cy === year;

    // 個別カードの可視性
    document.querySelectorAll<HTMLElement>('[data-archive-card]').forEach((el) => {
      el.style.display = isMatch(el.dataset.year ?? '') ? '' : 'none';
    });

    // section 単位の件数更新と空セクション抑止
    // - 走査対象は「ページ全体の」 [data-archive-section] にする。
    //   desktop の year-view / month-view、mobile のセクションすべてを同一規約で扱う。
    // - section 内のカード数が 0 の場合、section ごと display:none にする。
    document.querySelectorAll<HTMLElement>('[data-archive-section]').forEach((sec) => {
      const cards = Array.from(sec.querySelectorAll<HTMLElement>('[data-archive-card]'));
      const visible = cards.filter((el) => isMatch(el.dataset.year ?? '')).length;
      const cntEl = sec.querySelector<HTMLElement>('[data-archive-section-count]');
      if (cntEl) {
        // mobile は「N件」、desktop は「N件のレビュー」と表示文言が異なるため、
        // 既存テキストの末尾「件…」のスタイルを尊重して数字部分だけ差し替える。
        // 実装上は単純化のため、要素の元テキストから数字を取り除いた末尾サフィックスを保持する。
        const original = cntEl.dataset.archiveCountTemplate
          ?? (cntEl.dataset.archiveCountTemplate = cntEl.textContent?.replace(/^\d+/, '') ?? '件');
        cntEl.textContent = `${visible}${original}`;
      }
      sec.style.display = visible === 0 ? 'none' : '';
    });
  }, [mode, year]);

  return null;
}
