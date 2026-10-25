import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { copyOf, from } from "./kit";

// Maryland Grade 7 science: copies of California's resources and biodiversity units without their California places,
// with Maryland examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "md-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, and how scientists forecast hazards, with Maryland examples such as western Maryland's coal, the Eastern Shore's sandy soil and river floods.",
      standards: ["MS-ESS3-1; MS-ESS3-2", "the uneven distribution of Earth's resources, and forecasting natural hazards"],
    },
    [
      ["Western Maryland has coal beds because, long ago, it was covered by…", "swamps full of plants", ["deserts", "glaciers only", "volcanoes"], "Coal forms from buried plants."],
      ["The Eastern Shore's soil is sandy because the land is made of…", "old sea and river sand", ["cooled lava", "glacier ice", "coal"], "The coastal plain was once under the sea."],
      ["Sand and gravel dug in southern Maryland were left behind by…", "ancient rivers and seas", ["glaciers", "volcanoes", "tornadoes"], "Water drops sand and gravel where it slows."],
      ["Why are some resources found in only a few places?", "they formed under special conditions long ago", ["people put them there", "they fall from space each year", "they are made by animals today"], "Geology decides where resources are."],
      ["River gauges on the Potomac River help forecasters predict…", "floods", ["earthquakes", "volcanoes", "eclipses"], "Rising water levels upstream warn of floods downstream."],
      ["Satellite pictures of a storm far out in the Atlantic help forecasters warn Maryland of…", "a hurricane days ahead", ["an earthquake", "a drought", "a volcano"], "Hurricanes can be tracked for days.", true],
      ["Why is it harder to forecast an earthquake than a flood?", "earthquakes give few warning signs", ["floods never happen", "earthquakes are always at noon", "rivers do not change"], "Some hazards are hard to predict.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "md-g7-biodiversity",
      title: "Biodiversity & Prairies",
      emoji: "🌾",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with Maryland examples like oyster reefs, Bay grasses and invasive snakehead fish.",
      standards: ["MS-LS2-5", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["The Chesapeake Bay once had huge oyster reefs. Most were lost to…", "overharvesting and disease", ["volcanoes", "glaciers", "sandstorms"], "People took more oysters than could grow back."],
      ["Restoring underwater grasses in the Bay helps…", "bring back many kinds of plants and animals", ["make the land a desert", "stop all insects", "raise the ocean"], "More plant kinds support more animals."],
      ["Wetlands provide ecosystem services such as…", "filtering water and holding flood water", ["making sand", "creating earthquakes", "blocking sunlight"], "Wetlands clean and store water."],
      ["Invasive northern snakehead fish in Maryland rivers harm the ecosystem because they…", "eat food native fish need", ["make the water cold", "help native fish grow", "plant new trees"], "Invasive species compete with native ones."],
      ["Bees and butterflies give the ecosystem service of…", "pollinating crops and wildflowers", ["making rain", "building soil from rock", "producing oil"], "Many foods depend on pollinators."],
      ["Which solution would best help a pollinator that is losing habitat?", "planting native flowers along roadsides", ["spraying more insect poison", "paving more parking lots", "mowing every field weekly"], "Food and shelter support pollinators.", true],
      ["Why does a forest with many species recover better after a disease than a forest of one tree type?", "other species survive and keep the ecosystem working", ["diseases never reach mixed forests", "one species always dies", "mixed forests grow faster"], "Biodiversity makes ecosystems stable.", true],
    ],
  ),
];
