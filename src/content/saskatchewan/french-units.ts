import { coreQuestions, frQuestions, type FrItem } from "../french";
import type { GenerateOptions, Question, Unit } from "../types";
import { sk } from "./kit";

// Units written for the Saskatchewan French programs (Core French Levels 1 to 9, and Français en immersion).
// Core French has no BC course before Grade 5, so Grades 1 to 4 are written here, and every grade has a
// culture unit that follows the outcome "Compare elements of Francophone, First Nations and Métis cultures".
// Core French prompts are English with French in it; immersion prompts are French. Outcome codes are checked against
// docs/research/saskatchewan/outcomes.json in content.test.ts.
// Francophone, Métis and First Nations content is kept to widely shared facts and needs review by Fransaskois,
// Métis and First Nations partners and a French teacher before launch.

interface Spec {
  id: string;
  title: string;
  emoji: string;
  blurb: string;
  parentNote: string;
  /** Outcome codes (separated by commas), then a short plain description. */
  standards: readonly [codes: string, text: string];
  generate: (opts?: GenerateOptions) => Question[];
}

function unit(spec: Spec): Unit {
  const { standards, ...rest } = spec;
  return { ...rest, standards: { "ca-sk": sk(standards[0], standards[1]) } };
}

const core = (spec: Omit<Spec, "generate"> & { items: FrItem[] }): Unit => unit({ ...spec, generate: (o) => coreQuestions(spec.items, o, 8) });
const immersion = (spec: Omit<Spec, "generate"> & { items: FrItem[] }): Unit => unit({ ...spec, generate: (o) => frQuestions(spec.items, o, 8, { lang: "fr" }) });

// ---------- Number words ----------

const ONES = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf", "vingt"];
const TENS: Record<number, string> = { 20: "vingt", 30: "trente", 40: "quarante", 50: "cinquante" };

/** French number words from 0 to 59. */
function word(n: number): string {
  if (n <= 20) return ONES[n];
  const tens = Math.floor(n / 10) * 10;
  const ones = n % 10;
  if (ones === 0) return TENS[tens];
  return ones === 1 ? `${TENS[tens]} et un` : `${TENS[tens]}-${ONES[ones]}`;
}

/** Number words next to n (for fair wrong answers). */
const near = (n: number, lo: number, hi: number): string[] =>
  [n - 1, n + 1, n - 2, n + 2, n + 10, n - 10].filter((m) => m >= lo && m <= hi && m !== n).slice(0, 4).map(word);

// ---------- Level 1 (Grade 1) ----------

const HELLO: FrItem[] = [
  ["How do you say hello in the morning?", "Bonjour", ["Bonne nuit", "Au revoir", "Merci"], "Bonjour is the first word of French. Say it out loud.", "👋"],
  ["How do you say goodbye?", "Au revoir", ["Bonjour", "Merci", "S'il vous plaît"], "Au revoir is what you say when you leave.", "🚪"],
  ["How do you say thank you?", "Merci", ["Bonjour", "Au revoir", "Pardon"], "Merci means thank you.", "🙏"],
  ["How do you say please?", "S'il vous plaît", ["Merci", "Bonjour", "Au revoir"], "S'il vous plaît means please.", "🙂"],
  ["What does “Comment ça va?” ask?", "How are you?", ["What is your name?", "How old are you?", "Where is it?"], "Comment ça va? is how you ask someone how they are.", "💬"],
  ["Which answer fits “Comment ça va?”", "Ça va bien.", ["Je m'appelle Léa.", "Au revoir.", "J'ai six ans."], "Ça va bien means I am fine.", "😊"],
  ["What does “Je m'appelle Sam” mean?", "My name is Sam.", ["I am six.", "I like Sam.", "I see Sam."], "Je m'appelle means my name is.", "🏷️"],
  ["How do you ask “What is your name?”", "Comment t'appelles-tu?", ["Comment ça va?", "Quel âge as-tu?", "Où es-tu?"], "Comment t'appelles-tu? asks for a name.", "❓"],
  ["How do you say your name is Mia?", "Je m'appelle Mia.", ["J'ai Mia ans.", "Ça va Mia.", "Merci Mia."], "Start with Je m'appelle, then say your name.", "🏷️"],
  ["What does “J'ai six ans” tell us?", "I am six years old.", ["I have six pets.", "I see six.", "I like six."], "J'ai … ans tells how old you are.", "🎂"],
  ["How do you ask “How old are you?”", "Quel âge as-tu?", ["Comment t'appelles-tu?", "Comment ça va?", "Où habites-tu?"], "Quel âge as-tu? asks for an age.", "🎂"],
  ["What does “Salut” mean?", "Hi", ["Thank you", "Please", "Sorry"], "Friends often say Salut.", "🙋"],
  ["How do you say good night?", "Bonne nuit", ["Bonjour", "Merci", "Bonne journée"], "Bonne nuit means good night.", "🌙"],
  ["What does “Bonne journée” wish you?", "A good day", ["A good night", "A good meal", "A good trip"], "Bonne journée means have a good day.", "☀️"],
  ["What does “À demain” mean?", "See you tomorrow", ["See you today", "Good morning", "Thank you"], "Demain means tomorrow.", "📅"],
  ["What does “De rien” mean?", "You're welcome", ["Thank you", "Please", "Goodbye"], "You say De rien after someone says merci.", "🤝"],
  ["How do you say sorry?", "Désolé", ["Bonjour", "Merci", "Au revoir"], "Désolé means sorry.", "😔"],
  ["What does “Bienvenue” mean?", "Welcome", ["Goodbye", "Thank you", "Good luck"], "Bienvenue means welcome.", "🎉"],
  ["What does “Oui” mean?", "Yes", ["No", "Maybe", "Please"], "Oui means yes and non means no.", "👍"],
  ["What does “Non, merci” mean?", "No, thank you", ["Yes, please", "Hello, friend", "See you later"], "Non is no, merci is thank you.", "🙅"],
  ["Which answer fits “Quel âge as-tu?”", "J'ai sept ans.", ["Je m'appelle Sam.", "Ça va bien.", "Bonjour."], "Answer with J'ai and your age.", "🎂"],
  ["What does “Madame” mean?", "Madam (Mrs.)", ["Sir (Mr.)", "Boy", "Friend"], "Madame is a polite way to speak to a woman.", "👩"],
  ["What does “Monsieur” mean?", "Sir (Mr.)", ["Madam (Mrs.)", "Grandma", "Baby"], "Monsieur is a polite way to speak to a man.", "👨"],
  ["What does “Bonsoir” mean?", "Good evening", ["Good morning", "Good luck", "Thank you"], "Bonsoir is a greeting in the evening.", "🌆"],
  ["How do you say “I am happy”?", "Je suis content.", ["J'ai content.", "Tu es content.", "Il est content."], "Je suis means I am.", "😀"],
];

const CLASS_HINT = "Say the French word out loud as you look at the picture.";
const COMMAND_HINT = "Your teacher uses short commands like Écoutez and Regardez.";

const CLASSROOM: FrItem[] = [
  ["Which French word goes with the picture?", "un livre", ["un crayon", "une chaise", "un sac"], CLASS_HINT, "📖"],
  ["Which French word goes with the picture?", "un crayon", ["un livre", "une porte", "un sac"], CLASS_HINT, "✏️"],
  ["Which French word goes with the picture?", "une chaise", ["une porte", "un livre", "un crayon"], CLASS_HINT, "🪑"],
  ["Which French word goes with the picture?", "un sac", ["une chaise", "un livre", "des ciseaux"], CLASS_HINT, "🎒"],
  ["Which French word goes with the picture?", "une règle", ["un crayon", "un sac", "une porte"], CLASS_HINT, "📏"],
  ["Which French word goes with the picture?", "des ciseaux", ["une règle", "un livre", "une chaise"], CLASS_HINT, "✂️"],
  ["Which French word goes with the picture?", "une porte", ["une fenêtre", "une chaise", "un sac"], CLASS_HINT, "🚪"],
  ["Which French word goes with the picture?", "une fenêtre", ["une porte", "un livre", "un crayon"], CLASS_HINT, "🪟"],
  ["Which French word goes with the picture?", "une horloge", ["une règle", "un sac", "une chaise"], CLASS_HINT, "🕒"],
  ["Which French word goes with the picture?", "un ballon", ["un livre", "un sac", "un crayon"], CLASS_HINT, "⚽"],
  ["Which French word goes with the picture?", "un ordinateur", ["un livre", "une porte", "une règle"], CLASS_HINT, "💻"],
  ["Which French word goes with the picture?", "une carte", ["un livre", "un sac", "un crayon"], CLASS_HINT, "🗺️"],
  ["What does your teacher mean by “Écoutez”?", "Listen", ["Sit down", "Read", "Write"], COMMAND_HINT, "👂"],
  ["What does your teacher mean by “Regardez”?", "Look", ["Listen", "Write", "Sit down"], COMMAND_HINT, "👀"],
  ["What does “Levez la main” mean?", "Raise your hand", ["Close the door", "Open your book", "Stand in line"], COMMAND_HINT, "✋"],
  ["What does “Asseyez-vous” mean?", "Sit down", ["Listen", "Stand up", "Come here"], COMMAND_HINT, "🪑"],
  ["What does “Levez-vous” mean?", "Stand up", ["Sit down", "Raise your hand", "Listen"], COMMAND_HINT, "🧍"],
  ["What does “Ouvrez votre livre” mean?", "Open your book", ["Close your book", "Read aloud", "Pass your book"], COMMAND_HINT, "📖"],
  ["What does “Fermez le livre” mean?", "Close the book", ["Open the book", "Read the book", "Find the book"], COMMAND_HINT, "📕"],
  ["What does “Répétez” mean?", "Repeat", ["Listen", "Write", "Look"], COMMAND_HINT, "🔁"],
  ["What does “Silence, s'il vous plaît” mean?", "Quiet, please", ["Come in, please", "Sit down, please", "Line up, please"], COMMAND_HINT, "🤫"],
  ["What does “Venez ici” mean?", "Come here", ["Go away", "Sit down", "Look up"], COMMAND_HINT, "👋"],
  ["What does “Lavez-vous les mains” mean?", "Wash your hands", ["Raise your hands", "Clap your hands", "Hold hands"], COMMAND_HINT, "🧼"],
  ["What does “Faites la file” mean?", "Line up", ["Sit down", "Make a circle", "Stand on a chair"], COMMAND_HINT, "🚶"],
];

const FAMILY_HINT = "Say the French word out loud. Ma goes with a girl or woman word, mon with a boy or man word.";

const FAMILY: FrItem[] = [
  ["Which French word goes with the picture?", "la maman", ["le papa", "le bébé", "le frère"], FAMILY_HINT, "👩"],
  ["Which French word goes with the picture?", "le papa", ["la maman", "la sœur", "le bébé"], FAMILY_HINT, "👨"],
  ["Which French word goes with the picture?", "le frère", ["la sœur", "la maman", "le bébé"], FAMILY_HINT, "👦"],
  ["Which French word goes with the picture?", "la sœur", ["le frère", "le papa", "le bébé"], FAMILY_HINT, "👧"],
  ["Which French word goes with the picture?", "la grand-maman", ["le grand-papa", "la maman", "le bébé"], FAMILY_HINT, "👵"],
  ["Which French word goes with the picture?", "le grand-papa", ["la grand-maman", "le papa", "le bébé"], FAMILY_HINT, "👴"],
  ["Which French word goes with the picture?", "le bébé", ["la maman", "le papa", "le frère"], FAMILY_HINT, "👶"],
  ["Which French word goes with the picture?", "la famille", ["le bébé", "le frère", "la sœur"], FAMILY_HINT, "👨‍👩‍👧‍👦"],
  ["What does “ma maman” mean?", "my mom", ["my dad", "my sister", "my baby"], FAMILY_HINT, "👩"],
  ["What does “mon papa” mean?", "my dad", ["my mom", "my brother", "my baby"], FAMILY_HINT, "👨"],
  ["What does “mon frère” mean?", "my brother", ["my sister", "my dad", "my friend"], FAMILY_HINT, "👦"],
  ["What does “ma sœur” mean?", "my sister", ["my brother", "my mom", "my friend"], FAMILY_HINT, "👧"],
  ["What does “ma grand-maman” mean?", "my grandma", ["my grandpa", "my mom", "my sister"], FAMILY_HINT, "👵"],
  ["What does “mon grand-papa” mean?", "my grandpa", ["my grandma", "my dad", "my brother"], FAMILY_HINT, "👴"],
  ["What does “ma famille” mean?", "my family", ["my friend", "my house", "my school"], FAMILY_HINT, "🏡"],
  ["What does “J'aime ma famille” mean?", "I love my family.", ["I see my family.", "I help my family.", "I have a family."], "J'aime can mean I love or I like.", "❤️"],
  ["What does “J'ai un frère” mean?", "I have a brother.", ["I am a brother.", "I see a brother.", "I like a brother."], "J'ai means I have.", "👦"],
  ["What does “J'ai une sœur” mean?", "I have a sister.", ["I am a sister.", "I see a sister.", "I like a sister."], "J'ai means I have.", "👧"],
  ["What does “Voici ma mère” mean?", "Here is my mother.", ["Here is my father.", "Here is my sister.", "Here is my house."], "Voici means here is.", "👩"],
  ["What does “Voici mon père” mean?", "Here is my father.", ["Here is my mother.", "Here is my brother.", "Here is my house."], "Voici means here is.", "👨"],
  ["How do you say “my mom”?", "ma maman", ["mon maman", "le maman", "mes maman"], FAMILY_HINT, "👩"],
  ["How do you say “my dad”?", "mon papa", ["ma papa", "la papa", "mes papa"], FAMILY_HINT, "👨"],
  ["How do you say “my brother”?", "mon frère", ["ma frère", "la frère", "mes frère"], FAMILY_HINT, "👦"],
  ["How do you say “my sister”?", "ma sœur", ["mon sœur", "le sœur", "mes sœur"], FAMILY_HINT, "👧"],
];

