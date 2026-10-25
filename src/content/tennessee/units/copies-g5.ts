import type { Unit } from "../../types";
import { worldMaps6 as OREGON_UNITS_SOCIAL_COPIES_worldMaps6 } from "../../oregon/units/social-copies";
import { SCIENCE_5 as WASHINGTON_UNITS_SCIENCE_35_SCIENCE_5 } from "../../washington/units/science-35";
import { G5 as WASHINGTON_UNITS_SOCIAL_59_G5_G5 } from "../../washington/units/social-59-g5";
import { from, localCopy } from "./kit";

// Tennessee copies of Grade 5 units that fit Tennessee except for a few questions naming another state's places, with
// Tennessee examples added.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_UNITS_SCIENCE_35_SCIENCE_5, "wa-g5-gravity"), "tn-g5-gravity", ["5.PS2.3", "Earth's gravitational force on objects is directed down"], [
      ["Two students in Memphis and in Brazil drop balls. Which is true?", "both balls fall toward the center of Earth", ["only the Memphis ball falls", "the ball in Brazil falls up"], "Gravity pulls toward Earth's center everywhere."],
      ["A leaf falling from a tulip poplar falls because of…", "gravity", ["magnetism", "sound"], "Gravity pulls things down."],
      ["Water flows down the Cumberland Plateau's waterfalls because of…", "gravity", ["wind only", "light"], "Water moves downhill."],
      ["If you throw a ball up in Nashville, it comes back down because…", "Earth's gravity pulls it", ["the air pushes it", "it gets tired"], "Gravity always pulls."],
    ], {}),
  localCopy(from(WASHINGTON_UNITS_SCIENCE_35_SCIENCE_5, "wa-g5-sun-stars"), "tn-g5-sun-stars", ["5.ESS1.1; 5.ESS1.3", "the sun's brightness and distance, and patterns of shadows, day and night, and seasonal stars"], [
      ["Days in Tennessee are shortest in…", "December", ["June", "August"], "Winter has the least daylight."],
      ["Days in Tennessee are longest in…", "June", ["December", "February"], "Summer has the most daylight."],
      ["At noon in Nashville, a shadow is shortest because…", "the sun is highest in the sky", ["the sun has set", "clouds block it"], "High sun, short shadow."],
      ["In winter, the Big Dipper and other stars seen from Tennessee change position because…", "Earth moves around the sun", ["the stars move away", "the moon blocks them"], "Our view changes over the year."],
    ], {}),
];

export const SOCIAL_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_UNITS_SOCIAL_59_G5_G5, "wa-g5-us-geography"), "tn-g5-us-geography", ["5.39; 5.40; 5.41", "maps and the regions, landforms and waterways of the United States"], [
      ["Which river forms Tennessee's western border?", "the Mississippi River", ["the Colorado River", "the Hudson River"], "It is the longest river system in the US."],
      ["Tennessee is in which region of the United States?", "the Southeast", ["the Northeast", "the West"], "It is south of the Ohio River."],
      ["Which mountains run along Tennessee's eastern border?", "the Appalachian Mountains", ["the Rocky Mountains", "the Sierra Nevada"], "The Smokies are part of them."],
      ["The Mississippi River flows south into the…", "Gulf of Mexico", ["Pacific Ocean", "Great Lakes"], "Its mouth is in Louisiana."],
      ["The Appalachian Mountains run through which part of Tennessee?", "the east", ["the west", "the far south of Florida"], "East Tennessee is mountainous."],
      ["Which river forms the western border of Tennessee?", "the Mississippi River", ["the Hudson River", "the Colorado River"], "It is the country's largest river system."],
      ["Which country borders the United States to the south?", "Mexico", ["Brazil", "Spain"], "Look below Texas on a map."],
      ["Which ocean is on the east coast of the United States?", "the Atlantic Ocean", ["the Pacific Ocean", "the Arctic Ocean"], "Europe is across it."],
    ], {}),
  localCopy(from([OREGON_UNITS_SOCIAL_COPIES_worldMaps6], "or-g6-world-maps"), "tn-g5-world-maps", ["5.32; 5.33; 5.34; 5.37", "using maps, coordinates and spatial thinking to describe absolute and relative location"], [
      ["Nashville is at about 36° N, 87° W. Which hemispheres is it in?", "Northern and Western", ["Southern and Eastern", "Northern and Eastern"], "North of the equator, west of the prime meridian."],
      ["Lines of latitude measure distance…", "north or south of the equator", ["east or west of the prime meridian", "above sea level"], "Latitude lines run east and west."],
      ["Memphis is at about 35° N. Knoxville is at about 36° N. Which is farther north?", "Knoxville", ["Memphis", "they are the same"], "A bigger north latitude is farther north."],
      ["A map scale helps you find…", "the real distance between places", ["the weather", "the time"], "One inch might stand for 100 miles."],
    ], {}),
];
