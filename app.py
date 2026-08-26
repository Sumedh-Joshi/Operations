"""
SRWC Ops: Shadow Shift
----------------------
A browser training game for new Operations Assistant hires.

Run it:
    OPS_2\\Scripts\\activate
    python app.py
Then open http://127.0.0.1:5000
"""

import json
import os
from datetime import datetime

from flask import Flask, jsonify, request, send_from_directory

APP_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(APP_DIR, "data")
SCORES_FILE = os.path.join(DATA_DIR, "scores.json")

app = Flask(__name__)


def load_scores():
    """Read the training log, tolerating a missing or corrupt file."""
    if not os.path.exists(SCORES_FILE):
        return []
    try:
        with open(SCORES_FILE, "r", encoding="utf-8") as fh:
            data = json.load(fh)
        return data if isinstance(data, list) else []
    except (json.JSONDecodeError, OSError):
        return []


def save_scores(scores):
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(SCORES_FILE, "w", encoding="utf-8") as fh:
        json.dump(scores, fh, indent=2)


def rank_key(row):
    """Best shift first: percent, then points."""
    return (-row.get("percent", 0), -row.get("points", 0))


@app.route("/")
def index():
    # index.html lives at the project root so the same folder can also be
    # deployed as a plain static site (GitHub Pages, Netlify, etc.).
    return send_from_directory(APP_DIR, "index.html")


@app.route("/api/score", methods=["POST"])
def post_score():
    body = request.get_json(silent=True) or {}

    row = {
        "name": str(body.get("name", "New Hire"))[:28],
        "position": str(body.get("position", ""))[:4],
        "role": str(body.get("role", ""))[:40],
        "percent": int(body.get("percent", 0)),
        "points": int(body.get("points", 0)),
        "grade": str(body.get("grade", ""))[:2],
        "correct": int(body.get("correct", 0)),
        "asked": int(body.get("asked", 0)),
        "best_streak": int(body.get("best_streak", 0)),
        "played_at": datetime.now().isoformat(timespec="seconds"),
    }

    scores = load_scores()
    scores.append(row)
    save_scores(scores)

    ranked = sorted(scores, key=rank_key)
    rank = ranked.index(row) + 1 if row in ranked else len(ranked)

    return jsonify({"ok": True, "rank": rank, "total": len(scores)})


@app.route("/api/leaderboard")
def leaderboard():
    scores = sorted(load_scores(), key=rank_key)[:15]
    return jsonify(scores)


@app.route("/api/log")
def full_log():
    """Every recorded shift, newest first - handy for a trainer reviewing progress."""
    return jsonify(sorted(load_scores(), key=lambda r: r.get("played_at", ""), reverse=True))


if __name__ == "__main__":
    os.makedirs(DATA_DIR, exist_ok=True)
    print("\n  SRWC Ops: Shadow Shift")
    print("  Open http://127.0.0.1:5000 in your browser")
    print("  Press CTRL+C to stop\n")
    app.run(host="127.0.0.1", port=5000, debug=True)
