// Deck Safety — U.S. Maritime Academy "Practice Deck Safety Exam" (book pages 179–187).
// Answers are from the book's answer key (page 189).
// Each question: [number, "topic", "Question text", ["A", "B", "C", "D"], "answer", {flags}]

const DS = {};

addSection({
  id: "deck-safety-1",
  subject: "deck-safety",
  title: "Practice Deck Safety Exam",
  questions: [
    [1, "Lifesaving equipment", "All Uninspected vessels, 26 ft. in length and over must have in addition to at least 1 wearable PFD per person,", [
      "at least 1 approved life ring, buoy", "at least 2 Type 5 PFDs per person", "appropriately sized swim caps", "a locking compartment for the PFDs"], "A", DS],
    [2, "Damage control", "Collision mats are", [
      "Large flat fenders", "Bulkhead patches", "Strong tarps, usually triangular with gromets at the corners", "Pads for sharp corners in the cabin"], "C", DS],
    [3, "Communications", "The Guarded Distress button (DSC) on a marine VHF radio", [
      "Sends an automatic May Day, May Day May Day over channel 16", "Is only used when the other stations fail", "Sends a message to satellites via 406 MHz", "Sends out a distress message on channel 70 with your MMSI number"], "D", DS],
    [4, "Stability", "To make a vessel less Tender", [
      "Make the Center of Gravity higher by moving cargo", "Move cargo to the port side to remove the list", "Make the Center of Gravity lower by moving cargo", "Leave the ship loaded as is because as you burn fuel it will become more stiff"], "C", DS],
    [5, "Heavy weather", "If your vessel's bow dives into trough of the next wave and flips, it has been", [
      "Pooped", "Quartered", "Foundered", "Pitch Polled"], "D", DS],
    [6, "Firefighting", "The best agent for an oil fire is", [
      "Water", "Foam", "CO2", "Dry Powder"], "B", DS],
    [7, "Survival craft", "Sealing Clamps on a life raft are used to", [
      "Reseal leftover food containers", "Repair tears in the ceiling of the raft", "Repair underwater holes in the buoyancy tubes", "Seal the entranceway flap in inclement weather"], "C", DS],
    [8, "Survival craft", "An advantage of the Gravity Davit for lifeboats is", [
      "There is no training required to use it", "The lifeboat can be launched even at high degrees of list", "It launches automatically", "It is simple to use and the lifeboat can be launched by 1 person"], "D", DS],
    [9, "Firefighting", "The 3 elements required for combustion are", [
      "Fuel, Oxygen and Light", "Heat, Fuel and Ignition", "Oxygen, Fuel and Heat", "Wind, Fuel and Oxygen"], "C", DS],
    [10, "Heavy weather", "Your vessel is broken down in heavy seas. To reduce the risk of capsizing", [
      "Lash the tiller to windward", "Shift weight to the stern", "Shift weight to the bow", "Rig a sea anchor"], "D", DS],
    [11, "Distress signals", "Distress signals may be", [
      "Code flags November Charlie", "High intensity white light flashing 50 to 70 times per minute (Inland Only)", "Foghorn sounding continuously", "All of the above"], "D", DS],
    [12, "Communications", "The distress frequency for marine VHF is", [
      "Channel 16", "Channel 9", "Channel 6", "Channel 22a"], "A", DS],
    [13, "Man overboard", "In a man overboard situation, the first person to see the victim points and calls out which side the person went over. His next job is", [
      "Go to the nearest life ring and throw it to the victim", "Get on the radio and issue a May Day", "Radio a Pan Pan", "He has no other responsibility. He keeps his eyes on the person in the water"], "D", DS],
    [14, "Stability", "When weight is added to a floating vessel, the center of gravity will", [
      "Shift toward the added weight", "Not be affected", "Pass the tipping point", "Increase the reserve buoyancy."], "A", DS],
    [15, "Communications", "Who is responsible to determine whether an onboard incident is Distress, Urgency or Safety?", [
      "The radio operator", "The first mate", "Anyone with knowledge of the incident", "The Master of the vessel"], "D", DS],
    [16, "Firefighting", "The elements of the fire Tetrahedron are Fuel, Heat, Oxygen and", [
      "Surface Effect", "Friction", "Chemical Reaction", "Vapor Barrier"], "C", DS],
    [17, "Lifesaving equipment", "These passengers should always wear a PFD on a small boat", [
      "Non-Swimmers", "Handicapped", "Anyone in a Cast", "All of the Above"], "D", DS],
    [18, "Damage control", "Bungs are used to", [
      "Strap extra flotation devices on to the life raft", "Repair holes in an inflatable raft", "Seal Port hole gaskets", "Plug failed thru hull fittings below the water line in a vessel."], "D", DS],
    [19, "Hazards", "Floating objects at or near the waterline that pose a risk to navigation are called", [
      "Flotsam", "Deadheads", "Pollution", "Head Knockers"], "B", DS],
    [20, "Survival craft", "Where is the best place to launch a life raft in heavy weather?", [
      "Windward at the stern", "Dead ahead off the bow", "Astern", "Leeward and amidships."], "D", DS],
    [21, "Ground tackle", "The device used to secure an anchor chain and relieve the load on the gypsy is", [
      "Riding Pawl", "Devils Claw", "Boom Vang", "Preventer Guy"], "B", DS],
    [22, "Stability", "The 3 axis of rotation of a vessel are", [
      "Pitch, Roll and Longitudinal", "Pitch, Yaw and Thrust", "Pitch Yaw and Squat", "Pitch, Roll and Yaw"], "D", DS],
    [23, "Towing", "In an emergency, where a towing vessel is in danger of being overrun, you should", [
      "Slip the tow from the towing vessel", "Take in as much of the hawser as possible", "Use boat hooks to fend off the overrunning vessel", "Transfer as many fenders as possible to the bow of the tow"], "A", DS],
    [24, "Stability", "When the Bow and Stern are on the crest of waves and amidships is over a trough, the vessel is", [
      "Hogging", "Stretching", "Sagging", "Broaching"], "C", DS],
    [25, "Stability", "A vessel with a low Metacentric height is said to be", [
      "Tender", "Stiff", "Listing", "Heeling"], "A", DS],
    [26, "Fire prevention", "Where should you store portable jerry cans of motor fuel?", [
      "In a cool area below deck", "Near the engine", "In the cabin away from sleeping and cooking areas", "On deck"], "D", DS],
    [27, "Firefighting", "Which fire extinguishing agent has the greatest capacity for heat absorption?", [
      "Carbon Dioxide", "Dry Chemical", "Foam", "Water"], "D", DS],
    [28, "Communications", "If an EPIRB is required to be carried onboard, how frequently should it be tested?", [
      "Weekly", "Monthly", "Annually", "According to the manufacture's specifications"], "B", DS],
    [29, "Fire prevention", "Upon completion of fueling a gasoline driven vessel, it is necessary to", [
      "Keep ports, door, window and hatches closed", "Start engines immediately", "Ventilate for 5 minutes before starting the engine", "None of the above"], "C", DS],
    [30, "Firefighting", "An example of a Class C fire is", [
      "Burning Fuel", "Burning cardboard", "Emergency flare", "Electrical Fire"], "D", DS],
    [31, "Firefighting", "When the fire alarm sounds in an enclosed engine compartment, you should", [
      "Hold your breath until the CO2 dissipates", "Exit the area before the CO2 is released", "Use a portable CO2 extinguisher until the fixed system deploys", "Inflate your PFD so you will float in the compartment"], "B", DS],
    [32, "Damage control", "Your vessel is damaged and is partially flooded. The first step to be taken in attempting to save the vessel is to", [
      "Establish flooding boundaries and prevent further spread of the flood water", "Plug holes in the outer shell", "Pump out the water inside the vessel", "Calculate the free surface effect and lost buoyancy to determine the vessel's stability"], "A", DS],
    [33, "Communications", "Once any EPIRB is activated, it should be", [
      "Turned off every 20 minutes", "Tested with the ship's VHF", "Placed in the float free position", "Left on continuously"], "D", DS],
    [34, "Heavy weather", "You are in the Northern Hemisphere in the path of a hurricane. You observe the wind change and determine that it is backing. You are probably", [
      "In the navigable semicircle", "In the eye of the storm", "Experiencing a change in the direction of the storm track", "In the dangerous semicircle"], "A", DS],
    [35, "Fire prevention", "Gasoline fumes tend to", [
      "Settle evenly throughout all levels of the bilge by mixing with air", "Settle near the top of the bilge", "Settle near the bottom of the bilge", "Disperse to atmosphere"], "C", DS],
    [36, "Survival craft", "The light on the outside of the canopy on an inflatable life raft operate", [
      "By turning the globe clockwise", "By a switch in the cabin", "By a light sensor", "Automatically when the raft is in the water"], "D", DS],
    [37, "Firefighting", "A disadvantage of a Dry Chemical extinguisher is", [
      "They don't work on class C fires", "They freeze the horn and may cause frostbite", "They allow flashback", "They leave a residue that is harmful to electronics"], "D", DS],
    [38, "Survival craft", "Inspected Vessels operated on the Great Lakes within 1 mile of shore must carry at least how many survival craft?", [
      "One per person", "None", "One for each 4 passengers", "One for each 5 passengers"], "B", DS],
    [39, "Communications", "SSB Emergency and Hailing frequency is", [
      "93.1 MHz", "2182 kHz", "Channel 16", "Channel 23A"], "B", DS],
    [40, "Survival craft", "What is the best position for a SART when activated?", [
      "On the floor of the raft", "As high as possible", "In the ditch bag", "On the mother ship"], "B", DS],
    [41, "Firefighting", "When fighting a fire in an enclosed area", [
      "Position yourself so that you always have an escape route", "Position yourself to push the fire out through the door", "Wear a PFD incase the room floods", "Position yourself so that others can find you"], "A", DS],
    [42, "Firefighting", "When you have a fire on deck,", [
      "Move cargo to create a list enough for water to flood the deck and extinguish the fire.", "Keep the fire on the windward side", "Maneuver the vessel so that the wind pushes the fire and smoke away from the vessel", "Always Abandon ship when it is on fire"], "C", DS],
    [43, "Survival craft", "On a SOLAS Life raft, the 100' Sea Painter", [
      "Is attached to the mother ship by a weak link", "Is permanently attached to the cradle of the raft mount", "Does not need to be attached", "Is recommended but not mandatory"], "A", DS],
    [44, "Heavy weather", "In heavy seas, to lessen the rolling motion", [
      "Take down all sails", "Run parallel to the waves", "Steer to go over the waves at an angle", "Don't worry about it, boats rarely roll over."], "C", DS],
    [45, "Rigging", "Hardware used to keep a line from fraying where it attaches to a chain is called a", [
      "Anti-Fray spoon", "Shackle", "Link", "Thimble"], "D", DS],
    [46, "Rigging", "A shackle with a wire safety to keep it from loosening is called", [
      "Wired", "Moused", "Flaked", "Crimped"], "B", DS],
    [47, "Towing", "What is the danger of bridle legs being of different lengths?", [
      "There will be more strain on the longer leg making it prone to breakage", "There will be more strain on the shorter leg making it prone to breakage", "The longer leg may tangle in the prop", "The Shorter leg may twist and roll the tow"], "B", DS],
    [48, "Stability", "Which statement is true in regard to stability?", [
      "The wider the vessel the greater range of stability it will have", "The narrower the vessel the greater the range of stability it will have", "A wider vessel will be less stable", "Width has nothing to do with range of stability"], "A", DS],
    [49, "Stability", "Heel is", [
      "The inclination of a ship due to an internal force", "The inclination of a ship due to placement to the cargo", "The inclination of a ship due to an external force", "The pitch angle of a ship due to an external force"], "C", DS],
    [50, "Stability", "Loll is", [
      "Laugh out Loud", "The pitch attitude of the ship", "The roll attitude of the ship", "A state of unstable equilibrium, where when inclined by an external force she tends to remain at the same angle of heel"], "D", DS],
  ]
});

