import type { Unit } from "../../types";
import { SCIENCE_COPIES as OREGON_SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { from, localCopy } from "./kit";

// West Virginia copies of Grade 4 units that fit West Virginia except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(OREGON_SCIENCE_COPIES["4"] ?? [], "or-g4-rocks-erosion"),
    "wv-g4-rocks-erosion",
    ["S.4.10; S.4.12", "rock layers and fossils show landscape change, and weathering and erosion shape the land"],
    [
      ["West Virginia's state rock, bituminous coal, formed from layers of…", "ancient plants", ["melted glass", "sea salt", "ice"], "Swamp plants were buried and pressed for millions of years."],
      ["Breaking rock into smaller pieces is called…", "weathering", ["erosion", "melting"], "Erosion is moving the pieces away."],
      ["Moving rock and soil to a new place is called…", "erosion", ["weathering", "freezing"], "Wind, water and ice carry it."],
      ["In layers of rock that haven't been disturbed, the oldest layer is usually at the…", "bottom", ["top", "middle"], "Newer layers settle on older ones."],
      ["Seneca Rocks are tall fins of hard rock. They still stand because the softer rock around them…", "wore away", ["grew taller", "turned to ice"], "Hard rock lasts longer than soft rock.", true],
      ["Caves in West Virginia's limestone formed when water…", "slowly dissolved the rock", ["froze the rock solid", "made the rock grow"], "Water with a little acid in it eats away limestone.", true],
      ["Water freezing in a crack in a rock can…", "split the rock", ["glue the rock", "make it grow"], "Ice takes up more space than water.", true],
    ],
  ),
];
