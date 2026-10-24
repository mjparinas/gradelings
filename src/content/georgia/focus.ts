// What each Georgia course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the grade's
// main topics in Georgia's K-12 Mathematics Standards, grouped by its big ideas; English language arts follows the four
// domains of Georgia's K-12 English Language Arts Standards (foundations, language, texts and practices); science
// follows the grade's Georgia Standards of Excellence (Earth and space, life and physical science); social studies
// follows the grade's focus in the Georgia Standards of Excellence for social studies. Written in the app's house
// style; Georgia families see it in US English.

const MATH = (topics: string) => [
  `Numerical reasoning: ${topics}`,
  "Patterning and algebraic reasoning: patterns, relationships and equations",
  "Measurement, data and geometric reasoning: measuring, shapes and reading what data shows",
];

const ELA = (texts: string, foundations: string) => [
  `Texts: ${texts}`,
  `Foundations and language: ${foundations}`,
  "Practices: reading closely, writing with purpose, and sharing ideas with others",
];

export const FOCUS: Record<string, string[]> = {
  "k/math": MATH("counting to 100, numbers to 20, and adding and subtracting within 10"),
  "1/math": MATH("adding and subtracting within 20, place value to 120, and telling time"),
  "2/math": MATH("adding and subtracting within 1,000, place value, money and time"),
  "3/math": MATH("multiplying and dividing within 100, numbers to 10,000, and fractions as numbers"),
  "4/math": MATH("multi-digit multiplication and division, equivalent fractions, and decimals"),
  "5/math": MATH("operations with fractions and decimals, and volume"),
  "6/math": MATH("ratios and rates, negative numbers, and expressions"),
  "7/math": MATH("proportional relationships, integers, and equations"),
  "8/math": MATH("linear equations, functions, and the Pythagorean theorem"),
  "9/math": MATH("high school algebra and geometry: expressions, equations, functions and data"),

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

  "k/science": ["Earth materials, and the day and night sky", "Living and non-living things", "Pushes, pulls and the materials objects are made of"],
  "1/science": ["Weather and seasons", "What plants and animals need", "Light, shadows, sound and magnets"],
  "2/science": ["Stars, the sun and the moon", "Changes in the land, and life cycles", "Properties of matter, and changes in motion"],
  "3/science": ["Rocks, minerals and soil, and fossils", "Georgia's habitats, and pollution and conservation", "Heat and temperature"],
  "4/science": ["Stars, the solar system and the moon", "Weather and the water cycle", "Light, sound, forces and motion, and ecosystems"],
  "5/science": ["How the land changes, from erosion to earthquakes", "Classifying living things, cells and microorganisms", "Physical and chemical changes, electricity and magnetism"],
  "6/science": ["The universe, the solar system and Earth's seasons", "Rocks, plate tectonics and Earth's surface", "Weather, climate and Earth's water"],
  "7/science": ["Classifying living things, and cells", "Body systems, heredity and evolution", "Ecosystems and the flow of energy"],
  "8/science": ["Atoms, elements and chemical changes", "Forces, motion and energy", "Waves, electricity and magnetism"],
  "9/science": ["Biology: cells, genetics, ecology and evolution", "Physical science: atoms, chemical reactions and the periodic table", "Physical science: forces, energy, waves and electricity"],

  "k/social": ["Holidays and American symbols", "Good citizens and the work people do", "Maps, globes, and choices about money"],
  "1/social": ["Historical figures and how they shaped America", "Continents, oceans and landforms", "Goods and services, and saving and spending"],
  "2/social": ["Georgia's historical figures, and the Muscogee (Creek) and Cherokee", "Georgia's regions and rivers", "Leaders, laws and choices about money"],
  "3/social": ["Early American Indian cultures and European exploration", "The thirteen colonies, and United States geography", "Representative democracy and productive resources"],
  "4/social": ["The American Revolution and the Constitution", "Westward expansion, abolition and the Civil War", "Reconstruction, rights and personal budgets"],
  "5/social": ["Life at the turn of the century, and World War I", "The Great Depression, World War II and the Cold War", "Civil rights, changes since 1975, and the US economy"],
  "6/social": ["Latin America: land, history and people", "Europe: land, history and the European Union", "Australia, and economic and government systems"],
  "7/social": ["Africa: land, history and people", "Southwest Asia (the Middle East)", "Southern and Eastern Asia"],
  "8/social": ["Georgia's land and its first peoples", "Georgia history, from the colony to today", "Georgia's government and economy"],
  "9/social": ["American government: the Constitution, the three branches and rights", "Elections, citizenship, and state and local government", "Personal finance: income, budgets, credit and investing"],
};
