// What each Vermont course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the grade's
// main topics in Vermont's mathematics standards (the Common Core) with the standards' reasoning strands; English
// language arts lists the four strands of the standards (reading, writing, speaking and listening, language); science
// lists the grade's topics in Vermont's science standards (the Next Generation Science Standards); social studies
// follows the grade themes of the Agency of Education's Vermont Framework for K-8 Social Studies and, for Grade 9,
// civics, economics and personal finance. Written in the app's house style; Vermont families see it in US English.

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
  "6/science": ["Energy, heat and weather", "Cells and living systems", "Climate and the water cycle"],
  "7/science": ["Atoms, mixtures and chemical reactions", "Ecosystems and the flow of energy", "Earth's surface and resources"],
  "8/science": ["Forces, motion and energy", "Heredity and natural selection", "Space systems and Earth's history"],
  "9/science": ["Living systems and ecosystems", "Matter, forces and energy", "Earth and human activity"],

  "k/social": ["Me, my family and my school", "Rules, fair choices and community leaders", "Maps, Vermont's symbols, and needs and wants"],
  "1/social": ["People, places and the environment", "Maps of our land and how people use it", "Vermont then and now, and earning and saving"],
  "2/social": ["The Americas: continents, countries and cultures", "People who made a difference, and family journeys", "Making, trading and working together"],
  "3/social": ["Africa, Asia, Europe and Oceania", "Why people move, and who has come to Vermont", "World maps, cultures, money, taxes and voting"],
  "4/social": ["Vermont's land and the Abenaki", "The Green Mountain Boys, the Revolution and statehood", "The Constitution, the Civil War, and how Vermont works"],
  "5/social": ["The first farmers and river valley civilizations", "Africa and southwest Asia, past and present", "World beliefs and trade networks"],
  "6/social": ["Ancient Greece, Rome, India and China", "Latin America, the Aztec and the Inca", "Europe, Asia and Oceania today"],
  "7/social": ["Reconstruction, industry and immigration", "World wars, the 1920s and the Depression", "Civil rights, and Vermont from 1865 to 1970"],
  "8/social": ["The Constitution, rights and the courts", "Citizens in action, in Vermont and the nation", "Personal finance, supply and demand"],
  "9/social": ["Governing Vermont and the nation", "Economics and markets", "Personal finance"],
};
