import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g4";
import { copyOf, from } from "./kit";

// Hawaiʻi Grade 4 science: copies of California's earth-hazards and energy-resources units without their California
// places, with Hawaiʻi examples added.

export const SCIENCE_4: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-earth-hazards"),
    {
      id: "hi-g4-earth-hazards",
      title: "Lava, Waves & Maps",
      emoji: "🌋",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and ways to reduce harm from hazards Hawaiʻi knows well, such as lava flows, tsunamis, hurricanes, flash floods and wildfires.",
      standards: ["4-ESS2-2; 4-ESS3-2", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards"],
    },
    [
      ["Sirens and evacuation maps along Hawaiʻi's coasts help keep people safe from…", "tsunamis", ["droughts", "blizzards", "dust storms"], "People move inland or to high ground."],
      ["Maps of Hawaiʻi Island that show where lava is most likely to flow are called…", "lava hazard zone maps", ["road maps", "star charts", "weather maps"], "Zones near active vents are riskiest."],
      ["In 2018, lava from Kīlauea flowed through neighborhoods in Puna. One way to reduce harm from lava is to…", "avoid building in the highest-risk zones", ["build on top of the vent", "pour water on the volcano", "paint houses white"], "Lava can't easily be stopped."],
      ["Strapping roofs to walls with metal ties helps houses survive…", "hurricanes", ["earthquakes under the ocean only", "droughts", "hail only"], "Strong winds can lift a roof."],
      ["Clearing dry grass away from homes helps protect them from…", "wildfire", ["tsunamis", "lava", "high tides"], "Fire needs fuel to spread."],
      ["A sudden flood when heavy rain fills a stream in minutes is a…", "flash flood", ["drought", "heat wave", "tsunami"], "Stay out of streams during heavy rain."],
      ["On a map of the Pacific, many volcanoes and earthquakes are found…", "along the edges of plates", ["in the middle of every country", "only in Hawaiʻi", "at the North Pole"], "Plates meet in long chains.", true],
      ["Hawaiʻi's volcanoes are not at a plate edge. They formed over a…", "hot spot", ["glacier", "trench", "fault on land"], "The plate moves over a plume of hot rock.", true],
      ["Why do tsunami warning centers watch for earthquakes all around the Pacific?", "a big undersea earthquake far away can send waves to Hawaiʻi", ["earthquakes make rain", "tsunamis come only from Hawaiʻi", "waves never cross oceans"], "Tsunami waves cross oceans in hours.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-energy-resources"),
    {
      id: "hi-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like oil, natural gas, coal, wind, sunlight, flowing water and the Earth's heat, and how using them affects the environment, using Hawaiʻi examples such as rooftop solar, wind farms, geothermal power on Hawaiʻi Island and the oil shipped in for power plants.",
      standards: ["4-ESS3-1", "energy and fuels come from natural resources, and their use affects the environment"],
    },
    [
      ["Hawaiʻi has no oil wells, so the oil burned in many of its power plants is…", "shipped in from far away", ["pumped from Waikīkī", "made from sand", "grown on farms"], "Oil is a fossil fuel."],
      ["Wind turbines on the hills of Maui and Oʻahu make electricity from…", "moving air", ["burning coal", "moving lava", "oil"], "Turbines spin when the wind blows."],
      ["Many Hawaiʻi homes have panels on their roofs that make electricity from…", "sunlight", ["coal dust", "ocean waves", "snow"], "Hawaiʻi has lots of sunny days."],
      ["A power plant on Hawaiʻi Island makes electricity from heat deep underground near the volcano. This is…", "geothermal energy", ["wind energy", "coal energy", "solar energy"], "Geo means Earth and thermal means heat."],
      ["Hawaiʻi has set a goal to make all of its electricity from…", "renewable resources by 2045", ["coal by 2045", "imported oil forever", "candles"], "Hawaiʻi was the first state to set this goal."],
      ["Which resource will run out if we keep using it?", "oil", ["wind", "sunlight", "flowing water"], "Fossil fuels take millions of years to form."],
      ["Burning oil and coal adds… to the air.", "carbon dioxide and pollution", ["more sunlight", "fresh water", "new forests"], "Burning fuels has effects on the environment.", true],
      ["Why does Hawaiʻi want to use more sun, wind and geothermal power?", "they are renewable and don't need to be shipped in", ["they cost nothing to build", "they make more oil", "they work only at night"], "Islands pay a lot to bring in fuel.", true],
    ],
  ),
];