// Remember tips, written for each question.
window.QUESTION_TIPS = window.QUESTION_TIPS || {};
Object.assign(window.QUESTION_TIPS, {
  "deck-safety-1-1": "Boats 26 ft and up need a THROWABLE (a ring buoy or Type IV cushion) on top of one wearable PFD per person. You can't throw a life jacket someone is wearing.",
  "deck-safety-1-2": "A collision mat is a heavy canvas sheet with grommets and lines at the corners, hauled over a hole from OUTSIDE the hull so water pressure holds it on.",
  "deck-safety-1-3": "The red DSC distress button sends an automatic digital MAYDAY on Channel 70 with your MMSI (and GPS position if connected). Then talk on 16.",
  "deck-safety-1-4": "Tender = rolls slowly and easily because the center of gravity is too high. Lower the weight to make her stiffer.",
  "deck-safety-1-5": "Pitch-poling = flipping END over END: the bow digs into the trough and the stern goes over the top.",
  "deck-safety-1-6": "Oil and fuel fires are Class B. Foam smothers them by blanketing the surface. Water spreads burning oil.",
  "deck-safety-1-7": "Sealing clamps fit through a hole in a buoyancy tube and screw down to seal it, even below the waterline. Small holes above water use patches.",
  "deck-safety-1-8": "Gravity davits use the boat's own weight to swing out and lower it: one person releases the brake and the boat lowers itself. (They also work with a list, but the book's answer is simplicity.)",
  "deck-safety-1-9": "Fire triangle: OXYGEN, FUEL, HEAT. Take any one away and the fire goes out.",
  "deck-safety-1-10": "A sea anchor (drogue) holds the bow into the seas so a disabled boat doesn't lie beam-on and roll over.",
  "deck-safety-1-11": "All three are distress signals. N over C flags and a continuous foghorn are international; the 50–70 flash white strobe is Inland only.",
  "deck-safety-1-12": "VHF Channel 16 (156.8 MHz) = distress, safety and calling. Channel 70 = DSC digital, Channel 22A = Coast Guard working channel.",
  "deck-safety-1-13": "The spotter's ONLY job is to keep eyes and a pointing arm on the person. Lose sight of them and you may never find them again.",
  "deck-safety-1-14": "The center of gravity always moves TOWARD weight that's added (and away from weight that's removed).",
  "deck-safety-1-15": "The MASTER decides if it's distress (MAYDAY), urgency (PAN-PAN) or safety (SECURITE). The master is responsible for the vessel.",
  "deck-safety-1-16": "The fire tetrahedron adds the CHEMICAL CHAIN REACTION to fuel, heat and oxygen. Dry chemical and Halon agents work by breaking the chain.",
  "deck-safety-1-17": "Anyone at higher risk in the water (non-swimmers, handicapped, anyone in a cast) should wear a PFD at all times.",
  "deck-safety-1-18": "Bungs are tapered wooden plugs, kept near each through-hull, to hammer into a failed fitting below the waterline.",
  "deck-safety-1-19": "Deadheads are waterlogged logs floating at or just below the surface, often upright. Hard to see, easy to hit.",
  "deck-safety-1-20": "Launch on the LEE side (sheltered from wind and seas) and AMIDSHIPS (least motion, away from the propeller).",
  "deck-safety-1-21": "A devil's claw is a two-pronged hook that grabs a chain link to hold the anchor chain and take strain off the windlass gypsy.",
  "deck-safety-1-22": "Pitch (bow up and down), Roll (side to side), Yaw (bow swinging left and right).",
  "deck-safety-1-23": "If the tow is about to overrun the tug, release (slip) the tow before the tug gets girded and capsized.",
  "deck-safety-1-24": "Ends supported, middle unsupported = SAGGING (the middle sags down). Middle supported, ends hanging = hogging.",
  "deck-safety-1-25": "Low GM = TENDER (slow, lazy roll). High GM = STIFF (quick, snappy roll).",
  "deck-safety-1-26": "Spare gasoline goes ON DECK, where any leaking vapor blows away instead of collecting below.",
  "deck-safety-1-27": "Water absorbs more heat than any other agent, which is why it's the best cooling agent (for Class A fires).",
  "deck-safety-1-28": "Run the EPIRB's self-test MONTHLY, and check the battery and hydrostatic release expiration dates.",
  "deck-safety-1-29": "After fueling, open up and run the blower for at least 4–5 minutes and sniff the bilge before starting. Gas vapor explodes.",
  "deck-safety-1-30": "Class A = Ash (wood, paper). B = Barrel (fuel, oil). C = Current (electrical). D = Dynamite-like metals.",
  "deck-safety-1-31": "A fixed CO2 alarm means CO2 is coming that will suffocate you. Get out and count heads before it's released.",
  "deck-safety-1-32": "First CONTAIN the flooding (close watertight doors, shore boundaries), then plug holes and pump.",
  "deck-safety-1-33": "Once activated, leave the EPIRB ON. Satellites need a steady signal to fix your position and rescuers home in on it.",
  "deck-safety-1-34": "Northern Hemisphere: wind BACKING (shifting counterclockwise) = you're in the NAVIGABLE (left) semicircle. Veering = dangerous semicircle.",
  "deck-safety-1-35": "Gasoline vapor is HEAVIER than air, so it sinks and collects at the bottom of the bilge.",
  "deck-safety-1-36": "The canopy light has a water-activated battery: it turns on automatically when the raft hits the water.",
  "deck-safety-1-37": "Dry chemical powder is corrosive and leaves a residue that damages electronics. CO2 leaves no residue.",
  "deck-safety-1-38": "Small passenger vessels on lakes, bays and sounds within 1 mile of shore aren't required to carry survival craft.",
  "deck-safety-1-39": "2182 kHz = the SSB (MF) distress and calling frequency. VHF equivalent is Channel 16.",
  "deck-safety-1-40": "A SART is a radar target, and radar range depends on height. Hold or mount it as HIGH as possible (at least 1 m).",
  "deck-safety-1-41": "Always keep an escape route behind you. Never let the fire get between you and the way out.",
  "deck-safety-1-42": "Turn the vessel so the wind blows the fire and smoke OVER THE SIDE, away from the rest of the ship and the firefighters.",
  "deck-safety-1-43": "The painter is tied to the ship through a WEAK LINK, so it pulls the raft open but breaks free if the ship sinks.",
  "deck-safety-1-44": "Take the seas at an angle (not beam-on) to cut down rolling. Running parallel to the troughs makes it worse.",
  "deck-safety-1-45": "A thimble is a metal eye fitted inside a line's loop to protect it from chafing where it meets chain or a shackle.",
  "deck-safety-1-46": "Mousing = wiring the shackle pin to the shackle body so it can't unscrew.",
  "deck-safety-1-47": "The SHORTER bridle leg takes most of the load, so it breaks first. Keep both legs equal.",
  "deck-safety-1-48": "More beam = more stability. A wide, shallow boat resists heeling better than a narrow one.",
  "deck-safety-1-49": "HEEL comes from an EXTERNAL force (wind, waves, turning). LIST comes from an INTERNAL cause (uneven cargo or fuel).",
  "deck-safety-1-50": "Loll: a vessel with negative GM flops to one side and hangs there, or flops to the other. Lowering the center of gravity is the fix.",
});

