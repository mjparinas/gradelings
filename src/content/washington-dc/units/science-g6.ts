import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g6";
import { copyOf, from } from "./kit";

// Washington, DC Grade 6 science: copies of California's weather, climate and growth units without their California
// places, with DC examples added (cold and humid air masses, summer storms, the city's heat island, the cherry trees'
// bloom and the wood thrush, DC's official bird).

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_6: Unit[] = [
  copyOf(
    from(CA, "ca-g6-weather"),
    {
      id: "dc-g6-weather",
      title: "Weather Systems",
      emoji: "🌧️",
      blurb: "Air masses, fronts and the water cycle.",
      parentNote:
        "Practices how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, with Washington, DC examples such as winter snowstorms, cold fronts and humid summer thunderstorms.",
      standards: ["MS-ESS2-4; MS-ESS2-5", "the water cycle driven by sunlight and gravity, and how air masses cause weather changes"],
    },
    [
      ["Cold, dry air that sweeps into Washington, DC in winter usually comes from…", "the far north and the Arctic", ["the Gulf of Mexico", "the equator", "the desert"], "Air masses take on the weather of the place they form."],
      ["Hot, humid summer air over DC rises and cools. What often falls?", "rain from thunderstorms", ["sand", "lava", "salt"], "Rising air cools and its water vapor condenses."],
      ["When a cold front passes through Washington, DC, the temperature usually…", "drops", ["rises sharply", "stays the same", "doubles"], "Cold air pushes in behind the front."],
      ["What makes water evaporate from the Potomac River?", "energy from the sun", ["gravity", "the wind only", "the Moon"], "Sunlight heats the water."],
      ["What pulls rain and snow back down to the ground?", "gravity", ["sunlight", "evaporation", "air pressure only"], "Gravity drives precipitation and runoff."],
      ["Falling air pressure in a weather report often means…", "stormy weather is coming", ["clear weather is coming", "an earthquake is near", "the sun is closer"], "Low pressure brings clouds and rain.", true],
      ["Melted snow flows over DC's streets and down storm drains into Rock Creek. That is the water cycle's…", "runoff", ["evaporation", "condensation", "freezing"], "Gravity pulls water downhill.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-climate"),
    {
      id: "dc-g6-climate",
      title: "Climate & Climate Change",
      emoji: "🌍",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices how latitude, mountains, elevation, large lakes and winds shape regional climate, such as the way Washington, DC's paved, built-up center stays warmer than its leafy parks, and the causes of rising global temperatures.",
      standards: ["MS-ESS2-6; MS-ESS3-5", "what shapes regional climate, and the causes of rising global temperatures"],
    },
    [
      ["Why is the top of a tall mountain colder than the valleys around it?", "it is much higher up", ["it is closer to the equator", "it is next to the ocean", "it has more cities"], "Air gets colder as you climb."],
      ["On summer nights, downtown Washington, DC often stays warmer than the shady parts of Rock Creek Park because…", "pavement and buildings store the day's heat", ["it is higher up", "it is farther north", "it has more trees"], "Cities make heat islands."],
      ["Cities far north of Washington, DC usually have colder winters mostly because they are…", "farther from the equator", ["closer to the moon", "next to the equator", "covered in sand"], "Latitude shapes climate."],
      ["Burning fossil fuels adds which gas that traps heat?", "carbon dioxide", ["oxygen", "helium", "nitrogen only"], "It is a greenhouse gas."],
      ["Planting trees can help slow climate change because trees…", "take in carbon dioxide", ["make the sun cooler", "produce coal", "stop the wind"], "Plants use carbon dioxide to grow."],
      ["Climate is different from weather because climate is…", "the pattern over many years", ["what happens today", "only about rain", "only about wind"], "Weather is short term.", true],
      ["Records show DC's cherry trees now reach peak bloom earlier in spring than a century ago. This fits a pattern of…", "warmer temperatures", ["a smaller sun", "shorter years", "more moons"], "Warmth makes buds open sooner.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-growth"),
    {
      id: "dc-g6-growth",
      title: "Growing & Reproducing",
      emoji: "🌸",
      blurb: "Flowers, nests, genes, sunlight and copies of parents.",
      parentNote:
        "Practices how animal behaviors and plant structures help reproduction, how environment and genes affect growth, and asexual versus sexual reproduction, with Washington, DC examples like bees in community gardens, the winged seeds of red maples and the singing wood thrush.",
      standards: ["MS-LS1-4; MS-LS1-5; MS-LS3-2", "behaviors and structures that help organisms reproduce, what affects growth, and asexual versus sexual reproduction"],
    },
    [
      ["Bees carry pollen between tomato flowers in a DC community garden. This helps the plants…", "make fruit with seeds", ["stay warm", "grow roots", "hide from deer"], "Pollinated flowers become fruit."],
      ["Red maple seeds have wings that help them…", "spin away from the parent tree on the wind", ["swim in the river", "stick to fur", "dig into the soil"], "Seeds that land far away have more room to grow."],
      ["Garden plants grow bigger in a sunny, well-watered spot than in a dry, shady one. This shows growth depends on…", "the environment", ["only genes", "the moon", "the color of the seed"], "Water, light and nutrients affect growth."],
      ["A male wood thrush, DC's official bird, sings in spring. His song is a…", "behavior that helps reproduction", ["kind of pollination", "kind of root", "way to make seeds"], "Birds sing to attract mates and claim a home."],
      ["Offspring from sexual reproduction get genes from…", "two parents", ["one parent", "no parents", "only the soil"], "Each parent gives half."],
      ["A potato growing from a piece of potato is…", "asexual reproduction", ["sexual reproduction", "pollination", "migration"], "The new plant is a copy of the parent.", true],
      ["New raspberry canes often sprout from the roots of an old plant. The new canes are…", "copies of the parent", ["mixes of two parents", "a different species", "grown from pollen"], "Growing from roots is asexual reproduction.", true],
    ],
  ),
];
