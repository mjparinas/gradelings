import type { FrItem } from "../../french";

// Extra Grade 3 French Immersion questions, added beside the original banks so a child who practises every day
// meets fewer repeats. Same patterns as the originals; simple, region-free French.

const REFLEXIVE_HINT = "With verbs like “se laver”, the little word before the verb matches the person: je me, tu te, il/elle se, nous nous, vous vous, ils/elles se.";
const LINK_HINT = "“Et” adds, “mais” shows a surprise or a problem, “ou” gives a choice and “avec” means together with.";
const NEG_HINT = "To say no in French, put “ne” before the verb and “pas” after it: je ne mange pas. Before a vowel, “ne” becomes “n'”.";
const FUTURE_HINT = "The near future is “aller” + a verb: je vais manger, tu vas manger, il va manger, nous allons manger, vous allez manger, ils vont manger.";
const PLURAL_HINT = "Many words that end in -eau, -eu or -ou add an “x” in the plural (un bateau → des bateaux). Words ending in -al change to -aux (un cheval → des chevaux).";

export const REFLEXIVE_DEEP: FrItem[] = [
  ["Complète : Je ___ couche à huit heures.", "me", ["te", "se", "nous"], REFLEXIVE_HINT],
  ["Complète : Tu ___ lèves tôt le matin.", "te", ["me", "se", "vous"], REFLEXIVE_HINT],
  ["Complète : Mon frère ___ peigne.", "se", ["me", "te", "nous"], REFLEXIVE_HINT],
  ["Complète : Nous ___ amusons au parc.", "nous", ["me", "te", "se"], REFLEXIVE_HINT],
  ["Complète : Vous ___ reposez un peu.", "vous", ["nous", "me", "se"], REFLEXIVE_HINT],
  ["Complète : Les enfants ___ lavent les mains.", "se", ["me", "te", "nous"], REFLEXIVE_HINT],
  ["Complète : Elle ___ regarde dans le miroir.", "se", ["me", "te", "vous"], REFLEXIVE_HINT],
  ["Complète : Je ___ réveille à sept heures.", "me", ["te", "se", "vous"], REFLEXIVE_HINT],
  ["Complète : Nous ___ couchons tard le samedi.", "nous", ["me", "te", "se"], REFLEXIVE_HINT],
  ["Complète : Tu ___ habilles vite.", "te", ["me", "se", "nous"], REFLEXIVE_HINT],
  ["Complète : Zoé et Léo ___ promènent après l'école.", "se", ["me", "te", "nous"], REFLEXIVE_HINT],
  ["Complète : Je ___ brosse les cheveux.", "me", ["te", "se", "nous"], REFLEXIVE_HINT],
];

export const LINKS_DEEP: FrItem[] = [
  ["Complète : Je veux du lait ___ des biscuits. Les deux!", "et", ["mais", "ou", "avec"], LINK_HINT],
  ["Complète : Il fait beau, ___ je reste à la maison.", "mais", ["et", "ou", "avec"], LINK_HINT],
  ["Complète : Veux-tu du thé ___ du jus? Un seul!", "ou", ["et", "mais", "avec"], LINK_HINT],
  ["Complète : Elle va au parc ___ son chien.", "avec", ["mais", "ou", "et"], LINK_HINT],
  ["Complète : Nous lisons ___ nous dessinons. Les deux!", "et", ["mais", "ou", "avec"], LINK_HINT],
  ["Complète : Je suis fatigué, ___ je veux jouer encore.", "mais", ["et", "ou", "avec"], LINK_HINT],
  ["Complète : Tu viens ___ tu restes? Choisis!", "ou", ["et", "mais", "avec"], LINK_HINT],
  ["Complète : Léo joue au ballon ___ ses amis.", "avec", ["mais", "ou", "et"], LINK_HINT],
  ["Complète : Ana a un chat ___ un chien. Les deux!", "et", ["mais", "ou", "avec"], LINK_HINT],
  ["Complète : Il a faim, ___ il n'y a plus de pain.", "mais", ["et", "ou", "avec"], LINK_HINT],
  ["Complète : Prends le train ___ l'autobus. Choisis!", "ou", ["et", "mais", "avec"], LINK_HINT],
  ["Complète : Je marche à l'école ___ ma sœur.", "avec", ["mais", "ou", "et"], LINK_HINT],
];

