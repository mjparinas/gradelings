import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g5";
import { copyOf, from } from "./kit";

// New Hampshire Grade 5 science: copies of California's sun-and-stars and Earth's-systems units without their
// California places, with New Hampshire examples added.

export const SCIENCE_5: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-sun-stars"),
    {
      id: "nh-g5-sun-stars",
      title: "Sun, Stars & Shadows",
      emoji: "🌟",
      blurb: "Why the sun looks bright, and daily and seasonal patterns.",
      parentNote:
        "Practices why the sun looks brighter than other stars, and the daily and seasonal patterns of shadows, day length and the stars seen from New Hampshire, from its dark northern woods to its towns.",
      standards: ["5-ESS1-1; 5-ESS1-2", "the sun's brightness and distance, and patterns of shadows, day and night, and seasonal stars"],
    },
    [
      ["In New Hampshire, days are longest in…", "June", ["December", "January", "February"], "The summer solstice is in June."],
      ["In Concord, days are shortest in…", "December", ["June", "July", "August"], "The winter solstice is in December."],
      ["At noon in New Hampshire, where does the sun appear in the sky?", "toward the south", ["toward the north", "straight down", "under the ground"], "New Hampshire is far north of the tropics."],
      ["Your shadow at noon is… than your shadow in the early morning.", "shorter", ["longer", "brighter", "warmer"], "The sun is highest at noon."],
      ["The sun looks bigger and brighter than other stars because it is…", "much closer to Earth", ["the biggest star of all", "made of fire only", "a planet"], "Other stars are much farther away."],
      ["Why can you see more stars in New Hampshire's Great North Woods than in downtown Manchester?", "there is less light from the city", ["the stars are closer there", "there is no moon there", "the trees make stars"], "City lights hide faint stars.", true],
      ["Why do we see different constellations in winter and summer?", "Earth moves around the sun", ["the stars move away", "the moon blocks them", "stars sleep in summer"], "We face different parts of space.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-earth-water"),
    {
      id: "nh-g5-earth-water",
      title: "Earth's Systems & Water",
      emoji: "💧",
      blurb: "Land, water, air and life working together.",
      parentNote:
        "Practices how Earth's land, water, air and living things interact, how much of Earth's water is fresh, and how communities protect water, using New Hampshire examples like its lakes, rivers and wells, Great Bay and its forests.",
      standards: ["5-ESS2-1; 5-ESS2-2; 5-ESS3-1", "Earth's systems interact, where Earth's water is, and how communities protect resources"],
    },
    [
      ["Many New Hampshire homes get their drinking water from…", "wells that reach water underground", ["the ocean", "a glacier", "the Great Salt Lake"], "Water soaks into the ground and fills spaces in rock."],
      ["Rain from a big storm washes soil from a hillside into a river. That shows the… and the hydrosphere interacting.", "geosphere", ["atmosphere only", "sun", "moon"], "The geosphere is rock and soil."],
      ["Keeping trees and plants along the shore of a lake helps…", "keep soil and pollution out of the water", ["make the water salty", "stop all rain", "dry up the lake"], "Roots hold the soil in place."],
      ["The trees of New Hampshire's forests take in water and give off water vapor. That links the biosphere and the…", "atmosphere", ["Moon", "core", "sun"], "The atmosphere is the air."],
      ["Ocean waves wearing away the rocky shore at Rye show the hydrosphere changing the…", "geosphere", ["biosphere only", "atmosphere", "Moon"], "Moving water can wear away rock."],
      ["Great Bay is where fresh river water mixes with salty ocean water. That kind of place is an…", "estuary", ["glacier", "geyser", "desert"], "Many fish and birds raise their young there."],
      ["Most of Earth's fresh water that people can easily use is in…", "lakes, rivers and underground", ["the oceans", "clouds only", "salt flats"], "Most fresh water is frozen or underground.", true],
      ["Why is it important to keep trash out of the Merrimack River?", "the water flows on and harms life downstream", ["trash helps fish", "rivers clean everything", "it makes the river longer"], "Many towns share the river.", true],
    ],
  ),
];
