# 0003. お問い合わせ：Cloudflare Pages Function + Turnstile + Discord Webhook

- **Status**: Accepted
- **Date**: 2026-05-06
- **決定者**: @RM0428MR

## Context

`/contact` のフォーム送信先と通知先を決めたい。要件：

- スマホで通知を受けて見落としたくない
- Spam を弾きたい（個人サイトでもスクレイパーは来る）
- 月額固定費は避けたい
- リダイレクトせず同ページで結果表示したい

## Decision

**Cloudflare Pages Function `/api/contact` + Cloudflare Turnstile + Discord Webhook**。

```
[フォーム入力]
  → POST /api/contact
  → CFP Function:
     1. honeypot (`company` field) チェック
     2. Turnstile 検証
     3. Discord Webhook へ embed 投稿
  → React: success banner / error banner（同ページ）
```

## Alternatives

| 候補 | Pro | Con |
|---|---|---|
| **CFP Function + Turnstile + Discord Webhook**（本案） | デプロイと同居、無料、スマホ通知強い | Edge ランタイム制約 |
| Formspree | 一番楽、SaaS | 月 50 通制限、ブランディングが残る |
| Netlify Forms | 一番楽 | Netlify に縛られる、別 PaaS と併用しにくい |
| `mailto:` 直リンク | 開発工数ゼロ | スマホ即通知できない、相手のメーラーに依存 |
| Slack Webhook | Discord と機能同等 | Slack 個人運用は Workspace 維持が手間 |
| 自前 SMTP（Resend 等） | 受信を Email にできる | 月額 or 従量課金、設定多い |

## Consequences

- **Pro**：
  - Discord アプリで即通知（スマホ push 強い）
  - Turnstile + honeypot で大半の bot を弾ける
  - 同ページに結果を出すので UX が崩れない
  - 環境変数を CFP Secret に置けば git に晒さずに済む
- **Con / 引き受けるリスク**：
  - Discord 障害時に通知が来ない（受信ログ残す代替を Phase 4 検討）
  - Discord 1 メッセージ 2000 文字上限：フロントで `cap` を入れる
- **フォローアップ**：
  - `DISCORD_WEBHOOK_URL` / `TURNSTILE_SECRET_KEY` / `PUBLIC_TURNSTILE_SITE_KEY` を CFP Secret に登録
  - 失敗時のフォールバック（Email バックアップ送信 等）は Phase 4 以降の検討課題

## 関連

- 設計書：[`FE/デザイン/画面別詳細設計/Contact/詳細設計.md`](../FE/デザイン/画面別詳細設計/Contact/詳細設計.md)
- 関連 ADR：0001
