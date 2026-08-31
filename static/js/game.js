/* ============================================================
   SRWC OPS: SHADOW SHIFT  --  GAME ENGINE
   ============================================================ */

/* ---------- tiny helpers ---------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));
const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const pick = a => a[Math.floor(Math.random() * a.length)];

const SCREEN = $('#screen');

/* ---------- state ---------- */
const S = {
  name: '',
  pos: '61',
  friday: false,
  score: 0,
  possible: 0,
  streak: 0,
  bestStreak: 0,
  conf: 100,
  minConf: 100,
  correct: 0,
  asked: 0,
  misses: [],          // {q, a} rows for the end-of-shift review
  flags: {},           // per-round perfection flags for badges
  round: 'locker',     // which round award() is currently scoring
  roundMiss: {},       // round -> number of wrong answers
  timer: null
};

function resetRun() {
  Object.assign(S, {
    score: 0, possible: 0, streak: 0, bestStreak: 0, conf: 100, minConf: 100,
    correct: 0, asked: 0, misses: [], flags: {}, round: 'locker', roundMiss: {}
  });
  clearInterval(S.timer);
}

/* ---------- scoring ---------- */
function award(points, max, wasRight) {
  S.score += points;
  S.possible += max;
  S.asked++;
  if (wasRight) {
    S.correct++;
    S.streak++;
    S.bestStreak = Math.max(S.bestStreak, S.streak);
    S.conf = Math.min(100, S.conf + 4);
  } else {
    S.streak = 0;
    S.conf = Math.max(0, S.conf - 11);
    S.roundMiss[S.round] = (S.roundMiss[S.round] || 0) + 1;
  }
  S.minConf = Math.min(S.minConf, S.conf);
  updateHUD();
}

function miss(q, a) { S.misses.push({ q, a }); }

function updateHUD() {
  $('#hud-score').textContent = S.score;
  $('#hud-streak').textContent = S.streak;
  $('#conf-val').textContent = S.conf + '%';
  const bar = $('#conf-bar');
  bar.style.width = S.conf + '%';
  bar.className = 'meter-fill' + (S.conf < 40 ? ' low' : S.conf < 70 ? ' mid' : '');
}

function setStep(step) {
  const order = ['locker', 'clock', 'radio', 'floor', 'closing'];
  const at = order.indexOf(step);
  $$('#progress .step').forEach(el => {
    const i = order.indexOf(el.dataset.step);
    el.className = 'step' + (i === at ? ' active' : i < at ? ' done' : '');
  });
}

function showChrome(on) {
  $('#hud').classList.toggle('hidden', !on);
  $('#progress').classList.toggle('hidden', !on);
}

function feedback(ok, title, teach) {
  return `<div class="fb ${ok ? '' : 'no'}">
    <div class="fb-title">${ok ? '✅ ' : '❌ '}${esc(title)}</div>
    <div class="fb-teach">${teach}</div>
  </div>`;
}

/* ============================================================
   1. TITLE SCREEN
   ============================================================ */
function screenTitle() {
  showChrome(false);
  clearInterval(S.timer);
  SCREEN.innerHTML = `
    <div class="title-wrap">
      <div class="kicker">Recreation &amp; Wellness Services</div>
      <h1>SHADOW SHIFT</h1>
      <p class="tagline">You have been hired as an SRWC Operations Assistant. Suit up, clock in,
      work a full rotation and prove you are ready to run a shift solo.</p>
    </div>

    <div class="card">
      <div class="field">
        <label for="nm">Your name</label>
        <input id="nm" maxlength="28" placeholder="New hire name" autocomplete="off">
      </div>

      <div class="spacer"></div>
      <div class="eyebrow">Pick tonight's rotation</div>
      <div class="pos-grid" id="posGrid">
        ${Object.values(CONTENT.positions).map(p => `
          <button class="pos-card" data-pos="${p.num}">
            <div class="ic">${p.icon}</div>
            <div class="num">${p.num}</div>
            <div class="nm">${esc(p.name)}</div>
            <div class="bl">${esc(p.blurb)}</div>
          </button>`).join('')}
      </div>

      <div class="btn-row">
        <button class="btn" id="go">Start the shift</button>
        <button class="btn alt" id="pb">Study the Playbook</button>
        <button class="btn alt" id="lb">Leaderboard</button>
      </div>
      <p class="tiny" style="margin-top:14px">
        Five rounds: locker room, clock in, radio check, on the floor, and closing.
        Keep the supervisor's confidence up.
      </p>
    </div>`;

  $$('.pos-card').forEach(c => c.onclick = () => {
    $$('.pos-card').forEach(x => x.classList.remove('sel'));
    c.classList.add('sel');
    S.pos = c.dataset.pos;
  });
  $(`.pos-card[data-pos="${S.pos}"]`).classList.add('sel');
  $('#nm').value = S.name;

  $('#go').onclick = () => {
    S.name = ($('#nm').value || '').trim() || 'New Hire';
    resetRun();
    S.friday = Math.random() < 0.35;
    const p = CONTENT.positions[S.pos];
    $('#hud-badge').textContent = p.num;
    $('#hud-name').textContent = S.name;
    $('#hud-role').textContent = p.name;
    showChrome(true);
    updateHUD();
    screenLocker();
  };
  $('#pb').onclick = openDrawer;
  $('#lb').onclick = screenLeaderboard;
}

