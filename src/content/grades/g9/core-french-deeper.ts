import type { FrItem } from "../../french";

// Extra items appended to the Grade 9 Core French banks so a child can
// practise for weeks without seeing the same question.

const TIME_HINT = "Choose the tense the time clue calls for: hier and dernier point to the past (passé composé or imparfait), maintenant and aujourd'hui to the present, demain and prochain to the future.";
const QUEST_HINT = "Three ways to ask a yes-or-no question: raise your voice (Tu as faim?), use Est-ce que (Est-ce que tu as faim?), or invert the verb and the pronoun (As-tu faim?).";
const NEED_HINT = "To state a need: J'ai besoin de… To ask politely: Je voudrais… / Pouvez-vous… s'il vous plaît? To give an opinion: Je trouve que… / À mon avis…";
const COMP_HINT = "Compare adjectives with plus / moins / aussi… que. Compare amounts with plus de / moins de / autant de… que.";

export const TIMES_DEEP: FrItem[] = [
  ["Complète : Hier soir, nous ___ une pizza. (past: manger)", "avons mangé", ["mangeons", "allons manger"], TIME_HINT],
  ["Complète : L'année prochaine, je ___ en dixième année. (future: être)", "serai", ["étais", "suis"], TIME_HINT],
  ["Complète : Maintenant, elle ___ ses devoirs. (present: faire)", "fait", ["a fait", "fera"], TIME_HINT],
  ["Which time clue points to the future?", "la semaine prochaine", ["la semaine dernière", "hier soir"], TIME_HINT],
  ["Which time clue points to the past?", "l'été dernier", ["demain matin", "l'été prochain"], TIME_HINT],
  ["How do you say “Last summer we travelled to the coast”?", "L'été dernier, nous avons voyagé jusqu'à la côte.", ["L'été prochain, nous voyagerons jusqu'à la côte.", "L'été dernier, nous voyageons jusqu'à la côte."], TIME_HINT],
  ["How do you say “Tomorrow I will call my cousin”?", "Demain, j'appellerai mon cousin.", ["Hier, j'ai appelé mon cousin.", "Demain, j'ai appelé mon cousin."], TIME_HINT],
  ["Complète : Quand j'étais petit, je ___ au parc tous les samedis. (imparfait: aller)", "allais", ["suis allé", "irai"], "The imparfait describes habits in the past: je jouais, j'allais."],
  ["Complète : Hier, il ___ quand je suis arrivé. (imparfait: pleuvoir)", "pleuvait", ["pleuvra", "pleut"], "The imparfait describes what was going on in the past: il pleuvait."],
  ["Which sentence describes a past habit?", "Chaque été, nous nagions au lac.", ["Hier, nous avons nagé au lac.", "Demain, nous nagerons au lac."], TIME_HINT],
  ["What does “dans deux jours” mean?", "in two days", ["two days ago", "for two days"], TIME_HINT],
  ["What does “il y a deux jours” mean?", "two days ago", ["in two days", "every two days"], TIME_HINT],
];

export const QUESTIONS_DEEP: FrItem[] = [
  ["Change “Tu parles anglais.” into a question with inversion.", "Parles-tu anglais?", ["Tu parles-tu anglais?", "Est-ce parles-tu anglais?"], QUEST_HINT],
  ["Change “Nous mangeons ici.” into a question with inversion.", "Mangeons-nous ici?", ["Nous mangeons-nous ici?", "Est-ce mangeons-nous ici?"], QUEST_HINT],
  ["Change “Elle a une idée.” into a question with inversion.", "A-t-elle une idée?", ["A-elle une idée?", "Elle a-t-elle une idée?"], "Add -t- between two vowels to make the question easy to say: a-t-elle."],
  ["Change “Ils habitent ici.” into a question with est-ce que.", "Est-ce qu'ils habitent ici?", ["Est-ce ils habitent ici?", "Est-ce que habitent-ils ici?"], QUEST_HINT],
  ["Complète : ___ est-ce que tu étudies? — Dans ma chambre.", "Où", ["Quand", "Combien"], QUEST_HINT],
  ["Complète : ___ de frères as-tu? — J'en ai deux.", "Combien", ["Où", "Pourquoi"], QUEST_HINT],
  ["Complète : ___ est ton enseignant? — C'est M. Roy.", "Qui", ["Où", "Quand"], QUEST_HINT],
  ["Complète : ___ commence le film? — À sept heures.", "Quand", ["Qui", "Combien"], QUEST_HINT],
  ["Which answer fits “Pourquoi pleures-tu?”", "Parce que je suis triste.", ["À huit heures.", "Au parc."], QUEST_HINT],
  ["Which answer fits “Combien coûte ce chandail?”", "Il coûte vingt dollars.", ["Il est rouge.", "Il est dans le sac."], QUEST_HINT],
  ["Which question asks for a time?", "Quand arrive l'autobus?", ["Où est l'arrêt?", "Qui conduit?"], QUEST_HINT],
  ["Which question asks for a person?", "Qui est ton meilleur ami?", ["Combien coûte ce livre?", "Où habites-tu?"], QUEST_HINT],
];