// ---------- Level 2 (Grade 2) ----------

const COUNT_HINT = "Count the pictures out loud in French: un, deux, trois…";

function numbersTo20(o?: GenerateOptions): Question[] {
  const items: FrItem[] = [];
  for (let n = 1; n <= 20; n++) {
    items.push(["Combien d'étoiles?", word(n), near(n, 1, 20), COUNT_HINT, { type: "dots", count: n, emoji: "⭐" }]);
  }
  const pairs: [number, string][] = [[3, "après"], [6, "après"], [9, "après"], [12, "après"], [15, "après"], [18, "après"], [4, "avant"], [8, "avant"], [11, "avant"], [14, "avant"], [17, "avant"], [20, "avant"]];
  for (const [n, dir] of pairs) {
    const answer = dir === "après" ? n + 1 : n - 1;
    items.push([`Which French word comes ${dir === "après" ? "after" : "before"} “${word(n)}” in counting?`, word(answer), near(answer, 1, 20), "Count in French and listen for the next number.", undefined]);
  }
  for (const n of [5, 7, 10, 13, 16, 19]) {
    items.push([`What number is “${word(n)}”?`, String(n), [n - 1, n + 1, n + 10].map(String), COUNT_HINT, undefined]);
  }
  return coreQuestions(items, o, 8);
}

const QUESTION_HINT = "Question words start a question: Qui? Où? Quand? Pourquoi? Comment?";

const QUESTIONS: FrItem[] = [
  ["What does “Qui?” ask?", "Who?", ["Where?", "When?", "Why?"], QUESTION_HINT, "🧑"],
  ["What does “Où?” ask?", "Where?", ["Who?", "When?", "How?"], QUESTION_HINT, "📍"],
  ["What does “Quand?” ask?", "When?", ["Where?", "Who?", "Why?"], QUESTION_HINT, "⏰"],
  ["What does “Pourquoi?” ask?", "Why?", ["Who?", "Where?", "When?"], QUESTION_HINT, "🤔"],
  ["What does “Comment?” ask?", "How?", ["Who?", "Where?", "When?"], QUESTION_HINT, "🛠️"],
  ["What does “Combien?” ask?", "How many?", ["Who?", "Where?", "When?"], QUESTION_HINT, "🔢"],
  ["What does “Quoi?” ask?", "What?", ["Who?", "Where?", "How many?"], QUESTION_HINT, "❓"],
  ["What does “Quel âge as-tu?” ask?", "How old are you?", ["What is your name?", "Where are you?", "Who are you?"], QUESTION_HINT, "🎂"],
  ["Which question word asks about a place?", "Où", ["Qui", "Quand", "Combien"], QUESTION_HINT, "📍"],
  ["Which question word asks about a person?", "Qui", ["Où", "Quand", "Combien"], QUESTION_HINT, "🧑"],
  ["Which question word asks about a time?", "Quand", ["Où", "Qui", "Combien"], QUESTION_HINT, "⏰"],
  ["Which question word asks about a number?", "Combien", ["Où", "Qui", "Quand"], QUESTION_HINT, "🔢"],
  ["Which question word asks for a reason?", "Pourquoi", ["Où", "Qui", "Combien"], QUESTION_HINT, "🤔"],
  ["Which answer fits “Où est le chat?”", "Il est sur la table.", ["Il a trois ans.", "C'est Marie.", "À huit heures."], "Où asks about a place, so the answer names a place.", "🐱"],
  ["Which answer fits “Qui est-ce?”", "C'est ma sœur.", ["Il est à l'école.", "À midi.", "Parce que j'ai faim."], "Qui asks about a person.", "🧑"],
  ["Which answer fits “Quand?”", "Demain.", ["Marie.", "Sur la table.", "Trois."], "Quand asks about a time.", "⏰"],
  ["Which answer fits “Pourquoi?”", "Parce que j'ai faim.", ["Demain.", "Sur la table.", "Marie."], "Parce que gives a reason.", "🤔"],
  ["Which answer fits “Combien?”", "Cinq.", ["Demain.", "Marie.", "À l'école."], "Combien asks about a number.", "🔢"],
  ["Which answer fits “Comment ça va?”", "Ça va bien, merci.", ["J'ai neuf ans.", "C'est Marie.", "Sur la table."], "Comment ça va? asks how you are.", "😊"],
  ["Which answer fits “Quel âge as-tu?”", "J'ai huit ans.", ["Ça va bien.", "Je m'appelle Léa.", "C'est lundi."], "Answer with J'ai and your age.", "🎂"],
  ["Which answer fits “Comment t'appelles-tu?”", "Je m'appelle Noah.", ["J'ai huit ans.", "Ça va bien.", "À l'école."], "Answer with Je m'appelle and your name.", "🏷️"],
  ["Which answer fits “Où habites-tu?”", "J'habite à la ferme.", ["J'ai huit ans.", "Je m'appelle Noah.", "Ça va bien."], "Où habites-tu? asks where you live.", "🏡"],
  ["Which question word means “how many”?", "Combien", ["Comment", "Quand", "Pourquoi"], QUESTION_HINT, "🔢"],
  ["Which question word means “how”?", "Comment", ["Combien", "Quand", "Pourquoi"], QUESTION_HINT, "🛠️"],
  ["What does “Qui est-ce?” ask?", "Who is it?", ["Where is it?", "When is it?", "What is it?"], QUESTION_HINT, "🧑"],
  ["What does “Où est le chien?” ask?", "Where is the dog?", ["Who is the dog?", "When is the dog?", "Why is the dog?"], QUESTION_HINT, "🐶"],
];

const ARTICLE_HINT = "Nouns are masculine or feminine. Le and un go with masculine words; la and une with feminine words.";

const ARTICLES: FrItem[] = [
  ["Which article goes with “chat”?", "le", ["la", "les", "une"], ARTICLE_HINT, "🐱"],
  ["Which article goes with “chien”?", "le", ["la", "les", "une"], ARTICLE_HINT, "🐶"],
  ["Which article goes with “crayon”?", "le", ["la", "les", "une"], ARTICLE_HINT, "✏️"],
  ["Which article goes with “sac”?", "le", ["la", "les", "une"], ARTICLE_HINT, "🎒"],
  ["Which article goes with “ballon”?", "le", ["la", "les", "une"], ARTICLE_HINT, "⚽"],
  ["Which article goes with “table”?", "la", ["le", "les", "un"], ARTICLE_HINT, undefined],
  ["Which article goes with “chaise”?", "la", ["le", "les", "un"], ARTICLE_HINT, "🪑"],
  ["Which article goes with “porte”?", "la", ["le", "les", "un"], ARTICLE_HINT, "🚪"],
  ["Which article goes with “règle”?", "la", ["le", "les", "un"], ARTICLE_HINT, "📏"],
  ["Which article goes with “maison”?", "la", ["le", "les", "un"], ARTICLE_HINT, "🏠"],
  ["Which article completes “___ pomme”?", "une", ["un", "le", "les"], ARTICLE_HINT, "🍎"],
  ["Which article completes “___ banane”?", "une", ["un", "le", "les"], ARTICLE_HINT, "🍌"],
  ["Which article completes “___ chat”?", "un", ["une", "la", "les"], ARTICLE_HINT, "🐱"],
  ["Which article completes “___ livre”?", "un", ["une", "la", "les"], ARTICLE_HINT, "📖"],
  ["Which article completes “___ stylo”?", "un", ["une", "la", "les"], ARTICLE_HINT, "🖊️"],
  ["Which article completes “___ fenêtre”?", "une", ["un", "le", "les"], ARTICLE_HINT, "🪟"],
  ["Which article goes with “chats” (more than one)?", "les", ["le", "la", "un"], "Les is used for more than one thing.", "🐱🐱"],
  ["Which article goes with “livres” (more than one)?", "les", ["le", "la", "une"], "Les is used for more than one thing.", "📚"],
  ["Which article goes with “chaises” (more than one)?", "les", ["le", "la", "un"], "Les is used for more than one thing.", "🪑"],
  ["Which article goes with “pommes” (more than one)?", "les", ["le", "la", "un"], "Les is used for more than one thing.", "🍎"],
  ["Which word means “I”?", "je", ["tu", "il", "elle"], "Je is I. Tu is you.", "🙋"],
  ["Which word means “you” (to a friend)?", "tu", ["je", "il", "elle"], "Tu is you.", "👉"],
  ["Which word means “he”?", "il", ["elle", "je", "tu"], "Il is he. Elle is she.", "👦"],
  ["Which word means “she”?", "elle", ["il", "je", "tu"], "Il is he. Elle is she.", "👧"],
  ["Which word means “we”?", "nous", ["je", "tu", "elle"], "Nous is we.", "👫"],
  ["Which French word means they, for a group of boys or a mixed group?", "ils", ["il", "elle", "je"], "Ils is they.", "👥"],
];

// ---------- Level 3 (Grade 3) ----------

function numbersTo50(o?: GenerateOptions): Question[] {
  const items: FrItem[] = [];
  for (const n of [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35, 37, 38, 40, 41, 43, 45, 47, 49, 50]) {
    items.push([`How do you say ${n} in French?`, word(n), near(n, 20, 50), "Count by tens: vingt, trente, quarante, cinquante. Then add the ones.", undefined]);
  }
  for (const n of [22, 26, 33, 36, 42, 44, 48]) {
    items.push([`What number is “${word(n)}”?`, String(n), [n - 1, n + 1, n + 10].map(String), "Listen for the tens first, then the ones.", undefined]);
  }
  for (const [a, b] of [[10, 5], [20, 5], [20, 10], [30, 5], [25, 5], [15, 10], [12, 8], [40, 5]] as const) {
    items.push([`Combien font ${a} + ${b}?`, word(a + b), near(a + b, 10, 50), "Add the numbers, then say the answer in French.", undefined]);
  }
  return coreQuestions(items, o, 8);
}

const MINE_HINT = "Mon goes with a masculine word, ma with a feminine word and mes with more than one.";

