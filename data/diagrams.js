// General Questions, Lights in Diagrams and Sound Signals in Diagrams (book pages 96-104).
// Transcribed from the U.S. Maritime Academy "Rules of the Road" practice problems.
// Answers are from the book's answer keys. Any question whose text names a DIAGRAM is
// flagged as a diagram question automatically (see the loop at the bottom).
// General Questions #5 and #6 are left out: their choices are only the letters on diagrams 86 and 87.

const DIAGRAM_SECTIONS = [];

DIAGRAM_SECTIONS.push({
  id: "general",
  title: "General Questions",
  questions: [
    [1, "Rule 2", "Which of the following would be a \"special circumstance\" under the Rules?", [
      "Vessel at anchor.", "More than two vessels meeting.", "Speed in fog.", "Two vessels crossing."], "B"],
    [2, "Rule 1 (33 CFR 707)", "An authorized light to assist in the identification of submarines operating on the surface is a/an", [
      "blue rotating light.", "intermittent flashing amber/yellow light.", "flashing white light.", "flashing sidelight."], "B"],
    [3, "Rule 20", "A vessel may exhibit lights other than those prescribed by the Rules as long as the additional lights", [
      "do not interfere with the keeping of a proper lookout.",
      "are not the color of either sidelight.",
      "have a lesser range than the prescribed lights.",
      "all of the above."], "A"],
    [4, "Rule 21", "A lantern combining the two sidelights of a vessel's running lights may be shown on a", [
      "10-meter sailing vessel.",
      "20-meter vessel engaged in fishing and making way.",
      "25-meter power-driven vessel engaged in trolling.",
      "25-meter pilot vessel."], "A"],
  ]
});

