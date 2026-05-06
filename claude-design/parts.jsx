// parts.jsx — refined hand-drawn aesthetic for CALPIS日誌
// All SVGs are original. Pushed closer to reference vibe with better
// linework, more poses, washi tape, and decorative scatter elements.

// ─── BEAR — uses the transparent PNG asset (手書き風しろくま、カップ持ち)
// `pose` and `color` are accepted for backward compat but the illustration is fixed.
function BearDoodle({ size = 80, pose = 'hold', style = {}, color }) {
  // Source PNG is 129×123, ratio ~1.05:1 (essentially square)
  return (
    <img
      src="assets/calpis_bear.png"
      alt=""
      width={size}
      height={size * (123 / 129)}
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
      aria-hidden="true"
    />
  );
}

function BearSitting({ size = 90, style = {}, color }) {
  return <BearDoodle size={size} style={style} />;
}

// ─── HEART
function HeartIcon({ filled = true, size = 16, color = '#7aa9d9' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        d="M12 21s-7-4.5-9.5-9C.5 8 3 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6.5 4 4.5 8C19 16.5 12 21 12 21z"
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartsRating({ value = 4.5, max = 5, size = 16, color = '#7aa9d9', showValue = true }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
      {Array.from({ length: max }).map((_, i) => (
        <HeartIcon key={i} filled={i < Math.round(value)} size={size} color={color} />
      ))}
      {showValue && (
        <span style={{ marginLeft: 6, fontSize: size * 0.85, color, fontWeight: 600, fontFamily: 'var(--font-display)' }}>
          {value.toFixed(1)}
        </span>
      )}
    </span>
  );
}

// ─── CLOUD with hand-drawn outline
function Cloud({ width = 200, fill = '#dbeaf7', stroke = null, style = {} }) {
  return (
    <svg viewBox="0 0 200 70" width={width} style={style} aria-hidden="true">
      <path
        d="M14 56 Q2 56 6 42 Q-2 30 14 28 Q14 14 30 16 Q38 4 56 14 Q70 4 84 16 Q102 6 114 20 Q132 14 138 28 Q156 22 162 38 Q180 38 178 52 Q190 58 178 64 Q166 68 152 64 Q140 68 126 64 Q112 68 98 64 Q84 68 70 64 Q56 68 42 64 Q28 68 14 56 Z"
        fill={fill}
        stroke={stroke || 'none'}
        strokeWidth="1.5"
      />
    </svg>
  );
}

// ─── SPEECH BUBBLE — hand drawn dashed
function SpeechBubble({ children, tail = 'left', style = {}, color = '#fff', stroke = '#a8c8e8', dashed = true }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block', ...style }}>
      <div
        style={{
          background: color,
          border: `1.5px ${dashed ? 'dashed' : 'solid'} ${stroke}`,
          borderRadius: 28,
          padding: '12px 22px',
          fontSize: 13,
          color: '#3a5a82',
          lineHeight: 1.6,
          fontFamily: 'var(--font-jp)',
          boxShadow: '0 2px 8px rgba(122,169,217,0.06)',
        }}
      >
        {children}
      </div>
      <svg
        width="32" height="22" viewBox="0 0 32 22"
        style={{
          position: 'absolute', bottom: -16,
          [tail === 'left' ? 'left' : 'right']: 28,
          transform: tail === 'right' ? 'scaleX(-1)' : 'none',
        }}
      >
        <path d="M2 2 Q10 14 28 18 Q14 18 6 21" fill={color} stroke={stroke} strokeWidth="1.5" strokeDasharray={dashed ? '3 2' : '0'} strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// ─── WASHI TAPE — striped, with rough edge
function WashiTape({ width = 80, color = '#a8c8e8', style = {}, rotate = 0 }) {
  return (
    <div
      style={{
        width, height: 24,
        background: `repeating-linear-gradient(45deg, ${color} 0 6px, ${color}88 6px 12px)`,
        opacity: 0.65,
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        transform: `rotate(${rotate}deg)`,
        clipPath: 'polygon(2% 5%, 98% 0%, 100% 95%, 0% 100%)',
        ...style,
      }}
    />
  );
}

// ─── BOTTLE — original illustrations of generic milky-drink containers
// These are carefully drawn but DO NOT replicate Calpis trade dress.
// Variants differ in shape; tint color is the contents color.
function BottlePlaceholder({ variant = 'pet', tint = '#fff5f8', accent = '#7aa9d9', label = '', size = 140, withDots = true }) {
  const W = size;
  const H = size * 1.5;
  const dotsId = `dots-${accent.replace('#','')}-${tint.replace('#','')}`;
  return (
    <svg viewBox="0 0 100 150" width={W} height={H} aria-hidden="true">
      <defs>
        <pattern id={dotsId} x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.9" fill={accent} opacity="0.4" />
        </pattern>
        <linearGradient id={`shine-${dotsId}`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="0.15" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      {variant === 'pet' && (
        <g>
          {/* cap */}
          <rect x="40" y="2" width="20" height="9" fill="#cbd5e0" rx="1.5" />
          <rect x="40" y="6" width="20" height="2" fill="#9aaab8" />
          {/* neck */}
          <path d="M 38 11 L 62 11 L 64 22 Q 68 32 66 44 L 66 134 Q 66 144 56 144 L 44 144 Q 34 144 34 134 L 34 44 Q 32 32 36 22 Z"
            fill={tint} stroke="#9aaab8" strokeWidth="0.6" />
          {/* main label */}
          <rect x="36" y="48" width="28" height="62" fill="#fff" stroke={accent} strokeWidth="0.5" />
          {withDots && <rect x="36" y="48" width="28" height="62" fill={`url(#${dotsId})`} />}
          {/* product band */}
          <rect x="36" y="68" width="28" height="14" fill={accent} opacity="0.85" />
          <text x="50" y="78" fontSize="6.5" fill="#fff" textAnchor="middle" fontWeight="700" fontFamily="sans-serif">CALPIS</text>
          <text x="50" y="92" fontSize="3.5" fill={accent} textAnchor="middle" fontFamily="sans-serif">{label || 'milk'}</text>
          {/* shine highlight */}
          <rect x="36" y="22" width="28" height="120" fill={`url(#shine-${dotsId})`} />
          {/* bottom shadow */}
          <ellipse cx="50" cy="142" rx="14" ry="2" fill={accent} opacity="0.08" />
        </g>
      )}
      {variant === 'carton' && (
        <g>
          <path d="M 26 22 L 74 22 L 74 142 L 26 142 Z" fill={tint} stroke="#9aaab8" strokeWidth="0.6" />
          {/* fold-top */}
          <path d="M 26 22 L 50 6 L 74 22" fill={tint} stroke="#9aaab8" strokeWidth="0.6" />
          <path d="M 26 22 L 38 14 L 38 6 M 74 22 L 62 14 L 62 6" stroke="#9aaab8" strokeWidth="0.5" fill="none" />
          {/* label */}
          <rect x="32" y="42" width="36" height="68" fill="#fff" />
          {withDots && <rect x="32" y="42" width="36" height="68" fill={`url(#${dotsId})`} />}
          <rect x="32" y="64" width="36" height="14" fill={accent} opacity="0.85" />
          <text x="50" y="74" fontSize="6.5" fill="#fff" textAnchor="middle" fontWeight="700" fontFamily="sans-serif">CALPIS</text>
          <text x="50" y="92" fontSize="3.5" fill={accent} textAnchor="middle" fontFamily="sans-serif">{label}</text>
          <rect x="26" y="22" width="48" height="120" fill={`url(#shine-${dotsId})`} />
        </g>
      )}
      {variant === 'cup' && (
        <g>
          <path d="M 26 38 L 74 38 L 70 140 Q 70 144 50 144 Q 30 144 30 140 Z" fill={tint} stroke="#9aaab8" strokeWidth="0.6" />
          <ellipse cx="50" cy="38" rx="24" ry="5" fill="#fff" stroke="#9aaab8" strokeWidth="0.6" />
          <ellipse cx="50" cy="36" rx="22" ry="3" fill="#f5f8fc" />
          <rect x="32" y="62" width="36" height="14" fill={accent} opacity="0.85" />
          <text x="50" y="72" fontSize="6.5" fill="#fff" textAnchor="middle" fontWeight="700" fontFamily="sans-serif">CALPIS</text>
          <text x="50" y="92" fontSize="3.5" fill={accent} textAnchor="middle" fontFamily="sans-serif">{label}</text>
          {withDots && <rect x="32" y="80" width="36" height="50" fill={`url(#${dotsId})`} />}
        </g>
      )}
      {variant === 'plastic' && (
        <g>
          <rect x="32" y="20" width="36" height="120" rx="5" fill={tint} stroke="#9aaab8" strokeWidth="0.6" />
          <rect x="42" y="6" width="16" height="14" rx="2" fill="#a8c8e8" />
          <rect x="36" y="44" width="28" height="60" fill="#fff" />
          {withDots && <rect x="36" y="44" width="28" height="60" fill={`url(#${dotsId})`} />}
          <rect x="36" y="62" width="28" height="14" fill={accent} opacity="0.85" />
          <text x="50" y="72" fontSize="6" fill="#fff" textAnchor="middle" fontWeight="700" fontFamily="sans-serif">CALPIS</text>
          <text x="50" y="88" fontSize="3.5" fill={accent} textAnchor="middle" fontFamily="sans-serif">{label}</text>
          <rect x="32" y="20" width="36" height="120" fill={`url(#shine-${dotsId})`} rx="5" />
        </g>
      )}
    </svg>
  );
}

// ─── PRODUCT PHOTO — bottle on a styled "tabletop" with glass + prop
function ProductPhoto({ variant = 'pet', tint = '#fff5f8', accent = '#7aa9d9', label = '', height = 200, bgTone = '#eaf2f9', noIllust = false, withGlass = true, withProp = false }) {
  return (
    <div
      style={{
        height,
        background: `linear-gradient(160deg, ${bgTone} 0%, #fff 60%, #fefaf2 100%)`,
        borderRadius: 14,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: 8,
      }}
    >
      {/* soft shadow ground */}
      <div style={{
        position: 'absolute', bottom: 6, left: '20%', right: '20%', height: 8,
        background: `radial-gradient(ellipse at center, ${accent}22 0%, transparent 70%)`,
      }} />
      {/* tiny scattered dots */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle at 20% 30%, ${accent}22 1px, transparent 2px), radial-gradient(circle at 80% 60%, ${accent}33 1.5px, transparent 2.5px), radial-gradient(circle at 60% 20%, ${accent}22 1px, transparent 2px)`,
        backgroundSize: '60px 60px, 80px 80px, 100px 100px',
      }} />
      {!noIllust && (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, position: 'relative', zIndex: 1 }}>
          {withProp && height > 120 && (
            // dried wheat / branches as a side prop, drawn simply
            <svg viewBox="0 0 30 100" height={Math.min(80, height * 0.45)} aria-hidden="true">
              <line x1="15" y1="100" x2="15" y2="20" stroke="#c8b890" strokeWidth="1" />
              <line x1="15" y1="80" x2="8" y2="60" stroke="#c8b890" strokeWidth="0.8" />
              <line x1="15" y1="80" x2="22" y2="60" stroke="#c8b890" strokeWidth="0.8" />
              <line x1="15" y1="60" x2="6" y2="40" stroke="#c8b890" strokeWidth="0.8" />
              <line x1="15" y1="60" x2="24" y2="40" stroke="#c8b890" strokeWidth="0.8" />
              <ellipse cx="8" cy="60" rx="2" ry="4" fill="#d8c8a0" />
              <ellipse cx="22" cy="60" rx="2" ry="4" fill="#d8c8a0" />
              <ellipse cx="6" cy="40" rx="2" ry="5" fill="#d8c8a0" />
              <ellipse cx="24" cy="40" rx="2" ry="5" fill="#d8c8a0" />
              <ellipse cx="15" cy="20" rx="2.5" ry="6" fill="#d8c8a0" />
            </svg>
          )}
          <BottlePlaceholder variant={variant} tint={tint} accent={accent} label={label} size={Math.min(110, height * 0.6)} />
          {withGlass && height > 120 && (
            // a glass with milky liquid + straw
            <svg viewBox="0 0 50 90" height={Math.min(70, height * 0.4)} aria-hidden="true">
              {/* glass */}
              <path d="M 8 8 L 42 8 L 38 80 Q 38 84 25 84 Q 12 84 12 80 Z" fill="rgba(255,255,255,0.5)" stroke="#bcc8d4" strokeWidth="0.8" />
              {/* milk */}
              <path d="M 14 30 L 36 30 L 36 78 Q 36 82 25 82 Q 14 82 14 78 Z" fill={tint} opacity="0.85" />
              <ellipse cx="25" cy="30" rx="11" ry="2" fill="#fff" opacity="0.6" />
              {/* straw */}
              <path d="M 30 5 L 34 80" stroke="#a8c8e8" strokeWidth="2" />
              <path d="M 30 5 L 34 80" stroke="#fff" strokeWidth="0.5" />
              {/* polka dots in milk */}
              <circle cx="20" cy="50" r="0.8" fill={accent} opacity="0.4" />
              <circle cx="30" cy="60" r="0.8" fill={accent} opacity="0.4" />
              <circle cx="22" cy="68" r="0.8" fill={accent} opacity="0.4" />
            </svg>
          )}
        </div>
      )}
      {noIllust && (
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, color: accent, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
          [ {label || 'product'} ]
        </span>
      )}
    </div>
  );
}

// ─── PHOTO PLACEHOLDER for non-product imagery
function PhotoPlaceholder({ width = '100%', height = 200, label, tint = '#e8f1fa', style = {} }) {
  return (
    <div
      style={{
        width, height,
        background: `linear-gradient(135deg, ${tint} 0%, #fff 100%)`,
        borderRadius: 12,
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        ...style,
      }}
    >
      {/* glass icon */}
      <svg viewBox="0 0 60 80" height={height * 0.6} aria-hidden="true">
        <path d="M 12 8 L 48 8 L 44 70 Q 44 74 30 74 Q 16 74 16 70 Z" fill="rgba(255,255,255,0.6)" stroke="#a8c8e8" strokeWidth="1" />
        <path d="M 18 28 L 42 28 L 40 68 Q 40 72 30 72 Q 20 72 20 68 Z" fill="#fff" />
        <path d="M 36 4 L 40 70" stroke="#a8c8e8" strokeWidth="2" />
        <ellipse cx="30" cy="28" rx="12" ry="2" fill="#fff" opacity="0.7" />
      </svg>
      {label && (
        <span style={{
          position: 'absolute', bottom: 8, right: 8,
          fontFamily: 'ui-monospace, monospace', fontSize: 9,
          color: '#7aa9d9', background: 'rgba(255,255,255,0.7)',
          padding: '2px 6px', borderRadius: 4,
        }}>
          {label}
        </span>
      )}
    </div>
  );
}

// ─── DOT PATTERN background overlay
function DotPattern({ density = 0.5, color = '#a8c8e8', style = {} }) {
  const size = 24 + (1 - density) * 30;
  const dot = 1.2 + density * 1.5;
  return (
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `radial-gradient(circle, ${color} ${dot}px, transparent ${dot + 0.5}px)`,
      backgroundSize: `${size}px ${size}px`,
      opacity: 0.25 + density * 0.35,
      pointerEvents: 'none',
      ...style,
    }} />
  );
}

