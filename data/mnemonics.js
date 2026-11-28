// Mnemonic devices. Each question points at the one device for the fact it tests (QUESTION_MNEMONIC),
// so the same device comes up every time that fact is tested.
// Format: key: [topic, device, what it unlocks]

window.MNEMONICS = {
  // ----- Rules 1–3: who, where, what -----
  where: ["Where the Rules apply", "\"Seas outside, Lines inside.\"", "International Rules = high seas and connected waters. Inland Rules = inside the COLREGS demarcation lines, the Western Rivers and the U.S. Great Lakes."],
  inlandwaters: ["Inland waters", "\"Inland = Inside the Lines, plus the Rivers and the Lakes.\"", "Harbors and rivers shoreward of the demarcation lines, the Western Rivers, and the U.S. side of the Great Lakes."],
  close: ["Can't comply exactly", "\"Can't comply? Come as CLOSE as you can, and your flag decides.\"", "A vessel built so it can't meet the light rules complies as closely as possible, as her government determines."],
  rule2: ["Rule 2", "\"Rule TWO lets you break the rules TO avoid danger, and nothing else.\"", "Depart from the Rules only to avoid IMMEDIATE danger. Special circumstances include more than two vessels and the limits of the vessels involved."],
  underway: ["Underway", "\"No A's = underway: not Anchored, not Aground, not Attached to shore.\"", "Drifting, stopped or hauling nets still counts as underway."],
  insight: ["In sight", "\"In sight = by EYE. Radar doesn't count: 'see me, not scan me'.\"", "Vessels are in sight only when one can be seen visually from the other."],
  rv: ["Restricted visibility", "\"Any MURK counts: fog, mist, snow, rain, sand.\"", "Restricted visibility has no distance limit and any cause counts."],
  length: ["Length and breadth", "\"L-O-A: Length is OverAll. Breadth is the Biggest.\"", "Length = length overall. Breadth = greatest breadth."],
  vessel: ["Vessel", "\"If it floats and carries, it's a vessel, even with wings.\"", "Vessel includes seaplanes, WIG craft, nondisplacement craft and barges."],
  power: ["Power-driven", "\"Engine ON = Power, no matter how many sails are up.\"", "Any vessel propelled by machinery IN USE is power-driven."],
  fishdef: ["Engaged in fishing", "\"Trolling is just strolling.\"", "Fishing = nets, lines or trawls that restrict maneuvering. Trolling lines don't count."],
  nucram: ["NUC vs RAM", "\"NUC = the boat BROKE. RAM = the boat's at WORK.\"", "NUC: an exceptional circumstance (breakdown). RAM: the nature of her work."],
  ram: ["RAM jobs", "\"The 8 D's of RAM: Dredging, Diving, Dropping cable, Doctoring buoys, Delivering stores underway, Deck aircraft ops, Defusing mines, Dragging a stuck tow.\"", "Underwater work, cable or pipe laying, servicing nav aids, replenishing underway, launching or recovering aircraft, mineclearing, and a severely restricted tow. Not: anchored, sailing, NUC, deep draft."],
  cbd: ["Constrained by draft", "\"CBD = Cylinder By Day, three reds at night, and only on the high seas.\"", "International only. A power-driven vessel restricted by her draft compared to the depth. Not RAM."],
  // ----- Rules 5–8 -----
  lookout: ["Lookout", "\"All senses, All means, All times.\"", "Sight, hearing and radar, at all times, in all conditions."],
  safespeed: ["Safe speed", "\"Very Tired Mariners Bring Wet Dogs Regularly.\"", "Visibility, Traffic, Maneuverability, Background lights, Wind/sea/current, Draft vs depth, Radar. NOT horsepower, top speed or crew experience."],
  cbdr: ["Risk of collision", "\"CBDR = Constant Bearing, Decreasing Range: Collision Bound, Do React.\"", "A steady bearing on an approaching vessel = risk. Use compass bearings, radar plotting and scanning."],
  doubt: ["When in doubt", "\"Doubt means YES.\"", "In doubt about risk, overtaking or head-on? Assume it is."],
  action: ["Action to avoid collision", "\"ELO: Early, Large, Obvious. Turn it UP.\"", "Positive, in ample time, big enough to be seen. No small nibbles. Slow or stop for more time."],
  // ----- Rules 9–10 -----
  channel: ["Narrow channels", "\"Drive on the RIGHT. Small, Sail and Fish don't block the Ship.\"", "Keep to the starboard side. Under 20 m, sailing and fishing vessels must not impede a vessel confined to the channel."],
  downbound: ["Great Lakes and Western Rivers", "\"DOWNbound DECIDES.\"", "The vessel going down with the current has right of way, proposes the passing and sounds first."],
  riverx: ["Crossing a river", "\"Crossers yield to the river's traffic.\"", "On the Western Rivers a vessel crossing keeps clear of power-driven vessels going up or down."],
  tss: ["Traffic separation schemes", "\"JOIN at a slant, CROSS at a square.\"", "Join or leave at a small angle, cross at a right angle. Go with the flow. Zone = median strip. Only cable and buoy workers are exempt."],
  // ----- Rules 12–18 -----
  sail: ["Sailboats meeting", "\"S-S, W-W: Starboard tack Stands on; Windward gives Way.\"", "Different tacks: port tack gives way. Same tack: windward gives way. Can't tell? Give way."],
  overtake: ["Overtaking", "\"You catch it, you dodge it, all the way past.\"", "Overtaking (from more than 22.5° abaft the beam, sternlight only) = give way, even a sailboat, until past and clear."],
  headon: ["Head-on", "\"Red to red, safe ahead. Both turn RIGHT.\"", "Two power-driven vessels head-on: both alter to starboard, port to port."],
  crossing: ["Crossing", "\"See RED, you STOP. See GREEN, you GO.\"", "The vessel with the other on her starboard side gives way. Towing alone gives no rights."],
  giveway: ["Give-way vessel", "\"Give way EARLY, give way BIG, never cross her BOW.\"", "Early, substantial action. Avoid crossing ahead of the stand-on vessel."],
  standon: ["Stand-on vessel", "\"HOLD, then MAY, then MUST. Never Port for a Port.\"", "Keep course and speed; may act if the other isn't; must act when collision can't be avoided by her alone. Don't turn to port for a vessel on your port side."],
  pecking: ["Who gives way", "\"Nobody Really Cares For Sailing Power Planes.\"", "NUC, RAM, CBD, Fishing, Sailing, Power-driven, seaPlane. Each keeps clear of the ones before it (overtaking and narrow channels override)."],
  // ----- Rule 19 -----
  fogradar: ["Fog, radar-only contact", "\"Ahead? Not to PORT. Beside or behind? Not TOWARD.\"", "Act early. Don't turn to port for a vessel forward of the beam; don't turn toward one abeam or abaft."],
  fogheard: ["Fog signal heard ahead", "\"Hear it ahead, slow to a CRAWL.\"", "Fog signal forward of the beam: bare steerageway (minimum to keep course), stop if necessary. Abaft the beam: no need to slow."],
  // ----- Rules 20–31: lights and shapes -----
  lightswhen: ["When to show lights", "\"Lights when it's DARK or DIM. Shapes when it's DAY.\"", "Sunset to sunrise, and by day in restricted visibility. May be shown any other time."],
  arcs: ["Light arcs", "\"112.5 + 112.5 = 225, and 225 + 135 = 360.\"", "Each sidelight 112.5°, masthead 225°, sternlight 135° (67.5° each side), all-round 360°. Towing light = sternlight arc."],
  sidelook: ["Which side am I seeing?", "\"Port wine is RED, and there's a little red PORT LEFT.\"", "Red = port, green = starboard. The color you see is the side facing YOU. Use your toy boats."],
  sizes: ["Size cutoffs", "\"7, 12, 20, 50: torch, all-round, combine, double.\"", "Under 7 m: white torch or light. Under 12 m: one all-round white + sidelights. Under 20 m: combined lantern. 50 m+: two masthead lights."],
  combined: ["Combined lantern", "\"Under TWENTY, combine plenty.\"", "Only vessels under 20 m may combine sidelights (sailboats: sidelights and sternlight on the mast)."],
  powerlights: ["Power-driven lights", "\"One white for small, two whites for tall (50 m).\"", "Masthead light, sidelights, sternlight. 50 m or more: a second, higher masthead light aft."],
  onduty: ["Job lights", "\"Job lights only ON the job.\"", "Fishing, pilot and other identifying lights are shown only while actually doing that work."],
  hover: ["Hovercraft", "\"Flashing yellow, hovering fellow.\"", "All-round flashing yellow = air cushion vessel off the water."],
  towcount: ["Towing lights", "\"Count the whites: TWO = towing, THREE = tow's too long. Diamond = long tow by day.\"", "Two masthead lights stacked = tow 200 m or less; three = over 200 m. Diamond by day when over 200 m."],
  towstern: ["Towing astern", "\"Yellow over white = a tug in sight.\"", "Towing astern: yellow towing light above the sternlight. Not towing = sternlight only."],
  towed: ["Being towed", "\"No engine, no head: towed vessels lose the masthead light.\"", "Towed vessels and barges: sidelights and sternlight. Every barge lit, manned or not."],
  submerged: ["Partly submerged tow", "\"Half-sunk? White at each END, diamond at the TAIL.\"", "All-round white at each end (more if 25 m+ wide); diamond at the after end by day."],
  helper: ["Emergency towing", "\"Rescue tow? Just light the line.\"", "A vessel not normally towing, helping one in distress, needn't show towing lights if impractical, but should light the towline."],
  push: ["Pushing ahead", "\"Two whites, no yellow = pushing (International). Two YELLOWS aft = pushing (Inland).\"", "Pushing ahead or towing alongside: two masthead lights stacked. Inland adds two yellow towing lights instead of a sternlight."],
  composite: ["Composite unit", "\"Locked together = ONE boat.\"", "A pusher rigidly connected to its barge is lit as one power-driven vessel."],
  inlandlights: ["Inland lighting differences", "\"Inland adds YELLOW, drops CBD.\"", "Inland: pushers show two yellow towing lights, pushed barges a special flashing yellow, and there's no CBD."],
  specialflash: ["Special flashing light", "\"Yellow blinking at the BOW = barge being pushed.\"", "Inland: yellow, as far forward as possible, 50–70 flashes a minute, 180–225°."],
  huey: ["Western Rivers above Huey P. Long", "\"Above the Huey, mastheads go away-y.\"", "Pushers there show sidelights and two towing lights, no masthead lights."],
  sailbasic: ["Sailboat lights", "\"Sail = colors only, no white on top.\"", "Sidelights and sternlight, no masthead light. A lone green or red with no white above it = sailboat."],
  sailrg: ["Red over green", "\"Red over green, sailing machine.\"", "Optional all-round red over green at the masthead, not with the combined lantern."],
  motorsail: ["Sailing and motoring", "\"Cone DOWN, motor's ON.\"", "A sailboat using her engine is power-driven: masthead light at night, cone point down by day."],
  oars: ["Oars and tiny sail", "\"Paddle or puff? A flashlight's enough.\"", "Under oars (or sail under 7 m): a white torch or lantern shown in time. May show sailing lights."],
  trawl: ["Fishing lights", "\"Green over white, trawling tonight. Red over white, fishing at night.\"", "Trawling: green over white (50 m+ adds a masthead light aft). Other fishing: red over white. Fishing at anchor keeps these lights."],
  fishway: ["Fishing sidelights", "\"Sidelights on only when she's MOVING.\"", "Fishing vessels show sidelights and sternlight only when making way."],
  hourglass: ["Fishing by day", "\"The hourglass says it's TIME to fish.\"", "Two cones, points together = fishing."],
  gear: ["Outlying gear", "\"Point UP, the gear is OUT.\"", "Gear extending more than 150 m: white light (night) or cone point up (day) toward the gear."],
  nuc: ["Not under command", "\"Red over red, the captain is dead.\"", "Two all-round reds (two balls by day). No masthead light, so head-on there's no white at all."],
  ramlights: ["RAM lights and shapes", "\"Red-White-Red, restricted ahead. Ball-Diamond-Ball, she can't move at all.\"", "Add masthead lights, sidelights and sternlight when making way; anchor lights at anchor."],
  dredge: ["Dredge sides", "\"Two GREENS, GO. Two REDS, STOP.\"", "Greens (diamonds by day) = side to pass. Reds (balls) = obstructed side."],
  mine: ["Mineclearance", "\"Three greens, stay a THOUSAND meters clean.\"", "Three all-round greens (three balls by day). Keep 1000 m away."],
  flagA: ["Divers down", "\"Flag A: Alpha, divers Below.\"", "A rigid replica of code flag A, at least 1 m high."],
  pilot: ["Pilot vessel", "\"White over red, pilot ahead (white cap, red face).\"", "White over red, plus sidelights and sternlight any time underway, plus anchor lights at anchor."],
  anchorlights: ["Anchor lights", "\"Fifty gets two, and the HEAD stays HIGH. A hundred turns the deck lights on.\"", "Under 50 m: one all-round white. 50 m+: forward white plus a lower one aft. 100 m+: working lights required."],
  balls: ["Balls by day", "\"More balls, more trouble: 1 anchored, 2 broken, 3 stuck.\"", "One ball = anchored. Two = NUC. Three = aground."],
  aground: ["Aground", "\"Stuck = Anchored + Dead: anchor lights plus red over red.\"", "Anchor lights plus two all-round reds; three balls by day."],
  small7: ["Tiny boat at anchor", "\"Under SEVEN and out of the way? Nothing to display.\"", "Under 7 m, away from where vessels navigate: no anchor light or ball needed."],
  specialanchor: ["Special anchorage area", "\"Special anchorage under twenty: no lights, no bells, plenty quiet.\"", "Inland, under 20 m in a special anchorage area: no anchor lights, shapes or fog signal."],
  extralights: ["Extra lights", "\"Extra lights are fine if they're not MISTAKEN for real ones.\"", "Additional lights can't be confused with Rule lights or spoil the lookout. Surfaced submarines may show a flashing amber beacon."],
  pipeline: ["Pipeline openings", "\"Pass BETWEEN the posts.\"", "The two sets of vertical lights mark the gap in a pipeline: go between them."],
  // ----- Rules 32–37: sound and light signals -----
  blasts: ["Blast lengths", "\"Short = 'beep' (1 s). Prolonged = 'beeeeep' (4–6 s).\"", "Maneuvering signals use short blasts; fog signals use prolonged blasts."],
  equipment: ["Sound equipment", "\"Whistle at TWELVE, bell at TWENTY, gong at a HUNDRED.\"", "Under 12 m: any efficient sound. Manual sounding must always be possible."],
  maneuverintl: ["Maneuvering signals", "\"ONE to the right, TWO to the left, THREE in reverse.\"", "International: signals describe what you ARE doing; no signal unless you maneuver, and they aren't answered."],
  inlandsignals: ["Inland passing signals", "\"Inland is about INTENT: ONE = Pass Port to Port, TWO = Starboard to Starboard, within HALF a mile.\"", "1 short = 'I intend to leave you on my port side', 2 short = on my starboard side. Answer with the same signal. Radio agreement can replace them."],
  radio: ["Radio agreements (Inland)", "\"Said it on the radio? Whistles are optional.\"", "Passing agreed by radiotelephone: whistle signals not required, but allowed."],
  dock: ["Leaving a dock (Inland)", "\"One LONG 'bye-bye'. Backing out? Add THREE.\"", "Power-driven leaving a berth: one prolonged; add three short if going astern."],
  danger: ["Danger signal", "\"FIVE short = 'Hey! Hey! Hey! Hey! Hey! What are you doing?'\"", "At least 5 short rapid blasts, by either vessel in sight, for doubt or danger. International: MAY; Inland doubt in a channel: MUST."],
  channelovertake: ["Overtaking in a narrow channel", "\"Two LONGS to ask; count the SHORTS for the side (1 = right, 2 = left). Agree with Morse C: 'Certainly'.\"", "2 prolonged + 1 short = your starboard side, 2 prolonged + 2 short = your port side. Agreement: prolonged-short-prolonged-short."],
  bend: ["Blind bend", "\"One long 'Hello?' answered by one long 'Hello!'\"", "Approaching a bend: one prolonged blast; answer one heard with one prolonged."],
  lightsignals: ["Light signals", "\"Flashes copy the whistle.\"", "One flash per short blast, about 1 s apart, 10 s between signals. International: white; Inland: white or yellow, all-round, synced to the whistle."],
  fogpower: ["Power-driven fog signals", "\"One long, moving along. Two long, stopped and going nowhere.\"", "Making way: one prolonged. Underway but stopped: two prolonged. Every 2 minutes."],
  fogspecial: ["Long-short-short", "\"No Real Captain Sails Fishing Tugs.\"", "NUC, RAM, CBD, Sailing, Fishing, Towing/pushing all sound one prolonged + two short (RAM and fishing even at anchor)."],
  fogtowed: ["Towed vessel fog signal", "\"One more SHORT for the tow behind, right AFTER the tug.\"", "Last manned vessel of a tow: one prolonged + three short, immediately after the tug's signal. Others stay silent."],
  foganchor: ["Anchored and aground fog signals", "\"Anchored = RING. Big ship = RING then BONG. Aground = 'ding-ding-ding, ring-a-ling, ding-ding-ding'.\"", "Rapid bell 5 s; 100 m+ adds a gong aft; aground adds three distinct strokes before and after."],
  anchorwarn: ["Anchored warning", "\"Short-LONG-short = 'I'm RIGHT here!' (Morse R).\"", "An anchored vessel may add short-prolonged-short to warn an approaching vessel."],
  fogintervals: ["Fog signal intervals", "\"Moving = every TWO. Parked = every ONE.\"", "Underway: at least every 2 minutes. Anchored or aground: at least every minute."],
  pilotfog: ["Pilot fog signal", "\"FOUR beeps = the pilot's on watch.\"", "A pilot on duty may add four short blasts to her normal signal, underway or anchored."],
  fogsmall: ["Small vessel fog signal", "\"Under twelve? Any good noise every two.\"", "Under 12 m: not required to give the regular signals, but some efficient sound at least every 2 minutes."],
  attention: ["Attention signals", "\"Get attention, but don't IMPERSONATE a real signal.\"", "Any light or sound that can't be mistaken for a Rule signal. A searchlight may be used without blinding anyone."],
  distress: ["Distress signals", "\"Distress is RED, ORANGE, FIRE or NONSTOP noise. GREEN is never distress.\"", "Continuous fog signal, gun every minute, SOS, MAYDAY, N over C, square flag + ball, flames, red flares, orange smoke or flag, arms up and down, dye marker."],
  annex2: ["Trawlers working together", "\"Shooting = White-White, Hauling = White-Red, Stuck = Red-Red. Purse seiner = Yellow-Yellow (gold in the purse).\"", "Extra lights for trawlers fishing close together, and for purse seiners hampered by gear."],
};

