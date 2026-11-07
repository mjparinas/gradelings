import type { FrItem } from "../../french";

// More Grade 6 Core French practice, appended to the banks in core-french.ts.

const Q_HINT = "Question words: qui (who), où (where), quand (when), pourquoi (why), comment (how), combien (how many/much), qu'est-ce que (what).";
const WHY_HINT = "“Pourquoi” asks for a reason, and the answer starts with “parce que”.";

export const QUESTIONS_DEEP: FrItem[] = [
  ["Choose the best word: “___ est ta chanson préférée?” (What is your favourite song?)", "Quelle", ["Quand", "Combien"], "“Quel, quelle, quels, quelles” mean “which” or “what” and agree with the noun: quelle chanson (feminine)."],
  ["Choose the best word: “___ est ton livre préféré?” (What is your favourite book?)", "Quel", ["Quelle", "Quand"], "“Quel, quelle, quels, quelles” mean “which” or “what” and agree with the noun: quel livre (masculine)."],
  ["Choose the best word: “___ arrives-tu?” (When do you arrive?)", "Quand", ["Qui", "Combien"], Q_HINT],
  ["Choose the best word: “___ est dans la cuisine?” (Who is in the kitchen?)", "Qui", ["Combien", "Comment"], Q_HINT],
  ["Choose the best word: “___ s'appelle ton chien?” (What is your dog called?)", "Comment", ["Où", "Combien"], "“Comment t'appelles-tu?” and “Comment s'appelle…?” ask for a name."],
  ["Choose the best word: “___ d'élèves sont dans ta classe?” (How many students are in your class?)", "Combien", ["Comment", "Quand"], Q_HINT],
  ["Which answer fits “Qui a fait ce dessin?”", "C'est ma sœur.", ["C'est sur le mur.", "C'est à midi."], Q_HINT],
  ["Which answer fits “Comment t'appelles-tu?”", "Je m'appelle Sofia.", ["J'ai dix ans.", "J'habite ici."], Q_HINT],
  ["Which answer fits “Pourquoi étudies-tu le français?”", "Parce que j'aime les langues.", ["Le lundi matin.", "Avec mon ami."], WHY_HINT],
  ["Which answer fits “Quand commence le film?”", "À sept heures.", ["Dans la salle.", "Mon frère."], Q_HINT],
  ["Which answer fits “Où est ton sac?”", "Il est sous la chaise.", ["Il est rouge.", "Parce qu'il est lourd."], Q_HINT],
  ["How do you ask “Where do you live?”", "Où habites-tu?", ["Qui habites-tu?", "Combien habites-tu?"], Q_HINT],
  ["How do you ask “How are you?”", "Comment vas-tu?", ["Combien vas-tu?", "Pourquoi vas-tu?"], Q_HINT],
  ["How do you ask “How many pencils do you have?”", "Combien de crayons as-tu?", ["Quand de crayons as-tu?", "Où de crayons as-tu?"], Q_HINT],
  ["Which question asks about a person?", "Qui est ton professeur?", ["Où est ton professeur?", "Quand est ton professeur?"], Q_HINT],
  ["Which question asks about a place?", "Où est la bibliothèque?", ["Qui est la bibliothèque?", "Combien est la bibliothèque?"], Q_HINT],
];

const HOBBY_HINT = "For sports and games we say jouer à (au hockey, à la balle). For instruments we say jouer de (de la guitare). Many activities use faire: faire du vélo, faire de la natation.";

export const HOBBIES_DEEP: FrItem[] = [
  ["Complète : Je joue ___ tennis.", "au", ["du", "de la"], HOBBY_HINT],
  ["Complète : Elle joue ___ trompette.", "de la", ["au", "à la"], HOBBY_HINT],
  ["Complète : Nous jouons ___ échecs.", "aux", ["au", "de la"], "“Jouer aux échecs” uses “aux” because échecs is plural: à + les = aux."],
  ["Complète : Il joue ___ saxophone.", "du", ["au", "à la"], HOBBY_HINT],
  ["Complète : Je fais ___ camping avec ma famille.", "du", ["de la", "au"], HOBBY_HINT],
  ["Complète : Elle fait ___ gymnastique.", "de la", ["du", "au"], HOBBY_HINT],
  ["Complète : Tu joues ___ baseball?", "au", ["du", "de la"], HOBBY_HINT],
  ["Complète : Ils font ___ judo.", "du", ["de la", "au"], HOBBY_HINT],
  ["How do you say “I play the guitar”?", "Je joue de la guitare.", ["Je joue à la guitare.", "Je fais de la guitare."], HOBBY_HINT],
  ["How do you say “She plays hockey”?", "Elle joue au hockey.", ["Elle joue du hockey.", "Elle fait au hockey."], HOBBY_HINT],
  ["How do you say “I go cycling”?", "Je fais du vélo.", ["Je joue au vélo.", "Je fais de vélo."], HOBBY_HINT],
  ["How do you say “We like to draw”?", "Nous aimons dessiner.", ["Nous aimez dessiner.", "Nous aime dessiner."], HOBBY_HINT],
  ["What does “Il joue du violoncelle” mean?", "He plays the cello", ["He plays soccer", "He builds a boat"], HOBBY_HINT],
  ["What does “Nous faisons de la randonnée” mean?", "We go hiking", ["We play cards", "We go swimming"], HOBBY_HINT],
  ["What does “Elle aime jouer aux jeux vidéo” mean?", "She likes to play video games", ["She likes to watch movies", "She likes to build models"], HOBBY_HINT],
  ["Which hobby is “la photographie”?", "photography", ["gardening", "skating"], HOBBY_HINT],
  ["Which hobby is “le jardinage”?", "gardening", ["painting", "dancing"], HOBBY_HINT],
  ["Which hobby is “la randonnée”?", "hiking", ["cooking", "reading"], HOBBY_HINT],
];

