import type { Unit } from "../../types";
import { UNITS as ALABAMA_SOCIAL_G9 } from "../../alabama/units/social-g9";
import { UNITS as FLORIDA_SCIENCE_G6 } from "../../florida/units/science-g6";
import { UNITS as MINNESOTA_SCIENCE_G6 } from "../../minnesota/units/science-g6";
import { SCIENCE_6 as TEXAS_SCIENCE_6 } from "../../texas/units/science-6";
import { SCIENCE_7 as TEXAS_SCIENCE_7 } from "../../texas/units/science-7";
import { SCIENCE_6 as WASHINGTON_SCIENCE_68 } from "../../washington/units/science-68";
import { from, localCopy } from "./kit";

// Georgia copies of Grade 6 units that fit Georgia except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(TEXAS_SCIENCE_6, "tx-g6-seasons-tides"), "ga-g6-seasons-tides", ["S6E2.a; S6E2.c; S6E3.d", "moon phases, why Earth's tilt causes the seasons, and tides"]),
  localCopy(from(TEXAS_SCIENCE_7, "tx-g7-water"), "ga-g6-water", ["S6E3.a; S6E3.c", "where water is found on Earth, and the world's oceans"], [
    ["Most of Earth's water is in…", "the oceans", ["rivers", "lakes"], "About 97 percent is salt water."],
    ["Most of Earth's fresh water is frozen in…", "glaciers and ice caps", ["the oceans", "clouds"], "Antarctica holds much of it."],
    ["Lake Lanier in Georgia is a reservoir, which is…", "a lake made by a dam to store water", ["an ocean bay", "an underground river"], "People built a dam on the Chattahoochee."],
  ]),
  localCopy(from(FLORIDA_SCIENCE_G6, "fl-g6-atmosphere"), "ga-g6-atmosphere", ["S6E4.a; S6E4.b; S6E4.c", "layers of the atmosphere, uneven heating, and global winds"], [], { parentNote: "Practices the gases and layers of the atmosphere, how it protects and insulates the planet, and how the Sun's uneven heating of air, water and land drives global wind and sea breezes." }),
  localCopy(from(WASHINGTON_SCIENCE_68, "wa-g6-weather"), "ga-g6-weather", ["S6E4.d; S6E4.e", "air masses, fronts and storms, and how ocean moisture drives weather"], [
    ["A cold front moving through often brings…", "storms, then cooler, drier air", ["a heat wave every time", "no change at all"], "Cold air pushes warm air up."],
    ["Warm, moist air that forms over a tropical ocean is a…", "maritime tropical air mass", ["continental polar air mass", "continental arctic air mass"], "Maritime means over the sea."],
    ["Hurricanes form over…", "warm ocean water", ["cold land", "high mountains"], "Warm water gives them energy."],
    ["Water vapor turning into cloud droplets is called…", "condensation", ["evaporation", "precipitation"], "Vapor cools and becomes liquid."],
  ], { parentNote: "Practices how air masses and fronts change the weather, and how the sun and gravity drive the water cycle." }),
  localCopy(from(MINNESOTA_SCIENCE_G6, "mn-g6-plate-tectonics"), "ga-g6-plate-tectonics", ["S6E5.f", "plate tectonics, earthquakes and volcanoes"]),
  localCopy(from(WASHINGTON_SCIENCE_68, "wa-g6-climate"), "ga-g6-climate", ["S6E6.c", "what has caused global temperatures to rise"], [
    ["Burning fossil fuels such as coal and gas adds which gas to the air?", "carbon dioxide", ["oxygen", "helium"], "It is a greenhouse gas."],
    ["Greenhouse gases warm Earth by…", "trapping heat in the atmosphere", ["blocking all sunlight", "cooling the oceans"], "They work like a blanket."],
    ["Cutting down forests adds to global warming because…", "trees take in carbon dioxide", ["trees give off heat", "forests block the wind"], "Fewer trees means more carbon dioxide stays in the air."],
    ["Rising temperatures make sea level rise because…", "ice melts and warm water expands", ["the moon pulls harder", "rivers stop flowing"], "Two causes work together."],
    ["One way to put less carbon dioxide into the air is to…", "use solar or wind power", ["burn more coal", "leave lights on"], "These sources don't burn fuel."],
  ]),
];

export const SOCIAL_COPIES: Unit[] = [
  localCopy(from(ALABAMA_SOCIAL_G9, "al-g9-cold-war"), "ga-g6-cold-war", ["SS6H3.c", "the Cold War in Europe, German reunification and the collapse of the Soviet Union"]),
];
