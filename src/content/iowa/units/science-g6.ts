import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { SCIENCE_COPIES as OREGON_SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { SCIENCE_6 as WASHINGTON_SCIENCE_6, SCIENCE_7 as WASHINGTON_SCIENCE_7 } from "../../washington/units/science-68";
import { copyOf, from, localCopy } from "./kit";

// Iowa Grade 6 science: copies of other states' design, rock-cycle, resources and Earth-history units without their
// places, with Iowa examples added. Iowa's science standards (2025) place Earth's surface, resources and hazards, and
// the geologic time scale in Grade 6.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_6: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_6, "wa-g6-design"),
    "ia-g6-design",
    ["6-ETS1-1; 6-ETS1-2; 6-ETS1-3; 6-ETS1-4", "defining design problems, evaluating and testing solutions, and improving designs"],
    [
      ["A limit on a design, like cost or size, is a…", "constraint", ["criterion", "prototype"], "Constraints limit what you can do."],
      ["What a design must do to succeed is its…", "criteria", ["constraints", "materials"], "Criteria say what success looks like."],
      ["A first model you build to test an idea is a…", "prototype", ["criterion", "conclusion"], "Prototypes are tested and improved."],
      ["Engineers testing a new wind turbine blade in Iowa build models first to…", "find weak points before building the real one", ["make it cost more", "skip the design"], "Testing shows what to improve."],
      ["Why compare two designs with the same test?", "to see fairly which works better", ["to make both fail", "to save no data"], "Change one thing at a time.", true],
      ["A design for a bridge over an Iowa river must handle…", "ice in winter and high water in spring floods", ["only desert sand", "no weather at all"], "Conditions are part of the constraints.", true],
    ],
  ),
  localCopy(
    from(WASHINGTON_SCIENCE_7, "wa-g7-earth-surface"),
    "ia-g6-earth-surface",
    ["6-ESS2-1; 6-ESS2-2; 6-ESS2-3", "the rock cycle, surface processes at different scales, and evidence for plate motion"],
    [
      ["The rock cycle shows how rocks…", "change from one type to another", ["never change", "only melt"], "Igneous, sedimentary and metamorphic rocks."],
      ["The limestone under much of Iowa formed from…", "shells and sediment on an ancient sea floor", ["cooled lava", "melted metal"], "Limestone is a sedimentary rock."],
      ["Rock that forms from cooled magma or lava is…", "igneous", ["sedimentary", "metamorphic"], "Granite and basalt are igneous."],
      ["Heat and pressure change rock into… rock.", "metamorphic", ["igneous", "sedimentary"], "Marble forms from limestone."],
      ["Ice Age glaciers that spread across northern Iowa…", "flattened the land and left rocks and soil behind", ["dug the oceans", "built volcanoes", "made the Rocky Mountains"], "Glaciers carry rock and drop it when they melt."],
      ["Matching fossils on continents now far apart are evidence that…", "the continents were once joined", ["fossils can swim oceans", "the oceans are new"], "Plates move slowly.", true],
      ["Wind piling fine silt into the Loess Hills over thousands of years is an example of…", "deposition", ["melting rock", "a volcano"], "Wind carries and drops sediment.", true],
    ],
    {
      blurb: "Plates, the rock cycle and changing landforms.",
      parentNote:
        "Practices plate tectonics and evidence from fossils, rocks and continent shapes, the rock cycle, and how processes at different speeds shape Earth's surface, with Iowa examples like its limestone, its glaciers and the Loess Hills.",
    },
  ),
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "ia-g6-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy, soil and water resources are unevenly spread, and how scientists forecast hazards, with Iowa examples such as its rich prairie soil, its limestone and gypsum, and its tornadoes and floods.",
      standards: ["6-ESS3-1; 6-ESS3-2", "the uneven distribution of Earth's resources, and forecasting natural hazards"],
    },
    [
      ["Iowa's deep, dark farm soil formed over thousands of years under…", "tallgrass prairie", ["a glacier that never melted", "a coral reef", "a desert"], "Prairie roots added rich material to the soil."],
      ["Gypsum, used to make drywall, is mined near Fort Dodge because…", "an ancient sea left it there as it dried up", ["it falls in the rain", "glaciers made it last year", "factories buried it"], "Minerals form only under certain conditions."],
      ["Iowa has many limestone quarries because…", "ancient seas left thick layers of limestone", ["limestone grows on farms", "rivers make new limestone each year", "it was brought by trucks"], "Geology decides where resources are."],
      ["Why are some resources found in only a few places?", "they formed under special conditions long ago", ["people put them there", "they fall from space each year", "they are made by animals today"], "Geology decides where resources are."],
      ["River gauges along the Cedar and Iowa rivers help forecasters…", "warn towns when floodwater will rise", ["predict eclipses", "measure earthquakes", "count fish"], "Rising water upstream reaches towns later."],
      ["Forecasters watch for warm, moist air meeting cold air in spring because it can bring…", "severe storms and tornadoes", ["earthquakes", "volcanoes", "tsunamis"], "Clashing air masses fuel storms.", true],
      ["Why is it harder to forecast a tornado days ahead than a river flood?", "tornadoes form quickly with little warning", ["floods never happen", "tornadoes are always at noon", "rivers do not change"], "Some hazards are hard to predict.", true],
    ],
  ),
  localCopy(
    from(OREGON_SCIENCE_COPIES["8"] ?? [], "or-g8-earth-history"),
    "ia-g6-earth-history",
    ["6-ESS1-4", "using rock layers and fossils to build a time scale of Earth's 4.6-billion-year history"],
    [
      ["In undisturbed rock layers, the youngest layer is…", "on top", ["at the bottom", "in the middle"], "Layers stack over time."],
      ["Coral fossils in Iowa limestone are about 375 million years old. They tell us…", "the area was once covered by a warm sea", ["it was a desert then", "Iowa had glaciers then"], "Corals live in warm, shallow seas."],
      ["Scientists divide Earth's long history into eras and periods using…", "rock layers and the fossils in them", ["the weather today", "city maps", "the phases of the moon"], "This is the geologic time scale."],
      ["Which happened most recently in Iowa?", "Ice Age glaciers covered the north", ["warm seas covered the land", "the first corals grew", "the oldest rocks formed"], "The Ice Age ended about 12,000 years ago."],
      ["Which is older, Iowa's ancient sea rocks or the Ice Age soil on top of them?", "the sea rocks", ["the Ice Age soil", "they are the same age"], "Lower layers formed first.", true],
      ["A layer of volcanic ash found in many places helps scientists…", "match rock layers of the same age", ["measure rainfall", "count animals"], "Key layers mark the same time.", true],
    ],
    {
      title: "Earth's Long History",
      blurb: "Rock layers, fossils and the geologic time scale.",
      parentNote:
        "Practices how rock layers and fossils let scientists build a time scale of Earth's history, with Iowa examples like the coral fossils of its ancient seas and the glaciers of the Ice Age.",
    },
  ),
];
