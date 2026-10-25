import { course as BC_SCIENCE_8 } from "../../grades/g8/science";
import { units as ONTARIO_SCIENCE_6 } from "../../ontario/g6-science";
import type { Unit } from "../../types";
import { from, localCopy } from "./kit";

// North Carolina copies of units used in Grade 6 that fit North Carolina except for a few questions naming another
// state's or a Canadian place.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(BC_SCIENCE_8.units, "plate-tectonics"),
    "nc-g6-plate-tectonics",
    ["ESS.6.2.2", "how moving plates build landforms and cause earthquakes and volcanoes"],
    [
      ["The Appalachian Mountains formed long ago when…", "plates pushed together", ["a river dried up", "a glacier melted"], "Colliding plates crumple the crust upward."],
      ["Most earthquakes happen…", "along the edges of plates", ["in the middle of every ocean", "only at the North Pole"], "Plates grind past each other at their edges."],
      ["Where two plates pull apart under the ocean, new crust forms at a…", "mid-ocean ridge", ["sand dune", "delta"], "Magma rises and cools there."],
      ["The ground under North Carolina sits…", "in the middle of a plate, so big earthquakes are rare", ["right on a plate edge", "on a chain of active volcanoes"], "The North American Plate's edges are far away."],
    ],
  ),
  localCopy(
    from(ONTARIO_SCIENCE_6, "earth-moon-sun-6"),
    "nc-g6-earth-moon-sun",
    ["ESS.6.1.1", "how the sun, Earth and moon cause seasons, tides, moon phases and eclipses"],
    [
      ["The beaches at Wrightsville have two high tides about every…", "day", ["year", "month"], "The moon's pull causes about two high tides a day."],
      ["North Carolina has summer when the Northern Hemisphere…", "tilts toward the sun", ["is closest to the moon", "tilts away from the sun"], "Tilt, not distance, causes seasons."],
      ["A solar eclipse happens when the…", "moon passes between the sun and Earth", ["Earth passes between the sun and the moon", "sun passes between Earth and the moon"], "The moon's shadow falls on Earth."],
      ["Spring tides, the highest high tides, happen when the sun, moon and Earth…", "line up", ["form a right angle", "are farthest apart"], "Their pulls add together."],
    ],
  ),
];
