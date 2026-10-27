import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g6";
import { copyOf, from } from "./kit";

// North Dakota Grade 6 science: copies of California's weather, climate and growth units without their California places,
// with North Dakota examples added (cold fronts and blizzards, prairie thunderstorms, a continental climate, the prairie
// rose and the western meadowlark).

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_6: Unit[] = [
  copyOf(
    from(CA, "ca-g6-weather"),
    {
      id: "nd-g6-weather",
      title: "Weather Systems",
      emoji: "🌧️",
      blurb: "Air masses, fronts and the water cycle.",
      parentNote:
        "Practices how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, with North Dakota examples such as Arctic cold fronts, blizzards and summer thunderstorms on the prairie.",
      standards: ["MS-ESS2-4; MS-ESS2-5", "the water cycle driven by sunlight and gravity, and how air masses cause weather changes"],
    },
    [
      ["When a mass of cold, dry Arctic air sweeps across North Dakota, the temperature…", "drops quickly", ["rises quickly", "stays the same", "turns into rain"], "Cold air masses bring cold weather."],
      ["Warm, moist air moving north and meeting cooler air often brings summer…", "thunderstorms", ["blizzards", "frost", "sandstorms"], "Warm, wet air rises and makes storm clouds."],
      ["A blizzard needs falling or blowing snow and…", "strong winds", ["warm sunshine", "calm air", "high tide"], "Wind piles snow into drifts."],
      ["Water from lakes and wet fields turns into vapor when the sun warms it. This is…", "evaporation", ["condensation", "freezing", "erosion"], "Liquid turns into a gas."],
      ["Clouds form when water vapor cools and…", "condenses into droplets", ["evaporates", "melts", "turns into soil"], "Cooling turns gas back into liquid."],
      ["Gravity is what makes rain and snow…", "fall to the ground", ["rise into the sky", "stay in clouds", "turn into vapor"], "Gravity pulls water down."],
      ["The boundary where a cold air mass pushes under warm air is a…", "cold front", ["warm front", "jet stream", "rain shadow"], "Cold, heavy air wedges under warm air.", true],
      ["Why does the sun drive the water cycle?", "its energy heats water so it evaporates", ["it pulls water up by gravity", "it makes clouds out of light", "it freezes the oceans"], "Energy from sunlight causes evaporation.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-climate"),
    {
      id: "nd-g6-climate",
      title: "Climate & Climate Change",
      emoji: "🌍",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices how latitude, distance from the ocean, elevation and winds shape regional climate, such as North Dakota's cold winters and hot summers far from any ocean, and the causes of rising global temperatures.",
      standards: ["MS-ESS2-6; MS-ESS3-5", "what shapes regional climate, and the causes of rising global temperatures"],
    },
    [
      ["North Dakota is in the middle of the continent, far from oceans. Its climate has…", "very cold winters and hot summers", ["the same temperature all year", "warm winters and cool summers", "rain every day"], "Land heats and cools faster than water."],
      ["Places farther north, like North Dakota, get less direct sunlight in winter, so they are…", "colder", ["warmer", "rainier", "closer to the sun"], "Sunlight hits at a low angle."],
      ["Western North Dakota gets less rain than eastern North Dakota, so its land is…", "drier", ["wetter", "a rainforest", "under the sea"], "Less rain means drier land."],
      ["Gases like carbon dioxide trap heat near Earth. This is called the…", "greenhouse effect", ["water cycle", "rock cycle", "food chain"], "It keeps Earth warm."],
      ["Burning fossil fuels such as coal, oil and gas adds… to the air.", "carbon dioxide", ["oxygen only", "water only", "dust from space"], "This adds to the greenhouse effect."],
      ["Climate is…", "the usual weather of a place over many years", ["the weather today", "one storm", "a weather map"], "Weather changes daily; climate is the long pattern."],
      ["Why do coastal cities have milder winters than North Dakota cities at the same latitude?", "ocean water holds heat and releases it slowly", ["coasts are closer to the sun", "it never snows by oceans", "oceans make sunshine"], "Water changes temperature slowly.", true],
      ["Rising global temperatures can change where crops grow because…", "growing seasons and rainfall change", ["plants stop needing water", "soil turns to rock", "the sun moves"], "Farmers watch the climate closely.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-growth"),
    {
      id: "nd-g6-growth",
      title: "Growing & Reproducing",
      emoji: "🌸",
      blurb: "Flowers, nests, genes, sunlight and copies of parents.",
      parentNote:
        "Practices how animal behaviors and plant structures help reproduction, how environment and genes affect growth, and asexual versus sexual reproduction, with North Dakota examples like the wild prairie rose, sunflowers, the western meadowlark and prairie-chicken dances.",
      standards: ["MS-LS1-4; MS-LS1-5; MS-LS3-2", "behaviors and structures that help organisms reproduce, what affects growth, and asexual versus sexual reproduction"],
    },
    [
      ["The bright petals and sweet smell of the wild prairie rose, North Dakota's state flower, help it…", "attract bees that carry pollen", ["scare away rain", "dig roots", "make shade"], "Pollinators help flowers make seeds."],
      ["A male western meadowlark sings from a fence post in spring to…", "attract a mate and claim a territory", ["make it rain", "find water", "scare away the sun"], "Songs are a behavior that helps reproduction."],
      ["Prairie-chickens gather in spring on open ground, called a lek, where the males…", "dance and call to attract females", ["build dams", "dig burrows for winter", "eat snow"], "Their displays help them find mates."],
      ["A sunflower plant grows taller and makes more seeds when it has…", "plenty of sunlight, water and nutrients", ["no water", "only darkness", "frozen soil"], "The environment affects growth."],
      ["Potatoes can grow new plants from pieces of the potato. This is…", "asexual reproduction", ["sexual reproduction", "pollination", "migration"], "Only one parent is needed."],
      ["Offspring from sexual reproduction get genes from…", "two parents", ["one parent", "no parents", "the soil"], "Half from each parent."],
      ["Why are offspring from asexual reproduction exact copies of the parent?", "they get all their genes from one parent", ["they get genes from many parents", "the weather changes them", "they have no genes"], "One parent, same genes.", true],
      ["Two wheat plants with the same genes are grown in good soil and poor soil. Why do they grow differently?", "the environment affects growth", ["their genes changed", "one is a different species", "plants grow the same everywhere"], "Genes and environment both matter.", true],
    ],
  ),
];
