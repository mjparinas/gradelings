import type { FrItem } from "../../french";

// Extra Grade 5 French Immersion questions, added beside the original banks so a child who practises every day
// meets fewer repeats. Same patterns as the originals; simple, region-free French.

const REL_HINT = "“Qui” replaces the subject, “que” replaces the direct object, “où” gives a place or time and “dont” replaces a phrase with “de”.";
const NEG_HINT = "Ne… plus means no longer, ne… jamais means never and ne… rien means nothing. Put “ne” before the verb and the other word after it.";
const ADV_HINT = "Adverbs tell when (temps), where (lieu), how (manière) or how much (quantité). Ask yourself which question the adverb answers.";
const PUNCT_HINT = "Guillemets « » show what someone says, a colon : introduces a list or an explanation and parentheses ( ) add extra information.";
const BD_HINT = "A comic book (bande dessinée, or BD) tells a story with panels (cases), speech bubbles (bulles) and sound words (onomatopées).";

export const RELATIVES_DEEP: FrItem[] = [
  ["Complète : La fille ___ joue du violon est ma voisine.", "qui", ["que", "où", "dont"], REL_HINT],
  ["Complète : Le livre ___ elle lit est passionnant.", "que", ["qui", "où", "dont"], REL_HINT],
  ["Complète : L'école ___ j'étudie est près de chez moi.", "où", ["que", "qui", "dont"], REL_HINT],
  ["Complète : Le film ___ nous parlons est nouveau.", "dont", ["que", "qui", "où"], "We say “parler de quelque chose”, so the link word is “dont”."],
  ["Complète : Les élèves ___ ont fini peuvent sortir.", "qui", ["que", "où", "dont"], REL_HINT],
  ["Complète : La chanson ___ tu chantes est très belle.", "que", ["qui", "où", "dont"], REL_HINT],
  ["Complète : Le matin ___ il a plu, nous sommes restés à l'intérieur.", "où", ["que", "qui", "dont"], REL_HINT],
  ["Complète : L'outil ___ elle a besoin est dans le garage.", "dont", ["que", "qui", "où"], "We say “avoir besoin de”, so the link word is “dont”."],
  ["Complète : Le chat ___ dort sur le divan s'appelle Mochi.", "qui", ["que", "où", "dont"], REL_HINT],
  ["Complète : Le jeu ___ Amir a choisi est un jeu de cartes.", "que", ["qui", "où", "dont"], REL_HINT],
  ["Complète : Le village ___ ma grand-mère est née est très petit.", "où", ["que", "qui", "dont"], REL_HINT],
  ["Complète : La personne ___ tu te souviens est mon oncle.", "dont", ["que", "qui", "où"], "We say “se souvenir de quelqu'un”, so the link word is “dont”."],
];

export const NEGATION_DEEP: FrItem[] = [
  ["Complète : Elle n'a ___ bu de café. (pas une seule fois)", "jamais", ["rien", "plus", "personne"], NEG_HINT],
  ["Complète : Il n'y a ___ à manger. (le frigo est vide)", "rien", ["jamais", "plus", "pas"], NEG_HINT],
  ["Complète : Nous ne vivons ___ en ville. (avant oui, maintenant non)", "plus", ["jamais", "rien", "personne"], NEG_HINT],
  ["Complète : Tu ne fais ___ de bruit. (aucune chose)", "rien", ["jamais", "plus", "personne"], NEG_HINT],
  ["Complète : Je ne suis ___ allé en avion. (pas une seule fois)", "jamais", ["rien", "plus", "personne"], NEG_HINT],
  ["Complète : Il ne pleut ___ . (la pluie est finie)", "plus", ["jamais", "rien", "personne"], NEG_HINT],
  ["Quelle phrase est correcte?", "Elle ne mange plus de bonbons.", ["Elle mange ne plus de bonbons.", "Elle plus ne mange de bonbons.", "Ne elle mange plus de bonbons."], NEG_HINT],
  ["Quelle phrase est correcte?", "Je ne regarde jamais la télé le matin.", ["Je jamais ne regarde la télé le matin.", "Je regarde ne jamais la télé le matin.", "Je ne jamais regarde la télé le matin."], NEG_HINT],
  ["Quelle phrase est correcte?", "Ils n'ont rien acheté.", ["Ils ne ont rien acheté.", "Ils rien n'ont acheté.", "Ils ont ne rien acheté."], NEG_HINT],
  ["Quelle phrase est correcte?", "Vous n'écrivez plus de lettres.", ["Vous ne écrivez plus de lettres.", "Vous écrivez n'plus de lettres.", "Vous plus n'écrivez de lettres."], NEG_HINT],
  ["Complète : Zoé ne dit ___ à personne. (aucune chose)", "rien", ["jamais", "plus", "pas"], NEG_HINT],
  ["Complète : On ne joue ___ au parc en hiver. (pas une seule fois)", "jamais", ["rien", "plus", "personne"], NEG_HINT],
];

