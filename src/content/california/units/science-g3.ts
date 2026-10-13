import type { Unit } from "../../types";
import { SCIENCE_3 } from "../../washington/units/science-35";
import { copyOf, from } from "./kit";

// California copies of Washington and Oregon science units built around Pacific Northwest places. Each keeps the
// original's questions, leaves out the ones about Washington, Oregon or Puget Sound, and adds California items: the
// Sierra Nevada, the Central Valley, the San Andreas Fault, kelp forests and the La Brea Tar Pits. Their own `ca-` ids
// keep California progress apart from the originals.

export const SCIENCE_COPIES: Unit[] = [
  copyOf(
    from(SCIENCE_3, "wa-g3-fossils"),
    {
      id: "ca-g3-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about life and places long ago.",
      parentNote:
        "Practices how fossils form and what they show about plants, animals and environments long ago, such as sea fossils found on dry land and Ice Age fossils from the La Brea Tar Pits in Los Angeles.",
      standards: [
        "3-LS4-1",
        "fossils as evidence of organisms and environments of long ago",
      ],
    },
    [
      [
        "Many Ice Age fossils have been found in the La Brea Tar Pits in…",
        "Los Angeles",
        ["the Moon", "the ocean floor", "Antarctica"],
        "It is a city in Southern California.",
      ],
      [
        "California's state fossil is the saber-toothed cat. It lived during…",
        "the Ice Age",
        ["last year", "the age of the internet", "next century"],
        "Long, long ago.",
        true,
      ],
      [
        "Animals got stuck in sticky tar long ago. Today the tar holds…",
        "their bones as fossils",
        ["live animals", "new rocks only", "nothing at all"],
        "The tar kept the bones safe.",
        true,
      ],
    ],
  ),
  copyOf(
    from(SCIENCE_3, "wa-g3-weather-climate"),
    {
      id: "ca-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Seasons, weather data and climates of the world.",
      parentNote:
        "Practices reading weather data by season and comparing climates around the world, including California's dry summers and rainy winters, Sierra Nevada snow and desert heat.",
      standards: [
        "3-ESS2-1; 3-ESS2-2",
        "weather patterns by season and climates in different regions of the world",
      ],
    },
    [
      [
        "In much of California, most rain falls in…",
        "winter",
        ["summer", "only July", "never"],
        "Summers are dry.",
      ],
      [
        "California summers near the coast are usually…",
        "dry",
        ["very snowy", "rainy every day", "frozen"],
        "Little rain falls in summer.",
      ],
      [
        "Which season brings the most snow to the Sierra Nevada?",
        "Winter",
        ["Summer", "Late summer", "Early fall heat"],
        "Cold months.",
      ],
      [
        "Which part of California is hottest and driest in summer?",
        "The desert",
        ["The foggy coast", "A snowy mountaintop", "A redwood forest"],
        "Deserts get little rain.",
      ],
      [
        "Land east of the Sierra Nevada is drier because…",
        "mountains block rain clouds",
        [
          "it is closer to the ocean",
          "it is near the equator",
          "it has no air",
        ],
        "Clouds drop rain on the west side.",
        true,
      ],
      [
        "Summer fog near San Francisco comes from…",
        "cool ocean air",
        ["volcanoes", "snowstorms", "the desert"],
        "The ocean is cold there.",
        true,
      ],
    ],
  ),
];
