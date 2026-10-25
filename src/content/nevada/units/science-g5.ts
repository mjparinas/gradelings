import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g5";
import { copyOf, from } from "./kit";

// Nevada Grade 5 science: copies of California's sun-and-stars and Earth's-systems units without their California
// places, with Nevada examples added.

export const SCIENCE_5: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-sun-stars"),
    {
      id: "nv-g5-sun-stars",
      title: "Sun, Stars & Shadows",
      emoji: "🌟",
      blurb: "Why the sun looks bright, and daily and seasonal patterns.",
      parentNote:
        "Practices why the sun looks brighter than other stars, and the daily and seasonal patterns of shadows, day length and the stars seen from Nevada.",
      standards: ["5-ESS1-1; 5-ESS1-2", "the sun's brightness and distance, and patterns of shadows, day and night, and seasonal stars"],
    },
    [
      ["In Nevada, days are longest in…", "June", ["December", "January", "February"], "The summer solstice is in June."],
      ["In Reno, days are shortest in…", "December", ["June", "July", "August"], "The winter solstice is in December."],
      ["At noon in Nevada, where does the sun appear in the sky?", "toward the south", ["toward the north", "straight down", "under the ground"], "Nevada is north of the tropics."],
      ["Your shadow at noon is… than your shadow in the early morning.", "shorter", ["longer", "brighter", "warmer"], "The sun is highest at noon."],
      ["The sun looks bigger and brighter than other stars because it is…", "much closer to Earth", ["the biggest star of all", "made of fire only", "a planet"], "Other stars are much farther away."],
      ["Why can you see more stars at Great Basin National Park than on the Las Vegas Strip?", "there is less light from the city", ["the stars are closer there", "there is no moon there", "the trees make stars"], "City lights hide faint stars.", true],
      ["Why do we see different constellations in winter and summer?", "Earth moves around the sun", ["the stars move away", "the moon blocks them", "stars sleep in summer"], "We face different parts of space.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-earth-water"),
    {
      id: "nv-g5-earth-water",
      title: "Earth's Systems & Water",
      emoji: "💧",
      blurb: "Land, water, air and life working together.",
      parentNote:
        "Practices how Earth's land, water, air and living things interact, how much of Earth's water is fresh, and how communities protect water, using Nevada examples like Lake Mead, the Truckee River and the desert.",
      standards: ["5-ESS2-1; 5-ESS2-2; 5-ESS3-1", "Earth's systems interact, where Earth's water is, and how communities protect resources"],
    },
    [
      ["Las Vegas gets most of its drinking water from…", "Lake Mead on the Colorado River", ["the ocean", "a glacier", "the Great Salt Lake"], "A dam holds the river's water in the lake."],
      ["Rain from a summer storm washes desert soil into a wash. That shows the… and the hydrosphere interacting.", "geosphere", ["atmosphere only", "sun", "moon"], "The geosphere is rock and soil."],
      ["Planting desert plants instead of grass lawns helps…", "save water", ["make the water salty", "stop all rain", "dry up the lake"], "Desert plants need little water."],
      ["Trees by the Truckee River take in water and give off water vapor. That links the biosphere and the…", "atmosphere", ["Moon", "core", "sun"], "The atmosphere is the air."],
      ["Wind piling sand into dunes in the Nevada desert shows the atmosphere changing the…", "geosphere", ["biosphere only", "ocean floor", "Moon"], "Moving air can carry sand."],
      ["Most of Earth's fresh water that people can easily use is in…", "lakes, rivers and underground", ["the oceans", "clouds only", "salt flats"], "Most fresh water is frozen or underground.", true],
      ["Why is it important to keep trash out of the Truckee River?", "the water flows on and harms life downstream", ["trash helps fish", "rivers clean everything", "it makes the river longer"], "The Truckee flows into Pyramid Lake.", true],
    ],
  ),
];
