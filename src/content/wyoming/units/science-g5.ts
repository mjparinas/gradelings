import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g5";
import { copyOf, from } from "./kit";

// Wyoming Grade 5 science: copies of California's sun-and-stars and Earth's-systems units without their
// California places, with Wyoming examples added.

export const SCIENCE_5: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-sun-stars"),
    {
      id: "wy-g5-sun-stars",
      title: "Sun, Stars & Shadows",
      emoji: "🌟",
      blurb: "Why the sun looks bright, and daily and seasonal patterns.",
      parentNote:
        "Practices why the sun looks brighter than other stars, and the daily and seasonal patterns of shadows, day length and the stars seen from Wyoming, from its dark mountain skies to its towns.",
      standards: ["5-ESS1-2", "patterns of shadows, day length and the stars seen at different times of the year"],
    },
    [
      ["In Wyoming, days are longest in…", "June", ["December", "January", "February"], "The summer solstice is in June."],
      ["In Cheyenne, days are shortest in…", "December", ["June", "July", "August"], "The winter solstice is in December."],
      ["At noon in Wyoming, where does the sun appear in the sky?", "toward the south", ["toward the north", "straight down", "under the ground"], "Wyoming is far north of the tropics."],
      ["Your shadow at noon is… than your shadow in the early morning.", "shorter", ["longer", "brighter", "warmer"], "The sun is highest at noon."],
      ["The sun looks bigger and brighter than other stars because it is…", "much closer to Earth", ["the biggest star of all", "made of fire only", "a planet"], "Other stars are much farther away."],
      ["Why can you see more stars in the Wind River Range than in downtown Cheyenne?", "there is less light from the city", ["the stars are closer there", "there is no moon there", "the trees make stars"], "City lights hide faint stars.", true],
      ["Why do we see different constellations in winter and summer?", "Earth moves around the sun", ["the stars move away", "the moon blocks them", "stars sleep in summer"], "We face different parts of space.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-earth-water"),
    {
      id: "wy-g5-earth-water",
      title: "Earth's Systems & Water",
      emoji: "💧",
      blurb: "Land, water, air and life working together.",
      parentNote:
        "Practices how Earth's land, water, air and living things interact, how much of Earth's water is fresh, and how communities protect water, using Wyoming examples like its snow-fed rivers, wells, reservoirs and Old Faithful.",
      standards: ["5-ESS3-1", "how communities use science ideas to protect Earth's water, land and other resources"],
    },
    [
      ["Many Wyoming ranches and towns get their drinking water from…", "wells that reach water underground", ["the ocean", "a glacier", "a geyser"], "Water soaks into the ground and fills spaces in rock."],
      ["Most of the water in Wyoming's rivers comes from…", "snow melting in the mountains", ["the ocean", "geysers", "underground lava"], "The mountains store water as snow all winter."],
      ["Old Faithful in Yellowstone shoots up hot water heated by rock deep underground. That shows the… and the hydrosphere interacting.", "geosphere", ["atmosphere only", "sun", "moon"], "The geosphere is rock and soil."],
      ["Keeping plants growing along a stream bank helps…", "keep soil and pollution out of the water", ["make the water salty", "stop all rain", "dry up the stream"], "Roots hold the soil in place."],
      ["Reservoirs behind dams on the North Platte River store water so farms can…", "irrigate crops in the dry summer", ["make it snow", "stop the wind", "grow seaweed"], "Wyoming gets little rain in summer."],
      ["Fencing cattle away from a stream so they don't trample its banks is a way a community can…", "protect its water", ["make more cattle", "warm the stream", "move the stream"], "Healthy banks keep the water clean."],
      ["Most of Earth's fresh water that people can easily use is in…", "lakes, rivers and underground", ["the oceans", "clouds only", "salt flats"], "Most fresh water is frozen or underground.", true],
      ["Why is it important to keep oil and trash out of the Green River?", "the water flows on and harms life and towns downstream", ["trash helps fish", "rivers clean everything", "it makes the river longer"], "Many towns share the river.", true],
    ],
  ),
];
