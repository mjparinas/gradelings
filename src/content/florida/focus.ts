// What each Florida course focuses on, shown to parents as the course overview ("Focus areas"), keyed
// "<grade>/<subject>". It follows the strands of Florida's standards (B.E.S.T. mathematics and English language arts, the
// Next Generation Sunshine State Standards for science, the social studies standards) with the grade's main topics.
// Written in the app's house style; Florida families see it in US English.

const MATH = (number: string, more: string) => [
  `Number sense and operations: ${number}`,
  `Measurement, geometry and data: ${more}`,
  "Mathematical thinking: making sense of problems, representing them in more than one way and explaining reasoning",
];

const LANGUAGE = (reading: string, writing: string) => [
  `Reading: ${reading}`,
  `Communication: ${writing}`,
  "Vocabulary and language: building word knowledge and using grammar, spelling and punctuation",
];

const SCIENCE = (big: string, practice: string) => [big, `Nature of science: ${practice}`, "Using evidence: explaining what is seen and found out"];

const SOCIAL = (course: string, ...rest: string[]) => [`Course: ${course}`, ...rest];

export const FOCUS: Record<string, string[]> = {
  "k/math": MATH("counting to 100, numbers to 20, and adding and subtracting within 10", "comparing lengths, naming and sorting shapes, and sorting objects into categories"),
  "1/math": MATH("counting to 120, place value, and adding and subtracting within 20", "measuring length, telling time and money, halves and fourths, and tally marks and pictographs"),
  "2/math": MATH("numbers to 1,000, and adding and subtracting within 100 and 1,000", "measuring in inches and centimeters, time and money, perimeter, thirds, and graphs"),
  "3/math": MATH("numbers to 10,000, multiplication and division facts, and fractions as numbers", "area and perimeter, elapsed time, lines and quadrilaterals, and scaled graphs"),
  "4/math": MATH("multi-digit multiplication and division, fractions and decimals, and operations with fractions", "classifying and measuring angles, area, and mode, median and range"),
  "5/math": MATH("operations with decimals and fractions, and numerical expressions", "volume, the coordinate plane, converting units, and data displays"),
  "6/math": MATH("rational numbers, ratios and rates, and dividing fractions", "area, surface area and volume, and statistics"),
  "7/math": MATH("proportions, percent, and operations with rational numbers, and equations and inequalities", "scale drawings, circles, angles, probability and sampling"),
  "8/math": MATH("the real numbers, exponents, linear equations and systems", "functions, the Pythagorean theorem, transformations, volume, and scatter plots"),
  "9/math": MATH("Algebra 1: expressions, linear equations and inequalities, systems, exponents and polynomials", "linear, quadratic and exponential functions, statistics, and Geometry: proof, similarity and trigonometry"),

  "k/language": LANGUAGE("letters and sounds, rhyming, high-frequency words, and talking about stories", "drawing, dictating and printing ideas, and presenting to others"),
  "1/language": LANGUAGE("phonics, reading with automaticity, and retelling stories and facts", "writing sentences and short pieces, and sharing ideas"),
  "2/language": LANGUAGE("decoding longer words, theme, and comparing stories and facts", "writing opinions, information and stories, and presenting"),
  "3/language": LANGUAGE("reading fluently, characters, central idea and text features", "organizing paragraphs, and using evidence to explain"),
  "4/language": LANGUAGE("theme, point of view and comparing texts", "writing with reasons and evidence, and research"),
  "5/language": LANGUAGE("summarizing, point of view, and figurative language", "building arguments, and research from several sources"),
  "6/language": LANGUAGE("central idea, citing evidence, and author's purpose", "argument writing, and judging media messages"),
  "7/language": LANGUAGE("theme and analysis across texts", "research, and argument with evidence and counterclaims"),
  "8/language": LANGUAGE("analyzing structure, tone and arguments", "research, argument and narrative writing"),
  "9/language": LANGUAGE("complex literary and informational texts", "argument and research, and discussion"),

  "k/science": SCIENCE("The five senses, plants and animals, properties of objects, sound, pushes and pulls, gravity, and the sun and moon", "observing, collecting information and keeping records"),
  "1/science": SCIENCE("Plants and animals and their needs, properties of matter, sound and light, motion, and weather", "observing, comparing and measuring"),
  "2/science": SCIENCE("Plant and animal life cycles, matter and its changes, Earth's land and water, and weather", "investigating and comparing"),
  "3/science": SCIENCE("Plants and animals and how they survive, forces, energy, and the sun, moon and solar system", "making predictions and fair tests"),
  "4/science": SCIENCE("Energy, electricity, heat and sound, plant and animal needs and adaptations, and Earth's changing surface", "planning investigations and using models"),
  "5/science": SCIENCE("Matter and its changes, forces, energy, the water cycle and weather, and food webs", "measuring, graphing and comparing designs"),
  "6/science": SCIENCE("Earth's structure and tectonics, the water and rock cycles, weather and climate, and cells", "analyzing data and building models"),
  "7/science": SCIENCE("Heredity and genetics, the scientific method, matter and chemical reactions, and ecosystems", "arguing from evidence"),
  "8/science": SCIENCE("Forces and motion, energy and waves, the universe and solar system, and Earth's history and its changes", "planning investigations and using math"),
  "9/science": SCIENCE("Biology 1 and physical science: cells, DNA and heredity, evolution, ecosystems, matter, forces and energy", "explaining with evidence and models"),

  "k/social": SOCIAL("American history, civics, economics and geography", "Rules, laws and being a responsible citizen", "Jobs, needs and wants, and U.S. and Florida symbols", "Maps, directions, landforms and water"),
  "1/social": SOCIAL("American history, civics, economics and geography", "Rules, rights and responsibilities, and patriotism", "Money, goods and services, and saving and spending", "Maps, Florida and the Atlantic Ocean and Gulf of America, and life long ago"),
  "2/social": SOCIAL("American history, civics, economics and geography", "Native Americans, immigrants and colonial America", "Why people form governments, the Constitution and symbols", "Supply and demand, North America, and continents and oceans"),
  "3/social": SOCIAL("American history, civics, economics and geography", "Volunteerism, voting and patriotic holidays", "Currencies of North America and how scarcity leads to trade", "U.S. regions, climates and landmarks, and the countries of North America"),
  "4/social": SOCIAL("Florida history, civics, economics and financial literacy", "Florida from the Pre-Columbian era to today", "Florida's constitution and state and local government", "Earning, saving and budgeting, and Florida's maps, places and weather"),
  "5/social": SOCIAL("American history, civics and geography", "The Pre-Columbian era to Westward Expansion", "The founding documents, the Constitution and the national government", "Latitude and longitude, the thirteen colonies, and states and capitals"),
  "6/social": SOCIAL("World history, civics, economics and geography", "Early river civilizations, Greece, Rome and the civilizations of the Americas", "The roots of representative government", "Earth's ecosystems, the six essential elements of geography, and market economies"),
  "7/social": SOCIAL("Civics and government", "The origins of government and the American Revolution", "The Constitution, the Bill of Rights and the branches of government", "Citizenship, foreign policy and how the U.S. compares with other governments"),
  "8/social": SOCIAL("American history, civics, economics and financial literacy", "Colonial settlement to the Civil War and Reconstruction", "Westward expansion and the rule of law", "Earning income, saving, investing and credit"),
  "9/social": SOCIAL("World history", "Ancient and classical civilizations and the great religions", "Empires, the Middle Ages and the Renaissance", "Revolutions, industrialization, the world wars and the modern world"),
};
