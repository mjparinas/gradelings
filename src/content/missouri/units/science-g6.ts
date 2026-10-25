import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g6";
import { SCIENCE_6 as WASHINGTON_SCIENCE_6 } from "../../washington/units/science-68";
import { copyOf, from, localCopy } from "./kit";

// Missouri Grade 6 science: copies of California's weather, climate and growth units and Washington's engineering
// design unit without their own states' places, with Missouri examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_6: Unit[] = [
  copyOf(
    from(CA, "ca-g6-weather"),
    {
      id: "mo-g6-weather",
      title: "Weather Systems",
      emoji: "🌧️",
      blurb: "Air masses, fronts and the water cycle.",
      parentNote:
        "Practices how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, with Missouri examples such as spring thunderstorms and summer heat waves.",
      standards: ["6-8.ESS2.C.1; 6-8.ESS2.C.2", "the water cycle driven by sunlight and gravity, and how air masses cause changes in weather"],
    },
    [
      ["Warm, moist air from the Gulf meets cold, dry air from the north over Missouri. What often forms?", "thunderstorms", ["clear, calm skies", "a desert", "an earthquake"], "Fronts where air masses meet bring storms."],
      ["When a cold front passes through Columbia, the temperature usually…", "drops", ["rises sharply", "stays the same", "doubles"], "Cold air pushes in behind the front."],
      ["What makes water evaporate from the Lake of the Ozarks?", "energy from the sun", ["gravity", "the wind only", "the Moon"], "Sunlight heats the water."],
      ["What pulls rain and snow back down to the ground?", "gravity", ["sunlight", "evaporation", "air pressure only"], "Gravity drives precipitation and runoff."],
      ["A warm, humid air mass from the Gulf brings Missouri…", "muggy weather", ["dry, cold weather", "snowstorms only", "no clouds ever"], "Air masses carry the weather of where they formed."],
      ["Falling air pressure in a weather report often means…", "stormy weather is coming", ["clear weather is coming", "an earthquake is near", "the sun is closer"], "Low pressure brings clouds and rain.", true],
      ["Why do tornado watches in Missouri come most often in spring?", "warm and cold air masses collide more often", ["the sun is farther away", "there is no wind in summer", "rivers are frozen"], "Clashing air masses make storms.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-climate"),
    {
      id: "mo-g6-climate",
      title: "Climate & Climate Change",
      emoji: "🌍",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices how latitude, distance from the ocean and winds shape regional climate, such as Missouri's continental climate, and the causes of rising global temperatures.",
      standards: ["6-8.ESS2.C.3; 6-8.ESS3.D.1", "what shapes regional climate, and the causes of rising global temperatures"],
    },
    [
      ["Missouri is far from any ocean, so its climate has…", "hot summers and cold winters", ["the same temperature all year", "no seasons", "only rain"], "Oceans keep coastal climates milder."],
      ["Why is the Bootheel usually warmer than northern Missouri?", "it is closer to the equator", ["it is higher up", "it has more snow", "it is next to the ocean"], "Latitude affects climate."],
      ["Winds that carry moist air north from the Gulf give Missouri…", "humid summers with plenty of rain", ["a desert climate", "snow all year", "no clouds"], "Winds move moisture from place to place."],
      ["Burning fossil fuels adds which gas that traps heat?", "carbon dioxide", ["oxygen", "helium", "nitrogen only"], "It is a greenhouse gas."],
      ["Planting trees can help slow climate change because trees…", "take in carbon dioxide", ["make the sun cooler", "produce coal", "stop the wind"], "Plants use carbon dioxide to grow."],
      ["Climate is different from weather because climate is…", "the pattern over many years", ["what happens today", "only about rain", "only about wind"], "Weather is short term.", true],
      ["Rising temperatures can bring Missouri heavier rainstorms because warmer air…", "holds more water vapor", ["holds less water", "stops evaporation", "freezes faster"], "Warm air can carry more moisture.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-growth"),
    {
      id: "mo-g6-growth",
      title: "Growing & Reproducing",
      emoji: "🌸",
      blurb: "Flowers, nests, genes, sunlight and copies of parents.",
      parentNote:
        "Practices how animal behaviors and plant structures help reproduction, and how environment and genes affect growth, with Missouri examples like prairie wildflowers, dogwoods and soybeans.",
      standards: ["6-8.LS1.B.1; 6-8.LS1.B.2", "behaviors and structures that help organisms reproduce, and how environment and genes affect growth"],
    },
    [
      ["Purple coneflowers on a Missouri prairie attract bees. This helps the plant…", "get pollinated", ["stay warm", "grow roots", "hide from deer"], "Bees carry pollen between flowers."],
      ["Corn pollen is carried from tassels to silks mostly by…", "the wind", ["birds", "bats", "rain only"], "Corn is wind-pollinated."],
      ["Soybeans planted in rich, wet soil grow better than soybeans in dry, poor soil. This shows growth depends on…", "the environment", ["only genes", "the moon", "the color of the seed"], "Water and nutrients affect growth."],
      ["An eastern bluebird, Missouri's state bird, singing to attract a mate is a…", "behavior that helps reproduction", ["kind of pollination", "kind of root", "way to make seeds"], "Animals use songs and displays."],
      ["Squirrels burying acorns they forget to dig up help oak trees…", "spread their seeds", ["make pollen", "grow leaves", "make flowers"], "Animals help plants spread."],
      ["Offspring from sexual reproduction get genes from…", "two parents", ["one parent", "no parents", "only the soil"], "Each parent gives half.", true],
      ["Why do farmers plant seeds from plants that grew best?", "offspring inherit useful traits", ["seeds forget their parents", "bigger seeds are always better", "it changes the weather"], "Traits pass from parents to offspring.", true],
    ],
  ),
  localCopy(
    from(WASHINGTON_SCIENCE_6, "wa-g6-design"),
    "mo-g6-design",
    ["6-8.ETS1.A.1; 6-8.ETS1.B.1; 6-8.ETS1.B.2; 6-8.ETS1.B.3", "defining design problems, evaluating and testing solutions, and improving designs"],
    [
      ["A limit on a design, like cost or size, is a…", "constraint", ["criterion", "prototype"], "Constraints limit what you can do."],
      ["What a design must do to succeed is its…", "criteria", ["constraints", "materials"], "Criteria say what success looks like."],
      ["A first model you build to test an idea is a…", "prototype", ["criterion", "conclusion"], "Prototypes are tested and improved."],
      ["Engineers building a bridge over the Missouri River test models to…", "find weak points before building", ["make it cost more", "skip the design"], "Testing shows what to improve."],
      ["Comparing two designs with the same test is fair only if you…", "change one thing at a time", ["change everything", "test only one design"], "Control the variables.", true],
      ["After a test shows a weak spot, engineers usually…", "improve the design and test again", ["give up", "hide the results"], "Design is a cycle.", true],
    ],
    {
      parentNote:
        "Practices the engineering design process: criteria and constraints, comparing solutions with a systematic method, testing prototypes and improving designs from the data.",
    },
  ),
];
