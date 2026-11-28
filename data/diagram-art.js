// Redrawn versions of the book's "Diagrams & Illustrations" pages (U.S. Maritime Academy, pp. 144–154),
// so questions that say "see DIAGRAM 30" can show the picture. Drawn as SVG from the photos:
//   lights  = night panels: [color, x, y] with x and y from 0 to 1
//   shapes  = day shapes on a hoist line
//   scene   = vessel situations: hulls with heading arrows (heading in degrees: 0 east, -90 north, 90 south, 180 west)

(function () {
  "use strict";

  const L = (spec) => ({ type: "lights", spec });
  const S = (spec) => ({ type: "shapes", spec });
  const V = (spec) => ({ type: "scene", spec });

  const DIAGRAMS = {
    // ---------- Vessel situations ----------
    2: V({ wind: { x: 150, y: 150, dir: -90 }, vessels: [
      { label: "I", x: 200, y: 52, hdg: 180 },
      { label: "II", x: 80, y: 140, hdg: -90, kind: "sail", boom: "stbd" } ] }),
    3: V({ wind: { x: 175, y: 170, dir: -110 }, vessels: [
      { label: "II", x: 75, y: 95, hdg: 0, kind: "sail", boom: "port" },
      { label: "I", x: 225, y: 95, hdg: 180, kind: "sail", boom: "stbd" } ] }),
    5: V({ vessels: [
      { label: "A", x: 85, y: 160, hdg: -90, kind: "tug", barge: "ahead" },
      { label: "B", x: 220, y: 70, hdg: 180, kind: "tug" } ] }),
    8: V({ vessels: [
      { label: "A", x: 70, y: 110, hdg: 0, kind: "tug" },
      { label: "B", x: 245, y: 110, hdg: 180, kind: "tug", barge: "ahead" } ] }),
    9: V({ vessels: [
      { label: "A", x: 70, y: 110, hdg: 0 },
      { label: "B", x: 200, y: 110, hdg: 0 } ] }),
    12: V({ vessels: [
      { label: "A", x: 60, y: 110, hdg: 0, kind: "tug", barge: "ahead" },
      { label: "B", x: 245, y: 110, hdg: 180, kind: "tug" } ] }),
    14: V({ vessels: [
      { label: "B", x: 80, y: 60, hdg: 0 },
      { label: "A", x: 225, y: 160, hdg: -145 } ] }),
    15: V({ vessels: [
      { label: "B", x: 175, y: 60, hdg: 0 },
      { label: "A", x: 75, y: 165, hdg: -40 } ] }),
    17: V({ vessels: [
      { label: "A", x: 70, y: 70, hdg: 0, kind: "tug" },
      { label: "B", x: 190, y: 120, hdg: 0, kind: "tug" } ] }),
    20: V({ vessels: [
      { label: "B", x: 75, y: 55, hdg: 0, kind: "sail", boom: "stbd" },
      { label: "A", x: 205, y: 140, hdg: -125, kind: "tug", barge: "astern" } ] }),
    26: V({ vessels: [
      { label: "B", x: 215, y: 45, hdg: 180 },
      { label: "A", x: 95, y: 150, hdg: -90 } ] }),
    27: V({ vessels: [
      { label: "B", x: 85, y: 55, hdg: 40, kind: "sail", boom: "port" },
      { label: "A", x: 205, y: 150, hdg: -95 } ] }),
    28: V({ vessels: [
      { label: "B", x: 220, y: 45, hdg: 125, kind: "tug" },
      { label: "A", x: 110, y: 175, hdg: -90, kind: "tug", barge: "ahead" } ] }),
    29: V({ channel: [70, 150], vessels: [
      { label: "A", x: 80, y: 95, hdg: 0, size: 0.6 },
      { label: "B", x: 215, y: 125, hdg: 180, size: 0.6 } ] }),
    30: V({ vessels: [
      { label: "A", x: 90, y: 160, hdg: -90, kind: "tug" },
      { label: "B", x: 215, y: 55, hdg: 140, kind: "tug" } ] }),
    31: V({ vessels: [
      { label: "A", x: 170, y: 70, hdg: 0 },
      { label: "B", x: 75, y: 145, hdg: 0 } ] }),
    32: V({ vessels: [
      { label: "A", x: 130, y: 110, hdg: 180, kind: "tug" },
      { label: "B", x: 245, y: 110, hdg: 180, kind: "tug" } ] }),
    33: V({ wind: { x: 190, y: 105, dir: 180 }, vessels: [
      { label: "I", x: 200, y: 55, hdg: 180, kind: "sail", boom: "port" },
      { label: "II", x: 80, y: 155, hdg: -90, size: 0.7 } ] }),
    36: V({ vessels: [
      { label: "I", x: 205, y: 55, hdg: 180 },
      { label: "II", x: 85, y: 155, hdg: -90 } ] }),
    37: V({ channel: [80, 140], vessels: [
      { label: "A", x: 70, y: 110, hdg: 0, size: 0.6, mast: true },
      { label: "B", x: 230, y: 110, hdg: 180, size: 0.6, mast: true } ] }),
    41: V({ channel: [50, 170], vessels: [
      { label: "A", x: 90, y: 85, hdg: 0 },
      { label: "B", x: 230, y: 135, hdg: 180, kind: "tug", barge: "ahead" } ] }),
    42: V({ vessels: [
      { label: "A", x: 70, y: 55, hdg: 0, kind: "tug" },
      { label: "B", x: 190, y: 165, hdg: -90, kind: "tug" } ] }),
    43: V({ vessels: [
      { label: "", x: 60, y: 110, hdg: 0, kind: "sail", boom: "port", size: 0.7 },
      { label: "", x: 245, y: 110, hdg: 0, kind: "tug", barge: "astern", size: 0.8 } ] }),

    // ---------- Day shapes ----------
    6: S([["ball", "diamond", "ball"]]),
    7: S([["ball", "ball"]]),
    10: S([["diamond"]]),
    11: S([["ball", "ball", "ball"]]),
    13: S([["ball"]]),
    18: S([["", "diamond", "diamond"], ["ball", "diamond", "ball"], ["", "ball", "ball"]]),
    34: S([["hourglass"]]),
    35: S([["coneDown"]]),

    // ---------- Night lights ----------
    44: L([["red", .55, .25], ["red", .55, .42], ["white", .15, .42], ["white", .85, .7]]),
    46: L([["white", .5, .3]]),
    52: L([["white", .5, .3], ["green", .2, .7], ["red", .8, .7]]),
    53: L([["white", .62, .15], ["red", .6, .45], ["red", .3, .72]]),
    55: L([["white", .8, .15], ["white", .8, .38], ["red", .25, .75], ["red", .6, .7]]),
    56: L([["red", .5, .15], ["white", .5, .35], ["red", .5, .55], ["white", .5, .75]]),
    57: L([["red", .5, .2], ["white", .5, .45], ["red", .5, .7]]),
    58: L([["white", .75, .45], ["red", .25, .75]]),
    60: L([["yellow", .5, .35], ["white", .5, .6]]),
    61: L([["white", .45, .15], ["red", .45, .4], ["white", .75, .75]]),
    62: L([["red", .4, .2], ["green", .4, .45], ["green", .75, .75]]),
    63: L([["white", .5, .2], ["white", .5, .42], ["green", .2, .75]]),
    65: L([["white", .8, .4], ["white", .25, .75]]),
    66: L([["white", .65, .2], ["white", .65, .38], ["green", .5, .6], ["red", .8, .62], ["green", .12, .82], ["red", .34, .82]]),
    67: L([["green", .55, .2], ["white", .65, .5], ["red", .3, .75]]),
    68: L([["green", .5, .3], ["green", .2, .62], ["green", .8, .62]]),
    69: L([["green", .5, .15], ["white", .5, .45], ["green", .75, .75]]),
    70: L([["red", .55, .4], ["white", .4, .65]]),
    71: L([["white", .5, .15], ["white", .5, .38], ["green", .2, .75], ["red", .8, .75]]),
    73: L([["white", .5, .1], ["white", .5, .26], ["white", .5, .42], ["white", .5, .58], ["green", .2, .82], ["red", .8, .82]]),
    75: L([["yellow", .5, .35], ["yellow", .5, .6]]),
    76: L([["green", .5, .2], ["white", .5, .42], ["white", .5, .64]]),
    77: L([["white", .65, .15], ["white", .65, .32], ["white", .65, .49], ["green", .25, .8]]),
    81: { type: "lights", wide: true, spec: [["red", .45, .3], ["red", .55, .3],
      ["yellow", .1, .72], ["yellow", .2, .72], ["yellow", .3, .72], ["red", .45, .72], ["red", .55, .72],
      ["yellow", .7, .72], ["yellow", .8, .72], ["yellow", .9, .72]] },
    82: L([["red", .55, .15], ["white", .55, .45], ["red", .25, .8]]),
    83: L([["red", .5, .35], ["red", .5, .65]]),
    84: L([["red", .6, .15], ["red", .6, .4], ["red", .3, .75]]),

    // ---------- Measurements ----------
    86: { type: "length" },
    87: { type: "breadth" },
  };

  const LAMP = { white: "#f5f8ff", red: "#ff4136", green: "#7fe33b", yellow: "#ffd400" };

  function lightsSVG(d, n) {
    const w = d.wide ? 300 : 150, h = d.wide ? 110 : 200;
    const dots = d.spec.map(([c, x, y]) =>
      `<circle cx="${(x * w).toFixed(1)}" cy="${(y * h).toFixed(1)}" r="${d.wide ? 8 : 10}" fill="${LAMP[c]}"/>`).join("");
    return `<svg viewBox="0 0 ${w} ${h}" class="book-diagram lights-panel" role="img" aria-label="Diagram ${n}: night lights">
      <rect width="${w}" height="${h}" rx="4" fill="#141010"/>${dots}</svg>`;
  }

  function shapeAt(kind, x, y) {
    switch (kind) {
      case "ball": return `<circle cx="${x}" cy="${y}" r="11" fill="currentColor"/>`;
      case "diamond": return `<polygon points="${x},${y - 16} ${x + 11},${y} ${x},${y + 16} ${x - 11},${y}" fill="currentColor"/>`;
      case "coneDown": return `<polygon points="${x - 13},${y - 11} ${x + 13},${y - 11} ${x},${y + 12}" fill="currentColor"/>`;
      case "hourglass": return `<polygon points="${x - 13},${y - 24} ${x + 13},${y - 24} ${x},${y}" fill="currentColor"/><polygon points="${x},${y} ${x + 13},${y + 24} ${x - 13},${y + 24}" fill="currentColor"/>`;
    }
    return "";
  }
  function shapesSVG(cols, n) {
    const w = Math.max(120, cols.length * 70), h = 200;
    const gap = w / (cols.length + 1);
    const out = cols.map((col, ci) => {
      const x = gap * (ci + 1);
      const step = 38, total = (col.length - 1) * step;
      const y0 = 100 - total / 2;
      return `<line x1="${x}" y1="18" x2="${x}" y2="182" stroke="currentColor" stroke-width="2"/>` +
        col.map((k, i) => shapeAt(k, x, y0 + i * step)).join("");
    }).join("");
    return `<svg viewBox="0 0 ${w} ${h}" class="book-diagram line-art" role="img" aria-label="Diagram ${n}: day shapes">${out}</svg>`;
  }

  // One vessel in a situation sketch, drawn pointing east and rotated to its heading.
  function vessel(v) {
    const k = v.kind || "ship", s = v.size || 1;
    const len = (k === "tug" ? 52 : k === "sail" ? 70 : 92) * s, wid = (k === "tug" ? 24 : 18) * s;
    const h = len / 2, r = wid / 2;
    let hull;
    if (k === "tug") hull = `M ${-h + r} ${-r} L ${h - r} ${-r} A ${r} ${r} 0 0 1 ${h - r} ${r} L ${-h + r} ${r} A ${r} ${r} 0 0 1 ${-h + r} ${-r} Z`;
    else hull = `M ${-h} ${-r * 0.8} Q ${-h - 4} 0 ${-h} ${r * 0.8} L ${h * 0.35} ${r} Q ${h * 0.85} ${r * 0.6} ${h} 0 Q ${h * 0.85} ${-r * 0.6} ${h * 0.35} ${-r} Z`;
    let extra = "";
    let bow = h;
    if (v.barge === "ahead") {
      const bw = 34 * s, bh = 26 * s;
      extra += `<rect x="${h}" y="${-bh / 2}" width="${bw}" height="${bh}" fill="var(--diagram-bg)" stroke="currentColor" stroke-width="2"/>`;
      bow = h + bw;
    }
    if (v.barge === "astern") {
      const bw = 30 * s, bh = 20 * s, gap = 14 * s;
      extra += `<line x1="${-h - gap}" y1="0" x2="${-h}" y2="0" stroke="currentColor" stroke-width="1.5"/>
        <rect x="${-h - gap - bw}" y="${-bh / 2}" width="${bw}" height="${bh}" fill="var(--diagram-bg)" stroke="currentColor" stroke-width="2"/>`;
    }
    if (k === "sail" || v.mast) {
      extra += `<line x1="${-2 * s}" y1="${-r - 6 * s}" x2="${-2 * s}" y2="${r + 6 * s}" stroke="currentColor" stroke-width="1.5"/>`;
    }
    if (k === "sail") {
      // Boom swings to the side opposite the wind: "port" = sail out over the port side (y negative when heading east).
      const side = v.boom === "stbd" ? 1 : -1;
      extra += `<path d="M ${-2 * s} 0 Q ${-h * 0.7} ${side * r * 2.6} ${-h * 0.95} ${side * r * 1.2}" fill="none" stroke="currentColor" stroke-width="1.5"/>`;
    }
    const arrow = `<line x1="${bow + 4}" y1="0" x2="${bow + 28}" y2="0" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3"/>
      <polygon points="${bow + 36},0 ${bow + 27},-5 ${bow + 27},5" fill="currentColor"/>`;
    const label = v.label ? `<text x="${v.x}" y="${v.y}" class="dg-label" text-anchor="middle" dominant-baseline="central">${v.label}</text>` : "";
    return `<g transform="translate(${v.x} ${v.y}) rotate(${v.hdg})">
      <path d="${hull}" fill="var(--diagram-bg)" stroke="currentColor" stroke-width="2"/>${extra}${arrow}</g>${label}`;
  }
  function sceneSVG(d, n) {
    const w = 300, h = 210;
    let out = "";
    if (d.channel) {
      const [a, b] = d.channel;
      out += `<path d="M 6 ${a} Q 150 ${a - 4} 294 ${a + 2}" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <path d="M 6 ${b} Q 150 ${b + 4} 294 ${b - 2}" fill="none" stroke="currentColor" stroke-width="1.5"/>`;
    }
    if (d.wind) {
      const { x, y, dir } = d.wind;
      out += `<g transform="translate(${x} ${y}) rotate(${dir})"><line x1="-18" y1="0" x2="14" y2="0" stroke="currentColor" stroke-width="2"/>
        <polygon points="22,0 12,-6 12,6" fill="currentColor"/></g>
        <text x="${x}" y="${y + 24}" class="dg-label small" text-anchor="middle">WIND</text>`;
    }
    out += d.vessels.map(vessel).join("");
    return `<svg viewBox="0 0 ${w} ${h}" class="book-diagram line-art" role="img" aria-label="Diagram ${n}: vessel situation">${out}</svg>`;
  }

  function lengthSVG() {
    return `<svg viewBox="0 0 320 170" class="book-diagram line-art" role="img" aria-label="Diagram 86: ways to measure length">
      <path d="M 30 60 L 150 60 L 150 45 L 205 45 L 210 30 L 245 30 L 250 45 L 270 45 L 296 62 Q 290 88 268 100 L 50 100 Q 34 96 30 60 Z" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="40" y1="82" x2="282" y2="82" stroke="currentColor" stroke-dasharray="8 3 2 3"/>
      <g stroke="currentColor" stroke-width="1.3">
        <line x1="30" y1="38" x2="150" y2="38"/><line x1="30" y1="32" x2="30" y2="58"/><line x1="150" y1="32" x2="150" y2="44"/>
        <line x1="52" y1="116" x2="276" y2="116"/><line x1="44" y1="134" x2="284" y2="134"/><line x1="30" y1="152" x2="296" y2="152"/>
        <line x1="52" y1="100" x2="52" y2="120"/><line x1="276" y1="92" x2="276" y2="120"/>
        <line x1="44" y1="96" x2="44" y2="138"/><line x1="284" y1="80" x2="284" y2="138"/>
        <line x1="30" y1="62" x2="30" y2="156"/><line x1="296" y1="62" x2="296" y2="156"/>
      </g>
      <text x="90" y="34" class="dg-label small" text-anchor="middle">D</text>
      <text x="164" y="112" class="dg-label small" text-anchor="middle">A</text>
      <text x="164" y="130" class="dg-label small" text-anchor="middle">B</text>
      <text x="164" y="148" class="dg-label small" text-anchor="middle">C</text>
    </svg>`;
  }
  function breadthSVG() {
    return `<svg viewBox="40 0 340 205" class="book-diagram line-art" role="img" aria-label="Diagram 87: ways to measure breadth">
      <path d="M 105 60 L 215 60 L 222 100 L 216 140 L 160 175 L 104 140 L 98 100 Z" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="2"/>
      <line x1="70" y1="100" x2="250" y2="100" stroke="currentColor" stroke-width="1.5"/>
      <line x1="70" y1="122" x2="250" y2="122" stroke="currentColor" stroke-width="1.5"/>
      <text x="254" y="104" class="dg-label small">LOAD WATER LINE</text>
      <text x="254" y="126" class="dg-label small">LIGHT WATER LINE</text>
      <g stroke="currentColor" stroke-width="1.3" stroke-dasharray="3 3">
        <line x1="92" y1="20" x2="92" y2="185"/><line x1="228" y1="20" x2="228" y2="185"/>
        <line x1="100" y1="34" x2="100" y2="60"/><line x1="220" y1="34" x2="220" y2="60"/>
        <line x1="106" y1="48" x2="106" y2="60"/><line x1="214" y1="48" x2="214" y2="60"/>
      </g>
      <g stroke="currentColor" stroke-width="1.3">
        <line x1="92" y1="22" x2="228" y2="22"/><line x1="100" y1="36" x2="220" y2="36"/><line x1="106" y1="50" x2="214" y2="50"/>
        <line x1="98" y1="188" x2="222" y2="188"/>
      </g>
      <text x="160" y="18" class="dg-label small" text-anchor="middle">A</text>
      <text x="160" y="32" class="dg-label small" text-anchor="middle">B</text>
      <text x="160" y="46" class="dg-label small" text-anchor="middle">C</text>
      <text x="160" y="199" class="dg-label small" text-anchor="middle">D</text>
    </svg>`;
  }

  function render(n) {
    const d = DIAGRAMS[n];
    if (!d) return "";
    if (d.type === "lights") return lightsSVG(d, n);
    if (d.type === "shapes") return shapesSVG(d.spec, n);
    if (d.type === "scene") return sceneSVG(d.spec, n);
    if (d.type === "length") return lengthSVG();
    if (d.type === "breadth") return breadthSVG();
    return "";
  }

  // Diagram numbers a question refers to ("DIAGRAM 30", "See diagram 86").
  function numbersIn(text) {
    return [...new Set([...String(text).matchAll(/diagram\s*(\d+)/gi)].map((m) => Number(m[1])))];
  }

  window.BookDiagrams = { render, numbersIn, has: (n) => !!DIAGRAMS[n], all: () => Object.keys(DIAGRAMS).map(Number) };
})();
