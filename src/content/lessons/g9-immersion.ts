import { lesson, type GradeLessons } from "./index";

export const lessons: GradeLessons = {
  "immersion/registres-et-expose": lesson(
    ["Choose the register for your audience: « familier » with friends, « courant » or « soutenu » with adults or in an interview.", "In a talk to the school principal, use polite, formal words and « vous ».", "Familiar words and expressions, like « bouffer » or « un froid de canard », don't fit a formal talk."],
    "Quel registre choisir pour une entrevue d'emploi?",
    ["An interview is formal, with an adult you don't know.", "Use correct, polite French."],
    "Courant ou soutenu",
  ),
  "immersion/fable": lesson(
    ["A fable is a short story, often with animals, that teaches a lesson: the « morale ».", "Look at the character's fault (vanity, pride, greed) and what happens to them.", "The moral uses the figurative meaning: it is about people, not only about animals."],
    "Le renard se moque de la cigogne. Plus tard, la cigogne se moque de lui. Quelle est la morale?",
    ["The fox mocked first, then was mocked back.", "The lesson is about what happens to those who mock."],
    "Celui qui se moque des autres risque d'être moqué",
  ),
  "immersion/roman": lesson(
    ["The hero is the main character; the « opposant » stands in their way; the « adjuvant » helps.", "An omniscient narrator knows the thoughts of every character.", "A novel is divided into chapters."],
    "Un dragon attaque le village de l'héroïne. Quel est son rôle?",
    ["The dragon blocks the heroine's goal.", "A character who works against the hero is the « opposant »."],
    "L'opposant",
  ),
  "immersion/figures-de-style": lesson(
    ["Comparaison uses « comme »; métaphore compares without « comme »: « une vraie tortue ».", "Personnification gives human actions to a thing: « La lune sourit ».", "Hyperbole exaggerates on purpose: « J'ai attendu une éternité! »"],
    "« Ce garçon est une vraie tortue. » Quelle figure de style est-ce?",
    ["The boy is compared to a tortoise (he's slow).", "There is no « comme »."],
    "Une métaphore",
  ),
  "immersion/sequence-descriptive": lesson(
    ["A descriptive text has one central subject, such as polar bears.", "It is split into aspects: habitat, food, appearance.", "Rich vocabulary helps: synonyms such as « magnifique » for « beau »."],
    "Dans un texte sur les ours polaires, « Leur nourriture » est un…",
    ["The subject is polar bears.", "Food is one part of that subject."],
    "Aspect",
  ),
  "immersion/temps-du-passe": lesson(
    ["Passé composé: « avoir » or « être » + past participle: « elle a regardé ».", "With « être », the participle agrees with the subject: « Les garçons sont arrivés ».", "With « avoir », it agrees with a direct object placed before it: « la lettre que j'ai écrite »."],
    "Complète : Les pommes qu'elle a ___ étaient bonnes. (manger)",
    ["The direct object « les pommes » comes before « a ».", "Feminine plural: add « -es »."],
    "mangées",
  ),
  "immersion/pronoms-complements": lesson(
    ["« le », « la », « les » replace a direct object; before a vowel « le » or « la » becomes « l' ».", "« lui » and « leur » replace « à + person ».", "« y » replaces a place (« à l'école »); « en » replaces « de + thing »."],
    "Remplace le lieu : Elle va à l'école. → Elle ___ va.",
    ["« à l'école » is a place.", "A place is replaced by « y »."],
    "y",
  ),
  "immersion/phrases-hypothetiques": lesson(
    ["Si + présent → futur simple: « Si tu pars tôt, tu attraperas le train. »", "Si + imparfait → conditionnel: « Si j'étais riche, je voyagerais. »", "Never put the conditionnel right after « si »."],
    "Complète : Si j'avais un chien, je le ___ chaque matin. (promener)",
    ["« Si j'avais » is si + imparfait.", "So the result is conditionnel: « promènerais »."],
    "promènerais",
  ),
  "immersion/passe-simple": lesson(
    ["The passé simple is used in written stories: « il finit », « elle parla ».", "The plus-que-parfait tells what had happened before another past action.", "Form it with « avoir » or « être » in the imparfait + past participle: « il avait fini »."],
    "Quel temps est « avait fini »?",
    ["« avait » is « avoir » in the imparfait.", "Imparfait + past participle is the plus-que-parfait."],
    "Le plus-que-parfait",
  ),
};
