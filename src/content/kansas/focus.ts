// What each Kansas course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the grade's
// main topics in the Kansas Mathematics Standards with the standards' reasoning strands; English language arts lists
// reading, writing, speaking and listening, and the grammar, conventions and vocabulary the Kansas standards place in
// those strands; science lists the grade's topics in the Kansas science standards (the Next Generation Science
// Standards); social studies follows the grade's theme in the Kansas History, Government, and Social Studies Standards
// (a sense of self; the role of individuals; societies then and now; local and national communities; Kansas and the
// regions of the U.S.; U.S. history to 1789; the ancient world; global geography or Kansas history; U.S. history 1789 to
// 1898) and, for Grade 9, the Government of the United States course with economics and personal finance. Written in
// the app's house style; Kansas families see it in US English.

const MATH = (topics: string) => [
  `Number and operations: ${topics}`,
  "Geometry: shapes, angles and the space around us",
  "Measurement and data: measuring, collecting data and reading what it shows",
];

const ELA = (reading: string, writing: string) => [
  `Reading: ${reading}`,
  `Writing: ${writing}`,
  "Speaking and listening: sharing ideas and building on what others say",
  "Grammar, vocabulary and conventions, inside reading and writing",
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

  "k/social": ["A sense of self: me, my family and my school", "Rules, choices and their consequences, and good citizens", "Maps, symbols, and needs and wants"],
  "1/social": ["The role of individuals in our community, now and long ago", "Maps of our land and how it shapes our work", "Community helpers, rights and responsibilities, and local government"],
  "2/social": ["Societies then and now: leaders, symbols and landmarks", "Trails, railroads and the people who changed their communities", "Natural resources, goods and trade"],
  "3/social": ["Local and national communities: maps, continents and cultures", "People on the move to Kansas, and why they came", "Sources, and saving, spending and voting"],
  "4/social": ["Kansas land and peoples, and the regions of the U.S.", "Bleeding Kansas, statehood and how Kansas grew", "Fairness, governing Kansas, and saving"],
  "5/social": ["Native peoples, explorers and the thirteen colonies", "The road to the Revolution and independence", "The Constitution and how it works"],
  "6/social": ["Early humans and the first farmers", "River valley and classical civilizations", "World beliefs, trade networks and African kingdoms"],
  "7/social": ["World regions, countries and cultures", "Governments and economies around the world", "Kansas history, from the first peoples to today"],
  "8/social": ["The founding ideas and the Bill of Rights", "Expansion, reform and the fight over slavery", "The Civil War, Reconstruction, and Kansas and the nation"],
  "9/social": ["Government of the United States and Kansas", "Rights, the courts and taking part", "Economics and personal finance"],
};