const MINE: FrItem[] = [
  ["Which French word completes “___ crayon” (my pencil)?", "mon", ["ma", "mes", "le"], MINE_HINT, "✏️"],
  ["Which French word completes “___ livre” (my book)?", "mon", ["ma", "mes", "la"], MINE_HINT, "📖"],
  ["Which French word completes “___ sac” (my bag)?", "mon", ["ma", "mes", "la"], MINE_HINT, "🎒"],
  ["Which French word completes “___ chat” (my cat)?", "mon", ["ma", "mes", "la"], MINE_HINT, "🐱"],
  ["Which French word completes “___ ballon” (my ball)?", "mon", ["ma", "mes", "la"], MINE_HINT, "⚽"],
  ["Which French word completes “___ frère” (my brother)?", "mon", ["ma", "mes", "la"], MINE_HINT, "👦"],
  ["Which French word completes “___ cahier” (my notebook)?", "mon", ["ma", "mes", "la"], MINE_HINT, "📓"],
  ["Which French word completes “___ règle” (my ruler)?", "ma", ["mon", "mes", "le"], MINE_HINT, "📏"],
  ["Which French word completes “___ chaise” (my chair)?", "ma", ["mon", "mes", "le"], MINE_HINT, "🪑"],
  ["Which French word completes “___ sœur” (my sister)?", "ma", ["mon", "mes", "le"], MINE_HINT, "👧"],
  ["Which French word completes “___ maison” (my house)?", "ma", ["mon", "mes", "le"], MINE_HINT, "🏠"],
  ["Which French word completes “___ boîte” (my box)?", "ma", ["mon", "mes", "le"], MINE_HINT, "📦"],
  ["Which French word completes “___ classe” (my class)?", "ma", ["mon", "mes", "le"], MINE_HINT, "🏫"],
  ["Which French word completes “___ crayons” (my pencils)?", "mes", ["mon", "ma", "le"], MINE_HINT, "✏️✏️"],
  ["Which French word completes “___ livres” (my books)?", "mes", ["mon", "ma", "la"], MINE_HINT, "📚"],
  ["Which French word completes “___ amis” (my friends)?", "mes", ["mon", "ma", "la"], MINE_HINT, "👫"],
  ["Which French word completes “___ jouets” (my toys)?", "mes", ["mon", "ma", "le"], MINE_HINT, "🧸"],
  ["Which French word completes “___ chaussures” (my shoes)?", "mes", ["mon", "ma", "la"], MINE_HINT, "👟"],
  ["What does “mon sac” mean?", "my bag", ["your bag", "his bag", "the bag"], MINE_HINT, "🎒"],
  ["What does “ma maison” mean?", "my house", ["your house", "her house", "the house"], MINE_HINT, "🏠"],
  ["What does “mes amis” mean?", "my friends", ["your friends", "his friends", "the friends"], MINE_HINT, "👫"],
  ["What does “mes livres” mean?", "my books", ["your books", "her books", "the books"], MINE_HINT, "📚"],
  ["What does “ton chat” mean?", "your cat", ["my cat", "his cat", "our cat"], "Ton, ta and tes mean your. Mon, ma and mes mean my.", "🐱"],
  ["What does “ta sœur” mean?", "your sister", ["my sister", "her sister", "our sister"], "Ton, ta and tes mean your. Mon, ma and mes mean my.", "👧"],
  ["What does “tes crayons” mean?", "your pencils", ["my pencils", "his pencils", "the pencils"], "Ton, ta and tes mean your. Mon, ma and mes mean my.", "✏️"],
  ["What does “ton ballon” mean?", "your ball", ["my ball", "his ball", "the ball"], "Ton, ta and tes mean your. Mon, ma and mes mean my.", "⚽"],
  ["How do you say “my notebook”?", "mon cahier", ["ma cahier", "mes cahier", "la cahier"], MINE_HINT, "📓"],
  ["How do you say “my ruler”?", "ma règle", ["mon règle", "mes règle", "le règle"], MINE_HINT, "📏"],
];

const ATTRIBUTE_HINT = "Je suis means I am. Il est means he is and elle est means she is.";

const ATTRIBUTES: FrItem[] = [
  ["What does “Je suis grand” mean?", "I am tall.", ["I am small.", "I am happy.", "I am hungry."], ATTRIBUTE_HINT, "📏"],
  ["What does “Je suis petit” mean?", "I am small.", ["I am tall.", "I am sad.", "I am tired."], ATTRIBUTE_HINT, "🐭"],
  ["What does “Je suis content” mean?", "I am happy.", ["I am sad.", "I am tired.", "I am shy."], ATTRIBUTE_HINT, "😀"],
  ["What does “Je suis triste” mean?", "I am sad.", ["I am happy.", "I am funny.", "I am fast."], ATTRIBUTE_HINT, "😢"],
  ["What does “Je suis fatigué” mean?", "I am tired.", ["I am happy.", "I am strong.", "I am kind."], ATTRIBUTE_HINT, "😴"],
  ["What does “Je suis gentil” mean?", "I am kind.", ["I am shy.", "I am tall.", "I am tired."], ATTRIBUTE_HINT, "💛"],
  ["What does “Je suis drôle” mean?", "I am funny.", ["I am kind.", "I am sad.", "I am tall."], ATTRIBUTE_HINT, "😄"],
  ["What does “Je suis fort” mean?", "I am strong.", ["I am fast.", "I am small.", "I am shy."], ATTRIBUTE_HINT, "💪"],
  ["What does “Je suis rapide” mean?", "I am fast.", ["I am strong.", "I am tired.", "I am funny."], ATTRIBUTE_HINT, "🏃"],
  ["What does “Je suis timide” mean?", "I am shy.", ["I am funny.", "I am happy.", "I am fast."], ATTRIBUTE_HINT, "🙈"],
  ["How do you say “I am tall”?", "Je suis grand.", ["Je suis petit.", "J'ai grand.", "Tu es grand."], ATTRIBUTE_HINT, "📏"],
  ["How do you say “I am sad”?", "Je suis triste.", ["Je suis content.", "J'ai triste.", "Il est triste."], ATTRIBUTE_HINT, "😢"],
  ["How do you say “I am funny”?", "Je suis drôle.", ["Je suis gentil.", "J'ai drôle.", "Tu es drôle."], ATTRIBUTE_HINT, "😄"],
  ["How do you say “I am strong”?", "Je suis fort.", ["Je suis rapide.", "J'ai fort.", "Il est fort."], ATTRIBUTE_HINT, "💪"],
  ["How do you say “I am tired”?", "Je suis fatigué.", ["Je suis content.", "J'ai fatigué.", "Tu es fatigué."], ATTRIBUTE_HINT, "😴"],
  ["How do you say “He is kind”?", "Il est gentil.", ["Elle est gentille.", "Je suis gentil.", "Il a gentil."], ATTRIBUTE_HINT, "💛"],
  ["How do you say “She is funny”?", "Elle est drôle.", ["Il est drôle.", "Je suis drôle.", "Elle a drôle."], ATTRIBUTE_HINT, "😄"],
  ["How do you say “You are fast” (to a friend)?", "Tu es rapide.", ["Je suis rapide.", "Il est rapide.", "Tu as rapide."], ATTRIBUTE_HINT, "🏃"],
  ["What does “Il est content” mean?", "He is happy.", ["She is happy.", "I am happy.", "You are happy."], ATTRIBUTE_HINT, "😀"],
  ["What does “Elle est timide” mean?", "She is shy.", ["He is shy.", "I am shy.", "You are shy."], ATTRIBUTE_HINT, "🙈"],
  ["What does “Tu es fort” mean?", "You are strong.", ["I am strong.", "He is strong.", "She is strong."], ATTRIBUTE_HINT, "💪"],
  ["What does “J'ai les cheveux bruns” mean?", "I have brown hair.", ["I have blond hair.", "I have long hair.", "I have a brown hat."], "Les cheveux are hair. Brun is brown.", "🧑"],
  ["What does “J'ai les yeux bleus” mean?", "I have blue eyes.", ["I have green eyes.", "I have blue hair.", "I have a blue hat."], "Les yeux are eyes. Bleu is blue.", "👀"],
  ["How do you say “I have brown eyes”?", "J'ai les yeux bruns.", ["Je suis les yeux bruns.", "J'ai les cheveux bruns.", "J'ai les yeux bleus."], "Les yeux are eyes. Brun is brown.", "👀"],
  ["How do you say “I have black hair”?", "J'ai les cheveux noirs.", ["J'ai les yeux noirs.", "Je suis les cheveux noirs.", "J'ai les cheveux blonds."], "Les cheveux are hair. Noir is black.", "🧑"],
];

// ---------- Level 4 (Grade 4) ----------

const ER_HINT = "Verbs that end in -er change their ending: je -e, tu -es, il -e, nous -ons, vous -ez, ils -ent.";

const ER_VERBS: FrItem[] = [
  ["Which French word completes “Je ___ français”?", "parle", ["parles", "parlons", "parlent"], ER_HINT, "🗣️"],
  ["Which French word completes “Tu ___ au hockey”?", "joues", ["joue", "jouons", "jouent"], ER_HINT, "🏒"],
  ["Which French word completes “Elle ___ une chanson”?", "chante", ["chantes", "chantons", "chantent"], ER_HINT, "🎤"],
  ["Which French word completes “Nous ___ à la fête”?", "dansons", ["danse", "danses", "dansent"], ER_HINT, "💃"],
  ["Which French word completes “Vous ___ la télé”?", "regardez", ["regarde", "regardons", "regardent"], ER_HINT, "📺"],
  ["Which French word completes “Ils ___ la musique”?", "écoutent", ["écoute", "écoutes", "écoutons"], ER_HINT, "🎵"],
  ["Which French word completes “Tu ___ la pizza”?", "aimes", ["aime", "aimons", "aiment"], ER_HINT, "🍕"],
  ["Which French word completes “Tu ___ un livre”?", "regardes", ["regarde", "regardons", "regardent"], ER_HINT, "📖"],
  ["Which French word completes “Il ___ en classe”?", "travaille", ["travailles", "travaillons", "travaillent"], ER_HINT, "✏️"],
  ["Which French word completes “Nous ___ au parc”?", "jouons", ["joue", "joues", "jouent"], ER_HINT, "🛝"],
  ["Which French word completes “Elles ___ une chanson”?", "chantent", ["chante", "chantes", "chantons"], ER_HINT, "🎶"],
  ["Which French word completes “Vous ___ bien”?", "parlez", ["parle", "parlons", "parlent"], ER_HINT, "🗣️"],
  ["Which French word completes “Nous ___ une pomme”? (manger)", "mangeons", ["mangons", "mange", "mangent"], "With nous, manger keeps an e so the g sounds soft: mangeons.", "🍎"],
  ["Which French word completes “Nous ___ la radio”?", "écoutons", ["écoute", "écoutes", "écoutent"], ER_HINT, "📻"],
  ["Which French word completes “On ___ au soccer”?", "joue", ["joues", "jouons", "jouent"], "On goes with the same ending as il and elle.", "⚽"],
  ["Which French word completes “Tu ___ très bien”?", "danses", ["danse", "dansons", "dansent"], ER_HINT, "💃"],
  ["What does “parler” mean?", "to speak", ["to sing", "to play", "to eat"], "Parler is the infinitive: the name of the verb.", "🗣️"],
  ["What does “jouer” mean?", "to play", ["to speak", "to sing", "to eat"], "Jouer is the infinitive: the name of the verb.", "🎲"],
  ["What does “chanter” mean?", "to sing", ["to dance", "to play", "to listen"], "Chanter is the infinitive: the name of the verb.", "🎤"],
  ["What does “danser” mean?", "to dance", ["to sing", "to run", "to eat"], "Danser is the infinitive: the name of the verb.", "💃"],
  ["What does “manger” mean?", "to eat", ["to cook", "to play", "to speak"], "Manger is the infinitive: the name of the verb.", "🍽️"],
  ["What does “regarder” mean?", "to watch or look at", ["to listen to", "to speak to", "to play with"], "Regarder is the infinitive: the name of the verb.", "👀"],
  ["What does “écouter” mean?", "to listen to", ["to watch", "to speak to", "to sing to"], "Écouter is the infinitive: the name of the verb.", "👂"],
  ["What does “Nous mangeons” mean?", "We eat.", ["I eat.", "They eat.", "You eat."], ER_HINT, "🍽️"],
  ["What does “Ils chantent” mean?", "They sing.", ["We sing.", "I sing.", "You sing."], ER_HINT, "🎶"],
  ["How do you say “I play hockey”?", "Je joue au hockey.", ["Je jouer au hockey.", "Je jouons au hockey.", "Tu joue au hockey."], ER_HINT, "🏒"],
  ["How do you say “We speak French”?", "Nous parlons français.", ["Nous parle français.", "Nous parlez français.", "Je parlons français."], ER_HINT, "🗣️"],
  ["How do you say “we dance”?", "Nous dansons.", ["Nous danse.", "Nous dansez.", "Je dansons."], ER_HINT, "💃"],
];

const WHERE_HINT = "Little words show where something is: sur (on), sous (under), dans (in), devant (in front of), derrière (behind).";

