# SRWC Ops: Shadow Shift

A browser training game for new Operations Assistant hires at Recreation and Wellness
Services. Everything in it comes from the **Assistant - Shadow Shift Plan** document.

The player picks a rotation (61 Weight Room, 62 Courts, 60 Cleaner) and works a full
shift in five rounds, with a **Supervisor Confidence** meter that drops on wrong calls.

---

## Running it locally

Double-click **`play.bat`** — it starts the server and opens your browser.

Or manually:

```bash
OPS_2\Scripts\activate
python app.py
```

Then open <http://127.0.0.1:5000>.

The virtual environment is **`OPS_2`** and already has Flask installed.
To rebuild it from scratch:

```bash
py -m venv OPS_2
OPS_2\Scripts\python.exe -m pip install -r requirements.txt
```

---
## The five rounds

| # | Round | What it teaches |
|---|-------|-----------------|
| 1 | **Locker Room** | Staff dress code. Build a uniform from bottoms, shirt, nametag, shoes and layer. Roughly one shift in three is a Blue & Gold Friday, which changes what passes. |
| 2 | **Clock In** | The 15-minute rule, the arrival/clock-in/at-station table, and the "42" and "55" minute marks. |
| 3 | **Radio Check** | Build a real radio call in three steps: who you are calling, which urgency phrase fits, and whether you pause. Ends by showing the full call the way you would say it on the air. |
| 4 | **On the Floor** | Eight timed scenarios (30 seconds each) mixing your position's duties with facility-wide policies. Faster correct answers score a speed bonus. |
| 5 | **Closing** | Multi-select closing checklist for your position, with the traps included. |

Then an **end-of-shift report**: letter grade, badges, and a list of every flagged item
with the rule behind it — designed to be read with a trainer.

The **Playbook** button (top right, or from the title screen) opens a reference drawer
with radio numbers, phrases, arrival times, dress code, med bags, the EAP first-aid role,
cleaning supplies and shift coverage. It is available at any point during a shift.

Answer options can also be chosen with the number keys **1-4**.

---

## Adding or editing content

All training content is in **`static/js/data.js`**. Nothing in `game.js` needs to
change when you add material. The file has three parts:

| Part | What goes there |
|------|-----------------|
| **facility-wide** | `radio`, `urgency`, `arrivals`, `uniform`, `radioDrills`, `badges` - applies to every position |
| **`shared.scenarios`** | scenarios ANY position can be asked (facility-wide policies) |
| **`positions`** | one self-contained block per position: its metadata, its own scenarios, and its own closing checklist |

### Adding a new position

Copy any block inside `positions`, paste it, and change the contents. That is the
whole job - it appears on the title screen and is fully playable automatically.

```js
"55": {
  num: "55",
  name: "Guest Services Assistant",
  icon: "@",
  blurb: "Welcome Desk, WinPak alarms and equipment checkout.",

  scenarios: [
    {
      id: "gs1", zone: "Welcome Desk", tag: "Alarms",
      text: "The situation the player sees.",
      options: [
        { t: "The right call.", correct: true },
        { t: "A wrong call.",   correct: false }
      ],
      teach: "The rule, shown after they answer."
    }
  ],

  closing: {
    title: "Welcome Desk Closing",
    items: [
      { t: "A real closing task", ok: true },
      { t: "A trap that does not belong", ok: false,
        why: "Explain why it is wrong." }
    ]
  }
}
```

Set `icon` to any emoji - paste it straight in.

Rules that matter:

- Every scenario needs **exactly one** option with `correct: true`.
- Scenario `id` values must be unique across the whole file.
- A closing item with `ok: false` should carry a `why`.
- A `radioDrills` entry's `phrase` must exactly match one of the `urgency` phrases.

A position does not need many scenarios to be playable. Each shift draws up to 5
from the position and tops the deck up from `shared`, so a new position with only
two of its own scenarios still plays a full round.

### Checking your work

The game validates content every time it loads. Open the page, press **F12** for the
browser console, and you will see either `SRWC content check: all good.` or a list of
exactly what is wrong and where. This catches duplicate ids, missing or multiple
correct answers, empty positions, traps with no explanation, and radio drills whose
phrase is not a real urgency phrase.

---

## Files

```
OPS_game/
├─ index.html              the game page (at root, so static hosting works)
├─ static/
│  ├─ css/style.css
│  └─ js/
│     ├─ data.js           ← all training content lives here
│     └─ game.js           game engine
│
├─ api/                    Vercel serverless functions (shared training log)
│  ├─ score.js             POST a finished shift
│  └─ leaderboard.js       GET the shared rankings
├─ vercel.json              Vercel config (no build, static + functions)
│
├─ app.py                  OPTIONAL Flask server, local use only
├─ play.bat                one-click local launcher
├─ requirements.txt
├─ OPS_2/                  virtual environment (not committed)
└─ data/
   └─ scores.json          shared log, only used when Flask is running
```

The first block is the deployable game. Everything after the gap is optional.

## The shared training log

The game posts every finished shift to `/api/score` and reads `/api/leaderboard`.
On Vercel those are real serverless functions (`api/score.js`, `api/leaderboard.js`)
backed by Upstash Redis. They have **no npm dependencies** - they call Upstash over
its REST API with plain `fetch`.

### One-time setup on Vercel

1. Push, then open your project on <https://vercel.com>.
2. **Storage** tab -> **Create Database** -> **Upstash Redis** (free tier) -> connect
   it to this project.
3. **Redeploy** so the new environment variables reach the functions.

That is it. The integration injects `KV_REST_API_URL` and `KV_REST_API_TOKEN`
automatically; the code also accepts `UPSTASH_REDIS_REST_URL` /
`UPSTASH_REDIS_REST_TOKEN` if your integration uses those names instead.

### Verifying it worked

```bash
curl https://YOUR-PROJECT.vercel.app/api/leaderboard
```

- `[]` or a JSON array -> **working**. The Leaderboard will say "recorded on the
  shared training log".
- `503` -> functions deployed but storage is not connected yet. The game still works;
  each player just keeps their own log until you finish step 2.
- `404` or JavaScript source text -> Vercel is serving `api/` as static files rather
  than functions. Check that `vercel.json` does not set `outputDirectory`.

### Before storage is connected

Nothing breaks. Every shift is always written to the player's own browser first, and
the shared POST is best-effort on top of that. If the shared log is unreachable the
Leaderboard quietly falls back to "recorded in this browser".

### Trainer view

- `/api/leaderboard` - top 15 by score (what players see)
- `/api/leaderboard?limit=100` - a longer ranking
- `/api/leaderboard?all=1` - **every** recorded shift, newest first, for checking who
  completed their training

### Note on the two URLs

The shared log only exists on the **Vercel** deployment. The GitHub Pages copy has no
backend, so it silently stays per-device. Share the Vercel link with hires, and retire
the Pages one so you are not maintaining two different behaviours.

### Privacy

Names and scores are stored in your Upstash database and the top 15 are visible to
anyone who opens the Leaderboard. Ask hires for a first name and last initial if you
would rather not put full student names on a page other hires can see.

## Trainer notes

Running `app.py` locally gives you the same two endpoints backed by `data/scores.json`,
plus `/api/log` for the full history. That is for local use; the deployed shared log is
the Upstash-backed one described above.

A score of **85% or better** earns the "Cleared for Solo" badge. That is a game
milestone, not a substitute for the End-of-Training Quiz sent by the Facilities & HR Lead
or Graduate Assistant.
