import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Cloudflare Pages へのデプロイは Phase 4 で adapter を追加する想定。
// 現段階は静的サイト出力（dist/）として運用する。
const devToolbarEnabled = ['1', 'true'].includes((process.env.ASTRO_DEV_TOOLBAR ?? '').toLowerCase());

export default defineConfig({
  site: 'https://review-cal.example',
  integrations: [react()],
  devToolbar: {
    enabled: devToolbarEnabled,
  },
  vite: {
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
    },
    server: {
      allowedHosts: ['.trycloudflare.com'],
    },
  },
});
