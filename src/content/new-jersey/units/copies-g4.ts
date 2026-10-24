import type { Unit } from "../../types";
import { SCIENCE_COPIES as OREGON_SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { from, localCopy } from "./kit";

// New Jersey copies of Grade 4 units that fit New Jersey except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(OREGON_SCIENCE_COPIES["4"] ?? [], "or-g4-rocks-erosion"),
    "nj-g4-rocks-erosion",
    [
      "4-ESS1-1; 4-ESS2-1",
      "rock layers and fossils show landscape change, and weathering and erosion shape the land",
    ],
    [
      [
        "Over a very long time, the Delaware River wore a gap through a mountain ridge. This shows…",
        "erosion by moving water",
        ["a volcano", "an earthquake"],
        "That gap is the Delaware Water Gap.",
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
        "Fossil shark teeth found in New Jersey streams show the land was once…",
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
