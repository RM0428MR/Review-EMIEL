# my EMIEL diary review

![CI](https://github.com/RM0428MR/Review-EMIEL/actions/workflows/ci.yml/badge.svg)

**EMIEL** は架空の乳酸飲料ブランド。本サイトは、その架空ラインナップを個人ファン視点で気ままにレビューしていく「日記帳風」レビューサイトのソースコード。

紙の日記帳・マスキングテープ・スタンプ・手書きのあしらいを、そのまま Web に落とし込むことを目指したクリエイティブ実装プロジェクト。

## コンセプト

- **EMIEL という架空ブランド** の世界観を「個人の日誌」という切り口で表現する
- 商品ラインナップ・キャラクター・ビジュアル・レビュー本文は **すべてオリジナルのフィクション**
- マスコットの **しろくま**（`bear-doodle`）がガイド役
- 紙ノートの質感をデジタルで再現：
  - オフホワイト紙色 `#f0eee9` / 淡い青 `#7aa9d9`
  - `Klee One`（本文）/ `Caveat`（英字あしらい）/ `Yusei Magic`（補助）の 3 書体
  - 雲・吹き出し・ハート・四点星・マスキングテープなど手書き装飾

## ステータス

| Phase | 内容 | 状態 |
|---|---|---|
| 0 | ディレクトリ整備 | ✅ |
| 1a | デザインモック確定（claude-design 採用） | ✅ |
| 1b | Pencil で 11 画面学習再現 | ✅ |
| 2 | 設計書（共通 5 本 + 画面別 9 × 2 本） | 🔄 |
| 3 | Astro + React + microCMS 実装（`./site`） | 🔄 |
| 4 | Cloudflare Pages デプロイ | ⏳ |

## 技術スタック

- **Astro 5** + **React 18+**（フィルタ／フォームのみアイランド化）
- **microCMS**（Headless CMS）
- **CSS Modules + CSS 変数**（Tailwind は採用せず、手書き感の SVG / dashed と相性のため）
- **Pagefind**（全文検索、Phase 4 で後乗せ）
- **Cloudflare Pages**（デプロイ + Pages Function でフォーム）
- **Cloudflare Turnstile**（Spam 対策）+ **Discord Webhook**（フォーム通知）
- **Cloudflare Web Analytics**（プライバシー配慮型）

詳細：[`FE/デザイン/共通/05_技術スタック.md`](FE/デザイン/共通/05_技術スタック.md)

## デザイン

[claude-design](claude-design/)（Claude Code Design 出力）を実装ソースの真とする。

| 画面 | URL | モック |
|---|---|---|
| Home | `/` | [`uploads/01-home.png`](claude-design/uploads/01-home.png) |
| Review 一覧 | `/reviews` | [`uploads/02-review.png`](claude-design/uploads/02-review.png) |
| Review 詳細 | `/reviews/[slug]` | [`uploads/03-review-detail.png`](claude-design/uploads/03-review-detail.png) |
| Ranking | `/ranking` | [`uploads/04-ranking.png`](claude-design/uploads/04-ranking.png) |
| Archive | `/archive` | [`uploads/05-archive.png`](claude-design/uploads/05-archive.png) |
| Contact | `/contact` | [`uploads/06-contact.png`](claude-design/uploads/06-contact.png) |
| About / 404 / 検索結果 | – | モックなし、設計書で起こす |

## ディレクトリ

```
Review-EMIEL/
├── README.md                ← このファイル
├── CLAUDE.md                ← Claude Code 向けプロジェクト指針
├── CONTRIBUTING.md          ← コミット規約・ブランチ運用
├── ADR/                     ← Architecture Decision Records
├── docs/
│   └── devlog/              ← 開発週報
├── FE/デザイン/             ← 画面設計書（共通 5 本 + 画面別 9 × 2 本）
├── claude-design/           ← Claude Code Design モック（実装ソースの真）
├── design/pencil/           ← Pencil 学習用 .epgz（本番非依存）
└── site/                    ← Astro 実装（Phase 3 進行中）
```

## 開発ログ

進捗は [`docs/devlog/`](docs/devlog/) に週次で記録。設計判断は [`ADR/`](ADR/) に Architecture Decision Record として残す。

## 関連ドキュメント

- 設計書 — [`FE/デザイン/`](FE/デザイン/)
- ADR — [`ADR/`](ADR/)
- 開発ログ — [`docs/devlog/`](docs/devlog/)
- 貢献ガイド — [`CONTRIBUTING.md`](CONTRIBUTING.md)

## ライセンス

未定（個人ポートフォリオ目的、Phase 4 公開時に確定）。
