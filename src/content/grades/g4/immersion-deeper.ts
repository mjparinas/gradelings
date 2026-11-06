import type { FrItem } from "../../french";

// Extra Grade 4 French Immersion questions, added beside the original banks so a child who practises every day
// meets fewer repeats. Same patterns as the originals; simple, region-free French.

const TU_HINT = "Use “tu” with friends, classmates, family and children your age. Use “vous” to show respect to an adult you don't know well, or to speak to more than one person.";
const Q_HINT = "Question words: qui (who), que (what), où (where), quand (when), pourquoi (why), comment (how), combien (how many).";
const ADV_HINT = "Take the feminine form of the adjective and add -ment: lente → lentement, douce → doucement. Careful with endings in -ent/-ant (prudent → prudemment) and -i (poli → poliment).";
const COMP_HINT = "Use plus… que (more… than), moins… que (less… than) and aussi… que (as… as) to compare.";
const PC_HINT = "The passé composé is a form of avoir + the past participle: j'ai mangé, tu as chanté, elle a joué, nous avons dansé, vous avez parlé, ils ont fini.";
const IMP_HINT = "The imparfait describes how things used to be or how they were. Take the “nous” form of the present, remove -ons and add -ais, -ais, -ait, -ions, -iez, -aient.";
const READ_HINT = "Look for clues in the text. Clues you find help you work out what the author does not say.";

export const TU_VOUS_DEEP: FrItem[] = [
  ["Que dis-tu à un voisin adulte que tu ne connais pas?", "Bonjour, comment allez-vous?", ["Salut, comment vas-tu?", "Salut, comment va-t-il?"], TU_HINT, "🏘️"],
  ["Que dis-tu à ta sœur?", "Veux-tu jouer avec moi?", ["Voulez-vous jouer avec moi?", "Veut-elle jouer avec moi?"], TU_HINT, "👧"],
  ["Que dis-tu au directeur de l'école?", "Pouvez-vous ouvrir la porte, s'il vous plaît?", ["Peux-tu ouvrir la porte, s'il te plaît?", "Peut-il ouvrir la porte, s'il vous plaît?"], TU_HINT, "🏫"],
  ["Que dis-tu à ton meilleur ami?", "Tu viens chez moi?", ["Vous venez chez moi?", "Il vient chez moi?"], TU_HINT, "🧒"],
  ["Que dis-tu à la bibliothécaire?", "Avez-vous un livre sur les chats?", ["As-tu un livre sur les chats?", "A-t-il un livre sur les chats?"], TU_HINT, "📚"],
  ["Que dis-tu à un camarade de classe?", "Qu'est-ce que tu fais?", ["Qu'est-ce que vous faites?", "Qu'est-ce qu'il fait?"], TU_HINT, "🧑‍🎓"],
  ["Que dis-tu à deux amis à la fois?", "Vous venez avec nous?", ["Tu viens avec nous?", "Ils viennent avec nous?"], TU_HINT, "👭"],
  ["Que dis-tu à une dame que tu ne connais pas?", "Excusez-moi, madame, où est la bibliothèque?", ["Excuse-moi, madame, où est la bibliothèque?", "Excuse-moi, copain, où est la bibliothèque?"], TU_HINT, "🙋"],
  ["Que dis-tu à ton petit frère?", "Viens ici, s'il te plaît.", ["Venez ici, s'il vous plaît.", "Vient ici, s'il vous plaît."], TU_HINT, "👦"],
  ["Que dis-tu à une dame âgée que tu viens de rencontrer?", "Enchanté! Comment vous appelez-vous?", ["Enchanté! Comment t'appelles-tu?", "Enchanté! Comment s'appelle-t-il?"], TU_HINT, "👵"],
];

export const QUESTION_WORDS_DEEP: FrItem[] = [
  ["Complète : ___ coûte ce livre? Il coûte dix dollars.", "Combien", ["Où", "Qui", "Pourquoi"], Q_HINT],
  ["Complète : ___ pleures-tu? Parce que je suis triste.", "Pourquoi", ["Quand", "Où", "Combien"], Q_HINT],
  ["Complète : ___ vas-tu à l'école? J'y vais à pied.", "Comment", ["Qui", "Quand", "Pourquoi"], Q_HINT],
  ["Complète : ___ est ton enseignante? C'est madame Roy.", "Qui", ["Où", "Quand", "Combien"], Q_HINT],
  ["Complète : ___ est la bibliothèque? Elle est près du parc.", "Où", ["Qui", "Quand", "Combien"], Q_HINT],
  ["Complète : ___ commence le film? Il commence à six heures.", "Quand", ["Où", "Qui", "Combien"], Q_HINT],
  ["Complète : ___ de frères as-tu? J'ai deux frères.", "Combien", ["Où", "Quand", "Qui"], Q_HINT],
  ["Complète : ___ manges-tu? Je mange une pomme.", "Que", ["Où", "Quand", "Qui"], Q_HINT],
  ["Complète : ___ s'appelle ton chien? Il s'appelle Max.", "Comment", ["Où", "Combien", "Quand"], Q_HINT],
  ["Complète : ___ est absent aujourd'hui? Léo est absent.", "Qui", ["Où", "Quand", "Combien"], Q_HINT],
  ["Complète : ___ rentres-tu à la maison? Je rentre à quatre heures.", "Quand", ["Où", "Qui", "Combien"], Q_HINT],
  ["Complète : ___ vas-tu pendant les vacances? Je vais à la mer.", "Où", ["Qui", "Quand", "Combien"], Q_HINT],
];

