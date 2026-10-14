import type { Entry } from "../kit";

// New York social studies, Grades 5 and 6: the units New York uses from other frameworks. Grade 5 is the Western
// Hemisphere and Grade 6 the Eastern Hemisphere (NYS K-12 Social Studies Framework). Units about Canada can't be
// borrowed (the US contract), so Grade 5's geography, countries and governments are New York's own units
// (../units/social-g5.ts). No BC Grade 5 or 6 unit fits without Canada, so nothing is shared.
export const PLAN_SOCIAL_G56: Record<string, Entry[]> = {
  "5/social": [
    [
      "ca-g7-aztec-inca",
      "adopt",
      "5.2a; 5.2b; 5.2c",
      "the Maya city-states and the Aztec and Inca empires: their cities, farming, records and the Spanish conquest, and the Mississippian city of Cahokia",
    ],
    [
      "ca-g7-exploration-and-empire",
      "adopt",
      "5.3a; 5.3c; 5.3d",
      "why Europeans explored, the tools that helped them, the Columbian Exchange, and plantation slavery across the Atlantic",
    ],
  ],
  "6/social": [
    [
      "wa-g6-time-sources",
      "adopt",
      "6.2b; 6.2d",
      "counting time in BCE and CE, how archaeologists study artifacts, and judging sources about the ancient world",
    ],
    [
      "first-farmers",
      "adopt",
      "6.2a; 6.2c",
      "hunter-gatherers, the first farmers and the Neolithic Revolution",
    ],
    [
      "wa-g6-mesopotamia-egypt",
      "adopt",
      "6.3a; 6.3b; 6.3c; 6.3d",
      "the river valley civilizations of Mesopotamia and Egypt: farming, writing, laws, rulers and social classes",
    ],
    [
      "wa-g6-india-china",
      "adopt",
      "6.3b; 6.3c; 6.5a",
      "the Indus and Yellow River valleys, Chinese dynasties and the Mandate of Heaven, and inventions of ancient India and China",
    ],
    [
      "world-beliefs",
      "adopt",
      "6.4a; 6.4b; 6.4c",
      "where and when Judaism, Christianity, Islam, Hinduism, Buddhism and Confucianism began, their founders, teachings and holy texts",
    ],
    [
      "ca-g6-greece-rome",
      "adopt",
      "6.5a; 6.5b; 6.5c",
      "Athens and Sparta, the Roman Republic and Empire, and their governments and golden ages",
    ],
    [
      "ca-g7-rome-byzantium",
      "adopt",
      "6.6a; 6.6b",
      "why the Western Roman Empire fell and how the Byzantine Empire carried on Roman law and Orthodox Christianity",
    ],
    [
      "medieval-europe",
      "adopt",
      "6.6a; 6.6d",
      "feudalism, manors, the Church, towns and the Crusades in medieval Western Europe",
    ],
    [
      "islamic-world",
      "adopt",
      "6.6c; 6.7a",
      "the spread of Islam, the caliphates, Baghdad and al-Andalus, and how Muslim scholars and traders spread ideas",
    ],
    [
      "wa-g6-trade-beliefs",
      "adopt",
      "6.4a; 6.7a",
      "the Silk Road and Indian Ocean trade, and how religions and ideas spread along trade routes",
    ],
    [
      "trade-networks",
      "adopt",
      "6.7a; 6.7c",
      "barter, specialization and trade, and the goods and ideas that moved on the Silk Roads and across the Indian Ocean",
    ],
  ],
};
