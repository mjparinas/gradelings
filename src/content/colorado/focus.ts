// What each Colorado course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the grade's
// main topics in the Colorado Academic Standards for mathematics; reading, writing and communicating follows its four
// standards (oral expression and listening, reading for all purposes, writing and composition, research inquiry and
// design); science lists the grade's topics as this app places them; social studies follows the grade's focus in the
// Colorado Academic Standards for Social Studies (2022). Written in the app's house style; Colorado families see it in
// US English.

const MATH = (topics: string) => [
  `Number and operations: ${topics}`,
  "Geometry: shapes, angles and the space around us",
  "Measurement and data: measuring, collecting data and reading what it shows",
];

const ELA = (reading: string, writing: string) => [
  `Reading for all purposes: ${reading}`,
  `Writing and composition: ${writing}`,
  "Oral expression and listening: sharing ideas and building on what others say",
  "Research inquiry and design: asking questions and finding reliable answers",
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

  "k/social": ["Me, my family and my classroom", "Rules, fairness and being a good citizen", "Then and now, maps, and choices about needs and wants"],
  "1/social": ["Families, cultures and traditions", "Maps of the neighborhood, and Colorado's symbols", "Jobs, earning and saving, and life long ago"],
  "2/social": ["Neighborhoods and communities, then and now", "Maps, globes and directions", "Scarcity, money and community leaders"],
  "3/social": ["Colorado's land and communities", "Local government and how it serves people", "Producers, consumers and trade"],
  "4/social": ["Colorado's regions and how people use the land", "Colorado history, from the first peoples to today", "Governing Colorado, and how its people earn a living"],
  "5/social": ["Early North America and the thirteen colonies", "The Revolution, the Constitution and the Bill of Rights", "Trade, saving and banks"],
  "6/social": ["The Western Hemisphere: its land, countries and peoples", "Early civilizations of the Americas and European exploration", "Governments and economies of the Americas"],
  "7/social": ["The Eastern Hemisphere: its land and regions", "Ancient and classical civilizations, beliefs and empires", "Trade, travel and the spread of ideas"],
  "8/social": ["United States history from the Revolution to Reconstruction", "The nation moves west, and what it meant for Colorado", "The Constitution, rights and citizenship"],
  "9/social": ["Civics: how government works in Colorado and the United States", "Rights, voting and taking part", "Money smarts and how the economy works"],
};
