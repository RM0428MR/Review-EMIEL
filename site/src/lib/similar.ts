import type { Review } from './types';

// 同カテゴリ OR 共通タグ → rating 上位 N。
export function getSimilarReviews(r: Review, all: Review[], limit = 3): Review[] {
  return all
    .filter((x) => x.slug !== r.slug)
    .filter((x) => x.cat === r.cat || (x.tags?.some((t) => r.tags?.includes(t)) ?? false))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}
