import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g5";
import { copyOf, from } from "./kit";

// Hawaiʻi Grade 5 science: copies of California's sun-and-stars and Earth's-systems units without their California
// places, with Hawaiʻi examples added.

export const SCIENCE_5: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-sun-stars"),
    {
      id: "hi-g5-sun-stars",
      title: "Sun, Stars & Shadows",
      emoji: "🌟",
      blurb: "Why the sun looks bright, and daily and seasonal patterns.",
      parentNote:
        "Practices why the sun looks brighter than other stars, and the daily and seasonal patterns of shadows, day length and the stars seen from Hawaiʻi, including the days when the noon sun is straight overhead and the stars wayfinders steer by.",
      standards: ["5-ESS1-1; 5-ESS1-2", "the sun's brightness and distance, and patterns of shadows, day and night, and seasonal stars"],
    },
    [
      ["In Hawaiʻi, days are longest in…", "June", ["December", "January", "February"], "The summer solstice is in June."],
      ["In Honolulu, days are shortest in…", "December", ["June", "July", "August"], "The winter solstice is in December."],
      ["On a few days each year in Hawaiʻi, the noon sun is straight overhead and shadows almost disappear. This is called…", "Lāhainā Noon", ["a solar eclipse", "midnight sun", "a blue moon"], "It happens only in the tropics."],
      ["Your shadow at noon is… than your shadow in the early morning.", "shorter", ["longer", "brighter", "warmer"], "The sun is highest at noon."],
      ["The sun looks bigger and brighter than other stars because it is…", "much closer to Earth", ["the biggest star of all", "made of fire only", "a planet"], "Other stars are much farther away."],
      ["The bright star Arcturus, which passes almost straight over Hawaiʻi, is called… in Hawaiian.", "Hōkūleʻa", ["Kīlauea", "Haleakalā", "Waikīkī"], "The famous voyaging canoe is named for it."],
      ["Why are there big telescopes on top of Maunakea?", "the air is dry, clear and dark high above the clouds", ["the stars are closer there", "there is no moon there", "the mountain makes stars"], "City lights and clouds hide faint stars.", true],
      ["Why do we see different constellations in winter and summer?", "Earth moves around the sun", ["the stars move away", "the moon blocks them", "stars sleep in summer"], "We face different parts of space.", true],
      ["Day length changes less across the year in Hawaiʻi than in places far to the north because Hawaiʻi is…", "closer to the equator", ["closer to the North Pole", "an island", "farther from the sun"], "Near the equator, days stay close to 12 hours.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-earth-water"),
    {
      id: "hi-g5-earth-water",
      title: "Earth's Systems & Water",
      emoji: "💧",
      blurb: "Land, water, air and life working together.",
      parentNote:
        "Practices how Earth's land, water, air and living things interact, how much of Earth's water is fresh, and how communities protect water, using Hawaiʻi examples like the forests that catch rain for the aquifers, vog, lava meeting the sea, and coral reefs.",
      standards: ["5-ESS2-1; 5-ESS2-2; 5-ESS3-1", "Earth's systems interact, where Earth's water is, and how communities protect resources"],
    },
    [
      ["Most of the drinking water on Oʻahu comes from…", "water stored underground in the rock", ["the ocean", "a glacier", "a desert lake"], "Rain soaks down through the rock into aquifers."],
      ["Mountain forests help Hawaiʻi's water supply because they…", "catch rain and fog so it soaks into the ground", ["make the water salty", "stop all rain", "dry up the streams"], "These forests are called watersheds."],
      ["Gas from a volcano mixing with sunlight and air to make a haze called vog shows the geosphere and the… interacting.", "atmosphere", ["biosphere only", "moon", "core"], "The atmosphere is the air."],
      ["When lava flows into the ocean and makes clouds of steam, the geosphere is interacting with the…", "hydrosphere", ["biosphere only", "moon", "sun"], "The hydrosphere is Earth's water."],
      ["Coral reefs are living things built in the ocean. They link the biosphere and the…", "hydrosphere", ["core", "moon", "sun"], "Coral needs clean seawater."],
      ["Mud washing off bare land into the ocean after heavy rain can harm…", "coral reefs", ["clouds", "volcanoes", "the moon"], "Mud smothers coral."],
      ["Most of Earth's fresh water that people can easily use is in…", "lakes, rivers and underground", ["the oceans", "clouds only", "salt flats"], "Most fresh water is frozen or underground.", true],
      ["Why is it important to keep fuel and chemicals from leaking into the ground on an island?", "they can poison the underground water people drink", ["they help plants grow", "the ground cleans everything", "they make more rain"], "An island has limited fresh water.", true],
    ],
  ),
];
