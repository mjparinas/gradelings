import type { FrItem } from "../../french";

// Extra items appended to the Grade 8 Immersion banks so a child can
// practise for weeks without seeing the same question.

const REG_HINT = "Il y a trois registres : familier (entre amis, parfois de l'argot), courant (la langue de tous les jours) et soutenu (raffiné, littéraire).";
const COM_HINT = "La communication verbale utilise la voix : intonation, volume, débit, ton, pauses. La communication non verbale utilise le corps : gestes et mimiques.";
const MOOD_HINT = "Le futur simple parle de ce qui arrivera : j'irai, tu iras. Le conditionnel présent exprime une demande polie ou une possibilité : je voudrais, j'irais.";

const reg = (sentence: string, right: "Familier" | "Courant" | "Soutenu"): FrItem => [
  `Quel registre de langue est utilisé? « ${sentence} »`,
  right,
  ["Familier", "Courant", "Soutenu"].filter((r) => r !== right),
  REG_HINT,
];

export const REGISTERS_DEEP: FrItem[] = [
  reg("J'ai faim, y'a quoi à bouffer?", "Familier"),
  reg("J'ai faim, qu'y a-t-il à manger?", "Courant"),
  reg("Je suis affamé, que pourrait-on me servir?", "Soutenu"),
  reg("Il est ouf, ce film!", "Familier"),
  reg("Ce film est très étonnant.", "Courant"),
  reg("Ce film se révèle fort saisissant.", "Soutenu"),
  reg("Mon frère est crevé, il roupille.", "Familier"),
  reg("Mon frère est fatigué, il dort.", "Courant"),
  reg("Mon frère est épuisé, il repose.", "Soutenu"),
  ["Comment dit-on « enfant » en langue familière?", "gamin", ["bambin", "progéniture"], "Gamin est un mot familier pour enfant. Progéniture est soutenu."],
  ["Comment dit-on « maison » en langue familière?", "baraque", ["demeure", "habitation"], "Baraque est un mot familier pour maison. Demeure est soutenu."],
  ["Comment dit-on « manger » en langue familière?", "bouffer", ["se restaurer", "se nourrir"], "Bouffer est un mot familier pour manger."],
  ["Quel mot soutenu veut dire « vêtement »?", "habit", ["fringue", "nippe"], "Fringue et nippe sont familiers; habit est plus soutenu."],
  ["Quelle phrase conviendrait dans un discours officiel?", "Je vous remercie de votre présence.", ["Merci d'être venus, les gars!", "Merci d'avoir ramené vos fesses."], REG_HINT],
  ["Quelle phrase conviendrait dans un message à un ami?", "Salut! T'es dispo ce soir?", ["Je vous prie de bien vouloir me répondre.", "Seriez-vous disposé à me rencontrer?"], REG_HINT],
  ["Quel registre convient pour un courriel à un employeur?", "Courant ou soutenu", ["Familier", "De l'argot"], REG_HINT],
];

export const COMMUNICATION_DEEP: FrItem[] = [
  ["Mia chuchote pour ne pas réveiller le bébé. Quel élément verbal utilise-t-elle?", "Le volume", ["Les gestes", "Les mimiques"], COM_HINT],
  ["Noah fait une longue pause avant de répondre. Quel élément verbal utilise-t-il?", "Les pauses", ["Le sourire", "Les mains"], COM_HINT],
  ["Zoé lève les sourcils pour montrer sa surprise. Quel élément non verbal utilise-t-elle?", "Les mimiques du visage", ["L'intonation", "Le débit"], COM_HINT],
  ["Samir hoche la tête pour dire oui. Quel élément non verbal utilise-t-il?", "Les gestes", ["Le ton de la voix", "Le volume"], COM_HINT],
  ["Léa monte la voix à la fin d'une question. Quel élément verbal utilise-t-elle?", "L'intonation", ["Un clin d'œil", "Un haussement d'épaules"], COM_HINT],
  ["Quel élément est non verbal?", "Un pouce levé", ["Le débit", "Les pauses"], COM_HINT],
  ["Quel élément est non verbal?", "Le regard", ["Le volume", "Le ton"], COM_HINT],
  ["Quel élément est verbal?", "Le volume de la voix", ["Un sourire", "Un geste de la main"], COM_HINT],
  ["Pour bien se faire comprendre, comment faut-il parler dans un exposé?", "Clairement et pas trop vite", ["Très bas et très vite", "Sans jamais faire de pause"], COM_HINT],
  ["Pourquoi regarde-t-on son public pendant un exposé?", "Pour garder son attention", ["Pour lire plus vite", "Pour éviter de parler"], COM_HINT],
  ["Ana croise les bras et fronce les sourcils. Quel type de communication est-ce?", "Non verbale", ["Verbale", "Écrite"], COM_HINT],
  ["Théo parle d'une voix joyeuse et rapide. Quel type de communication est-ce?", "Verbale", ["Non verbale", "Écrite"], COM_HINT],
];

export const MOODS_DEEP: FrItem[] = [
  ["Complète : Dans deux jours, nous ___ chez grand-mère. (aller)", "irons", ["irions", "allions"], MOOD_HINT],
  ["Complète : Demain, elle ___ son vélo. (prendre)", "prendra", ["prendrait", "prenait"], MOOD_HINT],
  ["Complète : L'an prochain, tu ___ en neuvième année. (être)", "seras", ["serais", "étais"], MOOD_HINT],
  ["Complète : Dimanche prochain, vous ___ au cinéma. (venir)", "viendrez", ["viendriez", "veniez"], MOOD_HINT],
  ["Complète : Demain, ils ___ leur exposé. (présenter)", "présenteront", ["présenteraient", "présentaient"], MOOD_HINT],
  ["Pour demander poliment : Je ___ parler à la directrice. (vouloir)", "voudrais", ["voulais", "voudrai"], MOOD_HINT],
  ["Pour demander poliment : Tu ___ me prêter ton crayon? (pouvoir)", "pourrais", ["pouvais", "pourras"], MOOD_HINT],
  ["Pour demander poliment : Nous ___ une table près de la fenêtre. (aimer)", "aimerions", ["aimions", "aimerons"], MOOD_HINT],
  ["Quelle phrase est au conditionnel présent?", "Elle voudrait un peu de temps.", ["Elle voudra un peu de temps.", "Elle voulait un peu de temps."], MOOD_HINT],
  ["Quelle phrase est au futur simple?", "Il pleuvra demain.", ["Il pleuvrait demain.", "Il pleuvait hier."], MOOD_HINT],
  ["Quel mot annonce le futur?", "bientôt", ["hier", "jadis"], MOOD_HINT],
  ["Complète : Si j'avais le temps, je ___ un livre. (lire, conditionnel)", "lirais", ["lirai", "lisais"], "Après si + imparfait, on emploie le conditionnel présent : je lirais."],
];
