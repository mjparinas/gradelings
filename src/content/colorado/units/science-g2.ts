import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// Colorado Grade 2 science: copies of California's habitat and land-and-water units without their California places,
// with Colorado examples added (plains, forests, alpine tundra, wetlands and the big rivers).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "co-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Prairies, woods, wetlands and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from Colorado's plains, forests, alpine tundra and wetlands to oceans, deserts and rainforests.",
      standards: ["LS2.2.2.a", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Short grasses and wildflowers cover Colorado's flat…", "plains", ["coral reefs", "glaciers", "rainforests"], "The Eastern Plains are a grassland."],
      ["Where would an elk find shade and food in Colorado?", "a mountain forest", ["the open ocean", "a coral reef", "an ice cap"], "Elk graze in meadows near forests."],
      ["Frogs, cattails and herons live in a…", "wetland", ["desert", "mountain top", "cave"], "Wetlands are wet, marshy land."],
      ["Above the trees on Colorado's highest mountains is cold, windy…", "alpine tundra", ["rainforest", "swamp", "beach"], "Only low plants grow up there."],
      ["Which bird is Colorado's state bird?", "lark bunting", ["penguin", "flamingo", "puffin"], "It nests in the grasslands of the plains."],
      ["Which animal digs burrows on the plains?", "prairie dog", ["dolphin", "camel", "parrot"], "Prairie dogs live in towns of burrows."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["a grassland in winter", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Why do many grassland plants have very deep roots?", "to reach water when it is dry", ["to keep them warm", "to catch insects", "to grow fruit"], "Deep roots also survive fires.", true],
      ["Pikas live among the rocks of the alpine tundra. They gather plants in summer to…", "eat in winter", ["build nests in trees", "swim in lakes", "trade with deer"], "Pikas don't hibernate.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "co-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Hills, valleys, rivers, lakes and oceans.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using Colorado places like the Rocky Mountains, the Eastern Plains, the Colorado and South Platte rivers and the Great Sand Dunes.",
      standards: ["ESS3.2.2.b; ESS3.2.2.c", "modeling the shapes and kinds of land and water in an area"],
    },
    [
      ["The Rocky Mountains run through the middle of Colorado. They are high…", "mountains", ["oceans", "islands", "lakes"], "Mountains are the highest land."],
      ["The Colorado River is a long…", "river", ["mountain", "island", "glacier"], "It begins in the Rocky Mountains."],
      ["Eastern Colorado is mostly flat land called…", "plains", ["mountains", "canyons", "glaciers"], "Flat plains are good for farms and ranches."],
      ["Land with water all around it is an…", "island", ["ocean", "river", "valley"], "Islands are surrounded by water."],
      ["Low land between mountains, often with a river, is a…", "valley", ["peak", "island", "lake"], "Rivers carve valleys."],
      ["Huge hills of sand in southern Colorado are called…", "sand dunes", ["glaciers", "islands", "waterfalls"], "Wind piles up the sand."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["In spring, melting snow in the mountains fills Colorado's…", "rivers and lakes", ["deserts", "oceans", "caves only"], "Snowmelt flows downhill.", true],
    ],
  ),
];
