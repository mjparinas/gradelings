// What each Arkansas course focuses on, shown to parents as the course overview ("Focus areas"), keyed
// "<grade>/<subject>". It follows the strands of the Arkansas Academic Standards with the grade's main topics.
// Written in the app's house style; Arkansas families see it in US English.

const MATH = (number: string, more: string) => [
  `Numbers and operations: ${number}`,
  `Measurement, data and geometry: ${more}`,
  "Problem solving: making sense of problems and explaining reasoning",
];

const LANGUAGE = (reading: string, writing: string) => [
  `Reading: ${reading}`,
  `Writing, speaking and listening: ${writing}`,
  "Vocabulary and language: building word knowledge and using grammar, spelling and punctuation",
];

const SCIENCE = (big: string, practice: string) => [big, `Science and engineering practices: ${practice}`, "Engineering design: solving real problems in Arkansas and beyond"];

const SOCIAL = (course: string, ...rest: string[]) => [`Course: ${course}`, ...rest];

export const FOCUS: Record<string, string[]> = {
  "k/math": MATH("counting to 100, numbers to 20, and adding and subtracting within 10", "naming and comparing shapes, comparing lengths and weights, and sorting"),
  "1/math": MATH("adding and subtracting within 20, and place value to 120", "measuring length, telling time, halves and fourths, and reading simple graphs"),
  "2/math": MATH("adding and subtracting within 1000, place value, and skip-counting", "measuring in inches and centimeters, time, money, equal parts of shapes, and graphs"),
  "3/math": MATH("multiplying and dividing within 100, rounding, and fractions as numbers", "area and perimeter, time, measurement, and scaled graphs"),
  "4/math": MATH("multi-digit multiplication and division, equivalent fractions, and decimals", "measurement conversions, angles, classifying shapes, and line plots"),
  "5/math": MATH("operations with decimals and fractions, and numerical expressions", "volume, the coordinate plane, and converting units"),
  "6/math": MATH("ratios and rates, dividing fractions, integers, and expressions and equations", "area, surface area and volume, and statistics"),
  "7/math": MATH("proportional relationships, operations with rational numbers, and equations and inequalities", "scale drawings, circles, angles, probability and sampling"),
  "8/math": MATH("the real numbers, exponents, linear equations, systems and functions", "the Pythagorean theorem, transformations, volume, and scatter plots"),
  "9/math": MATH("Algebra I: expressions, linear equations and inequalities, systems, and exponents", "linear, quadratic and exponential functions and their graphs, and statistics"),

  "k/language": LANGUAGE("letters and sounds, rhyming, sight words, and asking about stories", "drawing and telling ideas, and taking turns in conversation"),
  "1/language": LANGUAGE("phonics, reading with fluency, and retelling stories and facts", "writing sentences and short pieces, and sharing ideas"),
  "2/language": LANGUAGE("decoding longer words, main ideas, and comparing stories", "writing opinions, information and stories, and asking questions"),
  "3/language": LANGUAGE("reading fluently, characters, main idea and text features", "organizing paragraphs, and presenting to others"),
  "4/language": LANGUAGE("theme, inference, point of view and comparing texts", "writing with reasons and evidence, and research"),
  "5/language": LANGUAGE("summarizing, point of view, and figurative language", "building arguments, and research from several sources"),
  "6/language": LANGUAGE("central idea, citing evidence, and author's purpose", "argument writing, and judging media messages"),
  "7/language": LANGUAGE("theme and analysis across texts", "research, and argument with evidence and counterclaims"),
  "8/language": LANGUAGE("analyzing structure, tone and arguments", "research, argument and narrative writing"),
  "9/language": LANGUAGE("complex literary and informational texts", "argument and research, and discussion"),

  "k/science": SCIENCE("Pushes and pulls, plants and animals and their needs, weather and the sun's warmth", "observing, sorting and asking questions"),
  "1/science": SCIENCE("Light and sound, plant and animal parts, parents and young, and patterns in the sky", "planning simple tests and designing solutions"),
  "2/science": SCIENCE("Properties of matter, habitats and living things, and how Earth's land changes", "testing ideas and comparing designs"),
  "3/science": SCIENCE("Forces and magnets, life cycles and traits, habitats, and weather and climate", "investigating with fair tests"),
  "4/science": SCIENCE("Energy and waves, plant and animal structures, and Earth's changing surface", "making models and comparing solutions"),
  "5/science": SCIENCE("Matter and its changes, energy in food webs, and Earth's systems and the sun and stars", "measuring, graphing and designing devices"),
  "6/science": SCIENCE("Cells and body systems, plant reproduction, heat and thermal energy, weather and climate, and resources", "analyzing data and building models"),
  "7/science": SCIENCE("Atoms and chemical reactions, ecosystems and energy flow, the rock cycle and Earth's surface", "arguing from evidence"),
  "8/science": SCIENCE("Forces and motion, energy and waves, heredity and natural selection, Earth's history, and the solar system", "planning investigations and using math"),
  "9/science": SCIENCE("Biology and physical science: cells, DNA and heredity, ecosystems, matter, forces and energy", "explaining with evidence and models"),

  "k/social": SOCIAL("Civics, economics, geography and history", "Rules, leaders and good citizens", "Needs, wants, goods and services", "Maps of places near me, and American and Arkansas symbols"),
  "1/social": SOCIAL("Civics, economics, geography and history", "Rules, laws and government", "Saving, spending and trade", "Maps, life long ago, and Arkansas goods"),
  "2/social": SOCIAL("Civics, economics, geography and history", "Founding documents, government and symbols", "Producers, consumers and markets", "Arkansas and US maps, landmarks and communities"),
  "3/social": SOCIAL("Civics, economics, geography and history", "The three branches and Arkansas state government", "Supply, demand and trade", "Arkansas's regions, resources and history"),
  "4/social": SOCIAL("Civics, economics, geography and history", "State and federal government, and citizens' rights", "Arkansas commodities and trade", "Arkansas history, people and places"),
  "5/social": SOCIAL("World Geography", "Maps, latitude and longitude, and regions", "Climate, population and migration", "Resources, trade and how people change the environment"),
  "6/social": SOCIAL("World History", "Early humans and the first civilizations", "Ancient empires, beliefs and trade routes", "The Middle Ages to the Renaissance"),
  "7/social": SOCIAL("United States History to 1850, and Arkansas History", "Colonies and the American Revolution", "The Constitution and the new nation", "Arkansas's land, peoples, territory and statehood"),
  "8/social": SOCIAL("United States History since 1850, and Arkansas History", "The Civil War and Reconstruction", "Industry, immigration and reform", "Arkansas in the Civil War and the twentieth century"),
  "9/social": SOCIAL("Civics", "Foundations of American government", "Rights, responsibilities and participation", "How federal, state and local governments work, including Arkansas's"),
};
