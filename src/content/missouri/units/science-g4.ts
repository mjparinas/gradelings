import type { Unit } from "../../types";
import { SCIENCE_COPIES as CALIFORNIA_SCIENCE_4 } from "../../california/units/science-g4";
import { SCIENCE_COPIES as OREGON_SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { copyOf, from, localCopy } from "./kit";

// Missouri Grade 4 science: copies of Oregon's rocks-and-erosion unit and California's earth-hazards unit without their
// own states' places, with Missouri examples added.

export const SCIENCE_4: Unit[] = [
  localCopy(
    from(OREGON_SCIENCE_COPIES["4"] ?? [], "or-g4-rocks-erosion"),
    "mo-g4-rocks-erosion",
    ["4.ESS1.C.1; 4.ESS2.A.1", "rock layers and fossils show how the land changed, and weathering and erosion shape the land"],
    [
      ["Missouri has thousands of caves because water slowly dissolves…", "limestone", ["granite", "glass"], "Rainwater is a little acidic and eats away limestone."],
      ["Breaking rock into smaller pieces is called…", "weathering", ["erosion", "melting"], "Erosion is moving the pieces away."],
      ["Moving rock and soil to a new place is called…", "erosion", ["weathering", "freezing"], "Wind, water and ice carry it."],
      ["In layers of rock that haven't been disturbed, the oldest layer is usually at the…", "bottom", ["top", "middle"], "Newer layers settle on older ones."],
      ["Crinoid fossils, Missouri's state fossil, show the land was once…", "under a shallow sea", ["a desert", "a glacier"], "Crinoids were sea animals.", true],
      ["Water freezing in a crack in a rock can…", "split the rock", ["glue the rock", "make it grow"], "Ice takes up more space than water.", true],
    ],
    {
      parentNote:
        "Practices how weathering and erosion by water, ice, wind and plants shape the land, and how rock layers and fossils show how a place changed over time, with Missouri examples like its caves and crinoid fossils.",
    },
  ),
  copyOf(
    from(CALIFORNIA_SCIENCE_4, "ca-g4-earth-hazards"),
    {
      id: "mo-g4-earth-hazards",
      title: "Quakes, Storms & Maps",
      emoji: "🌪️",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and ways to reduce harm from hazards such as the tornadoes, floods and earthquakes Missouri knows.",
      standards: ["4.ESS2.B.1; 4.ESS3.A.1", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural Earth processes"],
    },
    [
      ["A tornado siren helps people…", "take shelter in time", ["stop the wind", "cool the air", "find their way home"], "Warnings save lives."],
      ["During a tornado warning, the safest place in a house is…", "a basement or inside room", ["next to a window", "on the roof", "in the car outside"], "Stay low and away from glass."],
      ["Levees along the Missouri and Mississippi rivers help…", "hold back flood water", ["make tornadoes", "start earthquakes", "melt snow"], "A levee is a wall of earth."],
      ["The New Madrid area in southeast Missouri is known for…", "earthquakes", ["volcanoes", "hurricanes", "glaciers"], "Big quakes shook the area in 1811 and 1812."],
      ["Building on high ground near a river helps keep homes safe from…", "floods", ["droughts", "earthquakes", "lightning only"], "Water rises in low places."],
      ["On a map, most volcanoes and earthquakes are found…", "along the edges of plates", ["in the middle of every country", "only in Missouri", "at the North Pole"], "Plates meet in long chains.", true],
      ["After the 2011 Joplin tornado, the city built new buildings with stronger…", "safe rooms and walls", ["windows only", "paint", "roof decorations"], "Stronger buildings protect people.", true],
      ["Wetlands along rivers can reduce flooding because they…", "soak up extra water", ["make more rain", "stop all rivers", "freeze in summer"], "Wetlands act like sponges.", true],
    ],
  ),
];
