import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g6";
import { copyOf, from } from "./kit";

// Wyoming Grade 6 science: copies of California's weather, climate and growth units without their California
// places, with Wyoming examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_6: Unit[] = [
  copyOf(
    from(CA, "ca-g6-weather"),
    {
      id: "wy-g6-weather",
      title: "Weather Systems",
      emoji: "🌧️",
      blurb: "Air masses, fronts and the water cycle.",
      parentNote:
        "Practices how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, with Wyoming examples such as cold fronts, summer mountain thunderstorms and spring snowmelt.",
      standards: ["MS-ESS2-4", "the cycling of water through Earth's systems, driven by energy from the sun and the force of gravity"],
    },
    [
      ["Moist air rises over the Wind River Range and cools. What often falls?", "rain or snow", ["sand", "lava", "salt"], "Rising air cools and its water vapor condenses."],
      ["When a cold front passes through Casper, the temperature usually…", "drops", ["rises sharply", "stays the same", "doubles"], "Cold air pushes in behind the front."],
      ["What makes water evaporate from Yellowstone Lake?", "energy from the sun", ["gravity", "the wind only", "the Moon"], "Sunlight heats the water."],
      ["What pulls rain and snow back down to the ground?", "gravity", ["sunlight", "evaporation", "air pressure only"], "Gravity drives precipitation and runoff."],
      ["On summer afternoons, thunderstorms often build over Wyoming's mountains because…", "the sun heats the ground and warm air rises", ["the ocean is nearby", "the air is too cold to rise", "the mountains make wind"], "Rising warm air builds tall clouds."],
      ["Falling air pressure in a weather report often means…", "stormy weather is coming", ["clear weather is coming", "an earthquake is near", "the sun is closer"], "Low pressure brings clouds and rain.", true],
      ["Melting mountain snow in spring fills the North Platte River. That is the water cycle's…", "runoff", ["evaporation", "condensation", "freezing"], "Gravity pulls melted snow downhill.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-climate"),
    {
      id: "wy-g6-climate",
      title: "Climate & Climate Change",
      emoji: "🌍",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices how latitude, mountains, elevation, the ocean and winds shape regional climate, such as Wyoming's cold peaks and its dry rain shadow, and the causes of rising global temperatures.",
      standards: ["MS-ESS2-6", "how the uneven heating of Earth, mountains, elevation and moving air and water shape regional climates"],
    },
    [
      ["Why is the top of a peak in the Tetons colder than the valley of Jackson Hole below it?", "it is much higher up", ["it is closer to the equator", "it is next to the ocean", "it has more cities"], "Air gets colder as you climb."],
      ["Much of Wyoming is dry because mountains to the west…", "squeeze rain and snow out of the air before it arrives", ["make extra rain", "block the sun", "pull in ocean water"], "This is called a rain shadow."],
      ["Wyoming is one of the highest states on average. How does that affect its climate?", "it makes it cooler than lower places at the same latitude", ["it makes it hotter", "it makes it rainier than a rainforest", "it has no effect"], "Higher places are cooler."],
      ["Burning fossil fuels adds which gas that traps heat?", "carbon dioxide", ["oxygen", "helium", "nitrogen only"], "It is a greenhouse gas."],
      ["Planting trees can help slow climate change because trees…", "take in carbon dioxide", ["make the sun cooler", "produce coal", "stop the wind"], "Plants use carbon dioxide to grow."],
      ["Climate is different from weather because climate is…", "the pattern over many years", ["what happens today", "only about rain", "only about wind"], "Weather is short term.", true],
      ["Warmer winters can shorten Wyoming's ski season and shrink its mountain snowpack because…", "less snow builds up and more melts early", ["the sun gets smaller", "mountains shrink", "lakes get saltier"], "Higher temperatures melt snow.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-growth"),
    {
      id: "wy-g6-growth",
      title: "Growing & Reproducing",
      emoji: "🌸",
      blurb: "Flowers, nests, genes, sunlight and copies of parents.",
      parentNote:
        "Practices how animal behaviors and plant structures help reproduction, how environment and genes affect growth, and asexual versus sexual reproduction, with Wyoming examples like Indian paintbrush and hummingbirds, lodgepole pines, aspen groves and strutting sage grouse.",
      standards: ["MS-LS3-2", "why asexual reproduction makes offspring with the same genes as the parent and sexual reproduction makes offspring with mixed genes"],
    },
    [
      ["Hummingbirds sip nectar from Indian paintbrush and carry pollen from flower to flower. This helps the plants…", "make seeds", ["stay warm", "grow roots", "hide from deer"], "Pollinated flowers make seeds."],
      ["Lodgepole pine pollen is carried from tree to tree mostly by…", "the wind", ["birds", "bats", "rain only"], "Pines are wind-pollinated."],
      ["Sugar beets grow bigger in a sunny, irrigated field than in a dry, shady one. This shows growth depends on…", "the environment", ["only genes", "the moon", "the color of the seed"], "Water, light and nutrients affect growth."],
      ["Male sage grouse puff up their chests and strut in spring. This is a…", "behavior that helps reproduction", ["kind of pollination", "kind of root", "way to make seeds"], "Animals use displays to attract mates."],
      ["Offspring from sexual reproduction get genes from…", "two parents", ["one parent", "no parents", "only the soil"], "Each parent gives half."],
      ["A potato growing from a piece of potato is…", "asexual reproduction", ["sexual reproduction", "pollination", "migration"], "The new plant is a copy of the parent.", true],
      ["A whole grove of aspen trees can sprout from the roots of one tree. The new trees are…", "copies of the parent", ["mixes of two parents", "a different species", "grown from pollen"], "Growing from roots is asexual reproduction.", true],
    ],
  ),
];
