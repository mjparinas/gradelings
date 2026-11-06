import type { FrItem } from "../../french";

// Extra Grade 2 French Immersion questions, added beside the original banks so a child who practises every day
// meets fewer repeats. Same patterns as the originals; simple, region-free French.

const ADJ_HINT = "An adjective agrees with its noun: a feminine noun usually takes an adjective with an “e” at the end (petit → petite). For plurals, add an “s”.";
const TALE_HINT = "Fairy tales and folk tales are old stories told in many cultures, with a beginning, a problem and an ending.";
const VERB_HINT = "“Être” (to be) and “avoir” (to have) change with the person: je suis, tu es, il est… / j'ai, tu as, il a…";

export const ADJECTIVES_DEEP: FrItem[] = [
  ["Complète : Un livre ___.", "intéressant", ["intéressante", "intéressants", "intéressantes"], ADJ_HINT],
  ["Complète : Une histoire ___.", "intéressante", ["intéressant", "intéressants", "intéressantes"], ADJ_HINT],
  ["Complète : Des chats ___.", "noirs", ["noir", "noire", "noires"], ADJ_HINT],
  ["Complète : Des fleurs ___.", "jolies", ["joli", "jolie", "jolis"], ADJ_HINT],
  ["Complète : Un chien ___.", "petit", ["petite", "petits", "petites"], ADJ_HINT],
  ["Complète : Une chaise ___.", "bleue", ["bleu", "bleus", "bleues"], ADJ_HINT],
  ["Complète : Les pommes sont ___.", "rondes", ["rond", "ronde", "ronds"], ADJ_HINT],
  ["Complète : Les ballons sont ___.", "ronds", ["rond", "ronde", "rondes"], ADJ_HINT],
  ["Complète : Une fille ___.", "gentille", ["gentil", "gentils", "gentilles"], ADJ_HINT],
  ["Complète : Un garçon ___.", "gentil", ["gentille", "gentils", "gentilles"], ADJ_HINT],
  ["Complète : La lune est ___.", "ronde", ["rond", "ronds", "rondes"], ADJ_HINT],
  ["Complète : Le soleil est ___.", "chaud", ["chaude", "chauds", "chaudes"], ADJ_HINT],
  ["Complète : La soupe est ___.", "chaude", ["chaud", "chauds", "chaudes"], ADJ_HINT],
  ["Complète : Des maisons ___.", "blanches", ["blanc", "blanche", "blancs"], ADJ_HINT],
  ["Complète : Des crayons ___.", "verts", ["vert", "verte", "vertes"], ADJ_HINT],
  ["Complète : Une tortue ___.", "lente", ["lent", "lents", "lentes"], ADJ_HINT],
  ["Complète : Un escargot ___.", "lent", ["lente", "lents", "lentes"], ADJ_HINT],
  ["Complète : Les filles sont ___.", "contentes", ["content", "contente", "contents"], ADJ_HINT],
  ["Complète : Les garçons sont ___.", "contents", ["content", "contente", "contentes"], ADJ_HINT],
  ["Complète : Une route ___.", "longue", ["long", "longs", "longues"], ADJ_HINT],
];

