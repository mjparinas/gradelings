import type { Unit } from "../../types";
import { SCIENCE_6 as OREGON_6 } from "../../oregon/units/science-68";
import { SCIENCE_6 } from "../../washington/units/science-68";
import { copyOf, from } from "./kit";

// California copies of Washington and Oregon science units built around Pacific Northwest places. Each keeps the
// original's questions, leaves out the ones about Washington, Oregon or Puget Sound, and adds California items: the
// Sierra Nevada, the Central Valley, the San Andreas Fault, kelp forests and the La Brea Tar Pits. Their own `ca-` ids
// keep California progress apart from the originals.

export const SCIENCE_COPIES: Unit[] = [
  copyOf(
    from(SCIENCE_6, "wa-g6-weather"),
    {
      id: "ca-g6-weather",
      title: "Weather Systems",
      emoji: "🌧️",
      blurb: "Air masses, fronts and the water cycle.",
      parentNote:
        "Practices how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, including the Sierra Nevada's rain shadow and the atmospheric rivers that bring California's winter storms.",
      standards: [
        "MS-ESS2-4; MS-ESS2-5",
        "the water cycle driven by sunlight and gravity, and how air masses cause weather changes",
      ],
    },
    [
      [
        "Which way do most storms move across California?",
        "From the Pacific Ocean eastward",
        [
          "From the desert to the ocean",
          "Straight down",
          "From south to north only",
        ],
        "Westerly winds.",
      ],
      [
        "An atmospheric river is…",
        "a long band of moist air that brings heavy rain or snow",
        [
          "a river in the sky made of ice",
          "a dry wind",
          "an underground stream",
        ],
        "It carries water vapor from the ocean.",
      ],
      [
        "Why is the west side of the Sierra Nevada wetter than the east side?",
        "Moist ocean air rises, cools and rains on the west side",
        [
          "The east side is closer to the ocean",
          "The sun never shines in the west",
          "Wind only blows east to west",
        ],
        "A rain shadow.",
        true,
      ],
      [
        "Hot, dry Santa Ana winds blow toward the coast from…",
        "the deserts inland",
        ["the ocean", "the North Pole", "a lake"],
        "Desert air is dry.",
        true,
      ],
    ],
  ),
  copyOf(
    from(SCIENCE_6, "wa-g6-climate"),
    {
      id: "ca-g6-climate",
      title: "Climate & Climate Change",
      emoji: "🌍",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices how latitude, oceans, mountains and winds shape regional climate, such as California's mild coast and dry deserts, and the evidence for and causes of rising global temperatures.",
      standards: [
        "MS-ESS2-6; MS-ESS3-5",
        "what shapes regional climate, and the causes of rising global temperatures",
      ],
    },
    [
      [
        "Coastal cities like San Diego have mild winters because…",
        "the ocean keeps temperatures steady",
        [
          "they are high in the mountains",
          "they are near the equator",
          "there is no wind",
        ],
        "Water changes temperature slowly.",
      ],
      [
        "Smaller snowpack in the Sierra Nevada means…",
        "less water in rivers in summer",
        ["more water in summer", "no change in rivers", "rivers flow uphill"],
        "Snowmelt feeds rivers.",
      ],
      [
        "The desert east of the Sierra Nevada is dry mainly because of…",
        "the mountains' rain shadow",
        ["being closer to the ocean", "glaciers", "the equator"],
        "Mountains block moist air.",
        true,
      ],
      [
        "A cold ocean current along California's coast makes summers there…",
        "cool and foggy",
        ["hot and humid", "snowy", "stormy every day"],
        "Cold water cools the air.",
        true,
      ],
      [
        "Longer, hotter dry seasons in California raise the risk of…",
        "wildfires",
        ["blizzards", "icebergs", "monsoon floods"],
        "Dry plants burn easily.",
        true,
      ],
    ],
  ),
  copyOf(
    from(OREGON_6, "or-g6-growth"),
    {
      id: "ca-g6-growth",
      title: "Growing & Reproducing",
      emoji: "🌸",
      blurb: "Flowers, nests, genes, sunlight and copies of parents.",
      parentNote:
        "Practices how animal behaviors and plant structures help reproduction, how environment and genes affect growth, and how asexual and sexual reproduction differ. California places these middle school standards in 6th grade.",
      standards: [
        "MS-LS1-4; MS-LS1-5; MS-LS3-2",
        "behaviors and structures that help organisms reproduce, what affects growth, and asexual versus sexual reproduction",
      ],
    },
    [
      [
        "Almond trees in California's Central Valley are pollinated mainly by…",
        "bees",
        ["fish", "earthworms", "bats only"],
        "Bees carry pollen from flower to flower.",
      ],
      [
        "Monarch butterflies gather in coastal California groves in winter. This behavior helps them…",
        "survive the cold months",
        ["make new flowers", "grow gills", "turn into caterpillars"],
        "Clustering keeps them safe.",
        true,
      ],
    ],
  ),
];
