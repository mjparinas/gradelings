import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// Missouri Grade 3 science: a copy of California's weather-and-climate unit without its California places, with
// Missouri examples added.

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-weather-climate"),
    {
      id: "mo-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including Missouri's hot, humid summers, cold winters and spring storms.",
      standards: ["3.ESS2.D.1; 3.ESS2.D.2", "weather patterns by season and climates in different regions of the world"],
    },
    [
      ["In which season does Missouri usually get snow?", "winter", ["summer", "late spring", "early fall"], "Snow falls when it is below freezing."],
      ["In Missouri, tornadoes happen most often in…", "spring", ["midwinter", "late fall", "never"], "Warm and cold air meet in spring."],
      ["Missouri has hot summers and cold winters. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["Summer days in St. Louis often feel sticky because the air is…", "humid", ["frozen", "dusty", "salty"], "Humid air holds a lot of water vapor."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["Which is colder on average in winter, a town in far northern Missouri or one in the Bootheel?", "the northern town", ["the Bootheel town", "they are always the same", "neither has winter"], "Places farther north are usually colder."],
      ["A town's average July temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["Why do Missouri farmers plant soybeans in spring, not winter?", "the ground is cold or frozen in winter", ["soybeans need snow", "spring is darker", "there is no rain in spring"], "Crops need warm soil.", true],
    ],
  ),
];
