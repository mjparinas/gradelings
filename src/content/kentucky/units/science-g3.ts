import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// Kentucky Grade 3 science: a copy of California's weather-and-climate unit without its California
// places, with Kentucky examples added.

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-weather-climate"),
    {
      id: "ky-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including Kentucky's hot, humid summers, mild winters and spring storms.",
      standards: ["3-ESS2-1; 3-ESS2-2", "weather patterns by season and climates in different regions of the world"],
    },
    [
      ["In which season does Kentucky usually get the most snow?", "winter", ["summer", "late spring", "early fall"], "Snow falls when it is below freezing."],
      ["In Kentucky, thunderstorms happen most often in…", "spring and summer", ["midwinter", "late fall", "never"], "Warm, damp air builds storms."],
      ["Kentucky has hot, humid summers and cool winters. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["A thermometer measures…", "temperature", ["rainfall", "wind direction", "how tall a tree is"], "Read the number on the scale."],
      ["Which is usually colder in winter, the mountains of eastern Kentucky or Paducah in the west?", "the eastern mountains", ["Paducah", "they are always the same", "neither has winter"], "Higher places are usually colder."],
      ["A town's average July temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["Why do Kentucky farmers plant corn in spring, not winter?", "the soil is too cold in winter", ["seeds need snow", "spring is darker", "there is no rain in spring"], "Crops need warm soil.", true],
    ],
  ),
];
