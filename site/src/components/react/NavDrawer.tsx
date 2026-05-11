import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', sub: 'トップページへ', href: '/' },
  { id: 'review', label: 'Review', sub: 'すべてのレビューを見る', href: '/reviews' },
  { id: 'ranking', label: 'Ranking', sub: '人気のエミエルランキング', href: '/ranking' },
  { id: 'archive', label: 'Archive', sub: '月別のレビュー一覧', href: '/archive' },
  { id: 'about', label: 'About', sub: 'このサイトについて', href: '/about' },
  { id: 'contact', label: 'Contact', sub: 'お問い合わせ・ご依頼', href: '/contact' },
];

const SOCIALS = [
  { k: 'ig', label: 'Instagram', href: '#' },
  { k: 'x', label: 'X (旧Twitter)', href: '#' },
  { k: 'note', label: 'Drink Log', href: '#' },
];

export default function NavDrawer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    // ナビ選択画面（このドロワー）が開いている間は、モバイル下部の
    // 固定タブ (nav.mtab) を隠す。MobileBottomTab.astro 側の
    // `body.nav-open .mtab { display: none; }` と連動。
    document.body.classList.add('nav-open');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      document.body.classList.remove('nav-open');
    };
  }, [open]);

  return (
    <>
      <button
        className="trigger"
        aria-label="メニューを開く"
        aria-expanded={open}
        aria-controls="nav-drawer"
        onClick={() => setOpen(true)}
        title="メニューを開く"
      >
        <img src="/images/hand-cup.png" alt="" width={26} height={26 * (88 / 62)} aria-hidden="true" />
      </button>

      {open && (
        <div className="overlay" onClick={() => setOpen(false)} role="presentation">
          <aside
            id="nav-drawer"
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="サイトナビゲーション"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ───────────────── DESKTOP LAYOUT ───────────────── */}
            <div className="desktop-inner">
              <Dots />

              <button className="close close-desktop" aria-label="メニューを閉じる" onClick={() => setOpen(false)}>
                <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#1f5fa8" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 5l14 14M19 5L5 19" />
                </svg>
              </button>

              <div className="logo logo-desktop">
                <div className="logo-text">
                  <span className="lg-my">My</span>
                  <span className="lg-jp">エミエル</span>
                  <span className="lg-rev">Review</span>
                </div>
                <div className="logo-imgs">
                  <img src="/images/hand-cup.png" alt="" width={36} height={36 * (88 / 62)} />
                  <img src="/images/hand-bottle.png" alt="" width={56 * 0.48} height={56} />
                </div>
              </div>

              <nav className="rows-desktop">
                {NAV_ITEMS.map((it) => (
                  <a key={it.id} href={it.href} className="row-desktop">
                    <span className="row-icon-d"><Icon kind={it.id} /></span>
                    <div className="row-text">
                      <div className="row-label-d">{it.label}</div>
                      <div className="row-sub">{it.sub}</div>
                    </div>
                    <ChevSoft />
                  </a>
                ))}
              </nav>

              <div className="socials">
                {SOCIALS.map((s) => (
                  <a key={s.k} href={s.href} className="social" aria-label={s.label}>
                    <span className="bubble">
                      {s.k === 'ig' && (
                        <svg width={20} height={20} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
                          <rect x="2" y="2" width="10" height="10" rx="2.5" />
                          <circle cx="7" cy="7" r="2.2" />
                          <circle cx="10" cy="4" r="0.6" fill="currentColor" />
                        </svg>
                      )}
                      {s.k === 'x' && <span className="x-mark">𝕏</span>}
                      {s.k === 'note' && (
                        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6c2-1 4-1 6 0v12c-2-1-4-1-6 0z" />
                          <path d="M9 18c4-1 8-1 12 0V6c-4-1-8-1-12 0" />
                        </svg>
                      )}
                    </span>
                    <span className="social-label">{s.label}</span>
                  </a>
                ))}
              </div>

              <div className="cloud-band">
                <svg width="100%" height="100" viewBox="0 0 430 100" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 60 Q60 30 120 40 T240 36 T340 44 T430 36 L430 100 L0 100 Z" fill="#dceaf6" opacity="0.9" />
                  <path d="M0 76 Q80 50 160 60 T300 56 T430 62 L430 100 L0 100 Z" fill="#bcd8ee" opacity="0.7" />
                </svg>
                <div className="bear-wrap">
                  <span className="bear-heart" aria-hidden="true">♥</span>
                  <img className="bear" src="/images/bear-doodle.png" alt="" width={86} height={86 * (123 / 129)} />
                </div>
              </div>
            </div>

            {/* ───────────────── MOBILE LAYOUT ───────────────── */}
            <div className="mobile-inner">
              <WaveTop />
              <Dots />

              <button className="close close-mobile" aria-label="メニューを閉じる" onClick={() => setOpen(false)}>
                <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#1f5fa8" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 5l14 14M19 5L5 19" />
                </svg>
              </button>

              <div className="logo logo-mobile">
                <div className="logo-text">
                  <span className="lg-my">My</span>
                  <span className="lg-jp">エミエル</span>
                  <span className="lg-rev">Review</span>
                </div>
                <div className="logo-imgs">
                  <img src="/images/hand-cup.png" alt="" width={42} height={42 * (88 / 62)} />
                  <img src="/images/hand-bottle.png" alt="" width={64 * 0.48} height={64} />
                </div>
              </div>

              <nav className="rows-mobile">
                {NAV_ITEMS.map((it) => (
                  <a key={it.id} href={it.href} className="nav-row">
                    <span className="row-icon"><Icon kind={it.id} /></span>
                    <span className="row-label">{it.label}</span>
                    <Chev />
                  </a>
                ))}
              </nav>

              <div className="bottom-band">
                <svg className="cloud-svg" width="100%" height="120" viewBox="0 0 430 120" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 70 Q30 42 70 50 T140 44 T220 52 T300 42 T430 56 L430 120 L0 120 Z" fill="#dceaf6" opacity="0.9" />
                  <path d="M0 86 Q40 60 90 70 T180 64 T270 70 T360 62 T430 70 L430 120 L0 120 Z" fill="#bcd8ee" opacity="0.65" />
                </svg>
                <div className="band-content">
                  <img className="band-bear" src="/images/bear-doodle.png" alt="" width={86} height={86 * (123 / 129)} />
                  <p className="band-tagline">
                    シュワっと、やさしく、<br />しあわせな味。
                    <span className="band-heart" aria-hidden="true">♥</span>
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      <style>{`
        /* ─────────── trigger ─────────── */
        .trigger {
          background: #ffffff;
          border: 2px dashed #7aa9d9;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          padding: 0;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.18s ease;
          box-shadow: 0 2px 6px rgba(122, 169, 217, 0.18);
        }
        .trigger:hover {
          background: #eaf4fc;
          border-style: solid;
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(122, 169, 217, 0.28);
        }
        .trigger:active { transform: translateY(0); }
        .trigger:focus-visible {
          outline: 2px solid #7aa9d9;
          outline-offset: 2px;
        }
        .trigger[aria-expanded="true"] {
          background: #eaf4fc;
          border-style: solid;
        }
        @media (max-width: 768px) {
          .trigger {
            position: fixed;
            top: 4px;
            right: 8px;
            z-index: 60;
            width: 32px;
            height: 32px;
            border-width: 1.5px;
          }
          .trigger img {
            width: 16px;
            height: auto;
          }
        }

        /* ─────────── overlay & drawer shell ─────────── */
        .overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(160, 190, 220, 0.32);
          display: flex;
          justify-content: flex-end;
          overflow: hidden;
          touch-action: none;
          overscroll-behavior: contain;
        }
        .drawer {
          position: relative;
          width: min(430px, 100vw);
          max-width: 430px;
          height: 100vh;
          /* 動的ビューポート対応: iOS Safari / Chrome の URL バー表示時に
             100vh がレイアウトビューポートを指して下端がずれるのを回避。
             サポートされる環境ではこちらが優先される。 */
          height: 100dvh;
          background: #ffffff;
          box-shadow: -12px 0 40px rgba(60, 100, 150, 0.22);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          touch-action: none;
          overscroll-behavior: contain;
          animation: slidein 220ms ease-out;
        }
        @media (max-width: 768px) {
          .drawer {
            width: 100vw;
            max-width: 100vw;
            background: #f4f8fc;
          }
        }
        @keyframes slidein {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        /* ─────────── layout switcher ─────────── */
        #nav-drawer .desktop-inner {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
        }
        #nav-drawer .mobile-inner {
          position: relative;
          display: none;
          flex-direction: column;
          height: 100%;
          width: 100%;
        }
        @media (max-width: 768px) {
          #nav-drawer .desktop-inner { display: none; }
          #nav-drawer .mobile-inner { display: flex; }
        }

        /* ═════════════════════════════════════════════════════ */
        /* ─────────────── DESKTOP STYLES ──────────────────── */
        /* ═════════════════════════════════════════════════════ */

        /* dots backdrop (shared SVG, scoped) */
        #nav-drawer .desktop-inner .dots-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        /* close button — circular pill */
        #nav-drawer .close-desktop {
          position: absolute;
          top: 22px;
          right: 22px;
          z-index: 3;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #eaf4fc;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s ease;
        }
        #nav-drawer .close-desktop:hover { background: #d8e9f7; }
        #nav-drawer .close-desktop:focus-visible {
          outline: 2px solid #7aa9d9;
          outline-offset: 2px;
        }

        /* logo cluster */
        #nav-drawer .logo-desktop {
          position: relative;
          z-index: 2;
          padding: 40px 36px 30px;
          display: flex;
          justify-content: center;
          gap: 8px;
          align-items: flex-end;
        }
        #nav-drawer .logo-desktop .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
          align-items: flex-start;
        }
        #nav-drawer .logo-desktop .lg-my {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 26px;
          color: #7aa9d9;
          margin-left: 18px;
        }
        #nav-drawer .logo-desktop .lg-jp {
          font-family: 'M PLUS Rounded 1c', 'Hiragino Maru Gothic ProN', sans-serif;
          font-weight: 800;
          font-size: 36px;
          color: #1f5fa8;
          letter-spacing: -0.5px;
          margin-top: 4px;
        }
        #nav-drawer .logo-desktop .lg-rev {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 22px;
          color: #7aa9d9;
          align-self: flex-end;
          margin-right: 8px;
          margin-top: 2px;
        }
        #nav-drawer .logo-desktop .logo-imgs {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          margin-bottom: 4px;
        }

        /* nav rows (two-line, dashed border) */
        #nav-drawer .rows-desktop {
          position: relative;
          z-index: 2;
          padding: 0 32px;
          flex: 1 1 auto;
          min-height: 0;
          display: flex;
          flex-direction: column;
        }
        #nav-drawer .row-desktop {
          display: grid;
          grid-template-columns: 44px 1fr 18px;
          align-items: center;
          gap: 12px;
          padding: 18px 4px;
          border-bottom: 1px dashed #d7e6f1;
          text-decoration: none;
          color: inherit;
          transition: background 0.15s ease;
        }
        #nav-drawer .row-desktop:hover { background: rgba(122, 169, 217, 0.06); }
        #nav-drawer .row-desktop:focus-visible {
          outline: 2px solid #7aa9d9;
          outline-offset: -2px;
          border-radius: 4px;
        }
        #nav-drawer .row-desktop .row-icon-d {
          display: flex;
          justify-content: center;
        }
        #nav-drawer .row-desktop .row-label-d {
          font-size: 18px;
          font-weight: 700;
          color: #1f5fa8;
          font-family: var(--font-jp);
          letter-spacing: 0.3px;
        }
        #nav-drawer .row-desktop .row-sub {
          font-size: 12px;
          color: #7a98b8;
          margin-top: 3px;
          font-family: var(--font-jp);
        }

        /* socials row */
        #nav-drawer .socials {
          position: relative;
          z-index: 2;
          padding: 24px 32px 0;
          display: flex;
          justify-content: space-around;
        }
        #nav-drawer .social {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          color: inherit;
        }
        #nav-drawer .social:focus-visible {
          outline: 2px solid #7aa9d9;
          outline-offset: 4px;
          border-radius: 50%;
        }
        #nav-drawer .bubble {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #eaf4fc;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #1f5fa8;
          transition: background 0.15s ease, transform 0.15s ease;
        }
        #nav-drawer .social:hover .bubble {
          background: #d8e9f7;
          transform: translateY(-1px);
        }
        #nav-drawer .x-mark { font-size: 17px; font-weight: 700; }
        #nav-drawer .social-label {
          font-size: 10px;
          color: #3a5a82;
          font-family: var(--font-jp);
        }

        /* cloud band + bear */
        #nav-drawer .cloud-band {
          position: relative;
          z-index: 2;
          margin-top: 24px;
          flex-shrink: 0;
        }
        #nav-drawer .cloud-band > svg { display: block; }
        #nav-drawer .bear-wrap {
          position: absolute;
          right: 24px;
          bottom: 8px;
          display: flex;
          align-items: flex-end;
        }
        #nav-drawer .bear-heart {
          position: absolute;
          left: -18px;
          top: 4px;
          color: #e88ca0;
          font-size: 16px;
        }
        #nav-drawer .bear { display: block; }

        /* ═════════════════════════════════════════════════════ */
        /* ─────────────── MOBILE STYLES ───────────────────── */
        /* ═════════════════════════════════════════════════════ */

        /* top wave */
        #nav-drawer .mobile-inner .wave-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1;
          display: block;
          pointer-events: none;
        }

        /* dots backdrop (scoped to mobile-inner) */
        #nav-drawer .mobile-inner .dots-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        /* close button (mobile — transparent) */
        #nav-drawer .close-mobile {
          position: absolute;
          top: 14px;
          right: 18px;
          z-index: 4;
          width: 36px;
          height: 36px;
          background: transparent;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        /* logo cluster (mobile) */
        #nav-drawer .logo-mobile {
          position: relative;
          z-index: 2;
          padding: 64px 16px 26px;
          display: flex;
          justify-content: center;
          gap: 8px;
          align-items: flex-end;
        }
        #nav-drawer .logo-mobile .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
          align-items: flex-start;
        }
        #nav-drawer .logo-mobile .lg-my {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 28px;
          color: #7aa9d9;
          margin-left: 16px;
        }
        #nav-drawer .logo-mobile .lg-jp {
          font-family: 'M PLUS Rounded 1c', 'Hiragino Maru Gothic ProN', sans-serif;
          font-weight: 800;
          font-size: 36px;
          color: #1f5fa8;
          letter-spacing: -0.5px;
          margin-top: 4px;
        }
        #nav-drawer .logo-mobile .lg-rev {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 22px;
          color: #7aa9d9;
          align-self: flex-end;
          margin-right: 8px;
          margin-top: 2px;
        }
        #nav-drawer .logo-mobile .logo-imgs {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          margin-bottom: 4px;
        }

        /* nav rows (mobile — pill style) */
        #nav-drawer .rows-mobile {
          position: relative;
          z-index: 2;
          padding: 0 22px;
          flex: 1 1 auto;
          min-height: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        #nav-drawer .nav-row {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #ffffff;
          border-radius: 999px;
          padding: 14px 22px;
          box-shadow: 0 2px 6px rgba(122, 169, 217, 0.18);
          text-decoration: none;
          color: inherit;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        #nav-drawer .nav-row:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(122, 169, 217, 0.28);
        }
        #nav-drawer .nav-row:focus-visible {
          outline: 2px solid #7aa9d9;
          outline-offset: 2px;
        }
        #nav-drawer .nav-row .row-icon {
          display: inline-flex;
          width: 26px;
          justify-content: center;
          flex-shrink: 0;
        }
        #nav-drawer .nav-row .row-label {
          flex: 1;
          font-family: var(--font-jp);
          font-size: 17px;
          font-weight: 600;
          color: #1f5fa8;
          letter-spacing: 0.3px;
        }

        /* bottom band (mobile) */
        #nav-drawer .bottom-band {
          position: relative;
          z-index: 2;
          margin-top: 28px;
          /* padding-bottom を持たせると cloud-svg (120px) の下に drawer 背景
             (#f4f8fc) が露出し、band-content (bottom: 18px) との間に淡色帯が
             できる。cloud-svg を最下端まで密着させて、band-content の下を
             cloud color で埋める。 */
          padding-bottom: 0;
          flex-shrink: 0;
        }
        #nav-drawer .cloud-svg { display: block; }
        #nav-drawer .band-content {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 18px;
          display: flex;
          align-items: flex-end;
          gap: 14px;
          padding: 0 26px;
        }
        #nav-drawer .band-bear { display: block; }
        #nav-drawer .band-tagline {
          padding-bottom: 12px;
          font-family: var(--font-jp);
          color: #3a5a82;
          font-size: 13px;
          line-height: 1.6;
          margin: 0;
        }
        #nav-drawer .band-heart { margin-left: 4px; color: #7aa9d9; }
      `}</style>
    </>
  );
}

