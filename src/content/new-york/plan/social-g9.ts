import type { Entry } from "../kit";

// New York social studies, Grade 9: Global History and Geography I (NYS K-12 Social Studies Framework, key ideas 9.1
// to 9.10, the Paleolithic Era to about 1750). New York teaches world history in Grade 9, so this course follows it
// (not civics). It adopts BC Grade 7 and 8 ancient and medieval units, California's Grade 6 and 7 units and Oregon's
// Grade 7 units, all free of other states' places and of Tribal content; New York's own units (../units/social-g9.ts)
// add belief systems compared, the Crusades and the Black Death, the Ottoman Empire and the Ming dynasty, absolutism
// and the Enlightenment, and the Encounter and the Atlantic world.
export const PLAN_SOCIAL_G9: Record<string, Entry[]> = {
  "9/social": [
    [
      "first-farmers",
      "adopt",
      "9.1; 9.1a",
      "the move from Paleolithic hunting and gathering to Neolithic farming and herding",
    ],
    [
      "where-civilizations-grew",
      "adopt",
      "9.1b; 9.1c",
      "how the first civilizations grew along river valleys, adapted to their environment and shared common features",
    ],
    [
      "ca-g6-greece-rome",
      "adopt",
      "9.3; 9.3a; 9.3b; 9.3c",
      "how classical Greece and Rome expanded, governed and reached golden ages of achievement",
    ],
    [
      "trade-networks",
      "adopt",
      "9.4; 9.4a; 9.4b; 9.4c",
      "how the Silk Road and other Afro-Eurasian trade networks carried goods, people and ideas",
    ],
    [
      "ca-g7-rome-byzantium",
      "adopt",
      "9.3d; 9.5a; 9.5b",
      "why the Western Roman Empire fell and how the Byzantine Empire carried on in the east",
    ],
    [
      "medieval-europe",
      "adopt",
      "9.5a; 9.6a",
      "feudalism, manors and the Church in Western Europe after the fall of Rome",
    ],
    [
      "islamic-world",
      "adopt",
      "9.5b; 9.5c",
      "the rise of Islam, the caliphates, and the achievements of Muslim scholars that spread through trade",
    ],
    [
      "or-g7-asian-empires",
      "adopt",
      "9.5b; 9.5c",
      "Tang and Song China, the Mongol Empire, and other Asian states and their achievements",
    ],
    [
      "or-g7-african-kingdoms",
      "adopt",
      "9.4d; 9.8a; 9.8c",
      "Ghana, Mali, Songhai and other African states, and how trans-Saharan trade helped them grow",
    ],
    [
      "ca-g7-aztec-inca",
      "adopt",
      "9.8; 9.8a; 9.8c",
      "the Maya, Aztec and Inca, their environments, cities and achievements, and their conquest by Spain",
    ],
    [
      "renaissance-and-reformation",
      "adopt",
      "9.9a; 9.9b",
      "the Renaissance, humanism and the printing press, and how the Reformation divided Western Europe",
    ],
  ],
};
