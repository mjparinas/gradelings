import type { Unit } from "../../types";
import { SCIENCE_2 as washingtonScience2 } from "../../washington/units/science-k2";
import { UNITS as newYorkScienceG2 } from "../../new-york/units/science-g2";
import { copyOf, from } from "./kit";

/** Alabama's own Grade 2 science units (`al-` ids): copies of Washington's units without its places, plus Alabama items. */
export const UNITS: Unit[] = [
  copyOf(
    from(washingtonScience2, "wa-g2-habitats"),
    {
      id: "al-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🐊",
      blurb: "Forests, wetlands, oceans and deserts, and the living things in each.",
      parentNote: "Your child learns that many kinds of plants and animals live in habitats on land and in water, with examples from Alabama.",
      standards: ["2.7", "the many kinds of living things in habitats on land and in water"],
    },
    [
      ["The Mobile-Tensaw Delta has swamps and rivers. Which animal lives there?", "Alligator", ["Polar bear", "Camel", "Penguin"], "Which animal likes warm swamps?"],
      ["Which Alabama habitat has salty water and sandy beaches?", "The Gulf Coast", ["A mountain forest", "A cave", "A cotton field"], "Where does the ocean meet the land?"],
      ["Which animal could you find in an Alabama river?", "Catfish", ["Camel", "Polar bear", "Penguin"], "This animal has fins and lives in fresh water."],
      ["Wild turkeys live in Alabama's…", "forests and fields", ["ocean waves", "deep caves", "icy glaciers"], "Turkeys walk on the ground and roost in trees."],
      ["Which living thing grows in a swamp?", "A cypress tree", ["A cactus", "Seaweed", "A palm tree in sand"], "This tree can stand in water.", true],
      ["A heron wades in shallow water to catch fish. Its habitat is a…", "wetland", ["desert", "mountain top", "cave"], "Shallow water with plants is a wetland.", true],
    ],
  ),
  copyOf(
    from(washingtonScience2, "wa-g2-land-water"),
    {
      id: "al-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Mountains, valleys, rivers, lakes, bays and islands on models and maps.",
      parentNote: "Your child names the shapes and kinds of land and water on Earth and finds them on simple maps and models, with Alabama examples.",
      standards: ["2.8", "the shapes and kinds of land and water on Earth, shown on models and maps"],
    },
    [
      ["Cheaha Mountain is the highest place in Alabama. It is a…", "mountain", ["lake", "valley", "bay"], "It is the tallest land around."],
      ["Dauphin Island has water all around it. It is an…", "island", ["ocean", "river", "mountain"], "Land with water all around is an island."],
      ["Mobile Bay is part of the ocean with land around most of it. It is a…", "bay", ["river", "mountain", "pond"], "Water partly wrapped by land is a bay."],
      ["The Tennessee River flows across north Alabama. A river is…", "moving fresh water", ["salty ocean water", "a tall hill", "frozen water"], "Rivers flow toward lakes and the sea."],
      ["On a map, blue usually shows…", "water", ["mountains", "roads", "cities"], "Think of the color of lakes and seas."],
      ["Alabama's Gulf Coast is where the land meets the…", "ocean", ["desert", "glacier", "mountains"], "The coast is at the edge of the sea.", true],
    ],
  ),
  // A copy of wa-g2-earth-changes without its questions about other states' places.
  copyOf(from(washingtonScience2, "wa-g2-earth-changes"), {
    id: "al-g2-earth-changes",
    title: "Fast & Slow Earth Changes",
    emoji: "🌋",
    blurb: "Earthquakes, floods and erosion, and designs that protect the land.",
    parentNote: "Your child learns that some changes to the land happen fast and some slowly, and compares ways to slow wind and water from wearing land away.",
    standards: ["2.10; 2.11", "earthquakes, floods and erosion, and designs that protect the land"],
  }, [
    ["A tornado knocks down trees in a few minutes. Is that a fast or slow change?", "Fast", ["Slow", "No change"], "Minutes is a short time."],
    ["A river slowly carves a deeper valley over many years. Is that fast or slow?", "Slow", ["Fast", "No change"], "Many years is a long time."],
    ["Which can help stop a hillside from washing away in heavy rain?", "Planting grass and trees", ["Cutting down all the trees", "Digging up the soil", "Pouring water on it"], "Roots hold soil in place."],
    ["Sand fences on a Gulf Coast beach help to…", "keep wind from blowing the sand away", ["make the water warmer", "grow seashells", "make waves bigger"], "Wind can move sand.", true],
    ["A flood covers a field with mud in one day. That change is…", "fast", ["slow", "not a change"], "One day is quick for the land.", true],
  ]),
  // A copy of ny-g2-earth-changes without its questions about other states' places.
  copyOf(from(newYorkScienceG2, "ny-g2-earth-changes"), {
    id: "al-g2-land-changes",
    title: "Changing Land",
    emoji: "🏞️",
    blurb: "Fast and slow changes to the land, and ways to stop wind and water wearing it away.",
    parentNote: "Your child sorts changes to the land into fast and slow, and looks at ways people keep soil and shorelines from washing away.",
    standards: ["2.10; 2.11", "fast and slow changes to the land, and ways to stop wind and water wearing it away"],
  }),
];
