import type { Unit } from "../../types";
import { SCIENCE_COPIES as OREGON_SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { from, localCopy } from "./kit";

// Rhode Island copies of Grade 4 units that fit Rhode Island except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(OREGON_SCIENCE_COPIES["4"] ?? [], "or-g4-rocks-erosion"),
    "ri-g4-rocks-erosion",
    [
      "4-ESS1-1; 4-ESS2-1",
      "rock layers and fossils show landscape change, and weathering and erosion shape the land",
    ],
    [
      [
        "Waves crashing on the rocky shore at Newport slowly break the rock into…",
        "smaller pieces",
        ["bigger boulders", "glass"],
        "Moving water wears rock away.",
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
        "Huge boulders sit in Rhode Island fields far from any cliff. They were carried there by…",
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
