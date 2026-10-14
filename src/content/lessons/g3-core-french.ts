import { lesson, type GradeLessons } from "./index";

export const lessons: GradeLessons = {
  "core-french/sk-cf3-nombres": lesson(
    ["Tens: « vingt » (20), « trente » (30), « quarante » (40), « cinquante » (50).", "Add the ones with a dash: « vingt-deux » (22), « quarante-cinq » (45).", "For 21, 31 and 41, add « et un »: « trente et un »."],
    "How do you say 34 in French?",
    ["30 is « trente ».", "Add 4 with a dash: « trente-quatre »."],
    "trente-quatre",
  ),
  "core-french/sk-cf3-mon-ma-mes": lesson(
    ["« mon » is my for a masculine noun: « mon chat ».", "« ma » is my for a feminine noun: « ma boîte ».", "« mes » is my for more than one: « mes livres ». « ton », « ta », « tes » mean your."],
    "Which French word completes « ___ sœur » (my sister)?",
    ["« sœur » is feminine.", "Feminine takes « ma »."],
    "ma",
  ),
  "core-french/sk-cf3-moi": lesson(
    ["« Je suis » means I am. « Il est » and « Elle est » mean he is and she is.", "« J'ai » means I have: « J'ai les yeux bleus ».", "Describing words: « grand » (tall), « drôle » (funny), « gentil » (kind), « content » (happy)."],
    "How do you say “He is kind”?",
    ["He is: « Il est ».", "Kind: « gentil »."],
    "Il est gentil.",
  ),
  "core-french/sk-cf3-consignes": lesson(
    ["Teachers' instructions often end in « -ez »: « Écrivez » (write), « Lisez » (read).", "« Découpez » means cut out. « Collez » means glue. « Fermez » means close.", "If you are lost, say « Je ne comprends pas » (I don't understand)."],
    "What does « Fermez la porte » mean?",
    ["« Fermez » means close.", "« la porte » is the door."],
    "Close the door.",
  ),
  "core-french/sk-cf3-calendrier": lesson(
    ["Days: « lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche ».", "Months: « janvier, février, mars, avril, mai, juin, juillet, août, septembre, octobre, novembre, décembre ».", "Days and months start with a small letter in French."],
    "Which French word is the day after « mardi »?",
    ["« mardi » is Tuesday.", "The next day is Wednesday: « mercredi »."],
    "mercredi",
  ),
};
