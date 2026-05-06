// stickers.jsx — drag-and-drop sticker palette + per-page sticker layer.
// Palette is a fixed floating window; users drag a sticker preview onto any
// artboard. The dropped sticker is stored per-page in localStorage so it
// survives reloads. Click a placed sticker to drag-move it; double-click to
// delete. Pressing 'd' anywhere also deletes the most recently selected one.
//
// Coordinate handling: each <StickerLayer> wraps the page content. We capture
// pointer events at window level during drag and use the layer's bounding rect
// (which already accounts for the design-canvas pan/zoom transform) to compute
// the sticker's local coordinates inside the artboard.

const STICKER_LS_KEY = 'calpis-stickers-v1';
const STICKER_PALETTE_OPEN_LS_KEY = 'calpis-stickers-palette-open-v1';

// ─────────────────────── store ───────────────────────
function loadStickers() {
  try {
    const raw = localStorage.getItem(STICKER_LS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}
function saveStickers(state) {
  try {localStorage.setItem(STICKER_LS_KEY, JSON.stringify(state));} catch {}
}

// global event bus for sticker state — simpler than threading context through
// pages-1.jsx and pages-2.jsx.
const stickerStore = (() => {
  let state = loadStickers();
  const listeners = new Set();
  const emit = () => {saveStickers(state);listeners.forEach((l) => l(state));};
  return {
    get: () => state,
    getPage: (pageId) => state[pageId] || [],
    add: (pageId, sticker) => {
      state = { ...state, [pageId]: [...(state[pageId] || []), sticker] };
      emit();
    },
    update: (pageId, id, patch) => {
      const arr = (state[pageId] || []).map((s) => s.id === id ? { ...s, ...patch } : s);
      state = { ...state, [pageId]: arr };
      emit();
    },
    remove: (pageId, id) => {
      const arr = (state[pageId] || []).filter((s) => s.id !== id);
      state = { ...state, [pageId]: arr };
      emit();
    },
    clearPage: (pageId) => {
      state = { ...state, [pageId]: [] };
      emit();
    },
    clearAll: () => {state = {};emit();},
    subscribe: (l) => {listeners.add(l);return () => listeners.delete(l);}
  };
})();

function usePageStickers(pageId) {
  const [, force] = React.useReducer((x) => x + 1, 0);
  React.useEffect(() => stickerStore.subscribe(force), []);
  return stickerStore.getPage(pageId);
}

// ─────────────────────── sticker types ───────────────────────
// Each type defines how to render at a given size & color.
const STICKER_TYPES = {
  dot: {
    label: '水玉',
    render: ({ size, color }) =>
    <div style={{ width: size, height: size, borderRadius: '50%', background: color }} />

  },
  dotRing: {
    label: '丸枠',
    render: ({ size, color }) =>
    <div style={{ width: size, height: size, borderRadius: '50%', border: `${Math.max(2, size * 0.12)}px solid ${color}`, boxSizing: 'border-box' }} />

  },
  cluster: {
    label: '水玉トリオ',
    render: ({ size, color }) =>
    <svg width={size * 1.4} height={size} viewBox="0 0 56 40" style={{ display: 'block' }}>
        <circle cx="12" cy="20" r="8" fill={color} opacity="0.95" />
        <circle cx="30" cy="12" r="6" fill={color} opacity="0.75" />
        <circle cx="42" cy="26" r="9" fill={color} opacity="0.9" />
      </svg>

  }
};

// preset color swatches — light blues like the reference image, plus accents
const STICKER_COLORS = [
'#d6ecff', // ごく薄い水色（青味のあるパステル）
'#b8dcfa', // 薄い水色
'#9ccef5',
'#7ebfee', // mid light blue
'#5aa8e2',
'#3b8acc',
'#2a6cb0',
'#e8a8c0', // pink
'#f4c97a', // apricot
'#a8d4b8' // mint
];

// preset size choices
const STICKER_SIZES = [10, 16, 24, 36];

// ─────────────────────── drag controller ───────────────────────
// Singleton state tracking an in-progress drag from the palette.
const dragController = (() => {
  let active = null; // { type, color, size, ghostEl }
  const listeners = new Set();
  const emit = () => listeners.forEach((l) => l(active));
  return {
    start: (spec, e) => {
      // create a ghost element that follows the cursor
      const ghost = document.createElement('div');
      ghost.style.cssText = 'position:fixed;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);opacity:0.9;';
      document.body.appendChild(ghost);
      active = { ...spec, ghostEl: ghost, x: e.clientX, y: e.clientY };
      // render ghost via portal-ish: use a tiny mount
      const root = ReactDOM.createRoot(ghost);
      root.render(STICKER_TYPES[spec.type].render({ size: spec.size, color: spec.color }));
      active.ghostRoot = root;
      ghost.style.left = e.clientX + 'px';
      ghost.style.top = e.clientY + 'px';
      emit();
    },
    move: (e) => {
      if (!active) return;
      active.x = e.clientX;active.y = e.clientY;
      active.ghostEl.style.left = e.clientX + 'px';
      active.ghostEl.style.top = e.clientY + 'px';
    },
    end: (e) => {
      if (!active) return null;
      const result = { ...active, dropX: e.clientX, dropY: e.clientY };
      try {active.ghostRoot.unmount();} catch {}
      active.ghostEl.remove();
      active = null;
      emit();
      return result;
    },
    isActive: () => !!active,
    subscribe: (l) => {listeners.add(l);return () => listeners.delete(l);}
  };
})();

// ─────────────────────── StickerLayer ───────────────────────
// Wraps page content; renders placed stickers as absolute children & handles drops.
function StickerLayer({ pageId, children }) {
  const stickers = usePageStickers(pageId);
  const ref = React.useRef(null);

  // listen for global pointer-up; if drag ends over us, add a sticker.
  React.useEffect(() => {
    const onUp = (e) => {
      if (!dragController.isActive()) return;
      const layer = ref.current;
      if (!layer) return;
      const rect = layer.getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right &&
      e.clientY >= rect.top && e.clientY <= rect.bottom;
      const result = dragController.end(e);
      if (!inside || !result) return;
      // convert screen coords to layer-local accounting for canvas scale
      const scale = rect.width / layer.offsetWidth || 1;
      const lx = (e.clientX - rect.left) / scale;
      const ly = (e.clientY - rect.top) / scale;
      stickerStore.add(pageId, {
        id: 's_' + Math.random().toString(36).slice(2, 9),
        type: result.type,
        color: result.color,
        size: result.size,
        x: lx, y: ly
      });
    };
    window.addEventListener('pointerup', onUp);
    return () => window.removeEventListener('pointerup', onUp);
  }, [pageId]);

  return (
    <div ref={ref} data-sticker-layer={pageId} style={{ position: 'relative', width: '100%', minHeight: '100%', height: "10px" }}>
      {children}
      {/* sticker overlay on top */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
        {stickers.map((s) =>
        <PlacedSticker key={s.id} pageId={pageId} sticker={s} />
        )}
      </div>
    </div>);

}

function PlacedSticker({ pageId, sticker }) {
  const { id, type, color, size, x, y } = sticker;
  const Type = STICKER_TYPES[type];
  if (!Type) return null;
  const onDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const layer = e.currentTarget.closest('[data-sticker-layer]');
    if (!layer) return;
    const rect = layer.getBoundingClientRect();
    const scale = rect.width / layer.offsetWidth || 1;
    // pointer offset within sticker
    const startX = e.clientX,startY = e.clientY;
    const origX = x,origY = y;
    const onMove = (ev) => {
      const dx = (ev.clientX - startX) / scale;
      const dy = (ev.clientY - startY) / scale;
      stickerStore.update(pageId, id, { x: origX + dx, y: origY + dy });
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };
  const onDouble = (e) => {
    e.preventDefault();e.stopPropagation();
    stickerStore.remove(pageId, id);
  };
  return (
    <div
      onPointerDown={onDown}
      onDoubleClick={onDouble}
      title="ドラッグで移動・ダブルクリックで削除"
      style={{
        position: 'absolute',
        left: x, top: y,
        transform: 'translate(-50%, -50%)',
        cursor: 'grab',
        pointerEvents: 'auto'
      }}>
      
      {Type.render({ size, color })}
    </div>);

}

// ─────────────────────── Palette ───────────────────────
function StickerPalette({ pages = [] }) {
  const [open, setOpen] = React.useState(() => {
    try {return localStorage.getItem(STICKER_PALETTE_OPEN_LS_KEY) === '1';} catch {return false;}
  });
  const [color, setColor] = React.useState(STICKER_COLORS[0]);
  const [size, setSize] = React.useState(STICKER_SIZES[1]);
  const [pos, setPos] = React.useState({ x: 24, y: 100 });
  const [, force] = React.useReducer((x) => x + 1, 0);

  React.useEffect(() => stickerStore.subscribe(force), []);
  React.useEffect(() => {
    try {localStorage.setItem(STICKER_PALETTE_OPEN_LS_KEY, open ? '1' : '0');} catch {}
  }, [open]);

  // listen for global pointermove during drag to keep ghost following
  React.useEffect(() => {
    const onMove = (e) => dragController.move(e);
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  // start drag from a sample
  const onSampleDown = (type) => (e) => {
    e.preventDefault();
    dragController.start({ type, color, size }, e);
  };

  // drag the palette window itself
  const onTitleDown = (e) => {
    e.preventDefault();
    const startX = e.clientX,startY = e.clientY;
    const origX = pos.x,origY = pos.y;
    const onMove = (ev) => {
      setPos({ x: origX + (ev.clientX - startX), y: origY + (ev.clientY - startY) });
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed', left: 24, bottom: 24, zIndex: 9999,
          padding: '10px 16px', borderRadius: 999,
          background: '#fff', border: '1px solid #d8e4ee',
          boxShadow: '0 4px 16px rgba(60,90,130,0.18)',
          fontSize: 13, fontFamily: 'var(--font-jp), sans-serif',
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
        }}
        title="ステッカーパネルを開く">
        
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#9ec6ec', display: 'inline-block' }} />
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7eb4dc', display: 'inline-block' }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#5a96cc', display: 'inline-block' }} />
        <span style={{ marginLeft: 6, color: '#3a5a82', fontWeight: 500 }}>ステッカー</span>
      </button>);

  }

  const totalCount = Object.values(stickerStore.get()).reduce((n, arr) => n + (arr?.length || 0), 0);

  return (
    <div style={{
      position: 'fixed', left: pos.x, top: pos.y, zIndex: 9999,
      width: 240,
      background: '#fff', border: '1px solid #d8e4ee', borderRadius: 14,
      boxShadow: '0 8px 32px rgba(60,90,130,0.24)',
      fontFamily: 'var(--font-jp), sans-serif',
      color: '#3a5a82',
      userSelect: 'none'
    }}>
      {/* title bar — drag handle */}
      <div
        onPointerDown={onTitleDown}
        style={{
          padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8,
          borderBottom: '1px solid #eef3f8',
          cursor: 'grab', fontSize: 13, fontWeight: 600
        }}>
        
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#9ec6ec' }} />
        <span style={{ flex: 1 }}>ステッカー</span>
        <button onClick={() => setOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#7a98b8', fontSize: 16, padding: 0, lineHeight: 1 }}>×</button>
      </div>

      <div style={{ padding: 14 }}>
        {/* color swatches */}
        <div style={{ fontSize: 11, color: '#7a98b8', marginBottom: 6 }}>カラー</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          {STICKER_COLORS.map((c) =>
          <button key={c} onClick={() => setColor(c)} title={c}
          style={{
            width: 22, height: 22, borderRadius: '50%', background: c,
            border: c === color ? '2px solid #3a5a82' : '1px solid rgba(0,0,0,0.08)',
            cursor: 'pointer', padding: 0
          }} />

          )}
        </div>

        {/* size */}
        <div style={{ fontSize: 11, color: '#7a98b8', marginBottom: 6 }}>サイズ</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          {STICKER_SIZES.map((s) =>
          <button key={s} onClick={() => setSize(s)}
          style={{
            width: 36, height: 36, borderRadius: 8, background: s === size ? '#eaf2f9' : 'transparent',
            border: s === size ? '1.5px solid #7aa9d9' : '1px solid #e0e9f1',
            cursor: 'pointer', padding: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
          title={s + 'px'}>
            
              <span style={{ width: s * 0.6, height: s * 0.6, borderRadius: '50%', background: color }} />
            </button>
          )}
        </div>

        {/* drag samples */}
        <div style={{ fontSize: 11, color: '#7a98b8', marginBottom: 6 }}>ドラッグして配置</div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6,
          padding: 10, background: '#f7fafd', borderRadius: 10, marginBottom: 10
        }}>
          {Object.entries(STICKER_TYPES).map(([type, def]) =>
          <div key={type}
          onPointerDown={onSampleDown(type)}
          title={def.label + ' をドラッグ'}
          style={{
            height: 56, borderRadius: 8, background: '#fff',
            border: '1px solid #e0e9f1', cursor: 'grab',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            touchAction: 'none'
          }}>
            
              {def.render({ size: Math.min(size, 24), color })}
            </div>
          )}
        </div>

        <div style={{ fontSize: 10, lineHeight: 1.6, color: '#9ab0c6' }}>
          ・パネルからドラッグして好きな場所にドロップ<br />
          ・配置後はドラッグで移動・ダブルクリックで削除
        </div>

        {/* footer actions */}
        {totalCount > 0 &&
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11 }}>
            <span style={{ color: '#7a98b8' }}>配置中: {totalCount}個</span>
            <button onClick={() => {if (confirm('全てのステッカーを削除しますか？')) stickerStore.clearAll();}}
          style={{ border: 'none', background: 'transparent', color: '#c97aa0', cursor: 'pointer', fontSize: 11, padding: 0 }}>
            すべて消す</button>
          </div>
        }
      </div>
    </div>);

}

Object.assign(window, { StickerLayer, StickerPalette, stickerStore });