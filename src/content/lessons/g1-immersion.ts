import { lesson, type GradeLessons } from "./index";

export const lessons: GradeLessons = {
  "immersion/je-me-presente": lesson(
    ["« Je m'appelle… » tells your name.", "« J'ai six ans » tells your age.", "Answer with a whole sentence that matches the question."],
    "On demande : « Quel âge as-tu? »",
    ["The question asks your age.", "Age uses « j'ai … ans »."],
    "J'ai six ans.",
  ),
  "immersion/majuscule-et-point": lesson(
    ["A sentence starts with a capital letter.", "A sentence ends with a period.", "Check the first letter and the end."],
    "Quelle phrase est bien écrite? « il neige dehors » ou « Il neige dehors. »",
    ["« Il » starts with a capital.", "It ends with a period."],
    "Il neige dehors.",
  ),
  "immersion/est-ce-que": lesson(
    ["Put « Est-ce que » at the start to make a question.", "Before a vowel, it becomes « Est-ce qu' ».", "End a question with « ? »."],
    "Fais une question : Tu veux du lait.",
    ["Add « Est-ce que » at the start.", "Add a question mark."],
    "Est-ce que tu veux du lait?",
  ),
  "immersion/verbes-d-action": lesson(
    ["An action word tells what someone does.", "With « je » or « il », it often ends in « -e ».", "With « tu », add « -s ». With « ils », add « -ent »."],
    "Complète : Tu ___ au ballon. (joue, joues)",
    ["The word is « tu ».", "With « tu », add « -s »."],
    "joues",
  ),
  "immersion/couleurs-et-adjectifs": lesson(
    ["« rouge » is red. « bleu » is blue. « vert » is green.", "« jaune » is yellow. « violet » is purple.", "Look at the colour, then say its name."],
    "Cette couleur est comme l'herbe. Elle est…",
    ["Grass is green.", "Green is « vert »."],
    "vert",
  ),
  "immersion/histoire-ou-texte": lesson(
    ["A story has characters and something that happens.", "An information text teaches true facts.", "Ask: is it telling a story, or teaching me?"],
    "« Les abeilles font du miel. » Histoire ou texte qui informe?",
    ["It teaches a true fact about bees.", "No character, no story."],
    "Un texte qui informe",
  ),
  "immersion/elements-d-une-histoire": lesson(
    ["Ask who is in the story.", "Ask where it happens.", "Ask what happens, and in what order."],
    "Le chien court. Il rapporte le ballon. Que se passe-t-il?",
    ["Look at what the dog does.", "He brings back the ball."],
    "Il rapporte le ballon",
  ),
};