// Which device goes with each question. Ranges like "10-21" cover every question number in between that exists.
window.QUESTION_MNEMONIC = {};
(function () {
  const map = {
    "r1-9-both": { 1: "close", "2-4": "rule2", 5: "insight", 6: "underway", 7: "nucram", "8-9": "length", "10-21": "ram", 22: "rv", 23: "insight", 24: "power", 25: "underway", "26-27": "power", 28: "ram", "29-30": "vessel", "31-33": "fishdef", 34: "vessel", "35-36": "lookout", "37-42": "safespeed", 43: "cbdr", 44: "doubt", "45-55": "cbdr", "57-60": "action", "61-67": "channel" },
    "r1-9-inland": { 1: "cbd", "2-4": "inlandwaters", "7-9": "downbound" },
    "r1-9-intl": { 1: "where", "2-4": "cbd", 6: "danger" },
    "r10-19-both": { "68-71": "sail", "73-84": "overtake", "85-92": "headon", "93-102": "crossing", "103-104": "giveway", "105-112": "standon", 113: "fishdef", "114-130": "pecking", "134-136": "fogradar", "137-139": "fogheard", 140: "fogradar", 141: "fogheard", 142: "fogradar", 143: "fogheard" },
    "r10-tss": { "1-6": "tss" },
    "r10-19-inland": { 1: "tss", 5: "riverx", 7: "overtake" },
    "lights-shapes": { "144-148": "lightswhen", "150-152": "sidelook", 153: "sizes", 154: "arcs", 155: "sidelook", "156-157": "combined", "158-160": "arcs", "161-162": "towstern", "163-164": "arcs", "165-168": "powerlights", "169-170": "powerlights", 171: "sizes", "172-173": "powerlights", 174: "towstern", 175: "sizes", 176: "powerlights", 177: "hover", 178: "onduty", 179: "submerged", 181: "towcount", 182: "towed", 183: "towcount", 184: "towstern", 185: "ramlights", 186: "composite", 187: "towcount", 190: "towcount", 191: "towstern", 192: "submerged", 193: "helper", 195: "towcount", "196-197": "towcount", 198: "push", "199-201": "towcount", 202: "towed", 203: "towstern", 204: "composite", "205-207": "towed", "208-210": "towcount", 211: "towed", 213: "towcount", 214: "towed", 215: "push", 218: "combined", "219-220": "sailbasic", 221: "combined", 222: "motorsail", 223: "sailrg", 224: "combined" },
    "lights-shapes-2": { 225: "sailbasic", 226: "sailrg", 227: "motorsail", 228: "sailbasic", "229-230": "oars", 231: "sailrg", 232: "onduty", "235-237": "trawl", 238: "fishway", 239: "trawl", "240-241": "fishway", 242: "trawl", 245: "hourglass", "248-249": "gear", "250-255": "trawl", 256: "hourglass", 258: "ramlights", "259-260": "nuc", 261: "ramlights", "262-263": "nuc", "264-267": "ramlights", 268: "nuc", "269-273": "ramlights", 274: "flagA", 275: "ramlights", "299-301": "pilot", "302-303": "aground", "304-306": "anchorlights", 307: "balls", "308-309": "small7", 310: "aground", "311-312": "anchorlights", "314-316": "balls", "318-319": "anchorlights", 320: "balls", 321: "anchorlights" },
    "ls-intl": { 1: "sizes", 2: "push", 3: "inlandlights", 4: "push", "7-10": "cbd" },
    "ls-inland": { 1: "specialflash", 2: "push", 3: "specialflash", "4-5": "push", 6: "specialflash", "7-8": "huey", 11: "specialanchor" },
    "sound-both": { "322-325": "blasts", "326-330": "equipment", 332: "danger", "335-340": "maneuverintl", "341-344": "bend", "345-351": "danger", 352: "fogspecial", "353-354": "fogtowed", 357: "fogintervals", 358: "fogpower", 360: "fogheard", 362: "pilotfog", "363-366": "foganchor", 367: "fogintervals", "368-369": "anchorwarn", 370: "fogintervals", "371-376": "foganchor", "377-378": "fogintervals", 379: "anchorwarn", "380-382": "pilotfog", "383-384": "fogtowed", "385-392": "fogpower", "393-400": "fogspecial", "401-402": "fogtowed", "403-407": "fogspecial", "408-409": "fogtowed", "410-412": "fogspecial", 413: "fogtowed", "414-415": "attention" },
    "sound-intl": { 2: "maneuverintl", 5: "maneuverintl", "8-10": "channelovertake", "11-15": "maneuverintl", "16-17": "channelovertake", "18-19": "maneuverintl", 20: "danger", 22: "maneuverintl", "23-25": "lightsignals", "26-28": "fogspecial" },
    "sound-inland": { "29-31": "dock", "32-34": "radio", "35-46": "inlandsignals", "47-49": "danger", "50-54": "inlandsignals", 55: "dock", 56: "lightsignals", 57: "inlandsignals", 58: "radio", 59: "dock", 60: "lightsignals", 61: "inlandsignals", "62-65": "danger", 67: "specialanchor" },
    "annexes": { 416: "annex2", "417-432": "distress", "433-436": "annex2" },
    "general": { 1: "rule2", "2-3": "extralights", 4: "combined" },
    "lights-diagrams": { 1: "push", 2: "pipeline", 3: "overtake", 4: "mine", 5: "overtake", 6: "aground", "7-8": "nuc", 9: "ramlights", 10: "sailrg", 11: "towcount", "12-14": "trawl", 15: "sailbasic", 16: "headon", 17: "pilot", 18: "towstern", 19: "trawl", 20: "towstern", 21: "trawl", 22: "aground", 23: "pilot", 24: "push", 25: "trawl", "26-27": "powerlights", 28: "ramlights", 29: "anchorlights" },
    "sound-diagrams": { 1: "overtake", 2: "danger", "3-4": "inlandsignals", 5: "overtake", "6-7": "inlandsignals", 8: "headon", 9: "maneuverintl", 10: "crossing", 11: "danger", "12-14": "maneuverintl", 15: "fogpower", "16-17": "fogspecial", 18: "fogtowed", 19: "dock", 20: "foganchor", 21: "fogsmall", 22: "pilotfog", 23: "fogpower" },
  };
  for (const [sec, entries] of Object.entries(map)) {
    for (const [k, key] of Object.entries(entries)) {
      const [a, b] = String(k).split("-").map(Number);
      for (let n = a; n <= (b || a); n++) window.QUESTION_MNEMONIC[sec + "-" + n] = key;
    }
  }
  // The dredge and mine questions inside RAM ranges get their own devices.
  Object.assign(window.QUESTION_MNEMONIC, {
    "r1-9-both-18": "ram", "lights-shapes-2-258": "ramlights", "lights-shapes-2-261": "ramlights",
  });
})();

