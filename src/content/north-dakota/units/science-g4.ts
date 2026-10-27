import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g4";
import { copyOf, from } from "./kit";

// North Dakota Grade 4 science: copies of California's earth-hazards and energy-resources units without their California
// places, with North Dakota examples added (spring floods, blizzards and tornadoes; oil from the Bakken, lignite coal,
// wind farms and the Garrison Dam).

export const SCIENCE_4: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-earth-hazards"),
    {
      id: "nd-g4-earth-hazards",
      title: "Storms, Floods & Maps",
      emoji: "🌪️",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and ways to reduce harm from hazards North Dakota knows well, such as spring floods, blizzards, tornadoes and drought.",
      standards: ["4-ESS2-2; 4-ESS3-2", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards"],
    },
    [
      ["To protect a city from a spring flood on the Red River, people build…", "dikes and walls of sandbags", ["snow forts", "taller trees", "open windows"], "They keep the river water out."],
      ["When a blizzard warning is given, it is safest to…", "stay inside and off the roads", ["go for a long drive", "play in an open field", "open all the windows"], "Blowing snow makes it hard to see."],
      ["When a tornado warning sounds, people should go to…", "a basement or an inside room without windows", ["the roof", "an open field", "a car in the parking lot"], "Stay away from windows."],
      ["Farmers plant rows of trees, called shelterbelts, to slow the wind and keep… from blowing away.", "soil", ["rain", "sunlight", "rivers"], "Wind can carry dry soil away."],
      ["Weather stations and radar help forecasters warn people about…", "storms before they arrive", ["earthquakes last year", "how old rocks are", "what time it is"], "Early warnings give time to get ready."],
      ["On a map, most volcanoes and earthquakes are found…", "along the edges of plates", ["in the middle of every country", "only on the prairie", "at the North Pole"], "Plates meet in long chains.", true],
      ["Why do engineers test buildings with shaking tables?", "to see if they survive earthquakes", ["to make them taller", "to paint them", "to cool them"], "Tests show what needs to be stronger.", true],
      ["Moving homes away from low land next to a river is a way to…", "reduce damage from floods", ["make floods bigger", "stop the snow", "cause a drought"], "Floodwater fills the lowest land first.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-energy-resources"),
    {
      id: "nd-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like oil, natural gas, coal, wind, sunlight and moving water, and how using them affects the environment, using North Dakota examples such as oil from the Bakken, lignite coal, wind farms and the Garrison Dam.",
      standards: ["4-ESS3-1", "energy and fuels come from natural resources, and their use affects the environment"],
    },
    [
      ["Wind turbines on North Dakota's windy prairies make electricity from…", "moving air", ["burning coal", "moving lava", "uranium"], "The blades spin when the wind blows."],
      ["Wind and sunlight are called renewable resources because they…", "will not run out", ["are found only underground", "are made of rock", "take millions of years to form"], "The wind keeps blowing and the sun keeps shining."],
      ["The soft brown coal dug in western North Dakota and burned to make electricity is called…", "lignite", ["granite", "marble", "chalk"], "North Dakota has huge amounts of it."],
      ["Oil pumped from deep rock layers in western North Dakota is a…", "fossil fuel", ["renewable resource", "kind of wind", "kind of sunlight"], "It formed from ancient living things."],
      ["The Garrison Dam on the Missouri River makes electricity from…", "moving water", ["sunlight", "coal", "oil"], "Water flows through turbines in the dam."],
      ["Which resource will run out if we keep using it?", "oil", ["wind", "sunlight", "flowing water"], "Fossil fuels take millions of years to form."],
      ["Burning coal and gas adds… to the air.", "carbon dioxide and pollution", ["more sunlight", "fresh water", "new forests"], "Burning fuels has effects on the environment.", true],
      ["After a coal mine is finished, workers put the soil back and plant grass. This is called…", "reclamation", ["erosion", "pollution", "evaporation"], "It helps the land heal.", true],
    ],
  ),
];
