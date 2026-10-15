import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Arkansas's own Kindergarten social studies unit (`ar-` ids): the state and national symbols and patriotic songs the
// Arkansas standards name for Kindergarten (C.1.K.3).

const SYMBOLS: Q[] = [
  ["How many stars are on the American flag?", "50", ["13", "25", "100"], "One star for each state."],
  ["How many stripes are on the American flag?", "13", ["50", "10", "3"], "One for each of the first colonies."],
  ["What colors is the American flag?", "red, white and blue", ["green and yellow", "black and white", "orange and purple"], "Think of the stars and stripes."],
  ["We say the Pledge of Allegiance to show respect for…", "our flag and country", ["our lunch", "a game", "the weather"], "We face the flag when we say it."],
  ["When we say the Pledge, we put our right hand…", "over our heart", ["on our head", "in our pocket", "on our nose"], "Over your chest, on the left side."],
  ["Which song is our national anthem?", "The Star-Spangled Banner", ["Happy Birthday", "Twinkle, Twinkle", "Old MacDonald"], "It is about the flag."],
  ["The Star-Spangled Banner is a song about…", "the American flag", ["a farm", "a birthday", "a bus"], "Star-spangled means covered in stars."],
  ["Arkansas is a…", "state", ["country", "city", "ocean"], "The United States has 50 of these."],
  ["Arkansas is part of which country?", "the United States", ["Mexico", "France", "Japan"], "Our country has 50 states."],
  ["What shape is in the middle of the Arkansas flag?", "a diamond", ["a circle", "a heart", "a moon"], "Diamonds are found in Arkansas."],
  ["What colors is the Arkansas flag?", "red, white and blue", ["green and gold", "black and orange", "pink and purple"], "The same colors as the American flag."],
  ["Which word is written on the Arkansas flag?", "ARKANSAS", ["AMERICA", "MISSOURI", "HELLO"], "The name of our state."],
  ["The Arkansas state bird is the…", "mockingbird", ["eagle", "duck", "robin"], "This bird copies other birds' songs."],
  ["A mockingbird is good at…", "copying other birds' songs", ["swimming deep", "living in snow", "barking"], "To mock means to copy."],
  ["The Arkansas state flower is the…", "apple blossom", ["rose", "sunflower", "tulip"], "It grows on apple trees."],
  ["An apple blossom grows on…", "an apple tree", ["a cactus", "the ground", "a pine tree"], "Apples grow from these flowers."],
  ["The Arkansas state tree is the…", "pine tree", ["palm tree", "apple tree", "maple tree"], "It has needles and cones."],
  ["A pine tree has…", "needles and cones", ["coconuts", "big flat leaves", "thorns only"], "It stays green all year."],
  ["The Arkansas state insect is the…", "honeybee", ["ant", "butterfly", "ladybug"], "It makes honey."],
  ["A honeybee makes…", "honey", ["milk", "silk", "bread"], "It's in the name."],
  ["Honeybees help plants by carrying…", "pollen from flower to flower", ["water to the roots", "rocks to the river", "seeds to the moon"], "Bees visit many flowers."],
  ["A symbol is a picture or thing that…", "stands for something", ["is always a toy", "has no meaning", "is a kind of food"], "A flag stands for a place."],
  ["Which is a symbol of the United States?", "the American flag", ["a school bus", "a pencil", "a pizza"], "It flies at your school."],
  ["Which one is an Arkansas state symbol?", "the mockingbird", ["the penguin", "the camel", "the panda"], "It is a songbird.", true],
  ["Which is NOT an Arkansas state symbol?", "the palm tree", ["the pine tree", "the apple blossom", "the honeybee"], "Three of these are state symbols.", true],
  ["Before we sing the national anthem, we…", "stand and face the flag", ["lie down", "run around", "turn away"], "We show respect.", true],
  ["The bald eagle is a symbol of…", "the United States", ["Arkansas only", "the ocean", "winter"], "It is our national bird.", true],
  ["The pine tree became a state symbol because Arkansas has many…", "forests", ["deserts", "glaciers", "volcanoes"], "Lots of trees grow here.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "ar-k-symbols",
    title: "Arkansas & US Symbols",
    emoji: "🇺🇸",
    blurb: "Flags, the Pledge and our state symbols",
    parentNote:
      "The American and Arkansas flags, the Pledge of Allegiance, the national anthem, and the Arkansas state symbols children meet in Kindergarten: the mockingbird, the apple blossom, the honeybee and the pine tree.",
    standards: ["C.1.K.3", "recognizing state and national symbols and patriotic songs, including the Arkansas flag and state symbols"],
    items: SYMBOLS,
  }),
];