export const SENTENCE_CHOICES_DEEP: FrItem[] = [
  ["Quelle phrase est dans le bon ordre?", "Le bébé boit du lait.", ["Boit le bébé lait du.", "Du lait bébé le boit.", "Bébé boit le du lait."], "Start with who (le bébé), then what he does (boit), then what (du lait).", "🍼"],
  ["Quelle phrase est dans le bon ordre?", "Mon frère joue du piano.", ["Joue mon frère du piano.", "Du piano frère mon joue.", "Frère joue mon piano du."], "Start with who, then the action, then the rest.", "🎹"],
  ["Quelle phrase est dans le bon ordre?", "Les poissons nagent vite.", ["Nagent les poissons vite.", "Vite poissons les nagent.", "Les vite nagent poissons."], "Say who first (les poissons), then what they do.", "🐟"],
  ["Quelle phrase est dans le bon ordre?", "Nina aime les fleurs.", ["Aime Nina fleurs les.", "Les fleurs Nina aime.", "Fleurs les aime Nina."], "Who? Nina. Does what? Aime. What? Les fleurs.", "🌸"],
  ["Quelle phrase est dans le bon ordre?", "Nous lisons un conte.", ["Lisons nous un conte.", "Un conte lisons nous.", "Conte un nous lisons."], "Start with who (nous), then the verb (lisons).", "📚"],
  ["Quelle phrase est dans le bon ordre?", "Ma grand-mère fait du pain.", ["Fait ma grand-mère du pain.", "Du pain grand-mère ma fait.", "Pain du fait ma grand-mère."], "Start with who, then the action, then the rest.", "🍞"],
  ["Quelle phrase est dans le bon ordre?", "Le vent souffle fort.", ["Souffle le vent fort.", "Fort vent le souffle.", "Vent fort souffle le."], "Start with what is acting (le vent), then the verb (souffle).", "🌬️"],
  ["Quelle phrase est dans le bon ordre?", "Tu portes un manteau rouge.", ["Portes tu un manteau rouge.", "Un manteau rouge tu portes.", "Rouge manteau tu un portes."], "Start with who (tu), then the verb (portes).", "🧥"],
  ["Quelle phrase est dans le bon ordre?", "Les élèves écoutent la maîtresse.", ["Écoutent les élèves la maîtresse.", "La maîtresse élèves les écoutent.", "Élèves écoutent maîtresse les la."], "Say who first (les élèves), then what they do.", "🏫"],
  ["Quelle phrase est dans le bon ordre?", "Je range ma chambre.", ["Range je ma chambre.", "Ma chambre je range.", "Chambre ma range je."], "Start with who (je), then the verb (range).", "🛏️"],
  ["Quelle phrase est dans le bon ordre?", "Le chat dort sur le lit.", ["Dort le chat sur le lit.", "Sur le lit chat le dort.", "Le lit sur dort chat le."], "Start with who, then the action, then where.", "😺"],
  ["Quelle phrase est dans le bon ordre?", "Noé cherche son ballon.", ["Cherche Noé son ballon.", "Son ballon Noé cherche.", "Ballon son cherche Noé."], "Who? Noé. Does what? Cherche. What? Son ballon.", "⚽"],
];

export const WORD_ORDERS_DEEP: { items: string[] }[] = [
  { items: ["Le", "bébé", "boit", "du", "lait"] },
  { items: ["Mon", "frère", "joue", "du", "piano"] },
  { items: ["Les", "poissons", "nagent", "vite"] },
  { items: ["Nina", "aime", "les", "fleurs"] },
  { items: ["Nous", "lisons", "un", "conte"] },
  { items: ["Je", "range", "ma", "chambre"] },
  { items: ["Noé", "cherche", "son", "ballon"] },
  { items: ["Le", "chat", "dort", "sur", "le", "lit"] },
];

