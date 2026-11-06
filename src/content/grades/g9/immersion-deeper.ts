import type { FrItem } from "../../french";

// Extra items appended to the Grade 9 Immersion banks so a child can
// practise for weeks without seeing the same question.

const STYLE_HINT = "Personnification : une chose agit comme une personne. Métaphore : une image sans « comme ». Comparaison : avec « comme ». Hyperbole : une exagération. Allitération : le même son répété.";
const PAST_HINT = "Passé composé : une action terminée. Imparfait : une description ou une habitude. Plus-que-parfait : une action avant une autre action passée.";
const PRON_HINT = "Complément direct : le, la, les, me, te. Complément indirect (à + quelqu'un) : lui, leur, me, te. Y remplace un lieu; en remplace « de + quelque chose ».";
const IF_HINT = "Si + présent → futur simple. Si + imparfait → conditionnel présent. Si + plus-que-parfait → conditionnel passé.";

const FIGS = ["Personnification", "Métaphore", "Comparaison", "Hyperbole"];
const fig = (sentence: string, right: string): FrItem => [
  `Quelle figure de style est utilisée? « ${sentence} »`,
  right,
  FIGS.filter((f) => f !== right).slice(0, 2),
  STYLE_HINT,
];

export const STYLES_DEEP: FrItem[] = [
  fig("Le vent murmure dans les arbres.", "Personnification"),
  fig("La lune sourit aux enfants.", "Personnification"),
  fig("Le soleil dormait encore derrière la colline.", "Personnification"),
  fig("Ce garçon est un lion sur le terrain.", "Métaphore"),
  fig("Sa voix est du velours.", "Métaphore"),
  fig("La vie est un long fleuve.", "Métaphore"),
  fig("Il est rapide comme l'éclair.", "Comparaison"),
  fig("Elle chante comme un rossignol.", "Comparaison"),
  fig("Ses mains étaient froides comme de la glace.", "Comparaison"),
  fig("J'ai attendu cent ans à l'arrêt d'autobus!", "Hyperbole"),
  fig("Il y avait des millions de personnes au parc!", "Hyperbole"),
  fig("Je meurs de faim!", "Hyperbole"),
];

export const PAST_DEEP: FrItem[] = [
  ["Complète : Hier soir, j'___ un film. (regarder)", "ai regardé", ["regardais", "avais regardé"], PAST_HINT],
  ["Complète : Quand j'étais petit, je ___ au parc chaque samedi. (aller)", "allais", ["suis allé", "étais allé"], PAST_HINT],
  ["Complète : Il ___ beau et le ciel était bleu. (faire)", "faisait", ["a fait", "avait fait"], PAST_HINT],
  ["Complète : Elle est arrivée en retard parce qu'elle ___ son autobus. (manquer)", "avait manqué", ["manquait", "a manqué"], PAST_HINT],
  ["Complète : Nous avons mangé après que le cuisinier ___ le repas. (préparer)", "avait préparé", ["préparait", "prépare"], PAST_HINT],
  ["Complète : Chaque été, ils ___ chez leur grand-mère. (aller)", "allaient", ["sont allés", "étaient allés"], PAST_HINT],
  ["Complète : Soudain, la porte ___. (claquer)", "a claqué", ["claquait", "avait claqué"], PAST_HINT],
  ["Quelle phrase est au plus-que-parfait?", "J'avais fini mes devoirs avant le souper.", ["J'ai fini mes devoirs avant le souper.", "Je finissais mes devoirs avant le souper."], PAST_HINT],
  ["Quelle phrase est à l'imparfait?", "Elle lisait pendant que je dessinais.", ["Elle a lu pendant que j'ai dessiné.", "Elle avait lu quand j'avais dessiné."], PAST_HINT],
  ["Quel temps sert à décrire une habitude passée?", "L'imparfait", ["Le passé composé", "Le futur simple"], PAST_HINT],
  ["Quel temps sert à raconter une action terminée et précise?", "Le passé composé", ["L'imparfait", "Le conditionnel présent"], PAST_HINT],
  ["Complète : Il pleuvait quand nous ___ de l'école. (sortir)", "sommes sortis", ["sortions", "étions sortis"], PAST_HINT],
];

