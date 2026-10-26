import type { Unit } from "../../types";
import { SCIENCE_COPIES as OREGON_SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { from, localCopy } from "./kit";

// Nebraska copies of Grade 8 units that fit Nebraska except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(OREGON_SCIENCE_COPIES["8"] ?? [], "or-g8-earth-history"),
    "neb-g8-earth-history",
    [
      "SC.8.14.7.a; SC.8.10.5.a; SC.8.10.5.b",
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
        "Fossils of sea reptiles in the Niobrara chalk of northeastern Nebraska are about 85 million years old. They tell us…",
        "the area was once covered by a sea",
        ["it was a desert then", "Nebraska had glaciers then"],
        "Mosasaurs and other sea reptiles swam there.",
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
        "Which is older, the chalk from Nebraska's ancient sea or the windblown soil on top of it?",
        "the chalk",
        ["the windblown soil", "they are the same age"],
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
