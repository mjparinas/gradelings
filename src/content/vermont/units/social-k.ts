import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Vermont Kindergarten social studies, "Me and My Community" (the Agency of Education's K-8 framework): the people in
// authority children meet, from teachers and principals to the governor (D2.Civ.1.K-2), and the symbols of the United
// States and of Vermont, which show what is special about the place we live (D2.Geo.6.K-2): the flag, the Pledge of
// Allegiance, and Vermont's flag, nickname and state symbols.

const FLAG: Q[] = [
  ["Our country is the…", "United States", ["Vermont", "Lake Champlain", "Montpelier"], "Vermont is our state."],
  ["Our state is…", "Vermont", ["the United States", "Mount Mansfield", "the moon"], "Our state is in our country."],
  ["The American flag has red and white…", "stripes", ["circles", "triangles", "hearts"], "There are 13 of them."],
  ["The American flag has white stars on…", "blue", ["green", "orange", "pink"], "Look at the top corner."],
  ["How many stars are on the American flag?", "50", ["13", "5", "100"], "One star for each state."],
  ["Each star on the flag stands for a…", "state", ["city", "river", "school"], "Vermont has a star too."],
  ["The flag is a symbol of our…", "country", ["school bus", "lunch", "toys"], "It stands for the United States."],
  ["We say the Pledge of Allegiance to the…", "flag", ["bus", "teacher", "river"], "We stand and face it."],
  ["What colors are on the American flag?", "red, white and blue", ["green and yellow", "pink and purple", "black and orange"], "Think of the stars and stripes."],
  ["Where do you often see the flag?", "at school", ["in the bathtub", "in a sandwich", "in a sock"], "Many schools fly it outside."],
  ["Vermont's flag is blue with a picture of a pine tree and a…", "cow", ["rocket", "car", "whale"], "Farms are a big part of Vermont."],
  ["Vermont's state bird sings a pretty song in the woods. It is the hermit…", "thrush", ["penguin", "parrot", "ostrich"], "It is a small brown bird."],
  ["Vermont's state flower grows in fields and pastures. It is the red…", "clover", ["cactus", "tulip", "seaweed"], "Cows like to eat it."],
  ["Vermont's state tree gives us sweet syrup. It is the sugar…", "maple", ["palm", "banana", "cactus"], "Its leaves turn bright red and orange in fall."],
  ["Vermont's nickname is the Green Mountain…", "State", ["Ocean", "Desert", "Sock"], "Green Mountains run down the middle of Vermont."],
  ["Who leads our classroom?", "the teacher", ["the bus", "a puppy", "the lunch box"], "Teachers help us learn."],
  ["Who leads our whole school?", "the principal", ["the governor", "a pilot", "a baker"], "The principal helps everyone at school."],
  ["Who leads our whole state?", "the governor", ["a pirate", "a clown", "a dentist"], "Voters choose the governor."],
  ["We stand up when we say the Pledge because we show…", "respect", ["we are sleepy", "it is lunch", "we are cold"], "Standing shows we care."],
  ["The flag goes up the pole in the…", "morning", ["middle of the night", "bathtub", "sandbox"], "Many schools raise it each day."],
  ["Vermont's state animal is a strong, gentle horse called the…", "Morgan horse", ["zebra", "pony car", "sea horse"], "The first Morgan horse lived in Vermont long ago.", true],
  ["Vermont's state insect makes honey. It is the…", "honeybee", ["ladybug", "ant", "fly"], "Bees visit clover and apple blossoms.", true],
  ["Vermont's words on its flag are \"Freedom and…\"", "Unity", ["Pizza", "Snow", "Recess"], "Unity means being together.", true],
  ["Montpelier is the capital of…", "Vermont", ["the moon", "the ocean", "the sun"], "State leaders work there.", true],
  ["The bald eagle is a symbol of the…", "United States", ["moon", "ocean", "winter"], "It is our national bird.", true],
  ["A flag is a symbol. A symbol is something that…", "stands for something else", ["is good to eat", "makes noise", "is a toy"], "The flag stands for our country.", true],
  ["Grown-ups in Vermont towns meet each March to vote. This is called Town…", "Meeting Day", ["Parade Day", "Picnic Day", "Recess Day"], "Grown-ups make decisions together.", true],
];

export const SOCIAL_K: Unit[] = [
  bankUnit({
    id: "vt-k-flag-and-state",
    title: "Our Flag & Our State",
    emoji: "🇺🇸",
    blurb: "The American flag and Vermont's symbols",
    parentNote: "The American flag as a symbol of the United States (its stars and stripes and the Pledge of Allegiance), Vermont as our state, with its flag and a few of its symbols (the hermit thrush, red clover, the sugar maple, the Morgan horse and the Green Mountains), and the leaders children meet, from teachers and principals to the governor.",
    standards: ["D2.Civ.1.K-2; D2.Geo.6.K-2", "the roles and responsibilities of people in authority, and the cultural and environmental characteristics that make our state special"],
    items: FLAG,
  }),
];
