import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { copyOf, from } from "./kit";

// Michigan Grade 7 science: copies of California's resources and biodiversity units without their California places,
// with Michigan examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "mi-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, and how scientists forecast hazards, with Michigan examples such as its iron and copper, its salt beds and the sand and gravel the glaciers left.",
      standards: ["MS-ESS3-1; MS-ESS3-2", "the uneven distribution of Earth's resources, and forecasting natural hazards"],
    },
    [
      ["Michigan has thick salt beds deep underground because, long ago, it was covered by…", "a sea that dried up", ["a desert of sand", "glaciers only", "volcanoes"], "Salt is left behind when seawater evaporates."],
      ["Copper and iron are mined in Michigan's Upper Peninsula because…", "ancient rocks there hold those minerals", ["glaciers made the metal", "the lakes are salty", "factories buried it"], "Minerals form only in certain rocks."],
      ["Sand and gravel pits across Michigan exist because… left them behind.", "glaciers", ["oceans", "volcanoes", "tornadoes"], "Melting glaciers dropped sand and gravel."],
      ["Why are some resources found in only a few places?", "they formed under special conditions long ago", ["people put them there", "they fall from space each year", "they are made by animals today"], "Geology decides where resources are."],
      ["River gauges on the Grand River help forecasters predict…", "floods", ["earthquakes", "volcanoes", "eclipses"], "Rising water levels upstream warn of floods downstream."],
      ["Radar showing rotating storms helps forecasters warn of…", "tornadoes", ["droughts", "floods only", "earthquakes"], "Rotation can mean a tornado is forming.", true],
      ["Why is it harder to forecast an earthquake than a flood?", "earthquakes give few warning signs", ["floods never happen", "earthquakes are always at noon", "rivers do not change"], "Some hazards are hard to predict.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "mi-g7-biodiversity",
      title: "Biodiversity & Habitats",
      emoji: "🌾",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with Michigan examples like Great Lakes wetlands, native plantings and invasive zebra mussels and sea lamprey.",
      standards: ["MS-LS2-5", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["Many of Michigan's old wetlands were drained. Most were turned into…", "farmland and towns", ["ocean", "glaciers", "desert"], "Drained land was used to grow crops and build."],
      ["Restoring a meadow by planting native grasses and flowers helps…", "bring back many kinds of plants and animals", ["make the land a desert", "stop all insects", "raise the ocean"], "More plant kinds support more animals."],
      ["Wetlands provide ecosystem services such as…", "filtering water and holding flood water", ["making sand", "creating earthquakes", "blocking sunlight"], "Wetlands clean and store water."],
      ["Zebra mussels in the Great Lakes harm the ecosystem because they…", "filter out food native animals need", ["make the water cold", "help native fish grow", "plant new trees"], "Invasive species compete with native ones."],
      ["Bees and butterflies give the ecosystem service of…", "pollinating crops and wildflowers", ["making rain", "building soil from rock", "producing oil"], "Many foods depend on pollinators."],
      ["Which solution would best help a pollinator that is losing habitat?", "planting native flowers along roadsides", ["spraying more insect poison", "paving more parking lots", "mowing every field weekly"], "Food and shelter support pollinators.", true],
      ["Why does a forest with many species recover better after a disease than a forest of one tree type?", "other species survive and keep the ecosystem working", ["diseases never reach mixed forests", "one species always dies", "mixed forests grow faster"], "Biodiversity makes ecosystems stable.", true],
    ],
  ),
];
