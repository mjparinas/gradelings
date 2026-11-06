import type { FrItem } from "../../french";

// Extra items appended to the Grade 8 Core French banks so a child can
// practise for weeks without seeing the same question.

const TIME_HINT = "Time words tell you the tense: hier (yesterday) points to the past, aujourd'hui (today) to the present, demain (tomorrow) to the future.";
const FREQ_HINT = "Frequency words tell how often: toujours (always), souvent (often), parfois (sometimes), jamais (never), chaque jour (every day).";
const OPIN_HINT = "Opinion phrases: à mon avis (in my opinion), selon moi (according to me), je pense que (I think that), je préfère (I prefer). Give a reason with parce que (because).";
const COMP_HINT = "Compare with plus… que (more… than), moins… que (less… than) and aussi… que (as… as). Use mais (but) to show a contrast.";

export const TIMES_DEEP: FrItem[] = [
  ["Which sentence talks about the past?", "Hier, nous avons joué dehors.", ["Demain, nous allons jouer dehors.", "Maintenant, nous jouons dehors."], TIME_HINT],
  ["Which sentence talks about the future?", "Demain, elle va visiter sa tante.", ["Hier, elle a visité sa tante.", "Aujourd'hui, elle visite sa tante."], TIME_HINT],
  ["Which sentence talks about now?", "Maintenant, je fais mes devoirs.", ["Hier, j'ai fait mes devoirs.", "Demain, je vais faire mes devoirs."], TIME_HINT],
  ["Complète : Hier, il ___ un livre. (past: lire)", "a lu", ["lit", "va lire"], TIME_HINT],
  ["Complète : Demain, tu ___ jouer au hockey. (future: aller)", "vas", ["as", "es"], "The near future is aller + an infinitive: tu vas jouer."],
  ["Complète : Aujourd'hui, nous ___ au parc. (present: être)", "sommes", ["étions", "serons"], TIME_HINT],
  ["What does “la semaine dernière” mean?", "last week", ["next week", "this week"], TIME_HINT],
  ["What does “la semaine prochaine” mean?", "next week", ["last week", "every week"], TIME_HINT],
  ["What does “ce soir” mean?", "tonight", ["last night", "tomorrow"], TIME_HINT],
  ["How do you say “Last night I watched a movie”?", "Hier soir, j'ai regardé un film.", ["Ce soir, je vais regarder un film.", "Hier soir, je regarde un film."], TIME_HINT],
  ["How do you say “Next week we are going to travel”?", "La semaine prochaine, nous allons voyager.", ["La semaine dernière, nous avons voyagé.", "La semaine prochaine, nous avons voyagé."], TIME_HINT],
  ["Which word signals the past?", "hier", ["demain", "bientôt"], TIME_HINT],
];

export const FREQUENCY_DEEP: FrItem[] = [
  ["What does “quelquefois” mean?", "sometimes", ["never", "always"], FREQ_HINT],
  ["What does “d'habitude” mean?", "usually", ["rarely", "never"], FREQ_HINT],
  ["What does “une fois par semaine” mean?", "once a week", ["every day", "once a year"], FREQ_HINT],
  ["What does “deux fois par mois” mean?", "twice a month", ["twice a week", "once a month"], FREQ_HINT],
  ["What does “tous les soirs” mean?", "every evening", ["every morning", "once a week"], FREQ_HINT],
  ["Which word means the opposite of “jamais”?", "toujours", ["rarement", "parfois"], FREQ_HINT],
  ["Which sentence says you often play soccer?", "Je joue souvent au soccer.", ["Je ne joue jamais au soccer.", "Je joue rarement au soccer."], FREQ_HINT],
  ["Which sentence says Zoé rarely eats fish?", "Zoé mange rarement du poisson.", ["Zoé mange toujours du poisson.", "Zoé mange souvent du poisson."], FREQ_HINT],
  ["How do you say “I usually walk to school”?", "D'habitude, je marche à l'école.", ["Je ne marche jamais à l'école.", "Je marche rarement à l'école."], FREQ_HINT],
  ["How do you say “We swim once a week”?", "Nous nageons une fois par semaine.", ["Nous nageons chaque jour.", "Nous ne nageons jamais."], FREQ_HINT],
  ["Complète : Elle ne boit ___ de café. (never)", "jamais", ["souvent", "toujours"], "With ne… jamais, the sentence means “never”."],
  ["Complète : Il fait ses devoirs ___ les soirs. (every evening)", "tous", ["aucun", "parfois"], FREQ_HINT],
];

