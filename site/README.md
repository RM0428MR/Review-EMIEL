# site/ — Astro 実装本体

Phase 3 の本実装。`pnpm dev` でローカル開発、`pnpm build` で `dist/` に静的サイト出力。
Astro Dev Toolbar は通常は非表示で、必要なときだけ `pnpm dev:toolbar` で起動する。

## セットアップ

```bash
pnpm install
cp .env.example .env
# 必要に応じて TURNSTILE_*、DISCORD_WEBHOOK_URL を埋める
```

## コマンド

| コマンド | 説明 |
|---|---|
| `pnpm dev` | dev サーバ起動（既定 http://localhost:4321、Dev Toolbar は非表示） |
| `pnpm dev:toolbar` | Dev Toolbar を有効にして dev サーバ起動 |
| `pnpm build` | 型チェック + 静的ビルド（→ `dist/`） |
| `pnpm preview` | ビルド結果のローカルプレビュー |
| `pnpm check` | 型チェックのみ |

## データソース

- レビュー正本：`src/content/reviews/*.json`
- 取得窓口：`src/lib/microcms.ts`（ファイル名は互換維持のため据え置き。中身は Astro Content Collections 読み取り）
- 画面側は静的生成のままなので、商品追加・編集後は `pnpm build` で反映確認できる

### レビュー JSON の運用ルール

- 1 ファイル = 1 商品。ファイル名（拡張子なし）が「Content Collections の id」になる。
- `src/lib/microcms.ts` がランタイムで `id = entry.id` に上書きするので、JSON 側の `id` は省略可。残しても無視される（不一致でも壊れない）。
- `slug` は省略可。省略時は `entry.id`（= ファイル名）をそのまま使う。書く場合は半角英数字とハイフンのみ。ファイル名と一致させるのが安全。
- `slug` の重複は起動時に例外で落ちる（静かに壊れない）。
- `date` は `YYYY.MM.DD` または `YYYY-MM-DD` 必須。schema で形式チェックされる。実際の sort はランタイムで `YYYY.MM.DD` に正規化されるので、混在しても並び順は壊れない。
- カテゴリは `定番` / `期間限定` / `コラボ` / `新商品` / `その他` のいずれか。`src/data/reviews.ts` の `CATEGORIES`・`CAT_VALUES` で集中管理。

### URL クエリ仕様（/reviews）

- `cat` / `mood` / `season` はカンマ区切りの**多値**（例: `?cat=コラボ,期間限定&mood=さっぱり`）。
- `page` は 1 以上の整数。
- 不正値は静かに切り捨てる（壊さない方針）。
- `/ranking` から `/reviews` へのテーマ別リンクはこの仕様に揃えてある。

## ディレクトリ

```
site/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── public/                       静的アセット
│   └── images/                   しろくま・ボトル・カップ PNG
├── src/
│   ├── content/site/             サイトメタ（about, footer, social）
│   ├── content/reviews/          1商品=1ファイルのレビュー正本(JSON)
│   ├── data/reviews.ts           一覧/絞り込み用の定数
│   ├── lib/                      types / microcms / similar / format
│   ├── styles/                   tokens.css, reset.css, global.css
│   ├── layouts/                  BaseLayout.astro
│   ├── components/               共通 Astro コンポーネント
│   │   └── react/                React アイランド
│   └── pages/                    各画面
└── .env.example
```

## 商品追加・編集

1. 既存商品を編集する場合は `src/content/reviews/<slug>.json` を修正する
2. 新商品を追加する場合は既存 JSON をコピーして `<slug>.json` を 1 つ増やす（ファイル名がそのまま `id` / `slug` になる）
3. ファイル名（= `id`）は他 JSON と重複させない。重複時はビルドが例外で落ちる
4. 反映確認は `pnpm build` または `pnpm dev`

## 設計書

[`../FE/デザイン/`](../FE/デザイン/) を実装の指針にする。基本は claude-design jsx をソースに、CSS Modules + CSS変数で書き直す。
