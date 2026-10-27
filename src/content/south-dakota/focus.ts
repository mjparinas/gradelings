// What each South Dakota course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the
// grade's main topics in the South Dakota State Standards for Mathematics with the standards' reasoning strands; English
// language arts lists the four strands of the standards (reading, writing, speaking and listening, language); science
// lists the grade's topics in the South Dakota Science Standards; social studies follows the grade's span of world and
// American history in the South Dakota Social Studies Standards and, for Grade 9, United States Government and American
// Civics. Written in the app's house style; South Dakota families see it in US English.

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

  "k/social": ["An introduction to America: maps, globes and our place", "Stories of people from American history", "Symbols of America, rules and fair play"],
  "1/social": ["South Dakota's flag, motto, Capitol and cities, and land and water words", "The ancient world to Rome, and the Oceti Sakowin before Columbus", "Explorers, colonists and the road to independence"],
  "2/social": ["The fall of Rome, the Middle Ages and the Renaissance", "The Constitution, citizenship and the early nation", "Lewis and Clark, the Civil War and the start of the 1900s"],
  "3/social": ["Maps of America and South Dakota, and the reservations", "Ancient civilizations, Greece and the Roman Republic", "Native Americans, Columbus and colonial America"],
  "4/social": ["South Dakota's regions and historic cities", "The Roman Empire and the Middle Ages", "The Revolution, the Constitution and Lewis and Clark"],
  "5/social": ["Europe, the Renaissance, the Reformation and exploration", "Westward expansion, slavery and the Civil War", "Dakota Territory, treaties, the gold rush and statehood"],
  "6/social": ["World geography", "Influential ideas from the ancient world, Greece and Rome", "The Middle Ages, the Reformation, the Enlightenment and revolutions"],
  "7/social": ["South Dakota's geography and Native peoples before Europeans", "Colonies, the Revolution and the Constitution", "The growing nation, the Civil War and Reconstruction"],
  "8/social": ["The Gilded Age in South Dakota, treaties and statehood", "World War I, the Depression and World War II", "Civil rights, the Cold War and America in 2008"],
  "9/social": ["The founding ideas and the Constitution", "The three branches, rights and the courts", "Elections and South Dakota's state, local and Tribal governments"],
};
