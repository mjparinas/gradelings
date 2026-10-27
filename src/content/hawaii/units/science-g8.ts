import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g8";
import { copyOf, from } from "./kit";

// Hawaiʻi Grade 8 science: a copy of California's space-systems unit without its California places, with Hawaiʻi
// examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_8: Unit[] = [
  copyOf(
    from(CA, "ca-g8-space"),
    {
      id: "hi-g8-space",
      title: "Space Systems",
      emoji: "🪐",
      blurb: "Moon phases, eclipses, seasons, gravity and scale.",
      parentNote:
        "Practices the Earth-sun-moon system (phases, eclipses and seasons), gravity's role in the solar system, and its scale, with Hawaiʻi examples like the observatories on Maunakea and Haleakalā and the tides along Hawaiʻi's shores.",
      standards: ["MS-ESS1-1; MS-ESS1-2; MS-ESS1-3", "the Earth-sun-moon system, gravity in the solar system, and its scale"],
    },
    [
      ["Telescopes on Maunakea sit above most of the clouds at nearly…", "14,000 feet", ["140 feet", "1,400 feet", "140,000 feet"], "Thin, dry air gives a clear view of space."],
      ["Fishers in Hawaiʻi watch the moon because its pull on the ocean causes…", "tides", ["earthquakes", "trade winds", "rain"], "Gravity from the moon raises the sea."],
      ["The highest and lowest tides of the month, called spring tides, happen at…", "new moon and full moon", ["first quarter only", "every Tuesday", "noon each day"], "Sun and moon line up."],
      ["Observatories on Haleakalā, on Maui, are used to study the…", "sun", ["ocean floor", "volcano's magma", "trade winds"], "Its high, clear air is good for solar telescopes."],
      ["The moon looks the same size as the sun in the sky because the sun is…", "much bigger but much farther away", ["the same size as the moon", "closer than the moon", "smaller than the moon"], "That is why total eclipses can happen."],
      ["The Hawaiian lunar calendar names each night of the moon's cycle. The cycle lasts about…", "29 or 30 days", ["7 days", "365 days", "100 days"], "One full cycle of phases.", true],
      ["Even though Hawaiʻi is warm all year, it still has seasons of longer and shorter days because…", "Earth's axis is tilted", ["the sun moves closer in summer", "the moon blocks the sun", "Earth stops spinning"], "Tilt changes the sun's angle.", true],
    ],
  ),
];
