// Rules of the Road quiz — plain JavaScript, no dependencies.
// Question data comes from data/*.js via addSection() (defined in index.html before the data files load).

(function () {
  "use strict";

  const LETTERS = ["A", "B", "C", "D", "E", "F"];
  const SUBJECTS = window.QUIZ_SUBJECTS;
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
    { subject: "rules", sections: window.QUIZ_SECTIONS.map((s) => s.id), mode: "practice", count: "25", shuffle: true, diagrams: false },
    saved.settings || {}
  );
  if (!SUBJECTS.some((x) => x.id === settings.subject)) settings.subject = "rules";
  // Sections added after the settings were saved start out switched on.
  const knownSections = new Set(saved.knownSections || window.QUIZ_SECTIONS.map((s) => s.id));
  for (const sec of window.QUIZ_SECTIONS) {
    if (!knownSections.has(sec.id) && !settings.sections.includes(sec.id)) settings.sections.push(sec.id);
  }
  saved.knownSections = window.QUIZ_SECTIONS.map((s) => s.id);
  saved.settings = settings;
  save();
  const subject = () => SUBJECTS.find((x) => x.id === settings.subject);
  const subjectSections = (id) => window.QUIZ_SECTIONS.filter((s) => s.subject === id);
  const subjectCount = (id) => bank.filter((q) => q.section.subject === id).length;
  const missedHere = () => saved.missed.filter((id) => byId.get(id).section.subject === settings.subject);

  // Last score per section (green 90%+, yellow 70-89%, red under 70%), from regular tests only.
  saved.sectionScores = saved.sectionScores && typeof saved.sectionScores === "object" ? saved.sectionScores : {};
  function grade(pct) { return pct >= 90 ? "good" : pct >= 70 ? "ok" : "bad"; }
  const GRADE_WORD = { good: "90% or more", ok: "70 to 89%", bad: "under 70%" };
  function gradeBadge(rec) {
    if (!rec || !rec.t) return `<span class="grade grade-none" title="You haven't taken a test on this section yet"><span class="dot" aria-hidden="true"></span>Not taken</span>`;
    if (rec.c === rec.t) return `<span class="grade grade-perfect" title="Perfect: ${rec.c} of ${rec.t}"><span class="star" aria-hidden="true">★</span>100%</span>`;
    const pct = Math.min(99, Math.round((rec.c / rec.t) * 100));
    const g = grade(pct);
    return `<span class="grade grade-${g}" title="Last score: ${rec.c} of ${rec.t} (${GRADE_WORD[g]})"><span class="dot" aria-hidden="true"></span>${pct}%</span>`;
  }

  function updateHeader() {
    const sub = subject();
    const n = subjectCount(sub.id);
    $("#subject-title").textContent = sub.title;
    $("#subject-blurb").textContent = sub.blurb + (n ? ` · ${n} questions` : "");
    $("#source").textContent = sub.source;
  }

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
    return bank.filter((q) => q.section.subject === settings.subject && settings.sections.includes(q.section.id) && (settings.diagrams || !q.diagram));
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
  // The "Remember" line after answering: the question's own tip, or the rule's saying if it has none.
  function rememberFor(q) {
    const own = (window.QUESTION_TIPS || {})[q.id];
    if (own) return own;
    const k = rulesFor(q)[0];
    return k ? TIPS[k].trick : "";
  }
  // The mnemonic device for the fact a question tests.
  function mnemonicFor(q) {
    const key = (window.QUESTION_MNEMONIC || {})[q.id];
    const m = key && (window.MNEMONICS || {})[key];
    return m ? { key, topic: m[0], device: m[1], meaning: m[2] } : null;
  }
  function whyLine(q) {
    const m = mnemonicFor(q);
    const why = m && (window.MNEMONIC_WHY || {})[m.key];
    return why ? `<p class="why"><span class="label">Why this rule exists</span> ${esc(why)}</p>` : "";
  }
  function mnemonicLine(q) {
    const m = mnemonicFor(q);
    if (!m) return "";
    return `<div class="mnemonic"><span class="label">Mnemonic · ${esc(m.topic)}</span>
      <p class="device">${esc(m.device)}</p><p class="meaning">${esc(m.meaning)}</p></div>`;
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
    setWide(false);
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
    const M = window.MNEMONICS || {};
    const devices = (window.MNEMONIC_GROUPS || []).map(([title, keys]) => `
      <section class="card">
        <h2>${esc(title)}</h2>
        <div class="trick-list">${keys.filter((k) => M[k]).map((k) => `
          <details class="trick-item">
            <summary><span class="trick-title">${esc(M[k][0])}</span>
              <span class="trick-line device">${esc(M[k][1])}</span></summary>
            <p>${esc(M[k][2])}</p>
            ${(window.MNEMONIC_WHY || {})[k] ? `<p class="why"><span class="label">Why</span> ${esc(window.MNEMONIC_WHY[k])}</p>` : ""}
          </details>`).join("")}</div>
      </section>`).join("");
    const count = Object.keys(M).length;
    const tab = (window.__tricksTab = window.__tricksTab || "mnemonics");
    app.innerHTML = `
      <div class="actions"><button class="btn" id="back">Back to test setup</button></div>
      <section class="card">
        <h2>Memory tricks</h2>
        <div class="seg" role="group" aria-label="Show">
          <button type="button" data-tt="mnemonics" aria-pressed="${tab === "mnemonics"}">Mnemonics (${count})</button>
          <button type="button" data-tt="rules" aria-pressed="${tab === "rules"}">Rule by rule</button>
        </div>
        <p class="hint">${tab === "mnemonics" ? "A memory device for every fact the test asks about. Tap one to see what it unlocks. The same device appears after each question that tests it." : "One saying for each rule. Tap a rule to read what it says."}</p>
      </section>
      ${tab === "mnemonics" ? devices : groups}`;
    app.querySelectorAll("[data-tt]").forEach((el) => el.addEventListener("click", () => { window.__tricksTab = el.dataset.tt; renderTricks(); }));
    $("#back").addEventListener("click", renderSetup);
    window.scrollTo(0, 0);
  }

  // ---------- Setup screen ----------
  function renderSetup() {
    quiz = null;
    setWide(false);
    updateHeader();
    const sub = subject();
    const sections = subjectSections(sub.id);
    const subjectTabs = `<nav class="subjects" aria-label="Subject">${SUBJECTS.map((x) => {
      const n = subjectCount(x.id);
      return `<button type="button" class="subject" data-subject="${x.id}" aria-pressed="${x.id === sub.id}">
        <span class="subject-name">${esc(x.title)}</span>
        <span class="subject-count">${n ? n + " questions" : "Coming soon"}</span>
      </button>`;
    }).join("")}</nav>`;
    const gameCard = window.LightsGame ? `<section class="card game-promo">
        <div class="game-promo-pic" aria-hidden="true">${window.LightsGame.preview("nuc-way", "ahead")}</div>
        <div class="game-promo-text">
          <h2>Lights &amp; Shapes game</h2>
          <p class="hint">Learn which lights and day shapes belong to which boat, then play quick 10-round games.</p>
          <div class="actions"><button class="btn primary" id="open-game">Play the game</button></div>
        </div>
      </section>` : "";
    const secRows = sections.map((s) => {
      const n = s.items.filter((q) => settings.diagrams || !q.diagram).length;
      const hidden = s.items.length - n;
      return `<label class="check" for="sec-${s.id}">
        <input type="checkbox" id="sec-${s.id}" data-sec="${s.id}" ${settings.sections.includes(s.id) ? "checked" : ""}>
        <span class="name">${esc(s.title)}${gradeBadge(saved.sectionScores[s.id])}</span>
        <span class="count">${n} q${hidden ? ` · +${hidden} diagram` : ""}</span>
      </label>`;
    }).join("");

    const seg = (name, opts) => opts.map(([val, label]) =>
      `<button type="button" data-${name}="${val}" aria-pressed="${settings[name] === val}">${label}</button>`).join("");

    const available = pool().length;
    const missedCount = missedHere().length;
    const selectedHere = sections.filter((x) => settings.sections.includes(x.id)).length;
    const hasDiagrams = sections.some((s) => s.items.some((q) => q.diagram));

    if (!sections.length) {
      app.innerHTML = `${subjectTabs}${gameCard}
        <section class="card empty">
          <h2>No ${esc(sub.title)} questions yet</h2>
          <p>Send photos of your ${esc(sub.title)} practice pages and their answer key, and the questions will show up here with the same practice mode, exam mode, tips and missed-question retakes.</p>
          <p class="hint">Passing score for this exam module: ${sub.pass}%.</p>
        </section>`;
      bindSubjectTabs();
      bindGame();
      return;
    }

    app.innerHTML = `${subjectTabs}${gameCard}
      <section class="card" aria-labelledby="setup-h">
        <h2 id="setup-h">Build your test</h2>
        <div class="field">
          <div class="field-head">
            <span class="label">Sections · ${selectedHere} of ${sections.length} selected</span>
            ${`<div class="legend" aria-label="Score colors">
              <span class="label">Last score</span>
              <span class="grade grade-perfect"><span class="star" aria-hidden="true">★</span>100%</span>
              <span class="grade grade-good"><span class="dot" aria-hidden="true"></span>90%+</span>
              <span class="grade grade-ok"><span class="dot" aria-hidden="true"></span>70–89%</span>
              <span class="grade grade-bad"><span class="dot" aria-hidden="true"></span>under 70%</span>
              <span class="grade grade-none"><span class="dot" aria-hidden="true"></span>Not taken</span>
            </div>`}
            <div class="mini-actions">
              <button type="button" class="link-btn" id="sel-all" ${selectedHere === sections.length ? "disabled" : ""}>Select all</button>
              <button type="button" class="link-btn" id="sel-none" ${selectedHere === 0 ? "disabled" : ""}>Deselect all</button>
            </div>
          </div>
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
          ${hasDiagrams ? `<label class="toggle" for="opt-diagrams"><input type="checkbox" id="opt-diagrams" ${settings.diagrams ? "checked" : ""}> Include questions that refer to a book diagram</label>
          <p class="hint">The diagrams aren't reproduced here, so those questions are off by default.</p>` : ""}
        </div>
        <div class="actions">
          <button class="btn primary" id="start" ${available ? "" : "disabled"}>Start test</button>
          <button class="btn" id="start-missed" ${missedCount ? "" : "disabled"}>Retake missed (${missedCount})</button>
          ${missedCount ? `<button class="btn ghost" id="clear-missed">Clear missed list</button>` : ""}
        </div>
      </section>
      ${sub.id === "rules" ? `<section class="card tricks-promo">
        <div>
          <h2>Memory tricks</h2>
          <p class="hint">Mnemonics for every fact on the test, like "Nobody Really Cares For Sailing Power Planes."</p>
        </div>
        <button class="btn" id="open-tricks">Open memory tricks</button>
      </section>` : ""}`;
    bindSubjectTabs();
    bindGame();

    app.querySelectorAll("[data-sec]").forEach((el) => el.addEventListener("change", () => {
      const others = settings.sections.filter((id) => !sections.some((x) => x.id === id));
      settings.sections = [...others, ...[...app.querySelectorAll("[data-sec]:checked")].map((x) => x.dataset.sec)];
      persistSettings(); renderSetup();
    }));
    const hereIds = sections.map((x) => x.id);
    $("#sel-all").addEventListener("click", () => {
      settings.sections = [...new Set([...settings.sections, ...hereIds])];
      persistSettings(); renderSetup();
    });
    $("#sel-none").addEventListener("click", () => {
      settings.sections = settings.sections.filter((id) => !hereIds.includes(id));
      persistSettings(); renderSetup();
    });
    app.querySelectorAll("[data-mode]").forEach((el) => el.addEventListener("click", () => {
      settings.mode = el.dataset.mode; persistSettings(); renderSetup();
    }));
    app.querySelectorAll("[data-count]").forEach((el) => el.addEventListener("click", () => {
      settings.count = el.dataset.count; persistSettings(); renderSetup();
    }));
    $("#opt-shuffle").addEventListener("change", (e) => { settings.shuffle = e.target.checked; persistSettings(); });
    const diag = $("#opt-diagrams");
    if (diag) diag.addEventListener("change", (e) => { settings.diagrams = e.target.checked; persistSettings(); renderSetup(); });
    $("#start").addEventListener("click", () => {
      let list = pool();
      if (settings.shuffle) list = shuffle(list);
      if (settings.count !== "all") list = list.slice(0, Number(settings.count));
      startQuiz(list, "test");
    });
    $("#start-missed").addEventListener("click", () => {
      startQuiz(shuffle(missedHere().map((id) => byId.get(id))));
    });
    const tricks = $("#open-tricks");
    if (tricks) tricks.addEventListener("click", renderTricks);
    const clr = $("#clear-missed");
    if (clr) clr.addEventListener("click", () => {
      const here = new Set(missedHere());
      saved.missed = saved.missed.filter((id) => !here.has(id));
      save(); renderSetup();
    });
  }
  function bindGame() {
    const g = $("#open-game");
    if (g) g.addEventListener("click", () => { setWide(false); window.LightsGame.open(app, renderSetup); });
  }
  function bindSubjectTabs() {
    app.querySelectorAll("[data-subject]").forEach((el) => el.addEventListener("click", () => {
      settings.subject = el.dataset.subject; persistSettings(); renderSetup();
    }));
  }
  function persistSettings() { saved.settings = settings; save(); }

  // ---------- Quiz screen ----------
  function startQuiz(list, kind = "retake") {
    quiz = {
      list, idx: 0, kind,
      picks: new Array(list.length).fill(-1),
      checked: new Array(list.length).fill(false),
      tips: new Array(list.length).fill(false),
      struck: list.map(() => []),
      firstPick: new Array(list.length).fill(-1), // practice: the answer given the first time it was checked
      retried: new Array(list.length).fill(false),
      furthest: 0,                                 // practice: the furthest question reached
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
    const revisiting = practice && idx < quiz.furthest;

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
        ${rememberFor(q) ? `<p class="trick"><span class="label">Remember</span> ${esc(rememberFor(q))}</p>` : ""}
        ${whyLine(q)}
        ${mnemonicLine(q)}
        <p class="src">${q.fromRules ? "Answer worked out from the Navigation Rules (book key not yet added)." : "Answer from the book's answer key."}${quiz.retried[idx] ? " Retries don't change your score; your first answer counts." : ""}</p>
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
      nextLabel = done ? (revisiting ? `Back to question ${quiz.furthest + 1}` : last ? "See results" : "Next question") : "Check answer";
      nextDisabled = pick < 0;
    } else {
      nextLabel = last ? "Finish test" : "Next question";
      nextDisabled = false;
    }

    const reached = practice ? quiz.furthest + (checked[quiz.furthest] ? 1 : 0) : idx + (done ? 1 : 0);
    const main = `
      <div class="progress">
        <div class="progress-row">
          <span class="label">Question ${idx + 1} of ${list.length}${revisiting ? " · trying again" : ""}</span>
          <span class="label">${practice ? "Practice" : `${answeredCount} answered`}</span>
        </div>
        <div class="bar"><div style="width:${(reached / list.length) * 100}%"></div></div>
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
            ${revisiting && !done ? `<button class="btn" id="resume">Skip, back to question ${quiz.furthest + 1}</button>` : ""}
            ${done ? "" : `<button class="btn tip-btn" id="tip" aria-expanded="${tips[idx]}">${tips[idx] ? "Hide tip" : "Tip"}</button>`}
            <button class="btn ghost" id="quit">End test</button>
          </div>
          <button class="btn primary" id="next" ${nextDisabled ? "disabled" : ""}>${nextLabel}</button>
        </div>
        <p class="kbd-hint">Keyboard: press A–D or 1–4 to choose, T for a tip, Enter to continue.</p>
      </section>`;

    setWide(practice);
    app.innerHTML = practice
      ? `<div class="quiz-layout"><div class="quiz-main">${main}</div>${missedPanel()}</div>`
      : main;

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
    const resume = $("#resume");
    if (resume) resume.addEventListener("click", () => { quiz.idx = quiz.furthest; renderQuestion(); });
    app.querySelectorAll("[data-retry]").forEach((el) =>
      el.addEventListener("click", () => tryAgain(Number(el.dataset.retry))));
  }

  // Practice mode: the questions missed so far in this test, with a way back to each one.
  function missedPanel() {
    const { list, firstPick, picks, checked, retried, idx } = quiz;
    const rows = [];
    list.forEach((q, i) => {
      if (firstPick[i] < 0 || firstPick[i] === q.answer) return;
      let status, cls;
      if (i === idx && !checked[i]) { status = "Trying again now"; cls = "now"; }
      else if (retried[i] && checked[i] && picks[i] === q.answer) { status = "Got it on retry"; cls = "fixed"; }
      else if (retried[i] && checked[i]) { status = "Missed again"; cls = "missed"; }
      else { status = "Missed"; cls = "missed"; }
      const canRetry = !(i === idx && !checked[i]);
      rows.push(`<li class="missed-item ${cls}">
        <div class="missed-top"><span class="missed-num">Q${i + 1}</span><span class="missed-status">${status}</span></div>
        <p class="missed-text">${esc(q.text.length > 90 ? q.text.slice(0, 88).trimEnd() + "…" : q.text)}</p>
        ${canRetry ? `<button type="button" class="link-btn" data-retry="${i}">Try again</button>` : ""}
      </li>`);
    });
    const fixed = rows.filter((r) => r.includes("missed-item fixed")).length;
    return `<aside class="missed-panel" aria-labelledby="missed-h">
      <div class="missed-head">
        <h2 id="missed-h">Missed this test</h2>
        <span class="count">${rows.length}${fixed ? ` · ${fixed} fixed` : ""}</span>
      </div>
      ${rows.length ? `<ol class="missed-list">${rows.join("")}</ol>` : `<p class="hint">Nothing missed yet. Questions you get wrong show up here so you can go back and try them again.</p>`}
    </aside>`;
  }

  function tryAgain(i) {
    if (!quiz) return;
    quiz.idx = i;
    quiz.picks[i] = -1;
    quiz.checked[i] = false;
    quiz.struck[i] = [];
    quiz.tips[i] = false;
    quiz.retried[i] = true;
    renderQuestion();
    window.scrollTo(0, 0);
  }

  function setWide(on) {
    const wrap = document.querySelector(".wrap");
    if (wrap) wrap.classList.toggle("wide", !!on);
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
      if (quiz.firstPick[idx] < 0) {
        quiz.firstPick[idx] = picks[idx];
        recordResult(list[idx], picks[idx] === list[idx].answer);
      }
      renderQuestion();
      return;
    }
    if (settings.mode === "practice" && idx < quiz.furthest) {
      quiz.idx = quiz.furthest;
      renderQuestion();
      window.scrollTo(0, 0);
      return;
    }
    if (idx === list.length - 1) { finish(); return; }
    quiz.idx++;
    if (settings.mode === "practice") quiz.furthest = Math.max(quiz.furthest, quiz.idx);
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
    setWide(false);
    const practice = settings.mode === "practice";
    // Practice mode only scores questions that were checked; exam mode scores everything shown.
    const scored = list.map((q, i) => practice
        ? { q, pick: quiz.firstPick[i], counted: quiz.firstPick[i] >= 0 }
        : { q, pick: picks[i], counted: true })
      .filter((r) => r.counted);
    if (!practice) scored.forEach((r) => recordResult(r.q, r.pick === r.q.answer));

    const correct = scored.filter((r) => r.pick === r.q.answer).length;
    const total = scored.length;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    const sub = subject();
    const pass = pct >= sub.pass;
    const misses = scored.filter((r) => r.pick !== r.q.answer);

    // Score each section that had questions in this test.
    const bySection = new Map();
    for (const r of scored) {
      const rec = bySection.get(r.q.section) || { c: 0, t: 0 };
      rec.t++; if (r.pick === r.q.answer) rec.c++;
      bySection.set(r.q.section, rec);
    }
    const recorded = quiz.kind === "test";
    if (recorded) {
      for (const [sec, rec] of bySection) saved.sectionScores[sec.id] = { c: rec.c, t: rec.t, at: Date.now() };
      save();
    }
    const sectionRows = [...bySection].map(([sec, rec]) => `
      <div class="sec-score"><span class="name">${esc(sec.title)}</span>${gradeBadge(rec)}<span class="count">${rec.c} of ${rec.t}</span></div>`).join("");

    const review = misses.map((r) => `
      <div class="review-item">
        <div class="tags"><span class="tag rule">${esc(r.q.rule)}</span><span class="tag">${esc(r.q.section.title)} · #${r.q.num}</span></div>
        <p>${esc(r.q.text)}</p>
        <p class="yours">Your answer: ${r.pick >= 0 ? `${LETTERS[r.pick]}. ${esc(r.q.choices[r.pick])}` : "not answered"}</p>
        <p class="correct">Correct: ${LETTERS[r.q.answer]}. ${esc(r.q.choices[r.q.answer])}</p>
        ${r.q.note ? `<p class="src">${esc(r.q.note)}</p>` : ""}
        ${rememberFor(r.q) ? `<p class="trick"><span class="label">Remember</span> ${esc(rememberFor(r.q))}</p>` : ""}
        ${whyLine(r.q)}
        ${mnemonicLine(r.q)}
      </div>`).join("");

    app.innerHTML = `
      <section class="card" aria-labelledby="res-h">
        <h2 id="res-h">Results</h2>
        <div class="score">
          <div class="big ${pass ? "pass" : "fail"}">${pct}%</div>
          <div class="meta">
            <span><b>${correct}</b> of <b>${total}</b> correct${tipsUsed ? ` · tips used on ${tipsUsed}` : ""}</span>
            <span class="hint">${pass ? `That clears the ${sub.pass}% needed on the Coast Guard ${esc(sub.title)} exam.` : `The Coast Guard ${esc(sub.title)} exam needs ${sub.pass}% to pass. Keep at it.`}</span>
          </div>
        </div>
        <div class="actions">
          ${misses.length ? `<button class="btn primary" id="retry">Retake the ${misses.length} I missed</button>` : ""}
          <button class="btn ${misses.length ? "" : "primary"}" id="again">New test</button>
        </div>
      </section>
      ${bySection.size ? `<section class="card"><h2>By section</h2>
        <div class="sec-scores">${sectionRows}</div>
        <p class="hint">${recorded ? "These colors now show next to each section when you build a test." : "Retakes of missed questions don't change the section colors; only regular tests do."}</p>
      </section>` : ""}
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

  renderSetup();
})();
