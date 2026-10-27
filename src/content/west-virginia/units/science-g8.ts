import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g6";
import { copyOf, from } from "./kit";

// West Virginia Grade 8 science: a copy of California's growth-and-reproduction unit without its California places,
// with West Virginia examples added. West Virginia teaches growth, reproduction and heredity in Grade 8 (S.8.1 to S.8.4).

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_8: Unit[] = [
  copyOf(
    from(CA, "ca-g6-growth"),
    {
      id: "wv-g8-growth",
      title: "Growing & Reproducing",
      emoji: "🌸",
      blurb: "Flowers, songs, genes, sunlight and copies of parents.",
      parentNote:
        "Practices how animal behaviors and plant structures help reproduction, how environment and genes affect growth, and asexual versus sexual reproduction, with West Virginia examples like the rhododendron, sweet corn and the Golden Delicious apple.",
      standards: ["S.8.1; S.8.2; S.8.4", "behaviors and structures that help organisms reproduce, what affects growth, and asexual versus sexual reproduction"],
    },
    [
      ["Big clusters of rhododendron flowers, West Virginia's state flower, attract bees. This helps the plant…", "get pollinated", ["stay warm", "grow roots", "hide from deer"], "Bees carry pollen between flowers."],
      ["Corn pollen is carried from tassels to silks mostly by…", "the wind", ["birds", "bats", "rain only"], "Corn is wind-pollinated."],
      ["Corn planted in rich, wet soil grows taller than corn in dry, poor soil. This shows growth depends on…", "the environment", ["only genes", "the moon", "the color of the seed"], "Water and nutrients affect growth."],
      ["A male cardinal singing to attract a mate is a…", "behavior that helps reproduction", ["kind of pollination", "kind of root", "way to make seeds"], "Animals use songs and displays."],
      ["Offspring from sexual reproduction get genes from…", "two parents", ["one parent", "no parents", "only the soil"], "Each parent gives half."],
      ["A potato growing from a piece of potato is…", "asexual reproduction", ["sexual reproduction", "pollination", "migration"], "The new plant is a copy of the parent.", true],
      ["Every Golden Delicious apple tree is grown from cuttings that trace back to one tree found in Clay County. So their apples have…", "the same genes as that first tree", ["genes from two random trees", "no genes at all", "genes from the soil"], "Grafting copies a plant without seeds.", true],
      ["Why do farmers plant seeds from plants that grew best?", "offspring inherit useful traits", ["seeds forget their parents", "bigger seeds are always better", "it changes the weather"], "Traits pass from parents to offspring.", true],
    ],
  ),
];