export const NEGATIVES_DEEP: FrItem[] = [
  ["Quelle phrase dit le contraire de « Nous jouons »?", "Nous ne jouons pas.", ["Nous jouons ne pas.", "Ne nous jouons pas.", "Nous pas jouons."], NEG_HINT],
  ["Quelle phrase dit le contraire de « Ils chantent »?", "Ils ne chantent pas.", ["Ils chantent ne pas.", "Ne ils chantent pas.", "Ils pas chantent."], NEG_HINT],
  ["Quelle phrase dit le contraire de « Je danse »?", "Je ne danse pas.", ["Je danse ne pas.", "Ne je danse pas.", "Je pas danse."], NEG_HINT],
  ["Quelle phrase dit le contraire de « Tu dors »?", "Tu ne dors pas.", ["Tu dors ne pas.", "Ne tu dors pas.", "Tu pas dors."], NEG_HINT],
  ["Quelle phrase dit le contraire de « Il est content »?", "Il n'est pas content.", ["Il ne est pas content.", "Il est ne pas content.", "Il pas est content."], NEG_HINT],
  ["Quelle phrase dit le contraire de « Elle a faim »?", "Elle n'a pas faim.", ["Elle ne a pas faim.", "Elle a ne pas faim.", "Elle pas a faim."], NEG_HINT],
  ["Quelle phrase dit le contraire de « Vous parlez »?", "Vous ne parlez pas.", ["Vous parlez ne pas.", "Ne vous parlez pas.", "Vous pas parlez."], NEG_HINT],
  ["Quelle phrase dit le contraire de « Léa lit »?", "Léa ne lit pas.", ["Léa lit ne pas.", "Ne Léa lit pas.", "Léa pas lit."], NEG_HINT],
  ["Quelle phrase dit le contraire de « J'aime le chocolat »?", "Je n'aime pas le chocolat.", ["Je ne aime pas le chocolat.", "J'aime ne pas le chocolat.", "Je pas aime le chocolat."], NEG_HINT],
  ["Quelle phrase dit le contraire de « Tu manges »?", "Tu ne manges pas.", ["Tu manges ne pas.", "Ne tu manges pas.", "Tu pas manges."], NEG_HINT],
];

export const FUTURE_DEEP: FrItem[] = [
  ["Complète : Ce soir, nous ___ regarder un film.", "allons", ["allez", "vont", "vais"], FUTURE_HINT],
  ["Complète : Elle ___ chanter demain.", "va", ["vas", "vais", "vont"], FUTURE_HINT],
  ["Complète : Vous ___ jouer dehors.", "allez", ["allons", "vont", "vas"], FUTURE_HINT],
  ["Complète : Bientôt, je ___ lire un livre.", "vais", ["vas", "va", "vont"], FUTURE_HINT],
  ["Complète : Les élèves ___ visiter le musée.", "vont", ["va", "allons", "vas"], FUTURE_HINT],
  ["Complète : Tu ___ dessiner un chat.", "vas", ["vais", "va", "allez"], FUTURE_HINT],
  ["Complète : Nous ___ partir en voyage.", "allons", ["allez", "vont", "vais"], FUTURE_HINT],
  ["Complète : Mon père ___ cuisiner ce soir.", "va", ["vas", "vais", "vont"], FUTURE_HINT],
  ["Complète : Ils ___ danser à la fête.", "vont", ["va", "allons", "vais"], FUTURE_HINT],
  ["Quelle phrase parle de demain?", "Je vais jouer au parc.", ["J'ai joué au parc.", "Je joue au parc tous les jours."], FUTURE_HINT],
];

