import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// Michigan Grade 2 science: copies of California's habitat and land-and-water units without their California places,
// with Michigan examples added (forests, dunes, wetlands, the Great Lakes and the two peninsulas).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "mi-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Forests, dunes, wetlands and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from Michigan's forests, sand dunes, wetlands and Great Lakes to oceans, deserts and rainforests.",
      standards: ["2-LS4-1", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Tall pines, maples and black bears are found in a…", "forest", ["coral reef", "desert", "glacier"], "Forests cover much of northern Michigan."],
      ["Where would a white-tailed deer find shade and food in Michigan?", "a woodland", ["the open ocean", "an ice cap", "a coral reef"], "Deer browse on leaves and acorns."],
      ["Frogs, cattails and herons live in a…", "wetland", ["desert", "mountain top", "cave"], "Wetlands are wet, marshy land."],
      ["Yellow perch and lake trout swim in…", "the Great Lakes", ["a sand dune", "a forest floor", "a cornfield"], "Michigan touches four of the five Great Lakes."],
      ["Which bird lives in Michigan all year?", "northern cardinal", ["penguin", "flamingo", "puffin"], "Cardinals stay all winter."],
      ["Beach grass grows on hills of sand by the lake called…", "dunes", ["glaciers", "reefs", "volcanoes"], "Wind piles up sand along Lake Michigan."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["a forest in winter", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Why do dune grasses have long roots?", "to hold on in moving sand", ["to keep them warm", "to catch insects", "to grow fruit"], "Roots also hold the dune in place.", true],
      ["Moose live on Isle Royale in Lake Superior. Isle Royale is an…", "island", ["ocean", "desert", "volcano"], "Water surrounds it.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "mi-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Hills, valleys, rivers, lakes and oceans.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using Michigan places like the Great Lakes, the two peninsulas, Isle Royale and the Grand River.",
      standards: ["2-ESS2-2; 2-ESS2-3", "modeling the shapes and kinds of land and water in an area"],
    },
    [
      ["Lake Michigan is one of the five…", "Great Lakes", ["oceans", "mountains", "deserts"], "The Great Lakes hold fresh water."],
      ["The Grand River is a long…", "river", ["mountain", "island", "glacier"], "It flows west to Lake Michigan."],
      ["Land with water on three sides is a…", "peninsula", ["mountain", "valley", "desert"], "Michigan has two of them."],
      ["Land with water all around it is an…", "island", ["ocean", "river", "valley"], "Mackinac Island is one."],
      ["The Mackinac Bridge joins Michigan's two…", "peninsulas", ["oceans", "deserts", "volcanoes"], "The Upper and Lower Peninsulas."],
      ["Low land between hills, often with a river, is a…", "valley", ["peak", "island", "lake"], "Rivers carve valleys."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["Is the water in Lake Superior fresh or salty?", "fresh", ["salty", "frozen all year", "boiling"], "The Great Lakes are fresh water.", true],
    ],
  ),
];
