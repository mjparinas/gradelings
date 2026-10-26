import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g4";
import { copyOf, from } from "./kit";

// Idaho Grade 4 science: copies of California's earth-hazards and energy-resources units without their California
// places, with Idaho examples added.

export const SCIENCE_4: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-earth-hazards"),
    {
      id: "id-g4-earth-hazards",
      title: "Hazards & Maps",
      emoji: "🔥",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and ways to reduce harm from hazards Idaho knows, such as wildfires, floods, avalanches and earthquakes.",
      standards: ["4-ESS-2.2; 4-ESS-3.2", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural Earth processes"],
    },
    [
      ["When an earthquake starts shaking, you should…", "drop, cover and hold on under a sturdy table", ["run outside past the windows", "stand next to a tall bookcase", "get in an elevator"], "Protect your head and neck."],
      ["Clearing brush and dead branches around homes near Idaho forests helps…", "slow a wildfire before it reaches the homes", ["make it rain", "stop earthquakes", "grow more trees"], "Fire needs fuel to burn."],
      ["Avalanche warnings in Idaho's mountains help skiers…", "stay off slopes where snow might slide", ["ski faster", "make more snow", "find gold"], "A warning gives people time to act."],
      ["Levees along Idaho rivers help keep towns safe from…", "floods", ["droughts", "earthquakes", "heat waves"], "They hold rising water back."],
      ["Building homes on higher ground, away from the river, helps keep them safe from…", "floods", ["blizzards", "earthquakes", "lightning"], "Water rises in low places."],
      ["On a map, most volcanoes and earthquakes are found…", "along the edges of plates", ["in the middle of every country", "only in Idaho", "at the North Pole"], "Plates meet in long chains.", true],
      ["A map shows lava fields at Craters of the Moon and across the Snake River Plain. They show a pattern of…", "volcanic eruptions long ago", ["coral reefs", "glaciers today", "ocean trenches"], "Lava cools into dark rock.", true],
      ["After the Teton Dam in eastern Idaho broke in 1976 and flooded towns, engineers worked to…", "inspect dams closely and plan warnings for towns downstream", ["build dams with no checks", "move rivers uphill", "stop all rain"], "Engineers design ways to lower the harm.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-energy-resources"),
    {
      id: "id-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like moving water, coal, natural gas, wind, sunlight and heat underground, using Idaho examples such as its river dams, the first nuclear electricity near Arco and the geothermal heat that warms the State Capitol.",
      standards: ["4-ESS-3.1", "energy and fuels come from natural resources, and their use affects the environment"],
    },
    [
      ["Dams on the Snake River and other Idaho rivers make electricity from…", "moving water", ["burning coal", "moonlight", "snow"], "Flowing water turns the turbines."],
      ["Coal is a…", "fossil fuel", ["renewable resource", "kind of wind", "kind of water"], "It formed from ancient swamp plants."],
      ["In 1951, a lab in eastern Idaho was the first place in the world to make electricity from…", "nuclear energy", ["wind", "coal", "sunlight"], "It lit four light bulbs."],
      ["Hot water from under the ground heats Idaho's State Capitol in Boise. This energy is called…", "geothermal energy", ["wind energy", "solar energy", "coal power"], "Geo means Earth, and thermal means heat."],
      ["Solar panels turn… into electricity.", "sunlight", ["wind", "coal", "water"], "The sun is a renewable resource."],
      ["Which resource will run out if we keep using it?", "coal", ["wind", "sunlight", "flowing water"], "Fossil fuels take millions of years to form."],
      ["Burning coal and gas adds… to the air.", "carbon dioxide and pollution", ["more sunlight", "fresh water", "new forests"], "Burning fuels has effects on the environment.", true],
      ["A dam makes clean electricity, but it can also…", "block fish like salmon from swimming upstream", ["make the river saltier", "stop the sun", "turn water into coal"], "Every energy source affects the environment somehow.", true],
    ],
  ),
];
