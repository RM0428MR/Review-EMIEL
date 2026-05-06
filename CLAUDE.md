# Review-Calpis — カルピス日誌（My カルピス review）

## プロジェクト概要

カルピスを愛しすぎている個人運営の **架空のレビュー日誌サイト**。手書き・スタンプ・マスキングテープでデコった「日記帳」のようなトンマナ。

- **GitHubリポジトリ**: https://github.com/RM0428MR/Review-Calpis （private）
- **ローカル**: `~/ghq/github.com/RM0428MR/Review-Calpis/`
- **設計テンプレ参照**: `~/ghq/github.com/AkitoSakurabaCreator/Plan-Doc/`
- **ブランド注意**: 「CALPIS」は実在の登録商標。本サイトは個人ファン日誌として運営する想定なので、公式ロゴ・公式パッケージは使わず、自作の手書き風で統一する。商品名は一般名・愛称ベース。

---

## 1. デザインソース（現状の真実）

### 採用モック：claude-design/（Claude Code Design 出力）

```
claude-design/
├── CLAUDE.md            ← 実装引き継ぎメモ（このファイルの基底）
├── CALPIS日誌.html      ← Babel in-browser モック（参考用）
├── app.jsx              ← ルート / design-canvas.jsx に各画面を並べる
├── design-canvas.jsx    ← キャンバス土台（本番不要）
├── tweaks-panel.jsx     ← Tweaks 基盤（本番不要）
├── parts.jsx            ← 共通パーツ（Header / Footer / BearDoodle / Heart / Cloud / SpeechBubble / WashiTape / Bottle）→ 移植対象
├── stickers.jsx         ← 手書き風装飾 → 移植対象
├── data.jsx             ← モックデータ（REVIEWS 配列、CATEGORIES / MOODS / SEASONS）→ microCMS スキーマの素
├── pages-1.jsx          ← Home / Review一覧 + ReviewCard 共通コンポーネント → 移植対象
├── pages-2.jsx          ← Review詳細 / Ranking / Archive / Contact + Navigation → 移植対象
├── pages-mobile.jsx     ← モバイル版5画面 → 移植対象
├── ios-frame.jsx        ← モバイルプレビュー枠（本番不要）
├── assets/              ← calpis_bear.png 等のキャラ画像
└── uploads/             ← 写真モック（01-home.png 〜 06-contact.png + *-mobile.png）
```

### スタイル方針（要継承・絶対）

| 項目 | 値 |
|---|---|
| ベース色 | `#f0eee9`（紙っぽいオフホワイト） |
| アクセント色 | `#7aa9d9`（カルピス連想の薄い青） |
| サブ色 | `#a8c8e8`（淡い水色）/ ピンク系（白桃・いちご・桜もちアクセント） |
| フォント | `Klee One`（本文）/ `Caveat`（英字あしらい）/ `Yusei Magic`（補助） |
| 雰囲気 | 手書き感・日誌・スタンプ・マスキングテープ・水玉散らし |
| マスコット | しろくま（カップ持ち・座り）`assets/calpis_bear.png` |
| 装飾要素 | 雲・吹き出し・ハート・四点星・washi tape — `stickers.jsx` 集約 |

**勝手に変えない:**
- フォント3種の組み合わせ
- ベース色 `#f0eee9` / アクセント `#7aa9d9`
- 「日誌・手書き感」というトンマナ
- 個人の感想サイトという立ち位置（公式っぽくしない）

迷ったら **claude-design の該当画面に戻って参照** → それでも判断つかなければユーザーに確認。

---

## 2. 画面一覧

### デスクトップ 6画面（claude-design/uploads/01〜06.png）

