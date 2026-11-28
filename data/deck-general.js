// Deck General — U.S. Maritime Academy "Practice Deck General Exam" (book pages 165–173).
// Answers are from the book's answer key (page 175).
// Questions 11, 18, 20 and 23 use book diagrams (D030DG, D044DG, D003DG, D029DG) that haven't been
// photographed yet; they're flagged with bookDiagram so the quiz says which diagram they need.

window.DECK_GENERAL_KEY = "ACBDADABDA" + "DDADCADCAD" + "BDADBDDADC" + "CCCADBAABB" + "BCADADACDC";

(function () {
  const Q = [
    [1, "Regulations", "In Title 33 of the CFR, Navigation and Navigable Waters, Which subchapter covers Pollution?", [
      "Subchapter O", "Subchapter B", "Subchapter T", "Subchapter C"]],
    [2, "Electronics", "AIS broadcast information includes all except", [
      "True Heading", "Latitude", "Engine RPM", "UTC Time Stamp"]],
    [3, "Shiphandling", "What is the term for the stern being sucked down in shallow water?", [
      "Bottom Suction", "Squat", "Yaw", "Bow Rise"]],
    [4, "Communications", "When can you transmit voice communication on VHF Channel 70?", [
      "Only in cases of Distress", "Only in Dire emergencies", "When in contact with a Coast Guard rescue helicopter", "Never"]],
    [5, "Ground tackle", "What is the purpose of the Stripper on a windlass?", [
      "To peel the rode from the wildcat as it turns", "To secure the Devil's Claw", "To strip an anchor from the sea floor", "To let out more anchor rode"]],
    [6, "Marlinespike", "A bowline is used to", [
      "Tie 2 lines together of the same diameter.", "Act as a stopper so the line does not run through a pulley.", "Secure a reefed sail.", "Make a secure loop that will not slip, at the end of a line and is easy to untie even after under load"]],
    [7, "Towing", "A tow is \"in step\" when", [
      "Both the Towing vessel and the Tow are either both on the crest of a wave or both in the trough at the same time.", "The crew is making up the tow.", "The crew is undoing the hawser", "The catenary is at the correct water depth"]],
    [8, "Shiphandling", "On a vessel with a single right hand prop, and the transmission in reverse, prop walk will", [
      "Turn the bow to port.", "Push the stern to port", "Cavitate the prop and slow the vessel", "Pull the stern to starboard."]],
    [9, "Towing", "The purpose of the catenary in tow line is", [
      "Aid in keeping the towing vessel from yawing.", "Preventing squat.", "To keep the tow from sinking.", "To aid in surge load reduction."]],
    [10, "Survival craft", "Where is the best place to launch the life raft?", [
      "On the leeward side where the deck is the lowest", "On the windward side so it does not drift away", "At the bow", "Board on deck and wait for the boat to sink"]],
    [11, "Marlinespike", "What is the purpose of knot H in diagram D030DG?", [
      "To form a loop at the end of a line.", "To keep the rope end from unwinding", "To secure fenders to the rail", "To bend together 2 lines of different diameter"], { bookDiagram: "D030DG" }],
    [12, "Weather", "What is Standard Barometric Pressure?", [
      "30.6 inches of mercury", "1082 millibars", "156.800 millibars", "29.92 inches of mercury"]],
    [13, "Towing", "A flounder plate", [
      "Is a triangular metal plate for attaching the legs of a towing bridle to the tow pendant.", "Is used to keep the boat from floundering.", "Has a quick release to protect the towing vessel from being overrun.", "Aids in surge load reduction."]],
    [14, "Weather", "Wind direction that is changing from a North wind to a Northwest is a", [
      "Veering wind.", "Clocking wind.", "Apparent wind", "Backing wind"]],
    [15, "Rigging", "A gooseneck allows the boom to", [
      "Extend out from the mast.", "Rotate on its own axis.", "Move up and down and side to side", "Disconnect easily from the mast"]],
    [16, "Regulations", "When may the Coast Guard board an uninspected vessel?", [
      "Any time.", "When the vessel is in violation of any rules contained in the CFR", "When the crew is in danger of sinking", "When the vessel is not in radio contact for more than 6 hours"]],
    [17, "Regulations", "MSD stands for", [
      "Maritime Safety Display", "Marine Security Detachment", "Mobile Sea Dredge", "Marine sanitation device"]],
    [18, "Mooring", "In Diagram D044DG Line F is a", [
      "Bow line", "Spring line", "Breast line", "Extra line"], { bookDiagram: "D044DG" }],
    [19, "Weather", "What prefix is given to high clouds above 20,000 Ft?", [
      "Cirro", "Alto", "Cumulo", "Nimbo"]],
    [20, "Stability", "Which is the plimsoll mark on Diagram D003DG", [
      "F", "C", "D", "G"], { bookDiagram: "D003DG" }],
    [21, "Ground tackle", "A windlass with a horizontal drum is called a", [
      "Plain windlass", "Gypsy", "Capstan", "Anchor retriever"]],
    [22, "Shiphandling", "On a twin engine vessel, to tighten the turn radius for a turn to port", [
      "Increase thrust on the port engine", "Decrease the thrust on the starboard engine", "Straighten the rudder", "Decrease thrust on the port engine"]],
    [23, "Rigging", "What is the mechanical advantage for #4 in Diagram D029DG", [
      "4", "5", "3", "No mechanical advantage"], { bookDiagram: "D029DG" }],
    [24, "Weather", "When isobars form a closed loop around a low pressure system, the system is called a", [
      "Tornado", "Looper", "Anticyclone", "Cyclone"]],
    [25, "Communications", "Marine VHF uses what type of modulation?", [
      "Amplitude Modulation", "Frequency Modulation", "Sine Modulation", "Tangential Modulation"]],
    [26, "Ground tackle", "To attempt to stop your anchor from dragging in strong wind", [
      "Shorten your scope", "Back on the anchor to try to set it better", "Let it drag until it catches on something", "Let out more scope"]],
    [27, "Communications", "What is the Emergency and Hailing frequency for SSB?", [
      "2992 kHz", "1030 kHz", "1223 kHz", "2182 kHz"]],
    [28, "Firefighting", "What is the best agent for extinguishing a type A fire?", [
      "Water", "Foam", "Carbon dioxide", "Dry Powder"]],
    [29, "Pollution", "Which statement is true about an accidental spill of gasoline into the water?", [
      "It will all evaporate and does not need to be cleaned up.", "If the spill is small, there is no need to report it.", "You should disperse it with dish soap.", "Always report the spill"]],
    [30, "Marlinespike", "Which splice is preferred when the strength of the line is critical?", [
      "Long Splice", "Crimp Splice", "Short Splice", "Square Knot"]],
    [31, "Weather", "A rapidly changing barometer indicates", [
      "Calm Winds", "Light Winds", "Strong Winds", "Precipitation"]],
    [32, "Regulations", "When must the holder of a valid Motorboat Operator's License make it available?", [
      "At all times when he is operating a motorboat.", "Any time when requested by a certified MMB.", "At all times when he is operating a vessel which is carrying passengers for hire.", "Only when underway."]],
    [33, "Ground tackle", "A weight that is suspended from the rode to help keep the pull on the anchor horizontal is a", [
      "Catenary", "Century", "Sentinel", "Drouge"]],
    [34, "Survival craft", "Hand holds or straps on the underside of an inflatable life raft are provided", [
      "To right the raft if it capsizes.", "To carry the raft around deck.", "For crewmen to hang onto.", "To hang the raft for drying."]],
    [35, "Mooring", "A mooring line that prevents a boat from moving sideways away from the dock is a", [
      "Bow Line", "Spring Line", "Stern Line", "Breast Line"]],
    [36, "Ground tackle", "The ratio of the length of the rode to the depth of the water is called the", [
      "Catenary", "Scope", "Anchoring Coefficient", "Angle of the Dangle"]],
    [37, "Stability", "A vessel floating in salt water will", [
      "Float higher than in fresh water.", "Float lower than in fresh water.", "Have more load lines that a vessel in fresh water.", "Be able to carry less cargo than in fresh water."]],
    [38, "Firefighting", "How much oxygen is needed to support combustion?", [
      "16%", "21%", "3%", "10%"]],
    [39, "Stability", "A vertical line drawn from the Center of Buoyancy at different angles of heel will intersect at a point called the", [
      "Righting Arm", "Metacenter", "Point of roll", "Center of Gravity"]],
    [40, "Lifesaving equipment", "Motor vessels carrying passengers for hire must carry one of which of these approved lifesaving devices for each person aboard?", [
      "Buoyant cushion", "Life preserver", "Ring Buoy", "Buoyant Vest"]],
    [41, "Marlinespike", "A line made up of small stuff used to toss a coiled line is a", [
      "Messenger", "Heaving line", "Monkey's fist", "Retriever"]],
    [42, "Shiphandling", "The greatest influence of \"prop walk\" occurs when the vessel", [
      "Is turning", "Has reached desired speed", "Initially is put in gear and diminishes as speed increases", "Is taken out of gear and rudder is applied"]],
    [43, "Stability", "When a force is applied to a ball, so it begins to roll and then keeps rolling, It is said to have", [
      "Neutral Stability", "Positive Stability", "Negative Stability", "A range of Stability"]],
    [44, "Rigging", "Rigging that holds up a mast from side to side is", [
      "Running rigging", "Stays", "Runners", "Shrouds"]],
    [45, "Shiphandling", "A wedge of water building up between the bow and the nearer bank which forces the bow out and away describes", [
      "Bank cushion", "Bank suction", "Combined effect", "Bank deposit"]],
    [46, "Communications", "An advantage of a 406 MHz EPIRB over first generation units is", [
      "They transmit a unique registration number for identification", "The distress signals are stored by the satellite for retransmission", "They have a dedicated frequency free from interference from other communications", "All of the Above"]],
    [47, "Man overboard", "You are at the helm when you hear a crew member yell \"man overboard starboard\". You should", [
      "Give full right rudder", "Give full left rudder", "Put the rudder amidships", "Throw a life ring to mark the spot"]],
    [48, "Engineering", "Before starting a marine diesel or gasoline engine, which of the following must be checked?", [
      "Flow of cooling water", "Exhaust discharge", "Oil level", "All of the Above"]],
    [49, "Heavy weather", "To reduce \"pounding\" you should", [
      "Speed up", "Maneuver to port", "Maneuver to starboard", "Slow down and quarter the waves"]],
    [50, "Mooring", "When attaching your dock line to a shared cleat that is already being used, you should", [
      "Untie the other boat", "Attach your line on top", "Dip your line under existing line", "Use your anchor"]],
  ];
  addSection({
    id: "deck-general-1",
    subject: "deck-general",
    title: "Practice Deck General Exam",
    questions: Q.map(([n, topic, text, choices, flags]) => [n, topic, text, choices, window.DECK_GENERAL_KEY[n - 1], flags || {}]),
  });
})();

