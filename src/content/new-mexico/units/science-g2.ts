import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// New Mexico Grade 2 science: copies of California's habitat and land-and-water units without their California places,
// with New Mexico examples added (the Chihuahuan Desert, piñon and juniper, mountain forests, the Rio Grande bosque,
// mesas, White Sands and Elephant Butte Lake).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "nm-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Deserts, mountains, rivers and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from New Mexico's deserts, piñon and juniper hills, mountain forests and river woodlands to oceans and rainforests.",
      standards: ["2-LS4-1", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Roadrunners, jackrabbits and yucca plants live in a…", "desert", ["coral reef", "rainforest", "glacier"], "Southern New Mexico is part of the Chihuahuan Desert."],
      ["Piñon pines and juniper trees cover many of New Mexico's…", "dry hills and mesas", ["ocean floors", "ice caps", "coral reefs"], "These small trees need little water."],
      ["Sandhill cranes spend the winter in marshes along the Rio Grande. A marsh is a kind of…", "wetland", ["desert", "mountain top", "cave"], "Wetlands are wet, marshy land."],
      ["Tall cottonwood trees grow in the bosque, the woods along the…", "Rio Grande", ["sand dunes", "desert floor", "salt flats"], "The trees need water from the river."],
      ["Which animal is built for the dry desert?", "the roadrunner", ["the penguin", "the walrus", "the puffin"], "It gets most of its water from the food it eats."],
      ["Black bears and tall pine trees live high up in New Mexico's…", "mountains", ["coral reefs", "ocean floors", "sand dunes"], "The mountains are cooler and wetter."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["a dry desert", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Why do many desert animals come out at night?", "it is cooler then", ["they are afraid of the moon", "plants sleep in the day", "it rains every night"], "Desert days can be very hot.", true],
      ["Bighorn sheep climb rocky cliffs. Their habitat is the…", "mountains", ["ocean", "swamp", "rainforest"], "Their hooves grip the rock.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "nm-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Hills, mesas, rivers, lakes and oceans.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using New Mexico places like its mountains and mesas, the Rio Grande and Pecos River, Elephant Butte Lake and the dunes of White Sands.",
      standards: ["2-ESS2-2; 2-ESS2-3", "modeling the shapes and kinds of land and water in an area"],
    },
    [
      ["The Rio Grande, which flows from north to south across New Mexico, is a long…", "river", ["mountain", "island", "glacier"], "Its water flows toward the sea."],
      ["A hill with steep sides and a flat top, common in New Mexico, is a…", "mesa", ["valley", "lake", "river"], "Mesa means table in Spanish."],
      ["Land that rises high above the land around it is a…", "mountain", ["valley", "lake", "plain"], "Wheeler Peak is New Mexico's highest mountain."],
      ["Land with water all around it is an…", "island", ["ocean", "river", "valley"], "Some lakes have islands in them."],
      ["Elephant Butte Lake was made when a dam was built across the…", "Rio Grande", ["Pacific Ocean", "Atlantic Ocean", "Gulf of Mexico"], "The dam holds back the river's water."],
      ["Low land between mountains is a…", "valley", ["peak", "island", "lake"], "Rivers often flow through valleys."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["The white hills of sand at White Sands are called…", "dunes", ["glaciers", "canyons", "islands"], "Wind piles the sand into hills.", true],
    ],
  ),
];
