// app.jsx — assembles design canvas with 6 page artboards + Tweaks panel

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "calpis-blue",
  "fontJP": "klee",
  "page": "all",
  "dotDensity": 0,
  "illust": true,
  "dark": false
}/*EDITMODE-END*/;

const PALETTES = {
  'calpis-blue': { accent: '#7aa9d9', name: 'カルピスブルー' },
  'soft-pink':   { accent: '#d878a0', name: 'やわらかピンク' },
  'mint':        { accent: '#7ab898', name: 'ミントグリーン' },
  'lavender':    { accent: '#a888d8', name: 'ラベンダー' },
  'apricot':     { accent: '#e8a868', name: 'アプリコット' },
};
const FONTS_JP = {
  klee:    { stack: '"Klee One","Yusei Magic",ui-sans-serif,sans-serif', name: '手書き風 (Klee One)' },
  rounded: { stack: '"M PLUS Rounded 1c","Hiragino Maru Gothic ProN",ui-sans-serif,sans-serif', name: 'まるゴシック' },
  mincho:  { stack: '"Shippori Mincho","Yu Mincho",serif', name: '明朝' },
  yusei:   { stack: '"Yusei Magic","Klee One",sans-serif', name: '元気な手書き' },
};
const PAGES = [
  { id: 'home',    label: '01 Home',    Comp: 'HomePage',         w: 1280, h: 1830 },
  { id: 'list',    label: '02 Review',  Comp: 'ReviewListPage',   w: 1280, h: 1340 },
  { id: 'detail',  label: '03 Detail',  Comp: 'ReviewDetailPage', w: 1280, h: 800 },
  { id: 'ranking', label: '04 Ranking', Comp: 'RankingPage',      w: 1280, h: 1140 },
  { id: 'archive', label: '05 Archive', Comp: 'ArchivePage',      w: 1280, h: 1000 },
  { id: 'contact', label: '06 Contact', Comp: 'ContactPage',      w: 1280, h: 1260 },
  { id: 'nav',     label: '07 Nav',     Comp: 'NavigationPage',   w: 1280, h: 1200 },
];

// Mobile pages — wrapped in iOS device frame (iPhone)
const MOBILE_PAGES = [
  { id: 'm-home',    label: '01 Home',    Comp: 'MobileHome' },
  { id: 'm-list',    label: '02 Review',  Comp: 'MobileReview' },
  { id: 'm-detail',  label: '03 Detail',  Comp: 'MobileDetail' },
  { id: 'm-ranking', label: '04 Ranking', Comp: 'MobileRanking' },
  { id: 'm-archive', label: '05 Archive', Comp: 'MobileArchive' },
  { id: 'm-contact', label: '06 Contact', Comp: 'MobileContact' },
  { id: 'm-nav',     label: '07 Nav',     Comp: 'MobileNav' },
];

// Mobile FULL-length artboards — same screens, but rendered top-to-bottom
// without the iOS device frame so reviewers can see the entire page.
// Heights are estimates — content auto-grows; artboard just needs to be tall
// enough to contain it.
const MOBILE_FULL_PAGES = [
  { id: 'f-home',    label: '01 Home (full)',    Comp: 'MobileHome',    h: 2360 },
  { id: 'f-list',    label: '02 Review (full)',  Comp: 'MobileReview',  h: 1680 },
  { id: 'f-detail',  label: '03 Detail (full)',  Comp: 'MobileDetail',  h: 2240 },
  { id: 'f-ranking', label: '04 Ranking (full)', Comp: 'MobileRanking', h: 2080 },
  { id: 'f-archive', label: '05 Archive (full)', Comp: 'MobileArchive', h: 1860 },
  { id: 'f-contact', label: '06 Contact (full)', Comp: 'MobileContact', h: 1740 },
  { id: 'f-nav',     label: '07 Nav (full)',     Comp: 'MobileNav',     h: 1340 },
];

// Mobile screen content width (matches inside of the iOS frame)
const PHONE_CONTENT_W = 390;

