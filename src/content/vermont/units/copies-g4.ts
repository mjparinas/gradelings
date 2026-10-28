import type { Unit } from "../../types";
import { SCIENCE_COPIES as OREGON_SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { from, localCopy } from "./kit";

// Vermont copies of Grade 4 units that fit Vermont except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(OREGON_SCIENCE_COPIES["4"] ?? [], "or-g4-rocks-erosion"),
    "vt-g4-rocks-erosion",
    [
      "4-ESS1-1; 4-ESS2-1",
      "rock layers and fossils show landscape change, and weathering and erosion shape the land",
    ],
    [
      [
        "Long ago, glaciers scraped across Vermont and carved steep passes through the mountains called…",
        "notches",
        ["deserts", "reefs"],
        "Smugglers' Notch is one of them.",
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
        "Big boulders sit alone in Vermont fields, far from the rock they broke from. What carried them there?",
        "glaciers",
        ["rabbits", "the wind"],
        "Moving ice can carry huge rocks a long way.",
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
