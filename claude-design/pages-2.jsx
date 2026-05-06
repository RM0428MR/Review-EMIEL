// pages-2.jsx — Review Detail, Ranking, Archive, Contact

// ─────────────────────── REVIEW DETAIL ───────────────────────
function ReviewDetailPage({ dark, dotDensity, illust, accent, reviewId = 'rich' }) {
  const r = REVIEWS.find(x => x.id === reviewId) || REVIEWS[0];
  const similar = REVIEWS.filter(x => x.id !== r.id && (x.cat === r.cat || x.tags.some(t => r.tags.includes(t)))).slice(0, 3);
  const cardBg = dark ? 'rgba(20,36,54,0.6)' : '#fff';
  const border = dark ? '1px solid rgba(168,200,232,0.15)' : '1px solid rgba(168,200,232,0.4)';
  const subRatings = r.sub || { 甘さ: 4.5, 濃さ: 5.0, さっぱり感: 3.5, ミルク感: 5.0, リピしたい度: 5.0 };
  const info = r.info || { 発売日: '2024年4月16日', 内容量: '470ml', タイプ: '乳酸飲料' };
  const [thumb, setThumb] = React.useState(0);
  const [fav, setFav] = React.useState(false);
  const [drinkMethod, setDrinkMethod] = React.useState('そのまま');

  return (
    <PageWrap dark={dark} dotDensity={dotDensity} illust={illust} label="04 review-detail">
      <SiteHeader active="review" dark={dark} illust={illust} />
      <div style={{ padding: '0 40px 8px', fontSize: 11, color: dark ? '#a8b8c8' : '#7a98b8' }}>
        home <span style={{ margin: '0 6px' }}>›</span> review <span style={{ margin: '0 6px' }}>›</span> {r.name}
      </div>
      <section style={{ padding: '0 40px 40px', display: 'grid', gridTemplateColumns: '380px 1fr 280px', gap: 28, alignItems: 'start' }}>
        {/* IMAGE COL */}
        <div>
          <div style={{ position: 'relative', background: cardBg, border, borderRadius: 18, padding: 20 }}>
            {r.badge && illust && (
              <div style={{ position: 'absolute', top: 14, left: -6, background: accent, color: '#fff', padding: '4px 14px', fontSize: 11, fontFamily: 'var(--font-display)', fontStyle: 'italic', clipPath: 'polygon(0 0, 100% 0, 92% 50%, 100% 100%, 0 100%)' }}>{r.badge}</div>
            )}
            <ProductPhoto variant={r.variant} tint={r.tint} accent={r.accent} label={r.name} height={280} />
            {illust && (
              <SpeechBubble style={{ position: 'absolute', top: 30, right: 20, fontSize: 11 }} color={dark ? '#1a2838' : '#fff'} stroke={accent}>
                濃くてまろやか、<br/>幸せ…！
              </SpeechBubble>
            )}
            {illust && <BearDoodle size={60} style={{ position: 'absolute', bottom: 0, left: 10, color: accent }} />}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 12 }}>
            {[0,1,2,3].map(i => (
              <button key={i} onClick={() => setThumb(i)} style={{
                padding: 0, border: thumb === i ? `2px solid ${accent}` : '1px solid #e0e8f0',
                borderRadius: 8, overflow: 'hidden', cursor: 'pointer', background: 'transparent',
              }}>
                <ProductPhoto variant={r.variant} tint={r.tint} accent={r.accent} label="" height={56} />
              </button>
            ))}
          </div>
          {illust && (
            <div style={{ marginTop: 14, position: 'relative' }}>
              <SpeechBubble color={dark ? '#1a2838' : '#fff'} stroke={accent}>
                <span style={{ fontSize: 12 }}>一言まとめ</span><br/>
                <strong style={{ fontSize: 13 }}>いつものより濃くて贅沢な味わい。</strong><br/>
                特別な日に飲みたいご褒美カルピス！
              </SpeechBubble>
            </div>
          )}
        </div>

        {/* CENTER — review body */}
        <div>
          <div style={{ fontSize: 11, color: dark ? '#a8b8c8' : '#7a98b8' }}>{r.date}</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: dark ? '#e8f1fa' : '#3a5a82', margin: '8px 0 12px', fontFamily: 'var(--font-jp)' }}>
            カルピス {r.name}
          </h1>
          <HeartsRating value={r.rating} size={20} color={accent} />
          <h2 style={{ fontSize: 22, color: accent, marginTop: 18, fontFamily: 'var(--font-jp)' }}>{r.oneLiner}</h2>
          <p style={{ fontSize: 13, lineHeight: 2, color: dark ? '#c8d8e8' : '#5a7a98', marginTop: 14 }}>
            {r.body || 'ひと口目からいつもよりまろやかで、しっかり満足感あり！甘さもやさしく、後味すっきり。お風呂あがりに飲むと最高。'}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24, alignItems: 'start' }}>
            {/* sub ratings */}
            <div style={{ borderTop: `1px dashed ${accent}`, paddingTop: 14 }}>
              {Object.entries(subRatings).map(([k, v]) => (
                <div key={k} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 30px', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: dark ? '#b8c8d8' : '#5a7a98' }}>{k}</span>
                  <span><HeartsRating value={v} size={12} color={accent} showValue={false} /></span>
                  <span style={{ fontSize: 11, color: accent, fontFamily: 'var(--font-display)' }}>{v.toFixed(1)}</span>
                </div>
              ))}
            </div>
            {/* drink method */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: dark ? '#e8f1fa' : '#3a5a82', marginBottom: 10 }}>おすすめの飲み方</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {[
                  { k: 'そのまま', icon: '🥛' },
                  { k: '氷を入れて', icon: '🧊' },
                  { k: '牛乳で割って', icon: '🥛' },
                ].map(o => (
                  <button key={o.k} onClick={() => setDrinkMethod(o.k)} style={{
                    border: drinkMethod === o.k ? `2px solid ${accent}` : `1px solid ${dark ? '#3a5a82' : '#dbeaf7'}`,
                    background: drinkMethod === o.k ? (dark ? 'rgba(168,200,232,0.15)' : '#eaf4fc') : 'transparent',
                    borderRadius: 10, padding: '10px 4px', cursor: 'pointer',
                    fontSize: 10, color: dark ? '#b8c8d8' : '#5a7a98', fontFamily: 'var(--font-jp)',
                  }}>
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{illust ? o.icon : '○'}</div>
                    {o.k}
                  </button>
                ))}
              </div>
              {illust && (
                <div style={{ marginTop: 10, fontSize: 11, color: accent, fontFamily: 'var(--font-jp)', textAlign: 'center' }}>
                  <BearDoodle size={28} style={{ verticalAlign: 'middle', marginRight: 4, color: accent }} />
                  キンキンに冷やしてそのままが一番すき！
                </div>
              )}
            </div>
          </div>

          {/* similar */}
          <h3 style={{ fontSize: 14, fontWeight: 600, marginTop: 32, color: dark ? '#e8f1fa' : '#3a5a82' }}>似ているかも？？</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 10 }}>
            {similar.map(s => (
              <div key={s.id} style={{ background: cardBg, border, borderRadius: 12, padding: 8, cursor: 'pointer' }}>
                <ProductPhoto variant={s.variant} tint={s.tint} accent={s.accent} label={s.name} height={90} />
                <div style={{ fontSize: 11, fontWeight: 600, marginTop: 6, color: dark ? '#e8f1fa' : '#3a5a82' }}>カルピス {s.name}</div>
                <div style={{ fontSize: 10, color: dark ? '#a8b8c8' : '#7a98b8', marginTop: 2 }}>{s.oneLiner}</div>
                <div style={{ marginTop: 4 }}><HeartsRating value={s.rating} size={10} color={accent} /></div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — product info */}
        <aside style={{ background: cardBg, border, borderRadius: 18, padding: 18, position: 'relative' }}>
          {illust && <WashiTape width={50} color={accent} style={{ position: 'absolute', top: -10, left: 20, transform: 'rotate(-4deg)' }} />}
          <h3 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 16, color: accent, margin: '0 0 12px' }}>Product Info</h3>
          <div style={{ borderRadius: 12, background: dark ? 'rgba(168,200,232,0.05)' : '#f4faff', padding: 14, marginBottom: 14 }}>
            <ProductPhoto variant={r.variant} tint={r.tint} accent={r.accent} label={r.name} height={120} />
          </div>
          {Object.entries(info).map(([k, v]) => (
            <div key={k} style={{ display: 'grid', gridTemplateColumns: '70px 1fr', fontSize: 11, padding: '6px 0', borderBottom: '1px dashed rgba(168,200,232,0.3)' }}>
              <span style={{ color: dark ? '#a8b8c8' : '#7a98b8' }}>{k}</span>
              <span style={{ color: dark ? '#e8f1fa' : '#3a5a82' }}>{v}</span>
            </div>
          ))}
          <button style={{
            width: '100%', marginTop: 12, padding: '6px 12px', fontSize: 11,
            background: 'transparent', border: `1px solid ${accent}`,
            color: accent, borderRadius: 999, cursor: 'pointer', fontFamily: 'var(--font-display)',
          }}>公式サイト →</button>
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 10, color: dark ? '#a8b8c8' : '#7a98b8', marginBottom: 6 }}>タグ</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {r.tags.map(t => (
                <span key={t} style={{
                  fontSize: 10, padding: '3px 10px', borderRadius: 999,
                  background: dark ? 'rgba(168,200,232,0.1)' : '#eaf4fc', color: accent,
                }}>#{t}</span>
              ))}
            </div>
          </div>
          <button onClick={() => setFav(!fav)} style={{
            width: '100%', marginTop: 14, padding: '10px', fontSize: 12,
            background: fav ? accent : 'transparent', color: fav ? '#fff' : accent,
            border: `1.5px solid ${accent}`, borderRadius: 999, cursor: 'pointer',
            fontFamily: 'var(--font-jp)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <HeartIcon filled={fav} size={14} color={fav ? '#fff' : accent} />
            お気に入りに追加
          </button>
        </aside>
      </section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px 30px' }}>
        <a style={{ fontSize: 13, color: accent, textDecoration: 'none', fontFamily: 'var(--font-jp)' }}>← 一覧に戻る</a>
        {illust && (
          <SpeechBubble color={dark ? '#1a2838' : '#fff'} stroke={accent}>
            みつけてくれてありがとう〜！
          </SpeechBubble>
        )}
      </div>
      <SiteFooter dark={dark} variant="review-detail" illust={illust} />
    </PageWrap>
  );
}

