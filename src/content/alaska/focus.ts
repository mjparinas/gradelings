// What each Alaska course focuses on, shown to parents as the course overview ("Focus areas"). Math gives the grade's main
// topics in number, geometry and data; English language arts lists the four strands of the Alaska ELA standards; science
// lists the grade's Science Standards for Alaska topics; social studies follows the grade-level themes of the Alaska
// Social Studies Standards (2024): Me and My World (K), My Place in the World (1), My Local Community (2), Alaska's Past,
// Present, and Future (3), U.S. Cultures and Regions (4), Foundations and History of the U.S. (5), Alaska Studies and
// Geography (6), World History and Geography (7), U.S. History and Civics (8), and civics with Alaska history in Grade 9.
// Written in the app's house style; Alaska families see it in US English.

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
  "1/math": MATH("skip counting, adding and subtracting within 20, place value to 100, and coins"),
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

  "k/social": ["Me, my family and my classroom", "Rules, leaders and getting along", "Needs, wants and the work people do"],
  "1/social": ["Maps of my school and community", "Rules, fairness and roles at home and school", "Spending, saving and how communities change"],
  "2/social": ["Maps and the local community", "Local leaders, Alaska's symbols and working together", "Earning, saving and goods from near and far"],
  "3/social": ["Alaska's land and regions", "Alaska's history, from the first peoples to statehood", "How Alaska is governed, and Alaska Native cultures today"],
  "4/social": ["Regions of the United States", "Alaska's industries and its place in the nation", "Maps, sources and money"],
  "5/social": ["The thirteen colonies and the Revolution", "The Constitution and the three branches", "Colonial trade, work and the economy"],
  "6/social": ["Alaska's geography and natural hazards", "The peoples of Alaska", "Alaska's resources, economy and governments"],
  "7/social": ["Early people and the first civilizations", "Ancient civilizations and world religions", "Medieval times, Mesoamerica and global exploration"],
  "8/social": ["Exploration and the Columbian Exchange", "The American Revolution and the Constitution", "Reform, the Civil War and Reconstruction"],
  "9/social": ["Civics: how government works in the United States", "Alaska's constitution and government", "Alaska history, land claims and the economy"],
};
