import type { FrItem } from "../../french";

// Extra items appended to the Grade 7 Core French banks so a child can
// practise for weeks without seeing the same question.

const DIR_HINT = "Direction words: à gauche (left), à droite (right), tout droit (straight ahead), devant (in front of), derrière (behind), à côté de (beside), en face de (across from), entre (between).";
const PLACE_HINT = "Learn places with their articles: la bibliothèque, le parc, l'école. Think of what people do there.";
const COMP_HINT = "Compare with plus… que (more… than), moins… que (less… than) and aussi… que (as… as). The adjective agrees with the first person or thing.";
const PERS_HINT = "Adjectives agree with the person: il est gentil / elle est gentille; sportif / sportive. Some adjectives stay the same for both: drôle, timide, sympa.";

export const DIRECTIONS_DEEP: FrItem[] = [
  ["What does “en face de” mean?", "across from", ["beside", "behind"], DIR_HINT],
  ["What does “entre” mean?", "between", ["beside", "in front of"], DIR_HINT],
  ["What does “derrière” mean?", "behind", ["in front of", "between"], DIR_HINT],
  ["What does “Continuez tout droit” mean?", "Keep going straight", ["Turn around", "Turn right"], DIR_HINT],
  ["What does “Prenez la première rue à droite” mean?", "Take the first street on the right", ["Take the second street on the left", "Cross the bridge"], DIR_HINT],
  ["What does “Traversez la rue” mean?", "Cross the street", ["Turn left", "Stop here"], DIR_HINT],
  ["How do you say “The bank is across from the school”?", "La banque est en face de l'école.", ["La banque est derrière l'école.", "La banque est entre l'école."], DIR_HINT],
  ["How do you say “The park is beside the library”?", "Le parc est à côté de la bibliothèque.", ["Le parc est en face de la bibliothèque.", "Le parc est derrière la bibliothèque."], DIR_HINT],
  ["How do you say “Turn left at the corner”?", "Tournez à gauche au coin.", ["Tournez à droite au coin.", "Allez tout droit au coin."], DIR_HINT],
  ["How do you say “The store is between the bank and the park”?", "Le magasin est entre la banque et le parc.", ["Le magasin est devant la banque et le parc.", "Le magasin est derrière la banque et le parc."], DIR_HINT],
  ["Which sentence tells you to go straight?", "Allez tout droit.", ["Tournez à gauche.", "Arrêtez-vous ici."], DIR_HINT],
  ["Complète : La piscine est ___ du musée. (beside)", "à côté", ["entre", "devant"], DIR_HINT],
];

export const PLACES_DEEP: FrItem[] = [
  ["Where do you buy medicine?", "à la pharmacie", ["à la piscine", "au parc"], PLACE_HINT, "💊"],
  ["Where do you play on swings and slides?", "au parc", ["à la gare", "à l'hôpital"], PLACE_HINT, "🛝"],
  ["Where do you watch a movie?", "au cinéma", ["à la boulangerie", "à la piscine"], PLACE_HINT, "🎬"],
  ["Where do you mail a letter?", "à la poste", ["au musée", "à l'école"], PLACE_HINT, "✉️"],
  ["Where do you see animals in cages?", "au zoo", ["à la bibliothèque", "à la gare"], PLACE_HINT, "🦁"],
  ["Where do you buy a croissant?", "à la boulangerie", ["à la piscine", "au cinéma"], PLACE_HINT, "🥐"],
  ["Where do you take money out of your account?", "à la banque", ["au zoo", "à la piscine"], PLACE_HINT, "🏦"],
  ["Where do you buy a ticket for a bus or train?", "à la gare", ["au parc", "à la banque"], PLACE_HINT, "🎫"],
  ["How do you say “at the library”?", "à la bibliothèque", ["au bibliothèque", "à le bibliothèque"], "À + la stays à la. À + le becomes au."],
  ["How do you say “at the museum”?", "au musée", ["à la musée", "à le musée"], "À + le becomes au: au musée."],
  ["How do you say “at the hospital”?", "à l'hôpital", ["au hôpital", "à la hôpital"], "Before a vowel or a silent h, use à l': à l'hôpital."],
  ["Complète : Je vais ___ cinéma samedi. (to the)", "au", ["à la", "à l'"], "À + le becomes au: au cinéma."],
];

export const COMPARE_DEEP: FrItem[] = [
  ["How do you say “The bus is slower than the train”?", "L'autobus est moins rapide que le train.", ["L'autobus est plus rapide que le train.", "L'autobus est aussi rapide que le train."], COMP_HINT],
  ["How do you say “Léa is as tall as Marc”?", "Léa est aussi grande que Marc.", ["Léa est plus grande que Marc.", "Léa est moins grande que Marc."], COMP_HINT],
  ["How do you say “My brother is younger than me”?", "Mon frère est plus jeune que moi.", ["Mon frère est plus âgé que moi.", "Mon frère est aussi jeune que moi."], COMP_HINT],
  ["How do you say “The soup is hotter than the tea”?", "La soupe est plus chaude que le thé.", ["La soupe est moins chaude que le thé.", "La soupe est aussi chaude que le thé."], COMP_HINT],
  ["Complète : Un chat est ___ petit qu'un cheval. (smaller)", "plus", ["moins", "aussi"], COMP_HINT],
  ["Complète : Un cheval est ___ petit qu'un chat. (less)", "moins", ["plus", "aussi"], COMP_HINT],
  ["Complète : Zoé et Jade ont le même âge. Zoé est ___ âgée que Jade.", "aussi", ["plus", "moins"], COMP_HINT],
  ["Mon sac est plus lourd que ton sac. What does it mean?", "Mine is heavier.", ["Mine is lighter.", "They weigh the same."], COMP_HINT],
  ["Ce livre est moins long que l'autre. What does it mean?", "This book is shorter.", ["This book is longer.", "The books are the same length."], COMP_HINT],
  ["Sami est aussi rapide que Théo. What does it mean?", "They run at the same speed.", ["Sami is faster.", "Théo is faster."], COMP_HINT],
  ["Complète : Cette rue est ___ longue que l'autre. (longer)", "plus", ["moins", "aussi"], COMP_HINT],
  ["What does “aussi … que” mean?", "as … as", ["more … than", "less … than"], COMP_HINT],
];

export const PERSONALITY_DEEP: FrItem[] = [
  ["Mon père est ___. (kind)", "gentil", ["gentille", "gentils"], PERS_HINT],
  ["Ma mère est ___. (kind)", "gentille", ["gentil", "gentilles"], PERS_HINT],
  ["Mon cousin est ___. (shy)", "timide", ["timides", "timid"], PERS_HINT],
  ["Mes sœurs sont ___. (athletic, plural)", "sportives", ["sportive", "sportif"], PERS_HINT],
  ["Mes frères sont ___. (athletic, plural)", "sportifs", ["sportif", "sportive"], PERS_HINT],
  ["Mon ami est ___. (funny)", "drôle", ["drôles", "drôl"], PERS_HINT],
  ["Ma voisine est ___. (creative)", "créative", ["créatif", "créatifs"], PERS_HINT],
  ["Mon voisin est ___. (creative)", "créatif", ["créative", "créatives"], PERS_HINT],
  ["What does “travailleur” mean?", "hard-working", ["lazy", "shy"], PERS_HINT],
  ["What does “généreux” mean?", "generous", ["selfish", "tired"], PERS_HINT],
  ["What does “timide” mean?", "shy", ["funny", "kind"], PERS_HINT],
  ["Which sentence describes a girl who likes sports?", "Elle est sportive.", ["Il est sportif.", "Elle est sportif."], PERS_HINT],
];
