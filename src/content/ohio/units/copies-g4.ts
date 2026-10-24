import type { Unit } from "../../types";
import { SCIENCE_5 as TEXAS_SCIENCE_5 } from "../../texas/units/science-5";
import { from, localCopy } from "./kit";

// Ohio copies of Grade 4 units that fit Ohio except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(TEXAS_SCIENCE_5, "tx-g5-landforms"), "oh-g4-landforms", ["4.ESS.1; 4.ESS.3", "landforms, and how water, wind and ice wear land away and build it up"], [
    ["The cliffs and caves of Hocking Hills in Ohio were carved mostly by…", "water wearing away sandstone", ["volcanoes", "earthquakes"], "Streams slowly cut the rock."],
    ["Where a river slows and drops sand and mud as it enters a lake, it can build a…", "delta", ["canyon", "mountain"], "Deposition builds new land."],
    ["Low sand dunes along Lake Erie's shore are built by…", "wind", ["volcanoes", "earthquakes"], "Wind piles up sand."],
    ["Glaciers moving across Ohio scraped deep… into its rock.", "grooves", ["volcanoes", "deltas"], "You can see them on Kelleys Island."],
    ["A deep valley carved by a river is a…", "canyon", ["delta", "dune"], "The river cuts down over time."],
    ["Waves on Lake Erie wearing away the shore is an example of…", "erosion", ["deposition", "melting"], "Erosion carries material away."],
  ], { parentNote: "Practises how wind, water and ice wear away land and build it up again to form landforms such as deltas, canyons, valleys and sand dunes, with Ohio examples like Hocking Hills and the glacial grooves on Kelleys Island." }),
];