export const PLURALS_DEEP: FrItem[] = [
  ["Un cheveu, trois ___", "cheveux", ["cheveus", "cheveu"], PLURAL_HINT, "💇"],
  ["Un jeu, deux ___", "jeux", ["jeus", "jeu"], PLURAL_HINT, "🎲"],
  ["Un genou, deux ___", "genoux", ["genous", "genou"], PLURAL_HINT, "🦵"],
  ["Un bijou, deux ___", "bijoux", ["bijous", "bijou"], PLURAL_HINT, "💍"],
  ["Un caillou, des ___", "cailloux", ["cailloues", "caillou"], PLURAL_HINT, "🪨"],
  ["Un cheval, deux ___", "chevaux", ["chevals", "cheval"], PLURAL_HINT, "🐴"],
  ["Un journal, deux ___", "journaux", ["journals", "journal"], PLURAL_HINT, "📰"],
  ["Un animal, trois ___", "animaux", ["animals", "animal"], PLURAL_HINT, "🐾"],
  ["Un château, deux ___", "châteaux", ["châteaus", "château"], PLURAL_HINT, "🏰"],
  ["Un manteau, trois ___", "manteaux", ["manteaus", "manteau"], PLURAL_HINT, "🧥"],
  ["Un feu, deux ___", "feux", ["feus", "feu"], PLURAL_HINT, "🔥"],
  ["Un hibou, deux ___", "hiboux", ["hibous", "hibou"], PLURAL_HINT, "🦉"],
];

export const AFFIXES_DEEP: FrItem[] = [
  ["Que veut dire « replanter »?", "planter de nouveau", ["ne pas planter", "planter très vite"], "The prefix “re-” means again.", "🌱"],
  ["Que veut dire « refermer »?", "fermer de nouveau", ["ne pas fermer", "fermer très fort"], "The prefix “re-” means again.", "🚪"],
  ["Que veut dire « incorrect »?", "pas correct", ["très correct", "correct demain"], "The prefix “in-” often means not.", "❌"],
  ["Que veut dire « désagréable »?", "pas agréable", ["très agréable", "agréable demain"], "The prefix “dés-” often means the opposite.", "😖"],
  ["Que veut dire « illisible »?", "qu'on ne peut pas lire", ["qu'on lit très bien", "qu'on lit vite"], "The prefix “il-” (or “in-”) often means not.", "📄"],
  ["Un chanteur est une personne qui…", "chante", ["danse", "dort"], "The ending “-eur” names a person who does the action.", "🎤"],
  ["Un joueur est une personne qui…", "joue", ["lit", "mange"], "The ending “-eur” names a person who does the action.", "🎮"],
  ["Un nageur est une personne qui…", "nage", ["court", "dessine"], "The ending “-eur” names a person who does the action.", "🏊"],
  ["Un lecteur est une personne qui…", "lit", ["écrit", "chante"], "The ending “-eur” names a person who does the action.", "📚"],
  ["Que veut dire « malheureux »?", "pas heureux", ["très heureux", "heureux demain"], "The prefix “mal-” often means bad or not.", "😢"],
];

const MAIN_HINT = "The main idea is what the whole text is about. Details are smaller facts that support it.";

export const MAIN_IDEA_DEEP: FrItem[] = [
  ["Quelle est l'idée principale?", "Les pommes se mangent de plusieurs façons.", ["Les pommes poussent au printemps.", "Les pommes sont rouges."], MAIN_HINT, { type: "passage", title: "Les pommes", paragraphs: ["En automne, on cueille les pommes. On les mange crues, en compote ou en tarte. Les pommes sont bonnes pour la santé."] }],
  ["Quelle est l'idée principale?", "Max aime beaucoup son vélo.", ["Max perd son vélo.", "Max va à l'école à pied."], MAIN_HINT, { type: "passage", title: "Le vélo de Max", paragraphs: ["Max aime son vélo. Il roule au parc chaque samedi. Il roule aussi pour aller chez son ami. Max prend soin de son vélo et le range à l'abri."] }],
  ["Quelle est l'idée principale?", "La lune tourne autour de la Terre et change d'aspect.", ["La lune est plus grosse que le soleil.", "La lune fait sa propre lumière."], MAIN_HINT, { type: "passage", title: "La lune", paragraphs: ["La lune tourne autour de la Terre. Elle ne fait pas de lumière : elle reflète celle du soleil. Chaque soir, on la voit un peu différente."] }],
  ["Quelle est l'idée principale?", "Léa fait pousser des plantes dans son jardin.", ["Léa achète des légumes.", "Léa nettoie sa chambre."], MAIN_HINT, { type: "passage", title: "Le jardin de Léa", paragraphs: ["Au printemps, Léa plante des graines dans son jardin. Elle les arrose chaque jour. Après quelques semaines, de petites pousses sortent de la terre."] }],
];
