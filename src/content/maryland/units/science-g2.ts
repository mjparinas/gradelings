import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// Maryland Grade 2 science: copies of California's habitat and land-and-water units without their California places,
// with Maryland examples added (the Chesapeake Bay, marshes, forests, the Atlantic coast and the western mountains).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "md-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Marshes, forests, the Bay and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from Maryland's salt marshes, forests, beaches and the Chesapeake Bay to deserts, rainforests and the polar ice.",
      standards: ["2-LS4-1", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Blue crabs and oysters live in the…", "Chesapeake Bay", ["a desert", "a mountain top", "a cornfield"], "The Bay is Maryland's biggest habitat."],
      ["Wet, grassy land at the edge of the Bay is a…", "marsh", ["desert", "glacier", "cave"], "Marshes are flooded by tides."],
      ["Where would a white-tailed deer find food and shade in Maryland?", "a forest", ["the open ocean", "a sand dune", "an ice cap"], "Deer eat leaves and acorns."],
      ["Wild ponies graze on the dunes and marshes of…", "Assateague Island", ["the Sahara", "the Arctic", "a rainforest"], "Assateague is on Maryland's ocean coast."],
      ["Which bird is Maryland's state bird?", "Baltimore oriole", ["penguin", "flamingo", "puffin"], "It is orange and black."],
      ["Black bears live mostly in which part of Maryland?", "the western mountains", ["the ocean", "the beach", "the city center"], "Western Maryland has big forests."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["a marsh in winter", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Why do marsh grasses help crabs and fish?", "young animals hide in them", ["they keep the water hot", "they make the water salty", "they grow fruit"], "Marshes are nurseries.", true],
      ["Bald eagles nest near the Chesapeake Bay because they can…", "catch fish there", ["eat cactus", "build igloos", "sleep in caves"], "Eagles eat a lot of fish.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "md-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Hills, valleys, rivers, bays and oceans.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using Maryland places like the Chesapeake Bay, the Potomac River, the Atlantic Ocean and the Appalachian Mountains.",
      standards: ["2-ESS2-2; 2-ESS2-3", "modeling the shapes and kinds of land and water in an area"],
    },
    [
      ["The Chesapeake Bay is a big…", "bay", ["mountain", "desert", "glacier"], "A bay is water partly closed in by land."],
      ["The Potomac is a long…", "river", ["mountain", "island", "glacier"], "It flows to the Chesapeake Bay."],
      ["The Potomac River makes much of Maryland's southern…", "border", ["mountain", "island", "desert"], "Rivers often mark borders."],
      ["Land with water all around it is an…", "island", ["ocean", "river", "valley"], "Islands are surrounded by water."],
      ["Much of Maryland's Eastern Shore is flat, low land called…", "plains", ["mountains", "canyons", "glaciers"], "Flat land is good for farms."],
      ["Low land between hills, often with a river, is a…", "valley", ["peak", "island", "lake"], "Rivers carve valleys."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["The Bay's water is a mix of river water and ocean water, so it is…", "a little salty", ["frozen all year", "boiling", "pure fresh water"], "Fresh and salt water mix in the Bay.", true],
    ],
  ),
];
