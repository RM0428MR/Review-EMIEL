import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', sub: 'トップページへ', href: '/' },
  { id: 'review', label: 'Review', sub: 'すべてのレビューを見る', href: '/reviews' },
  { id: 'ranking', label: 'Ranking', sub: '人気のカルピスランキング', href: '/ranking' },
  { id: 'archive', label: 'Archive', sub: '月別のレビュー一覧', href: '/archive' },
  { id: 'contact', label: 'Contact', sub: 'お問い合わせ・ご依頼', href: '/contact' },
  { id: 'about', label: 'About', sub: 'このサイトについて', href: '/about' },
];

const SOCIALS = [
  { k: 'ig', label: 'Instagram', href: '#' },
  { k: 'x', label: 'X', href: '#' },
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
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
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
      >
        <img src="/images/calpis_cup.png" alt="" width={32} height={32 * (88 / 62)} aria-hidden="true" />
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
            <button className="close" aria-label="メニューを閉じる" onClick={() => setOpen(false)}>
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#1f5fa8" strokeWidth="2" strokeLinecap="round">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>

            <Dots />

            <div className="logo">
              <div className="logo-text">
                <span className="lg-my">My</span>
                <span className="lg-jp">カルピス</span>
                <span className="lg-rev">Review</span>
              </div>
              <div className="logo-imgs">
                <img src="/images/calpis_cup.png" alt="" width={36} height={36 * (88 / 62)} />
                <img src="/images/calpis_bottle.png" alt="" width={56 * 0.48} height={56} />
              </div>
            </div>

            <nav className="rows">
              {NAV_ITEMS.map((it) => (
                <a key={it.id} href={it.href} className="row">
                  <Icon kind={it.id} />
                  <div className="row-text">
                    <div className="row-label">{it.label}</div>
                    <div className="row-sub">{it.sub}</div>
                  </div>
                  <Chev />
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
                    {s.k === 'x' && <span style={{ fontSize: 17, fontWeight: 700 }}>𝕏</span>}
                    {s.k === 'note' && (
                      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
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
              <svg width="100%" height="100" viewBox="0 0 430 100" preserveAspectRatio="none">
                <path d="M0 60 Q60 30 120 40 T240 36 T340 44 T430 36 L430 100 L0 100 Z" fill="#dceaf6" opacity="0.9" />
                <path d="M0 76 Q80 50 160 60 T300 56 T430 62 L430 100 L0 100 Z" fill="#bcd8ee" opacity="0.7" />
              </svg>
              <img className="bear" src="/images/calpis_bear.png" alt="" width={86} height={86 * (123 / 129)} />
            </div>
          </aside>
        </div>
      )}

      <style>{`
        .trigger {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(160, 190, 220, 0.32);
          display: flex;
          justify-content: flex-end;
        }
        .drawer {
          position: relative;
          width: min(430px, 100vw);
          height: 100vh;
          background: #fff;
          box-shadow: -12px 0 40px rgba(60, 100, 150, 0.22);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slidein 220ms ease-out;
        }
        @keyframes slidein {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .close {
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
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .logo {
          position: relative;
          z-index: 2;
          padding: 40px 36px 30px;
          display: flex;
          justify-content: center;
          gap: 8px;
          align-items: flex-end;
        }
        .logo-text { display: flex; flex-direction: column; line-height: 1; align-items: flex-start; }
        .lg-my { font-family: var(--font-display); font-style: italic; font-size: 26px; color: #7aa9d9; margin-left: 18px; }
        .lg-jp { font-family: var(--font-logo); font-size: 36px; color: #1f5fa8; letter-spacing: -0.5px; margin-top: 4px; }
        .lg-rev { font-family: var(--font-display); font-style: italic; font-size: 22px; color: #7aa9d9; align-self: flex-end; margin-right: 8px; margin-top: 2px; }
        .logo-imgs { display: flex; align-items: flex-end; gap: 4px; margin-bottom: 4px; }

        .rows {
          position: relative;
          z-index: 2;
          padding: 0 32px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .row {
          display: grid;
          grid-template-columns: 44px 1fr 18px;
          align-items: center;
          gap: 12px;
          padding: 18px 4px;
          border-bottom: 1px dashed #d7e6f1;
          text-decoration: none;
          color: inherit;
        }
        .row-label { font-size: 18px; font-weight: 700; color: #1f5fa8; font-family: var(--font-jp); letter-spacing: 0.3px; }
        .row-sub { font-size: 12px; color: #7a98b8; margin-top: 3px; font-family: var(--font-jp); }

        .socials {
          position: relative;
          z-index: 2;
          padding: 24px 32px 0;
          display: flex;
          justify-content: space-around;
        }
        .social {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          color: inherit;
        }
        .bubble {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #eaf4fc;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #1f5fa8;
        }
        .social-label { font-size: 10px; color: #3a5a82; font-family: var(--font-jp); }

        .cloud-band {
          position: relative;
          z-index: 2;
          margin-top: 24px;
        }
        .cloud-band svg { display: block; }
        .bear {
          position: absolute;
          right: 24px;
          bottom: 8px;
        }
      `}</style>
    </>
  );
}

function Icon({ kind }: { kind: string }) {
  const c = '#1f5fa8';
  const sz = 24;
  if (kind === 'home')
    return (
      <div className="ico"><svg width={sz} height={sz} viewBox="0 0 24 24" fill={c}><path d="M12 3.2 3 11h2v9h5v-6h4v6h5v-9h2z" /></svg></div>
    );
  if (kind === 'review')
    return (
      <div className="ico"><svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l4-1 11-11-3-3L4 17l-1 4z" /><path d="M14 6l3 3" /></svg></div>
    );
  if (kind === 'ranking')
    return (
      <div className="ico"><svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinejoin="round"><path d="M3 8l3.5 4L12 6l5.5 6L21 8v10H3z" /><circle cx="3" cy="7" r="1" fill={c} stroke="none" /><circle cx="21" cy="7" r="1" fill={c} stroke="none" /><circle cx="12" cy="5" r="1" fill={c} stroke="none" /></svg></div>
    );
  if (kind === 'archive')
    return (
      <div className="ico"><svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinejoin="round"><path d="M3 7a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" /></svg></div>
    );
  if (kind === 'contact')
    return (
      <div className="ico"><svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinejoin="round"><rect x="3" y="6" width="18" height="13" rx="1.5" /><path d="M3 7l9 7 9-7" /></svg></div>
    );
  if (kind === 'about')
    return (
      <div className="ico"><svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><circle cx="12" cy="8" r="0.8" fill={c} stroke="none" /></svg></div>
    );
  return null;
}

function Chev() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#9bbedc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function Dots() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 430 1100"
      preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      aria-hidden="true"
    >
      {[
        [40, 180, 4], [380, 140, 3.5], [20, 260, 3], [400, 260, 3],
        [50, 360, 3.5], [390, 420, 3], [30, 520, 4], [400, 560, 3.5],
        [40, 660, 3], [395, 720, 4], [20, 820, 3.5], [380, 880, 3],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#bcd8ee" opacity="0.55" />
      ))}
    </svg>
  );
}
