import type { Unit } from "../../types";
import { SCIENCE_COPIES as CALIFORNIA_UNITS_SCIENCE_G6_SCIENCE_COPIES } from "../../california/units/science-g6";
import { SCIENCE_7 as WASHINGTON_UNITS_SCIENCE_68_SCIENCE_7, SCIENCE_8 as WASHINGTON_UNITS_SCIENCE_68_SCIENCE_8 } from "../../washington/units/science-68";
import { from, localCopy } from "./kit";

// Louisiana copies of units that fit Louisiana's Grade 8 science except for a few questions naming another state's
// places, with Louisiana examples added. Louisiana teaches Earth's history, surface and resources in 8th grade.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_UNITS_SCIENCE_68_SCIENCE_8, "wa-g8-earth-history"), "la-g8-earth-history", ["8-MS-ESS1-4; 8-MS-LS4-1", "the geologic time scale from rock strata, and patterns in the fossil record"], [
      ["In undisturbed rock strata, the youngest layer is at the…", "top", ["bottom", "middle"], "New layers form on top."],
      ["A fossil found in a lower rock layer is usually…", "older than one in a higher layer", ["younger than one in a higher layer", "the same age as every fossil"], "Deeper usually means older."],
      ["Much of southern Louisiana is made of young sediment laid down by…", "the Mississippi River", ["glaciers", "volcanoes"], "The river built the delta."],
      ["The geologic time scale divides Earth's history using…", "rock layers and fossils", ["calendars", "tree rings only"], "Rocks keep the record."],
    ]),
  localCopy(from(WASHINGTON_UNITS_SCIENCE_68_SCIENCE_7, "wa-g7-earth-surface"), "la-g8-earth-surface", ["8-MS-ESS2-1; 8-MS-ESS2-2; 8-MS-ESS2-3", "the rock cycle, processes that change Earth's surface, and evidence of plate motions"], [
      ["The Mississippi River delta grows when the river…", "deposits sediment at its mouth", ["freezes in winter", "erupts lava"], "Slow water drops sediment."],
      ["Southern Louisiana is slowly sinking. This is called…", "subsidence", ["erosion by glaciers", "volcanism"], "Soft sediment packs down."],
      ["Sediment that is pressed and cemented together becomes…", "sedimentary rock", ["igneous rock", "lava"], "Layers harden over time."],
      ["Matching fossils on coasts of different continents is evidence that…", "the continents were once joined", ["fossils can swim", "the oceans are new"], "Plates move over time."],
    ]),
  localCopy(from(WASHINGTON_UNITS_SCIENCE_68_SCIENCE_7, "wa-g7-resources"), "la-g8-resources", ["8-MS-ESS3-1; 8-MS-ESS3-2", "why Earth's resources are unevenly spread, and data on natural hazards"], [
      ["Salt domes under Louisiana formed from…", "ancient seawater that dried up and was buried", ["volcano ash", "melted glaciers"], "Salt was left behind as water evaporated."],
      ["Oil and natural gas are found under parts of Louisiana and the Gulf because…", "ancient sea life was buried and changed over millions of years", ["people stored them there", "they fall with rain"], "They are fossil fuels."],
      ["Scientists track a hurricane's path to…", "warn people in time to prepare", ["make it stronger", "change its season"], "Forecasts save lives."],
      ["Data showing more hurricanes hitting a coast in late summer can help people…", "plan when to be ready", ["stop all storms", "ignore the weather"], "Patterns help forecasts."],
    ]),
  localCopy(from(CALIFORNIA_UNITS_SCIENCE_G6_SCIENCE_COPIES, "ca-g6-growth"), "la-g8-growth", ["8-MS-LS1-4; 8-MS-LS1-5", "how animal behaviors and plant structures help reproduction, and how environment and genes affect growth"], [
      ["Bees visiting flowers in a Louisiana garden help plants…", "reproduce by carrying pollen", ["grow roots", "make salt"], "Pollination makes seeds."],
      ["A plant that gets too little water and sunlight will likely…", "grow smaller", ["grow faster", "change species"], "Environment affects growth."],
      ["Brightly colored flowers attract…", "pollinators", ["predators only", "rocks"], "Color is a signal."],
      ["Puppies from the same parents look different partly because of…", "the genes they inherit", ["the weather", "the moon"], "Genes affect traits."],
    ]),
];
