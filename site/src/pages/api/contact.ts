// Cloudflare Pages Function — Phase 4 で本格運用。
// 現状は受信内容を 200 で返すスタブ実装（Discord Webhook / Turnstile はデプロイ後に有効化）。
import type { APIRoute } from 'astro';

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  company?: string;        // honeypot
  turnstileToken?: string; // Phase 4 で利用
}

export const POST: APIRoute = async ({ request }) => {
  const body = (await request.json().catch(() => ({}))) as ContactPayload;

  // honeypot
  if (body.company) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  // バリデーション（フロントと同じ）
  if (!body.name || !body.email || !body.subject || !(body.message ?? '').length || (body.message ?? '').length < 5) {
    return new Response(JSON.stringify({ ok: false, error: 'invalid' }), { status: 400 });
  }

  // Phase 4：Turnstile 検証 + Discord Webhook 投稿
  // const env = (locals as any).runtime.env;
  // const t = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
  //   method: 'POST',
  //   body: new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: body.turnstileToken ?? '' }),
  // }).then((r) => r.json());
  // if (!t.success) return new Response(JSON.stringify({ ok: false, error: 'turnstile' }), { status: 400 });
  // await fetch(env.DISCORD_WEBHOOK_URL, { ... });

  return new Response(JSON.stringify({ ok: true, stub: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
