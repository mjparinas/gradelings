import type { Unit } from "../../types";
import { SOCIAL_2 as CALIFORNIA_2 } from "../../california/units/social-g2";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Vermont Grade 2 social studies, "The Americas" (the Agency of Education's K-8 framework): the countries, landforms,
// waters and peoples of North, Central and South America on maps and globes (D2.Geo.3.K-2, D2.Geo.6.K-2,
// D2.Geo.10.K-2) and why countries of the Americas trade (D2.Eco.14.K-2), plus copies of California's difference
// makers (D2.His.3.K-2), family journeys (D2.Geo.7.K-2) and making and trading (D2.Eco.4.K-2, D2.Eco.15.K-2) units
// without their California places, with Vermont items added.

const AMERICAS: Q[] = [
  ["The United States is on the continent of…", "North America", ["South America", "Africa", "Europe"], "Canada and Mexico are on it too."],
  ["Which country is Vermont's neighbor to the north?", "Canada", ["Mexico", "Brazil", "Peru"], "You can drive from Vermont to Canada."],
  ["Which country is the neighbor of the United States to the south?", "Mexico", ["Canada", "Chile", "Japan"], "It is south of states like Texas."],
  ["Which country is in South America?", "Brazil", ["Canada", "France", "China"], "It is the biggest country in South America."],
  ["The long mountains on the west side of South America are the…", "Andes", ["Green Mountains", "Alps", "Himalayas"], "Llamas live high in these mountains."],
  ["The biggest rainforest in the world is in South America. It is the…", "Amazon", ["Sahara", "Arctic", "Gobi"], "A huge river runs through it."],
  ["A hot, wet place with tall trees and lots of rain is a…", "rainforest", ["desert", "glacier", "tundra"], "Many animals live in its treetops."],
  ["The narrow strip of land that joins North and South America is…", "Central America", ["Antarctica", "Greenland", "Australia"], "Countries like Panama are there."],
  ["Ships sail between the Atlantic and Pacific Oceans through the…", "Panama Canal", ["Erie Canal", "Amazon River", "Lake Champlain"], "It cuts across Panama."],
  ["Which ocean is on the east side of the Americas?", "the Atlantic Ocean", ["the Pacific Ocean", "the Indian Ocean", "the Arctic Ocean"], "Europe is across it."],
  ["Which ocean is on the west side of the Americas?", "the Pacific Ocean", ["the Atlantic Ocean", "the Indian Ocean", "Lake Champlain"], "It is the biggest ocean."],
  ["Jamaica and Cuba are islands in the warm…", "Caribbean Sea", ["Arctic Ocean", "Dead Sea", "Lake Champlain"], "It is south of the United States."],
  ["Most people in Mexico speak…", "Spanish", ["Japanese", "German", "Russian"], "Most countries in Central and South America speak it too."],
  ["Most people in Brazil speak…", "Portuguese", ["French", "Chinese", "Italian"], "Settlers from Portugal came long ago."],
  ["In Canada, many people speak English and…", "French", ["Spanish", "Japanese", "Greek"], "Many families near Vermont speak French."],
  ["Monarch butterflies fly south each fall to spend the winter in…", "Mexico", ["Canada", "Greenland", "Antarctica"], "They fly thousands of miles."],
  ["Llamas help people carry loads in the high…", "Andes mountains", ["Amazon River", "Caribbean Sea", "Great Plains"], "Llamas are sure-footed on steep paths."],
  ["In the far north of North America, near the Arctic, the land is very…", "cold", ["hot", "sandy", "tropical"], "Polar bears live there."],
  ["A globe is a model of…", "Earth", ["the moon", "a town", "the sun"], "It is round like Earth."],
  ["On a map, the compass rose shows…", "directions", ["the weather", "the time", "the people"], "N, S, E and W."],
  ["South America is… of North America.", "south", ["north", "east", "west"], "Look below North America on a map."],
  ["Bananas and coffee grow in warm countries like Costa Rica and Colombia. We get them by…", "trading", ["growing them in Vermont snow", "finding them in the forest", "making them in a factory"], "Countries trade what they grow."],
  ["The Maya people built tall stone pyramids long ago in Mexico and Central America. Today, Maya people…", "still live there", ["have all disappeared", "live on the moon", "live in Antarctica"], "Millions of Maya people live there today.", true],
  ["Why do countries in the Americas trade with each other?", "each has things the others need", ["trade is a game", "no country makes anything", "they all grow the same crops"], "Different places make different things.", true],
  ["The Amazon River flows into which ocean?", "the Atlantic Ocean", ["the Pacific Ocean", "Lake Champlain", "the Caribbean Sea"], "It flows east across Brazil.", true],
  ["Which continent is closest to the southern tip of South America?", "Antarctica", ["Europe", "Asia", "Australia"], "It is the icy continent at the South Pole.", true],
  ["Hurricanes often strike islands in the Caribbean because the sea there is…", "warm", ["frozen", "dry", "very small"], "Warm water feeds these storms.", true],
  ["Which country shares the longest border with the United States?", "Canada", ["Mexico", "Cuba", "Panama"], "It is to the north.", true],
];

const DIFFERENCE_EXTRA: Q[] = [
  ["Wilson Bentley of Jericho, Vermont, was the first person to take a photo of a single…", "snowflake", ["star", "dinosaur", "volcano"], "He photographed thousands of them."],
  ["Alexander Twilight, who studied at Middlebury College, was the first African American to…", "graduate from a college in the United States", ["fly an airplane", "walk on the moon", "invent the telephone"], "He later led a school in Brownington, Vermont."],
  ["Calvin Coolidge, born in Plymouth Notch, Vermont, became the 30th…", "President of the United States", ["governor of Texas", "astronaut", "mayor of Boston"], "He took the oath of office in his family's farmhouse."],
  ["John Deere, born in Rutland, Vermont, made a difference for farmers by building a better…", "steel plow", ["airplane", "computer", "telephone"], "His plow cut through thick, sticky soil."],
  ["Madeleine Kunin made history in 1985 as the first woman to be…", "governor of Vermont", ["President", "an astronaut", "a pilot"], "She was elected three times."],
  ["A person who makes a difference often…", "helps others and solves problems", ["only helps themselves", "gives up", "breaks rules"], "Anyone can make a difference.", true],
  ["Which is a way a 2nd grader can make a difference?", "help pick up litter at a park", ["throw trash on the ground", "be unkind to a new student", "waste water"], "Small acts help a community.", true],
];

const JOURNEYS_EXTRA: Q[] = [
  ["Long ago, many families from Canada came to Vermont to find…", "work", ["gold", "dinosaurs", "the ocean"], "Farms and mills needed workers."],
  ["About 100 years ago, stonecutters from Italy and Scotland came to Barre to work in the…", "granite quarries", ["airports", "space stations", "volcanoes"], "Barre granite is famous."],
  ["Long ago, a fast way to travel between Vermont towns was the…", "railroad", ["airplane", "subway", "spaceship"], "Trains were much faster than wagons."],
  ["Today, families from places like Africa and Asia make new homes in Burlington and Winooski. They bring their own…", "languages, foods and traditions", ["mountains", "oceans", "weather"], "New neighbors add to the community."],
  ["A family moves to Rutland to be near grandparents. Why did they move?", "to be near family", ["to find gold", "to escape a flood", "to go to the beach"], "Families move for many reasons.", true],
  ["Many early settlers came to New England by sailing across the…", "Atlantic Ocean", ["Pacific Ocean", "Indian Ocean", "Arctic Ocean"], "Europe is across the ocean to the east.", true],
];

const TRADING_EXTRA: Q[] = [
  ["Dairy farms in Vermont send milk to a plant where it is…", "cleaned, packed and cooled", ["painted", "frozen into rocks", "turned into paper"], "Milk is processed before it goes to the store."],
  ["In late winter, Vermont farmers boil maple sap to make…", "maple syrup", ["cheese", "bread", "juice"], "It takes about 40 gallons of sap to make one gallon of syrup."],
  ["Much of Vermont's milk is made into…", "cheese", ["glass", "paper", "rope"], "Cheddar is a famous Vermont cheese."],
  ["Vermont maple syrup is sold in other states and countries. This shows that…", "people in different places trade", ["no one eats syrup", "trade is not allowed", "syrup grows in stores"], "Buyers and sellers depend on each other.", true],
  ["Most of the bananas sold in Vermont grocery stores are grown…", "in other countries and shipped in", ["in Vermont forests", "in Montpelier", "in Lake Champlain"], "Bananas need a warm, wet climate.", true],
  ["Vermont's forests are a natural resource used to make…", "lumber and furniture", ["glass", "plastic", "gasoline"], "Trees are cut, sawed and shipped.", true],
];

export const SOCIAL_2: Unit[] = [
  bankUnit({
    id: "vt-g2-the-americas",
    title: "The Americas",
    emoji: "🌎",
    blurb: "Countries, mountains, rivers and peoples of the Americas",
    parentNote: "North, Central and South America on maps and globes: the United States and its neighbors Canada and Mexico, countries such as Brazil, the Andes, the Amazon rainforest, the Caribbean, the Panama Canal and the oceans on each side, the languages people speak, and why the countries of the Americas trade.",
    standards: ["D2.Geo.3.K-2; D2.Geo.6.K-2; D2.Geo.10.K-2; D2.Eco.14.K-2", "using maps and globes to find places, the cultural and environmental characteristics of the Americas, and why countries trade"],
    items: AMERICAS,
  }),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-difference-makers"),
    {
      id: "vt-g2-difference-makers",
      title: "People Who Made a Difference",
      emoji: "🌟",
      blurb: "Heroes long ago and today",
      parentNote:
        "People from long ago and the recent past whose courage, ideas and hard work made life better, such as Rosa Parks, Harriet Tubman, Sally Ride and Dolores Huerta, and people from Vermont like Wilson Bentley, Alexander Twilight, Calvin Coolidge, John Deere and Madeleine Kunin.",
      standards: ["D2.His.3.K-2; D2.Civ.14.K-2", "individuals and groups who shaped significant historical change, and how people have tried to improve their communities"],
    },
    DIFFERENCE_EXTRA,
  ),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-family-journeys"),
    {
      id: "vt-g2-family-journeys",
      title: "Family Journeys",
      emoji: "🧳",
      blurb: "Where families came from, and why",
      parentNote:
        "Finding on a world map where a family's ancestors lived, how families traveled long ago and today (sailing ships, railroads and airplanes), when they moved, and the reasons people move, from the families who came from Canada, Italy and Scotland to work on Vermont's farms and in its mills and quarries to new neighbors today.",
      standards: ["D2.Geo.7.K-2; D2.His.2.K-2", "why and how people, goods and ideas move from place to place, and comparing life in the past to life today"],
    },
    JOURNEYS_EXTRA,
  ),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-making-trading"),
    {
      id: "vt-g2-making-trading",
      title: "Making & Trading",
      emoji: "🧺",
      blurb: "From farm to table",
      parentNote:
        "How food is grown, processed, shipped and sold long ago and today, the work of farmers, processors, distributors and grocers, and why people trade, with Vermont examples like dairy farms, cheese, maple syrup and lumber.",
      standards: ["D2.Eco.4.K-2; D2.Eco.15.K-2", "the goods produced in the local community and elsewhere, and products made abroad and sold here"],
    },
    TRADING_EXTRA,
  ),
];