// ─── HAND-DRAWN UNDERLINE accent
function Underline({ width = 100, color = '#a8c8e8', style = {} }) {
  return (
    <svg viewBox="0 0 100 8" width={width} height={8} style={style} aria-hidden="true">
      <path d="M2 5 Q25 1 50 4 T98 3" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── SCATTER decorations: small hearts, sparkles, dots scattered around
function ScatterDecor({ accent = '#a8c8e8', count = 8, style = {} }) {
  const items = Array.from({ length: count }).map((_, i) => {
    const seed = i * 137.5;
    const top = (seed * 1.3) % 90;
    const left = (seed * 2.1) % 95;
    const type = i % 3;
    const size = 8 + ((seed * 1.7) % 8);
    const opacity = 0.4 + ((seed * 3.1) % 50) / 100;
    return { top, left, type, size, opacity, key: i };
  });
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', ...style }}>
      {items.map(it => (
        <div key={it.key} style={{ position: 'absolute', top: `${it.top}%`, left: `${it.left}%`, opacity: it.opacity }}>
          {it.type === 0 && <HeartIcon size={it.size} color={accent} filled={false} />}
          {it.type === 1 && (
            <svg width={it.size} height={it.size} viewBox="0 0 16 16">
              <path d="M8 1 L9 7 L15 8 L9 9 L8 15 L7 9 L1 8 L7 7 Z" fill={accent} />
            </svg>
          )}
          {it.type === 2 && (
            <svg width={it.size} height={it.size} viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="3" fill={accent} />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── FLOATING BOTTLE for footer
// ─── HAND-DRAWN BOTTLE — uses the transparent PNG asset
function HandBottle({ size = 80, color = '#3b6cb8', accent = '#a8c8e8', opacity = 0.6, style = {} }) {
  return (
    <img src="assets/calpis_bottle.png" alt=""
      width={size * 0.48} height={size}
      style={{ display: 'block', opacity, ...style }}
      aria-hidden="true" />
  );
}

// ─── HAND-DRAWN GLASS — uses the transparent PNG asset
function HandGlass({ size = 70, color = '#3b6cb8', accent = '#a8c8e8', opacity = 0.6, style = {} }) {
  return (
    <img src="assets/calpis_cup.png" alt=""
      width={size} height={size * (88 / 62)}
      style={{ display: 'block', opacity, ...style }}
      aria-hidden="true" />
  );
}

// ─── FLOATING BOTTLE for footer (kept for compat — uses HandBottle now)
function MiniBottle({ size = 60, color = '#3b6cb8', style = {} }) {
  return <HandBottle size={size * 1.2} color={color} accent="#a8c8e8" style={style} />;
}

// ─── POLKA DOTS — scattered light-blue dots, hand-drawn vibe
// Use as a decorative svg layer. Pass width/height of the area in px.
// `count` = number of dots, `seed` = string/number to vary placement per-instance.
function PolkaDots({
  width = 120,
  height = 80,
  count = 7,
  seed = 'a',
  colors = ['#9ec6ec', '#bcd9ee', '#7eb4dc'],
  minR = 3,
  maxR = 7,
  style = {},
}) {
  // tiny seeded PRNG so layout is stable per seed
  const rand = React.useMemo(() => {
    let s = 0;
    const str = String(seed);
    for (let i = 0; i < str.length; i++) s = (s * 31 + str.charCodeAt(i)) >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 0xffffffff;
    };
  }, [seed]);

  const dots = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const r = minR + rand() * (maxR - minR);
      arr.push({
        cx: r + rand() * (width - r * 2),
        cy: r + rand() * (height - r * 2),
        r,
        fill: colors[Math.floor(rand() * colors.length)],
        opacity: 0.7 + rand() * 0.3,
      });
    }
    return arr;
  }, [count, width, height, minR, maxR, colors, rand]);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      style={{ pointerEvents: 'none', ...style }}
      aria-hidden="true"
    >
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={d.fill} opacity={d.opacity} />
      ))}
    </svg>
  );
}

