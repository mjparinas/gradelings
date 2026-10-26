import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// Nebraska Grade 2 science: copies of California's habitat and land-and-water units without their California places,
// with Nebraska examples added (the prairie, the Sandhills, the Rainwater Basin wetlands, woodlands along rivers, the
// Platte, Niobrara and Missouri Rivers, and Lake McConaughy).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "neb-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Prairies, wetlands, woods and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from Nebraska's prairie, Sandhills, wetlands and river woodlands to oceans, deserts and rainforests.",
      standards: ["SC.2.7.2.c", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Bison, meadowlarks and tall grasses live on the…", "prairie", ["coral reef", "rainforest", "glacier"], "Prairie once covered almost all of Nebraska."],
      ["Where would a prairie dog dig its home?", "under a grassy plain", ["in the open ocean", "on an ice cap", "on a coral reef"], "Prairie dogs live in western Nebraska grasslands."],
      ["Frogs, cattails and ducks live in a…", "wetland", ["desert", "mountain top", "cave"], "The Rainwater Basin has many Nebraska wetlands."],
      ["Catfish and turtles swim in…", "the Platte River", ["a sand dune", "a desert floor", "a cornfield"], "Many fish live in Nebraska rivers and lakes."],
      ["Which animal is built for a dry desert?", "the desert tortoise", ["the penguin", "the walrus", "the puffin"], "It digs burrows to stay cool."],
      ["Cottonwood trees, Nebraska's state tree, grow best…", "along rivers and creeks", ["on bare rock", "in the ocean", "on ice"], "Their roots need water nearby."],
      ["The Sandhills are hills of sand held in place by…", "grass", ["ice", "seaweed", "coral"], "Grass roots keep the sand from blowing away."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["a dry desert", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Why do huge flocks of sandhill cranes stop along the Platte River each spring?", "to rest and eat on their long trip", ["to build snow nests", "to find the ocean", "to sleep all winter"], "Rivers and wetlands are rest stops for travelling birds.", true],
      ["Big bluestem is a grass that can grow taller than an adult. Its habitat is the…", "tallgrass prairie", ["ocean", "swamp", "rainforest"], "It is one of the main prairie grasses.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "neb-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Hills, plains, rivers, lakes and oceans.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using Nebraska places like the plains, the Sandhills, the Platte, Niobrara and Missouri Rivers and Lake McConaughy.",
      standards: ["SC.2.13.3.c; SC.2.13.3.d", "modeling the shapes and kinds of land and water in an area"],
    },
    [
      ["Lake McConaughy, the biggest lake in Nebraska, is a…", "lake", ["ocean", "mountain", "desert"], "It was made by a dam."],
      ["The Platte River is a long, wide…", "river", ["mountain", "island", "glacier"], "It flows across Nebraska from west to east."],
      ["Wide, flat land is called a…", "plain", ["valley", "lake", "mountain"], "Much of Nebraska is part of the Great Plains."],
      ["Land with water all around it is an…", "island", ["ocean", "river", "valley"], "The Platte River has many sandy islands."],
      ["The Sandhills are rolling…", "hills", ["oceans", "glaciers", "islands"], "They are covered with prairie grass."],
      ["Low land along a river is a…", "valley", ["peak", "island", "lake"], "Rivers carve valleys over time."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["Which river forms Nebraska's eastern border?", "the Missouri River", ["the Nile", "the Amazon", "the Rio Grande"], "It flows past Omaha.", true],
    ],
  ),
];
