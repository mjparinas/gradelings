import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { copyOf, from } from "./kit";

// New Jersey Grade 7 science: copies of California's resources and biodiversity units without their California
// places, with New Jersey examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "nj-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, and how scientists forecast hazards, with New Jersey examples such as its zinc ores, glass-making sand and coastal storms.",
      standards: ["MS-ESS3-1; MS-ESS3-2", "the uneven distribution of Earth's resources, and forecasting natural hazards"],
    },
    [
      ["Zinc ores at Franklin and Sterling Hill are found in only a few places because they formed…", "deep underground under special conditions", ["from falling rain last year", "from tree roots", "in the ocean last century"], "Many of those minerals glow under ultraviolet light."],
      ["South Jersey became a center of glassmaking because it has lots of…", "fine sand", ["volcanic rock", "ocean salt", "coal"], "Glass is made by melting sand."],
      ["Sand and gravel pits in northern New Jersey exist because… left them behind.", "glaciers", ["oceans", "volcanoes", "tornadoes"], "Melting glaciers dropped sand and gravel."],
      ["Why are some resources found in only a few places?", "they formed under special conditions long ago", ["people put them there", "they fall from space each year", "they are made by animals today"], "Geology decides where resources are."],
      ["River gauges on the Passaic River help forecasters predict…", "floods", ["earthquakes", "volcanoes", "eclipses"], "Rising water levels upstream warn of floods downstream."],
      ["Satellites tracking a hurricane over the Atlantic help forecasters warn the Jersey Shore about…", "storm surge and high winds", ["droughts", "earthquakes", "volcanoes"], "Days of warning give time to leave.", true],
      ["Why is it harder to forecast an earthquake than a flood?", "earthquakes give few warning signs", ["floods never happen", "earthquakes are always at noon", "rivers do not change"], "Some hazards are hard to predict.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "nj-g7-biodiversity",
      title: "Biodiversity & the Pinelands",
      emoji: "🌲",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with New Jersey examples like the Pinelands, salt marshes, horseshoe crabs and the spotted lanternfly.",
      standards: ["MS-LS2-5", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["New Jersey protects more than a million acres of the Pinelands so that…", "its rare plants, animals and water stay safe", ["no one may ever see it", "it can become a city", "the trees are cut down"], "The Pinelands National Reserve was created in 1978."],
      ["Restoring a salt marsh by planting native grasses helps…", "bring back many kinds of plants and animals", ["make the land a desert", "stop all insects", "raise the ocean"], "More plant kinds support more animals."],
      ["Wetlands provide ecosystem services such as…", "filtering water and holding flood water", ["making sand", "creating earthquakes", "blocking sunlight"], "Wetlands clean and store water."],
      ["Spotted lanternflies harm New Jersey's ecosystems because they…", "feed on and weaken native plants and crops", ["make the water cold", "help native insects grow", "plant new trees"], "Invasive species harm native ones."],
      ["Bees and butterflies give the ecosystem service of…", "pollinating crops and wildflowers", ["making rain", "building soil from rock", "producing oil"], "Many foods depend on pollinators."],
      ["Which solution would best help a pollinator that is losing habitat?", "planting native flowers along roadsides", ["spraying more insect poison", "paving more parking lots", "mowing every field weekly"], "Food and shelter support pollinators.", true],
      ["Why does a forest with many species recover better after a disease than a forest of one tree type?", "other species survive and keep the ecosystem working", ["diseases never reach mixed forests", "one species always dies", "mixed forests grow faster"], "Biodiversity makes ecosystems stable.", true],
    ],
  ),
];
