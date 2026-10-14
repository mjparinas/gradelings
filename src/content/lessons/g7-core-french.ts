import { lesson, type GradeLessons } from "./index";

export const lessons: GradeLessons = {
  "core-french/directions": lesson(
    ["« Tournez à droite » (turn right), « Tournez à gauche » (turn left), « Allez tout droit » (go straight).", "« entre » (between), « derrière » (behind), « devant » (in front of), « à côté de » (next to).", "Compass: « le nord », « le sud », « l'est », « l'ouest »."],
    "What does « Allez tout droit » mean?",
    ["« tout droit » means straight ahead.", "« Allez » means go."],
    "Go straight ahead",
  ),
  "core-french/lieux": lesson(
    ["Places in town: « l'école », « le musée », « l'hôpital », « le cinéma », « la bibliothèque ».", "To say at or to a place, use « à »: « à l'école », « à la bibliothèque ».", "« à + le » becomes « au »: « au musée », « au cinéma »."],
    "Where do you borrow books?",
    ["Books are borrowed at the library.", "Library is « la bibliothèque »: « à la bibliothèque »."],
    "à la bibliothèque",
  ),
  "core-french/comparaisons": lesson(
    ["« plus … que » (more than), « moins … que » (less than), « aussi … que » (as … as).", "« bon » (good) becomes « meilleur » (better). Add « -e » or « -s » to match: « meilleurs ».", "« bien » (well) becomes « mieux »: « Anna lit mieux qu'Amir »."],
    "How do you say “My sister is taller than me”?",
    ["Taller is « plus grande » (sister is feminine).", "Than me: « que moi »."],
    "Ma sœur est plus grande que moi.",
  ),
  "core-french/personnalite": lesson(
    ["Many personality words look like English: « patient », « calme », « timide ».", "For a girl or woman, many adjectives change: « sportif » → « sportive », « gentil » → « gentille ».", "Words ending in « -e » stay the same: « calme », « drôle »."],
    "Ma sœur est ___. (athletic)",
    ["Athletic is « sportif ».", "« ma sœur » is feminine: « sportive »."],
    "sportive",
  ),
  "core-french/mots-amis": lesson(
    ["Cognates are words that look alike and mean the same: « famille » (family), « banque » (bank).", "Faux amis look alike but mean something else: « crier » means to shout, not to cry.", "Use pictures and the rest of the sentence to check a word's meaning."],
    "What does « librairie » mean? (a faux ami)",
    ["It looks like library, but it's a faux ami.", "A « librairie » is a store that sells books."],
    "a bookstore",
  ),
  "core-french/histoires": lesson(
    ["The main character is the person the story is mostly about.", "Find the setting (where and when) and the problem.", "Look for feeling words to know how a character feels at the end."],
    "« Ana perd son chapeau rouge. Elle le trouve sous le lit. » What does Ana lose?",
    ["« perd » means loses.", "« son chapeau rouge » is her red hat."],
    "Her red hat",
  ),
  "core-french/monde-francophone": lesson(
    ["French is spoken on many continents: in Europe, Africa, the Americas and beyond.", "In Canada, many French speakers live in Quebec, New Brunswick and Ontario.", "Paris is the capital of France. Kinshasa is the capital of the Democratic Republic of the Congo, a large French-speaking country."],
    "The Eiffel Tower is in which city?",
    ["The Eiffel Tower is in France.", "It is in the capital, Paris."],
    "Paris",
  ),
  "core-french/cultures-et-respect": lesson(
    ["Use sources made by people from the culture you are learning about.", "Every community is different; don't treat many communities as one.", "Before sharing a story or song, credit it and ask permission. Copying work without credit is plagiarism."],
    "You want to use a traditional song in a class video. What should you do first?",
    ["The song belongs to a community.", "Learn its meaning and ask that community first."],
    "Learn its meaning and ask permission from the community",
  ),
};
