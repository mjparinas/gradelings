import type { Unit } from "../../types";
import { SCIENCE_COPIES as OREGON_SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { from, localCopy } from "./kit";

// North Dakota copies of Grade 8 units that fit North Dakota except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(OREGON_SCIENCE_COPIES["8"] ?? [], "or-g8-earth-history"),
    "nd-g8-earth-history",
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
        "Leaf, tree and turtle fossils in North Dakota's lignite coal rocks are about 60 million years old. They tell us…",
        "the area was once a warm, swampy forest",
        ["it was covered by ice then", "it was a deep ocean then"],
        "Swamp forests and turtles need warm, wet places.",
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
        "Which is older, North Dakota's coal-swamp rocks or the Ice Age glacier gravel on top of them?",
        "the coal-swamp rocks",
        ["the Ice Age gravel", "they are the same age"],
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
