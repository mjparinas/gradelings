import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// West Virginia Grade 2 social studies: state symbols, celebrations and famous West Virginians, and the governor's
// role (SS.2.17), the state's natural resources and features on a map (SS.2.18), the capital, counties and bordering
// states (SS.2.19), stories, songs and crafts (SS.2.20), and life in the past and present (SS.2.21).

const WEST_VIRGINIA: Q[] = [
  ["The leader of West Virginia's government is the…", "governor", ["mayor", "president"], "The governor is elected by the people of the state."],
  ["The governor works at the State Capitol in…", "Charleston", ["Wheeling", "Martinsburg"], "Charleston is the capital city."],
  ["West Virginia's State Capitol has a dome covered in…", "gold", ["ice", "grass"], "It shines in the sun above the Kanawha River."],
  ["West Virginia's state bird is the…", "northern cardinal", ["blue jay", "robin"], "The male is bright red."],
  ["West Virginia's state tree, whose sap is boiled into syrup, is the…", "sugar maple", ["white oak", "palm tree"], "Its leaves turn orange and red in fall."],
  ["West Virginia's state animal is the…", "black bear", ["gray wolf", "moose"], "It lives in the state's forests."],
  ["West Virginia's state insect is the…", "honeybee", ["ladybug", "firefly"], "It makes honey and pollinates crops."],
  ["West Virginia's state colors are old gold and…", "blue", ["green", "red"], "You can see them on the state flag."],
  ["The state seal shows a farmer and a…", "miner", ["sailor", "astronaut"], "Farming and mining were big parts of life."],
  ["West Virginia Day, the state's birthday, is on…", "June 20", ["January 1", "November 11"], "West Virginia became a state on June 20, 1863."],
  ["Booker T. Washington, a great teacher and leader, grew up in…", "Malden, West Virginia", ["Paris, France", "Tokyo, Japan"], "As a boy he worked in salt furnaces and coal mines."],
  ["Pearl S. Buck, born in Hillsboro, became a famous…", "writer", ["pilot", "boxer"], "She won the Nobel Prize for her books."],
  ["Mary Lou Retton from Fairmont won Olympic gold in…", "gymnastics", ["swimming", "skiing"], "She won in 1984."],
  ["Homer Hickam grew up in Coalwood and wrote about building…", "rockets", ["boats", "castles"], "His book became the movie October Sky."],
  ["Which of these is a natural resource found in West Virginia?", "coal", ["plastic", "glass bottles"], "Natural resources come from nature."],
  ["Gas that comes from deep underground and heats homes is…", "natural gas", ["steam", "smoke"], "Wells bring it up to the surface."],
  ["Trees from West Virginia's forests are cut for…", "timber and lumber", ["salt", "oil"], "Lumber is used to build houses and furniture."],
  ["The New River Gorge is a deep valley cut by a…", "river", ["glacier", "volcano"], "It is now a national park."],
  ["The highest point in West Virginia is…", "Spruce Knob", ["New River Gorge", "the Ohio River"], "It is in the Allegheny Mountains."],
  ["Which state is across the Ohio River from West Virginia?", "Ohio", ["Florida", "Texas"], "The state has the same name as the river."],
  ["Which state shares West Virginia's eastern and southern border?", "Virginia", ["Kentucky", "Ohio"], "West Virginia was once part of it."],
  ["Which state is just north of West Virginia's Eastern Panhandle?", "Maryland", ["Kentucky", "Ohio"], "The Potomac River is the border."],
  ["Which state borders West Virginia to the southwest?", "Kentucky", ["Maryland", "Pennsylvania"], "The Tug Fork and Big Sandy rivers are the border."],
  ["The counties next to your home county are called… counties.", "surrounding", ["foreign", "floating"], "They touch your county on the map."],
  ["The legend of John Henry tells of a strong man who helped dig a railroad…", "tunnel", ["boat", "airport"], "He raced a steam drill with his hammer."],
  ["Bluegrass and old-time music are often played on a fiddle, a guitar and a…", "banjo", ["tuba", "piano"], "All three have strings."],
  ["Telling stories out loud and passing them down is called…", "storytelling", ["shopping", "texting"], "Grandparents often tell stories of long ago."],
  ["Long ago, many coal miners' families shopped at a…", "company store", ["supermarket chain", "website"], "The coal company owned the store."],
  ["Long ago, many West Virginia families cooked on a…", "wood or coal stove", ["microwave", "electric grill"], "They had to keep the fire going."],
  ["Today, many West Virginians learn the news from phones and computers. Long ago, they used…", "newspapers and radios", ["tablets", "smart watches"], "Radio came before television.", true],
  ["Which famous West Virginian's math helped send astronauts into space?", "Katherine Johnson", ["Pearl S. Buck", "Homer Hickam"], "She was born in White Sulphur Springs.", true],
  ["West Virginia's state reptile is the…", "timber rattlesnake", ["alligator", "sea turtle"], "It lives in rocky forests.", true],
  ["Why do coal barges travel on the Ohio and Kanawha rivers?", "boats can carry heavy loads cheaply", ["the rivers are frozen", "trucks are not allowed", "coal floats"], "Rivers are highways for heavy goods.", true],
  ["West Virginia's state gem is…", "fossil coral", ["diamond", "ruby"], "It is coral that turned to stone long ago.", true],
];

export const SOCIAL_2: Unit[] = [
  bankUnit({
    id: "wv-g2-west-virginia",
    title: "Exploring West Virginia",
    emoji: "⛰️",
    blurb: "Symbols, famous West Virginians, resources and neighbors",
    parentNote:
      "West Virginia's symbols and West Virginia Day, what the governor does, famous West Virginians (Booker T. Washington, Pearl S. Buck, Katherine Johnson, Mary Lou Retton, Homer Hickam), natural resources like coal, gas and timber, the New River Gorge and Spruce Knob, the capital, counties and the five bordering states, John Henry and other stories and music, and life in the past compared with today.",
    standards: ["SS.2.17; SS.2.18; SS.2.19; SS.2.20; SS.2.21", "state symbols, famous West Virginians and the governor, natural resources and features, the capital, counties and bordering states, storytelling and art, and past and present lifestyles"],
    items: WEST_VIRGINIA,
  }),
];
