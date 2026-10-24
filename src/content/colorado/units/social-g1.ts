import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Colorado Grade 1 social studies: the state's symbols, civic places and features a first grader meets (1.C.2: notable
// people, places, holidays and civic symbols; 1.G.1: describing places with geographic terms). Prompts stay short for
// little kids.

const SYMBOLS: Q[] = [
  ["What is the name of our state?", "Colorado", ["Lakeland", "Sunnyvale"], "It is named after a river."],
  ["Colorado's capital city is…", "Denver", ["Aspen", "Boulder"], "The state's leaders work there."],
  ["Colorado's biggest city is…", "Denver", ["Pueblo", "Durango"], "It is near the mountains."],
  ["Colorado's state bird is the…", "lark bunting", ["robin", "blue jay"], "It is black with white wings."],
  ["Colorado's state flower is the…", "columbine", ["rose", "tulip"], "It is blue and white."],
  ["Colorado's state tree is the…", "blue spruce", ["palm tree", "apple tree"], "It has blue-green needles."],
  ["Colorado's state animal is the…", "bighorn sheep", ["bison", "black bear"], "It has big curled horns."],
  ["Colorado's state fossil is the…", "Stegosaurus", ["T. rex", "woolly mammoth"], "It had plates on its back."],
  ["Which mountains run through Colorado?", "the Rocky Mountains", ["the Alps", "the Andes"], "They are tall and snowy."],
  ["Colorado's flag has a big red letter…", "C", ["D", "Z"], "C is for Colorado."],
  ["The gold circle on Colorado's flag stands for…", "gold and sunshine", ["the moon", "a pizza"], "Colorado is sunny and had gold."],
  ["The blue on Colorado's flag stands for…", "the blue sky", ["the ocean", "blueberries"], "Colorado has many sunny days."],
  ["The white on Colorado's flag stands for…", "snow on the mountains", ["clouds of smoke", "milk"], "The peaks are snowy."],
  ["On a map, a star in a circle often shows a…", "capital city", ["lake", "farm"], "Denver has a star on Colorado maps."],
  ["Where do Colorado's state leaders meet?", "the State Capitol", ["the zoo", "a ski lodge"], "Its dome is covered in gold."],
  ["The dome of Colorado's Capitol is covered in…", "gold", ["chocolate", "glass"], "The gold came from Colorado."],
  ["Which mountain inspired the song \"America the Beautiful\"?", "Pikes Peak", ["Mount Everest", "Mount Fuji"], "It is near Colorado Springs.", true],
  ["Colorado is called the Centennial State because it became a state…", "100 years after 1776", ["in 1492", "last year"], "Centennial means 100 years.", true],
  ["Colorado became a state in…", "1876", ["1492", "2026"], "That was 150 years ago.", true],
  ["Colorado's state fish is the…", "greenback cutthroat trout", ["shark", "goldfish"], "It lives in cold streams.", true],
  ["Colorado's state reptile is the…", "western painted turtle", ["alligator", "rattlesnake"], "Its shell has bright marks.", true],
  ["Which state is next to Colorado?", "Wyoming", ["Hawaii", "Vermont"], "Wyoming is to the north.", true],
  ["Why do states have symbols like a state bird?", "to show what is special there", ["to make laws", "to count people"], "Symbols remind us of a place.", true],
  ["The tallest mountain in Colorado is…", "Mount Elbert", ["Mount Everest", "Mount Fuji"], "It is over 14,000 feet tall.", true],
  ["Which big river starts in Colorado's mountains?", "the Colorado River", ["the Nile", "the Amazon"], "Our state is named after it.", true],
];

export const SOCIAL_1: Unit[] = [
  bankUnit({
    id: "co-g1-colorado-symbols",
    title: "Colorado Symbols",
    emoji: "🏔️",
    blurb: "Our state's symbols, places and flag",
    parentNote: "Colorado's symbols (the lark bunting, the columbine, the blue spruce, the bighorn sheep and the Stegosaurus), its flag, its capital Denver and the gold-domed State Capitol, the Rocky Mountains and Pikes Peak, and why it is called the Centennial State.",
    standards: ["1.C.2.b; 1.C.2.c; 1.G.1.b", "civic symbols and places important to Colorado, and describing places on a map"],
    items: SYMBOLS,
  }),
];
