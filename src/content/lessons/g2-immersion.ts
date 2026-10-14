import { lesson, type GradeLessons } from "./index";

export const lessons: GradeLessons = {
  "immersion/le-la-un-une": lesson(
    ["Every French noun is masculine or feminine.", "Use « le » or « un » with a masculine noun: « le ballon », « un ballon ».", "Use « la » or « une » with a feminine noun: « la table », « une pomme »."],
    "Complète : ___ tortue (le, la)",
    ["« tortue » is feminine: we say « une tortue ».", "Feminine nouns take « la »."],
    "la",
  ),
  "immersion/accord-des-adjectifs": lesson(
    ["An adjective describes a noun.", "With a feminine noun, many adjectives add « -e »: « petit » becomes « petite ».", "Find the noun first, then pick the adjective that matches it."],
    "Complète : Une souris ___. (petit, petite)",
    ["« une souris » is feminine.", "Add « -e » to « petit »."],
    "petite",
  ),
  "immersion/ordre-des-mots": lesson(
    ["A French sentence often goes: who, then the action, then the rest.", "« Léa » (who) + « mange » (action) + « une pomme » (what).", "Read each choice aloud; the right one sounds natural."],
    "Quelle phrase est dans le bon ordre? « Boit Zoé lait du. » ou « Zoé boit du lait. »",
    ["Who? Zoé. Action? boit. What? du lait.", "Zoé + boit + du lait."],
    "Zoé boit du lait.",
  ),
  "immersion/les-contes": lesson(
    ["A tale often starts with « Il était une fois… ».", "In tales, animals can talk and magic can happen.", "The character has a problem and looks for a solution."],
    "Dans « Boucle d'or et les trois ours », combien d'ours y a-t-il?",
    ["Look at the title: « les trois ours ».", "« trois » means three."],
    "trois",
  ),
  "immersion/dabord-ensuite-enfin": lesson(
    ["Order words: « d'abord » (first), « ensuite » (next), « enfin » (last).", "Time words: « hier » (yesterday), « aujourd'hui » (today), « demain » (tomorrow).", "Place words: « près » (near) and « loin » (far)."],
    "Complète : D'abord, je mets mes bottes. ___, je sors.",
    ["Putting on boots comes first.", "Going out comes next: « ensuite »."],
    "Ensuite",
  ),
  "immersion/etre-et-avoir": lesson(
    ["« être » (to be): je suis, tu es, il est, nous sommes, vous êtes, ils sont.", "« avoir » (to have): j'ai, tu as, il a, nous avons, vous avez, ils ont.", "Find the subject first, then choose its form."],
    "Complète : Nous ___ à la maison. (sommes, avons)",
    ["We are at home: that is « être ».", "With « nous », « être » is « sommes »."],
    "sommes",
  ),
};
