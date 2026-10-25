// What each Connecticut course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the
// grade's main Common Core topics with the standards' reasoning strands; English language arts lists the four strands of
// the standards (reading, writing, speaking and listening, language); science lists the grade's Next Generation Science
// Standards topics; social studies follows the grade's theme in the Connecticut Elementary and Secondary Social Studies
// Standards (Understanding My Communities; Society and Ourselves; Contributing to Society; Connecticut and Local
// History; United States Geography; United States History I; World Regional Studies I and II; United States History
// II) and, for Grade 9, the Civics and Government course. Written in the app's house style; Connecticut families see it
// in US English.

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

  "k/social": ["Understanding my communities: me, my family and my school", "Leaders, rules and helpers", "Then and now, jobs, and where the things we buy come from"],
  "1/social": ["Society and ourselves", "Connecticut on the map, and symbols of the United States", "Goods and trade, and life long ago"],
  "2/social": ["Contributing to society", "Local leaders and what local government does", "Maps of our community, and choices about money"],
  "3/social": ["Connecticut and local history", "How Connecticut is governed, and the Native nations of Connecticut", "Connecticut's people, land and industries"],
  "4/social": ["United States geography: the regions and their land", "Why people settle and move", "Storms, hazards and a changing climate"],
  "5/social": ["Exploration and the thirteen colonies", "Colonial Connecticut and the Fundamental Orders", "The American Revolution and the Constitution"],
  "6/social": ["World regions: Latin America and Europe", "Maps, cultures and beliefs", "Economies, trade and well-being"],
  "7/social": ["World regions: Africa and Asia", "Population, migration and the environment", "Economic systems and forms of government"],
  "8/social": ["United States history from the founding to Reconstruction", "Connecticut and the nation, from gradual abolition to the Civil War", "The Constitution and the Great Compromise"],
  "9/social": ["Civics: how government works in Connecticut and the United States", "Elections, rights and taking part", "Media, parties and economic policy"],
};