/* ============================================================
   2. LOCKER ROOM  --  uniform builder
   ============================================================ */
const SLOTS = [
  { key: 'bottoms', label: 'Bottoms' },
  { key: 'top',     label: 'Shirt' },
  { key: 'badge',   label: 'Nametag' },
  { key: 'shoes',   label: 'Shoes' },
  { key: 'layer',   label: 'Layer (optional)' }
];

function itemOK(item) {
  return item.ok || (S.friday && item.friday === true);
}

function screenLocker() {
  setStep('locker');
  S.round = 'locker';
  const chosen = {};

  const render = () => {
    SCREEN.innerHTML = `
      <div class="card">
        <div class="eyebrow">Round 1 &mdash; Locker Room</div>
        <h2>Suit Up</h2>
        <p class="sub">${S.friday
          ? '<b class="gold">It is a Blue &amp; Gold Friday.</b> Kent State apparel is on the table today.'
          : 'Regular weekday. Build a uniform that passes a supervisor walk-by.'}</p>

        <div class="mirror" id="mirror"></div>

        ${SLOTS.map(sl => `
          <div class="slot-block">
            <div class="slot-title">${sl.label}</div>
            <div class="opt-grid">
              ${shuffle(CONTENT.uniform.filter(u => u.slot === sl.key)).map(u => `
                <button class="opt" data-id="${u.id}" data-slot="${sl.key}">
                  <span class="em">${u.icon}</span><span>${esc(u.label)}</span>
                </button>`).join('')}
            </div>
          </div>`).join('')}

        <div class="btn-row">
          <button class="btn" id="done" disabled>Head to the time clock</button>
          <span class="tiny" id="hint">Pick one item for each of the five rows.</span>
        </div>
      </div>`;

    $$('.opt').forEach(b => b.onclick = () => {
      const slot = b.dataset.slot;
      $$(`.opt[data-slot="${slot}"]`).forEach(x => x.classList.remove('sel'));
      b.classList.add('sel');
      chosen[slot] = CONTENT.uniform.find(u => u.id === b.dataset.id);
      drawMirror();
      const ready = SLOTS.every(sl => chosen[sl.key]);
      $('#done').disabled = !ready;
      $('#hint').textContent = ready ? 'Looking good. Clock in.' : 'Pick one item for each of the five rows.';
    });

    $('#done').onclick = grade;
    drawMirror();
  };

  const drawMirror = () => {
    const m = $('#mirror');
    const items = SLOTS.map(sl => chosen[sl.key]).filter(Boolean);
    m.innerHTML = items.length
      ? items.map(i => `<span class="m-item" title="${esc(i.label)}">${i.icon}</span>`).join('')
      : '<span class="m-empty">Your reflection is waiting on a uniform.</span>';
  };

  const grade = () => {
    let right = 0;
    SLOTS.forEach(sl => {
      const it = chosen[sl.key];
      const ok = itemOK(it);
      if (ok) right++; else miss(`Uniform &mdash; ${sl.label}: ${esc(it.label)}`, it.why);
      award(ok ? 60 : 0, 60, ok);
      const btn = $(`.opt[data-id="${it.id}"]`);
      if (btn) btn.classList.add(ok ? 'right' : 'wrong');
    });
    $$('.opt').forEach(b => b.disabled = true);

    const lines = SLOTS.map(sl => {
      const it = chosen[sl.key];
      const ok = itemOK(it);
      return `<div style="padding:4px 0">${ok ? '✅' : '❌'} <b>${esc(it.label)}</b> &mdash; ${esc(it.why)}</div>`;
    }).join('');

    $('.card').insertAdjacentHTML('beforeend', feedback(
      right === 5,
      right === 5 ? 'Full uniform. Nothing for the sup to flag.' : `${right} of 5 pieces passed.`,
      lines + `<div style="margin-top:9px" class="tiny">Requirements: fingertip-length or longer khaki or jean bottoms,
        no white or multi-colored pants, department shirt matching your position, nametag, and tennis or athletic
        shoes only. No sweaters, cardigans or cover-ups &mdash; but a grey, white or navy long-sleeve may go
        <b>under</b> the uniform.</div>`
    ));
    $('#done').outerHTML = `<button class="btn" id="next">Continue to the time clock</button>`;
    $('#next').onclick = screenClock;
    $('#next').scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  render();
}

/* ============================================================
   3. CLOCK IN  --  timeliness
   ============================================================ */
function screenClock() {
  setStep('clock');
  S.round = 'clock';
  const row = pick(CONTENT.arrivals);
  const others = CONTENT.arrivals.filter(r => r !== row);

  const qs = [
    { q: `Your DSE posted shift is <b>${row.dse}</b>. What time should you <b>arrive</b> at the building?`,
      a: row.arrive, d: others.map(r => r.arrive) },
    { q: `Same shift. What is the latest you should <b>clock in</b>?`,
      a: row.clockIn, d: others.map(r => r.clockIn) },
    { q: `Same shift. What time do you need to be <b>at your station</b>?`,
      a: row.station, d: others.map(r => r.station) },
    { q: `You get a negative write-up if you are not in position by which minute mark?`,
      a: 'The "55" minute mark', d: ['The "42" minute mark', 'The "30" minute mark', 'The top of the hour'] }
  ];

  let i = 0;

  const step = () => {
    const cur = qs[i];
    const opts = shuffle([cur.a, ...shuffle(cur.d).slice(0, 3)]);
    SCREEN.innerHTML = `
      <div class="card">
        <div class="eyebrow">Round 2 &mdash; Clock In</div>
        <h2>The 15-Minute Rule</h2>
        <p class="sub">Question ${i + 1} of ${qs.length}. Be on time means 15 minutes before your DSE shift.</p>
        <div class="scene-text">${cur.q}</div>
        <div class="answers">
          ${opts.map((o, n) => `<button class="ans" data-v="${esc(o)}">
            <span class="key">${n + 1}</span><span>${o}</span></button>`).join('')}
        </div>
      </div>`;

    $$('.ans').forEach(b => b.onclick = () => {
      const ok = b.dataset.v === cur.a;
      $$('.ans').forEach(x => {
        x.disabled = true;
        if (x.dataset.v === cur.a) x.classList.add('right');
        else if (x === b) x.classList.add('wrong');
        else x.classList.add('dim');
      });
      award(ok ? 60 : 0, 60, ok);
      if (!ok) miss(cur.q, `Correct answer: <b>${esc(cur.a)}</b>`);

      $('.card').insertAdjacentHTML('beforeend', feedback(ok,
        ok ? 'Correct.' : `Not quite. The answer is ${cur.a}.`,
        `For <b>${row.dse}</b>: arrive <b>${row.arrive}</b>, clock in <b>${row.clockIn}</b>,
         at station <b>${row.station}</b>. Never clock in before the "42" mark, and be in position by the
         "55" mark or it is a negative write-up. ${CONTENT.openingTimes}
         Running late? Call the Welcome Desk at <b>${CONTENT.welcomeDeskPhone}</b> or the sup on shift right away.`)
      );
      const nextLabel = (i === qs.length - 1) ? 'Grab your radio' : 'Next question';
      $('.card').insertAdjacentHTML('beforeend',
        `<div class="btn-row"><button class="btn" id="nx">${nextLabel}</button></div>`);
      $('#nx').onclick = () => { i++; i < qs.length ? step() : finish(); };
      $('#nx').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    bindKeys();
  };

  const finish = () => screenRadio();

  step();
}

/* ============================================================
   4. RADIO CHECK  --  build the call
   ============================================================ */

/* On the air you say the last two digits: directory 866 is spoken as "66". */
const spoken = n => /^\d+$/.test(n) ? n.slice(-2) : n;
const whoIs  = n => (CONTENT.radio.find(r => r.num === n) || {}).who || '';
const cap    = t => t.charAt(0).toUpperCase() + t.slice(1);

function screenRadio() {
  setStep('radio');
  S.round = 'radio';
  const drills = shuffle(CONTENT.radioDrills).slice(0, 3);
  let i = 0;

  const step = () => {
    const d = drills[i];
    const built = { to: null, phrase: null, pause: null };
    let stage = 0;

    const line = () => {
      const me = CONTENT.positions[S.pos].num;
      const to = built.to ? `<span class="fill">${esc(spoken(built.to))}</span>` : `<span class="blank"></span>`;
      const ph = built.phrase ? `<span class="fill">${esc(built.phrase.toLowerCase())}</span>` : `<span class="blank"></span>`;
      return `"${me} to ${to}, ${esc(d.body)} ${ph}?"`;
    };

    const draw = () => {
      let prompt = '', opts = [];
      if (stage === 0) {
        prompt = 'Who are you calling?';
        opts = shuffle([d.to, ...shuffle(CONTENT.radio.map(r => r.num).filter(n => n !== d.to && n !== CONTENT.positions[S.pos].num)).slice(0, 3)])
          .map(n => ({ v: n, t: whoIs(n) ? `${n} &mdash; ${esc(whoIs(n))}` : esc(cap(n)) }));
      } else if (stage === 1) {
        prompt = 'Which phrase fits this situation?';
        opts = shuffle(CONTENT.urgency).map(u => ({ v: u.phrase, t: `${esc(u.phrase)} <span class="tiny">&mdash; ${esc(u.means)}</span>` }));
      } else {
        prompt = 'After you say your call sign, do you pause?';
        opts = shuffle([
          { v: 'pause', t: 'Pause and wait for "66 go ahead" before continuing.' },
          { v: 'nopause', t: 'No pause &mdash; keep talking straight through.' }
        ]);
      }

      SCREEN.innerHTML = `
        <div class="card">
          <div class="eyebrow">Round 3 &mdash; Radio Check</div>
          <h2>Make the Call</h2>
          <p class="sub">Drill ${i + 1} of ${drills.length}. You are <b>${CONTENT.positions[S.pos].num}</b>.</p>
          <div class="scene-text">${esc(d.text)}</div>
          <div class="radio-line">${line()}</div>
          <div class="slot-title">${prompt}</div>
          <div class="answers">
            ${opts.map((o, n) => `<button class="ans" data-v="${esc(o.v)}">
              <span class="key">${n + 1}</span><span>${o.t}</span></button>`).join('')}
          </div>
        </div>`;

      $$('.ans').forEach(b => b.onclick = () => {
        const v = b.dataset.v;
        const want = stage === 0 ? d.to : stage === 1 ? d.phrase : (d.pause ? 'pause' : 'nopause');
        const ok = v === want;
        award(ok ? 40 : 0, 40, ok);
        if (stage === 0) built.to = v;
        if (stage === 1) built.phrase = v;
        if (stage === 2) built.pause = v;

        $$('.ans').forEach(x => {
          x.disabled = true;
          if (x.dataset.v === want) x.classList.add('right');
          else if (x === b) x.classList.add('wrong');
          else x.classList.add('dim');
        });

        const u = CONTENT.urgency.find(z => z.phrase === d.phrase)
                  || { phrase: d.phrase, means: '', examples: '', pauseNote: '' };
        const why = stage === 0
          ? `This one goes to <b>${esc(d.to)}</b>${whoIs(d.to) ? ` &mdash; ${esc(whoIs(d.to))}` : ''}. On the air you say <b>"${esc(spoken(d.to))}"</b>.`
          : stage === 1
            ? `<b>"${esc(u.phrase)}"</b> means <b>${esc(u.means)}</b>. Examples: ${esc(u.examples)}`
            : `${esc(u.pauseNote)}`;

        if (!ok) miss(esc(d.text), why);

        $('.card').insertAdjacentHTML('beforeend', feedback(ok, ok ? 'Correct.' : 'Not this time.', why));

        const last = stage === 2;
        if (last) {
          const me2 = CONTENT.positions[S.pos].num, to2 = spoken(d.to);
          const full = d.pause
            ? `1. "${me2} to ${esc(to2)}?" &nbsp;<span class="tiny">[PAUSE &mdash; wait]</span><br>
               2. "${esc(to2)} go ahead."<br>
               3. "${esc(cap(d.body))} ${esc(d.phrase.toLowerCase())}?"`
            : `"${me2} to ${esc(to2)}, ${esc(d.body)} ${esc(d.phrase.toLowerCase())}?"`;
          $('.card').insertAdjacentHTML('beforeend',
            `<div class="radio-line" style="margin-top:14px"><div><span class="tiny">The full call</span><br>${full}</div></div>`);
        }

        const lbl = last ? (i === drills.length - 1 ? 'Take your post' : 'Next drill') : 'Continue the call';
        $('.card').insertAdjacentHTML('beforeend', `<div class="btn-row"><button class="btn" id="nx">${lbl}</button></div>`);
        $('#nx').onclick = () => {
          if (!last) { stage++; draw(); }
          else if (i < drills.length - 1) { i++; step(); }
          else { screenFloor(); }
        };
        $('#nx').scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      bindKeys();
    };

    draw();
  };

  step();
}

/* ============================================================
   5. ON THE FLOOR  --  timed scenarios
   ============================================================ */
const FLOOR_ROUNDS = 8;
const SEC = 30;

function screenFloor() {
  setStep('floor');
  S.round = 'floor';
  // Each position owns its scenarios; CONTENT.shared holds facility-wide ones.
  // Take up to 5 from the position and top the deck up from shared, so a new
  // position with only a couple of scenarios still plays a full round.
  const own = shuffle(CONTENT.positions[S.pos].scenarios || []).slice(0, 5);
  const shared = shuffle(CONTENT.shared.scenarios || []);
  const deck = shuffle([...own, ...shared.slice(0, FLOOR_ROUNDS - own.length)]).slice(0, FLOOR_ROUNDS);
  let i = 0;

  const step = () => {
    const sc = deck[i];
    const opts = shuffle(sc.options);
    let left = SEC, done = false;

    SCREEN.innerHTML = `
      <div class="card">
        <div class="scene-head">
          <div>
            <div class="eyebrow">Round 4 &mdash; On the Floor</div>
            <h3>Call ${i + 1} of ${deck.length}</h3>
          </div>
          <div class="chips">
            <span class="chip gold">${esc(sc.zone)}</span>
            <span class="chip">${esc(sc.tag)}</span>
            <span class="chip" id="clk">${SEC}s</span>
          </div>
        </div>
        <div class="timer"><div class="timer-fill" id="tf"></div></div>
        <div class="scene-text">${esc(sc.text)}</div>
        <div class="answers">
          ${opts.map((o, n) => `<button class="ans" data-i="${n}">
            <span class="key">${n + 1}</span><span>${esc(o.t)}</span></button>`).join('')}
        </div>
      </div>`;

    clearInterval(S.timer);
    S.timer = setInterval(() => {
      left -= 0.1;
      if (left <= 0) { clearInterval(S.timer); if (!done) resolve(null, 0); return; }
      $('#tf').style.width = (left / SEC * 100) + '%';
      $('#clk').textContent = Math.ceil(left) + 's';
    }, 100);

    const resolve = (btn, timeBonus) => {
      done = true;
      clearInterval(S.timer);
      const chosen = btn ? opts[+btn.dataset.i] : null;
      const ok = !!(chosen && chosen.correct);
      const bonus = ok ? Math.round(timeBonus) : 0;

      $$('.ans').forEach((x, n) => {
        x.disabled = true;
        if (opts[n].correct) x.classList.add('right');
        else if (x === btn) x.classList.add('wrong');
        else x.classList.add('dim');
      });

      award(ok ? 100 + bonus : 0, 150, ok);
      if (!ok) miss(esc(sc.text), sc.teach);

      const title = !chosen ? 'Time ran out. On a real floor, hesitation is a decision.'
                            : ok ? (bonus > 30 ? 'Sharp. Fast and correct.' : 'Correct call.')
                                 : 'That is not the call.';
      $('.card').insertAdjacentHTML('beforeend', feedback(ok, title,
        `<b>Why:</b> ${esc(sc.teach)}` + (ok && bonus ? `<br><span class="tiny">+${bonus} speed bonus</span>` : '')));

      const lbl = i === deck.length - 1 ? 'Start closing duties' : 'Next call';
      $('.card').insertAdjacentHTML('beforeend', `<div class="btn-row"><button class="btn" id="nx">${lbl}</button></div>`);
      $('#nx').onclick = () => {
        if (i < deck.length - 1) { i++; step(); }
        else { screenClosing(); }
      };
      $('#nx').scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    $$('.ans').forEach(b => b.onclick = () => { if (!done) resolve(b, (left / SEC) * 50); });
    bindKeys();
  };

  step();
}

/* ============================================================
   6. CLOSING  --  multi-select checklist
   ============================================================ */
function screenClosing() {
  setStep('closing');
  S.round = 'closing';
  const set = CONTENT.positions[S.pos].closing;
  const items = shuffle(set.items);
  const picked = new Set();

  SCREEN.innerHTML = `
    <div class="card">
      <div class="eyebrow">Round 5 &mdash; Closing</div>
      <h2>${esc(set.title)}</h2>
      <p class="sub">Select every task that belongs in your closing routine. Leave the wrong ones unchecked.</p>
      <div class="check-list">
        ${items.map((it, n) => `<button class="check" data-i="${n}">
          <span class="box">✓</span><span>${esc(it.t)}</span></button>`).join('')}
      </div>
      <div class="btn-row"><button class="btn" id="done">Notify the supervisor</button></div>
    </div>`;

  $$('.check').forEach(b => b.onclick = () => {
    const n = b.dataset.i;
    picked.has(n) ? picked.delete(n) : picked.add(n);
    b.classList.toggle('sel');
  });

  $('#done').onclick = () => {
    let right = 0;
    $$('.check').forEach(b => {
      const it = items[+b.dataset.i];
      const chose = picked.has(b.dataset.i);
      const ok = chose === it.ok;
      if (ok) right++;
      else miss(`Closing &mdash; ${esc(it.t)}`,
        it.ok ? 'This one belongs in your closing routine.' : (it.why || 'This does not belong in your closing routine.'));
      award(ok ? 40 : 0, 40, ok);
      b.disabled = true;
      b.classList.add(ok ? 'right' : 'wrong');
      if (!it.ok && it.why) b.insertAdjacentHTML('beforeend', `<span class="note">${esc(it.why)}</span>`);
    });

    $('.card').insertAdjacentHTML('beforeend', feedback(right === items.length,
      right === items.length ? 'Clean close. The sup has nothing to send you back for.'
                             : `${right} of ${items.length} correct.`,
      'Always notify your supervisor when closing tasks are complete &mdash; they may direct you to locker room checks or other closing responsibilities.'));
    $('#done').outerHTML = `<button class="btn" id="nx">End of shift report</button>`;
    $('#nx').onclick = screenReport;
    $('#nx').scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
}

/* ============================================================
   TRAINING LOG STORE
   ------------------------------------------------------------
   Every shift is saved in this browser. If a Flask server is
   also running, the score is sent there too so a trainer can
   see everyone's shifts in one place. With no server the game
   still works completely -- the log is just per-device.
   ============================================================ */
const LOG_KEY = 'srwc_shadow_shift_log';

function logLoad() {
  try { return JSON.parse(localStorage.getItem(LOG_KEY)) || []; }
  catch (e) { return []; }
}

function logSave(row) {
  const rows = logLoad();
  rows.push(row);
  try { localStorage.setItem(LOG_KEY, JSON.stringify(rows)); } catch (e) { /* private mode */ }
  return rows;
}

function logRank(rows, row) {
  const sorted = rows.slice().sort((a, b) => (b.percent - a.percent) || (b.points - a.points));
  return sorted.indexOf(row) + 1;
}

/* ============================================================
   7. END OF SHIFT REPORT
   ============================================================ */
function screenReport() {
  clearInterval(S.timer);
  setStep('done');
  $$('#progress .step').forEach(el => el.className = 'step done');

  const pct = S.possible ? Math.round(S.score / S.possible * 100) : 0;
  const grade = pct >= 93 ? 'A' : pct >= 85 ? 'A-' : pct >= 78 ? 'B' : pct >= 70 ? 'C' : pct >= 60 ? 'D' : 'F';
  const verdict = pct >= 85
    ? 'Cleared for solo shifts. Confident, comfortable and knowledgeable in the role.'
    : pct >= 70
      ? 'Solid shadow shift. Review the flagged items with your trainer before going solo.'
      : 'Run another shadow shift. Go through the Playbook with your trainer first.';

  const clean = r => !S.roundMiss[r];
  const earned = {
    dressed: clean('locker'),
    ontime:  clean('clock'),
    radio:   clean('radio'),
    streak5: S.bestStreak >= 5,
    noflag:  S.minConf >= 70,
    closer:  clean('closing'),
    solo:    pct >= 85
  };

  SCREEN.innerHTML = `
    <div class="card">
      <div class="eyebrow">End of Shift Report</div>
      <div class="report-top">
        <div class="grade">${grade}</div>
        <div>
          <h2>${esc(S.name)} &mdash; ${CONTENT.positions[S.pos].num} ${esc(CONTENT.positions[S.pos].name)}</h2>
          <p class="sub" style="margin:4px 0 0">${verdict}</p>
        </div>
      </div>

      <div class="score-grid">
        <div class="score-cell"><div class="v">${pct}%</div><div class="k">Shift Score</div></div>
        <div class="score-cell"><div class="v">${S.score}</div><div class="k">Points</div></div>
        <div class="score-cell"><div class="v">${S.correct}/${S.asked}</div><div class="k">Calls Right</div></div>
        <div class="score-cell"><div class="v">${S.bestStreak}</div><div class="k">Best Streak</div></div>
        <div class="score-cell"><div class="v">${S.minConf}%</div><div class="k">Lowest Confidence</div></div>
      </div>

      <h3 style="margin-top:8px">Badges</h3>
      <div class="badge-row">
        ${CONTENT.badges.map(b => `
          <div class="badge ${earned[b.id] ? '' : 'locked'}">
            <div class="b-ic">${b.icon}</div>
            <div class="b-nm">${esc(b.name)}</div>
            <div class="b-ds">${esc(b.desc)}</div>
          </div>`).join('')}
      </div>

      <h3 style="margin-top:24px">${S.misses.length ? 'Go over these with your trainer' : 'Nothing flagged'}</h3>
      <div class="review">
        ${S.misses.length
          ? S.misses.map(m => `<div class="review-item"><div class="q">${m.q}</div><div class="a">${m.a}</div></div>`).join('')
          : `<div class="review-item ok"><div class="q">Perfect shift.</div>
             <div class="a">Every call, every policy, every closing task. Go run it solo.</div></div>`}
      </div>

      <div class="btn-row">
        <button class="btn" id="again">Work another shift</button>
        <button class="btn alt" id="pb2">Open the Playbook</button>
        <button class="btn alt" id="lb2">Leaderboard</button>
      </div>
      <p class="tiny" id="saveNote" style="margin-top:12px">Saving your score...</p>
    </div>`;

  $('#again').onclick = screenTitle;
  $('#pb2').onclick = openDrawer;
  $('#lb2').onclick = screenLeaderboard;

  const row = {
    name: S.name, position: S.pos, role: CONTENT.positions[S.pos].name,
    percent: pct, points: S.score, grade,
    correct: S.correct, asked: S.asked, best_streak: S.bestStreak,
    played_at: new Date().toISOString()
  };

  // Always record it in this browser so the game works with no server at all.
  const rows = logSave(row);
  const note = $('#saveNote');
  if (note) note.innerHTML =
    `Saved &mdash; you are <b>#${logRank(rows, row)}</b> of ${rows.length} shifts on this device.`;

  // If a server is running, send it there too for the shared training log.
  fetch('api/score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(row)
  })
    .then(r => r.ok ? r.json() : Promise.reject(new Error('no shared log')))
    .then(d => {
      const n = $('#saveNote');
      if (n && typeof d.rank === 'number') n.innerHTML =
        `Saved to the shared training log &mdash; you are <b>#${d.rank}</b> of ${d.total} shifts recorded.`;
    })
    .catch(() => { /* no shared log yet: the local save above already stands */ });
}

/* ============================================================
   8. LEADERBOARD
   ============================================================ */
function screenLeaderboard() {
  showChrome(false);
  clearInterval(S.timer);
  SCREEN.innerHTML = `<div class="card"><div class="eyebrow">Training Log</div>
    <h2>Top Shifts</h2><p class="sub">Loading...</p></div>`;

  const render = (rows, shared) => {
    SCREEN.innerHTML = `
      <div class="card">
        <div class="eyebrow">Training Log</div>
        <h2>Top Shifts</h2>
        <p class="sub">${shared
          ? 'Best shadow shifts recorded on the shared training log.'
          : 'Best shadow shifts recorded in this browser.'}</p>
        ${rows.length ? `
        <table class="lb">
          <tr><th>#</th><th>Name</th><th>Position</th><th>Grade</th><th>Score</th><th>Points</th></tr>
          ${rows.map((r, n) => `<tr>
            <td class="rk">${n + 1}</td>
            <td>${esc(r.name)}</td>
            <td>${esc(r.position)} ${esc(r.role || '')}</td>
            <td class="gold">${esc(r.grade)}</td>
            <td>${r.percent}%</td>
            <td>${r.points}</td></tr>`).join('')}
        </table>` : `<p class="tiny">No shifts recorded yet. Be the first.</p>`}
        <div class="btn-row"><button class="btn" id="back">Back to the start</button></div>
      </div>`;
    $('#back').onclick = screenTitle;
  };

  const local = () => logLoad()
    .sort((a, b) => (b.percent - a.percent) || (b.points - a.points))
    .slice(0, 15);

  // Prefer the shared server log; fall back to this browser's log.
  fetch('api/leaderboard')
    .then(r => r.ok ? r.json() : Promise.reject(new Error('no shared log')))
    .then(rows => Array.isArray(rows)
      ? render(rows, true)                       // shared log, even if empty
      : Promise.reject(new Error('bad payload')))
    .catch(() => render(local(), false));        // no shared log: this browser only
}

/* ============================================================
   9. PLAYBOOK DRAWER
   ============================================================ */
function buildPlaybook() {
  $('#drawer-body').innerHTML = `
    <div class="pb-sec">
      <h4>Radio Numbers</h4>
      ${CONTENT.radio.map(r => `<div class="pb-row"><b>${r.num}</b><span>${esc(r.who)}</span></div>`).join('')}
    </div>

    <div class="pb-sec">
      <h4>Radio Phrases</h4>
      ${CONTENT.urgency.map(u => `<div class="pb-urg">
        <div class="p">"${esc(u.phrase)}"</div>
        <div class="m">${esc(u.means)} &mdash; ${esc(u.examples)}</div>
        <div class="n">${esc(u.pauseNote)}</div>
      </div>`).join('')}
      <div class="pb-note">Fights: call "all available staff" to your specific location. Do NOT get in the middle,
      contain it, do not let anyone leave, get names and clothing descriptions. Weight Room cannot leave its post.</div>
    </div>

    <div class="pb-sec">
      <h4>Arrival Times</h4>
      <div class="pb-row" style="font-weight:700;color:var(--gold)">
        <b style="min-width:96px">DSE</b><span style="flex:1">Arrive / Clock / Station</span></div>
      ${CONTENT.arrivals.map(a => `<div class="pb-row">
        <b style="min-width:96px;font-size:13px">${a.dse}</b>
        <span style="flex:1">${a.arrive} &middot; ${a.clockIn} &middot; ${a.station}</span></div>`).join('')}
      <div class="pb-note">${esc(CONTENT.openingTimes)} Never clock in before the "42" mark.
      Not in position by the "55" mark is a negative write-up. Late? Call the Welcome Desk at
      <b>${CONTENT.welcomeDeskPhone}</b> or the sup on shift.</div>
    </div>

    <div class="pb-sec">
      <h4>Staff Dress Code</h4>
      <div class="pb-note">Fingertip-length or longer khaki or jean bottoms. No white or multi-colored pants.
      Department shirt matching your position. Nametag. Tennis or athletic shoes only &mdash; no boots, sandals
      or open-toed shoes. No sweaters, cardigans or cover-ups; a grey, white or navy long-sleeve may go under
      the uniform. Blue &amp; Gold Fridays allow Kent State apparel, or blue/gold lettering on black, grey or white.</div>
    </div>

    <div class="pb-sec">
      <h4>Rotations</h4>
      <div class="pb-note">Follow numerical order at the top of every hour, and ask your sup about rotations.
      1 assistant: weight room the whole shift. 2 assistants: 61 to 60. 3 assistants: 61 to 62 to 60.
      GSA-trained staff add 55. All rotations are subject to the supervisor's discretion.</div>
    </div>

    <div class="pb-sec">
      <h4>Med Bags &amp; AED</h4>
      <div class="pb-note"><b>Red</b> gauze and band-aids. <b>Yellow</b> glucose tabs, aspirin, wipes, splint
      supplies, shock blanket, eyewash. <b>Green</b> cloth tape, triangle bandages, small SAM splint.
      <b>Blue</b> gloves. Med bags AND AEDs go to every immediate call.</div>
    </div>

    <div class="pb-sec">
      <h4>First Aid Role (EAP)</h4>
      <div class="pb-note">Introduce yourself as a first aid and CPR certified ops assistant. Get permission
      to help and to touch. Collect <b>SAMPLE</b>: Signs and symptoms, Allergies, Medications, Past medical
      history, Last oral intake, Events leading up. Radio <b>66</b> and <b>58</b> immediately. Get the patron
      comfortable, monitor, and assist with care. Gloves on before contact. No means no; consent is implied
      if unconscious; minors need parental consent.</div>
    </div>

    <div class="pb-sec">
      <h4>Cleaning Supplies</h4>
      <div class="pb-row"><b>Deo</b><span>Deoclean &mdash; nonmetal parts</span></div>
      <div class="pb-row"><b>Split</b><span>Metal parts</span></div>
      <div class="pb-row"><b>Rags</b><span>Wiping down used machines</span></div>
      <div class="pb-row"><b>Dust</b><span>Railings and the cluster on the ground</span></div>
      <div class="pb-note">Cleaning rags: white bin behind the FitWell desk. Patron towels: blue bin at the
      Welcome Desk. iPad task tracker password <b>6720480</b>. Gloves on for all used towels and micros.</div>
    </div>

    <div class="pb-sec">
      <h4>Shift Coverage</h4>
      <div class="pb-note">Post on the DSE trade board, ask the Operations GroupMe, message staff individually
      through DSE. More than 48 hours out: GA and Dr. Baker. Within 48 hours: the supervisor. Check DSE often
      &mdash; wild card shifts get assigned to you, and not knowing you were scheduled is not an excuse.</div>
    </div>`;
}

function openDrawer() {
  buildPlaybook();
  $('#drawer').classList.remove('hidden');
  $('#drawer-scrim').classList.remove('hidden');
}
function closeDrawer() {
  $('#drawer').classList.add('hidden');
  $('#drawer-scrim').classList.add('hidden');
}

/* ---------- keyboard shortcuts for answers ---------- */
function bindKeys() {
  document.onkeydown = e => {
    if ($('#drawer').classList.contains('hidden') === false) return;
    const n = parseInt(e.key, 10);
    if (n >= 1 && n <= 9) {
      const b = $$('.ans:not(:disabled)')[n - 1];
      if (b) b.click();
    }
  };
}


/* ============================================================
   CONTENT CHECK
   ------------------------------------------------------------
   Warns in the browser console about common data.js mistakes so
   a typo shows up as a message instead of a broken shift.
   Open DevTools (F12) after editing data.js to see the results.
   ============================================================ */
function checkContent() {
  const problems = [];

  CONTENT.radioDrills.forEach((d, i) => {
    if (!CONTENT.urgency.some(u => u.phrase === d.phrase))
      problems.push(`radioDrills[${i}]: phrase "${d.phrase}" is not one of the urgency phrases, so it can never be answered correctly.`);
  });

  Object.entries(CONTENT.positions).forEach(([k, p]) => {
    if (!p.scenarios || !p.scenarios.length) problems.push(`position ${k}: has no scenarios.`);
    if (!p.closing || !p.closing.items || !p.closing.items.length) problems.push(`position ${k}: has no closing items.`);
    if (p.closing) p.closing.items.forEach((it, i) => {
      if (it.ok === false && !it.why) problems.push(`position ${k} closing[${i}]: a trap item should have a "why".`);
    });
  });

  const allScenarios = [
    ...Object.entries(CONTENT.positions).flatMap(([k, p]) => (p.scenarios || []).map(s => [k, s])),
    ...(CONTENT.shared.scenarios || []).map(s => ['shared', s])
  ];
  const seen = {};
  allScenarios.forEach(([where, sc]) => {
    if (seen[sc.id]) problems.push(`scenario id "${sc.id}" is used more than once (${seen[sc.id]} and ${where}).`);
    seen[sc.id] = where;
    const right = (sc.options || []).filter(o => o.correct === true).length;
    if (right !== 1) problems.push(`scenario "${sc.id}" (${where}) has ${right} correct options; it needs exactly 1.`);
  });

  if (problems.length) {
    console.warn('%cSRWC content check found ' + problems.length + ' problem(s):', 'font-weight:bold');
    problems.forEach(p => console.warn('  - ' + p));
  } else {
    console.log('%cSRWC content check: all good.', 'color:#2fbf71');
  }
  return problems;
}

/* ---------- boot ---------- */
$('#btn-playbook').onclick = openDrawer;
$('#btn-close-drawer').onclick = closeDrawer;
$('#drawer-scrim').onclick = closeDrawer;
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

checkContent();
screenTitle();
