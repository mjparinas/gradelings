import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// South Dakota Grade 2 science: copies of California's habitat and land-and-water units without their California places,
// with South Dakota examples added (the prairie, prairie potholes, the Black Hills, the Badlands, the Missouri River and
// Lake Oahe).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "sd-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Prairies, forests, ponds and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from South Dakota's prairies, prairie ponds and pine forests to deserts and rainforests.",
      standards: ["2-LS4-1", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Bison, prairie dogs and tall grasses live on South Dakota's…", "prairie", ["coral reef", "glacier", "rainforest"], "A prairie is a wide, grassy land."],
      ["Prairie dogs dig tunnels under the grass to…", "stay safe and keep warm", ["catch fish", "climb trees", "find snow"], "Their burrows are their homes."],
      ["Ducks, frogs and cattails live in small prairie ponds called…", "prairie potholes", ["sand dunes", "ice caps", "coral reefs"], "These ponds fill with snowmelt and rain."],
      ["Mountain goats and ponderosa pines live in the…", "Black Hills", ["prairie potholes", "Missouri River", "ocean"], "The Black Hills are covered with pine forests."],
      ["Which animal is built for life in cold, snowy places?", "the snowshoe hare", ["the roadrunner", "the camel", "the lizard"], "Its big furry feet work like snowshoes."],
      ["Walleye and catfish live in the…", "Missouri River", ["prairie dog town", "Badlands", "desert"], "Fish need water to live."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["a dry desert", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Why do many desert animals come out at night?", "it is cooler then", ["they are afraid of the moon", "plants sleep in the day", "it rains every night"], "Desert days can be very hot.", true],
      ["Why can't a walleye live on a dry prairie?", "it needs to live under water", ["it needs snow", "it eats cactus", "it is too big"], "Every animal needs a habitat that meets its needs.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "sd-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Hills, plains, rivers, lakes and the ocean.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using South Dakota places like the Missouri River, Lake Oahe, the Black Hills and the plains.",
      standards: ["2-ESS2-2; 2-ESS2-3", "modeling the shapes and kinds of land and water in an area"],
    },
    [
      ["Lake Oahe formed behind a big dam on the Missouri River. A lake is…", "water with land all around it", ["a tall hill", "a sandy beach", "a frozen river"], "A dam holds the river water back."],
      ["The Missouri River flows through the middle of South Dakota. A river is…", "water that flows in a channel", ["a frozen lake", "a tall hill", "a sandy beach"], "Its water flows toward the sea."],
      ["The Black Hills rise high above the land around them. They are…", "mountains and hills", ["lakes", "rivers", "islands"], "They are covered with pine trees."],
      ["Black Elk Peak, the highest point in South Dakota, is a…", "mountain", ["lake", "river", "valley"], "It is in the Black Hills."],
      ["Much of eastern South Dakota is wide, flat, grassy land called…", "plains", ["ocean", "glacier", "island"], "Farms cover much of the plains."],
      ["Low land between hills is a…", "valley", ["peak", "island", "lake"], "Rivers often flow through valleys."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["Is the water in the Missouri River salty or fresh?", "fresh", ["salty", "frozen all year", "made of sand"], "River water comes from rain and snowmelt.", true],
    ],
  ),
];
