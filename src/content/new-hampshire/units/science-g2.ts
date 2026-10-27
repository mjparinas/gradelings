import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// New Hampshire Grade 2 science: copies of California's habitat and land-and-water units without their California
// places, with New Hampshire examples added (the White Mountains' forests and alpine zone, Great Bay's salt marsh,
// ponds and bogs, Lake Winnipesaukee, the Merrimack and Connecticut rivers and the short Atlantic coast).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "nh-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Forests, marshes, mountaintops and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from New Hampshire's forests, ponds, salt marshes and windy mountaintops to deserts, oceans and rainforests.",
      standards: ["2-LS4-1", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Moose, black bears and white birch trees live in New Hampshire's…", "forests", ["coral reefs", "deserts", "ice caps"], "Most of New Hampshire is covered with trees."],
      ["Frogs, turtles and water lilies live in a…", "pond", ["sand dune", "glacier", "cave"], "Ponds are small, still bodies of fresh water."],
      ["Salt marsh grass, crabs and herons live where the ocean meets the land at Great Bay. A salt marsh is a kind of…", "wetland", ["desert", "mountain top", "forest"], "Wetlands are wet, marshy land."],
      ["On top of Mount Washington, only small, low plants can grow because it is so…", "cold and windy", ["hot and dry", "dark and wet", "sandy"], "Trees can't grow above a certain height on the mountain."],
      ["Which animal is built for snowy New Hampshire winters?", "the snowshoe hare", ["the camel", "the parrot", "the iguana"], "Its fur turns white and its big feet work like snowshoes."],
      ["Loons dive for fish in New Hampshire's…", "lakes", ["deserts", "sand dunes", "caves"], "Loons need clean, clear water."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["a dry desert", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Why do many desert animals come out at night?", "it is cooler then", ["they are afraid of the moon", "plants sleep in the day", "it rains every night"], "Desert days can be very hot.", true],
      ["A beaver builds a dam across a stream. What does the dam make?", "a pond", ["a mountain", "a desert", "an island of ice"], "The dam holds the water back.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "nh-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Mountains, valleys, rivers, lakes and the ocean.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using New Hampshire places like the White Mountains, the Merrimack and Connecticut rivers, Lake Winnipesaukee and the Atlantic coast.",
      standards: ["2-ESS2-2; 2-ESS2-3", "modeling the shapes and kinds of land and water in an area"],
    },
    [
      ["The Merrimack, which flows south through Concord and Manchester, is a long…", "river", ["mountain", "island", "glacier"], "Its water flows toward the sea."],
      ["Lake Winnipesaukee is the biggest… in New Hampshire.", "lake", ["mountain", "desert", "river"], "It is a large body of fresh water with land all around it."],
      ["Land that rises high above the land around it is a…", "mountain", ["valley", "lake", "plain"], "Mount Washington is New Hampshire's highest mountain."],
      ["Land with water all around it is an…", "island", ["ocean", "river", "valley"], "Lake Winnipesaukee has many islands."],
      ["The Connecticut River runs along New Hampshire's western…", "border", ["mountain top", "ocean floor", "island"], "The river separates New Hampshire from Vermont."],
      ["Low land between mountains is a…", "valley", ["peak", "island", "lake"], "Rivers often flow through valleys."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["New Hampshire's short coast is on which ocean?", "the Atlantic Ocean", ["the Pacific Ocean", "the Arctic Ocean", "the Indian Ocean"], "It is on the east side of the country.", true],
    ],
  ),
];