export const CONTES_DEEP: FrItem[] = [
  ["Dans « Le Petit Chaperon rouge », qui sauve la grand-mère et la petite fille?", "Un chasseur", ["Un pirate", "Un robot"], TALE_HINT, "🏹"],
  ["Dans « Les trois petits cochons », la deuxième maison est faite de…", "bois", ["paille", "briques"], "The first pig builds with straw, the second with wood and the third with bricks.", "🪵"],
  ["Dans « Boucle d'or et les trois ours », qui dort dans le petit lit?", "Boucle d'or", ["Le grand ours", "La maman ours"], TALE_HINT, "🛏️"],
  ["Dans « Cendrillon », à quelle heure Cendrillon doit-elle quitter le bal?", "À minuit", ["À midi", "À huit heures"], TALE_HINT, "🕛"],
  ["Dans « Le Chat botté », le chat est…", "rusé", ["paresseux", "timide"], "The cat is clever and finds clever ways to help his master.", "🐱"],
  ["Dans « La Belle au bois dormant », que fait le prince?", "Il réveille la princesse", ["Il perd ses bottes", "Il construit une maison"], TALE_HINT, "🏰"],
  ["Dans « Le vilain petit canard », les autres animaux se moquent du canard parce qu'il est…", "différent", ["pareil", "rapide"], TALE_HINT, "🦆"],
  ["Dans « Le Lièvre et la Tortue », pourquoi la tortue gagne-t-elle?", "Elle ne s'arrête pas", ["Elle court plus vite", "Elle triche"], "The hare stops to nap, but the tortoise keeps going.", "🐢"],
  ["Dans « Hansel et Gretel », que laissent les enfants sur le chemin?", "Des miettes de pain", ["Des pommes", "Des livres"], TALE_HINT, "🍞"],
  ["Dans un conte, un personnage méchant s'appelle souvent…", "le méchant", ["le facteur", "le boulanger"], TALE_HINT, "😈"],
  ["Dans un conte, le héros doit souvent…", "résoudre un problème", ["compter des étoiles", "lire un horaire"], TALE_HINT, "🛡️"],
  ["Quelle phrase peut venir dans un conte?", "Un jour, une fée apparut.", ["La température est de quatre degrés.", "Il faut deux œufs pour la recette."], TALE_HINT, "🧚"],
  ["Quel animal parle souvent dans les contes?", "Le renard", ["Le camion", "Le crayon"], TALE_HINT, "🦊"],
  ["Dans un conte, le chiffre trois revient souvent. Dans « Les trois petits cochons », combien de cochons y a-t-il?", "trois", ["deux", "cinq"], "The title tells us how many pigs there are.", "🐷"],
  ["Quelle phrase termine un conte?", "Et ils vécurent heureux.", ["Il était une fois…", "Voici la liste des courses."], TALE_HINT, "🌈"],
  ["Qu'est-ce qu'un « héros »?", "Le personnage principal qui est courageux", ["Un objet magique", "Une montagne"], TALE_HINT, "🦸"],
];

export const MARKERS_DEEP: FrItem[] = [
  ["Complète : ___, je prends mon sac. Ensuite, je mets mes souliers. Enfin, je pars.", "D'abord", ["Enfin", "Ensuite"], "“D'abord” tells us what comes first.", "🎒"],
  ["Complète : D'abord, je mange. ___, je me brosse les dents.", "Ensuite", ["D'abord", "Hier"], "“Ensuite” tells us what comes next.", "🪥"],
  ["Complète : D'abord, je lis. Ensuite, j'écris. ___, je range mes livres.", "Enfin", ["D'abord", "Hier"], "“Enfin” tells us what comes last.", "📚"],
  ["Complète : La maison est ___ de l'école. Je marche deux minutes.", "près", ["loin", "tard"], "“Près” means close by.", "🏠"],
  ["Complète : Le village est ___. Il faut prendre l'autobus.", "loin", ["près", "dedans"], "“Loin” means far away.", "🚌"],
  ["Complète : Le chapeau est ___ la tête.", "sur", ["sous", "loin"], "“Sur” means on top of.", "🎩"],
  ["Complète : Le chien dort ___ la table.", "sous", ["sur", "demain"], "“Sous” means below.", "🐕"],
  ["Complète : Le livre est ___ le sac, à l'intérieur.", "dans", ["sur", "loin"], "“Dans” means inside.", "🎒"],
  ["Complète : Aujourd'hui, c'est lundi. ___, ce sera mardi.", "Demain", ["Hier", "Enfin"], "“Demain” means tomorrow.", "📅"],
  ["Complète : Aujourd'hui, c'est lundi. ___, c'était dimanche.", "Hier", ["Demain", "Ensuite"], "“Hier” means yesterday.", "🗓️"],
  ["Complète : D'abord, je mélange. ___, je verse dans le moule. Enfin, je fais cuire.", "Ensuite", ["D'abord", "Hier"], "“Ensuite” tells us what comes next.", "🥣"],
  ["Complète : D'abord, je ferme la porte. Ensuite, je mets mes bottes. ___, je sors.", "Enfin", ["D'abord", "Demain"], "“Enfin” tells us what comes last.", "🚪"],
  ["Complète : Le ballon est ___ du mur, tout près.", "à côté", ["loin", "demain"], "“À côté” means beside.", "⚽"],
  ["Complète : Le soleil se lève le matin. Le soir, il se ___.", "couche", ["lève", "lave"], "At the end of the day the sun sets: “se couche”.", "🌇"],
];

