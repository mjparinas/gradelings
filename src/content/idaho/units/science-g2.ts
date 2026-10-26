import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// Idaho Grade 2 science: copies of California's habitat and land-and-water units without their California places,
// with Idaho examples added (sagebrush country, mountain forests, the Snake River, Hells Canyon and the Bruneau Dunes).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "id-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Sagebrush, forests, rivers and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from Idaho's sagebrush plains, mountain forests, rivers and wetlands to oceans, the Arctic and rainforests.",
      standards: ["2-LS-2.1", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Sagebrush, pronghorn and jackrabbits live on dry…", "sagebrush plains", ["coral reefs", "rainforests", "ocean floors"], "Much of southern Idaho is sagebrush country."],
      ["Tall pine trees, elk and moose live in a…", "mountain forest", ["coral reef", "desert", "ocean"], "Forests cover much of northern and central Idaho."],
      ["Trout and salmon live in Idaho's cold, clear…", "rivers and streams", ["sand dunes", "deserts", "caves"], "Fish need water to live."],
      ["Frogs, cattails and ducks live in a…", "wetland", ["desert", "mountain top", "cave"], "Wetlands are wet, marshy places."],
      ["Which animal is built for the cold, icy Arctic?", "the polar bear", ["the jackrabbit", "the rattlesnake", "the hummingbird"], "Thick fur keeps it warm."],
      ["Sage-grouse hide and find food in winter among…", "sagebrush", ["seaweed", "coral", "ice"], "Sage-grouse need sagebrush all year."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["a dry desert", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Mountain goats live on Idaho's high, rocky peaks because…", "their hooves grip steep rock", ["they cannot swim", "they eat only fish", "they like hot sand"], "Their bodies fit their habitat.", true],
      ["Why do more kinds of trees grow in a wet northern Idaho forest than on a dry sagebrush plain?", "the forest gets much more rain and snow", ["the plain gets more rain", "trees grow only in sand", "the plain is under water"], "Trees need plenty of water.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "id-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Mountains, canyons, rivers, lakes and oceans.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using Idaho places like the Snake River, Hells Canyon, Borah Peak, Lake Pend Oreille and the Bruneau Dunes.",
      standards: ["2-ESS-2.2; 2-ESS-2.3", "modeling the shapes and kinds of land and water in an area, and where water is found"],
    },
    [
      ["The long river that curves across southern Idaho is the…", "Snake River", ["Nile River", "Amazon River", "Mississippi River"], "It flows past Idaho Falls and Twin Falls."],
      ["Lake Pend Oreille and Lake Coeur d'Alene in northern Idaho are…", "lakes", ["mountains", "oceans", "deserts"], "Lakes are water with land all around."],
      ["Hells Canyon, on Idaho's western border, is a deep…", "canyon", ["island", "lake", "ocean"], "A river carved it between high cliffs."],
      ["Borah Peak, the highest place in Idaho, is a…", "mountain", ["valley", "lake", "river"], "It is more than 12,000 feet tall."],
      ["The Bruneau Dunes in southern Idaho are big hills made of…", "sand", ["ice", "water", "snow"], "Wind piles up the sand."],
      ["Land with water all around it is an…", "island", ["ocean", "river", "valley"], "Some lakes have islands in them."],
      ["Low land between mountains is a…", "valley", ["peak", "island", "lake"], "Rivers often flow through valleys."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["Most of Idaho's rivers end up flowing into the…", "Pacific Ocean", ["Atlantic Ocean", "Arctic Ocean", "Indian Ocean"], "The Snake River joins a bigger river that reaches the Pacific.", true],
    ],
  ),
];
