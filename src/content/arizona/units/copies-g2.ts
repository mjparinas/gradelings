import type { Unit } from "../../types";
import { SOCIAL_1 as CALIFORNIA_1 } from "../../california/units/social-g1";
import { SOCIAL_2 as CALIFORNIA_2 } from "../../california/units/social-g2";
import type { Q } from "../own";
import { copyOf, from } from "./kit";

// Arizona copies of other states' Grade 2 social studies units: the questions that name another state are left out,
// and Arizona items fill in. Continents and oceans (2.G1.1, 2.G4.1) and people who made a difference (2.H1.1, 2.SP1.3).

const DIFFERENCE_EXTRA: Q[] = [
  ["Sandra Day O'Connor, who grew up in Arizona, was the first woman to…", "serve on the US Supreme Court", ["fly across the ocean", "be president"], "She was a judge for many years."],
  ["César Chávez, born near Yuma, Arizona, worked so that farm workers would…", "be treated fairly and paid fairly", ["stop growing food", "move to the moon"], "He led peaceful protests."],
  ["Navajo Code Talkers helped the United States in World War II by…", "sending secret messages in a code based on their language", ["building the first airplane", "drawing maps of Mars"], "The code was never broken."],
];

export const COPIES_2: Unit[] = [
  copyOf(from(CALIFORNIA_1, "ca-g1-continents-oceans"), {
    id: "az-g2-continents-oceans",
    title: "Continents & Oceans",
    emoji: "🌍",
    blurb: "Finding the continents and oceans on maps and globes",
    parentNote: "Finding the United States, the seven continents and the main oceans on maps and globes, and using simple map tools to compare places near and far.",
    standards: ["2.G1.1; 2.G4.1", "using maps and globes of familiar and unfamiliar places, and naming physical regions of the world"],
  }),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-difference-makers"),
    {
      id: "az-g2-difference-makers",
      title: "People Who Made a Difference",
      emoji: "🌟",
      blurb: "People whose courage and ideas made life better",
      parentNote: "People from long ago and the recent past whose courage, ideas and hard work made life better, including Arizonans such as Sandra Day O'Connor, César Chávez and the Navajo Code Talkers.",
      standards: ["2.H1.1; 2.SP1.3", "how individuals contribute to their communities and the world, and questions about people who shaped history"],
    },
    DIFFERENCE_EXTRA,
  ),
];
