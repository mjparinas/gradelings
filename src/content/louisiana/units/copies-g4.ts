import type { Unit } from "../../types";
import { SCIENCE_4 as WASHINGTON_UNITS_SCIENCE_35_SCIENCE_4 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// Louisiana copies of Grade 4 units that fit Louisiana except for a few questions naming another state's places, with
// Louisiana examples added.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_UNITS_SCIENCE_35_SCIENCE_4, "wa-g4-rocks-erosion"), "la-g4-rocks-erosion", ["4-ESS1-1; 4-ESS2-1", "rock layers and fossils as evidence of change, and weathering and erosion by water, ice, wind and plants"], [
      ["Waves wearing away the Louisiana shoreline are an example of…", "erosion", ["deposition only", "melting"], "Moving water carries land away."],
      ["Where the Mississippi River slows down at its mouth, it drops sediment. This is called…", "deposition", ["erosion", "evaporation"], "Slow water drops what it carries."],
      ["Layers of rock with shell fossils in them show the area was once…", "under the sea", ["on the moon", "always dry"], "Shells come from water animals."],
      ["In rock layers that have not been disturbed, the oldest layer is usually at the…", "bottom", ["top", "middle"], "Layers stack up over time."],
      ["Tree roots growing into a crack and splitting a rock is…", "weathering", ["deposition", "evaporation"], "Living things can break rocks."],
    ]),
  localCopy(from(WASHINGTON_UNITS_SCIENCE_35_SCIENCE_4, "wa-g4-earth-hazards"), "la-g4-earth-hazards", ["4-ESS2-2; 4-ESS3-2", "patterns of Earth's features on maps, and designs that reduce the impacts of natural hazards"], [
      ["Levees along the Mississippi River help protect towns from…", "floods", ["earthquakes", "volcanoes"], "They hold back high water."],
      ["Building homes on raised posts, or stilts, near the Louisiana coast helps protect them from…", "flood water and storm surge", ["snow", "drought"], "Water can flow underneath."],
      ["A hurricane warning tells people to…", "get ready or leave the area as told", ["go to the beach", "ignore it"], "Follow the safety plan."],
      ["Which natural hazard is most common along the Louisiana coast?", "hurricanes", ["volcanoes", "avalanches"], "Storms form over warm Gulf water."],
      ["Storm shutters on windows help a house stand up to…", "strong hurricane winds", ["earthquakes", "frost"], "They block flying objects."],
    ]),
  localCopy(from(WASHINGTON_UNITS_SCIENCE_35_SCIENCE_4, "wa-g4-energy-resources"), "la-g4-energy-resources", ["4-ESS3-1", "energy and fuels from natural resources, renewable and nonrenewable, and how using them affects the environment"], [
      ["Oil and natural gas pumped from under Louisiana and the Gulf are…", "nonrenewable resources", ["renewable resources", "made by the sun each day"], "They took millions of years to form."],
      ["Which energy source is renewable?", "sunlight", ["oil", "natural gas"], "The sun keeps shining."],
      ["Burning natural gas to make electricity can…", "add pollution to the air", ["make more natural gas", "clean the air"], "Burning fuels has effects."],
      ["An oil spill in the Gulf can harm…", "fish, birds and wetlands", ["only the moon", "nothing at all"], "Living things are affected."],
    ]),
];
