import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { SCIENCE_7 as WASHINGTON_SCIENCE_7 } from "../../washington/units/science-68";
import { copyOf, from, localCopy } from "./kit";

// Indiana Grade 7 science: Indiana teaches Earth's surface, rocks and resources in Grade 7, so this grade has copies of
// California's resources unit and Washington's Earth's-surface unit without their own states' places, with Indiana
// examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "in-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, and how scientists forecast hazards, with Indiana examples such as its limestone, coal and rich farm soil and river floods.",
      standards: ["MS-ESS3-1; MS-ESS3-2", "the uneven distribution of Earth's resources, and forecasting natural hazards"],
    },
    [
      ["The limestone quarried around Bedford, Indiana, formed from…", "shells of sea animals on an ancient sea floor", ["cooled lava", "melted glaciers", "desert sand"], "A shallow sea covered Indiana long ago."],
      ["Southwestern Indiana has coal beds because, long ago, it was covered by…", "swamps full of plants", ["deserts", "glaciers only", "volcanoes"], "Coal forms from buried plants."],
      ["Much of central Indiana has rich farm soil because… left fine soil behind.", "glaciers", ["volcanoes", "ocean salt", "desert winds"], "Melting glaciers dropped soil, sand and gravel."],
      ["Why are some resources found in only a few places?", "they formed under special conditions long ago", ["people put them there", "they fall from space each year", "they are made by animals today"], "Geology decides where resources are."],
      ["River gauges on the Wabash River help forecasters predict…", "floods", ["earthquakes", "volcanoes", "eclipses"], "Rising water levels upstream warn of floods downstream."],
      ["Radar showing rotating storms helps forecasters warn of…", "tornadoes", ["droughts", "floods only", "earthquakes"], "Rotation can mean a tornado is forming.", true],
      ["Why is it harder to forecast an earthquake than a flood?", "earthquakes give few warning signs", ["floods never happen", "earthquakes are always at noon", "rivers do not change"], "Some hazards are hard to predict.", true],
    ],
  ),
  localCopy(
    from(WASHINGTON_SCIENCE_7, "wa-g7-earth-surface"),
    "in-g7-earth-surface",
    ["MS-ESS2-1; MS-ESS2-2; MS-ESS2-3", "the rock cycle, surface processes at different scales, and evidence for plate motion"],
    [
      ["Underground water slowly dissolving limestone made the caves of southern Indiana. This is…", "chemical weathering", ["a volcano", "plate collision", "melting"], "Slightly acidic water dissolves limestone."],
      ["Glaciers flattened northern and central Indiana but not the hills of the south. This shows that…", "surface processes can shape huge areas over thousands of years", ["glaciers never moved", "hills are always new", "rivers make mountains overnight"], "Ice sheets once covered much of the state."],
      ["Wind piling sand into the Indiana Dunes is an example of…", "deposition", ["erosion by ice", "melting rock", "a fault"], "Wind drops sand where it slows."],
      ["Limestone is a sedimentary rock. Heat and pressure deep underground can change it into…", "marble", ["coal", "sand", "granite"], "This is a metamorphic change."],
      ["Matching fossils on continents now far apart is evidence that…", "the continents were once joined", ["fossils can swim across oceans", "the continents never moved", "fossils formed in space"], "Plates carry continents.", true],
      ["Why is southern Indiana hillier than central Indiana?", "the glaciers did not reach it to flatten it", ["it has volcanoes", "it was under the ocean last year", "people built the hills"], "Unglaciated land kept its hills and valleys.", true],
    ],
  ),
];
