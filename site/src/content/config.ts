import { defineCollection, z } from 'astro:content';

const site = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    catch: z.string().optional(),
    intro: z.string().optional(),
    avatar: z.string().optional(),
    heroBubble: z.string().optional(),
    profile: z
      .object({
        reviewCount: z.string().optional(),
        favoriteFlavor: z.string().optional(),
        timing: z.string().optional(),
        favoriteWay: z.string().optional(),
        updateRhythm: z.string().optional(),
      })
      .optional(),
    capabilities: z
      .array(
        z.object({
          title: z.string(),
          body: z.string(),
          icon: z.enum(['cup', 'heart', 'sparkle']).optional(),
        }),
      )
      .optional(),
    topics: z
      .array(
        z.object({
          title: z.string(),
          body: z.string(),
        }),
      )
      .optional(),
  }),
});

const reviews = defineCollection({
  type: 'data',
  schema: z.object({
    // id / slug は省略可。省略時は Content Collections の entry.id（= ファイル名）を採用する。
    // src/lib/microcms.ts の loadAllReviews で必ず entry.id が id に上書きされるため、
    // ここでは「あれば検証する」緩い扱いにする。
    id: z.string().optional(),
    slug: z.string().regex(/^[a-z0-9][a-z0-9-]*$/i, {
      message: 'slug は半角英数字とハイフンのみで指定する（例: "ichigo-mint"）',
    }).optional(),
    name: z.string(),
    // 受け入れる日付フォーマットを明示。文字列ソートが効く形式に揃えるため。
    date: z.string().regex(/^\d{4}[.\-]\d{2}[.\-]\d{2}$/, {
      message: 'date は "YYYY.MM.DD" もしくは "YYYY-MM-DD" 形式で指定する',
    }),
    variant: z.enum(['pet', 'carton', 'cup', 'plastic']),
    tint: z.string(),
    accent: z.string(),
    rating: z.number(),
    badge: z.string().optional(),
    oneLiner: z.string(),
    body: z.string().optional(),
    tags: z.array(z.string()).optional(),
    cat: z.enum(['定番', '期間限定', 'コラボ', 'その他', '新商品']),
    mood: z.array(z.enum(['さっぱり', '濃厚', 'フルーティー', '甘め', 'すっきり'])).optional(),
    season: z.enum(['春', '夏', '秋', '冬', '通年']),
    heroImage: z.object({
      url: z.string(),
      width: z.number().optional(),
      height: z.number().optional(),
    }).optional(),
    gallery: z.array(z.object({
      url: z.string(),
      width: z.number().optional(),
      height: z.number().optional(),
    })).optional(),
    officialUrl: z.string().optional(),
    recommendedDrink: z.enum(['そのまま', '氷を入れて', '牛乳で割って']).optional(),
    recommendedDrinkNote: z.string().optional(),
    subTaste: z.number().optional(),
    subEasy: z.number().optional(),
    subSpecial: z.number().optional(),
    subRepeat: z.number().optional(),
    subAftertaste: z.number().optional(),
    infoReleased: z.string().optional(),
    infoVolume: z.string().optional(),
    infoType: z.string().optional(),
  }),
});

export const collections = { site, reviews };
