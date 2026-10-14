// What each Minnesota course focuses on, shown to parents as the course overview ("Focus areas"), keyed
// "<grade>/<subject>". It follows the strands of the Minnesota K-12 Academic Standards with the grade's main topics.
// Written in the app's house style; Minnesota families see it in US English.

const MATH = (number: string, more: string) => [
  `Patterns and relationships: ${number}`,
  `Spatial reasoning, data and probability: ${more}`,
  "Mathematical practices: making sense of problems and explaining reasoning",
];

const LANGUAGE = (reading: string, writing: string) => [
  `Reading: ${reading}`,
  `Writing, speaking and listening: ${writing}`,
  "Language: building vocabulary and using grammar, spelling and punctuation",
];

const SCIENCE = (big: string, practice: string) => [big, `Science and engineering practices: ${practice}`, "How science connects to people and communities in Minnesota and beyond"];

const SOCIAL = (theme: string, ...rest: string[]) => [`Theme: ${theme}`, ...rest];

export const FOCUS: Record<string, string[]> = {
  "k/math": MATH("counting to 100, numbers to 20, and adding and subtracting within 10", "naming and comparing shapes, comparing lengths and weights, and sorting"),
  "1/math": MATH("adding and subtracting within 20, place value to 120, and coins", "measuring length, halves and fourths of shapes, and reading simple graphs"),
  "2/math": MATH("adding and subtracting within 1000, place value, and skip-counting", "measuring in inches and centimeters, money, equal parts of shapes, and picture and bar graphs"),
  "3/math": MATH("multiplying and dividing within 100, numbers to 10,000, and fractions as numbers", "classifying shapes, measuring, and scaled graphs"),
  "4/math": MATH("multi-digit multiplication and division, equivalent fractions, and decimals", "area and perimeter, angles, classifying shapes, and line plots"),
  "5/math": MATH("operations with decimals and fractions, and expressions", "volume, the coordinate plane, and data displays"),
  "6/math": MATH("ratios and rates, dividing fractions, integers, and expressions and equations", "area, surface area and volume, unit conversions, and statistics"),
  "7/math": MATH("proportional relationships, operations with rational numbers, and equations", "scale drawings, circles, probability, and comparing data sets"),
  "8/math": MATH("linear equations and functions, exponents, and irrational numbers", "the Pythagorean theorem, and scatter plots and lines of fit"),
  "9/math": MATH("linear, exponential and quadratic functions, systems of equations, and polynomials", "modeling with data, and the Grades 9–11 benchmarks"),

  "k/language": LANGUAGE("letters and sounds, rhyming, sight words, and asking about stories", "drawing and telling ideas, and taking turns in conversation"),
  "1/language": LANGUAGE("phonics, reading with fluency, and retelling stories and facts", "writing sentences and short pieces, and sharing ideas"),
  "2/language": LANGUAGE("decoding longer words, main ideas, and comparing stories", "writing opinions, information and stories, and asking questions"),
  "3/language": LANGUAGE("reading fluently, characters, main idea and text features", "organizing paragraphs, and presenting to others"),
  "4/language": LANGUAGE("theme, inference and comparing texts", "writing with reasons and evidence, and research"),
  "5/language": LANGUAGE("summarizing, point of view, and figurative language", "building arguments, and research from several sources"),
  "6/language": LANGUAGE("central idea, citing evidence, and author's purpose", "argument writing, and judging media messages"),
  "7/language": LANGUAGE("theme and analysis across texts", "research, and argument with evidence and counterclaims"),
  "8/language": LANGUAGE("analyzing structure, tone and arguments", "research, argument and narrative writing"),
  "9/language": LANGUAGE("literature and informational texts at the Grades 9–10 level", "argument and research, and discussion"),

  "k/science": SCIENCE("Living things and their needs, pushes and pulls, weather and the sun's warmth", "observing, sorting and asking questions"),
  "1/science": SCIENCE("Plant and animal parts, parents and young, light and sound, and materials", "planning simple tests and designing solutions"),
  "2/science": SCIENCE("Heating and cooling, forces and motion, water on Earth, weather and habitats", "testing ideas and comparing designs"),
  "3/science": SCIENCE("Life cycles and survival, how we see with light, and patterns in the sky", "investigating with fair tests"),
  "4/science": SCIENCE("Weathering and erosion, Earth's systems and water, energy resources, magnets and inherited traits", "making models and comparing solutions"),
  "5/science": SCIENCE("Matter and its changes, energy transfer, food webs, and the sun and stars", "measuring, graphing and designing devices"),
  "6/science": SCIENCE("Earth and space science: the solar system, plate tectonics, rocks, Earth's history, resources and climate", "analyzing data and building models"),
  "7/science": SCIENCE("Life science: cells, body systems, ecosystems, heredity and natural selection", "arguing from evidence"),
  "8/science": SCIENCE("Physical science: atoms and reactions, forces and motion, energy, fields and waves", "planning investigations and using math"),
  "9/science": SCIENCE("High school life, chemistry, Earth and space, and physics benchmarks", "explaining with evidence and models"),

  "k/social": SOCIAL("Family and Community", "Rules, fairness and belonging", "Needs, wants, goods and services", "Maps of places near me, and words for past and future"),
  "1/social": SOCIAL("Communities and Culture", "Rights, rules and taking part", "Scarcity, choices and trade", "Maps, timelines and life long ago"),
  "2/social": SOCIAL("People and the Environment", "Voting and levels of government", "Opportunity cost and money", "Dakota and Anishinaabe life through the seasons, then and now"),
  "3/social": SOCIAL("The Ancient World", "Daily life, inventions and sources from ancient times", "Physical and human regions", "Minnesota's 11 Tribal Nations"),
  "4/social": SOCIAL("The Contemporary World", "World regions, countries and states", "Resources, farming, energy and trade", "Migration and global issues"),
  "5/social": SOCIAL("Early American Studies", "The colonies, slavery and resistance", "The American Revolution", "The Constitution and the Bill of Rights"),
  "6/social": SOCIAL("Minnesota Studies", "Minnesota's land, water and regions", "The Dakota and Anishinaabe and Tribal sovereignty", "Territory, statehood and the US–Dakota War of 1862", "Work, immigration and change, and Minnesota's government"),
  "7/social": SOCIAL("United States Studies", "The Civil War and Reconstruction", "Industry, reform and the right to vote", "The world wars, the Great Depression, the Cold War and civil rights"),
  "8/social": SOCIAL("Global Studies", "Governments, economies and human rights around the world", "Population, migration and cities", "Global trade and beliefs"),
  "9/social": SOCIAL("Citizenship and Government", "Founding ideas, the Constitution and rights", "The three branches, elections and lawmaking", "Minnesota's state and local government, and economics"),
};