DIAGRAM_SECTIONS.push({
  id: "lights-diagrams",
  title: "Lights in Diagrams",
  questions: [
    [1, "Inland", "The lights illustrated in DIAGRAM 75 indicate", [
      "pipeline.", "pushing ahead.", "being towed astern.", "dredging."], "B"],
    [2, "Inland", "While underway, you sight the lights illustrated with yellow lights flashing (see DIAGRAM 81). You should", [
      "wait until vessel ahead crosses your bow.",
      "stop until the red lights turn green.",
      "proceed leaving all the lights on your starboard side.",
      "pass between the two sets of vertical lights."], "D"],
    [3, "Inland · Rules 13, 14, 15", "You are approaching a vessel showing the lights shown in DIAGRAM 75. It is", [
      "a meeting situation.", "a crossing situation.", "an overtaking situation.", "a special circumstance."], "C"],
    [4, "Both", "You should keep the vessel showing the lights in DIAGRAM 68", [
      "500 meters astern.", "1000 meters away.", "1500 away.", "a safe distance determined by circumstances."], "B"],
    [5, "Both", "A sailing vessel is overtaking a tug and tow as shown in DIAGRAM 43. Which is correct?", [
      "The sailing vessel is the stand-on vessel because it is overtaking.",
      "The sailing vessel is the stand-on vessel because it is being is under sail.",
      "The tug is the stand-on vessel because it is being overtaken.",
      "The tug is the stand-on vessel because it is towing."], "C"],
    [6, "Both", "The lights shown in DIAGRAM 44 would be displayed by a vessel when it is", [
      "aground.",
      "not under command and dead in the water.",
      "not under command and is making way.",
      "laying or picking up navigation marks."], "A"],
    [7, "Both", "A vessel displaying the lights illustrated in DIAGRAM 84 is", [
      "not under command.", "showing improper lights.", "towing.", "dredging."], "A"],
    [8, "Both", "A vessel displaying the lights illustrated in DIAGRAM 83 is", [
      "fishing.", "not under command.", "towing.", "being towed."], "B"],
    [9, "Both", "A vessel displaying the lights illustrated in DIAGRAM 57 is", [
      "restricted in her ability to maneuver and not making way.",
      "engaged in fishing and not making way.",
      "a pilot vessel underway and making way on pilotage duty.",
      "towing and making way."], "A"],
    [10, "Both", "Underway at night you see DIAGRAM 62. It is", [
      "engaged in fishing.", "mine clearance.", "pilot.", "under sail."], "D"],
    [11, "Both", "A vessel displaying the lights illustrated in DIAGRAM 60 is", [
      "towing.", "being towed.", "broken down.", "fishing."], "A"],
    [12, "Both", "If you see the lights in DIAGRAM 70 you should", [
      "provided assistance as the vessel is in distress.",
      "stay clear as the vessel is transferring dangerous cargo.",
      "stay clear as the vessel is fishing.",
      "change course to the right as the vessel is crossing your bow."], "C"],
    [13, "Both", "A vessel displaying the lights in DIAGRAM 70 is a", [
      "pilot.", "sailboat.", "fishing.", "power-driven."], "C"],
    [14, "Both", "A vessel which is underway at night and displaying lights in DIAGRAM 69 is", [
      "engaged in fishing.", "mine clearance.", "under sail.", "pilot."], "A"],
    [15, "Both", "A vessel displaying the lights in DIAGRAM 46 is", [
      "sailing.", "fishing and making way.", "pilot making way.", "fishing and anchored."], "A"],
    [16, "Both", "While underway at night, you sight the lights in DIAGRAM 71. How should you pass?", [
      "Both vessels should alter course to starboard and pass port to port.",
      "Both vessels should alter course to port and pass starboard to starboard.",
      "Your vessel should hold course and speed.",
      "You should sound an appropriate overtaking signal."], "A"],
    [17, "Both", "A vessel displaying lights in DIAGRAM 53 is", [
      "pilot.", "sailing.", "fishing.", "power-driven underway."], "A"],
    [18, "Both", "A vessel displaying lights in DIAGRAM 77 is", [
      "a vessel pushing barges ahead.", "towing barges astern.", "pipeline.", "stationary dredge."], "B"],
    [19, "Both", "A vessel displaying lights in DIAGRAM 82 is", [
      "sailing.", "fishing.", "pilot.", "anchored."], "B"],
    [20, "Both", "You see the lights in DIAGRAM 73. They would indicate", [
      "trolling.", "laying sub. cable.", "towing astern.", "dredging."], "C"],
    [21, "Both", "A fishing vessel displaying the lights in DIAGRAM 67 is", [
      "anchored.", "underway but not fishing.", "tending a small fishing boat.", "fishing by trawling."], "D"],
    [22, "Both", "A vessel displaying lights in DIAGRAM 44 is", [
      "towing.", "underwater survey", "drifting.", "aground."], "D"],
    [23, "Both", "A vessel displaying lights in DIAGRAM 61 is", [
      "fishing.", "pilot at anchor.", "fishing aground.", "fishing and hauling her nets."], "B"],
    [24, "International", "A vessel displaying lights in DIAGRAM 55 shows", [
      "tug with tow astern.", "tug with tow alongside.", "tug pushing ahead.", "pipeline."], "B"],
    [25, "Both", "A vessel displaying lights in DIAGRAM 76 shows", [
      "trawling.", "laying sub. cable.", "towing astern.", "dredging."], "A"],
    [26, "Both", "A vessel displaying lights in DIAGRAM 58 is", [
      "being towed", "power-driven < 50 meters.", "fishing at anchor.", "sailboat."], "B"],
    [27, "Both", "A vessel displaying lights in DIAGRAM 52 is", [
      "towing by pushing ahead.", "underway.", "towing submerged object.", "dredging."], "B"],
    [28, "Both", "A vessel displaying lights in DIAGRAM 56 is", [
      "towing a barge alongside.", "underway laying cable.", "dredging at anchor.", "carrying dangerous cargo."], "B"],
    [29, "Both", "A vessel displaying lights in DIAGRAM 65 is", [
      "fishing.", "anchored.", "being towed.", "drifting."], "B"],
  ]
});

