import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { SCIENCE_COPIES as OREGON_SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { SCIENCE_7 as WASHINGTON_SCIENCE_7 } from "../../washington/units/science-68";
import { copyOf, from, localCopy } from "./kit";

// Idaho Grade 6 science: copies of other states' rock-cycle, resources and Earth-history units without their places,
// with Idaho examples added (the Snake River Plain's basalt, the Ice Age floods, the Gem State's minerals and the
// Clarkia fossils). Idaho's middle school earth science standards (MS-ESS) are one band for Grades 6 to 8.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_6: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_7, "wa-g7-earth-surface"),
    "id-g6-earth-surface",
    ["MS-ESS-2.1; MS-ESS-2.2; MS-ESS-2.3", "the rock cycle, surface processes at different scales, and evidence for plate motion"],
    [
      ["The rock cycle shows how rocks…", "change from one type to another", ["never change", "only melt"], "Igneous, sedimentary and metamorphic rocks."],
      ["The dark basalt under the Snake River Plain formed from…", "cooled lava", ["shells on a sea floor", "melted metal"], "Basalt is an igneous rock."],
      ["Rock made from layers of sand, mud or shells pressed together is…", "sedimentary", ["igneous", "metamorphic"], "Sandstone and limestone are sedimentary."],
      ["Heat and pressure change rock into… rock.", "metamorphic", ["igneous", "sedimentary"], "Marble forms from limestone."],
      ["Ice Age floods that burst from a glacier-dammed lake and rushed across northern Idaho…", "carried huge loads of rock and soil far away", ["built new volcanoes", "made the Rocky Mountains", "froze the rivers solid"], "Floodwater can move giant boulders."],
      ["Matching fossils on continents now far apart are evidence that…", "the continents were once joined", ["fossils can swim oceans", "the oceans are new"], "Plates move slowly.", true],
      ["Wind piling sand into the Bruneau Dunes over thousands of years is an example of…", "deposition", ["melting rock", "a volcano"], "Wind carries and drops sediment.", true],
    ],
    {
      blurb: "Plates, the rock cycle and changing landforms.",
      parentNote:
        "Practices plate tectonics and evidence from fossils, rocks and continent shapes, the rock cycle, and how processes at different speeds shape Earth's surface, with Idaho examples like the basalt of the Snake River Plain, the Ice Age floods and the Bruneau Dunes.",
    },
  ),
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "id-g6-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, and how scientists forecast hazards, with Idaho examples such as the Silver Valley's silver, the star garnets of the Gem State, phosphate for fertilizer, mountain snowpack, wildfires and earthquakes.",
      standards: ["MS-ESS-3.1; MS-ESS-3.2", "the uneven distribution of Earth's resources, and forecasting natural hazards"],
    },
    [
      ["Idaho is called the Gem State because…", "many kinds of gems and minerals are found there", ["it makes all the world's glass", "it has no rocks", "gems fall in its rain"], "Star garnets are found in only a few places on Earth."],
      ["The Silver Valley in northern Idaho has rich silver, lead and zinc because…", "hot fluids long ago left minerals in cracks in the rock", ["people buried them there", "rivers make new silver each year", "glaciers dropped coins"], "Minerals form only under certain conditions."],
      ["Mines in southeastern Idaho dig phosphate rock, which is used to make…", "farm fertilizer", ["glass windows", "table salt", "paper"], "Plants need phosphorus to grow."],
      ["Why are some resources found in only a few places?", "they formed under special conditions long ago", ["people put them there", "they fall from space each year", "they are made by animals today"], "Geology decides where resources are."],
      ["Measuring the snowpack in Idaho's mountains each winter helps forecasters…", "predict spring floods and summer water supply", ["predict eclipses", "measure earthquakes", "count fish"], "Melting snow fills the rivers."],
      ["Forecasters warn of fire danger when late summer weather is…", "hot, dry and windy", ["cold and snowy", "calm and rainy", "cloudy and wet"], "Dry fuel and wind help fires spread.", true],
      ["Why is an earthquake harder to forecast than a spring flood from melting snow?", "earthquakes strike with little or no warning", ["floods never happen", "earthquakes always happen at noon", "snow never melts"], "Some hazards are hard to predict.", true],
    ],
  ),
  localCopy(
    from(OREGON_SCIENCE_COPIES["8"] ?? [], "or-g8-earth-history"),
    "id-g6-earth-history",
    ["MS-ESS-1.4", "using rock layers and fossils to build a time scale of Earth's 4.6-billion-year history"],
    [
      ["In undisturbed rock layers, the youngest layer is…", "on top", ["at the bottom", "in the middle"], "Layers stack over time."],
      ["Leaf fossils at Clarkia in northern Idaho are about 15 million years old. They show the area was then…", "warmer, with a forest beside a lake", ["a dry desert", "covered by glaciers"], "The leaves are so well kept that some are still green."],
      ["Scientists divide Earth's long history into eras and periods using…", "rock layers and the fossils in them", ["the weather today", "city maps", "the phases of the moon"], "This is the geologic time scale."],
      ["Which happened most recently in Idaho?", "the Bonneville Flood rushed down the Snake River", ["dinosaurs lived", "the oldest rocks formed", "the Hagerman horse lived"], "The flood was about 17,000 years ago."],
      ["Which is older, the Hagerman horse fossils or the boulders left by the Bonneville Flood?", "the Hagerman horse fossils", ["the flood boulders", "they are the same age"], "The Hagerman horses lived millions of years ago.", true],
      ["A layer of volcanic ash found in many places helps scientists…", "match rock layers of the same age", ["measure rainfall", "count animals"], "Key layers mark the same time.", true],
    ],
    {
      title: "Earth's Long History",
      blurb: "Rock layers, fossils and the geologic time scale.",
      parentNote:
        "Practices how rock layers and fossils let scientists build a time scale of Earth's history, with Idaho examples like the Clarkia fossil leaves, the Hagerman horse and the Bonneville Flood.",
    },
  ),
];
