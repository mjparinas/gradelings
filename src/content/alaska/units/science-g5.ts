import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g5";
import { copyOf, from } from "./kit";

// Alaska Grade 5 science: a copy of California's sun-and-stars unit without its California places, with Alaska examples
// added.

export const SCIENCE_5: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g5-sun-stars"),
    {
      id: "ak-g5-sun-stars",
      title: "Sun, Stars & Shadows",
      emoji: "🌟",
      blurb: "Why the sun looks bright, and daily and seasonal patterns.",
      parentNote:
        "Practices why the sun looks brighter than other stars, and the patterns of shadows, daylight and the stars we see in different seasons, with Alaska's long summer days and long winter nights.",
      standards: ["5-ESS1-1; 5-ESS1-2", "the sun's brightness and distance, and patterns of shadows, day and night, and seasonal stars"],
    },
    [
      ["Alaska's flag shows the Big Dipper and the…", "North Star", ["sun", "moon", "planet Mars"], "The North Star is also called Polaris."],
      ["The North Star looks higher in the sky in Utqiaġvik than in Juneau. Why?", "Utqiaġvik is farther north", ["Utqiaġvik is closer to the sun", "Juneau has no stars", "the star moves each night"], "The farther north you are, the higher Polaris appears."],
      ["In June, why can Fairbanks stay light almost all night?", "the North Pole is tilted toward the sun", ["the sun is bigger in June", "the moon gives off light", "Earth stops spinning"], "Earth's tilt causes long summer days in the north."],
      ["In winter in Alaska, the sun stays low in the sky. What happens to shadows at noon?", "they are long", ["they disappear", "they are shorter than in summer", "they point at the sun"], "A low sun makes long shadows."],
      ["Why are stars easier to see in Alaska in winter than in summer?", "winter nights are long and dark", ["stars move closer in winter", "the sun is hotter in winter", "stars only shine in winter"], "Summer nights in Alaska stay bright."],
      ["The sun looks much brighter than other stars because…", "it is much closer to Earth", ["it is the biggest star in the universe", "other stars are made of ice", "it is the only star"], "Distance changes how bright a star looks."],
      ["Utqiaġvik has about two months when the sun does not rise in winter. This is called…", "polar night", ["an eclipse", "a full moon", "a meteor shower"], "It happens far north of the Arctic Circle.", true],
      ["At noon in Alaska, a shadow points north. Where is the sun?", "in the southern sky", ["straight overhead", "in the northern sky", "below the horizon"], "Shadows point away from the sun.", true],
    ],
  ),
];