const WHERE: FrItem[] = [
  ["What does “sur” mean?", "on", ["under", "in", "behind"], WHERE_HINT, "⬆️"],
  ["What does “sous” mean?", "under", ["on", "in", "beside"], WHERE_HINT, "⬇️"],
  ["What does “dans” mean?", "in", ["on", "under", "behind"], WHERE_HINT, "📦"],
  ["What does “devant” mean?", "in front of", ["behind", "under", "beside"], WHERE_HINT, "➡️"],
  ["What does “derrière” mean?", "behind", ["in front of", "on", "in"], WHERE_HINT, "⬅️"],
  ["What does “à côté de” mean?", "beside", ["under", "behind", "in"], WHERE_HINT, "↔️"],
  ["What does “entre” mean?", "between", ["on", "under", "behind"], WHERE_HINT, "🥪"],
  ["What does “près de” mean?", "near", ["far from", "under", "in"], WHERE_HINT, "📍"],
  ["What does “loin de” mean?", "far from", ["near", "on", "in"], WHERE_HINT, "🔭"],
  ["“Le chat est sur la chaise.” Where is the cat?", "on the chair", ["under the chair", "behind the chair", "beside the chair"], WHERE_HINT, "🐱"],
  ["“Le chien est sous la table.” Where is the dog?", "under the table", ["on the table", "in the table", "behind the table"], WHERE_HINT, "🐶"],
  ["“Le livre est dans le sac.” Where is the book?", "in the bag", ["on the bag", "under the bag", "behind the bag"], WHERE_HINT, "📖"],
  ["“Le ballon est derrière la porte.” Where is the ball?", "behind the door", ["in front of the door", "on the door", "in the door"], WHERE_HINT, "⚽"],
  ["“Le vélo est devant la maison.” Where is the bike?", "in front of the house", ["behind the house", "in the house", "on the house"], WHERE_HINT, "🚲"],
  ["“Ma sœur est à côté de moi.” Where is my sister?", "beside me", ["behind me", "far from me", "under me"], WHERE_HINT, "👧"],
  ["“La lampe est entre le lit et la fenêtre.” Where is the lamp?", "between the bed and the window", ["on the bed", "behind the window", "under the bed"], WHERE_HINT, "💡"],
  ["How do you ask “Where is the dog?”", "Où est le chien?", ["Qui est le chien?", "Quand est le chien?", "Combien est le chien?"], "Où asks about a place.", "🐶"],
  ["How do you ask “Who is it?”", "Qui est-ce?", ["Où est-ce?", "Quand est-ce?", "Combien est-ce?"], "Qui asks about a person.", "🧑"],
  ["How do you ask “How many books?”", "Combien de livres?", ["Où de livres?", "Qui de livres?", "Quand de livres?"], "Combien asks about a number.", "📚"],
  ["How do you say “behind the door”?", "derrière la porte", ["devant la porte", "sur la porte", "sous la porte"], WHERE_HINT, "🚪"],
  ["How do you say “under the table”?", "sous la table", ["sur la table", "dans la table", "devant la table"], WHERE_HINT, "🪑"],
  ["How do you say “in the box”?", "dans la boîte", ["sur la boîte", "sous la boîte", "derrière la boîte"], WHERE_HINT, "📦"],
  ["How do you say “on the desk”?", "sur le bureau", ["sous le bureau", "dans le bureau", "devant le bureau"], WHERE_HINT, "💻"],
  ["Which answer is a command?", "Ferme la porte.", ["La porte est fermée.", "Où est la porte?", "La porte est bleue."], "A command tells someone to do something.", "☝️"],
  ["Which answer is a command?", "Écoute bien.", ["Il écoute bien.", "Qui écoute?", "Elle est gentille."], "A command tells someone to do something.", "☝️"],
  ["Which answer is a question?", "Où est mon sac?", ["Mon sac est ici.", "Prends ton sac.", "J'ai un sac."], "A question often starts with a question word and ends with ?", "❓"],
  ["Which answer is a statement?", "Le chat dort.", ["Où est le chat?", "Regarde le chat!", "Qui est le chat?"], "A statement tells something and ends with a period.", "💬"],
];

// ---------- Culture: Saskatchewan (Core French) ----------

const FRANSASKOIS_HINT = "Francophone people have lived in Saskatchewan for a long time, alongside First Nations and Métis peoples.";

const FRANSASKOIS: FrItem[] = [
  ["What does “fransaskois” describe?", "French-speaking people of Saskatchewan", ["People who live in Québec", "A kind of wheat", "A river in the north"], "Fransaskois is made from français and Saskatchewan.", "🌾"],
  ["What does “Bienvenue en Saskatchewan” say?", "Welcome to Saskatchewan", ["Goodbye from Saskatchewan", "Saskatchewan is big", "Thank you, Saskatchewan"], FRANSASKOIS_HINT, "🎉"],
  ["What is the Conseil des écoles fransaskoises?", "Saskatchewan's French first-language school division", ["A hockey team", "A kind of farm", "A grocery store"], "The Conseil des écoles fransaskoises (CEF) runs French first-language schools across the province.", "🏫"],
  ["In a Fransaskois school, most subjects are taught in…", "French", ["English only", "Spanish", "Latin"], "The CEF teaches in French. English language arts starts in Grade 4.", "🏫"],
  ["Gravelbourg is a Saskatchewan town known for its…", "French-speaking heritage", ["volcanoes", "ocean beaches", "tropical forests"], "Gravelbourg is one of several Saskatchewan communities with a long French-speaking history.", "⛪"],
  ["Michif combines Cree with which other language?", "French", ["Latin", "Spanish", "Greek"], "Michif is a Métis language that combines French and Cree.", "🗣️"],
  ["Michif is a language spoken by some…", "Métis people", ["visitors from Mars", "ocean animals", "farm machines"], "Michif is a Métis language that combines French and Cree.", "🗣️"],
  ["What is a “ceinture fléchée”?", "a colourful woven sash", ["a hockey stick", "a type of bread", "a snowshoe"], "The sash is a symbol of Métis identity and of French Canadian voyageurs.", "🧣"],
  ["How do you say fiddle in French?", "le violon", ["la flûte", "le tambour", "la guitare"], "Fiddle music and jigging are part of many Métis celebrations.", "🎻"],
  ["What does “la gigue” mean?", "the jig (a lively dance)", ["the river", "the wheat", "the winter"], "Jigging is a Métis dance.", "💃"],
  ["What does “le blé” mean?", "wheat", ["rice", "snow", "apple"], "Wheat is an important crop on the prairies.", "🌾"],
  ["What does “la ferme” mean?", "the farm", ["the school", "the store", "the lake"], "Many families in Saskatchewan live on farms.", "🚜"],
  ["What does “le ciel” mean?", "the sky", ["the ground", "the river", "the lake"], "Saskatchewan is nicknamed the Land of Living Skies.", "🌅"],
  ["What does “la rivière” mean?", "the river", ["the lake", "the forest", "the mountain"], "Saskatchewan comes from a Cree word that means swift-flowing river.", "🏞️"],
  ["What does “le lac” mean?", "the lake", ["the river", "the field", "the town"], "Saskatchewan has thousands of lakes.", "🏞️"],
  ["What does “la neige” mean?", "the snow", ["the rain", "the sun", "the wind"], "Winters in Saskatchewan are snowy.", "❄️"],
  ["How do you say “It is cold”?", "Il fait froid.", ["Il fait chaud.", "Il pleut.", "Il fait beau."], "Winter days in Saskatchewan are often cold.", "🥶"],
  ["How do you say winter in French?", "l'hiver", ["l'été", "l'automne", "le printemps"], "L'hiver is the cold season.", "⛄"],
  ["How do you say moose in French?", "un orignal", ["un loup", "un ours", "un lapin"], "Orignal is the French word for moose.", "🫎"],
  ["What does “le bison” mean?", "the bison (buffalo)", ["the moose", "the wolf", "the bear"], "The bison was important to many First Nations and Métis peoples on the prairies.", "🦬"],
  ["Which language is a First Nations language of Saskatchewan?", "Dene", ["Latin", "Greek", "Italian"], "Cree, Dene, Saulteaux, Nakota and Dakota are some of the First Nations languages spoken in Saskatchewan.", "🪶"],
  ["What does “Entrez, bienvenue” mean?", "Come in, welcome.", ["Go out, goodbye.", "Sit down, please.", "Thank you, friend."], FRANSASKOIS_HINT, "🚪"],
  ["How do you say “thank you very much”?", "Merci beaucoup.", ["Bonjour beaucoup.", "Au revoir beaucoup.", "S'il vous plaît beaucoup."], "Beaucoup means a lot.", "🙏"],
  ["The English word “prairie” came from French. What does it mean?", "a large area of grassland", ["a kind of fish", "a mountain peak", "a frozen lake"], "French la prairie gave English the word prairie.", "🌾"],
  ["What was a voyageur?", "a canoeist who carried furs and goods in the fur trade", ["a farmer on the prairies", "a hockey goalie", "a train driver"], "Voyageurs paddled canoes along rivers and lakes.", "🛶"],
  ["How do you say wheat field in French?", "un champ de blé", ["un lac de blé", "une école de blé", "un livre de blé"], "Un champ is a field.", "🌾"],
];

const PLACE_HINT = "Many place names in Saskatchewan come from French, Cree, Dene and other languages.";

const PLACE_NAMES: FrItem[] = [
  ["Île-à-la-Crosse is a Saskatchewan community. What does “île” mean?", "island", ["lake", "river", "mountain"], PLACE_HINT, "🏝️"],
  ["In a place name like “Lac Rouge”, what does “lac” mean?", "lake", ["river", "island", "valley"], PLACE_HINT, "🏞️"],
  ["In a place name like “Rivière Claire”, what does “rivière” mean?", "river", ["lake", "island", "mountain"], PLACE_HINT, "🌊"],
  ["In a place name like “Mont Bleu”, what does “mont” mean?", "mountain or hill", ["lake", "river", "field"], PLACE_HINT, "⛰️"],
  ["In a place name like “Belle Plaine”, what does “plaine” mean?", "plain", ["forest", "lake", "island"], "A plain is a large flat area of land.", "🌾"],
  ["In a place name like “Beau Pré”, what does “pré” mean?", "meadow", ["mountain", "river", "island"], "A meadow is a grassy field.", "🌿"],
  ["In a place name like “Pointe du Nord”, what does “pointe” mean?", "point (of land)", ["bridge", "road", "farm"], PLACE_HINT, "📍"],
  ["In a place name like “Vallée Verte”, what does “vallée” mean?", "valley", ["lake", "city", "island"], PLACE_HINT, "🏞️"],
  ["Many place names begin with “Saint” or “Sainte”. What do they honour?", "a saint", ["a river", "a farm animal", "a number"], "Saint is a title for a person remembered by a church.", "⛪"],
  ["Fort Qu'Appelle is a Saskatchewan town. What does “fort” mean?", "a fort (a fortified trading post)", ["a farm", "a lake", "a school"], "Forts were trading posts in the fur trade.", "🏰"],
  ["The Qu'Appelle Valley's name comes from the French “Qu'appelle?”. What does it mean?", "Who calls?", ["What time is it?", "Where is it?", "How are you?"], "A story tells of a voice that seemed to call across the valley.", "🗣️"],
  ["Which place name comes from Cree?", "Saskatoon", ["Gravelbourg", "Île-à-la-Crosse", "Saint-Louis"], "Saskatoon comes from the Cree name for the saskatoon berry, misâskwatômina.", "🫐"],
  ["Which place name comes from a French name?", "Gravelbourg", ["Saskatoon", "Wascana", "Saskatchewan"], "Gravelbourg has a French name and a long French-speaking history.", "⛪"],
  ["Which French word means river? (Saskatchewan comes from a Cree word for a swift-flowing river.)", "rivière", ["lac", "forêt", "montagne"], PLACE_HINT, "🌊"],
  ["What does “la fourrure” mean?", "fur", ["wheat", "snow", "bread"], "Fur was traded for goods in the fur trade.", "🧥"],
  ["What does “la traite des fourrures” mean?", "the fur trade", ["the wheat harvest", "the school year", "the train trip"], "The fur trade connected First Nations, Métis and French-speaking traders.", "🦫"],
  ["What does “le canot” mean?", "the canoe", ["the cart", "the horse", "the sled"], "Voyageurs travelled by canoe.", "🛶"],
  ["What does “la charrette” mean?", "the cart", ["the canoe", "the boat", "the train"], "Métis families used Red River carts to travel and to carry bison meat and robes.", "🛒"],
  ["What does “la chasse au bison” mean?", "the bison hunt", ["the wheat harvest", "the fur sale", "the fiddle dance"], "The bison hunt was a big part of Métis life on the prairies.", "🦬"],
  ["What does “la ceinture fléchée” mean?", "the arrow sash", ["the river cart", "the fur coat", "the bison hide"], "The ceinture fléchée is a woven sash with an arrow pattern.", "🧣"],
  ["The English word “portage” comes from French. What does it mean?", "carrying a canoe between two waters", ["a kind of soup", "a canoe paddle", "a bridge"], "Voyageurs carried their canoes and packs over land between lakes and rivers.", "🛶"],
  ["The English word “tuque” comes from French. What is it?", "a knitted winter hat", ["a canoe", "a sled", "a mitten"], "A tuque keeps your head warm in a prairie winter.", "🧢"],
  ["What was a voyageur?", "a canoeist who carried furs and goods in the fur trade", ["a farmer on the prairies", "a hockey goalie", "a train driver"], "Voyageurs paddled canoes along rivers and lakes.", "🛶"],
  ["Which French word means language? (Michif combines French and Cree.)", "la langue", ["le lac", "la lune", "la laine"], "La langue means language and also tongue.", "🗣️"],
  ["How do you say “my village” (the place you live)?", "mon village", ["ma village", "mes village", "le village mon"], "Village is a masculine word, so use mon.", "🏘️"],
  ["Which of these is a Saskatchewan place name from French?", "Île-à-la-Crosse", ["Saskatoon", "Wascana", "Saskatchewan"], "Île-à-la-Crosse is a historic fur trade community in northern Saskatchewan.", "🏝️"],
];

