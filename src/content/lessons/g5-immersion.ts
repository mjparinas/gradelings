import { lesson, type GradeLessons } from "./index";

export const lessons: GradeLessons = {
  "immersion/pronoms-relatifs": lesson(
    ["« qui » replaces the subject: it comes right before a verb.", "« que » replaces the object: a subject comes after it (« que je vois »).", "« où » is for a place or time. « dont » replaces « de … »: « parler de » gives « dont je parle »."],
    "Complète : Le cadeau ___ Noé a reçu est un livre.",
    ["After the blank comes a subject: « Noé ».", "So the pronoun is the object: « que »."],
    "que",
  ),
  "immersion/negation": lesson(
    ["Negatives have two parts around the verb: « ne … pas ».", "« ne … plus » means no longer, « ne … jamais » means never, « ne … rien » means nothing.", "Use only one second word: « Il ne dit rien », not « Il ne dit pas rien »."],
    "Complète : Je n'ai ___ oublié. (aucune chose)",
    ["« aucune chose » means nothing.", "Nothing is « rien »."],
    "rien",
  ),
  "immersion/adverbes": lesson(
    ["Time adverbs answer when: « hier », « toujours ».", "Place adverbs answer where: « près », « ici ». Manner adverbs answer how: « vite ».", "Quantity adverbs answer how much: « assez », « trop »."],
    "« Toujours » est un adverbe de…",
    ["« toujours » means always.", "It answers when."],
    "temps",
  ),
  "immersion/ponctuation": lesson(
    ["French quotation marks (guillemets) show what someone says.", "A colon « : » introduces a list or an explanation.", "Parentheses add extra information you could take out."],
    "Dans « Mon chien (un labrador) aime nager », que font les parenthèses?",
    ["Take out the part in parentheses: the sentence still works.", "« un labrador » just adds a detail."],
    "Elles ajoutent une précision",
  ),
  "immersion/bande-dessinee": lesson(
    ["A comic tells a story in panels (« cases ») with speech bubbles (« bulles »).", "An onomatopoeia is a word that copies a sound: « Splash! », « Vroum! ».", "The pictures and words tell the story together."],
    "Que veut dire « Aïe! » dans une bulle?",
    ["« Aïe! » is the sound people make when something hurts.", "The character is hurt."],
    "Le personnage a mal",
  ),
  "immersion/biographie": lesson(
    ["A biography tells the life of a real person.", "It is written in the third person: « il » or « elle ».", "The author researches facts in several sources before writing."],
    "Quelle phrase est écrite à la troisième personne? « Je suis née en 1990. » ou « Elle est née en 1990. »",
    ["Third person uses « il » or « elle ».", "The second sentence uses « Elle »."],
    "Elle est née en 1990.",
  ),
  "immersion/fait-ou-opinion": lesson(
    ["A fact (objective) can be checked and proven true.", "An opinion (subjective) tells what someone thinks or feels.", "Words like « excellent », « meilleur » or « beau » often signal an opinion."],
    "« L'eau gèle à 0 °C. » Objective ou subjective?",
    ["We can check this with a thermometer.", "It is a fact."],
    "Objective (un fait)",
  ),
  "immersion/sk-imm5-cultures": lesson(
    ["Fransaskois are French-speaking people who live in Saskatchewan.", "Michif is a Métis language that mixes French and Cree. The jig and the colourful sash are part of Métis culture.", "Treaties are agreements between First Nations and the Crown."],
    "Qu'est-ce que le michif?",
    ["Michif mixes French and Cree.", "It is spoken by Métis people."],
    "une langue des Métis",
  ),
};
