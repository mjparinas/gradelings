import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g4";
import { copyOf, from } from "./kit";

// Nevada Grade 4 science: copies of California's earth-hazards and energy-resources units without their California
// places, with Nevada examples added.

export const SCIENCE_4: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-earth-hazards"),
    {
      id: "nv-g4-earth-hazards",
      title: "Quakes, Storms & Maps",
      emoji: "🌪️",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and ways to reduce harm from hazards Nevada knows well, such as earthquakes, wildfires and flash floods.",
      standards: ["4-ESS2-2; 4-ESS3-2", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards"],
    },
    [
      ["Nevada has many earthquakes. During one, you should…", "drop, cover and hold on", ["run outside right away", "stand by a window", "use the elevator"], "Get under a sturdy table."],
      ["Builders in Nevada make new buildings stronger to stand up to…", "earthquakes", ["snowflakes", "rainbows", "sunsets"], "Nevada sits where the ground is slowly stretching."],
      ["A sudden flood that rushes down a dry desert wash is a…", "flash flood", ["drought", "heat wave", "dust devil"], "Storms can fill a dry wash in minutes."],
      ["Clearing dry brush away from a house helps keep it safe from…", "wildfire", ["earthquakes", "floods", "hail"], "Fire needs fuel to spread."],
      ["Building on high ground near a river helps keep homes safe from…", "floods", ["droughts", "earthquakes", "lightning only"], "Water rises in low places."],
      ["On a map, most volcanoes and earthquakes are found…", "along the edges of plates", ["in the middle of every country", "only in Nevada", "at the North Pole"], "Plates meet in long chains.", true],
      ["Why do engineers test buildings with shaking tables?", "to see if they survive earthquakes", ["to make them taller", "to paint them", "to cool them"], "Tests show what needs to be stronger.", true],
      ["Basins that catch storm water in Las Vegas help…", "stop flash floods in the streets", ["make more rain", "start earthquakes", "melt snow"], "They hold water until it can drain away.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-energy-resources"),
    {
      id: "nv-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like coal, natural gas, wind, sunlight, moving water and heat from inside the Earth, using Nevada examples such as its solar farms, its geothermal plants and Hoover Dam.",
      standards: ["4-ESS3-1", "energy and fuels come from natural resources, and their use affects the environment"],
    },
    [
      ["Nevada has many sunny days, so it makes a lot of electricity from…", "sunlight", ["coal dust", "ocean waves", "snow"], "Solar farms cover parts of the desert."],
      ["Coal is a…", "fossil fuel", ["renewable resource", "kind of wind", "kind of water"], "It formed from ancient swamp plants."],
      ["Hoover Dam makes electricity from…", "moving water", ["burning coal", "sunlight", "uranium"], "Water from the Colorado River turns its turbines."],
      ["Geothermal plants in northern Nevada use… to make electricity.", "heat from inside the Earth", ["wind", "coal", "moonlight"], "Hot water lies deep underground."],
      ["Solar panels turn… into electricity.", "sunlight", ["wind", "coal", "water"], "The sun is a renewable resource."],
      ["Which resource will run out if we keep using it?", "coal", ["wind", "sunlight", "flowing water"], "Fossil fuels take millions of years to form."],
      ["Burning coal and gas adds… to the air.", "carbon dioxide and pollution", ["more sunlight", "fresh water", "new forests"], "Burning fuels has effects on the environment.", true],
      ["Why is the Nevada desert a good place for solar farms?", "it is sunny and open", ["it has thick forests", "it is always cloudy", "it is under water"], "Panels need lots of sunlight.", true],
    ],
  ),
];
