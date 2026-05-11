/// <reference types="@cloudflare/workers-types" />

// Cloudflare Worker entry point.
// - POST /api/contact: Contact フォーム受信 + (任意) Discord Webhook 通知
// - その他のパス: ASSETS binding に委譲して静的アセットを配信

export interface Env {
  ASSETS: Fetcher;
  DISCORD_WEBHOOK_URL?: string;
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  company?: unknown;
  turnstileToken?: unknown;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/contact' && request.method === 'POST') {
      return handleContact(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleContact(request: Request, env: Env): Promise<Response> {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  // honeypot: bot が入力する隠しフィールド。値があれば silently accept
  if (typeof body.company === 'string' && body.company.length > 0) {
    return Response.json({ ok: true }, { status: 200 });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name || !email || !subject || message.length < 5) {
    return Response.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: 'invalid_email' }, { status: 400 });
  }

  // Discord webhook 通知 (任意)。secret 未設定なら skip して 200 を返す。
  if (env.DISCORD_WEBHOOK_URL) {
    try {
      const res = await fetch(env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [
            {
              title: '📩 EMIEL diary review — Contact 受信',
              color: 0x7aa9d9,
              fields: [
                { name: '名前', value: name.slice(0, 256), inline: true },
                { name: 'メール', value: email.slice(0, 256), inline: true },
                { name: '件名', value: subject.slice(0, 256) },
                { name: 'メッセージ', value: message.slice(0, 1024) },
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
      if (!res.ok) {
        console.error('Discord webhook failed', res.status);
      }
    } catch (error) {
      console.error('Discord webhook error', error);
    }
  }

  return Response.json({ ok: true }, { status: 200 });
}
