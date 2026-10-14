import { lesson, type GradeLessons } from "./index";

export const lessons: GradeLessons = {
  "immersion/registres-de-langue": lesson(
    ["Familier: relaxed words with friends: « pote », « la trouille ».", "Courant: everyday correct French: « ami », « peur ».", "Soutenu: careful, formal French for a speech or a formal letter."],
    "Comment dit-on « ami » en langue familière?",
    ["Familiar words are what friends say to each other.", "A familiar word for « ami » is « pote »."],
    "pote",
  ),
  "immersion/communication-verbale": lesson(
    ["Verbal communication is your words and your voice: tone, volume, speed.", "Non-verbal communication is your body: posture, gestures, facial expressions.", "Match your voice to the topic: soft and slow for a sad topic, lively for an exciting one."],
    "Ravi se tient droit, les épaules détendues. Quel type de communication est-ce?",
    ["Standing straight is about the body, not words.", "Body language is non-verbal."],
    "De la communication non verbale",
  ),
  "immersion/legende": lesson(
    ["A legend often explains something in nature: why an owl comes out at night, why a lake sings.", "Find the main character, the triggering event and the transformation.", "The ending often explains how things are today."],
    "Tarek lance un caillou dans l'eau. Soudain, le lac se met à chanter. Quelle est la transformation?",
    ["The triggering event is the stone thrown in the water.", "What changes in a magical way? The lake starts to sing."],
    "Le lac se met à chanter",
  ),
  "immersion/theatre": lesson(
    ["In a play, each line (« réplique ») starts with the name of the character who speaks.", "Stage directions (« didascalies ») tell how a character moves or speaks; they are not read aloud.", "The hero wants something; the « opposant » blocks the way; an « adjuvant » helps."],
    "Pourquoi chaque réplique commence-t-elle par un nom comme « LENA »?",
    ["A play has no « dit-elle ».", "The name shows who is speaking."],
    "Pour indiquer quel personnage parle",
  ),
  "immersion/schema-narratif": lesson(
    ["Situation initiale: how things are at the start.", "Élément déclencheur: a problem appears. Péripéties: the actions to solve it.", "Dénouement: the problem is solved. Situation finale: how things are now."],
    "« Noa nage, grimpe sur un rocher, puis appelle à l'aide. » De quelle étape s'agit-il?",
    ["Noa is acting to solve his problem.", "The problem is not solved yet."],
    "Les péripéties",
  ),
  "immersion/structure-des-textes": lesson(
    ["An introduction presents the topic; the body gives ideas or arguments; the conclusion sums up.", "An informative text explains; an argument text tries to convince.", "A counter-argument shows you know other opinions, then you answer it."],
    "Que fait la conclusion d'un texte informatif?",
    ["The conclusion comes at the end.", "It brings together the main points."],
    "Elle résume l'essentiel",
  ),
  "immersion/point-virgule-et-guillemets": lesson(
    ["A semicolon « ; » joins two closely linked sentences: « Il pleut; nous restons ici. »", "Guillemets frame someone's exact words, often after a colon: « Léa a dit : … »", "A quotation from a book needs its source: author and year."],
    "Quelle phrase utilise correctement le point-virgule? « Il pleut beaucoup; nous restons à la maison. » ou « Il; pleut beaucoup. »",
    ["The semicolon must join two complete sentences.", "« Il pleut beaucoup » and « nous restons à la maison » are both complete."],
    "Il pleut beaucoup; nous restons à la maison.",
  ),
  "immersion/subordonnees-relatives": lesson(
    ["A relative clause adds information about a noun and starts with « qui », « que » or « où ».", "« qui » is followed by a verb; « que » is followed by a subject; « où » is for a place or time.", "The clause runs from the pronoun to the end of its verb group."],
    "Quelle est la subordonnée relative? « Le garçon qui joue du piano est mon cousin. »",
    ["Find the relative pronoun: « qui ».", "The clause tells more about « le garçon »."],
    "qui joue du piano",
  ),
  "immersion/accord-du-participe": lesson(
    ["With « être », the past participle agrees with the subject: « Léo et Samir sont venus ».", "With « avoir », it agrees only with a direct object placed before it: « les chansons que nous avons chantées ».", "Add « -e » for feminine and « -s » for plural."],
    "Complète : Anna et Léa se sont ___ à la bibliothèque. (rencontrer)",
    ["« se sont » uses « être », and they met each other.", "Anna and Léa: feminine plural, so « -ées »."],
    "rencontrées",
  ),
  "immersion/complements": lesson(
    ["The direct object answers « qui? » or « quoi? » right after the verb: « Léa mange une pomme ».", "The indirect object answers « à qui? » or « de quoi? »: « Il parle à son ami ».", "A « complément circonstanciel » tells where, when or how, and can often be moved."],
    "Dans « Léa mange une pomme dans le parc », « dans le parc » est un complément…",
    ["It answers « où? ».", "It can move: « Dans le parc, Léa mange une pomme »."],
    "circonstanciel de lieu",
  ),
  "immersion/futur-et-conditionnel": lesson(
    ["Futur simple: infinitive + « -ai, -as, -a, -ons, -ez, -ont »: « je finirai ».", "Some verbs change their stem: « aller » → « ir- », « voir » → « verr- », « pouvoir » → « pourr- ».", "Conditionnel: future stem + imparfait endings, for polite requests: « Pourriez-vous… ? »"],
    "Complète : L'été prochain, nous ___ à la mer. (aller)",
    ["« L'été prochain » means the future: futur simple.", "The stem of « aller » is « ir- », plus « -ons »."],
    "irons",
  ),
  "immersion/sk-imm8-diversite": lesson(
    ["Many Inuit live in the North, in places like Nunavut.", "First Nations are Indigenous peoples of Canada, distinct from the Inuit and the Métis. Each Nation has its own language and history.", "Francophone communities live across Canada, such as the Fransaskois in Saskatchewan."],
    "Que veut dire « Premières Nations »?",
    ["There are three groups of Indigenous peoples in Canada.", "First Nations are distinct from the Inuit and the Métis."],
    "des peuples autochtones du Canada, distincts des Inuits et des Métis",
  ),
};
