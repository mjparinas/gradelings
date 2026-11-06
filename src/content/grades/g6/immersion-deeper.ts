import type { FrItem } from "../../french";

// Extra Grade 6 French Immersion questions, added beside the original banks so a child who practises every day
// meets fewer repeats. Same patterns as the originals; simple, region-free French.

const TENSE_HINT = "Use the imparfait to describe, set the scene or tell what used to happen. Use the passé composé for a specific event that happened and finished.";
const ROOT_HINT = "Words in the same family share a root. Prefixes and suffixes add meaning: pré- (before), sous- (under), sur- (over), -able (can be), -tion (action).";
const IND_HINT = "Time clues (le lendemain, soudain, pendant ce temps) tell when. Place clues (au sommet, derrière la maison) tell where.";
const MARK_HINT = "Linking words: parce que / car (cause), donc / alors (consequence), mais / pourtant (opposition), de plus (addition), d'abord / puis / enfin (order).";

export const TENSES_DEEP: FrItem[] = [
  ["Complète : Il ___ quand nous sommes sortis. (pleuvoir)", "pleuvait", ["a plu", "pleut", "pleuvra"], TENSE_HINT],
  ["Complète : Hier, nous ___ au cinéma. (aller)", "sommes allés", ["allions", "allons", "irons"], "Aller uses “être” in the passé composé, and the participle agrees with the subject: nous sommes allés."],
  ["Complète : Quand j'étais jeune, je ___ souvent chez ma grand-mère. (dormir)", "dormais", ["ai dormi", "dors", "dormirai"], TENSE_HINT],
  ["Complète : Tout à coup, le chien ___ . (aboyer)", "a aboyé", ["aboyait", "aboie", "aboiera"], TENSE_HINT],
  ["Complète : Le soleil ___ et les oiseaux chantaient. (briller)", "brillait", ["a brillé", "brille", "brillera"], TENSE_HINT],
  ["Complète : Samedi dernier, Zoé ___ un gâteau. (préparer)", "a préparé", ["préparait", "prépare", "préparera"], TENSE_HINT],
  ["Complète : Elle ___ triste parce qu'elle avait perdu son livre. (être)", "était", ["a été", "est", "sera"], TENSE_HINT],
  ["Complète : Ce matin, Amir ___ très tôt. (se lever)", "s'est levé", ["se levait", "se lève", "se lèvera"], TENSE_HINT],
  ["Complète : Chaque été, nous ___ dans le même lac. (nager)", "nagions", ["avons nagé", "nageons", "nagerons"], TENSE_HINT],
  ["Complète : La semaine dernière, ils ___ un nouveau jeu. (acheter)", "ont acheté", ["achetaient", "achètent", "achèteront"], TENSE_HINT],
  ["Complète : Il y ___ beaucoup de monde dans la rue quand le défilé a commencé. (avoir)", "avait", ["a eu", "a", "aura"], TENSE_HINT],
  ["Complète : Hier soir, ma sœur ___ à dix heures. (rentrer)", "est rentrée", ["rentrait", "rentre", "rentrera"], "Rentrer uses “être” in the passé composé, and the participle agrees with the subject: ma sœur est rentrée."],
];

export const WORD_FAMILY_DEEP: FrItem[] = [
  ["Quel mot est de la famille de « jardin »?", "jardinier", ["jaune", "jambon"], ROOT_HINT, "🌷"],
  ["Quel mot est de la famille de « chant »?", "chanteur", ["champion", "chance"], ROOT_HINT, "🎤"],
  ["Quel mot est de la famille de « fleur »?", "fleuriste", ["fleuve", "flèche"], ROOT_HINT, "🌸"],
  ["Quel mot est de la famille de « fruit »?", "fruitier", ["froid", "frotter"], ROOT_HINT, "🍎"],
  ["Que veut dire le préfixe « sous- » dans « sous-marin »?", "sous, en dessous", ["avant", "encore"], ROOT_HINT, "🌊"],
  ["Que veut dire le préfixe « sur- » dans « surnaturel »?", "au-dessus", ["en dessous", "avant"], ROOT_HINT, "✨"],
  ["Que veut dire le suffixe « -able » dans « mangeable »?", "qu'on peut manger", ["qui mange tout", "qui a mangé"], ROOT_HINT, "🍽️"],
  ["Que veut dire le suffixe « -tion » dans « décoration »?", "l'action de décorer", ["celui qui décore", "sans décorer"], ROOT_HINT, "🎀"],
  ["Quel mot contient le préfixe « re- » (encore)?", "refaire", ["rire", "regard"], ROOT_HINT, "🔁"],
  ["Quel mot est de la famille de « mer »?", "maritime", ["marcher", "marteau"], ROOT_HINT, "🌊"],
  ["Quel mot est de la famille de « montagne »?", "montagnard", ["monnaie", "moment"], ROOT_HINT, "⛰️"],
  ["Que veut dire le préfixe « in- » dans « impossible »?", "le contraire", ["encore", "avant"], "The prefix in- (im- before p, b, m) gives the opposite meaning: possible → impossible.", "🚫"],
];