// ─────────────────────── RANKING ───────────────────────
function RankingPage({ dark, dotDensity, illust, accent }) {
  const top3 = [...REVIEWS].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const themes = [
    { title: 'さっぱり系', sub: 'ゴクゴク飲める！きっぱりおいしいカルピス', icon: '🥤', items: REVIEWS.filter(r => r.mood.includes('さっぱり')).slice(0, 3) },
    { title: '甘い系',   sub: '甘くてまろやか！幸せになれる味わい',       icon: '♡', items: REVIEWS.filter(r => r.mood.includes('甘め') || r.mood.includes('濃厚')).slice(0, 3) },
    { title: '夏に飲みたい！', sub: '暑い日にぴったりな爽やかカルピス',    icon: '☀',  items: REVIEWS.filter(r => r.season === '夏').slice(0, 3) },
    { title: '限定・コラボ', sub: '出会えたらラッキー♡特別なカルピスたち', icon: '✦',  items: REVIEWS.filter(r => r.cat === 'コラボ' || r.cat === '期間限定').slice(0, 3) },
  ];
  const cardBg = dark ? 'rgba(20,36,54,0.6)' : '#fff';
  const border = dark ? '1px solid rgba(168,200,232,0.15)' : '1px solid rgba(168,200,232,0.4)';

  return (
    <PageWrap dark={dark} dotDensity={dotDensity} illust={illust} label="05 ranking">
      <SiteHeader active="ranking" dark={dark} illust={illust} />
      <section style={{ padding: '0 40px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, alignItems: 'center' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 56, color: accent, margin: 0, lineHeight: 1 }}>
            ranking <span style={{ fontSize: 28 }}>♔</span>
          </h1>
          <p style={{ fontSize: 12, marginTop: 8, color: dark ? '#b8c8d8' : '#6a8aa8' }}>
            これまで飲んできたカルピスたちの<br/>中から、特にお気に入りをランキングにしました！
          </p>
        </div>
        {illust && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <BearSitting size={70} style={{ color: accent }} />
            <SpeechBubble color={dark ? '#1a2838' : '#fff'} stroke={accent}>
              どの子もおいしくて<br/>本当に迷っちゃう…！
            </SpeechBubble>
          </div>
        )}
        <div style={{ background: cardBg, border, borderRadius: 14, padding: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: accent, marginBottom: 6 }}>♔ rankingについて</div>
          <p style={{ fontSize: 11, lineHeight: 1.6, color: dark ? '#b8c8d8' : '#6a8aa8', margin: 0 }}>
            評価は「味のおいしさ」「飲みやすさ」「特別感」「リピートしたさ」の4つのポイントをもとに、5.0点満点でつけています。
          </p>
        </div>
      </section>

      {/* TOP 3 */}
      <section style={{ padding: '0 40px 30px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
        {top3.map((r, i) => (
          <div key={r.id} style={{
            background: cardBg, border: i === 0 ? `2px solid ${accent}` : border, borderRadius: 18,
            padding: 18, position: 'relative', display: 'grid', gridTemplateColumns: '120px 1fr', gap: 14, alignItems: 'center',
          }}>
            <div style={{
              position: 'absolute', top: -22, left: 10, zIndex: 5,
              fontFamily: 'var(--font-display)', fontSize: 36, fontStyle: 'italic',
              color: accent, fontWeight: 700, lineHeight: 1,
              pointerEvents: 'none',
            }}>No.{i + 1}</div>
            <ProductPhoto variant={r.variant} tint={r.tint} accent={r.accent} label={r.name} height={140} />
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: dark ? '#e8f1fa' : '#3a5a82', margin: '0 0 6px', fontFamily: 'var(--font-jp)' }}>カルピス {r.name}</h3>
              <HeartsRating value={r.rating} size={12} color={accent} />
              <p style={{ fontSize: 11, lineHeight: 1.6, marginTop: 8, color: dark ? '#b8c8d8' : '#5a7a98' }}>{r.oneLiner}</p>
              <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                {r.tags.slice(0, 3).map(t => (
                  <span key={t} style={{ fontSize: 9, color: accent, opacity: 0.75 }}>#{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* THEME RANKINGS */}
      <section style={{ padding: '0 40px 30px' }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: accent, marginBottom: 14, fontFamily: 'var(--font-jp)' }}>
          ✦ テーマ別ランキング
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {themes.map(theme => (
            <div key={theme.title} style={{ background: cardBg, border, borderRadius: 14, padding: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: dark ? '#e8f1fa' : '#3a5a82', fontFamily: 'var(--font-jp)' }}>
                <span style={{ marginRight: 6 }}>{theme.icon}</span>{theme.title}
              </div>
              <div style={{ fontSize: 10, color: dark ? '#a8b8c8' : '#7a98b8', marginTop: 4, marginBottom: 10 }}>{theme.sub}</div>
              {theme.items.map((r, i) => (
                <div key={r.id} style={{ display: 'grid', gridTemplateColumns: '20px 28px 1fr auto', gap: 8, alignItems: 'center', padding: '6px 0', borderBottom: '1px dashed rgba(168,200,232,0.3)' }}>
                  <span style={{ fontSize: 14, fontFamily: 'var(--font-display)', fontStyle: 'italic', color: accent, fontWeight: 700 }}>{i + 1}</span>
                  <ProductPhoto variant={r.variant} tint={r.tint} accent={r.accent} label="" height={28} bgTone={dark ? '#1a2838' : '#f0f6fc'} />
                  <span style={{ fontSize: 11, color: dark ? '#e8f1fa' : '#3a5a82' }}>カルピス {r.name}</span>
                  <HeartsRating value={r.rating} size={9} color={accent} />
                </div>
              ))}
              <button style={{
                marginTop: 8, padding: '4px 12px', fontSize: 10,
                background: 'transparent', border: `1px solid ${accent}`,
                color: accent, borderRadius: 999, cursor: 'pointer', fontFamily: 'var(--font-jp)',
              }}>もっと見る →</button>
            </div>
          ))}
        </div>
      </section>

      {/* MY FAVORITE */}
      <section style={{ padding: '0 40px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ background: cardBg, border, borderRadius: 18, padding: 16, display: 'grid', gridTemplateColumns: '70px 1fr', gap: 14, alignItems: 'center', position: 'relative' }}>
          {illust && <BearDoodle size={60} style={{ color: accent }} />}
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: accent }}>my favorite ♡</div>
            <p style={{ fontSize: 11, lineHeight: 1.6, color: dark ? '#b8c8d8' : '#5a7a98', margin: '6px 0 0' }}>
              やっぱり、No.1の<br/>「カルピス {top3[0].name}」が特別！<br/>
              この濃さとコクは唯一無二〜
            </p>
          </div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #c8e0f3 0%, #eaf4fc 100%)',
          borderRadius: 18, padding: 16, position: 'relative',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          {illust && <Cloud width={120} fill="rgba(255,255,255,0.5)" style={{ position: 'absolute', top: 0, right: 0 }} />}
          <p style={{ fontSize: 12, color: '#3a5a82', flex: 1, lineHeight: 1.6, position: 'relative' }}>
            あなたのおすすめも教えてね！<br/>SNSでもカルピス愛を発信中☺
          </p>
          <div style={{ display: 'flex', gap: 8, position: 'relative' }}>
            {['IG','X','YT'].map(s => (
              <div key={s} style={{ width: 32, height: 32, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: accent, fontFamily: 'var(--font-display)' }}>{s}</div>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter dark={dark} variant="ranking" illust={illust} />
    </PageWrap>
  );
}

// ─────────────────────── ARCHIVE ───────────────────────
function ArchivePage({ dark, dotDensity, illust, accent }) {
  const [mode, setMode] = React.useState('年別で見る');
  const [year, setYear] = React.useState('2024年');
  const cardBg = dark ? 'rgba(20,36,54,0.6)' : '#fff';
  const border = dark ? '1px solid rgba(168,200,232,0.15)' : '1px solid rgba(168,200,232,0.4)';
  const yearList = ['すべての年代','2024年','2023年','2022年','2021年','2020年','それ以前'];
  const byYear = (y) => REVIEWS.filter(r => r.date.startsWith(y.replace('年','')));
  const yearCount = (y) => y === 'すべての年代' ? REVIEWS.length : byYear(y).length;
  const months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];

  const filtered = byYear(year);

  return (
    <PageWrap dark={dark} dotDensity={dotDensity} illust={illust} label="06 archive">
      <SiteHeader active="archive" dark={dark} illust={illust} />
      <section style={{ padding: '0 40px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 56, color: accent, margin: 0, lineHeight: 1 }}>archive</h1>
          {illust && <BearSitting size={50} style={{ position: 'absolute', top: 4, left: 200, color: accent }} />}
          <p style={{ fontSize: 12, marginTop: 8, color: dark ? '#b8c8d8' : '#6a8aa8' }}>
            これまでにレビューしたカルピスたちを<br/>月ごと・年ごとにまとめています。
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <div style={{ display: 'inline-flex', background: cardBg, border, borderRadius: 999, padding: 4 }}>
            {['年別で見る','月別で見る'].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                padding: '6px 18px', fontSize: 12, borderRadius: 999, border: 'none',
                background: mode === m ? accent : 'transparent',
                color: mode === m ? '#fff' : (dark ? '#b8c8d8' : '#6a8aa8'),
                cursor: 'pointer', fontFamily: 'var(--font-jp)',
              }}>{m}</button>
            ))}
          </div>
          {illust && (
            <SpeechBubble color={dark ? '#1a2838' : '#fff'} stroke={accent}>
              いろんなカルピスとの<br/>思い出がいっぱい…！
            </SpeechBubble>
          )}
        </div>
        <div style={{ background: cardBg, border, borderRadius: 14, padding: '12px 24px', textAlign: 'center', justifySelf: 'end' }}>
          <div style={{ fontSize: 11, color: dark ? '#a8b8c8' : '#7a98b8' }}>レビューした数</div>
          <div style={{ fontSize: 36, fontFamily: 'var(--font-display)', fontWeight: 700, color: accent, lineHeight: 1 }}>{REVIEWS.length}</div>
          <div style={{ fontSize: 10, color: dark ? '#a8b8c8' : '#7a98b8' }}>種類</div>
        </div>
      </section>

      <section style={{ padding: '0 40px 40px', display: 'grid', gridTemplateColumns: '180px 1fr', gap: 24 }}>
        <aside style={{ background: cardBg, border, borderRadius: 14, padding: 14, alignSelf: 'start' }}>
          {yearList.map(y => (
            <button key={y} onClick={() => setYear(y === 'すべての年代' ? '' : y)} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',
              padding: '8px 12px', fontSize: 12, borderRadius: 8, border: 'none',
              background: year === y ? accent : 'transparent',
              color: year === y ? '#fff' : (dark ? '#b8c8d8' : '#5a7a98'),
              cursor: 'pointer', fontFamily: 'var(--font-jp)', marginBottom: 2,
            }}>
              <span>{y}</span>
              <span style={{ fontSize: 10, opacity: 0.8 }}>{yearCount(y)}</span>
            </button>
          ))}
          {illust && (
            <div style={{ marginTop: 14, position: 'relative', textAlign: 'center', padding: 10, fontSize: 10, color: dark ? '#a8b8c8' : '#7a98b8' }}>
              <BearDoodle size={50} style={{ color: accent }} />
              <div>気になる年を<br/>えらんでね♡</div>
            </div>
          )}
        </aside>

        <div>
          {/* 2024 */}
          <div style={{ marginBottom: 30 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
              <h3 style={{ fontSize: 22, fontWeight: 600, color: dark ? '#e8f1fa' : '#3a5a82', margin: 0, fontFamily: 'var(--font-display)' }}>2024年 〜</h3>
              <span style={{ fontSize: 11, color: accent }}>{filtered.length}件のレビュー</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
              {months.slice(0, 12).map((m, i) => {
                const item = filtered.find(r => parseInt(r.date.split('.')[1], 10) === i + 1) || filtered[i % filtered.length];
                if (!item) return null;
                return (
                  <div key={m} style={{ background: cardBg, border, borderRadius: 10, padding: 6, position: 'relative' }}>
                    <div style={{
                      position: 'absolute', top: -6, left: 6, background: '#dbeaf7',
                      color: accent, fontSize: 10, padding: '1px 8px', borderRadius: 999,
                      fontFamily: 'var(--font-jp)', fontWeight: 600,
                    }}>{m}</div>
                    <ProductPhoto variant={item.variant} tint={item.tint} accent={item.accent} label="" height={70} />
                    <div style={{ fontSize: 10, fontWeight: 600, marginTop: 4, color: dark ? '#e8f1fa' : '#3a5a82' }}>カルピス {item.name}</div>
                    <div style={{ fontSize: 9, color: dark ? '#a8b8c8' : '#7a98b8', marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
                      <span>{item.date}</span>
                      <span>♡ 1件</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* 2023 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
              <h3 style={{ fontSize: 22, fontWeight: 600, color: dark ? '#e8f1fa' : '#3a5a82', margin: 0, fontFamily: 'var(--font-display)' }}>2023年 〜</h3>
              <span style={{ fontSize: 11, color: accent }}>{byYear('2023年').length}件のレビュー</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 10 }}>
              {byYear('2023年').slice(0, 7).map(item => {
                const m = parseInt(item.date.split('.')[1], 10);
                return (
                  <div key={item.id} style={{ background: cardBg, border, borderRadius: 10, padding: 6, position: 'relative' }}>
                    <div style={{
                      position: 'absolute', top: -6, left: 6, background: '#dbeaf7',
                      color: accent, fontSize: 10, padding: '1px 8px', borderRadius: 999,
                      fontFamily: 'var(--font-jp)', fontWeight: 600,
                    }}>{m}月</div>
                    <ProductPhoto variant={item.variant} tint={item.tint} accent={item.accent} label="" height={60} />
                    <div style={{ fontSize: 10, fontWeight: 600, marginTop: 4, color: dark ? '#e8f1fa' : '#3a5a82' }}>カルピス {item.name}</div>
                    <div style={{ fontSize: 9, color: dark ? '#a8b8c8' : '#7a98b8', marginTop: 2 }}>{item.date} ♡ 1件</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <SiteFooter dark={dark} variant="archive" illust={illust} />
    </PageWrap>
  );
}

// ─────────────────────── CONTACT ───────────────────────
function ContactPage({ dark, dotDensity, illust, accent }) {
  const [form, setForm] = React.useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = React.useState({});
  const [sent, setSent] = React.useState(false);

  const cardBg = dark ? 'rgba(20,36,54,0.6)' : '#fff';
  const border = dark ? '1px solid rgba(168,200,232,0.15)' : '1px solid rgba(168,200,232,0.4)';

  const update = (k, v) => { setForm(s => ({ ...s, [k]: v })); setErrors(e => ({ ...e, [k]: null })); };
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name) er.name = 'お名前を入力してください';
    if (!form.email || !/.+@.+\..+/.test(form.email)) er.email = '正しいメールアドレスを入力してください';
    if (!form.subject) er.subject = '件名を入力してください';
    if (!form.message || form.message.length < 5) er.message = '5文字以上で入力してください';
    if (Object.keys(er).length) { setErrors(er); return; }
    setSent(true);
  };

  const fieldStyle = (err) => ({
    width: '100%', padding: '10px 14px',
    border: err ? '1.5px solid #e88aa8' : (dark ? '1px solid rgba(168,200,232,0.2)' : '1px solid #dbeaf7'),
    borderRadius: 10, fontSize: 12, fontFamily: 'var(--font-jp)',
    background: dark ? 'rgba(20,36,54,0.4)' : '#fafdff',
    color: dark ? '#e8f1fa' : '#3a5a82',
    outline: 'none',
    transition: 'border-color 0.2s',
  });

  return (
    <PageWrap dark={dark} dotDensity={dotDensity} illust={illust} label="07 contact">
      <SiteHeader active="contact" dark={dark} illust={illust} />
      <section style={{ padding: '0 40px 30px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {illust && <BearSitting size={80} style={{ color: accent }} />}
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 48, color: accent, margin: 0, lineHeight: 1 }}>contact</h1>
            <p style={{ fontSize: 12, marginTop: 8, color: dark ? '#b8c8d8' : '#6a8aa8' }}>
              お問い合わせ・ご感想・お仕事のご依頼など<br/>こちらからお気軽にどうぞ！
            </p>
          </div>
        </div>
        {illust && (
          <div style={{ textAlign: 'center' }}>
            <SpeechBubble color={dark ? '#1a2838' : '#fff'} stroke={accent}>
              メッセージ、<br/>とってもうれしいです！<br/>待ってるよ〜
            </SpeechBubble>
          </div>
        )}
        <div style={{ background: cardBg, border, borderRadius: 18, padding: 16, position: 'relative' }}>
          {illust && <WashiTape width={50} color={accent} style={{ position: 'absolute', top: -10, left: 20, transform: 'rotate(-4deg)' }} />}
          <div style={{
            display: 'inline-block', background: accent, color: '#fff',
            fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 12,
            padding: '4px 14px', borderRadius: 12, marginBottom: 10,
          }}>about me</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#fde0e6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d878a0' }}>
              {illust ? <BearDoodle size={50} /> : '👨'}
            </div>
            <div style={{ fontSize: 13, color: dark ? '#e8f1fa' : '#3a5a82', fontWeight: 600 }}>
              カルピスが大すきな<br/>ごく普通のサラリーマン。
            </div>
          </div>
          <p style={{ fontSize: 11, lineHeight: 1.7, marginTop: 10, color: dark ? '#b8c8d8' : '#6a8aa8' }}>
            新商品から期間限定まで、<br/>いろんなカルピスを飲んで<br/>正直レビューしてます☺
          </p>
        </div>
      </section>

      <section style={{ padding: '0 40px 30px', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
        <form onSubmit={submit} style={{ background: cardBg, border, borderRadius: 18, padding: 22, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <span style={{ fontSize: 18, color: accent }}>✉</span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 16, color: dark ? '#e8f1fa' : '#3a5a82', margin: 0 }}>メッセージを送る</h3>
          </div>
          <Underline width={120} color={accent} style={{ marginBottom: 16 }} />
          {sent && (
            <div style={{ background: '#eaf4fc', color: accent, padding: 12, borderRadius: 10, fontSize: 12, marginBottom: 16, fontFamily: 'var(--font-jp)' }}>
              ✓ メッセージを送信しました！ありがとうございます〜♡
            </div>
          )}
          {[
            { key: 'name', label: 'お名前', placeholder: '例) カルピスだいすき' },
            { key: 'email', label: 'メールアドレス', placeholder: '例) calpis.love@gmail.com' },
            { key: 'subject', label: '件名', placeholder: '例) 感想を伝えたいです！' },
          ].map(f => (
            <div key={f.key} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 12, marginBottom: 12, alignItems: 'start' }}>
              <label style={{ fontSize: 12, color: dark ? '#b8c8d8' : '#5a7a98', paddingTop: 10, fontFamily: 'var(--font-jp)' }}>
                {f.label} <span style={{ color: '#e88aa8' }}>*</span>
              </label>
              <div>
                <input type="text" value={form[f.key]} placeholder={f.placeholder}
                  onChange={e => update(f.key, e.target.value)}
                  style={fieldStyle(errors[f.key])} />
                {errors[f.key] && <div style={{ fontSize: 10, color: '#e88aa8', marginTop: 4 }}>{errors[f.key]}</div>}
              </div>
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 12, marginBottom: 12, alignItems: 'start' }}>
            <label style={{ fontSize: 12, color: dark ? '#b8c8d8' : '#5a7a98', paddingTop: 10, fontFamily: 'var(--font-jp)' }}>
              メッセージ <span style={{ color: '#e88aa8' }}>*</span>
            </label>
            <div>
              <textarea rows="5" value={form.message} placeholder="例) いつもレビューを楽しみにしています！○○のレビューがとっても参考になりました！"
                onChange={e => update('message', e.target.value)}
                style={{ ...fieldStyle(errors.message), resize: 'vertical', minHeight: 100 }} />
              {errors.message && <div style={{ fontSize: 10, color: '#e88aa8', marginTop: 4 }}>{errors.message}</div>}
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 18 }}>
            <button type="submit" style={{
              padding: '10px 60px', fontSize: 14, fontFamily: 'var(--font-jp)',
              background: `linear-gradient(135deg, ${accent} 0%, #5a89b9 100%)`,
              color: '#fff', border: 'none', borderRadius: 999, cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(122,169,217,0.3)',
            }}>➤ 送信する</button>
          </div>
          <p style={{ fontSize: 10, marginTop: 14, color: dark ? '#a8b8c8' : '#7a98b8', textAlign: 'center' }}>
            ※ 内容を確認後、できるだけ早くお返事させていただきます。
          </p>
        </form>

        <div>
          <div style={{ background: cardBg, border, borderRadius: 18, padding: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: dark ? '#e8f1fa' : '#3a5a82', marginBottom: 12, fontFamily: 'var(--font-jp)' }}>
              こんなメッセージも<br/>待ってます！
            </div>
            {[
              { icon: '♡', label: 'レビューの感想や\nリクエスト', color: '#e88aa8' },
              { icon: '🥤', label: 'おすすめのカルピス\n情報', color: '#7aa9d9' },
              { icon: '✉', label: 'お仕事のご依頼・\nコラボのご相談', color: '#88b878' },
              { icon: '◌', label: 'その他なんでもOK！', color: '#c8a878' },
            ].map((it, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderBottom: i < 3 ? '1px dashed rgba(168,200,232,0.3)' : 'none' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: it.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>{it.icon}</div>
                <span style={{ fontSize: 11, color: dark ? '#b8c8d8' : '#5a7a98', whiteSpace: 'pre-line', fontFamily: 'var(--font-jp)', lineHeight: 1.6 }}>{it.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter dark={dark} variant="contact" illust={illust} />
    </PageWrap>
  );
}

Object.assign(window, { ReviewDetailPage, RankingPage, ArchivePage, ContactPage, NavigationPage });

// ─────────────────────── NAVIGATION (desktop side drawer overlay) ───────────────────────
// Side-drawer over the Home page: left side shows the Home content with a
// dim overlay, right side is a ~430px white drawer with the same vocabulary
// as the mobile nav (logo + glass+bottle, list rows w/ icons, scattered dots,
// cloud band + bear at bottom).
function NavigationPage({ dark, dotDensity, illust, accent }) {
  const NAV_ACCENT = '#1f5fa8';
  const NAV_INK    = dark ? '#dceaf6' : '#3a5a82';
  const DRAWER_BG  = dark ? '#0e2540' : '#ffffff';
  const SUB_BORDER = dark ? '1px dashed rgba(168,200,232,0.22)' : '1px dashed #d7e6f1';
  const ROW_HOVER  = dark ? 'rgba(122,169,217,0.08)' : 'transparent';

  const DRAWER_W = 430;

  // ── icons ──
  const IcoHome = ({ s = 24 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={NAV_ACCENT}>
      <path d="M12 3.2 3 11h2v9h5v-6h4v6h5v-9h2z"/>
    </svg>
  );
  const IcoPencil = ({ s = 24 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={NAV_ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21l4-1 11-11-3-3L4 17l-1 4z"/><path d="M14 6l3 3"/>
    </svg>
  );
  const IcoCrown = ({ s = 24 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={NAV_ACCENT} strokeWidth="1.8" strokeLinejoin="round">
      <path d="M3 8l3.5 4L12 6l5.5 6L21 8v10H3z"/>
      <circle cx="3" cy="7" r="1" fill={NAV_ACCENT} stroke="none"/>
      <circle cx="21" cy="7" r="1" fill={NAV_ACCENT} stroke="none"/>
      <circle cx="12" cy="5" r="1" fill={NAV_ACCENT} stroke="none"/>
    </svg>
  );
  const IcoFolder = ({ s = 24 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={NAV_ACCENT} strokeWidth="1.8" strokeLinejoin="round">
      <path d="M3 7a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/>
    </svg>
  );
  const IcoMail = ({ s = 24 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={NAV_ACCENT} strokeWidth="1.8" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="13" rx="1.5"/><path d="M3 7l9 7 9-7"/>
    </svg>
  );
  const IcoInfo = ({ s = 24 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={NAV_ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 11v5"/>
      <circle cx="12" cy="8" r="0.8" fill={NAV_ACCENT} stroke="none"/>
    </svg>
  );
  const IcoChev = ({ s = 16, c = '#9bbedc' }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6"/>
    </svg>
  );
  const IcoClose = ({ s = 22 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={NAV_ACCENT} strokeWidth="2" strokeLinecap="round">
      <path d="M5 5l14 14M19 5L5 19"/>
    </svg>
  );

  // ── nav row ──
  const NavRow = ({ icon, label, sub }) => (
    <div style={{
      display: 'grid', gridTemplateColumns: '44px 1fr 18px',
      alignItems: 'center', gap: 12,
      padding: '18px 4px', borderBottom: SUB_BORDER,
      cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>{icon}</div>
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, color: NAV_ACCENT, fontFamily: 'var(--font-jp)', letterSpacing: '0.3px' }}>{label}</div>
        <div style={{ fontSize: 12, color: dark ? '#a8b8c8' : '#7a98b8', marginTop: 3, fontFamily: 'var(--font-jp)' }}>{sub}</div>
      </div>
      <IcoChev size={16} c="#9bbedc"/>
    </div>
  );

  // ── scattered dots inside drawer ──
  const Dots = () => (
    <svg width="100%" height="100%" viewBox="0 0 430 1100" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {[
        [40,180,4],[380,140,3.5],[20,260,3],[400,260,3],
        [50,360,3.5],[390,420,3],[30,520,4],[400,560,3.5],
        [40,660,3],[395,720,4],[20,820,3.5],[380,880,3],
        [50,980,4],[400,1020,3],
      ].map(([x,y,r],i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#bcd8ee" opacity="0.55"/>
      ))}
    </svg>
  );

  // ── faded Home preview in the background (left side) ──
  // Uses the same hero / cards composition as HomePage but stripped down for
  // background context. We don't render the full HomePage to avoid double-StickerLayer.
  const HomeBackdrop = () => (
    <div aria-hidden style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      filter: 'blur(0.5px)',
    }}>
      {/* fake top nav */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 60px', background: '#fff',
        borderBottom: '1px solid #eef3f8',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, alignItems: 'flex-start' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: '#7aa9d9', marginLeft: 12 }}>my</span>
            <span style={{ fontFamily: '"RocknRoll One","M PLUS Rounded 1c",sans-serif', fontSize: 22, color: NAV_ACCENT, marginTop: 2 }}>カルピス</span>
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 13, color: '#7aa9d9', alignSelf: 'flex-end', marginRight: 6, marginTop: 1 }}>Review</span>
          </div>
          <HandBottle size={36} style={{ marginBottom: 2 }} />
        </div>
        <div style={{ display: 'flex', gap: 30, fontSize: 13, color: '#5a7a98', fontFamily: 'var(--font-jp)' }}>
          {['Home','Review','Ranking','Archive','Contact','About'].map((k,i) => (
            <span key={k} style={{ position: 'relative', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? NAV_ACCENT : '#5a7a98' }}>
              {k}
              {i === 0 && <span style={{ position: 'absolute', bottom: -6, left: 0, right: 0, height: 2, background: NAV_ACCENT, borderRadius: 1 }}/>}
            </span>
          ))}
        </div>
      </div>
      {/* hero band */}
      <div style={{ background: '#eaf2fa', padding: '40px 60px 30px', position: 'relative' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 700, fontSize: 48, color: NAV_ACCENT, lineHeight: 1 }}>My Calpis Life</div>
        <div style={{ fontSize: 18, color: '#3a5a82', marginTop: 12, fontFamily: 'var(--font-jp)' }}>カルピスを愛しすぎた記録</div>
        <div style={{ fontSize: 12, color: '#5a7a98', marginTop: 12, lineHeight: 1.8, fontFamily: 'var(--font-jp)' }}>
          いろんな味のカルピスを飲んで、<br/>
          正直レビューしているサイトです。<br/>
          やっぱり定番がいちばん！<br/>
          あなたのお気に入りがきっと見つかります。
        </div>
        <div style={{
          marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 8,
          background: NAV_ACCENT, color: '#fff', padding: '10px 22px', borderRadius: 999,
          fontSize: 13, fontFamily: 'var(--font-jp)', fontWeight: 600,
        }}>もっと見る ›</div>

        {/* bear illustration on right */}
        {illust && (
          <div style={{ position: 'absolute', right: 100, bottom: 0 }}>
            <BearSitting size={160} />
          </div>
        )}
      </div>
      {/* New Reviews + Ranking placeholders */}
      <div style={{ padding: '24px 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div>
          <div style={{ fontSize: 12, fontFamily: 'var(--font-display)', fontStyle: 'italic', color: '#7aa9d9', marginBottom: 10 }}>New Reviews</div>
          <div style={{ display: 'flex', gap: 12 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ flex: 1, background: '#fff', borderRadius: 10, padding: 12, border: '1px solid #eef3f8' }}>
                <div style={{ aspectRatio: '1/1', background: '#f4f8fc', borderRadius: 8, marginBottom: 8 }}/>
                <div style={{ height: 8, background: '#eef3f8', borderRadius: 4, marginBottom: 6 }}/>
                <div style={{ height: 6, width: '60%', background: '#eef3f8', borderRadius: 3 }}/>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontFamily: 'var(--font-display)', fontStyle: 'italic', color: '#7aa9d9', marginBottom: 10 }}>Ranking</div>
          <div style={{ background: '#fff', borderRadius: 10, padding: 12, border: '1px solid #eef3f8' }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 2 ? '1px dashed #eef3f8' : 'none' }}>
                <div style={{ width: 32, height: 32, borderRadius: 6, background: '#f4f8fc' }}/>
                <div style={{ flex: 1, height: 8, background: '#eef3f8', borderRadius: 4 }}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <PageWrap dark={dark} dotDensity={0} illust={illust} label="07 navigation">
      <div style={{ position: 'relative', width: '100%', minHeight: 1200, background: dark ? '#0a1929' : '#f4f8fc', overflow: 'hidden' }}>
        {/* HOME backdrop */}
        <HomeBackdrop/>

        {/* dim overlay covering Home */}
        <div style={{
          position: 'absolute', inset: 0,
          background: dark ? 'rgba(10,25,41,0.55)' : 'rgba(160,190,220,0.32)',
          zIndex: 1,
        }}/>

        {/* DRAWER (right side) */}
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0,
          width: DRAWER_W,
          background: DRAWER_BG,
          boxShadow: '-12px 0 40px rgba(60,100,150,0.22)',
          zIndex: 2,
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* dots inside drawer */}
          <Dots/>

          {/* close button */}
          <button style={{
            position: 'absolute', top: 22, right: 22, zIndex: 3,
            width: 44, height: 44, borderRadius: '50%',
            background: dark ? 'rgba(122,169,217,0.16)' : '#eaf4fc',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><IcoClose/></button>

          {/* logo cluster */}
          <div style={{ position: 'relative', zIndex: 2, padding: '40px 36px 30px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 26, color: '#7aa9d9', marginLeft: 18 }}>My</span>
                <span style={{
                  fontFamily: '"RocknRoll One","M PLUS Rounded 1c",sans-serif',
                  fontSize: 36, color: NAV_ACCENT, letterSpacing: '-0.5px', marginTop: 4,
                }}>カルピス</span>
                <span style={{
                  fontFamily: 'var(--font-display)', fontStyle: 'italic',
                  fontSize: 22, color: '#7aa9d9', alignSelf: 'flex-end', marginRight: 8, marginTop: 2,
                }}>Review</span>
              </div>
              {illust && (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 4 }}>
                  <HandGlass size={36} />
                  <HandBottle size={56} />
                </div>
              )}
            </div>
          </div>

          {/* nav rows */}
          <div style={{ position: 'relative', zIndex: 2, padding: '0 32px', flex: 1 }}>
            <NavRow icon={<IcoHome/>}    label="Home"    sub="トップページへ" />
            <NavRow icon={<IcoPencil/>}  label="Review"  sub="すべてのレビューを見る" />
            <NavRow icon={<IcoCrown/>}   label="Ranking" sub="人気のカルピスランキング" />
            <NavRow icon={<IcoFolder/>}  label="Archive" sub="月別のレビュー一覧" />
            <NavRow icon={<IcoMail/>}    label="Contact" sub="お問い合わせ・ご依頼" />
            <NavRow icon={<IcoInfo/>}    label="About"   sub="このサイトについて" />
          </div>

          {/* social row */}
          <div style={{ position: 'relative', zIndex: 2, padding: '24px 32px 0', display: 'flex', justifyContent: 'space-around' }}>
            {[
              { k: 'ig',   label: 'Instagram' },
              { k: 'x',    label: 'X (旧Twitter)' },
              { k: 'note', label: 'Drink Log' },
            ].map(s => (
              <div key={s.k} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                <span style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: dark ? 'rgba(122,169,217,0.16)' : '#eaf4fc',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  color: NAV_ACCENT,
                }}>
                  {s.k === 'ig' && (
                    <svg width="20" height="20" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <rect x="2" y="2" width="10" height="10" rx="2.5"/><circle cx="7" cy="7" r="2.2"/><circle cx="10" cy="4" r="0.6" fill="currentColor"/>
                    </svg>
                  )}
                  {s.k === 'x' && <span style={{ fontSize: 17, fontWeight: 700 }}>𝕏</span>}
                  {s.k === 'note' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6c2-1 4-1 6 0v12c-2-1-4-1-6 0z"/>
                      <path d="M9 18c4-1 8-1 12 0V6c-4-1-8-1-12 0"/>
                    </svg>
                  )}
                </span>
                <span style={{ fontSize: 10, color: NAV_INK, fontFamily: 'var(--font-jp)' }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* cloud band + bear at bottom */}
          <div style={{ position: 'relative', zIndex: 2, marginTop: 24 }}>
            <svg width="100%" height="100" viewBox="0 0 430 100" preserveAspectRatio="none" style={{ display: 'block' }}>
              <path d="M0 60 Q60 30 120 40 T240 36 T340 44 T430 36 L430 100 L0 100 Z" fill="#dceaf6" opacity="0.9"/>
              <path d="M0 76 Q80 50 160 60 T300 56 T430 62 L430 100 L0 100 Z" fill="#bcd8ee" opacity="0.7"/>
            </svg>
            {illust && (
              <div style={{ position: 'absolute', right: 24, bottom: 8, display: 'flex', alignItems: 'flex-end', gap: 6 }}>
                {/* heart float */}
                <span style={{ position: 'absolute', left: -18, top: 4, color: '#e88ca0', fontSize: 16 }}>♥</span>
                <BearSitting size={86} />
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrap>
  );
}
