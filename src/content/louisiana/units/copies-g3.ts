import type { Unit } from "../../types";
import { SCIENCE_3 as WASHINGTON_UNITS_SCIENCE_35_SCIENCE_3 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// Louisiana copies of Grade 3 units that fit Louisiana except for a few questions naming another state's places, with
// Louisiana examples added.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_UNITS_SCIENCE_35_SCIENCE_3, "wa-g3-weather-climate"), "la-g3-weather-climate", ["3-ESS2-1; 3-ESS2-2", "weather patterns by season and climates in different regions of the world"], [
      ["Louisiana summers are usually…", "hot and humid", ["frozen", "dry like a desert"], "Humid means damp air."],
      ["Hurricane season in Louisiana runs from June to…", "November", ["February", "April"], "Storms are most likely in late summer and fall."],
      ["Snow in New Orleans is…", "rare", ["an everyday event", "there all summer"], "Its winters are mild."],
      ["Baton Rouge gets about 60 inches of rain a year and Phoenix about 8. Which climate is wetter?", "Baton Rouge", ["Phoenix", "they are the same"], "Compare the totals."],
      ["Climate is the weather a place has…", "over many years", ["on one afternoon", "only today"], "Weather is day to day."],
      ["A weather station records the temperature each day for a month. The chart shows mostly 90s °F in…", "August", ["January", "December"], "Summer months are hottest."],
    ]),
  localCopy(from(WASHINGTON_UNITS_SCIENCE_35_SCIENCE_3, "wa-g3-fossils"), "la-g3-fossils", ["3-LS4-1", "fossils as evidence of the organisms and environments of long ago"], [
      ["Fossil seashells found far from the sea tell us the land was once…", "under water", ["always a desert", "covered by a city"], "Shells come from water animals."],
      ["Fossils are usually found in…", "sedimentary rock", ["fresh snow", "melted glass"], "Layers of mud harden around them."],
      ["A fossil of a palm leaf found in a cold place tells us the climate was once…", "warmer", ["colder", "exactly the same"], "Palms grow in warm places."],
      ["Which is a fossil?", "a shell print in rock", ["a plastic toy", "a fresh leaf"], "Fossils are traces of ancient life."],
    ]),
];
