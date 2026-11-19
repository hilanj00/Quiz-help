// The subjects shown as tabs at the top of the site.
// Each section in a data file belongs to one subject through its `subject` field
// (sections with no subject belong to "rules").
// pass = the score needed to pass that Coast Guard exam module (Rules of the Road 90%, the others 70%).

window.QUIZ_SUBJECTS = [
  {
    id: "rules",
    title: "Rules of the Road",
    blurb: "Navigation Rules · International & Inland",
    pass: 90,
    source: "Questions from the U.S. Maritime Academy Rules of the Road practice problems, based on the USCG Navigation Rules and Regulations Handbook.",
  },
  {
    id: "deck-safety",
    title: "Deck Safety",
    blurb: "Firefighting, lifesaving, damage control and safety rules",
    pass: 70,
    source: "Deck Safety practice questions.",
  },
  {
    id: "nav-general",
    title: "Navigation General",
    blurb: "Charts, aids to navigation, tides, weather and instruments",
    pass: 70,
    source: "Navigation General practice questions.",
  },
  {
    id: "deck-general",
    title: "Deck General",
    blurb: "Seamanship, ship construction, cargo and stability",
    pass: 70,
    source: "Deck General practice questions.",
  },
];
