import type { Unit } from "../../types";
import { SCIENCE_5 as WASHINGTON_SCIENCE_35 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// Georgia copies of Grade 2 units that fit Georgia except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_SCIENCE_35, "wa-g5-sun-stars"), "ga-g2-sun-stars", ["S2E1.a; S2E1.b; S2E2.a", "how the size and brightness of stars compare with the sun, and how shadows change as the sun moves"], [
    ["At noon on a sunny day in Georgia, your shadow is…", "short", ["very long", "gone forever"], "The sun is high in the sky."],
    ["In the morning the sun is in the east, so your shadow points…", "west", ["east", "straight up"], "Shadows point away from the sun."],
    ["We can see the most stars…", "on a clear night", ["at noon", "on a cloudy day"], "The bright sun hides them in the day."],
    ["Which star gives Earth light and heat?", "the sun", ["the moon", "the North Star"], "The moon is not a star."],
  ]),
];
