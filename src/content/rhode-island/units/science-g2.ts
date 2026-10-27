import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// Rhode Island Grade 2 science: copies of California's habitat and land-and-water units without their California places,
// with Rhode Island examples added (Narragansett Bay, salt marshes, the Great Swamp, Block Island, the Blackstone River and
// the Scituate Reservoir).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "ri-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Marshes, woods, beaches and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from Rhode Island's salt marshes, beaches, ponds and woods to deserts and rainforests.",
      standards: ["2-LS4-1", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Fiddler crabs and tall grasses live in a salty, muddy…", "salt marsh", ["desert", "glacier", "mountain top"], "Salt marshes line the edges of Narragansett Bay."],
      ["Quahogs, Rhode Island's state shell, live buried in the mud of…", "Narragansett Bay", ["a pine forest", "a sand dune", "a mountain cave"], "Quahogs are clams that live under water."],
      ["Turtles, frogs and red maple trees live in the wet woods of the Great Swamp. A swamp is a kind of…", "wetland", ["desert", "ice cap", "coral reef"], "Wetlands are wet, marshy land."],
      ["Piping plovers lay their eggs on the sand of Rhode Island's…", "beaches", ["mountain tops", "rainforests", "deserts"], "These small birds nest right on the sand."],
      ["Which animal is built for life in cold ocean water?", "the harbor seal", ["the roadrunner", "the camel", "the lizard"], "Harbor seals spend the winter in Narragansett Bay."],
      ["Deer, foxes and oak trees live in Rhode Island's…", "woods", ["coral reefs", "ocean floors", "deserts"], "Much of the state's land is forest."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["a dry desert", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Why do many desert animals come out at night?", "it is cooler then", ["they are afraid of the moon", "plants sleep in the day", "it rains every night"], "Desert days can be very hot.", true],
      ["Why can't a quahog live in a dry desert?", "it needs to live under water", ["it needs snow", "it eats cactus", "it is too big"], "Every animal needs a habitat that meets its needs.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "ri-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Hills, islands, rivers, ponds and the ocean.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using Rhode Island places like Narragansett Bay, Block Island, the Blackstone River, the salt ponds and the Scituate Reservoir.",
      standards: ["2-ESS2-2; 2-ESS2-3", "modeling the shapes and kinds of land and water in an area"],
    },
    [
      ["Narragansett Bay is a part of the ocean that reaches into the land. It is a…", "bay", ["mountain", "desert", "glacier"], "A bay has land around most of it."],
      ["Block Island has water all around it, so it is an…", "island", ["ocean", "river", "valley"], "You need a boat or a plane to get there."],
      ["The Blackstone River flows into Rhode Island from the north. A river is…", "water that flows in a channel", ["a frozen lake", "a tall hill", "a sandy beach"], "Its water flows toward the sea."],
      ["The highest point in Rhode Island, Jerimoth Hill, is a…", "hill", ["lake", "river", "bay"], "It is land that rises above the land around it."],
      ["The Scituate Reservoir stores fresh water for drinking. A reservoir is a kind of…", "lake", ["ocean", "mountain", "island"], "A dam holds the water back."],
      ["Low land between hills is a…", "valley", ["peak", "island", "lake"], "Rivers often flow through valleys."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["Is the water in Narragansett Bay salty or fresh?", "salty", ["fresh", "frozen all year", "made of sand"], "The bay is part of the ocean.", true],
    ],
  ),
];
