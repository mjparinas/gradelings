import type { Unit } from "../../types";
import { SOCIAL_K as TEXAS_K } from "../../texas/units/social-gk";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Alabama's own Kindergarten social studies units (`al-` ids): the Alabama and United States symbols, leaders and
// celebrations of standard K.3, position words (K.9, a copy of Texas's unit without its Texas questions), and primary
// sources and life long ago (K.11).

const SYMBOLS: Q[] = [
  ["Which flag is the Alabama state flag?", "a white flag with a red X", ["a blue flag with one star", "a green flag with a moon", "a yellow flag with a sun"], "Look for a big red X."],
  ["What colors are on the United States flag?", "red, white and blue", ["green and yellow", "pink and purple", "black and orange"], "Think of the stars and stripes."],
  ["What is Alabama?", "our state", ["a country", "a city", "a planet"], "The United States has 50 of these."],
  ["What is the United States?", "our country", ["our state", "our town", "a lake"], "It has 50 states."],
  ["Who leads our country?", "the president", ["the principal", "the mayor", "the coach"], "This leader works in the White House."],
  ["Who leads the state of Alabama?", "the governor", ["the president", "the principal", "the bus driver"], "Every state has one."],
  ["Who leads a town or city?", "the mayor", ["the president", "the king", "the doctor"], "A leader for one town."],
  ["Who leads a school?", "the principal", ["the governor", "the mayor", "the president"], "This leader works at your school."],
  ["Alabama's capital city is…", "Montgomery", ["Paris", "London", "Tokyo"], "The governor works there."],
  ["The Alabama state bird is the…", "yellowhammer", ["penguin", "parrot", "ostrich"], "A woodpecker with yellow under its wings."],
  ["The Alabama state flower is the…", "camellia", ["cactus", "tulip", "lotus"], "A pretty flower that blooms in winter."],
  ["The Alabama state tree is the…", "longleaf pine", ["palm tree", "apple tree", "baobab"], "A pine with very long needles."],
  ["The bald eagle is a symbol of the…", "United States", ["moon", "ocean", "school bus"], "It is our national bird."],
  ["What do we say to show respect for the flag?", "the Pledge of Allegiance", ["a riddle", "a recipe", "a joke"], "We put a hand over our heart."],
  ["The national anthem is a song about our…", "flag and country", ["lunch", "pet dog", "bedtime"], "It is called The Star-Spangled Banner."],
  ["When we sing the national anthem, we…", "stand quietly", ["run around", "shout", "lie down"], "We show respect."],
  ["On Independence Day we celebrate our country's…", "birthday", ["first snow", "school day", "lunch"], "It is July 4."],
  ["Independence Day is in which month?", "July", ["January", "October", "December"], "Summer fireworks!"],
  ["Thanksgiving is a day to…", "give thanks and share a meal", ["go back to school", "wear a costume", "plant seeds"], "Families say what they are thankful for."],
  ["Veterans Day honors people who…", "served in the military", ["drive buses", "bake bread", "teach math"], "Soldiers, sailors and pilots."],
  ["Martin Luther King, Jr. Day honors a leader who worked for…", "fair rules for all people", ["faster cars", "more rain", "bigger houses"], "He wanted everyone treated fairly."],
  ["Martin Luther King, Jr. was a leader in Montgomery, which is in…", "Alabama", ["France", "Japan", "Brazil"], "Our state's capital city.", true],
  ["A symbol is a picture or thing that…", "stands for something", ["makes noise", "is always food", "is a toy"], "A flag stands for a place."],
  ["Which is a symbol of Alabama?", "the Alabama flag", ["a pizza", "a shoe", "a pencil"], "It flies over our state."],
  ["Where does the president live and work?", "the White House", ["a castle", "a boat", "a tree house"], "It is in Washington, D.C.", true],
  ["The red X on the Alabama flag is on a…", "white background", ["blue background", "green background", "black background"], "Red on white.", true],
  ["The Pledge of Allegiance is a promise to be loyal to…", "our flag and country", ["a sports team", "a toy", "a pet"], "We say it at school.", true],
  ["Which is a holiday for the whole country?", "Independence Day", ["your birthday", "a school picture day", "a rainy day"], "Everyone in the United States celebrates it.", true],
];

