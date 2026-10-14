import { lesson, type GradeLessons } from "./index";

export const lessons: GradeLessons = {
  "core-french/sk-cf2-nombres": lesson(
    ["Count to ten: « un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix ».", "Then: « onze, douze, treize, quatorze, quinze, seize ».", "17 to 20: « dix-sept, dix-huit, dix-neuf, vingt »."],
    "Combien d'étoiles? ★★★★★★★★★★★★",
    ["Count them: there are 12.", "12 is « douze »."],
    "douze",
  ),
  "core-french/sk-cf2-questions": lesson(
    ["« Qui? » asks who. « Où? » asks where.", "« Quand? » asks when. « Comment? » asks how.", "« Pourquoi? » asks why. The answer often starts with « Parce que » (because)."],
    "Which question word asks about a place?",
    ["A place answers where.", "Where is « Où »."],
    "Où",
  ),
  "core-french/sk-cf2-articles": lesson(
    ["Every French noun is masculine or feminine.", "Masculine nouns take « le » or « un ». Feminine nouns take « la » or « une ».", "For more than one, use « les »."],
    "Which article goes with « chats » (more than one)?",
    ["« chats » means more than one cat.", "More than one takes « les »."],
    "les",
  ),
  "core-french/sk-cf2-nourriture": lesson(
    ["« J'aime » means I like. « Je n'aime pas » means I don't like.", "« du », « de la » and « de l' » mean some: « du pain », « de la soupe », « de l'eau ».", "Add « s'il vous plaît » to ask politely."],
    "What does « du pain » mean?",
    ["« pain » is bread.", "« du » means some."],
    "some bread",
  ),
  "core-french/sk-cf2-meteo": lesson(
    ["« Il fait soleil » means it is sunny. « Il pleut » means it is raining.", "« Il neige » means it is snowing. « Il fait froid » means it is cold.", "Seasons: « l'hiver » (winter), « le printemps » (spring), « l'été » (summer), « l'automne » (fall)."],
    "What does « Il pleut » mean?",
    ["« Il pleut » goes with an umbrella.", "It means it is raining."],
    "It is raining.",
  ),
};