export const PRONOUNS_DEEP: FrItem[] = [
  ["Remplace le mot souligné : Je vois Marie. → Je ___ vois.", "la", ["lui", "y"], PRON_HINT],
  ["Remplace le mot souligné : Il mange les pommes. → Il ___ mange.", "les", ["leur", "en"], PRON_HINT],
  ["Remplace le mot souligné : Nous parlons à Samir. → Nous ___ parlons.", "lui", ["le", "y"], PRON_HINT],
  ["Remplace le mot souligné : Elle téléphone à ses amis. → Elle ___ téléphone.", "leur", ["les", "en"], PRON_HINT],
  ["Remplace le mot souligné : Tu vas à l'école. → Tu ___ vas.", "y", ["lui", "en"], PRON_HINT],
  ["Remplace le mot souligné : Il revient du parc. → Il ___ revient.", "en", ["y", "le"], PRON_HINT],
  ["Remplace le mot souligné : J'aime mon chien. → Je ___ aime.", "l'", ["lui", "y"], PRON_HINT],
  ["Remplace le mot souligné : Je veux de la soupe. → J'___ veux.", "en", ["y", "la"], PRON_HINT],
  ["Quelle phrase est correcte?", "Je le lui donne.", ["Je lui le donne.", "Je donne lui le."], PRON_HINT],
  ["Quelle phrase est correcte?", "Il nous parle.", ["Il parle nous.", "Il nous parlent."], PRON_HINT],
  ["Quel pronom remplace « à Léa » dans : Je parle à Léa?", "lui", ["la", "y"], PRON_HINT],
  ["Quel pronom remplace « des livres » dans : J'ai besoin des livres?", "en", ["y", "les"], PRON_HINT],
];

export const HYPOTHETICAL_DEEP: FrItem[] = [
  ["Complète : Si tu étudies, tu ___ ton examen. (réussir)", "réussiras", ["réussirais", "aurais réussi"], IF_HINT],
  ["Complète : Si nous avions plus de temps, nous ___ au musée. (aller)", "irions", ["irons", "serions allés"], IF_HINT],
  ["Complète : Si j'avais su, je ___ plus tôt. (partir)", "serais parti", ["partirai", "partirais"], IF_HINT],
  ["Complète : S'il pleut demain, nous ___ à la maison. (rester)", "resterons", ["resterions", "serions restés"], IF_HINT],
  ["Complète : Si elle avait un chat, elle le ___ Minou. (nommer)", "nommerait", ["nommera", "aurait nommé"], IF_HINT],
  ["Complète : Si vous aviez écouté, vous ___ la réponse. (savoir)", "auriez su", ["saurez", "sauriez"], IF_HINT],
  ["Complète : Si tu me le demandes, je ___ de t'aider. (essayer)", "essaierai", ["essaierais", "aurais essayé"], IF_HINT],
  ["Complète : Si j'étais chef, j'___ des repas santé. (offrir)", "offrirais", ["offrirai", "aurais offert"], IF_HINT],
  ["Quelle phrase exprime une possibilité probable?", "Si tu viens, nous jouerons.", ["Si tu venais, nous jouerions.", "Si tu étais venu, nous aurions joué."], IF_HINT],
  ["Quelle phrase exprime un rêve ou une situation peu probable?", "Si j'étais riche, je voyagerais.", ["Si je suis riche, je voyagerai.", "Si j'avais été riche, j'aurais voyagé."], IF_HINT],
  ["Quelle phrase exprime un regret sur le passé?", "Si j'avais étudié, j'aurais réussi.", ["Si j'étudie, je réussirai.", "Si j'étudiais, je réussirais."], IF_HINT],
  ["Après « si », quel temps ne met-on jamais?", "Le conditionnel présent", ["L'imparfait", "Le présent"], "Après si, on n'emploie pas le conditionnel présent : si j'avais, jamais si j'aurais."],
];
