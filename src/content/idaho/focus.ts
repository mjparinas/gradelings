// What each Idaho course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the grade's
// main topics in the 2022 Idaho Content Standards for mathematics with the standards' reasoning strands; English
// language arts lists the four strands parents know (reading, writing, speaking and listening, language); science lists
// the grade's topics in the 2022 Idaho science standards; social studies follows the grade's content in the 2024 Idaho
// social studies standards (history, geography, economics, civics and government, and global perspectives), with World
// Geography and World History for Grades 6 and 7, United States History I for Grade 8 and, for Grade 9, American
// Government and Economics. Written in the app's house style; Idaho families see it in US English.

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
  "6/science": ["Light, waves and heat", "Cells, body systems and senses", "Earth's surface, resources and history"],
  "7/science": ["Forces, fields and energy", "Ecosystems and biodiversity", "The solar system and the universe"],
  "8/science": ["Atoms, reactions and new materials", "Heredity, growth and natural selection", "Weather, climate and human impact"],
  "9/science": ["Living systems and ecosystems", "Matter, forces and energy", "Earth and human activity"],

  "k/social": ["Me, my family and my school, now and long ago", "Where things are, maps and jobs in my community", "The flag, the Pledge, holidays and traditions"],
  "1/social": ["Families then and now, and the history of my community", "Map symbols and directions: Idaho, the United States and the world", "Needs and wants, goods and services, and patriotic symbols"],
  "2/social": ["The five tribes of Idaho, long ago and today", "Idaho's land and resources, and cities, suburbs, towns and rural places", "Idaho's constitution, laws and the people who make them"],
  "3/social": ["The history of my community, and migration and immigration", "Maps, settlement and why people call Idaho home", "Local government, public services, and public and private property"],
  "4/social": ["The tribes of Idaho, explorers, fur traders and gold rushes", "Idaho's regions, resources and economy", "Idaho's government, symbols and statehood"],
  "5/social": ["Colonies, the American Revolution and the Constitution", "The regions of the United States and westward expansion", "Reservations, state lands and federal lands, and money choices"],
  "6/social": ["Early humans and the first civilizations", "Ancient Greece, Rome, China and the Americas", "Medieval times, the Renaissance and exploration"],
  "7/social": ["The regions of the world on the map", "Governments, religions and revolutions", "Idaho in the world: trade, treaties and globalization"],
  "8/social": ["The Revolution, the Constitution and the new nation", "Westward expansion and Idaho's road to statehood", "The Civil War and Reconstruction"],
  "9/social": ["Government: how it works in Idaho and the United States", "Rights, elections and taking part", "Economics and personal finance"],
};
