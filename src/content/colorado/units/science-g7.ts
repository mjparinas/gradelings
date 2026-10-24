import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { copyOf, from } from "./kit";

// Colorado Grade 7 science: copies of California's resources and biodiversity units without their California places,
// with Colorado examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "co-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, and how scientists forecast hazards, with Colorado examples such as its coal, oil and gas, its old gold and silver mines, wildfires and floods.",
      standards: ["ESS3.MS.8.a; ESS3.MS.9.a", "the uneven distribution of Earth's resources, and forecasting natural hazards"],
    },
    [
      ["Western Colorado has large coal beds because, long ago, it was covered by…", "swamps full of plants", ["deserts", "glaciers only", "volcanoes"], "Coal forms from buried plants."],
      ["Gold and silver were found in Colorado's mountains because…", "hot fluids deep underground left them in the rock", ["miners planted them", "rivers made them last year", "they fell as snow"], "Minerals form under special conditions."],
      ["Oil and natural gas in northeastern Colorado formed from…", "tiny sea life buried long ago", ["melted glaciers", "volcanic ash only", "dinosaur footprints"], "An ancient sea once covered the plains."],
      ["Why are some resources found in only a few places?", "they formed under special conditions long ago", ["people put them there", "they fall from space each year", "they are made by animals today"], "Geology decides where resources are."],
      ["River gauges on the South Platte River help forecasters predict…", "floods", ["earthquakes", "volcanoes", "eclipses"], "Rising water levels upstream warn of floods downstream."],
      ["Hot, dry, windy days with dry forests help forecasters warn of…", "wildfire danger", ["earthquakes", "tsunamis", "lake-effect snow"], "Fire spreads fast in dry, windy weather.", true],
      ["Why is it harder to forecast an earthquake than a flood?", "earthquakes give few warning signs", ["floods never happen", "earthquakes are always at noon", "rivers do not change"], "Some hazards are hard to predict.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "co-g7-biodiversity",
      title: "Biodiversity & Grasslands",
      emoji: "🌾",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with Colorado examples like the shortgrass prairie, wetlands, black-footed ferrets and invasive plants.",
      standards: ["LS2.MS.7.b", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["Much of Colorado's shortgrass prairie was plowed and turned into…", "farmland", ["ocean", "glaciers", "desert"], "Grassland soil is good for crops."],
      ["Restoring a prairie by planting native grasses and flowers helps…", "bring back many kinds of plants and animals", ["make the land a desert", "stop all insects", "raise the ocean"], "More plant kinds support more animals."],
      ["Wetlands provide ecosystem services such as…", "filtering water and holding flood water", ["making sand", "creating earthquakes", "blocking sunlight"], "Wetlands clean and store water."],
      ["Tamarisk, an invasive tree along Colorado rivers, harms the ecosystem because it…", "crowds out native plants and uses lots of water", ["makes the water cold", "helps native plants grow", "adds fish to the river"], "Invasive species compete with native ones."],
      ["Bees and butterflies give the ecosystem service of…", "pollinating crops and wildflowers", ["making rain", "building soil from rock", "producing oil"], "Many foods depend on pollinators."],
      ["Black-footed ferrets depend on prairie dogs. Which solution would best help the ferrets?", "protecting prairie dog towns on the grassland", ["removing all prairie dogs", "paving more of the plains", "moving the ferrets to the mountains"], "Predators need their prey.", true],
      ["Which solution would best help a pollinator that is losing habitat?", "planting native flowers along roadsides", ["spraying more insect poison", "paving more parking lots", "mowing every field weekly"], "Food and shelter support pollinators.", true],
      ["Why does a forest with many species recover better after a disease than a forest of one tree type?", "other species survive and keep the ecosystem working", ["diseases never reach mixed forests", "one species always dies", "mixed forests grow faster"], "Biodiversity makes ecosystems stable.", true],
    ],
  ),
];
