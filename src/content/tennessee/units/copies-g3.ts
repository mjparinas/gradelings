import type { Unit } from "../../types";
import { UNITS as NEW_YORK_UNITS_SCIENCE_G4_UNITS } from "../../new-york/units/science-g4";
import { SCIENCE_3 as WASHINGTON_UNITS_SCIENCE_35_SCIENCE_3 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// Tennessee copies of Grade 3 units that fit Tennessee except for a few questions naming another state's places, with
// Tennessee examples added.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_UNITS_SCIENCE_35_SCIENCE_3, "wa-g3-weather-climate"), "tn-g3-weather-climate", ["3.ESS2.3; 3.ESS2.4", "weather patterns by season and climates in different regions of the world"], [
      ["Tennessee summers are usually…", "hot and humid", ["frozen", "dry like a desert"], "Humid means damp air."],
      ["Which season usually brings snow to the Great Smoky Mountains?", "winter", ["summer", "late spring"], "The mountains are colder."],
      ["Thunderstorms in Tennessee happen most often in…", "spring and summer", ["only in winter", "never"], "Warm, wet air makes storms."],
      ["Tornadoes can strike Tennessee, mostly in…", "spring", ["only at night in July", "never"], "Have a safety plan."],
      ["A weather station records the temperature each day for a month. The chart shows mostly 30s °F in…", "January", ["July", "August"], "Winter months are coldest."],
      ["Memphis gets about 54 inches of rain a year and Phoenix about 8. Which climate is wetter?", "Memphis", ["Phoenix", "they are the same"], "Compare the totals."],
      ["Climate is the weather a place has…", "over many years", ["on one afternoon", "only today"], "Weather is day to day."],
    ], { parentNote: "Practises reading weather data for different seasons and comparing climates around the world, from Tennessee's warm, wet summers to dry deserts and polar regions." }),
  localCopy(from(NEW_YORK_UNITS_SCIENCE_G4_UNITS, "ny-g4-earth-hazards"), "tn-g3-earth-hazards", ["3.ESS3.1", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards"], [
      ["To lower flood damage along Tennessee rivers, communities can…", "build levees and avoid building on floodplains", ["build homes in the river", "cut down every tree"], "Keep homes out of the water's path."],
      ["A tornado siren tells people to…", "take shelter right away", ["go outside to watch", "open all the windows"], "Find a safe room."],
      ["Which hazard is most likely in West Tennessee near the New Madrid fault?", "earthquakes", ["volcanoes", "tsunamis"], "A fault line runs there."],
      ["Storm shelters protect people from…", "tornadoes", ["drought", "heat"], "They are strong underground rooms."],
    ], {}),
];
