import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g4";
import { copyOf, from } from "./kit";

// Colorado Grade 4 science: copies of California's earth-hazards and energy-resources units without their California
// places, with Colorado examples added.

export const SCIENCE_4: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-earth-hazards"),
    {
      id: "co-g4-earth-hazards",
      title: "Quakes, Storms & Maps",
      emoji: "🌪️",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and ways to reduce harm from hazards Colorado knows well, such as wildfires, floods, avalanches and hail.",
      standards: ["ESS3.4.3.a; ESS3.4.5.a", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards"],
    },
    [
      ["Clearing dry brush away from a mountain home helps protect it from…", "wildfire", ["earthquakes", "tides", "lake-effect snow"], "Fire needs fuel to spread."],
      ["Avalanche warnings help skiers and hikers…", "stay off risky snowy slopes", ["stop the snow", "warm the air", "make more snow"], "Warnings save lives."],
      ["A flood warning in a narrow canyon means people should…", "climb to higher ground", ["walk into the stream", "stay in the canyon bottom", "wait in a car near the water"], "Flash floods rise fast."],
      ["Snow fences along Colorado highways help by…", "keeping blowing snow off the road", ["making the snow melt", "stopping avalanches everywhere", "warming the road"], "The fence slows the wind so snow drops."],
      ["Building homes away from the edge of a river helps keep them safe from…", "floods", ["droughts", "earthquakes", "lightning only"], "Water rises in low places."],
      ["On a map, most volcanoes and earthquakes are found…", "along the edges of plates", ["in the middle of every country", "only in Colorado", "at the North Pole"], "Plates meet in long chains.", true],
      ["Why do engineers test buildings with shaking tables?", "to see if they survive earthquakes", ["to make them taller", "to paint them", "to cool them"], "Tests show what needs to be stronger.", true],
      ["Hail nets over orchards and gardens help by…", "stopping hailstones from hurting the plants", ["making more rain", "stopping wind everywhere", "warming the soil"], "Hail can tear leaves and fruit.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-energy-resources"),
    {
      id: "co-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like coal, natural gas, wind, sunlight and moving water, using Colorado examples such as its wind farms on the plains and its solar farms in the San Luis Valley.",
      standards: ["ESS3.4.4.a", "energy and fuels come from natural resources, and their use affects the environment"],
    },
    [
      ["Wind turbines on Colorado's windy Eastern Plains use a…", "renewable resource", ["fossil fuel", "kind of rock", "kind of coal"], "Wind will not run out."],
      ["Coal mined in western Colorado is a…", "fossil fuel", ["renewable resource", "kind of wind", "kind of water"], "It formed from ancient swamp plants."],
      ["Natural gas pumped from deep under Colorado is a…", "fossil fuel", ["renewable resource", "kind of sunlight", "kind of wind"], "It formed over millions of years."],
      ["Dams on Colorado rivers use moving water to make…", "electricity", ["coal", "natural gas", "oil"], "Falling water spins turbines."],
      ["Solar panels turn… into electricity.", "sunlight", ["wind", "coal", "water"], "The sun is a renewable resource."],
      ["Which resource will run out if we keep using it?", "coal", ["wind", "sunlight", "flowing water"], "Fossil fuels take millions of years to form."],
      ["Burning coal and gas adds… to the air.", "carbon dioxide and pollution", ["more sunlight", "fresh water", "new forests"], "Burning fuels has effects on the environment.", true],
      ["Why are solar farms a good fit for the San Luis Valley?", "it has many sunny days", ["it has no sunlight", "it is under the ocean", "it is always cloudy"], "Panels need lots of sun.", true],
    ],
  ),
];
