import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Wyoming Kindergarten social studies: the symbols that honor the United States, including the flags of the Eastern
// Shoshone and Northern Arapaho, and the rules that schools, Tribes, communities and the country follow (SS2.1.1,
// SS2.1.2), with Wyoming's own flag and symbols and the leaders children meet.

const FLAG: Q[] = [
  ["Our country is the…", "United States", ["Wyoming", "Cheyenne", "Yellowstone"], "Wyoming is our state."],
  ["Our state is…", "Wyoming", ["the United States", "the Bighorn Mountains", "the moon"], "Our state is in our country."],
  ["The American flag has red and white…", "stripes", ["circles", "triangles", "hearts"], "There are 13 of them."],
  ["The American flag has white stars on…", "blue", ["green", "orange", "pink"], "Look at the top corner."],
  ["How many stars are on the American flag?", "50", ["13", "5", "100"], "One star for each state."],
  ["Each star on the flag stands for a…", "state", ["city", "river", "school"], "Wyoming has a star too."],
  ["The flag is a symbol of our…", "country", ["school bus", "lunch", "toys"], "It stands for the United States."],
  ["We say the Pledge of Allegiance to the…", "flag", ["bus", "teacher", "river"], "We stand and face it."],
  ["What colors are on the American flag?", "red, white and blue", ["green and yellow", "pink and purple", "black and orange"], "Think of the stars and stripes."],
  ["Where do you often see the flag?", "at school", ["in the bathtub", "in a sandwich", "in a sock"], "Many schools fly it outside."],
  ["Wyoming's flag has a big white animal on it. It is a…", "bison", ["fish", "rabbit", "cat"], "Bison are also called buffalo."],
  ["Wyoming's state bird sings a pretty song. It is the western…", "meadowlark", ["penguin", "parrot", "ostrich"], "It has a yellow chest."],
  ["Wyoming's state flower is red, like a brush dipped in paint. It is the Indian…", "paintbrush", ["tulip", "cactus", "seaweed"], "It grows in fields and mountains."],
  ["Wyoming's state animal is big and shaggy. It is the…", "bison", ["shark", "penguin", "zebra"], "Bison live in Yellowstone."],
  ["The Eastern Shoshone and Northern Arapaho Tribes each have their own…", "flag", ["ocean", "moon", "volcano"], "Their flags fly on the Wind River Reservation."],
  ["Who leads our classroom?", "the teacher", ["the bus", "a puppy", "the lunch box"], "Teachers help us learn."],
  ["Who leads our whole school?", "the principal", ["the governor", "a pilot", "a baker"], "The principal helps everyone at school."],
  ["Who leads our whole state?", "the governor", ["a pirate", "a clown", "a dentist"], "Voters choose the governor."],
  ["We stand up when we say the Pledge because we show…", "respect", ["we are sleepy", "it is lunch", "we are cold"], "Standing shows we care."],
  ["A rule at school is to…", "take turns", ["run in the halls", "shout at friends", "throw sand"], "Rules keep us safe and fair."],
  ["Rules for the whole country are called…", "laws", ["snacks", "games", "songs"], "Everyone follows the laws."],
  ["Why do we have rules?", "to keep us safe and be fair", ["to make us sad", "to waste time", "to stop all fun"], "Rules help everyone get along."],
  ["Wyoming's state dinosaur had three horns. It is the…", "Triceratops", ["T. rex", "Stegosaurus", "Brachiosaurus"], "Its fossils were found in Wyoming.", true],
  ["Cheyenne is the capital of…", "Wyoming", ["the moon", "the ocean", "the sun"], "State leaders work there.", true],
  ["The bald eagle is a symbol of the…", "United States", ["moon", "ocean", "winter"], "It is our national bird.", true],
  ["A flag is a symbol. A symbol is something that…", "stands for something else", ["is good to eat", "makes noise", "is a toy"], "The flag stands for our country.", true],
  ["The stripes on the flag stand for the first 13…", "colonies", ["rivers", "presidents", "flowers"], "The colonies became the first states.", true],
  ["A cowboy on a bucking horse is a symbol you see on Wyoming's…", "license plates", ["mountains", "rivers", "clouds"], "It is a famous Wyoming picture.", true],
];

export const SOCIAL_K: Unit[] = [
  bankUnit({
    id: "wy-k-flag-and-state",
    title: "Our Flag & Our State",
    emoji: "🇺🇸",
    blurb: "The American flag and Wyoming's symbols",
    parentNote: "The American flag as a symbol of the United States (its stars and stripes and the Pledge of Allegiance), Wyoming as our state, with its flag and a few of its symbols (the bison, the western meadowlark, the Indian paintbrush and the bucking horse), the flags of the Eastern Shoshone and Northern Arapaho, why we have rules and laws, and the leaders children meet, from teachers and principals to the governor.",
    standards: ["SS2.1.1; SS2.1.2; SS2.1.4", "the rules schools, Tribes, communities and the country follow, called laws, and the symbols that honor the United States, including Tribal flags"],
    items: FLAG,
  }),
];
