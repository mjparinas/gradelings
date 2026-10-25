// What each Kentucky course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the grade's
// main topics in the Kentucky Academic Standards for Mathematics; reading and writing list the strands of the Kentucky
// Academic Standards for Reading and Writing (reading, composition and language); science lists the grade's topics in
// the Kentucky Academic Standards for Science, which place each middle school topic in Grade 6, 7 or 8; social studies
// follows the grade's theme in the Kentucky Academic Standards for Social Studies (community; Kentucky; North America;
// world communities; exploration to the Thirteen Colonies; colonization to the Constitution; River Valley
// Civilizations and Classical Empires; Afro-Eurasia and the Americas, 600 to 1600; the United States, 1600 to 1877)
// and, for Grade 9, civics and economics. Written in the app's house style; Kentucky families see it in US English.

const MATH = (topics: string) => [
  `Number and operations: ${topics}`,
  "Geometry: shapes, angles and the space around us",
  "Measurement and data: measuring, collecting data and reading what it shows",
];

const ELA = (reading: string, writing: string) => [
  `Reading: ${reading}`,
  `Composition: ${writing}`,
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
  "6/science": ["Atoms, particles and heat", "Ecosystems, food webs and photosynthesis", "Weather, climate, Earth's surface and space"],
  "7/science": ["Forces, motion, energy and waves", "Chemical reactions and thermal energy", "Cells and body systems"],
  "8/science": ["Growth, reproduction and heredity", "Natural selection and Earth's history", "Earth's resources, hazards and human impact"],
  "9/science": ["Living systems and ecosystems", "Matter, forces and energy", "Earth and human activity"],

  "k/social": ["My community: roles, rules and leaders", "American and Kentucky symbols", "Maps, jobs, and needs and wants"],
  "1/social": ["Kentucky: its symbols, songs and traditions", "Kentucky's government, leaders and laws", "Kentucky's regions, maps and products"],
  "2/social": ["North America: its peoples, places and events", "How Kentucky's laws change, and civic participation", "Resources, producers and consumers"],
  "3/social": ["World communities: cultures, customs and inventors", "How governments around the world work", "Trade, prices and how Kentucky connects to the world"],
  "4/social": ["European exploration and the Thirteen Colonies", "Colonial Kentucky: the Cumberland Gap and the first settlements", "Self-government, and how markets work"],
  "5/social": ["The road to revolution and Kentucky settlers in the war", "The Constitution, the branches and the Bill of Rights", "Statehood in 1792, and being a citizen"],
  "6/social": ["Early humans, farming and River Valley Civilizations", "Classical Greece, Rome, India and China", "World religions, trade, and Greece and Rome in Kentucky's government"],
  "7/social": ["Empires of Afro-Eurasia and the Americas, 600 to 1600", "Trade, religion and the spread of ideas", "The Renaissance, the Scientific Revolution and the Enlightenment"],
  "8/social": ["The colonies, the Revolution and the Constitution", "The new nation, expansion and the fight over slavery", "The Civil War, Reconstruction and Kentucky's part in them"],
  "9/social": ["Civics: how government works in Kentucky and the United States", "Rights, citizenship and taking part", "Economics and personal finance"],
};
