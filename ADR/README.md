# Architecture Decision Records (ADR)

設計判断（採用／不採用、トレードオフ）を時系列で残す。粒度は「後で『なぜそう決めた？』と聞かれて即答したいレベル」。

## 書くタイミング

- スタック・フレームワークを選んだ／変えた
- 大きなディレクトリ構造を変えた
- 既存方針を覆した
- 採用候補が複数あって比較検討した

## 書かないこと

- 細かい実装の選択（変数名、CSS 値の微調整）
- 一時的な workaround
- 設計書（`FE/デザイン/`）に書けば済む内容

## ファイル名

`NNNN-{kebab-title}.md`、4 桁ゼロ埋めで時系列。例：

- `0001-stack-astro-react-microcms.md`
- `0002-style-css-modules-no-tailwind.md`

## フォーマット

[`0000-template.md`](0000-template.md) を起点にコピーする。`Status` は `Proposed` → `Accepted` → `Deprecated` / `Superseded by NNNN` で進める。

## 索引

| # | タイトル | Status |
|---|---|---|
| [0001](0001-stack-astro-react-microcms.md) | スタック：Astro + React + microCMS + Cloudflare Pages | Accepted |
| [0002](0002-style-css-modules-no-tailwind.md) | スタイル：CSS Modules + CSS変数（Tailwind 不採用） | Accepted |
| [0003](0003-contact-form-cfp-discord.md) | お問い合わせ：CFP Function + Turnstile + Discord Webhook | Accepted |
| [0004](0004-design-source-claude-design-not-pencil.md) | 実装ソースの真：claude-design jsx（Pencil は学習用に降格） | Accepted |
| [0005](0005-handglass-as-hamburger.md) | ナビゲーション：HandGlass（カップ）をハンバーガー扱いに統一 | Accepted |
| [0006](0006-brand-copyright-policy.md) | ブランド表記・著作権ポリシー（個人ファンサイトとしての立ち位置） | Accepted |