const BECAUSE_HINT = "“Parce que” (because) introduces a reason: J'aime l'été parce qu'il fait chaud.";
const ELIDE_HINT = "Before il, elle, on, un and une, “parce que” becomes “parce qu'”.";

export const BECAUSE_DEEP: FrItem[] = [
  ["Which reason fits: “J'aime la plage…”?", "parce qu'on peut nager", ["parce que c'est lundi", "parce que j'ai un stylo"], BECAUSE_HINT],
  ["Which reason fits: “Je range ma chambre…”?", "parce que c'est en désordre", ["parce que j'ai un chat", "parce qu'il est midi"], BECAUSE_HINT],
  ["Which reason fits: “Je me dépêche…”?", "parce que je suis en retard", ["parce que j'aime le chocolat", "parce que c'est vert"], BECAUSE_HINT],
  ["Which reason fits: “J'aime les animaux…”?", "parce qu'ils sont mignons", ["parce qu'il est trois heures", "parce que c'est fermé"], BECAUSE_HINT],
  ["Which reason fits: “Je bois de l'eau…”?", "parce que j'ai soif", ["parce que j'ai sommeil", "parce que je suis fâché"], BECAUSE_HINT],
  ["Which reason fits: “Il met un chapeau…”?", "parce qu'il fait soleil", ["parce que c'est un livre", "parce qu'il a deux frères"], BECAUSE_HINT],
  ["Complète : Je souris ___ je suis content.", "parce que", ["pourquoi", "parce qu'"], BECAUSE_HINT],
  ["Complète : Il dort ___ il est fatigué.", "parce qu'", ["parce que", "pourquoi"], ELIDE_HINT],
  ["Complète : Elle étudie ___ elle a un examen.", "parce qu'", ["parce que", "pourquoi"], ELIDE_HINT],
  ["Complète : Nous restons à l'intérieur ___ il pleut.", "parce qu'", ["parce que", "pourquoi"], ELIDE_HINT],
  ["Complète : Je prends mon parapluie ___ la pluie tombe.", "parce que", ["pourquoi", "parce qu'"], "Before a word that starts with a consonant sound, such as “la”, we keep “parce que”."],
  ["What does “J'aime le sport parce que c'est amusant” mean?", "I like sports because they are fun", ["I like sports with my friends", "I play sports at school"], BECAUSE_HINT],
  ["What does “Il est triste parce que son ami part” mean?", "He is sad because his friend is leaving", ["His friend is sad because he is leaving", "He leaves with his friend"], BECAUSE_HINT],
  ["What does “Je mets mes bottes parce qu'il y a de la boue” mean?", "I put on my boots because there is mud", ["I walk in the mud with my friend", "I have muddy boots"], BECAUSE_HINT],
  ["How do you say “I like cats because they are soft”?", "J'aime les chats parce qu'ils sont doux.", ["J'aime les chats pourquoi ils sont doux.", "J'aime les chats parce ils sont doux."], BECAUSE_HINT],
  ["How do you say “I am happy because it is Friday”?", "Je suis content parce que c'est vendredi.", ["Je suis content pourquoi c'est vendredi.", "Je suis content parce c'est vendredi."], BECAUSE_HINT],
  ["Which sentence gives a reason?", "Nous mangeons parce que nous avons faim.", ["Nous mangeons à midi.", "Nous avons faim."], BECAUSE_HINT],
  ["Which question asks for a reason?", "Pourquoi es-tu content?", ["Quand es-tu content?", "Où es-tu content?"], "“Pourquoi” means why, and it asks for a reason."],
];

const STATE_HINT = "In French we “have” many feelings and states: j'ai faim (I'm hungry), j'ai froid (I'm cold). We use “être” for others: je suis content.";

