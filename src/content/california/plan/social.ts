import type { Entry } from "../kit";

// California social: the units California uses from other frameworks, per grade ("<grade>/social"). Codes are the
// History–Social Science Content Standards (Grade 9 cites the Principles of American Democracy, 12.1 to 12.10). Only
// general units free of Canadian content, Washington State and Oregon are adopted, and never Washington's or
// Oregon's Tribal units. Where a Washington or Oregon unit fits except for its state's items, California has a
// filtered `ca-` copy in ../units/social*; Grade 4 (California history) and most of Grades 5 to 9 are California's own.
// Grade 6 uses BC Grade 7's ancient-world units and Grade 7 BC Grade 8's and Alberta Grade 8's units, found in
// Oregon's courses of the same grade, which lift them (Oregon is in each California pool).
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    [
      "families",
      "share",
      "K.6.3",
      "how people lived in earlier times, through the people in a child's family",
    ],
    [
      "fair-and-kind",
      "adopt",
      "K.1.1",
      "following rules such as sharing and taking turns, and knowing what happens when they are broken",
    ],
    [
      "places-near-me",
      "adopt",
      "K.3; K.4.4",
      "the work people do in the community and the places where they do it",
    ],
    [
      "mb-k-jobs-and-rules",
      "adopt",
      "K.1.1; K.3",
      "rules at school and the jobs people do there and in the community",
    ],
    [
      "or-k-money-and-work",
      "adopt",
      "K.3",
      "the work people do and the goods and services they earn money for",
    ],
  ],
  "1/social": [
    [
      "maps",
      "share",
      "1.2.3",
      "reading and making simple maps with cardinal directions and map symbols",
    ],
    [
      "our-land",
      "share",
      "1.2.4",
      "how location, weather and the physical environment affect the way people live",
    ],
    [
      "my-community",
      "share",
      "1.5.1",
      "the ways people are all part of the same community",
    ],
    [
      "respect-and-inclusion",
      "adopt",
      "1.1.2",
      "fair play, good sportsmanship and respect for the rights and opinions of others",
    ],
    [
      "community-services",
      "adopt",
      "1.6.2",
      "the specialized work people do to provide goods and services",
    ],
    [
      "wa-g1-earn-save-share",
      "adopt",
      "1.6.1",
      "exchange and the use of money to buy goods and services",
    ],
  ],
  "2/social": [
    [
      "then-and-now",
      "adopt",
      "2.1.1; 2.1.2",
      "family history from sources, and comparing daily life with that of parents and grandparents",
    ],
    [
      "communities-compared",
      "adopt",
      "2.2.4",
      "comparing land use in urban, suburban and rural places",
    ],
    [
      "ns-community-change-2",
      "adopt",
      "2.1.2; 2.1.3",
      "how daily life has changed over time, and putting events in order",
    ],
    [
      "mb-working-together",
      "adopt",
      "2.3.2",
      "ways groups work together to resolve problems",
    ],
    [
      "or-g2-world-maps",
      "adopt",
      "2.2.2",
      "labeling a map of North America with its countries and oceans, and the continents",
    ],
  ],
  "3/social": [
    [
      "meeting-needs",
      "share",
      "3.1.2",
      "how people use the resources of a region and change the environment to meet their needs",
    ],
    [
      "mb-working-together",
      "adopt",
      "3.4.2",
      "public virtue and the role of citizens in solving problems together",
    ],
  ],
  // Grade 4 is California, a changing state: every unit is California's own (../units/social-g4.ts).
  "5/social": [
    [
      "or-g5-timeline",
      "adopt",
      "5.4.1; 5.5.1; 5.7.2",
      "putting the events from the founding of the colonies to the Constitution in order",
    ],
    // Every state and capital appears in this unit, Washington and Oregon among them (california.test.ts allows it).
    [
      "or-g5-states-capitals",
      "adopt",
      "5.9",
      "the location of the 50 states and the names of their capitals",
    ],
  ],
  "6/social": [
    [
      "wa-g6-time-sources",
      "adopt",
      "6.1",
      "what archaeology and other sources tell us about early peoples, and counting time in BCE and CE",
    ],
    [
      "first-farmers",
      "adopt",
      "6.1.1; 6.1.3",
      "hunter-gatherer societies and the move to farming",
    ],
    [
      "where-civilizations-grew",
      "adopt",
      "6.1.2; 6.2.1",
      "where early human communities settled and why the first civilizations grew in river valleys",
    ],
    [
      "wa-g6-mesopotamia-egypt",
      "adopt",
      "6.2.1; 6.2.2; 6.2.4; 6.2.5; 6.2.9",
      "Mesopotamia and Egypt: river systems, farming, Hammurabi's Code, Egyptian art and early writing",
    ],
    [
      "laws-and-government",
      "adopt",
      "6.2.3; 6.4.3; 6.7.2",
      "how religion and the social order were linked, Athenian democracy and the Roman Republic",
    ],
    [
      "wa-g6-india-china",
      "adopt",
      "6.5.1; 6.5.3; 6.5.5; 6.6.1; 6.6.3",
      "the Indus Valley, Hinduism and Buddhism, the Huang He and Confucius",
    ],
    [
      "world-beliefs",
      "adopt",
      "6.3.1; 6.5.5; 6.6.3; 6.7.6",
      "the origins and central teachings of Judaism, Buddhism, Confucianism and Christianity",
    ],
    [
      "trade-networks",
      "adopt",
      "6.2.6; 6.6.7",
      "Egyptian trade and the silk roads",
    ],
  ],
  "7/social": [
    [
      "islamic-world",
      "adopt",
      "7.2.2; 7.2.5; 7.2.6",
      "the origins of Islam, the growth of cities and trade, and the exchange of ideas among Muslim scholars",
    ],
    [
      "or-g7-asian-empires",
      "adopt",
      "7.3.1; 7.3.4; 7.3.5",
      "China under the Tang, Song, Mongol and Ming dynasties, and its trade and inventions",
    ],
    [
      "or-g7-african-kingdoms",
      "adopt",
      "7.4.1; 7.4.3; 7.4.5",
      "the kingdoms of West Africa, trans-Saharan trade and the role of written and oral traditions",
    ],
    [
      "japan-land-values-ab",
      "adopt",
      "7.5.1; 7.5.3",
      "Japan's geography and how it shaped the culture and government of medieval Japan",
    ],
    [
      "medieval-europe",
      "adopt",
      "7.6.1; 7.6.3; 7.6.5",
      "the geography of Europe, feudalism and the development of English legal practices",
    ],
    [
      "renaissance-and-reformation",
      "adopt",
      "7.8.1; 7.8.4; 7.9.1; 7.9.2",
      "humanism, the printing press, and the causes and ideas of the Reformation",
    ],
    [
      "or-g7-age-of-revolutions",
      "adopt",
      "7.11.5; 7.11.6",
      "how Enlightenment thinkers and the Magna Carta shaped democratic thought and revolutions",
    ],
  ],
  "8/social": [
    [
      "wa-g8-bill-of-rights",
      "adopt",
      "8.2.6",
      "the powers of government in the Constitution and the liberties the Bill of Rights ensures",
    ],
    [
      "or-g8-reconstruction",
      "adopt",
      "8.11.1; 8.11.3; 8.11.4; 8.11.5",
      "the aims and effects of Reconstruction, the Freedmen's Bureau, the Klan, and the 13th, 14th and 15th Amendments",
    ],
  ],
  // Grade 9 is the Principles of American Democracy: Washington's civics units name Washington State, so every
  // unit is a California copy or California's own.
};
