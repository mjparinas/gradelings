import type { Unit } from "../../types";
import { SCIENCE_COPIES as OREGON_SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { from, localCopy } from "./kit";

// Wyoming copies of Grade 4 units that fit Wyoming except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(OREGON_SCIENCE_COPIES["4"] ?? [], "or-g4-rocks-erosion"),
    "wy-g4-rocks-erosion",
    ["4-ESS1-1", "patterns in rock layers and fossils that show how a landscape changed over time"],
    [
      [
        "Fossil fish found in the rock layers at Fossil Butte tell us the land there was once…",
        "a lake",
        ["a desert", "a glacier"],
        "Fish live in water.",
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
        "Dinosaur bones found in Wyoming rock layers show that long ago the land was home to…",
        "dinosaurs",
        ["polar bears", "whales today"],
        "Fossils tell us what lived there.",
        true,
      ],
      [
        "Glaciers carved the steep, U-shaped valleys of the Tetons. The shape of the valleys is evidence of…",
        "ice moving through them long ago",
        ["an ocean today", "a volcano last year"],
        "Glaciers leave U-shaped valleys.",
        true,
      ],
    ],
  ),
];