export const OPINIONS_DEEP: FrItem[] = [
  ["What does “Je trouve que” mean?", "I find that", ["I lose that", "I look for"], OPIN_HINT],
  ["What does “Je suis d'accord” mean?", "I agree", ["I am late", "I am tired"], OPIN_HINT],
  ["What does “Je ne suis pas d'accord” mean?", "I disagree", ["I agree", "I am not sure"], OPIN_HINT],
  ["What does “C'est ennuyeux” mean?", "It's boring", ["It's exciting", "It's easy"], OPIN_HINT],
  ["What does “C'est génial” mean?", "It's great", ["It's boring", "It's late"], OPIN_HINT],
  ["Complète : ___ moi, le français est amusant. (according to)", "Selon", ["Parce", "Avec"], OPIN_HINT],
  ["Complète : ___ mon avis, le sport est important. (in)", "À", ["Sur", "Avec"], OPIN_HINT],
  ["Complète : Je pense ___ la musique est relaxante.", "que", ["qui", "quand"], OPIN_HINT],
  ["How do you say “I prefer pizza because it is delicious”?", "Je préfère la pizza parce que c'est délicieux.", ["Je préfère la pizza mais c'est délicieux.", "Je préfère la pizza donc c'est délicieux."], OPIN_HINT],
  ["How do you say “In my opinion, winter is too cold”?", "À mon avis, l'hiver est trop froid.", ["À mon avis, l'hiver est trop chaud.", "À mon avis, l'été est trop froid."], OPIN_HINT],
  ["Which sentence gives a reason?", "J'aime le soccer parce que c'est rapide.", ["J'aime le soccer et le hockey.", "J'aime le soccer, mais pas le tennis."], OPIN_HINT],
  ["Which phrase asks for an opinion?", "Qu'est-ce que tu penses?", ["Quel âge as-tu?", "Où habites-tu?"], OPIN_HINT],
];

export const COMPARE_DEEP: FrItem[] = [
  ["Complète : Un éléphant est ___ lourd qu'une souris.", "plus", ["moins", "aussi"], COMP_HINT],
  ["Complète : Une souris est ___ grande qu'un éléphant.", "moins", ["plus", "aussi"], COMP_HINT],
  ["Complète : Mon frère et moi, nous sommes ___ grands l'un que l'autre. (same height)", "aussi", ["plus", "moins"], COMP_HINT],
  ["Complète : Il est fatigué, ___ il joue encore.", "mais", ["donc", "car"], COMP_HINT],
  ["How do you say “The train is faster than the bus”?", "Le train est plus rapide que l'autobus.", ["Le train est moins rapide que l'autobus.", "Le train est aussi rapide que l'autobus."], COMP_HINT],
  ["How do you say “Math is less difficult than science”?", "Les maths sont moins difficiles que les sciences.", ["Les maths sont plus difficiles que les sciences.", "Les maths sont aussi difficiles que les sciences."], COMP_HINT],
  ["How do you say “Anna is as tall as Marc”?", "Anna est aussi grande que Marc.", ["Anna est plus grande que Marc.", "Anna est moins grande que Marc."], COMP_HINT],
  ["Tom is 10. Léa is 13. Which sentence is correct?", "Tom est plus jeune que Léa.", ["Tom est plus âgé que Léa.", "Tom est aussi jeune que Léa."], COMP_HINT],
  ["Mon livre est moins long que ton livre. What does it mean?", "Mine is shorter.", ["Mine is longer.", "They are the same length."], COMP_HINT],
  ["Complète : Elle mange ___ de légumes que moi. (more)", "plus", ["aussi", "très"], "Use plus de + a noun to say more of something: plus de légumes que."],
  ["Complète : J'aime le thé, ___ je n'aime pas le café.", "mais", ["donc", "car"], COMP_HINT],
  ["What does “moins … que” mean?", "less … than", ["more … than", "as … as"], COMP_HINT],
];
