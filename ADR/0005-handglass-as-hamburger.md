# 0005. ナビゲーション：HandGlass（カップ）をハンバーガー扱いに統一

- **Status**: Accepted
- **Date**: 2026-05-06
- **決定者**: @RM0428MR

## Context

ナビゲーション UI の決定。元のモック（claude-design）には：

- デスクトップ：`SiteHeader`（左ロゴ + 中央 nav 6 項目 + 右上に HandGlass = ただの装飾）
- デスクトップ用ドロワー：`pages-2.jsx NavigationPage`（右からスライドイン、ロゴクラスタ + nav 6 行 + SNS + 雲帯 + Bear）
- モバイル：`pages-mobile.jsx MHeader`（左ロゴ + 右に検索/メニュー）+ `MTabBar`（ボトムタブ 5 項目）+ `MobileNav`（ドロワー）

これらをどう統合するか決める必要があった。特に右上の HandGlass（カップ）を「装飾」のままにするか、何かトリガーにするか。

## Decision

**右上の HandGlass（カップ）をハンバーガーメニューのトリガーとして昇格**させ、デスクトップ・モバイル共通で「クリック → NavDrawer 開く」の挙動を持たせる。

- デスクトップ：従来の中央 nav 6 項目はそのまま残す（メイン導線）+ 右上 HandGlass で Drawer も開ける（補助・SNS 等への導線）
- モバイル：中央 nav は MHeader で隠す + 右上 HandGlass = 唯一の Drawer トリガー
- ボトムには `MobileBottomTab`（5 項目：home / review / ranking / archive / contact）を常時表示

## Alternatives

| 候補 | Pro | Con |
|---|---|---|
| **HandGlass を Drawer トリガーに昇格**（本案） | ナビ仕様が 1 系統で済む、モック装飾が機能を持つ、claude-design の `pages-2.jsx NavigationPage` の右ペインをそのまま使える | 装飾に見えてクリックできることが直感的でない可能性 |
| ハンバーガーアイコン（≡）を別途追加 | 既知のパターンで分かりやすい | 装飾の HandGlass が無意味、UI 要素が増える |
| Drawer 自体を持たない | 最小構成 | About / SNS など Drawer のみで到達したい項目の導線が無くなる |
| デスクトップは中央 nav のみ・モバイルは別パターン | パターン分離 | 仕様 2 系統、実装が増える |

## Consequences

- **Pro**：
  - ナビ仕様が一貫（デスクトップ・モバイルとも HandGlass = Drawer）
  - 既存の HandGlass 装飾が機能を持ち、UI 要素が増えない
  - `pages-2.jsx NavigationPage` の Drawer を直接 React アイランド化できた（実装コスト最小）
  - Drawer に SNS / About 等の補助導線を集約でき、ヘッダー・フッターが軽くなる
- **Con / 引き受けるリスク**：
  - HandGlass がボタンに見えない可能性 → `aria-label="メニューを開く"` + ホバー時のカーソル変化で補完。視覚的なヒント（小さな ≡ 重ねるなど）は Phase 4 で必要に応じて追加
- **フォローアップ**：
  - `<NavDrawer client:load />` を React アイランドで実装（Esc キー / オーバーレイクリックで close）
  - モバイルでは MobileBottomTab を併設して、頻出 5 項目はタップ 1 回で到達できるようにする

## 関連

- 設計書 [`06_モバイル設計.md`](../FE/デザイン/共通/06_モバイル設計.md) §Drawer / §MTabBar
- 設計書 [`01_情報設計.md`](../FE/デザイン/共通/01_情報設計.md) §グローバルナビゲーション
- claude-design 参照：`pages-2.jsx:593-882`（NavigationPage）/ `pages-mobile.jsx`（MHeader, MTabBar）
- 関連 ADR：0004（実装ソースの真）