/* ─────────────── icon helpers (shared) ─────────────── */

function Icon({ kind }: { kind: string }) {
  const c = '#1f5fa8';
  const sz = 22;
  if (kind === 'home')
    return (
      <svg width={sz} height={sz} viewBox="0 0 24 24" fill={c}><path d="M12 3.2 3 11h2v9h5v-6h4v6h5v-9h2z" /></svg>
    );
  if (kind === 'review')
    return (
      <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l4-1 11-11-3-3L4 17l-1 4z" /><path d="M14 6l3 3" /></svg>
    );
  if (kind === 'ranking')
    return (
      <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinejoin="round"><path d="M3 8l3.5 4L12 6l5.5 6L21 8v10H3z" /><circle cx="3" cy="7" r="1" fill={c} stroke="none" /><circle cx="21" cy="7" r="1" fill={c} stroke="none" /><circle cx="12" cy="5" r="1" fill={c} stroke="none" /></svg>
    );
  if (kind === 'archive')
    return (
      <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinejoin="round"><path d="M3 7a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" /></svg>
    );
  if (kind === 'about')
    return (
      <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><circle cx="12" cy="8" r="0.8" fill={c} stroke="none" /></svg>
    );
  if (kind === 'contact')
    return (
      <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinejoin="round"><rect x="3" y="6" width="18" height="13" rx="1.5" /><path d="M3 7l9 7 9-7" /></svg>
    );
  return null;
}

