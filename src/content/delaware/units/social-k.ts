import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Delaware Kindergarten social studies: major people, events and symbols of the United States and Delaware
// (H.4.K-3.b), such as the flag, the bald eagle and the Pledge of Allegiance, and that positions of authority carry
// responsibilities (C.1.K-3.b), with Delaware's own flag and symbols and the leaders children meet.

const FLAG: Q[] = [
  ["Our country is the…", "United States", ["Delaware", "Delaware Bay", "Dover"], "Delaware is our state."],
  ["Our state is…", "Delaware", ["the United States", "the Atlantic Ocean", "the moon"], "Our state is in our country."],
  ["The American flag has red and white…", "stripes", ["circles", "triangles", "hearts"], "There are 13 of them."],
  ["The American flag has white stars on…", "blue", ["green", "orange", "pink"], "Look at the top corner."],
  ["How many stars are on the American flag?", "50", ["13", "5", "100"], "One star for each state."],
  ["Each star on the flag stands for a…", "state", ["city", "river", "school"], "Delaware has a star too."],
  ["The flag is a symbol of our…", "country", ["school bus", "lunch", "toys"], "It stands for the United States."],
  ["We say the Pledge of Allegiance to the…", "flag", ["bus", "teacher", "river"], "We stand and face it."],
  ["What colors are on the American flag?", "red, white and blue", ["green and yellow", "pink and purple", "black and orange"], "Think of the stars and stripes."],
  ["Where do you often see the flag?", "at school", ["in the bathtub", "in a sandwich", "in a sock"], "Many schools fly it outside."],
  ["Delaware's flag is blue with a tan shape called a…", "diamond", ["circle", "star", "heart"], "It has four sides and points."],
  ["Delaware's state bird is a kind of chicken. It is the Blue…", "Hen", ["Jay", "Whale", "Moon"], "Soldiers long ago were named for it."],
  ["Delaware's state flower is pink. It grows on a…", "peach tree", ["cactus", "pine tree", "seaweed"], "Delaware once grew lots of peaches."],
  ["Delaware's state tree has shiny green leaves and red berries. It is the…", "American holly", ["palm", "banana", "cactus"], "Its leaves stay green in winter."],
  ["Delaware's nickname is the First…", "State", ["Ocean", "Desert", "Sock"], "Delaware was the first state to join."],
  ["Who leads our classroom?", "the teacher", ["the bus", "a puppy", "the lunch box"], "Teachers help us learn."],
  ["Who leads our whole school?", "the principal", ["the governor", "a pilot", "a baker"], "The principal helps everyone at school."],
  ["Who leads our whole state?", "the governor", ["a pirate", "a clown", "a dentist"], "Voters choose the governor."],
  ["We stand up when we say the Pledge because we show…", "respect", ["we are sleepy", "it is lunch", "we are cold"], "Standing shows we care."],
  ["The flag goes up the pole in the…", "morning", ["middle of the night", "bathtub", "sandbox"], "Many schools raise it each day."],
  ["Delaware's state bug is red with black spots. It is the…", "ladybug", ["bee", "ant", "fly"], "Ladybugs eat tiny bugs in gardens.", true],
  ["This old sea animal has a hard shell and a long tail. It is the horseshoe…", "crab", ["cat", "dog", "bird"], "It crawls onto Delaware's beaches in spring.", true],
  ["The stripes on the flag stand for the first 13…", "colonies", ["rivers", "presidents", "flowers"], "The colonies became states. Delaware was one of them.", true],
  ["Dover is the capital of…", "Delaware", ["the moon", "the ocean", "the sun"], "State leaders work there.", true],
  ["The bald eagle is a symbol of the…", "United States", ["moon", "ocean", "winter"], "It is our national bird.", true],
  ["A flag is a symbol. A symbol is something that…", "stands for something else", ["is good to eat", "makes noise", "is a toy"], "The flag stands for our country.", true],
  ["On Delaware Day in December, we remember Delaware became the first…", "state", ["school", "farm", "boat"], "It joined the United States first.", true],
];

export const SOCIAL_K: Unit[] = [
  bankUnit({
    id: "de-k-flag-and-state",
    title: "Our Flag & Our State",
    emoji: "🇺🇸",
    blurb: "The American flag and Delaware's symbols",
    parentNote: "The American flag as a symbol of the United States (its stars and stripes and the Pledge of Allegiance), Delaware as our state, with its flag and a few of its symbols (the Blue Hen, the peach blossom, the American holly, the ladybug and the First State), and the leaders children meet, from teachers and principals to the governor.",
    standards: ["H.4.K-3.b; C.1.K-3.b", "major people, events and symbols of the United States and Delaware, and the responsibilities that come with positions of authority"],
    items: FLAG,
  }),
];
