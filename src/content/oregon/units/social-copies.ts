import type { Unit } from "../../types";
import { G5 } from "../../washington/units/social-59-g5";
import { G6 } from "../../washington/units/social-59-g6";
import { G8 } from "../../washington/units/social-59-g8";
import { withoutWashington } from "./social-kit";

// Oregon copies of Washington units that fit Oregon's standards but have a few questions about Washington State.
// Each copy leaves those questions out (withoutWashington) and cites Oregon's codes. New `or-` ids, because the
// question set differs from the original.

const from = (units: Unit[], id: string): Unit => {
  const u = units.find((x) => x.id === id);
  if (!u) throw new Error(`Oregon social: no Washington unit "${id}"`);
  return u;
};

export const historyDetective5 = withoutWashington(from(G5, "wa-g5-history-detective"), {
  id: "or-g5-history-detective",
  title: "History Detective",
  emoji: "🔍",
  blurb: "Sources, timelines and evidence",
  parentNote: "Primary and secondary sources, timelines and centuries, fact and opinion, claims and evidence, and judging a source by its maker, date and purpose, using early American history.",
  standards: ["5.H.CE.7; 5.H.CH.2", "using sources and multiple perspectives to trace and explain early American history"],
});

export const worldMaps6 = withoutWashington(from(G6, "wa-g6-world-maps"), {
  id: "or-g6-world-maps",
  title: "World Maps & Globes",
  emoji: "🌐",
  blurb: "Continents, oceans and coordinates",
  parentNote: "Continents and oceans, hemispheres, latitude and longitude, map scale, projections and kinds of maps.",
  standards: ["6/7.G.GR.1; 6/7.G.GR.2", "using maps, coordinates and spatial thinking to describe absolute and relative location"],
});

export const reconstruction8 = withoutWashington(from(G8, "wa-g8-reconstruction"), {
  id: "or-g8-reconstruction",
  title: "Reconstruction",
  emoji: "🏗️",
  blurb: "New rights, and rights rolled back",
  parentNote: "Reconstruction from 1865 to 1877 as a bridge to high school US history: the 13th, 14th and 15th Amendments, Black officeholders, the violence that opposed them and how gains were later rolled back.",
  standards: ["8.C.CE.13; 8.C.DP.10", "how individuals and movements expanded rights and citizenship for underrepresented groups, and the values in founding documents"],
});
