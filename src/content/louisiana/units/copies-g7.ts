import type { Unit } from "../../types";
import { UNITS as NEW_YORK_UNITS_SCIENCE_G7_UNITS } from "../../new-york/units/science-g7";
import { SCIENCE_6 as WASHINGTON_UNITS_SCIENCE_68_SCIENCE_6 } from "../../washington/units/science-68";
import { from, localCopy } from "./kit";

// Louisiana copies of units that fit Louisiana's Grade 7 science except for a few questions naming another state's
// places, with Louisiana examples added. Louisiana teaches weather, climate and biodiversity in 7th grade.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_UNITS_SCIENCE_68_SCIENCE_6, "wa-g6-weather"), "la-g7-weather", ["7-MS-ESS2-4; 7-MS-ESS2-5", "the water cycle driven by the sun and gravity, and how air masses change the weather"], [
      ["Warm, moist air from the Gulf moving over Louisiana often brings…", "humid weather and thunderstorms", ["snowstorms", "dry desert air"], "Moist air makes clouds and rain."],
      ["When a cold front pushes into warm, humid air over Louisiana, it often causes…", "thunderstorms", ["a heat wave", "calm, clear skies"], "Warm air is forced up quickly."],
      ["Hurricanes get their energy from…", "warm ocean water", ["cold mountain air", "the moon"], "Warm water evaporates and rises."],
      ["Rain that falls on Louisiana flows back to the Gulf because of…", "gravity", ["magnetism", "sunlight"], "Water flows downhill."],
    ]),
  localCopy(from(WASHINGTON_UNITS_SCIENCE_68_SCIENCE_6, "wa-g6-climate"), "la-g7-climate", ["7-MS-ESS2-6; 7-MS-ESS3-5", "how unequal heating and Earth's rotation shape climates, and the factors behind rising global temperatures"], [
      ["Louisiana has a humid subtropical climate mostly because it is…", "far south and next to the warm Gulf", ["high in the mountains", "near the North Pole"], "Latitude and water matter."],
      ["Rising sea level is a special concern for Louisiana because much of its coast is…", "low and close to sea level", ["high cliffs", "far inland"], "Low land floods easily."],
      ["Burning fossil fuels adds which gas that traps heat?", "carbon dioxide", ["oxygen", "helium"], "It is a greenhouse gas."],
      ["Global temperatures have risen over the past century mostly because of…", "more greenhouse gases from human activity", ["the moon moving closer", "fewer volcanoes"], "Burning fuels adds these gases."],
    ]),
  localCopy(from(NEW_YORK_UNITS_SCIENCE_G7_UNITS, "ny-g7-biodiversity"), "la-g7-biodiversity", ["7-MS-LS2-5", "designs that help maintain biodiversity and ecosystem services"], [
      ["Louisiana's coastal wetlands provide which ecosystem service?", "protecting land from storm surge", ["making snow", "creating earthquakes"], "Wetlands slow water."],
      ["Planting oyster reefs along the coast can help because oysters…", "filter water and break waves", ["eat all the fish", "dry out the marsh"], "Reefs protect shorelines."],
      ["Which threatens wetland biodiversity in Louisiana?", "land loss and invasive species like nutria", ["more native plants", "clean water"], "Nutria eat marsh plants."],
      ["Wetlands clean water by…", "trapping sediment and pollutants", ["heating it", "adding salt"], "Plants and soil filter water."],
    ]),
];
