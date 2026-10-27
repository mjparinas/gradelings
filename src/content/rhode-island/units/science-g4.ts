import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g4";
import { copyOf, from } from "./kit";

// Rhode Island Grade 4 science: copies of California's earth-hazards and energy-resources units without their California
// places, with Rhode Island examples added.

export const SCIENCE_4: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-earth-hazards"),
    {
      id: "ri-g4-earth-hazards",
      title: "Storms, Floods & Maps",
      emoji: "🌪️",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and ways to reduce harm from hazards Rhode Island knows well, such as hurricanes, storm surges, nor'easters and coastal flooding.",
      standards: ["4-ESS2-2; 4-ESS3-2", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards"],
    },
    [
      ["The hurricane barrier in Providence has gates that close to keep out…", "storm surge from the sea", ["snow", "earthquakes", "wildfires"], "Hurricanes can push ocean water into the city."],
      ["When a hurricane is coming, people who live near the shore may be told to…", "move to higher ground", ["go swimming", "open all the windows", "stand on the beach"], "Water rises in low places near the coast."],
      ["A big winter storm with heavy snow and strong northeast winds is a…", "nor'easter", ["drought", "heat wave", "dust devil"], "These storms often hit New England."],
      ["Sand dunes and salt marshes along the coast help protect towns from…", "storm waves and flooding", ["earthquakes", "volcanoes", "drought"], "They soak up and slow down the waves."],
      ["Building homes on stilts near the beach helps keep them safe from…", "floods", ["droughts", "earthquakes", "lightning only"], "Water can flow underneath."],
      ["On a map, most volcanoes and earthquakes are found…", "along the edges of plates", ["in the middle of every country", "only in Rhode Island", "at the North Pole"], "Plates meet in long chains.", true],
      ["Why do engineers test buildings with shaking tables?", "to see if they survive earthquakes", ["to make them taller", "to paint them", "to cool them"], "Tests show what needs to be stronger.", true],
      ["Why do weather forecasters track a hurricane for days before it arrives?", "so people have time to get ready", ["to make it stronger", "to change its path", "to stop the rain"], "Warnings give time to prepare.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-energy-resources"),
    {
      id: "ri-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like oil, natural gas, coal, wind and sunlight, and how using them affects the environment, using Rhode Island examples such as the Block Island Wind Farm, the first offshore wind farm in the United States.",
      standards: ["4-ESS3-1", "energy and fuels come from natural resources, and their use affects the environment"],
    },
    [
      ["The Block Island Wind Farm makes electricity from…", "wind blowing over the ocean", ["burning coal", "moving lava", "uranium"], "Its turbines stand in the ocean off Block Island."],
      ["Wind and sunlight are called renewable resources because they…", "will not run out", ["are found only underground", "are made of rock", "take millions of years to form"], "The wind keeps blowing and the sun keeps shining."],
      ["Many Rhode Island power plants burn natural gas, which is a…", "fossil fuel", ["renewable resource", "kind of wind", "kind of sunlight"], "It formed from ancient living things."],
      ["Solar panels on a school roof turn… into electricity.", "sunlight", ["wind", "coal", "water"], "The sun is a renewable resource."],
      ["Which resource will run out if we keep using it?", "oil", ["wind", "sunlight", "flowing water"], "Fossil fuels take millions of years to form."],
      ["Long ago, water flowing down the Blackstone River turned wheels that powered…", "mills", ["solar panels", "cars", "computers"], "Moving water can do work."],
      ["Burning coal and gas adds… to the air.", "carbon dioxide and pollution", ["more sunlight", "fresh water", "new forests"], "Burning fuels has effects on the environment.", true],
      ["Why is the ocean off Rhode Island a good place for wind turbines?", "strong, steady winds blow across the open water", ["the water is always calm", "there is no wind at sea", "the ocean is frozen"], "Nothing blocks the wind over open water.", true],
    ],
  ),
];
