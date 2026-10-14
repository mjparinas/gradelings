import { lesson, type GradeLessons } from "./index";

export const lessons: GradeLessons = {
  "immersion/tu-ou-vous": lesson(
    ["Use « tu » with family, friends and children your age.", "Use « vous » to be polite with an adult you don't know well, like a teacher or librarian.", "Also use « vous » when you talk to more than one person."],
    "Tu parles à la directrice. Que dis-tu? « Comment vas-tu? » ou « Comment allez-vous? »",
    ["The principal is an adult at school.", "Be polite: use « vous »."],
    "Comment allez-vous?",
  ),
  "immersion/poser-des-questions": lesson(
    ["« Où » asks where, « Quand » asks when, « Pourquoi » asks why, « Comment » asks how.", "Read the answer to see what the question wants.", "Inversion swaps the subject and verb with a hyphen: « Tu aimes » becomes « Aimes-tu »."],
    "Complète : ___ ris-tu? Parce que la blague est drôle.",
    ["The answer starts with « Parce que » (because).", "« because » answers why."],
    "Pourquoi",
  ),
  "immersion/synonymes-et-contraires": lesson(
    ["A synonym means the same or almost the same: « jolie » and « belle ».", "An opposite (« contraire ») means the reverse: « haut » and « bas ».", "Read the question carefully: does it ask for a synonym or an opposite?"],
    "Quel est le contraire de « gagner »?",
    ["« gagner » means to win.", "The opposite of win is lose."],
    "perdre",
  ),
  "immersion/adverbes-en-ment": lesson(
    ["Many adverbs end in « -ment » and tell how an action is done.", "Add « -ment » to the feminine adjective: « lente » becomes « lentement ».", "Adjectives in « -ant » change to « -amment »: « brillant » becomes « brillamment »."],
    "Complète : Il lit ___. (facile)",
    ["« facile » already ends in « -e ».", "Add « -ment »."],
    "facilement",
  ),
  "immersion/comparer": lesson(
    ["« plus … que » means more than.", "« moins … que » means less than.", "« aussi … que » means as … as, when two things are the same."],
    "Complète : Une tortue est ___ rapide qu'un lièvre.",
    ["A tortoise is slower than a hare.", "So it is less fast: « moins »."],
    "moins",
  ),
  "immersion/passe-compose": lesson(
    ["The passé composé tells about a finished action.", "Use « avoir » (j'ai, tu as, il a, nous avons, vous avez, ils ont) + a past participle.", "For « -er » verbs, the past participle ends in « -é »: « jouer » becomes « joué »."],
    "Complète : Hier, les enfants ___ dessiné un chat.",
    ["« les enfants » means « ils ».", "With « ils », « avoir » is « ont »."],
    "ont",
  ),
  "immersion/imparfait": lesson(
    ["The imparfait describes how things were or what used to happen.", "Take the « nous » form, drop « -ons », and add the ending: « nous jouons » gives « jou- ».", "Endings: je -ais, tu -ais, il -ait, nous -ions, vous -iez, ils -aient."],
    "Complète : Autrefois, nous ___ à pied à l'école. (aller)",
    ["« nous allons » gives the stem « all- ».", "With « nous », add « -ions »."],
    "allions",
  ),
  "immersion/comprendre-un-texte": lesson(
    ["Read the question first so you know what to look for.", "Find the part of the text that answers it.", "For feelings, look for clues in what the character says and does."],
    "Priya a perdu son chat. Le soir, il revient. Comment se sent Priya à la fin?",
    ["Her lost cat came home.", "She stops worrying: she is relieved."],
    "Elle est soulagée",
  ),
  "immersion/structure-du-recit": lesson(
    ["Situation initiale: the start shows who, where and when.", "Élément déclencheur and déroulement: a problem appears and the character tries to solve it.", "Dénouement: the problem is solved. Situation finale: how things end."],
    "« Au début, Léa vit seule dans la forêt. » Quelle partie du récit est-ce?",
    ["« Au début » shows it is the start.", "It tells who and where."],
    "La situation initiale",
  ),
};
