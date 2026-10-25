import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g4";
import { copyOf, from } from "./kit";

// Maryland Grade 4 science: copies of California's earth-hazards and energy-resources units without their California
// places, with Maryland examples added.

export const SCIENCE_4: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-earth-hazards"),
    {
      id: "md-g4-earth-hazards",
      title: "Quakes, Storms & Maps",
      emoji: "🌀",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and ways to reduce harm from hazards such as the hurricanes, flash floods and coastal flooding Maryland knows well.",
      standards: ["4-ESS2-2; 4-ESS3-2", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards"],
    },
    [
      ["A hurricane warning for the Maryland coast helps people…", "get ready or leave in time", ["stop the wind", "cool the ocean", "make more rain"], "Warnings save lives."],
      ["During a flash flood, you should…", "move to higher ground", ["walk through the water", "drive across a flooded road", "go to the basement"], "Turn around, don't drown."],
      ["Sand dunes along Ocean City's beach help protect the town from…", "storm waves", ["earthquakes", "volcanoes", "droughts"], "Dunes block waves and wind."],
      ["A nor'easter is a strong storm that brings…", "wind, rain or snow from the northeast", ["lava", "earthquakes", "only sunshine"], "It blows in off the ocean."],
      ["Building homes on high ground near a river helps keep them safe from…", "floods", ["droughts", "earthquakes", "lightning only"], "Water rises in low places."],
      ["On a map, most volcanoes and earthquakes are found…", "along the edges of plates", ["in the middle of every country", "only in Maryland", "at the North Pole"], "Plates meet in long chains.", true],
      ["Why do engineers test buildings with shaking tables?", "to see if they survive earthquakes", ["to make them taller", "to paint them", "to cool them"], "Tests show what needs to be stronger.", true],
      ["Marshes along the Chesapeake Bay can reduce flooding because they…", "soak up extra water", ["make more rain", "stop all rivers", "freeze in summer"], "Marshes act like sponges.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-energy-resources"),
    {
      id: "md-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like coal, wind, sunlight, moving water and uranium, using Maryland examples such as the Conowingo Dam, the Calvert Cliffs nuclear plant and solar farms.",
      standards: ["4-ESS3-1", "energy and fuels come from natural resources, and their use affects the environment"],
    },
    [
      ["The Conowingo Dam on the Susquehanna River makes electricity from…", "moving water", ["coal", "sunlight", "wind"], "It is a hydroelectric dam."],
      ["The Calvert Cliffs power plant makes electricity from…", "uranium", ["corn", "wind", "waves"], "It is a nuclear power plant."],
      ["Coal was mined for many years in which part of Maryland?", "the western mountains", ["Ocean City", "the Eastern Shore", "Baltimore Harbor"], "Coal lies under the hills of Allegany and Garrett counties."],
      ["Solar panels on a school roof turn… into electricity.", "sunlight", ["coal", "water", "soil"], "They work best on sunny days."],
      ["Which energy source will never run out?", "wind", ["coal", "oil", "natural gas"], "Renewable sources are replaced by nature."],
      ["Burning coal to make electricity can cause…", "air pollution", ["more fresh water", "taller mountains", "colder summers"], "Smoke goes into the air."],
      ["Why are wind turbines planned off Maryland's ocean coast?", "strong, steady winds blow over the ocean", ["there are no birds there", "the ocean is shallow everywhere", "it never storms"], "Offshore winds are steady.", true],
      ["Dams make clean electricity, but they can also…", "block fish from swimming upriver", ["make the river salty", "cause earthquakes daily", "stop the rain"], "Fish lifts help fish get past.", true],
    ],
  ),
];
