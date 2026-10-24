import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { copyOf, from } from "./kit";

// Wisconsin Grade 7 science: copies of California's resources and biodiversity units without their California places,
// with Wisconsin examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "wi-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, and how scientists forecast hazards, with Wisconsin examples such as its sand and gravel, its groundwater and river floods.",
      standards: ["SCI.m.ESS.3", "the uneven distribution of Earth's resources, and forecasting natural hazards"],
    },
    [
      ["Sand and gravel pits in Wisconsin exist because… left them behind.", "glaciers", ["oceans", "volcanoes", "tornadoes"], "Melting glaciers dropped sand and gravel."],
      ["Lead was mined in southwestern Wisconsin in the 1800s because…", "lead ore formed in the rocks there long ago", ["glaciers carried it from Canada", "it fell from space", "miners brought it with them"], "Geology decides where minerals are."],
      ["The Driftless Area of southwestern Wisconsin has steep hills and valleys because…", "glaciers never flattened it", ["volcanoes built it", "the ocean dug it out", "people moved the hills"], "Glaciers flattened most of the rest of the state."],
      ["Why are some resources found in only a few places?", "they formed under special conditions long ago", ["people put them there", "they fall from space each year", "they are made by animals today"], "Geology decides where resources are."],
      ["River gauges on the Wisconsin River help forecasters predict…", "floods", ["earthquakes", "volcanoes", "eclipses"], "Rising water upstream warns of floods downstream."],
      ["Radar showing rotating storms helps forecasters warn of…", "tornadoes", ["droughts", "floods only", "earthquakes"], "Rotation can mean a tornado is forming.", true],
      ["Why is it harder to forecast an earthquake than a flood?", "earthquakes give few warning signs", ["floods never happen", "earthquakes are always at noon", "rivers do not change"], "Some hazards are hard to predict.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "wi-g7-biodiversity",
      title: "Biodiversity & Prairies",
      emoji: "🌾",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with Wisconsin examples like prairie and oak savanna restoration, wetlands and invasive species.",
      standards: ["SCI.m.LS.2", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["Only a tiny part of Wisconsin's original prairie is left. Most was turned into…", "farmland", ["ocean", "glaciers", "desert"], "Prairie soil is very fertile."],
      ["Restoring a prairie by planting native grasses and flowers helps…", "bring back many kinds of plants and animals", ["make the land a desert", "stop all insects", "raise the ocean"], "More plant kinds support more animals."],
      ["Wetlands like Horicon Marsh provide ecosystem services such as…", "filtering water and holding flood water", ["making sand", "creating earthquakes", "blocking sunlight"], "Wetlands clean and store water."],
      ["Zebra mussels in Wisconsin lakes harm the ecosystem because they…", "eat the tiny food native animals need", ["make the water cold", "help native fish grow", "plant new trees"], "Invasive species compete with native ones."],
      ["Bees and butterflies give the ecosystem service of…", "pollinating crops and wildflowers", ["making rain", "building soil from rock", "producing oil"], "Many foods depend on pollinators."],
      ["Which solution would best help a pollinator that is losing habitat?", "planting native flowers along roadsides", ["spraying more insect poison", "paving more parking lots", "mowing every field weekly"], "Food and shelter support pollinators.", true],
      ["Why does a forest with many species recover better after the emerald ash borer than a forest of only ash trees?", "other species survive and keep the ecosystem working", ["beetles never reach mixed forests", "one species always dies", "mixed forests grow faster"], "Biodiversity makes ecosystems stable.", true],
    ],
  ),
];
