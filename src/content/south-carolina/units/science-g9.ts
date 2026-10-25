import type { Unit } from "../../types";
import { SCIENCE_9 as texasScience9 } from "../../texas/units/science-9";
import { copyOf, from } from "./kit";

/** South Carolina's own Grade 9 science units (`sc-` ids): copies of other states' units without their places, plus South Carolina items. */
export const UNITS: Unit[] = [
  // A copy of tx-b-ecosystems without its questions about other states' places.
  copyOf(
    from(texasScience9, "tx-b-ecosystems"),
    {
      id: "sc-g9-ecosystems",
      title: "Ecosystem Stability",
      emoji: "🦌",
      blurb: "Ecological relationships, energy flow, matter cycles and biodiversity.",
      parentNote:
        "Practices how predation, competition and other relationships affect ecosystem stability, carrying capacity, and how human activity and disturbances change biodiversity, with South Carolina examples such as salt marshes, longleaf pine forests and invasive species.",
      standards: ["B-LS2-1; B-LS2-6", "carrying capacity and the stability of ecosystems as conditions change"],
    },
    [
      ["The largest population of white-tailed deer the land can support over time is its…", "carrying capacity", ["biodiversity", "trophic level", "niche"], "It depends on food, water and space."],
      ["Feral hogs root up soil and eat the food of native animals in South Carolina forests. Feral hogs are an example of…", "an invasive species", ["a keystone producer", "a decomposer", "a native predator"], "They were brought in by people and spread."],
      ["Longleaf pine forests once covered much of South Carolina's coastal plain. Replacing them with farms and towns usually…", "lowers biodiversity in that area", ["raises the number of native species", "has no effect on wildlife", "adds more habitat for gopher tortoises"], "Fewer kinds of habitat mean fewer kinds of living things."],
      ["If a drought dries up the ponds where frogs breed, the area's carrying capacity for frogs…", "drops", ["rises", "stays the same", "becomes unlimited"], "Less water supports fewer animals."],
      ["A hurricane flattens part of a coastal forest, but the forest recovers in some years. This shows the ecosystem is…", "resilient and fairly stable", ["destroyed forever", "a single food chain", "without any producers"], "Stable ecosystems recover from disturbances.", true],
      ["A hurricane that hurts a population whether it is crowded or not is a…", "density-independent factor", ["density-dependent factor", "mutualism", "trophic level"], "It doesn't depend on crowding.", true],
    ],
  ),
];
