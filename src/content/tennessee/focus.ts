// What each Tennessee course focuses on, shown to parents as the course overview ("Focus areas"). Math lists the grade's
// main topics in the Tennessee Academic Standards for Mathematics; English language arts follows the strands of the 2019
// standards (reading, writing, speaking and listening, foundational literacy and language); science lists the grade's
// topics in the 2022 science standards; social studies follows the grade's theme in the 2024 social studies standards.
// Written in the app's house style; Tennessee families see it in US English.

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

  "k/science": ["Pushes, pulls and how things move", "Sunlight, weather and the seasons", "What plants and animals need, and caring for Earth"],
  "1/science": ["Light and sound", "How plants and animals grow and survive", "Patterns of the sun, moon and stars"],
  "2/science": ["Pushes, pulls and motion", "Animals, habitats and life cycles", "How Earth's land and water change"],
  "3/science": ["Matter, forces and magnets", "Life cycles, traits and survival", "Weather, climate and the solar system"],
  "4/science": ["Energy, waves and light", "Ecosystems and food webs", "Earth's surface, fossils and natural resources"],
  "5/science": ["Matter and its changes", "Forces, motion and gravity", "Stars, the sun and the solar system"],
  "6/science": ["Energy and heat", "Ecosystems and biodiversity", "Weather, climate and Earth's resources"],
  "7/science": ["Atoms, molecules and chemical reactions", "Cells, body systems and heredity", "Matter and energy in living things"],
  "8/science": ["Forces, motion and fields", "Waves and information", "Earth's history, plates and natural selection"],
  "9/science": ["Biology: cells, heredity, ecosystems and evolution", "Physical science: matter and chemical reactions", "Physical science: motion, energy and waves"],

  "k/social": ["Me, my family, my school and my community", "Needs and wants, jobs and money", "Maps, calendars, and Tennessee's and the nation's symbols"],
  "1/social": ["Cultures in my community and Tennessee", "Maps of Tennessee and its three grand divisions", "Goods and services, rules and laws, and Tennessee's symbols"],
  "2/social": ["Life in the United States: producers, consumers and trade", "Maps, hemispheres, and Tennessee and its neighbors", "Constitutions, the three branches and national symbols"],
  "3/social": ["Early Americans, explorers and the thirteen colonies", "The American Revolution and the Constitution", "A growing nation, from the War of 1812 to westward expansion"],
  "4/social": ["Slavery, the Civil War and Reconstruction", "Industry, immigration and the Progressive Era", "World wars, the Great Depression and the Civil Rights Movement"],
  "5/social": ["Tennessee history, from the first peoples to statehood", "Tennessee in the Civil War, the 1900s and today", "Geography of Tennessee, the United States and the world"],
  "6/social": ["Early humans and the first civilizations", "Ancient Egypt, Israel, India and China", "Ancient Greece and Rome"],
  "7/social": ["The Byzantine Empire, Islam and African kingdoms", "China, Japan and medieval Europe", "The Renaissance, Reformation and the age of exploration"],
  "8/social": ["The thirteen colonies and the American Revolution", "The Constitution and the new nation, with Tennessee's statehood", "A nation divided: the Civil War and Reconstruction"],
  "9/social": ["United States Government and Civics", "Tennessee's government and taking part", "Economics: markets, money and policy"],
};
