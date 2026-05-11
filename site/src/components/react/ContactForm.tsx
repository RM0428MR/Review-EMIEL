import { useState } from 'react';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const FIELDS: Array<{ key: keyof FormState; label: string; placeholder: string; type?: string }> = [
  { key: 'name', label: 'お名前', placeholder: '例) エミエルだいすき' },
  { key: 'email', label: 'メールアドレス', placeholder: '例) emiel.love@gmail.com', type: 'email' },
  { key: 'subject', label: '件名', placeholder: '例) 感想を伝えたいです！' },
];

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const update = (k: keyof FormState, v: string) => {
    setForm((s) => ({ ...s, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: Errors = {};
    if (!form.name) er.name = 'お名前を入力してください';
    if (!form.email || !/.+@.+\..+/.test(form.email)) er.email = '正しいメールアドレスを入力してください';
    if (!form.subject) er.subject = '件名を入力してください';
    if (!form.message || form.message.length < 5) er.message = '5文字以上で入力してください';
    if (Object.keys(er).length) {
      setErrors(er);
      return;
    }
    setSending(true);
    setServerError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, company: '' }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? `送信に失敗しました（${res.status}）`);
      }
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setServerError((err as Error).message);
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="cf-form" onSubmit={submit}>
      {sent && (
        <div className="banner success" role="status" aria-live="polite">
          ✓ メッセージを送信しました！ありがとうございます〜♡
        </div>
      )}
      {serverError && (
        <div className="banner err" role="status" aria-live="polite">
          {serverError}
        </div>
      )}

      {FIELDS.map((f) => (
        <div key={f.key} className="row">
          <label htmlFor={f.key}>
            {f.label} <span className="req" aria-hidden="true">*</span>
          </label>
          <div>
            <input
              id={f.key}
              type={f.type ?? 'text'}
              value={form[f.key]}
              placeholder={f.placeholder}
              onChange={(e) => update(f.key, e.target.value)}
              aria-required="true"
              aria-invalid={!!errors[f.key]}
              className={errors[f.key] ? 'err' : ''}
            />
            {errors[f.key] && <div className="err-msg">{errors[f.key]}</div>}
          </div>
        </div>
      ))}

      <div className="row">
        <label htmlFor="message">
          メッセージ <span className="req" aria-hidden="true">*</span>
        </label>
        <div>
          <textarea
            id="message"
            rows={3}
            value={form.message}
            placeholder="例) いつもレビューを楽しみにしています！"
            onChange={(e) => update('message', e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.message}
            className={errors.message ? 'err' : ''}
          />
          {errors.message && <div className="err-msg">{errors.message}</div>}
        </div>
      </div>

      {/* honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: 'absolute', left: '-9999.04px' }}
        aria-hidden="true"
      />

      <div className="actions">
        <button type="submit" disabled={sending} aria-busy={sending}>
          {sending ? '送信中…' : '➤ 送信する'}
        </button>
      </div>
      <p className="note">※ 内容を確認後、できるだけ早くお返事させていただきます。</p>

      {/* hydration mismatch 回避: <style> 内の特殊文字は React が SSR で
          escape するが <style> は RAW_TEXT で browser が decode しない。
          dangerouslySetInnerHTML で escape を回避する。 */}
      <style dangerouslySetInnerHTML={{ __html: `
        .cf-form {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .cf-form .banner {
          padding: 12px;
          border-radius: 10px;
          font-size: 12px;
          margin-bottom: 16px;
          font-family: var(--font-jp);
        }
        .cf-form .banner.success { background: #eaf4fc; color: var(--accent); }
        .cf-form .banner.err { background: #fde0e6; color: var(--pink-text); }
        .cf-form .row {
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 12px;
          margin-bottom: 14px;
          align-items: start;
          border-bottom: none;
          padding: 0;
        }
        .cf-form label {
          font-size: 12px;
          color: var(--ink-secondary);
          padding-top: 4px;
          font-family: var(--font-jp);
        }
        .cf-form .req { color: var(--pink-mid); }
        .cf-form input,
        .cf-form textarea {
          width: 100%;
          padding: 4px 12px;
          border: 1px solid rgba(122, 169, 217, 0.25);
          border-radius: 10px;
          font-size: 12px;
          font-family: var(--font-jp);
          background: var(--bg-card-soft);
          color: var(--ink-primary);
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .cf-form input:focus,
        .cf-form textarea:focus {
          border-color: rgba(122, 169, 217, 0.55);
          box-shadow: 0 0 0 2px rgba(168, 200, 232, 0.3);
        }
        .cf-form input.err,
        .cf-form textarea.err { border-color: var(--pink-mid); }
        .cf-form textarea { resize: vertical; min-height: 70px; }
        .cf-form .err-msg { font-size: 10px; color: var(--pink-mid); margin-top: 4px; }
        .cf-form .actions { text-align: center; margin-top: auto; padding-top: 6px; }
        .cf-form button[type="submit"] {
          padding: 8px 56px;
          font-size: 14px;
          font-family: var(--font-jp);
          background: linear-gradient(135deg, var(--accent) 0%, var(--accent-mid) 100%);
          color: #fff;
          border: none;
          border-radius: 999.008px;
          cursor: pointer;
          box-shadow: var(--shadow-cta);
        }
        .cf-form button[type="submit"]:disabled { opacity: 0.6; cursor: not-allowed; }
        .cf-form .note { font-size: 10px; margin-top: 8px; color: var(--ink-tertiary-2); text-align: center; }
      ` }} />
    </form>
  );
}
