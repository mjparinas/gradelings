import type { FrItem } from "../../french";

// Extra Grade 7 French Immersion questions, added beside the original banks so a child who practises every day
// meets fewer repeats. Same patterns as the originals; simple, region-free French.

const SUP_HINT = "The relative superlative uses le/la/les plus or moins + adjective: la plus rapide. The absolute superlative uses a word like très or extrêmement: très rapide.";
const TENSE_HINT = "Pick the tense the time clue calls for: the imparfait for descriptions and habits, the passé composé for finished events, the présent for now and the futur for later.";
const COMP = "comparaison";
const META = "métaphore";
const PERS = "personnification";
const HYP = "hyperbole";
const FIG = [COMP, META, PERS, HYP];
const FIG_HINT = "A comparison uses “comme”. A metaphor says one thing IS another. Personification gives human actions to things. A hyperbole is a big exaggeration.";

function figure(sentence: string, right: string): FrItem {
  return [`« ${sentence} » est une…`, right, FIG.filter((f) => f !== right), FIG_HINT];
}

export const SUPERLATIVES_DEEP: FrItem[] = [
  ["Complète : Ana est ___ grande de sa famille.", "la plus", ["le plus", "plus", "très"], SUP_HINT],
  ["Complète : Ce film est ___ drôle de la série.", "le plus", ["la plus", "plus", "très"], SUP_HINT],
  ["Complète : Ce sont les chansons ___ populaires de l'année.", "les plus", ["le plus", "la plus", "plus"], SUP_HINT],
  ["Complète : Voici la rue ___ calme du quartier.", "la plus", ["le plus", "plus", "très"], SUP_HINT],
  ["Complète : C'est le chemin ___ court pour aller à l'école.", "le plus", ["la plus", "les plus", "très"], SUP_HINT],
  ["Complète : Ces problèmes sont ___ difficiles du livre.", "les plus", ["le plus", "la plus", "plus"], SUP_HINT],
  ["Complète : Cette boîte est ___ légère de toutes. (la moins lourde)", "la moins", ["le moins", "les moins", "plus"], SUP_HINT],
  ["Quelle phrase contient un superlatif relatif?", "Noé est le plus rapide de l'équipe.", ["Noé est extrêmement rapide.", "Noé court tous les jours."], SUP_HINT],
  ["Quelle phrase contient un superlatif absolu?", "Ce paysage est très beau.", ["C'est le paysage le plus beau.", "Ce paysage est beau."], SUP_HINT],
  ["Quelle phrase contient un superlatif absolu?", "La mer est extrêmement froide.", ["C'est la mer la plus froide.", "La mer est froide."], SUP_HINT],
  ["Quelle phrase contient un superlatif relatif?", "Ce gâteau est le moins sucré de la table.", ["Ce gâteau est très sucré.", "Ce gâteau est sucré."], SUP_HINT],
  ["Complète : Mon frère est ___ grand que moi. (comparatif)", "plus", ["le plus", "la plus", "très"], "A simple comparison uses plus … que: plus grand que. The superlative adds le, la or les: le plus grand."],
];

export const TENSES_DEEP: FrItem[] = [
  ["Complète : Quand j'étais petit, je ___ souvent au parc. (aller)", "allais", ["suis allé", "irai", "vais"], TENSE_HINT],
  ["Complète : Hier soir, nous ___ un bon film. (voir)", "avons vu", ["voyions", "verrons", "voyons"], TENSE_HINT],
  ["Complète : Demain, ils ___ à la plage. (aller)", "iront", ["allaient", "sont allés", "vont"], TENSE_HINT],
  ["Complète : En ce moment, elle ___ ses devoirs. (faire)", "fait", ["faisait", "a fait", "fera"], TENSE_HINT],
  ["Complète : Quand j'étais petit, chaque matin, mon père ___ le journal. (lire)", "lisait", ["a lu", "lira", "lit"], TENSE_HINT],
  ["Complète : Soudain, un oiseau ___ par la fenêtre. (entrer)", "est entré", ["entrait", "entrera", "entre"], TENSE_HINT],
  ["Complète : L'an prochain, je ___ en septième année. (être)", "serai", ["étais", "ai été", "suis"], TENSE_HINT],
  ["Complète : Il y a dix ans, cette ville ___ plus petite. (être)", "était", ["a été", "sera", "est"], TENSE_HINT],
  ["Complète : Ce week-end, nous ___ chez nos cousins. (aller)", "irons", ["allions", "sommes allés", "allons"], TENSE_HINT],
  ["Complète : Hier, j'___ la table avant le dîner. (mettre)", "ai mis", ["mettrai", "mets", "mettras"], TENSE_HINT],
  ["Complète : Si tu pars tôt, tu ___ à l'heure. (arriver)", "arriveras", ["es arrivé", "arrivais", "arrives"], "After “si” + présent, the result is in the futur: si tu pars tôt, tu arriveras."],
  ["Dans la phrase « Chaque été, nous nagions au lac. », quel est le temps du verbe?", "L'imparfait", ["Le futur simple", "Le passé composé"], TENSE_HINT],
];

export const FIGURES_DEEP: FrItem[] = [
  figure("Il est rusé comme un renard.", COMP),
  figure("Elle chante comme un rossignol.", COMP),
  figure("Ce garçon est un volcan.", META),
  figure("Le temps est de l'or.", META),
  figure("Le vent hurle dans la nuit.", PERS),
  figure("Les fleurs dansent dans la brise.", PERS),
  figure("Je meurs de faim!", HYP),
  figure("J'ai attendu des siècles.", HYP),
  figure("Ses cheveux sont doux comme la soie.", COMP),
  figure("La rue est un fleuve de voitures.", META),
  figure("La neige couvre la ville d'un manteau blanc.", META),
  figure("Le soleil nous embrasse le visage.", PERS),
];
