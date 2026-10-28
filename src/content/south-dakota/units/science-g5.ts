import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g5";
import { copyOf, from } from "./kit";

// South Dakota Grade 5 science: copies of California's sun-and-stars and Earth's-systems units without their California
// places, with South Dakota examples added.

export const SCIENCE_5: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-sun-stars"),
    {
      id: "sd-g5-sun-stars",
      title: "Sun, Stars & Shadows",
      emoji: "🌟",
      blurb: "Why the sun looks bright, and daily and seasonal patterns.",
      parentNote:
        "Practices why the sun looks brighter than other stars, and the daily and seasonal patterns of shadows, day length and the stars seen from South Dakota.",
      standards: ["5-ESS1-1; 5-ESS1-2", "the sun's brightness and distance, and patterns of shadows, day and night, and seasonal stars"],
    },
    [
      ["In South Dakota, days are longest in…", "June", ["December", "January", "February"], "The summer solstice is in June."],
      ["In Rapid City, days are shortest in…", "December", ["June", "July", "August"], "The winter solstice is in December."],
      ["At noon in South Dakota, where does the sun appear in the sky?", "toward the south", ["toward the north", "straight down", "under the ground"], "South Dakota is north of the tropics."],
      ["Your shadow at noon is… than your shadow in the early morning.", "shorter", ["longer", "brighter", "warmer"], "The sun is highest at noon."],
      ["The sun looks bigger and brighter than other stars because it is…", "much closer to Earth", ["the biggest star of all", "made of fire only", "a planet"], "Other stars are much farther away."],
      ["Why can you see more stars from the Badlands at night than from downtown Sioux Falls?", "there is less light from the city", ["the stars are closer there", "there is no moon there", "the rocks make stars"], "City lights hide faint stars.", true],
      ["Why do we see different constellations in winter and summer?", "Earth moves around the sun", ["the stars move away", "the moon blocks them", "stars sleep in summer"], "We face different parts of space.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-earth-water"),
    {
      id: "sd-g5-earth-water",
      title: "Earth's Systems & Water",
      emoji: "💧",
      blurb: "Land, water, air and life working together.",
      parentNote:
        "Practices how Earth's land, water, air and living things interact, how much of Earth's water is fresh, and how communities protect water, using South Dakota examples like the Missouri River, Lake Oahe, prairie wetlands and the groundwater many towns and farms pump from wells.",
      standards: ["5-ESS2-1; 5-ESS2-2; 5-ESS3-1", "Earth's systems interact, where Earth's water is, and how communities protect resources"],
    },
    [
      ["Many South Dakota towns and farms get their water from wells that pump…", "groundwater", ["ocean water", "salt water", "glacier ice"], "Water soaks into the ground and fills spaces in rock."],
      ["The Missouri River carrying mud and sand downstream shows the hydrosphere changing the…", "geosphere", ["atmosphere only", "sun", "moon"], "The geosphere is rock, sand and soil."],
      ["Grass and trees along a riverbank help keep the water clean because they…", "hold soil so it doesn't wash into the river", ["make the water salty", "stop all rain", "dry up the river"], "Roots hold soil in place."],
      ["Prairie grasses take in water and give off water vapor. That links the biosphere and the…", "atmosphere", ["Moon", "core", "sun"], "The atmosphere is the air."],
      ["Wind blowing soil off a dry farm field shows the atmosphere changing the…", "geosphere", ["biosphere only", "ocean floor", "Moon"], "Moving air can carry soil."],
      ["The water in Lake Oahe is…", "fresh water", ["salt water", "ice all year", "water vapor"], "It comes from the Missouri River."],
      ["Most of Earth's fresh water that people can easily use is in…", "lakes, rivers and underground", ["the oceans", "clouds only", "salt flats"], "Most fresh water is frozen or underground.", true],
      ["Why is it important to keep trash and chemicals out of streams that flow into the Missouri River?", "the water carries them downstream and harms life there", ["trash helps fish", "rivers clean everything", "it makes the river longer"], "Streams flow into bigger rivers.", true],
    ],
  ),
];
