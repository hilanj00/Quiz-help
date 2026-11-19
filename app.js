// Rules of the Road quiz — plain JavaScript, no dependencies.
// Question data comes from data/*.js via addSection() (defined in index.html before the data files load).

(function () {
  "use strict";

  const LETTERS = ["A", "B", "C", "D", "E", "F"];
  const PASS_MARK = 90; // The Coast Guard Rules of the Road exam module requires 90%.
  const STORE_KEY = "rotr-quiz-v1";

  // ---------- Build the question bank ----------
  const bank = [];
  for (const sec of window.QUIZ_SECTIONS) {
    sec.items = [];
    for (const row of sec.questions) {
      const [num, rule, text, choices, answer, flags = {}] = row;
      const q = {
        id: sec.id + "-" + num,
        section: sec,
        num, rule, text, choices,
        answer: LETTERS.indexOf(answer),
        diagram: !!flags.diagram,
        fromRules: flags.src === "rules",
        note: flags.note || "",
      };
      sec.items.push(q);
      bank.push(q);
    }
  }
  const byId = new Map(bank.map((q) => [q.id, q]));

  // ---------- Saved settings + missed list (this browser only) ----------
  function load() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(saved)); } catch (e) { /* storage unavailable */ }
  }
  const saved = load();
  saved.missed = Array.isArray(saved.missed) ? saved.missed.filter((id) => byId.has(id)) : [];
  const settings = Object.assign(
    { sections: window.QUIZ_SECTIONS.map((s) => s.id), mode: "practice", count: "25", shuffle: true, diagrams: false },
    saved.settings || {}
  );

  // ---------- State ----------
  let quiz = null; // { list, idx, picks: [], checked: [] }

  const $ = (sel) => document.querySelector(sel);
  const app = $("#app");

  function esc(s) {
    return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function pool() {
    return bank.filter((q) => settings.sections.includes(q.section.id) && (settings.diagrams || !q.diagram));
  }

  // ---------- Tips ----------
  const TIPS = window.RULE_TIPS || {};
  // Which rules a question is about: the numbers in its "Rule" label, or a guess from its words
  // when the label has no number (the diagram pages only say BOTH / INLAND / INTERNATIONAL).
  const KEYWORD_RULES = [
    [/trawl|fishing|fish\b/i, "26"], [/tow|push|barge|alongside/i, "24"], [/pilot/i, "29"],
    [/anchor|aground/i, "30"], [/not under command|restricted|dredg|cable|mine|survey|navigation mark/i, "27"],
    [/sail/i, "25"], [/power-driven|underway/i, "23"],
  ];
  function rulesFor(q) {
    const keys = [];
    const add = (k) => { if (TIPS[k] && !keys.includes(k)) keys.push(k); };
    for (const m of q.rule.matchAll(/Annex\s+([IV]+)/g)) add("Annex " + m[1]);
    for (const m of q.rule.replace(/\(.*?\)/g, "").matchAll(/\d+/g)) add(m[0]);
    if (!keys.length) {
      const words = q.text + " " + q.choices.join(" ");
      if (q.section.id === "sound-diagrams") {
        if (/fog/i.test(q.text)) add("35");
        else {
          if (/overtak/i.test(q.text)) add("13");
          if (/crossing/i.test(q.text)) add("15");
          if (/meeting/i.test(q.text)) add("14");
          add("34");
        }
      } else {
        for (const [re, k] of KEYWORD_RULES) if (re.test(words)) add(k);
      }
    }
    return keys.slice(0, 3);
  }
  function tipCard(k) {
    const t = TIPS[k];
    const label = k.startsWith("Annex") ? k : "Rule " + k;
    return `<div class="tip-rule">
      <div class="tip-head"><span class="tag rule">${esc(label)}</span><strong>${esc(t.title)}</strong></div>
      <p>${esc(t.idea)}</p>
      <p class="trick"><span class="label">Remember</span> ${esc(t.trick)}</p>
    </div>`;
  }

  // ---------- Memory tricks page ----------
  function renderTricks() {
    quiz = null;
    const groups = (window.RULE_GROUPS || []).map((g) => `
      <section class="card">
        <h2>${esc(g.title)}</h2>
        <div class="trick-list">${g.keys.filter((k) => TIPS[k]).map((k) => `
          <details class="trick-item">
            <summary><span class="tag rule">${esc(k.startsWith("Annex") ? k : "Rule " + k)}</span>
              <span class="trick-title">${esc(TIPS[k].title)}</span>
              <span class="trick-line">${esc(TIPS[k].trick)}</span></summary>
            <p>${esc(TIPS[k].idea)}</p>
          </details>`).join("")}</div>
      </section>`).join("");
    app.innerHTML = `
      <div class="actions"><button class="btn" id="back">Back to test setup</button></div>
      <section class="card">
        <h2>Memory tricks</h2>
        <p class="hint">One easy way to remember each rule. Tap a rule to read what it says.</p>
      </section>
      ${groups}`;
    $("#back").addEventListener("click", renderSetup);
    window.scrollTo(0, 0);
  }

  // ---------- Setup screen ----------
  function renderSetup() {
    quiz = null;
    const secRows = window.QUIZ_SECTIONS.map((s) => {
      const n = s.items.filter((q) => settings.diagrams || !q.diagram).length;
      const hidden = s.items.length - n;
      return `<label class="check" for="sec-${s.id}">
        <input type="checkbox" id="sec-${s.id}" data-sec="${s.id}" ${settings.sections.includes(s.id) ? "checked" : ""}>
        <span class="name">${esc(s.title)}</span>
        <span class="count">${n} q${hidden ? ` · +${hidden} diagram` : ""}</span>
      </label>`;
    }).join("");

    const seg = (name, opts) => opts.map(([val, label]) =>
      `<button type="button" data-${name}="${val}" aria-pressed="${settings[name] === val}">${label}</button>`).join("");

    const available = pool().length;
    const missedCount = saved.missed.length;

    app.innerHTML = `
      <section class="card" aria-labelledby="setup-h">
        <h2 id="setup-h">Build your test</h2>
        <div class="field">
          <span class="label">Sections</span>
          <div class="sections">${secRows}</div>
        </div>
        <div class="options">
          <div class="field">
            <span class="label">Mode</span>
            <div class="seg">${seg("mode", [["practice", "Practice"], ["exam", "Exam"]])}</div>
            <p class="hint">${settings.mode === "practice" ? "See the answer after each question." : "Answers are revealed at the end."}</p>
          </div>
          <div class="field">
            <span class="label">Questions</span>
            <div class="seg">${seg("count", [["10", "10"], ["25", "25"], ["50", "50"], ["all", "All"]])}</div>
            <p class="hint">${available} available with these settings.</p>
          </div>
        </div>
        <div class="field">
          <label class="toggle" for="opt-shuffle"><input type="checkbox" id="opt-shuffle" ${settings.shuffle ? "checked" : ""}> Shuffle question order</label>
          <label class="toggle" for="opt-diagrams"><input type="checkbox" id="opt-diagrams" ${settings.diagrams ? "checked" : ""}> Include questions that refer to a book diagram</label>
          <p class="hint">The diagrams aren't reproduced here, so those questions are off by default.</p>
        </div>
        <div class="actions">
          <button class="btn primary" id="start" ${available ? "" : "disabled"}>Start test</button>
          <button class="btn" id="start-missed" ${missedCount ? "" : "disabled"}>Retake missed (${missedCount})</button>
          ${missedCount ? `<button class="btn ghost" id="clear-missed">Clear missed list</button>` : ""}
        </div>
      </section>
      <section class="card tricks-promo">
        <div>
          <h2>Memory tricks</h2>
          <p class="hint">Short sayings for every rule, like "Red over red, the captain is dead."</p>
        </div>
        <button class="btn" id="open-tricks">Open memory tricks</button>
      </section>`;

    app.querySelectorAll("[data-sec]").forEach((el) => el.addEventListener("change", () => {
      settings.sections = [...app.querySelectorAll("[data-sec]:checked")].map((x) => x.dataset.sec);
      persistSettings(); renderSetup();
    }));
    app.querySelectorAll("[data-mode]").forEach((el) => el.addEventListener("click", () => {
      settings.mode = el.dataset.mode; persistSettings(); renderSetup();
    }));
    app.querySelectorAll("[data-count]").forEach((el) => el.addEventListener("click", () => {
      settings.count = el.dataset.count; persistSettings(); renderSetup();
    }));
    $("#opt-shuffle").addEventListener("change", (e) => { settings.shuffle = e.target.checked; persistSettings(); });
    $("#opt-diagrams").addEventListener("change", (e) => { settings.diagrams = e.target.checked; persistSettings(); renderSetup(); });
    $("#start").addEventListener("click", () => {
      let list = pool();
      if (settings.shuffle) list = shuffle(list);
      if (settings.count !== "all") list = list.slice(0, Number(settings.count));
      startQuiz(list);
    });
    $("#start-missed").addEventListener("click", () => {
      startQuiz(shuffle(saved.missed.map((id) => byId.get(id))));
    });
    $("#open-tricks").addEventListener("click", renderTricks);
    const clr = $("#clear-missed");
    if (clr) clr.addEventListener("click", () => { saved.missed = []; save(); renderSetup(); });
  }
  function persistSettings() { saved.settings = settings; save(); }

  // ---------- Quiz screen ----------
  function startQuiz(list) {
    quiz = {
      list, idx: 0,
      picks: new Array(list.length).fill(-1),
      checked: new Array(list.length).fill(false),
      tips: new Array(list.length).fill(false),
      struck: list.map(() => []),
    };
    renderQuestion();
    window.scrollTo(0, 0);
  }

  function renderQuestion() {
    const { list, idx, picks, checked, tips, struck } = quiz;
    const q = list[idx];
    const ruleKeys = rulesFor(q);
    const practice = settings.mode === "practice";
    const pick = picks[idx];
    const done = practice && checked[idx];
    const answeredCount = picks.filter((p) => p >= 0).length;

    const choices = q.choices.map((c, i) => {
      let cls = "choice";
      if (done) {
        if (i === q.answer) cls += " right";
        else if (i === pick) cls += " wrong";
      } else if (i === pick) cls += " selected";
      const out = struck[idx].includes(i);
      if (out) cls += " struck";
      return `<button class="${cls}" data-choice="${i}" ${done || out ? "disabled" : ""} ${out ? 'aria-label="Crossed out: ' + esc(c) + '"' : ""}>
        <span class="key">${LETTERS[i]}</span><span class="txt">${esc(c)}</span></button>`;
    }).join("");

    let feedback = "";
    if (done) {
      const ok = pick === q.answer;
      feedback = `<div class="feedback ${ok ? "right" : "wrong"}" role="status">
        <strong>${ok ? "Correct" : "Incorrect"}</strong>
        ${ok ? "" : `<p>The answer is <b>${LETTERS[q.answer]}</b>: ${esc(q.choices[q.answer])}</p>`}
        ${q.note ? `<p>${esc(q.note)}</p>` : ""}
        ${ruleKeys.length ? `<p class="trick"><span class="label">Remember</span> ${esc(TIPS[ruleKeys[0]].trick)}</p>` : ""}
        <p class="src">${q.fromRules ? "Answer worked out from the Navigation Rules (book key not yet added)." : "Answer from the book's answer key."}</p>
      </div>`;
    }

    let tipPanel = "";
    if (tips[idx] && !done) {
      const wrongLeft = q.choices.map((_, i) => i).filter((i) => i !== q.answer && !struck[idx].includes(i));
      const canStrike = struck[idx].length < 2 && wrongLeft.length > 0;
      tipPanel = `<div class="tip-box" role="note">
        ${ruleKeys.length ? ruleKeys.map(tipCard).join("") : `<p>Read each answer and rule out the ones that can't be true. Watch for words like ALL, NEVER and EXCEPT.</p>`}
        <div class="actions">
          <button class="btn" id="strike" ${canStrike ? "" : "disabled"}>${struck[idx].length ? "Cross out another wrong answer" : "Cross out a wrong answer"}</button>
        </div>
      </div>`;
    }

    const last = idx === list.length - 1;
    let nextLabel, nextDisabled;
    if (practice) {
      nextLabel = done ? (last ? "See results" : "Next question") : "Check answer";
      nextDisabled = pick < 0;
    } else {
      nextLabel = last ? "Finish test" : "Next question";
      nextDisabled = false;
    }

    app.innerHTML = `
      <div class="progress">
        <div class="progress-row">
          <span class="label">Question ${idx + 1} of ${list.length}</span>
          <span class="label">${practice ? "Practice" : `${answeredCount} answered`}</span>
        </div>
        <div class="bar"><div style="width:${((idx + (done ? 1 : 0)) / list.length) * 100}%"></div></div>
      </div>
      <section class="card" aria-live="polite">
        <div class="tags">
          <span class="tag rule">${esc(q.rule)}</span>
          <span class="tag">${esc(q.section.title)} · #${q.num}</span>
          ${q.diagram ? `<span class="tag warn">Book diagram not shown</span>` : ""}
        </div>
        <p class="question">${esc(q.text)}</p>
        <div class="choices">${choices}</div>
        ${tipPanel}
        ${feedback}
        <div class="nav">
          <div class="actions">
            ${!practice && idx > 0 ? `<button class="btn" id="prev">Back</button>` : ""}
            ${done ? "" : `<button class="btn tip-btn" id="tip" aria-expanded="${tips[idx]}">${tips[idx] ? "Hide tip" : "Tip"}</button>`}
            <button class="btn ghost" id="quit">End test</button>
          </div>
          <button class="btn primary" id="next" ${nextDisabled ? "disabled" : ""}>${nextLabel}</button>
        </div>
        <p class="kbd-hint">Keyboard: press A–D or 1–4 to choose, T for a tip, Enter to continue.</p>
      </section>`;

    app.querySelectorAll("[data-choice]").forEach((el) =>
      el.addEventListener("click", () => choose(Number(el.dataset.choice))));
    $("#next").addEventListener("click", advance);
    $("#quit").addEventListener("click", finish);
    const tipBtn = $("#tip");
    if (tipBtn) tipBtn.addEventListener("click", toggleTip);
    const strikeBtn = $("#strike");
    if (strikeBtn) strikeBtn.addEventListener("click", strikeOne);
    const prev = $("#prev");
    if (prev) prev.addEventListener("click", () => { quiz.idx--; renderQuestion(); });
  }

  function toggleTip() {
    if (!quiz) return;
    const { idx, checked } = quiz;
    if (settings.mode === "practice" && checked[idx]) return;
    quiz.tips[idx] = !quiz.tips[idx];
    if (quiz.tips[idx]) quiz.usedTip = (quiz.usedTip || new Set()).add(idx);
    renderQuestion();
  }

  function strikeOne() {
    if (!quiz) return;
    const { idx, list, struck, picks } = quiz;
    const q = list[idx];
    if (struck[idx].length >= 2) return;
    const options = q.choices.map((_, i) => i).filter((i) => i !== q.answer && !struck[idx].includes(i));
    if (!options.length) return;
    const pickOut = options[Math.floor(Math.random() * options.length)];
    struck[idx].push(pickOut);
    if (picks[idx] === pickOut) picks[idx] = -1;
    renderQuestion();
  }

  function choose(i) {
    if (!quiz) return;
    const { idx, checked } = quiz;
    if (settings.mode === "practice" && checked[idx]) return;
    if (i >= quiz.list[idx].choices.length) return;
    if (quiz.struck[idx].includes(i)) return;
    quiz.picks[idx] = i;
    renderQuestion();
  }

  function advance() {
    if (!quiz) return;
    const { idx, list, picks, checked } = quiz;
    if (settings.mode === "practice" && !checked[idx]) {
      if (picks[idx] < 0) return;
      checked[idx] = true;
      recordResult(list[idx], picks[idx] === list[idx].answer);
      renderQuestion();
      return;
    }
    if (idx === list.length - 1) { finish(); return; }
    quiz.idx++;
    renderQuestion();
    window.scrollTo(0, 0);
  }

  function recordResult(q, ok) {
    const has = saved.missed.indexOf(q.id);
    if (!ok && has < 0) saved.missed.push(q.id);
    if (ok && has >= 0) saved.missed.splice(has, 1);
    save();
  }

  // ---------- Results ----------
  function finish() {
    const { list, picks, checked } = quiz;
    const tipsUsed = quiz.usedTip ? quiz.usedTip.size : 0;
    const practice = settings.mode === "practice";
    // Practice mode only scores questions that were checked; exam mode scores everything shown.
    const scored = list.map((q, i) => ({ q, pick: picks[i], counted: practice ? checked[i] : true }))
      .filter((r) => r.counted);
    if (!practice) scored.forEach((r) => recordResult(r.q, r.pick === r.q.answer));

    const correct = scored.filter((r) => r.pick === r.q.answer).length;
    const total = scored.length;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    const pass = pct >= PASS_MARK;
    const misses = scored.filter((r) => r.pick !== r.q.answer);

    const review = misses.map((r) => `
      <div class="review-item">
        <div class="tags"><span class="tag rule">${esc(r.q.rule)}</span><span class="tag">${esc(r.q.section.title)} · #${r.q.num}</span></div>
        <p>${esc(r.q.text)}</p>
        <p class="yours">Your answer: ${r.pick >= 0 ? `${LETTERS[r.pick]}. ${esc(r.q.choices[r.pick])}` : "not answered"}</p>
        <p class="correct">Correct: ${LETTERS[r.q.answer]}. ${esc(r.q.choices[r.q.answer])}</p>
        ${r.q.note ? `<p class="src">${esc(r.q.note)}</p>` : ""}
        ${(() => { const k = rulesFor(r.q)[0]; return k ? `<p class="trick"><span class="label">Remember</span> ${esc(TIPS[k].trick)}</p>` : ""; })()}
      </div>`).join("");

    app.innerHTML = `
      <section class="card" aria-labelledby="res-h">
        <h2 id="res-h">Results</h2>
        <div class="score">
          <div class="big ${pass ? "pass" : "fail"}">${pct}%</div>
          <div class="meta">
            <span><b>${correct}</b> of <b>${total}</b> correct${tipsUsed ? ` · tips used on ${tipsUsed}` : ""}</span>
            <span class="hint">${pass ? "That clears the 90% needed on the Coast Guard Rules of the Road exam." : "The Coast Guard Rules of the Road exam needs 90% to pass. Keep at it."}</span>
          </div>
        </div>
        <div class="actions">
          ${misses.length ? `<button class="btn primary" id="retry">Retake the ${misses.length} I missed</button>` : ""}
          <button class="btn ${misses.length ? "" : "primary"}" id="again">New test</button>
        </div>
      </section>
      ${misses.length ? `<section class="card"><h2>Review what you missed</h2><div class="review">${review}</div></section>` : ""}`;

    const retry = $("#retry");
    if (retry) retry.addEventListener("click", () => startQuiz(shuffle(misses.map((r) => r.q))));
    $("#again").addEventListener("click", renderSetup);
    quiz = null;
    window.scrollTo(0, 0);
  }

  // ---------- Keyboard ----------
  document.addEventListener("keydown", (e) => {
    if (!quiz || e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key.toUpperCase();
    const li = LETTERS.indexOf(k);
    if (li >= 0 && li < 4) { choose(li); e.preventDefault(); return; }
    if (/^[1-4]$/.test(k)) { choose(Number(k) - 1); e.preventDefault(); return; }
    if (k === "T") { toggleTip(); e.preventDefault(); return; }
    if (e.key === "Enter") {
      const next = $("#next");
      if (next && !next.disabled) { advance(); e.preventDefault(); }
    }
  });

  $("#total-count").textContent = bank.length;
  renderSetup();
})();