DIAGRAM_SECTIONS.push({
  id: "sound-diagrams",
  title: "Sound Signals in Diagrams",
  questions: [
    [1, "Inland", "You are on vessel \"B\" and vessel \"A\" desires to overtake you on the starboard side as shown in DIAGRAM 9. After the vessels have exchanged one blast signal you should", [
      "alter course to the left.",
      "slow your vessel until \"B\" has passed.",
      "hold course and speed.",
      "alter course to the left or right to give \"B\" more sea room."], "C"],
    [2, "Inland", "You are underway on vessel \"A\" and desire to overtake vessel \"B\" as shown in DIAGRAM 17. After you sound two short blasts on your whistle, vessel \"B\" sounds five short rapid blasts on the whistle. You should", [
      "pass with caution on the port side of vessel \"B\".",
      "not attempt to pass vessel \"B\" until that vessel sounds and you answer a passing signal.",
      "answer the five short blasts then pass on the port side.",
      "Keep sounding passing signals until the same signal is received from vessel \"B\"."], "D"],
    [3, "Inland", "Vessels \"A\" and \"B\" are meeting on a river as shown in DIAGRAM 29, and will pass about 1/4 mile apart. Which statement is true?", [
      "Both vessels should continue on course and pass without sounding any signals.",
      "The vessels should exchange two blast whistle signals and pass port to port.",
      "The vessels should exchange two blast signals and pass starboard to starboard.",
      "The vessels should pass port to port and must sound whistle signals only if either vessel changes course."], "C"],
    [4, "Inland", "Vessels \"A\" and \"B\" are passing in a narrow channel as shown in DIAGRAM 29. Which of the following is true concerning whistle signals between vessels?", [
      "Both vessels should sound two short blasts.",
      "Both vessels should sound one short.",
      "\"A\" should sound one short blast and \"B\" should sound two short blasts.",
      "Neither vessel should sound any signal as no course change is necessary."], "A"],
    [5, "Inland", "You are on \"A\" and \"B\" desires to overtake you on the starboard side as shown in DIAGRAM 31. After the vessels have exchanged one blast, you should", [
      "alter course to the left.",
      "slow your vessel until \"B\" has passed.",
      "hold course and speed.",
      "alter course to the left to give \"B\" more room."], "C"],
    [6, "Inland", "\"A\" and \"B\" are meeting on the river as shown in DIAGRAM 41, and will pass about 1/4 mile apart. What action should the vessels take?", [
      "Both vessels should continue on course and pass without sounding any whistle signals.",
      "The vessels should exchange two blast whistle signals and pass starboard to starboard.",
      "The vessels should exchange one blast and pass starboard to starboard.",
      "The vessels should pass starboard to starboard and must sound whistle signals only if either vessel changes course."], "B"],
    [7, "Inland", "Two steam vessels are meeting as shown in DIAGRAM 37. One short blast by vessel \"A\" means", [
      "I am altering my course to starboard.",
      "my intention is to pass on the port side of each other.",
      "my intention is to hold course and speed.",
      "the vessels should pass starboard to starboard and must sound whistle signals only if either vessel changes course."], "B"],
    [8, "Both", "You are on \"A\" pushing a barge ahead and meeting vessel \"B\" as in DIAGRAM 12. How should the vessels pass?", [
      "Both vessels must alter course to starboard and pass port to port.",
      "Both vessels must alter course to port and pass starboard to starboard.",
      "Vessel \"A\" should maintain course and \"B\" should alter course.",
      "The vessel should determine which will alter course by sounding signals."], "A"],
    [9, "Both", "Two power-driven vessels are crossing as in DIAGRAM 42. \"A\" sounds three short. \"A\"", [
      "intends to hold course and speed", "is sounding the danger signal.", "is backing engines.", "proposes to cross ahead of the other vessel."], "C"],
    [10, "Both", "\"A\" and \"B\" are crossing as in DIAGRAM 30. What is true?", [
      "The vessels should pass starboard to starboard.",
      "\"B\" will pass under stern of \"A\".",
      "\"B\" should alter course to the right.",
      "\"A\" must keep clear of \"B\"."], "D"],
    [11, "Both", "You are on \"A\" in DIAGRAM 32 and hear \"B\" sound a signal indicating his intention to overtake you. You feel it is not safe for \"B\" to do so. You", [
      "sound five or more short blasts.", "sound two short blasts.", "not answer the signal from \"B\".", "sound three blasts."], "A"],
    [12, "International", "You are on \"I\" in DIAGRAM 36. Vessel \"II\" gives one short blast. What action do you take?", [
      "Sound one short blast and hold course/speed.",
      "Hold course/speed without giving a signal.",
      "Sound one short and slow down or turn to starboard.",
      "Blow the danger signal and slow speed."], "B"],
    [14, "International", "\"A\" and \"B\" are in a crossing situation as shown in DIAGRAM 14. \"B\" sounds one short. What action does \"A\" take?", [
      "Answer with one short and hold course/speed.",
      "Hold course/speed.",
      "Answer with one short and keep clear of \"B\".",
      "Sound danger signal."], "B"],
    [15, "Both", "You are in a power-driven vessel underway and making way in the fog. You should sound", [
      "one prolonged and two short blasts.",
      "two prolonged every two minutes.",
      "one prolonged not more than one minute.",
      "one prolonged not more than two minutes."], "D"],
    [16, "Both", "You are a sailing vessel underway, not making way in the fog. You should sound", [
      "two prolonged every two minutes.",
      "two prolonged every minute.",
      "one prolonged and two short every two minutes.",
      "two prolonged and one short every two minutes."], "C"],
    [17, "Both", "You are a vessel engaged in fishing and anchored in the fog. You should sound", [
      "rapid ringing of the bell for five seconds every minute.",
      "one prolonged and two short every two minutes.",
      "two prolonged every minute.",
      "none of the above."], "B"],
    [18, "Both", "You are towing a group of barges in the fog. The last barge is manned. As a vessel nearing this towing configuration, you would hear", [
      "one prolonged and two short every minute.",
      "two prolonged and two short.",
      "one short, one prolonged, one short every two minutes.",
      "one prolonged and two short, then one prolonged and three short every two minutes."], "D"],
    [19, "Inland", "You are leaving a dock in reverse. You should sound", [
      "one prolonged and three short.", "the danger signal.", "three short.", "one prolonged when leaving the dock."], "A"],
    [20, "Both", "You are a vessel aground in the fog. You should sound", [
      "one prolonged and two short every minute.",
      "three distinct strokes on the bell every minute.",
      "rapid ringing of the bell for five seconds followed by one short, one prolonged, one short every minute.",
      "three distinct strokes on the bell followed by rapid ringing of the bell for five seconds followed by three distinct strokes on the bell."], "D"],
    [21, "Both", "A vessel of less than 12 meters in length at anchor in the fog shall sound", [
      "rapid ringing of the bell every two minutes.",
      "one short, one prolonged, one short every minute.",
      "some efficient sound signal not more than two minutes apart.",
      "some efficient sound signal not more than one minute apart."], "C"],
    [22, "Both", "A pilot vessel engaged in pilotage duty may sound an identity fog signal of", [
      "four short blasts.", "one short, one prolonged, one short.", "three short, three prolonged.", "none of the above."], "A"],
    [23, "Both", "A power-driven vessel underway, not making way in fog, should sound", [
      "one prolonged, two short every two minutes.",
      "one long every two minutes.",
      "two long every two minutes.",
      "two prolonged every two minutes."], "D"],
  ]
});

for (const sec of DIAGRAM_SECTIONS) {
  for (const q of sec.questions) {
    if (/DIAGRAM/.test(q[2])) q[5] = Object.assign({diagram: true}, q[5] || {});
  }
  addSection(sec);
}
