import type { Unit } from "../../types";
import { SCIENCE_6 as OREGON_6 } from "../../oregon/units/science-68";
import { SCIENCE_6 } from "../../washington/units/science-68";
import { bankUnit } from "../own";
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

// California-written 6th grade units.
export const OWN_SCIENCE: Unit[] = [
  bankUnit({
    id: "ca-g6-human-impact",
    title: "Monitor & Reduce Our Impact",
    emoji: "🔎",
    blurb: "Measure a human impact, then design ways to shrink it.",
    parentNote:
      "Practices designing a way to monitor a human impact on the environment, such as polluted runoff, air quality, plastic litter or water use, choosing what to measure, reading the data, and judging which solution best reduces the impact.",
    standards: [
      "MS-ESS3-3",
      "designing ways to monitor and minimize a human impact on the environment",
    ],
    items: [
      [
        "To find out if a creek is getting more polluted, scientists should first…",
        "measure the water's quality at the same spots over time",
        ["guess from one photo", "ask which creek looks nicest", "measure only once"],
        "Monitoring means repeated measurements.",
      ],
      [
        "Which measurement best shows how much smog is in a city's air?",
        "Readings from air-quality sensors each day",
        ["The number of cars that are red", "How tall the buildings are", "The day of the week"],
        "Measure the air itself.",
      ],
      [
        "Storm drains in many cities carry rainwater…",
        "straight to creeks and the ocean without treatment",
        ["to a water treatment plant first", "back up into the clouds", "into people's homes"],
        "That is why litter in gutters reaches the sea.",
      ],
      [
        "Which change would most reduce trash reaching the ocean from a city's storm drains?",
        "Screens on storm drains that catch litter",
        ["Washing more litter into gutters", "Removing trash cans", "Painting the drains"],
        "Catch it before it reaches the water.",
      ],
      [
        "A school wants to cut its water use. What should it monitor?",
        "Water meter readings each week",
        ["How many windows it has", "The color of the sinks", "The number of trees on the street"],
        "Measure the thing you want to reduce.",
      ],
      [
        "Volunteers count the plastic pieces on 100 m of beach every month. This is…",
        "monitoring a human impact",
        ["a one-time guess", "building a dam", "forecasting weather"],
        "Repeated counts show change.",
      ],
      [
        "Why do scientists test water at the same places each time?",
        "So changes come from the water, not from where they sampled",
        ["To save shoes", "Because other places have no water", "To make the data look better"],
        "Keep the method the same.",
      ],
      [
        "Which is a human impact on the environment?",
        "Fertilizer running off farms into rivers",
        ["Rain falling on a forest", "A volcano erupting", "Leaves changing color"],
        "Caused by people.",
      ],
      [
        "Extra fertilizer in a lake can cause…",
        "algae to grow fast and use up oxygen fish need",
        ["more clean water", "colder water", "fish to grow wings"],
        "Nutrients feed algae.",
      ],
      [
        "Planting strips of grass and shrubs along a stream helps by…",
        "filtering runoff before it reaches the water",
        ["making the water warmer", "adding more mud", "blocking all rain"],
        "Plants catch soil and pollution.",
      ],
      [
        "Drip irrigation on farms reduces…",
        "the amount of water wasted",
        ["the amount of sunlight", "the number of crops", "rainfall"],
        "Water goes right to the roots.",
      ],
      [
        "Which design would reduce the energy a home uses for cooling?",
        "Shade trees and insulation",
        ["Leaving windows open on hot afternoons with the air conditioner on", "Dark roofs that soak up heat", "Removing insulation"],
        "Keep heat out.",
      ],
      [
        "A city counts how many people ride the bus each month after adding new routes. It is monitoring…",
        "whether a solution to car pollution is working",
        ["the weather", "the number of buses only", "how fast buses are painted"],
        "Data shows if the solution works.",
      ],
      [
        "Which is a good criterion for a solution to plastic litter at a park?",
        "It reduces litter found in weekly counts",
        ["It uses the most plastic", "It is the brightest color", "It costs the most"],
        "Measure success.",
      ],
      [
        "Wildlife crossings under highways reduce…",
        "animals being hit by cars",
        ["rainfall", "the number of roads", "sunlight"],
        "A safe path across.",
      ],
      [
        "Which tool helps monitor how much forest is cut down over many years?",
        "Satellite images taken at regular times",
        ["A thermometer", "A compass", "A single postcard"],
        "See large areas from above.",
      ],
      [
        "Before a cleanup, a creek had 40 pieces of trash per 10 m. After, it had 12. The impact was…",
        "reduced",
        ["increased", "unchanged", "impossible to tell"],
        "40 down to 12.",
        true,
      ],
      [
        "Two cities add bike lanes. City A tracks bike trips; City B never measures. Which can tell if its plan worked?",
        "City A",
        ["City B", "Both equally", "Neither"],
        "You need data to judge.",
        true,
      ],
      [
        "A sensor near a freeway shows air pollution peaks at 8 a.m. and 5 p.m. The likely cause is…",
        "rush-hour traffic",
        ["the moon", "ocean tides", "birds migrating"],
        "When do most cars drive?",
        true,
      ],
      [
        "Plan A cuts a factory's water use by 30% for $2 million. Plan B cuts it 10% for the same cost. Which reduces the impact more?",
        "Plan A",
        ["Plan B", "They are the same", "Neither reduces it"],
        "Compare the percentages.",
        true,
      ],
      [
        "To test if a rain garden cleans runoff, you should measure the water…",
        "before it enters and after it leaves the garden",
        ["only after a sunny week", "only before it enters", "at a different city"],
        "Compare in and out.",
        true,
      ],
      [
        "Why might engineers monitor a solution for years, not days?",
        "Some effects show up only slowly",
        ["Data gets better if you wait", "To avoid any change", "Short tests are not allowed"],
        "Long-term effects matter.",
        true,
      ],
      [
        "A beach cleanup removes trash, but the amount comes back each week. A better long-term solution targets…",
        "where the trash comes from",
        ["only bigger cleanups", "painting the beach", "closing the ocean"],
        "Stop it at the source.",
        true,
      ],
      [
        "A town's monitoring shows nitrate in wells rising each year near farms. A good next step is…",
        "work with farmers to use fertilizer more carefully and keep testing",
        ["stop testing the wells", "add more fertilizer", "dig the wells deeper and ignore the data"],
        "Reduce the source and keep monitoring.",
        true,
      ],
      [
        "Why is it useful to monitor a place before a new road is built?",
        "To compare the impact afterward with how it was before",
        ["To slow down the road", "Data before is never useful", "To choose the road's color"],
        "A baseline lets you see change.",
        true,
      ],
    ],
  }),
];
