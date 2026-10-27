import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g4";
import { copyOf, from } from "./kit";

// Delaware Grade 4 science: copies of California's earth-hazards and energy-resources units without their
// California places, with Delaware examples added.

export const SCIENCE_4: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-earth-hazards"),
    {
      id: "de-g4-earth-hazards",
      title: "Storms, Floods & Maps",
      emoji: "🌪️",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and ways to reduce harm from hazards Delaware knows well, such as flash floods, ice storms, nor'easters, hurricanes and storm waves on the beaches.",
      standards: ["4-ESS2-2; 4-ESS3-2", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards"],
    },
    [
      ["When very heavy rain falls in a short time, creeks like the Brandywine may…", "flood", ["freeze solid", "dry up", "flow uphill"], "The water has nowhere to go but up and over the banks."],
      ["Freezing rain coats trees and power lines with heavy ice in an…", "ice storm", ["earthquake", "heat wave", "dust storm"], "The weight of the ice can snap branches and lines."],
      ["Before a nor'easter, families in Delaware should…", "get flashlights, batteries and water ready", ["open all the windows", "go swimming", "turn off the heat"], "Storms can knock out power."],
      ["Cutting branches away from power lines helps keep the lights on during…", "storms", ["sunny days", "eclipses", "quiet nights"], "Falling branches can break the lines."],
      ["Building homes away from the banks of a river helps keep them safe from…", "floods", ["droughts", "earthquakes", "lightning only"], "Water rises in low places."],
      ["On a map, most volcanoes and earthquakes are found…", "along the edges of plates", ["in the middle of every country", "only in Delaware", "at the North Pole"], "Plates meet in long chains.", true],
      ["Why do engineers test buildings with shaking tables?", "to see if they survive earthquakes", ["to make them taller", "to paint them", "to cool them"], "Tests show what needs to be stronger.", true],
      ["Sand dunes and beach grass along Delaware's beaches help protect towns from…", "storm waves", ["earthquakes", "droughts", "volcanoes"], "Dunes act like a wall of sand.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-energy-resources"),
    {
      id: "de-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like oil, natural gas, uranium, wood, moving water, wind and sunlight, and how using them affects the environment, using Delaware examples such as the old Brandywine mills, power plants that burn natural gas, solar farms near Dover and the wind turbine at Lewes.",
      standards: ["4-ESS3-1", "energy and fuels come from natural resources, and their use affects the environment"],
    },
    [
      ["Long ago, the mills on the Brandywine Creek used the energy of…", "falling water", ["burning coal only", "sunlight", "uranium"], "Mills were built beside rapids and small falls."],
      ["Most of Delaware's power plants make electricity by burning natural gas, which is a…", "fossil fuel", ["renewable resource", "kind of wind", "kind of sunlight"], "It formed underground over millions of years."],
      ["The wind turbine on the University of Delaware's campus in Lewes makes electricity from…", "moving air", ["moving water", "burning wood", "sunlight"], "Turbines spin when the wind blows."],
      ["Rows of solar panels on farms near Dover make electricity from…", "sunlight", ["uranium", "burning coal", "moving water"], "Solar panels turn light into electricity."],
      ["Some Delaware homes are heated by burning wood, which is a…", "renewable resource if forests are replanted", ["fossil fuel", "kind of uranium", "resource that can never grow back"], "New trees can grow to replace those cut."],
      ["Which resource will run out if we keep using it?", "oil", ["wind", "sunlight", "flowing water"], "Fossil fuels take millions of years to form."],
      ["Burning oil and gas adds… to the air.", "carbon dioxide and pollution", ["more sunlight", "fresh water", "new forests"], "Burning fuels has effects on the environment.", true],
      ["Why are wind turbines planned off Delaware's coast, out in the ocean?", "the wind there is strong and steady", ["the ocean makes the wind warm", "there is no wind on land at all", "turbines float to the moon"], "Nothing blocks the wind over open water.", true],
    ],
  ),
];
