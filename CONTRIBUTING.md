# CONTRIBUTING

個人開発リポジトリだが、ポートフォリオ用途で履歴を綺麗に残すためのルール。

## ブランチ運用

- `main`：常に動く。直 push は原則しない（small typo 等の例外のみ）。
- `feat/<scope>-<short>` / `fix/<scope>-<short>` / `docs/<scope>` / `refactor/<scope>` / `chore/<scope>`：作業ブランチ。
- 1 ブランチ ＝ 1 PR ＝ 1 トピック。複数機能を 1 PR にまとめない。

例：
- `feat/home-hero-section`
- `fix/review-detail-similar-empty`
- `docs/adr-0005-pagefind`

## コミットメッセージ（Conventional Commits 準拠）

```
<type>(<scope>): <subject>

<body>

<footer>
```

| type | 用途 |
|---|---|
| `feat` | 新機能 |
| `fix` | バグ修正 |
| `docs` | ドキュメント／設計書／ADR／DevLog |
| `style` | フォーマットのみ（コード意味変えない） |
| `refactor` | 振る舞い変えない構造変更 |
| `perf` | 性能改善 |
| `test` | テスト追加・修正 |
| `chore` | ビルド・依存・設定など |

scope は概ねディレクトリ単位：`home`, `review`, `ranking`, `archive`, `contact`, `about`, `404`, `search`, `design-tokens`, `microcms`, `cfp`, `pencil`, `adr`, `devlog`, `readme` 等。

例：
- `feat(home): Hero セクションをマークアップ`
- `fix(review-detail): サブ評価が全空のときセクションを非表示`
- `docs(adr): 0005 Pagefind 採用を記録`
- `chore(deps): Astro を 5.x 系へ更新`

subject は **日本語OK**、命令形（〜する／〜を追加 等）。50 文字以内目安。

## PR 運用

- セルフマージ可（個人開発のため）。
- ただし **PR description は埋める**：
  - **目的**（なぜやるか）
  - **変更点**（何を変えたか、3〜10 行）
  - **動作確認**（スクショ or `npm run build` 通過 等）
  - **関連 Issue / ADR / DevLog**
- Squash merge を既定（merge commit / rebase は使わない）。
- ラベル：`type:feat` `type:fix` `type:docs` `area:home` `area:review` … で分類。

PR テンプレ：[`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md)

## Issue 運用

- 全タスクは Issue にする（roadmap 上の 1 行を起点に開く）。
- テンプレ 3 種：
  - `feature.yml` 機能追加
  - `bug.yml` 不具合
  - `task.yml` 作業（リファクタ・調査・ドキュメント）
- ラベルは PR と共通。マイルストーンを Phase 単位で切る（`Phase 2 設計書`, `Phase 3 実装`, `Phase 4 公開`）。

## ADR

設計判断（採用／不採用、トレードオフ）は [`ADR/`](ADR/) に書く。フォーマットは [`ADR/0000-template.md`](ADR/0000-template.md)。

書くタイミング：
- スタック・フレームワークを選んだ／変えた
- 大きなディレクトリ構造を変えた
- 既存方針を覆した

書かないこと：
- 細かい実装の選択（変数名、CSS 値の調整）
- 一時的な workaround

## DevLog

開発週報を [`docs/devlog/`](docs/devlog/) に書く。

- ファイル名：`YYYY-MM-WN.md`（例：`2026-05-W1.md`）
- 内容：その週にやったこと／詰まったこと／次週やること／スクショ。
- 書き口は緩め。ポートフォリオで読まれるので「考えながら作っている」過程が残るように。

## 公開タイミング

リポジトリは現在 private。実装が一段落（Phase 3 終わり）か、公開しても恥ずかしくない README + デプロイ済み URL が揃ったタイミングで public 化する。
