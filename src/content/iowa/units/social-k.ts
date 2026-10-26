import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Iowa Kindergarten social studies, Me and My Community: rules in different places (SS.K.15), rules and
// responsibilities in Iowa compared with other states (SS.K.17) and in towns and counties across Iowa (SS.K.18), and
// the difference between buying and borrowing (SS.K.20), with Iowa as our state.

const RULES: Q[] = [
  ["At school we walk in the hall. At the park we can…", "run and play", ["sleep", "take a bath", "cook dinner"], "Different places have different rules."],
  ["At the library we use a…", "quiet voice", ["shouting voice", "whistle", "drum"], "People are reading there."],
  ["At the pool, a rule says…", "walk, don't run", ["jump on the chairs", "swim alone at night", "throw sand"], "Wet floors are slippery."],
  ["At home, a rule might be…", "put your toys away", ["never eat", "stay up all night", "draw on walls"], "Families make rules too."],
  ["Why do we have rules?", "to keep us safe and fair", ["to make us sad", "to stop all fun", "to make noise"], "Rules help us get along."],
  ["Our state is…", "Iowa", ["the moon", "a park", "a school"], "Iowa is one of the 50 states."],
  ["Iowa is a state in our country, the…", "United States", ["ocean", "sky", "moon"], "There are 50 states."],
  ["Every state has rules. A car seat rule keeps…", "children safe", ["cars clean", "dogs happy", "roads warm"], "Riding safely is a rule in every state."],
  ["In Iowa and other states, cars must stop at a…", "red light", ["green light", "tree", "puddle"], "Red means stop."],
  ["Some rules are the same in all states. Children go to…", "school", ["the moon", "work", "sea"], "Every state has schools."],
  ["Some rules are different in different states, like rules about…", "fireworks", ["breathing", "eating", "sleeping"], "Each state makes some of its own rules."],
  ["A town or city in Iowa makes rules for its…", "streets and parks", ["moon", "ocean", "sun"], "Towns care for their own places."],
  ["A town rule says dogs need a…", "leash in the park", ["hat", "bike", "phone"], "Leashes keep everyone safe."],
  ["Some towns let you ride bikes on the sidewalk. Others say…", "ride in the street", ["ride on the roof", "ride in the pool", "never ride"], "Rules can change from town to town."],
  ["On a farm, a rule might be…", "stay away from big tractors", ["feed cows candy", "sleep in the barn", "ride the pigs"], "Farms have big machines."],
  ["In a big city, people cross the street at the…", "crosswalk", ["middle of a block", "river", "rooftop"], "Look both ways first."],
  ["Who makes rules for a town?", "town leaders", ["a cat", "the wind", "a toy"], "Leaders like the mayor help."],
  ["When you borrow a book, you must…", "give it back", ["keep it forever", "throw it away", "sell it"], "Borrow means use it and return it."],
  ["When you buy a toy, you…", "pay money and keep it", ["give it back", "borrow it", "share it forever"], "Buying means it is yours."],
  ["We borrow books from the…", "library", ["bakery", "gas station", "zoo"], "Library books go back on time."],
  ["Iowa has many farms that grow…", "corn", ["bananas", "coconuts", "pineapples"], "Iowa grows a lot of corn."],
  ["Iowa's state bird is a small yellow bird, the…", "goldfinch", ["penguin", "parrot", "ostrich"], "It is bright yellow in summer."],
  ["Iowa's state flower is the wild prairie…", "rose", ["cactus", "tulip", "lily"], "It is pink and grows on the prairie."],
  ["Our classroom has a rule: raise your hand to…", "talk", ["run", "sleep", "eat"], "Then everyone gets a turn."],
  ["Iowa's capital city is…", "Des Moines", ["Paris", "Tokyo", "Cairo"], "State leaders work there.", true],
  ["Rules at school and at home are…", "sometimes different", ["always the same", "never real", "only for adults"], "Each place has its own rules.", true],
  ["A rule in one state but not another is a…", "state rule", ["world rule", "family rule", "game rule"], "Each state makes some laws.", true],
  ["Iowa sits between two big rivers, the Mississippi and the…", "Missouri", ["Nile", "Amazon", "Thames"], "One river is on each side.", true],
  ["You borrow a ball at recess. When the bell rings, you…", "put it back", ["take it home", "hide it", "throw it away"], "Borrowed things go back.", true],
  ["Iowa's flag has a big…", "eagle", ["fish", "moon", "cat"], "The eagle holds a ribbon.", true],
];

export const SOCIAL_K: Unit[] = [
  bankUnit({
    id: "ia-k-rules-here-and-there",
    title: "Rules Here & There",
    emoji: "🚦",
    blurb: "Rules at home, at school, in towns and in Iowa",
    parentNote: "How rules change from place to place (home, school, the library, the pool, a farm or a big city), rules that are the same in every state and rules that differ, rules a town makes for its streets and parks, buying compared with borrowing, and Iowa as our state, with a few of its symbols.",
    standards: ["SS.K.15; SS.K.17; SS.K.18; SS.K.20", "comparing rules in different places, in Iowa and other states, and in different parts of Iowa, and buying compared with borrowing"],
    items: RULES,
  }),
];
