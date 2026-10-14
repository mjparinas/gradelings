// What each Arizona course focuses on, shown to parents as the course overview ("Focus areas"). Math gives the grade's main
// topics in number, geometry and data; English language arts lists the four strands of Arizona's ELA standards; science
// lists the grade's Arizona Science Standards topics; social studies follows the grade themes of the History and Social
// Science Standards (2018): Children as Citizens (K), Communities (1), The World Around Me (2), Arizona Studies (3),
// Regions and Cultures of the Americas (4), United States Studies (5), Global Studies of the Eastern Hemisphere (6),
// Integrated Global Studies (7), Citizenship and Civic Engagement (8), and civics with Arizona's government in Grade 9.
// Written in the app's house style; Arizona families see it in US English.

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
  "1/math": MATH("skip counting, adding and subtracting within 20, place value to 100, and coins"),
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

  "k/science": ["Our senses, light and sound", "Weather and the seasons", "Living things and their body parts"],
  "1/science": ["Light, sound and balanced forces", "Life cycles of plants and animals", "Habitats and how living things get what they need"],
  "2/science": ["Properties of matter and how heat changes it", "Wind, water and changing land", "Living things and energy from the Sun"],
  "3/science": ["Light, sound and the human eye", "Plant and animal structures and senses", "Energy from the Sun and food chains"],
  "4/science": ["Energy, electric currents and magnets", "Rocks, fossils, erosion and natural hazards", "Renewable resources and survival over time"],
  "5/science": ["Matter, particles and new substances", "Forces, motion and gravity", "Earth and the Sun, and inherited traits"],
  "6/science": ["Atoms, states of matter and energy", "The solar system, seasons and tides", "Ecosystems and the flow of energy"],
  "7/science": ["Cells and body systems", "Forces, Newton's laws and electromagnetism", "Plate tectonics and weather"],
  "8/science": ["Chemical reactions and identifying substances", "Waves and energy transfer", "Heredity, natural selection and Earth's history"],
  "9/science": ["Cells, genetics and evolution", "Atoms, bonding and chemical reactions", "Forces, energy and fields"],

  "k/social": ["Me, my family and my culture", "Rules, leaders and working together", "American symbols, needs and wants"],
  "1/social": ["Maps of my school and community", "Rules, local government and community groups", "Jobs, saving and spending, and American symbols"],
  "2/social": ["Maps, continents and world regions", "Cultures and communities around the world", "Goods, jobs and trade in a global economy"],
  "3/social": ["Arizona's land, regions and water", "Arizona's history and its 22 Indian Nations", "Arizona's government and economy"],
  "4/social": ["Civilizations of the Americas", "Exploration, encounters and the Columbian Exchange", "The colonies and their economies"],
  "5/social": ["The American Revolution and the Constitution", "A growing nation and the Civil War", "Reconstruction, industry and reform"],
  "6/social": ["Early farmers and the first civilizations", "Ancient India, China, Greece and Rome", "Medieval times, the Islamic world and the Renaissance"],
  "7/social": ["The Scientific Revolution, Enlightenment and revolutions", "Industry, imperialism and the world wars", "The Cold War and the world today"],
  "8/social": ["The founding documents and citizens' rights", "Elections, media and civic action", "Personal finance and economics"],
  "9/social": ["Civics: how government works in the United States", "The Arizona Constitution and Arizona's governments", "Practice for the American civics test"],
};
