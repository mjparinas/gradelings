// What each Maryland course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the grade's
// main topics from the 2025 Maryland mathematics standards with their reasoning strands; English language arts lists the
// four strands of the standards (reading, writing, speaking and listening, language); science lists the grade's Next
// Generation Science Standards topics; social studies follows MSDE's grade frameworks (Maryland's economy, land and
// government in Grade 3, colonial and revolutionary Maryland in Grade 4, the Civil War and civil rights in Grade 5,
// United States history in Grade 8 and American Government in Grade 9). Written in the app's house style; Maryland
// families see it in US English.

const MATH = (topics: string) => [
  `Number and operations: ${topics}`,
  "Geometry: shapes, angles and the space around us",
  "Measurement and data: measuring, collecting data and reading what it shows",
];

const ELA = (reading: string, writing: string) => [
  `Reading: ${reading}`,
  `Writing: ${writing}`,
  "Speaking and listening: sharing ideas and building on what others say",
  "Language: grammar, vocabulary and conventions",
];

export const FOCUS: Record<string, string[]> = {
  "k/math": MATH("counting to 100, numbers to 20, and adding and subtracting within 10"),
  "1/math": MATH("adding and subtracting within 20, place value to 120, and telling time"),
  "2/math": MATH("adding and subtracting within 1000, place value, money and time"),
  "3/math": MATH("multiplying and dividing within 100, and fractions as numbers"),
  "4/math": MATH("multi-digit multiplication and division, equivalent fractions, and decimals"),
  "5/math": MATH("operations with fractions and decimals, and volume"),
  "6/math": MATH("ratios and rates, negative numbers, and expressions"),
  "7/math": MATH("proportional relationships, integers, and equations"),
  "8/math": MATH("linear equations, functions, and the Pythagorean theorem"),
  "9/math": MATH("Algebra I: expressions, equations, functions and quadratics, with some geometry"),

  "k/language": ELA("letters, sounds and first words", "drawing and writing to share an idea"),
  "1/language": ELA("phonics, fluency and short texts", "writing sentences about a topic"),
  "2/language": ELA("reading with fluency and understanding stories", "writing to tell, explain and give an opinion"),
  "3/language": ELA("understanding chapter books and information texts", "organized paragraphs"),
  "4/language": ELA("text structure, theme and evidence", "opinion, information and story writing"),
  "5/language": ELA("comparing texts and points of view", "research and well-supported writing"),
  "6/language": ELA("analyzing arguments and sources", "argument writing with evidence"),
  "7/language": ELA("evaluating claims and media", "argument and research writing"),
  "8/language": ELA("analyzing how authors build meaning", "writing that weighs evidence and counterclaims"),
  "9/language": ELA("complex literature and information texts", "argument, analysis and research"),

  "k/science": ["Pushes and pulls", "Weather and climate", "What plants and animals need"],
  "1/science": ["Light and sound", "How plants and animals survive and grow", "Patterns of the sun, moon and stars"],
  "2/science": ["Properties of materials", "Plants, animals and their habitats", "How land changes, and where water is found"],
  "3/science": ["Forces and magnets", "Life cycles, traits and survival", "Weather and climate"],
  "4/science": ["Energy and waves", "How plant and animal structures work", "Rocks, erosion and Earth's processes"],
  "5/science": ["Matter and its changes", "Food webs and ecosystems", "Earth's systems, the sun and the stars"],
  "6/science": ["Energy, heat and weather", "Cells and living systems", "Climate and the water cycle"],
  "7/science": ["Atoms, mixtures and chemical reactions", "Ecosystems and the flow of energy", "Earth's surface and resources"],
  "8/science": ["Forces, motion and energy", "Heredity and natural selection", "Space systems and Earth's history"],
  "9/science": ["Living systems and ecosystems", "Matter, forces and energy", "Earth and human activity"],

  "k/social": ["Freedom, fairness, rules and compromise", "Where Maryland is, and the places around school", "Choices, trade, jobs and life long ago"],
  "1/social": ["Community, leaders and working together", "Maps of the neighborhood, and Maryland's symbols", "Trade, saving, borrowing and life long ago"],
  "2/social": ["The common good, democracy and good citizens", "Maps, globes and directions", "Producers, consumers, money and how communities change"],
  "3/social": ["Maryland at work: seafood, farms, the port and tourism", "The Chesapeake Bay, the land and the environment", "Local, state and national government, and early Maryland"],
  "4/social": ["Worlds collide: the Chesapeake, explorers and the Columbian Exchange", "The Maryland colony, and slavery in Maryland", "Maryland in the American Revolution"],
  "5/social": ["The Constitution and the Bill of Rights", "Slavery, the Civil War and Maryland", "Roads, rails and civil rights in Maryland and the nation"],
  "6/social": ["Geography as a tool for the past", "Early complex societies and their governments", "World religions and early trade"],
  "7/social": ["World history from about 600 to 1900", "Empires, trade and the movement of people and ideas", "Revolutions and new ideas about government"],
  "8/social": ["Colonial America, the Revolution and the Constitution", "The new nation, Maryland and the War of 1812", "Slavery, reform, the Civil War and Reconstruction"],
  "9/social": ["American Government: principles and branches", "Governing Maryland, the courts and your rights", "Government and the economy"],
};
