import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g5";
import { copyOf, from } from "./kit";

// Delaware Grade 5 science: copies of California's sun-and-stars and Earth's-systems units without their
// California places, with Delaware examples added.

export const SCIENCE_5: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-sun-stars"),
    {
      id: "de-g5-sun-stars",
      title: "Sun, Stars & Shadows",
      emoji: "🌟",
      blurb: "Why the sun looks bright, and daily and seasonal patterns.",
      parentNote:
        "Practices why the sun looks brighter than other stars, and the daily and seasonal patterns of shadows, day length and the stars seen from Delaware, from its dark state parks to its cities.",
      standards: ["5-ESS1-1; 5-ESS1-2", "the sun's brightness and distance, and patterns of shadows, day and night, and seasonal stars"],
    },
    [
      ["In Delaware, days are longest in…", "June", ["December", "January", "February"], "The summer solstice is in June."],
      ["In Dover, days are shortest in…", "December", ["June", "July", "August"], "The winter solstice is in December."],
      ["At noon in Delaware, where does the sun appear in the sky?", "toward the south", ["toward the north", "straight down", "under the ground"], "Delaware is far north of the tropics."],
      ["Your shadow at noon is… than your shadow in the early morning.", "shorter", ["longer", "brighter", "warmer"], "The sun is highest at noon."],
      ["The sun looks bigger and brighter than other stars because it is…", "much closer to Earth", ["the biggest star of all", "made of fire only", "a planet"], "Other stars are much farther away."],
      ["Why can you see more stars at Cape Henlopen State Park than in downtown Wilmington?", "there is less light from the city", ["the stars are closer there", "there is no moon there", "the trees make stars"], "City lights hide faint stars.", true],
      ["Why do we see different constellations in winter and summer?", "Earth moves around the sun", ["the stars move away", "the moon blocks them", "stars sleep in summer"], "We face different parts of space.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-earth-water"),
    {
      id: "de-g5-earth-water",
      title: "Earth's Systems & Water",
      emoji: "💧",
      blurb: "Land, water, air and life working together.",
      parentNote:
        "Practices how Earth's land, water, air and living things interact, how much of Earth's water is fresh, and how communities protect water, using Delaware examples like its creeks, rivers and wells, Delaware Bay, the beaches and the Brandywine.",
      standards: ["5-ESS2-1; 5-ESS2-2; 5-ESS3-1", "Earth's systems interact, where Earth's water is, and how communities protect resources"],
    },
    [
      ["Many Delaware homes get their drinking water from…", "wells that reach water underground", ["the ocean", "a glacier", "the Great Salt Lake"], "Water soaks into the ground and fills spaces in rock."],
      ["Rain from a big storm washes soil from a hillside into a river. That shows the… and the hydrosphere interacting.", "geosphere", ["atmosphere only", "sun", "moon"], "The geosphere is rock and soil."],
      ["Keeping trees and plants along the banks of a creek helps…", "keep soil and pollution out of the water", ["make the water salty", "stop all rain", "dry up the lake"], "Roots hold the soil in place."],
      ["The trees of Delaware's forests take in water and give off water vapor. That links the biosphere and the…", "atmosphere", ["Moon", "core", "sun"], "The atmosphere is the air."],
      ["Ocean waves carrying sand along Delaware's beaches show the hydrosphere changing the…", "geosphere", ["biosphere only", "atmosphere", "Moon"], "Moving water can move sand and rock."],
      ["Delaware Bay is where fresh river water mixes with salty ocean water. That kind of place is an…", "estuary", ["glacier", "geyser", "desert"], "Many fish and birds raise their young there."],
      ["Most of Earth's fresh water that people can easily use is in…", "lakes, rivers and underground", ["the oceans", "clouds only", "salt flats"], "Most fresh water is frozen or underground.", true],
      ["Why is it important to keep trash out of Brandywine Creek?", "the water flows on and harms life downstream", ["trash helps fish", "creeks clean everything", "it makes the creek longer"], "Wilmington gets drinking water from the creek.", true],
    ],
  ),
];
