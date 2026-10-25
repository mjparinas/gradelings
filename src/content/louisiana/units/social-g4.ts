import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Louisiana Grade 4 social studies: the first peoples of what would become Louisiana and Poverty Point (4.19 a, c to
// e). Told from archaeology: nomadic hunters, seasonal camps and mound building, and Poverty Point's earthworks, tools
// and trade. No ceremonial details. Louisiana's Native nations are living communities today.

const POVERTY_POINT: Q[] = [
  ["The first people in what would become Louisiana were nomads. Nomads…", "move from place to place to find food", ["live in one city all their lives", "grow all of their food on farms"], "They followed the animals they hunted."],
  ["The earliest hunters in North America hunted large animals such as…", "mammoths and mastodons", ["horses and cows from Europe", "lions and zebras"], "These Ice Age animals are now extinct."],
  ["Over time, people in what would become Louisiana began to…", "return to the same camps each season", ["build skyscrapers", "ride horses everywhere"], "They knew where food would be each season."],
  ["A spear-thrower that helped hunters throw farther is called an…", "atlatl", ["arrowhead", "canoe"], "It works like a longer arm."],
  ["Poverty Point is in which part of Louisiana?", "the northeast", ["the far southwest", "the Gulf coast"], "It is near the town of Epps."],
  ["About how long ago was Poverty Point built?", "about 3,500 years ago", ["about 350 years ago", "about 35 years ago"], "It is older than ancient Rome."],
  ["What is Poverty Point best known for?", "huge earthen mounds and ridges", ["stone pyramids", "wooden castles"], "People moved tons of soil by hand."],
  ["The ridges at Poverty Point form a giant…", "C shape of half circles", ["perfect square", "straight line"], "There are six curved ridges."],
  ["How did people at Poverty Point build the mounds?", "by carrying baskets of soil", ["with bulldozers", "with stone blocks"], "It took millions of basket loads."],
  ["The people of Poverty Point got most of their food by…", "hunting, fishing and gathering", ["farming corn", "trading with Europe"], "They were not farmers."],
  ["Clay balls found at Poverty Point were used for…", "cooking food in earth ovens", ["playing baseball", "building walls"], "They held heat like stones."],
  ["Why did people at Poverty Point make cooking balls from clay?", "there was little stone nearby", ["clay was sweeter", "they had no fire"], "The land near the Mississippi is soft soil."],
  ["Poverty Point people traded for stone and copper from…", "places hundreds of miles away", ["Europe", "Asia"], "Rivers were their highways."],
  ["Copper found at Poverty Point came from the…", "Great Lakes region", ["Rocky Mountains", "Pacific Islands"], "It traveled by river and trail."],
  ["Soapstone bowls at Poverty Point came from the…", "Appalachian Mountains", ["Amazon River", "Yucatán Peninsula"], "It is a soft stone good for carving."],
  ["Which river was most important for trade at Poverty Point?", "the Mississippi River", ["the Amazon River", "the Nile River"], "It connects much of North America."],
  ["Poverty Point was named a World Heritage Site in…", "2014", ["1776", "1812"], "It is protected for all people.", true],
  ["What does Poverty Point tell us about the people who built it?", "they were organized and worked together", ["they lived alone", "they had no tools"], "Big projects need many people.", true],
  ["Mounds were built at Watson Brake in Louisiana even earlier, about…", "5,000 years ago", ["500 years ago", "50 years ago"], "It is among the oldest in North America.", true],
  ["Which tells archaeologists the most about Poverty Point?", "objects and soil layers they dig up", ["written books from that time", "photographs"], "The builders left no writing.", true],
  ["Small stone tools found at Poverty Point show that people…", "made tools for cutting, scraping and drilling", ["used metal machines", "bought tools in stores"], "Archaeologists study them.", true],
  ["Bird-shaped and other carved stone beads at Poverty Point show people valued…", "art and decoration", ["computers", "money"], "Beads were made with care.", true],
  ["Which is a living Native nation in Louisiana today?", "the Tunica-Biloxi Tribe", ["the Poverty Point people", "the Mayan Empire"], "Its land is near Marksville.", true],
  ["The Mississippi River Delta is…", "land built where the river meets the Gulf", ["a mountain range", "a desert in South America"], "The river drops its mud.", true],
  ["Which is on the Yucatán Peninsula?", "ancient Maya cities", ["Poverty Point", "the Amazon River"], "It is in Mexico and Central America.", true],
];

export const SOCIAL_4: Unit[] = [
  bankUnit({
    id: "la-g4-poverty-point",
    title: "Poverty Point and Louisiana's First Peoples",
    emoji: "⛰️",
    blurb: "Hunters, mound builders and a great trading center",
    parentNote:
      "The first peoples of what would become Louisiana: nomadic hunters, seasonal camps and early mound building, and Poverty Point in northeast Louisiana, its earthworks, food, tools, art and trade along the Mississippi, now a World Heritage Site. Louisiana's Native nations are living communities today.",
    standards: ["4.19", "the first peoples of what would become Louisiana, mound building, and Poverty Point culture and trade"],
    items: POVERTY_POINT,
  }),
];