// ─── HAND-DRAWN NUMBER for ranking (No. 1, 2, 3 in script style)
function RankNumber({ n, color = '#7aa9d9', size = 48 }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'baseline', color, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 700, fontSize: size, lineHeight: 1 }}>
      <span style={{ fontSize: size * 0.4, marginRight: 2 }}>No.</span>
      <span style={{ fontSize: size, position: 'relative' }}>
        {n}
        <svg viewBox="0 0 30 12" width={size * 0.5} height={size * 0.2} style={{ position: 'absolute', bottom: -4, left: 0 }}>
          <path d="M 2 6 Q 10 2 16 5 Q 22 8 28 4" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
    </div>
  );
}

// ─── SITE HEADER
function SiteHeader({ active = 'home', dark = false, illust = true, hideLogo = false }) {
  const items = ['home', 'about', 'review', 'ranking', 'archive', 'contact'];
  const fg = dark ? '#e8f1fa' : '#3a5a82';
  const accent = 'var(--accent)';
  // wave colors mirror the footer
  const wave = dark ? '#1a2838' : '#a8c8e8';
  const waveDark = dark ? '#142436' : '#7aa9d9';
  return (
    <div style={{ position: 'relative' }}>
      {/* small evenly-spaced scallop wave at top */}
      {(() => {
        const W = 1280;
        const scallops = 64; // many small scallops
        const step = W / scallops;
        const r = step / 2;
        const amp = 8;
        // build a path with evenly-spaced downward arcs (q curves)
        let d1 = `M0 ${amp} `;
        for (let i = 0; i < scallops; i++) {
          d1 += `q ${r} ${amp * 1.6} ${step} 0 `;
        }
        d1 += `L${W} 0 L0 0 Z`;
        // single bigger scallop row (size of the previous lighter wave)
        let d2 = `M0 ${amp} `;
        for (let i = 0; i < scallops; i++) {
          d2 += `q ${r} ${amp * 1.6} ${step} 0 `;
        }
        d2 += `L${W} 0 L0 0 Z`;
        return (
          <svg viewBox={`0 0 ${W} 24`} preserveAspectRatio="none" width="100%" height="22"
            style={{ display: 'block', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1, pointerEvents: 'none' }}>
            <path d={d2} fill={waveDark} opacity="1" />
          </svg>
        );
      })()}
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '32px 40px 22px', position: 'relative', zIndex: 5,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-display)', color: fg, visibility: hideLogo ? 'hidden' : 'visible' }}>
        {illust && <HandGlass size={42} />}
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
          <span style={{ fontSize: 14, fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--accent)' }}>my</span>
          <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-jp)' }}>
            CALPIS<span style={{ marginLeft: 4 }}>日誌</span>
          </div>
          <span style={{ fontSize: 12, fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--accent)', marginTop: 1 }}>review</span>
        </div>
      </div>
      <nav style={{ display: 'flex', gap: 32, fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic' }}>
        {items.map((it) => (
          <a key={it} href={`#${it}`}
            style={{
              color: fg, textDecoration: 'none', position: 'relative',
              fontWeight: active === it ? 700 : 400,
              opacity: active === it ? 1 : 0.7,
              paddingBottom: 6,
            }}>
            {it}
            {active === it && (
              <svg viewBox="0 0 50 6" width="40" height="5" style={{ position: 'absolute', left: '50%', bottom: 0, transform: 'translateX(-50%)' }}>
                <path d="M 1 3 Q 12 1 25 3 T 49 2" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </a>
        ))}
      </nav>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: fg, opacity: 0.65 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        </button>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <HandGlass size={32} color={fg} accent="#a8c8e8" />
        </div>
      </div>
    </header>
    </div>
  );
}

// ─── SOCIAL ICON HELPER
function SocialIcon({ kind, color, border, size = 30 }) {
  const inner = {
    ig: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="2" y="2" width="10" height="10" rx="2.5" />
      <circle cx="7" cy="7" r="2.4" />
      <circle cx="10" cy="4" r="0.6" fill="currentColor" stroke="none" />
    </svg>,
    x: <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
      <path d="M9.2 1.5h1.5L7.4 5.4l3.9 5.1H8.5L6.1 7.3 3.4 10.5H1.9l3.6-4.2L1.7 1.5h2.9l2.2 2.9 2.4-2.9zm-.5 8.1h.8L3.3 2.4h-.9l6.3 7.2z" />
    </svg>,
    note: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M3.5 9.5V3l5 1.5v5" strokeLinejoin="round" />
      <circle cx="3" cy="9.2" r="1.2" fill="currentColor" />
      <circle cx="8" cy="8.7" r="1.2" fill="currentColor" />
    </svg>,
  }[kind];
  return (
    <a href="#" style={{
      width: size, height: size, borderRadius: '50%',
      background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: `1px solid ${border}`, color, textDecoration: 'none',
    }}>{inner}</a>
  );
}

// ─── CLOUD WAVE TOP (re-usable)
// Fluffy cloud top — pure SVG path with Q-curve scallops only (no straight
// segments along the cloud edge). Single soft layer, light blue.
function CloudWave({ wave }) {
  const fill = wave;

  const W = 1280;
  const baseY = 80;
  const baseStep = 90;
  const baseLift = 60;
  const stepJitter = [0, -8, 6, -4, 10, -6, 4, -10, 8, -2, 6, -8, 4, 10, -6, 2];
  const liftJitter = [0, 14, -10, 8, -16, 12, -6, 18, -12, 6, -14, 10, -8, 16, -10, 4];

  let x = -20;
  let d = `M ${x} ${baseY}`;
  let i = 0;
  while (x < W + 20) {
    const step = baseStep + stepJitter[i % stepJitter.length];
    const lift = baseLift + liftJitter[i % liftJitter.length];
    const cx = x + step / 2;
    const cy = baseY - lift;
    const nx = x + step;
    d += ` Q ${cx} ${cy} ${nx} ${baseY}`;
    x = nx;
    i++;
  }
  d += ` L ${x} 200 L -20 200 Z`;

  return (
    <svg viewBox="0 0 1280 200" preserveAspectRatio="none" width="100%" height="120"
      style={{ display: 'block', position: 'relative', zIndex: 1, marginBottom: -1 }}>
      <path d={d} fill={fill} />
    </svg>
  );
}

// ─── NAV LINKS row
function FooterNav({ linkColor }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', gap: 22,
      fontSize: 13, fontFamily: 'var(--font-display)', fontStyle: 'italic',
    }}>
      {['home', 'about', 'review', 'ranking', 'archive', 'contact'].map((x, i, arr) => (
        <React.Fragment key={x}>
          <a href={`#${x}`} style={{ color: linkColor, textDecoration: 'none', opacity: 0.85 }}>{x}</a>
          {i < arr.length - 1 && <span style={{ opacity: 0.35 }}>|</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── SITE FOOTER — variants per page
function SiteFooter({ dark = false, illust = true, variant = 'home' }) {
  // Body background is the soft cloud-blue; the SVG scallop cloud sits at
  // the top of the footer overlapping the page above.
  const wave = dark ? '#1a2838' : '#cfe3f2';
  const waveDark = dark ? '#142436' : '#7aa9d9';
  const linkColor = dark ? '#e8f1fa' : '#3a5a82';

  // Variant: REVIEW LIST — no big footer band, just sticker decoration
  if (variant === 'review-list') {
    return (
      <footer style={{ position: 'relative', padding: '20px 56px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        {illust && (
          <div style={{ position: 'relative' }}>
            <BearSitting size={70} style={{ color: linkColor, opacity: 0.85 }} />
          </div>
        )}
        {illust && <HandBottle size={84} color={linkColor} accent="#cfe3f2" />}
      </footer>
    );
  }

  // Variant: REVIEW DETAIL — no footer band (bear/back link sit in page above)
  if (variant === 'review-detail') {
    return <footer style={{ height: 24 }} />;
  }

  // Variant: ARCHIVE — minimal nav + © only, on cloud wave
  if (variant === 'archive') {
    return (
      <footer style={{ position: 'relative', marginTop: 40 }}>
        <CloudWave wave={wave} />
        <div style={{
          background: wave, padding: '18px 56px 18px',
          color: linkColor, fontFamily: 'var(--font-jp)',
        }}>
          <FooterNav linkColor={linkColor} />
          <div style={{ textAlign: 'center', fontSize: 10, opacity: 0.65, marginTop: 8 }}>
            © my Calpis review site
          </div>
        </div>
      </footer>
    );
  }

  // Variant: RANKING — cloud wave with prompt + socials + bottle on far right
  if (variant === 'ranking') {
    return (
      <footer style={{ position: 'relative', marginTop: 40 }}>
        <CloudWave wave={wave} />
        <div style={{
          background: wave, padding: '24px 56px 28px',
          color: linkColor, fontFamily: 'var(--font-jp)', position: 'relative', minHeight: 90,
        }}>
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 28,
            paddingRight: 130,
          }}>
            <div style={{ fontSize: 13, lineHeight: 1.8, textAlign: 'center' }}>
              あなたのおすすめも教えてね！<br/>
              SNSでもカルピス愛を発信中☺
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <SocialIcon kind="ig" color={linkColor} border={waveDark} size={36} />
              <SocialIcon kind="x" color={linkColor} border={waveDark} size={36} />
              <SocialIcon kind="note" color={linkColor} border={waveDark} size={36} />
            </div>
          </div>
          {illust && (
            <div style={{ position: 'absolute', right: 40, bottom: 8, zIndex: 2 }}>
              <HandBottle size={110} color={linkColor} accent="#cfe3f2" />
            </div>
          )}
        </div>
      </footer>
    );
  }

  // Variant: CONTACT — bottle + bubble + follow me + bear + メルマガ + bubble + glass + nav + ©
  if (variant === 'contact') {
    return (
      <footer style={{ position: 'relative', marginTop: 40 }}>
        <CloudWave wave={wave} />
        <div style={{
          background: wave, padding: '28px 40px 18px',
          color: linkColor, fontFamily: 'var(--font-jp)', position: 'relative',
        }}>
          <div style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            gap: 14, minHeight: 130, flexWrap: 'nowrap',
          }}>
            {/* bottle */}
            {illust && <HandBottle size={92} color={linkColor} accent="#cfe3f2" style={{ flexShrink: 0 }} />}

            {/* "いつも見てくれて〜" bubble */}
            {illust && (
              <div style={{ paddingBottom: 16, flexShrink: 0 }}>
                <SpeechBubble color="#fff" stroke={waveDark}>
                  いつも見てくれて<br/>ありがとう〜！
                </SpeechBubble>
              </div>
            )}

            {/* follow me + socials */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
              paddingBottom: 12, flexShrink: 0,
            }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontStyle: 'italic',
                fontSize: 20, color: linkColor, lineHeight: 1,
              }}>
                follow me <span style={{ fontFamily: 'var(--font-jp)', fontSize: 14 }}>♡</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <SocialIcon kind="ig" color={linkColor} border={waveDark} size={34} />
                <SocialIcon kind="x" color={linkColor} border={waveDark} size={34} />
                <SocialIcon kind="note" color={linkColor} border={waveDark} size={34} />
              </div>
            </div>

            {/* bear */}
            {illust && <BearSitting size={92} style={{ flexShrink: 0 }} />}

            {/* メルマガ block */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 6, paddingBottom: 16, flexShrink: 0,
            }}>
              <div style={{ fontSize: 11, fontWeight: 500 }}>新着レビューをお届けします！</div>
              <div style={{
                display: 'flex', alignItems: 'center', background: '#fff',
                borderRadius: 999, padding: '5px 6px 5px 18px',
                border: `1px solid ${waveDark}`,
                width: 220,
              }}>
                <span style={{ fontSize: 11, color: '#7a98b8', flex: 1 }}>メールマガジンに登録</span>
                <button style={{
                  width: 28, height: 28, borderRadius: '50%', border: 'none',
                  background: linkColor, color: '#fff', cursor: 'pointer', fontSize: 13,
                }}>→</button>
              </div>
            </div>

            {/* "これからも〜" bubble */}
            {illust && (
              <div style={{ paddingBottom: 16, flexShrink: 0 }}>
                <SpeechBubble color="#fff" stroke={waveDark} tail="right">
                  これからも<br/>よろしくね！
                </SpeechBubble>
              </div>
            )}

            {/* glass with straw on far right */}
            {illust && <HandGlass size={70} style={{ flexShrink: 0 }} />}
          </div>

          <div style={{ height: 1, background: '#fff', opacity: 0.4, margin: '14px 0 8px' }} />
          <FooterNav linkColor={linkColor} />
          <div style={{ textAlign: 'center', fontSize: 10, opacity: 0.65, marginTop: 6 }}>
            © my Calpis review site
          </div>
        </div>
      </footer>
    );
  }

  // Variant: HOME (default) — full footer
  return (
    <footer style={{ position: 'relative', marginTop: 24 }}>
      <CloudWave wave={wave} />

      {/* main footer body */}
      <div style={{
        background: wave,
        padding: '28px 56px 20px',
        position: 'relative',
        color: linkColor,
        fontFamily: 'var(--font-jp)',
      }}>
        {/* scattered light dots in background */}
        {illust && (
          <svg viewBox="0 0 1280 240" preserveAspectRatio="none"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.5 }}>
            {[
              [60, 40, 3], [120, 90, 2], [180, 30, 2.5], [240, 110, 2],
              [60, 150, 2.5], [180, 180, 2], [80, 210, 3],
              [1100, 50, 2.5], [1180, 90, 2], [1140, 140, 3], [1080, 180, 2],
              [560, 200, 2], [620, 190, 2.5], [680, 210, 2],
            ].map(([x, y, r], i) => (
              <circle key={i} cx={x} cy={y} r={r} fill="#fff" />
            ))}
          </svg>
        )}

        {/* top row: subscribe (L) · bear+clouds (C) · follow me (R) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          alignItems: 'end',
          gap: 16,
          minHeight: 120,
          position: 'relative',
        }}>
          {/* LEFT — subscribe */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 16,
              margin: '0 0 4px',
              color: linkColor,
              opacity: 0.85,
            }}>
              new review<span style={{ fontFamily: 'var(--font-jp)', fontStyle: 'normal', fontSize: 12 }}>やお気に入りを</span>
            </p>
            <p style={{ fontSize: 12, margin: '0 0 12px', color: linkColor, opacity: 0.85 }}>
              ゆるっとお届けします。
            </p>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 18px', borderRadius: 999,
              background: '#fff',
              border: `1px solid ${waveDark}`,
              color: linkColor,
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 14,
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(60,90,130,0.08)',
            }}>
              subscribe
              <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                <rect x="1" y="1" width="12" height="9" rx="1.5" stroke={linkColor} strokeWidth="1.2" />
                <path d="M1.5 2L7 6L12.5 2" stroke={linkColor} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* CENTER — bear sitting on the cloud band, sized to match reference */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', position: 'relative', zIndex: 2 }}>
            {illust && <BearSitting size={94} style={{ position: 'relative', zIndex: 3, marginBottom: -4 }} />}
          </div>

          {/* RIGHT — follow me + social icons (bottle is positioned absolutely to far right edge) */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', position: 'relative', zIndex: 2, paddingRight: 110 }}>
            <div style={{ textAlign: 'left' }}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 20,
                margin: '0 0 10px',
                color: linkColor,
              }}>
                follow me <span style={{ fontFamily: 'var(--font-jp)', fontSize: 14 }}>→</span>
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                {/* Instagram */}
                <a href="#" style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `1px solid ${waveDark}`, color: linkColor,
                }}>
                  <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <rect x="2" y="2" width="10" height="10" rx="2.5" />
                    <circle cx="7" cy="7" r="2.4" />
                    <circle cx="10" cy="4" r="0.6" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                {/* X */}
                <a href="#" style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `1px solid ${waveDark}`, color: linkColor,
                }}>
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M9.2 1.5h1.5L7.4 5.4l3.9 5.1H8.5L6.1 7.3 3.4 10.5H1.9l3.6-4.2L1.7 1.5h2.9l2.2 2.9 2.4-2.9zm-.5 8.1h.8L3.3 2.4h-.9l6.3 7.2z" />
                  </svg>
                </a>
                {/* Note (musical note circle) */}
                <a href="#" style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `1px solid ${waveDark}`, color: linkColor,
                }}>
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3">
                    <path d="M3.5 9.5V3l5 1.5v5" strokeLinejoin="round" />
                    <circle cx="3" cy="9.2" r="1.2" fill="currentColor" />
                    <circle cx="8" cy="8.7" r="1.2" fill="currentColor" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* far-right floating bottle (matches reference) */}
        {illust && (
          <div style={{ position: 'absolute', right: 32, bottom: 50, zIndex: 2 }}>
            <HandBottle size={100} color={linkColor} accent="#cfe3f2" />
          </div>
        )}

        {/* divider hairline */}
        <div style={{
          height: 1, background: '#fff', opacity: 0.4,
          margin: '10px 0 6px',
        }} />

        {/* nav links + copyright */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          color: linkColor,
        }}>
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 22,
            fontSize: 13, fontFamily: 'var(--font-display)', fontStyle: 'italic',
          }}>
            {['home', 'about', 'review', 'ranking', 'archive', 'contact'].map((x, i, arr) => (
              <React.Fragment key={x}>
                <a href={`#${x}`} style={{ color: linkColor, textDecoration: 'none', opacity: 0.85 }}>{x}</a>
                {i < arr.length - 1 && <span style={{ opacity: 0.35 }}>|</span>}
              </React.Fragment>
            ))}
          </div>
          <div style={{ fontSize: 10, opacity: 0.65, fontFamily: 'var(--font-jp)', marginTop: 4 }}>
            © my CALPIS 日誌 review site
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  BearDoodle, BearSitting, HeartIcon, HeartsRating, Cloud, SpeechBubble,
  WashiTape, BottlePlaceholder, PhotoPlaceholder, ProductPhoto, DotPattern,
  Underline, SiteHeader, SiteFooter, ScatterDecor, MiniBottle, HandBottle, HandGlass, RankNumber, PolkaDots,
});
