import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g4";
import { copyOf, from } from "./kit";

// Iowa Grade 4 science: copies of California's earth-hazards and energy-resources units without their California
// places, with Iowa examples added.

export const SCIENCE_4: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-earth-hazards"),
    {
      id: "ia-g4-earth-hazards",
      title: "Storms, Floods & Maps",
      emoji: "🌪️",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and ways to reduce harm from hazards Iowa knows well, such as tornadoes, floods, blizzards and strong windstorms.",
      standards: ["4-ESS2-2; 4-ESS3-2", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards"],
    },
    [
      ["When a tornado warning sounds in Iowa, you should…", "go to a basement or an inside room without windows", ["stand by a window", "go outside to watch", "get in a car and drive fast"], "Put as many walls between you and the storm as you can."],
      ["Outdoor sirens in Iowa towns help people…", "get warned in time to take shelter", ["stop the wind", "make it rain", "call a friend"], "A warning gives people time to act."],
      ["Levees and floodwalls along Iowa rivers help keep towns safe from…", "floods", ["droughts", "earthquakes", "heat waves"], "They hold rising water back."],
      ["Building homes on higher ground, away from the river, helps keep them safe from…", "floods", ["blizzards", "earthquakes", "lightning only"], "Water rises in low places."],
      ["Rows of trees planted beside a farm road can help stop…", "snow drifting across it in a blizzard", ["tornadoes from forming", "rivers from flowing", "the sun from rising"], "A living snow fence slows the wind."],
      ["On a map, most volcanoes and earthquakes are found…", "along the edges of plates", ["in the middle of every country", "only in Iowa", "at the North Pole"], "Plates meet in long chains.", true],
      ["After a big flood in 2008, Cedar Rapids built new floodwalls and gates. This is a solution to…", "reduce damage from future floods", ["make the river longer", "start more storms", "stop all rain"], "Engineers design ways to lower the harm.", true],
      ["Weather radar helps people in Iowa by…", "spotting storms that could make tornadoes", ["stopping hail", "moving clouds away", "making the sun shine"], "Forecasters watch the radar to warn people.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-energy-resources"),
    {
      id: "ia-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like coal, natural gas, wind, sunlight and moving water, using Iowa examples such as its many wind turbines and the ethanol fuel made from Iowa corn.",
      standards: ["4-ESS3-1", "energy and fuels come from natural resources, and their use affects the environment"],
    },
    [
      ["Iowa makes more than half of its electricity from…", "wind", ["ocean waves", "volcanoes", "snow"], "Wind turbines stand on farms across the state."],
      ["Coal is a…", "fossil fuel", ["renewable resource", "kind of wind", "kind of water"], "It formed from ancient swamp plants."],
      ["Ethanol, a fuel mixed into gasoline, is made in Iowa mostly from…", "corn", ["sand", "rocks", "seawater"], "Iowa grows more corn than almost any other state."],
      ["Dams on rivers like the Mississippi can make electricity from…", "moving water", ["burning coal", "moonlight", "snow"], "Flowing water turns the turbines."],
      ["Solar panels turn… into electricity.", "sunlight", ["wind", "coal", "water"], "The sun is a renewable resource."],
      ["Which resource will run out if we keep using it?", "coal", ["wind", "sunlight", "flowing water"], "Fossil fuels take millions of years to form."],
      ["Burning coal and gas adds… to the air.", "carbon dioxide and pollution", ["more sunlight", "fresh water", "new forests"], "Burning fuels has effects on the environment.", true],
      ["Why is Iowa a good place for wind turbines?", "steady winds blow across its open, flat land", ["it has no wind", "it is under water", "it is covered in tall mountains"], "Turbines need strong, steady wind.", true],
    ],
  ),
];
