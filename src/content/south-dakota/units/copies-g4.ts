import type { Unit } from "../../types";
import { SCIENCE_COPIES as OREGON_SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { from, localCopy } from "./kit";

// South Dakota copies of Grade 4 units that fit South Dakota except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(OREGON_SCIENCE_COPIES["4"] ?? [], "or-g4-rocks-erosion"),
    "sd-g4-rocks-erosion",
    [
      "4-ESS1-1; 4-ESS2-1",
      "rock layers and fossils show landscape change, and weathering and erosion shape the land",
    ],
    [
      [
        "Rain and wind wearing away the soft rock of the Badlands slowly carve it into…",
        "peaks and gullies",
        ["flat glass", "new volcanoes"],
        "Moving water and wind wear rock away.",
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
        "The striped layers in the Badlands' walls formed one on top of another. The oldest layer is usually at the…",
        "bottom",
        ["top", "middle"],
        "Newer layers settle on older ones.",
      ],
      [
        "Big boulders sit in eastern South Dakota fields far from any cliff. They were carried there by…",
        "glaciers",
        ["rivers of lava", "the wind"],
        "Ice Age glaciers moved rocks and dropped them as they melted.",
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
