import type { Unit } from "../../types";
import { SCIENCE_COPIES as OREGON_SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { from, localCopy } from "./kit";

// Hawaiʻi copies of Grade 4 units that fit Hawaiʻi except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(OREGON_SCIENCE_COPIES["4"] ?? [], "or-g4-rocks-erosion"),
    "hi-g4-rocks-erosion",
    [
      "4-ESS1-1; 4-ESS2-1",
      "rock layers and fossils show landscape change, and weathering and erosion shape the land",
    ],
    [
      [
        "Rain, streams and waves slowly wear Hawaiʻi's black lava rock into…",
        "soil and sand",
        ["new lava", "glass"],
        "Weathering breaks rock into smaller pieces.",
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
        "Fossil coral in rock high above the sea on Oʻahu shows the land was once…",
        "under a shallow sea",
        ["a desert", "a glacier"],
        "Coral grows only in the sea.",
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