window.QUESTION_TIPS = window.QUESTION_TIPS || {};
Object.assign(window.QUESTION_TIPS, {
  "deck-general-1-1": "33 CFR Subchapter O = pOllution (oil and hazardous material spills, MSDs, garbage).",
  "deck-general-1-2": "AIS broadcasts identity, position (lat/long), course, speed, heading, navigational status and a UTC time stamp. Engine RPM isn't sent.",
  "deck-general-1-3": "Squat: in shallow water the water under the hull speeds up, pressure drops, and the stern is sucked down. Slow down to reduce it.",
  "deck-general-1-4": "Channel 70 is DIGITAL ONLY (DSC). Voice is never allowed on it.",
  "deck-general-1-5": "The stripper is a guide that peels the chain off the wildcat (gypsy) so it drops cleanly into the chain locker instead of wrapping around.",
  "deck-general-1-6": "Bowline = the 'king of knots': a fixed loop at the end of a line that won't slip and still unties easily after a heavy load.",
  "deck-general-1-7": "In step = tug and tow ride the same part of the wave at the same time (both on crests or both in troughs), so the towline doesn't snap tight.",
  "deck-general-1-8": "A right-hand prop in reverse walks the stern to PORT (and the bow swings to starboard).",
  "deck-general-1-9": "The sag (catenary) in a towline acts like a spring: it straightens out under a surge instead of snapping.",
  "deck-general-1-10": "Launch on the LEE side where the deck is closest to the water. The ship shelters the raft from wind and seas.",
  "deck-general-1-11": "Joining two lines of DIFFERENT diameters = sheet bend. Same diameter = square knot (reef knot).",
  "deck-general-1-12": "Standard sea-level pressure = 29.92 inches of mercury = 1013.25 millibars.",
  "deck-general-1-13": "A flounder plate is a triangular plate: the two bridle legs attach to two corners and the towline (pendant) to the third.",
  "deck-general-1-14": "North to Northwest is COUNTERCLOCKWISE = backing. Clockwise (N to NE) = veering.",
  "deck-general-1-15": "The gooseneck is a universal joint at the mast, so the boom can swing side to side and tilt up and down.",
  "deck-general-1-16": "The Coast Guard may board any U.S. vessel at ANY time to check safety and compliance; no suspicion is needed.",
  "deck-general-1-17": "MSD = Marine Sanitation Device, the onboard toilet treatment or holding system regulated under Subchapter O.",
  "deck-general-1-18": "Breast lines run straight out (perpendicular) from the boat to the dock and hold her in against it. Springs run diagonally fore and aft.",
  "deck-general-1-19": "Cirro = high (above 20,000 ft). Alto = middle. Strato/cumulo = low. Nimbo = rain-bearing.",
  "deck-general-1-20": "The Plimsoll mark is the circle with the horizontal line through it: the summer load line in salt water.",
  "deck-general-1-21": "Book answer: Gypsy. The gypsy (wildcat) is the windlass drum on a HORIZONTAL shaft; a capstan turns on a VERTICAL shaft.",
  "deck-general-1-22": "To turn tighter to port, slow the INSIDE (port) engine or back it down; the starboard engine pushes the stern around.",
  "deck-general-1-23": "Mechanical advantage = the number of rope parts supporting the moving block. Count the lines at the moving block in the diagram.",
  "deck-general-1-24": "Closed isobars around a LOW = cyclone (counterclockwise in the N. Hemisphere). Around a HIGH = anticyclone.",
  "deck-general-1-25": "VHF uses FM (frequency modulation), which is why it's clear but line-of-sight. AM is used on SSB/MF.",
  "deck-general-1-26": "Dragging? Let out more SCOPE so the pull is more horizontal and the anchor digs in. Shortening scope makes it worse.",
  "deck-general-1-27": "2182 kHz = SSB (MF) distress and calling. VHF equivalent is Channel 16.",
  "deck-general-1-28": "Class A (ordinary combustibles like wood, paper, cloth) = WATER, which cools and soaks in.",
  "deck-general-1-29": "ALWAYS report a spill of oil or fuel to the National Response Center. Never use soap or dispersants.",
  "deck-general-1-30": "Short splice: strongest, but makes the line thicker. Long splice: slightly weaker but stays thin to run through blocks. Book key: short splice for strength.",
  "deck-general-1-31": "A barometer moving fast (up or down) means a big pressure difference nearby = STRONG winds.",
  "deck-general-1-32": "Your license must be available whenever you're operating a vessel carrying passengers for hire.",
  "deck-general-1-33": "A sentinel (kellet) is a weight slid down the rode to lower the angle of pull, so the anchor holds better.",
  "deck-general-1-34": "Righting straps on the bottom let you climb onto a capsized raft and flip it back over.",
  "deck-general-1-35": "Breast line = perpendicular to the dock, stops sideways movement away from it.",
  "deck-general-1-36": "Scope = length of rode ÷ depth of water (measured from the bow roller to the bottom). 5:1 to 7:1 is typical.",
  "deck-general-1-37": "Salt water is denser, so a vessel floats HIGHER in salt water than in fresh water. That's why there's a fresh water load line.",
  "deck-general-1-38": "Fire needs at least about 16% oxygen. Air is 21%, so smothering only has to bring it down a little.",
  "deck-general-1-39": "The metacenter (M) is where vertical lines through the center of buoyancy meet at small angles of heel. GM = metacentric height.",
  "deck-general-1-40": "Passenger vessels need a wearable life preserver (Type I PFD) for every person aboard.",
  "deck-general-1-41": "A heaving line is light line (small stuff) thrown first; the heavy line is then pulled across with it. The weighted knot on the end is a monkey's fist.",
  "deck-general-1-42": "Prop walk is strongest when the prop first bites at low speed, especially in reverse. Water flow over the rudder overcomes it as speed builds.",
  "deck-general-1-43": "Neutral stability = it stays wherever it's pushed (G and M in the same place). Positive = returns upright. Negative = keeps going over.",
  "deck-general-1-44": "Shrouds = side-to-side support. Stays = fore and aft support. Both are standing rigging.",
  "deck-general-1-45": "Bank CUSHION pushes the BOW away from the bank; bank SUCTION pulls the STERN toward it.",
  "deck-general-1-46": "406 MHz EPIRBs send a unique registered ID, satellites store and forward the alert, and the frequency is dedicated. All of the above.",
  "deck-general-1-47": "Person over the STARBOARD side: turn the rudder to STARBOARD (right) so the stern and prop swing AWAY from them.",
  "deck-general-1-48": "Book answer: oil level, checked before starting. Cooling water flow and exhaust are checked after the engine is running.",
  "deck-general-1-49": "Pounding (the bow slamming into waves): slow down and take the seas at an angle on the bow (quartering).",
  "deck-general-1-50": "Dip your line: pass your eye up through the other boat's eye before dropping it on the cleat, so either line can come off without disturbing the other.",
});

