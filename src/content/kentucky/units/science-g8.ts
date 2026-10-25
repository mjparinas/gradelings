import type { Unit } from "../../types";
import { OWN_SCIENCE as CA_OWN_6, SCIENCE_COPIES as CA_COPIES_6 } from "../../california/units/science-g6";
import { OWN_SCIENCE as CA_OWN_7, SCIENCE_COPIES as CA_COPIES_7 } from "../../california/units/science-g7";
import { copyOf, from } from "./kit";

// Kentucky Grade 8 science: copies of California's growth, resources and biodiversity units without their California
// places, with Kentucky examples added. Kentucky places reproduction, Earth's resources and biodiversity in Grade 8.

const CA6 = [...CA_COPIES_6, ...CA_OWN_6];
const CA7 = [...CA_COPIES_7, ...CA_OWN_7];

export const SCIENCE_8: Unit[] = [
  copyOf(
    from(CA6, "ca-g6-growth"),
    {
      id: "ky-g8-growth",
      title: "Growing & Reproducing",
      emoji: "🌸",
      blurb: "Flowers, nests, genes, sunlight and copies of parents.",
      parentNote:
        "Practices how animal behaviors and plant structures help reproduction, how environment and genes affect growth, and asexual versus sexual reproduction, with Kentucky examples like goldenrod, corn and Thoroughbred horses.",
      standards: ["8-LS1-4; 8-LS1-5; 8-LS3-2", "behaviors and structures that help organisms reproduce, what affects growth, and asexual versus sexual reproduction"],
    },
    [
      ["Goldenrod's bright yellow flowers attract bees. This helps the plant…", "get pollinated", ["stay warm", "grow roots", "hide from deer"], "Bees carry pollen between flowers."],
      ["Corn pollen is carried from tassels to silks mostly by…", "the wind", ["birds", "bats", "rain only"], "Corn is wind-pollinated."],
      ["Corn planted in rich, wet soil grows taller than corn in dry, poor soil. This shows growth depends on…", "the environment", ["only genes", "the moon", "the color of the seed"], "Water and nutrients affect growth."],
      ["A cardinal singing to attract a mate is a…", "behavior that helps reproduction", ["kind of pollination", "kind of root", "way to make seeds"], "Animals use songs and displays."],
      ["Offspring from sexual reproduction get genes from…", "two parents", ["one parent", "no parents", "only the soil"], "Each parent gives half."],
      ["A potato growing from a piece of potato is…", "asexual reproduction", ["sexual reproduction", "pollination", "migration"], "The new plant is a copy of the parent.", true],
      ["Why do Kentucky horse breeders choose fast parents for a Thoroughbred foal?", "offspring inherit traits from their parents", ["foals forget their parents", "bigger barns make faster horses", "it changes the weather"], "Traits pass from parents to offspring.", true],
    ],
  ),
  copyOf(
    from(CA7, "ca-g7-resources"),
    {
      id: "ky-g8-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, and how scientists forecast hazards, with Kentucky examples such as its coal, limestone and oil, river floods and tornadoes.",
      standards: ["8-ESS3-1; 8-ESS3-2", "the uneven distribution of Earth's resources, and forecasting natural hazards"],
    },
    [
      ["Kentucky has thick coal beds because, about 300 million years ago, it was covered by…", "swamp forests", ["a desert of sand", "glaciers only", "volcanoes"], "Buried plants slowly turned into coal."],
      ["Limestone is quarried across Kentucky because…", "ancient seas left thick layers of it", ["glaciers made it", "volcanoes poured it out", "factories buried it"], "Shells and coral built the layers."],
      ["Why are some resources found in only a few places?", "they formed under special conditions long ago", ["people put them there", "they fall from space each year", "they are made by animals today"], "Geology decides where resources are."],
      ["River gauges on the Ohio River help forecasters predict…", "floods", ["earthquakes", "volcanoes", "eclipses"], "Rising water upstream warns of floods downstream."],
      ["Radar showing rotating storms helps forecasters warn Kentucky towns of…", "tornadoes", ["droughts", "floods only", "earthquakes"], "Rotation can mean a tornado is forming."],
      ["Why is it harder to forecast an earthquake on the New Madrid fault than a flood on the Ohio?", "earthquakes give few warning signs", ["floods never happen", "earthquakes are always at noon", "rivers do not change"], "Some hazards are hard to predict.", true],
      ["Maps of where sinkholes have opened help Kentucky builders…", "avoid building on unstable ground", ["find gold", "predict eclipses", "grow taller trees"], "Past events show where risk is high.", true],
    ],
  ),
  copyOf(
    from(CA7, "ca-g7-biodiversity"),
    {
      id: "ky-g8-biodiversity",
      title: "Biodiversity & Habitats",
      emoji: "🌾",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with Kentucky examples like its freshwater mussels, native prairie plantings, cave life and invasive bush honeysuckle.",
      standards: ["8-LS2-5", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["Kentucky's rivers are home to many kinds of freshwater mussels. Mussels provide the ecosystem service of…", "filtering and cleaning water", ["making rain", "producing coal", "blocking sunlight"], "Each mussel filters gallons of water a day."],
      ["Restoring a meadow by planting native grasses and flowers helps…", "bring back many kinds of plants and animals", ["make the land a desert", "stop all insects", "raise the ocean"], "More plant kinds support more animals."],
      ["Wetlands provide ecosystem services such as…", "filtering water and holding flood water", ["making sand", "creating earthquakes", "blocking sunlight"], "Wetlands clean and store water."],
      ["Bush honeysuckle harms Kentucky forests because it…", "shades out native plants on the forest floor", ["makes the soil richer for everyone", "helps native trees grow", "feeds every animal"], "Invasive species crowd out native ones."],
      ["Bees and butterflies give the ecosystem service of…", "pollinating crops and wildflowers", ["making rain", "building soil from rock", "producing oil"], "Many foods depend on pollinators."],
      ["Which solution would best help a pollinator that is losing habitat?", "planting native flowers along roadsides", ["spraying more insect poison", "paving more parking lots", "mowing every field weekly"], "Food and shelter support pollinators.", true],
      ["Why does a forest with many species recover better after a disease than a forest of one tree type?", "other species survive and keep the ecosystem working", ["diseases never reach mixed forests", "one species always dies", "mixed forests grow faster"], "Biodiversity makes ecosystems stable.", true],
    ],
  ),
];
