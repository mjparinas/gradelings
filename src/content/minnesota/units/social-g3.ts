import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Minnesota's own Grade 3 social studies unit (`mn-` id): where Minnesota's 11 Tribal Nations are and how they work with
// local and state governments. Present tense, living nations, nothing sacred or ceremonial.

const ELEVEN: Q[] = [
  ["How many Tribal Nations share geography with Minnesota?", "11", ["2", "50", "3"], "Seven and four."],
  ["Minnesota's Tribal Nations are Anishinaabe or…", "Dakota", ["Aztec", "Maya", "Inuit"], "Two nations."],
  ["How many are Anishinaabe (Ojibwe)?", "7", ["4", "11", "1"], "Most are in the north."],
  ["How many are Dakota?", "4", ["7", "11", "10"], "Most are in the south."],
  ["Most Anishinaabe reservations are in the…", "northern part of Minnesota", ["far south", "Twin Cities", "Iowa"], "Forests and lakes."],
  ["Most Dakota communities are in the…", "southern part of Minnesota", ["far north", "Lake Superior", "Canada"], "Along rivers."],
  ["Grand Portage is in the far northeast, beside…", "Lake Superior", ["the Red River", "Lake Itasca", "Iowa"], "A big lake."],
  ["Red Lake Nation is named for a…", "very large lake", ["mountain", "desert", "city"], "In the north."],
  ["Mille Lacs Band lives near…", "Mille Lacs Lake", ["Lake Superior", "the Gulf of Mexico", "Duluth harbor"], "Mille Lacs means a thousand lakes."],
  ["Leech Lake and White Earth are…", "Anishinaabe nations", ["cities in Iowa", "rivers", "Dakota towns in the south"], "In northern Minnesota."],
  ["Prairie Island is a Dakota community along the…", "Mississippi River", ["Red River", "Lake Superior", "Lake of the Woods"], "Near Red Wing."],
  ["Upper Sioux and Lower Sioux are Dakota communities along the…", "Minnesota River", ["St. Croix River", "Red River", "Lake Superior"], "In the southwest."],
  ["Shakopee Mdewakanton is a Dakota community near the…", "Twin Cities", ["Canadian border", "North Shore", "Iron Range"], "South of Minneapolis.", true],
  ["Bois Forte and Fond du Lac are…", "Anishinaabe nations", ["state parks", "Dakota farms", "Iowa counties"], "In the northeast.", true],
  ["A Tribal Nation is sovereign, which means it…", "governs itself", ["has no rules", "belongs to a city", "cannot vote"], "Self-rule."],
  ["Tribal Nations elect leaders to a…", "Tribal council", ["school board only", "US Senate", "royal court"], "Their own government."],
  ["Tribal governments run…", "schools, clinics and police", ["the US Army", "Canada", "the Governor's office"], "Services for their people."],
  ["When a Tribal Nation and the State of Minnesota plan a new road together, they…", "work government to government", ["ask a store", "flip a coin", "never meet"], "Two governments meet."],
  ["Tribal Nations and the state agree on rules for…", "fishing and hunting", ["the weather", "the moon", "other countries' flags"], "Lakes and woods.", true],
  ["A reservation is land that a Tribal Nation…", "kept in a treaty or agreement", ["rented for a party", "bought at a fair", "lost in a game"], "Reserved land.", true],
  ["People who are citizens of a Tribal Nation are also citizens of…", "the United States and Minnesota", ["no country", "only Canada", "only their city"], "More than one government.", true],
  ["Where can you find all 11 Tribal Nations on a map?", "Spread across Minnesota", ["All in one city", "Only in Iowa", "On one island"], "North, south and in between.", true],
  ["Businesses run by Tribal Nations give many people nearby…", "jobs", ["new oceans", "snowstorms", "other states"], "Big employers.", true],
  ["Many Tribal Nations have their own flag, laws and…", "language programs", ["oceans", "volcanoes", "armies at war"], "Teaching Dakota and Ojibwe.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "mn-g3-tribal-nations",
    title: "Minnesota's 11 Tribal Nations",
    emoji: "🗺️",
    blurb: "Where they are and how they govern",
    parentNote:
      "Where Minnesota's 11 Tribal Nations are (seven Anishinaabe, four Dakota), what it means that each is sovereign, and how Tribal governments work with local and state governments.",
    standards: ["3.1.6.1; 3.1.4.1", "locating the 11 Tribal Nations of Minnesota and how they interact with local and state government"],
    items: ELEVEN,
  }),
];
