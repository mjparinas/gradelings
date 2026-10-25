import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// Nevada Grade 2 science: copies of California's habitat and land-and-water units without their California places,
// with Nevada examples added (deserts, sagebrush, mountains, Lake Tahoe, Pyramid Lake and the Humboldt River).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "nv-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Deserts, mountains, lakes and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from Nevada's deserts, sagebrush valleys, mountain forests and lakes to oceans and rainforests.",
      standards: ["2-LS4-1", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Joshua trees, jackrabbits and desert tortoises live in a…", "desert", ["coral reef", "rainforest", "glacier"], "Southern Nevada is part of the Mojave Desert."],
      ["Where would a mule deer find food in northern Nevada?", "among sagebrush and grasses", ["in the open ocean", "on an ice cap", "on a coral reef"], "Sagebrush covers much of Nevada's valleys."],
      ["Frogs, cattails and ducks live in a…", "wetland", ["desert", "mountain top", "cave"], "Wetlands are wet, marshy land."],
      ["Trout and other fish swim in…", "Lake Tahoe", ["a sand dune", "a desert floor", "a cornfield"], "Lake Tahoe is a deep mountain lake."],
      ["Which animal is built for the dry desert?", "the desert tortoise", ["the penguin", "the walrus", "the puffin"], "It digs burrows to stay cool."],
      ["Tall pine trees and cool air are found high up on…", "mountains", ["coral reefs", "ocean floors", "sand dunes"], "Nevada has many mountain ranges."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["a dry desert", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Why do many desert animals come out at night?", "it is cooler then", ["they are afraid of the moon", "plants sleep in the day", "it rains every night"], "Desert days can be very hot.", true],
      ["Bighorn sheep climb rocky cliffs. Their habitat is the…", "mountains", ["ocean", "swamp", "rainforest"], "Their hooves grip the rock.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "nv-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Hills, valleys, rivers, lakes and oceans.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using Nevada places like its mountain ranges and valleys, Lake Tahoe, Pyramid Lake, Lake Mead and the Humboldt River.",
      standards: ["2-ESS2-2; 2-ESS2-3", "modeling the shapes and kinds of land and water in an area"],
    },
    [
      ["Lake Tahoe, on Nevada's western edge, is a big…", "lake", ["ocean", "mountain", "desert"], "It sits high in the mountains."],
      ["The Humboldt River is a long…", "river", ["mountain", "island", "glacier"], "It flows across northern Nevada."],
      ["Land that rises high above the land around it is a…", "mountain", ["valley", "lake", "plain"], "Nevada has more than 300 mountain ranges."],
      ["Land with water all around it is an…", "island", ["ocean", "river", "valley"], "Some lakes have islands in them."],
      ["Lake Mead was made when a dam was built across the…", "Colorado River", ["Pacific Ocean", "Humboldt Sink", "Gulf of Mexico"], "The dam holds back the river's water."],
      ["Low land between mountains is a…", "valley", ["peak", "island", "lake"], "Nevada has valleys between its ranges."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["Pyramid Lake has no river flowing out to the sea. Its water is a little…", "salty", ["frozen all year", "boiling", "sweet like juice"], "Water leaves only by drying up, and salt stays behind.", true],
    ],
  ),
];
