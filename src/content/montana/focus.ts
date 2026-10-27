// What each Montana course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the
// grade's main topics in the Montana Content Standards for Mathematics with their reasoning strands; English language
// arts lists the four strands of the standards (reading, writing, speaking and listening, language); science lists the
// grade's Montana science standards topics; social studies follows the grade's civics, economics, geography and history
// standards in the Montana Social Studies Content Standards (2021), with the Tribal Nations of Montana in every grade
// (Indian Education for All) and, for Grade 9, civics and government. Written in the app's house style; Montana
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

  "k/social": ["Me, my family and my school: past, present and future", "Rules, leaders and good citizens", "Goods and services made in Montana"],
  "1/social": ["Montana's landmarks and maps of places we know", "Needs, wants and goods made nearby", "Past, present and future, and different points of view"],
  "2/social": ["The twelve Tribal Nations of Montana and their reservations", "People who help govern communities, and good citizenship", "Goods, services and how life has changed"],
  "3/social": ["Tribal Nations by their own names, and points of view", "Local and Tribal government, voting and symbols", "The land and peoples of the Americas"],
  "4/social": ["Montana's Tribal Nations, their homelands and histories", "Governing Montana and tribal sovereignty", "Montana's land, work, trade and history"],
  "5/social": ["Treaties and the sovereignty of Montana's Tribal Nations", "Regions of the United States, the colonies and the Revolution", "The Constitution, and money, saving and interest"],
  "6/social": ["World regions: Latin America and Europe", "Maps, cultures and beliefs", "Economies, trade and well-being"],
  "7/social": ["World regions: Africa and Asia", "Population, migration and the environment", "Economic systems and forms of government"],
  "8/social": ["Montana's story from contact to today", "The Montana and US constitutions", "United States history, rights and reform"],
  "9/social": ["Civics: how government works in Montana and the United States", "Tribal sovereignty in Montana", "Rights, taking part, media and economic policy"],
};
