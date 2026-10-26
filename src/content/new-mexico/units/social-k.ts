import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// New Mexico Kindergarten social studies: local, state and national symbols such as the flag, bird and song (K.10), and
// community leaders, from the teacher and principal to the mayor and Tribal leaders (K.12), with the American flag and
// New Mexico's own flag and symbols.

const FLAG: Q[] = [
  ["Our country is the…", "United States", ["New Mexico", "the Rio Grande", "Santa Fe"], "New Mexico is our state."],
  ["Our state is…", "New Mexico", ["the United States", "the Rio Grande", "the moon"], "Our state is in our country."],
  ["The American flag has red and white…", "stripes", ["circles", "triangles", "hearts"], "There are 13 of them."],
  ["The American flag has white stars on…", "blue", ["green", "orange", "pink"], "Look at the top corner."],
  ["How many stars are on the American flag?", "50", ["13", "5", "100"], "One star for each state."],
  ["Each star on the flag stands for a…", "state", ["city", "river", "school"], "New Mexico has a star too."],
  ["The flag is a symbol of our…", "country", ["school bus", "lunch", "toys"], "It stands for the United States."],
  ["We say the Pledge of Allegiance to the…", "flag", ["bus", "teacher", "river"], "We stand and face it."],
  ["What colors are on the American flag?", "red, white and blue", ["green and yellow", "pink and purple", "black and orange"], "Think of the stars and stripes."],
  ["Where do you often see the flag?", "at school", ["in the bathtub", "in a sandwich", "in a sock"], "Many schools fly it outside."],
  ["New Mexico's flag is yellow with a red…", "sun symbol", ["fish", "heart", "car"], "The sun symbol comes from Zia Pueblo."],
  ["New Mexico's state bird runs fast across the desert. It is the…", "roadrunner", ["penguin", "parrot", "ostrich"], "It would rather run than fly."],
  ["New Mexico's state flower is the…", "yucca", ["rose", "tulip", "seaweed"], "It has sharp leaves and white flowers."],
  ["New Mexico's state animal is the black…", "bear", ["shark", "whale", "penguin"], "It lives in the mountain forests."],
  ["New Mexico's nickname is the Land of…", "Enchantment", ["Ice", "Oceans", "Socks"], "Enchantment means magic and wonder."],
  ["Who leads our classroom?", "the teacher", ["the bus", "a puppy", "the lunch box"], "Teachers help us learn."],
  ["Who leads our whole school?", "the principal", ["the mayor", "a pilot", "a baker"], "The principal helps everyone at school."],
  ["Who leads many towns and cities?", "a mayor", ["a pirate", "a clown", "a dentist"], "Voters choose the mayor."],
  ["We stand up when we say the Pledge because we show…", "respect", ["we are sleepy", "it is lunch", "we are cold"], "Standing shows we care."],
  ["The flag goes up the pole in the…", "morning", ["middle of the night", "bathtub", "sandbox"], "Many schools raise it each day."],
  ["Many Pueblos in New Mexico choose a leader called a…", "governor", ["captain", "coach", "chef"], "Tribal nations have their own leaders.", true],
  ["New Mexico's state tree is the piñon…", "pine", ["palm", "banana", "apple"], "Its nuts are good to eat.", true],
  ["The stripes on the flag stand for the first 13…", "colonies", ["rivers", "presidents", "flowers"], "The colonies became states.", true],
  ["Santa Fe is the capital of…", "New Mexico", ["the moon", "the ocean", "Canada"], "State leaders work there.", true],
  ["The bald eagle is a symbol of the…", "United States", ["moon", "ocean", "winter"], "It is our national bird.", true],
  ["A flag is a symbol. A symbol is something that…", "stands for something else", ["is good to eat", "makes noise", "is a toy"], "The flag stands for our country.", true],
  ["New Mexico's state vegetables are chile and…", "pinto beans", ["broccoli", "carrots", "peas"], "Frijoles is Spanish for beans.", true],
];

export const SOCIAL_K: Unit[] = [
  bankUnit({
    id: "nm-k-flag-and-state",
    title: "Our Flag & Our State",
    emoji: "🇺🇸",
    blurb: "The American flag and New Mexico's symbols",
    parentNote: "The American flag as a symbol of the United States (its stars and stripes and the Pledge of Allegiance), New Mexico as our state, with its flag and a few of its symbols (the roadrunner, the yucca, the black bear and the piñon pine), and the leaders children meet, from teachers and principals to mayors and Pueblo governors.",
    standards: ["K.10; K.12", "local, state and national symbols such as the flag and state bird, and community leaders"],
    items: FLAG,
  }),
];