export const SEQUENCES_DEEP: { prompt: string; items: string[] }[] = [
  { prompt: "Remets les phrases dans l'ordre.", items: ["D'abord, je prends du pain.", "Ensuite, j'ajoute du fromage.", "Enfin, je mange mon sandwich."] },
  { prompt: "Remets les phrases dans l'ordre.", items: ["D'abord, je mets mes mitaines.", "Ensuite, je mets ma tuque.", "Enfin, je sors dans la neige."] },
  { prompt: "Remets les phrases dans l'ordre.", items: ["D'abord, je trouve un livre.", "Ensuite, je l'ouvre.", "Enfin, je lis une histoire."] },
  { prompt: "Remets les phrases dans l'ordre.", items: ["D'abord, la chenille mange.", "Ensuite, elle fait un cocon.", "Enfin, un papillon sort."] },
  { prompt: "Remets les phrases dans l'ordre.", items: ["D'abord, je lave mes mains.", "Ensuite, je mets la table.", "Enfin, nous mangeons."] },
  { prompt: "Remets les phrases dans l'ordre.", items: ["D'abord, je cherche mon manteau.", "Ensuite, je l'enfile.", "Enfin, je ferme la fermeture éclair."] },
];

export const BE_HAVE_DEEP: FrItem[] = [
  ["Complète : Je ___ fatigué.", "suis", ["es", "est", "sont"], VERB_HINT],
  ["Complète : Tu ___ un ballon.", "as", ["a", "ai", "ont"], VERB_HINT],
  ["Complète : Elle ___ gentille.", "est", ["es", "suis", "sommes"], VERB_HINT],
  ["Complète : Nous ___ à l'école.", "sommes", ["êtes", "sont", "suis"], VERB_HINT],
  ["Complète : Ils ___ un chat.", "ont", ["a", "avons", "avez"], VERB_HINT],
  ["Complète : Vous ___ en retard.", "êtes", ["sommes", "sont", "es"], VERB_HINT],
  ["Complète : J'___ une idée.", "ai", ["as", "a", "ont"], VERB_HINT],
  ["Complète : Nous ___ des crayons.", "avons", ["avez", "ont", "ai"], VERB_HINT],
  ["Complète : Ana ___ dans le jardin.", "est", ["es", "sont", "suis"], VERB_HINT],
  ["Complète : Les chats ___ dans la cuisine.", "sont", ["est", "sommes", "êtes"], VERB_HINT],
  ["Complète : Noé ___ un vélo.", "a", ["as", "ai", "ont"], VERB_HINT],
  ["Complète : Tu ___ prêt.", "es", ["est", "suis", "êtes"], VERB_HINT],
  ["Complète : Elles ___ contentes.", "sont", ["est", "sommes", "êtes"], VERB_HINT],
  ["Complète : J'___ soif.", "ai", ["as", "a", "ont"], VERB_HINT],
  ["Complète : Il ___ un livre.", "a", ["as", "ai", "ont"], VERB_HINT],
  ["Complète : Vous ___ de la chance.", "avez", ["avons", "ont", "as"], VERB_HINT],
  ["Complète : Je ___ à la maison.", "suis", ["es", "est", "sont"], VERB_HINT],
  ["Complète : Tu ___ mon ami.", "es", ["est", "suis", "sont"], VERB_HINT],
  ["Complète : Zoé et Ana ___ sœurs.", "sont", ["est", "sommes", "êtes"], VERB_HINT],
  ["Complète : Elles ___ peur.", "ont", ["a", "avons", "avez"], VERB_HINT],
  ["Complète : Ils ___ à la bibliothèque.", "sont", ["est", "sommes", "êtes"], VERB_HINT],
  ["Complète : Kenji ___ neuf ans.", "a", ["as", "ai", "ont"], VERB_HINT],
];
