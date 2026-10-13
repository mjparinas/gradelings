import type { Unit } from "../../types";
import { SCIENCE_4 } from "../../washington/units/science-35";
import { copyOf, from } from "./kit";

// California copies of Washington and Oregon science units built around Pacific Northwest places. Each keeps the
// original's questions, leaves out the ones about Washington, Oregon or Puget Sound, and adds California items: the
// Sierra Nevada, the Central Valley, the San Andreas Fault, kelp forests and the La Brea Tar Pits. Their own `ca-` ids
// keep California progress apart from the originals.

export const SCIENCE_COPIES: Unit[] = [
  copyOf(
    from(SCIENCE_4, "wa-g4-earth-hazards"),
    {
      id: "ca-g4-earth-hazards",
      title: "Quakes, Volcanoes & Maps",
      emoji: "🌋",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and comparing solutions that reduce the impacts of earthquakes, eruptions, landslides and tsunamis, using California's faults and volcanoes as examples.",
      standards: [
        "4-ESS2-2; 4-ESS3-2",
        "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards",
      ],
    },
    [
      [
        "Why does California have many earthquakes?",
        "Two plates slide past each other there",
        [
          "It is in the middle of a plate",
          "It is very sunny",
          "It has deserts",
        ],
        "The San Andreas Fault.",
      ],
      [
        "The San Andreas Fault is a…",
        "crack where two plates meet",
        ["river", "volcano", "lake"],
        "Plates slide along it.",
      ],
      [
        "Mount Shasta and Lassen Peak in Northern California are…",
        "volcanoes",
        ["deserts", "lakes", "islands"],
        "Lassen Peak erupted about 100 years ago.",
      ],
      [
        "During an earthquake, you should…",
        "drop, cover and hold on",
        ["run outside right away", "stand by a window", "ride an elevator"],
        "Get under a sturdy table.",
      ],
      [
        "Builders make buildings safer in earthquakes by…",
        "making them bend without breaking",
        [
          "using only glass",
          "building them taller and thinner",
          "skipping the base",
        ],
        "Flexible frames help.",
        true,
      ],
      [
        "A big earthquake shook San Francisco in…",
        "1906",
        ["1492", "2025", "1776"],
        "Fires burned after the shaking.",
        true,
      ],
      [
        "Earthquakes on a world map often line up along…",
        "plate edges",
        ["the equator only", "the middle of every desert", "the North Pole"],
        "Plates meet in long lines.",
        true,
      ],
    ],
  ),
  copyOf(
    from(SCIENCE_4, "wa-g4-energy-resources"),
    {
      id: "ca-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like moving water, wind, sunlight, heat inside Earth, oil and gas, and how using them affects the environment, with examples from California's solar farms, wind farms and geothermal plants.",
      standards: [
        "4-ESS3-1",
        "energy and fuels come from natural resources, and their use affects the environment",
      ],
    },
    [
      [
        "Large solar farms in California's deserts make electricity from…",
        "sunlight",
        ["coal", "candles", "ocean salt"],
        "Deserts get lots of sun.",
      ],
      [
        "Wind turbines in windy mountain passes turn because of…",
        "moving air",
        ["sunlight only", "oil", "snow"],
        "Wind is moving air.",
      ],
      [
        "Geothermal power plants in California use…",
        "heat from inside Earth",
        ["moonlight", "ice", "sand"],
        "Geo means Earth.",
      ],
      [
        "Dams on Sierra Nevada rivers can make electricity from…",
        "moving water",
        ["burning trees", "batteries only", "volcanoes"],
        "This is hydropower.",
        true,
      ],
      [
        "Which energy resource will not run out?",
        "Sunlight",
        ["Oil", "Natural gas", "Coal"],
        "It is renewable.",
        true,
      ],
    ],
  ),
];
