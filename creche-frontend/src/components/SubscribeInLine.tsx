import { useState } from 'react';
import { subscribeNewsletter } from '../api/client';

export default function SubscribeInline() {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState<string|undefined>();
  const [err, setErr] = useState<string|undefined>();

  async function go(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setOk(undefined); setErr(undefined);
    try {
      const res = await subscribeNewsletter(email.trim());
      setOk(res.alreadySubscribed ? 'Already subscribed—thanks!' : 'Subscribed! Check your inbox.');
      setEmail('');
    } catch (ex: any) {
      setErr(ex.message || 'Failed');
    } finally { setBusy(false); }
  }

  return (
    <form onSubmit={go} style={{ display: 'flex', gap: 8 }}>
      <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
      <button disabled={busy}>{busy ? '...' : 'Subscribe'}</button>
      {ok && <span style={{ color:'green' }}>{ok}</span>}
      {err && <span style={{ color:'crimson' }}>{err}</span>}
    </form>
  );
}
