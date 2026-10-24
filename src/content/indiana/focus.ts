// What each Indiana course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the grade's
// main topics in the 2023 Indiana Academic Standards for Mathematics; English/language arts follows its four domains
// (Reading Foundations, Reading Comprehension, Writing, and Communication and Collaboration); science follows the
// grade's performance expectations; social studies follows the grade's focus in the Indiana Academic Standards for
// Social Studies. Written in the app's house style; Indiana families see it in US English.

const MATH = (topics: string) => [
  `Number sense and computation: ${topics}`,
  "Algebraic thinking: patterns, relationships and equations",
  "Geometry, measurement and data analysis: shapes, measuring and reading what data shows",
];

const ELA = (texts: string, foundations: string) => [
  `Reading comprehension: ${texts}`,
  `Reading foundations and vocabulary: ${foundations}`,
  "Writing, and communication and collaboration: writing with purpose and sharing ideas with others",
];

export const FOCUS: Record<string, string[]> = {
  "k/math": MATH("counting to 100, numbers to 20, and adding and subtracting within 10"),
  "1/math": MATH("adding and subtracting within 20, place value to 120, and telling time"),
  "2/math": MATH("adding and subtracting within 1,000, place value, money and time"),
  "3/math": MATH("multiplying and dividing within 100, numbers to 10,000, and fractions as numbers"),
  "4/math": MATH("multi-digit multiplication and division, equivalent fractions, and decimals"),
  "5/math": MATH("operations with fractions and decimals, and volume"),
  "6/math": MATH("ratios and rates, negative numbers, and expressions"),
  "7/math": MATH("proportional relationships, integers, and equations"),
  "8/math": MATH("linear equations, functions, and the Pythagorean theorem"),
  "9/math": MATH("Algebra I: linear and quadratic equations, functions, systems and data, with some geometry"),

  "k/language": ELA("listening to stories and finding key details", "letters, sounds and first words"),
  "1/language": ELA("retelling stories and reading short information texts", "phonics, fluency and writing sentences"),
  "2/language": ELA("understanding stories and how information texts are built", "reading with fluency, spelling and grammar"),
  "3/language": ELA("theme, main idea and how authors make their point", "fluency, word parts and complete sentences"),
  "4/language": ELA("text structure, theme and evidence", "fluency, vocabulary and grammar"),
  "5/language": ELA("comparing texts and points of view", "word meanings and clear, correct sentences"),
  "6/language": ELA("analyzing arguments, sources and the techniques authors use", "vocabulary and grammar for clear writing"),
  "7/language": ELA("evaluating claims, media and how texts are structured", "word choice and varied sentences"),
  "8/language": ELA("analyzing how authors build meaning and argue", "vocabulary and conventions for formal writing"),
  "9/language": ELA("complex literature, information texts and arguments", "precise words and polished conventions"),

  "k/science": ["Pushes, pulls and sunlight", "What plants and animals need", "Weather and caring for Earth"],
  "1/science": ["Light and sound", "How plants and animals survive and grow", "Patterns of the sun, moon and stars"],
  "2/science": ["Properties of materials", "Plants, animals and their habitats", "Land, water and how Earth changes"],
  "3/science": ["Forces and magnets", "Life cycles, traits and fossils", "Weather, climate and natural hazards"],
  "4/science": ["Energy, waves and information", "Plant and animal structures and senses", "Rocks, erosion, hazards and energy resources"],
  "5/science": ["Matter and its changes", "Food, energy and ecosystems", "The sun, stars and Earth's water"],
  "6/science": ["The solar system and space", "Ecosystems, food webs and biodiversity", "Waves, light and engineering design"],
  "7/science": ["Cells and body systems", "Forces, motion and energy", "Earth's surface, rocks and resources"],
  "8/science": ["Atoms, matter and chemical reactions", "Heredity, growth and evolution", "Weather, climate and human impacts"],
  "9/science": ["Biology: cells, genetics, ecology and evolution", "Integrated chemistry: atoms, bonding and reactions", "Integrated physics: motion, energy, waves and electricity"],

  "k/social": ["Families, holidays and life long ago", "Rules and being a good member of a group", "Maps, jobs and earning money"],
  "1/social": ["Past and present, and American songs and symbols", "Rules, rights and the Pledge of Allegiance", "Maps, goods and services, and making choices"],
  "2/social": ["How the local community began and changed", "Good citizens, the Pledge and Benjamin Harrison", "Maps, prices, trade and saving"],
  "3/social": ["Native Americans and the growth of Indiana communities", "Indiana and the Midwest on the map", "Local, state and national government, and money and trade"],
  "4/social": ["Indiana's land, glaciers and first peoples", "Indiana history, from statehood to today", "Indiana's government and economy"],
  "5/social": ["Early North America and European exploration", "The colonies and the American Revolution", "The Constitution, the Bill of Rights and the new nation"],
  "6/social": ["Europe and the Americas, from ancient times to the Industrial Revolution", "Forms of government, trade and economic systems", "Civics: the US and Indiana Constitutions and the three branches"],
  "7/social": ["Early civilizations and religions of Africa and Asia", "Kingdoms, empires and trade routes", "Colonization, independence and the region today"],
  "8/social": ["The Revolution, the Constitution and the new nation", "Growth, reform and westward expansion", "The Civil War and Reconstruction"],
  "9/social": ["United States Government: the Constitution, the branches and rights", "Indiana's government and taking part as a citizen", "Economics: markets, money and economic policy"],
};
