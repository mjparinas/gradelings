// What each Michigan course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the grade's
// main Common Core topics with the standards' reasoning strands; English language arts lists the four strands of the
// standards (reading, writing, speaking and listening, language); science lists the grade's topics in the Michigan K-12
// Science Standards; social studies follows the grade's theme in the Michigan K-12 Standards for Social Studies (Myself
// and Others; Families and Schools; the Local Community; Michigan Studies; United States Studies; Integrated United
// States History; Global Geography; World History and Geography) and, for Grade 9, civics and economics. Written in the
// app's house style; Michigan families see it in US English.

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

  "k/social": ["Myself and others: me, my family and my school", "Rules, fair choices and the American flag", "Maps, wants, and goods and services"],
  "1/social": ["Families and schools, now and long ago", "Maps of the classroom and the world", "Producers, consumers, earning and trading"],
  "2/social": ["The local community and how it changed", "Maps, land use and moving goods", "Local government, services and choices"],
  "3/social": ["Michigan studies: land, lakes and regions", "Michigan's first peoples and early history to statehood", "Working in Michigan, and governing the state"],
  "4/social": ["Regions of the United States and the Great Lakes", "Michigan from statehood: industry, cars and newcomers", "The federal government and the market economy"],
  "5/social": ["Peoples of the Eastern Woodland, and explorers", "The thirteen colonies and the Revolution", "The Constitution and the Bill of Rights"],
  "6/social": ["World regions, landforms and climates", "Cultures, governments and economies around the world", "Maps, graphs and geographic tools"],
  "7/social": ["Early humans and the first farmers", "River valley and classical civilizations", "World religions, trade networks and Africa to 1500"],
  "8/social": ["The Constitution and the new nation", "Expansion, reform and the fight over slavery", "The Civil War, Reconstruction, and Michigan's part in them"],
  "9/social": ["Civics: how government works in Michigan and the United States", "Rights, citizenship and taking part", "Economics and personal finance"],
};