| # | 画面 | URL | 主要セクション |
|---|---|---|---|
| 1 | ホーム | `/` | HERO 3-col（タイトル / 写真+クマ / about-me） / NEW REVIEW（カテゴリ chips + 5枚） / RANKING（Top3 等高 + my favorite） / REVIEW ARCHIVE strip（年chips + 月chips + 6col） |
| 2 | レビュー一覧 | `/reviews` | ヘッダー（title + bear + count card） / Sidebar（カテゴリ/味のタイプ/季節） / Grid 6col（並び替え + view toggle） / ページネーション |
| 3 | レビュー詳細 | `/reviews/[slug]` | IMAGE COL（写真+NEW+吹き出し+クマ+サムネ4枚+一言まとめ） / CENTER（メタ+本文+サブ評価×5+おすすめの飲み方+「似ているかも？？」3カード） / RIGHT（Product Info+タグ+お気に入り） |
| 4 | ランキング | `/ranking` | HEADER 3-col（title / bear+bubble / 評価基準card） / TOP 3（3等高カード）/ THEME RANKINGS 4テーマ（さっぱり系/甘い系/夏に飲みたい！/限定・コラボ）/ MY FAVORITE + SNS card |
| 5 | アーカイブ | `/archive` | HEADER 3-col（title+bear / 年別月別 toggle / count card） / Sidebar 年リスト + bear / Content 年見出し + 6col 月バッジ付きカード |
| 6 | お問い合わせ | `/contact` | HEADER 3-col（bear+title / bubble / about-me compact card） / Form 1.5fr（4 fields + gradient ボタン） / Tip card 1fr（4項目リスト） |

### モバイル 5画面（claude-design/uploads/*-mobile.png）

Home / Review / Review詳細 / Ranking / Archive / Contact のモバイル版 + Navigation。
ボトムナビ（Home / Review / Ranking / Archive / Contact）。

### 追加予定（モックなし、共通スタイルで起こす）

- 404
- About
- 検索結果

---

## 3. 実装ターゲット（決定済み）

### スタック：ルートB（CMS連携・静的生成）

- **Astro 5** + **React アイランド**（既存 jsx を最小改修で持ち込みやすい）
- **microCMS**（Headless CMS、日本語UI、無料枠）
- **画像**：microCMS のメディア機能（CDN込み）
- **デプロイ**：Cloudflare Pages または Vercel
- **ドメイン**：未定

### 実装ステップ（概要）

1. Astro プロジェクト `./site` を新規作成（モックjsx は参考資料として残す）
2. microCMS API スキーマ確定 → `src/lib/microcms.ts` クライアント実装
3. ページ移植（モック → Astro `.astro` シェル + React アイランド）
4. スタイル移植（CSS Modules or Tailwind で `parts.jsx`/`stickers.jsx` 再構築）
5. デプロイ（GitHub push → CFP 連携 + microCMS Webhook で自動再ビルド）

詳細は `FE/デザイン/共通/05_技術スタック.md` 参照。

---

## 4. Pencil ファイルについて（学習用・本番非依存）

**重要: Pencil の `.pen` / `.epgz` は学習目的のみ。本番実装には使わない。**

- 本番実装のソース・オブ・トゥルース = `claude-design/` 配下の jsx + uploads PNG
- Pencil 上では、claude-design の画面を再現する練習を `design/pencil/calpis-diary.epgz` 上で行う
- Pencil 操作は **MCP** (`mcp__pencil__*`) 経由のみ

### Pencil MCP の主要ツール

- `get_editor_state` — 現状取得（最初に呼ぶ）
- `get_guidelines` — タスク別ガイド（最初に呼ぶ）
- `batch_design` — メイン作業（最大25操作/呼び出し）
- `batch_get` / `snapshot_layout` — 検査
- `get_screenshot` / `export_nodes` — レンダリング確認
- `get_variables` / `set_variables` — テーマ管理

### batch_design の鉄則

- 1呼び出し最大25操作
- 大画面はセクション単位（ヘッダー/ヒーロー/カード/フッター）で分割
- 失敗時は同batch内ロールバック → エラー出たら原因特定後に小さく再実行
- 新規 frame は `layout:"none"` を明示（child の x,y を効かせるため）

### 環境セットアップ（完了済み）

- Pencil MCP user scope 登録済み（`~/.claude.json`）
- fish 関数 `pencil <file>` 登録済み（`~/.config/fish/functions/pencil.fish`）
  - kill → config 書き換え → 起動 を自動化
- parallel-git MCP 登録済み

**Pencil 挙動の癖:**
- シングルインスタンス、CLI 引数完全無視
- `~/.config/Pencil/config.json` の `recentFiles[0]` を起動時自動ロード
- → fish 関数が自動でこの書き換えを行う

詳細な実用 Tips は `~/.claude/projects/-home-mr-ghq-github-com-RM0428MR-Review-Calpis/memory/pencil_mcp_tips.md` 参照。

---

## 5. ディレクトリ構造

