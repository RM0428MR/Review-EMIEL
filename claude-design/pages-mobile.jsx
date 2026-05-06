// pages-mobile.jsx — mobile (iPhone) versions of the 6 pages.
// Honors project rule: NO real CALPIS packaging. Uses the project's existing
// hand-drawn placeholder bottles + bear/cup PNG assets. Brand naming follows
// the existing data (generic flavor names, no copyrighted SKUs).

const MW = 390;   // mobile design width
const MBG = '#f4f8fc';

// ─── Tiny inline icons (line, mono — match the reference vibe)
function IcoSearch({ size = 18, color = '#7aa9d9' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}
function IcoStar({ size = 14, filled = true, color = '#f5a3a3' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 2l3.1 6.3 7 1-5 4.9 1.2 6.9L12 17.8 5.7 21l1.2-6.9-5-4.9 7-1L12 2z"
        fill={filled ? color : 'none'} stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}
function IcoStarHalf({ size = 14, color = '#f5a3a3' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <defs><clipPath id={`half-${size}`}><rect x="0" y="0" width="12" height="24"/></clipPath></defs>
      <path d="M12 2l3.1 6.3 7 1-5 4.9 1.2 6.9L12 17.8 5.7 21l1.2-6.9-5-4.9 7-1L12 2z"
        fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 2l3.1 6.3 7 1-5 4.9 1.2 6.9L12 17.8 5.7 21l1.2-6.9-5-4.9 7-1L12 2z"
        fill={color} clipPath={`url(#half-${size})`}/>
    </svg>
  );
}
function StarsRow({ value = 4.5, size = 14, showValue = true, color = '#f5a3a3' }) {
  const arr = [];
  for (let i = 1; i <= 5; i++) {
    if (value >= i) arr.push(<IcoStar key={i} size={size} filled color={color} />);
    else if (value >= i - 0.5) arr.push(<IcoStarHalf key={i} size={size} color={color} />);
    else arr.push(<IcoStar key={i} size={size} filled={false} color="#e3d8d8" />);
  }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
      {arr}
      {showValue && (
        <span style={{ marginLeft: 6, fontFamily: 'var(--font-display)', fontWeight: 700, color: '#7aa9d9', fontSize: size }}>
          {value.toFixed(1)}
        </span>
      )}
    </span>
  );
}
function IcoBookmark({ size = 18, filled = false, color = '#7aa9d9' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="1.8">
      <path d="M6 4h12v18l-6-4-6 4V4z" strokeLinejoin="round" />
    </svg>
  );
}
function IcoBack({ size = 22, color = '#7aa9d9' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2">
      <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IcoMenu({ size = 22, color = '#7aa9d9' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round"/>
    </svg>
  );
}
function IcoMore({ size = 22, color = '#7aa9d9' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <circle cx="6" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="18" cy="12" r="1.6"/>
    </svg>
  );
}
function IcoChevronR({ size = 16, color = '#9bbedc' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

// ─── Tab bar icons
const TabIcons = {
  home: (color) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7"><path d="M3 11l9-8 9 8v10a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1V11z" strokeLinejoin="round"/></svg>,
  review: (color) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7"><rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>,
  ranking: (color, filled) => <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="1.7"><path d="M3 8l4 3 5-6 5 6 4-3v10H3V8z" strokeLinejoin="round"/></svg>,
  archive: (color) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7"><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" strokeLinejoin="round"/></svg>,
  contact: (color) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7"><rect x="3" y="6" width="18" height="13" rx="1.5"/><path d="M3 7l9 7 9-7"/></svg>,
};

// ─── Mobile branded header (logo + glass + bottle illustration + right action)
function MHeader({ rightKind = 'search', showBack = false, dotsBg = true }) {
  return (
    <div style={{
      position: 'relative',
      padding: '10px 16px 14px',
      background: '#fff',
      borderBottom: '1px solid #eef3f8',
    }}>
      {/* tiny dots scatter */}
      {dotsBg && (
        <svg width="100%" height="100%" viewBox="0 0 390 80" preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {[[24,12,3],[60,22,2],[20,46,2.5],[300,12,2.5],[340,30,2],[260,46,2]].map(([x,y,r],i) => (
            <circle key={i} cx={x} cy={y} r={r} fill="#cfe3f4" opacity="0.85"/>
          ))}
        </svg>
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        {showBack ? (
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, width: 36 }}><IcoBack/></button>
        ) : <div style={{ width: 36 }}/>}
        {/* logo cluster */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, alignItems: 'flex-start' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 16, color: '#7aa9d9', marginLeft: 14 }}>my</span>
            <span style={{
              fontFamily: '"RocknRoll One","M PLUS Rounded 1c",sans-serif',
              fontSize: 22, color: '#1f5fa8', letterSpacing: '-0.5px', marginTop: 2,
            }}>カルピス</span>
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: '#7aa9d9', alignSelf: 'flex-end', marginRight: 8, marginTop: 1 }}>Review</span>
          </div>
          <HandGlass size={28} style={{ marginBottom: 6 }} />
          <HandBottle size={42} style={{ marginBottom: 4 }} />
        </div>
        {/* right action */}
        {rightKind === 'search' && (
          <button style={{
            width: 44, height: 44, borderRadius: '50%', background: '#eef5fb',
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', cursor: 'pointer',
          }}>
            <IcoSearch size={18} color="#7aa9d9" />
            <span style={{ fontSize: 8, color: '#7aa9d9', marginTop: 1 }}>検索</span>
          </button>
        )}
        {rightKind === 'menu' && (
          <button style={{
            width: 40, height: 40, borderRadius: '50%', background: '#eef5fb',
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}><IcoMenu/></button>
        )}
        {rightKind === 'more' && (
          <button style={{ width: 36, background: 'none', border: 'none', cursor: 'pointer' }}><IcoMore/></button>
        )}
      </div>
    </div>
  );
}

// ─── Bottom tab bar
function MTabBar({ active = 'home' }) {
  const tabs = [
    { key: 'home', label: 'Home' },
    { key: 'review', label: 'Review' },
    { key: 'ranking', label: 'Ranking' },
    { key: 'archive', label: 'Archive' },
    { key: 'contact', label: 'Contact' },
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      background: '#fff', borderTop: '1px solid #eef3f8',
      paddingBottom: 28, paddingTop: 8,
      display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
    }}>
      {tabs.map(t => {
        const on = t.key === active;
        const c = on ? '#1f5fa8' : '#9bbedc';
        return (
          <button key={t.key} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            color: c, fontSize: 10, fontWeight: on ? 700 : 400,
            fontFamily: 'var(--font-jp)',
          }}>
            {TabIcons[t.key](c, on)}
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Bottom Web footer (sitemap + social + copyright) — replaces app-style tab bar
function MWebFooter() {
  const links = [
    ['Home','Review','Ranking'],
    ['Archive','About','Contact'],
  ];
  return (
    <div style={{
      background: '#eaf2fa', color: '#3a5a82',
      padding: '20px 20px 22px',
      fontFamily: 'var(--font-jp)', position: 'relative', overflow: 'hidden',
    }}>
      {/* tiny dots */}
      <svg viewBox="0 0 360 200" preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.6, pointerEvents: 'none' }}>
        {[[18,18,2],[60,40,1.6],[330,30,2],[280,18,1.6],[20,160,2],[340,170,1.8],[180,12,2]].map(([x,y,r],i)=>(
          <circle key={i} cx={x} cy={y} r={r} fill="#cfe3f4"/>
        ))}
      </svg>
      <div style={{ position: 'relative' }}>
        {/* logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, alignItems: 'flex-start' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: '#7aa9d9', marginLeft: 12 }}>my</span>
            <span style={{ fontFamily: '"RocknRoll One","M PLUS Rounded 1c",sans-serif', fontSize: 18, color: '#1f5fa8', letterSpacing: '-0.5px', marginTop: 2 }}>カルピス</span>
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 12, color: '#7aa9d9', alignSelf: 'flex-end', marginRight: 6, marginTop: 1 }}>Review</span>
          </div>
          <HandBottle size={32} style={{ marginBottom: 2 }} />
        </div>

        {/* sitemap — two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px', marginBottom: 14 }}>
          {links.flat().map(l => (
            <a key={l} style={{
              fontSize: 12, color: '#3a5a82', textDecoration: 'none',
              padding: '4px 0', borderBottom: '1px dashed #c7dbed',
            }}>{l} <span style={{ color: '#9bbedc', float: 'right' }}>›</span></a>
          ))}
        </div>

        {/* social row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 11, color: '#5a7a98' }}>Follow</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {['ig','x','note'].map(k => (
              <span key={k} style={{
                width: 30, height: 30, borderRadius: '50%',
                border: '1.5px solid #b8d4ec', color: '#3d86c4',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, background: '#fff',
              }}>
                {k === 'ig' && (
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <rect x="2" y="2" width="10" height="10" rx="2.5"/><circle cx="7" cy="7" r="2.2"/><circle cx="10" cy="4" r="0.6" fill="currentColor"/>
                  </svg>
                )}
                {k === 'x' && <span style={{ fontSize: 12 }}>𝕏</span>}
                {k === 'note' && <span style={{ fontSize: 9 }}>note</span>}
              </span>
            ))}
          </div>
        </div>

        {/* tiny disclaimer + copyright */}
        <div style={{ borderTop: '1px solid #d7e6f1', paddingTop: 10, textAlign: 'center' }}>
          <div style={{ fontSize: 9, color: '#7a98b8', lineHeight: 1.6, marginBottom: 6 }}>
            ※ 本サイトは個人運営のファン日誌です。<br/>
            メーカー公式とは関係ありません。
          </div>
          <div style={{ fontSize: 10, color: '#9bbedc' }}>© my カルピス Review</div>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile screen wrap (sits inside an iOS device frame)
// When fullHeight=true, the screen lets its content grow naturally instead of
// constraining to the iPhone viewport — used for the "full-length" canvas
// artboards so reviewers can see each page top-to-bottom.
function MScreen({ children, label, tab = 'home', noTab = false, padded = true, fullHeight = false }) {
  if (fullHeight) {
    return (
      <div data-screen-label={label} style={{
        width: '100%',
        background: MBG,
        fontFamily: 'var(--font-jp)',
        color: '#3a5a82',
      }}>
        {children}
        {!noTab && <MWebFooter/>}
      </div>
    );
  }
  return (
    <div data-screen-label={label} style={{
      width: '100%', height: '100%',
      background: MBG,
      fontFamily: 'var(--font-jp)',
      color: '#3a5a82',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        overflow: 'auto',
      }}>
        {children}
        {!noTab && <MWebFooter/>}
      </div>
    </div>
  );
}

// ─── Tiny bottle thumb that uses ProductPhoto but constrained
function MiniProduct({ r, h = 64, bg = '#fff' }) {
  return (
    <div style={{ width: h * 0.7, height: h, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', background: bg, borderRadius: 8 }}>
      <BottlePlaceholder variant={r.variant} tint={r.tint} accent={r.accent} label="" size={h * 0.6} withDots={true} />
    </div>
  );
}

// ─── Section title with little blue dot bullet
function SectionTitle({ children, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '6px 4px 10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#9ec6ec' }}/>
        <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: '#1f5fa8', fontWeight: 700 }}>{children}</h3>
      </div>
      {right}
    </div>
  );
}

// ─── Big blue primary button
function MPrimaryBtn({ children, style = {}, icon }) {
  return (
    <button style={{
      background: 'linear-gradient(180deg, #5fa1d8 0%, #3d86c4 100%)',
      color: '#fff', border: 'none', borderRadius: 999,
      padding: '12px 28px', fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-jp)',
      boxShadow: '0 4px 12px rgba(80,130,180,0.25)',
      display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer',
      ...style,
    }}>
      {icon}
      {children}
    </button>
  );
}

// ─── Outline pill button
function MOutlineBtn({ children, style = {} }) {
  return (
    <button style={{
      background: '#fff', color: '#3a5a82', border: '1px solid #cfe0f0',
      borderRadius: 999, padding: '11px 20px', fontSize: 13, fontWeight: 500,
      fontFamily: 'var(--font-jp)', cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', gap: 6,
      ...style,
    }}>{children}</button>
  );
}

// ─── Filter pill
function FilterPill({ children, active = false, icon, style = {} }) {
  return (
    <button style={{
      background: active ? '#3d86c4' : '#fff',
      color: active ? '#fff' : '#3a5a82',
      border: active ? 'none' : '1px solid #e3edf6',
      borderRadius: 999, padding: '8px 16px', fontSize: 12, fontWeight: 500,
      fontFamily: 'var(--font-jp)', cursor: 'pointer', whiteSpace: 'nowrap',
      display: 'inline-flex', alignItems: 'center', gap: 5,
      ...style,
    }}>
      {icon}
      {children}
    </button>
  );
}

// ─── Category badge (top-left of card)
function CatBadge({ kind = '定番' }) {
  const colors = {
    '定番':     { bg: '#e8f1fa', fg: '#3d86c4' },
    '期間限定': { bg: '#ffe7ea', fg: '#e88aa8' },
    '季節限定': { bg: '#fff2dc', fg: '#dc9a48' },
    'コラボ':   { bg: '#eee5fa', fg: '#9a78d8' },
    'その他':   { bg: '#e6f5ec', fg: '#5fa878' },
  };
  const c = colors[kind] || colors['定番'];
  return (
    <span style={{
      display: 'inline-block', background: c.bg, color: c.fg,
      fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 999,
      fontFamily: 'var(--font-jp)',
    }}>{kind}</span>
  );
}

// ─── Tag chip
function TagChip({ kind, children }) {
  const colors = {
    pink:  { bg: '#fde9eb', fg: '#d7798f' },
    blue:  { bg: '#e8f1fa', fg: '#3d86c4' },
    cream: { bg: '#fdf3e0', fg: '#c8a060' },
  };
  const c = colors[kind] || colors.blue;
  return (
    <span style={{
      display: 'inline-block', background: c.bg, color: c.fg,
      fontSize: 10, padding: '3px 9px', borderRadius: 999, fontWeight: 500,
      fontFamily: 'var(--font-jp)',
    }}>{children}</span>
  );
}

// Display name for mobile cards (uses katakana like the references)
function dispName(r) {
  // map a few existing review ids/names to nicer mobile display names
  const map = {
    'rich': 'カルピス THE RICH',
    'ichigo': 'いちごカルピス',
    'peach': '白桃カルピス',
    'soda': 'カルピス（プレーン）',
    'lemon': 'レモン＆カルピス',
    'mikan': 'ももとカルピス',
    'grape': 'マスカットカルピス',
    'koime': 'ぶどうカルピス',
    'rame':  'ラムネカルピス',
    'melon': 'メロンカルピス',
    'frozen':'フローズン',
    'cafe':  'カフェカルピス',
  };
  return map[r.id] || `カルピス${r.name}`;
}

// ───────────────────────────── HOME ─────────────────────────────
function MobileHome({ full = false }) {
  const newR = REVIEWS.slice(0, 3);
  const top3 = [...REVIEWS].sort((a,b) => b.rating - a.rating).slice(0, 3);
  return (
    <MScreen label="01 mobile-home" tab="home" fullHeight={full}>
      <MHeader rightKind="menu" />
      {/* hero card */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{
          position: 'relative',
          background: 'linear-gradient(180deg, #d6ebfa 0%, #ecf5fc 100%)',
          borderRadius: 18, padding: '20px 18px 22px', overflow: 'hidden', minHeight: 156,
        }}>
          {/* dots */}
          <svg viewBox="0 0 360 160" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            {[[20,28,3,'#fff'],[44,16,2,'#fff'],[80,40,2.5,'#fff'],[200,18,3,'#fff'],[260,40,2,'#fff'],[320,28,3,'#fff'],[42,120,3,'#fff'],[120,140,2.5,'#fff'],[330,120,2.5,'#fff']].map(([x,y,r,c],i)=>(
              <circle key={i} cx={x} cy={y} r={r} fill={c} opacity="0.85"/>
            ))}
          </svg>
          <div style={{ position: 'relative' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 700, fontSize: 30, color: '#1f5fa8', lineHeight: 1 }}>My Calpis Life</div>
            <div style={{ fontSize: 12, color: '#3a5a82', marginTop: 8 }}>カルピスを愛しすぎた記録</div>
            <MPrimaryBtn style={{ marginTop: 14 }} icon={<IcoChevronR color="#fff"/>}>もっと見る</MPrimaryBtn>
          </div>
          {/* bear + bottle on right */}
          <div style={{ position: 'absolute', right: 8, bottom: 4, display: 'flex', alignItems: 'flex-end', gap: 0 }}>
            <BearSitting size={94} />
            <HandBottle size={70} style={{ marginBottom: 4 }} />
          </div>
        </div>
      </div>

      {/* New Reviews */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionTitle right={<a style={{ fontSize: 11, color: '#7aa9d9' }}>すべて見る ›</a>}>New Reviews</SectionTitle>
        <div style={{ display: 'flex', gap: 10, overflow: 'visible', paddingBottom: 4 }}>
          {newR.map((r,i) => {
            const newColors = ['#bfdcf4','#f6c8cc','#f5dca4'];
            return (
              <div key={r.id} style={{
                flex: '0 0 110px',
                background: '#fff', borderRadius: 14, padding: '12px 8px 10px',
                boxShadow: '0 2px 8px rgba(160,190,220,0.18)', position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: -4, left: -4, width: 32, height: 32, borderRadius: '50%',
                  background: newColors[i], display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 9, fontWeight: 700, fontFamily: 'var(--font-display)', fontStyle: 'italic',
                  border: '2px solid #fff',
                }}>NEW</div>
                <div style={{ height: 86, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <BottlePlaceholder variant={r.variant} tint={r.tint} accent={r.accent} label="" size={56} />
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, marginTop: 6, color: '#3a5a82', textAlign: 'center', lineHeight: 1.3 }}>{dispName(r)}</div>
                <div style={{ fontSize: 9, color: '#9bbedc', textAlign: 'center', marginTop: 3 }}>{r.date}</div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                  <StarsRow value={r.rating} size={10} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ranking */}
      <div style={{ padding: '22px 16px 0' }}>
        <SectionTitle right={<a style={{ fontSize: 11, color: '#7aa9d9' }}>すべて見る ›</a>}>Ranking</SectionTitle>
        <div style={{ background: '#fff', borderRadius: 14, padding: '4px 0', boxShadow: '0 2px 8px rgba(160,190,220,0.12)' }}>
          {top3.map((r,i) => {
            const crowns = ['#f5c84a','#c0c5cc','#cf8a4a'];
            return (
              <div key={r.id} style={{
                display: 'grid', gridTemplateColumns: '36px 56px 1fr 22px',
                alignItems: 'center', gap: 8, padding: '12px 14px',
                borderBottom: i < 2 ? '1px solid #f0f5fa' : 'none',
              }}>
                {/* crown */}
                <svg width="32" height="28" viewBox="0 0 40 32">
                  <path d="M4 26 L8 10 L16 18 L20 6 L24 18 L32 10 L36 26 Z" fill={crowns[i]}/>
                  <rect x="4" y="26" width="32" height="3" fill={crowns[i]} opacity="0.85"/>
                  <text x="20" y="25" fontSize="10" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="-apple-system, system-ui">{i+1}</text>
                </svg>
                <div style={{ height: 56, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <BottlePlaceholder variant={r.variant} tint={r.tint} accent={r.accent} label="" size={36} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#3a5a82' }}>{dispName(r)}</div>
                  <div style={{ marginTop: 2 }}><StarsRow value={r.rating} size={11} /></div>
                </div>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#eaf2fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IcoChevronR/>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Archive — month timeline preview */}
      <div style={{ padding: '22px 16px 0' }}>
        <SectionTitle right={<a style={{ fontSize: 11, color: '#7aa9d9' }}>すべて見る ›</a>}>Archive</SectionTitle>
        <div style={{ background: '#fff', borderRadius: 14, padding: '12px 14px', boxShadow: '0 2px 8px rgba(160,190,220,0.12)' }}>
          {/* archive count summary */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
            <span style={{ background: '#eaf2fa', color: '#3d86c4', fontSize: 10, fontWeight: 600, padding: '4px 10px', borderRadius: 999 }}>2024年・18件</span>
            <span style={{ background: '#fff2dc', color: '#dc9a48', fontSize: 10, fontWeight: 600, padding: '4px 10px', borderRadius: 999 }}>2023年・10件</span>
            <span style={{ background: '#f0eee9', color: '#9b8a78', fontSize: 10, fontWeight: 600, padding: '4px 10px', borderRadius: 999 }}>全 28件</span>
          </div>
          {/* mini month list */}
          {[
            { ym: '2024.05', count: 5, latest: 'カルピス THE RICH' },
            { ym: '2024.04', count: 4, latest: '白桃カルピス' },
            { ym: '2024.03', count: 3, latest: 'ももとカルピス' },
          ].map((m, i, arr) => (
            <div key={m.ym} style={{
              display: 'grid', gridTemplateColumns: '64px 1fr auto 14px',
              alignItems: 'center', gap: 10, padding: '8px 0',
              borderBottom: i < arr.length - 1 ? '1px dashed #e3edf6' : 'none',
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 700, fontSize: 16, color: '#1f5fa8' }}>{m.ym}</span>
              <span style={{ fontSize: 11, color: '#5a7a98' }}>最新：{m.latest}</span>
              <span style={{ fontSize: 10, color: '#7aa9d9', fontWeight: 600 }}>{m.count}件</span>
              <IcoChevronR size={14}/>
            </div>
          ))}
        </div>
      </div>

      {/* Contact — invitation card */}
      <div style={{ padding: '22px 16px 0' }}>
        <SectionTitle>Contact</SectionTitle>
        <div style={{
          background: '#fff', borderRadius: 14, padding: '14px 16px',
          boxShadow: '0 2px 8px rgba(160,190,220,0.12)',
          display: 'grid', gridTemplateColumns: '40px 1fr', gap: 12, alignItems: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#eaf4fc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3d86c4" strokeWidth="1.8"><rect x="3" y="6" width="18" height="13" rx="1.5"/><path d="M3 7l9 7 9-7"/></svg>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#3a5a82' }}>ご感想・リクエスト募集中</div>
            <div style={{ fontSize: 10, color: '#7a98b8', marginTop: 3, lineHeight: 1.55 }}>
              飲んでみてほしい商品や、感想を<br/>お気軽にお寄せください。
            </div>
          </div>
        </div>
        {/* quick links */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
          <a style={{
            background: '#fff', borderRadius: 10, padding: '10px 12px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontSize: 11, color: '#3a5a82', textDecoration: 'none',
            boxShadow: '0 1px 4px rgba(160,190,220,0.1)',
          }}>
            <span>よくある質問</span><IcoChevronR size={12}/>
          </a>
          <a style={{
            background: '#fff', borderRadius: 10, padding: '10px 12px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontSize: 11, color: '#3a5a82', textDecoration: 'none',
            boxShadow: '0 1px 4px rgba(160,190,220,0.1)',
          }}>
            <span>お問い合わせ</span><IcoChevronR size={12}/>
          </a>
        </div>
      </div>

      {/* Yellow promo card */}
      <div style={{ padding: '20px 16px 24px' }}>
        <div style={{
          background: '#fff7d6', borderRadius: 14, padding: '14px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', overflow: 'hidden',
        }}>
          {/* tiny dots */}
          <svg viewBox="0 0 200 80" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.6 }}>
            {[[10,12,2],[40,40,1.6],[20,68,2],[60,16,1.5],[160,60,2]].map(([x,y,r],i)=>(<circle key={i} cx={x} cy={y} r={r} fill="#f5dca4"/>))}
          </svg>
          <div style={{ position: 'relative', fontSize: 13, color: '#3a5a82', lineHeight: 1.5 }}>
            お気に入りのカルピスを<br/>見つけよう！
          </div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end' }}>
            <BearSitting size={70} />
            <span style={{ marginLeft: -10, marginBottom: 30, fontSize: 18, color: '#f5a3a3' }}>♡</span>
          </div>
        </div>
      </div>
    </MScreen>
  );
}

// ───────────────────────────── REVIEW LIST ─────────────────────────────
function MobileReview({ full = false }) {
  const list = REVIEWS.slice(0, 5).map((r,i) => {
    const cats = ['定番','季節限定','季節限定','定番','季節限定'];
    return { ...r, displayCat: cats[i] };
  });
  const tagsForI = (i) => {
    const sets = [
      [{kind:'pink', text:'濃厚'},{kind:'pink', text:'まろやか'},{kind:'pink', text:'リピート確定'}],
      [{kind:'pink', text:'いちご'},{kind:'pink', text:'甘酸っぱい'},{kind:'pink', text:'期間限定'}],
      [{kind:'pink', text:'白桃'},{kind:'pink', text:'やさしい甘さ'},{kind:'pink', text:'ご褒美ドリンク'}],
      [{kind:'blue', text:'すっきり'},{kind:'blue', text:'定番'},{kind:'blue', text:'ゴクゴク飲める'}],
    ];
    return sets[i] || sets[0];
  };
  return (
    <MScreen label="02 mobile-review" tab="review" fullHeight={full}>
      <MHeader rightKind="menu" />
      {/* horizontal cat filter */}
      <div style={{ padding: '12px 16px 0', display: 'flex', gap: 8, overflowX: 'auto' }}>
        <FilterPill active>すべて</FilterPill>
        <FilterPill icon={<span style={{ width: 12, height: 12, borderRadius: '50%', border: '1.5px solid #7aa9d9', display: 'inline-block' }}/>}>定番</FilterPill>
        <FilterPill icon={<span style={{ fontSize: 11 }}>✦</span>}>季節限定</FilterPill>
        <FilterPill icon={<span style={{ fontSize: 11 }}>◇</span>}>フルーツ</FilterPill>
        <FilterPill icon={<span style={{ fontSize: 11 }}>···</span>}>その他</FilterPill>
      </div>
      <div style={{ padding: '12px 16px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <FilterPill icon={<svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="#7aa9d9" strokeWidth="1.6"><path d="M2 4h12M4 8h8M6 12h4"/></svg>}>絞り込み</FilterPill>
          <FilterPill icon={<svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="#7aa9d9" strokeWidth="1.6"><path d="M5 2v12m-3-3l3 3 3-3M11 14V2m-3 3l3-3 3 3"/></svg>}>新しい順</FilterPill>
        </div>
        <span style={{ fontSize: 11, color: '#7a98b8' }}>全 42 件</span>
      </div>
      {/* list */}
      <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {list.map((r, i) => (
          <div key={r.id} style={{
            background: '#fff', borderRadius: 14, padding: 12, position: 'relative',
            boxShadow: '0 2px 8px rgba(160,190,220,0.14)',
            display: 'grid', gridTemplateColumns: '88px 1fr', gap: 12,
          }}>
            {/* bookmark + date */}
            <div style={{ position: 'absolute', top: 10, right: 12, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
              <span style={{ fontSize: 10, color: '#9bbedc' }}>{r.date}</span>
              <IcoBookmark size={16}/>
            </div>
            <div style={{ height: 110, background: '#fff', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <BottlePlaceholder variant={r.variant} tint={r.tint} accent={r.accent} label="" size={70} />
            </div>
            <div style={{ paddingRight: 20 }}>
              <CatBadge kind={r.displayCat} />
              <div style={{ fontSize: 14, fontWeight: 700, color: '#3a5a82', marginTop: 6 }}>{dispName(r)}</div>
              <div style={{ fontSize: 11, color: '#5a7a98', lineHeight: 1.5, marginTop: 4 }}>{r.oneLiner}</div>
              <div style={{ marginTop: 6 }}><StarsRow value={r.rating} size={12} /></div>
              <div style={{ display: 'flex', gap: 5, marginTop: 8, flexWrap: 'wrap' }}>
                {tagsForI(i).map((t, j) => <TagChip key={j} kind={t.kind}>{t.text}</TagChip>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </MScreen>
  );
}

// ───────────────────────────── REVIEW DETAIL ─────────────────────────────
function MobileDetail({ full = false }) {
  const r = REVIEWS[0]; // THE RICH
  const sub = [
    { label: '甘さ', val: 5.0 },
    { label: '酸味', val: 4.0 },
    { label: '濃さ', val: 5.0 },
    { label: 'さっぱり感', val: 4.0 },
  ];
  const scenes = [
    { label: '朝',         icon: '☀', active: true },
    { label: 'おやつ',     icon: '◯' },
    { label: 'リラックスしたい時', icon: '◌' },
    { label: 'お風呂あがり', icon: '♨' },
    { label: 'おやすみ前', icon: '☽' },
  ];
  return (
    <MScreen label="03 mobile-detail" tab="review" fullHeight={full}>
      <MHeader rightKind="menu" showBack/>
      {/* main card */}
      <div style={{ padding: '12px 16px 0' }}>
        <div style={{ background: '#fff', borderRadius: 14, padding: 14, position: 'relative', boxShadow: '0 2px 8px rgba(160,190,220,0.14)' }}>
          <IcoBookmark size={18} color="#7aa9d9" />
          <button style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', cursor: 'pointer' }}><IcoBookmark size={20}/></button>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 14, alignItems: 'flex-start', marginTop: -12 }}>
            <div style={{ height: 170, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <BottlePlaceholder variant={r.variant} tint={r.tint} accent={r.accent} label="" size={108} />
            </div>
            <div>
              <CatBadge kind="定番"/>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#3a5a82', marginTop: 8, lineHeight: 1.3 }}>カルピス THE RICH</div>
              <div style={{ marginTop: 6 }}><StarsRow value={5.0} size={15} /></div>
              <div style={{ display: 'flex', gap: 5, marginTop: 8, flexWrap: 'wrap' }}>
                <TagChip kind="pink">濃厚</TagChip>
                <TagChip kind="pink">まろやか</TagChip>
                <TagChip kind="pink">リピート確定</TagChip>
              </div>
              {/* meta box */}
              <div style={{ background: '#f4f8fc', borderRadius: 10, padding: '10px 12px', marginTop: 10, fontSize: 11, lineHeight: 1.9 }}>
                <div>📅 レビュー日：2024.05.12</div>
                <div>🥛 飲み方：原液＋水（1：4）</div>
                <div>📍 購入場所：スーパー</div>
                <div>💴 価格：¥248（税込）</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* memo */}
      <div style={{ padding: '14px 16px 0' }}>
        <SectionTitle>ひとことメモ</SectionTitle>
        <div style={{ background: '#eef5fc', borderRadius: 14, padding: 14, position: 'relative', minHeight: 110 }}>
          <div style={{ fontSize: 12, color: '#3a5a82', lineHeight: 1.85, paddingRight: 80 }}>
            濃くてまろやかで最高…！<br/>
            これを飲むと幸せな気持ちになります。<br/>
            ミルクで割ってもおいしかった！<br/>
            これはリピート確定です◎
          </div>
          <div style={{ position: 'absolute', right: 10, bottom: 4, display: 'flex', alignItems: 'flex-end' }}>
            <BearSitting size={70} />
            <HandBottle size={36} style={{ marginBottom: 6 }} />
          </div>
        </div>
      </div>

      {/* taste eval */}
      <div style={{ padding: '16px 16px 0' }}>
        <SectionTitle>味の評価</SectionTitle>
        <div style={{ background: '#fff', borderRadius: 14, padding: 14, display: 'grid', gridTemplateColumns: '1fr 130px', gap: 12, alignItems: 'center', boxShadow: '0 2px 8px rgba(160,190,220,0.1)' }}>
          <div>
            {sub.map(s => (
              <div key={s.label} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 30px', gap: 8, alignItems: 'center', padding: '4px 0' }}>
                <span style={{ fontSize: 11, color: '#5a7a98' }}>{s.label}</span>
                <StarsRow value={s.val} size={11} showValue={false}/>
                <span style={{ fontSize: 11, color: '#3a5a82', textAlign: 'right' }}>{s.val.toFixed(1)}</span>
              </div>
            ))}
          </div>
          {/* radar diamond */}
          <svg viewBox="0 0 130 130" width="130" height="130">
            <polygon points="65,10 120,65 65,120 10,65" fill="none" stroke="#cfe0f0" strokeWidth="1"/>
            <polygon points="65,30 100,65 65,100 30,65" fill="none" stroke="#cfe0f0" strokeWidth="0.6" strokeDasharray="2 2"/>
            <polygon points="65,50 80,65 65,80 50,65" fill="none" stroke="#cfe0f0" strokeWidth="0.6" strokeDasharray="2 2"/>
            <polygon points="65,15 110,65 65,110 25,65" fill="#cfe0f0" opacity="0.45" stroke="#7aa9d9" strokeWidth="1.2"/>
            <text x="65" y="6" fontSize="9" fill="#5a7a98" textAnchor="middle">甘さ</text>
            <text x="127" y="68" fontSize="9" fill="#5a7a98" textAnchor="end">酸味</text>
            <text x="65" y="129" fontSize="9" fill="#5a7a98" textAnchor="middle">濃さ</text>
            <text x="3" y="68" fontSize="9" fill="#5a7a98">さっぱり感</text>
          </svg>
        </div>
      </div>

      {/* scenes */}
      <div style={{ padding: '16px 16px 0' }}>
        <SectionTitle>一緒に飲みたいシーン</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
          {scenes.map(s => (
            <div key={s.label} style={{
              background: s.active ? '#eaf4fc' : '#fff',
              border: s.active ? '1.5px solid #7aa9d9' : '1px solid #eef3f8',
              borderRadius: 12, padding: '10px 4px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 22, color: s.active ? '#f5c84a' : '#9bbedc' }}>{s.icon}</div>
              <div style={{ fontSize: 10, marginTop: 4, color: s.active ? '#3a5a82' : '#7a98b8' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* purchased product */}
      <div style={{ padding: '16px 16px 0' }}>
        <SectionTitle>購入した商品</SectionTitle>
        <div style={{
          background: '#fff', borderRadius: 14, padding: 12, display: 'grid', gridTemplateColumns: '50px 1fr 20px', alignItems: 'center', gap: 10,
          boxShadow: '0 2px 8px rgba(160,190,220,0.1)',
        }}>
          <div style={{ height: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <BottlePlaceholder variant={r.variant} tint={r.tint} accent={r.accent} label="" size={32} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#3a5a82' }}>カルピス THE RICH 470ml</div>
            <div style={{ fontSize: 10, color: '#9bbedc', marginTop: 2 }}>アサヒ飲料</div>
          </div>
          <IcoChevronR/>
        </div>
      </div>

      {/* footer actions */}
      <div style={{ padding: '20px 16px 16px', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 10 }}>
        <MOutlineBtn style={{ justifyContent: 'center' }}>✎ レビューを編集</MOutlineBtn>
        <MPrimaryBtn style={{ justifyContent: 'center' }} icon={<span>↑</span>}>このレビューをシェア</MPrimaryBtn>
      </div>
    </MScreen>
  );
}

// ───────────────────────────── RANKING ─────────────────────────────
function MobileRanking({ full = false }) {
  const sorted = [...REVIEWS].sort((a,b)=>b.rating-a.rating);
  const podium = sorted.slice(0,3);
  const rest = sorted.slice(3,8);
  // map fixed names
  const podiumNames = ['カルピス THE RICH','いちごカルピス','白桃カルピス'];
  const podiumScores = [5.0, 4.6, 4.7];
  const podiumCounts = [128, 96, 82];
  const restNames = ['カルピス（プレーン）','レモン＆カルピス','ももとカルピス','マスカットカルピス','ぶどうカルピス'];
  const restScores = [4.2, 4.3, 4.4, 4.1, 4.0];
  const restCounts = [76, 58, 52, 41, 35];
  return (
    <MScreen label="04 mobile-ranking" tab="ranking" fullHeight={full}>
      <MHeader rightKind="menu" />
      {/* title */}
      <div style={{ padding: '14px 18px 6px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <svg width="34" height="30" viewBox="0 0 40 32"><path d="M4 26 L8 8 L18 18 L20 4 L22 18 L32 8 L36 26 Z" fill="#cfe3f4"/></svg>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28, color: '#1f5fa8', fontWeight: 700, lineHeight: 1 }}>Ranking</div>
          <div style={{ fontSize: 11, color: '#5a7a98', marginTop: 4 }}>みんなのレビューをもとにした人気ランキング</div>
        </div>
      </div>
      {/* category tabs */}
      <div style={{ padding: '10px 16px 0', display: 'flex', gap: 6 }}>
        <FilterPill active style={{ flex: 1, justifyContent: 'center' }}>総合ランキング</FilterPill>
        <FilterPill style={{ flex: 0.6, justifyContent: 'center' }}>定番</FilterPill>
        <FilterPill style={{ flex: 0.6, justifyContent: 'center' }}>フルーツ</FilterPill>
        <FilterPill style={{ flex: 0.7, justifyContent: 'center' }}>季節限定</FilterPill>
      </div>

      {/* podium */}
      <div style={{ padding: '24px 12px 0', display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: 6, alignItems: 'flex-end' }}>
        {[1,0,2].map((idx, pos) => {
          const r = podium[idx];
          const isFirst = idx === 0;
          const crowns = ['#f5c84a','#c0c5cc','#cf8a4a'];
          return (
            <div key={idx} style={{ position: 'relative', textAlign: 'center' }}>
              {/* crown above */}
              <svg width="36" height="22" viewBox="0 0 40 22" style={{ display: 'block', margin: '0 auto -4px' }}>
                <path d="M4 18 L8 4 L16 12 L20 2 L24 12 L32 4 L36 18 Z" fill={crowns[idx]}/>
              </svg>
              <div style={{
                background: '#fff',
                border: isFirst ? '2px solid #f5c84a' : '1px solid #e3edf6',
                borderRadius: 14, padding: '14px 6px 12px', position: 'relative',
                boxShadow: isFirst ? '0 4px 16px rgba(245,200,74,0.25)' : '0 2px 8px rgba(160,190,220,0.14)',
                minHeight: isFirst ? 170 : 150,
              }}>
                {/* rank circle */}
                <div style={{
                  position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)',
                  width: 22, height: 22, borderRadius: '50%', background: crowns[idx],
                  color: '#fff', fontSize: 11, fontWeight: 700, fontFamily: '-apple-system, system-ui',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid #fff',
                }}>{idx+1}</div>
                <div style={{ height: isFirst ? 110 : 92, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <BottlePlaceholder variant={r.variant} tint={r.tint} accent={r.accent} label="" size={isFirst ? 70 : 56} />
                </div>
                <div style={{ fontSize: isFirst ? 12 : 11, fontWeight: 700, color: '#3a5a82', marginTop: 8, lineHeight: 1.3, padding: '0 4px' }}>{podiumNames[idx]}</div>
                <div style={{ marginTop: 4 }}><StarsRow value={podiumScores[idx]} size={10} /></div>
                <div style={{
                  background: '#eaf4fc', color: '#3d86c4', fontSize: 9, fontWeight: 600,
                  padding: '3px 6px', borderRadius: 999, marginTop: 8,
                }}>レビュー数 {podiumCounts[idx]}件</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* rest list */}
      <div style={{ padding: '20px 16px 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {restNames.map((name, i) => {
          const r = rest[i] || sorted[i+3] || sorted[0];
          return (
            <div key={i} style={{
              background: '#fff', borderRadius: 12, padding: '10px 12px',
              display: 'grid', gridTemplateColumns: '24px 44px 1fr auto 18px', alignItems: 'center', gap: 8,
              boxShadow: '0 1px 4px rgba(160,190,220,0.1)',
            }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#eaf4fc', color: '#7aa9d9', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '-apple-system, system-ui' }}>{i+4}</div>
              <div style={{ height: 44, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <BottlePlaceholder variant={r.variant} tint={r.tint} accent={r.accent} label="" size={28} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#3a5a82' }}>{name}</div>
                <div style={{ marginTop: 2 }}><StarsRow value={restScores[i]} size={10} /></div>
              </div>
              <div style={{ background: '#eaf4fc', color: '#3d86c4', fontSize: 9, fontWeight: 600, padding: '3px 8px', borderRadius: 999, whiteSpace: 'nowrap' }}>レビュー数 {restCounts[i]}件</div>
              <IcoChevronR/>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div style={{ padding: '20px 16px 24px' }}>
        <div style={{
          background: '#eef5fc', borderRadius: 14, padding: '14px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', minHeight: 88,
        }}>
          {/* dots */}
          <svg viewBox="0 0 200 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.7 }}>
            {[[20,16,2],[40,40,1.6],[14,76,2],[80,16,1.5]].map(([x,y,r],i)=>(<circle key={i} cx={x} cy={y} r={r} fill="#cfe3f4"/>))}
          </svg>
          <div style={{ position: 'relative', fontSize: 12, color: '#3a5a82', lineHeight: 1.55 }}>
            あなたの推しカルピスは<br/>ランキングに入ってるかな？
          </div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <BearSitting size={76} />
            <HandBottle size={40} style={{ marginBottom: 4 }} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: -22, paddingRight: 14, position: 'relative', zIndex: 2 }}>
          <MPrimaryBtn icon={<span>✎</span>} style={{ padding: '9px 18px' }}>レビューを書く</MPrimaryBtn>
        </div>
      </div>
    </MScreen>
  );
}

// ───────────────────────────── ARCHIVE ─────────────────────────────
function MobileArchive({ full = false }) {
  const items = REVIEWS.slice(0, 5);
  const cats = [{label:'定番', kind:'定番'},{label:'季節限定', kind:'季節限定'},{label:'季節限定', kind:'季節限定'},{label:'定番', kind:'定番'},{label:'季節限定', kind:'季節限定'}];
  const names = ['カルピス THE RICH','いちごカルピス','白桃カルピス','カルピス（プレーン）','レモン＆カルピス'];
  const scores = [5.0, 4.5, 5.0, 4.0, 4.5];
  const oneliners = [
    '濃くてまろやかで最高…！\nこれを飲むと幸せな気持ちになります。',
    'いちごの甘酸っぱさと\n相性抜群でした🍓',
    '桃の香りがふわっと広がって、\nやさしい甘さでおいしい〜！',
    'やっぱりこれが原点！\nすっきりしていて飽きないおいしさ。',
    'レモンの爽やかさが夏にぴったり！\nさっぱりしててゴクゴクいけます🍋',
  ];
  const dates = ['2024.05.12','2024.05.10','2024.05.08','2024.05.05','2024.05.02'];
  return (
    <MScreen label="05 mobile-archive" tab="archive" fullHeight={full}>
      <MHeader rightKind="menu" />
      {/* title */}
      <div style={{ padding: '14px 18px 6px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <svg width="26" height="22" viewBox="0 0 26 22" fill="none" stroke="#7aa9d9" strokeWidth="1.7">
          <path d="M2 6a2 2 0 012-2h6l2 2h10a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" strokeLinejoin="round"/>
        </svg>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28, color: '#1f5fa8', fontWeight: 700, lineHeight: 1 }}>Archive</div>
          <div style={{ fontSize: 11, color: '#5a7a98', marginTop: 4 }}>あなたのレビュー履歴</div>
        </div>
      </div>
      {/* tabs */}
      <div style={{ padding: '10px 16px 0', display: 'flex', gap: 6 }}>
        <FilterPill active style={{ flex: 1, justifyContent: 'center' }}>すべて（28件）</FilterPill>
        <FilterPill style={{ flex: 1, justifyContent: 'center' }}>定番（12件）</FilterPill>
        <FilterPill style={{ flex: 1, justifyContent: 'center' }}>フルーツ（10件）</FilterPill>
        <FilterPill style={{ flex: 1, justifyContent: 'center' }}>季節限定（6件）</FilterPill>
      </div>
      <div style={{ padding: '10px 16px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <FilterPill icon={<svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="#7aa9d9" strokeWidth="1.6"><path d="M5 2v12m-3-3l3 3 3-3"/></svg>}>新しい順</FilterPill>
        <a style={{ fontSize: 12, color: '#7aa9d9' }}>編集</a>
      </div>
      {/* list */}
      <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((r, i) => (
          <div key={r.id} style={{
            background: '#fff', borderRadius: 14, padding: 12,
            display: 'grid', gridTemplateColumns: '76px 1fr 18px', gap: 12, alignItems: 'center',
            boxShadow: '0 2px 8px rgba(160,190,220,0.14)', position: 'relative',
          }}>
            <div style={{ height: 90, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <BottlePlaceholder variant={r.variant} tint={r.tint} accent={r.accent} label="" size={56} />
            </div>
            <div style={{ paddingRight: 30 }}>
              <CatBadge kind={cats[i].kind}/>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#3a5a82', marginTop: 6 }}>{names[i]}</div>
              <div style={{ marginTop: 4 }}><StarsRow value={scores[i]} size={11} /></div>
              <div style={{ fontSize: 11, color: '#5a7a98', lineHeight: 1.5, marginTop: 4, whiteSpace: 'pre-line' }}>{oneliners[i]}</div>
            </div>
            <span style={{ position: 'absolute', top: 10, right: 30, fontSize: 10, color: '#9bbedc' }}>{dates[i]}</span>
            <IcoChevronR/>
          </div>
        ))}
      </div>
      {/* growing CTA */}
      <div style={{ padding: '0 16px 24px' }}>
        <div style={{
          background: '#eef5fc', borderRadius: 14, padding: '14px 16px',
          border: '1.5px dashed #b8d4ec',
          display: 'grid', gridTemplateColumns: '90px 1fr', gap: 10, alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
            <BearSitting size={70} />
            <HandBottle size={28} style={{ marginBottom: 4 }} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#3d86c4', marginBottom: 4 }}>まだまだアーカイブが増えます！</div>
            <div style={{ fontSize: 11, color: '#5a7a98', lineHeight: 1.55 }}>
              いろんなカルピスのレビューを<br/>記録して、あなただけのアーカイブを<br/>作っていきましょう。
            </div>
          </div>
        </div>
      </div>
    </MScreen>
  );
}

// ───────────────────────────── CONTACT ─────────────────────────────
function MobileContact({ full = false }) {
  const items = [
    { icon: '?', label: 'よくある質問', sub: 'お問い合わせの前に、よくある質問をご確認ください。' },
    { icon: '✎', label: 'お問い合わせフォーム', sub: 'ご意見・ご感想・ご要望などをお送りください。' },
    { icon: '➤', label: '不具合のご報告', sub: 'アプリの不具合や不便な点についてご連絡ください。' },
  ];
  const support = [
    { icon: '🛡', label: 'プライバシーポリシー' },
    { icon: '📄', label: '利用規約' },
    { icon: 'ⓘ',  label: 'アプリについて' },
  ];
  return (
    <MScreen label="06 mobile-contact" tab="contact" fullHeight={full}>
      <MHeader rightKind="menu" />
      {/* hero */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{
          background: '#fff', borderRadius: 14, padding: '16px 16px 14px', position: 'relative', overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(160,190,220,0.14)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#eaf4fc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3d86c4" strokeWidth="1.8"><rect x="3" y="6" width="18" height="13" rx="1.5"/><path d="M3 7l9 7 9-7"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 26, color: '#1f5fa8', fontWeight: 700, lineHeight: 1 }}>Contact</div>
              <div style={{ fontSize: 11, color: '#5a7a98', marginTop: 4 }}>お問い合わせ・ご意見</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 0 }}>
              <span style={{ color: '#f5a3a3', fontSize: 16, marginBottom: 30 }}>♡</span>
              <BearSitting size={66} />
            </div>
          </div>
        </div>
      </div>
      {/* options card */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{ background: '#fff', borderRadius: 14, padding: '4px 0', boxShadow: '0 2px 8px rgba(160,190,220,0.14)' }}>
          {items.map((it, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '40px 1fr 18px', gap: 12, alignItems: 'center',
              padding: '14px 16px', borderBottom: i < items.length - 1 ? '1px solid #f0f5fa' : 'none',
            }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#eaf4fc', color: '#3d86c4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{it.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#3a5a82' }}>{it.label}</div>
                <div style={{ fontSize: 10, color: '#7a98b8', marginTop: 2, lineHeight: 1.5 }}>{it.sub}</div>
              </div>
              <IcoChevronR/>
            </div>
          ))}
        </div>
      </div>
      {/* invite block */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{
          background: '#eef5fc', borderRadius: 14, padding: '14px 16px', position: 'relative', overflow: 'hidden', minHeight: 96,
        }}>
          <svg viewBox="0 0 360 110" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.6 }}>
            {[[10,30,2],[44,16,1.6],[20,76,2],[300,80,2],[330,30,1.8]].map(([x,y,r],i)=>(<circle key={i} cx={x} cy={y} r={r} fill="#cfe3f4"/>))}
          </svg>
          <div style={{ position: 'relative', maxWidth: 230 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#3a5a82' }}>ご意見・ご感想をお聞かせください</div>
            <div style={{ fontSize: 11, color: '#5a7a98', marginTop: 6, lineHeight: 1.6 }}>
              My カルピス Review をより良いサービスにするために、<br/>みなさまの声をお待ちしています。
            </div>
          </div>
          <div style={{ position: 'absolute', right: 14, bottom: 8, display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <HandGlass size={42} />
            <HandBottle size={56} />
          </div>
        </div>
      </div>
      {/* support */}
      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ fontSize: 11, color: '#7a98b8', padding: '0 4px 6px' }}>その他のサポート</div>
        <div style={{ background: '#fff', borderRadius: 14, padding: '4px 0', boxShadow: '0 2px 8px rgba(160,190,220,0.14)' }}>
          {support.map((it, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '24px 1fr 18px', gap: 12, alignItems: 'center',
              padding: '12px 16px', borderBottom: i < support.length - 1 ? '1px solid #f0f5fa' : 'none',
            }}>
              <span style={{ fontSize: 14, color: '#7aa9d9' }}>{it.icon}</span>
              <div style={{ fontSize: 12, color: '#3a5a82' }}>{it.label}</div>
              <IcoChevronR/>
            </div>
          ))}
        </div>
      </div>
    </MScreen>
  );
}

Object.assign(window, {
  MobileHome, MobileReview, MobileDetail, MobileRanking, MobileArchive, MobileContact,
  MobileNav,
});

// ───────────────────────────── NAVIGATION (drawer/full-screen) ─────────────────────────────
// Light blue full-screen menu. Wave header, scattered dots,
// expanded "Review" with sub-categories, soft cloud band + bear at bottom.
function MobileNav({ full = false }) {
  // line icons matching the reference (simple, mono — accent #1f5fa8)
  const NAV_ACCENT = '#1f5fa8';
  const NAV_BG     = MBG;          // same off-white as other mobile screens (#f4f8fc)
  const NAV_BG2    = '#dceaf6';    // soft blue for wave & cloud band only
  const NAV_PILL   = '#ffffff';

  const IcoNavHome = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={NAV_ACCENT}>
      <path d="M12 3.2 3 11h2v9h5v-6h4v6h5v-9h2z"/>
    </svg>
  );
  const IcoNavPencil = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={NAV_ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21l4-1 11-11-3-3L4 17l-1 4z"/>
      <path d="M14 6l3 3"/>
    </svg>
  );
  const IcoNavCrown = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={NAV_ACCENT} strokeWidth="1.8" strokeLinejoin="round">
      <path d="M3 8l3.5 4L12 6l5.5 6L21 8v10H3z"/>
      <circle cx="3" cy="7" r="1" fill={NAV_ACCENT} stroke="none"/>
      <circle cx="21" cy="7" r="1" fill={NAV_ACCENT} stroke="none"/>
      <circle cx="12" cy="5" r="1" fill={NAV_ACCENT} stroke="none"/>
    </svg>
  );
  const IcoNavFolder = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={NAV_ACCENT} strokeWidth="1.8" strokeLinejoin="round">
      <path d="M3 7a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/>
    </svg>
  );
  const IcoNavMail = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={NAV_ACCENT} strokeWidth="1.8" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="13" rx="1.5"/>
      <path d="M3 7l9 7 9-7"/>
    </svg>
  );
  const IcoNavClose = () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={NAV_ACCENT} strokeWidth="2" strokeLinecap="round">
      <path d="M5 5l14 14M19 5L5 19"/>
    </svg>
  );
  const IcoNavChev = ({ size = 14, c = '#7aa9d9' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6"/>
    </svg>
  );

  // pill row
  const PillRow = ({ icon, label, indent = 0, sub = false }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      background: sub ? 'transparent' : NAV_PILL,
      borderRadius: sub ? 0 : 999,
      padding: sub ? '12px 4px' : '14px 22px',
      marginLeft: indent,
      marginRight: 0,
      marginBottom: sub ? 0 : 10,
      boxShadow: sub ? 'none' : '0 2px 6px rgba(122,169,217,0.18)',
      borderBottom: sub ? '1px dashed #b8d4ec' : 'none',
      cursor: 'pointer',
    }}>
      {icon && <span style={{ display: 'inline-flex', width: 26, justifyContent: 'center' }}>{icon}</span>}
      <span style={{
        flex: 1, fontFamily: 'var(--font-jp)',
        fontSize: sub ? 13 : 17, fontWeight: sub ? 400 : 600,
        color: sub ? '#3a5a82' : NAV_ACCENT,
        letterSpacing: sub ? 0 : '0.3px',
      }}>{label}</span>
      <IcoNavChev size={sub ? 12 : 16} c={sub ? '#9bbedc' : '#7aa9d9'} />
    </div>
  );

  // scattered background dots — fills entire page
  const Dots = () => (
    <svg width="100%" height="100%" viewBox="0 0 390 1100" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {[
        [40,140,4],[90,170,3],[330,110,4],[300,150,2.5],[60,300,3.5],[20,360,4],
        [350,260,3],[365,330,4],[40,440,3],[365,410,3],[20,520,4],[360,500,3.5],
        [50,600,3],[345,580,4],[28,690,3.5],[358,660,3],[60,760,4],[340,740,3],
        [22,820,3.5],[360,800,4],[40,880,3],[350,860,3.5],
      ].map(([x,y,r],i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#bcd8ee" opacity="0.55"/>
      ))}
    </svg>
  );

  // top wave SVG
  const WaveTop = () => (
    <svg width="100%" height="56" viewBox="0 0 390 56" preserveAspectRatio="none"
      style={{ display: 'block', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }}>
      <path d="M0 0 L390 0 L390 38 Q360 56 320 42 T230 40 T140 46 T60 36 T0 42 Z" fill={NAV_BG2} opacity="0.85"/>
      <path d="M0 0 L390 0 L390 30 Q350 46 300 32 T200 32 T100 36 T0 28 Z" fill={NAV_BG2}/>
    </svg>
  );

  // bottom cloud band + bear
  const BottomBand = () => (
    <div style={{ position: 'relative', marginTop: 28, paddingBottom: 20 }}>
      {/* cloud silhouette */}
      <svg width="100%" height="120" viewBox="0 0 390 120" preserveAspectRatio="none" style={{ display: 'block' }}>
        <path d="M0 70 Q30 42 70 50 T140 44 T220 52 T300 42 T390 56 L390 120 L0 120 Z" fill={NAV_BG2} opacity="0.9"/>
        <path d="M0 86 Q40 60 90 70 T180 64 T270 70 T360 62 T390 70 L390 120 L0 120 Z" fill="#bcd8ee" opacity="0.6"/>
      </svg>
      {/* bear + tagline */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 18,
        display: 'flex', alignItems: 'flex-end', gap: 14, padding: '0 26px',
      }}>
        <BearSitting size={84} />
        <div style={{ paddingBottom: 12, fontFamily: 'var(--font-jp)', color: '#3a5a82' }}>
          <div style={{ fontSize: 13, lineHeight: 1.6 }}>
            シュワっと、やさしく、<br/>しあわせな味。
            <span style={{ marginLeft: 4, color: '#7aa9d9' }}>♥</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <MScreen label="07 mobile-nav" tab="home" fullHeight={full} noTab={true}>
      <div style={{
        position: 'relative',
        background: NAV_BG,
        minHeight: full ? 'auto' : '100%',
        paddingTop: 56, paddingBottom: 0,
        overflow: 'hidden',
      }}>
        <WaveTop/>
        <Dots/>

        {/* close button */}
        <button style={{
          position: 'absolute', top: 70, right: 20, zIndex: 3,
          background: 'transparent', border: 'none', cursor: 'pointer',
          padding: 6,
        }}><IcoNavClose/></button>

        {/* logo cluster */}
        <div style={{ position: 'relative', zIndex: 2, padding: '10px 16px 22px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, alignItems: 'flex-start' }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontStyle: 'italic',
                fontSize: 28, color: '#7aa9d9', marginLeft: 16,
              }}>My</span>
              <span style={{
                fontFamily: '"RocknRoll One","M PLUS Rounded 1c",sans-serif',
                fontSize: 36, color: NAV_ACCENT, letterSpacing: '-0.5px', marginTop: 4,
              }}>カルピス</span>
              <span style={{
                fontFamily: 'var(--font-display)', fontStyle: 'italic',
                fontSize: 22, color: '#7aa9d9', alignSelf: 'flex-end', marginRight: 8, marginTop: 2,
              }}>Review</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 4 }}>
              <HandGlass size={42} />
              <HandBottle size={64} />
            </div>
          </div>
        </div>

        {/* nav list */}
        <div style={{ position: 'relative', zIndex: 2, padding: '0 22px' }}>
          <PillRow icon={<IcoNavHome/>} label="Home" />

          {/* Review pill — stays open by default in this design */}
          <PillRow icon={<IcoNavPencil/>} label="Review" />
          {/* sub-items, indented under Review */}
          <div style={{ padding: '4px 18px 14px 56px' }}>
            <PillRow sub label="すべてのレビュー" />
            <PillRow sub label="定番レビュー" />
            <PillRow sub label="期間限定レビュー" />
            <PillRow sub label="コラボレビュー" />
            <PillRow sub label="その他のレビュー" />
          </div>

          <PillRow icon={<IcoNavCrown/>}  label="Ranking" />
          <PillRow icon={<IcoNavFolder/>} label="Archive" />
          <PillRow icon={<IcoNavMail/>}   label="Contact" />
        </div>

        {/* bottom band */}
        <BottomBand/>
      </div>
    </MScreen>
  );
}
