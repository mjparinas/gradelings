// What each North Carolina course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the
// grade's main topics in the North Carolina Standard Course of Study for mathematics; English language arts follows the
// strands of the 2017 English language arts standards (reading, foundations and language, writing and speaking); science
// follows the grade's physical, life and Earth and space science standards; social studies follows the grade's theme in
// the 2021 social studies standards. Written in the app's house style; North Carolina families see it in US English.

const MATH = (topics: string) => [
  `Number and operations: ${topics}`,
  "Algebraic thinking: patterns, relationships and equations",
  "Measurement, data and geometry: measuring, shapes and reading what data shows",
];

const ELA = (texts: string, foundations: string) => [
  `Reading: ${texts}`,
  `Foundations and language: ${foundations}`,
  "Writing, speaking and listening: writing with purpose and sharing ideas with others",
];

export const FOCUS: Record<string, string[]> = {
  "k/math": MATH("counting to 100, numbers to 20, and adding and subtracting within 10"),
  "1/math": MATH("adding and subtracting within 20, place value to 120, and telling time"),
  "2/math": MATH("adding and subtracting within 1,000, place value, money and time"),
  "3/math": MATH("multiplying and dividing within 100, adding and subtracting to 1,000, and fractions"),
  "4/math": MATH("multi-digit multiplication and division, equivalent fractions, and decimals"),
  "5/math": MATH("operations with fractions and decimals, and volume"),
  "6/math": MATH("ratios and rates, negative numbers, and expressions"),
  "7/math": MATH("proportional relationships, integers, and equations"),
  "8/math": MATH("linear equations, functions, and the Pythagorean theorem"),
  "9/math": MATH("NC Math 1: expressions, equations, functions and data"),

  "k/language": ELA("listening to stories and finding key details", "letters, sounds and first words"),
  "1/language": ELA("retelling stories and reading short information texts", "phonics, fluency and writing sentences"),
  "2/language": ELA("understanding stories and how information texts are built", "reading with fluency, spelling and grammar"),
  "3/language": ELA("theme, main idea and how authors make their point", "fluency, word parts and complete sentences"),
  "4/language": ELA("text structure, theme and evidence", "fluency, vocabulary and grammar"),
  "5/language": ELA("comparing texts and points of view", "word meanings and clear, correct sentences"),
  "6/language": ELA("analyzing arguments, sources and the techniques authors use", "vocabulary and grammar for clear writing"),
  "7/language": ELA("evaluating claims, media and how texts are structured", "word choice and varied sentences"),
  "8/language": ELA("analyzing how authors build meaning and argue", "vocabulary and conventions for formal writing"),
  "9/language": ELA("complex literature, information texts and arguments", "precise words and polished conventions"),

  "k/science": ["Properties of objects and what they are made of", "Living and non-living things, and how animals and plants differ", "Weather from day to day and season to season"],
  "1/science": ["Pushes, pulls and motion", "What plants and animals need", "The sky, Earth materials and natural resources"],
  "2/science": ["Solids and liquids, and sound", "Animal life cycles, and how young animals resemble their parents", "The sun's energy and weather"],
  "3/science": ["Matter, motion and heat", "The human skeleton and muscles, and how plants grow", "The solar system, and Earth's land and water"],
  "4/science": ["Magnets, electricity, energy and light", "Adaptations and fossils", "Day and night, moon phases, rocks and minerals, and caring for the environment"],
  "5/science": ["Changes in matter, and forces and motion", "Body systems, ecosystems and inherited traits", "Weather and climate, and the ocean's effect on North Carolina"],
  "6/science": ["Atoms, heat and waves", "Plants and the flow of energy in ecosystems", "The solar system, Earth's layers and the rock cycle"],
  "7/science": ["Motion, forces and energy", "Cells, body systems and heredity", "The atmosphere, weather and climate"],
  "8/science": ["Elements, compounds and chemical change", "Disease, ecosystems and evolution", "Earth's history, its water and energy resources"],
  "9/science": ["Biology: cells, genetics, ecology and evolution", "Physical science: atoms, chemical reactions and nuclear changes", "Physical science: motion, electricity, energy and waves"],

  "k/social": ["Cultures and traditions near and far", "Rules, and working together", "Needs and wants, maps, and change over time"],
  "1/social": ["Communities and how people shape them", "Landforms, maps and the environment", "Scarcity, supply and demand, and trade"],
  "2/social": ["American values and symbols", "Freedom, equality and the three branches of government", "How people settled and built America"],
  "3/social": ["North Carolina communities and their history", "State, local and tribal government", "Resources, entrepreneurs and the local economy"],
  "4/social": ["North Carolina's regions and first peoples", "North Carolina history, from the colony to today", "North Carolina's government and economy, and money choices"],
  "5/social": ["The colonies, the Revolution and the Constitution", "Growth, the Civil War and Reconstruction", "Industry, the Great Depression, civil rights and money choices"],
  "6/social": ["Early civilizations of Africa, Asia, Europe and the Americas", "Governments, beliefs and achievements of ancient times", "Trade and the rise and fall of empires before 1400"],
  "7/social": ["The world since 1400: exploration, revolutions and new ideas", "Economic systems and global connections", "Human rights, the world wars and independence movements"],
  "8/social": ["North Carolina and the nation, from the colonies to today", "Democratic ideals and reforms", "Industry, innovation and the economy"],
  "9/social": ["The founding principles of the United States and North Carolina", "Government, courts, elections and citizenship", "Economics and personal finance"],
};
