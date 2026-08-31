/* ============================================================
   POST /api/score
   ------------------------------------------------------------
   Records one finished shift in the shared training log and
   returns the player's rank.

   Storage is Upstash Redis, called over its REST API with plain
   fetch, so this function has no npm dependencies at all.

   Environment variables (Vercel injects these when you connect
   the Upstash / KV integration - either naming works):
     KV_REST_API_URL   or  UPSTASH_REDIS_REST_URL
     KV_REST_API_TOKEN or  UPSTASH_REDIS_REST_TOKEN

   If they are missing this returns 503 and the game silently
   falls back to the player's own browser log, so the game keeps
   working even before storage is connected.
   ============================================================ */

const KEY = 'srwc:shifts';
const MAX_ROWS = 5000;   // keep the list from growing without bound

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

/* Trust nothing from the browser: this endpoint is public. */
function clean(body) {
  const str = (v, max) => String(v == null ? '' : v).slice(0, max);
  const int = (v, lo, hi) => {
    const n = Math.round(Number(v));
    return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : 0;
  };
  return {
    name: str(body.name, 28).trim() || 'New Hire',
    position: str(body.position, 4),
    role: str(body.role, 40),
    grade: str(body.grade, 2),
    percent: int(body.percent, 0, 100),
    points: int(body.points, 0, 100000),
    correct: int(body.correct, 0, 1000),
    asked: int(body.asked, 0, 1000),
    best_streak: int(body.best_streak, 0, 1000),
    // set server-side so it cannot be spoofed
    played_at: new Date().toISOString()
  };
}

const rankKey = r => [-(r.percent || 0), -(r.points || 0)];
const byBest = (a, b) => {
  const ka = rankKey(a), kb = rankKey(b);
  return ka[0] - kb[0] || ka[1] - kb[1];
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Use POST.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = null; }
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Expected a JSON body.' });
  }

  const row = clean(body);

  try {
    await redis(['RPUSH', KEY, JSON.stringify(row)]);
    await redis(['LTRIM', KEY, -MAX_ROWS, -1]);

    const raw = (await redis(['LRANGE', KEY, 0, -1])) || [];
    const rows = raw.map(s => { try { return JSON.parse(s); } catch (e) { return null; } })
                    .filter(Boolean);

    const sorted = rows.slice().sort(byBest);
    const rank = sorted.findIndex(r =>
      r.played_at === row.played_at && r.name === row.name && r.points === row.points) + 1;

    return res.status(200).json({ ok: true, rank: rank || rows.length, total: rows.length });
  } catch (e) {
    // No storage connected yet, or Upstash is unreachable. The game
    // already saved to the player's browser, so this is not fatal.
    const missing = e.message === 'no-store';
    return res.status(503).json({
      error: missing ? 'Shared training log is not connected yet.' : 'Storage unavailable.'
    });
  }
};
