import type { Unit } from "../../types";
import { SCIENCE_COPIES as OREGON_SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { from, localCopy } from "./kit";

// Idaho copies of Grade 4 units that fit Idaho except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(OREGON_SCIENCE_COPIES["4"] ?? [], "or-g4-rocks-erosion"),
    "id-g4-rocks-erosion",
    ["4-ESS-1.1; 4-ESS-2.1", "rock layers and fossils show landscape change, and weathering and erosion shape the land"],
    [
      ["Over millions of years, the Snake River wore away rock and carved…", "Hells Canyon", ["Borah Peak", "the Bruneau Dunes"], "Moving water wears rock away."],
      ["Breaking rock into smaller pieces is called…", "weathering", ["erosion", "melting"], "Erosion is moving the pieces away."],
      ["Moving rock and soil to a new place is called…", "erosion", ["weathering", "freezing"], "Wind, water and ice carry it."],
      ["In layers of rock that haven't been disturbed, the oldest layer is usually at the…", "bottom", ["top", "middle"], "Newer layers settle on older ones."],
      ["Leaf fossils in the rock layers at Clarkia in northern Idaho show the land was once…", "a forest beside a lake", ["an icy glacier", "a deep ocean"], "The leaves fell into the mud of an old lake.", true],
      ["Water freezing in a crack in a rock can…", "split the rock", ["glue the rock", "make it grow"], "Ice takes up more space than water.", true],
      ["Long ago, the Bonneville Flood rushed down the Snake River. It…", "carved channels and left giant boulders behind", ["built new volcanoes", "froze the river solid"], "Fast water can move huge rocks.", true],
    ],
  ),
];
