import type { Unit } from "../../types";
import { bankUnit } from "../own";
import { BELIEFS, CRUSADES_PLAGUE, OTTOMAN_MING } from "./social-g9-postclassical";
import { ABSOLUTISM_ENLIGHTENMENT, ATLANTIC_WORLD } from "./social-g9-early-modern";

// New York's own Grade 9 social units (`ny-` ids): Global History and Geography I topics that the adopted units leave
// out or touch only lightly. Many items are short document-style questions (a source summarized in our own words,
// then a question about what it shows), as on New York's Global History exams. Religions are described factually and
// respectfully, and Indigenous peoples of the Americas and peoples of Africa are named as living communities.
export const UNITS: Unit[] = [
  bankUnit({
    id: "ny-g9-belief-systems",
    title: "Belief Systems Compared",
    emoji: "📜",
    blurb: "Beliefs, practices and how they shaped societies",
    parentNote:
      "Hinduism, Buddhism, Judaism, Christianity, Islam, Confucianism and Daoism compared: where each began, its main teachings and texts, how it spread, and how belief systems were used to unify people and shaped social order and gender roles.",
    standards: [
      "9.2; 9.2a; 9.2b; 9.7a",
      "the beliefs, practices and spread of major belief systems, and how they unified people and shaped social order and gender roles",
    ],
    items: BELIEFS,
  }),
  bankUnit({
    id: "ny-g9-crusades-plague",
    title: "Crusades & the Black Death",
    emoji: "⚔️",
    blurb: "Conflict and disease in the postclassical world",
    parentNote:
      "Disputes between popes, emperors and churches, the causes and effects of the Crusades and the Reconquista, and how the Black Death spread along trade routes and changed society, the economy and the Church.",
    standards: [
      "9.6; 9.6a; 9.6b",
      "conflicts over religious and political authority, the Crusades, and how the Black Death spread along trade networks and changed societies",
    ],
    items: CRUSADES_PLAGUE,
  }),
  bankUnit({
    id: "ny-g9-ottoman-ming",
    title: "Ottoman & Ming Empires",
    emoji: "🕌",
    blurb: "Two great powers, 1368 to 1600",
    parentNote:
      "How the Ottoman Empire and Ming China rose, how Islam and Neo-Confucianism shaped their governments and societies, how each ruled people of many backgrounds, and how they saw their place in the world.",
    standards: [
      "9.7; 9.7a; 9.7b; 9.7c",
      "the rise, organization and worldviews of the Ottoman Empire and the Ming dynasty, and the belief systems that shaped them",
    ],
    items: OTTOMAN_MING,
  }),
  bankUnit({
    id: "ny-g9-absolutism-enlightenment",
    title: "Absolutism to Enlightenment",
    emoji: "👑",
    blurb: "Kings, scientists and new ideas about power",
    parentNote:
      "Absolute monarchs in France, Spain and Russia, the Scientific Revolution's challenge to old authorities, and Enlightenment thinkers such as Hobbes, Locke, Montesquieu and Rousseau and their ideas about government.",
    standards: [
      "9.9; 9.9c; 9.9d; 9.9e",
      "absolute monarchs in Western Europe and Russia, the Scientific Revolution, and Enlightenment ideas about political power",
    ],
    items: ABSOLUTISM_ENLIGHTENMENT,
  }),
  bankUnit({
    id: "ny-g9-atlantic-world",
    title: "Encounter & the Atlantic World",
    emoji: "🧭",
    blurb: "Exploration, exchange and the Atlantic slave trade",
    parentNote:
      "Why and how Europeans explored, the Columbian Exchange, the devastating effect on Indigenous peoples of the Americas, the Atlantic slave trade and its effects on Africa, and how new ocean routes changed older trade networks.",
    standards: [
      "9.10; 9.10a; 9.10b; 9.10c; 9.10d; 9.10e",
      "European exploration, the Columbian Exchange, colonization, the Atlantic slave trade, and the shift in global trade networks",
    ],
    items: ATLANTIC_WORLD,
  }),
];
