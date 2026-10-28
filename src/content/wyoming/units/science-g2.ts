import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// Wyoming Grade 2 science: a copy of California's habitats unit without its California places, with Wyoming examples
// added (the sagebrush plains, mountain forests, alpine meadows, rivers and wetlands, and the sand dunes of the Red
// Desert).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "wy-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Sagebrush, forests, mountaintops and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from Wyoming's sagebrush plains, mountain forests, rivers and windy mountaintops to deserts, oceans and rainforests.",
      standards: ["2-LS4-1", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Pronghorn, sage grouse and jackrabbits live on Wyoming's…", "sagebrush plains", ["coral reefs", "rainforests", "ice caps"], "Much of Wyoming is wide, open sagebrush land."],
      ["Moose, elk and lodgepole pines live in Wyoming's mountain…", "forests", ["deserts", "oceans", "caves"], "Trees cover the mountainsides."],
      ["Trout, beavers and willows live along Wyoming's…", "rivers and streams", ["sand dunes", "glaciers", "mountaintops"], "They need fresh, moving water."],
      ["High in the mountains, only small, low plants grow because it is so…", "cold and windy", ["hot and dry", "dark and wet", "sandy"], "Trees can't grow above a certain height."],
      ["A small, round animal called the pika gathers grass in the rocky…", "high mountains", ["ocean", "rainforest", "pond"], "Pikas live among rocks above the trees."],
      ["Prairie dogs dig homes under the…", "grasslands", ["ocean", "glacier", "lake"], "Their tunnels are called towns."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["a dry desert", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Why do many desert animals come out at night?", "it is cooler then", ["they are afraid of the moon", "plants sleep in the day", "it rains every night"], "Desert days can be very hot.", true],
      ["A beaver builds a dam across a stream. What does the dam make?", "a pond", ["a mountain", "a desert", "an island of ice"], "The dam holds the water back.", true],
    ],
  ),
];
