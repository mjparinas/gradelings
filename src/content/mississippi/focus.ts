// What each Mississippi course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the
// grade's main topics in the Mississippi College- and Career-Readiness Standards for Mathematics with the standards'
// reasoning strands; English language arts lists the four strands of the standards (reading, writing, speaking and
// listening, language); science follows the grade's topics in the 2026 Mississippi science standards (life, physical,
// and earth and space science, with Biology and Physical Science in Grade 9); social studies follows the grade's theme
// in the 2022 social studies standards (Citizenship at Home and School; Citizenship at School; Citizenship in School and
// Community; Citizenship in Local Government; Mississippi Studies and Regions; United States History to the American
// Revolution; World Geography and Civics; Early World History; United States History, Exploration through
// Reconstruction) and, for Grade 9, Mississippi Studies and Introduction to Geography. Written in the app's house style;
// Mississippi families see it in US English.

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
  "9/math": MATH("Algebra I: expressions, equations, functions and quadratics"),

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

  "k/science": ["Living and non-living things, and what plants and animals need", "Materials and their properties", "Weather, seasons and the sun"],
  "1/science": ["Plant parts and plant life cycles", "Light and sound", "Weather patterns, water and the sky"],
  "2/science": ["Animals, their life cycles and habitats", "Solids, liquids and changes in matter", "Earth's materials, landforms and changes"],
  "3/science": ["Plant and animal structures, traits and adaptations", "Forces, magnets and states of matter", "Rocks, fossils and Earth's changing surface"],
  "4/science": ["Human body systems and life cycles", "Heat, electricity, light and sound", "Weather, climate and energy resources"],
  "5/science": ["Ecosystems and food webs", "Mixtures, solutions and motion", "Earth, the sun, the moon and the stars"],
  "6/science": ["Cells, body systems and classifying living things", "Forces, motion and energy", "The solar system and Earth's place in space"],
  "7/science": ["Atoms, elements, the periodic table and chemical reactions", "Cycles of matter in ecosystems", "Weather, climate change and the seasons"],
  "8/science": ["Heredity, genes and natural selection", "Waves, light and sound", "Earth's history, plate movement and natural hazards"],
  "9/science": ["Biology: cells, genetics, evolution and ecosystems", "Physical science: matter, chemical reactions, forces and energy", "Living things and their environment"],

  "k/social": ["Citizenship at home and school: rules, leaders and being a good citizen", "Money, goods and services, and needs and wants", "Families, celebrations, maps and Mississippi's symbols"],
  "1/social": ["Citizenship at school: rules, laws and patriotism", "Working, earning and meeting needs", "Maps, the world, and life in the past and today"],
  "2/social": ["Citizenship in school and community: civic virtues and fair laws", "Producers, consumers, prices and banks", "Traditions, maps and how communities change"],
  "3/social": ["Citizenship in local government: the three branches at every level", "Taxes, voting, trade and rights", "Natural disasters, energy, and how people change the land"],
  "4/social": ["Mississippi's regions, rivers and resources", "Native nations, statehood, the Civil War and Reconstruction", "The Civil Rights Movement, and Mississippi's music, writers and artists"],
  "5/social": ["The geography of North America and the first peoples", "Explorers, the colonies and the road to revolution", "The founding documents and the Constitution"],
  "6/social": ["World geography: maps, regions, resources and people", "The world's cultural regions", "Civics: governments, rights and citizenship"],
  "7/social": ["River valley civilizations: Egypt, China and the Indus", "Greece, Rome and the kingdoms of Africa", "World religions, the Middle Ages and the Renaissance"],
  "8/social": ["Exploration, the colonies and the American Revolution", "The Constitution, the new nation and westward expansion", "Industry, reform, the Civil War and Reconstruction"],
  "9/social": ["Mississippi Studies: land, nations and statehood", "Mississippi from slavery and Jim Crow to the Civil Rights Movement", "Modern Mississippi, and an introduction to world geography"],
};