// A few memory devices for this subject, shown with the Remember tip.
Object.assign(window.MNEMONICS = window.MNEMONICS || {}, {
  ds_fireclass: ["Fire classes", "\"A = Ash, B = Barrel, C = Current, D = Dynamite metals.\"", "Class A: ordinary combustibles. B: flammable liquids. C: energized electrical. D: combustible metals."],
  ds_firetri: ["Fire triangle and tetrahedron", "\"FHO + chain: Fuel, Heat, Oxygen, and the Chain reaction.\"", "Remove any side and the fire dies: starve the fuel, cool the heat, smother the oxygen, or break the chain."],
  ds_agents: ["Extinguishing agents", "\"Water Cools, Foam Covers, CO2 Chokes, Powder Breaks the chain.\"", "Water for A, foam for B, CO2 for B/C (no residue), dry chemical for B/C (leaves residue)."],
  ds_tender: ["Tender vs stiff", "\"Tender is Top-heavy; Stiff is Sturdy and Snappy.\"", "Low GM = tender, slow roll. High GM = stiff, quick roll. Lower the weight to fix tender."],
  ds_hogsag: ["Hogging vs sagging", "\"A hog's BACK humps up; a SAG drops in the middle.\"", "Hogging: crest amidships, ends hang. Sagging: crests at the ends, middle in the trough."],
  ds_heellist: ["Heel, list, loll", "\"Heel = Huffing wind (outside). List = Load (inside). Loll = Lazy flop (no GM).\"", "Heel: external force. List: internal weight. Loll: negative GM, she hangs over to one side."],
  ds_radio: ["Distress radio", "\"16 to talk, 70 to click, 2182 on the SSB.\"", "VHF Ch 16 voice distress, Ch 70 DSC distress button, 2182 kHz SSB distress. The master decides MAYDAY / PAN-PAN / SECURITE."],
  ds_epirb: ["EPIRB and SART", "\"EPIRB: test Monthly, leave it ON. SART: hold it HIGH.\"", "EPIRBs self-test monthly and stay on once activated. SARTs are radar transponders, so height means range."],
  ds_raft: ["Life rafts", "\"Leeward, amidships, weak link, light comes on by itself.\"", "Launch to leeward amidships. Painter tied via a weak link. Canopy light is water-activated. Sealing clamps fix tube holes."],
  ds_gas: ["Gasoline vapor", "\"Gas vapor sinks: sniff low, blow it out, fuel on deck.\"", "Vapor is heavier than air, collects in the bilge. Run the blower after fueling. Store spare fuel on deck."],
  ds_mob: ["Man overboard", "\"Shout, Point, Never look away.\"", "The spotter calls the side, points, and keeps eyes on the person. Others throw flotation and maneuver."],
  ds_heavy: ["Heavy weather", "\"Bow to the seas, never beam-on.\"", "A sea anchor keeps a disabled boat's bow into the waves; take seas at an angle to reduce rolling."],
  ds_damage: ["Flooding", "\"Contain, Plug, Pump.\"", "Set flooding boundaries first, then plug holes (bungs, collision mats), then pump."],
  ds_rigging: ["Rigging hardware", "\"Thimble Toughens the eye; Mousing Makes the pin stay.\"", "Thimble protects a line's eye from chafe; mousing wires a shackle pin; a devil's claw grabs anchor chain."],
  ds_axes: ["Ship motions", "\"Pitch, Roll, Yaw: nod yes, tilt maybe, shake no.\"", "Pitch = nodding, roll = tilting side to side, yaw = shaking your head."],
  ds_storm: ["Hurricanes (N. Hemisphere)", "\"Backing = Better (navigable). Veering = Very dangerous.\"", "Wind shifting counterclockwise means the navigable semicircle; clockwise means the dangerous one."],
  ds_tow: ["Towing emergencies", "\"Shorter leg, stronger strain. About to be overrun? Let it go.\"", "Unequal bridle legs overload the short one. Slip the tow before it overruns and capsizes the tug."],
});
Object.assign(window.MNEMONIC_WHY = window.MNEMONIC_WHY || {}, {
  ds_fireclass: "Each class needs a different agent; the wrong one can spread the fire or electrocute you.",
  ds_firetri: "Knowing what a fire needs tells you exactly how to take it away.",
  ds_agents: "Using the right agent puts the fire out fastest without making things worse.",
  ds_tender: "Where weight sits decides whether a boat rights itself or rolls over.",
  ds_hogsag: "Waves bend a hull; knowing how helps prevent structural failure.",
  ds_heellist: "Telling an outside force from an inside weight problem tells you how to correct it.",
  ds_radio: "Clear, standard distress channels get help to you fast.",
  ds_epirb: "Rescue beacons only work if they're tested, left on and placed where they can be detected.",
  ds_raft: "A raft that launches and lights itself saves lives when there's no time.",
  ds_gas: "Gas vapor that collects in a bilge can explode with one spark.",
  ds_mob: "A person in the water disappears in seconds; one set of eyes on them is the lifeline.",
  ds_heavy: "A boat lying beam-on to big seas can roll over.",
  ds_damage: "Stopping water from spreading saves buoyancy and stability first.",
  ds_rigging: "Small hardware failures drop loads and part lines; the right fitting prevents it.",
  ds_axes: "Naming the motions lets crews describe and handle how a ship moves.",
  ds_storm: "Knowing your side of a hurricane tells you which way to run.",
  ds_tow: "A tow that overruns or a bridle that breaks can sink the tug.",
});
(function () {
  const map = {
    1: "ds_raft", 2: "ds_damage", 3: "ds_radio", 4: "ds_tender", 5: "ds_heavy", 6: "ds_agents", 7: "ds_raft", 8: "ds_raft",
    9: "ds_firetri", 10: "ds_heavy", 11: "ds_radio", 12: "ds_radio", 13: "ds_mob", 14: "ds_tender", 15: "ds_radio",
    16: "ds_firetri", 17: "ds_mob", 18: "ds_damage", 19: "ds_heavy", 20: "ds_raft", 21: "ds_rigging", 22: "ds_axes",
    23: "ds_tow", 24: "ds_hogsag", 25: "ds_tender", 26: "ds_gas", 27: "ds_agents", 28: "ds_epirb", 29: "ds_gas",
    30: "ds_fireclass", 31: "ds_agents", 32: "ds_damage", 33: "ds_epirb", 34: "ds_storm", 35: "ds_gas", 36: "ds_raft",
    37: "ds_agents", 38: "ds_raft", 39: "ds_radio", 40: "ds_epirb", 41: "ds_firetri", 42: "ds_firetri", 43: "ds_raft",
    44: "ds_heavy", 45: "ds_rigging", 46: "ds_rigging", 47: "ds_tow", 48: "ds_tender", 49: "ds_heellist", 50: "ds_heellist",
  };
  window.QUESTION_MNEMONIC = window.QUESTION_MNEMONIC || {};
  for (const [n, k] of Object.entries(map)) window.QUESTION_MNEMONIC["deck-safety-1-" + n] = k;
})();
