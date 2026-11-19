// Lights & Shapes (Rules 20-25) — transcribed from the U.S. Maritime Academy "Rules of the Road" practice problems.
// The answer key page for this section has not been photographed yet, so every answer here
// was worked out from the Navigation Rules text and is flagged {src: "rules"}.
// Replace with the book's key when it is available.
//
// Skipped for now because the answer depends entirely on a diagram that isn't reproduced:
//   169 (DIAGRAM 52), 170 (DIAGRAM 58), 188 (DIAGRAM 16), 196 (DIAGRAM 77), 197 (DIAGRAM 73),
//   198 (DIAGRAM 66), 199 (DIAGRAM 63), 200 (DIAGRAM 60), 201 (DIAGRAM 10), 220 (DIAGRAM 46),
//   223 (DIAGRAM 62)

const R = {src: "rules"};

addSection({
  id: "lights-shapes",
  title: "Lights & Shapes · International & Inland",
  questions: [
    [144, "Rule 20", "Navigation lights must be displayed in all weathers from sunset to sunrise. They", [
      "must be displayed when day signals are being used.",
      "must be displayed when moored to a pier.",
      "may be extinguished at night on open waters when no other vessels are in the area.",
      "may be displayed during daylight."], "D", R],
    [145, "Rules 20, 25", "Which statement is true of a 30-meter sailing vessel underway?", [
      "She must show sidelights and a sternlight in restricted visibility.",
      "She may show an all-around white light at the top of the mast.",
      "She need not show a sternlight if she is showing all-round lights on the mast.",
      "If she is using propelling machinery, she shall show forward a shape consisting of two cones, points together."], "A", R],
    [146, "Rule 20", "The lights prescribed by the Rules shall (must) be exhibited", [
      "from sunrise to sunset in restricted visibility.",
      "at all times.",
      "only from sunset to sunrise.",
      "whenever a lookout is posted."], "A", R],
    [147, "Rule 20", "While you are underway, navigation lights must be displayed on your vessel", [
      "during all periods of reduced visibility.",
      "at all times.",
      "at night only when other vessels may be in the area.",
      "at night only when vessels are detected on radar."], "A", R],
    [148, "Rule 20", "Dayshapes shall be shown", [
      "during daylight hours.",
      "during daylight hours in restricted visibility.",
      "between 8 A.M. and 4 P.M. daily.",
      "between sunset and sunrise."], "A", R],
    [150, "Rule 21", "You see a vessel's green sidelight bearing due east from you. The vessel might be heading", [
      "east.",
      "northeast.",
      "northwest.",
      "southwest."], "D", {src: "rules", note: "The book says: use your toy boats! You see her starboard (green) side from the west, so she must be heading roughly south to west."}],
    [151, "Rule 21", "You see a red sidelight bearing NW. That vessel may be heading", [
      "south.",
      "east.",
      "northeast.",
      "northwest."], "A", {src: "rules", note: "Use your toy boats! You see her port (red) side from the southeast, so she is heading somewhere between southeast and southwest."}],
    [152, "Rule 21", "You are heading due east (090°) and observe a vessel's red sidelight on your port beam. The vessel may be heading", [
      "WNW (292.5°)",
      "NNW (337.5°)",
      "SW (225°)",
      "NE (045°)"], "C", {src: "rules", note: "Use your toy boats! She is due north of you showing her port side, so she is heading between south and WNW. 292.5° is exactly the edge of the red arc, so SW is the safe answer."}],
    [153, "Rules 21, 23", "The masthead light may be located at other than the fore and aft centerline of a vessel", [
      "less than 20-meters in length.",
      "less than 12-meters in length.",
      "which has separate sidelights carried on the outboard extremes of the vessel's breadth.",
      "engaged in fishing"], "B", R],
    [154, "Rule 21", "While underway at night you are coming up on a vessel from astern. What lights would you expect to see?", [
      "Red and green sidelights.",
      "Two white lights.",
      "One white light and red and green sidelights.",
      "One white light."], "D", R],
    [155, "Rules 21, 14", "Underway at night you see the red sidelight of a vessel well off your port bow. Which statement is true?", [
      "You are required to alter course to the right.",
      "You must stop engines.",
      "You are on a collision course with the other vessel.",
      "You may maintain course and speed."], "D", R],
    [156, "Rules 21, 25", "A lantern combining the two sidelights of a vessel's running lights may be shown on a", [
      "sailing vessel of 25-meters in length.",
      "20-meter vessel engaged in fishing and making way.",
      "25-meter power-driven vessel engaged in trolling.",
      "6-meter vessel under oars."], "D", R],
    [157, "Rule 21", "Which vessel may combine her sidelights in one lantern on the fore and aft centerline of the vessel?", [
      "A 16-meter sail vessel.",
      "A 25-meter power-driven vessel.",
      "A 28-meter sail vessel.",
      "Any non-self-propelled vessel."], "A", R],
    [158, "Rule 21", "The arc of visibility for sidelights is from right ahead to", [
      "22.5 degrees abaft the beam.",
      "abeam.",
      "22.5 degrees forward of the beam.",
      "135 degrees abaft the beam."], "A", R],
    [159, "Rule 21", "As defined in the Navigation Rules, a white masthead light shows through an arc of how many degrees?", [
      "90 degrees.",
      "112.5 degrees.",
      "225 degrees.",
      "360 degrees."], "C", R],
    [160, "Rule 21", "The sternlight shall be positioned such that it will show from dead astern to how many degrees on each side of the stern of the vessel?", [
      "22.5 degrees.",
      "67.5 degrees.",
      "112.5 degrees.",
      "135.0 degrees."], "B", R],
    [161, "Rule 21", "As defined in the Rules, a towing light is a yellow light having the same characteristics as a", [
      "masthead light.",
      "all-round light.",
      "sidelight.",
      "sternlight."], "D", R],
    [162, "Rule 21", "A towing light, according to the Rules, is a", [
      "white light.",
      "red light.",
      "yellow light.",
      "blue light."], "C", R],
    [163, "Rule 21", "A vessel is towing and carrying the required masthead lights aft. What is the visibility arc of these lights?", [
      "112.5 degrees.",
      "135.0 degrees.",
      "225.0 degrees.",
      "360.0 degrees."], "C", R],
    [164, "Rule 21", "A \"flashing light\", according to the definition given in the rules, is a light that", [
      "is red in color.",
      "is visible over an arc of the horizon of 360 degrees.",
      "flashes at regular intervals at a frequency of 120 flashes or more per minute.",
      "all of the above."], "C", R],
    [165, "Rule 23", "A 30-meter tug is underway and not towing. At night, this vessel must show sidelights and", [
      "one masthead light and a sternlight.",
      "two masthead lights and a sternlight.",
      "three masthead lights and a sternlight.",
      "a sternlight."], "A", R],
    [166, "Rule 23", "A dredge not engaged in dredging but proceeding to a dredging location at night would", [
      "not be required to show any lights.",
      "be required to show lights of an underway dredge.",
      "be required to show lights of a stationary dredge.",
      "be required to show lights of a power-driven vessel underway."], "D", R],
    [167, "Rule 23", "Which power-driven vessel is NOT required to carry a light in the position of the after masthead light?", [
      "A pushing vessel and a vessel being pushed, in a composite unit and 100-meters in length.",
      "A vessel of 60-meters in length towing astern.",
      "A vessel of 45-meters in length trolling.",
      "Any vessel constrained by her draft."], "C", R],
    [168, "Rules 23, 27", "Which vessel must exhibit forward and after masthead lights when making way?", [
      "A 75-meter vessel restricted in her ability to maneuver.",
      "A 100-meter sailing vessel.",
      "A 150-meter vessel engaged in fishing.",
      "A 45-meter vessel engaged in towing."], "A", R],
    [171, "Rule 23", "A power-driven vessel less than 12-meters in length may, instead of the underway lights for vessels under 50-meters, at night, show which of the following?", [
      "Sidelights and sternlight.",
      "One all-round white light and sidelights.",
      "Masthead light only.",
      "Sternlight only."], "B", R],
    [172, "Rule 23", "Which vessel must exhibit forward and after masthead lights when underway?", [
      "A 200-meter sailing vessel.",
      "A 50-meter power-driven vessel.",
      "A 100-meter vessel engaged in fishing.",
      "All of the above."], "B", R],
    [173, "Rule 23", "Which statement is true concerning a 75-meter power-driven vessel underway at night?", [
      "She must exhibit an all-round white light at the stern.",
      "She must exhibit forward and after masthead lights.",
      "She must exhibit only a forward masthead light.",
      "She may exhibit a red light over a green light forward."], "B", R],
    [174, "Rule 23", "Your tug is underway at night and NOT towing. What light(s) should your vessel show aft to other vessels coming up from astern?", [
      "One white light.",
      "Two white lights.",
      "One white light and one yellow light.",
      "One white light and two yellow lights."], "A", R],
    [175, "Rule 23", "The maximum length of a power-driven vessel which may show an all-round white light and sidelights instead of a masthead light and sidelights is", [
      "7 meters.",
      "10 meters.",
      "12 meters.",
      "20 meters."], "C", R],
    [176, "Rule 23", "The minimum length of a power-driven vessel that must show forward and after masthead lights is", [
      "30-meters.",
      "50-meters.",
      "75-meters.",
      "100-meters."], "B", R],
    [177, "Rule 23", "An all-round flashing yellow light is exhibited by a/an", [
      "vessel not under command.",
      "air cushion vessel in the nondisplacement mode.",
      "vessel towing a submerged object.",
      "vessel engaged in diving operations."], "B", R],
    [178, "Rules 24, 26", "Which vessel may exhibit identifying lights when not actually engaged in her occupation?", [
      "A trawler.",
      "A fishing vessel.",
      "A tug.",
      "None of the above."], "D", R],
    [179, "Rule 24", "At night, you are towing a partly submerged vessel 20-meters in length and 4-meters in breadth. What lights must you display on the towed vessel?", [
      "A white light at the stern.",
      "Two white lights side by side at the stern.",
      "A white light at the forward end and a white light at the after end.",
      "Two red lights in a vertical line at the after end."], "C", R],
    [181, "Rule 24", "Which statement is true concerning lights and shapes for towing vessels?", [
      "If a tow exceeds 200-meters in length, the towing vessel will show a black ball during daylight.",
      "When towing astern, a vessel will carry her identification lights at the masthead in addition to her regular masthead light.",
      "When towing astern, the towing vessel may show either a sternlight or a towing light, but not both.",
      "If the towing vessel is 50 meters or more in length, she must carry forward and after masthead lights."], "D", R],
    [182, "Rule 24", "At night, a broken down vessel being towed would show the same lights as", [
      "a power-driven vessel underway.",
      "the towing vessel.",
      "a barge.",
      "a vessel at anchor."], "C", R],
    [183, "Rule 24", "You are approaching another vessel at night. You can see both red and green sidelights and, above the level of the sidelights, three white lights in a vertical line. The vessel may be", [
      "not under command.",
      "towing a tow more than 200-meters astern.",
      "trawling.",
      "underway and dredging."], "B", R],
    [184, "Rule 24", "Which vessel must show a towing light above the sternlight?", [
      "A vessel pushing three barges ahead.",
      "A vessel towing alongside.",
      "A vessel with 150-meter tow astern.",
      "None of the above."], "C", R],
    [185, "Rules 24, 27", "A vessel in a towing operation which severely restricts the towing vessel and her tow in their ability to change course shall, when making way, exhibit", [
      "the lights for a towing vessel.",
      "the lights for a vessel restricted in its ability to maneuver.",
      "sidelights and sternlights.",
      "All of the above."], "D", R],
    [186, "Rule 24", "Two barges are being pushed ahead by a towboat. Which statement is true concerning lights on the barges?", [
      "Each vessel should show sidelights.",
      "Each vessel should show at least one white light.",
      "The barges should be lighted as separate units.",
      "The barges should be lighted as one vessel."], "D", R],
    [187, "Rules 24, 26, 27", "Which vessel would exhibit sidelights when underway and not making way?", [
      "A vessel towing astern.",
      "A vessel trawling.",
      "A vessel not under command.",
      "A vessel engaged in dredging operations."], "A", R],
    [190, "Rule 24", "A vessel with a tow over 200-meters in length will show, during the day", [
      "a black ball.",
      "a diamond shape.",
      "two cones, points together.",
      "one cone, point upward."], "B", R],
    [191, "Rule 24", "You are overtaking a vessel at night and you see a yellow light showing above the sternlight of the overtaken vessel. The overtaken vessel is", [
      "underway and dredging.",
      "pushing ahead or towing alongside.",
      "towing astern.",
      "a pilot vessel."], "C", R],
    [192, "Rule 24", "Which statement is true concerning a partly submerged vessel being towed?", [
      "It must show a yellow light at each end.",
      "It will show red lights along its length.",
      "A diamond shape will be carried at the aftermost extremity of the tow.",
      "All of the above."], "C", R],
    [193, "Rule 24", "A vessel, which does not normally engage in towing operations, is towing a vessel in distress. She", [
      "need not show the lights for a vessel engaged in towing, if it is impractical to do so.",
      "may show the lights for a vessel not under command.",
      "must show a yellow light above the sternlight.",
      "must show the lights for a vessel towing."], "A", R],
    [195, "Rule 24", "What dayshape should a vessel being towed exhibit if the tow EXCEEDS 200-meters?", [
      "Two balls.",
      "Two diamonds.",
      "One ball.",
      "One diamond."], "D", R],
    [202, "Rule 24", "In addition to sidelights what light should a vessel being towed show?", [
      "A sternlight.",
      "Not under command lights.",
      "A masthead light.",
      "Range lights."], "A", R],
    [203, "Rule 24", "A vessel towing a barge astern would show, at the stern", [
      "only a sternlight.",
      "a towing light above the sternlight.",
      "two towing lights in a vertical line.",
      "two white lights in a vertical line."], "B", R],
    [204, "Rule 24", "A power-driven vessel exhibits the same lights as a", [
      "vessel towing, when not underway.",
      "vessel towing astern.",
      "sailing vessel.",
      "pushing vessel and a vessel being pushed, when they are in a composite unit."], "D", R],
    [205, "Rule 24", "A vessel being towed alongside shall exhibit", [
      "one all-round white light.",
      "sidelights and a sternlight.",
      "only the outboard sidelight and a sternlight.",
      "a masthead light, sidelights, and a sternlight."], "B", R],
    [206, "Rule 24", "Barges being towed at night", [
      "must be lighted at all times.",
      "must be lighted only if manned.",
      "must be lighted only if towed astern.",
      "need not be lighted."], "A", R],
    [207, "Rule 24", "A vessel or object being towed at night must show", [
      "a white all-round light.",
      "sidelights and a sternlight.",
      "a flashing yellow light.",
      "forward and after masthead lights."], "B", R],
    [208, "Rule 24", "A power-driven vessel when towing another vessel astern (tow less than 200-meters) shall show", [
      "two masthead lights in a vertical line, sidelights, sternlight and towing light above the sternlight",
      "two masthead lights in a vertical line, sidelights and towing light instead of the sternlight",
      "two towing lights in a vertical line at the stern.",
      "a small white light abaft the funnel."], "A", R],
    [209, "Rule 24", "A 20-meter vessel is towing another vessel astern. The length of the tow from the stern of the towing vessel to the stern of the tow is 75-meters. How many white vertical masthead configuration lights shall the towing vessel show at night?", [
      "1",
      "2",
      "3",
      "4"], "B", R],
    [210, "Rule 24", "A towing vessel is towing two barges astern. The length of the tow from the stern of the tug to the stern of the last barge is 250-meters. How many forward white masthead lights should be displayed on the towboat at night?", [
      "1",
      "2",
      "3",
      "4"], "C", R],
    [211, "Rule 24", "What lights are shown on a barge being towed astern at night?", [
      "A white light at each corner",
      "A white light fore and aft",
      "Sidelights and a sternlight",
      "A sternlight only"], "C", R],
    [213, "Rule 24", "Which vessel may show two masthead lights in a vertical line?", [
      "A vessel less than 50-meters in length with a 20-meter tow.",
      "A sail vessel towing a small vessel astern.",
      "A vessel restricted in her ability to maneuver.",
      "A vessel engaged in dredging."], "A", R],
    [214, "Rule 24", "When towing more than one barge astern at night", [
      "only the last barge on the tow must be lighted.",
      "only the first and the last barges in the tow must be lighted.",
      "each barge in the tow must be lighted.",
      "only manned barges must be lighted."], "C", R],
    [215, "Rule 24", "Towing vessel 30-meters in length is pushing barges ahead. How many white masthead lights is the vessel required to show at night?", [
      "1",
      "2",
      "3",
      "4"], "B", R],
    [218, "Rules 25, 35", "Which statement(s) about a 25-meter auxiliary sailboat is/are true?", [
      "The sidelights and sternlight may be combined in one lantern.",
      "When operating under sail, her fog signal would consist of one prolonged blast.",
      "She may show a green light over a red light at the masthead.",
      "She must show fixed sidelights, and may not use a portable lantern."], "D", R],
    [219, "Rule 25", "At night you sight a vessel displaying a single green light. This is a", [
      "vessel at anchor.",
      "motorboat underway.",
      "vessel drifting.",
      "sailing vessel."], "D", R],
    [221, "Rule 25", "Which vessel may carry her sidelights and sternlight in a combined lantern on the mast?", [
      "An 18-meter sailing vessel.",
      "A 10-meter sailing vessel also being propelled by machinery.",
      "A 25-meter sailing vessel.",
      "All of the above."], "A", R],
    [222, "Rule 25", "A sailing vessel displaying the dayshape in DIAGRAM 35 is indicating that the vessel is", [
      "being propelled by power as well as sail.",
      "on a starboard tack.",
      "close-hauled and has difficulty maneuvering.",
      "fishing as well as sailing."], "A", {src: "rules", diagram: true, note: "The dayshape for a sailing vessel also under power is a cone, point downward."}],
    [224, "Rule 25", "A 15-meter sailing vessel would be required to show", [
      "sidelights, sternlight, and a red light over a green light on the mast.",
      "sidelights, and sternlight, but they may be in a combined lantern on the mast.",
      "separate sidelights and sternlight.",
      "sidelights only."], "B", R],
  ]
});
