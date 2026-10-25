import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g5";
import { copyOf, from } from "./kit";

// Kentucky Grade 5 science: copies of California's sun-and-stars and Earth's-systems units without their California
// places, with Kentucky examples added.

export const SCIENCE_5: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-sun-stars"),
    {
      id: "ky-g5-sun-stars",
      title: "Sun, Stars & Shadows",
      emoji: "🌟",
      blurb: "Why the sun looks bright, and daily and seasonal patterns.",
      parentNote:
        "Practices why the sun looks brighter than other stars, and the daily and seasonal patterns of shadows, day length and the stars seen from Kentucky.",
      standards: ["5-ESS1-1; 5-ESS1-2", "the sun's brightness and distance, and patterns of shadows, day and night, and seasonal stars"],
    },
    [
      ["In Kentucky, days are longest in…", "June", ["December", "January", "February"], "The summer solstice is in June."],
      ["In Louisville, days are shortest in…", "December", ["June", "July", "August"], "The winter solstice is in December."],
      ["At noon in Kentucky, where does the sun appear in the sky?", "toward the south", ["toward the north", "straight down", "under the ground"], "Kentucky is north of the tropics."],
      ["Your shadow at noon is… than your shadow in the early morning.", "shorter", ["longer", "brighter", "warmer"], "The sun is highest at noon."],
      ["The sun looks bigger and brighter than other stars because it is…", "much closer to Earth", ["the biggest star of all", "made of fire only", "a planet"], "Other stars are much farther away."],
      ["Why can you see more stars at a dark sky park in the Kentucky woods than in downtown Louisville?", "there is less light from the city", ["the stars are closer there", "there is no moon there", "the trees make stars"], "City lights hide faint stars.", true],
      ["Why do we see different constellations in winter and summer?", "Earth moves around the sun", ["the stars move away", "the moon blocks them", "stars sleep in summer"], "We face different parts of space.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-earth-water"),
    {
      id: "ky-g5-earth-water",
      title: "Earth's Systems & Water",
      emoji: "💧",
      blurb: "Land, water, air and life working together.",
      parentNote:
        "Practices how Earth's land, water, air and living things interact, how much of Earth's water is fresh, and how communities protect water, using Kentucky examples like the Ohio River, Mammoth Cave's underground rivers and farm streams.",
      standards: ["5-ESS2-1; 5-ESS2-2; 5-ESS3-1", "Earth's systems interact, where Earth's water is, and how communities protect resources"],
    },
    [
      ["Louisville gets much of its drinking water from…", "the Ohio River", ["the ocean", "a glacier", "the desert"], "River water is cleaned before people drink it."],
      ["Rain washes soil from farm fields into the Green River. That shows the… and the hydrosphere interacting.", "geosphere", ["atmosphere only", "sun", "moon"], "The geosphere is rock and soil."],
      ["Water seeping through limestone carved Mammoth Cave. That shows the hydrosphere changing the…", "geosphere", ["atmosphere only", "biosphere only", "Moon"], "Water slowly dissolves limestone."],
      ["Planting strips of grass beside streams helps…", "keep soil and fertilizer out of the water", ["make the water salty", "stop all rain", "dry up the stream"], "Plant roots hold soil in place."],
      ["Trees on a riverbank take in water and give off water vapor. That links the biosphere and the…", "atmosphere", ["Moon", "core", "sun"], "The atmosphere is the air."],
      ["Most of Earth's fresh water that people can easily use is in…", "lakes, rivers and underground", ["the oceans", "clouds only", "salt flats"], "Most fresh water is frozen or underground.", true],
      ["Why can trash dumped in a sinkhole in Kentucky pollute a spring miles away?", "water flows through underground channels", ["sinkholes clean everything", "trash helps springs", "underground water never moves"], "Caves and springs are connected.", true],
    ],
  ),
];
