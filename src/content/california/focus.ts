// What each California course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the
// domains of the California Common Core State Standards with the grade's main topics (Grade 9 is the Algebra I course);
// English language arts lists the strands of the CA CCSS for ELA/Literacy; science lists the grade's topics in
// California's Next Generation Science Standards, with middle school in the Preferred Integrated Model; social studies
// gives the grade's theme from the History–Social Science Content Standards. Written in the app's house style;
// California families see it in US English.

const MATH = (topics: string) => [
  `Number and operations: ${topics}`,
  "Measurement, data and geometry: shapes, measuring and reading data",
  "Mathematical practices: making sense of problems and explaining reasoning",
];

const ELA = (reading: string, writing: string) => [
  `Reading literature and informational text: ${reading}`,
  `Writing: ${writing}`,
  "Speaking and listening: sharing ideas and building on what others say",
  "Language: grammar, vocabulary and conventions",
];

export const FOCUS: Record<string, string[]> = {
  "k/math": MATH(
    "counting to 100, numbers to 20, and adding and subtracting within 10",
  ),
  "1/math": MATH("adding and subtracting within 20, and place value to 120"),
  "2/math": MATH(
    "adding and subtracting within 1000, place value, estimation and money",
  ),
  "3/math": MATH(
    "multiplying and dividing within 100, and fractions as numbers",
  ),
  "4/math": MATH(
    "multi-digit multiplication and division, equivalent fractions, and decimals",
  ),
  "5/math": MATH(
    "operations with fractions and decimals, prime factors, and volume",
  ),
  "6/math": MATH("ratios and rates, negative numbers, and expressions"),
  "7/math": MATH("proportional relationships, integers, and equations"),
  "8/math": MATH("linear equations, functions, and the Pythagorean theorem"),
  "9/math": [
    "Algebra I: expressions, equations and inequalities, including absolute value",
    "Functions: linear, exponential and quadratic functions and their graphs",
    "Statistics: describing data, two-way tables and scatter plots",
  ],

  "k/language": ELA(
    "letters, sounds and first words",
    "drawing and writing to share an idea",
  ),
  "1/language": ELA(
    "phonics, fluency and short texts",
    "writing sentences about a topic",
  ),
  "2/language": ELA(
    "reading with fluency and understanding stories",
    "writing to tell, explain and give an opinion",
  ),
  "3/language": ELA(
    "understanding chapter books and information texts",
    "organized paragraphs",
  ),
  "4/language": ELA(
    "text structure, theme and evidence",
    "opinion, information and story writing",
  ),
  "5/language": ELA(
    "comparing texts and points of view",
    "research and well-supported writing",
  ),
  "6/language": ELA(
    "analyzing arguments and sources",
    "argument writing with evidence",
  ),
  "7/language": ELA(
    "evaluating claims and media",
    "argument and research writing",
  ),
  "8/language": ELA(
    "analyzing how authors build meaning",
    "writing that weighs evidence and counterclaims",
  ),
  "9/language": ELA(
    "complex literature and information texts",
    "argument, analysis and research",
  ),

  "k/science": [
    "Pushes and pulls",
    "Weather and the sun's warmth",
    "What plants and animals need",
  ],
  "1/science": [
    "Light and sound",
    "How plants and animals survive and grow",
    "Patterns of the sun, moon and stars",
  ],
  "2/science": [
    "Properties of materials",
    "Plants, animals and their habitats",
    "How land changes, and where water is found",
  ],
  "3/science": [
    "Forces and magnets",
    "Life cycles, traits and survival",
    "Weather and climate",
  ],
  "4/science": [
    "Energy and waves",
    "How plant and animal structures work",
    "Rocks, erosion, earthquakes and energy resources",
  ],
  "5/science": [
    "Matter and its changes",
    "Food webs and ecosystems",
    "Earth's systems, the sun and the stars",
  ],
  "6/science": [
    "Thermal energy, weather and climate",
    "Cells and body systems",
    "Growth, development and engineering design",
  ],
  "7/science": [
    "Matter and chemical reactions",
    "Ecosystems and the flow of energy",
    "Earth's surface and resources",
  ],
  "8/science": [
    "Forces, motion and waves",
    "Heredity and natural selection",
    "Space systems and Earth's history",
  ],
  "9/science": [
    "Living Earth: cells, ecosystems and evolution",
    "Chemistry and physics of the Earth system",
    "Earth and human activity",
  ],

  "k/social": [
    "Learning and working now and long ago",
    "Good citizens, rules and symbols",
    "Maps of familiar places",
  ],
  "1/social": [
    "A child's place in time and space",
    "Rules, maps and American symbols",
    "Life long ago, cultures, money and work",
  ],
  "2/social": [
    "People who make a difference",
    "Family history and maps of North America",
    "Government, producers and consumers",
  ],
  "3/social": [
    "Continuity and change in the local region",
    "American Indian nations of the region, then and now",
    "Local history and the basics of US government",
  ],
  "4/social": [
    "California: a changing state",
    "California's regions and California Indian nations",
    "Missions and ranchos, the Gold Rush, statehood and growth",
  ],
  "5/social": [
    "United States history and geography: making a new nation",
    "The colonies, the Revolution and the Constitution",
    "Settling the West, and the 50 states and capitals",
  ],
  "6/social": [
    "World history and geography: ancient civilizations",
    "Mesopotamia, Egypt, Kush, the ancient Hebrews, Greece, India, China and Rome",
    "How early governments, beliefs and trade shaped the world",
  ],
  "7/social": [
    "World history: medieval and early modern times",
    "Islam, China, West Africa, Japan, Europe and the Americas",
    "The Renaissance, the Reformation, the Scientific Revolution and the Enlightenment",
  ],
  "8/social": [
    "United States history: growth and conflict, to 1914",
    "The Constitution and the early republic",
    "Westward expansion, the Civil War, Reconstruction and industrial America",
  ],
  "9/social": [
    "Civics: principles of American democracy",
    "Rights and responsibilities of citizens",
    "Elections and federal, state and local government",
  ],
};