/* mobile chev: stronger blue */
function Chev() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#7aa9d9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

/* desktop chev: softer */
function ChevSoft() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#9bbedc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function WaveTop() {
  return (
    <svg
      className="wave-top"
      width="100%"
      height="56"
      viewBox="0 0 430 56"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0 0 L430 0 L430 38 Q400 56 360 42 T260 40 T160 46 T70 36 T0 42 Z" fill="#dceaf6" opacity="0.85" />
      <path d="M0 0 L430 0 L430 30 Q390 46 340 32 T230 32 T120 36 T0 28 Z" fill="#dceaf6" />
    </svg>
  );
}

function Dots() {
  const points: Array<[number, number, number]> = [
    [40, 140, 4], [90, 170, 3], [380, 110, 4], [340, 150, 2.5], [60, 300, 3.5], [20, 360, 4],
    [400, 260, 3], [410, 330, 4], [40, 440, 3], [410, 410, 3], [20, 520, 4], [400, 500, 3.5],
    [50, 600, 3], [385, 580, 4], [28, 690, 3.5], [398, 660, 3], [60, 760, 4], [380, 740, 3],
    [22, 820, 3.5], [400, 800, 4], [40, 880, 3], [390, 860, 3.5],
  ];
  return (
    <svg
      className="dots-bg"
      viewBox="0 0 430 1100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {points.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#bcd8ee" opacity="0.55" />
      ))}
    </svg>
  );
}
