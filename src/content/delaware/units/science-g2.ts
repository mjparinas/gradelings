import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// Delaware Grade 2 science: copies of California's habitat and land-and-water units without their California
// places, with Delaware examples added (its forests and ponds, the salt marshes of Bombay Hook, the beaches and dunes,
// the Delaware River and Bay, Brandywine Creek, Lums Pond, Pea Patch Island and the Atlantic coast).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "de-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Forests, marshes, beaches and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from Delaware's forests, ponds, salt marshes and sandy beaches to deserts, oceans and rainforests.",
      standards: ["2-LS4-1", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["White-tailed deer, red foxes and tall oak trees live in Delaware's…", "forests", ["coral reefs", "deserts", "ice caps"], "Many parts of Delaware have woods."],
      ["Frogs, turtles and water lilies live in a…", "pond", ["sand dune", "glacier", "cave"], "Ponds are small, still bodies of fresh water."],
      ["Salt marsh grass, crabs and herons live at Bombay Hook, beside Delaware Bay. A salt marsh is a kind of…", "wetland", ["desert", "mountain top", "forest"], "Wetlands are wet, marshy land."],
      ["On the sand dunes at Cape Henlopen, beach grass has long roots because the sand is so…", "dry and loose", ["cold and icy", "dark and wet", "rocky"], "The roots hold the plant and the sand in place."],
      ["Which animal digs its burrow in the mud of Delaware's salt marshes?", "the fiddler crab", ["the camel", "the parrot", "the iguana"], "The male waves one big claw."],
      ["Ospreys dive for fish in Delaware's…", "bays and rivers", ["deserts", "sand dunes", "caves"], "Ospreys need clean water with lots of fish."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["a dry desert", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Why do many desert animals come out at night?", "it is cooler then", ["they are afraid of the moon", "plants sleep in the day", "it rains every night"], "Desert days can be very hot.", true],
      ["A beaver builds a dam across a stream. What does the dam make?", "a pond", ["a mountain", "a desert", "an island of ice"], "The dam holds the water back.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "de-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Hills, valleys, rivers, bays and the ocean.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using Delaware places like the Delaware River and Bay, Brandywine Creek, Lums Pond, Pea Patch Island and the Atlantic coast.",
      standards: ["2-ESS2-2; 2-ESS2-3", "modeling the shapes and kinds of land and water in an area"],
    },
    [
      ["The Delaware, which flows past Wilmington and New Castle, is a long…", "river", ["mountain", "island", "glacier"], "Its water flows toward the sea."],
      ["Lums Pond is the biggest freshwater… in Delaware.", "pond", ["mountain", "desert", "river"], "It is still fresh water with land all around it."],
      ["Low, flat land that stretches a long way is a…", "plain", ["valley", "lake", "mountain"], "Most of Delaware is a plain."],
      ["Land with water all around it is an…", "island", ["ocean", "river", "valley"], "Pea Patch Island sits in the Delaware River."],
      ["The Delaware River and Bay run along Delaware's eastern…", "border", ["mountain top", "ocean floor", "island"], "The water separates Delaware from New Jersey."],
      ["Low land between hills, where a creek often flows, is a…", "valley", ["peak", "island", "lake"], "Brandywine Creek flows through a valley."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["Delaware's beaches are on which ocean?", "the Atlantic Ocean", ["the Pacific Ocean", "the Arctic Ocean", "the Indian Ocean"], "It is on the east side of the country.", true],
    ],
  ),
];
