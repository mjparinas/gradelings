// What each Delaware course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the
// grade's main topics in Delaware's mathematics standards (the Common Core) with the standards' reasoning strands;
// English language arts lists the four strands of the standards (reading, writing, speaking and listening, language);
// science lists the grade's topics in Delaware's science standards (the Next Generation Science Standards); social
// studies follows the order the units are placed in within the Delaware Standards for Civics, Economics, Geography and
// History's grade clusters (K-3, 4-5, 6-8, 9-12): community and nation; Delaware's regions and history; United States
// history; the ancient world; the world after the ancient era; United States history to Reconstruction and, for
// Grade 9, civics, economics and personal finance. Written in the app's house style; Delaware families see it in US
// English.

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

  "k/social": ["Me, my family and my school", "Rules, fair choices and community leaders", "Maps, symbols, and needs and wants"],
  "1/social": ["Our community, and Delaware then and now", "Maps of our land and how people use it", "Community helpers, cultures, and earning and saving"],
  "2/social": ["American symbols, holidays and the President", "People who made a difference, and family journeys", "Making, trading and working together"],
  "3/social": ["Delaware's regions and maps", "Why people move, and cultures around the world", "Continents, oceans, money, taxes and voting"],
  "4/social": ["Delaware's land, the Lenape and Nanticoke, and the first settlers", "The First State: independence, the Constitution and state symbols", "Mills, farms and jobs, people who made a difference, and governing Delaware"],
  "5/social": ["Native peoples, explorers and the thirteen colonies", "The road to the Revolution and independence", "The Constitution and how it works"],
  "6/social": ["Early humans and the first farmers", "River valley and classical civilizations", "World beliefs, trade networks and African kingdoms"],
  "7/social": ["Rome, Byzantium and the rise of Islam", "Kingdoms of Africa, China, Japan and medieval Europe", "The Aztec and Inca, and the world's countries, cultures and governments"],
  "8/social": ["The founding ideas and the Bill of Rights", "The new nation, reform and the Civil War", "Reconstruction, and Delaware's part in the nation"],
  "9/social": ["Civics: how government works in Delaware and the United States", "Rights, the courts and taking part", "Economics and personal finance"],
};
