import type { Unit } from "../../types";
import { SCIENCE_5 } from "../../washington/units/science-35";
import { copyOf, from } from "./kit";

// A Minnesota copy of Washington's sun and stars unit, without its Washington questions and with Minnesota's long
// summer days and short winter days. Its own `mn-` id keeps Minnesota progress apart from the original.
export const UNITS: Unit[] = [
  copyOf(
    from(SCIENCE_5, "wa-g5-sun-stars"),
    {
      id: "mn-g5-sun-stars",
      title: "Sun, Stars & Shadows",
      emoji: "🌟",
      blurb: "Why the sun looks bright, and patterns in the sky.",
      parentNote:
        "Practices why the sun looks brighter than other stars (it is much closer), and the daily and seasonal patterns of shadows, day length and the stars we see, using Minnesota's long summer days and short winter days.",
      standards: [
        "5E.2.2.1.2; 5E.4.1.1.1",
        "patterns of shadows, day and night, and stars in the sky, and why the sun looks brighter than other stars",
      ],
    },
    [
      ["Days in Minnesota are longest in…", "June", ["December", "January", "March"], "Early summer."],
      ["Days in Minnesota are shortest in…", "December", ["June", "July", "August"], "Early winter."],
      ["From Minnesota, the noon sun in winter is…", "lower in the sky than in summer", ["straight overhead", "higher than in summer", "below the horizon"], "Winter shadows are long.", true],
      ["On a clear night far from city lights in northern Minnesota, you can see more stars because…", "there is less light in the sky to hide them", ["the stars are closer there", "the sun is shining", "the stars are bigger there"], "Dark skies show dim stars."],
    ],
  ),
];
