// What each Utah course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the grade's
// main topics in the Utah Core Standards for Mathematics (Secondary Mathematics I in Grade 9); English language arts
// follows the strands of the 2023 standards (reading, writing, and speaking and listening); science lists the grade's
// topics in the SEEd standards; social studies follows the grade's theme in the Utah Core Standards for Social Studies.
// Written in the app's house style; Utah families see it in US English.

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
  "9/math": MATH("Secondary Mathematics I: expressions, linear equations and functions, and exponential models"),

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

  "k/science": ["Weather and how the sun warms Earth", "What plants and animals need to live", "Pushes, pulls and how things move"],
  "1/science": ["Patterns of the sun, moon and stars", "How plants and animals grow and survive", "Light and sound"],
  "2/science": ["How Earth's land and water change", "Plants, animals and their habitats", "Materials and their properties"],
  "3/science": ["Weather, climate and weather hazards", "Life cycles, traits and survival", "Forces, motion and magnets"],
  "4/science": ["Earth's features, fossils and rock layers", "How plants and animals are built to survive", "Energy, waves and light, and the sun and stars"],
  "5/science": ["Earth's systems, water and natural hazards", "Matter and its changes", "Ecosystems, food webs and energy from the sun"],
  "6/science": ["The Sun, Earth and Moon, gravity and the solar system", "Molecules, heat and states of matter", "Weather, climate and ecosystems"],
  "7/science": ["Forces, motion and fields", "Earth's changing surface, rocks and fossils", "Cells, body systems, heredity and evolution"],
  "8/science": ["Atoms, molecules and chemical reactions", "Energy, waves and photosynthesis", "Earth's resources and human impact"],
  "9/science": ["Biology: cells, heredity, ecosystems and evolution", "Earth and space science: stars, Earth's history and plates", "Climate, resources and people's impact on Earth"],

  "k/social": ["Families, traditions and how life has changed", "Maps, the globe and places near me", "Rules, good citizens, needs and wants"],
  "1/social": ["Family and community history, with primary sources", "Maps and the land around us", "Rules, community helpers, goods and services"],
  "2/social": ["Change over time in our community, Utah and the United States", "Maps, continents and the world", "Government, citizens, and producers and consumers"],
  "3/social": ["Types of government, and the United States and Utah constitutions", "Communities and their geography", "Rights, responsibilities and how communities meet their needs"],
  "4/social": ["Utah's land, regions and first peoples", "Explorers, pioneers, the railroad and statehood", "Utah's government, symbols and changes over time"],
  "5/social": ["Native peoples of North America and the Age of Exploration", "The colonies, the American Revolution and the Constitution", "A growing nation, the Civil War and Reconstruction"],
  "6/social": ["Early humans and ancient civilizations", "Empires, trade and the Middle Ages", "Revolutions, the modern world and human rights"],
  "7/social": ["Utah Studies: Native innovations and Utah's diverse peoples", "Railroads, mining and the road to statehood", "Utah in the Union, in the world and in the future"],
  "8/social": ["United States History I: Native peoples and exploration", "The colonies, the Revolution and the Constitution", "A growing nation, the Civil War and Reconstruction"],
  "9/social": ["World Geography: maps and the forces that shape the land", "Population, culture and how people use places", "Economies, resources and a connected world"],
};
