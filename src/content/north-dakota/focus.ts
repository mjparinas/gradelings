// What each North Dakota course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the
// grade's main topics in North Dakota's 2023 math standards; English language arts lists reading, writing, speaking and
// listening, and language; science lists the grade's topics in North Dakota's 2019 science standards (built on the
// NGSS); social studies follows the grade themes of the North Dakota Social Studies Standards, with North Dakota studies
// in 4th and 8th grade as state law requires, and, for Grade 9, high school government and personal finance. Written in
// the app's house style; North Dakota families see it in US English.

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
  "9/math": MATH("high school algebra: expressions, equations, functions and quadratics"),

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

  "k/social": ["My family: rules, helpers and taking part", "Maps, our flag and North Dakota's symbols", "Needs and wants, and earning and saving"],
  "1/social": ["My school and community, and North Dakota then and now", "Maps, land and how people change it", "Community helpers, services, and earning and saving"],
  "2/social": ["Maps, globes, continents and oceans", "North Dakota communities: cities, towns, farms and reservations", "Producers and consumers, and citizens who make change"],
  "3/social": ["Maps and the geography of the United States", "The Midwest and the other regions", "How cities, states and the nation are governed"],
  "4/social": ["North Dakota's land, regions and tribal nations", "Explorers, settlers and statehood", "Governing North Dakota, its economy and symbols"],
  "5/social": ["United States geography, explorers and the thirteen colonies", "The road to revolution and the American Revolution", "The Constitution and the new nation"],
  "6/social": ["Early humans, the first farmers and river valley civilizations", "Greece, Rome, China, India and world beliefs", "Medieval Europe, the Islamic world, trade and the Renaissance"],
  "7/social": ["Geographic tools and world maps", "The regions of Latin America, Europe, Africa and Asia", "Population, migration, economies and trade"],
  "8/social": ["North Dakota studies: land, tribal nations, government and economy", "Settlers to today in North Dakota", "United States history from the Revolution to Reconstruction"],
  "9/social": ["Foundations of government and the Constitution", "Federal, state, tribal and local government, and civic life", "Elections, media, supply and demand, and personal finance"],
};
