import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g5";
import { copyOf, from } from "./kit";

// Nebraska Grade 5 science: copies of California's sun-and-stars and Earth's-systems units without their California
// places, with Nebraska examples added.

export const SCIENCE_5: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-sun-stars"),
    {
      id: "neb-g5-sun-stars",
      title: "Sun, Stars & Shadows",
      emoji: "🌟",
      blurb: "Why the sun looks bright, and daily and seasonal patterns.",
      parentNote:
        "Practices why the sun looks brighter than other stars, and the daily and seasonal patterns of shadows, day length and the stars seen from Nebraska.",
      standards: ["SC.5.11.3.b; SC.5.11.3.c", "the sun's brightness and distance, and patterns of shadows, day and night, and seasonal stars"],
    },
    [
      ["In Nebraska, days are longest in…", "June", ["December", "January", "February"], "The summer solstice is in June."],
      ["In Lincoln, days are shortest in…", "December", ["June", "July", "August"], "The winter solstice is in December."],
      ["At noon in Nebraska, where does the sun appear in the sky?", "toward the south", ["toward the north", "straight down", "under the ground"], "Nebraska is north of the tropics."],
      ["Your shadow at noon is… than your shadow in the early morning.", "shorter", ["longer", "brighter", "warmer"], "The sun is highest at noon."],
      ["The sun looks bigger and brighter than other stars because it is…", "much closer to Earth", ["the biggest star of all", "made of fire only", "a planet"], "Other stars are much farther away."],
      ["Why can you see more stars in the Sandhills than in downtown Omaha?", "there is less light from the city", ["the stars are closer there", "there is no moon there", "the grass makes stars"], "City lights hide faint stars.", true],
      ["Why do we see different constellations in winter and summer?", "Earth moves around the sun", ["the stars move away", "the moon blocks them", "stars sleep in summer"], "We face different parts of space.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-earth-water"),
    {
      id: "neb-g5-earth-water",
      title: "Earth's Systems & Water",
      emoji: "💧",
      blurb: "Land, water, air and life working together.",
      parentNote:
        "Practices how Earth's land, water, air and living things interact, how much of Earth's water is fresh, and how communities protect water, using Nebraska examples like the Ogallala Aquifer, the Platte River and the Sandhills.",
      standards: ["SC.5.13.4.a; SC.5.13.4.b; SC.5.13.4.c", "Earth's systems interact, where Earth's water is, and how communities protect resources"],
    },
    [
      ["Many farms and towns in Nebraska pump water from the…", "Ogallala Aquifer", ["ocean", "a glacier", "the Great Salt Lake"], "An aquifer is water stored in rock and sand underground."],
      ["Rain from a summer storm washes soil from a field into a creek. That shows the… and the hydrosphere interacting.", "geosphere", ["atmosphere only", "sun", "moon"], "The geosphere is rock and soil."],
      ["Watering crops only as much as they need helps…", "save water in the aquifer", ["make the water salty", "stop all rain", "dry up the oceans"], "Water used too fast is not replaced quickly."],
      ["Rain soaking through the sand of the Sandhills helps refill the…", "Ogallala Aquifer", ["ocean", "Moon", "clouds above"], "Sand lets water sink down into the ground."],
      ["Cottonwood trees by the Platte River take in water and give off water vapor. That links the biosphere and the…", "atmosphere", ["Moon", "core", "sun"], "The atmosphere is the air."],
      ["Wind blowing soil off dry fields during the Dust Bowl of the 1930s shows the atmosphere changing the…", "geosphere", ["biosphere only", "ocean floor", "Moon"], "Moving air can carry soil."],
      ["Most of Earth's fresh water that people can easily use is in…", "lakes, rivers and underground", ["the oceans", "clouds only", "salt flats"], "Most fresh water is frozen or underground.", true],
      ["Why is it important to keep trash out of the Platte River?", "the water flows on and harms life downstream", ["trash helps fish", "rivers clean everything", "it makes the river longer"], "The Platte River flows into the Missouri River.", true],
    ],
  ),
];
