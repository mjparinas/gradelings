import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g4";
import { copyOf, from } from "./kit";

// South Dakota Grade 4 science: copies of California's earth-hazards and energy-resources units without their California
// places, with South Dakota examples added.

export const SCIENCE_4: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-earth-hazards"),
    {
      id: "sd-g4-earth-hazards",
      title: "Storms, Floods & Maps",
      emoji: "🌪️",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and ways to reduce harm from hazards South Dakota knows well, such as tornadoes, blizzards, spring floods and wildfires.",
      standards: ["4-ESS2-2; 4-ESS3-2", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards"],
    },
    [
      ["When a tornado warning sounds, the safest place to go is…", "a basement or an inside room with no windows", ["outside to watch", "a car on the highway", "the top floor"], "Walls and floors protect you from flying things."],
      ["Outdoor sirens in South Dakota towns warn people about…", "tornadoes", ["earthquakes", "volcanoes", "tsunamis"], "Sirens give people time to take cover."],
      ["Snow fences along highways help during blizzards because they…", "catch blowing snow before it covers the road", ["make it snow less", "warm the road", "stop the wind everywhere"], "Snow piles up behind the fence."],
      ["Levees and dams on rivers like the Missouri help protect towns from…", "floods", ["droughts", "earthquakes", "lightning only"], "They hold back high water."],
      ["Spring floods often happen in South Dakota when…", "deep snow melts quickly", ["the wind stops", "it is very dry", "the moon is full"], "Melting snow fills rivers fast."],
      ["On a map, most volcanoes and earthquakes are found…", "along the edges of plates", ["in the middle of every country", "only in South Dakota", "at the North Pole"], "Plates meet in long chains.", true],
      ["Why do engineers test buildings with shaking tables?", "to see if they survive earthquakes", ["to make them taller", "to paint them", "to cool them"], "Tests show what needs to be stronger.", true],
      ["Why do weather forecasters watch storms on radar?", "so people get warnings in time to be safe", ["to make storms stronger", "to change their path", "to stop the rain"], "Warnings give time to prepare.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-energy-resources"),
    {
      id: "sd-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like oil, natural gas, coal, wind, flowing water and sunlight, and how using them affects the environment, using South Dakota examples such as wind farms on the prairie, the dams on the Missouri River and ethanol made from corn.",
      standards: ["4-ESS3-1", "energy and fuels come from natural resources, and their use affects the environment"],
    },
    [
      ["The tall turbines on South Dakota's prairie make electricity from…", "the wind", ["burning coal", "moving lava", "uranium"], "The wind turns their blades."],
      ["Wind and sunlight are called renewable resources because they…", "will not run out", ["are found only underground", "are made of rock", "take millions of years to form"], "The wind keeps blowing and the sun keeps shining."],
      ["The big dams on the Missouri River, like Oahe Dam, make electricity from…", "flowing water", ["burning wood", "sunlight", "coal"], "Water rushing through the dam turns turbines."],
      ["Solar panels on a school roof turn… into electricity.", "sunlight", ["wind", "coal", "water"], "The sun is a renewable resource."],
      ["Which resource will run out if we keep using it?", "oil", ["wind", "sunlight", "flowing water"], "Fossil fuels take millions of years to form."],
      ["Many South Dakota plants make a fuel called ethanol from…", "corn", ["sand", "rocks", "snow"], "Corn grows again each year."],
      ["Burning coal and gas adds… to the air.", "carbon dioxide and pollution", ["more sunlight", "fresh water", "new forests"], "Burning fuels has effects on the environment.", true],
      ["Why is the open prairie a good place for wind turbines?", "strong, steady winds blow across the flat land", ["the air is always calm", "there is no wind there", "the ground is frozen"], "Few hills or trees block the wind.", true],
    ],
  ),
];
