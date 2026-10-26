import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Mississippi Kindergarten social studies, Citizenship at Home and School: the symbols and celebrations of Mississippi
// and the United States (K.H.1), and Mississippi as a place on a map and globe (K.G.1, K.G.3).

const SYMBOLS: Q[] = [
  ["Our country is the…", "United States", ["Mississippi", "Jackson", "the Gulf"], "Mississippi is our state."],
  ["Our state is…", "Mississippi", ["the United States", "the moon", "a river"], "Our state is in our country."],
  ["The American flag has red and white…", "stripes", ["circles", "triangles", "hearts"], "There are 13 of them."],
  ["How many stars are on the American flag?", "50", ["13", "5", "100"], "One star for each state."],
  ["Each star on the flag stands for a…", "state", ["city", "lake", "school"], "Mississippi has a star too."],
  ["We say the Pledge of Allegiance to the…", "flag", ["bus", "teacher", "river"], "We stand and face it."],
  ["What colors are on the American flag?", "red, white and blue", ["green and yellow", "pink and purple", "black and orange"], "Think of the stars and stripes."],
  ["Mississippi's state flower is the…", "magnolia", ["cactus", "tulip", "seaweed"], "It is big and white and smells sweet."],
  ["Mississippi's flag has a big white flower. It is a…", "magnolia", ["sunflower", "rose", "daisy"], "It is also the state flower."],
  ["Mississippi's nickname is the Magnolia…", "State", ["Ocean", "Moon", "Sock"], "Magnolia trees grow all over the state."],
  ["Mississippi's state bird is the…", "mockingbird", ["penguin", "parrot", "ostrich"], "It can copy other birds' songs."],
  ["A mockingbird is famous for…", "copying other sounds", ["swimming deep", "living on ice", "having no wings"], "It sings many songs."],
  ["Mississippi's state land animal is the white-tailed…", "deer", ["shark", "whale", "camel"], "It lifts its white tail when it runs."],
  ["The big river on Mississippi's west side is the…", "Mississippi River", ["Nile", "Amazon", "Thames"], "Our state is named after it."],
  ["The capital city of Mississippi is…", "Jackson", ["Paris", "Tokyo", "London"], "State leaders work there."],
  ["We stand for the Pledge to show…", "respect", ["we are sleepy", "it is lunch", "we are cold"], "Standing shows we care."],
  ["Where do you often see the flag?", "at school", ["in the bathtub", "in a sandwich", "in a sock"], "Many schools fly it outside."],
  ["A globe is a model of the…", "Earth", ["moon", "sun", "school"], "It is round like our planet."],
  ["On a globe, blue shows…", "water", ["land", "roads", "houses"], "Oceans and rivers are blue."],
  ["Mississippi's state water animal is the bottlenose…", "dolphin", ["camel", "lion", "cow"], "It swims in the Gulf.", true],
  ["Mississippi's state insect is the…", "honeybee", ["ant", "fly", "moth"], "It makes honey.", true],
  ["The stripes on the flag stand for the first 13…", "colonies", ["lakes", "presidents", "flowers"], "The colonies became states.", true],
  ["The bald eagle is a symbol of the…", "United States", ["moon", "ocean", "winter"], "It is our national bird.", true],
  ["A flag is a symbol. A symbol stands for…", "something else", ["something to eat", "a noise", "a toy"], "The flag stands for our country.", true],
  ["On the Fourth of July, we celebrate our country's…", "birthday", ["first snow", "bedtime", "lunch"], "Fireworks light up the sky.", true],
  ["On Thanksgiving, many families share a…", "meal", ["bath", "nap", "bus ride"], "People give thanks together.", true],
];

export const SOCIAL_K: Unit[] = [
  bankUnit({
    id: "ms-k-symbols",
    title: "Mississippi & Our Flag",
    emoji: "🌸",
    blurb: "The flag, the magnolia and other symbols we share.",
    parentNote:
      "Practices the symbols and celebrations of Mississippi and the United States: the American flag and the Pledge, Mississippi's magnolia flag, flower and nickname, its state bird and animals, and its capital, Jackson.",
    standards: ["K.H.1; K.G.3", "symbols, customs and celebrations of Mississippi and the United States, and the globe as a model of Earth"],
    items: SYMBOLS,
  }),
];
