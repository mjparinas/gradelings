import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Idaho Grade 1 social studies: map skills with Idaho as our state, using map symbols for land, water, cities and roads,
// cardinal directions, and finding Idaho, the United States, the continents and the oceans (1.SS.2.1), and how people in
// Idaho adjust to and change their environment (1.SS.2.2).

const PLACES: Q[] = [
  ["Our state is called…", "Idaho", ["Texas", "Florida", "Hawaii"], "It is in the western United States."],
  ["Idaho's capital city is…", "Boise", ["Chicago", "Seattle", "Denver"], "The capital is where state leaders meet."],
  ["Idaho is one of the 50 states in the…", "United States", ["ocean", "moon", "Arctic"], "Our country has 50 states."],
  ["The United States is on the continent of…", "North America", ["Africa", "Asia", "Europe"], "A continent is a huge piece of land."],
  ["On a map, which way is north?", "up, toward the top", ["down", "inside", "nowhere"], "Look for N on the compass rose."],
  ["The four main directions are north, south, east and…", "west", ["up", "left", "over"], "N, S, E and W."],
  ["On a map, blue usually shows…", "water", ["roads", "cities", "mountains"], "Rivers and lakes are blue."],
  ["A map key tells you…", "what the symbols mean", ["the time", "the weather", "who drew it"], "It is also called a legend."],
  ["On a map, a star often marks the…", "capital city", ["biggest lake", "school", "farm"], "Boise has a star on Idaho maps."],
  ["The big river across southern Idaho is the…", "Snake River", ["Nile River", "Amazon River", "Ganges River"], "Its name is also an animal."],
  ["Idaho has lots of tall…", "mountains", ["icebergs", "volcanoes erupting", "palm trees"], "Some stay snowy most of the year."],
  ["A compass rose on a map shows…", "directions", ["the time", "the weather", "the colors"], "It points north, south, east and west."],
  ["The largest ocean on Earth is the…", "Pacific Ocean", ["Arctic Ocean", "Indian Ocean", "Atlantic Ocean"], "It is west of the United States."],
  ["A globe is a model of…", "Earth", ["the moon", "a ball game", "the sun"], "It is round like Earth."],
  ["Lines on a map that show roads help people…", "find the way to a place", ["swim", "grow food", "sleep"], "Roads connect towns."],
  ["In Idaho's cold winters, people stay warm by wearing…", "coats, hats and boots", ["swimsuits", "sandals", "nothing extra"], "People change what they wear."],
  ["Idaho farmers bring river water to dry fields with…", "canals and sprinklers", ["umbrellas", "snowballs", "buckets of sand"], "This is called irrigation."],
  ["People built dams on Idaho rivers to…", "store water and make electricity", ["catch the moon", "make rivers saltier", "stop the snow"], "A dam holds water back."],
  ["Lake Coeur d'Alene is in which part of Idaho?", "the north", ["the south", "the far east", "outside Idaho"], "Northern Idaho has many lakes.", true],
  ["Which continent is south of North America?", "South America", ["Europe", "Asia", "Australia"], "Look below North America on a globe.", true],
  ["Which ocean is east of the United States?", "Atlantic Ocean", ["Pacific Ocean", "Arctic Ocean", "Indian Ocean"], "It is on the other side from the Pacific.", true],
  ["When you draw a map, the title tells…", "what the map shows", ["your age", "the weather", "what you ate"], "Every map needs a title.", true],
  ["People cut trails and build ski lifts in Idaho's mountains. This shows people…", "changing the land to use it", ["never changing anything", "living under water", "moving mountains away"], "People change their environment.", true],
  ["Idaho is in which part of the United States?", "the West", ["the far East", "the South", "the middle of the ocean"], "Look at the left side of a map of the country.", true],
];

export const SOCIAL_1: Unit[] = [
  bankUnit({
    id: "id-g1-idaho-places",
    title: "Idaho on the Map",
    emoji: "🗺️",
    blurb: "Our state, our capital and the world",
    parentNote: "Using a map of Idaho: map symbols for land, water, cities and roads, the map key and compass rose, the four directions, Boise as the state capital, the Snake River and Idaho's mountains, then finding Idaho, the United States, the continents and the oceans on a globe, and how people in Idaho adjust to and change their environment.",
    standards: ["1.SS.2.1; 1.SS.2.2", "map symbols and directions, finding Idaho, the United States, the continents and the oceans, and how people adjust to and change their environment"],
    items: PLACES,
  }),
];
