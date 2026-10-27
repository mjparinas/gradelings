import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { copyOf, from } from "./kit";

// New Hampshire Grade 7 science: copies of California's resources and biodiversity units without their California
// places, with New Hampshire examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "nh-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, how people monitor and reduce their impact, and how scientists forecast hazards, with New Hampshire examples such as its granite quarries, the sand and gravel left by glaciers, its groundwater wells and its spring floods.",
      standards: ["MS-ESS3-1; MS-ESS3-2; MS-ESS3-3", "the uneven distribution of Earth's resources, monitoring and reducing human impact on the environment, and forecasting natural hazards"],
    },
    [
      ["New Hampshire is called the Granite State because granite formed when…", "melted rock cooled slowly deep underground", ["seawater dried up", "sand blew into dunes", "shells piled up on a reef"], "Slow cooling makes the large crystals in granite."],
      ["Many of New Hampshire's sand and gravel pits are in piles of rock left behind by…", "melting glaciers", ["volcanoes", "an ancient desert", "coral reefs"], "Glaciers dropped what they carried when they melted."],
      ["Why are some resources found in only a few places?", "they formed under special conditions long ago", ["people put them there", "they fall from space each year", "they are made by animals today"], "Geology decides where resources are."],
      ["Testing well water for chemicals like arsenic, which comes from some New Hampshire rock, helps…", "monitor a risk to people's health", ["make more rock", "stop all rain", "warm the water"], "Some rock adds natural chemicals to groundwater."],
      ["Measuring how much snow is in the mountains in late winter helps forecasters warn of…", "spring floods", ["earthquakes", "eclipses", "droughts only"], "Melting snow raises the rivers."],
      ["Small earthquakes sometimes shake New Hampshire. Seismographs help scientists…", "record them and map where they happen", ["predict eclipses", "forecast snow", "measure rain"], "Even small earthquakes are recorded.", true],
      ["Why is it harder to forecast an earthquake than a flood?", "earthquakes give few warning signs", ["floods never happen", "earthquakes are always at noon", "rivers do not change"], "Some hazards are hard to predict.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "nh-g7-biodiversity",
      title: "Biodiversity & Habitats",
      emoji: "🌾",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with New Hampshire examples like the Karner blue butterfly, the New England cottontail, Great Bay's oysters, loons and invasive plants.",
      standards: ["MS-LS2-5", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["The Karner blue butterfly caterpillar eats only wild blue lupine. Planting lupine in the pine barrens near Concord protects…", "a species that depends on one plant", ["the river from flowing", "every butterfly the same", "the city from growing"], "Some species need one special food."],
      ["Oysters in Great Bay filter the water as they feed. That is an example of an…", "ecosystem service", ["invasive species", "earthquake", "extinction"], "Healthy ecosystems do useful work for people."],
      ["Wetlands provide ecosystem services such as…", "filtering water and holding flood water", ["making sand", "creating earthquakes", "blocking sunlight"], "Wetlands clean and store water."],
      ["Purple loosestrife, a plant from far away, harms New Hampshire wetlands because it…", "crowds out native plants", ["makes the water cold", "helps native fish grow", "plants new trees"], "Invasive species compete with native ones."],
      ["Shrubby young forest is being restored in southern New Hampshire to help the New England cottontail, which…", "had lost most of its habitat", ["lives only in deserts", "eats only fish", "is an invasive species"], "Habitat loss is a big threat to species."],
      ["Which solution would best help a pollinator that is losing habitat?", "planting native flowers along roadsides", ["spraying more insect poison", "paving more parking lots", "mowing every field weekly"], "Food and shelter support pollinators.", true],
      ["Why does a forest with many species recover better after a disease than a forest of one tree type?", "other species survive and keep the ecosystem working", ["diseases never reach mixed forests", "one species always dies", "mixed forests grow faster"], "Biodiversity makes ecosystems stable.", true],
    ],
  ),
];