export const NEEDS_DEEP: FrItem[] = [
  ["What does “J'ai besoin de repos” mean?", "I need rest", ["I want a rooster", "I am resting at home"], NEED_HINT],
  ["How do you politely ask someone to repeat?", "Pouvez-vous répéter, s'il vous plaît?", ["Répète encore!", "Je ne veux pas répéter."], NEED_HINT],
  ["How do you politely ask for a pencil?", "Je voudrais un crayon, s'il vous plaît.", ["Donne-moi un crayon!", "Je veux un crayon tout de suite!"], NEED_HINT],
  ["Which sentence expresses a need?", "J'ai besoin d'aide avec mes devoirs.", ["Mes devoirs sont sur la table.", "Je termine mes devoirs."], NEED_HINT],
  ["What does “À mon avis” mean?", "In my opinion", ["At my house", "In my class"], NEED_HINT],
  ["What does “Je pense que” mean?", "I think that", ["I pay for", "I put away"], NEED_HINT],
  ["Which sentence gives an opinion?", "À mon avis, ce film est excellent.", ["Ce film dure deux heures.", "Ce film commence à huit heures."], NEED_HINT],
  ["Complète : Je ___ d'un stylo. (need)", "ai besoin", ["suis besoin", "fais besoin"], "Use avoir with besoin: j'ai besoin de."],
  ["Which phrase thanks someone politely?", "Merci beaucoup, c'est gentil.", ["Donne-moi ça!", "Je ne veux pas."], NEED_HINT],
  ["Which sentence disagrees politely?", "Je ne suis pas tout à fait d'accord.", ["Tu as complètement tort!", "C'est stupide!"], NEED_HINT],
  ["What does “Il me faut de l'aide” mean?", "I need some help", ["He gives me help", "I am helping him"], NEED_HINT],
  ["What does “Pourriez-vous m'aider?” mean?", "Could you help me?", ["Did you help him?", "Will they help you?"], NEED_HINT],
];

export const COMPARE_DEEP: FrItem[] = [
  ["Complète : Ma sœur est ___ âgée que moi. (She is older.)", "plus", ["moins", "aussi"], COMP_HINT],
  ["Complète : Cette boîte est ___ lourde que l'autre. (They weigh the same.)", "aussi", ["plus", "moins"], COMP_HINT],
  ["Complète : Il y a ___ d'élèves dans ma classe que dans la tienne. (more)", "plus", ["aussi", "autant"], COMP_HINT],
  ["Complète : J'ai ___ de livres que toi. (the same number)", "autant", ["plus", "moins"], COMP_HINT],
  ["Complète : Il mange ___ de bonbons que sa sœur. (fewer)", "moins", ["plus", "autant"], COMP_HINT],
  ["How do you say “The river is longer than the road”?", "La rivière est plus longue que la route.", ["La rivière est moins longue que la route.", "La rivière est aussi longue que la route."], COMP_HINT],
  ["How do you say “Winter is less warm than summer”?", "L'hiver est moins chaud que l'été.", ["L'hiver est plus chaud que l'été.", "L'hiver est aussi chaud que l'été."], COMP_HINT],
  ["How do you say “Hugo has as many friends as Zoé”?", "Hugo a autant d'amis que Zoé.", ["Hugo a plus d'amis que Zoé.", "Hugo a moins d'amis que Zoé."], COMP_HINT],
  ["Mon sac est moins lourd que le tien. What does it mean?", "Mine is lighter.", ["Mine is heavier.", "They weigh the same."], COMP_HINT],
  ["Sam est aussi grand que Max. What does it mean?", "They are the same height.", ["Sam is taller.", "Max is taller."], COMP_HINT],
  ["What does “autant de … que” mean?", "as many … as", ["more … than", "fewer … than"], COMP_HINT],
  ["What does “moins de … que” mean?", "fewer … than", ["as many … as", "more … than"], COMP_HINT],
];
