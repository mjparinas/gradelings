import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { SCIENCE_7 as WASHINGTON_SCIENCE_7 } from "../../washington/units/science-68";
import { copyOf, from, localCopy } from "./kit";

// Missouri Grade 7 science: copies of California's resources and biodiversity units and Washington's Earth's-surface
// unit without their own states' places, with Missouri examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "mo-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, and how scientists forecast hazards, with Missouri examples such as its lead ore, limestone and river floods.",
      standards: ["6-8.ESS3.A.1; 6-8.ESS3.B.1", "the uneven distribution of Earth's resources, and forecasting natural hazards"],
    },
    [
      ["Missouri mines more lead than any other state. Its lead ore, galena, is found mostly in…", "the eastern Ozarks", ["the Bootheel's sandy soil", "the Missouri River's water", "city parks"], "Ore forms only where the rock is right."],
      ["Galena, Missouri's state mineral, is mined for…", "lead", ["salt", "gold", "oil"], "Galena is an ore of lead."],
      ["Limestone quarries are common in Missouri because much of the state sits on rock formed from…", "ancient sea shells and sediment", ["cooled lava", "glacier ice", "desert sand"], "Shallow seas once covered Missouri."],
      ["Why are some resources found in only a few places?", "they formed under special conditions long ago", ["people put them there", "they fall from space each year", "they are made by animals today"], "Geology decides where resources are."],
      ["River gauges on the Missouri River help forecasters predict…", "floods", ["earthquakes", "volcanoes", "eclipses"], "Rising water upstream warns of floods downstream."],
      ["Radar showing rotating storms helps forecasters warn of…", "tornadoes", ["droughts", "floods only", "earthquakes"], "Rotation can mean a tornado is forming.", true],
      ["Scientists can't say exactly when the next big New Madrid earthquake will happen, but they can…", "estimate the chances and help people prepare", ["stop it", "predict the exact day", "move the fault"], "Some hazards are forecast as chances.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "mo-g7-biodiversity",
      title: "Biodiversity & Prairies",
      emoji: "🌾",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with Missouri examples like prairie restoration, wetlands, glades and invasive species.",
      standards: ["6-8.LS2.C.2", "evaluating design solutions that maintain an ecosystem and its biodiversity"],
    },
    [
      ["Most of the tallgrass prairie that once covered northern and western Missouri was turned into…", "farmland", ["ocean", "glaciers", "desert"], "Prairie soil is very fertile."],
      ["Restoring a prairie by planting native grasses and flowers helps…", "bring back many kinds of plants and animals", ["make the land a desert", "stop all insects", "raise the ocean"], "More plant kinds support more animals."],
      ["Wetlands provide ecosystem services such as…", "filtering water and holding flood water", ["making sand", "creating earthquakes", "blocking sunlight"], "Wetlands clean and store water."],
      ["Invasive carp in Missouri's big rivers harm the ecosystem because they…", "eat food native fish need", ["make the water cold", "help native fish grow", "plant new trees"], "Invasive species compete with native ones."],
      ["Bees and butterflies give the ecosystem service of…", "pollinating crops and wildflowers", ["making rain", "building soil from rock", "producing oil"], "Many foods depend on pollinators."],
      ["Which solution would best help monarch butterflies that are losing habitat?", "planting milkweed and native flowers", ["spraying more insect poison", "paving more parking lots", "mowing every field weekly"], "Food and shelter support pollinators.", true],
      ["Why does a forest with many species recover better after a disease than a forest of one tree type?", "other species survive and keep the ecosystem working", ["diseases never reach mixed forests", "one species always dies", "mixed forests grow faster"], "Biodiversity makes ecosystems stable.", true],
    ],
  ),
  localCopy(
    from(WASHINGTON_SCIENCE_7, "wa-g7-earth-surface"),
    "mo-g7-earth-surface",
    ["6-8.ESS2.A.1; 6-8.ESS2.A.2", "the rock cycle driven by Earth's energy, and processes that change the surface at different speeds"],
    [
      ["The rock cycle shows how rocks…", "change from one type to another", ["never change", "only melt"], "Igneous, sedimentary and metamorphic rocks."],
      ["Sedimentary rock like Missouri limestone forms from…", "layers of sediment pressed together", ["cooled lava", "melted metal"], "Many contain shells and fossils."],
      ["The granite boulders at Elephant Rocks State Park formed from…", "cooled magma", ["pressed sand", "dried mud"], "Granite is igneous rock."],
      ["Heat and pressure change rock into… rock.", "metamorphic", ["igneous", "sedimentary"], "Marble forms from limestone."],
      ["Water dissolving limestone over thousands of years made Missouri's…", "caves and springs", ["volcanoes", "glaciers"], "Slow processes shape the land too.", true],
      ["Glaciers dropping soil and rock across northern Missouri is an example of…", "deposition", ["melting rock", "a volcano"], "Ice carries and drops sediment.", true],
    ],
    {
      blurb: "The rock cycle and changing landforms.",
      parentNote:
        "Practices the rock cycle and the energy that drives it, and how processes at very different speeds, from earthquakes to caves forming, shape Earth's surface.",
    },
  ),
];
