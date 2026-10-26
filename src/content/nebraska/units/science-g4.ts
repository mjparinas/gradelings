import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g4";
import { copyOf, from } from "./kit";

// Nebraska Grade 4 science: copies of California's earth-hazards and energy-resources units without their California
// places, with Nebraska examples added.

export const SCIENCE_4: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-earth-hazards"),
    {
      id: "neb-g4-earth-hazards",
      title: "Storms, Floods & Maps",
      emoji: "🌪️",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and ways to reduce harm from hazards Nebraska knows well, such as tornadoes, floods, blizzards and grass fires.",
      standards: ["SC.4.13.4.c; SC.4.13.4.d", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards"],
    },
    [
      ["When the tornado sirens sound in a Nebraska town, you should…", "go to a basement or an inside room", ["go outside to watch", "stand by a window", "get in the bathtub outside"], "Get low, inside, away from windows."],
      ["Many Nebraska schools and homes have a… to keep people safe in tornadoes.", "storm shelter", ["swimming pool", "tall tower", "glass roof"], "Shelters are strong rooms, often below ground."],
      ["Weather radar helps forecasters…", "warn people before a storm arrives", ["stop tornadoes", "make rain", "move rivers"], "Warnings give people time to take shelter."],
      ["Before a blizzard, Nebraska families should…", "stock up and stay off the roads", ["go for a long drive", "open all the windows", "go swimming"], "Blowing snow makes roads dangerous."],
      ["Mowing dry grass and plowing a strip of bare ground near a house helps keep it safe from…", "grass fires", ["earthquakes", "floods", "hail"], "Fire needs fuel to spread."],
      ["Building on high ground away from a river helps keep homes safe from…", "floods", ["droughts", "earthquakes", "lightning only"], "Water rises in low places."],
      ["On a map, most volcanoes and earthquakes are found…", "along the edges of plates", ["in the middle of every country", "only in Nebraska", "at the North Pole"], "Plates meet in long chains.", true],
      ["In March 2019, melting snow and heavy rain flooded towns along Nebraska's rivers. Which would most help next time?", "stronger levees and warnings to move to high ground", ["building closer to the river", "removing every levee", "ignoring the forecast"], "Planning ahead reduces harm from floods.", true],
      ["Levees along the Missouri River at Omaha help…", "keep floodwater out of towns", ["make more rain", "start earthquakes", "melt snow"], "A levee is a wall of earth beside a river.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-energy-resources"),
    {
      id: "neb-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like coal, oil, natural gas, wind, sunlight and moving water, using Nebraska examples such as its wind farms, corn ethanol and the Kingsley Dam on the North Platte River.",
      standards: ["SC.4.4.2.f", "energy and fuels come from natural resources, and their use affects the environment"],
    },
    [
      ["Nebraska has strong, steady winds, so it makes a lot of electricity from…", "wind turbines", ["coal dust", "ocean waves", "snow"], "Wind farms stand across the plains."],
      ["Coal is a…", "fossil fuel", ["renewable resource", "kind of wind", "kind of water"], "It formed from ancient swamp plants."],
      ["Ethanol fuel made from Nebraska corn is renewable because…", "farmers can grow more corn every year", ["it comes from rocks", "it never burns", "it is made of wind"], "Crops grow back each season."],
      ["Kingsley Dam on the North Platte River makes electricity from…", "moving water", ["burning coal", "sunlight", "wind"], "Water flowing through the dam spins turbines."],
      ["Wind is a renewable resource because…", "it will not run out", ["it is dirty", "it is buried underground", "it is a metal"], "The sun keeps making wind."],
      ["Solar panels turn… into electricity.", "sunlight", ["wind", "coal", "water"], "The sun is a renewable resource."],
      ["Which resource will run out if we keep using it?", "natural gas", ["wind", "sunlight", "flowing water"], "Fossil fuels take millions of years to form."],
      ["Burning coal and gas adds… to the air.", "carbon dioxide and pollution", ["more sunlight", "fresh water", "new forests"], "Burning fuels has effects on the environment.", true],
      ["Why are the open plains of Nebraska a good place for wind farms?", "the wind blows hard and steady", ["they have thick forests", "the air never moves", "they are under water"], "Turbines need lots of wind.", true],
    ],
  ),
];