const CONTRIBUTION_HINT = "Francophone, Métis and First Nations people have shaped Canada in many ways.";

const CONTRIBUTIONS: FrItem[] = [
  ["Which French word means leader or chief? (Louis Riel was a Métis leader.)", "un chef", ["un livre", "un lac", "un chat"], "Un chef can be a leader.", "🧑"],
  ["Louis Riel helped bring which province into Canada in 1870?", "Manitoba", ["Alberta", "Nova Scotia", "Newfoundland"], "Riel led the Red River Resistance, and Manitoba became a province in 1870.", "🏛️"],
  ["Louis Riel spoke which language as his first language?", "French", ["Spanish", "Latin", "Inuktitut"], "Riel was born into a French-speaking Métis family at Red River.", "🗣️"],
  ["Gabriel Dumont was a Métis leader and bison hunter. Where did he help lead the Métis in 1885?", "Batoche", ["Halifax", "Vancouver", "Toronto"], "Batoche, in Saskatchewan, is a National Historic Site.", "🏞️"],
  ["Samuel de Champlain was a French explorer. He founded…", "Québec", ["Vancouver", "Winnipeg", "Calgary"], "Champlain founded Québec in 1608.", "🏰"],
  ["Jacques Cartier was a French explorer. He sailed up the…", "St. Lawrence River", ["Fraser River", "Peace River", "Saskatchewan River"], "Cartier explored the St. Lawrence in the 1530s.", "⛵"],
  ["What does “un explorateur” mean?", "an explorer", ["a singer", "a farmer", "a writer"], CONTRIBUTION_HINT, "🧭"],
  ["What does “un écrivain” mean?", "a writer", ["a singer", "a farmer", "a leader"], CONTRIBUTION_HINT, "✍️"],
  ["What does “une chanteuse” mean?", "a singer (a woman)", ["a writer", "a farmer", "a leader"], CONTRIBUTION_HINT, "🎤"],
  ["What does “un artiste” mean?", "an artist", ["a leader", "a farmer", "a teacher"], CONTRIBUTION_HINT, "🎨"],
  ["How do you say singer, for a woman? (Buffy Sainte-Marie is a Cree singer-songwriter born on a First Nation in Saskatchewan.)", "chanteuse", ["écrivaine", "cheffe", "exploratrice"], CONTRIBUTION_HINT, "🎤"],
  ["How do you say writer, for a woman? (Gabrielle Roy was a French-language writer from Manitoba.)", "écrivaine", ["chanteuse", "exploratrice", "agricultrice"], CONTRIBUTION_HINT, "✍️"],
  ["Céline Dion is a singer from Québec. She sings in…", "French and English", ["only Latin", "only Cree", "only German"], "Many Francophone artists sing in both French and English.", "🎤"],
  ["Canada's two official languages are…", "English and French", ["English and Cree", "French and Spanish", "English and Latin"], "The Official Languages Act of 1969 made English and French official languages of the federal government.", "🍁"],
  ["Radio-Canada is…", "Canada's French-language public broadcaster", ["a hockey team", "a grocery store", "a kind of train"], "Radio-Canada is the French-language service of the CBC.", "📻"],
  ["Which community has a long Métis history on the South Saskatchewan River?", "Batoche", ["Halifax", "Victoria", "St. John's"], "Batoche was a Métis community in the 1800s.", "🏞️"],
  ["What does “les Premières Nations” mean?", "the First Nations", ["the first trains", "the first farms", "the first schools"], CONTRIBUTION_HINT, "🪶"],
  ["What does “les Métis” refer to?", "a distinct Indigenous people with their own culture and history", ["visitors from Europe", "farm workers", "a kind of bread"], "Métis culture grew from the families of First Nations and European fur traders.", "🧣"],
  ["The Conseil des écoles fransaskoises serves…", "French-speaking families in Saskatchewan", ["farms in Alberta", "families in Nunavut", "visitors from other countries"], "The CEF is a French first-language school division.", "🏫"],
  ["Francophone communities live in…", "every province and territory", ["only Québec", "only Manitoba", "only the Maritimes"], "Francophone communities exist in all parts of Canada.", "🍁"],
  ["What does “les Acadiens” refer to?", "French-speaking people with roots in the Maritimes", ["people from Saskatchewan", "people from Nunavut", "visitors from France"], "Acadians are a Francophone people with a long history in the Maritime provinces.", "⚓"],
  ["How do you say writer, for a man? (Tomson Highway is a Cree writer and musician from northern Manitoba.)", "écrivain", ["chanteuse", "explorateur", "agriculteur"], CONTRIBUTION_HINT, "✍️"],
  ["What does “une organisation” refer to?", "a group of people working together", ["a lake", "a kind of food", "a farm animal"], "Many organizations help communities keep their language and culture strong.", "🤝"],
  ["How do you say “thank you for your contribution”?", "Merci de ta contribution.", ["Bonjour de ta contribution.", "Au revoir de ta contribution.", "Pardon ta contribution."], CONTRIBUTION_HINT, "🙏"],
  ["Which French word means history?", "l'histoire", ["la géographie", "la musique", "la cuisine"], "L'histoire can also mean story.", "📜"],
];

// ---------- Immersion: Saskatchewan culture (5.VC.3, 8.VC.3) ----------

const IMM5_HINT = "Hint: these are cultures of Saskatchewan and Canada: French Canadian, Métis and First Nations.";

const IMM5: FrItem[] = [
  ["Que veut dire le mot « fransaskois »?", "Francophone de la Saskatchewan", ["habitant du Québec", "un champ de blé", "une rivière du nord"], "Fransaskois means a French speaker of Saskatchewan.", "🌾"],
  ["Qu'est-ce que le michif?", "une langue des Métis", ["un sport d'hiver", "une danse", "un plat"], "Michif is a Métis language that combines French and Cree.", "🗣️"],
  ["Quelle langue autochtone se mêle au français dans le michif?", "le cri", ["le latin", "le grec", "l'espagnol"], "Michif combines French and Cree.", "🗣️"],
  ["Qu'est-ce qu'une ceinture fléchée?", "une ceinture tissée de couleurs vives", ["un manteau", "un bâton de hockey", "un bateau"], "The sash is a symbol of Métis identity.", "🧣"],
  ["Quel instrument est très important dans la musique métisse?", "le violon", ["le piano", "la harpe", "la trompette"], "Fiddle music and jigging are part of many Métis celebrations.", "🎻"],
  ["Qui était Louis Riel?", "un chef métis", ["un joueur de hockey", "un fermier de l'Ontario", "un roi de France"], "Louis Riel was a Métis leader.", "🧑"],
  ["Qui était Gabriel Dumont?", "un chef métis et un chasseur de bisons", ["un explorateur français du 16e siècle", "un chanteur d'opéra", "un premier ministre"], "Gabriel Dumont led the Métis buffalo hunt and was a leader at Batoche.", "🧑"],
  ["Où se trouve le lieu historique de Batoche?", "en Saskatchewan", ["en Colombie-Britannique", "au Nunavut", "à Terre-Neuve"], "Batoche is a National Historic Site in Saskatchewan.", "🏞️"],
  ["Quand la Saskatchewan est-elle devenue une province du Canada?", "en 1905", ["en 1867", "en 1945", "en 1999"], "Saskatchewan and Alberta both became provinces in 1905.", "📅"],
  ["Que veut dire « Saskatchewan » en cri?", "rivière au courant rapide", ["champ de blé", "ciel immense", "grand lac"], "The Cree name is kisiskâciwanisîpiy.", "🌊"],
  ["Qu'est-ce qu'un voyageur dans l'histoire de la traite des fourrures?", "un canotier qui transportait des marchandises", ["un fermier de la prairie", "un gardien de but", "un conducteur de train"], "Voyageurs paddled canoes along rivers and lakes.", "🛶"],
  ["Que veut dire « la traite des fourrures »?", "l'échange de fourrures contre des marchandises", ["la récolte du blé", "la construction d'un pont", "la fête de l'école"], "The fur trade connected First Nations, Métis and French-speaking traders.", "🦫"],
  ["Quel animal était très important pour les Métis et les Premières Nations des Prairies?", "le bison", ["le crocodile", "le pingouin", "le chameau"], "The bison gave food, clothing and shelter.", "🦬"],
  ["Qu'est-ce qu'une charrette de la rivière Rouge?", "un véhicule à deux roues utilisé par les Métis", ["un bateau à voile", "un traîneau à chiens", "un train"], "Métis families used Red River carts to travel and to carry bison meat and robes.", "🛒"],
  ["Qu'est-ce que la gigue?", "une danse rapide", ["un plat d'hiver", "un bateau", "une langue"], "Jigging is a Métis dance.", "💃"],
  ["Le traité 6 a été signé en 1876. Qui l'a signé?", "des Premières Nations et la Couronne", ["des agriculteurs seulement", "des joueurs de hockey", "des explorateurs français"], "Treaty 6 covers much of central Saskatchewan and Alberta.", "📜"],
  ["Dans quelle province se trouve Gravelbourg, une ville au riche patrimoine francophone?", "en Saskatchewan", ["au Nouveau-Brunswick", "en Colombie-Britannique", "à l'Île-du-Prince-Édouard"], "Gravelbourg is a town with a long French-speaking history.", "⛪"],
  ["Qu'est-ce que le Conseil des écoles fransaskoises?", "le conseil scolaire francophone de la Saskatchewan", ["un club de hockey", "un marché de fermiers", "une bibliothèque"], "The CEF runs French first-language schools in Saskatchewan.", "🏫"],
  ["Quelle saison est très froide et enneigée en Saskatchewan?", "l'hiver", ["l'été", "le printemps", "l'automne"], "Winters on the prairies are cold and snowy.", "❄️"],
  ["Qu'est-ce que la culture d'un groupe?", "ses façons de vivre, ses traditions et ses arts", ["son âge moyen", "sa couleur préférée", "son nombre d'habitants"], IMM5_HINT, "🎭"],
  ["Quel peuple vit au Canada depuis des milliers d'années?", "les Premières Nations", ["les voyageurs du 17e siècle", "les premiers touristes", "les astronautes"], "First Nations peoples have lived here for thousands of years.", "🪶"],
  ["Qu'est-ce qu'une légende?", "une histoire transmise de génération en génération", ["une recette", "un horaire", "une carte"], "Legends and stories are passed down in many cultures.", "📖"],
  ["Qui parle français au Canada?", "des gens dans toutes les provinces et tous les territoires", ["seulement les gens du Québec", "seulement les gens du Manitoba", "personne"], "Francophone communities live across Canada.", "🍁"],
  ["Quelle est la capitale de la Saskatchewan?", "Regina", ["Saskatoon", "Moose Jaw", "Prince Albert"], "The provincial government meets in Regina.", "🏛️"],
  ["Dans quelle langue dit-on « Bienvenue » pour accueillir quelqu'un?", "en français", ["en latin", "en grec", "en russe"], "Bienvenue means welcome.", "🎉"],
];

const IMM8_HINT = "Hint: Canada's cultures include French-speaking, Métis and First Nations communities, among many others.";

