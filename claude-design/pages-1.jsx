// pages-1.jsx — Home, About-aside, Review List
// Uses globals from parts.jsx + data.jsx

function PageWrap({ children, dark, dotDensity, illust, label }) {
  return (
    <div data-screen-label={label} style={{
      width: '100%',
      minHeight: '100%',
      background: dark ? '#0e1822' : '#ffffff',
      color: dark ? '#e8f1fa' : '#3a5a82',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'var(--font-jp)',
    }}>
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>);

}

// ─────────────────────── HOME ───────────────────────
function HomePage({ dark, dotDensity, illust, accent }) {
  const newReviews = REVIEWS.slice(0, 5);
  const top3 = [...REVIEWS].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const archive = REVIEWS.slice(0, 6);
  const [favCat, setFavCat] = React.useState('すべて');
  const [liked, setLiked] = React.useState({});
  const cardBg = dark ? 'rgba(20,36,54,0.6)' : '#fff';
  const border = dark ? '1px solid rgba(168,200,232,0.15)' : '1px solid rgba(168,200,232,0.4)';

  return (
    <PageWrap dark={dark} dotDensity={dotDensity} illust={illust} label="01 home">
      <SiteHeader active="home" dark={dark} illust={illust} />
      {/* HERO */}
      <section style={{ padding: '20px 40px 40px', display: 'grid', gridTemplateColumns: '220px 1fr 240px', gap: 24, alignItems: 'start' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontStyle: 'italic', color: accent, lineHeight: 1, marginLeft: 14 }}>my</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 700, lineHeight: 1, color: dark ? '#e8f1fa' : '#3a5a82', whiteSpace: 'nowrap', marginTop: 6 }}>
            <span style={{ fontFamily: '"RocknRoll One", "M PLUS Rounded 1c", sans-serif', fontSize: 52, letterSpacing: '-1px', color: '#1f5fa8' }}>カルピス</span>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontStyle: 'italic', color: accent, lineHeight: 1, marginTop: 10, marginLeft: 14 }}>review</div>
          <Underline width={140} color={accent} style={{ marginTop: 8 }} />
          <p style={{ fontSize: 12, marginTop: 16, lineHeight: 1.8, color: dark ? '#b8c8d8' : '#6a8aa8' }}>
            カルピスがだいすきなぼくの<br />
            カルピスレビュー記録サイト
          </p>
        </div>
        {/* hero photo + speech */}
        <div style={{ position: 'relative' }}>
          {illust && <WashiTape width={70} color={accent} style={{ position: 'absolute', top: -10, left: 40, transform: 'rotate(-8deg)', zIndex: 2 }} />}
          {illust && <WashiTape width={70} color={accent} style={{ position: 'absolute', top: -10, right: 40, transform: 'rotate(6deg)', zIndex: 2 }} />}
          <div style={{
            background: dark ? '#1a2838' : '#fff',
            border, borderRadius: 24, padding: 24, height: 240,
            position: 'relative',
            backgroundImage: dark ? 'none' : 'linear-gradient(135deg, #fefdfb 0%, #f0f6fc 100%)'
          }}>
            <ProductPhoto variant="pet" tint="#eaf4fc" accent={accent} label="hero" height={192} />
            {illust &&
            <div style={{ position: 'absolute', right: 30, top: 50 }}>
                <SpeechBubble color={dark ? '#1a2838' : '#fff'} stroke={accent}>
                  シュワッと、やさしく。<br />しあわせな味。<br />
                  <span style={{ fontSize: 11, color: accent }}>やっぱり定番がいちばん好き♡</span>
                </SpeechBubble>
              </div>
            }
            {illust && <BearDoodle size={70} style={{ position: 'absolute', bottom: -10, right: 100, color: accent }} />}
          </div>
        </div>
        {/* about me card */}
        <div style={{ ...{
            background: cardBg, border, borderRadius: 20, padding: 18, position: 'relative', borderStyle: "solid", borderColor: "rgba(168, 200, 232, 0.4)", borderImage: "initial", borderWidth: "0.909091px 0px 0.909091px 0.909091px"
          }, border: "0.909091px solid rgba(168, 200, 232, 0.4)" }}>
          {illust && <WashiTape width={50} color={accent} style={{ position: 'absolute', top: -10, left: 20, transform: 'rotate(-4deg)' }} />}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#fde0e6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d878a0' }}>
              {illust ? <BearDoodle size={36} /> : '👨'}
            </div>
            <div style={{
              background: accent, color: '#fff', fontSize: 11,
              padding: '4px 12px', borderRadius: 12, fontFamily: 'var(--font-display)'
            }}>about me</div>
          </div>
          <p style={{ fontSize: 11, lineHeight: 1.8, color: dark ? '#b8c8d8' : '#6a8aa8' }}>
            カルピスがだいすきな<br />
            ごく普通のサラリーマン。<br />
            新商品から期間限定まで、<br />
            いろんなカルピスを飲んで<br />
            正直レビューしてます☺
          </p>
          <button style={{
            marginTop: 10, padding: '6px 14px', fontSize: 11,
            background: 'transparent', border: `1px solid ${accent}`,
            color: accent, borderRadius: 999, cursor: 'pointer', fontFamily: 'var(--font-display)'
          }}>view more →</button>
        </div>
      </section>

      {/* NEW REVIEWS */}
      <section style={{ padding: '0 40px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: accent, fontStyle: 'italic', margin: 0 }}>
            new review <Underline width={50} color={accent} style={{ verticalAlign: 'middle', marginLeft: 4 }} />
          </h2>
          <div style={{ display: 'flex', gap: 8 }}>
            {['すべて', '定番', '期間限定', 'コラボ', 'その他'].map((c) =>
            <button key={c}
            onClick={() => setFavCat(c)}
            style={{
              fontSize: 11, padding: '5px 14px', borderRadius: 999,
              border: favCat === c ? 'none' : `1px solid ${dark ? '#3a5a82' : '#cfe0f0'}`,
              background: favCat === c ? accent : 'transparent',
              color: favCat === c ? '#fff' : dark ? '#b8c8d8' : '#6a8aa8',
              cursor: 'pointer', fontFamily: 'var(--font-jp)'
            }}>{c}</button>
            )}
          </div>
          <a style={{ fontSize: 12, color: accent, fontFamily: 'var(--font-display)' }}>review archive →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
          {newReviews.
          filter((r) => favCat === 'すべて' || r.cat === favCat).
          map((r) =>
          <ReviewCard key={r.id} r={r} liked={liked[r.id]} onLike={() => setLiked((s) => ({ ...s, [r.id]: !s[r.id] }))} dark={dark} accent={accent} illust={illust} />
          )}
        </div>
      </section>

      {/* RANKING */}
      <section style={{ padding: '20px 40px 40px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: accent, fontStyle: 'italic', margin: '0 0 16px' }}>
            ranking <span style={{ fontSize: 16 }}>♔</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {top3.map((r, i) =>
            <div key={r.id} style={{ position: 'relative', background: cardBg, border, borderRadius: 18, padding: 14, overflow: 'visible' }}>
                <div style={{
                position: 'absolute', top: -22, left: 10, zIndex: 5,
                fontFamily: 'var(--font-display)', fontSize: 32, fontStyle: 'italic',
                color: accent, fontWeight: 700,
                lineHeight: 1,
                pointerEvents: 'none'
              }}>No.{i + 1}</div>
                <ProductPhoto variant={r.variant} tint={r.tint} accent={r.accent} label={r.name} height={120} />
                <div style={{ marginTop: 8 }}>
                  <HeartsRating value={r.rating} size={11} color={accent} />
                </div>
                <p style={{ fontSize: 11, lineHeight: 1.6, marginTop: 6, color: dark ? '#b8c8d8' : '#5a7a98' }}>{r.oneLiner}</p>
                <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                  {r.tags.slice(0, 3).map((t) =>
                <span key={t} style={{ fontSize: 9, color: accent, opacity: 0.8 }}>#{t}</span>
                )}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* favorite card */}
        <div style={{
          background: cardBg, border, borderRadius: 20, padding: 18, position: 'relative'
        }}>
          <div style={{
            display: 'inline-block', background: accent, color: '#fff',
            fontFamily: 'var(--font-display)', fontSize: 12, fontStyle: 'italic',
            padding: '4px 14px', borderRadius: 12, marginBottom: 10
          }}>my favorite</div>
          <PhotoPlaceholder height={120} label="my favorite shot" tint="#eaf4fc" />
          <p style={{ fontSize: 11, lineHeight: 1.7, marginTop: 10, color: dark ? '#b8c8d8' : '#6a8aa8' }}>
            やっぱり定番のカルピスがいちばん！どんなときも やさしくしてくれる最高の味です。
          </p>
          {illust && <BearSitting size={50} style={{ position: 'absolute', bottom: 8, right: 8, color: accent, opacity: 0.6 }} />}
        </div>
      </section>

      {/* REVIEW ARCHIVE strip */}
      <section style={{ padding: '0 40px 40px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: accent, fontStyle: 'italic', margin: '0 0 12px' }}>
          review archive
        </h2>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
          {['すべて', '2024', '2023', '2022', '2021', '2020', 'それ以前'].map((y, i) =>
          <button key={y} style={{
            fontSize: 11, padding: '5px 14px', borderRadius: 999,
            background: i === 0 ? accent : 'transparent',
            border: i === 0 ? 'none' : `1px solid ${dark ? '#3a5a82' : '#cfe0f0'}`,
            color: i === 0 ? '#fff' : dark ? '#b8c8d8' : '#6a8aa8',
            cursor: 'pointer', fontFamily: 'var(--font-jp)'
          }}>{y}</button>
          )}
        </div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
          {['すべて', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'].map((m, i) =>
          <button key={m} style={{
            fontSize: 10, padding: '4px 10px', borderRadius: 999,
            background: i === 0 ? '#dbeaf7' : 'transparent',
            border: `1px solid ${dark ? '#3a5a82' : '#dbeaf7'}`,
            color: dark ? '#b8c8d8' : '#6a8aa8',
            cursor: 'pointer', fontFamily: 'var(--font-jp)'
          }}>{m}</button>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
          {archive.map((r) =>
          <div key={r.id} style={{ borderRadius: 12, overflow: 'hidden' }}>
              <ProductPhoto variant={r.variant} tint={r.tint} accent={r.accent} label={r.name} height={140} />
              <div style={{ padding: '6px 4px' }}>
                <div style={{ fontSize: 10, color: dark ? '#b8c8d8' : '#7a98b8' }}>{r.date}</div>
                <div style={{ fontSize: 11, fontWeight: 600, marginTop: 2, color: dark ? '#e8f1fa' : '#3a5a82' }}>『{r.name}』</div>
                <div style={{ fontSize: 10, color: dark ? '#a8b8c8' : '#7a98b8', marginTop: 1, lineHeight: 1.4 }}>{r.oneLiner}</div>
              </div>
            </div>
          )}
        </div>
      </section>

      <SiteFooter dark={dark} variant="home" />
    </PageWrap>);

}

// ─────────────────────── REVIEW CARD ───────────────────────
function ReviewCard({ r, liked, onLike, dark, accent, illust, compact = false }) {
  const cardBg = dark ? 'rgba(20,36,54,0.6)' : '#fff';
  const border = dark ? '1px solid rgba(168,200,232,0.15)' : '1px solid rgba(168,200,232,0.4)';
  return (
    <div style={{
      background: cardBg, border, borderRadius: 14, padding: 8,
      position: 'relative', cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
      
      <div style={{ position: 'relative' }}>
        <ProductPhoto variant={r.variant} tint={r.tint} accent={r.accent} label={r.name} height={130} />
        <div style={{
          position: 'absolute', top: 8, left: 8, background: 'rgba(255,255,255,0.85)',
          borderRadius: 6, padding: '2px 6px', fontSize: 10, color: '#3a5a82',
          fontFamily: 'var(--font-display)', lineHeight: 1.2
        }}>
          {r.date.split('.').slice(0, 2).join('.')}<br />
          <span style={{ fontSize: 9 }}>{r.date.split('.')[2]}</span>
        </div>
        {r.badge &&
        <div style={{
          position: 'absolute', top: 0, right: 0, background: accent, color: '#fff',
          fontSize: 9, padding: '3px 10px', fontFamily: 'var(--font-display)',
          fontStyle: 'italic', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 8px 100%, 0 70%)'
        }}>{r.badge}</div>
        }
      </div>
      <div style={{ padding: '8px 4px 4px' }}>
        <HeartsRating value={r.rating} size={11} color={accent} />
        <div style={{ fontSize: 12, fontWeight: 700, marginTop: 4, color: dark ? '#e8f1fa' : '#3a5a82' }}>『{r.name}』</div>
        <div style={{ fontSize: 10, lineHeight: 1.5, marginTop: 2, color: dark ? '#a8b8c8' : '#6a8aa8' }}>{r.oneLiner}</div>
        <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {r.tags.slice(0, 3).map((t) =>
            <span key={t} style={{ fontSize: 9, color: accent, opacity: 0.75 }}>#{t}</span>
            )}
          </div>
          <button onClick={(e) => {e.stopPropagation();onLike && onLike();}}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <HeartIcon filled={liked} size={13} color={liked ? '#e88aa8' : dark ? '#5a7a98' : '#a8c0d8'} />
          </button>
        </div>
      </div>
    </div>);

}

// ─────────────────────── REVIEW LIST ───────────────────────
function ReviewListPage({ dark, dotDensity, illust, accent }) {
  const [cat, setCat] = React.useState('すべて');
  const [moods, setMoods] = React.useState([]);
  const [seasons, setSeasons] = React.useState([]);
  const [sort, setSort] = React.useState('新着順');
  const [view, setView] = React.useState('grid');
  const [liked, setLiked] = React.useState({});

  let list = REVIEWS.filter((r) => cat === 'すべて' || r.cat === cat);
  if (moods.length) list = list.filter((r) => r.mood.some((m) => moods.includes(m)));
  if (seasons.length) list = list.filter((r) => seasons.includes(r.season));
  if (sort === '評価順') list = [...list].sort((a, b) => b.rating - a.rating);

  const cardBg = dark ? 'rgba(20,36,54,0.6)' : '#fff';
  const border = dark ? '1px solid rgba(168,200,232,0.15)' : '1px solid rgba(168,200,232,0.4)';

  const counts = (key, val) => REVIEWS.filter((r) => r[key] === val).length;
  const moodCount = (m) => REVIEWS.filter((r) => r.mood.includes(m)).length;
  const seasonCount = (s) => REVIEWS.filter((r) => r.season === s).length;

  const toggle = (arr, set, v) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  return (
    <PageWrap dark={dark} dotDensity={dotDensity} illust={illust} label="03 review-list">
      <SiteHeader active="review" dark={dark} illust={illust} />
      <section style={{ padding: '0 40px 20px' }}>
        <div style={{ fontSize: 11, color: dark ? '#a8b8c8' : '#7a98b8', marginBottom: 8 }}>
          home <span style={{ margin: '0 6px' }}>›</span> review
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontStyle: 'italic', color: accent, margin: 0, lineHeight: 1 }}>review</h1>
            <p style={{ fontSize: 12, marginTop: 8, color: dark ? '#b8c8d8' : '#6a8aa8' }}>これまでに飲んだカルピスたちのレビュー一覧です。</p>
          </div>
          {illust &&
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <SpeechBubble color={dark ? '#1a2838' : '#fff'} stroke={accent}>
                気になるカルピスを<br />見つけてね♡
              </SpeechBubble>
              <BearSitting size={70} style={{ color: accent }} />
            </div>
          }
          <div style={{
            marginLeft: 'auto',
            background: cardBg, border, borderRadius: 14,
            padding: '12px 24px', textAlign: 'center'
          }}>
            <div style={{ fontSize: 11, color: dark ? '#a8b8c8' : '#7a98b8' }}>みつけた数</div>
            <div style={{ fontSize: 36, fontFamily: 'var(--font-display)', fontWeight: 700, color: accent, lineHeight: 1 }}>{REVIEWS.length}</div>
            <div style={{ fontSize: 10, color: dark ? '#a8b8c8' : '#7a98b8' }}>種類</div>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 40px 40px', display: 'grid', gridTemplateColumns: '180px 1fr', gap: 24 }}>
        {/* SIDEBAR */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <FilterGroup title="カテゴリ" dark={dark} accent={accent}>
            {['すべて', '定番', '期間限定', 'コラボ', 'その他'].map((c) =>
            <FilterRow key={c} active={cat === c} onClick={() => setCat(c)}
            label={c} count={c === 'すべて' ? REVIEWS.length : counts('cat', c)} dark={dark} accent={accent} />
            )}
          </FilterGroup>
          <FilterGroup title="味のタイプ" dark={dark} accent={accent}>
            {window.MOODS.map((m) =>
            <FilterCheck key={m} checked={moods.includes(m)} onClick={() => toggle(moods, setMoods, m)}
            label={m} count={moodCount(m)} dark={dark} accent={accent} />
            )}
          </FilterGroup>
          <FilterGroup title="季節" dark={dark} accent={accent}>
            {window.SEASONS.map((s) =>
            <FilterCheck key={s} checked={seasons.includes(s)} onClick={() => toggle(seasons, setSeasons, s)}
            label={s} count={seasonCount(s)} dark={dark} accent={accent} />
            )}
          </FilterGroup>
          {illust &&
          <div style={{ position: 'relative', marginTop: 8 }}>
              <BearSitting size={56} style={{ color: accent, opacity: 0.7 }} />
              <SpeechBubble style={{ position: 'absolute', left: 50, top: 0, fontSize: 10 }} color={dark ? '#1a2838' : '#fff'} stroke={accent}>
                どれもおいしいよ〜！
              </SpeechBubble>
            </div>
          }
        </aside>

        {/* GRID */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: dark ? '#b8c8d8' : '#6a8aa8' }}>{list.length}件の商品</div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: dark ? '#a8b8c8' : '#7a98b8' }}>並び替え：</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}
              style={{
                fontSize: 11, padding: '4px 10px', borderRadius: 999,
                border: `1px solid ${dark ? '#3a5a82' : '#cfe0f0'}`,
                background: cardBg, color: dark ? '#e8f1fa' : '#3a5a82',
                fontFamily: 'var(--font-jp)'
              }}>
                <option>新着順</option><option>評価順</option>
              </select>
              <span style={{ fontSize: 11, color: dark ? '#a8b8c8' : '#7a98b8' }}>表示：</span>
              <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: `1px solid ${dark ? '#3a5a82' : '#cfe0f0'}` }}>
                <button onClick={() => setView('grid')}
                style={{ padding: '4px 10px', fontSize: 11, background: view === 'grid' ? accent : 'transparent', color: view === 'grid' ? '#fff' : dark ? '#a8b8c8' : '#7a98b8', border: 'none', cursor: 'pointer' }}>▦</button>
                <button onClick={() => setView('list')}
                style={{ padding: '4px 10px', fontSize: 11, background: view === 'list' ? accent : 'transparent', color: view === 'list' ? '#fff' : dark ? '#a8b8c8' : '#7a98b8', border: 'none', cursor: 'pointer' }}>☰</button>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: view === 'grid' ? 'repeat(6, 1fr)' : '1fr', gap: 12 }}>
            {list.slice(0, 18).map((r) =>
            <ReviewCard key={r.id} r={r} liked={liked[r.id]} onLike={() => setLiked((s) => ({ ...s, [r.id]: !s[r.id] }))} dark={dark} accent={accent} illust={illust} />
            )}
          </div>
          {/* pagination */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
            <button style={{ width: 30, height: 30, borderRadius: '50%', border: 'none', background: 'transparent', color: dark ? '#a8b8c8' : '#7a98b8', cursor: 'pointer' }}>‹</button>
            {[1, 2, 3].map((p) =>
            <button key={p} style={{
              width: 30, height: 30, borderRadius: '50%', border: 'none',
              background: p === 1 ? accent : 'transparent',
              color: p === 1 ? '#fff' : dark ? '#a8b8c8' : '#7a98b8',
              cursor: 'pointer', fontSize: 12
            }}>{p}</button>
            )}
            <button style={{ width: 30, height: 30, borderRadius: '50%', border: 'none', background: 'transparent', color: dark ? '#a8b8c8' : '#7a98b8', cursor: 'pointer' }}>›</button>
          </div>
        </div>
      </section>
      <SiteFooter dark={dark} variant="review-list" illust={illust} />
    </PageWrap>);

}

