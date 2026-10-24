import type { Unit } from "../../types";
import { SCIENCE_COPIES as OREGON_SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { from, localCopy } from "./kit";

// Colorado copies of Grade 8 units that fit Colorado except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(OREGON_SCIENCE_COPIES["8"] ?? [], "or-g8-earth-history"),
    "co-g8-earth-history",
    [
      "ESS3.MS.3.a; LS2.MS.9.a; LS2.MS.9.b",
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
        "Dinosaur bones in Colorado's Morrison Formation are about 150 million years old. They tell us…",
        "large dinosaurs lived among rivers and floodplains here",
        ["dinosaurs lived in the last 100 years", "Colorado was always covered by glaciers"],
        "Fossils show past life and environments.",
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
        "Which is older, a rock layer with dinosaur bones or an Ice Age gravel layer on top of it?",
        "the layer with dinosaur bones",
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
