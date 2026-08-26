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

## Deploying it so hires can play

The whole game is **104 KB of static files** — `index.html` plus the `static/` folder.
All 44 scenarios and the entire game engine run in the browser. Flask is optional: it
only adds a *shared* training log. Without it the game is fully playable and each
browser keeps its own log.

**That means you do not need a server.** Host the static files and you are done.

### Option 1 — Netlify Drop (fastest, about 30 seconds)

Go to <https://app.netlify.com/drop> and drag the `OPS_game` folder onto the page.
You get a public HTTPS link immediately. Good for getting it in front of people today.

### Option 2 — GitHub Pages (recommended, free and permanent)

```bash
git init
git add .
git commit -m "SRWC Ops: Shadow Shift training game"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ops-shadow-shift.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source: `main` / `(root)` → Save**.

Your link, in about a minute:
`https://YOUR-USERNAME.github.io/ops-shadow-shift/`

Share that link. It works on phones, no install, no login. To update the game later,
edit `static/js/data.js`, commit and push — the site updates itself.

`.gitignore` already excludes the `OPS_2` virtual environment, so only the game itself
gets published.

### Option 3 — Kent State web space

Recreation and Wellness may already have somewhere to put a page, or university IT can
give you static web space. Since this is just HTML/CSS/JS with no server requirement, it
can be dropped into any existing site as a folder.

### If you want one shared leaderboard across all hires

This is the only reason to deploy the Flask side, and it is meaningfully more work.
Before going down this road, know two things:

- On free tiers (Render, Railway, Fly) the filesystem is **ephemeral** — `data/scores.json`
  gets wiped every time the app restarts or redeploys, and free instances sleep after
  ~15 minutes idle. A shared log stored in a JSON file **will lose data**. Doing it
  properly means swapping the JSON file for a real database.
- Free instances cold-start slowly (~50 seconds), which is a rough first impression for
  someone who was told to "go do the training."

For actual training purposes the **end-of-shift report is the artifact that matters** —
it lists every missed item with the rule behind it, and it is built to be read with a
trainer. Having a hire screenshot that report, or going through round 5 with them in
person, gets the same result with none of the infrastructure.

One more thing worth a thought: a public shared leaderboard puts student employee names
and scores on a public page. Per-device logs (the default on static hosting) avoid that.

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

All training content is in **`static/js/data.js`**. Nothing in `game.js` needs to change
when you add material.

- **`CONTENT.scenarios`** — the Round 4 deck. Add an entry:

  ```js
  { id:"wr11", pos:"61", zone:"Weight Room", tag:"Policy",
    text:"The situation the player sees.",
    options:[
      { t:"The right call.", correct:true },
      { t:"A wrong call.",   correct:false }
    ],
    teach:"The rule, shown after they answer." }
  ```

  `pos` is `"61"`, `"62"`, `"60"`, or `"any"` for facility-wide policies. Each shift draws
  5 position scenarios and 3 facility-wide ones, shuffled, so the deck stays fresh across
  replays — the more you add, the less repetition.

- **`CONTENT.radioDrills`** — Round 3 drills (`to`, `phrase`, `pause`, `body`).
- **`CONTENT.uniform`** — Round 1 items. `ok:true` passes normally, `friday:true` passes only on Blue & Gold Fridays.
- **`CONTENT.closing`** — Round 5 checklists per position. `ok:false` items need a `why`.
- **`CONTENT.radio`**, **`CONTENT.urgency`**, **`CONTENT.arrivals`** — feed both the drills and the Playbook.

When you add material from a new document, add it to these arrays and it shows up in the
game and the Playbook automatically.

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
├─ app.py                  OPTIONAL Flask server (shared training log)
├─ play.bat                one-click local launcher
├─ requirements.txt
├─ OPS_2/                  virtual environment (not committed)
└─ data/
   └─ scores.json          shared log, only used when Flask is running
```

The first block is the deployable game. Everything after the gap is optional.

## Trainer notes

Every finished shift is saved in the player's own browser, so the Leaderboard works with
no server at all. If you are running `app.py`, scores are *also* posted to the shared log
in `data/scores.json`, and the Leaderboard prefers that shared view:

- `/api/leaderboard` — top 15 shifts
- `/api/log` — every recorded shift, newest first, for reviewing a hire's progress

A score of **85% or better** earns the "Cleared for Solo" badge. That is a game
milestone, not a substitute for the End-of-Training Quiz sent by the Facilities & HR Lead
or Graduate Assistant.
