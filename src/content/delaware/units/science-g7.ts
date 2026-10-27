import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { copyOf, from } from "./kit";

// Delaware Grade 7 science: copies of California's resources and biodiversity units without their California
// places, with Delaware examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "de-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, how people monitor and reduce their impact, and how scientists forecast hazards, with Delaware examples such as its sand and gravel, its groundwater wells, fertilizer and salt water reaching wells, hurricane forecasts and the small earthquake near Dover in 2017.",
      standards: ["MS-ESS3-1; MS-ESS3-2; MS-ESS3-3", "the uneven distribution of Earth's resources, monitoring and reducing human impact on the environment, and forecasting natural hazards"],
    },
    [
      ["Delaware has no coal or oil of its own, so it…", "brings in fuels from other places", ["makes coal in factories", "uses no energy", "grows oil on farms"], "Fossil fuels formed only where the conditions were right."],
      ["Most of the sand and gravel under Delaware's coastal plain was laid down long ago by…", "rivers and ancient seas", ["volcanoes", "an ancient desert", "coral reefs"], "Moving water drops sediment in layers."],
      ["Why are some resources found in only a few places?", "they formed under special conditions long ago", ["people put them there", "they fall from space each year", "they are made by animals today"], "Geology decides where resources are."],
      ["Testing well water in farm areas for nitrates from fertilizer helps…", "monitor a risk to people's health", ["make more rock", "stop all rain", "warm the water"], "Fertilizer can soak down into groundwater."],
      ["Satellites and ocean buoys that track storms help forecasters warn Delaware of…", "hurricanes", ["earthquakes", "eclipses", "droughts only"], "Storms can be watched for days as they come closer."],
      ["In 2017, a small earthquake shook the area near Dover. Seismographs help scientists…", "record them and map where they happen", ["predict eclipses", "forecast snow", "measure rain"], "Even small earthquakes are recorded.", true],
      ["Why is it harder to forecast an earthquake than a flood?", "earthquakes give few warning signs", ["floods never happen", "earthquakes are always at noon", "rivers do not change"], "Some hazards are hard to predict.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "de-g7-biodiversity",
      title: "Biodiversity & Habitats",
      emoji: "🌾",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with Delaware examples like horseshoe crabs and red knots on Delaware Bay, the oysters of the Inland Bays, the Delmarva fox squirrel and invasive reeds.",
      standards: ["MS-LS2-5", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["Red knots stop on Delaware Bay beaches each spring to eat horseshoe crab eggs. Limiting the crab harvest protects…", "a bird that depends on the crabs' eggs", ["the river from flowing", "every bird the same", "the city from growing"], "Some species depend on one special food."],
      ["Oysters in Delaware's Inland Bays filter the water as they feed. That is an example of an…", "ecosystem service", ["invasive species", "earthquake", "extinction"], "Healthy ecosystems do useful work for people."],
      ["Wetlands provide ecosystem services such as…", "filtering water and holding flood water", ["making sand", "creating earthquakes", "blocking sunlight"], "Wetlands clean and store water."],
      ["Phragmites, a tall reed from far away, harms Delaware marshes because it…", "crowds out native plants", ["makes the water cold", "helps native fish grow", "plants new trees"], "Invasive species compete with native ones."],
      ["Old forests on the Delmarva Peninsula were protected to help the Delmarva fox squirrel, which…", "had lost most of its habitat", ["lives only in deserts", "eats only fish", "is an invasive species"], "Habitat loss is a big threat to species."],
      ["Which solution would best help a pollinator that is losing habitat?", "planting native flowers along roadsides", ["spraying more insect poison", "paving more parking lots", "mowing every field weekly"], "Food and shelter support pollinators.", true],
      ["Why does a forest with many species recover better after a disease than a forest of one tree type?", "other species survive and keep the ecosystem working", ["diseases never reach mixed forests", "one species always dies", "mixed forests grow faster"], "Biodiversity makes ecosystems stable.", true],
    ],
  ),
];
