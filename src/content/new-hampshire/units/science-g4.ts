import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g4";
import { copyOf, from } from "./kit";

// New Hampshire Grade 4 science: copies of California's earth-hazards and energy-resources units without their
// California places, with New Hampshire examples added.

export const SCIENCE_4: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-earth-hazards"),
    {
      id: "nh-g4-earth-hazards",
      title: "Storms, Floods & Maps",
      emoji: "🌪️",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and ways to reduce harm from hazards New Hampshire knows well, such as spring floods, ice storms, nor'easters and the remains of hurricanes.",
      standards: ["4-ESS2-2; 4-ESS3-2", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards"],
    },
    [
      ["When deep snow melts fast and heavy rain falls in spring, rivers may…", "flood", ["freeze solid", "dry up", "flow uphill"], "Melted snow adds lots of water to rivers."],
      ["Freezing rain coats trees and power lines with heavy ice in an…", "ice storm", ["earthquake", "heat wave", "dust storm"], "The weight of the ice can snap branches and lines."],
      ["Before a nor'easter, families in New Hampshire should…", "get flashlights, batteries and water ready", ["open all the windows", "go swimming", "turn off the heat"], "Storms can knock out power."],
      ["Cutting branches away from power lines helps keep the lights on during…", "storms", ["sunny days", "eclipses", "quiet nights"], "Falling branches can break the lines."],
      ["Building homes away from the banks of a river helps keep them safe from…", "floods", ["droughts", "earthquakes", "lightning only"], "Water rises in low places."],
      ["On a map, most volcanoes and earthquakes are found…", "along the edges of plates", ["in the middle of every country", "only in New Hampshire", "at the North Pole"], "Plates meet in long chains.", true],
      ["Why do engineers test buildings with shaking tables?", "to see if they survive earthquakes", ["to make them taller", "to paint them", "to cool them"], "Tests show what needs to be stronger.", true],
      ["Dams and floodwalls along a river are built to…", "hold back high water", ["make more rain", "stop earthquakes", "warm the river"], "They keep water away from towns.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-energy-resources"),
    {
      id: "nh-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like oil, natural gas, uranium, wood, moving water, wind and sunlight, and how using them affects the environment, using New Hampshire examples such as the Seabrook nuclear power plant, dams on its rivers, wind turbines on its ridges and wood heat.",
      standards: ["4-ESS3-1", "energy and fuels come from natural resources, and their use affects the environment"],
    },
    [
      ["Long ago, New Hampshire's mills used the energy of…", "falling river water", ["burning coal only", "sunlight", "uranium"], "Mills were built beside waterfalls and rapids."],
      ["Dams on New Hampshire rivers make electricity from…", "moving water", ["burning coal", "wind", "uranium"], "Water spins a turbine as it flows through the dam."],
      ["Wind turbines on New Hampshire's hills and ridges make electricity from…", "moving air", ["moving water", "burning wood", "sunlight"], "Turbines spin when the wind blows."],
      ["The Seabrook power plant on New Hampshire's coast uses uranium to make…", "nuclear energy", ["wind energy", "solar energy", "water power"], "Uranium is a mineral used for nuclear energy."],
      ["Many New Hampshire homes are heated by burning wood, which is a…", "renewable resource if forests are replanted", ["fossil fuel", "kind of uranium", "resource that can never grow back"], "New trees can grow to replace those cut."],
      ["Which resource will run out if we keep using it?", "oil", ["wind", "sunlight", "flowing water"], "Fossil fuels take millions of years to form."],
      ["Burning oil and gas adds… to the air.", "carbon dioxide and pollution", ["more sunlight", "fresh water", "new forests"], "Burning fuels has effects on the environment.", true],
      ["Why does a dam make a lake behind it?", "it holds back the river's water", ["it pumps in ocean water", "it makes rain", "it melts glaciers"], "The water piles up behind the wall.", true],
    ],
  ),
];