export const INDICATORS_DEEP: FrItem[] = [
  ["Dans « Le lendemain matin, Noé a pris le train. », « Le lendemain matin » indique…", "le temps", ["le lieu", "la manière"], IND_HINT],
  ["Dans « Sous le grand chêne, les enfants jouaient. », « Sous le grand chêne » indique…", "le lieu", ["le temps", "la cause"], IND_HINT],
  ["Dans « Tout à coup, la lumière s'est éteinte. », « Tout à coup » indique…", "le temps", ["le lieu", "la manière"], IND_HINT],
  ["Dans « Au fond du lac, un poisson nageait. », « Au fond du lac » indique…", "le lieu", ["le temps", "la cause"], IND_HINT],
  ["Dans « Quelques heures plus tard, ils sont arrivés. », « Quelques heures plus tard » indique…", "le temps", ["le lieu", "la manière"], IND_HINT],
  ["Dans « Près de la rivière, Amir a trouvé une plume. », « Près de la rivière » indique…", "le lieu", ["le temps", "la cause"], IND_HINT],
  ["Dans « Le soir, la ville devenait silencieuse. », « Le soir » indique…", "le temps", ["le lieu", "la manière"], IND_HINT],
  ["Dans « Dans la forêt, un renard avançait. », « Dans la forêt » indique…", "le lieu", ["le temps", "la cause"], IND_HINT],
  ["Dans « Au lever du soleil, le village s'est réveillé. », « Au lever du soleil » indique…", "le temps", ["le lieu", "la manière"], IND_HINT],
  ["Dans « Là-haut, sur la colline, brillait une lumière. », « Là-haut, sur la colline » indique…", "le lieu", ["le temps", "la cause"], IND_HINT],
  ["Dans « Quelques minutes après, la pluie s'est arrêtée. », « Quelques minutes après » indique…", "le temps", ["le lieu", "la manière"], IND_HINT],
  ["Dans « Autour du feu, tout le monde chantait. », « Autour du feu » indique…", "le lieu", ["le temps", "la cause"], IND_HINT],
];

export const MARKERS_DEEP: FrItem[] = [
  ["Complète : Il fait froid, ___ je mets mon manteau.", "donc", ["parce que", "pourtant", "de plus"], MARK_HINT],
  ["Complète : Je mets mon manteau ___ il fait froid.", "parce que", ["donc", "pourtant", "de plus"], MARK_HINT],
  ["Complète : Il est fatigué, ___ il continue de jouer.", "pourtant", ["donc", "parce que", "enfin"], MARK_HINT],
  ["Complète : Elle chante bien. ___, elle joue du piano.", "De plus", ["Pourtant", "Donc", "Parce que"], MARK_HINT],
  ["Complète : ___, on lave les légumes. Ensuite, on les coupe.", "D'abord", ["Enfin", "Pourtant", "Donc"], MARK_HINT],
  ["Complète : On mélange tout, puis on cuit le gâteau. ___, on le décore.", "Enfin", ["D'abord", "Pourtant", "Parce que"], MARK_HINT],
  ["Complète : Nous sommes restés à la maison ___ la tempête était forte.", "parce que", ["donc", "pourtant", "enfin"], MARK_HINT],
  ["Complète : La tempête était forte, ___ nous sommes restés à la maison.", "donc", ["parce que", "pourtant", "de plus"], MARK_HINT],
  ["Complète : Il a étudié, ___ il a raté l'examen.", "pourtant", ["donc", "parce que", "d'abord"], MARK_HINT],
  ["Complète : Ce parc est joli. ___, il est très tranquille.", "De plus", ["Pourtant", "Donc", "Parce que"], MARK_HINT],
  ["Complète : Je n'ai pas faim ___ j'ai déjà mangé.", "parce que", ["donc", "pourtant", "de plus"], MARK_HINT],
  ["Complète : J'ai déjà mangé, ___ je n'ai pas faim.", "donc", ["parce que", "pourtant", "de plus"], MARK_HINT],
];
