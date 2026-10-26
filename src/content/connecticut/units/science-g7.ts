import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { copyOf, from } from "./kit";

// Connecticut Grade 7 science: copies of California's resources and biodiversity units without their California
// places, with Connecticut examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "ct-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, and how scientists forecast hazards, with Connecticut examples such as its brownstone and traprock, the rich soil of the Connecticut River valley, and coastal storms.",
      standards: ["MS-ESS3-1; MS-ESS3-2", "the uneven distribution of Earth's resources, and forecasting natural hazards"],
    },
    [
      ["Brownstone was quarried in Portland, Connecticut, because, long ago, the area had…", "layers of sand that hardened into rock", ["deserts of salt", "glaciers only", "coral reefs"], "Brownstone is a sandstone."],
      ["Farms along the Connecticut River valley have rich soil because…", "floods and an old glacial lake left fine sediment", ["volcanoes", "ocean salt", "desert sand"], "Rivers and lakes drop fine soil."],
      ["Stone walls and boulders all over Connecticut fields are there because… left the rocks behind.", "glaciers", ["oceans", "volcanoes", "tornadoes"], "Melting glaciers dropped rocks of every size."],
      ["Why are some resources found in only a few places?", "they formed under special conditions long ago", ["people put them there", "they fall from space each year", "they are made by animals today"], "Geology decides where resources are."],
      ["River gauges on the Connecticut River help forecasters predict…", "floods", ["earthquakes", "volcanoes", "eclipses"], "Rising water levels upstream warn of floods downstream."],
      ["Satellites tracking a hurricane far out at sea help Connecticut prepare because…", "they show its path days ahead", ["they stop the storm", "they make it rain less", "they cool the ocean"], "Forecasts give people time to get ready.", true],
      ["Why is it harder to forecast an earthquake than a flood?", "earthquakes give few warning signs", ["floods never happen", "earthquakes are always at noon", "rivers do not change"], "Some hazards are hard to predict.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "ct-g7-biodiversity",
      title: "Biodiversity & Ecosystems",
      emoji: "🌾",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with Connecticut examples like salt marsh restoration, hemlock forests and pollinators.",
      standards: ["MS-LS2-5", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["Many Connecticut salt marshes were once filled in for…", "roads, houses and farms", ["ocean", "glaciers", "desert"], "People built on the flat land by the shore."],
      ["Restoring a salt marsh by letting the tide flow back in helps…", "bring back many kinds of plants and animals", ["make the land a desert", "stop all insects", "raise the ocean"], "Marsh grasses shelter fish, crabs and birds."],
      ["Wetlands provide ecosystem services such as…", "filtering water and holding flood water", ["making sand", "creating earthquakes", "blocking sunlight"], "Wetlands clean and store water."],
      ["The hemlock woolly adelgid, an insect from Asia, harms Connecticut forests because it…", "kills eastern hemlock trees", ["makes the water cold", "helps native trees grow", "plants new trees"], "Invasive species have few natural enemies here."],
      ["Bees and butterflies give the ecosystem service of…", "pollinating crops and wildflowers", ["making rain", "building soil from rock", "producing oil"], "Many foods depend on pollinators."],
      ["Which solution would best help a pollinator that is losing habitat?", "planting native flowers along roadsides", ["spraying more insect poison", "paving more parking lots", "mowing every field weekly"], "Food and shelter support pollinators.", true],
      ["Why does a forest with many species recover better after a disease than a forest of one tree type?", "other species survive and keep the ecosystem working", ["diseases never reach mixed forests", "one species always dies", "mixed forests grow faster"], "Biodiversity makes ecosystems stable.", true],
    ],
  ),
];
