import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g4";
import { copyOf, from } from "./kit";

// Connecticut Grade 4 science: copies of California's earth-hazards and energy-resources units without their California
// places, with Connecticut examples added.

export const SCIENCE_4: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-earth-hazards"),
    {
      id: "ct-g4-earth-hazards",
      title: "Quakes, Storms & Maps",
      emoji: "🌪️",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and ways to reduce harm from hazards such as the hurricanes, floods and blizzards Connecticut knows well.",
      standards: ["4-ESS2-2; 4-ESS3-2", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards"],
    },
    [
      ["A hurricane warning helps people along the Connecticut shore…", "get ready or leave in time", ["stop the wind", "cool the air", "make the storm smaller"], "Warnings save lives."],
      ["During a tornado warning, the safest place in a house is…", "a basement or inside room", ["next to a window", "on the roof", "in the car outside"], "Stay low and away from glass."],
      ["Dikes and flood walls along the Connecticut River in Hartford help…", "hold back flood water", ["make tornadoes", "start earthquakes", "melt snow"], "They were built after big floods in the 1930s."],
      ["A storm surge from a hurricane pushes ocean water…", "onto the land along the coast", ["into the clouds", "under the mountains", "away from the shore forever"], "Wind piles up the water."],
      ["Building on high ground near a river helps keep homes safe from…", "floods", ["droughts", "earthquakes", "lightning only"], "Water rises in low places."],
      ["On a map, most volcanoes and earthquakes are found…", "along the edges of plates", ["in the middle of every country", "only in Connecticut", "at the North Pole"], "Plates meet in long chains.", true],
      ["Why do engineers test buildings with shaking tables?", "to see if they survive earthquakes", ["to make them taller", "to paint them", "to cool them"], "Tests show what needs to be stronger.", true],
      ["Wetlands along rivers can reduce flooding because they…", "soak up extra water", ["make more rain", "stop all rivers", "freeze in summer"], "Wetlands act like sponges.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-energy-resources"),
    {
      id: "ct-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like coal, wind, sunlight, moving water and uranium, using Connecticut examples such as its nuclear plant, solar panels and offshore wind.",
      standards: ["4-ESS3-1", "energy and fuels come from natural resources, and their use affects the environment"],
    },
    [
      ["Wind turbines out at sea can send power to Connecticut. Wind is a…", "renewable resource", ["fossil fuel", "kind of rock", "kind of coal"], "Wind will not run out."],
      ["Natural gas burned in Connecticut power plants is a…", "fossil fuel", ["renewable resource", "kind of wind", "kind of water"], "It formed from living things long ago."],
      ["The Millstone power station in Waterford is a nuclear plant. It uses…", "uranium", ["coal dust", "wind", "corn oil"], "Uranium is a mined resource."],
      ["Old mills along Connecticut rivers used moving water to…", "turn machines", ["make snow", "grow corn", "light candles"], "Falling water is a source of energy."],
      ["Solar panels turn… into electricity.", "sunlight", ["wind", "coal", "water"], "The sun is a renewable resource."],
      ["Which resource will run out if we keep using it?", "coal", ["wind", "sunlight", "flowing water"], "Fossil fuels take millions of years to form."],
      ["Burning coal and gas adds… to the air.", "carbon dioxide and pollution", ["more sunlight", "fresh water", "new forests"], "Burning fuels has effects on the environment.", true],
      ["Why are wind turbines often built out at sea?", "the wind there is strong and steady", ["there is no wind on land", "fish make the wind", "the water is warm"], "Turbines need steady wind.", true],
    ],
  ),
];