const IMM8: FrItem[] = [
  ["Quel quartier de Winnipeg est un centre de la communauté francophone du Manitoba?", "Saint-Boniface", ["Gastown", "Le Plateau", "Kensington"], "Saint-Boniface is a French-speaking neighbourhood of Winnipeg.", "🏘️"],
  ["Quelle communauté francophone a des racines dans les provinces maritimes?", "les Acadiens", ["les Fransaskois", "les Inuits", "les Doukhobors"], "Acadians are a Francophone people with a long history in the Maritimes.", "⚓"],
  ["Comment appelle-t-on les francophones de la Saskatchewan?", "les Fransaskois", ["les Acadiens", "les Québécois", "les Franco-Ontariens"], "Fransaskois is made from français and Saskatchewan.", "🌾"],
  ["Comment appelle-t-on les francophones de l'Ontario?", "les Franco-Ontariens", ["les Fransaskois", "les Acadiens", "les Franco-Manitobains"], IMM8_HINT, "🍁"],
  ["Comment appelle-t-on les francophones du Manitoba?", "les Franco-Manitobains", ["les Franco-Albertains", "les Fransaskois", "les Acadiens"], IMM8_HINT, "🍁"],
  ["Quel peuple autochtone vit surtout dans le Nord, comme au Nunavut?", "les Inuits", ["les Acadiens", "les Doukhobors", "les voyageurs"], "Inuit live in Inuit Nunangat, the Arctic homeland.", "❄️"],
  ["Qui sont les Métis?", "un peuple autochtone avec sa propre culture et son histoire", ["des visiteurs d'Europe", "des travailleurs agricoles", "des astronautes"], "Métis culture grew from the families of First Nations and European fur traders.", "🧣"],
  ["Quelle langue des Métis combine le français et le cri?", "le michif", ["le latin", "l'anglais", "l'inuktitut"], "Michif is a Métis language.", "🗣️"],
  ["Quelles sont les deux langues officielles du Canada?", "l'anglais et le français", ["l'anglais et le cri", "le français et l'espagnol", "l'anglais et le latin"], "English and French are official languages of the federal government.", "🍁"],
  ["Que veut dire « diversité culturelle »?", "la présence de plusieurs cultures", ["une seule culture", "un type de fruit", "un sport d'hiver"], IMM8_HINT, "🌍"],
  ["Que veut dire « Premières Nations »?", "des peuples autochtones du Canada, distincts des Inuits et des Métis", ["les premiers fermiers de la Saskatchewan", "les premiers maires", "les premiers voyageurs"], "First Nations, Inuit and Métis are the three recognized Indigenous peoples in Canada.", "🪶"],
  ["Nomme une langue des Premières Nations de la Saskatchewan.", "le cri", ["le latin", "le grec", "l'italien"], "Cree, Dene, Saulteaux, Nakota and Dakota are some of the First Nations languages spoken in Saskatchewan.", "🪶"],
  ["Qui a aidé à faire entrer le Manitoba dans la Confédération en 1870?", "Louis Riel", ["Samuel de Champlain", "Jacques Cartier", "Tommy Douglas"], "Riel led the Red River Resistance, and Manitoba became a province in 1870.", "🏛️"],
  ["Qui a fondé Québec en 1608?", "Samuel de Champlain", ["Louis Riel", "Gabriel Dumont", "Jacques Cartier"], "Champlain founded Québec in 1608.", "🏰"],
  ["Quelle organisation offre des émissions publiques en français au Canada?", "Radio-Canada", ["Hockey Canada", "la Banque du Canada", "Parcs Canada"], "Radio-Canada is the French-language service of the CBC.", "📻"],
  ["Qu'est-ce que le Conseil des écoles fransaskoises?", "le conseil scolaire francophone de la Saskatchewan", ["une équipe de hockey", "un marché de fermiers", "une bibliothèque"], "It runs French first-language schools in Saskatchewan.", "🏫"],
  ["Pourquoi est-il important de protéger les langues et les cultures?", "elles font partie de l'identité des gens", ["elles sont toujours faciles à apprendre", "elles coûtent peu", "elles ne changent jamais"], IMM8_HINT, "🌱"],
  ["Qu'est-ce qu'un récit traditionnel?", "une histoire transmise de génération en génération", ["une recette moderne", "un horaire de classe", "une carte routière"], "Many cultures pass down stories by telling them.", "📖"],
  ["Nomme une communauté francophone de la Saskatchewan.", "Gravelbourg", ["Halifax", "Whitehorse", "Charlottetown"], "Gravelbourg is a Saskatchewan town with a long French-speaking history.", "⛪"],
  ["Quel instrument fait partie de la musique métisse traditionnelle?", "le violon", ["le saxophone", "la cornemuse", "le piano à queue"], "Fiddle music and jigging are part of many Métis celebrations.", "🎻"],
  ["Que veut dire « le patrimoine »?", "ce que les gens reçoivent du passé et veulent garder", ["l'argent d'une banque", "une marque de voiture", "un type de saison"], "Heritage can be language, stories, music, buildings and traditions.", "🏛️"],
  ["Où parle-t-on français au Canada?", "dans toutes les régions du pays", ["seulement au Québec", "seulement dans les Maritimes", "nulle part"], "French is spoken across Canada, with many local expressions.", "🍁"],
  ["Qu'est-ce qu'un orignal?", "un grand animal du Canada", ["un instrument", "un fruit", "une ville"], "Orignal is the French word for moose.", "🫎"],
  ["Parmi ces peuples, lequel n'est pas un peuple autochtone du Canada?", "les Acadiens", ["les Inuits", "les Métis", "les Premières Nations"], "Acadians are a Francophone people, not an Indigenous people.", "🌍"],
  ["Que fait une personne qui fait preuve d'ouverture à la diversité?", "elle accueille et respecte les autres cultures", ["elle évite les autres", "elle se moque des autres", "elle refuse d'écouter"], IMM8_HINT, "🤝"],
];

// ---------- More Level 1 to 3 themes ----------

/** Picture items whose wrong answers are other words from the same list (no synonyms in a list). */
function pictureItems(pairs: [emoji: string, word: string][], prompt: string, hint: string): FrItem[] {
  return pairs.map(([emoji, word], i) => [prompt, word, [1, 3, 5].map((k) => pairs[(i + k) % pairs.length][1]), hint, emoji]);
}

/** "What does … mean?" items from [French, English] pairs; wrong answers are other English meanings. */
function meaningItems(pairs: [fr: string, en: string, emoji: string][], hint: string): FrItem[] {
  return pairs.map(([fr, en, emoji], i) => [`What does “${fr}” mean?`, en, [2, 4, 6].map((k) => pairs[(i + k) % pairs.length][1]), hint, emoji]);
}

const COLOUR_HINT = "Say the colour word out loud in French as you look at the picture.";

const COLOUR_DOTS: [string, string][] = [
  ["🔴", "rouge"], ["🔵", "bleu"], ["🟡", "jaune"], ["🟢", "vert"], ["🟠", "orange"], ["🟣", "violet"], ["⚫", "noir"], ["⚪", "blanc"], ["🟤", "brun"],
];

const COLOURS: FrItem[] = [
  ...pictureItems(COLOUR_DOTS, "Which French word goes with the colour?", COLOUR_HINT),
  ...meaningItems([
    ["rouge", "red", "🔴"], ["bleu", "blue", "🔵"], ["jaune", "yellow", "🟡"], ["vert", "green", "🟢"], ["orange", "orange", "🟠"],
    ["violet", "purple", "🟣"], ["noir", "black", "⚫"], ["blanc", "white", "⚪"], ["brun", "brown", "🟤"], ["rose", "pink", "🎨"], ["gris", "grey", "🎨"],
  ], "Colour words are some of the first French words you learn."),
  ["How do you say red?", "rouge", ["bleu", "vert", "jaune"], COLOUR_HINT, "🍓"],
  ["How do you say blue?", "bleu", ["rouge", "noir", "jaune"], COLOUR_HINT, "💧"],
  ["How do you say yellow?", "jaune", ["vert", "rouge", "blanc"], COLOUR_HINT, "🍌"],
  ["How do you say green?", "vert", ["bleu", "jaune", "rouge"], COLOUR_HINT, "🐸"],
  ["How do you say black?", "noir", ["blanc", "rouge", "vert"], COLOUR_HINT, "🎩"],
  ["How do you say white?", "blanc", ["noir", "bleu", "jaune"], COLOUR_HINT, "❄️"],
  ["How do you say pink?", "rose", ["rouge", "violet", "gris"], COLOUR_HINT, "🎀"],
  ["How do you say grey?", "gris", ["blanc", "bleu", "brun"], COLOUR_HINT, "🐘"],
  ["How do you say purple?", "violet", ["rose", "bleu", "vert"], COLOUR_HINT, "🍇"],
  ["How do you say brown?", "brun", ["noir", "orange", "gris"], COLOUR_HINT, "🐻"],
  ["Which French word is the colour of the banana?", "jaune", ["bleu", "noir", "violet"], COLOUR_HINT, "🍌"],
  ["Which French word is the colour of the snow?", "blanc", ["noir", "rouge", "vert"], COLOUR_HINT, "⛄"],
  ["Which French word is the colour of the frog?", "vert", ["rouge", "blanc", "violet"], COLOUR_HINT, "🐸"],
  ["Which French word is the colour of the strawberry?", "rouge", ["bleu", "vert", "noir"], COLOUR_HINT, "🍓"],
  ["Which French word is the colour of the grapes?", "violet", ["jaune", "blanc", "orange"], COLOUR_HINT, "🍇"],
  ["Which French word is the colour of the carrot?", "orange", ["bleu", "noir", "vert"], COLOUR_HINT, "🥕"],
  ["What does “Ma couleur préférée est le bleu” mean?", "My favourite colour is blue.", ["My favourite colour is red.", "I don't like blue.", "My shirt is blue."], "Préférée means favourite.", "💙"],
  ["What does “C'est rouge” mean?", "It is red.", ["It is blue.", "I like red.", "It is big."], "C'est means it is.", "🍎"],
];

const ANIMAL_HINT = "Look at the animal and say its French name out loud.";

const ANIMAL_PICS: [string, string][] = [
  ["🐱", "le chat"], ["🐶", "le chien"], ["🐟", "le poisson"], ["🐦", "l'oiseau"], ["🐰", "le lapin"], ["🐴", "le cheval"],
  ["🐄", "la vache"], ["🐷", "le cochon"], ["🐑", "le mouton"], ["🐔", "la poule"], ["🦆", "le canard"], ["🐻", "l'ours"],
  ["🦊", "le renard"], ["🐭", "la souris"], ["🐸", "la grenouille"], ["🦬", "le bison"], ["🐢", "la tortue"], ["🦋", "le papillon"],
];

const ANIMALS: FrItem[] = [
  ...pictureItems(ANIMAL_PICS, "Which French word goes with the picture?", ANIMAL_HINT),
  ...meaningItems([
    ["le chat", "the cat", "🐱"], ["le chien", "the dog", "🐶"], ["le poisson", "the fish", "🐟"], ["l'oiseau", "the bird", "🐦"],
    ["le lapin", "the rabbit", "🐰"], ["le cheval", "the horse", "🐴"], ["la vache", "the cow", "🐄"], ["le cochon", "the pig", "🐷"],
    ["le renard", "the fox", "🦊"], ["la souris", "the mouse", "🐭"], ["la grenouille", "the frog", "🐸"], ["la tortue", "the turtle", "🐢"],
  ], ANIMAL_HINT),
  ["Which French word names the animal that says “meuh”?", "la vache", ["le chat", "le canard", "le chien"], "In French, a cow says meuh.", "🐄"],
  ["Which French word names the animal that says “miaou”?", "le chat", ["la vache", "le chien", "le mouton"], "In French, a cat says miaou.", "🐱"],
  ["Which French word names the animal that says “ouaf ouaf”?", "le chien", ["le chat", "la poule", "le cochon"], "In French, a dog says ouaf ouaf.", "🐶"],
  ["Which French word names the animal that says “coin-coin”?", "le canard", ["la vache", "le cheval", "le chat"], "In French, a duck says coin-coin.", "🦆"],
  ["Which French word names the animal that says “bêê”?", "le mouton", ["le chien", "le canard", "la souris"], "In French, a sheep says bêê.", "🐑"],
  ["What does “J'ai un chien” mean?", "I have a dog.", ["I am a dog.", "I see a cat.", "I like dogs."], "J'ai means I have.", "🐶"],
  ["What does “J'aime les chats” mean?", "I like cats.", ["I have a cat.", "I see a dog.", "I am a cat."], "J'aime means I like or I love.", "🐱"],
];

// Level 2 (Grade 2)

const FOOD_HINT = "Say the food word out loud in French as you look at the picture.";

const FOOD_PICS: [string, string][] = [
  ["🍎", "une pomme"], ["🍌", "une banane"], ["🍞", "du pain"], ["🧀", "du fromage"], ["🥛", "du lait"], ["🥕", "une carotte"],
  ["🍓", "une fraise"], ["🍇", "des raisins"], ["🍗", "du poulet"], ["🍰", "du gâteau"], ["🥚", "un œuf"], ["🌽", "du maïs"],
  ["🍅", "une tomate"], ["🍲", "de la soupe"], ["🥔", "une pomme de terre"], ["🍪", "un biscuit"],
];