export const ADVERBS_DEEP: FrItem[] = [
  ["Complète : Il parle ___. (calme)", "calmement", ["calmment", "calme", "calmément"], ADV_HINT],
  ["Complète : Elle répond ___. (poli)", "poliment", ["polimment", "polie", "polment"], ADV_HINT],
  ["Complète : Ils travaillent ___. (sérieux)", "sérieusement", ["sérieuxment", "sérieuse", "sérieusment"], ADV_HINT],
  ["Complète : Il court ___. (rapide)", "rapidement", ["rapidment", "rapide", "rapidément"], ADV_HINT],
  ["Complète : Il explique ___. (clair)", "clairement", ["clairment", "claire", "clairément"], ADV_HINT],
  ["Complète : Il est ___ gentil. (vrai)", "vraiment", ["vraiement", "vrai", "vraimment"], ADV_HINT],
  ["Complète : Elle dessine ___. (simple)", "simplement", ["simplment", "simple", "simplément"], ADV_HINT],
  ["Complète : ___, nous avons gagné! (final)", "Finalement", ["Finalment", "Finale", "Finalément"], ADV_HINT],
  ["Complète : Il réussit ___. (facile)", "facilement", ["facilment", "facile", "facilément"], ADV_HINT],
  ["Complète : Elle salue ___. (gentil)", "gentiment", ["gentilment", "gentille", "gentilement"], ADV_HINT],
  ["Complète : Il traverse la rue ___. (prudent)", "prudemment", ["prudentment", "prudente", "prudement"], ADV_HINT],
  ["Complète : Elle attend ___. (patient)", "patiemment", ["patientment", "patiente", "patientemment"], ADV_HINT],
];

export const COMPARE_DEEP: FrItem[] = [
  ["Complète : Le soleil est ___ chaud que la lune.", "plus", ["moins", "aussi", "très"], COMP_HINT, "☀️"],
  ["Complète : Un escargot est ___ rapide qu'un guépard.", "moins", ["plus", "aussi", "très"], COMP_HINT, "🐌"],
  ["Complète : Maya et Léa ont le même âge. Maya est ___ âgée que Léa.", "aussi", ["plus", "moins", "très"], COMP_HINT, "🎂"],
  ["Complète : Une girafe est ___ grande qu'un chat.", "plus", ["moins", "aussi", "très"], COMP_HINT, "🦒"],
  ["Complète : Une plume est ___ lourde qu'une pierre.", "moins", ["plus", "aussi", "très"], COMP_HINT, "🪶"],
  ["Complète : Les deux sacs pèsent pareil. Mon sac est ___ lourd que ton sac.", "aussi", ["plus", "moins", "très"], COMP_HINT, "🎒"],
  ["Complète : Un lac est ___ petit qu'un océan.", "moins", ["plus", "aussi", "très"], COMP_HINT, "🌊"],
  ["Complète : L'hiver est ___ froid que l'été.", "plus", ["moins", "aussi", "très"], COMP_HINT, "❄️"],
  ["Complète : Une fourmi est ___ petite qu'un éléphant.", "moins", ["plus", "aussi", "très"], COMP_HINT, "🐜"],
];

export const PASSE_DEEP: FrItem[] = [
  ["Complète : Hier, nous ___ mangé une pizza.", "avons", ["ont", "avez", "ai"], PC_HINT],
  ["Complète : Hier, vous ___ chanté.", "avez", ["avons", "ont", "as"], PC_HINT],
  ["Complète : Hier, ils ___ joué au parc.", "ont", ["a", "avons", "avez"], PC_HINT],
  ["Complète : Hier, j'___ regardé un film.", "ai", ["as", "a", "ont"], PC_HINT],
  ["Complète : Hier, Léo ___ dessiné un chat.", "a", ["as", "ai", "ont"], PC_HINT],
  ["Complète : Hier, tu ___ écouté de la musique.", "as", ["ai", "a", "avons"], PC_HINT],
  ["Complète : J'ai ___ une pomme. (manger)", "mangé", ["manger", "mange", "mangée"], PC_HINT],
  ["Complète : Elle a ___ un livre. (lire)", "lu", ["lire", "lis", "lisé"], PC_HINT],
  ["Complète : Nous avons ___ la porte. (fermer)", "fermé", ["fermer", "ferme", "fermée"], PC_HINT],
  ["Complète : Tu as ___ ton ami. (aider)", "aidé", ["aider", "aide", "aidée"], PC_HINT],
  ["Complète : Nous avons ___ nos devoirs. (finir)", "fini", ["finir", "finit", "finé"], PC_HINT],
  ["Complète : Elles ont ___ une chanson. (chanter)", "chanté", ["chanter", "chante", "chantée"], PC_HINT],
];

