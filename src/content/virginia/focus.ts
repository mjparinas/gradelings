// What each Virginia course focuses on, shown to parents as the course overview ("Focus areas"). Math follows the five
// strands of the 2023 Mathematics Standards of Learning (number and number sense, computation and estimation,
// measurement and geometry, probability and statistics, and patterns, functions and algebra); English follows the
// strands of the 2024 English Standards of Learning (foundations for reading, reading, writing, language usage and
// communication); science follows the grade's 2018 Science Standards of Learning; history and social science follows
// the grade's course in the 2023 History and Social Science Standards of Learning. Written in the app's house style;
// Virginia families see it in US English.

const MATH = (topics: string) => [
  `Number sense and computation: ${topics}`,
  "Measurement and geometry: measuring, shapes and their properties",
  "Probability, statistics and algebra: data, chance, patterns and equations",
];

const ELA = (reading: string, foundations: string) => [
  `Reading: ${reading}`,
  `Foundations and language usage: ${foundations}`,
  "Writing and communication: writing with purpose and sharing ideas with others",
];

export const FOCUS: Record<string, string[]> = {
  "k/math": MATH("counting to 100, numbers to 20, and joining and separating groups within 10"),
  "1/math": MATH("place value to 120, and adding and subtracting within 20"),
  "2/math": MATH("place value to 999, adding and subtracting within 100, money and time"),
  "3/math": MATH("numbers to 10,000, multiplication and division facts, and fractions"),
  "4/math": MATH("numbers to the millions, multi-digit multiplication and division, fractions and decimals"),
  "5/math": MATH("operations with fractions and decimals, and the order of operations"),
  "6/math": MATH("ratios, rates and percents, integers, and operations with fractions"),
  "7/math": MATH("proportional reasoning, rational numbers, and equations and inequalities"),
  "8/math": MATH("real numbers, scientific notation, and linear relationships"),
  "9/math": MATH("Algebra 1: expressions, equations and inequalities, functions and statistics"),

  "k/language": ELA("listening to stories and finding key details", "letters, sounds and first words"),
  "1/language": ELA("retelling stories and reading short information texts", "phonics, fluency and writing sentences"),
  "2/language": ELA("story elements and how information texts are built", "reading with fluency, spelling and grammar"),
  "3/language": ELA("theme, main idea and how authors make their point", "fluency, word parts and complete sentences"),
  "4/language": ELA("text structure, theme and evidence", "fluency, vocabulary and grammar"),
  "5/language": ELA("comparing texts and points of view", "word meanings and clear, correct sentences"),
  "6/language": ELA("analyzing arguments, sources and the techniques authors use", "vocabulary and grammar for clear writing"),
  "7/language": ELA("evaluating claims, media and how texts are structured", "word choice and varied sentences"),
  "8/language": ELA("analyzing how authors build meaning and argue", "vocabulary and conventions for formal writing"),
  "9/language": ELA("complex literature, information texts and arguments", "precise words and polished conventions"),

  "k/science": ["Pushes, pulls and the properties of objects", "Living and nonliving things, and what plants and animals need", "Water, sunlight, patterns in nature and using resources"],
  "1/science": ["How objects move, and the materials they are made of", "What plants and animals need, and their parts", "The sun and Earth, weather and seasons, and natural resources"],
  "2/science": ["Forces, motion and the phases of matter", "Life cycles, and living things as part of a system", "Weather, the seasons, and plants as resources"],
  "3/science": ["Force and motion, and how materials interact with water", "Adaptations, and aquatic and land ecosystems", "Soil, the water cycle, and how people and nature change ecosystems"],
  "4/science": ["Plant and animal structures, and how living things interact", "Weather, the ocean and Virginia's natural resources", "The planets, and Earth, the moon and the sun"],
  "5/science": ["Energy, force and motion, and electricity", "Sound, light and the properties of matter", "Earth's changing surface, and saving energy resources"],
  "6/science": ["The solar system, and the sun, Earth and the moon", "Energy sources, atoms and the properties of water", "Air and weather, watersheds, and people and the environment"],
  "7/science": ["Life science: cells and how living things are organized", "Ecosystems, populations and the flow of energy", "Heredity, genetics and change over time"],
  "8/science": ["Physical science: atoms, the periodic table and chemical changes", "Forces, motion and energy", "Waves, sound, light, electricity and magnetism"],
  "9/science": ["Biology: cells, genetics and evolution", "Biology: ecosystems and living things", "Earth science: rocks, plate tectonics, the oceans, weather and space"],

  "k/social": ["Citizenship, Virginia's holidays and American symbols", "Virginia's earliest communities, and how places change", "Maps, globes, positional words, and needs and wants"],
  "1/social": ["Virginia's history, from Werowocomoco and Jamestown to today", "Virginia's people and changemakers", "Maps, Virginia's land and water, and goods and services"],
  "2/social": ["Indigenous peoples of the Eastern Woodlands, Plains and Southwest, and European explorers", "The founders, the new nation and changemakers in United States history", "World maps, landmarks, and resources, money and scarcity"],
  "3/social": ["The seven continents and the geography of ancient societies", "Ancient Egypt, China, Greece, Rome and Mali", "The three branches of government, citizenship and economics"],
  "4/social": ["Virginia's geography and its Indigenous nations", "Jamestown, colonial Virginia and the American Revolution", "The new nation, the Civil War, Reconstruction and Virginia today"],
  "5/social": ["The geography of North America and its early cultures", "Exploration, West Africa, the colonies and the Revolution", "The new nation, westward expansion and the Civil War"],
  "6/social": ["Westward expansion, Reconstruction and industrial America", "World War I, the 1920s, the Great Depression and World War II", "The Cold War, the civil rights movement and America today"],
  "7/social": ["The foundations of American constitutional democracy", "National, state and local government, and the courts", "Citizenship, elections, the economy and personal finance"],
  "8/social": ["Geographic tools and resources", "The regions of the world, from the Americas to the Pacific", "Population, migration, culture and global trade"],
  "9/social": ["Early humans and the first civilizations", "Persia, Greece, Rome and the Byzantine Empire", "Islamic societies, China, Africa, Japan, medieval Europe, the Americas and the Renaissance"],
};