function FilterGroup({ title, children, dark, accent }) {
  return (
    <div style={{
      background: dark ? 'rgba(20,36,54,0.4)' : '#fff',
      border: dark ? '1px solid rgba(168,200,232,0.15)' : '1px solid rgba(168,200,232,0.3)',
      borderRadius: 14, padding: 12
    }}>
      <h4 style={{ fontSize: 12, fontWeight: 600, color: dark ? '#e8f1fa' : '#3a5a82', margin: '0 0 8px' }}>{title}</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>{children}</div>
    </div>);

}
function FilterRow({ active, onClick, label, count, dark, accent }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '4px 8px', fontSize: 12, borderRadius: 8, border: 'none',
      background: active ? dark ? 'rgba(168,200,232,0.15)' : '#eaf2f9' : 'transparent',
      color: active ? accent : dark ? '#b8c8d8' : '#5a7a98',
      cursor: 'pointer', fontFamily: 'var(--font-jp)', textAlign: 'left'
    }}>
      <span>{active && '✓ '}{label}</span>
      <span style={{ fontSize: 10, opacity: 0.7 }}>({count})</span>
    </button>);

}
function FilterCheck({ checked, onClick, label, count, dark, accent }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '4px 8px', fontSize: 12, borderRadius: 8, border: 'none',
      background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-jp)', textAlign: 'left',
      color: dark ? '#b8c8d8' : '#5a7a98'
    }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <span style={{
          width: 12, height: 12, borderRadius: 3, border: `1.5px solid ${checked ? accent : '#cfe0f0'}`,
          background: checked ? accent : 'transparent', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 9
        }}>{checked ? '✓' : ''}</span>
        {label}
      </span>
      <span style={{ fontSize: 10, opacity: 0.6 }}>{count}</span>
    </button>);

}

Object.assign(window, { HomePage, ReviewListPage, ReviewCard, PageWrap });