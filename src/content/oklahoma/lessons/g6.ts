import { lesson, type GradeLessons } from "../../lessons";

/** Lessons for Oklahoma's own Grade 6 units, keyed "subject/unit-id". */
export const LESSONS: GradeLessons = {
  "science/ok-g6-weather": lesson(
    ["An air mass is a huge body of air with about the same temperature and moisture.", "Where two air masses meet, a front forms. Fronts bring clouds, rain and storms.", "The sun drives the water cycle: water evaporates, condenses into clouds and falls as rain."],
    "Warm, moist air meets cold, dry air over Oklahoma. What often forms?",
    ["A boundary between air masses is a front.", "Fronts often bring storms."],
    "a front with storms",
  ),
  "science/ok-g6-climate": lesson(
    ["Climate is the usual weather of a region over many years.", "Latitude, distance from the ocean, mountains and winds all shape a region's climate.", "Uneven heating of Earth and its spin make winds and ocean currents that move heat and moisture."],
    "Why are summers hotter in Oklahoma than on the coast?",
    ["Oceans warm and cool slowly.", "Oklahoma is far from any ocean."],
    "it is far from the ocean",
  ),
  "science/ok-g6-earth-surface": lesson(
    ["Earth's surface is broken into plates that move slowly. Fossils, rocks and continent shapes are evidence.", "In the rock cycle, rocks melt, cool, wear down and are pressed into new rock.", "Scientists study patterns in past hazards, like earthquakes, to forecast future ones."],
    "Granite forms from cooled magma. What kind of rock is it?",
    ["Rock made from cooled magma is igneous."],
    "igneous",
  ),
  "science/ok-g6-earth-history": lesson(
    ["Rock layers, or strata, form one on top of another, so lower layers are usually older.", "Fossils in each layer show what lived when that layer formed.", "Geologists put the layers in order to build the geologic time scale."],
    "In undisturbed rock layers, which layer is oldest?",
    ["Each new layer is laid on top of the last."],
    "the bottom layer",
  ),
  "science/ok-g6-design": lesson(
    ["Engineers define a problem with criteria (what success looks like) and constraints (limits like cost).", "They compare solutions and test them, using data to find the best features.", "They improve a design step by step and test again."],
    "A shelter door must stay shut in strong winds. Is that a criterion or a constraint?",
    ["It describes what a successful design must do."],
    "a criterion",
  ),
  // Adopted here from another grade, so its lesson ships with Oklahoma's grade.
  "math/integer-add-subtract": lesson(
    ["On a number line, adding moves right and subtracting moves left.", "A positive and a negative of the same size cancel out: +1 and −1 make 0.", "Subtracting a negative is the same as adding a positive."],
    "−3 + 5 = ?",
    ["Start at −3 on the number line.", "Move 5 to the right: −2, −1, 0, 1, 2."],
    "2",
  ),
  // Adopted here from another grade, so its lesson ships with Oklahoma's grade.
  "social/ny-g5-hemisphere-geography": lesson(
    ["The Western Hemisphere is North and South America.", "Big features: the Andes and Rockies, the Amazon rainforest and River, and the Panama Canal.", "A political map shows countries and borders. A physical map shows landforms."],
    "What is the largest rainforest in the world?",
    ["It is in South America.", "It is named after a great river."],
    "the Amazon rainforest",
  ),
  "social/ok-g6-world-maps": lesson(
    ["The equator is 0° latitude; the prime meridian is 0° longitude. Oklahoma is north and west of both.", "There are 7 continents and 5 oceans. A thematic map shows one topic, like rainfall or crops.", "Use the scale: multiply inches on the map by the miles each inch stands for."],
    "1 inch = 40 miles. Two Oklahoma towns are 3 inches apart. How far apart are they?",
    ["Each inch is 40 miles.", "3 × 40 = 120."],
    "120 miles",
  ),
};
