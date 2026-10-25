import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { copyOf, from } from "./kit";

// Nevada Grade 7 science: copies of California's resources and biodiversity units without their California places,
// with Nevada examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "nv-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, and how scientists forecast hazards, with Nevada examples such as its gold and silver, the lithium in its dry lake beds and its scarce groundwater.",
      standards: ["MS-ESS3-1; MS-ESS3-2", "the uneven distribution of Earth's resources, and forecasting natural hazards"],
    },
    [
      ["Lithium is collected from salty water under a dry Nevada lake bed because, long ago, the valley held…", "a lake that dried up", ["a glacier", "a volcano", "a rainforest"], "Minerals stay behind when lake water evaporates."],
      ["Nevada mines more gold than any other state because…", "rocks there formed in ways that gathered gold", ["gold falls in the rain", "glaciers made the gold", "factories buried it"], "Minerals form only in certain rocks."],
      ["The Comstock Lode near Virginia City was a rich deposit of…", "silver and gold", ["salt", "coal", "oil"], "It gave Nevada the name the Silver State."],
      ["Why are some resources found in only a few places?", "they formed under special conditions long ago", ["people put them there", "they fall from space each year", "they are made by animals today"], "Geology decides where resources are."],
      ["Seismographs across Nevada help scientists…", "record earthquakes and map where they happen", ["predict eclipses", "forecast snow", "measure rain"], "Nevada has many small earthquakes."],
      ["Forecasts of hot, dry, windy days help firefighters warn of…", "wildfires", ["earthquakes", "floods only", "eclipses"], "Dry fuel and wind spread fire.", true],
      ["Why is it harder to forecast an earthquake than a flood?", "earthquakes give few warning signs", ["floods never happen", "earthquakes are always at noon", "rivers do not change"], "Some hazards are hard to predict.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "nv-g7-biodiversity",
      title: "Biodiversity & Habitats",
      emoji: "🌾",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with Nevada examples like the springs of Ash Meadows, sagebrush habitat, cheatgrass and quagga mussels in Lake Mead.",
      standards: ["MS-LS2-5", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["The springs at Ash Meadows are home to fish and plants found nowhere else. Protecting them keeps…", "species that live only there", ["the springs from flowing", "the desert from being sunny", "all fish the same"], "Some species live in just one place."],
      ["Planting native sagebrush after a wildfire helps…", "bring back the animals that depend on it", ["make the land a city", "stop all insects", "raise the ocean"], "Sage grouse need sagebrush."],
      ["Wetlands provide ecosystem services such as…", "filtering water and holding flood water", ["making sand", "creating earthquakes", "blocking sunlight"], "Wetlands clean and store water."],
      ["Quagga mussels in Lake Mead harm the ecosystem because they…", "filter out food native animals need", ["make the water cold", "help native fish grow", "plant new trees"], "Invasive species compete with native ones."],
      ["Cheatgrass, a plant from far away, dries out early and helps… spread across Nevada.", "wildfires", ["glaciers", "rainforests", "earthquakes"], "Invasive plants can change a whole ecosystem."],
      ["Which solution would best help a pollinator that is losing habitat?", "planting native flowers along roadsides", ["spraying more insect poison", "paving more parking lots", "mowing every field weekly"], "Food and shelter support pollinators.", true],
      ["Why does a forest with many species recover better after a disease than a forest of one tree type?", "other species survive and keep the ecosystem working", ["diseases never reach mixed forests", "one species always dies", "mixed forests grow faster"], "Biodiversity makes ecosystems stable.", true],
    ],
  ),
];
