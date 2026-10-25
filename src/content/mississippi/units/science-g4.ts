import type { Unit } from "../../types";
import { SCIENCE_COPIES as CA_G3 } from "../../california/units/science-g3";
import { SCIENCE_COPIES as CA_G4 } from "../../california/units/science-g4";
import { copyOf, from } from "./kit";

// Mississippi Grade 4 science: copies of California's weather-and-climate and energy-resources units without their
// California places, with Mississippi examples added.

export const SCIENCE_4: Unit[] = [
  copyOf(
    from(CA_G3, "ca-g3-weather-climate"),
    {
      id: "ms-g4-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Weather data, storms and the climates of the world.",
      parentNote:
        "Practices reading weather data, telling weather from climate, and comparing climates, with Mississippi examples like its hot, humid summers, the hurricane season on the Gulf Coast and spring tornadoes.",
      standards: ["E.4.9B", "weather and climate patterns"],
    },
    [
      ["Mississippi's summers are usually…", "hot and humid", ["cold and snowy", "dry and frosty", "freezing all day"], "Warm, wet air comes from the Gulf of Mexico."],
      ["Hurricane season on the Gulf Coast runs from June to…", "November", ["February", "April", "May"], "Warm ocean water feeds hurricanes in summer and fall."],
      ["A storm with a spinning funnel cloud that touches the ground is a…", "tornado", ["hurricane", "drought", "blizzard"], "Tornadoes are smaller than hurricanes but spin fast."],
      ["Hurricanes form over…", "warm ocean water", ["cold mountains", "dry deserts", "frozen lakes"], "Warm water gives them energy."],
      ["Mississippi usually has warm summers and mild winters year after year. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["A town's average July temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["Why do people on the Mississippi coast board up windows before a hurricane?", "to protect against strong winds", ["to keep out snow", "to stop earthquakes", "to keep the house dark"], "Hurricane winds can break glass.", true],
    ],
  ),
  copyOf(
    from(CA_G4, "ca-g4-energy-resources"),
    {
      id: "ms-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy comes from, and what it changes.",
      parentNote:
        "Practices renewable and nonrenewable energy sources, how they are used and how they affect the environment, with Mississippi examples like natural gas and oil wells, a nuclear power plant, wood from its pine forests and new solar farms.",
      standards: ["E.4.10", "sources of energy used for human needs, their effectiveness and possible impacts"],
    },
    [
      ["Mississippi has wells that pump up oil and natural gas. These are…", "nonrenewable resources", ["renewable resources", "kinds of wind", "made from sunlight today"], "They took millions of years to form."],
      ["Mississippi has a nuclear power plant that makes electricity. It runs on…", "uranium", ["wind", "sunlight", "river water alone"], "Nuclear plants split atoms to make heat."],
      ["Mississippi's pine forests can give wood for heat. Trees are renewable because…", "new trees can be planted and grow", ["they never burn", "they are made of rock", "they last forever"], "People can replant what they cut."],
      ["New solar farms in Mississippi turn sunlight into…", "electricity", ["oil", "coal", "rain"], "Solar panels catch the sun's energy."],
      ["Which energy source will not run out?", "sunlight", ["coal", "oil", "natural gas"], "The sun shines every day."],
      ["Burning coal, oil or gas to make electricity also puts…", "pollution into the air", ["more oil in the ground", "fresh water in rivers", "new trees in forests"], "Smoke from burning carries gases."],
      ["A spill of oil in the Gulf of Mexico harms…", "fish, birds and beaches", ["only the moon", "nothing at all", "the sun"], "Oil spreads over the water.", true],
      ["Why might a town choose both solar panels and natural gas?", "solar works on sunny days and gas works anytime", ["solar works only at night", "gas never runs out", "panels make oil"], "Each source has strengths and limits.", true],
    ],
  ),
];
