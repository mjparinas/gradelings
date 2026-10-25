import type { Unit } from "../../types";
import { SCIENCE_COPIES as OREGON_SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { from, localCopy } from "./kit";

// Nevada copies of Grade 8 units that fit Nevada except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(OREGON_SCIENCE_COPIES["8"] ?? [], "or-g8-earth-history"),
    "nv-g8-earth-history",
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
        "Ichthyosaur fossils in central Nevada are more than 200 million years old. They tell us…",
        "the area was once covered by a sea",
        ["it was a desert then", "Nevada had glaciers then"],
        "Ichthyosaurs were giant sea reptiles.",
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
        "Which is older, Nevada's ancient sea rocks or the Ice Age lake deposits on top of them?",
        "the sea rocks",
        ["the Ice Age lake deposits", "they are the same age"],
        "Lower layers formed first.",
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
