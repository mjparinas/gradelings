import type { Unit } from "../../types";
import { SCIENCE_COPIES as CALIFORNIA_SCIENCE_5 } from "../../california/units/science-g5";
import { SCIENCE_5 as WASHINGTON_SCIENCE_5 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// Massachusetts copies of Grade 5 units that fit Massachusetts except for a few questions naming another state's
// places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(CALIFORNIA_SCIENCE_5, "ca-g5-earth-water"), "ma-g5-earth-water", ["5-ESS2-1; 5-ESS2-2; 5-ESS3-1", "Earth's systems interact, where Earth's water is, and how communities protect resources"], [
    ["Much of Boston's drinking water comes from the…", "Quabbin Reservoir", ["Atlantic Ocean", "Great Salt Lake", "Gulf of Mexico"], "It is a huge lake in central Massachusetts."],
    ["Why can't people drink water straight from Massachusetts Bay?", "it is salt water", ["it is frozen", "it is too warm", "it is air"], "Ocean water has salt in it."],
    ["Planting trees along a river helps protect water by…", "holding soil so it doesn't wash into the river", ["making the river salty", "drying up the river", "stopping all rain"], "Roots hold the soil."],
    ["Cleaning up Boston Harbor helped the…", "fish and other living things there", ["Moon", "desert", "glaciers"], "The biosphere and hydrosphere interact."],
    ["Snow that melts in the Berkshires flows into…", "streams and rivers", ["the sky", "rock", "the Sun"], "Water moves through Earth's systems."],
  ], { parentNote: "Practices how Earth's geosphere, hydrosphere, atmosphere and biosphere interact, how much of Earth's water is salty or frozen, and how communities protect water, from the Quabbin Reservoir to Boston Harbor." }),
  localCopy(from(WASHINGTON_SCIENCE_5, "wa-g5-ecosystems"), "ma-g5-ecosystems", ["5-LS2-1", "the movement of matter among plants, animals, decomposers and the environment"], [
    ["In a Massachusetts salt marsh, marsh grass is a…", "producer", ["consumer", "decomposer", "predator"], "It makes its own food from sunlight."],
    ["Mushrooms on a fallen oak in the Berkshires are…", "decomposers", ["producers", "predators", "herbivores"], "They break down dead wood."],
    ["Humpback whales off Cape Cod eat small fish. Whales are…", "consumers", ["producers", "decomposers", "plants"], "They can't make their own food."],
    ["When leaves fall and rot, their matter…", "goes back into the soil", ["disappears forever", "turns into rock", "flies to space"], "Decomposers recycle it."],
    ["Which is a decomposer in a garden?", "earthworm", ["tomato plant", "rabbit", "hawk"], "It breaks down dead plants."],
  ], { parentNote: "Practises how matter moves among plants, animals, decomposers and the environment, with examples like salt marshes, forests and the whales off Cape Cod." }),
  localCopy(from(WASHINGTON_SCIENCE_5, "wa-g5-gravity"), "ma-g5-gravity", ["5-PS2-1", "Earth's gravitational force on objects is directed down"], [
    ["Two students in Boston and Brazil drop balls. Which statement is correct?", "both balls fall toward Earth's center", ["the ball in Brazil falls up", "only the Boston ball falls", "neither ball falls"], "Gravity pulls toward Earth's center everywhere."],
    ["Why does water in the Connecticut River flow toward the ocean?", "gravity pulls it downhill", ["wind pushes it uphill", "fish push it", "the Moon pushes it down the river"], "Water flows from high to low."],
    ["An apple falls from a tree in an orchard. Which force pulls it down?", "gravity", ["magnetism", "friction", "wind"], "It pulls everything toward Earth."],
    ["A sledder at the top of a hill starts moving down because of…", "gravity", ["a magnet", "light", "sound"], "No push needed downhill."],
  ]),
];
