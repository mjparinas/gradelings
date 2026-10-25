import type { Unit } from "../../types";
import { SCIENCE_5 as WASHINGTON_UNITS_SCIENCE_35_SCIENCE_5 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// Louisiana copies of Grade 5 units that fit Louisiana except for a few questions naming another state's places, with
// Louisiana examples added.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_UNITS_SCIENCE_35_SCIENCE_5, "wa-g5-sun-stars"), "la-g5-sun-stars", ["5-ESS1-1; 5-ESS1-2", "the sun's brightness and distance, and patterns of shadows, day and night, and seasonal stars"], [
      ["Days in Louisiana are shortest in…", "December", ["June", "August"], "Winter has the least daylight."],
      ["Days in Louisiana are longest in…", "June", ["December", "February"], "Summer has the most daylight."],
      ["At noon in Lafayette, a shadow is shortest because…", "the sun is highest in the sky", ["the sun has set", "clouds block it"], "High sun, short shadow."],
      ["Some stars seen from Louisiana in winter can't be seen in summer because…", "Earth moves around the sun", ["the stars burn out", "the moon blocks them"], "Our view changes over the year."],
    ]),
  localCopy(from(WASHINGTON_UNITS_SCIENCE_35_SCIENCE_5, "wa-g5-earth-water"), "la-g5-earth-water", ["5-ESS2-2; 5-ESS3-1", "how much of Earth's water is salt or fresh, and ways communities protect Earth's resources"], [
      ["The water in the Gulf, south of Louisiana, is mostly…", "salt water", ["fresh water", "ice"], "Oceans and gulfs are salty."],
      ["Where fresh river water meets salty Gulf water, the water is called…", "brackish", ["frozen", "pure"], "It is a mix of both."],
      ["Rebuilding marshes along the Louisiana coast helps protect…", "wildlife and towns from storms", ["volcanoes", "the moon"], "Marshes soak up storm surge."],
      ["Most of Earth's water is in…", "the oceans", ["rivers", "clouds"], "Oceans cover most of Earth."],
    ]),
  localCopy(from(WASHINGTON_UNITS_SCIENCE_35_SCIENCE_5, "wa-g5-ecosystems"), "la-g5-ecosystems", ["5-LS2-1", "the movement of matter among plants, animals, decomposers and the environment"], [
      ["In a Louisiana marsh, marsh grass makes food from…", "sunlight, air and water", ["eating crabs", "eating birds"], "Plants are producers."],
      ["A heron eats fish in the bayou. The heron is a…", "consumer", ["producer", "decomposer"], "It eats other living things."],
      ["Fungi and bacteria that break down dead leaves in a swamp are…", "decomposers", ["producers", "predators"], "They return matter to the soil."],
      ["If all the small fish in a bayou disappeared, the herons would…", "have less food", ["have more food", "not be affected"], "Food webs connect living things."],
    ]),
  localCopy(from(WASHINGTON_UNITS_SCIENCE_35_SCIENCE_5, "wa-g5-gravity"), "la-g5-gravity", ["5-PS2-1", "Earth's gravitational force on objects is directed down"], [
      ["Two students in Shreveport and in Brazil drop balls. Which is true?", "both balls fall toward the center of Earth", ["only the Shreveport ball falls", "the ball in Brazil falls up"], "Gravity pulls toward Earth's center everywhere."],
      ["A pecan falling from a tree falls because of…", "gravity", ["magnetism", "sound"], "Gravity pulls things down."],
      ["The Mississippi River flows downhill to the Gulf because of…", "gravity", ["wind only", "light"], "Water moves downhill."],
      ["If you throw a ball up in Baton Rouge, it comes back down because…", "Earth's gravity pulls it", ["the air pushes it", "it gets tired"], "Gravity always pulls."],
    ]),
];
