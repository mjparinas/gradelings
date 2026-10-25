import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// Kentucky Grade 2 science: copies of California's habitat and land-and-water units without their California places,
// with Kentucky examples added (forests, caves, wetlands, rivers and lakes).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "ky-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Forests, caves, wetlands and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from Kentucky's forests, caves, wetlands and rivers to oceans, deserts and rainforests.",
      standards: ["2-LS4-1", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Tall oaks, tulip poplars and black bears are found in a…", "forest", ["coral reef", "desert", "glacier"], "Forests cover much of eastern Kentucky."],
      ["Where would a white-tailed deer find shade and food in Kentucky?", "a woodland", ["the open ocean", "an ice cap", "a coral reef"], "Deer browse on leaves and acorns."],
      ["Frogs, cattails and herons live in a…", "wetland", ["desert", "mountain top", "cave"], "Wetlands are wet, marshy land."],
      ["Blind cave fish that have no eyes live in the dark of…", "Mammoth Cave", ["a cornfield", "a sunny meadow", "a treetop"], "Some cave animals never see light."],
      ["Which bird lives in Kentucky all year?", "northern cardinal", ["penguin", "flamingo", "puffin"], "Cardinals stay all winter."],
      ["Catfish, bass and turtles live in Kentucky's…", "rivers and lakes", ["sand dunes", "treetops", "deserts"], "Kentucky has many rivers."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["a forest in winter", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Why do many cave animals have no color and tiny or no eyes?", "they live in total darkness", ["they live in deserts", "they eat sunlight", "they are always asleep"], "Eyes are not useful without light.", true],
      ["Kentucky's Red River Gorge has stone arches and forests. A gorge is a…", "deep, narrow valley", ["ocean", "desert", "volcano"], "A river carved it.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "ky-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Hills, valleys, rivers, lakes and oceans.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using Kentucky places like the Ohio and Mississippi rivers, Kentucky Lake, the Appalachian Mountains and the Bluegrass.",
      standards: ["2-ESS2-2; 2-ESS2-3", "modeling the shapes and kinds of land and water in an area"],
    },
    [
      ["The Ohio River is a long…", "river", ["mountain", "island", "glacier"], "It forms Kentucky's northern border."],
      ["Kentucky Lake was made when people built a…", "dam on a river", ["mountain", "volcano", "glacier"], "The dam holds back the Tennessee River."],
      ["The mountains of eastern Kentucky are part of the…", "Appalachian Mountains", ["Rocky Mountains", "Alps", "Andes"], "They are old, rounded mountains."],
      ["Land with water all around it is an…", "island", ["ocean", "river", "valley"], "Islands are in rivers, lakes and oceans."],
      ["Gently rolling land with small hills, like the Bluegrass, is…", "hilly plains", ["a high mountain", "an ocean", "a glacier"], "Horses graze there."],
      ["Low land between hills, often with a river, is a…", "valley", ["peak", "island", "lake"], "Rivers carve valleys."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["Is the water in the Kentucky River fresh or salty?", "fresh", ["salty", "frozen all year", "boiling"], "Rivers carry fresh water.", true],
    ],
  ),
];
