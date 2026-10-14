import { lesson, type GradeLessons } from "./index";

export const lessons: GradeLessons = {
  "immersion/bonjour-et-merci": lesson(
    ["Say « bonjour » to say hello.", "Say « au revoir » or « à demain » when you leave.", "Say « merci » for thank you. At bedtime, say « bonne nuit »."],
    "Tu arrives à l'école. Que dis-tu?",
    ["You are saying hello.", "Hello is « bonjour »."],
    "Bonjour",
  ),
  "immersion/mes-premiers-mots": lesson(
    ["Look at the picture carefully.", "Say its name in French in your head.", "Find the word that names it."],
    "Quel mot va avec l'image d'un chat?",
    ["The picture shows a cat.", "A cat is « un chat »."],
    "chat",
  ),
  "immersion/lettres": lesson(
    ["Each letter has a name and a shape.", "Look at the lines: tall, round or slanted.", "Say the letter's name in French."],
    "Quelle est cette lettre? M",
    ["It has two tall lines and a V in the middle.", "That is the letter « M »."],
    "M",
  ),
  "immersion/sons-du-debut": lesson(
    ["Say the word slowly.", "Listen to the very first sound.", "Find a word that starts with the same sound."],
    "Quel mot commence comme « main »? mouton ou soleil?",
    ["« main » starts with « mmm ».", "« mouton » starts with « mmm » too."],
    "mouton",
  ),
  "immersion/syllabes": lesson(
    ["A syllable is a beat in a word.", "Clap once for each beat as you say it.", "Count your claps."],
    "Combien de syllabes dans « cheval »?",
    ["Che – val.", "Two claps."],
    "2",
  ),
  "immersion/rimes": lesson(
    ["Words that rhyme end with the same sound.", "Say both words and listen to the end.", "« maison » and « saison » both end in « -son »."],
    "Quel mot rime avec « pain »? dauphin ou chat?",
    ["« pain » ends with « -ain ».", "« dauphin » ends with « -in », the same sound."],
    "dauphin",
  ),
  "immersion/histoires": lesson(
    ["The title is the name of the book: « le titre ».", "The character is who the story is about.", "The place is where the story happens."],
    "Amir joue dans le jardin. Qui est le personnage?",
    ["Who is in the story?", "Amir is playing."],
    "Amir",
  ),
};