const FOOD: FrItem[] = [
  ...pictureItems(FOOD_PICS, "Which French word goes with the picture?", FOOD_HINT),
  ...meaningItems([
    ["une pomme", "an apple", "🍎"], ["du pain", "some bread", "🍞"], ["du fromage", "some cheese", "🧀"], ["du lait", "some milk", "🥛"],
    ["de l'eau", "some water", "💧"], ["une fraise", "a strawberry", "🍓"], ["un œuf", "an egg", "🥚"], ["du jus", "some juice", "🧃"],
  ], FOOD_HINT),
  ["What does “J'aime les pommes” mean?", "I like apples.", ["I don't like apples.", "I have an apple.", "I want a banana."], "J'aime means I like.", "🍎"],
  ["What does “Je n'aime pas le lait” mean?", "I don't like milk.", ["I like milk.", "I have milk.", "I want more milk."], "Ne… pas makes a sentence negative.", "🥛"],
  ["What does “J'ai faim” mean?", "I am hungry.", ["I am thirsty.", "I am tired.", "I am cold."], "In French you say I have hunger: j'ai faim.", "😋"],
  ["What does “J'ai soif” mean?", "I am thirsty.", ["I am hungry.", "I am happy.", "I am hot."], "In French you say I have thirst: j'ai soif.", "🥤"],
  ["What does “Bon appétit!” mean?", "Enjoy your meal!", ["Good night!", "Thank you!", "Hurry up!"], "People say bon appétit before they eat.", "🍽️"],
  ["What does “C'est délicieux!” mean?", "It's delicious!", ["It's hot!", "It's too big!", "It's mine!"], "Délicieux sounds like delicious.", "😋"],
  ["How do you say “I like cheese”?", "J'aime le fromage.", ["Je n'aime pas le fromage.", "J'ai le fromage.", "Je suis le fromage."], "Start with J'aime.", "🧀"],
  ["How do you say “I don't like carrots”?", "Je n'aime pas les carottes.", ["J'aime les carottes.", "J'ai des carottes.", "Je mange des carottes."], "Put ne before aime and pas after it.", "🥕"],
  ["How do you ask for water politely?", "De l'eau, s'il vous plaît.", ["Au revoir, de l'eau.", "Je n'aime pas l'eau.", "C'est de l'eau."], "S'il vous plaît means please.", "💧"],
  ["Which answer fits “Tu aimes la pizza?”", "Oui, j'aime la pizza.", ["J'ai sept ans.", "Il fait froid.", "C'est mardi."], "The question asks if you like pizza.", "🍕"],
];

const WEATHER_HINT = "Il fait… and il… describe the weather. Look at the picture.";

const WEATHER: FrItem[] = [
  ["Which sentence says the weather in the picture?", "Il pleut.", ["Il neige.", "Il fait soleil.", "Il fait du vent."], WEATHER_HINT, "🌧️"],
  ["Which sentence says the weather in the picture?", "Il neige.", ["Il pleut.", "Il fait chaud.", "Il fait soleil."], WEATHER_HINT, "🌨️"],
  ["Which sentence says the weather in the picture?", "Il fait soleil.", ["Il neige.", "Il pleut.", "Il fait du vent."], WEATHER_HINT, "☀️"],
  ["Which sentence says the weather in the picture?", "Il fait du vent.", ["Il fait soleil.", "Il neige.", "Il fait chaud."], WEATHER_HINT, "🌬️"],
  ["Which sentence says the weather in the picture?", "Il fait froid.", ["Il fait chaud.", "Il pleut.", "Il fait soleil."], WEATHER_HINT, "🥶"],
  ["Which sentence says the weather in the picture?", "Il fait chaud.", ["Il fait froid.", "Il neige.", "Il fait du vent."], WEATHER_HINT, "🥵"],
  ["Which sentence says the weather in the picture?", "Il y a un orage.", ["Il fait soleil.", "Il neige.", "Il fait chaud."], WEATHER_HINT, "⛈️"],
  ["Which sentence says the weather in the picture?", "C'est nuageux.", ["Il fait soleil.", "Il neige.", "Il fait chaud."], WEATHER_HINT, "☁️"],
  ["What does “Il pleut” mean?", "It is raining.", ["It is snowing.", "It is sunny.", "It is windy."], WEATHER_HINT, "🌧️"],
  ["What does “Il neige” mean?", "It is snowing.", ["It is raining.", "It is hot.", "It is sunny."], WEATHER_HINT, "🌨️"],
  ["What does “Il fait froid” mean?", "It is cold.", ["It is hot.", "It is raining.", "It is windy."], WEATHER_HINT, "🥶"],
  ["What does “Il fait chaud” mean?", "It is hot.", ["It is cold.", "It is snowing.", "It is cloudy."], WEATHER_HINT, "🥵"],
  ["What does “Il fait du vent” mean?", "It is windy.", ["It is sunny.", "It is snowing.", "It is cold."], WEATHER_HINT, "🌬️"],
  ["What does “Quel temps fait-il?” ask?", "What is the weather like?", ["What time is it?", "What day is it?", "How old are you?"], "Le temps can mean the weather.", "🌦️"],
  ["Which French word goes with the picture?", "l'hiver", ["l'été", "le printemps", "l'automne"], "The four seasons: l'hiver, le printemps, l'été, l'automne.", "⛄"],
  ["Which French word goes with the picture?", "le printemps", ["l'hiver", "l'été", "l'automne"], "The four seasons: l'hiver, le printemps, l'été, l'automne.", "🌷"],
  ["Which French word goes with the picture?", "l'été", ["l'hiver", "le printemps", "l'automne"], "The four seasons: l'hiver, le printemps, l'été, l'automne.", "🏖️"],
  ["Which French word goes with the picture?", "l'automne", ["l'été", "le printemps", "l'hiver"], "The four seasons: l'hiver, le printemps, l'été, l'automne.", "🍂"],
  ["What does “l'hiver” mean?", "winter", ["summer", "spring", "fall"], "In l'hiver it is cold and snowy on the prairies.", "⛄"],
  ["What does “l'été” mean?", "summer", ["winter", "fall", "spring"], "L'été is the hottest season.", "🏖️"],
  ["What does “le printemps” mean?", "spring", ["summer", "winter", "fall"], "In le printemps, the snow melts and plants start to grow.", "🌷"],
  ["What does “l'automne” mean?", "fall", ["spring", "summer", "winter"], "In l'automne, leaves change colour.", "🍂"],
  ["What does “une tuque” mean?", "a warm winter hat", ["a raincoat", "a pair of boots", "a scarf"], "In Canada, a warm knitted winter hat is une tuque.", "❄️"],
  ["What does “des mitaines” mean?", "mittens", ["boots", "a coat", "an umbrella"], "Mitaines keep your hands warm in winter.", "❄️"],
  ["Which French word goes with the picture?", "un manteau", ["une tuque", "des bottes", "un parapluie"], "Un manteau keeps you warm outside.", "🧥"],
  ["Which French word goes with the picture?", "des bottes", ["un manteau", "des mitaines", "une tuque"], "Bottes keep your feet dry and warm.", "🥾"],
  ["Which French word goes with the picture?", "un parapluie", ["un manteau", "des bottes", "un foulard"], "Use un parapluie when il pleut.", "☂️"],
  ["Which French word goes with the picture?", "un foulard", ["un parapluie", "des bottes", "un manteau"], "Un foulard is a scarf for your neck.", "🧣"],
  ["Which French word names something to wear when “il neige”?", "une tuque", ["un maillot de bain", "des sandales", "un short"], "When it snows, keep your head warm.", "❄️"],
  ["Which French word names something to take outside when “il pleut”?", "un parapluie", ["des lunettes de soleil", "un maillot de bain", "une luge"], "A parapluie keeps the rain off.", "🌧️"],
];

// Level 3 (Grade 3)

const COMMAND3_HINT = "Your teacher uses short commands. Find the verb at the start.";

const COMMANDS: FrItem[] = [
  ["What does “Prenez un crayon” mean?", "Take a pencil.", ["Close your book.", "Sit down.", "Put away your pencil."], COMMAND3_HINT, "✏️"],
  ["What does “Écrivez votre nom” mean?", "Write your name.", ["Say your name.", "Read your name.", "Draw your name."], COMMAND3_HINT, "📝"],
  ["What does “Lisez la phrase” mean?", "Read the sentence.", ["Write the sentence.", "Draw the sentence.", "Cut the sentence."], COMMAND3_HINT, "📖"],
  ["What does “Dessinez un chat” mean?", "Draw a cat.", ["Colour a cat.", "Cut out a cat.", "Find a cat."], COMMAND3_HINT, "🎨"],
  ["What does “Coloriez l'image” mean?", "Colour the picture.", ["Cut the picture.", "Glue the picture.", "Draw a picture."], COMMAND3_HINT, "🖍️"],
  ["What does “Découpez le cercle” mean?", "Cut out the circle.", ["Colour the circle.", "Glue the circle.", "Draw a circle."], COMMAND3_HINT, "✂️"],
  ["What does “Collez la feuille” mean?", "Glue the sheet.", ["Cut the sheet.", "Read the sheet.", "Fold the sheet."], COMMAND3_HINT, "📄"],
  ["What does “Rangez vos affaires” mean?", "Put your things away.", ["Take out your things.", "Find your things.", "Share your things."], COMMAND3_HINT, "🎒"],
  ["What does “Tournez la page” mean?", "Turn the page.", ["Read the page.", "Tear the page.", "Close the page."], COMMAND3_HINT, "📖"],
  ["What does “Travaillez avec un partenaire” mean?", "Work with a partner.", ["Work alone.", "Talk to the teacher.", "Play with a friend."], COMMAND3_HINT, "👫"],
  ["What does “Formez un cercle” mean?", "Make a circle.", ["Draw a circle.", "Make a line.", "Sit in a row."], COMMAND3_HINT, "⭕"],
  ["What does “Comptez jusqu'à dix” mean?", "Count to ten.", ["Write ten words.", "Wait ten minutes.", "Read ten pages."], COMMAND3_HINT, "🔟"],
  ["What does “Montrez-moi” mean?", "Show me.", ["Tell me.", "Give me.", "Help me."], COMMAND3_HINT, "👀"],
  ["What does “Attendez votre tour” mean?", "Wait your turn.", ["Take your turn.", "Turn around.", "Go first."], COMMAND3_HINT, "⏳"],
  ["What does “Chuchotez” mean?", "Whisper.", ["Shout.", "Sing.", "Laugh."], COMMAND3_HINT, "🤫"],
  ["What does “Mettez votre manteau” mean?", "Put on your coat.", ["Take off your coat.", "Hang up your coat.", "Find your coat."], COMMAND3_HINT, "🧥"],
  ["What does “Bravo!” mean?", "Well done!", ["Be quiet!", "Hurry up!", "Try again!"], "Bravo and Super! are accolades: words of praise.", "👏"],
  ["What does “Excellent travail!” mean?", "Excellent work!", ["Too much work!", "Start working!", "Work quietly!"], "Teachers say this when you do great work.", "⭐"],
  ["What does “Essaie encore!” mean?", "Try again!", ["Well done!", "Stop!", "Sit down!"], "Encore means again.", "🔁"],
  ["What does “Je ne comprends pas” mean?", "I don't understand.", ["I don't know you.", "I am not here.", "I don't like it."], "Comprendre means to understand.", "🤔"],
  ["What does “Pouvez-vous répéter, s'il vous plaît?” mean?", "Can you repeat, please?", ["Can you sit down, please?", "Can you help me, please?", "Can you open the door, please?"], "Répéter means to repeat.", "🔁"],
  ["What does “Est-ce que je peux aller aux toilettes?” ask?", "May I go to the washroom?", ["May I go outside?", "May I get a drink?", "May I go home?"], "Toilettes means washroom.", "🚻"],
  ["What does “Excusez-moi” mean?", "Excuse me.", ["Thank you.", "Good morning.", "See you soon."], "Use it to get someone's attention politely.", "🙋"],
  ["How do you say “I don't understand”?", "Je ne comprends pas.", ["Je comprends.", "Je ne sais pas.", "Je suis là."], "Ne… pas goes around the verb.", "🤔"],
  ["How do you ask “May I have a pencil, please?”", "Est-ce que je peux avoir un crayon, s'il vous plaît?", ["Prenez un crayon.", "Voici un crayon.", "Je n'ai pas de crayon."], "Est-ce que je peux… asks may I.", "✏️"],
  ["How do you say “Thank you very much”?", "Merci beaucoup.", ["De rien.", "S'il vous plaît.", "Excusez-moi."], "Beaucoup means very much.", "🙏"],
  ["How do you say “close the door”?", "Fermez la porte.", ["Ouvrez la porte.", "Regardez la porte.", "Dessinez la porte."], "Fermer means to close; ouvrir means to open.", "🚪"],
  ["How do you say “open the window”?", "Ouvrez la fenêtre.", ["Fermez la fenêtre.", "Regardez la fenêtre.", "Lavez la fenêtre."], "Ouvrir means to open.", "🪟"],
  ["How do you say “write the date”?", "Écrivez la date.", ["Lisez la date.", "Dessinez la date.", "Dites la date."], "Écrire means to write.", "📅"],
  ["How do you say “listen to the song”?", "Écoutez la chanson.", ["Chantez la chanson.", "Lisez la chanson.", "Écrivez la chanson."], "Écouter means to listen.", "🎵"],
  ["How do you say “sing with the class”?", "Chantez avec la classe.", ["Dansez avec la classe.", "Lisez avec la classe.", "Venez avec la classe."], "Chanter means to sing.", "🎤"],
];

