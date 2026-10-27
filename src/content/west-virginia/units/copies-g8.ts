import type { Unit } from "../../types";
import { SCIENCE_COPIES as OREGON_SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { from, localCopy } from "./kit";

// West Virginia copies of Grade 8 units that fit West Virginia except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(OREGON_SCIENCE_COPIES["8"] ?? [], "or-g8-earth-history"),
    "wv-g8-earth-history",
    ["S.8.6; S.8.7", "patterns in the fossil record in rock layers, and anatomical evidence of common ancestry"],
    [
      ["In undisturbed rock layers, the youngest layer is…", "on top", ["at the bottom", "in the middle"], "Layers stack over time."],
      ["Fern fossils in West Virginia's coal layers are about 300 million years old. They tell us…", "the area was a swampy forest then", ["the area was a deep ocean", "West Virginia had glaciers then"], "Coal formed from those swamp plants."],
      ["The fossil record shows that life on Earth has…", "changed over time", ["never changed", "only grown smaller"], "Older layers hold older forms of life."],
      ["Similar bones in a bat's wing and a human arm are evidence of…", "common ancestry", ["no relationship", "the same diet"], "Similar structures suggest shared ancestors."],
      ["Which is older, the fern fossils in coal layers or the Ice Age ground sloth bones found in a West Virginia cave?", "the fern fossils", ["the ground sloth bones", "they are the same age"], "The sloth lived only tens of thousands of years ago.", true],
      ["A layer of volcanic ash found in many places helps scientists…", "match rock layers of the same age", ["measure rainfall", "count animals"], "Key layers mark the same time.", true],
    ],
  ),
];
