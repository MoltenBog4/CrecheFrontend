import { useState } from 'react';
import { subscribeNewsletter } from '../api/client';

export default function SubscribePage() {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setOk(null); setErr(null);
    try {
      const res = await subscribeNewsletter(email.trim());
      setOk(res.alreadySubscribed ? 'Already subscribed — thanks!' : 'Subscribed!');
      setEmail('');
    } catch (ex: any) {
      setErr(ex.message || 'Subscription failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ maxWidth: 560, margin: '3rem auto', fontFamily: 'system-ui,sans-serif' }}>
      <h2>Subscribe to our Newsletter</h2>
      <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ flex: 1, padding: '10px 12px', border: '1px solid #ccc', borderRadius: 6 }}
        />
        <button disabled={busy} style={{ padding: '10px 14px', borderRadius: 6 }}>
          {busy ? 'Saving…' : 'Subscribe'}
        </button>
      </form>
      {ok && <div style={{ color: 'green', marginTop: 10 }}>{ok}</div>}
      {err && <div style={{ color: 'crimson', marginTop: 10, whiteSpace: 'pre-wrap' }}>{err}</div>}
    </div>
  );
}
