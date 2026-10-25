// What each Missouri course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the grade's
// main topics in the Missouri Learning Standards for Mathematics; English language arts follows the strands of the
// standards (reading, writing, speaking and listening, language); science lists the grade's topics in Missouri's
// Grade-Level Expectations; social studies follows the grade's theme in the Missouri Learning Standards for Social
// Studies (Kindergarten to Grade 5), the middle school courses and the high school Government course. Written in the
// app's house style; Missouri families see it in US English.

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
  "9/math": MATH("Algebra I: expressions, equations, functions and quadratics, with some geometry"),

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

  "k/science": ["Pushes, pulls and motion", "Sunlight, weather and the seasons", "What plants and animals need, and caring for the land"],
  "1/science": ["Sound, light and heat", "Patterns of the sun, moon and stars, and weather", "How plants and animals survive and grow"],
  "2/science": ["Materials and their properties", "Land, water and how Earth changes", "Plants, seeds and pollinators"],
  "3/science": ["Heating, cooling and changes of state", "Magnets and electric pushes and pulls", "Life cycles, traits and survival"],
  "4/science": ["Forces, motion, friction and simple machines", "Energy and waves", "Rock layers, erosion and Earth's features"],
  "5/science": ["Matter, mixtures and new substances", "Light, gravity and the sun and stars", "Organs, food and ecosystems"],
  "6/science": ["Cells and body systems", "Thermal energy and energy transfer", "Weather, climate and human impact"],
  "7/science": ["Atoms, substances and chemical reactions", "Ecosystems, food webs and cycles of matter", "Earth's resources and changing surface"],
  "8/science": ["Forces, motion and fields", "Energy and waves", "Earth's history, space and natural selection"],
  "9/science": ["Biology: cells, DNA, heredity and evolution", "Chemistry and physics: matter, reactions, forces and energy", "Earth and space, and how people affect Earth's systems"],

  "k/social": ["Me, my family and my school, now and long ago", "Rules, fairness and the flag and the Pledge", "Maps, needs and wants, and making choices"],
  "1/social": ["My school and community, now and long ago", "Maps, globes and directions", "Jobs, goods and services, and American symbols"],
  "2/social": ["Regions of the world, the nation and Missouri", "Citizens, leaders and the three branches", "Money, trade and work"],
  "3/social": ["Missouri's land, rivers, cities and regions", "Missouri's past, from its first peoples to today", "Governing Missouri and its economy"],
  "4/social": ["Our nation's first peoples, explorers and colonies", "The American Revolution and the Constitution", "Regions of the United States and saving and earning"],
  "5/social": ["The nation grows: westward expansion, the Civil War and Reconstruction", "Industry, immigration and the world wars", "The Great Depression, the Cold War and civil rights"],
  "6/social": ["World regions and how geography shapes them", "People, resources and trade around the world", "Cultures, beliefs and governments of world regions"],
  "7/social": ["The first civilizations and river valleys", "Classical Greece, Rome, India and China", "The Middle Ages in Europe, Africa, Asia and the Americas"],
  "8/social": ["Colonial America and the American Revolution", "The Constitution, the new nation and westward expansion", "Slavery, the Civil War and Reconstruction, and Missouri's part in them"],
  "9/social": ["Government: the Constitution and the three branches", "Rights, elections and citizens", "Governing Missouri"],
};
