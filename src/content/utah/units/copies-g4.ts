import type { Unit } from "../../types";
import { SCIENCE_3, SCIENCE_4, SCIENCE_5 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// Utah copies of science units that fit Utah's Grade 4 except for a few questions naming another state's places, with
// Utah examples added. Utah teaches fossils (from Grade 3) and the sun and stars (from Grade 5) in Grade 4.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(SCIENCE_3, "wa-g3-fossils"), "ut-g4-fossils", ["4.1.3", "fossils as evidence of the plants, animals and environments of long ago"], [
    ["Utah's state fossil is a meat-eating dinosaur called…", "Allosaurus", ["Tyrannosaurus", "woolly mammoth"], "Many of its bones were found in Utah."],
    ["Dinosaur bones can still be seen in a rock wall at…", "Dinosaur National Monument", ["the Great Salt Lake", "Temple Square"], "It is near Vernal, in eastern Utah."],
    ["Trilobite fossils are found in the mountains of western Utah. Trilobites were…", "sea animals", ["birds", "desert plants"], "They had hard shells and lived in the ocean."],
    ["Finding fossils of sea animals in Utah's dry mountains shows that…", "a sea once covered the land", ["the fossils fell from the sky", "Utah was always a desert"], "Sea animals live in water."],
    ["Dinosaur footprints pressed into Utah's rock are…", "trace fossils", ["living animals", "crystals"], "They are marks an animal left behind.", true],
  ]),
  localCopy(from(SCIENCE_4, "wa-g4-rocks-erosion"), "ut-g4-rock-layers", ["4.1.4", "patterns in rock layers and fossils that show how a landscape changed over time"], [
    ["The stripes in the walls of Utah's canyons are…", "layers of rock", ["paint", "tree rings"], "Each stripe formed at a different time."],
    ["In the rock layers of a Utah canyon, the oldest layer is usually at the…", "bottom", ["top", "middle"], "Layers pile up over time."],
    ["The Colorado River and the streams that flow into it carved Utah's canyons by…", "wearing rock away over a long time", ["melting the rock", "pushing rock up"], "Moving water carries sand and stones."],
    ["The sand dunes at Coral Pink Sand Dunes in Utah are shaped by…", "wind", ["earthquakes", "volcanoes"], "Wind moves sand."],
    ["Ripple marks in a layer of rock show the place was once…", "under moving water", ["on the moon", "always frozen"], "Water makes ripples in sand.", true],
  ]),
  localCopy(from(SCIENCE_5, "wa-g5-sun-stars"), "ut-g4-sun-stars", ["4.4.1; 4.4.2", "why the sun looks brighter than other stars, and patterns of shadows, day and night, and the stars"], [
    ["Days in Utah are longest in…", "June", ["December", "March"], "Summer has the longest days."],
    ["Days in Utah are shortest in…", "December", ["June", "August"], "Winter has the shortest days."],
    ["Why can you see more stars in one of Utah's dark-sky parks than in a city?", "there are fewer lights to hide them", ["there are more stars over the country", "the sky is closer there"], "City lights make the sky glow."],
    ["In Salt Lake City, the sun rises in the…", "east", ["west", "north"], "The sun rises in the east everywhere on Earth."],
  ]),
];
