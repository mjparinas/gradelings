import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g4";
import { copyOf, from } from "./kit";

// New Jersey Grade 4 science: copies of California's earth-hazards and energy-resources units without their
// California places, with New Jersey examples added.

export const SCIENCE_4: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-earth-hazards"),
    {
      id: "nj-g4-earth-hazards",
      title: "Quakes, Storms & Maps",
      emoji: "🌪️",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and ways to reduce harm from hazards such as the hurricanes, coastal storms and floods New Jersey knows well.",
      standards: ["4-ESS2-2; 4-ESS3-2", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards"],
    },
    [
      ["A hurricane warning a few days ahead helps people…", "prepare or leave in time", ["stop the wind", "cool the ocean", "make the storm smaller"], "Warnings save lives."],
      ["Sand dunes along the Jersey Shore help…", "block waves from big storms", ["make hurricanes", "start earthquakes", "melt snow"], "Dunes act like a wall of sand."],
      ["Some homes near the shore were raised on tall posts after Hurricane Sandy to…", "keep them above flood water", ["make them colder", "catch more wind", "stop earthquakes"], "Sandy flooded many towns in 2012."],
      ["In April 2024, people across New Jersey felt the ground shake from a small…", "earthquake", ["volcano", "hurricane", "glacier"], "It was centered near Whitehouse Station."],
      ["Building on high ground near a river helps keep homes safe from…", "floods", ["droughts", "earthquakes", "lightning only"], "Water rises in low places."],
      ["On a map, most volcanoes and earthquakes are found…", "along the edges of plates", ["in the middle of every country", "only in New Jersey", "at the North Pole"], "Plates meet in long chains.", true],
      ["Why do engineers test buildings with shaking tables?", "to see if they survive earthquakes", ["to make them taller", "to paint them", "to cool them"], "Tests show what needs to be stronger.", true],
      ["Wetlands along rivers can reduce flooding because they…", "soak up extra water", ["make more rain", "stop all rivers", "freeze in summer"], "Wetlands act like sponges.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-energy-resources"),
    {
      id: "nj-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like coal, wind, sunlight, moving water and uranium, using New Jersey examples such as its nuclear plants and solar panels.",
      standards: ["4-ESS3-1", "energy and fuels come from natural resources, and their use affects the environment"],
    },
    [
      ["Wind that turns a wind turbine is a…", "renewable resource", ["fossil fuel", "kind of rock", "kind of coal"], "Wind will not run out."],
      ["Natural gas burned in many New Jersey power plants is a…", "fossil fuel", ["renewable resource", "kind of wind", "kind of water"], "It formed from living things long ago."],
      ["New Jersey makes much of its electricity in nuclear plants on the Delaware River. They use…", "uranium", ["coal dust", "wind", "corn oil"], "Uranium is a mined resource."],
      ["Many New Jersey schools and parking lots have solar panels. They use energy from…", "sunlight", ["coal", "uranium", "natural gas"], "The sun shines on the panels."],
      ["Moving water turning a turbine in a dam is called… power.", "hydroelectric", ["nuclear", "coal", "solar"], "Hydro means water."],
      ["Which resource will run out if we keep using it?", "coal", ["wind", "sunlight", "flowing water"], "Fossil fuels take millions of years to form."],
      ["Burning coal and gas adds… to the air.", "carbon dioxide and pollution", ["more sunlight", "fresh water", "new forests"], "Burning fuels has effects on the environment.", true],
      ["Why are wind turbines often built out at sea, away from the coast?", "the wind there is strong and steady", ["there is no wind on land ever", "the sea is always calm", "turbines need salt water to work"], "Ocean winds blow without hills in the way.", true],
    ],
  ),
];
