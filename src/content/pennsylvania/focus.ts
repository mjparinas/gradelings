// What each Pennsylvania course focuses on, shown to parents as the course overview ("Focus areas"), keyed
// "<grade>/<subject>". It follows the domains of Pennsylvania's standards (the PA Core Standards for math and English
// language arts, the STEELS science standards, and the civics, economics, geography and history standards) with the grade's
// main topics. Written in the app's house style; Pennsylvania families see it in US English.

const MATH = (number: string, more: string) => [
  `Numbers and operations and algebraic concepts: ${number}`,
  `Geometry, measurement and data: ${more}`,
  "Mathematical practices: making sense of problems, reasoning and explaining",
];

const LANGUAGE = (reading: string, writing: string) => [
  `Reading informational text and literature: ${reading}`,
  `Writing, speaking and listening: ${writing}`,
  "Language and vocabulary: using grammar, spelling and punctuation, and building word knowledge",
];

const SCIENCE = (big: string, practice: string) => [big, `Science and engineering practices: ${practice}`, "Using evidence: explaining what is seen and found out"];

const SOCIAL = (course: string, ...rest: string[]) => [`Course: ${course}`, ...rest];

export const FOCUS: Record<string, string[]> = {
  "k/math": MATH("counting to 100, numbers to 20, and adding and subtracting within 10", "comparing lengths and weights, naming and sorting shapes, and classifying objects"),
  "1/math": MATH("counting to 120, place value, and adding and subtracting within 20", "measuring length, telling time, halves and fourths, and picture graphs"),
  "2/math": MATH("numbers to 1,000, and adding and subtracting within 100 and 1,000", "measuring in inches and centimeters, time and money, and graphs"),
  "3/math": MATH("multiplication and division facts, place value to 1,000, and fractions as numbers", "area and perimeter, elapsed time, and shapes and their attributes"),
  "4/math": MATH("multi-digit multiplication and division, fractions and decimals, and number patterns", "angles, area and perimeter, and converting units"),
  "5/math": MATH("decimals, operations with fractions, and numerical expressions", "volume, the coordinate plane, and line plots"),
  "6/math": MATH("ratios and rates, dividing fractions, rational numbers and expressions", "area, surface area and volume, and statistics"),
  "7/math": MATH("proportional relationships, percent, operations with rational numbers, and equations", "scale drawings, circles, angles, and probability and sampling"),
  "8/math": MATH("exponents, irrational numbers, linear equations and systems", "functions, the Pythagorean theorem, transformations and volume, and scatter plots"),
  "9/math": MATH("Algebra I: expressions, linear equations and inequalities, systems, and exponents", "linear, quadratic and exponential functions, and statistics"),

  "k/language": LANGUAGE("letters and sounds, print concepts, and talking about stories", "drawing, dictating and writing ideas, and speaking in turns"),
  "1/language": LANGUAGE("phonics, retelling stories, and key details in nonfiction", "writing sentences and short pieces, and sharing ideas"),
  "2/language": LANGUAGE("reading with expression, central message, and comparing texts", "writing opinions, information and stories, and listening to others"),
  "3/language": LANGUAGE("reading fluently, characters, text features and main idea", "organizing paragraphs, and explaining with evidence"),
  "4/language": LANGUAGE("theme, point of view and comparing texts", "writing with reasons and details, and short research projects"),
  "5/language": LANGUAGE("summarizing, point of view, and figurative language", "building arguments, and research from several sources"),
  "6/language": LANGUAGE("central idea, citing evidence, and author's purpose", "argument writing, and presenting findings"),
  "7/language": LANGUAGE("theme, analysis and how authors build ideas", "research, and arguments with evidence"),
  "8/language": LANGUAGE("analyzing structure, tone and arguments", "research, argument and narrative writing"),
  "9/language": LANGUAGE("complex literary and informational texts", "argument, research and discussion"),

  "k/science": SCIENCE("What plants and animals need, forces and motion, weather, the sun's warmth, and caring for the environment", "observing, describing patterns and sharing observations"),
  "1/science": SCIENCE("Light and sound, patterns of the sun and moon, and how plants and animals use their body parts", "making observations and testing ideas"),
  "2/science": SCIENCE("Properties of matter, plants and animals in their habitats, and how land and water change", "comparing, investigating and building models"),
  "3/science": SCIENCE("Forces and motion, weather and climate, life cycles and inherited traits, and how living things fit their environments", "asking questions and planning fair tests"),
  "4/science": SCIENCE("Energy, waves, how the Earth's surface changes, and how plant and animal structures help them survive", "using models and evidence"),
  "5/science": SCIENCE("Matter and its changes, how living things get energy, Earth's systems, and the sun, stars and night sky", "measuring, graphing and analyzing data"),
  "6/science": SCIENCE("Earth and space: the solar system, the rock and water cycles, weather and climate, plate tectonics, and cells", "analyzing data and building models"),
  "7/science": SCIENCE("Life science and the environment: heredity, ecosystems, matter and energy, and human impacts", "arguing from evidence"),
  "8/science": SCIENCE("Physical science: forces and motion, energy and waves, atoms and chemical reactions, and engineering solutions", "planning investigations and using math"),
  "9/science": SCIENCE("Biology and physical science: cells, DNA and heredity, evolution, ecosystems, matter, forces and energy", "explaining with evidence and models"),

  "k/social": SOCIAL("family, community, rules and where we live", "Rules and being a good citizen", "Needs, wants and jobs", "Maps, directions and places"),
  "1/social": SOCIAL("community, citizenship and the past", "Rules, rights and responsibilities", "Goods, services and making choices", "Maps and the places around us"),
  "2/social": SOCIAL("communities, government and how things change", "Leaders and the community", "Producers, consumers and money", "Landforms, bodies of water and map skills"),
  "3/social": SOCIAL("Pennsylvania communities, government and history", "How local government serves a community", "Trade, money and jobs", "Pennsylvania's places and regions"),
  "4/social": SOCIAL("Pennsylvania's people, places and past", "State and local government", "Pennsylvania's economy", "Regions, resources and people"),
  "5/social": SOCIAL("early American history, government and geography", "Colonial life and the founding documents", "How the United States government works", "Regions, maps and the colonies"),
  "6/social": SOCIAL("world cultures, geography and economics", "Early civilizations and trade", "How governments and economies work", "Regions, resources and people around the world"),
  "7/social": SOCIAL("United States history and government", "The Revolution and the Constitution", "A growing nation and its government", "Economics, citizenship and geography"),
  "8/social": SOCIAL("United States history and civics", "Expansion, the Civil War and Reconstruction", "Rights, laws and the Constitution", "Economics and personal finance"),
  "9/social": SOCIAL("civics and government", "The Constitution, rights and the three branches", "Pennsylvania and local government", "Citizenship, elections and the economy"),
};
