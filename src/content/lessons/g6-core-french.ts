import { lesson, type GradeLessons } from "./index";

export const lessons: GradeLessons = {
  "core-french/motifs-de-lettres": lesson(
    ["Some letter groups always make the same sound in French.", "« oi » sounds like « wa »: « roi », « moi ». « ou » sounds like the oo in moon: « nous », « rouge ».", "« eau » and « au » make the same sound: « bateau », « auto »."],
    "Which word has the same « ou » sound as « nous »? « rouge » or « lune »?",
    ["Look for the letters « ou ».", "« rouge » has « ou »."],
    "rouge",
  ),
  "core-french/mots-interrogatifs": lesson(
    ["« Qui? » (who), « Où? » (where), « Quand? » (when), « Pourquoi? » (why), « Comment? » (how).", "« Combien de…? » asks how many or how much: « Combien de livres as-tu? »", "You can flip the subject and verb with a hyphen: « Pourquoi ris-tu? »"],
    "How do you ask “Where do you live?”",
    ["Where: « Où ».", "Flip « tu habites » to « habites-tu »."],
    "Où habites-tu?",
  ),
  "core-french/loisirs": lesson(
    ["« J'aime » + a verb in its base form: « J'aime nager », « Ils aiment chanter ».", "« jouer à » is for sports and games: « Je joue au soccer ».", "« jouer de » is for instruments: « Elle joue de la guitare ». « faire de » is for activities: « Je fais du vélo »."],
    "Complète : Il joue ___ piano.",
    ["The piano is an instrument, so use « jouer de ».", "« de + le piano » becomes « du »."],
    "du",
  ),
  "core-french/parce-que": lesson(
    ["« parce que » means because. It gives a reason.", "Before a vowel, it becomes « parce qu' »: « parce qu'il neige ».", "Answer « Pourquoi? » with « Parce que… » and make sure the reason makes sense."],
    "Which reason fits « Je prends mon parapluie… »?",
    ["An umbrella is for rain.", "« parce qu'il pleut » gives the reason."],
    "parce qu'il pleut",
  ),
  "core-french/emotions-et-etats": lesson(
    ["Some feelings use « avoir » (to have): « J'ai faim » (I am hungry), « J'ai froid », « J'ai peur ».", "Others use « être » (to be): « Je suis content », « Elle est triste ».", "« avoir »: j'ai, tu as, il a. « être »: je suis, tu es, il est."],
    "How do you say “I am thirsty”?",
    ["Thirsty uses « avoir » + « soif ».", "I have thirst: « J'ai soif »."],
    "J'ai soif.",
  ),
  "core-french/famille": lesson(
    ["Family words: « un oncle », « une tante », « une grand-mère », « un cousin ».", "My: « mon » (masculine), « ma » (feminine), « mes » (plural). His or her: « son », « sa », « ses ».", "Use « mon » before a vowel sound, even for a feminine word: « mon amie »."],
    "Complète : Voici ___ tante. (my aunt)",
    ["« tante » is feminine and starts with a consonant.", "Use « ma »."],
    "ma",
  ),
  "core-french/communautes-francophones": lesson(
    ["Francophone people settled and built communities from coast to coast in Canada.", "Acadian, Franco-Ontarian, Fransaskois and Franco-Manitoban communities are a few of them; many Métis people also share French heritage.", "Festivals and traditions, like the sugar shack (« cabane à sucre ») for maple syrup, celebrate this culture."],
    "A « cabane à sucre » is a place associated with…",
    ["« sucre » means sugar.", "At a sugar shack, people make maple syrup."],
    "making maple syrup",
  ),
  "core-french/sources-et-respect": lesson(
    ["When you use someone's exact words, add quotation marks and name the source.", "Handing in someone else's work as yours is plagiarism.", "Before using something from another culture, learn what it means and ask someone from that culture."],
    "A friend gives you their essay to hand in as yours. This is…",
    ["The work is not yours.", "Passing it off as yours is plagiarism."],
    "plagiarism",
  ),
  "core-french/sk-cf6-noms-de-lieux": lesson(
    ["Many place names come from French: « rivière » (river), « lac » (lake), « Saint » or « Sainte » honours a saint.", "Some English words come from French, like « portage »: carrying a canoe between two waters.", "Many place names also come from First Nations languages."],
    "In a place name like « Lac Vert », what does « lac » mean?",
    ["« Lac » is a body of water.", "It means lake."],
    "lake",
  ),
};
