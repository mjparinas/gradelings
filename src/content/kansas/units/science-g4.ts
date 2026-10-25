import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g4";
import { copyOf, from } from "./kit";

// Kansas Grade 4 science: copies of California's earth-hazards and energy-resources units without their California
// places, with Kansas examples added.

export const SCIENCE_4: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-earth-hazards"),
    {
      id: "ks-g4-earth-hazards",
      title: "Storms, Floods & Maps",
      emoji: "🌪️",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and ways to reduce harm from hazards Kansas knows well, such as tornadoes, floods, hail and grass fires.",
      standards: ["4-ESS2-2; 4-ESS3-2", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards"],
    },
    [
      ["When the tornado sirens sound in a Kansas town, you should…", "go to a basement or an inside room", ["go outside to watch", "stand by a window", "get in the bathtub outside"], "Get low, inside, away from windows."],
      ["Many Kansas schools and homes have a… to keep people safe in tornadoes.", "storm shelter", ["swimming pool", "tall tower", "glass roof"], "Shelters are strong rooms, often below ground."],
      ["Weather radar helps forecasters…", "warn people before a storm arrives", ["stop tornadoes", "make rain", "move rivers"], "Warnings give people time to take shelter."],
      ["Mowing dry grass and plowing a strip of bare ground near a house helps keep it safe from…", "grass fires", ["earthquakes", "floods", "hail"], "Fire needs fuel to spread."],
      ["Building on high ground away from a river helps keep homes safe from…", "floods", ["droughts", "earthquakes", "lightning only"], "Water rises in low places."],
      ["On a map, most volcanoes and earthquakes are found…", "along the edges of plates", ["in the middle of every country", "only in Kansas", "at the North Pole"], "Plates meet in long chains.", true],
      ["After a tornado in 2007, the town of Greensburg rebuilt with…", "stronger buildings and wind power", ["no roofs", "only tents", "buildings made of paper"], "People can rebuild to be safer.", true],
      ["Levees along the Kansas River help…", "keep floodwater out of towns", ["make more rain", "start earthquakes", "melt snow"], "A levee is a wall of earth beside a river.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-energy-resources"),
    {
      id: "ks-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like coal, oil, natural gas, wind, sunlight and moving water, using Kansas examples such as its wind farms and its oil and gas wells.",
      standards: ["4-ESS3-1", "energy and fuels come from natural resources, and their use affects the environment"],
    },
    [
      ["Kansas has strong, steady winds, so it makes a lot of electricity from…", "wind turbines", ["coal dust", "ocean waves", "snow"], "Wind farms stand across the plains."],
      ["Coal is a…", "fossil fuel", ["renewable resource", "kind of wind", "kind of water"], "It formed from ancient swamp plants."],
      ["Oil pumped from wells in Kansas is a…", "fossil fuel", ["renewable resource", "kind of wind", "kind of sunlight"], "It formed from tiny living things long ago."],
      ["Wind is a renewable resource because…", "it will not run out", ["it is dirty", "it is buried underground", "it is a metal"], "The sun keeps making wind."],
      ["Solar panels turn… into electricity.", "sunlight", ["wind", "coal", "water"], "The sun is a renewable resource."],
      ["Which resource will run out if we keep using it?", "natural gas", ["wind", "sunlight", "flowing water"], "Fossil fuels take millions of years to form."],
      ["Burning coal and gas adds… to the air.", "carbon dioxide and pollution", ["more sunlight", "fresh water", "new forests"], "Burning fuels has effects on the environment.", true],
      ["Why are the open plains of Kansas a good place for wind farms?", "the wind blows hard and steady", ["they have thick forests", "the air never moves", "they are under water"], "Turbines need lots of wind.", true],
    ],
  ),
];
