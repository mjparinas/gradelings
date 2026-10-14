// What each Alabama course focuses on, shown to parents as the course overview ("Focus areas"), keyed
// "<grade>/<subject>". It follows the content areas of the Alabama Courses of Study with the grade's main topics.
// Written in the app's house style; Alabama families see it in US English.

const MATH = (number: string, more: string) => [
  `Numbers and operations: ${number}`,
  `Measurement, data and geometry: ${more}`,
  "Student mathematical practices: making sense of problems and explaining reasoning",
];

const LANGUAGE = (reading: string, writing: string) => [
  `Reading: ${reading}`,
  `Writing, speaking and listening: ${writing}`,
  "Vocabulary and language: building word knowledge and using grammar, spelling and punctuation",
];

const SCIENCE = (big: string, practice: string) => [big, `Science and engineering practices: ${practice}`, "Engineering design: solving real problems in Alabama and beyond"];

const SOCIAL = (course: string, ...rest: string[]) => [`Course: ${course}`, ...rest];

export const FOCUS: Record<string, string[]> = {
  "k/math": MATH("counting to 100, numbers to 20, and adding and subtracting within 10", "naming and comparing shapes, comparing lengths and weights, and sorting"),
  "1/math": MATH("adding and subtracting within 20, and place value to 120", "measuring length, telling time, halves and fourths, and reading simple graphs"),
  "2/math": MATH("adding and subtracting within 1000, place value, and skip-counting", "measuring in inches and centimeters, time, money, equal parts of shapes, and graphs"),
  "3/math": MATH("multiplying and dividing within 100, rounding, and fractions as numbers", "area and perimeter, time, measurement, and scaled graphs"),
  "4/math": MATH("multi-digit multiplication and division, equivalent fractions, and decimals", "measurement conversions, angles, classifying shapes, and line plots"),
  "5/math": MATH("operations with decimals and fractions, and numerical expressions", "volume, the coordinate plane, and converting units"),
  "6/math": MATH("ratios and rates, dividing fractions, integers, and expressions and equations", "area, surface area and volume, and statistics"),
  "7/math": MATH("proportional relationships, operations with rational numbers, and equations and inequalities", "scale drawings, circles, angles, probability and sampling"),
  "8/math": MATH("the real numbers, exponents, linear equations, systems and functions", "the Pythagorean theorem, transformations, volume, and scatter plots"),
  "9/math": MATH("Geometry with Data Analysis: rewriting radicals, and Algebra I with Probability for students on that path", "transformations, congruence and similarity, right triangles, circles, and statistics"),

  "k/language": LANGUAGE("letters and sounds, rhyming, sight words, and asking about stories", "drawing and telling ideas, and taking turns in conversation"),
  "1/language": LANGUAGE("phonics, reading with fluency, and retelling stories and facts", "writing sentences and short pieces, and sharing ideas"),
  "2/language": LANGUAGE("decoding longer words, main ideas, and comparing stories", "writing opinions, information and stories, and asking questions"),
  "3/language": LANGUAGE("reading fluently, characters, main idea and text features", "organizing paragraphs, and presenting to others"),
  "4/language": LANGUAGE("theme, inference, point of view and comparing texts", "writing with reasons and evidence, and research"),
  "5/language": LANGUAGE("summarizing, point of view, and figurative language", "building arguments, and research from several sources"),
  "6/language": LANGUAGE("central idea, citing evidence, and author's purpose", "argument writing, and judging media messages"),
  "7/language": LANGUAGE("theme and analysis across texts", "research, and argument with evidence and counterclaims"),
  "8/language": LANGUAGE("analyzing structure, tone and arguments", "research, argument and narrative writing"),
  "9/language": LANGUAGE("complex literary and informational texts", "argument and research, and discussion"),

  "k/science": SCIENCE("Pushes and pulls, plants and animals and their needs, weather and the sun's warmth", "observing, sorting and asking questions"),
  "1/science": SCIENCE("Light and sound, plant and animal parts, parents and young, and patterns in the sky", "planning simple tests and designing solutions"),
  "2/science": SCIENCE("Properties of matter, habitats and living things, and how Earth's land changes", "testing ideas and comparing designs"),
  "3/science": SCIENCE("Forces and magnets, life cycles and traits, habitats, and weather and climate", "investigating with fair tests"),
  "4/science": SCIENCE("Energy and waves, plant and animal structures, and Earth's changing surface", "making models and comparing solutions"),
  "5/science": SCIENCE("Matter and its changes, energy in food webs, and Earth's systems and the sun and stars", "measuring, graphing and designing devices"),
  "6/science": SCIENCE("Earth and Space Science: the sun, Earth and moon, the solar system, rocks and plate tectonics, weather and resources", "analyzing data and building models"),
  "7/science": SCIENCE("Life Science: cells, body systems, ecosystems, heredity and adaptation", "arguing from evidence"),
  "8/science": SCIENCE("Physical Science: atoms and the periodic table, reactions, forces and motion, energy and waves", "planning investigations and using math"),
  "9/science": SCIENCE("Biology: cells, DNA and heredity, evolution, and ecosystems", "explaining with evidence and models"),

  "k/social": SOCIAL("Living and Working Together in Family and Community", "Rules, responsibilities and community helpers", "Needs, wants, goods and services", "Maps of places near me, and words for past and present"),
  "1/social": SOCIAL("Living and Working Together in Community and State", "Leaders, laws and good citizens", "Jobs, saving and spending", "Alabama on a map, and life long ago"),
  "2/social": SOCIAL("Living and Working Together in State and Nation", "Our state and national government and symbols", "Producers, consumers and trade", "Alabama's regions, and Americans who made a difference"),
  "3/social": SOCIAL("Alabama in American History and Government I: Geography and Settlement", "Alabama's land, regions and resources", "Earning, spending and trade", "Indigenous peoples of Alabama, and European exploration"),
  "4/social": SOCIAL("Alabama in American History and Government II: Colonies to 1900", "The colonies and the American Revolution", "Statehood and westward expansion", "The Civil War and Reconstruction in Alabama"),
  "5/social": SOCIAL("Alabama in American History and Government III: Twentieth Century to Present", "The Progressive Era and the world wars", "The Great Depression and the New Deal", "The Civil Rights Movement, Alabama in space, and today"),
  "6/social": SOCIAL("Making a New Nation: United States Beginnings and Civic Foundations", "Colonization of North America", "The American Revolution", "Creating a government, and citizens' rights and responsibilities"),
  "7/social": SOCIAL("World History and Geography: Geographic Principles and Ancient Civilizations", "Geography skills and early humans", "River valley civilizations", "Ancient Greece and Rome, India and China"),
  "8/social": SOCIAL("World History and Geography: Middle Ages to the Enlightenment", "Medieval Europe and the Byzantine Empire", "The Islamic world, Africa and Asia", "The Renaissance, Reformation, exploration and the Enlightenment"),
  "9/social": SOCIAL("World History and Geography: Age of Revolution to Present", "Revolutions and the Industrial Revolution", "Imperialism and the world wars", "The Cold War, globalization and the world today"),
};
