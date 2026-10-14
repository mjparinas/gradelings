import { lesson, type GradeLessons } from "./index";

export const lessons: GradeLessons = {
  "immersion/superlatif": lesson(
    ["The superlative says the most or the least: « le plus », « la moins », « les plus ».", "Match « le », « la » or « les » to the noun: « les plus lourds » for plural.", "With an adverb, use « le »: « le plus vite ». « bien » becomes « le mieux »."],
    "Complète : Ces sacs sont ___ lourds de tous.",
    ["« ces sacs » is plural.", "The most heavy, plural: « les plus »."],
    "les plus",
  ),
  "immersion/concordance-des-temps": lesson(
    ["Imparfait: background, habits and descriptions in the past (« je dormais »).", "Passé composé: one finished action (« un éclair a traversé »).", "Futur simple: what will happen (« vous visiterez »). Clue words like « demain » or « soudain » help."],
    "Complète : Pendant que nous mangions, le chien ___ sous la table. (dormir)",
    ["« Pendant que » shows two things going on at the same time.", "It's background: imparfait."],
    "dormait",
  ),
  "immersion/figures-de-style": lesson(
    ["Comparaison: compares with « comme »: « légère comme une plume ».", "Métaphore: compares without « comme »: « ses yeux sont des étoiles ».", "Personnification gives human actions to a thing. Hyperbole exaggerates: « une montagne de devoirs »."],
    "« Ce sac pèse une tonne. » est une…",
    ["A school bag can't really weigh a tonne.", "It's a big exaggeration."],
    "hyperbole",
  ),
  "immersion/poesie": lesson(
    ["A poem is made of lines (« vers ») grouped in stanzas (« strophes »).", "Rhymes are words that end with the same sound, like « or » and « dehors ».", "Poets use images: « un tapis d'or » can mean golden leaves on the ground."],
    "« Le vent chante dans les arbres. » Quelle figure de style est utilisée?",
    ["Wind can't really sing.", "A human action is given to a thing."],
    "Une personnification",
  ),
  "immersion/paragraphe-argumentatif": lesson(
    ["An argument paragraph starts with an opinion, then gives reasons (« arguments »).", "Each reason is backed by an example. « De plus » or « ensuite » adds another reason.", "The conclusion repeats the opinion in new words: « Bref », « En conclusion »."],
    "Quel mot ajoute un deuxième argument? « De plus » ou « Par exemple »",
    ["« Par exemple » gives an example.", "« De plus » adds another reason."],
    "De plus",
  ),
  "immersion/inferences-et-themes": lesson(
    ["An inference is something you figure out from clues: the text doesn't say it.", "Look at what a character does and how they act to find their feelings.", "The theme is the big lesson of the story, like courage or friendship."],
    "Amir regarde l'horloge, tape du pied et mordille son crayon. Comment se sent-il?",
    ["Watching the clock and tapping a foot are clues.", "He is waiting for something and can't relax."],
    "Il est impatient ou nerveux",
  ),
  "immersion/portrait-de-personnage": lesson(
    ["Physical traits describe how someone looks: « blond », « grand ».", "Psychological traits describe personality: « curieux », « timide », « généreux ».", "Ask: can I see it in a photo? If yes, it's physical."],
    "Quel mot décrit un trait psychologique? « curieux » ou « roux »",
    ["You can see red hair (« roux ») in a photo.", "Curiosity is part of personality."],
    "curieux",
  ),
};
