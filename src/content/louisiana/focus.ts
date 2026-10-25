// What each Louisiana course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the grade's
// main topics in the Louisiana Student Standards for Mathematics; English language arts follows the strands of the 2026
// standards (reading, writing, speaking and listening, foundational skills and language); science lists the grade's
// topics in the 2017 science standards; social studies follows the grade's theme in the 2022 social studies standards.
// Written in the app's house style; Louisiana families see it in US English.

const MATH = (topics: string) => [
  `Number and operations: ${topics}`,
  "Geometry: shapes, angles and the space around us",
  "Measurement and data: measuring, collecting data and reading what it shows",
];

const ELA = (reading: string, writing: string) => [
  `Reading literature and information texts: ${reading}`,
  `Writing: ${writing}`,
  "Speaking and listening: sharing ideas and building on what others say",
  "Language: grammar, spelling and the meaning of words",
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

  "k/science": ["Pushes, pulls and how things move", "Sunlight, weather and the seasons", "What plants and animals need, and caring for Earth"],
  "1/science": ["Light and sound", "How plants and animals grow and survive", "Patterns of the sun, moon and stars"],
  "2/science": ["Materials and their properties", "Plants, animals and their habitats", "How Earth's land and water change"],
  "3/science": ["Forces, motion and magnets", "Life cycles, traits and survival", "Weather, climate and natural hazards"],
  "4/science": ["Energy, waves and light", "How plants and animals are built to survive", "Earth's surface, rocks and natural resources"],
  "5/science": ["Matter and its changes", "Ecosystems, food webs and energy from the sun", "Stars, gravity and Earth's systems"],
  "6/science": ["Atoms, forces, energy and waves", "Cells and ecosystems", "The solar system and space"],
  "7/science": ["Chemical reactions and heat", "Body systems, photosynthesis, heredity and biodiversity", "Weather, the water cycle and climate"],
  "8/science": ["Energy, materials and thermal design", "Fossils, natural selection and genes", "Earth's history, plates, resources and hazards"],
  "9/science": ["Biology: cells, heredity, ecosystems and evolution", "Physical science: matter and chemical reactions", "Physical science: motion, energy and waves"],

  "k/social": ["Me, my family, my school and my community", "Needs and wants, jobs and money", "Maps, calendars, and Louisiana's and the nation's symbols and traditions"],
  "1/social": ["Louisiana's symbols, cultures and celebrations", "Maps of Louisiana and its regions", "Goods and services, rules and laws, and Louisiana's government"],
  "2/social": ["The founding of the United States and its landmarks", "Maps, continents and the United States", "The Constitution, the three branches and good citizens"],
  "3/social": ["Famous Americans and inventions that changed lives", "Big events in American history, including the Louisiana Purchase", "Markets, money and the geography of the United States"],
  "4/social": ["Early humans and the first civilizations, including Poverty Point", "Ancient Egypt, India, China, Greece and Rome", "Maps, trade and the ideas of the ancient world"],
  "5/social": ["The Middle Ages in Europe, Asia and Africa", "The Renaissance and the Reformation", "Exploration and the meeting of the Americas, Europe and Africa"],
  "6/social": ["Early America and the thirteen colonies", "French and Spanish Louisiana", "The American Revolution and the Constitution"],
  "7/social": ["A growing nation, from the Louisiana Purchase to statehood", "Expansion, reform and slavery", "The Civil War and Reconstruction, in the nation and in Louisiana"],
  "8/social": ["Industry, immigration, reform and world wars", "Louisiana in the 1900s, from oil and the 1927 flood to Huey Long", "Civil rights, the modern nation and Louisiana after Katrina"],
  "9/social": ["Foundations of American government and the Constitution", "Louisiana's government, parishes and taking part", "Rights, responsibilities, elections and the economy"],
};
