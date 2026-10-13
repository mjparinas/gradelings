import type { Unit } from "../../types";
import { SCIENCE_5 } from "../../washington/units/science-35";
import { copyOf, from } from "./kit";

// California copies of Washington and Oregon science units built around Pacific Northwest places. Each keeps the
// original's questions, leaves out the ones about Washington, Oregon or Puget Sound, and adds California items: the
// Sierra Nevada, the Central Valley, the San Andreas Fault, kelp forests and the La Brea Tar Pits. Their own `ca-` ids
// keep California progress apart from the originals.

export const SCIENCE_COPIES: Unit[] = [
  copyOf(
    from(SCIENCE_5, "wa-g5-sun-stars"),
    {
      id: "ca-g5-sun-stars",
      title: "Sun, Stars & Shadows",
      emoji: "🌟",
      blurb: "Why the sun looks bright, and daily and seasonal patterns.",
      parentNote:
        "Practices why the sun looks brighter than other stars, and patterns of shadows, day length and the stars we see in different seasons.",
      standards: [
        "5-ESS1-1; 5-ESS1-2",
        "the sun's brightness and distance, and patterns of shadows, day and night, and seasonal stars",
      ],
    },
    [
      [
        "Days in California are longest in…",
        "June",
        ["December", "January", "February"],
        "Summer solstice.",
      ],
      [
        "Days in California are shortest in…",
        "December",
        ["June", "July", "August"],
        "Winter solstice.",
      ],
      [
        "At noon in summer, your shadow is…",
        "short",
        ["very long", "gone forever", "in front of the sun"],
        "The sun is high.",
        true,
      ],
    ],
  ),
  copyOf(
    from(SCIENCE_5, "wa-g5-earth-water"),
    {
      id: "ca-g5-earth-water",
      title: "Earth's Systems & Water",
      emoji: "💧",
      blurb: "Land, water, air and life working together.",
      parentNote:
        "Practices how Earth's geosphere, hydrosphere, atmosphere and biosphere interact, how much of Earth's water is salty or frozen, and how communities protect water, from Sierra Nevada snow to San Francisco Bay.",
      standards: [
        "5-ESS2-1; 5-ESS2-2; 5-ESS3-1",
        "Earth's systems interact, where Earth's water is, and how communities protect resources",
      ],
    },
    [
      [
        "Which is a way communities protect San Francisco Bay?",
        "Keep pollution out of storm drains",
        ["Dump oil in drains", "Pour paint in streams", "Litter on beaches"],
        "Storm drains lead to the bay.",
      ],
      [
        "Melting snow from the Sierra Nevada fills…",
        "rivers and reservoirs",
        ["the desert sand", "the clouds only", "volcanoes"],
        "Snow is stored water.",
      ],
      [
        "A family saves water during a drought by…",
        "taking shorter showers",
        [
          "watering the sidewalk",
          "leaving taps running",
          "filling a pool every day",
        ],
        "Use less water.",
        true,
      ],
      [
        "Which part of Earth's systems is the snowpack on a mountain?",
        "Hydrosphere",
        ["Geosphere", "Biosphere", "Atmosphere"],
        "Frozen water is still water.",
        true,
      ],
    ],
  ),
];
