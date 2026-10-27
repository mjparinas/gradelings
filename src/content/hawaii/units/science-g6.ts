import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g6";
import { copyOf, from } from "./kit";

// Hawaiʻi Grade 6 science: copies of California's weather, climate and growth units without their California places,
// with Hawaiʻi examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_6: Unit[] = [
  copyOf(
    from(CA, "ca-g6-weather"),
    {
      id: "hi-g6-weather",
      title: "Weather Systems",
      emoji: "🌧️",
      blurb: "Air masses, fronts and the water cycle.",
      parentNote:
        "Practices how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, with Hawaiʻi examples such as trade-wind showers on windward slopes, winter cold fronts and kona storms.",
      standards: ["MS-ESS2-4; MS-ESS2-5", "the water cycle driven by sunlight and gravity, and how air masses cause weather changes"],
    },
    [
      ["Moist trade winds rise up the windward slopes of the Koʻolau Mountains and…", "cool and drop rain", ["warm and make snow", "turn into lava", "stop blowing"], "Rising air cools and its water vapor condenses."],
      ["When the trade winds stop and winds blow from the south, Hawaiʻi often gets humid weather and storms called…", "kona storms", ["blizzards", "monsoon dust storms", "nor'easters"], "Kona means leeward."],
      ["When a winter cold front passes over Kauaʻi, the weather usually brings…", "showers and cooler, gusty winds", ["a heat wave", "an earthquake", "snow on the beaches"], "Cold air pushes in behind the front."],
      ["What makes water evaporate from the ocean around Hawaiʻi?", "energy from the sun", ["gravity", "the wind only", "the Moon"], "Sunlight heats the water."],
      ["What pulls rain back down the mountain streams to the sea?", "gravity", ["sunlight", "evaporation", "air pressure only"], "Gravity drives precipitation and runoff."],
      ["Falling air pressure in a weather report often means…", "stormy weather is coming", ["clear weather is coming", "an earthquake is near", "the sun is closer"], "Low pressure brings clouds and rain.", true],
      ["Clouds that drift up a mountain and leave drops on the leaves of rain-forest trees are adding water by…", "fog drip", ["evaporation", "melting", "erosion"], "Forests catch water from clouds.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-climate"),
    {
      id: "hi-g6-climate",
      title: "Climate & Climate Change",
      emoji: "🌍",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices how latitude, mountains, elevation, ocean and winds shape regional climate, such as Hawaiʻi's wet windward and dry leeward sides and its cold summits, and the causes of rising global temperatures and rising seas.",
      standards: ["MS-ESS2-6; MS-ESS3-5", "what shapes regional climate, and the causes of rising global temperatures"],
    },
    [
      ["Why is the top of Maunakea so much colder than the beach below?", "it is much higher up", ["it is closer to the equator", "it is next to the ocean", "it has more cities"], "Air gets colder as you climb."],
      ["Hawaiʻi is surrounded by ocean, so its temperatures…", "change little from season to season", ["swing wildly from hot to cold", "have no daytime", "drop below freezing at the beach"], "Oceans keep island climates mild."],
      ["Mount Waiʻaleʻale on Kauaʻi is one of the wettest places on Earth because…", "trade winds push moist air up its slopes all year", ["it is in a desert", "it is far from the ocean", "it is below sea level"], "Mountains wring rain out of the air."],
      ["Burning fossil fuels adds which gas that traps heat?", "carbon dioxide", ["oxygen", "helium", "nitrogen only"], "It is a greenhouse gas."],
      ["Planting native trees can help slow climate change because trees…", "take in carbon dioxide", ["make the sun cooler", "produce coal", "stop the wind"], "Plants use carbon dioxide to grow."],
      ["Climate is different from weather because climate is…", "the pattern over many years", ["what happens today", "only about rain", "only about wind"], "Weather is short term.", true],
      ["Rising global temperatures threaten Hawaiʻi's beaches because warmer oceans…", "expand and glaciers melt, raising sea level", ["shrink and lower the sea", "stop all waves", "freeze the shore"], "Higher seas wash beaches away.", true],
      ["Warmer ocean water can make corals turn white and starve. This is called…", "coral bleaching", ["coral painting", "reef building", "photosynthesis"], "Stressed corals lose the algae that feed them.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-growth"),
    {
      id: "hi-g6-growth",
      title: "Growing & Reproducing",
      emoji: "🌸",
      blurb: "Flowers, nests, genes, sunlight and copies of parents.",
      parentNote:
        "Practices how animal behaviors and plant structures help reproduction, how environment and genes affect growth, and asexual versus sexual reproduction, with Hawaiʻi examples like honeycreepers and the curved flowers they feed on, kalo grown from cuttings and nesting seabirds.",
      standards: ["MS-LS1-4; MS-LS1-5; MS-LS3-2", "behaviors and structures that help organisms reproduce, what affects growth, and asexual versus sexual reproduction"],
    },
    [
      ["The ʻiʻiwi, a Hawaiian honeycreeper with a long curved bill, carries pollen between curved flowers as it drinks nectar. This helps the plants…", "make seeds", ["stay warm", "grow roots", "hide from rats"], "Bird and flower depend on each other."],
      ["Farmers grow new kalo by planting the top of an old plant, called a huli. This is…", "asexual reproduction", ["sexual reproduction", "pollination", "migration"], "The new plant is a copy of the parent."],
      ["Native plants grow fast after heavy winter rains. This shows growth depends on…", "the environment", ["only genes", "the moon", "the color of the seed"], "Water and nutrients affect growth."],
      ["Laysan albatross pairs dance with bill clacks and sky calls before nesting. This is a…", "behavior that helps reproduction", ["kind of pollination", "kind of root", "way to make seeds"], "Animals use songs and displays."],
      ["Offspring from sexual reproduction get genes from…", "two parents", ["one parent", "no parents", "only the soil"], "Each parent gives half."],
      ["A green sea turtle comes back to a beach to lay her eggs in the sand. Warmer sand produces more…", "female hatchlings", ["male hatchlings", "eggs", "turtles that fly"], "Nest temperature affects how they develop.", true],
      ["Why do coffee farmers in Kona plant seeds from the trees that grew best?", "offspring inherit useful traits", ["seeds forget their parents", "bigger seeds are always better", "it changes the weather"], "Traits pass from parents to offspring.", true],
    ],
  ),
];
