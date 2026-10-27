import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g6";
import { copyOf, from } from "./kit";

// Vermont Grade 6 science: copies of California's weather, climate and growth units without their California places,
// with Vermont examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_6: Unit[] = [
  copyOf(
    from(CA, "ca-g6-weather"),
    {
      id: "vt-g6-weather",
      title: "Weather Systems",
      emoji: "🌧️",
      blurb: "Air masses, fronts and the water cycle.",
      parentNote:
        "Practices how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, with Vermont examples such as winter storms, summer thunderstorms and the snow that piles up on the Green Mountains.",
      standards: ["MS-ESS2-4; MS-ESS2-5", "the water cycle driven by sunlight and gravity, and how air masses cause weather changes"],
    },
    [
      ["Cold, dry air that sweeps into Vermont in winter usually comes from…", "Canada and the Arctic", ["the Gulf of Mexico", "the equator", "the desert"], "Air masses take on the weather of the place they form."],
      ["Moist air rises over the Green Mountains and cools. What often falls?", "rain or snow", ["sand", "lava", "salt"], "Rising air cools and its water vapor condenses."],
      ["When a cold front passes through Burlington, the temperature usually…", "drops", ["rises sharply", "stays the same", "doubles"], "Cold air pushes in behind the front."],
      ["What makes water evaporate from Lake Champlain?", "energy from the sun", ["gravity", "the wind only", "the Moon"], "Sunlight heats the water."],
      ["What pulls rain and snow back down to the ground?", "gravity", ["sunlight", "evaporation", "air pressure only"], "Gravity drives precipitation and runoff."],
      ["Falling air pressure in a weather report often means…", "stormy weather is coming", ["clear weather is coming", "an earthquake is near", "the sun is closer"], "Low pressure brings clouds and rain.", true],
      ["Melting mountain snow in spring fills the Winooski River. That is the water cycle's…", "runoff", ["evaporation", "condensation", "freezing"], "Gravity pulls melted snow downhill.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-climate"),
    {
      id: "vt-g6-climate",
      title: "Climate & Climate Change",
      emoji: "🌍",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices how latitude, mountains, elevation, large lakes and winds shape regional climate, such as Mount Mansfield's cold summit and the milder Champlain Valley, and the causes of rising global temperatures.",
      standards: ["MS-ESS2-6; MS-ESS3-5", "what shapes regional climate, and the causes of rising global temperatures"],
    },
    [
      ["Why is the top of Mount Mansfield colder than the valleys around it?", "it is much higher up", ["it is closer to the equator", "it is next to the ocean", "it has more cities"], "Air gets colder as you climb."],
      ["Towns beside Lake Champlain often have milder falls than towns in the hills because…", "the lake's water keeps the air from cooling as fast", ["they are higher up", "they are farther north", "they have more mountains"], "Water warms and cools slowly."],
      ["Towns in Vermont's Northeast Kingdom usually have colder winters than towns in the south mostly because they are…", "farther north and higher", ["closer to the moon", "next to the equator", "covered in sand"], "Latitude and elevation shape climate."],
      ["Burning fossil fuels adds which gas that traps heat?", "carbon dioxide", ["oxygen", "helium", "nitrogen only"], "It is a greenhouse gas."],
      ["Planting trees can help slow climate change because trees…", "take in carbon dioxide", ["make the sun cooler", "produce coal", "stop the wind"], "Plants use carbon dioxide to grow."],
      ["Climate is different from weather because climate is…", "the pattern over many years", ["what happens today", "only about rain", "only about wind"], "Weather is short term.", true],
      ["Warmer winters can shorten Vermont's ski and maple sugaring seasons because…", "fewer days have the right cold and snow", ["the sun gets smaller", "mountains shrink", "lakes get saltier"], "Higher temperatures change the seasons.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-growth"),
    {
      id: "vt-g6-growth",
      title: "Growing & Reproducing",
      emoji: "🌸",
      blurb: "Flowers, nests, genes, sunlight and copies of parents.",
      parentNote:
        "Practices how animal behaviors and plant structures help reproduction, how environment and genes affect growth, and asexual versus sexual reproduction, with Vermont examples like red clover and honeybees, apple orchards, sugar maples and the singing hermit thrush.",
      standards: ["MS-LS1-4; MS-LS1-5; MS-LS3-2", "behaviors and structures that help organisms reproduce, what affects growth, and asexual versus sexual reproduction"],
    },
    [
      ["Honeybees carry pollen between apple blossoms in Vermont orchards. This helps the trees…", "make apples with seeds", ["stay warm", "grow roots", "hide from deer"], "Pollinated flowers become fruit."],
      ["Sugar maple seeds have wings that help them…", "spin away from the parent tree on the wind", ["swim in the river", "stick to fur", "dig into the soil"], "Seeds that land far away have more room to grow."],
      ["Garden plants grow bigger in a sunny, well-watered spot than in a dry, shady one. This shows growth depends on…", "the environment", ["only genes", "the moon", "the color of the seed"], "Water, light and nutrients affect growth."],
      ["A male hermit thrush, Vermont's state bird, sings in spring. His song is a…", "behavior that helps reproduction", ["kind of pollination", "kind of root", "way to make seeds"], "Birds sing to attract mates and claim a home."],
      ["Offspring from sexual reproduction get genes from…", "two parents", ["one parent", "no parents", "only the soil"], "Each parent gives half."],
      ["A potato growing from a piece of potato is…", "asexual reproduction", ["sexual reproduction", "pollination", "migration"], "The new plant is a copy of the parent.", true],
      ["New raspberry canes often sprout from the roots of an old plant. The new canes are…", "copies of the parent", ["mixes of two parents", "a different species", "grown from pollen"], "Growing from roots is asexual reproduction.", true],
    ],
  ),
];
