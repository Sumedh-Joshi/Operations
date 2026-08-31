# SRWC Ops: Shadow Shift

A browser training game for new Operations Assistant hires at Recreation and Wellness
Services. Everything in it comes from the **Assistant - Shadow Shift Plan** document.

The player picks a rotation (61 Weight Room, 62 Courts, 60 Cleaner) and works a full
shift in five rounds, with a **Supervisor Confidence** meter that drops on wrong calls.

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
## Trainer notes

Running `app.py` locally gives you the same two endpoints backed by `data/scores.json`,
plus `/api/log` for the full history. That is for local use; the deployed shared log is
the Upstash-backed one described above.

A score of **85% or better** earns the "Cleared for Solo" badge. That is a game
milestone, not a substitute for the End-of-Training Quiz sent by the Facilities & HR Lead
or Graduate Assistant.
