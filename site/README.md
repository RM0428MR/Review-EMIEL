# site/ — Astro 実装本体

Phase 3 の本実装。`pnpm dev` でローカル開発、`pnpm build` で `dist/` に静的サイト出力。
Astro Dev Toolbar は通常は非表示で、必要なときだけ `pnpm dev:toolbar` で起動する。

## セットアップ

```bash
pnpm install
cp .env.example .env
# 必要に応じて MICROCMS_*、TURNSTILE_*、DISCORD_WEBHOOK_URL を埋める（Phase 3-4）
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

- 開発時：`src/data/reviews.ts`（claude-design `data.jsx` の TypeScript 移植）
- 本番：`src/lib/microcms.ts` 経由で microCMS から取得（環境変数が設定された時に切替）

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
│   ├── data/reviews.ts           開発用モックデータ
│   ├── lib/                      types / microcms / similar / format
│   ├── styles/                   tokens.css, reset.css, global.css
│   ├── layouts/                  BaseLayout.astro
│   ├── components/               共通 Astro コンポーネント
│   │   └── react/                React アイランド
│   └── pages/                    各画面
└── .env.example
```

## 設計書

[`../FE/デザイン/`](../FE/デザイン/) を実装の指針にする。基本は claude-design jsx をソースに、CSS Modules + CSS変数で書き直す。
