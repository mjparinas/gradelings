import type { Unit } from "../../types";
import { SOCIAL_5 as CALIFORNIA_SOCIAL_G5 } from "../../california/units/social-g5";
import { UNITS as FLORIDA_SCIENCE_G2 } from "../../florida/units/science-g2";
import { OWN_SOCIAL_3 as WASHINGTON_SOCIAL_K4_G3 } from "../../washington/units/social-k4-g3";
import { from, localCopy } from "./kit";

// Georgia copies of Grade 3 units that fit Georgia except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(FLORIDA_SCIENCE_G2, "fl-g2-rocks-and-soil"), "ga-g3-rocks-and-soil", ["S3E1.a; S3E1.b", "the properties of rocks and soils, and which soils hold water and help plants grow"], [
    ["Which soil lets water drain through fastest?", "sandy soil", ["clay soil", "silty soil"], "Sand grains have big spaces between them."],
    ["Georgia's red clay soil…", "holds water and gets sticky when wet", ["lets all water run straight through", "has no water in it ever"], "Clay grains are tiny and packed close."],
    ["One simple test for a rock's hardness is…", "trying to scratch it with a nail", ["smelling it", "counting its colors"], "Harder rocks don't scratch easily."],
    ["The dark part of soil made from rotting plants and animals is…", "humus", ["sand", "gravel"], "It helps plants grow."],
    ["Which soil is best for growing most garden plants?", "loam, a mix of sand, silt, clay and humus", ["pure sand", "pure clay"], "A mix holds water and still drains."],
  ]),
];

export const SOCIAL_COPIES: Unit[] = [
  localCopy(from(CALIFORNIA_SOCIAL_G5, "ca-g5-explorers"), "ga-g3-explorers", ["SS3H2.a; SS3H2.b; SS3H2.c", "why Europeans explored North America, what explorers did, and cooperation and conflict with American Indians"], [
    ["Christopher Columbus first sailed across the Atlantic for Spain in…", "1492", ["1776", "1607"], "Fourteen ninety-two."],
    ["Vasco Núñez de Balboa was the first European to see the…", "Pacific Ocean from the Americas", ["Atlantic Ocean", "Arctic Ocean"], "He crossed the narrow land of Panama."],
    ["Henry Hudson searched for a water route to Asia called the…", "Northwest Passage", ["Silk Road", "Panama Canal"], "It would go around the north of North America."],
    ["John Cabot sailed for England and reached…", "the northeast coast of North America", ["Australia", "Antarctica"], "He sailed in 1497."],
    ["Juan Ponce de León was a Spanish explorer who, by legend, looked for…", "the Fountain of Youth", ["the Northwest Passage", "a city of ice"], "It was said to keep people young."],
    ["Why did European explorers want a sea route to Asia?", "to trade for spices and silk", ["to find snow", "to build schools"], "Spices were worth a lot."],
    ["Explorers used a compass to…", "find direction at sea", ["measure the temperature", "tell the time"], "Its needle points north."],
    ["Diseases that explorers brought…", "killed many American Indians", ["helped crops grow", "had no effect"], "American Indians had no immunity to them."],
  ]),
  localCopy(from(WASHINGTON_SOCIAL_K4_G3, "wa-g3-money-and-voting"), "ga-g3-money-and-voting", ["SS3E2; SS3CG2.b", "the goods and services governments provide, and why citizens take part in a democracy"]),
];
