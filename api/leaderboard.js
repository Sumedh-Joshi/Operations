/* ============================================================
   GET /api/leaderboard
   ------------------------------------------------------------
   Returns the best shifts from the shared training log, newest
   sort first by percent then points. Top 15 by default; pass
   ?limit=50 for more, or ?all=1 for the full log (trainer view).

   Same storage and env vars as api/score.js. No npm dependencies.
   ============================================================ */

const KEY = 'srwc:shifts';

function creds() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/+$/, ''), token } : null;
}

async function redis(cmd) {
  const c = creds();
  if (!c) throw new Error('no-store');
  const r = await fetch(c.url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${c.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd)
  });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.result;
}

const byBest = (a, b) =>
  (b.percent || 0) - (a.percent || 0) || (b.points || 0) - (a.points || 0);

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Use GET.' });
  }

  try {
    const raw = (await redis(['LRANGE', KEY, 0, -1])) || [];
    const rows = raw.map(s => { try { return JSON.parse(s); } catch (e) { return null; } })
                    .filter(Boolean);

    const q = req.query || {};
    if (q.all === '1') {
      // Full log, newest first - for a trainer reviewing completions.
      rows.sort((a, b) => String(b.played_at || '').localeCompare(String(a.played_at || '')));
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).json(rows);
    }

    const limit = Math.min(100, Math.max(1, parseInt(q.limit, 10) || 15));
    rows.sort(byBest);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json(rows.slice(0, limit));
  } catch (e) {
    const missing = e.message === 'no-store';
    return res.status(503).json({
      error: missing ? 'Shared training log is not connected yet.' : 'Storage unavailable.'
    });
  }
};
