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

  // ---------- Setup screen ----------
  function renderSetup() {
    quiz = null;
    const secRows = window.QUIZ_SECTIONS.map((s) => {
      const n = s.items.filter((q) => settings.diagrams || !q.diagram).length;
      return `<label class="check" for="sec-${s.id}">
        <input type="checkbox" id="sec-${s.id}" data-sec="${s.id}" ${settings.sections.includes(s.id) ? "checked" : ""}>
        <span class="name">${esc(s.title)}</span>
        <span class="count">${n} q</span>
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
    const clr = $("#clear-missed");
    if (clr) clr.addEventListener("click", () => { saved.missed = []; save(); renderSetup(); });
  }
  function persistSettings() { saved.settings = settings; save(); }

  // ---------- Quiz screen ----------
  function startQuiz(list) {
    quiz = { list, idx: 0, picks: new Array(list.length).fill(-1), checked: new Array(list.length).fill(false) };
    renderQuestion();
    window.scrollTo(0, 0);
  }

  function renderQuestion() {
    const { list, idx, picks, checked } = quiz;
    const q = list[idx];
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
      return `<button class="${cls}" data-choice="${i}" ${done ? "disabled" : ""}>
        <span class="key">${LETTERS[i]}</span><span class="txt">${esc(c)}</span></button>`;
    }).join("");

    let feedback = "";
    if (done) {
      const ok = pick === q.answer;
      feedback = `<div class="feedback ${ok ? "right" : "wrong"}" role="status">
        <strong>${ok ? "Correct" : "Incorrect"}</strong>
        ${ok ? "" : `<p>The answer is <b>${LETTERS[q.answer]}</b>: ${esc(q.choices[q.answer])}</p>`}
        ${q.note ? `<p>${esc(q.note)}</p>` : ""}
        <p class="src">${q.fromRules ? "Answer worked out from the Navigation Rules (book key not yet added)." : "Answer from the book's answer key."}</p>
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
        ${feedback}
        <div class="nav">
          <div class="actions">
            ${!practice && idx > 0 ? `<button class="btn" id="prev">Back</button>` : ""}
            <button class="btn ghost" id="quit">End test</button>
          </div>
          <button class="btn primary" id="next" ${nextDisabled ? "disabled" : ""}>${nextLabel}</button>
        </div>
        <p class="kbd-hint">Keyboard: press A–D or 1–4 to choose, Enter to continue.</p>
      </section>`;

    app.querySelectorAll("[data-choice]").forEach((el) =>
      el.addEventListener("click", () => choose(Number(el.dataset.choice))));
    $("#next").addEventListener("click", advance);
    $("#quit").addEventListener("click", finish);
    const prev = $("#prev");
    if (prev) prev.addEventListener("click", () => { quiz.idx--; renderQuestion(); });
  }

  function choose(i) {
    if (!quiz) return;
    const { idx, checked } = quiz;
    if (settings.mode === "practice" && checked[idx]) return;
    if (i >= quiz.list[idx].choices.length) return;
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
      </div>`).join("");

    app.innerHTML = `
      <section class="card" aria-labelledby="res-h">
        <h2 id="res-h">Results</h2>
        <div class="score">
          <div class="big ${pass ? "pass" : "fail"}">${pct}%</div>
          <div class="meta">
            <span><b>${correct}</b> of <b>${total}</b> correct</span>
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
    if (e.key === "Enter") {
      const next = $("#next");
      if (next && !next.disabled) { advance(); e.preventDefault(); }
    }
  });

  $("#total-count").textContent = bank.length;
  renderSetup();
})();
