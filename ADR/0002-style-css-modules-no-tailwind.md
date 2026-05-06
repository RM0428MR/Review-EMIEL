# 0002. スタイル：CSS Modules + CSS変数（Tailwind 不採用）

- **Status**: Accepted
- **Date**: 2026-05-06
- **決定者**: @RM0428MR

## Context

claude-design のモックは「手書き感・スタンプ・マスキングテープ」のトンマナで、SVG dashed border、washi tape の clip-path、不規則な scallop wave、PolkaDots の seeded 散布などが多用されている。これを実装側でどう記述するか決めたい。

## Decision

**CSS Modules + CSS変数（`:root` にトークン集約）** を採用。Tailwind は使わない。

## Alternatives

| 候補 | Pro | Con |
|---|---|---|
| **CSS Modules + CSS変数**（本案） | セマンティッククラス、デザイントークンを変数で集約、SVG に流し込みやすい | クラス名考えるコスト、共通スタイルの再利用は手作業 |
| Tailwind CSS | 高速、設計トークンを `tailwind.config` で集約可能 | dashed / clip-path / 不規則 SVG の表現でクラスが破綻、`@apply` 多用になる、可読性が落ちる |
| styled-components / Emotion | 動的スタイル強い | Astro の SSG と相性が微妙、ランタイム CSS が増える |
| Vanilla CSS（global） | シンプル | コンポーネント境界が崩れる、Astro の利点が消える |

## Consequences

- **Pro**：
  - 手書き感の SVG（scallop wave / washi tape / dashed border / 4点星 / heart path）に CSS変数を直接渡せる
  - claude-design の inline style → `*.module.css` への移植が機械的にできる
  - デザイントークン（[`02_デザイントークン.md`](../FE/デザイン/共通/02_デザイントークン.md)）を `:root` に置けば JSX / Astro / SVG どこからも参照可
- **Con**：
  - クラス名命名規約（BEM 風 or kebab）を別途決める必要あり → 暫定 `.module.css` の中はフラット命名（`.heroTitle` `.cardImage` など）。
  - utility クラスが欲しくなるシーンがあれば、`src/styles/utilities.css` を別建てで用意する余地は残す。
- **フォローアップ**：
  - `src/styles/tokens.css` を最初に書く。値は [`02_デザイントークン.md`](../FE/デザイン/共通/02_デザイントークン.md) と一致させる。
  - Phase 3 で各画面を移植する際は、まず inline style そのまま持ち込み → 動作確認後に `.module.css` 化、の 2 段階で進める。

## 関連

- 設計書：[`FE/デザイン/共通/02_デザイントークン.md`](../FE/デザイン/共通/02_デザイントークン.md)
- 関連 ADR：0001
