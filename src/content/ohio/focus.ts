// What each Ohio course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the grade's
// main topics in Ohio's Learning Standards for Mathematics; English language arts follows the strands of the 2026
// standards (reading, writing, speaking and listening, language); science lists the grade's three topics in Ohio's
// Learning Standards for Science (Earth and space, physical and life science); social studies follows the grade's
// theme in Ohio's Learning Standards for Social Studies. Written in the app's house style; Ohio families see it in
// US English.

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

  "k/science": ["Daily and seasonal changes", "Properties of everyday objects", "Traits of living things"],
  "1/science": ["The sun, energy and weather", "Motion and materials", "The basic needs of living things"],
  "2/science": ["The atmosphere and weather", "Changes in motion", "Living things and their habitats"],
  "3/science": ["Earth's resources", "Matter and forms of energy", "How living things behave, grow and change"],
  "4/science": ["Earth's surface and how it changes", "Electricity, heat and matter", "How ecosystems change over time"],
  "5/science": ["Cycles and patterns in the solar system", "Light, sound and motion", "How ecosystems are connected"],
  "6/science": ["Rocks, minerals and soil", "Matter and motion", "From cells to living things"],
  "7/science": ["Cycles and patterns of Earth and the moon", "Conservation of mass and energy", "Cycles of matter and the flow of energy"],
  "8/science": ["The physical Earth", "Forces and motion", "Species and reproduction"],
  "9/science": ["Physical science: matter, motion and energy", "Biology: cells, heredity, evolution and ecosystems", "How people affect Earth's systems"],

  "k/social": ["Me, my family and my school, now and long ago", "Rules, fairness and Ohio's and the nation's symbols", "Maps, needs and wants, and making choices"],
  "1/social": ["Families now and long ago, near and far", "Maps of the neighborhood and the world", "Jobs, goods and services, and saving"],
  "2/social": ["How people's lives changed over time", "Maps, regions and Ohio's land", "Scarcity, trade and community leaders"],
  "3/social": ["Ohio communities, past and present", "Local government and how it serves people", "Producers, consumers and how people change the land"],
  "4/social": ["Ohio in the United States: its land and regions", "Ohio history, from the first peoples to statehood and beyond", "Governing Ohio, and how its people earn a living"],
  "5/social": ["Regions and people of the Western Hemisphere", "Early civilizations of the Americas and European exploration", "Governments and economies of the Americas"],
  "6/social": ["Regions and people of the Eastern Hemisphere", "Latitude, longitude and world maps", "Governments, markets and early civilizations"],
  "7/social": ["Ancient Greece and Rome", "World beliefs, empires and trade from 750 BC to 1600", "Exploration and the first global age"],
  "8/social": ["United States history from 1492 to Reconstruction", "The nation moves west, and what it meant for Ohio", "The Constitution, rights and citizenship"],
  "9/social": ["American Government: Ohio and the United States", "Rights, voting and taking part", "Economics and financial literacy"],
};
