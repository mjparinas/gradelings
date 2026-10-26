import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// Idaho Grade 3 science: a copy of California's weather-and-climate unit without its California places, with Idaho
// examples added. (Idaho teaches fossils in Grade 5, so its fossil unit is in ./science-g5.ts.)

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-weather-climate"),
    {
      id: "id-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including Idaho's warm, dry summers, cold, snowy winters and mountain snowpack.",
      standards: ["3-ESS-1.1; 3-ESS-1.2", "weather by season, and climates in different regions of the world"],
    },
    [
      ["In which season does Boise usually get snow?", "winter", ["summer", "late spring", "early fall"], "Snow falls when it is below freezing."],
      ["In Idaho, the hottest days usually come in…", "summer", ["midwinter", "late fall", "early spring"], "July is often hot and dry."],
      ["Idaho has warm, dry summers and cold, snowy winters. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["Snow that melts in Idaho's mountains each spring fills its…", "rivers and reservoirs", ["deserts", "volcanoes", "caves"], "Melting snow runs downhill."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["Which is usually colder in winter, a high mountain top or the valley below it?", "the mountain top", ["the valley", "they are always the same", "neither has winter"], "Air is colder higher up."],
      ["A town's average July temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["Why do farmers in southern Idaho water their fields in summer?", "summers there are dry, with little rain", ["it rains every summer day", "the ground is frozen", "crops do not need water"], "Irrigation brings river water to the fields.", true],
    ],
  ),
];
