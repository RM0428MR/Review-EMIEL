import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Cloudflare Pages へのデプロイは Phase 4 で adapter を追加する想定。
// 現段階は静的サイト出力（dist/）として運用する。
export default defineConfig({
  site: 'https://review-cal.example',
  integrations: [react()],
  vite: {
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
    },
  },
});
