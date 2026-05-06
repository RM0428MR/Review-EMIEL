# 0001. スタック：Astro + React + microCMS + Cloudflare Pages

- **Status**: Accepted
- **Date**: 2026-05-06
- **決定者**: @RM0428MR

## Context

カルピスレビュー日誌サイトの実装スタックを決めたい。要件：

- 静的生成中心で SEO を取りたい（個人ファン日誌、検索流入が頼り）
- スマホからレビューを書きたい（管理画面 UX 重視）
- claude-design の React jsx モックを最小改修で持ち込みたい
- 個人運営、月額固定費は避けたい
- 帯域・転送量で殴られたくない

## Decision

**Astro 5 + React 18 + microCMS + Cloudflare Pages** を採用。

- Astro：ファイルベースルーティング、静的生成、選択的アイランド
- React アイランド：フィルタ UI / フォーム / Like ボタンのみ
- microCMS：Headless CMS、日本語UI、無料枠、スマホ管理画面
- Cloudflare Pages：帯域無制限、PR プレビュー、Pages Function 同居

## Alternatives

| 候補 | Pro | Con |
|---|---|---|
| Next.js（App Router） + Vercel | エコシステム最強、SSR/ISR 自由 | 個人サイトには重い、Vercel は商用利用で帯域課金あり |
| Astro + microCMS + **Vercel** | デプロイ最速 | 帯域上限がある、画像転送量で詰まり得る |
| **Astro + microCMS + Cloudflare Pages**（本案） | 帯域無制限、Pages Function でフォーム同居、Web Analytics | Pages Function は Edge 制約あり |
| Nuxt + Vue + microCMS | Vue 系もアリ | claude-design が React なので持ち込みコスト増 |
| 自前 Markdown + Astro | CMS 不要で軽い | スマホで書きづらい、画像差し替えが面倒 |
| WordPress + テーマ自作 | 管理画面は最強 | 月額サーバ費・セキュリティ運用がしんどい |

## Consequences

- **Pro**：
  - 既存 React jsx をほぼそのまま React アイランドに乗せ換えられる
  - microCMS Webhook → Cloudflare Pages の Deploy Hook で自動再ビルド
  - フォーム / Discord 通知 / Turnstile を Pages Function 1 個に集約できる（→ ADR-0003）
  - Cloudflare Web Analytics で Cookie 同意不要のシンプル計測
- **Con / 引き受けるリスク**：
  - Pages Function は Edge ランタイム制約（Node API 一部使えず）。お問い合わせフォーム以外で使う場面は要注意
  - microCMS の API rate limit（無料枠 60req/秒）。個人サイト規模なら困らない見込みだが、ビルド時の全件取得で気を付ける
- **フォローアップ**：
  - Phase 3 着手時に `./site` で Astro プロジェクト初期化
  - microCMS API スキーマは [`FE/デザイン/共通/04_データスキーマ.md`](../FE/デザイン/共通/04_データスキーマ.md) に従う

## 関連

- 設計書：[`FE/デザイン/共通/05_技術スタック.md`](../FE/デザイン/共通/05_技術スタック.md)
- 関連 ADR：0002（スタイル）、0003（フォーム）
