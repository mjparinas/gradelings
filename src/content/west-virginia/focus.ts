// What each West Virginia course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the
// grade's main topics in the West Virginia College- and Career-Readiness Standards for Mathematics with the
// mathematical habits of mind; English language arts lists the standards' four strands (reading, writing, speaking and
// listening, language); science follows the grade's topics in the science standards (Policy 2520.3C), which place middle
// school topics by grade; social studies follows the grade's content in the social studies standards (Policy 2520.4),
// from community and state in the early grades to West Virginia Studies in Grade 8 and World Studies in Grade 9.
// Written in the app's house style; West Virginia families see it in US English.

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
  "3/science": ["Forces and magnets", "Life cycles, traits and survival", "Weather, climate and weather hazards"],
  "4/science": ["Energy, waves and light", "How plant and animal structures work", "Rocks, fossils, erosion and Earth's features"],
  "5/science": ["Matter and its changes", "Food webs and ecosystems", "Earth's systems and resources, the sun and the stars"],
  "6/science": ["Ecosystems, photosynthesis and biodiversity", "Atoms, waves and space systems", "Weather, climate and natural hazards"],
  "7/science": ["Cells and body systems", "Energy, forces and fields", "Earth's materials, history and resources"],
  "8/science": ["Growth, heredity and natural selection", "Molecules, states of matter and chemical reactions", "Human impact and engineering design"],
  "9/science": ["Living systems and ecosystems", "Matter, forces and energy", "Earth and human activity"],

  "k/social": ["Me, my family and my school", "Rules, jobs, needs and wants", "West Virginia's symbols, shape and weather"],
  "1/social": ["Rules, leaders and our community", "Maps, landforms and natural resources", "West Virginia's motto, work, counties and culture"],
  "2/social": ["Fair rules and the levels of government", "Maps, continents and natural resources", "West Virginia's symbols, famous people, counties and neighbors"],
  "3/social": ["Government, rights and democratic values", "Maps, regions of the United States and early explorers", "West Virginia's regions, travel regions and work"],
  "4/social": ["The thirteen colonies and the American Revolution", "The new nation and westward expansion", "West Virginia's counties, geography and changes over time"],
  "5/social": ["The Civil War and Reconstruction", "Industry, immigration and a growing world power", "How West Virginia became a state"],
  "6/social": ["World War I, the Great Depression and World War II", "The Cold War, civil rights and today's world", "Government, economics and global connections"],
  "7/social": ["World geography region by region", "The first civilizations and the classical world", "Economies, governments and cultures"],
  "8/social": ["West Virginia Studies: government, economy and geography", "Early West Virginia, the Civil War and statehood", "Railroads, coal, labor and modern West Virginia"],
  "9/social": ["World Studies: the classical world to the Renaissance", "Exploration, revolutions and industrialization", "World wars, decolonization and the world today"],
};
