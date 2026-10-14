import type { Unit } from "../../types";
import { SCIENCE_6 as OREGON_6 } from "../../oregon/units/science-68";
import { SCIENCE_6 } from "../../washington/units/science-68";
import { copyOf, from } from "./kit";

// New York copies of Washington and Oregon science units built around Pacific Northwest places. Each keeps the
// original's questions, leaves out the ones about Washington, Oregon or California, and adds New York items: lake-effect
// snow, nor'easters, the Atlantic coast, the Adirondacks and New York's apple orchards. Their own `ny-` ids keep New York
// progress apart from the originals.
export const UNITS: Unit[] = [
  copyOf(
    from(SCIENCE_6, "wa-g6-weather"),
    {
      id: "ny-g6-weather",
      title: "Weather Systems",
      emoji: "🌨️",
      blurb: "Air masses, fronts and the water cycle.",
      parentNote:
        "Practices how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, including New York's lake-effect snow and nor'easters.",
      standards: [
        "MS-ESS2-4; MS-ESS2-5",
        "the water cycle driven by sunlight and gravity, and how air masses cause weather changes",
      ],
    },
    [
      ["Which way do most weather systems move across New York?", "From west to east", ["From east to west", "Straight down", "Only from north to south"], "Westerly winds carry them."],
      ["Lake-effect snow forms when cold, dry air crosses a warmer lake and…", "picks up moisture that falls as snow downwind", ["freezes the whole lake at once", "turns into a hurricane", "clears away all clouds"], "The lake adds water vapor."],
      ["A nor'easter is a coastal storm named for…", "its strong winds from the northeast", ["the North Pole", "a ship", "its warm, calm air"], "Look at the name.", true],
      ["When a cold front passes New York in summer, the weather often…", "turns stormy, then cooler and drier", ["gets hotter and more humid for weeks", "stays exactly the same", "turns to snow"], "Cold air pushes under warm air.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_6, "wa-g6-climate"),
    {
      id: "ny-g6-climate",
      title: "Climate & Climate Change",
      emoji: "🌍",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices how latitude, oceans, mountains, lakes and winds shape regional climate, such as the milder winters on Long Island and the colder Adirondacks, and the evidence for and causes of rising global temperatures.",
      standards: ["MS-ESS2-6; MS-ESS3-5", "what shapes regional climate, and the causes of rising global temperatures"],
    },
    [
      ["Long Island has milder winters than places far inland because…", "the ocean keeps temperatures steadier", ["it is higher up", "it is near the equator", "there is no wind there"], "Water changes temperature slowly."],
      ["Lake-effect snow makes places just east of Lake Ontario some of the…", "snowiest places in the eastern United States", ["driest places in the country", "warmest places in New York", "sunniest places in winter"], "Wind off the lake brings snow."],
      ["Rising sea level worries New York City because…", "much of the city is low land by the water", ["the city is on a mountain", "the ocean is shrinking", "the city is in a desert"], "Low land floods first."],
      ["The Adirondacks are colder than New York City mainly because they are…", "higher and farther north", ["closer to the ocean", "in a desert", "nearer the equator"], "Altitude and latitude.", true],
      ["Lakes in New York staying frozen for fewer days each winter is evidence of…", "a warming climate", ["a cooling climate", "more volcanoes", "the moon getting closer"], "Less ice means warmer winters.", true],
    ],
  ),
  copyOf(
    from(OREGON_6, "or-g6-growth"),
    {
      id: "ny-g6-growth",
      title: "Growing & Reproducing",
      emoji: "🌸",
      blurb: "Flowers, nests, genes, sunlight and copies of parents.",
      parentNote:
        "Practices how animal behaviors and plant structures help reproduction, how environment and genes affect growth, and how asexual and sexual reproduction differ.",
      standards: [
        "MS-LS1-4; MS-LS1-5; MS-LS3-2",
        "behaviors and structures that help organisms reproduce, what affects growth, and asexual versus sexual reproduction",
      ],
    },
    [
      ["Apple trees in New York orchards are pollinated mainly by…", "bees", ["fish", "earthworms", "snails"], "Bees carry pollen from flower to flower."],
      ["A maple seedling grows taller in a sunny clearing than in deep shade. This shows growth is affected by…", "the environment", ["only its genes", "the moon", "the color of its leaves"], "Sunlight is part of its surroundings.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_6, "wa-g6-design"),
    {
      id: "ny-g6-design",
      title: "Engineering Design",
      emoji: "🛠️",
      blurb: "Define the problem, test ideas, improve the design.",
      parentNote:
        "Practices defining a design problem with criteria and constraints, evaluating competing solutions, analyzing test data, and improving a design step by step.",
      standards: [
        "MS-ETS1-1; MS-ETS1-2; MS-ETS1-3; MS-ETS1-4",
        "defining design problems, evaluating and testing solutions, and improving designs",
      ],
    },
    [
      ["Which constraint might matter for a bridge in upstate New York?", "It must handle heavy snow and ice", ["It never faces any weather", "It must be built in one hour", "It must float in the air"], "Think about winters there."],
      ["Engineers design a sea wall for a New York City shoreline. A criterion could be…", "It holds back storm surge water", ["It costs as much as possible", "It blocks all sunlight", "It makes waves bigger"], "A criterion says what success looks like.", true],
    ],
  ),
];
