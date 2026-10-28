import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// Vermont Grade 2 science: copies of California's habitat and land-and-water units without their California places,
// with Vermont examples added (the Green Mountains' forests and the alpine tundra on Mount Mansfield, Lake Champlain,
// beaver ponds and bogs, the Connecticut, Winooski and Otter Creek rivers).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "vt-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Forests, ponds, mountaintops and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from Vermont's forests, beaver ponds, bogs and windy mountaintops to deserts, oceans and rainforests.",
      standards: ["2-LS4-1", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Moose, black bears and sugar maple trees live in Vermont's…", "forests", ["coral reefs", "deserts", "ice caps"], "Most of Vermont is covered with trees."],
      ["Frogs, turtles and water lilies live in a…", "pond", ["sand dune", "glacier", "cave"], "Ponds are small, still bodies of fresh water."],
      ["A bog is a wet, spongy place where moss and pitcher plants grow. A bog is a kind of…", "wetland", ["desert", "mountain top", "beach"], "Wetlands are wet, marshy land."],
      ["On top of Mount Mansfield, only small, low plants can grow because it is so…", "cold and windy", ["hot and dry", "dark and wet", "sandy"], "Trees can't grow near the very top of the mountain."],
      ["Which animal is built for snowy Vermont winters?", "the snowshoe hare", ["the camel", "the parrot", "the iguana"], "Its fur turns white and its big feet work like snowshoes."],
      ["Loons dive for fish in Vermont's…", "lakes", ["deserts", "sand dunes", "caves"], "Loons need clean, clear water."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["a dry desert", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Why do many desert animals come out at night?", "it is cooler then", ["they are afraid of the moon", "plants sleep in the day", "it rains every night"], "Desert days can be very hot.", true],
      ["A beaver builds a dam across a stream. What does the dam make?", "a pond", ["a mountain", "a desert", "an island of ice"], "The dam holds the water back.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "vt-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Mountains, valleys, rivers and lakes.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using Vermont places like the Green Mountains, Lake Champlain, the Connecticut River and Otter Creek.",
      standards: ["2-ESS2-2; 2-ESS2-3", "modeling the shapes and kinds of land and water in an area"],
    },
    [
      ["Otter Creek, which flows north through Rutland and Middlebury, is a long…", "river", ["mountain", "island", "glacier"], "Its water flows toward Lake Champlain."],
      ["Lake Champlain is the biggest… in Vermont.", "lake", ["mountain", "desert", "river"], "It is a large body of fresh water with land all around it."],
      ["Land that rises high above the land around it is a…", "mountain", ["valley", "lake", "plain"], "Mount Mansfield is Vermont's highest mountain."],
      ["Land with water all around it is an…", "island", ["ocean", "river", "valley"], "Lake Champlain has many islands."],
      ["The Connecticut River runs along Vermont's eastern…", "border", ["mountain top", "ocean floor", "island"], "The river is the line between two states."],
      ["Low land between mountains is a…", "valley", ["peak", "island", "lake"], "Rivers often flow through valleys."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["Vermont is one of the few states that doesn't touch…", "an ocean", ["a lake", "a river", "a mountain"], "Vermont is inland, with no seacoast.", true],
    ],
  ),
];
