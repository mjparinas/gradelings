import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// West Virginia Grade 3 science: a copy of California's weather-and-climate unit without its California places, with
// West Virginia examples added.

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-weather-climate"),
    {
      id: "wv-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data, climates of the world and storm safety.",
      parentNote:
        "Practices reading weather data by season, comparing climates around the world, and ways to stay safe from weather hazards, including West Virginia's snowy mountains, summer thunderstorms and floods.",
      standards: ["S.3.13; S.3.14; S.3.15", "weather patterns by season, climates in different regions of the world, and designs that reduce weather hazards"],
    },
    [
      ["In which season does Charleston usually get snow?", "winter", ["summer", "late spring", "early fall"], "Snow falls when it is below freezing."],
      ["Which usually gets more snow, the high mountains near Snowshoe or the Ohio River valley?", "the high mountains", ["the Ohio River valley", "they always get the same", "neither gets snow"], "Higher places are colder."],
      ["West Virginia has warm summers and cold, snowy winters. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["Summer afternoons in West Virginia often bring thunder, lightning and short heavy rain called…", "thunderstorms", ["blizzards", "sandstorms", "monsoons"], "Warm, moist air rises and builds storm clouds."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["Heavy rain on steep hills can make streams rise fast. This is called a…", "flash flood", ["drought", "heat wave", "dust storm"], "Water runs quickly downhill into the valleys."],
      ["A floodwall along a river in a town like Huntington helps…", "keep flood water out of the streets", ["make more rain", "stop thunder", "warm the river"], "It was built after a giant flood in 1937.", true],
      ["A town's average July temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["Why do West Virginia farmers plant gardens in spring, not winter?", "the ground is cold or frozen in winter", ["plants need snow", "spring is darker", "there is no rain in spring"], "Seeds need warm soil.", true],
    ],
  ),
];
