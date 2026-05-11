// Astro Content Collections をレビュー正本として扱う互換レイヤ。
// 既存ページの呼び出し側を変えずに、データ源だけを差し替える。
//
// ここで担う「保守性のための不変条件」:
//   1. id は常に Content Collections の entry.id（= ファイル名から拡張子を除いたもの）と一致させる。
//      → JSON 側で誤った id を入れても無効化される。ReviewImage 等の `r.id` 参照が壊れない。
//   2. slug が JSON にあれば尊重する。無ければ entry.id をフォールバックに使う。
//   3. slug の重複は早期に検出して例外を投げる（静かに壊さない）。
//   4. date は文字列ソートが効く正規形（YYYY.MM.DD）に正規化する。
//      混在（YYYY-MM-DD / YYYY.MM.DD）でもソートが破綻しないようにするため。
//   5. 並び順は (orders) を尊重しつつ、最終的には slug をタイブレーカに使い決定的にする。

import { getCollection } from 'astro:content';
import type { Review } from './types';

export interface ListQuery {
  limit?: number;
  offset?: number;
  orders?: string;
  filters?: string;
}

function normalizeDate(d: string): string {
  // 'YYYY-MM-DD' / 'YYYY.MM.DD' どちらでも 'YYYY.MM.DD' に揃える。
  // string sort で正しく時系列にならぶようにするための正規化。
  return d.replaceAll('-', '.');
}

function compareReviewField(a: Review, b: Review, field: keyof Review): number {
  const av = a[field];
  const bv = b[field];
  if (av == null && bv == null) return 0;
  if (av == null) return 1;
  if (bv == null) return -1;
  if (av < bv) return -1;
  if (av > bv) return 1;
  return 0;
}

function sortReviews(contents: Review[], orders?: string): Review[] {
  const keys = (orders ?? '').split(',').map((k) => k.trim()).filter(Boolean);
  return [...contents].sort((a, b) => {
    for (const key of keys) {
      const desc = key.startsWith('-');
      const field = (desc ? key.slice(1) : key) as keyof Review;
      const cmp = compareReviewField(a, b, field);
      if (cmp !== 0) return desc ? -cmp : cmp;
    }
    // 安定したタイブレーカとして slug を使う。
    // 同日付・同評価の商品が増えても並びがブレないようにする。
    return a.slug.localeCompare(b.slug);
  });
}

// 旧 microCMS 互換の filters 文字列。
// "field[equals]value" / "field[contains]value" を最低限サポートする。
function applyFilters(contents: Review[], filters?: string): Review[] {
  if (!filters) return contents;
  const match = filters.match(/^([a-zA-Z0-9_]+)\[(equals|contains)\](.+)$/);
  if (!match) return contents;
  const [, field, op, value] = match;
  const key = field as keyof Review;
  return contents.filter((review) => {
    const v = review[key];
    if (v == null) return false;
    if (op === 'equals') return String(v) === value;
    return String(v).includes(value);
  });
}

let cache: Review[] | null = null;

async function loadAllReviews(): Promise<Review[]> {
  if (cache) return cache;
  const entries = await getCollection('reviews');
  const seen = new Map<string, string>(); // slug -> entry.id
  const reviews: Review[] = entries.map((entry) => {
    const data = entry.data;
    // entry.id は Content Collections のファイル ID（拡張子なし）。これを id の真実とする。
    const id = entry.id;
    const slug = data.slug ?? id;
    const date = normalizeDate(data.date);
    const review: Review = { ...data, id, slug, date };
    const previous = seen.get(slug);
    if (previous) {
      throw new Error(
        `[reviews] Duplicate slug "${slug}" in entries "${previous}" and "${id}". ` +
          `Each review JSON must have a unique slug (or unique filename).`,
      );
    }
    seen.set(slug, id);
    return review;
  });
  cache = reviews;
  return reviews;
}

export async function listReviews(query?: ListQuery): Promise<{ contents: Review[]; totalCount: number }> {
  let contents = await loadAllReviews();
  contents = applyFilters(contents, query?.filters);
  contents = sortReviews(contents, query?.orders);
  const totalCount = contents.length;
  if (query?.offset) contents = contents.slice(query.offset);
  if (query?.limit) contents = contents.slice(0, query.limit);
  return { contents, totalCount };
}

export async function getReviewBySlug(slug: string): Promise<Review | undefined> {
  const { contents } = await listReviews({ filters: `slug[equals]${slug}`, limit: 1 });
  return contents[0];
}
