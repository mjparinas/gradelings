import { course as BC_SCIENCE_4 } from "../../grades/g4/science";
import type { Unit } from "../../types";
import { SCIENCE_2 as WASHINGTON_SCIENCE_2 } from "../../washington/units/science-k2";
import { from, localCopy } from "./kit";

// North Carolina copies of units used in Grade 4 that fit North Carolina except for a few questions naming another
// state's or a Canadian place.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_2, "wa-g2-earth-changes"),
    "nc-g4-earth-changes",
    ["ESS.4.2.3", "slow changes like weathering and erosion, and fast changes like earthquakes, landslides and floods"],
    [
      ["Waves slowly moving sand along the Outer Banks is a… change.", "slow", ["fast", "sudden"], "It happens a little at a time over many years."],
      ["A hurricane flooding a river town in one night is a… change.", "fast", ["slow", "very slow"], "It happens in hours."],
      ["Planting sea oats on a sand dune helps stop…", "the sand from blowing and washing away", ["the tide from coming in", "rain from falling"], "Roots hold sand in place."],
      ["Rain and ice slowly breaking rock into smaller pieces is called…", "weathering", ["erupting", "freezing over"], "Erosion then carries the pieces away."],
    ],
  ),
  localCopy(
    from(BC_SCIENCE_4.units, "earth-and-moon"),
    "nc-g4-earth-and-moon",
    ["ESS.4.1.1; ESS.4.1.2", "how Earth's spin causes day and night, and the phases of the moon"],
    [
      ["When it is daytime in North Carolina, it is night on the side of Earth that…", "faces away from the sun", ["is closest to the moon", "has the most oceans"], "Earth spins once a day."],
      ["The moon phase when we see the whole lit side is the…", "full moon", ["new moon", "first quarter"], "The moon looks like a bright circle."],
      ["About how long does the moon take to go through all its phases?", "about a month", ["one day", "one year"], "From new moon to new moon is about 29 days."],
      ["When only a thin curved sliver of the moon is lit, the phase is a…", "crescent", ["full moon", "gibbous"], "Crescent means a curved shape."],
    ],
  ),
];
