# 0004. 実装ソースの真：claude-design jsx（Pencil は学習用に降格）

- **Status**: Accepted
- **Date**: 2026-05-06
- **決定者**: @RM0428MR

## Context

プロジェクトには 2 系統のデザイン成果物があった：

1. **claude-design/**：Claude Code Design 出力の jsx + uploads PNG。本番 React に直接持ち込み可。
2. **design/pencil/calpis-diary.epgz**：Pencil 上で claude-design を再現した学習用ファイル。11 画面 + 17 components。

途中で「Pencil 由来の誤情報が設計書に混入している可能性」が浮上し、設計書を一度全消ししてゼロから書き直す方針になった。再構築のソースをどちらにするか明示的に決める必要があった。

## Decision

**実装ソースの真 ＝ `claude-design/` jsx + uploads PNG**。Pencil の `.epgz` は **学習目的のみ** とし、本番実装・設計書のいずれにも参照しない。

## Alternatives

| 候補 | Pro | Con |
|---|---|---|
| **claude-design jsx を真**（本案） | 本番 React に直接持ち込める、構造が明示的 | Pencil で書いた成果が学習成果に格下げ |
| Pencil .epgz を真 | デザイナー的には扱いやすい | 暗号化 .pen で diff 不可、再現精度に揺らぎ、本番転用が手間 |
| 両方の良いとこ取り（折衷） | – | どちらが正かが曖昧化、設計書に誤情報が混入する原因そのもの |

## Consequences

- **Pro**：
  - 設計書（[`FE/デザイン/`](../FE/デザイン/)）の根拠が単一になり、「ソースは何？」が常に一意
  - Phase 3 の React 移植で claude-design の jsx を直接コピー → アイランド化、最短ルート
  - Pencil 関連の MCP 操作（`batch_design` / Ctrl+S トリック等）はプロジェクト本流から切り離される
- **Con / 引き受けるリスク**：
  - Pencil で 11 画面再現した時間が「本番に直接寄与しない学習時間」になる（→ ポートフォリオ的にはプロセスとして語れる）
- **フォローアップ**：
  - 設計書を全消し → claude-design jsx をソースにゼロから再構築（共通5本 + 画面別9×2本、計 23 本）→ 完了
  - CLAUDE.md / claude-design/CLAUDE.md / `pencil_mcp_tips.md` 内に「Pencil = 学習用」を明記済
  - Pencil の `.epgz` ファイルは `design/pencil/` 配下に保持（学習成果として）

## 関連

- 決定ログ：`memory/design_decisions_2026-05-06.md`（プロジェクト記憶）
- 設計書：[`FE/デザイン/`](../FE/デザイン/)
- プロジェクト方針：[`CLAUDE.md`](../CLAUDE.md) §4 Pencil ファイルについて
