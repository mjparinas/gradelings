import { lesson, type GradeLessons } from "./index";

export const lessons: GradeLessons = {
  "core-french/salutations": lesson(
    ["« Bonjour » means hello. « Bonne nuit » means good night. « À bientôt » means see you soon.", "« Je m'appelle Léa » means my name is Léa.", "To « Comment ça va? » answer « Ça va bien » or « Ça va très bien! »"],
    "What does « À bientôt » mean?",
    ["« bientôt » means soon.", "It says goodbye until soon."],
    "See you soon",
  ),
  "core-french/sons-et-accents": lesson(
    ["Accent aigu (é) leans to the right, as in « été ».", "Accent grave (è) leans to the left, as in « père ».", "Accent circonflexe (ê, â, ô) often sits where an old « s » used to be: « forêt » (forest), « hôpital » (hospital)."],
    "Which word has an accent grave (è)? « père » or « été »?",
    ["An accent grave slants down to the right: è.", "« père » has è."],
    "père",
  ),
  "core-french/nombres": lesson(
    ["1 to 10: « un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix ».", "11 to 16: « onze, douze, treize, quatorze, quinze, seize ».", "17 to 19 are ten + a number: « dix-sept, dix-huit, dix-neuf ». 20 is « vingt »; 21 is « vingt et un »."],
    "Which word means 18?",
    ["18 is 10 + 8.", "« dix » + « huit »."],
    "dix-huit",
  ),
  "core-french/genre-et-nombre": lesson(
    ["French nouns are masculine (« le », « un ») or feminine (« la », « une »).", "Before a vowel, « le » and « la » become « l' »: « l'école ».", "For more than one, use « les » and usually add « -s »: « les chats »."],
    "Which article goes with « école »? « un » or « une »?",
    ["« école » is feminine.", "Feminine takes « une »."],
    "une",
  ),
  "core-french/gouts": lesson(
    ["« J'aime » means I like. « J'adore » means I love.", "« Je n'aime pas » means I don't like. « Je déteste » means I hate.", "« Tu aimes…? » asks someone if they like something."],
    "How do you say “I don't like winter”?",
    ["I don't like: « Je n'aime pas ».", "Winter: « l'hiver »."],
    "Je n'aime pas l'hiver.",
  ),
  "core-french/descriptions": lesson(
    ["« Il est » means he is; « Elle est » means she is.", "Describing words: « grand » (big, tall), « petit » (small), « drôle » (funny), « timide » (shy).", "For a girl or a feminine noun, many adjectives add « -e »: « grande », « petite »."],
    "How do you say “The cat is small”?",
    ["The cat: « Le chat ». Is: « est ».", "Small, masculine: « petit »."],
    "Le chat est petit.",
  ),
  "core-french/communautes-francophones": lesson(
    ["Canada has two official languages, English and French, so many labels show both.", "French-speaking communities live across Canada: Franco-Ontarians in Ontario, Acadians mainly in the Atlantic provinces.", "Many francophone communities hold festivals that share their music and culture."],
    "Acadian communities are found mainly in…",
    ["Acadians live mostly on the east coast.", "That is the Atlantic provinces."],
    "the Atlantic provinces",
  ),
  "core-french/respect": lesson(
    ["When you use someone's words or pictures, name your source to give them credit.", "Copying someone's work as your own is called plagiarism.", "Learn about other cultures by reading, listening and asking kind questions. Never make fun of a culture."],
    "Why do we name our sources?",
    ["Someone else did that work.", "Naming them gives them credit."],
    "To give credit to the people who did the work",
  ),
};