Object.assign(window.MNEMONICS = window.MNEMONICS || {}, {
  dg_regs: ["Regulations", "\"Subchapter O is for Oil (pOllution). The Coast Guard boards Any time.\"", "33 CFR Subchapter O covers pollution and MSDs. USCG boarding needs no reason. Keep your license handy when carrying passengers for hire."],
  dg_radio: ["Radio frequencies", "\"16 to talk, 70 to click, 2182 on the SSB. VHF is FM.\"", "Ch 16 voice distress, Ch 70 DSC data only, 2182 kHz SSB distress. VHF uses frequency modulation."],
  dg_anchor: ["Anchoring", "\"Dragging? Pay out, don't pull in.\"", "More scope makes the pull horizontal. Scope = rode ÷ depth. A sentinel (kellet) weight lowers the angle."],
  dg_windlass: ["Windlass parts", "\"Gypsy grips, Stripper strips, Devil's claw holds.\"", "The gypsy/wildcat grips the chain links, the stripper peels chain off it, the devil's claw locks the chain."],
  dg_knots: ["Knots and splices", "\"Bowline = loop that won't slip. Sheet bend = Size different. Square = Same.\"", "Bowline: fixed loop. Sheet bend: joins lines of different diameter. Square knot: same diameter. Short splice: strongest."],
  dg_towing: ["Towing", "\"Sag saves the line; Step saves the strain.\"", "Catenary (sag) absorbs surges. Keep tug and tow in step on the waves. A flounder plate joins the bridle legs to the pendant."],
  dg_propwalk: ["Prop walk", "\"Right-hand prop, reverse = stern walks to port. Strongest at the Start.\"", "Prop walk is greatest when the prop first engages and fades as speed and rudder flow build."],
  dg_twin: ["Twin screws", "\"Slow the inside engine to tighten the turn.\"", "Reduce or reverse the engine on the side you're turning toward."],
  dg_bank: ["Bank effect", "\"Cushion pushes the bow out, suction sucks the stern in.\"", "Near a bank, the bow is pushed away and the stern pulled toward it; slow down. In shallow water the stern squats."],
  dg_weather: ["Weather", "\"Cirrus is high, Alto is middle. Low = cyclone, High = anticyclone. Backing = counterclockwise.\"", "Standard pressure 29.92 inHg (1013 mb). A fast-changing barometer means strong winds."],
  dg_mooring: ["Dock lines", "\"Breast = straight out (sideways). Spring = diagonal (fore and aft). Dip under to share a cleat.\"", "Breast lines stop sideways movement; spring lines stop surging fore and aft."],
  dg_stability: ["Stability", "\"Salt floats you higher. M is where the buoyancy lines Meet. Positive returns, Neutral stays, Negative goes.\"", "Salt water is denser. Metacenter: intersection of vertical lines through the center of buoyancy. Plimsoll mark = summer salt-water load line."],
  dg_rigging: ["Rigging", "\"Shrouds Side to side, Stays fore and aft. Gooseneck lets the boom Go anywhere.\"", "Mechanical advantage = number of rope parts at the moving block."],
  dg_fire: ["Fire basics", "\"A = Ash, use water. Fire dies below 16% oxygen.\"", "Class A fires: water. Air is 21% oxygen; combustion needs about 16%."],
  dg_safety: ["Safety on deck", "\"Starboard overboard? Starboard rudder. Swing the stern away.\"", "Turn toward the side the person fell from to kick the prop away. Launch rafts on the lee side; right them with the bottom straps."],
  dg_misc: ["Seamanship odds and ends", "\"Report every spill. Check the oil before you start. Slow down to stop pounding.\"", "AIS sends position, heading, speed and UTC time. Heaving lines lead heavy lines."],
});
Object.assign(window.MNEMONIC_WHY = window.MNEMONIC_WHY || {}, {
  dg_regs: "Clear federal rules keep waters clean and let the Coast Guard enforce safety.",
  dg_radio: "Everyone using the same channels and modes means distress calls get heard.",
  dg_anchor: "An anchor holds by pulling sideways along the bottom; a steep pull breaks it out.",
  dg_windlass: "Controlling heavy chain safely prevents injuries and lost anchors.",
  dg_knots: "The right knot holds when it must and comes undone when you need it to.",
  dg_towing: "Shock loads part towlines; slack and timing absorb them.",
  dg_propwalk: "Knowing which way the stern kicks lets you dock and back with control.",
  dg_twin: "Using engine power on each side turns a vessel in its own length.",
  dg_bank: "Near banks and in shallows, water pressure changes can steer a ship into danger.",
  dg_weather: "Reading clouds and pressure gives warning before weather turns dangerous.",
  dg_mooring: "Each dock line stops a different movement, so the boat stays put without chafe.",
  dg_stability: "Understanding how a vessel floats keeps her loaded safely and upright.",
  dg_rigging: "Rigging supports masts and multiplies force so crews can handle heavy loads.",
  dg_fire: "Knowing what a fire needs tells you how to take it away.",
  dg_safety: "Quick, correct reactions keep people out of the propeller and in the raft.",
  dg_misc: "Good habits prevent pollution, engine damage and hull damage.",
});
(function () {
  const map = {
    1: "dg_regs", 2: "dg_misc", 3: "dg_bank", 4: "dg_radio", 5: "dg_windlass", 6: "dg_knots", 7: "dg_towing", 8: "dg_propwalk",
    9: "dg_towing", 10: "dg_safety", 11: "dg_knots", 12: "dg_weather", 13: "dg_towing", 14: "dg_weather", 15: "dg_rigging",
    16: "dg_regs", 17: "dg_regs", 18: "dg_mooring", 19: "dg_weather", 20: "dg_stability", 21: "dg_windlass", 22: "dg_twin",
    23: "dg_rigging", 24: "dg_weather", 25: "dg_radio", 26: "dg_anchor", 27: "dg_radio", 28: "dg_fire", 29: "dg_misc",
    30: "dg_knots", 31: "dg_weather", 32: "dg_regs", 33: "dg_anchor", 34: "dg_safety", 35: "dg_mooring", 36: "dg_anchor",
    37: "dg_stability", 38: "dg_fire", 39: "dg_stability", 40: "dg_safety", 41: "dg_knots", 42: "dg_propwalk",
    43: "dg_stability", 44: "dg_rigging", 45: "dg_bank", 46: "dg_radio", 47: "dg_safety", 48: "dg_misc", 49: "dg_misc", 50: "dg_mooring",
  };
  window.QUESTION_MNEMONIC = window.QUESTION_MNEMONIC || {};
  for (const [n, k] of Object.entries(map)) window.QUESTION_MNEMONIC["deck-general-1-" + n] = k;
})();
