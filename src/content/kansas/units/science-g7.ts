import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { copyOf, from } from "./kit";

// Kansas Grade 7 science: copies of California's resources and biodiversity units without their California places,
// with Kansas examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "ks-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, and how scientists forecast hazards, with Kansas examples such as its oil, natural gas and helium, the salt beds under Hutchinson and the Ogallala Aquifer.",
      standards: ["MS-ESS3-1; MS-ESS3-2", "the uneven distribution of Earth's resources, and forecasting natural hazards"],
    },
    [
      ["Thick beds of rock salt lie deep under Hutchinson because, long ago, the area held…", "a sea that dried up", ["a glacier", "a volcano", "a rainforest"], "Minerals stay behind when salty water evaporates."],
      ["Oil and natural gas are found under parts of Kansas because…", "rocks there formed from ancient sea life and trapped the fuel", ["oil falls in the rain", "glaciers made the oil", "factories buried it"], "Fuels form only in certain rocks."],
      ["In 1903, scientists found helium in natural gas from a well near Dexter, Kansas. Helium is…", "a gas found in only a few places underground", ["made by wind turbines", "a kind of salt", "a liquid metal"], "Some gas fields hold helium; most do not."],
      ["Why are some resources found in only a few places?", "they formed under special conditions long ago", ["people put them there", "they fall from space each year", "they are made by animals today"], "Geology decides where resources are."],
      ["Weather radar and storm spotters across Kansas help forecasters…", "warn people when a tornado may form", ["predict eclipses", "stop hail", "measure earthquakes"], "Warnings give people time to take shelter."],
      ["Forecasts of hot, dry, windy days help firefighters warn of…", "grass fires", ["earthquakes", "floods only", "eclipses"], "Dry fuel and wind spread fire.", true],
      ["Why is it harder to forecast an earthquake than a flood?", "earthquakes give few warning signs", ["floods never happen", "earthquakes are always at noon", "rivers do not change"], "Some hazards are hard to predict.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "ks-g7-biodiversity",
      title: "Biodiversity & Habitats",
      emoji: "🌾",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with Kansas examples like the tallgrass prairie of the Flint Hills, the wetlands of Cheyenne Bottoms, eastern red cedars spreading into grassland and zebra mussels in Kansas lakes.",
      standards: ["MS-LS2-5", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["Most of North America's tallgrass prairie has been plowed. Protecting what is left in the Flint Hills keeps…", "the plants and animals that need prairie", ["the hills from having grass", "the land from being sunny", "all birds the same"], "Some species need one kind of habitat."],
      ["Ranchers in the Flint Hills burn the prairie in spring. This helps…", "keep trees out and grow fresh grass", ["make the land a city", "stop all insects", "raise the ocean"], "Fire is a natural part of the prairie."],
      ["Wetlands provide ecosystem services such as…", "filtering water and holding flood water", ["making sand", "creating earthquakes", "blocking sunlight"], "Wetlands clean and store water."],
      ["Zebra mussels in Kansas lakes harm the ecosystem because they…", "filter out food native animals need", ["make the water cold", "help native fish grow", "plant new trees"], "Invasive species compete with native ones."],
      ["Eastern red cedar trees spreading into the prairie where fires are stopped can turn grassland into…", "thick woods with less prairie life", ["glaciers", "rainforests", "deserts"], "Trees shade out prairie plants."],
      ["Which solution would best help a pollinator that is losing habitat?", "planting native flowers along roadsides", ["spraying more insect poison", "paving more parking lots", "mowing every field weekly"], "Food and shelter support pollinators.", true],
      ["Why does a forest with many species recover better after a disease than a forest of one tree type?", "other species survive and keep the ecosystem working", ["diseases never reach mixed forests", "one species always dies", "mixed forests grow faster"], "Biodiversity makes ecosystems stable.", true],
    ],
  ),
];