export const IMPARFAIT_DEEP: FrItem[] = [
  ["Complète : Autrefois, nous ___ souvent au lac. (aller)", "allions", ["allons", "irons", "allés"], IMP_HINT],
  ["Complète : Quand j'étais petit, j'___ les bonbons. (aimer)", "aimais", ["aime", "aimerai", "aimé"], IMP_HINT],
  ["Complète : Elle ___ toujours en retard. (arriver)", "arrivait", ["arrive", "arrivera", "arrivé"], IMP_HINT],
  ["Complète : Ils ___ dans un petit village. (habiter)", "habitaient", ["habitent", "habiteront", "habité"], IMP_HINT],
  ["Complète : Vous ___ souvent ensemble. (jouer)", "jouiez", ["jouez", "jouerez", "joué"], IMP_HINT],
  ["Complète : Tu ___ peur du noir. (avoir)", "avais", ["as", "auras", "eu"], IMP_HINT],
  ["Complète : Il ___ beau ce jour-là. (faire)", "faisait", ["fait", "fera", "faire"], IMP_HINT],
  ["Complète : Nous ___ des livres le soir. (lire)", "lisions", ["lisons", "lirons", "lu"], IMP_HINT],
  ["Complète : Mon grand-père ___ des histoires. (raconter)", "racontait", ["raconte", "racontera", "raconté"], IMP_HINT],
  ["Complète : Les enfants ___ dans la cour. (courir)", "couraient", ["courent", "courront", "couru"], IMP_HINT],
];

const TEXTS_DEEP = {
  velo: { title: "Le vélo de Sami", paragraphs: ["Sami apprend à faire du vélo. Son père tient la selle et court derrière lui. Sami tombe deux fois, mais il se relève chaque fois. Enfin, il roule seul jusqu'au bout de la rue. Son père applaudit."] },
  abeilles: { title: "Les abeilles", paragraphs: ["Les abeilles vivent dans une ruche. Chaque abeille a un travail : certaines cherchent du nectar dans les fleurs, d'autres gardent la ruche. Avec le nectar, elles font du miel. Sans les abeilles, beaucoup de fleurs ne donneraient pas de fruits."] },
  biblio: { title: "À la bibliothèque", paragraphs: ["Chloé entre à la bibliothèque en chuchotant. Elle cherche un livre sur les dauphins. La bibliothécaire sourit et lui montre une étagère. Chloé choisit deux livres et les emprunte avec sa carte."] },
};

export const COMPREHENSION_DEEP: FrItem[] = [
  ["Quelle est l'idée principale?", "Sami apprend à faire du vélo malgré ses chutes.", ["Sami perd son vélo.", "Le père de Sami achète un vélo."], READ_HINT, { type: "passage", ...TEXTS_DEEP.velo }],
  ["Que fait le père de Sami au début?", "Il tient la selle", ["Il applaudit", "Il tombe"], READ_HINT, { type: "passage", ...TEXTS_DEEP.velo }],
  ["Comment se sent Sami à la fin?", "Il est fier", ["Il est triste", "Il est fâché"], "He rides alone and his father applauds: that is a clue about how he feels.", { type: "passage", ...TEXTS_DEEP.velo }],
  ["Quelle est l'idée principale?", "Les abeilles travaillent ensemble et sont utiles.", ["Les abeilles aiment le sucre.", "Les abeilles vivent dans les arbres."], READ_HINT, { type: "passage", ...TEXTS_DEEP.abeilles }],
  ["Que font les abeilles avec le nectar?", "Du miel", ["Des fleurs", "Une ruche"], READ_HINT, { type: "passage", ...TEXTS_DEEP.abeilles }],
  ["Pourquoi les abeilles sont-elles importantes?", "Elles aident les fleurs à donner des fruits", ["Elles font peur aux oiseaux", "Elles gardent les maisons"], "The last sentence of the text gives the clue.", { type: "passage", ...TEXTS_DEEP.abeilles }],
  ["Où se passe l'histoire?", "À la bibliothèque", ["Au parc", "Dans une cuisine"], READ_HINT, { type: "passage", ...TEXTS_DEEP.biblio }],
  ["Pourquoi Chloé chuchote-t-elle?", "Parce qu'on doit rester calme dans une bibliothèque", ["Parce qu'elle a peur", "Parce qu'elle est fâchée"], "In a library, people speak softly. That is a clue the text does not say out loud.", { type: "passage", ...TEXTS_DEEP.biblio }],
  ["Combien de livres Chloé emprunte-t-elle?", "Deux", ["Un", "Trois"], READ_HINT, { type: "passage", ...TEXTS_DEEP.biblio }],
];
