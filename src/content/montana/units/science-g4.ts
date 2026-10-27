import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g4";
import { copyOf, from } from "./kit";

// Montana Grade 4 science: copies of California's earth-hazards and energy-resources units without their California
// places, with Montana examples added.

export const SCIENCE_4: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-earth-hazards"),
    {
      id: "mt-g4-earth-hazards",
      title: "Quakes, Storms & Maps",
      emoji: "🌪️",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and ways to reduce harm from hazards such as the wildfires, floods, earthquakes and blizzards Montana knows well.",
      standards: ["4-ESS2-2; 4-ESS3-2", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards"],
    },
    [
      ["A wildfire evacuation warning helps families in a Montana valley…", "get ready or leave in time", ["stop the wind", "cool the air", "make the fire smaller"], "Warnings save lives."],
      ["During a tornado warning, the safest place in a house is…", "a basement or inside room", ["next to a window", "on the roof", "in the car outside"], "Stay low and away from glass."],
      ["Levees along a river help…", "hold back flood water", ["make tornadoes", "start earthquakes", "melt snow"], "Spring snowmelt can make Montana rivers rise."],
      ["The 1959 Hebgen Lake earthquake made a landslide that blocked a river and formed…", "a new lake", ["a volcano", "a desert", "an ocean"], "It is now called Earthquake Lake."],
      ["Building on high ground near a river helps keep homes safe from…", "floods", ["droughts", "earthquakes", "lightning only"], "Water rises in low places."],
      ["On a map, most volcanoes and earthquakes are found…", "along the edges of plates", ["in the middle of every country", "only in deserts", "at the North Pole"], "Plates meet in long chains.", true],
      ["Why do engineers test buildings with shaking tables?", "to see if they survive earthquakes", ["to make them taller", "to paint them", "to cool them"], "Tests show what needs to be stronger.", true],
      ["Clearing dry brush away from a house helps protect it from…", "wildfire", ["earthquakes", "floods", "hail"], "Fire spreads through dry plants.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-energy-resources"),
    {
      id: "mt-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like coal, wind, sunlight, moving water and uranium, using Montana examples such as its coal, wind farms and dams on the Missouri River.",
      standards: ["4-ESS3-1", "energy and fuels come from natural resources, and their use affects the environment"],
    },
    [
      ["Wind turbines on the windy plains of central Montana make power. Wind is a…", "renewable resource", ["fossil fuel", "kind of rock", "kind of coal"], "Wind will not run out."],
      ["Coal mined in eastern Montana and burned in power plants is a…", "fossil fuel", ["renewable resource", "kind of wind", "kind of water"], "It formed from living things long ago."],
      ["Fort Peck Dam on the Missouri River makes electricity from…", "moving water", ["coal dust", "wind", "corn oil"], "Water falling through the dam spins turbines."],
      ["Oil pumped from deep under northeastern Montana is a…", "fossil fuel", ["renewable resource", "kind of sunlight", "kind of wind"], "Oil formed from tiny living things long ago."],
      ["Solar panels turn… into electricity.", "sunlight", ["wind", "coal", "water"], "The sun is a renewable resource."],
      ["Which resource will run out if we keep using it?", "coal", ["wind", "sunlight", "flowing water"], "Fossil fuels take millions of years to form."],
      ["Burning coal and gas adds… to the air.", "carbon dioxide and pollution", ["more sunlight", "fresh water", "new forests"], "Burning fuels has effects on the environment.", true],
      ["Why are wind farms often built on open plains and ridges?", "the wind there is strong and steady", ["there is no wind in towns", "cows make the wind", "the soil is warm"], "Turbines need steady wind.", true],
    ],
  ),
];
