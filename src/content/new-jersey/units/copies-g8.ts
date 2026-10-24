import type { Unit } from "../../types";
import { SCIENCE_COPIES as OREGON_SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { from, localCopy } from "./kit";

// New Jersey copies of Grade 8 units that fit New Jersey except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(OREGON_SCIENCE_COPIES["8"] ?? [], "or-g8-earth-history"),
    "nj-g8-earth-history",
    [
      "MS-ESS1-4; MS-LS4-1; MS-LS4-2",
      "rock strata and Earth's history, the fossil record, and anatomical evidence of common ancestry",
    ],
    [
      [
        "In undisturbed rock layers, the youngest layer is…",
        "on top",
        ["at the bottom", "in the middle"],
        "Layers stack over time.",
      ],
      [
        "Hadrosaurus bones found in Haddonfield were buried in sea-floor mud. That tells us…",
        "the area was once covered by shallow sea",
        ["it lived in a desert", "New Jersey had glaciers then"],
        "It was one of the first dinosaur skeletons found in North America.",
      ],
      [
        "The fossil record shows that life on Earth has…",
        "changed over time",
        ["never changed", "only grown smaller"],
        "Older layers hold older forms of life.",
      ],
      [
        "Similar bones in a bat's wing and a human arm are evidence of…",
        "common ancestry",
        ["no relationship", "the same diet"],
        "Similar structures suggest shared ancestors.",
      ],
      [
        "Which is older, the rock of the Palisades cliffs or the sand left by the last glacier?",
        "the Palisades rock",
        ["the glacier's sand", "they are the same age"],
        "The Palisades formed about 200 million years ago.",
        true,
      ],
      [
        "A layer of volcanic ash found in many places helps scientists…",
        "match rock layers of the same age",
        ["measure rainfall", "count animals"],
        "Key layers mark the same time.",
        true,
      ],
    ],
  ),
];
