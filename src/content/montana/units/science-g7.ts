import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { copyOf, from } from "./kit";

// Montana Grade 7 science: copies of California's resources and biodiversity units without their California
// places, with Montana examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "mt-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, and how scientists forecast hazards, with Montana examples such as Butte's copper, sapphires, coal in the east, and spring floods and wildfire smoke.",
      standards: ["MS-ESS3-1; MS-ESS3-2", "the uneven distribution of Earth's resources, and forecasting natural hazards"],
    },
    [
      ["Butte grew into a mining city because, long ago, hot fluids deep underground left rich deposits of…", "copper", ["sea salt", "glacier ice", "coral"], "Minerals collect only where conditions were right."],
      ["Thick coal beds lie under eastern Montana because, millions of years ago, the area had…", "swamps full of plants that were buried", ["deserts of salt", "glaciers only", "coral reefs"], "Coal forms from buried plant material."],
      ["Ripple marks on hillsides near Missoula were left when… burst and drained again and again.", "a huge Ice Age lake", ["an ocean", "a volcano", "a tornado"], "Glacial Lake Missoula flooded many times."],
      ["Why are some resources found in only a few places?", "they formed under special conditions long ago", ["people put them there", "they fall from space each year", "they are made by animals today"], "Geology decides where resources are."],
      ["River gauges on the Yellowstone River help forecasters predict…", "floods", ["earthquakes", "volcanoes", "eclipses"], "Rising water levels upstream warn of floods downstream."],
      ["Measuring the mountain snowpack each spring helps Montana forecasters…", "predict how high rivers will rise", ["stop the snow from melting", "make it rain less", "cool the summer"], "More snow means more meltwater.", true],
      ["Why is it harder to forecast an earthquake than a flood?", "earthquakes give few warning signs", ["floods never happen", "earthquakes are always at noon", "rivers do not change"], "Some hazards are hard to predict.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "mt-g7-biodiversity",
      title: "Biodiversity & Ecosystems",
      emoji: "🌾",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with Montana examples like prairie grasslands, whitebark pine forests, invasive weeds and pollinators.",
      standards: ["MS-LS2-5", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["Much of the native prairie in the Great Plains was plowed up for…", "farms", ["oceans", "glaciers", "deserts"], "Grasslands have deep, rich soil."],
      ["Bringing bison back to large areas of Montana prairie helps…", "bring back many kinds of plants and animals", ["make the land a desert", "stop all insects", "raise the rivers"], "Grazing bison shape the grassland."],
      ["Wetlands provide ecosystem services such as…", "filtering water and holding flood water", ["making sand", "creating earthquakes", "blocking sunlight"], "Wetlands clean and store water."],
      ["Spotted knapweed, a weed from Europe, harms Montana grasslands because it…", "crowds out native plants", ["makes the water cold", "helps native grasses grow", "feeds every animal"], "Invasive species have few natural enemies here."],
      ["Bees and butterflies give the ecosystem service of…", "pollinating crops and wildflowers", ["making rain", "building soil from rock", "producing oil"], "Many foods depend on pollinators."],
      ["Which solution would best help a pollinator that is losing habitat?", "planting native flowers along roadsides", ["spraying more insect poison", "paving more parking lots", "mowing every field weekly"], "Food and shelter support pollinators.", true],
      ["Why does a forest with many species recover better after a disease than a forest of one tree type?", "other species survive and keep the ecosystem working", ["diseases never reach mixed forests", "one species always dies", "mixed forests grow faster"], "Biodiversity makes ecosystems stable.", true],
    ],
  ),
];