export const ADVERB_TYPES_DEEP: FrItem[] = [
  ["« Hier » est un adverbe de…", "temps", ["lieu", "manière", "quantité"], ADV_HINT],
  ["« Toujours » est un adverbe de…", "temps", ["lieu", "manière", "quantité"], ADV_HINT],
  ["« Dehors » est un adverbe de…", "lieu", ["temps", "manière", "quantité"], ADV_HINT],
  ["« Là-bas » est un adverbe de…", "lieu", ["temps", "manière", "quantité"], ADV_HINT],
  ["« Lentement » est un adverbe de…", "manière", ["temps", "lieu", "quantité"], ADV_HINT],
  ["« Bien » est un adverbe de…", "manière", ["temps", "lieu", "quantité"], ADV_HINT],
  ["« Trop » est un adverbe de…", "quantité", ["temps", "lieu", "manière"], ADV_HINT],
  ["« Peu » est un adverbe de…", "quantité", ["temps", "lieu", "manière"], ADV_HINT],
  ["Quel adverbe répond à la question « Quand? »", "bientôt", ["ici", "mal", "assez"], ADV_HINT],
  ["Quel adverbe répond à la question « Où? »", "partout", ["jamais", "vite", "très"], ADV_HINT],
  ["Quel adverbe répond à la question « Comment? »", "gentiment", ["demain", "dedans", "beaucoup"], ADV_HINT],
  ["Quel adverbe répond à la question « Combien? »", "assez", ["tard", "ici", "vite"], ADV_HINT],
];

