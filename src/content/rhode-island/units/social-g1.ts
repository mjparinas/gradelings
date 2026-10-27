import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Rhode Island Grade 1 social studies: how communities change (SS1.2.2) and learning about communities nearby (SS1.5.1),
// comparing life in Rhode Island's towns long ago with life today: homes, travel, work, school and the mills, farms and
// harbors that shaped its communities.

const THEN_NOW: Q[] = [
  ["Long ago, many people in Rhode Island worked in big brick buildings called…", "mills", ["airports", "malls", "space stations"], "Mills made cloth with machines."],
  ["Long ago, people in Rhode Island traveled by horse, wagon or…", "boat", ["airplane", "rocket", "subway"], "Boats crossed the bay before there were bridges."],
  ["Today, most people in Rhode Island travel by…", "car or bus", ["covered wagon", "camel", "canoe"], "Roads and bridges connect our towns."],
  ["Long ago, families got water from a…", "well", ["faucet", "water bottle", "vending machine"], "People pulled up water in a bucket."],
  ["Long ago, children often learned in a small…", "one-room school", ["online class", "stadium", "airport"], "One teacher taught every grade."],
  ["Long ago, homes were lit at night with…", "candles and oil lamps", ["light bulbs", "phone screens", "TVs"], "Electric lights came later."],
  ["Long ago, people sent news far away by…", "letters", ["text messages", "video calls", "email"], "A letter could take weeks."],
  ["Something that is the same in the past and today is that families…", "share meals together", ["use smartphones", "watch TV", "drive cars"], "Some things don't change."],
  ["The past is…", "what already happened", ["what is happening now", "what will happen", "a kind of food"], "Yesterday is in the past."],
  ["The future is…", "what will happen later", ["what happened long ago", "what happened yesterday", "a kind of map"], "Tomorrow is in the future."],
  ["Long ago, people in Providence rode streetcars called…", "trolleys", ["jets", "rockets", "scooters"], "Trolleys ran on rails in the street."],
  ["Long ago, fishing boats in Rhode Island were moved by…", "sails and oars", ["jet engines", "batteries", "solar panels"], "Wind and arms moved the boats."],
  ["Some old mill buildings in Rhode Island are now…", "apartments, shops and offices", ["volcanoes", "oceans", "farms on the moon"], "Old buildings can get new uses."],
  ["Long ago, Rhode Island had many more…", "farms", ["video games", "cell phone towers", "electric cars"], "Many farms became neighborhoods."],
  ["A photo of your town from long ago can show how it has…", "changed", ["never changed", "moved to the ocean", "disappeared"], "Compare it with how it looks today."],
  ["Before the Newport Bridge was built, people crossed the bay to Newport by…", "ferry boat", ["train", "airplane", "horse"], "A ferry carries people across water."],
  ["Long ago, people kept food cold with blocks of…", "ice", ["sand", "wood", "paper"], "Ice was cut from frozen ponds."],
  ["Today, people keep food cold in a…", "refrigerator", ["fireplace", "oven", "mailbox"], "It runs on electricity."],
  ["A neighbor town is a community…", "near our own", ["on the moon", "in a book only", "under the sea"], "Rhode Island's towns are close together."],
  ["Many Rhode Island towns have a library, a fire station and a…", "town hall", ["volcano", "castle", "space station"], "Town leaders meet at the town hall."],
  ["People who lived in our community long ago are our community's…", "history", ["weather", "future", "map key"], "History is the story of the past.", true],
  ["An old map of a town can show where the… used to be.", "farms and roads", ["phone apps", "video games", "airplanes"], "Maps tell stories of the past.", true],
  ["Why did many mills long ago stand beside rivers?", "moving water turned their machines", ["the rivers were warm", "boats were made there", "fish worked there"], "Water wheels used the river's power.", true],
  ["How is a town different from long ago if a farm is now a neighborhood?", "more people live there now", ["fewer people live there now", "nothing changed", "the ocean moved"], "Neighborhoods have many homes.", true],
  ["An older person who tells you about their town long ago is sharing a…", "memory of the past", ["weather report", "math problem", "recipe for soup"], "People's stories are a way to learn history.", true],
];

export const SOCIAL_1: Unit[] = [
  bankUnit({
    id: "ri-g1-then-and-now",
    title: "Then & Now in Rhode Island",
    emoji: "🕰️",
    blurb: "How our communities have changed",
    parentNote: "Comparing life in Rhode Island's communities long ago with today: mills and farms, trolleys and ferries, one-room schools and letters, and how old buildings get new uses, plus learning about the towns nearby.",
    standards: ["SS1.2.2; SS1.5.1", "how communities change, and learning about communities nearby"],
    items: THEN_NOW,
  }),
];
