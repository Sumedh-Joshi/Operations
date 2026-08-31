/* ============================================================
   GET /api/leaderboard
   ------------------------------------------------------------
   Returns the best shifts from the shared training log, newest
   sort first by percent then points. Top 15 by default; pass
   ?limit=50 for more, or ?all=1 for the full log (trainer view).

   Same storage and env vars as api/score.js. No npm dependencies.
   ============================================================ */

const KEY = 'srwc:shifts';

/* Vercel's storage integrations use several different env var names
   depending on which one you connect, so accept all of them. */
const STORAGE_VARS = [
  'KV_REST_API_URL', 'KV_REST_API_TOKEN',
  'UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN',
  'REDIS_URL', 'KV_URL'
];

function creds() {
  const e = process.env;

  // 1. REST url + token pairs
  const pairs = [
    [e.KV_REST_API_URL, e.KV_REST_API_TOKEN],
    [e.UPSTASH_REDIS_REST_URL, e.UPSTASH_REDIS_REST_TOKEN]
  ];
  for (const [url, token] of pairs) {
    if (url && token) return { url: String(url).replace(/\/+$/, ''), token };
  }

  // 2. A rediss:// connection string. Upstash serves its REST API on the
  //    same host over https, using the connection password as the token.
  const conn = e.REDIS_URL || e.KV_URL;
  if (conn) {
    try {
      const u = new URL(conn);
      if (u.hostname && u.password) {
        return { url: `https://${u.hostname}`, token: decodeURIComponent(u.password) };
      }
    } catch (err) { /* not a URL we understand */ }
  }

  return null;
}

/* Names only, never values - so a 503 says what is actually wired up. */
function seenVars() {
  return STORAGE_VARS.filter(k => process.env[k]);
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
      error: missing ? 'Shared training log is not connected yet.' : 'Storage unavailable.',
      storage_env_vars_found: seenVars(),
      hint: missing
        ? 'Connect a Redis database in the Vercel Storage tab, then redeploy.'
        : String(e.message).slice(0, 200)
    });
  }
};
