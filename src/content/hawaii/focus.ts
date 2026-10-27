// What each Hawaiʻi course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the grade's
// main topics in the Hawaiʻi Common Core Standards for Mathematics (2026); English language arts lists the four strands
// of the Hawaiʻi Common Core Standards for English Language Arts (reading, writing, speaking and listening, language);
// science lists the grade's topics in the Next Generation Science Standards, which Hawaiʻi uses; social studies follows
// the grade's theme in the Hawaiʻi Core Standards for Social Studies (self, family and community; Hawaiian history in
// Grade 4; the United States to the Revolution; world history; the Hawaiian Kingdom and Pacific Island Studies in Grade 7;
// United States history to Reconstruction) and, for Grade 9, Modern History of Hawaiʻi and Participation in Democracy.
// Written in the app's house style; Hawaiʻi families see it in US English.

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
  "8/math": MATH("linear relationships and functions, systems of equations, and exponents"),
  "9/math": MATH("Algebra 1 and data analytics: equations, functions, quadratics and the Pythagorean theorem"),

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

  "k/social": ["Me, my family and my school", "Rules, roles and working together", "Our island home, maps, and needs and wants"],
  "1/social": ["My island community: reefs, weather and caring for the land", "Maps, continents and oceans", "Life long ago, goods and services, and earning and saving"],
  "2/social": ["Leaders, public services and shared values", "People who made a difference, and family journeys", "Making, trading and natural resources"],
  "3/social": ["Coming to Hawaiʻi: why people migrate", "World maps, continents and cultures", "Sources, money, taxes and voting"],
  "4/social": ["The Hawaiian Islands, and Polynesian voyaging and wayfinding", "Canoe plants, the ahupuaʻa and Hawaiian values", "Aliʻi, the kapu system and the rise of Kamehameha"],
  "5/social": ["Native nations, explorers and the thirteen colonies", "Colonial life and labor", "The road to the Revolution and independence"],
  "6/social": ["Early humans and the first farmers", "River valley and classical civilizations", "World beliefs, trade networks and African kingdoms"],
  "7/social": ["Hawaiian Kingdom: Cook, Kamehameha and a changing kingdom", "Constitutions, the Māhele, plantations and the 1893 overthrow", "Pacific Island Studies: peoples, encounters and the Pacific today"],
  "8/social": ["The Constitution, its branches and the Bill of Rights", "Expansion, industry and reform", "Slavery, the Civil War and Reconstruction"],
  "9/social": ["Modern History of Hawaiʻi: annexation, plantations and labor", "Pearl Harbor, statehood and modern Hawaiʻi", "Participation in Democracy: government, rights and economics"],
};
