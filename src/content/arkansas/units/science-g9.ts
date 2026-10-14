import type { Unit } from "../../types";
import { SCIENCE_9 as texasScience9 } from "../../texas/units/science-9";
import { copyOf, from } from "./kit";

/** Arkansas's own Grade 9 science units (`ar-` ids): copies of other states' units without their places, plus Arkansas items. */
export const UNITS: Unit[] = [
  // A copy of tx-b-ecosystems without its questions about other states' places.
  copyOf(
    from(texasScience9, "tx-b-ecosystems"),
    {
      id: "ar-g9-ecosystems",
      title: "Ecosystem Stability",
      emoji: "🦌",
      blurb: "Ecological relationships, energy flow, matter cycles and biodiversity.",
      parentNote:
        "Practices how predation, parasitism, commensalism, mutualism and competition affect ecosystem stability, energy flow through trophic levels, carrying capacity, and how human activity and disturbances change biodiversity, with Arkansas examples such as Delta bottomland forests and invasive species.",
      standards: ["BI-LS2-1; BI-LS2-6", "carrying capacity and the stability of ecosystems as conditions change"],
    },
    [
      ["Elk were brought back to the Buffalo River area. The largest herd the land can support over time is its…", "carrying capacity", ["biodiversity", "trophic level", "niche"], "It depends on food, water and space."],
      ["Feral hogs root up soil and eat the food of native animals in Arkansas forests. Feral hogs are an example of…", "an invasive species", ["a keystone producer", "a decomposer", "a native predator"], "They were brought in by people and spread."],
      ["Clearing bottomland hardwood forest in the Arkansas Delta for fields usually…", "lowers biodiversity in that area", ["raises the number of native species", "has no effect on wildlife", "adds more wetland habitat"], "Fewer kinds of habitat mean fewer kinds of living things."],
      ["Ducks flying down the Mississippi River each winter compete for food in flooded fields. If a drought dries the fields, the area's carrying capacity for ducks…", "drops", ["rises", "stays the same", "becomes unlimited"], "Less food and water support fewer animals."],
      ["A major flood on the White River kills many small animals, but the forest recovers in a few years. This shows the ecosystem is…", "resilient and fairly stable", ["destroyed forever", "a single food chain", "without any producers"], "Stable ecosystems recover from disturbances.", true],
      ["A flood that hurts a population whether it is crowded or not is a…", "density-independent factor", ["density-dependent factor", "mutualism", "trophic level"], "It doesn't depend on crowding.", true],
    ],
  ),
];
