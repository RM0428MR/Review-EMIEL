# EMIEL diary review *(internal repo: Review-Calpis)*

個人運営の架空レビュー日誌サイト「**my EMIEL diary review**」のソースコード。乳酸菌飲料を題材にした個人の感想ログを、手書き・スタンプ・マスキングテープでデコった「日記帳」風のトンマナで記録する。新商品・期間限定・コラボなどをファン視点でゆるくレビューしていく想定。

> ⚠️ 本サイトは個人運営のファンサイトであり、アサヒ飲料株式会社およびその関連会社とは一切関係ありません。公式ロゴ・公式パッケージ画像は使用しておらず、ビジュアルはすべて自作の手書き風です。

## 題材について（非公式表記）

本サイトが題材としているのは「乳酸菌飲料」全般、その中でも実在ブランドである「カルピス」を中心とした個人の感想です。商品名は本文中で指示的に言及することはありますが、

- サイト名・ドメイン・ロゴで商品名を前面には掲げません
- 公式パッケージ画像・公式ロゴ・公式 PR ビジュアルは一切使用しません
- AI で生成したパッケージ模写画像も使用しません

詳細は [`ADR/0006-brand-copyright-policy.md`](ADR/0006-brand-copyright-policy.md) を参照してください。万一権利上の懸念があった場合は速やかに対応します。

## ステータス

| Phase | 内容 | 状態 |
|---|---|---|
| 0 | ディレクトリ整備 | ✅ |
| 1a | デザインモック確定（claude-design 採用） | ✅ |
| 1b | Pencil で 11 画面学習再現 | ✅ |
| 2 | 設計書（共通5本＋画面別9×2本） | 🔄 |
| 3 | Astro + React + microCMS 実装（`./site`） | ⏳ |
| 4 | Cloudflare Pages デプロイ | ⏳ |

## 技術スタック

- **Astro 5** + **React 18+**（フィルタ／フォームのみアイランド化）
- **microCMS**（Headless CMS）
- **CSS Modules + CSS変数**（Tailwind は採用せず、手書き感の SVG / dashed と相性のため）
- **Pagefind**（全文検索、Phase 4 で後乗せ）
- **Cloudflare Pages**（デプロイ + Pages Function でフォーム） + **Cloudflare Turnstile**（Spam 対策） + **Discord Webhook**（通知）
- **Cloudflare Web Analytics**（プライバシー配慮型）

詳細：[`FE/デザイン/共通/05_技術スタック.md`](FE/デザイン/共通/05_技術スタック.md)

## デザイン

claude-design（Claude Code Design 出力）を実装ソースの真とする。

| 画面 | URL | モック |
|---|---|---|
| Home | `/` | [`uploads/01-home.png`](claude-design/uploads/01-home.png) |
| Review一覧 | `/reviews` | [`uploads/02-review.png`](claude-design/uploads/02-review.png) |
| Review詳細 | `/reviews/[slug]` | [`uploads/03-review-detail.png`](claude-design/uploads/03-review-detail.png) |
| Ranking | `/ranking` | [`uploads/04-ranking.png`](claude-design/uploads/04-ranking.png) |
| Archive | `/archive` | [`uploads/05-archive.png`](claude-design/uploads/05-archive.png) |
| Contact | `/contact` | [`uploads/06-contact.png`](claude-design/uploads/06-contact.png) |
| About / 404 / 検索結果 | – | モックなし、設計書で起こす |

## ディレクトリ

```
Review-Calpis/
├── README.md                ← このファイル
├── CLAUDE.md                ← Claude Code 向けプロジェクト指針
├── CONTRIBUTING.md          ← コミット規約・ブランチ運用
├── ADR/                     ← Architecture Decision Records
├── docs/
│   └── devlog/              ← 開発週報
├── FE/デザイン/             ← 画面設計書（共通5本＋画面別9×2本）
├── claude-design/           ← Claude Code Design モック（実装ソースの真）
├── design/pencil/           ← Pencil 学習用 .epgz（本番非依存）
└── site/                    ← Astro 実装（Phase 3 で生成、未作成）
```

> 内部リポジトリ名は `Review-Calpis` のままです（ADR 0006 の方針）。公開表記としてのサイト名は「EMIEL diary review」を用います。

## 開発ログ

進捗は [`docs/devlog/`](docs/devlog/) に週次で記録。設計判断は [`ADR/`](ADR/) に残す。

## 関連ドキュメント

- 設計書 - [`FE/デザイン/`](FE/デザイン/)
- ADR - [`ADR/`](ADR/) — 特に [0006: ブランド表記・著作権ポリシー](ADR/0006-brand-copyright-policy.md)
- 開発ログ - [`docs/devlog/`](docs/devlog/)
- 貢献ガイド - [`CONTRIBUTING.md`](CONTRIBUTING.md)

## ライセンス

未定（個人ポートフォリオ目的、Phase 4 公開時に確定）。