const CAL_HINT = "The days of the week in French: lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche.";
const MONTH_HINT = "The months in French: janvier, février, mars, avril, mai, juin, juillet, août, septembre, octobre, novembre, décembre.";
const DAYS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
const DAYS_EN = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const CALENDAR: FrItem[] = [
  ...DAYS.map((d, i): FrItem => [`How do you say ${DAYS_EN[i]}?`, d, [1, 2, 4].map((k) => DAYS[(i + k) % 7]), CAL_HINT, "📅"]),
  ...DAYS.map((d, i): FrItem => [`Which French word is the day after “${d}”?`, DAYS[(i + 1) % 7], [DAYS[(i + 2) % 7], DAYS[(i + 6) % 7], DAYS[(i + 4) % 7]], CAL_HINT, "➡️"]),
  ...MONTHS.map((m, i): FrItem => [`How do you say ${MONTHS_EN[i]}?`, m, [1, 4, 8].map((k) => MONTHS[(i + k) % 12]), MONTH_HINT, "🗓️"]),
  ...MONTHS.map((m, i): FrItem => [`Which French word is the month after “${m}”?`, MONTHS[(i + 1) % 12], [MONTHS[(i + 2) % 12], MONTHS[(i + 11) % 12], MONTHS[(i + 6) % 12]], MONTH_HINT, "➡️"]),
  ["Which French word names the month of Canada Day (July 1)?", "juillet", ["juin", "août", "mai"], MONTH_HINT, "🍁"],
  ["Which French word names the month of Halloween?", "octobre", ["novembre", "septembre", "décembre"], MONTH_HINT, "🎃"],
  ["Which French word names the month of New Year's Day?", "janvier", ["février", "décembre", "mars"], MONTH_HINT, "🎉"],
  ["What does “aujourd'hui” mean?", "today", ["tomorrow", "yesterday", "next week"], "Aujourd'hui is today, hier is yesterday, demain is tomorrow.", "📅"],
  ["What does “hier” mean?", "yesterday", ["today", "tomorrow", "next year"], "Aujourd'hui is today, hier is yesterday, demain is tomorrow.", "⬅️"],
  ["What does “la fin de semaine” mean?", "the weekend", ["the end of the year", "the month", "the morning"], "In Canada, the weekend is often called la fin de semaine.", "🛌"],
  ["What does “Quelle est la date aujourd'hui?” ask?", "What is the date today?", ["What time is it?", "What day was yesterday?", "How old are you?"], "La date means the date.", "🗓️"],
  ["What does “Mon anniversaire est le 12 mai” mean?", "My birthday is May 12.", ["My birthday is March 12.", "I am 12 years old.", "Today is May 12."], "Anniversaire means birthday.", "🎂"],
  ["What does “C'est le premier septembre” mean?", "It is September 1.", ["It is September 7.", "It is the first week.", "It is November 1."], "In French dates, the first day of the month is le premier.", "🗓️"],
  ["What does “Aujourd'hui, c'est lundi” mean?", "Today is Monday.", ["Tomorrow is Monday.", "Yesterday was Monday.", "Today is Sunday."], CAL_HINT, "📅"],
];

// ---------- The units ----------

export const cf1: Unit[] = [
  core({ id: "sk-cf1-bonjour", title: "Hello and my name", emoji: "👋", blurb: "Greetings, polite words and who you are", parentNote: "Level 1 Core French starts with key words and phrases: bonjour, merci, au revoir, je m'appelle… and how old you are.", standards: ["1.CS.1, 1.CS.2, 1.GL.2", "understanding key words and phrases, and giving basic personal information orally"], items: HELLO }),
  core({ id: "sk-cf1-classe", title: "In the classroom", emoji: "🏫", blurb: "Classroom words and your teacher's commands", parentNote: "Names of classroom objects and the short commands a French teacher uses: écoutez, regardez, levez la main.", standards: ["1.CS.1, 1.CS.4, 1.GL.1", "understanding basic classroom instructions, and linking a French word to a picture"], items: CLASSROOM }),
  core({ id: "sk-cf1-famille", title: "My family", emoji: "👨‍👩‍👧‍👦", blurb: "Mom, dad, brother, sister", parentNote: "Family words with ma and mon: ma maman, mon papa, ma sœur, mon frère.", standards: ["1.CS.1, 1.CS.4, 1.LK.1", "key words about family, linked to a picture"], items: FAMILY }),
  core({ id: "sk-cf1-couleurs", title: "Colours", emoji: "🎨", blurb: "Rouge, bleu, jaune, vert", parentNote: "French colour words, matched to pictures and to everyday things (a yellow banana, white snow), plus saying a favourite colour.", standards: ["1.CS.1, 1.GL.1, 1.LK.1", "key words for colours, understood with the help of pictures"], items: COLOURS }),
  core({ id: "sk-cf1-animaux", title: "Animals", emoji: "🐾", blurb: "Le chat, le chien, la vache", parentNote: "Names of pets, farm animals and prairie animals in French, the sounds animals make in French, and short sentences such as j'ai un chien.", standards: ["1.CS.1, 1.GL.1, 1.LK.1", "key words for animals, understood with the help of pictures and sounds"], items: ANIMALS }),
];

export const cf2: Unit[] = [
  unit({ id: "sk-cf2-nombres", title: "Numbers 1 to 20", emoji: "🔢", blurb: "Count in French", parentNote: "Counting objects and saying the number words from un to vingt, plus the number before and after.", standards: ["2.CS.1, 2.LK.1", "numbers 1 to 20 in French"], generate: numbersTo20 }),
  core({ id: "sk-cf2-questions", title: "Question words", emoji: "❓", blurb: "Qui? Où? Quand? Comment?", parentNote: "Common question beginnings (qui, où, quand, pourquoi, comment, combien) and answers that fit them.", standards: ["2.CS.1, 2.CS.2, 2.LK.1", "common question beginnings, and answering a familiar question"], items: QUESTIONS }),
  core({ id: "sk-cf2-articles", title: "Le, la, un, une, je, tu", emoji: "🔤", blurb: "Little words in front of nouns", parentNote: "Articles (le, la, les, un, une) and pronouns (je, tu, il, elle, nous, ils).", standards: ["2.CS.4, 2.GL.4, 2.LK.1", "common articles and pronouns, used to build a simple sentence"], items: ARTICLES }),
  core({ id: "sk-cf2-nourriture", title: "Food I like", emoji: "🍎", blurb: "J'aime, je n'aime pas", parentNote: "Food words with pictures, and simple sentences to say what you like and don't like, that you are hungry or thirsty, and to ask politely.", standards: ["2.CS.1, 2.CS.3, 2.LK.1", "key food words in simple sentences, supported by pictures"], items: FOOD }),
  core({ id: "sk-cf2-meteo", title: "Weather and seasons", emoji: "🌦️", blurb: "Il pleut, il neige, l'hiver", parentNote: "Weather sentences (il pleut, il neige, il fait froid), the four seasons, and winter clothing words such as une tuque and des mitaines.", standards: ["2.CS.1, 2.CS.3, 2.LK.1", "short weather sentences and season and clothing words, supported by pictures"], items: WEATHER }),
];

export const cf3: Unit[] = [
  unit({ id: "sk-cf3-nombres", title: "Numbers 21 to 50", emoji: "🔢", blurb: "Vingt-et-un to cinquante", parentNote: "Reading and saying the numbers from 21 to 50 in French, and adding small numbers.", standards: ["3.CS.1, 3.LK.1", "numbers to 50 in French"], generate: numbersTo50 }),
  core({ id: "sk-cf3-mon-ma-mes", title: "Mon, ma, mes", emoji: "🎒", blurb: "My and your things", parentNote: "Possessive words for personal items: mon, ma, mes (my) and ton, ta, tes (your).", standards: ["3.CS.4, 3.LK.1", "possessive words for personal items"], items: MINE }),
  core({ id: "sk-cf3-moi", title: "Describing me and others", emoji: "🙂", blurb: "Je suis grand, elle est drôle", parentNote: "Adjectives that describe people, with je suis, tu es, il est and elle est; hair and eye colour.", standards: ["3.CS.2, 3.CS.4, 3.LK.1", "describing self and others with simple adjectives"], items: ATTRIBUTES }),
  core({ id: "sk-cf3-consignes", title: "Class instructions", emoji: "📋", blurb: "Écrivez, lisez, découpez", parentNote: "The instructions, courtesy requests and praise used in a French class: écrivez votre nom, je ne comprends pas, pouvez-vous répéter?, bravo!", standards: ["3.CS.1, 3.LK.1", "understanding instructions, courtesy requests and accolades"], items: COMMANDS }),
  core({ id: "sk-cf3-calendrier", title: "Days, months and dates", emoji: "🗓️", blurb: "Lundi, janvier, aujourd'hui", parentNote: "Days of the week and months of the year in French, what comes next, and saying the date and your birthday.", standards: ["3.CS.2, 3.LK.1", "days, months and dates, used to give basic information"], items: CALENDAR }),
];

export const cf4: Unit[] = [
  core({ id: "sk-cf4-verbes-er", title: "Verbs that end in -er", emoji: "🗣️", blurb: "Je parle, tu joues, nous dansons", parentNote: "Present-tense endings of regular -er verbs such as parler, jouer, chanter, danser and manger.", standards: ["4.CS.4, 4.LK.1", "present-tense -er verbs in statements"], items: ER_VERBS }),
  core({ id: "sk-cf4-ou-est", title: "Where is it?", emoji: "📍", blurb: "Sur, sous, dans, devant, derrière", parentNote: "Words that show where things are, plus questions, statements and commands.", standards: ["4.CS.1, 4.CS.3, 4.LK.1", "prepositions of location, and the difference between statements, questions and commands"], items: WHERE }),
  core({ id: "sk-cf4-fransaskois", title: "Fransaskois, Métis and First Nations", emoji: "🌾", blurb: "French in Saskatchewan", parentNote: "Francophone, Métis and First Nations cultures in Saskatchewan: the Fransaskois, Michif, the sash, fiddle music and prairie words in French.", standards: ["4.C.1", "Francophone, First Nations and Métis cultures in Saskatchewan"], items: FRANSASKOIS }),
];

export const cf6: Unit[] = [
  core({ id: "sk-cf6-noms-de-lieux", title: "Place names and ways of life", emoji: "🗺️", blurb: "French and First Nations names on the map", parentNote: "How French, First Nations and Métis languages and cultures shaped Saskatchewan place names and ways of life: the fur trade, voyageurs, carts, sashes and prairie words.", standards: ["6.C.1", "the influence of French, First Nations and Métis languages and cultures on place names and ways of life"], items: PLACE_NAMES }),
];

export const cf8: Unit[] = [
  core({ id: "sk-cf8-contributions", title: "People who shaped Canada", emoji: "🌟", blurb: "Francophone, Métis and First Nations contributions", parentNote: "Contributions of French Canadian, Métis and First Nations people and organizations to Canadian society, past and present.", standards: ["8.C.1", "contributions of French Canadian, First Nations and Métis individuals and organizations to Canadian society"], items: CONTRIBUTIONS }),
];

export const imm5: Unit[] = [
  immersion({ id: "sk-imm5-cultures", title: "Fransaskois, Métis et Premières Nations", emoji: "🌾", blurb: "Personnages, évènements et traditions", parentNote: "French Immersion culture unit: French Canadian, Métis and First Nations people, events and traditions, with a Saskatchewan focus. Questions and answers are in French; hints are in English.", standards: ["5.VC.3", "French Canadian, Métis and First Nations people, historical events and cultural traditions"], items: IMM5 }),
];

export const imm8: Unit[] = [
  immersion({ id: "sk-imm8-diversite", title: "La diversité culturelle au Canada", emoji: "🍁", blurb: "Communautés francophones, métisses et autochtones", parentNote: "French Immersion culture unit: the cultural diversity of Canada, including Francophone, Métis and First Nations communities. Questions and answers are in French; hints are in English.", standards: ["8.VC.3", "cultural diversity in Canada, including Francophone, Métis and First Nations communities"], items: IMM8 }),
];
