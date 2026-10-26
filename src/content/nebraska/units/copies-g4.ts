import type { Unit } from "../../types";
import { SCIENCE_COPIES as OREGON_SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { from, localCopy } from "./kit";

// Nebraska copies of Grade 4 units that fit Nebraska except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(OREGON_SCIENCE_COPIES["4"] ?? [], "or-g4-rocks-erosion"),
    "neb-g4-rocks-erosion",
    [
      "SC.4.13.4.a; SC.4.13.4.b",
      "rock layers and fossils show landscape change, and weathering and erosion shape the land",
    ],
    [
      [
        "Wind and water carved Chimney Rock and Scotts Bluff out of soft…",
        "sandstone and clay",
        ["granite", "glass"],
        "Water wears soft rock away faster.",
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
        "Fossils of sea animals in the chalk along the Niobrara River show the land was once…",
        "under a shallow sea",
        ["a desert", "a glacier"],
        "Sea reptiles and fish lived there.",
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
