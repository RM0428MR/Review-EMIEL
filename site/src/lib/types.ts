// FE/デザイン/共通/04_データスキーマ.md と同期。
// microCMS Review API + ローカルモックデータの両方が満たす型。

export type Variant = 'pet' | 'carton' | 'cup' | 'plastic';
export type Cat = '定番' | '期間限定' | 'コラボ' | 'その他' | '新商品';
export type Mood = 'さっぱり' | '濃厚' | 'フルーティー' | '甘め' | 'すっきり';
export type Season = '春' | '夏' | '秋' | '冬' | '通年';

export interface MicroCmsImage {
  url: string;
  width?: number;
  height?: number;
}

export interface SubRatings {
  subAmasa?: number;   // 甘さ
  subKoisa?: number;   // 濃さ
  subSappari?: number; // さっぱり感
  subMilk?: number;    // ミルク感
  subRepeat?: number;  // リピしたい度
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
}

export const SUB_LABELS: Array<[keyof SubRatings, string]> = [
  ['subAmasa', '甘さ'],
  ['subKoisa', '濃さ'],
  ['subSappari', 'さっぱり感'],
  ['subMilk', 'ミルク感'],
  ['subRepeat', 'リピしたい度'],
];

export function visibleSubRatings(r: Review): Array<{ label: string; value: number }> {
  return SUB_LABELS
    .filter(([k]) => typeof r[k] === 'number')
    .map(([k, label]) => ({ label, value: r[k] as number }));
}
