import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// Nevada Grade 3 science: copies of California's fossil and weather-and-climate units without their California places,
// with Nevada examples added.

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-fossils"),
    {
      id: "nv-g3-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form and what they show about plants, animals and environments long ago, such as Nevada's ichthyosaurs from an ancient sea and the mammoths of the Ice Age.",
      standards: ["3-LS4-1", "fossils as evidence of organisms and environments of long ago"],
    },
    [
      ["Nevada's state fossil is the ichthyosaur, a giant reptile that swam in an ancient…", "sea", ["desert", "volcano", "glacier"], "A warm sea once covered Nevada."],
      ["Ichthyosaur fossils in Nevada's mountains show the land was once…", "under the sea", ["a frozen desert", "a rainforest canopy", "a volcano"], "Sea animals lived where mountains are now."],
      ["Mammoth bones found near Las Vegas show the area was once…", "cooler and wetter", ["a rainforest", "under lava", "the bottom of a deep ocean"], "Mammoths lived in the Ice Age."],
      ["Which of these can become a fossil?", "a shell pressed in mud", ["a cloud", "a song", "a shadow"], "Hard parts last longest."],
      ["Fossils are most often found in…", "sedimentary rock", ["lava that just cooled", "glass", "ice cubes"], "Layers of mud and sand harden into rock."],
      ["Fish fossils in a dry Nevada valley tell us the valley once held a…", "lake", ["volcano", "glacier", "city"], "Huge lakes filled Nevada's valleys in the Ice Age."],
      ["In layers of rock, the oldest fossils are usually…", "in the bottom layers", ["in the top layer", "in the air", "on the surface"], "Lower layers formed first.", true],
      ["Sea fossils far from any ocean tell us…", "the place was once covered by sea", ["sea animals can walk", "it was always dry land", "fish live in deserts"], "Environments change over very long times.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-weather-climate"),
    {
      id: "nv-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including Nevada's dry desert climate, hot summers in the south and snowy winters in the north.",
      standards: ["3-ESS2-1; 3-ESS2-2", "weather patterns by season and climates in different regions of the world"],
    },
    [
      ["In which season does Reno usually get snow?", "winter", ["summer", "late spring", "early fall"], "Snow falls when it is below freezing."],
      ["In Las Vegas, the hottest days usually come in…", "summer", ["midwinter", "late fall", "early spring"], "July is often over 100 degrees."],
      ["Nevada gets very little rain most years. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["Nevada gets less rain than any other state, so much of it is…", "desert", ["rainforest", "swamp", "ice cap"], "Deserts get very little rain."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["Which usually has colder winters, Reno in the north or Las Vegas in the south?", "Reno", ["Las Vegas", "they are always the same", "neither has winter"], "Reno is farther north and higher up."],
      ["A town's average July temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["Why do people in Las Vegas plant trees that need little water?", "the climate is dry", ["trees need snow", "it rains every day", "the soil is frozen"], "Plants that fit the climate grow best.", true],
    ],
  ),
];
