import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g4";
import { copyOf, from } from "./kit";

// New Mexico Grade 4 science: copies of California's earth-hazards and energy-resources units without their California
// places, with New Mexico examples added.

export const SCIENCE_4: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-earth-hazards"),
    {
      id: "nm-g4-earth-hazards",
      title: "Fires, Floods & Maps",
      emoji: "🌪️",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and ways to reduce harm from hazards New Mexico knows well, such as wildfires, flash floods, drought and dust storms.",
      standards: ["4-ESS2-2; 4-ESS3-2", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards"],
    },
    [
      ["Clearing dry brush away from a house helps keep it safe from…", "wildfire", ["earthquakes", "floods", "hail"], "Fire needs fuel to spread."],
      ["A sudden flood that rushes down a dry arroyo after a storm is a…", "flash flood", ["drought", "heat wave", "dust devil"], "Monsoon storms can fill an arroyo in minutes."],
      ["During a dust storm on a New Mexico highway, drivers should…", "pull off the road and wait", ["drive faster", "turn on music", "open the windows"], "Blowing dust makes it hard to see."],
      ["A long time with much less rain than usual is a…", "drought", ["flood", "blizzard", "tornado"], "Droughts dry out soil and rivers."],
      ["Building on high ground near a river helps keep homes safe from…", "floods", ["droughts", "earthquakes", "lightning only"], "Water rises in low places."],
      ["On a map, most volcanoes and earthquakes are found…", "along the edges of plates", ["in the middle of every country", "only in New Mexico", "at the North Pole"], "Plates meet in long chains.", true],
      ["Why do engineers test buildings with shaking tables?", "to see if they survive earthquakes", ["to make them taller", "to paint them", "to cool them"], "Tests show what needs to be stronger.", true],
      ["Forest workers thin out crowded trees in New Mexico's mountains to make…", "wildfires smaller and easier to stop", ["more rain fall", "earthquakes weaker", "rivers flow uphill"], "Less fuel means smaller fires.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-energy-resources"),
    {
      id: "nm-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like oil, natural gas, coal, uranium, wind and sunlight, and how using them affects the environment, using New Mexico examples such as the oil fields of the southeast and the wind farms of the eastern plains.",
      standards: ["4-ESS3-1", "energy and fuels come from natural resources, and their use affects the environment"],
    },
    [
      ["Wells in southeastern New Mexico pump up oil and natural gas, which are…", "fossil fuels", ["renewable resources", "kinds of wind", "kinds of sunlight"], "They formed from ancient living things."],
      ["Wind farms on New Mexico's eastern plains make electricity from…", "moving air", ["burning coal", "moving water", "uranium"], "Turbines spin when the wind blows."],
      ["New Mexico has many sunny days, so it can make a lot of electricity from…", "sunlight", ["coal dust", "ocean waves", "snow"], "Solar panels work best in strong sun."],
      ["Uranium mined near Grants was used as fuel for…", "nuclear power plants", ["wind turbines", "solar panels", "water wheels"], "Uranium is a mineral used for nuclear energy."],
      ["Solar panels turn… into electricity.", "sunlight", ["wind", "coal", "water"], "The sun is a renewable resource."],
      ["Which resource will run out if we keep using it?", "oil", ["wind", "sunlight", "flowing water"], "Fossil fuels take millions of years to form."],
      ["Burning coal and gas adds… to the air.", "carbon dioxide and pollution", ["more sunlight", "fresh water", "new forests"], "Burning fuels has effects on the environment.", true],
      ["Why are New Mexico's open plains a good place for wind farms?", "the wind blows strongly across the flat land", ["they are always calm", "they have thick forests", "they are under water"], "Turbines need steady wind.", true],
    ],
  ),
];
