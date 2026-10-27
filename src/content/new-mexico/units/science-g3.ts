import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// New Mexico Grade 3 science: copies of California's fossil and weather-and-climate units without their California places,
// with New Mexico examples added.

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-fossils"),
    {
      id: "nm-g3-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form and what they show about plants, animals and environments long ago, such as New Mexico's state fossil, the small dinosaur Coelophysis, the ancient reef at Carlsbad Caverns and the mammoths of the Ice Age.",
      standards: ["3-LS4-1", "fossils as evidence of organisms and environments of long ago"],
    },
    [
      ["New Mexico's state fossil, Coelophysis, was a small, fast…", "dinosaur", ["fish", "flower", "whale"], "Many were found together at Ghost Ranch."],
      ["The rock around Carlsbad Caverns is an ancient reef full of sea fossils. It shows the land was once…", "under the sea", ["a frozen desert", "a rainforest canopy", "a volcano"], "Sea creatures built the reef long ago."],
      ["Mammoth bones found in New Mexico show the land was once…", "cooler and wetter", ["a rainforest", "under lava", "the bottom of a deep ocean"], "Mammoths lived in the Ice Age."],
      ["Which of these can become a fossil?", "a shell pressed in mud", ["a cloud", "a song", "a shadow"], "Hard parts last longest."],
      ["Fossils are most often found in…", "sedimentary rock", ["lava that just cooled", "glass", "ice cubes"], "Layers of mud and sand harden into rock."],
      ["Fish fossils in a dry New Mexico valley tell us the valley once held a…", "lake", ["volcano", "glacier", "city"], "Lakes filled some valleys long ago."],
      ["In layers of rock, the oldest fossils are usually…", "in the bottom layers", ["in the top layer", "in the air", "on the surface"], "Lower layers formed first.", true],
      ["Sea fossils far from any ocean tell us…", "the place was once covered by sea", ["sea animals can walk", "it was always dry land", "fish live in deserts"], "Environments change over very long times.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-weather-climate"),
    {
      id: "nm-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including New Mexico's dry climate, its summer monsoon storms, hot summers in the south and snowy winters in the mountains.",
      standards: ["3-ESS2-1; 3-ESS2-2", "weather patterns by season and climates in different regions of the world"],
    },
    [
      ["In which season does Santa Fe usually get snow?", "winter", ["summer", "late spring", "early fall"], "Snow falls when it is below freezing."],
      ["In Las Cruces, the hottest days usually come in…", "summer", ["midwinter", "late fall", "early spring"], "June is often over 100 degrees."],
      ["New Mexico gets little rain most years. That describes its…", "climate", ["weather today", "soil", "rocks"], "Climate is the usual weather over many years."],
      ["Many New Mexico summers bring afternoon thunderstorms in July and August. This rainy season is called the…", "monsoon", ["blizzard", "drought", "hurricane"], "Moist air flows in from the south."],
      ["A rain gauge measures…", "how much rain fell", ["wind speed", "temperature", "air pressure"], "Rain collects in the tube."],
      ["Which usually has colder winters, Taos in the mountains or Las Cruces in the south?", "Taos", ["Las Cruces", "they are always the same", "neither has winter"], "Taos is farther north and much higher up."],
      ["A town's average July temperature over 30 years tells you about its…", "climate", ["weather tomorrow", "soil", "time zone"], "Climate uses many years of data.", true],
      ["Why do people in Albuquerque plant gardens that need little water?", "the climate is dry", ["plants need snow", "it rains every day", "the soil is frozen"], "Plants that fit the climate grow best.", true],
    ],
  ),
];