const PAST: Q[] = [
  ["A photo from long ago can show us…", "how people used to live", ["what happens tomorrow", "what to eat for lunch", "today's weather"], "Old photos are clues."],
  ["Which is a primary source?", "an old photograph", ["a cartoon made up today", "a guess", "a dream"], "Made by people who were there."],
  ["A letter written by Grandma when she was little is a…", "primary source", ["map of the moon", "song for babies", "toy"], "She was there and wrote it."],
  ["An artifact is an object from…", "the past", ["the future", "a dream", "a cartoon"], "Like an old tool or toy."],
  ["Which is an artifact?", "an old cooking pot", ["a new video game", "a cloud", "a rainbow"], "People used it long ago."],
  ["A diary is a book where someone writes about…", "their own day", ["only animals", "a made-up planet", "nothing"], "It tells what happened to them."],
  ["Long ago, many children went to school in…", "one room with all ages", ["a spaceship", "a mall", "an airplane"], "Big and little kids learned together."],
  ["Long ago, people sent messages by…", "writing letters", ["texting", "video calls", "email"], "They used paper and stamps."],
  ["Today many people send messages by…", "phone or computer", ["only smoke signals", "carrier pigeon", "drum"], "Fast and electric."],
  ["Long ago, many people traveled by…", "horse and wagon", ["jet plane", "electric car", "rocket"], "Before cars were common."],
  ["Today many people travel by…", "car, bus or plane", ["horse and wagon only", "walking only", "boat only"], "Fast machines."],
  ["Long ago, people lit their homes with…", "candles and oil lamps", ["light bulbs", "phones", "TV screens"], "Before electric lights."],
  ["Long ago, children played with…", "simple toys like marbles and dolls", ["tablets", "video games", "smart watches"], "No screens long ago."],
  ["Which is from today, not long ago?", "a tablet computer", ["a butter churn", "a horse and buggy", "an oil lamp"], "Something new."],
  ["Which is from long ago?", "a horse and buggy", ["a cell phone", "a laptop", "an electric car"], "Something old."],
  ["A map drawn long ago can show…", "what a place looked like then", ["what you dreamed", "tomorrow's weather", "a new toy"], "Old maps are clues too."],
  ["People who study the past look at…", "clues like photos and letters", ["only guesses", "cartoons", "jokes"], "They look for evidence."],
  ["Long ago, many families got water from a…", "well", ["faucet in every room", "vending machine", "bottle store"], "They pulled up buckets."],
  ["Long ago, many families washed clothes…", "by hand", ["in a washing machine", "with robots", "never"], "With a tub and a board."],
  ["A painting made long ago can show…", "how people dressed then", ["what you will wear", "your phone", "a video"], "Look at the clothes."],
  ["Which job is the same now and long ago?", "farmer", ["video game maker", "astronaut", "computer coder"], "People have always needed food."],
  ["Asking a grandparent about when they were little helps us learn about…", "the past", ["outer space", "the future", "dinosaurs"], "They remember long ago.", true],
  ["Which tells us MORE about long ago: an old photo or a new toy?", "an old photo", ["a new toy", "they are the same", "neither"], "Old things are clues.", true],
  ["A newspaper from long ago tells us…", "what happened back then", ["tomorrow's news", "a made-up story", "nothing"], "It was written at that time.", true],
  ["A museum is a place where we can see…", "things from the past", ["only new cars", "only food", "only movies"], "Look, but don't touch!", true],
  ["How is school today different from long ago?", "Many classes use computers", ["There are no teachers", "No one reads", "Kids never play"], "Think of new tools.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "al-k-alabama-and-america",
    title: "Alabama & America",
    emoji: "🇺🇸",
    blurb: "Flags, leaders and holidays",
    parentNote:
      "The Alabama and United States flags, the Pledge and national anthem, the governor and the president, Alabama's state bird, flower and tree, and holidays like Independence Day, Martin Luther King, Jr. Day, Thanksgiving and Veterans Day.",
    standards: ["K.3", "symbols, leaders and celebrations of our state and nation"],
    items: SYMBOLS,
  }),
  copyOf(
    from(TEXAS_K, "tx-k-where-is-it"),
    {
      id: "al-k-near-far",
      title: "Near, Far & Maps",
      emoji: "🧭",
      blurb: "Left, right, up, down and maps",
      parentNote: "Words for where things are (left and right, up and down, in and out, above and below, near and far) and finding places on simple maps.",
      standards: ["K.9; K.7", "giving and following directions with position words, and using simple maps"],
    },
    [
      ["The bird is up in the tree. Is it above or below the tree's roots?", "above", ["below", "inside", "under"], "Up high."],
      ["The ball rolled under the bed. Where is it?", "below the bed", ["on top of the bed", "above the bed", "in the sky"], "Under means below."],
      ["Which word is the opposite of left?", "right", ["up", "down", "in"], "Left and right are opposites."],
      ["The opposite of in is…", "out", ["up", "left", "near"], "Come in, go out."],
      ["The opposite of up is…", "down", ["in", "right", "far"], "Look up, look down."],
      ["Alabama is on a map of the…", "United States", ["moon", "ocean floor", "sun"], "Our state is part of our country."],
    ],
  ),
  bankUnit({
    id: "al-k-clues-from-the-past",
    title: "Clues from the Past",
    emoji: "📷",
    blurb: "Old photos, letters and life long ago",
    parentNote:
      "What a primary source is (photos, letters, diaries, artifacts, maps and art), and comparing homes, schools, jobs, travel and technology long ago and today.",
    standards: ["K.11", "identifying primary sources and comparing daily life in the past and present"],
    items: PAST,
  }),
];
