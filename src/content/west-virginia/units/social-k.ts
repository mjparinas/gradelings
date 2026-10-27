import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// West Virginia Kindergarten social studies: the state's symbols, celebrations and well-known West Virginians
// (SS.K.18), the shape of the state (SS.K.19), its weather through the year (SS.K.20) and how West Virginians lived
// long ago and today (SS.K.22). Prompts stay short for little kids.

const OUR_STATE: Q[] = [
  ["What is the name of our state?", "West Virginia", ["Riverland", "Oakton"], "It is our home state."],
  ["West Virginia is called the…", "Mountain State", ["Desert State", "Island State"], "It has many mountains."],
  ["Our state bird is red. It is the…", "cardinal", ["penguin", "parrot"], "It sings all year long."],
  ["Our state animal is the…", "black bear", ["camel", "kangaroo"], "It lives in our forests."],
  ["Our state tree makes sweet syrup. It is the…", "sugar maple", ["palm tree", "cactus"], "Its sap is boiled into syrup."],
  ["Our state flower is the…", "rhododendron", ["cactus flower", "daisy"], "It has big pink or white flowers."],
  ["Our state fish lives in cold streams. It is the…", "brook trout", ["shark", "goldfish"], "It needs clean, cold water."],
  ["Our state fruit is the Golden Delicious…", "apple", ["banana", "coconut"], "It was first found in West Virginia."],
  ["Our state's capital city is…", "Charleston", ["Morgantown", "Huntington"], "The governor works there."],
  ["West Virginia's shape has two thin parts called…", "panhandles", ["islands", "lakes"], "They stick out like a pan's handle."],
  ["The thin part at the top of our state is the…", "Northern Panhandle", ["Big Lake", "Ocean Point"], "It points north."],
  ["West Virginia's birthday is…", "June 20", ["December 25", "July 4"], "We call it West Virginia Day."],
  ["On West Virginia Day we celebrate…", "our state's birthday", ["the first snow", "the last day of school"], "Our state began on June 20."],
  ["Our state has many tall…", "mountains", ["glaciers", "volcanoes"], "That is why we are the Mountain State."],
  ["Snow falls in our state most in…", "winter", ["summer", "July"], "Winter is the coldest season."],
  ["Summer days in West Virginia are often…", "warm", ["snowy", "icy"], "Summer is the warmest season."],
  ["In fall, many leaves on our trees turn…", "red, orange and yellow", ["blue", "white and pink"], "Leaves change color before they drop."],
  ["In spring, our weather gets…", "warmer", ["colder every day", "dark all day"], "Flowers bloom in spring."],
  ["Long ago, many homes were lit with…", "oil lamps", ["phones", "video games"], "There were no electric lights yet."],
  ["Long ago, families traveled on dirt roads by…", "horse and wagon", ["airplane", "school bus"], "There were no cars yet."],
  ["Long ago, many kids went to school in a…", "one-room schoolhouse", ["space station", "castle"], "All grades learned together."],
  ["Today, many West Virginians travel by…", "car", ["horse and wagon", "rowboat"], "Roads go all over the state."],
  ["Chuck Yeager from West Virginia was a famous…", "pilot", ["chef", "farmer"], "He flew faster than sound."],
  ["Katherine Johnson from West Virginia was great at…", "math", ["painting", "singing"], "Her math helped astronauts get to space."],
  ["Mother's Day began in West Virginia. It honors…", "moms", ["dogs", "trees"], "Anna Jarvis started it in Grafton."],
  ["A song about our state says 'Take me home, country…'", "roads", ["boats", "trains"], "It is one of our state songs."],
  ["Our state motto says mountaineers are always…", "free", ["tired", "hungry"], "Mountaineers live in the mountains.", true],
  ["Our state is next to five other…", "states", ["oceans", "planets"], "Ohio and Kentucky are two of them.", true],
  ["The big river on our state's west side is the…", "Ohio River", ["Nile River", "Amazon River"], "Boats carry coal on it.", true],
  ["Our state rock is black and can burn. It is…", "coal", ["glass", "ice"], "Miners dig it out of the ground.", true],
];

export const SOCIAL_K: Unit[] = [
  bankUnit({
    id: "wv-k-our-state",
    title: "West Virginia, Our State",
    emoji: "⛰️",
    blurb: "Our state's symbols, shape, weather and people",
    parentNote:
      "West Virginia's symbols (the cardinal, black bear, sugar maple, rhododendron and brook trout), West Virginia Day on June 20, the shape of the state and its panhandles, its weather through the seasons, well-known West Virginians like Chuck Yeager, Katherine Johnson and Anna Jarvis, and how life long ago compares with today.",
    standards: ["SS.K.18; SS.K.19; SS.K.20; SS.K.22", "state symbols, celebrations and prominent West Virginians, the shape of the state, its weather, and life in the past and present"],
    items: OUR_STATE,
  }),
];