```
Review-Calpis/
├── README.md
├── CLAUDE.md                    ← このファイル（プロジェクト全体の指針）
├── ADR/
├── claude-design/               ← Claude Code Design モック（実装ソース・オブ・トゥルース）
│   ├── CLAUDE.md
│   ├── *.jsx
│   ├── assets/
│   └── uploads/
├── design/
│   ├── _sample.epgz             ← Pencil フォーマット参考
│   ├── source/                  ← 旧 ChatGPT モック（参考用、非アクティブ）
│   └── pencil/                  ← Pencil 学習用 .epgz
│       ├── _test1.epgz
│       ├── 06-contact.epgz      ← 旧学習素材
│       └── calpis-diary.epgz    ← 新学習素材（claude-design 再現中）
├── FE/
│   └── デザイン/
│       ├── 共通/                ← 横断設計（後述）
│       └── 画面別詳細設計/
│           ├── Home/ Review一覧/ Review詳細/ Ranking/ Archive/ Contact/
│           ├── About/ 404/
└── site/                        ← Astro 実装本体（未作成、Phase 2 で生成）
```

---

## 6. 設計書構成（FE/デザイン/）

```
FE/デザイン/
├── 共通/
│   ├── 01_情報設計.md          サイトマップ / URL設計 / メタ情報
│   ├── 02_デザイントークン.md  色・フォント・余白・装飾ルール
│   ├── 03_コンポーネント設計.md parts.jsx/stickers.jsx 由来の再利用UI
│   ├── 04_データスキーマ.md    microCMS API定義 (Review型)
│   └── 05_技術スタック.md      Astro+React+microCMS+CFP の構成
└── 画面別詳細設計/
    └── {画面}/
        ├── 設計.md              目的・ユーザーフロー・表示要素
        └── 詳細設計.md          5項目 + 実装メモ
```

各画面の `詳細設計.md` は以下5項目（claude-design の構造に沿う）:
1. ページ全体構造（ヘッダー/メイン/フッター）
2. セクション分解（上から順）
3. スクロール構造（区切り、高さ、繰り返し）
4. コンポーネント設計（再利用UI）
5. レイアウト詳細（横並び/縦並び、グリッド、カラム）+ 実装メモ（client island 化箇所、microCMS フィールドマッピング）

---

## 7. 全体ロードマップ

| Phase | 内容 | ステータス |
|---|---|---|
| 0 | ディレクトリ整備 | ✅ 完了 |
| 1a | claude-design 採用 / 旧モック退役 | ✅ 完了 |
| 1b | Pencil 学習：calpis-diary.epgz でデスクトップ6画面再現 | 🔄 進行中 |
| 1c | Pencil 学習：モバイル5画面再現（任意） | 待機 |
| 2 | 設計書作成（共通5本 + 画面別6+3画面） | 🔄 進行中 |
| 3 | Astro+microCMS 実装（`./site`） | 待機 |
| 4 | デプロイ + 公開 | 待機 |

---

## 8. 仕様（合意済み）

- **対象ページ**: home / review一覧 / review詳細 / ranking / archive / contact + 追加（404 / about / 検索結果）
- **キャンバス**: デスクトップ Web 1440幅、縦長フルページ + モバイル 375幅
- **ログイン機能**: なし
- **多言語**: 日本語のみ
- **スマホ対応**: モバイル5画面のモック有り → 実装時にレスポンシブで対応
- **写真・イラスト**: claude-design/assets + uploads を実装で活用（CDN化は microCMS 経由）

---

## 9. 既知の課題・todo

- [ ] レビュー詳細のサブ評価（甘さ/濃さ等）— 全レビューに付けるか、★だけのレビューも許すか未決定
- [ ] 商品写真をユーザーがアップしたいかは要相談
- [ ] タグページ・気分ページの粒度
- [ ] OGP 画像の自動生成（後回しでOK）
- [ ] 404 / About のデザイン起こし

---

## 10. 制約・注意事項

- Pencil MCP の `batch_design` は1回最大25操作
- `.pen` ファイルは絶対に Read / Grep しない（暗号化）
- 元デザイン（claude-design）からのトレースは **構造優先・実装で使える形** で行う
- Pencil 編集中は MCP 操作で破壊的変更しないよう注意
- 「CALPIS」公式ロゴ・公式パッケージ画像は使わない（個人ファン日誌として運営）
