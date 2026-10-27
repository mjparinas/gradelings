import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { copyOf, from } from "./kit";

// West Virginia Grade 7 science: a copy of California's resources unit without its California places, with West
// Virginia examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "wv-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Why resources are where they are, and natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and groundwater resources are unevenly spread because of past geologic processes, with West Virginia examples such as its coal seams, the natural gas in deep shale and the salt brine of the Kanawha Valley.",
      standards: ["S.7.17", "how the uneven distribution of Earth's mineral, energy and groundwater resources comes from past geologic processes"],
    },
    [
      ["West Virginia has thick coal seams because, about 300 million years ago, the area had…", "huge swampy forests", ["deserts of salt", "glaciers only", "coral reefs"], "Buried plants slowly turned into coal."],
      ["Salt makers in the Kanawha Valley in the early 1800s boiled… pumped from underground.", "salty water called brine", ["lava", "melted ice", "tree sap"], "An ancient sea left salt in the rocks."],
      ["Natural gas in West Virginia is trapped in deep layers of…", "shale rock", ["sand dunes", "glacier ice", "river water"], "The Marcellus Shale is one of them."],
      ["Why are some resources found in only a few places?", "they formed under special conditions long ago", ["people put them there", "they fall from space each year", "they are made by animals today"], "Geology decides where resources are."],
      ["Some places have plenty of groundwater and others very little because…", "rocks underground differ in how much water they hold", ["groundwater falls from space", "only cities have groundwater", "groundwater is made by wells"], "Water fills the spaces and cracks in rock."],
      ["Why will West Virginia's coal eventually run out?", "it formed over millions of years and is used much faster", ["coal melts in summer", "it grows back every year", "rain washes it away"], "Coal is a nonrenewable resource.", true],
      ["Why is it harder to forecast an earthquake than a flood?", "earthquakes give few warning signs", ["floods never happen", "earthquakes are always at noon", "rivers do not change"], "Some hazards are hard to predict.", true],
    ],
  ),
];
