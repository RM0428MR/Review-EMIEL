// microCMS クライアント。環境変数が設定されている時のみ実 API、
// 未設定時は src/data/reviews.ts のモックを返す（開発初期用）。

import { createClient } from 'microcms-js-sdk';
import type { Review } from './types';
import { MOCK_REVIEWS } from '../data/reviews';

const SERVICE_DOMAIN = import.meta.env.MICROCMS_SERVICE_DOMAIN;
const API_KEY = import.meta.env.MICROCMS_API_KEY;

const useMock = !SERVICE_DOMAIN || !API_KEY;

const client = useMock
  ? null
  : createClient({ serviceDomain: SERVICE_DOMAIN, apiKey: API_KEY });

export interface ListQuery {
  limit?: number;
  offset?: number;
  orders?: string;
  filters?: string;
}

export async function listReviews(query?: ListQuery): Promise<{ contents: Review[]; totalCount: number }> {
  if (useMock || !client) {
    let contents = [...MOCK_REVIEWS];
    if (query?.orders) {
      const orders = query.orders.split(',');
      contents.sort((a, b) => {
        for (const o of orders) {
          const desc = o.startsWith('-');
          const k = (desc ? o.slice(1) : o) as keyof Review;
          const av = a[k]; const bv = b[k];
          if (av == null || bv == null) continue;
          if (av < bv) return desc ? 1 : -1;
          if (av > bv) return desc ? -1 : 1;
        }
        return 0;
      });
    }
    const total = contents.length;
    if (query?.offset) contents = contents.slice(query.offset);
    if (query?.limit) contents = contents.slice(0, query.limit);
    return { contents, totalCount: total };
  }
  const res = await client.getList<Review>({ endpoint: 'reviews', queries: query });
  return { contents: res.contents, totalCount: res.totalCount };
}

export async function getReviewBySlug(slug: string): Promise<Review | undefined> {
  if (useMock || !client) {
    return MOCK_REVIEWS.find((r) => r.slug === slug);
  }
  const res = await client.getList<Review>({
    endpoint: 'reviews',
    queries: { filters: `slug[equals]${slug}`, limit: 1 },
  });
  return res.contents[0];
}
