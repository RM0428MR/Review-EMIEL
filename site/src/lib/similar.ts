import type { Review } from './types';

// 関連商品 (商品詳細画面の「似ているかも？」セクション) 選出アルゴリズム。
//
// 3 段階の tier で limit 件を確保する:
//   Tier 1: 同カテゴリ または 共通タグ (最も関連性が高い)
//   Tier 2: + 共通 mood (味わい・気分が近いもの)
//   Tier 3: + 上位評価 (どうしてもマッチしない場合の最終フォールバック)
//
// なぜ Tier 2 / Tier 3 が必要か:
//   THE RICH のように cat:新商品 が唯一・tags:[新商品, 濃厚, ご褒美] が他製品と
//   重複ゼロなケースでは Tier 1 のみだと結果 0 件 → セクション非表示になる。
//   frozen / sherbet も Tier 1 だけだと 1-2 件で 3 列 grid が半端な行になる。
//   Tier 3 fallback により、任意の製品で 3 件 (limit) を保証する。
export function getSimilarReviews(r: Review, all: Review[], limit = 3): Review[] {
  const others = all.filter((x) => x.slug !== r.slug);

  // Tier 1: 同カテゴリ OR 共通タグ
  const tier1 = others.filter(
    (x) =>
      x.cat === r.cat ||
      (x.tags?.some((t) => r.tags?.includes(t)) ?? false),
  );
  if (tier1.length >= limit) {
    return [...tier1].sort((a, b) => b.rating - a.rating).slice(0, limit);
  }

  // Tier 2: + 共通 mood
  const tier1Slugs = new Set(tier1.map((x) => x.slug));
  const tier2 = others.filter(
    (x) =>
      !tier1Slugs.has(x.slug) &&
      (x.mood?.some((m) => r.mood?.includes(m)) ?? false),
  );
  const combined = [...tier1, ...tier2];
  if (combined.length >= limit) {
    return [...combined].sort((a, b) => b.rating - a.rating).slice(0, limit);
  }

  // Tier 3: 上位評価フォールバック
  const usedSlugs = new Set(combined.map((x) => x.slug));
  const fallback = others
    .filter((x) => !usedSlugs.has(x.slug))
    .sort((a, b) => b.rating - a.rating);
  return [...combined, ...fallback].slice(0, limit);
}
