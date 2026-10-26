// What each Nebraska course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the grade's
// main topics in Nebraska's mathematics standards; English language arts lists reading, writing, speaking and listening,
// and the vocabulary the Nebraska standards give a strand of its own; science lists the grade's topics in the Nebraska
// science standards; social studies follows the grade's theme in the Nebraska Social Studies Standards (myself and
// others; families; neighborhood; communities near and far; Nebraska studies; U.S. studies to the Constitution; world
// studies I and II; U.S. history to the Gilded Age) and, for Grade 9, the high school civics and economics standards.
// Written in the app's house style; Nebraska families see it in US English.

const MATH = (topics: string) => [
  `Number and algebra: ${topics}`,
  "Geometry: shapes, measurement and the space around us",
  "Data: collecting data, reading what it shows and, later, probability",
];

const ELA = (reading: string, writing: string) => [
  `Reading: ${reading}`,
  `Writing: ${writing}`,
  "Speaking and listening: sharing ideas and building on what others say",
  "Vocabulary, with grammar and conventions inside writing",
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

  "k/social": ["Myself and others: me, my family and my school", "Rules, good citizens and the flag", "Maps, weather, and needs and wants"],
  "1/social": ["Families now and long ago, and family traditions", "Directions, maps, continents and oceans", "Community leaders and helpers, saving and choices"],
  "2/social": ["Neighborhoods: symbols, holidays and good citizens", "People who made a difference, and how communities change", "Goods, services, work and money"],
  "3/social": ["Communities near and far: maps, continents and cultures", "People on the move to Nebraska, and why they came", "Sources, budgets, taxes and voting"],
  "4/social": ["Nebraska land and peoples, and the regions of the U.S.", "The trails, statehood and how Nebraska grew", "Fairness, the Unicameral, and banks and saving"],
  "5/social": ["First peoples, explorers and the thirteen colonies", "The road to the Revolution and independence", "The Constitution and how it works"],
  "6/social": ["Early humans and the first farmers", "River valley and classical civilizations", "World beliefs, trade networks and African kingdoms"],
  "7/social": ["Post-classical societies: Byzantium, Islam, China, Japan and West Africa", "Medieval Europe and the civilizations of the Americas", "World regions, governments and economies today"],
  "8/social": ["The founding ideas and the Bill of Rights", "Expansion, reform and the fight over slavery", "The Civil War, Reconstruction, and Nebraska and the nation"],
  "9/social": ["Civics: the United States and Nebraska's Unicameral", "Rights, the courts and taking part", "Economics and personal finance"],
};
