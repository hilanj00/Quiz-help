// Lights & Shapes game: learn which lights and day shapes belong to which vessel, then play quick rounds.
// Light patterns follow Navigation Rules 23-30 (International, with Inland differences marked).
// Pictures are drawn as inline SVG: night scenes show only the lights a viewer would see from that angle.

(function () {
  "use strict";

  // ---------- Vessels ----------
  // Light fields:
  //   mh: number of white masthead lights stacked on the fore mast (2 = towing, 3 = tow over 200 m)
  //   mhAft: second masthead light aft and higher (50 m or more)
  //   sides / stern: sidelights / sternlight
  //   tow: 1 = yellow towing light above the sternlight, 2 = two yellow towing lights instead of a sternlight (Inland pushing)
  //   stack: all-round signal lights, top to bottom
  //   mastTop: all-round lights at the top of a sailing mast (red over green)
  //   anchor: 1 = one all-round white, 2 = forward plus lower aft
  //   allWhite: one all-round white light (small power-driven vessel)
  //   flash: all-round flashing yellow (air cushion vessel)
  //   special: Inland special flashing yellow light at the bow
  //   pairs: two reds on the obstructed side, two greens on the side to pass (port side obstructed in the drawings)
  //   mine: three all-round green lights
  // day: list of shapes, top to bottom: ball, diamond, coneUp, coneDown, cylinder, hourglass, flagA,
  //   or a special layout: "mine", "dredge", "anchor".
  const VESSELS = [
    {
      id: "power-small", name: "Power-driven, under 50 m, underway", group: "power", hull: "ship",
      lights: { mh: 1, sides: true, stern: true },
      say: "One white over red and green: a powerboat coming your way.",
      about: "One masthead light, sidelights and a sternlight.",
    },
    {
      id: "power-large", name: "Power-driven, 50 m or more, underway", group: "power", hull: "ship",
      lights: { mh: 1, mhAft: true, sides: true, stern: true },
      say: "Fifty meters = two masthead lights. The aft one is higher.",
      about: "Forward masthead light, a second higher masthead light aft, sidelights and a sternlight. The two masthead lights show which way she's heading.",
    },
    {
      id: "power-tiny", name: "Power-driven, under 12 m", group: "power", hull: "small",
      lights: { allWhite: true, sides: true },
      say: "Tiny boat: one all-round white does the job of masthead and sternlight.",
      about: "May show one all-round white light plus sidelights instead of a masthead light and sternlight.",
    },
    {
      id: "hovercraft", name: "Air cushion vessel (hovercraft)", group: "power", hull: "ship",
      lights: { mh: 1, sides: true, stern: true, flash: true },
      say: "Flashing yellow, hovering fellow.",
      about: "Normal power-driven lights plus an all-round flashing yellow light when operating in nondisplacement mode.",
    },
    {
      id: "sail", name: "Sailing vessel underway", group: "sail", hull: "sail",
      lights: { sides: true, stern: true },
      say: "Sidelights and a sternlight only. No masthead light, because no engine.",
      about: "Sidelights and a sternlight. Under 20 m she may combine them in one lantern at the masthead.",
    },
    {
      id: "sail-rg", name: "Sailing vessel with red over green", group: "sail", hull: "sail",
      lights: { sides: true, stern: true, mastTop: ["red", "green"] },
      say: "Red over green, sailing machine.",
      about: "Optional all-round red over green at the masthead, in addition to sidelights and sternlight (not allowed with the combined lantern).",
    },
    {
      id: "motorsail", name: "Sailing vessel using her engine", group: "sail", hull: "sail",
      lights: { mh: 1, sides: true, stern: true },
      day: ["coneDown"],
      say: "Engine on = power-driven. By day, a cone pointing DOWN.",
      about: "At night she shows power-driven lights (masthead light added). By day she shows a cone, point down, forward.",
    },
    {
      id: "tow-short", name: "Towing astern, tow 200 m or less", group: "tow", hull: "ship",
      lights: { mh: 2, sides: true, stern: true, tow: 1 },
      say: "Two whites stacked = towing. Yellow over white at the stern.",
      about: "Two masthead lights in a vertical line, sidelights, sternlight and a yellow towing light above the sternlight.",
    },
    {
      id: "tow-long", name: "Towing astern, tow over 200 m", group: "tow", hull: "ship",
      lights: { mh: 3, sides: true, stern: true, tow: 1 },
      day: ["diamond"],
      say: "Three whites stacked = a long tow. By day, a diamond.",
      about: "Three masthead lights in a vertical line, sidelights, sternlight and a towing light. By day, a diamond shape where best seen (the tow shows one too).",
    },
    {
      id: "push-intl", name: "Pushing ahead or towing alongside", group: "tow", hull: "ship",
      lights: { mh: 2, sides: true, stern: true },
      say: "Two whites stacked but NO yellow at the stern: pushing, not towing astern.",
      about: "International: two masthead lights in a vertical line, sidelights and a sternlight.",
    },
    {
      id: "push-inland", name: "Pushing ahead (Inland)", group: "tow", hull: "ship", inland: true,
      lights: { mh: 2, sides: true, tow: 2 },
      say: "Two yellows at the stern = Inland pusher.",
      about: "Inland: two masthead lights, sidelights, and two yellow towing lights in a vertical line instead of a sternlight. (Western Rivers above the Huey P. Long Bridge: no masthead lights.)",
    },
    {
      id: "towed", name: "Vessel being towed", group: "tow", hull: "barge",
      lights: { sides: true, stern: true },
      day: ["diamond"],
      dayNote: "Diamond only when the tow is over 200 m.",
      say: "No masthead light: she has no power of her own.",
      about: "Sidelights and a sternlight only. By day, a diamond if the tow is over 200 m.",
    },
    {
      id: "barge-pushed", name: "Barge pushed ahead (Inland)", group: "tow", hull: "barge", inland: true,
      lights: { sides: true, special: true },
      say: "Yellow flashing at the bow = barge being pushed.",
      about: "Inland: sidelights and a special flashing yellow light at the bow.",
    },
    {
      id: "trawl", name: "Trawling", group: "fish", hull: "ship",
      lights: { stack: ["green", "white"], sides: true, stern: true },
      day: ["hourglass"],
      say: "Green over white, trawling tonight.",
      stackSays: "Green over white all-round: she's trawling.",
      about: "All-round green over white. Sidelights and sternlight when making way. At 50 m or more, also a masthead light aft and higher. By day, two cones points together.",
    },
    {
      id: "fish", name: "Fishing (not trawling)", group: "fish", hull: "ship",
      lights: { stack: ["red", "white"], sides: true, stern: true },
      day: ["hourglass"],
      say: "Red over white, fishing at night.",
      stackSays: "Red over white all-round: she's fishing with nets or lines (not trawling).",
      about: "All-round red over white. Sidelights and sternlight when making way. Gear out over 150 m: a white light toward the gear (a cone point up by day). By day, two cones points together.",
    },
    {
      id: "fish-stopped", name: "Fishing, not making way", group: "fish", hull: "ship",
      lights: { stack: ["red", "white"] },
      day: ["hourglass"],
      say: "Fishing and stopped: sidelights OFF.",
      stackSays: "Red over white all-round: she's fishing.",
      about: "Red over white only. Sidelights and sternlight go off when she isn't making way.",
    },
    {
      id: "nuc-way", name: "Not under command, making way", group: "nuc", hull: "ship",
      lights: { stack: ["red", "red"], sides: true, stern: true },
      day: ["ball", "ball"],
      say: "Red over red, the captain is dead.",
      stackSays: "Red over red all-round: not under command. Something broke and she can't get out of your way.",
      about: "Two all-round red lights plus sidelights and sternlight when making way. No masthead light. By day, two balls.",
    },
    {
      id: "nuc-stopped", name: "Not under command, not making way", group: "nuc", hull: "ship",
      lights: { stack: ["red", "red"] },
      day: ["ball", "ball"],
      say: "Red over red and nothing else: broken down and dead in the water.",
      stackSays: "Red over red all-round: not under command.",
      about: "Two all-round red lights only. By day, two balls.",
    },
    {
      id: "ram-way", name: "Restricted in ability to maneuver, making way", group: "ram", hull: "ship",
      lights: { stack: ["red", "white", "red"], mh: 1, sides: true, stern: true },
      day: ["ball", "diamond", "ball"],
      say: "Red-white-red, restricted ahead.",
      stackSays: "Red-white-red all-round: restricted in her ability to maneuver because of her work.",
      about: "Red-white-red all-round, plus masthead light, sidelights and sternlight when making way. By day, ball-diamond-ball.",
    },
    {
      id: "ram-anchor", name: "Restricted in ability to maneuver, at anchor", group: "ram", hull: "ship",
      lights: { stack: ["red", "white", "red"], anchor: 1 },
      day: ["ball", "diamond", "ball"],
      say: "Red-white-red plus an anchor light: working while anchored.",
      stackSays: "Red-white-red all-round: restricted in her ability to maneuver.",
      about: "Red-white-red all-round plus anchor lights. By day, ball-diamond-ball.",
    },
    {
      id: "dredge", name: "Dredging with an obstruction", group: "ram", hull: "ship",
      lights: { stack: ["red", "white", "red"], pairs: true },
      day: "dredge",
      say: "Two GREENS = go side. Two REDS = blocked side.",
      stackSays: "Red-white-red all-round: restricted in her ability to maneuver.",
      about: "Red-white-red, plus two red lights on the side with the obstruction and two green lights on the side you may pass. By day: ball-diamond-ball, two balls on the blocked side and two diamonds on the passing side.",
    },
    {
      id: "diving", name: "Small vessel with divers down", group: "ram", hull: "small",
      lights: { stack: ["red", "white", "red"], allWhite: false },
      day: ["flagA"],
      say: "Divers down = flag A (white and blue).",
      stackSays: "Red-white-red all-round: restricted in her ability to maneuver (diving operations).",
      about: "Red-white-red at night. By day, if she can't show ball-diamond-ball, a rigid replica of International Code flag A at least 1 m high.",
    },
    {
      id: "mine", name: "Mineclearance", group: "ram", hull: "ship",
      lights: { mine: true, mh: 1, sides: true, stern: true },
      day: "mine",
      say: "Three greens, keep away 1000 m.",
      about: "Three all-round green lights (one at the foremast head, one at each end of the fore yard) plus power-driven lights. By day, three balls in the same places. Don't come within 1000 m.",
    },
    {
      id: "cbd", name: "Constrained by draft (International)", group: "cbd", hull: "ship",
      lights: { stack: ["red", "red", "red"], mh: 1, mhAft: true, sides: true, stern: true },
      day: ["cylinder"],
      say: "Three reds stacked: deep in the water. CBD = Cylinder By Day.",
      stackSays: "Three all-round reds: constrained by her draft (International only).",
      about: "International only: three all-round red lights plus normal power-driven lights. By day, a cylinder.",
    },
    {
      id: "pilot", name: "Pilot vessel on duty, underway", group: "pilot", hull: "ship",
      lights: { stack: ["white", "red"], sides: true, stern: true },
      say: "White over red, pilot ahead.",
      stackSays: "White over red all-round: a pilot vessel on duty.",
      about: "All-round white over red at or near the masthead, plus sidelights and sternlight when underway.",
    },
    {
      id: "pilot-anchor", name: "Pilot vessel on duty, at anchor", group: "pilot", hull: "ship",
      lights: { stack: ["white", "red"], anchor: 1 },
      say: "White over red plus an anchor light: pilot waiting at anchor.",
      stackSays: "White over red all-round: a pilot vessel on duty.",
      about: "White over red plus anchor lights.",
    },
    {
      id: "anchor-small", name: "At anchor, under 50 m", group: "anchor", hull: "ship",
      lights: { anchor: 1 },
      day: "anchor",
      say: "One white, still in sight: anchored for the night.",
      about: "One all-round white light where best seen. By day, one ball forward.",
    },
    {
      id: "anchor-large", name: "At anchor, 50 m or more", group: "anchor", hull: "ship",
      lights: { anchor: 2 },
      day: "anchor",
      say: "Two anchor lights: the forward one is HIGHER.",
      about: "All-round white forward and a second, lower one aft. 100 m or more also lights up her decks. By day, one ball forward.",
    },
    {
      id: "aground", name: "Aground", group: "anchor", hull: "ship",
      lights: { anchor: 2, stack: ["red", "red"] },
      day: ["ball", "ball", "ball"],
      say: "Anchor lights plus red over red: stuck on the bottom. Three balls by day.",
      stackSays: "Red over red all-round with anchor lights: she's aground.",
      about: "Anchor lights plus two all-round red lights in a vertical line. By day, three balls.",
    },
  ];
  const byId = new Map(VESSELS.map((v) => [v.id, v]));

  const VIEWS = {
    ahead: "From ahead",
    stbd: "Starboard side",
    port: "Port side",
    astern: "From astern",
    day: "Day shapes",
  };

  // ---------- Light colors and meanings ----------
  const COLOR = { white: "#f5f8ff", red: "#ff4136", green: "#3ce67f", yellow: "#ffcc33" };

  const LIGHT_KEY = [
    ["white", "Masthead light", "White, shines forward over 225°. Means: a power-driven vessel underway. Two or three stacked on one mast = towing."],
    ["red", "Port sidelight", "Red, 112.5° on the left side. You're looking at her port side."],
    ["green", "Starboard sidelight", "Green, 112.5° on the right side. You're looking at her starboard side. Red and green together = she's heading at you."],
    ["white", "Sternlight", "White, 135° over the stern. Seeing only this = you're behind her (overtaking)."],
    ["yellow", "Towing light", "Yellow, same arc as the sternlight, placed above it. Means: towing astern."],
    ["white", "All-round light", "Shines 360°. Anchor lights and the signal lights (red over red, red-white-red, green over white…) are all-round."],
    ["yellow", "Flashing yellow", "All-round flashing yellow = hovercraft. Inland: a special flashing yellow at the bow = barge pushed ahead."],
  ];

  // ---------- Drawing ----------
  const W = 320, H = 200;
  const mirror = (x) => W - x;

  function hullPath(hull, view) {
    const side = view === "stbd" || view === "port";
    let d;
    if (hull === "barge") {
      d = side ? "M60 132 H262 V156 H66 Z" : "M112 132 H208 V156 H112 Z";
    } else if (hull === "small") {
      d = side ? "M110 140 H226 L214 156 H118 Z M140 128 H180 V140 H140 Z" : "M140 140 H180 L174 156 H146 Z M146 128 H174 V140 H146 Z";
    } else if (hull === "sail") {
      d = side ? "M70 140 H262 L240 158 H86 Z M159 140 V36 H162 V140 Z" : "M136 140 H184 L172 158 H148 Z M159 140 V36 H162 V140 Z";
    } else {
      d = side
        ? "M38 136 H284 L268 158 H52 Z M78 112 H146 V136 H78 Z M209 136 V60 H212 V136 Z M119 112 V40 H122 V112 Z"
        : "M118 136 H202 L188 158 H132 Z M126 112 H194 V136 H126 Z";
    }
    if (side && view === "port") d = mirrorPath(d);
    return d;
  }
  function mirrorPath(d) {
    // Mirror the x coordinates of a path made of M/H/V/L/Z commands.
    return d.replace(/([MHL])\s*([\d.]+)/g, (_, c, x) => `${c}${mirror(Number(x))}`);
  }

  // Work out which lights show from a view, with coordinates and what each one means.
  function lightsFor(v, view) {
    const L = v.lights;
    const out = [];
    const add = (x, y, c, role, opts = {}) => out.push(Object.assign({ x, y, c, role }, opts));
    const side = view === "stbd" || view === "port";
    const sx = (x) => (view === "port" ? mirror(x) : x);

    if (view === "ahead" || side) {
      if (L.mh) {
        const x = side ? sx(210) : 160;
        const base = L.mine ? 96 : 92;
        for (let i = 0; i < L.mh; i++) add(x, base - i * 14, "white", L.mh > 1 ? "mhStack" : "mh");
      }
      if (L.mhAft) add(side ? sx(120) : 160, 46, "white", "mhAft");
      if (L.sides) {
        if (view === "ahead") { const narrow = v.hull === "sail" || v.hull === "small"; add(narrow ? 140 : 128, narrow ? 142 : 124, "green", "side"); add(narrow ? 180 : 192, narrow ? 142 : 124, "red", "side"); }
        else add(sx(228), 124, view === "stbd" ? "green" : "red", "side");
      }
      if (L.special) add(side ? sx(258) : 160, 126, "yellow", "special", { flashing: true });
    }
    if (view === "astern") {
      if (L.tow === 2) { add(160, 134, "yellow", "tow2"); add(160, 120, "yellow", "tow2"); }
      else {
        if (L.stern) add(160, 134, "white", "stern");
        if (L.tow === 1) add(160, 120, "yellow", "tow1");
      }
    }
    // All-round lights show from every direction.
    if (L.stack) {
      const x = side ? sx(166) : view === "ahead" ? 140 : 180;
      const n = L.stack.length;
      L.stack.forEach((c, i) => add(x, 100 - (n - 1 - i) * 16, c, "stack"));
    }
    if (L.mastTop) L.mastTop.forEach((c, i) => add(160.5, 30 + i * 15, c, "mastTop"));
    if (L.anchor) {
      add(side ? sx(268) : 160, 92, "white", "anchor");
      if (L.anchor === 2) add(side ? sx(46) : 160, 116, "white", "anchor");
    }
    if (L.allWhite) add(side ? sx(160) : 160, 104, "white", "allWhite");
    if (L.flash) add(side ? sx(120) : 184, 66, "yellow", "flash", { flashing: true });
    if (L.mine) {
      const x = side ? sx(210) : 160;
      add(x, 52, "green", "mine");
      if (side) add(x, 68, "green", "mine");
      else { add(x - 20, 68, "green", "mine"); add(x + 20, 68, "green", "mine"); }
    }
    if (L.pairs) {
      // Port side is the obstructed side in these drawings.
      const portX = view === "ahead" ? 206 : view === "astern" ? 114 : null;
      const stbdX = view === "ahead" ? 114 : view === "astern" ? 206 : null;
      if (side) {
        const c = view === "stbd" ? "green" : "red";
        add(sx(192), 96, c, "pair"); add(sx(192), 112, c, "pair");
      } else {
        add(portX, 96, "red", "pair"); add(portX, 112, "red", "pair");
        add(stbdX, 96, "green", "pair"); add(stbdX, 112, "green", "pair");
      }
    }
    return out;
  }

  function nightSVG(v, view, opts = {}) {
    const lights = lightsFor(v, view);
    const uid = "g" + Math.random().toString(36).slice(2, 8);
    const hull = opts.hideHull ? "" : `<path d="${hullPath(v.hull, view)}" fill="#162838" stroke="#22394d" stroke-width="1"/>`;
    const dots = lights.map((l) => `
      <g class="${l.flashing ? "flashing" : ""}">
        <circle cx="${l.x}" cy="${l.y}" r="11" fill="${COLOR[l.c]}" opacity="0.28" filter="url(#${uid})"/>
        <circle cx="${l.x}" cy="${l.y}" r="4.6" fill="${COLOR[l.c]}"/>
        <circle cx="${l.x - 1.2}" cy="${l.y - 1.2}" r="1.6" fill="#fff" opacity="0.7"/>
      </g>`).join("");
    const label = opts.label ? `<text x="10" y="20" class="svg-label">${opts.label}</text>` : "";
    return `<svg viewBox="0 0 ${W} ${H}" class="scene night" role="img" aria-label="${opts.aria || "Night view"}">
      <defs><filter id="${uid}" x="-2" y="-2" width="5" height="5"><feGaussianBlur stdDeviation="4"/></filter></defs>
      <rect width="${W}" height="${H}" fill="#07121c"/>
      <rect y="150" width="${W}" height="50" fill="#0a1824"/>
      <line x1="0" y1="150" x2="${W}" y2="150" stroke="#12283a" stroke-width="1"/>
      ${hull}${dots}${label}
    </svg>`;
  }

  // Day shapes are drawn on the side view.
  function shape(kind, x, y) {
    const s = "#111";
    switch (kind) {
      case "ball": return `<circle cx="${x}" cy="${y}" r="8" fill="${s}"/>`;
      case "diamond": return `<polygon points="${x},${y - 11} ${x + 8},${y} ${x},${y + 11} ${x - 8},${y}" fill="${s}"/>`;
      case "coneUp": return `<polygon points="${x},${y - 9} ${x + 9},${y + 8} ${x - 9},${y + 8}" fill="${s}"/>`;
      case "coneDown": return `<polygon points="${x - 9},${y - 8} ${x + 9},${y - 8} ${x},${y + 9}" fill="${s}"/>`;
      case "cylinder": return `<rect x="${x - 7}" y="${y - 11}" width="14" height="22" rx="2" fill="${s}"/>`;
      case "hourglass": return `<polygon points="${x - 9},${y - 18} ${x + 9},${y - 18} ${x},${y}" fill="${s}"/><polygon points="${x},${y} ${x + 9},${y + 18} ${x - 9},${y + 18}" fill="${s}"/>`;
      case "flagA": return `<g><rect x="${x - 1}" y="${y - 14}" width="2" height="34" fill="#333"/>
        <polygon points="${x + 1},${y - 14} ${x + 17},${y - 14} ${x + 17},${y + 10} ${x + 1},${y + 10}" fill="#fff" stroke="#333" stroke-width="0.8"/>
        <polygon points="${x + 17},${y - 14} ${x + 36},${y - 14} ${x + 28},${y - 2} ${x + 36},${y + 10} ${x + 17},${y + 10}" fill="#1f4fb5" stroke="#333" stroke-width="0.8"/></g>`;
    }
    return "";
  }
  function daySVG(v, opts = {}) {
    const view = "stbd";
    const hullD = hullPath(v.hull, view);
    let shapes = "";
    let rigging = "";
    if (v.day === "anchor") {
      shapes = shape("ball", 262, 100);
      rigging = `<line x1="211" y1="62" x2="282" y2="136" stroke="#4d5964" stroke-width="1"/>`;
    } else if (v.day === "mine") {
      rigging = `<line x1="190" y1="70" x2="230" y2="70" stroke="#4d5964" stroke-width="2"/>`;
      shapes = shape("ball", 210, 50) + shape("ball", 190, 80) + shape("ball", 230, 80);
    } else if (v.day === "dredge") {
      rigging = `<line x1="166" y1="136" x2="166" y2="34" stroke="#4d5964" stroke-width="2"/><line x1="132" y1="74" x2="200" y2="74" stroke="#4d5964" stroke-width="2"/>`;
      shapes = shape("ball", 166, 44) + shape("diamond", 166, 66) + shape("ball", 166, 88)
        + shape("ball", 136, 86) + shape("ball", 136, 106)
        + shape("diamond", 196, 88) + shape("diamond", 196, 112)
        + `<text x="112" y="24" class="svg-tag">blocked side</text><text x="186" y="24" class="svg-tag">pass side</text>`;
    } else if (Array.isArray(v.day)) {
      const x = v.hull === "sail" ? 200 : v.hull === "barge" ? 160 : 166;
      if (v.hull !== "sail") rigging = `<line x1="${x}" y1="${v.hull === "barge" ? 132 : 136}" x2="${x}" y2="34" stroke="#4d5964" stroke-width="2"/>`;
      else rigging = `<line x1="161" y1="40" x2="250" y2="138" stroke="#4d5964" stroke-width="1"/>`;
      let y = v.hull === "sail" ? 92 : 46;
      v.day.forEach((k) => {
        const h = k === "hourglass" ? 40 : k === "flagA" ? 30 : 24;
        shapes += shape(k, x, y + h / 2 - 12);
        y += h;
      });
    }
    const sail = v.hull === "sail" ? `<polygon points="163,40 163,134 236,134" fill="#eef1f4" stroke="#b9c3cc"/>` : "";
    return `<svg viewBox="0 0 ${W} ${H}" class="scene day" role="img" aria-label="${opts.aria || "Day shapes"}">
      <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9d0ec"/><stop offset="1" stop-color="#e4f1fa"/></linearGradient></defs>
      <rect width="${W}" height="${H}" fill="url(#sky)"/>
      <rect y="150" width="${W}" height="50" fill="#4f7d9c"/>
      ${sail}
      <path d="${hullD}" fill="#5c6873" stroke="#46515b" stroke-width="1"/>
      ${rigging}${shapes}
    </svg>`;
  }

  function picture(v, view, opts) {
    return view === "day" ? daySVG(v, opts) : nightSVG(v, view, opts);
  }

  // What each visible light means, for the explanation under a picture.
  function meanings(v, view) {
    if (view === "day") {
      const names = { ball: "ball", diamond: "diamond", coneUp: "cone point up", coneDown: "cone point down", cylinder: "cylinder", hourglass: "two cones, points together", flagA: "flag A" };
      const what = v.day === "anchor" ? "One ball forward"
        : v.day === "mine" ? "Three balls (masthead and both yardarms)"
        : v.day === "dredge" ? "Ball-diamond-ball, two balls on the blocked side, two diamonds on the passing side"
        : v.day.map((k) => names[k]).join(" over ");
      return [[null, what + (v.dayNote ? `. ${v.dayNote}` : "")]];
    }
    const lights = lightsFor(v, view);
    const roles = new Set(lights.map((l) => l.role));
    const rows = [];
    const L = v.lights;
    if (roles.has("mhStack")) rows.push(["white", `${L.mh} white masthead lights in a vertical line: ${L.tow === 2 || !L.tow ? "pushing ahead or towing alongside" : L.mh === 3 ? "towing, tow over 200 m" : "towing, tow 200 m or less"}.`]);
    if (roles.has("mh")) rows.push(["white", "White masthead light: power-driven and underway."]);
    if (roles.has("mhAft")) rows.push(["white", "Second, higher masthead light aft: 50 m or longer. The pair shows her heading."]);
    if (roles.has("side")) {
      if (view === "ahead") rows.push(["green", "Red and green sidelights together: she's heading straight at you."]);
      else rows.push([view === "stbd" ? "green" : "red", view === "stbd" ? "Green sidelight: you see her starboard side." : "Red sidelight: you see her port side."]);
    }
    if (roles.has("stern")) rows.push(["white", "White sternlight: you're behind her."]);
    if (roles.has("tow1")) rows.push(["yellow", "Yellow towing light above the sternlight: towing astern."]);
    if (roles.has("tow2")) rows.push(["yellow", "Two yellow towing lights (Inland): pushing ahead or towing alongside."]);
    if (roles.has("stack")) rows.push([L.stack[0], v.stackSays]);
    if (roles.has("mastTop")) rows.push(["red", "Red over green at the masthead: a sailing vessel."]);
    if (roles.has("anchor")) rows.push(["white", L.anchor === 2 ? "Two all-round whites, forward one higher: anchored (or aground), 50 m or more." : "One all-round white: anchored."]);
    if (roles.has("allWhite")) rows.push(["white", "One all-round white: small power-driven vessel under 12 m."]);
    if (roles.has("flash")) rows.push(["yellow", "Flashing yellow all-round: air cushion vessel (hovercraft)."]);
    if (roles.has("special")) rows.push(["yellow", "Special flashing yellow at the bow (Inland): barge being pushed ahead."]);
    if (roles.has("mine")) rows.push(["green", "Three all-round greens: mineclearance. Keep 1000 m away."]);
    if (roles.has("pair")) rows.push(["green", view === "stbd" ? "Two greens on this side: safe to pass here." : view === "port" ? "Two reds on this side: obstruction. Don't pass here." : "Two reds = obstruction on that side. Two greens = pass on that side."]);
    if (!lights.length) rows.push([null, "No lights show from this angle."]);
    return rows;
  }

  // Two pictures that look the same to a viewer shouldn't be offered as different answers.
  function signature(v, view) {
    if (view === "day") return "day:" + JSON.stringify(v.day);
    const lights = lightsFor(v, view);
    const colors = lights.map((l) => l.c + (l.flashing ? "*" : "")).sort().join(",");
    const cols = new Map();
    for (const l of lights) {
      const key = Math.round(l.x / 8);
      if (!cols.has(key)) cols.set(key, []);
      cols.get(key).push(l);
    }
    const stacks = [...cols.values()].filter((c) => c.length > 1)
      .map((c) => c.sort((a, b) => a.y - b.y).map((l) => l.c).join("-")).sort().join("|");
    return colors + "#" + stacks;
  }
  function viewsFor(v) {
    const vs = ["ahead", "stbd", "port", "astern"].filter((w) => lightsFor(v, w).length);
    if (v.day) vs.push("day");
    return vs;
  }

  // ---------- Screens ----------
  let root = null, onExit = null, state = null;
  const STORE = "rotr-game-v1";
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function loadBest() { try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { return {}; } }
  function saveBest(d) { try { localStorage.setItem(STORE, JSON.stringify(d)); } catch (e) { /* storage unavailable */ } }
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a) => a[Math.floor(Math.random() * a.length)];

  function dotRow(rows) {
    return `<ul class="light-list">${rows.map(([c, t]) =>
      `<li>${c ? `<span class="lamp" style="--lamp:${COLOR[c]}"></span>` : `<span class="lamp none"></span>`}<span>${esc(t)}</span></li>`).join("")}</ul>`;
  }

  function home() {
    state = null;
    const best = loadBest();
    root.innerHTML = `
      <div class="actions"><button class="btn" id="g-back">Back to tests</button></div>
      <section class="card game-hero">
        <div class="game-hero-pic">${nightSVG(byId.get("trawl"), "ahead", { aria: "A trawler seen from ahead at night" })}</div>
        <div class="game-hero-text">
          <h2>Lights &amp; Shapes game</h2>
          <p>Learn which lights and day shapes belong to which vessel, then test yourself in quick 10-round games.</p>
          ${best.score != null ? `<p class="hint">Best game: ${best.score} of 10${best.streak ? ` · longest streak ${best.streak}` : ""}</p>` : ""}
          <div class="actions">
            <button class="btn primary" id="g-play">Play 10 rounds</button>
            <button class="btn" id="g-learn">Learn the lights</button>
          </div>
        </div>
      </section>
      <section class="card">
        <h2>What each light means</h2>
        ${dotRow(LIGHT_KEY.map(([c, n, t]) => [c, `${n}: ${t}`]))}
      </section>`;
    root.querySelector("#g-back").addEventListener("click", exit);
    root.querySelector("#g-play").addEventListener("click", startGame);
    root.querySelector("#g-learn").addEventListener("click", () => learn());
    window.scrollTo(0, 0);
  }

  const GROUPS = [
    ["power", "Power-driven"], ["sail", "Sailing"], ["tow", "Towing and pushing"], ["fish", "Fishing"],
    ["nuc", "Not under command"], ["ram", "Restricted in ability to maneuver"], ["cbd", "Constrained by draft"],
    ["pilot", "Pilot vessels"], ["anchor", "Anchored and aground"],
  ];

  function learn(openId) {
    state = null;
    if (openId) return card(openId, "ahead");
    root.innerHTML = `
      <div class="actions"><button class="btn" id="g-home">Back to game</button><button class="btn primary" id="g-play">Play 10 rounds</button></div>
      ${GROUPS.map(([g, title]) => `
        <section class="card">
          <h2>${esc(title)}</h2>
          <div class="vessel-grid">${VESSELS.filter((v) => v.group === g).map((v) => `
            <button type="button" class="vessel-tile" data-open="${v.id}">
              ${nightSVG(v, "ahead", { aria: v.name + " seen from ahead" })}
              <span class="vessel-name">${esc(v.name)}${v.inland ? ` <span class="tag">Inland</span>` : ""}</span>
              <span class="vessel-say">${esc(v.say)}</span>
            </button>`).join("")}</div>
        </section>`).join("")}`;
    root.querySelector("#g-home").addEventListener("click", home);
    root.querySelector("#g-play").addEventListener("click", startGame);
    root.querySelectorAll("[data-open]").forEach((el) => el.addEventListener("click", () => card(el.dataset.open, "ahead")));
    window.scrollTo(0, 0);
  }

  function card(id, view) {
    const v = byId.get(id);
    const views = viewsFor(v);
    if (!views.includes(view)) view = views[0];
    const i = VESSELS.indexOf(v);
    const prev = VESSELS[(i - 1 + VESSELS.length) % VESSELS.length], next = VESSELS[(i + 1) % VESSELS.length];
    root.innerHTML = `
      <div class="actions"><button class="btn" id="g-list">All vessels</button></div>
      <section class="card">
        <div class="tags"><span class="tag rule">${esc(GROUPS.find((g) => g[0] === v.group)[1])}</span>${v.inland ? `<span class="tag warn">Inland</span>` : ""}</div>
        <h2>${esc(v.name)}</h2>
        <div class="seg view-seg" role="group" aria-label="View">${views.map((w) =>
          `<button type="button" data-view="${w}" aria-pressed="${w === view}">${VIEWS[w]}</button>`).join("")}</div>
        <div class="scene-wrap">${picture(v, view, { aria: `${v.name}, ${VIEWS[view].toLowerCase()}` })}</div>
        ${dotRow(meanings(v, view))}
        <p class="trick"><span class="label">Remember</span> ${esc(v.say)}</p>
        <p class="hint">${esc(v.about)}</p>
        <div class="nav">
          <button class="btn" id="g-prev">← ${esc(prev.name)}</button>
          <button class="btn" id="g-next">${esc(next.name)} →</button>
        </div>
      </section>`;
    root.querySelector("#g-list").addEventListener("click", () => learn());
    root.querySelectorAll("[data-view]").forEach((el) => el.addEventListener("click", () => card(id, el.dataset.view)));
    root.querySelector("#g-prev").addEventListener("click", () => card(prev.id, view));
    root.querySelector("#g-next").addEventListener("click", () => card(next.id, view));
    window.scrollTo(0, 0);
  }

  // ---------- Game ----------
  function makeRound() {
    for (let tries = 0; tries < 50; tries++) {
      const type = Math.random() < 0.65 ? "name" : "picture";
      const useDay = Math.random() < 0.3;
      const pool = VESSELS.filter((v) => (useDay ? !!v.day : true));
      const v = pick(pool);
      const views = viewsFor(v).filter((w) => (useDay ? w === "day" : w !== "day"));
      if (!views.length) continue;
      // From ahead and from the side tell you the most, so they come up most often.
      const weighted = views.flatMap((w) => (w === "astern" ? [w] : [w, w]));
      const view = pick(weighted);
      const sig = signature(v, view);
      const others = shuffle(VESSELS.filter((o) => o !== v && (view === "day" ? !!o.day : true)));
      const chosen = [];
      const seen = new Set([sig]);
      // Prefer look-alikes from the same group, so the choice actually teaches something.
      for (const o of [...others.filter((o) => o.group === v.group), ...others]) {
        if (chosen.length === 3) break;
        if (chosen.includes(o)) continue;
        if (view !== "day" && !lightsFor(o, view).length) continue;
        const s = signature(o, view);
        if (seen.has(s)) continue;
        seen.add(s);
        chosen.push(o);
      }
      if (chosen.length < 3) continue;
      const options = shuffle([v, ...chosen]);
      return { type, v, view, options, answer: options.indexOf(v) };
    }
    return null;
  }

  function startGame() {
    const rounds = [];
    let lastId = null;
    while (rounds.length < 10) {
      const r = makeRound();
      if (r && r.v.id !== lastId) { rounds.push(r); lastId = r.v.id; }
    }
    state = { rounds, i: 0, picks: [], score: 0, streak: 0, bestStreak: 0, started: Date.now() };
    round();
  }

  function round() {
    const r = state.rounds[state.i];
    const picked = state.picks[state.i];
    const done = picked != null;
    const viewText = r.view === "day" ? "by day" : VIEWS[r.view].toLowerCase();
    let body;
    if (r.type === "name") {
      body = `
        <p class="question">You see this ${r.view === "day" ? "by day" : `at night, ${viewText}`}. What is it?</p>
        <div class="scene-wrap">${picture(r.v, r.view, { aria: "Mystery vessel" })}</div>
        <div class="choices">${r.options.map((o, i) => {
          let cls = "choice";
          if (done) { if (i === r.answer) cls += " right"; else if (i === picked) cls += " wrong"; }
          return `<button class="${cls}" data-g="${i}" ${done ? "disabled" : ""}><span class="key">${"ABCD"[i]}</span><span class="txt">${esc(o.name)}</span></button>`;
        }).join("")}</div>`;
    } else {
      body = `
        <p class="question">Which picture shows <b>${esc(r.v.name.toLowerCase())}</b>${r.view === "day" ? " by day" : `, ${viewText}`}?</p>
        <div class="pic-choices">${r.options.map((o, i) => {
          let cls = "pic-choice";
          if (done) { if (i === r.answer) cls += " right"; else if (i === picked) cls += " wrong"; }
          return `<button class="${cls}" data-g="${i}" ${done ? "disabled" : ""} aria-label="Picture ${"ABCD"[i]}">
            <span class="key">${"ABCD"[i]}</span>${picture(o, r.view, { aria: "Picture " + "ABCD"[i] })}
            ${done ? `<span class="pic-name">${esc(o.name)}</span>` : ""}</button>`;
        }).join("")}</div>`;
    }
    let feedback = "";
    if (done) {
      const ok = picked === r.answer;
      feedback = `<div class="feedback ${ok ? "right" : "wrong"}" role="status">
        <strong>${ok ? (state.streak >= 3 ? `Correct · ${state.streak} in a row` : "Correct") : "Not quite"}</strong>
        ${ok ? "" : `<p>That was <b>${esc(r.v.name)}</b>.</p>`}
        ${dotRow(meanings(r.v, r.view))}
        <p class="trick"><span class="label">Remember</span> ${esc(r.v.say)}</p>
      </div>`;
    }
    root.innerHTML = `
      <div class="progress">
        <div class="progress-row">
          <span class="label">Round ${state.i + 1} of 10</span>
          <span class="label">Score ${state.score}${state.streak >= 2 ? ` · streak ${state.streak}` : ""}</span>
        </div>
        <div class="bar"><div style="width:${((state.i + (done ? 1 : 0)) / 10) * 100}%"></div></div>
      </div>
      <section class="card game-card" aria-live="polite">
        ${body}
        ${feedback}
        <div class="nav">
          <button class="btn ghost" id="g-quit">Quit game</button>
          ${done ? `<button class="btn primary" id="g-next">${state.i === 9 ? "See score" : "Next round"}</button>` : ""}
        </div>
        <p class="kbd-hint">Keyboard: A–D or 1–4 to answer, Enter for the next round.</p>
      </section>`;
    root.querySelectorAll("[data-g]").forEach((el) => el.addEventListener("click", () => answer(Number(el.dataset.g))));
    root.querySelector("#g-quit").addEventListener("click", home);
    const nx = root.querySelector("#g-next");
    if (nx) { nx.addEventListener("click", nextRound); nx.focus({ preventScroll: true }); }
  }

  function answer(i) {
    if (!state || state.picks[state.i] != null) return;
    const r = state.rounds[state.i];
    state.picks[state.i] = i;
    if (i === r.answer) { state.score++; state.streak++; state.bestStreak = Math.max(state.bestStreak, state.streak); }
    else state.streak = 0;
    round();
  }
  function nextRound() {
    if (!state || state.picks[state.i] == null) return;
    if (state.i === 9) return results();
    state.i++;
    round();
    window.scrollTo(0, 0);
  }

  function results() {
    const secs = Math.round((Date.now() - state.started) / 1000);
    const best = loadBest();
    const newBest = best.score == null || state.score > best.score;
    saveBest({ score: Math.max(state.score, best.score ?? 0), streak: Math.max(state.bestStreak, best.streak || 0) });
    const missed = state.rounds.filter((r, i) => state.picks[i] !== r.answer);
    const msg = state.score === 10 ? "Perfect game. You know your lights." : state.score >= 8 ? "Strong. Review the misses below." : state.score >= 5 ? "Getting there. Study the misses, then play again." : "Keep going. The Learn cards will help.";
    root.innerHTML = `
      <section class="card">
        <h2>Game over</h2>
        <div class="score">
          <div class="big ${state.score >= 9 ? "pass" : "fail"}">${state.score}/10</div>
          <div class="meta">
            <span>${esc(msg)}</span>
            <span class="hint">${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")} · longest streak ${state.bestStreak}${newBest && state.score > 0 ? " · new best!" : ""}</span>
          </div>
        </div>
        <div class="actions">
          <button class="btn primary" id="g-again">Play again</button>
          <button class="btn" id="g-learn">Learn the lights</button>
          <button class="btn ghost" id="g-home">Game menu</button>
        </div>
      </section>
      ${missed.length ? `<section class="card"><h2>Study these</h2>
        <div class="vessel-grid">${missed.map((r) => `
          <button type="button" class="vessel-tile" data-open="${r.v.id}" data-view="${r.view}">
            ${picture(r.v, r.view, { aria: r.v.name })}
            <span class="vessel-name">${esc(r.v.name)}</span>
            <span class="vessel-say">${esc(r.v.say)}</span>
          </button>`).join("")}</div></section>` : ""}`;
    root.querySelector("#g-again").addEventListener("click", startGame);
    root.querySelector("#g-learn").addEventListener("click", () => learn());
    root.querySelector("#g-home").addEventListener("click", home);
    root.querySelectorAll("[data-open]").forEach((el) => el.addEventListener("click", () => card(el.dataset.open, el.dataset.view)));
    state = null;
    window.scrollTo(0, 0);
  }

  function exit() { state = null; root = null; if (onExit) onExit(); }

  document.addEventListener("keydown", (e) => {
    if (!state || !root || e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key.toUpperCase();
    const li = "ABCD".indexOf(k);
    if (li >= 0) { answer(li); e.preventDefault(); return; }
    if (/^[1-4]$/.test(k)) { answer(Number(k) - 1); e.preventDefault(); return; }
    if (e.key === "Enter" && state.picks[state.i] != null) { nextRound(); e.preventDefault(); }
  });

  window.LightsGame = {
    open(container, back) { root = container; onExit = back; home(); },
    preview(id, view) { const v = byId.get(id); return v ? picture(v, view || "ahead", { aria: v.name }) : ""; },
    // Exposed for checks.
    _vessels: VESSELS, _lightsFor: lightsFor, _signature: signature, _makeRound: makeRound,
  };
})();
