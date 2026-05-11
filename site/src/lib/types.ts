// FE/デザイン/共通/04_データスキーマ.md と同期。
// Astro Content Collections の reviews データが満たす型。

export type Variant = 'pet' | 'carton' | 'cup' | 'plastic';
export type Cat = '定番' | '期間限定' | 'コラボ' | 'その他' | '新商品';
export type Mood = 'さっぱり' | '濃厚' | 'フルーティー' | '甘め' | 'すっきり';
export type Season = '春' | '夏' | '秋' | '冬' | '通年';
export type DrinkMethod = 'そのまま' | '氷を入れて' | '牛乳で割って';

export interface MicroCmsImage {
  url: string;
  width?: number;
  height?: number;
}

export interface SubRatings {
  subTaste?: number;       // 味のおいしさ
  subEasy?: number;        // 飲みやすさ
  subSpecial?: number;     // 特別感
  subRepeat?: number;      // リピートしたさ
  subAftertaste?: number;  // あと味
}

export interface ProductInfo {
  infoReleased?: string;
  infoVolume?: string;
  infoType?: string;
}

export interface Review extends SubRatings, ProductInfo {
  id: string;
  slug: string;
  name: string;
  date: string;       // YYYY.MM.DD or YYYY-MM-DD
  variant: Variant;
  tint: string;       // hex
  accent: string;     // hex
  rating: number;     // 0-5
  badge?: string;
  oneLiner: string;
  body?: string;      // HTML
  tags?: string[];
  cat: Cat;
  mood?: Mood[];
  season: Season;
  heroImage?: MicroCmsImage;
  gallery?: MicroCmsImage[];
  officialUrl?: string;
  recommendedDrink?: DrinkMethod;
  recommendedDrinkNote?: string;
}

export const SUB_LABELS: Array<[keyof SubRatings, string]> = [
  ['subTaste', '味のおいしさ'],
  ['subEasy', '飲みやすさ'],
  ['subAftertaste', 'あと味'],
  ['subSpecial', '特別感'],
  ['subRepeat', 'リピートしたさ'],
];

export function visibleSubRatings(r: Review): Array<{ label: string; value: number }> {
  return SUB_LABELS
    .filter(([k]) => typeof r[k] === 'number')
    .map(([k, label]) => ({ label, value: r[k] as number }));
}
