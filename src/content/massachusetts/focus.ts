// What each Massachusetts course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the
// grade's main topics in the 2017 mathematics framework; English language arts follows the framework's strands (reading,
// writing, speaking and listening, language); science lists the grade's Earth and space, physical and life science
// topics in the 2016 science and technology/engineering framework; history and social science follows the grade's
// topics in the 2018 framework. Written in the app's house style; Massachusetts families see it in US English.

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

  "k/science": ["Weather and the sun's warmth", "Pushes, pulls and the materials things are made of", "What plants and animals need to live"],
  "1/science": ["Patterns of the sun, moon and stars", "Light and sound", "How plants and animals use their parts, and young and their parents"],
  "2/science": ["How wind and water shape the land", "Properties and changes of materials", "Plants, habitats and the variety of life"],
  "3/science": ["Weather and climate", "Forces and magnets", "Life cycles, traits, fossils and survival"],
  "4/science": ["Earth's changing surface and natural hazards", "Energy, waves and information", "How plants and animals' parts help them survive"],
  "5/science": ["Earth's systems and water", "The sun, the stars and shadows", "Matter, and how food and energy move through ecosystems"],
  "6/science": ["The solar system and Earth's history", "Waves and the structure of matter", "Cells, body systems and classifying living things"],
  "7/science": ["Weather, climate and the water cycle", "Energy and heat", "Ecosystems and how matter and energy cycle"],
  "8/science": ["Plate tectonics, natural hazards and human impact", "Forces, motion and chemical reactions", "Heredity and natural selection"],
  "9/science": ["Biology: cells, heredity, evolution and ecosystems", "Chemistry: atoms, reactions and the periodic table", "Introductory physics: motion, forces and energy"],

  "k/social": ["Rules, fairness and the nation's symbols", "Maps, globes and my address", "Holidays, traditions, and work and money"],
  "1/social": ["Being a member of a group, leaders and elections", "Maps, continents and the capital of Massachusetts", "Resources, jobs, goods and services, and saving"],
  "2/social": ["Maps and globes, continents and oceans", "Migration, and the United States as a nation of immigrants", "Countries, resources and earning a living"],
  "3/social": ["Massachusetts cities and towns and local government", "Native Peoples of New England, the Pilgrims and the Massachusetts Bay Colony", "Massachusetts in the American Revolution and its Constitution"],
  "4/social": ["The geography and regions of the United States", "Ancient civilizations of North America and European exploration", "How the nation grew in the 19th century"],
  "5/social": ["The thirteen colonies and slavery", "The Revolution, the Constitution and the Bill of Rights", "The growth of the republic, the Civil War and civil rights"],
  "6/social": ["How social scientists study the past", "Early humans and the first civilizations of the Middle East and Africa", "Central America, the Caribbean and South America"],
  "7/social": ["Central, South and East Asia, past and present", "Southeast Asia, Australia and Oceania", "Ancient Greece and Rome"],
  "8/social": ["The ideas behind American government and the Constitution", "The three branches, citizenship and taking part", "Massachusetts government and a free press"],
  "9/social": ["The Revolution and the new nation", "Expansion, reform and the Civil War", "Industry, immigration, the Progressives and World War I"],
};
