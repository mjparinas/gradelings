import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g4";
import { copyOf, from } from "./kit";

// Wisconsin Grade 4 science: copies of California's earth-hazards and energy-resources units without their California
// places, with Wisconsin examples added.

export const SCIENCE_4: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-earth-hazards"),
    {
      id: "wi-g4-earth-hazards",
      title: "Quakes, Storms & Maps",
      emoji: "🌪️",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and ways to reduce harm from hazards such as the tornadoes, floods and blizzards Wisconsin knows well.",
      standards: ["SCI.4.ESS.2; SCI.4.ESS.3", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards"],
    },
    [
      ["A tornado siren helps people…", "take shelter in time", ["stop the wind", "cool the air", "find their way home"], "Warnings save lives."],
      ["During a tornado warning, the safest place in a house is…", "a basement or inside room", ["next to a window", "on the roof", "in the car outside"], "Stay low and away from glass."],
      ["Levees along a river help…", "hold back flood water", ["make tornadoes", "start earthquakes", "melt snow"], "A levee is a wall of earth."],
      ["Snow fences along Wisconsin highways help stop…", "snow drifting onto the road", ["earthquakes", "floods", "volcanoes"], "The fence slows the wind so snow drops."],
      ["Building on high ground near a river helps keep homes safe from…", "floods", ["droughts", "earthquakes", "lightning only"], "Water rises in low places."],
      ["On a map, most volcanoes and earthquakes are found…", "along the edges of plates", ["in the middle of every country", "only in Wisconsin", "at the North Pole"], "Plates meet in long chains.", true],
      ["Why do engineers test buildings with shaking tables?", "to see if they survive earthquakes", ["to make them taller", "to paint them", "to cool them"], "Tests show what needs to be stronger.", true],
      ["Wetlands along rivers can reduce flooding because they…", "soak up extra water", ["make more rain", "stop all rivers", "freeze in summer"], "Wetlands act like sponges.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-energy-resources"),
    {
      id: "wi-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like coal, wind, sunlight, moving water and uranium, using Wisconsin examples such as its wind turbines, river dams and corn grown for fuel.",
      standards: ["SCI.4.ESS.3", "energy and fuels come from natural resources, and their use affects the environment"],
    },
    [
      ["Wind turbines stand on ridges in eastern Wisconsin. Wind is a…", "renewable resource", ["fossil fuel", "kind of rock", "kind of coal"], "Wind will not run out."],
      ["Coal burned in some power plants is a…", "fossil fuel", ["renewable resource", "kind of wind", "kind of water"], "It formed from ancient swamp plants."],
      ["Dams on the Wisconsin River make electricity from…", "moving water", ["coal dust", "wind", "corn oil"], "Falling water turns turbines."],
      ["Corn grown in Wisconsin can be made into a fuel called…", "ethanol", ["coal", "uranium", "natural gas"], "Ethanol is mixed into gasoline."],
      ["Solar panels turn… into electricity.", "sunlight", ["wind", "coal", "water"], "The sun is a renewable resource."],
      ["Which resource will run out if we keep using it?", "coal", ["wind", "sunlight", "flowing water"], "Fossil fuels take millions of years to form."],
      ["Burning coal and gas adds… to the air.", "carbon dioxide and pollution", ["more sunlight", "fresh water", "new forests"], "Burning fuels has effects on the environment.", true],
      ["Why do engineers put dams where a river drops quickly?", "falling water has more energy", ["the water is warmer", "fish like dams", "it stops the rain"], "More drop means more power.", true],
    ],
  ),
];