// Order and grouping for the Memory tricks page.
window.MNEMONIC_GROUPS = [
  ["Definitions and responsibility (Rules 1–3)", ["where", "inlandwaters", "close", "rule2", "underway", "insight", "rv", "length", "vessel", "power", "fishdef", "nucram", "ram", "cbd"]],
  ["Lookout, speed and collision (Rules 5–8)", ["lookout", "safespeed", "cbdr", "doubt", "action"]],
  ["Channels and schemes (Rules 9–10)", ["channel", "downbound", "riverx", "tss"]],
  ["Who gives way (Rules 12–18)", ["sail", "overtake", "headon", "crossing", "giveway", "standon", "pecking"]],
  ["Restricted visibility (Rule 19)", ["fogradar", "fogheard"]],
  ["Lights and shapes (Rules 20–31)", ["lightswhen", "arcs", "sidelook", "sizes", "combined", "powerlights", "onduty", "hover", "towcount", "towstern", "towed", "submerged", "helper", "push", "composite", "inlandlights", "specialflash", "huey", "sailbasic", "sailrg", "motorsail", "oars", "trawl", "fishway", "hourglass", "gear", "nuc", "ramlights", "dredge", "mine", "flagA", "pilot", "anchorlights", "balls", "aground", "small7", "specialanchor", "extralights", "pipeline"]],
  ["Sound and light signals (Rules 32–37)", ["blasts", "equipment", "maneuverintl", "inlandsignals", "radio", "dock", "danger", "channelovertake", "bend", "lightsignals", "fogpower", "fogspecial", "fogtowed", "foganchor", "anchorwarn", "fogintervals", "pilotfog", "fogsmall", "attention"]],
  ["Annexes", ["distress", "annex2"]],
];
