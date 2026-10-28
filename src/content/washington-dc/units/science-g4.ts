import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g4";
import { copyOf, from } from "./kit";

// Washington, DC Grade 4 science: copies of California's earth-hazards and energy-resources units without their
// California places, with DC examples added (Potomac floods and the levee on the National Mall, summer storms and the
// 2011 earthquake; rooftop solar, Metro's electric trains and the power DC Water makes at Blue Plains).

export const SCIENCE_4: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-earth-hazards"),
    {
      id: "dc-g4-earth-hazards",
      title: "Storms, Floods & Maps",
      emoji: "🌪️",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and ways to reduce harm from hazards Washington, DC knows, such as river floods on the Potomac, heavy summer storms, snowstorms and the earthquake of 2011.",
      standards: ["4-ESS2-2; 4-ESS3-2", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards"],
    },
    [
      ["After days of heavy rain upstream, the Potomac River can rise and…", "flood", ["freeze solid", "dry up", "flow uphill"], "Rain from far away drains into the river."],
      ["A levee near the Washington Monument can be closed to keep floodwater from the…", "Potomac River", ["Pacific Ocean", "Great Lakes", "Gulf of Mexico"], "It protects the National Mall and downtown."],
      ["In 2011, an earthquake shook Washington, DC and cracked the stones of the…", "Washington Monument", ["Lincoln's top hat", "Potomac River", "Metro trains"], "The monument was closed for repairs."],
      ["Before a big storm, families should…", "get flashlights, batteries and water ready", ["open all the windows", "go swimming", "turn off the heat"], "Storms can knock out power."],
      ["Building homes away from the banks of a river helps keep them safe from…", "floods", ["droughts", "earthquakes", "lightning only"], "Water rises in low places."],
      ["Planting trees and rain gardens in a city helps because they…", "soak up rainwater before it floods streets", ["make more rain", "stop earthquakes", "make the river saltier"], "Hard pavement sends water rushing into drains."],
      ["On a map, most volcanoes and earthquakes are found…", "along the edges of plates", ["in the middle of every country", "only in big cities", "at the North Pole"], "Plates meet in long chains.", true],
      ["Why do engineers test buildings with shaking tables?", "to see if they survive earthquakes", ["to make them taller", "to paint them", "to cool them"], "Tests show what needs to be stronger.", true],
      ["Dams and floodwalls along a river are built to…", "hold back high water", ["make more rain", "stop earthquakes", "warm the river"], "They keep water away from towns.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-energy-resources"),
    {
      id: "dc-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like oil, natural gas, uranium, wood, moving water, wind and sunlight, and how using them affects the environment, using Washington, DC examples such as solar panels on rooftops, Metro's electric trains and the power DC Water makes from wastewater at Blue Plains.",
      standards: ["4-ESS3-1", "energy and fuels come from natural resources, and their use affects the environment"],
    },
    [
      ["Solar panels on the roofs of DC schools and homes make electricity from…", "sunlight", ["moving water", "burning oil", "uranium"], "The panels work best on clear days."],
      ["Metro trains in Washington, DC run on…", "electricity", ["wind in their sails", "burning wood", "horses"], "A powered rail beside the tracks feeds the trains."],
      ["At its Blue Plains plant, DC Water turns gas from wastewater into…", "electricity", ["drinking water", "gasoline", "sand"], "Waste can be a source of energy."],
      ["Wind turbines make electricity from…", "moving air", ["moving water", "burning wood", "sunlight"], "Turbines spin when the wind blows."],
      ["Dams on rivers make electricity from…", "moving water", ["burning coal", "wind", "uranium"], "Water spins a turbine as it flows through the dam."],
      ["Which resource will run out if we keep using it?", "oil", ["wind", "sunlight", "flowing water"], "Fossil fuels take millions of years to form."],
      ["Many city buses burn natural gas, which is a…", "fossil fuel", ["renewable resource", "kind of sunlight", "kind of wind"], "It formed from living things millions of years ago."],
      ["Burning oil and gas adds… to the air.", "carbon dioxide and pollution", ["more sunlight", "fresh water", "new forests"], "Burning fuels has effects on the environment.", true],
      ["Why does a dam make a lake behind it?", "it holds back the river's water", ["it pumps in ocean water", "it makes rain", "it melts glaciers"], "The water piles up behind the wall.", true],
    ],
  ),
];
