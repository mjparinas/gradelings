import type { Unit } from "../../types";
import { SCIENCE_4 } from "../../washington/units/science-35";
import type { Q } from "../own";
import { copyOf, from } from "./kit";

// Arizona copies of Washington's Grade 4 science units built around Pacific Northwest places: the questions that name
// another state are left out, and Arizona items fill in. Renewable and nonrenewable resources for electricity
// (4.P4U3.4) and natural hazards and seismic waves (4.E1U2.10, 4.E1U1.5).

const ENERGY_EXTRA: Q[] = [
  ["Arizona gets lots of sunshine, so many homes and farms use…", "solar panels", ["coal stoves", "oil wells"], "Solar panels turn sunlight into electricity."],
  ["The Palo Verde power plant west of Phoenix makes electricity from…", "nuclear energy", ["wind", "burning wood"], "It is one of the biggest power plants in the US."],
  ["Hoover Dam and Glen Canyon Dam make electricity from…", "moving water", ["sunlight", "coal"], "This is hydropower."],
  ["Why is sunlight called a renewable resource?", "it will not run out", ["it is found only underground", "it takes millions of years to form"], "The sun shines again every day."],
  ["Why are coal and natural gas called nonrenewable?", "they take millions of years to form and can run out", ["they are made by the sun every day", "they come from the wind"], "Once we use them, they are gone.", true],
  ["When a drought lowers Lake Powell, Glen Canyon Dam can make…", "less electricity", ["more electricity", "electricity from snow"], "Less water flows through the turbines.", true],
];

const HAZARDS_EXTRA: Q[] = [
  ["Arizona's summer monsoon storms can cause sudden…", "flash floods", ["blizzards", "tsunamis"], "Dry ground can't soak up heavy rain fast."],
  ["What should you do if a road ahead is covered by moving water?", "turn around and find another way", ["drive through fast", "walk across it"], "Turn around, don't drown."],
  ["A haboob is a…", "huge wall of blowing dust", ["kind of cactus", "mountain lake"], "Drivers should pull off the road."],
  ["To protect a home from wildfire, people can…", "clear dry brush away from buildings", ["stack firewood against the walls", "plant dry grass by the door"], "Fire needs fuel to spread."],
  ["Earthquakes send energy through the ground as…", "seismic waves", ["sound bubbles", "light beams"], "Seismographs record these waves."],
  ["Why do cities in Arizona build channels and basins for storm water?", "to carry flood water away safely", ["to store snow", "to grow rice"], "Phoenix has many dry washes and basins.", true],
];

export const COPIES_4: Unit[] = [
  copyOf(
    from(SCIENCE_4, "wa-g4-energy-resources"),
    {
      id: "az-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Sun, water and fuels for making electricity",
      parentNote: "How electricity is made from renewable resources (sunlight, moving water, wind) and nonrenewable ones (coal, oil, natural gas, uranium), and the trade-offs of each, with Arizona examples: solar farms, the Palo Verde nuclear plant and the dams on the Colorado River.",
      standards: ["4.P4U3.4", "the use and impact of renewable and nonrenewable resources to generate electricity"],
    },
    ENERGY_EXTRA,
  ),
  copyOf(
    from(SCIENCE_4, "wa-g4-earth-hazards"),
    {
      id: "az-g4-natural-hazards",
      title: "Natural Hazards",
      emoji: "🌩️",
      blurb: "Earthquakes, floods and storms, and how to stay safe",
      parentNote: "Earthquakes and seismic waves, volcanoes, floods and other natural hazards, and designs that lessen their effects, with Arizona examples: monsoon flash floods, dust storms and wildfire.",
      standards: ["4.E1U2.10; 4.E1U1.5", "designing solutions to minimize the effects of natural hazards, and seismic waves and their effect on Earth"],
    },
    HAZARDS_EXTRA,
  ),
];
