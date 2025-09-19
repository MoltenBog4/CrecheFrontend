import { useEffect, useState } from 'react';
import { listNewsletters, latestNewsletter, type NewsletterItem } from '../api/client';

export default function NewsletterListPage() {
  const [latest, setLatest] = useState<NewsletterItem | null>(null);
  const [items, setItems] = useState<NewsletterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const apiBase = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');
  const feedUrl = `${apiBase}/api/newsletter/feed`;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [lt, all] = await Promise.all([latestNewsletter(), listNewsletters()]);
        if (!mounted) return;
        setLatest(lt);
        setItems(all);
      } catch (e: any) {
        setErr(e.message || 'Failed to load newsletters');
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const copyFeed = async () => {
    try {
      await navigator.clipboard.writeText(feedUrl);
      alert('RSS feed URL copied!');
    } catch { /* ignore */ }
  };

  const fmtSize = (n: number) => {
    if (!n || n < 1024) return (n ?? 0) + ' B';
    const u = ['KB','MB','GB']; let i = -1; do { n /= 1024; i++; } while (n >= 1024 && i < u.length-1);
    return `${n.toFixed(1)} ${u[i]}`;
  };

  const link = (relUrl: string) => `${apiBase}${relUrl}`;

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', fontFamily: 'system-ui,sans-serif' }}>
      <h2 style={{ marginBottom: 4 }}>Newsletters</h2>
      <div style={{ marginBottom: 16, color: '#666' }}>
        Download PDFs below or subscribe via RSS.
      </div>

      {/* RSS box */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 24 }}>
        <input
          readOnly
          value={feedUrl}
          style={{ flex: 1, padding: '8px 10px', border: '1px solid #ccc', borderRadius: 6 }}
        />
        <a href={feedUrl} target="_blank" rel="noreferrer"
           style={{ padding: '8px 10px', border: '1px solid #09c', borderRadius: 6, textDecoration: 'none' }}>
          Open RSS
        </a>
        <button onClick={copyFeed} style={{ padding: '8px 10px', borderRadius: 6 }}>Copy</button>
      </div>

      {loading && <div>Loading…</div>}
      {err && <pre style={{ color: 'crimson', whiteSpace: 'pre-wrap' }}>{err}</pre>}

      {/* Latest */}
      {latest && (
        <div style={{
          border: '1px solid #ddd', borderRadius: 10, padding: 16, marginBottom: 18,
          background: '#f7fbff'
        }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Latest</div>
          <div style={{ fontSize: 18, marginBottom: 6 }}>{latest.title}</div>
          <div style={{ color: '#555', marginBottom: 10 }}>
            {latest.publishedAt ? new Date(latest.publishedAt).toLocaleString() : '—'} · {fmtSize(latest.sizeBytes)}
          </div>
          <a href={link(latest.url)} target="_blank" rel="noreferrer"
             style={{ padding: '8px 12px', borderRadius: 6, background: '#0a7', color: '#fff', textDecoration: 'none' }}>
            Download PDF
          </a>
        </div>
      )}

      {/* All */}
      <div style={{ borderTop: '1px solid #eee', paddingTop: 10 }}>
        {items.map(it => (
          <div key={it.fileName} style={{
            display: 'flex', justifyContent: 'space-between',
            borderBottom: '1px solid #f0f0f0', padding: '10px 0'
          }}>
            <div>
              <div style={{ fontWeight: 600 }}>{it.title}</div>
              <div style={{ color: '#555', fontSize: 13 }}>
                {it.publishedAt ? new Date(it.publishedAt).toLocaleString() : '—'} · {fmtSize(it.sizeBytes)}
              </div>
            </div>
            <div>
              <a href={link(it.url)} target="_blank" rel="noreferrer"
                 style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #0a7', textDecoration: 'none' }}>
                Download
              </a>
            </div>
          </div>
        ))}
        {!loading && !err && items.length === 0 && (
          <div style={{ color: '#777', padding: '8px 0' }}>No newsletters found.</div>
        )}
      </div>
    </div>
  );
}
