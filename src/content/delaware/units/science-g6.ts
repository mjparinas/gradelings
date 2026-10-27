import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g6";
import { copyOf, from } from "./kit";

// Delaware Grade 6 science: copies of California's weather, climate and growth units without their California
// places, with Delaware examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_6: Unit[] = [
  copyOf(
    from(CA, "ca-g6-weather"),
    {
      id: "de-g6-weather",
      title: "Weather Systems",
      emoji: "🌧️",
      blurb: "Air masses, fronts and the water cycle.",
      parentNote:
        "Practices how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, with Delaware examples such as nor'easters, summer thunderstorms and sea breezes at the beach.",
      standards: ["MS-ESS2-4; MS-ESS2-5", "the water cycle driven by sunlight and gravity, and how air masses cause weather changes"],
    },
    [
      ["A nor'easter forms when cold air from the north meets warm, moist air from the…", "ocean", ["desert", "moon", "mountains only"], "The storm's winds blow in from the northeast."],
      ["Warm, moist air rises on a hot Delaware afternoon and cools. What often falls?", "rain or snow", ["sand", "lava", "salt"], "Rising air cools and its water vapor condenses."],
      ["When a cold front passes through Dover, the temperature usually…", "drops", ["rises sharply", "stays the same", "doubles"], "Cold air pushes in behind the front."],
      ["What makes water evaporate from Delaware Bay?", "energy from the sun", ["gravity", "the wind only", "the Moon"], "Sunlight heats the water."],
      ["What pulls rain and snow back down to the ground?", "gravity", ["sunlight", "evaporation", "air pressure only"], "Gravity drives precipitation and runoff."],
      ["Falling air pressure in a weather report often means…", "stormy weather is coming", ["clear weather is coming", "an earthquake is near", "the sun is closer"], "Low pressure brings clouds and rain.", true],
      ["Heavy rain running off fields into the Nanticoke River is the water cycle's…", "runoff", ["evaporation", "condensation", "freezing"], "Gravity pulls the water downhill.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-climate"),
    {
      id: "de-g6-climate",
      title: "Climate & Climate Change",
      emoji: "🌍",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices how latitude, mountains, elevation, the ocean and winds shape regional climate, such as the sea breeze that cools Delaware's beaches and the milder winters near the ocean, and the causes of rising global temperatures and sea level.",
      standards: ["MS-ESS2-6; MS-ESS3-5", "what shapes regional climate, and the causes of rising global temperatures"],
    },
    [
      ["On summer afternoons, a cool wind often blows onto Delaware's beaches from the ocean. This is a…", "sea breeze", ["blizzard", "tornado", "dust storm"], "The land heats up faster than the water."],
      ["Lewes, on the coast, usually has milder winters than towns far inland because…", "the ocean keeps the air from getting as cold", ["it is higher up", "it is farther north", "it has more mountains"], "Water warms and cools slowly."],
      ["Places near the equator are usually warmer than Delaware because there the sun's rays…", "hit the ground more directly", ["are turned off at night", "come from the moon", "are always cloudy"], "Latitude shapes climate."],
      ["Burning fossil fuels adds which gas that traps heat?", "carbon dioxide", ["oxygen", "helium", "nitrogen only"], "It is a greenhouse gas."],
      ["Planting trees can help slow climate change because trees…", "take in carbon dioxide", ["make the sun cooler", "produce coal", "stop the wind"], "Plants use carbon dioxide to grow."],
      ["Climate is different from weather because climate is…", "the pattern over many years", ["what happens today", "only about rain", "only about wind"], "Weather is short term.", true],
      ["Rising sea level from a warming climate worries Delaware because…", "much of its coast is low and flat", ["it has tall cliffs everywhere", "the ocean is shrinking", "it has no coast"], "Low land floods first as the sea rises.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-growth"),
    {
      id: "de-g6-growth",
      title: "Growing & Reproducing",
      emoji: "🌸",
      blurb: "Flowers, nests, genes, sunlight and copies of parents.",
      parentNote:
        "Practices how animal behaviors and plant structures help reproduction, how environment and genes affect growth, and asexual versus sexual reproduction, with Delaware examples like peach orchards and their bees, loblolly pines, singing cardinals and strawberry runners.",
      standards: ["MS-LS1-4; MS-LS1-5; MS-LS3-2", "behaviors and structures that help organisms reproduce, what affects growth, and asexual versus sexual reproduction"],
    },
    [
      ["Bees carry pollen between peach blossoms in Delaware orchards. This helps the trees…", "make peaches with seeds", ["stay warm", "grow roots", "hide from deer"], "Pollinated flowers become fruit."],
      ["Loblolly pine pollen is carried from tree to tree mostly by…", "the wind", ["birds", "bats", "rain only"], "Pines are wind-pollinated."],
      ["Garden plants grow bigger in a sunny, well-watered spot than in a dry, shady one. This shows growth depends on…", "the environment", ["only genes", "the moon", "the color of the seed"], "Water, light and nutrients affect growth."],
      ["A male cardinal singing loudly from a treetop in spring is a…", "behavior that helps reproduction", ["kind of pollination", "kind of root", "way to make seeds"], "Animals use sounds and displays to attract mates."],
      ["Offspring from sexual reproduction get genes from…", "two parents", ["one parent", "no parents", "only the soil"], "Each parent gives half."],
      ["A potato growing from a piece of potato is…", "asexual reproduction", ["sexual reproduction", "pollination", "migration"], "The new plant is a copy of the parent.", true],
      ["Strawberry plants send out runners that grow into new plants. The new plants are…", "copies of the parent", ["mixes of two parents", "a different species", "grown from pollen"], "Growing from runners is asexual reproduction.", true],
    ],
  ),
];
