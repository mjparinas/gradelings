import { lesson, type GradeLessons } from "../../lessons";

/** Lessons for Oklahoma's own Grade 2 units, keyed "subject/unit-id". */
export const LESSONS: GradeLessons = {
  "science/ok-g2-earth-changes": lesson(
    ["Some Earth changes are fast: a tornado, a flood or a landslide can change a place in minutes or days.", "Some are slow: wind and water wear away rock and soil over many, many years.", "People slow wind and water with windbreaks of trees, grass and walls."],
    "A river slowly makes its valley wider. Is that fast or slow?",
    ["It takes a very long time to wear away the land."],
    "slow",
  ),
  "science/ok-g2-land-water": lesson(
    ["Landforms are shapes of land: mountains, hills, valleys, plains and mesas.", "Bodies of water include rivers, lakes, ponds and oceans.", "A map uses colours and symbols to show land and water. Blue usually means water."],
    "Black Mesa is high with a flat top. Is it a landform or a body of water?",
    ["It is made of land and rock, not water."],
    "a landform",
  ),
  "science/ok-g2-habitats": lesson(
    ["A habitat is the place where a plant or animal lives and finds what it needs.", "Different habitats have different living things: prairies, forests, ponds, oceans and deserts.", "Comparing habitats shows how many kinds of life there are."],
    "Prairie dogs live where grass covers the land. What is their habitat?",
    ["Grass covering open land is a prairie."],
    "a grassland, or prairie",
  ),
  "social/ok-g2-government": lesson(
    ["Liberty means being free to make choices. Equality means everyone gets the same rights.", "There are levels of government: city or town, Tribal Nations, the state and the nation.", "The Bill of Rights protects freedoms like speech and religion. E Pluribus Unum means out of many, one."],
    "Which part of the Constitution protects freedom of speech?",
    ["The first ten amendments list our rights.", "They are called the Bill of Rights."],
    "the Bill of Rights",
  ),
};
