import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// Kansas Grade 2 science: copies of California's habitat and land-and-water units without their California places,
// with Kansas examples added (the tallgrass prairie, Cheyenne Bottoms, woodlands along rivers, the Kansas, Arkansas and
// Missouri Rivers, the Flint Hills and Milford Lake).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "ks-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Prairies, wetlands, woods and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from Kansas's tallgrass prairie, wetlands and river woodlands to oceans, deserts and rainforests.",
      standards: ["2-LS4-1", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Bison, meadowlarks and tall grasses live on the…", "prairie", ["coral reef", "rainforest", "glacier"], "The Flint Hills have the biggest tallgrass prairie left."],
      ["Where would a prairie dog dig its home?", "under a grassy plain", ["in the open ocean", "on an ice cap", "on a coral reef"], "Prairie dogs live in western Kansas grasslands."],
      ["Frogs, cattails and ducks live in a…", "wetland", ["desert", "mountain top", "cave"], "Cheyenne Bottoms is a big Kansas wetland."],
      ["Catfish and turtles swim in…", "the Kansas River", ["a sand dune", "a desert floor", "a wheat field"], "Many fish live in Kansas rivers and lakes."],
      ["Which animal is built for a dry desert?", "the desert tortoise", ["the penguin", "the walrus", "the puffin"], "It digs burrows to stay cool."],
      ["Cottonwood trees grow best…", "along rivers and creeks", ["on bare rock", "in the ocean", "on ice"], "Their roots need water nearby."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["a dry desert", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Why do thousands of shorebirds stop at Cheyenne Bottoms in spring?", "to rest and eat on their long trip", ["to build snow nests", "to find the ocean", "to sleep all winter"], "Wetlands are rest stops for travelling birds.", true],
      ["Big bluestem is a grass that can grow taller than an adult. Its habitat is the…", "tallgrass prairie", ["ocean", "swamp", "rainforest"], "It is one of the main prairie grasses.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "ks-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Hills, plains, rivers, lakes and oceans.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using Kansas places like the High Plains, the Flint Hills, the Kansas, Arkansas and Missouri Rivers and Milford Lake.",
      standards: ["2-ESS2-2; 2-ESS2-3", "modeling the shapes and kinds of land and water in an area"],
    },
    [
      ["Milford Lake, the biggest lake in Kansas, is a…", "lake", ["ocean", "mountain", "desert"], "It was made by a dam."],
      ["The Arkansas River is a long…", "river", ["mountain", "island", "glacier"], "It flows through Wichita."],
      ["Wide, flat land is called a…", "plain", ["valley", "lake", "mountain"], "Western Kansas is part of the High Plains."],
      ["Land with water all around it is an…", "island", ["ocean", "river", "valley"], "Some lakes have islands in them."],
      ["The Flint Hills are rolling…", "hills", ["oceans", "glaciers", "islands"], "They are covered with prairie grass."],
      ["Low land along a river is a…", "valley", ["peak", "island", "lake"], "Rivers carve valleys over time."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["Which river forms part of the border between Kansas and Missouri?", "the Missouri River", ["the Nile", "the Amazon", "the Rio Grande"], "It flows past Atchison and Leavenworth.", true],
    ],
  ),
];
