import type { Unit } from "../../types";
import { SCIENCE_COPIES as OREGON_SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { from, localCopy } from "./kit";

// Colorado copies of Grade 4 units that fit Colorado except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(OREGON_SCIENCE_COPIES["4"] ?? [], "or-g4-rocks-erosion"),
    "co-g4-rocks-erosion",
    [
      "ESS3.4.1.a; ESS3.4.2.a",
      "rock layers and fossils show landscape change, and weathering and erosion shape the land",
    ],
    [
      [
        "The Colorado River carved deep canyons by wearing away…",
        "rock, a little at a time",
        ["the sky", "the snow only"],
        "Moving water slowly carries rock away.",
      ],
      [
        "Breaking rock into smaller pieces is called…",
        "weathering",
        ["erosion", "melting"],
        "Erosion is moving the pieces away.",
      ],
      [
        "Moving rock and soil to a new place is called…",
        "erosion",
        ["weathering", "freezing"],
        "Wind, water and ice carry it.",
      ],
      [
        "In layers of rock that haven't been disturbed, the oldest layer is usually at the…",
        "bottom",
        ["top", "middle"],
        "Newer layers settle on older ones.",
      ],
      [
        "Sea-shell fossils in rock layers high in the Rocky Mountains show the land was once…",
        "under a shallow sea",
        ["a desert", "a glacier"],
        "Fossils show past environments.",
        true,
      ],
      [
        "Water freezing in a crack in a rock can…",
        "split the rock",
        ["glue the rock", "make it grow"],
        "Ice takes up more space than water.",
        true,
      ],
    ],
  ),
];
