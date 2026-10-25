import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Louisiana's Grade 4 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Louisiana examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/la-g4-rocks-erosion": lesson(
    [
      "Weathering breaks rock. Erosion moves it. Deposition drops it in a new place.",
      "Water, wind and ice all cause erosion. Wind shapes sand dunes.",
      "Plants hold soil, so bare slopes wash away faster.",
      "In rock layers, the oldest layer is usually at the bottom.",
    ],
    "A river slows down and drops sand at its mouth. What is this called?",
    [
      "Dropping sediment in a new place is deposition.",
    ],
    "deposition",
  ),
  "science/la-g4-earth-hazards": lesson(
    [
      "Maps show patterns: mountains form long chains, and many volcanoes and earthquakes are along plate edges.",
      "Louisiana's biggest hazards are hurricanes and floods, so people build levees, raise homes on stilts and make evacuation plans.",
      "In any hazard, follow warnings: take shelter, or move to high ground when told to leave.",
    ],
    "How do levees reduce flood damage?",
    [
      "Levees are long walls of earth along a river.",
      "They keep high water from spreading into towns.",
    ],
    "they hold back high water",
  ),
  "science/la-g4-energy-resources": lesson(
    [
      "Renewable resources, like sunlight and wind, won't run out.",
      "Nonrenewable resources, like oil, coal and natural gas, will run out.",
      "Burning fossil fuels puts pollution and carbon dioxide into the air.",
      "Solar panels use sunlight, wind turbines use wind and dams use moving water.",
    ],
    "Gasoline is made from oil. Is it renewable?",
    [
      "Oil formed from ancient living things over millions of years.",
      "We use it much faster than it forms, so it will run out.",
    ],
    "no, it is nonrenewable",
  ),
  "social/la-g4-poverty-point": lesson(
    [
      "The first people in what would become Louisiana were nomads who hunted large animals.",
      "Later, people returned to the same camps each season and began building earthen mounds.",
      "At Poverty Point, about 3,500 years ago, people built huge ridges and mounds by hand and traded for stone and copper from far away.",
    ],
    "How did the people of Poverty Point get most of their food?",
    [
      "They were not farmers.",
      "They hunted, fished and gathered plants.",
    ],
    "hunting, fishing and gathering",
  ),
  "social/ca-g6-ancient-india": lesson(
    [
      "The Indo-Aryans brought a language that became Sanskrit; their ways blended with earlier ones.",
      "The caste system divided society; Brahmins were priests and teachers.",
      "Epics: the Ramayana tells of Rama and Sita; the Bhagavad Gita is part of the Mahabharata. The Maurya Empire united much of India.",
    ],
    "What were Brahmins?",
    [
      "They were the top group in the caste system.",
      "They led worship and taught.",
    ],
    "priests and teachers",
  ),
  "social/ca-g6-greece-rome": lesson(
    [
      "Athens had direct democracy: citizens voted on laws themselves.",
      "Rome became a republic, where citizens elected leaders. The Twelve Tables were its first written laws.",
      "Ideas like voting, a senate and written laws are part of US government today.",
    ],
    "In a republic, who makes most laws?",
    [
      "In direct democracy, every citizen votes on laws.",
      "In a republic, citizens elect people to do it.",
    ],
    "elected representatives",
  ),
  "social/ca-g6-hebrews-kush": lesson(
    [
      "The early Hebrews worshipped one God. The Ten Commandments are rules about worshipping God and treating others.",
      "King David made Jerusalem the capital. The Babylonians destroyed the First Temple in 587 BCE and sent many into exile.",
      "Kush, south of Egypt, built more pyramids than Egypt, at Meroë and Napata.",
    ],
    "Which city did King David make his capital?",
    [
      "It became the centre of the Israelite kingdom.",
      "The First Temple was built there.",
    ],
    "Jerusalem",
  ),
  "social/first-farmers": lesson(
    [
      "Early humans hunted animals and gathered plants for a very long time.",
      "About 12,000 years ago, people began farming and taming animals, called domestication.",
      "Extra food (a surplus) let some people do other jobs, and villages grew into cities.",
    ],
    "Why could some people in farming villages become potters?",
    [
      "Farms grew more food than people needed.",
      "With extra food, not everyone had to farm.",
    ],
    "food surpluses meant not everyone had to farm",
  ),
  "social/ny-g6-classical-china-india": lesson(
    [
      "The Qin united China; the Terracotta Army guarded its first emperor's tomb.",
      "The Han invented paper and chose officials by tests of Confucian teachings. Han China and Rome both had big armies and roads.",
      "India's Maurya and Gupta empires; the Gupta had a golden age of peace, wealth and achievement.",
    ],
    "During which dynasty was paper invented in China?",
    [
      "It came after the Qin.",
      "It was the dynasty that ruled about 400 years.",
    ],
    "the Han",
  ),
  "social/wa-g6-greece-rome": lesson(
    [
      "Athens is the birthplace of democracy. Homer wrote the epic poems the Iliad and the Odyssey.",
      "Rome was a republic with elected leaders and a senate; its first written laws were the Twelve Tables. Augustus became the first emperor.",
      "Alexander the Great's empire stretched from Greece to Egypt and India.",
    ],
    "Which US idea comes partly from ancient Rome?",
    [
      "Rome had elected leaders and a senate.",
      "The US also has elected representatives and a Senate.",
    ],
    "a republic with elected representatives and a senate",
  ),
  "social/wa-g6-mesopotamia-egypt": lesson(
    [
      "A civilization is a complex society with cities, government, jobs and often writing.",
      "Mesopotamia grew between the Tigris and Euphrates. Egypt grew along the Nile.",
      "Mesopotamians wrote in cuneiform and had Hammurabi’s Code. Egyptians used hieroglyphs.",
    ],
    "Why was writing laws down, as in Hammurabi’s Code, important?",
    [
      "Before, rules could change from person to person.",
      "Written laws let everyone know the same rules.",
    ],
    "people could know the rules and they applied the same way",
  ),
  "social/wa-g6-time-sources": lesson(
    [
      "BCE years count down toward year 1; CE years count up. So 500 BCE is earlier than 200 BCE.",
      "An artifact is an object made by people in the past.",
      "A primary source is from the time. A secondary source explains it later.",
    ],
    "Which year is earlier: 300 BCE or 100 BCE?",
    [
      "BCE years count down toward year 1.",
      "The bigger BCE number is longer ago.",
    ],
    "300 BCE",
  ),
  "social/where-civilizations-grew": lesson(
    [
      "Early civilizations grew along rivers: Mesopotamia, Egypt (the Nile), the Indus Valley and China.",
      "Rivers gave water and floods left rich soil for crops.",
      "Mountains, seas and deserts shaped life too, like Greek sailors on a rocky coast.",
    ],
    "Why did early civilizations grow along rivers?",
    [
      "People need water to drink and to grow food.",
      "River floods left rich soil.",
    ],
    "rivers gave water and rich soil for farming",
  ),
  "social/world-beliefs": lesson(
    [
      "Judaism and Christianity began in Southwest Asia; Hinduism and Buddhism in South Asia; Confucianism and Daoism in East Asia.",
      "Christianity follows Jesus of Nazareth. Karma (Hinduism, Buddhism) means actions affect your future. Daoism seeks harmony with the Dao.",
      "Constantine's Edict of Milan (313 CE) granted religious freedom.",
    ],
    "Where did Confucianism begin?",
    [
      "Confucius was a teacher in ancient China.",
      "China is in East Asia.",
    ],
    "East Asia",
  ),
};
