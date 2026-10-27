import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g6";
import { copyOf, from } from "./kit";

// Rhode Island Grade 6 science: copies of California's weather, climate and growth units without their California places,
// with Rhode Island examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_6: Unit[] = [
  copyOf(
    from(CA, "ca-g6-weather"),
    {
      id: "ri-g6-weather",
      title: "Weather Systems",
      emoji: "🌧️",
      blurb: "Air masses, fronts and the water cycle.",
      parentNote:
        "Practices how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, with Rhode Island examples such as nor'easters, sea breezes and summer thunderstorms.",
      standards: ["MS-ESS2-4; MS-ESS2-5", "the water cycle driven by sunlight and gravity, and how air masses cause weather changes"],
    },
    [
      ["In a nor'easter, moist air from the Atlantic meets cold air over New England. In winter this often brings…", "heavy snow", ["clear, calm skies", "a glacier", "an earthquake"], "Rising moist air cools and its water vapor condenses."],
      ["On a hot summer afternoon, cooler air moving from Narragansett Bay onto the land is a…", "sea breeze", ["cold front", "hurricane", "jet stream"], "Land heats up faster than water."],
      ["When a cold front passes through Providence, the temperature usually…", "drops", ["rises sharply", "stays the same", "doubles"], "Cold air pushes in behind the front."],
      ["What makes water evaporate from the ocean?", "energy from the sun", ["gravity", "the wind only", "the Moon"], "Sunlight heats the water."],
      ["What pulls rain and snow back down to the ground?", "gravity", ["sunlight", "evaporation", "air pressure only"], "Gravity drives precipitation and runoff."],
      ["Falling air pressure in a weather report often means…", "stormy weather is coming", ["clear weather is coming", "an earthquake is near", "the sun is closer"], "Low pressure brings clouds and rain.", true],
      ["Rain running off streets into the Pawtuxet River and on to the bay is the water cycle's…", "runoff", ["evaporation", "condensation", "freezing"], "Gravity pulls water downhill.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-climate"),
    {
      id: "ri-g6-climate",
      title: "Climate & Climate Change",
      emoji: "🌍",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices how latitude, the ocean, elevation and winds shape regional climate, such as the milder winters along Rhode Island's coast, and the causes of rising global temperatures and sea level.",
      standards: ["MS-ESS2-6; MS-ESS3-5", "what shapes regional climate, and the causes of rising global temperatures"],
    },
    [
      ["Why are winters on Block Island usually milder than in towns far from the coast?", "the ocean keeps the island's air milder", ["it is closer to the moon", "it is higher up", "it has more cities"], "Water warms and cools slowly."],
      ["Rhode Island is far from the equator, so it has…", "warm summers and cold winters", ["the same temperature all year", "no seasons", "only rain"], "Latitude shapes how much sunlight a place gets."],
      ["Warm water carried north by the Gulf Stream helps make New England's coast…", "milder than it would be otherwise", ["colder than the Arctic", "a desert", "free of storms"], "Ocean currents move heat."],
      ["Burning fossil fuels adds which gas that traps heat?", "carbon dioxide", ["oxygen", "helium", "nitrogen only"], "It is a greenhouse gas."],
      ["Planting trees can help slow climate change because trees…", "take in carbon dioxide", ["make the sun cooler", "produce coal", "stop the wind"], "Plants use carbon dioxide to grow."],
      ["Climate is different from weather because climate is…", "the pattern over many years", ["what happens today", "only about rain", "only about wind"], "Weather is short term.", true],
      ["As Earth warms, sea level along Rhode Island's coast is rising because…", "ice melts and warmer water takes up more space", ["the land is sinking into lava", "the moon is closer", "it rains salt water"], "Melting ice and expanding water both raise the sea.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-growth"),
    {
      id: "ri-g6-growth",
      title: "Growing & Reproducing",
      emoji: "🌸",
      blurb: "Flowers, nests, genes, sunlight and copies of parents.",
      parentNote:
        "Practices how animal behaviors and plant structures help reproduction, how environment and genes affect growth, and asexual versus sexual reproduction, with Rhode Island examples like the violet, the red maple and the ospreys that nest along the bay.",
      standards: ["MS-LS1-4; MS-LS1-5; MS-LS3-2", "behaviors and structures that help organisms reproduce, what affects growth, and asexual versus sexual reproduction"],
    },
    [
      ["Bees visit violets, Rhode Island's state flower, and carry pollen from flower to flower. This helps the violets…", "make seeds", ["stay warm", "grow roots", "hide from rabbits"], "Pollination leads to seeds."],
      ["The seeds of a red maple, Rhode Island's state tree, have wings so they can be carried by…", "the wind", ["fish", "snow only", "earthworms"], "Winged seeds spin as they fall."],
      ["Corn in a garden grows taller in a sunny summer with plenty of rain. This shows growth depends on…", "the environment", ["only genes", "the moon", "the color of the seed"], "Water and light affect growth."],
      ["Ospreys building a large nest together on a platform near the bay is a…", "behavior that helps reproduction", ["kind of pollination", "kind of root", "way to make seeds"], "Parents prepare a safe place for their young."],
      ["Offspring from sexual reproduction get genes from…", "two parents", ["one parent", "no parents", "only the soil"], "Each parent gives half."],
      ["A potato growing from a piece of potato is…", "asexual reproduction", ["sexual reproduction", "pollination", "migration"], "The new plant is a copy of the parent.", true],
      ["Why do gardeners save seeds from the plants that grew best?", "offspring inherit useful traits", ["seeds forget their parents", "bigger seeds are always better", "it changes the weather"], "Traits pass from parents to offspring.", true],
    ],
  ),
];