// iPhone 14/15 dims used by ios-frame.jsx default
const PHONE_W = 402;
const PHONE_H = 874;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const palette = PALETTES[t.palette] || PALETTES['calpis-blue'];
  const fontJP = FONTS_JP[t.fontJP] || FONTS_JP.klee;

  // inject CSS vars
  React.useEffect(() => {
    document.documentElement.style.setProperty('--font-jp', fontJP.stack);
    document.documentElement.style.setProperty('--font-display', '"Caveat","Klee One",cursive');
    document.documentElement.style.setProperty('--accent', palette.accent);
  }, [fontJP, palette]);

  const pages = t.page === 'all' ? PAGES : PAGES.filter(p => p.id === t.page);

  const renderPage = (p) => {
    const Comp = window[p.Comp];
    if (!Comp) return <div style={{ padding: 40, fontFamily: 'monospace' }}>Missing: {p.Comp}</div>;
    return (
      <StickerLayer pageId={p.id}>
        <Comp dark={t.dark} dotDensity={t.dotDensity} illust={t.illust} accent={palette.accent} />
      </StickerLayer>
    );
  };

  const renderMobile = (p) => {
    const Comp = window[p.Comp];
    if (!Comp) return <div style={{ padding: 40, fontFamily: 'monospace' }}>Missing: {p.Comp}</div>;
    return (
      <StickerLayer pageId={p.id}>
        <div style={{ width: PHONE_W, height: PHONE_H, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IOSDevice width={PHONE_W} height={PHONE_H} hideChrome={true}>
            <Comp />
          </IOSDevice>
        </div>
      </StickerLayer>
    );
  };

  const renderMobileFull = (p) => {
    const Comp = window[p.Comp];
    if (!Comp) return <div style={{ padding: 40, fontFamily: 'monospace' }}>Missing: {p.Comp}</div>;
    return (
      <StickerLayer pageId={p.id}>
        <div style={{ width: PHONE_CONTENT_W, minHeight: '100%', background: '#f0eee9' }}>
          <Comp full={true} />
        </div>
      </StickerLayer>
    );
  };

  return (
    <>
      <DesignCanvas>
        <DCSection id="pages" title="CALPIS日誌 — 6 pages (Desktop)" subtitle="個人レビューサイト・ChatGPTプレビュー画像から再構築（オリジナル素材使用）">
          {pages.map(p => (
            <DCArtboard key={p.id} id={p.id} label={p.label} width={p.w} height={p.h}>
              {renderPage(p)}
            </DCArtboard>
          ))}
        </DCSection>
        <DCSection id="mobile" title="CALPIS日誌 — Mobile (iPhone)" subtitle="提供されたモバイル画面に基づくレイアウト・既存パーツのみ使用">
          {MOBILE_PAGES.map(p => (
            <DCArtboard key={p.id} id={p.id} label={p.label} width={PHONE_W} height={PHONE_H}>
              {renderMobile(p)}
            </DCArtboard>
          ))}
        </DCSection>
        <DCSection id="mobile-full" title="CALPIS日誌 — Mobile (Full-length)" subtitle="各画面を上から下まで全表示・iPhoneフレームなし">
          {MOBILE_FULL_PAGES.map(p => (
            <DCArtboard key={p.id} id={p.id} label={p.label} width={PHONE_CONTENT_W} height={p.h}>
              {renderMobileFull(p)}
            </DCArtboard>
          ))}
        </DCSection>
      </DesignCanvas>

      <TweaksPanel>
        <TweakSection label="Page" />
        <TweakSelect
          label="表示するページ"
          value={t.page}
          options={[
            { value: 'all', label: 'すべて (6ページ並べて比較)' },
            ...PAGES.map(p => ({ value: p.id, label: p.label })),
          ]}
          onChange={v => setTweak('page', v)}
        />

        <TweakSection label="Theme" />
        <TweakSelect
          label="カラーパレット"
          value={t.palette}
          options={Object.entries(PALETTES).map(([k, v]) => ({ value: k, label: v.name }))}
          onChange={v => setTweak('palette', v)}
        />
        <TweakSelect
          label="日本語フォント"
          value={t.fontJP}
          options={Object.entries(FONTS_JP).map(([k, v]) => ({ value: k, label: v.name }))}
          onChange={v => setTweak('fontJP', v)}
        />
        <TweakToggle label="ダークモード" value={t.dark} onChange={v => setTweak('dark', v)} />

        <TweakSection label="Decoration" />
        <TweakSlider label="背景の水玉" value={t.dotDensity} min={0} max={1} step={0.05}
          onChange={v => setTweak('dotDensity', v)} />
        <TweakToggle label="イラスト表示" value={t.illust} onChange={v => setTweak('illust', v)} />
      </TweaksPanel>

      <StickerPalette />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
