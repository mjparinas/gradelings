import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g5";
import { copyOf, from } from "./kit";

// Washington, DC Grade 5 science: copies of California's sun-and-stars and Earth's-systems units without their California
// places, with DC examples added (day length and the night sky over the city, the Potomac as DC's drinking water, and
// keeping trash out of the Anacostia).

export const SCIENCE_5: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-sun-stars"),
    {
      id: "dc-g5-sun-stars",
      title: "Sun, Stars & Shadows",
      emoji: "🌟",
      blurb: "Why the sun looks bright, and daily and seasonal patterns.",
      parentNote:
        "Practices why the sun looks brighter than other stars, and the daily and seasonal patterns of shadows, day length and the stars seen from Washington, DC, where city lights hide all but the brightest stars.",
      standards: ["5-ESS1-1; 5-ESS1-2", "the sun's brightness and distance, and patterns of shadows, day and night, and seasonal stars"],
    },
    [
      ["In Washington, DC, days are longest in…", "June", ["December", "January", "February"], "The summer solstice is in June."],
      ["On the National Mall, days are shortest in…", "December", ["June", "July", "August"], "The winter solstice is in December."],
      ["At noon in Washington, DC, where does the sun appear in the sky?", "toward the south", ["toward the north", "straight down", "under the ground"], "DC is north of the tropics."],
      ["Your shadow at noon is… than your shadow in the early morning.", "shorter", ["longer", "brighter", "warmer"], "The sun is highest at noon."],
      ["The sun looks bigger and brighter than other stars because it is…", "much closer to Earth", ["the biggest star of all", "made of fire only", "a planet"], "Other stars are much farther away."],
      ["Why can you see more stars far out in the countryside than in downtown Washington, DC?", "there is less light from the city", ["the stars are closer there", "there is no moon there", "the trees make stars"], "City lights hide faint stars.", true],
      ["Why do we see different constellations in winter and summer?", "Earth moves around the sun", ["the stars move away", "the moon blocks them", "stars sleep in summer"], "We face different parts of space.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-earth-water"),
    {
      id: "dc-g5-earth-water",
      title: "Earth's Systems & Water",
      emoji: "💧",
      blurb: "Land, water, air and life working together.",
      parentNote:
        "Practices how Earth's land, water, air and living things interact, how much of Earth's water is fresh, and how communities protect water, using Washington, DC examples like the Potomac River, where the city's drinking water comes from, the Anacostia River and the trees of Rock Creek Park.",
      standards: ["5-ESS2-1; 5-ESS2-2; 5-ESS3-1", "Earth's systems interact, where Earth's water is, and how communities protect resources"],
    },
    [
      ["Most of the tap water in Washington, DC comes from the…", "Potomac River", ["Atlantic Ocean", "a glacier", "a salt lake"], "It is cleaned at treatment plants before it reaches homes."],
      ["Rain from a big storm washes soil from a hillside into a river. That shows the… and the hydrosphere interacting.", "geosphere", ["atmosphere only", "sun", "moon"], "The geosphere is rock and soil."],
      ["Keeping trees and plants along the banks of a stream helps…", "keep soil and pollution out of the water", ["make the water salty", "stop all rain", "dry up the stream"], "Roots hold the soil in place."],
      ["The trees of Rock Creek Park take in water and give off water vapor. That links the biosphere and the…", "atmosphere", ["Moon", "core", "sun"], "The atmosphere is the air."],
      ["Too much fertilizer washing off lawns and fields into a river can feed…", "blooms of algae", ["more glaciers", "new mountains", "salt water"], "Extra nutrients make algae grow fast."],
      ["Rushing water wearing away the rocks at the Potomac's Little Falls shows the hydrosphere changing the…", "geosphere", ["biosphere only", "atmosphere", "Moon"], "Moving water can wear away rock."],
      ["Most of Earth's fresh water that people can easily use is in…", "lakes, rivers and underground", ["the oceans", "clouds only", "salt flats"], "Most fresh water is frozen or underground.", true],
      ["Why is it important to keep trash out of the Anacostia River?", "the water flows on downstream and harms the life that lives there", ["trash helps fish", "rivers clean everything", "it makes the river longer"], "Trash traps and the bag fee help keep it out.", true],
    ],
  ),
];
