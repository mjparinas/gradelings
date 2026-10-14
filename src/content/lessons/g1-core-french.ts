import { lesson, type GradeLessons } from "./index";

export const lessons: GradeLessons = {
  "core-french/sk-cf1-bonjour": lesson(
    ["« Bonjour » means hello. « Bonsoir » means good evening.", "« Merci » means thank you. « S'il vous plaît » means please.", "« Je m'appelle… » tells your name."],
    "How do you say good night?",
    ["Night is « nuit ».", "Good night is « bonne nuit »."],
    "Bonne nuit",
  ),
  "core-french/sk-cf1-classe": lesson(
    ["Look at the picture and name it in English.", "« un crayon » is a pencil. « un sac » is a bag.", "« Regardez » means look. « Écoutez » means listen."],
    "What does your teacher mean by « Écoutez »?",
    ["Your teacher wants you to use your ears.", "« Écoutez » means listen."],
    "Listen",
  ),
  "core-french/sk-cf1-famille": lesson(
    ["« maman » is mom. « papa » is dad.", "« le frère » is brother. « la sœur » is sister.", "« mon » and « ma » mean my: « mon papa », « ma maman »."],
    "What does « ma sœur » mean?",
    ["« ma » means my.", "« sœur » means sister."],
    "my sister",
  ),
  "core-french/sk-cf1-couleurs": lesson(
    ["« rouge » is red. « bleu » is blue. « jaune » is yellow.", "« vert » is green. « blanc » is white. « brun » is brown.", "Look at the colour, then find its French word."],
    "How do you say green?",
    ["Grass is green.", "Green is « vert »."],
    "vert",
  ),
  "core-french/sk-cf1-animaux": lesson(
    ["« le chat » is the cat. « le chien » is the dog.", "« la vache » says « meuh ». « le canard » says « coin-coin ».", "« le lapin » is the rabbit. « la souris » is the mouse."],
    "Which French word names the animal that says « meuh »?",
    ["« meuh » is the sound a cow makes.", "Cow is « la vache »."],
    "la vache",
  ),
};
