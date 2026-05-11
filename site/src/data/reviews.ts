// 「すべて」は UI 上のフィルタリセット用ラベル。
// 「カテゴリ値」としては使わず、絞り込みは CAT_VALUES の何れかに対してのみ行う。
export const CATEGORIES = ['すべて', '定番', '期間限定', 'コラボ', '新商品', 'その他'] as const;
export const CAT_VALUES = CATEGORIES.filter((c) => c !== 'すべて') as readonly Exclude<
  (typeof CATEGORIES)[number],
  'すべて'
>[];
export const MOODS = ['さっぱり', '濃厚', 'フルーティー', '甘め', 'すっきり'] as const;
export const SEASONS = ['春', '夏', '秋', '冬', '通年'] as const;
