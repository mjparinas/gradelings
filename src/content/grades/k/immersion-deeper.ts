import type { FrItem, Pair } from "../../french";

// More Kindergarten French Immersion practice, appended to the banks in immersion.ts.

export const POLITE_DEEP: FrItem[] = [
  ["Tu éternues. Que dit ton ami?", "À tes souhaits", ["Bonne nuit", "Au revoir"], "When someone sneezes, we say “à tes souhaits”: bless you.", "🤧"],
  ["Ta grand-mère te sert du gâteau. Tu dis…", "Merci beaucoup", ["Bonne nuit", "Au revoir"], "“Merci beaucoup” means thank you very much.", "🍰"],
  ["Tu veux un jus. Tu dis…", "Je voudrais un jus, s'il vous plaît", ["Donne-moi ça", "Au revoir"], "We ask politely with “je voudrais… s'il vous plaît”.", "🧃"],
  ["Tu veux emprunter un crayon. Tu dis…", "Je peux avoir un crayon, s'il te plaît?", ["Je prends ton crayon", "Bonne nuit"], "We ask first before we borrow: “je peux… s'il te plaît?”", "✏️"],
  ["Tu as fini de jouer avec ton ami. Tu dis…", "Merci d'avoir joué avec moi", ["Bonjour", "Bonne nuit"], "We can thank a friend for playing with us.", "🎲"],
  ["Ton ami a gagné au jeu. Que dis-tu?", "Bravo", ["Au revoir", "Bonne nuit"], "“Bravo” is what we say to cheer a friend on.", "🏆"],
  ["Tu veux entrer dans la classe. Tu dis…", "Puis-je entrer, s'il vous plaît?", ["Pousse-toi", "Au revoir"], "Asking before we go in is polite.", "🚪"],
  ["Quelqu'un te dit « Bonne journée! » Tu réponds…", "Merci, toi aussi", ["Bonne nuit", "Pardon"], "We can wish someone a good day back: “toi aussi”.", "☀️"],
  ["Tu arrives en retard. Tu dis…", "Pardon d'être en retard", ["Bonne nuit", "Merci"], "We say sorry when we are late.", "⏰"],
  ["Tu fais tomber le livre de ton ami. Tu dis…", "Pardon, je vais le ramasser", ["Bonne nuit", "Au revoir"], "We say sorry and help when we make a mess.", "📖"],
  ["Tu veux jouer avec des amis. Tu demandes…", "Je peux jouer avec vous?", ["Donne-moi le ballon", "Au revoir"], "We ask kindly to join a game.", "⚽"],
  ["Tu quittes ton enseignante pour la fin de semaine. Tu dis…", "Bonne fin de semaine", ["Bonne nuit", "Bonjour"], "We wish each other a good weekend: “bonne fin de semaine”.", "🎉"],
];

// Each group starts with its own sound, different from every other group in immersion.ts.
export const SOUND_GROUPS_DEEP: Pair[][] = [
  [["☀️", "soleil"], ["🐍", "serpent"], ["🥗", "salade"]],
  [["🦖", "dinosaure"], ["🐬", "dauphin"], ["🦷", "dent"]],
  [["🧃", "jus"], ["🦵", "jambe"], ["🧸", "jouet"]],
  [["🪺", "nid"], ["☁️", "nuage"], ["👃", "nez"]],
  [["🎂", "gâteau"], ["🦍", "gorille"], ["🎸", "guitare"]],
];

export const SYLLABLES_DEEP: [string, string, number][] = [
  ["🦶", "pied", 1], ["🥛", "lait", 1], ["👜", "sac", 1], ["🐻", "ours", 1], ["🚂", "train", 1], ["🥚", "œuf", 1],
  ["🚲", "vélo", 2], ["🍪", "biscuit", 2], ["🐼", "panda", 2], ["🍬", "bonbon", 2], ["🎂", "gâteau", 2],
  ["🎻", "violon", 3], ["🚌", "autobus", 3], ["🚑", "ambulance", 3],
];
