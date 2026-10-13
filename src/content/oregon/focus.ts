// What each Oregon course focuses on, shown to parents as the course overview ("Focus areas"). Math and English
// language arts list the domains of Oregon's standards with the grade's main topics; science lists the grade's
// Next Generation Science Standards topics; social studies gives the grade's theme from the 2024 social science standards. Written in the app's
// house style; Oregon families see it in US English.

const MATH_DOMAINS = (topics: string) => [
  `Numbers and operations: ${topics}`,
  "Geometry and measurement: shapes, measurement and the space around us",
  "Data reasoning: asking questions, collecting data and reading what it shows",
];

const ELA = (reading: string, writing: string) => [
  `Reading: ${reading}`,
  `Writing: ${writing}`,
  "Speaking and listening: sharing ideas and building on what others say",
  "Language: grammar, vocabulary and conventions",
];

export const FOCUS: Record<string, string[]> = {
  "k/math": MATH_DOMAINS("counting to 100, numbers to 20, and adding and subtracting within 10"),
  "1/math": MATH_DOMAINS("adding and subtracting within 20, and place value to 120"),
  "2/math": MATH_DOMAINS("adding and subtracting within 1000, place value, and money"),
  "3/math": MATH_DOMAINS("multiplying and dividing within 100, and fractions as numbers"),
  "4/math": MATH_DOMAINS("multi-digit multiplication and division, equivalent fractions, and decimals"),
  "5/math": MATH_DOMAINS("operations with fractions and decimals, and volume"),
  "6/math": MATH_DOMAINS("ratios and rates, negative numbers, and expressions"),
  "7/math": MATH_DOMAINS("proportional relationships, integers, and equations"),
  "8/math": MATH_DOMAINS("linear equations, functions, and the Pythagorean theorem"),
  "9/math": MATH_DOMAINS("high school algebra: linear and exponential relationships, equations and functions"),

  "k/language": ELA("letters, sounds and first words", "drawing and writing to share an idea"),
  "1/language": ELA("phonics, fluency and short texts", "writing sentences about a topic"),
  "2/language": ELA("reading with fluency and understanding stories", "writing to tell, explain and give an opinion"),
  "3/language": ELA("understanding chapter books and information texts", "organized paragraphs"),
  "4/language": ELA("text structure, theme and evidence", "opinion, information and story writing"),
  "5/language": ELA("comparing texts and points of view", "research and well-supported writing"),
  "6/language": ELA("analysing arguments and sources", "argument writing with evidence"),
  "7/language": ELA("evaluating claims and media", "argument and research writing"),
  "8/language": ELA("analysing how authors build meaning", "writing that weighs evidence and counter-claims"),
  "9/language": ELA("complex literature and information texts", "argument, analysis and research"),

  "k/science": ["Pushes and pulls", "Weather and climate", "What plants and animals need"],
  "1/science": ["Light and sound", "How plants and animals survive and grow", "Patterns of the sun, moon and stars"],
  "2/science": ["Properties of materials", "Plants, animals and their habitats", "How land changes, and where water is found"],
  "3/science": ["Forces and magnets", "Life cycles, traits and survival", "Weather and climate"],
  "4/science": ["Energy and waves", "How plant and animal structures work", "Rocks, erosion and Earth's processes"],
  "5/science": ["Matter and its changes", "Food webs and ecosystems", "Earth's systems, the sun and the stars"],
  "6/science": ["Energy, forces and motion", "Cells and living systems", "Weather, climate and the water cycle"],
  "7/science": ["Chemical reactions", "Ecosystems and the flow of energy", "Earth's surface and resources"],
  "8/science": ["Forces, motion and energy", "Heredity and natural selection", "Space systems and Earth's history"],
  "9/science": ["Living systems and ecosystems", "Matter, forces and energy", "Earth and human activity"],

  "k/social": ["Me and my world", "Rules, fairness and helping at school", "Maps of familiar places"],
  "1/social": ["My school and family", "Needs, wants and choices", "Maps and locations"],
  "2/social": ["My neighborhood, my community", "People who help and how communities work together", "Goods, services and trade"],
  "3/social": ["Our community and beyond", "Oregon's regions and counties, and the Pacific Northwest", "How communities change"],
  "4/social": ["Oregon, from time immemorial to the present", "The nine federally recognized Tribes of Oregon", "Oregon's government and economy"],
  "5/social": ["Colonial and early United States history to 1800", "Founding documents and government", "Geography of the United States"],
  "6/social": ["World history: early people to ancient civilizations", "Geography of the ancient world", "How early economies and governments worked"],
  "7/social": ["World history from 600 to 1900", "Trade, empires and exchange", "Geography and changing borders"],
  "8/social": ["United States history from 1780 to 1865", "The Constitution and rights", "Westward expansion and the Civil War"],
  "9/social": ["Civics: how government works", "Rights and responsibilities of citizens", "Economics and personal finance"],
};
