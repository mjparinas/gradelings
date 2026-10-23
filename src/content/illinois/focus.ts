// What each Illinois course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the grade's
// main Common Core topics with the standards' reasoning strands; English language arts lists the four strands of the
// standards (reading, writing, speaking and listening, language); science lists the grade's Next Generation Science
// Standards topics; social studies follows the grade's theme in the Illinois Learning Standards for Social Science (My
// Social World; Living, Learning, and Working Together; Families, Neighborhoods, and Communities; Communities Near and
// Far; Our State, Our Nation; Our Nation, Our World) and, for Grades 6 to 9, the topics this app teaches. Written in the
// app's house style; Illinois families see it in US English.

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

  "k/social": ["My social world: me, my family and my classroom", "Rules, leaders and helpers", "Then and now, holidays, and choices about needs and wants"],
  "1/social": ["Living, learning and working together", "Maps of the neighborhood, and Illinois's symbols", "Jobs, earning and saving, and life long ago"],
  "2/social": ["Families, neighborhoods and communities", "Maps, globes and directions", "Money, choices and how communities change"],
  "3/social": ["Communities near and far", "Illinois communities and how people use the land", "Banks, borrowing and goods from other places"],
  "4/social": ["Illinois's land and regions", "Illinois history, from the first peoples to today", "Governing Illinois, and how its people earn a living"],
  "5/social": ["The thirteen colonies and the Revolution", "The Constitution and the Bill of Rights", "Trade, saving and interest"],
  "6/social": ["World geography and regions", "Early peoples and ancient civilizations", "How early governments and trade worked"],
  "7/social": ["World history from 600 to 1900", "Trade, empires and exchange", "Revolutions and new ideas about government"],
  "8/social": ["United States history from the founding to Reconstruction", "Illinois and the nation, from statehood to the Civil War", "The United States and Illinois constitutions"],
  "9/social": ["Civics: how government works in Illinois and the United States", "Rights, voting and taking part", "Media, parties and public opinion"],
};
