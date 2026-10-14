import type { Unit } from "../../types";
import { SCIENCE_3 } from "../../washington/units/science-35";
import { copyOf, from } from "./kit";

// New York copies of Washington science units built around Pacific Northwest places. Each keeps the original's
// questions, leaves out the ones about Washington, Oregon or California, and adds New York items: the state fossil (a
// sea scorpion), the Cohoes mastodon, lake-effect snow and New York's seasons. Their own `ny-` ids keep New York
// progress apart from the originals.
export const UNITS: Unit[] = [
  copyOf(
    from(SCIENCE_3, "wa-g3-fossils"),
    {
      id: "ny-g3-fossils",
      title: "Fossil Clues",
      emoji: "🦴",
      blurb: "What fossils tell us about life long ago.",
      parentNote:
        "Practices using fossils as evidence of plants, animals and environments of long ago, such as the sea scorpions and trilobites in New York's rocks that show the state was once under a shallow sea.",
      standards: ["3-LS4-1", "fossils as evidence of organisms and environments of long ago"],
    },
    [
      ["New York's state fossil is a sea scorpion. It shows that long ago New York was…", "under a shallow sea", ["a hot desert", "a lava field", "a pine forest"], "Scorpions of the sea lived in water."],
      ["Mastodon bones were dug up in Cohoes, New York. Mastodons lived during the…", "Ice Age", ["time of the first cars", "Middle Ages", "year 2000"], "They had shaggy fur for the cold."],
      ["Trilobites are common fossils in New York rocks. Trilobites were…", "sea animals with hard shells", ["flying reptiles", "kinds of trees", "early horses"], "They lived on the sea floor."],
      ["Fossil shells are found in rocks near the Finger Lakes. The land there was once…", "covered by the sea", ["always a dry desert", "on top of a volcano", "on the moon"], "Shells come from sea animals.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_3, "wa-g3-weather-climate"),
    {
      id: "ny-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates around the world.",
      parentNote:
        "Practices reading weather data to describe each season, comparing climates in different regions of the world, and connecting weather to the water cycle, such as the lake-effect snow that falls near Lake Erie and Lake Ontario.",
      standards: [
        "3-ESS2-1; 3-ESS2-2; 3-ESS2-3",
        "weather patterns by season, climates in different regions of the world, and how weather connects to the water cycle",
      ],
    },
    [
      ["Lake-effect snow falls near Buffalo when cold wind blows across…", "Lake Erie", ["a desert", "a mountain top", "a cave"], "The wind picks up water from the lake."],
      ["Which season usually has the coldest temperatures in New York?", "Winter", ["Summer", "Spring", "Fall"], "Think of snow."],
      ["In New York, which month is usually warmest?", "July", ["January", "February", "December"], "It is in the middle of summer."],
      ["Summers in New York City are usually…", "warm and humid", ["freezing and snowy", "colder than winter", "dry with no clouds ever"], "Humid means the air feels damp."],
      ["Water from Lake Ontario evaporates and later falls nearby as snow. This links weather and…", "the water cycle", ["the rock cycle", "a frog's life cycle", "the phases of the moon"], "Water goes up and comes back down.", true],
      ["A thermometer outside a school in Albany reads 20°F. What weather fits?", "Snow", ["A hot beach day", "Thunderstorms in July heat", "A heat wave"], "20°F is below freezing.", true],
    ],
  ),
];