export const PUNCTUATION_DEEP: FrItem[] = [
  ["Quel signe sert à ajouter une précision entre deux parenthèses?", "Les parenthèses ( )", ["Le deux-points :", "Les guillemets « »"], PUNCT_HINT],
  ["Quelle phrase est bien ponctuée?", "Max demande : « Où est mon sac? »", ["Max demande « Où est mon sac? »,", "Max demande ; (Où est mon sac?)", "Max demande, Où est mon sac?"], PUNCT_HINT],
  ["Quelle phrase est bien ponctuée?", "Apportez ceci : un crayon, une gomme et une règle.", ["Apportez ceci « un crayon, une gomme et une règle »", "Apportez ceci (un crayon, une gomme et une règle)", "Apportez ceci ; un crayon une gomme et une règle"], PUNCT_HINT],
  ["Quelle phrase est bien ponctuée?", "Ma tante (la sœur de papa) vient dîner.", ["Ma tante « la sœur de papa » vient dîner.", "Ma tante : la sœur de papa vient dîner.", "Ma tante, la sœur de papa. vient dîner."], PUNCT_HINT],
  ["Quel signe annonce une explication?", "Le deux-points :", ["Les guillemets « »", "Les parenthèses ( )"], PUNCT_HINT],
  ["Où faut-il mettre les guillemets? Zoé crie Attention!", "Zoé crie : « Attention! »", ["Zoé « crie » : Attention!", "« Zoé crie : » Attention!"], PUNCT_HINT],
  ["Quelle phrase est bien ponctuée?", "Il a trois frères : Ali, Noé et Sam.", ["Il a trois frères « Ali, Noé et Sam. »", "Il a trois frères (Ali, Noé et Sam)", "Il a trois frères ; Ali Noé et Sam."], PUNCT_HINT],
  ["Où faut-il mettre les parenthèses? Le lac il est immense borde la ville.", "Le lac (il est immense) borde la ville.", ["Le (lac) il est immense borde la ville.", "Le lac il est (immense) borde la ville."], PUNCT_HINT],
  ["Quels signes montrent que quelqu'un parle?", "Les guillemets « »", ["Les parenthèses ( )", "Le deux-points :"], PUNCT_HINT],
  ["Quelle phrase est bien ponctuée?", "Mon voisin (un grand musicien) joue du piano.", ["Mon voisin « un grand musicien » joue du piano.", "Mon voisin : un grand musicien joue du piano.", "Mon voisin, un grand musicien. joue du piano."], PUNCT_HINT],
  ["Quelle phrase est bien ponctuée?", "Le prof dit : « Ouvrez vos livres. »", ["Le prof dit « Ouvrez vos livres. »,", "Le prof dit ; (Ouvrez vos livres.)", "Le prof dit, Ouvrez vos livres."], PUNCT_HINT],
  ["Quel signe vient avant une liste?", "Le deux-points :", ["Les parenthèses ( )", "Les guillemets « »"], PUNCT_HINT],
];

export const COMICS_DEEP: FrItem[] = [
  ["Que peut-on lire dans une bulle?", "Ce que dit ou pense un personnage", ["Le prix de la BD", "La date d'impression"], BD_HINT, "💬"],
  ["Qu'est-ce qu'une planche?", "Une page de BD avec plusieurs cases", ["Un mot qui imite un bruit", "Le nom du dessinateur"], BD_HINT, "📄"],
  ["Quel mot est une onomatopée?", "Crac!", ["Maison", "Lundi"], BD_HINT, "💥"],
  ["Quel mot est une onomatopée?", "Ding-dong!", ["Fenêtre", "Demain"], BD_HINT, "🔔"],
  ["Une bulle ronde avec une petite queue montre…", "ce que le personnage dit", ["le bruit du vent", "le titre de la page"], BD_HINT, "🗨️"],
  ["Que montre un grand dessin qui prend toute la page?", "Un moment très important", ["Une erreur de l'auteur", "La fin du livre"], BD_HINT, "🖼️"],
  ["Qui dessine une BD?", "Le dessinateur", ["Le facteur", "Le boulanger"], BD_HINT, "✏️"],
  ["Pourquoi une BD utilise-t-elle des couleurs?", "Pour montrer l'ambiance et les émotions", ["Pour cacher les mots", "Pour rendre les cases plus petites"], BD_HINT, "🎨"],
  ["Dans quel ordre lit-on les cases d'une planche?", "De gauche à droite, de haut en bas", ["De bas en haut", "Au hasard"], BD_HINT, "➡️"],
  ["Quel mot est une onomatopée?", "Plouf!", ["Aujourd'hui", "Peut-être"], BD_HINT, "💧"],
  ["Que montre une case où un personnage ouvre grand la bouche?", "Qu'il est surpris ou qu'il crie", ["Qu'il dort", "Qu'il a faim seulement"], BD_HINT, "😮"],
  ["Qu'est-ce qu'une bulle de pensée?", "Une bulle en nuage qui montre une pensée", ["Une page de titre", "Un bruit fort"], "Round, cloud-shaped bubbles show thoughts. Pointed bubbles show speech.", "💭"],
];
