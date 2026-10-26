import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { copyOf, from } from "./kit";

// New Mexico Grade 7 science: copies of California's resources and biodiversity units without their California places,
// with New Mexico examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "nm-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, and how scientists forecast hazards, with New Mexico examples such as the oil and potash of the Permian Basin, copper near Silver City and its scarce groundwater.",
      standards: ["MS-ESS3-1; MS-ESS3-2; MS-ESS3-3 NM", "the uneven distribution of Earth's resources, local industries and energy production, and forecasting natural hazards"],
    },
    [
      ["Potash is mined near Carlsbad from layers left behind when…", "an ancient sea dried up", ["a glacier melted", "a volcano erupted", "a rainforest burned"], "Minerals stay behind when seawater evaporates."],
      ["Oil and gas in New Mexico's Permian Basin formed from…", "tiny sea creatures buried long ago", ["melted glaciers", "volcanic glass", "desert sand only"], "An ancient sea once covered the area."],
      ["The huge open-pit mine near Silver City produces…", "copper", ["salt", "coal", "diamonds"], "Copper is used in electric wires."],
      ["Why are some resources found in only a few places?", "they formed under special conditions long ago", ["people put them there", "they fall from space each year", "they are made by animals today"], "Geology decides where resources are."],
      ["Seismographs near Socorro help scientists…", "record earthquakes and map where they happen", ["predict eclipses", "forecast snow", "measure rain"], "Small earthquakes happen in the Rio Grande valley."],
      ["Forecasts of hot, dry, windy days help firefighters warn of…", "wildfires", ["earthquakes", "floods only", "eclipses"], "Dry fuel and wind spread fire.", true],
      ["Why is it harder to forecast an earthquake than a flood?", "earthquakes give few warning signs", ["floods never happen", "earthquakes are always at noon", "rivers do not change"], "Some hazards are hard to predict.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "nm-g7-biodiversity",
      title: "Biodiversity & Habitats",
      emoji: "🌾",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with New Mexico examples like the Rio Grande silvery minnow, the cottonwood bosque, salt cedar and the Mexican gray wolf.",
      standards: ["MS-LS2-5", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["The Rio Grande silvery minnow lives in only a small stretch of the river. Keeping water flowing there protects…", "a species found almost nowhere else", ["the river from flowing", "the desert from being sunny", "all fish the same"], "Some species live in just one place."],
      ["Planting cottonwoods and willows along the Rio Grande helps…", "bring back the birds and animals that depend on them", ["make the land a city", "stop all insects", "raise the ocean"], "The bosque gives food and shelter."],
      ["Wetlands provide ecosystem services such as…", "filtering water and holding flood water", ["making sand", "creating earthquakes", "blocking sunlight"], "Wetlands clean and store water."],
      ["Salt cedar, a shrub from far away, harms river ecosystems because it…", "crowds out native plants and uses a lot of water", ["makes the water cold", "helps native fish grow", "plants new cottonwoods"], "Invasive species compete with native ones."],
      ["Mexican gray wolves were returned to the wild in New Mexico and Arizona to help…", "save a species that had almost disappeared", ["clear forests for farms", "stop all rain", "replace the deer"], "Recovery programs bring back endangered species."],
      ["Which solution would best help a pollinator that is losing habitat?", "planting native flowers along roadsides", ["spraying more insect poison", "paving more parking lots", "mowing every field weekly"], "Food and shelter support pollinators.", true],
      ["Why does a forest with many species recover better after a disease than a forest of one tree type?", "other species survive and keep the ecosystem working", ["diseases never reach mixed forests", "one species always dies", "mixed forests grow faster"], "Biodiversity makes ecosystems stable.", true],
    ],
  ),
];