export const STATES_DEEP: FrItem[] = [
  ["How do you say “We are hungry”?", "Nous avons faim.", ["Nous sommes faim.", "Nous faim."], STATE_HINT],
  ["How do you say “She is thirsty”?", "Elle a soif.", ["Elle est soif.", "Elle soif."], STATE_HINT],
  ["How do you say “They are hot”?", "Ils ont chaud.", ["Ils sont chaud.", "Ils chaud."], STATE_HINT],
  ["How do you say “He is sleepy”?", "Il a sommeil.", ["Il est sommeil.", "Il sommeil."], STATE_HINT],
  ["How do you say “She is happy”?", "Elle est heureuse.", ["Elle a heureuse.", "Elle heureuse."], STATE_HINT],
  ["How do you say “They are tired”? (girls)", "Elles sont fatiguées.", ["Elles ont fatiguées.", "Elle est fatiguée."], STATE_HINT],
  ["How do you say “I am eleven years old”?", "J'ai onze ans.", ["Je suis onze ans.", "Je onze ans."], "In French we “have” our age: j'ai onze ans."],
  ["How do you say “You are wrong”?", "Tu as tort.", ["Tu es tort.", "Tu tort."], "In French we “have” wrong: tu as tort. And we “have” right: j'ai raison."],
  ["What does “Il a froid aux mains” mean?", "His hands are cold", ["His hands are hot", "His hands hurt"], STATE_HINT],
  ["What does “Elle a mal au dos” mean?", "She has a sore back", ["She has a sore throat", "She has a headache"], "“Avoir mal à…” means to have pain in a part of the body."],
  ["What does “Nous avons peur de l'orage” mean?", "We are afraid of the storm", ["We are happy about the storm", "We are tired of the storm"], STATE_HINT],
  ["What does “Je suis timide” mean?", "I am shy", ["I am excited", "I am hungry"], STATE_HINT],
  ["What does “Ils sont excités” mean?", "They are excited", ["They are cold", "They are afraid"], STATE_HINT],
  ["Which sentence means “I am lucky”?", "J'ai de la chance.", ["Je suis de la chance.", "Je chance."], "In French we “have luck”: j'ai de la chance."],
  ["Which sentence means “They are afraid”?", "Ils ont peur.", ["Ils sont peur.", "Il a peur."], STATE_HINT],
  ["Which sentence means “You are sleepy”?", "Tu as sommeil.", ["Tu es sommeil.", "Tu sommeil."], STATE_HINT],
  ["Which word means “excited”?", "excité", ["fatigué", "triste"], STATE_HINT],
  ["Which word means “shy”?", "timide", ["content", "surpris"], STATE_HINT],
  ["Which word means “surprised”?", "surpris", ["fâché", "fatigué"], STATE_HINT],
];

const FAM_HINT = "“Mon, ma, mes” (my) agree with the thing owned: mon frère, ma sœur, mes parents. “Son, sa, ses” mean his or her.";

export const FAMILY_DEEP: FrItem[] = [
  ["Complète : Voici ___ grand-mère. (my grandmother)", "ma", ["mon", "mes"], FAM_HINT],
  ["Complète : Voici ___ grands-parents. (my grandparents)", "mes", ["mon", "ma"], FAM_HINT],
  ["Complète : Voici ___ ami Théo. (my friend)", "mon", ["ma", "mes"], "Before a vowel sound we use “mon”, even for a feminine noun: mon amie."],
  ["Complète : Voici ___ amie Inès. (my friend, a girl)", "mon", ["ma", "mes"], "Before a vowel sound we use “mon”, even for a feminine noun: mon amie."],
  ["Complète : Tu aimes ___ frère? (your brother)", "ton", ["ta", "tes"], FAM_HINT],
  ["Complète : Tu aimes ___ sœur? (your sister)", "ta", ["ton", "tes"], FAM_HINT],
  ["Complète : Tu aimes ___ cousins? (your cousins)", "tes", ["ton", "ta"], FAM_HINT],
  ["Complète : Omar aime ___ grand-mère. (his grandmother)", "sa", ["son", "ses"], FAM_HINT],
  ["Complète : Chloé aime ___ parents. (her parents)", "ses", ["son", "sa"], FAM_HINT],
  ["Complète : Nous aimons ___ voisins. (our neighbours)", "nos", ["notre", "mes"], "“Notre” is for one thing and “nos” is for many: notre école, nos amis."],
  ["Complète : Nous aimons ___ équipe. (our team)", "notre", ["nos", "mes"], "“Notre” is for one thing and “nos” is for many: notre école, nos amis."],
  ["Complète : Les élèves aiment ___ professeure. (their teacher)", "leur", ["leurs", "nos"], "“Leur” is for one thing and “leurs” is for many: leur école, leurs amis."],
  ["Complète : Les filles aiment ___ chiens. (their dogs)", "leurs", ["leur", "notre"], "“Leur” is for one thing and “leurs” is for many: leur école, leurs amis."],
  ["What is “un demi-frère”?", "a half-brother", ["a cousin", "a grandfather"], FAM_HINT],
  ["What is “une belle-mère”?", "a stepmother", ["a grandmother", "an aunt"], FAM_HINT],
  ["What is “un neveu”?", "a nephew", ["an uncle", "a grandson"], FAM_HINT],
  ["How do you say “my uncle”?", "mon oncle", ["ma oncle", "mes oncle"], FAM_HINT],
  ["How do you say “her aunt”?", "sa tante", ["son tante", "ses tante"], FAM_HINT],
  ["How do you say “my older sister”?", "ma grande sœur", ["mon grande sœur", "mes grande sœur"], FAM_HINT],
  ["How do you say “our family”?", "notre famille", ["nos famille", "ma famille nous"], "“Notre” is for one thing and “nos” is for many: notre famille, nos parents."],
];
