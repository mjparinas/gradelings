import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { SCIENCE_6 as WASHINGTON_6, SCIENCE_7 as WASHINGTON_7 } from "../../washington/units/science-68";
import { course as BC_8 } from "../../grades/g8/science";
import { copyOf, from } from "./kit";

// Minnesota copies of other states' units. Each keeps the original's questions, leaves out the ones that name another
// state or are about Tribes, and adds Minnesota items where they fit. Their own `mn-` ids keep Minnesota progress apart
// from the originals.
export const UNITS: Unit[] = [
  copyOf(
    from(BC_8.units, "plate-tectonics"),
    {
      id: "mn-g6-plate-tectonics",
      title: "Plate Tectonics",
      emoji: "🌋",
      blurb: "Moving plates, quakes and volcanoes",
      parentNote: "Practices the evidence that Earth's plates move (fossils, rocks, the shapes of continents and the seafloor), what happens at plate boundaries, and how scientists forecast earthquakes and volcanoes to keep people safe.",
      standards: ["6E.2.1.1.2; 6E.2.1.1.3", "fossils, rocks, continents and seafloor as evidence of plate motion, and forecasting natural hazards"],
    },
    [
      ["About 1.1 billion years ago, North America began to split apart along a rift where Lake Superior is now. This rift…", "stopped before the continent broke apart", ["became the Pacific Ocean", "is still splitting Minnesota today", "never happened"], "The Midcontinent Rift failed."],
      ["Minnesota rarely has strong earthquakes because it is…", "far from the edges of a plate", ["on a plate boundary", "under the ocean", "on a volcano"], "Middle of the North American Plate."],
    ]
  ),
  copyOf(
    from(WASHINGTON_7, "wa-g7-earth-surface"),
    {
      id: "mn-g6-earth-surface",
      title: "Earth's Moving Surface",
      emoji: "⛰️",
      blurb: "Plates, the rock cycle and changing land.",
      parentNote: "Practices how Earth's surface changes slowly and quickly, at small and large scales: plates, mountain building, the rock cycle, weathering and erosion, and glaciers, which shaped Minnesota's lakes.",
      standards: ["6E.4.1.1.1; 6E.2.1.1.1", "how Earth's surface changes at different speeds and sizes"],
    },
    [
      ["Most of Minnesota's lakes formed when…", "glaciers melted at the end of the last ice age", ["volcanoes erupted", "an asteroid hit", "people dug them"], "Ice sheets left hollows."],
      ["Huge boulders far from any rock outcrop in Minnesota were most likely carried there by…", "glaciers", ["rivers in a day", "wind", "earthquakes"], "Ice can move big rocks."],
      ["The flat, rich farmland of the Red River Valley was once the bottom of…", "a huge glacial lake", ["an ocean trench", "a volcano", "a desert"], "Glacial Lake Agassiz."],
      ["The wide Minnesota River valley was carved by a giant river of glacial meltwater called…", "Glacial River Warren", ["the Amazon", "the Gulf Stream", "the Colorado River"], "It drained a glacial lake.", true],
      ["Southeastern Minnesota has steep bluffs and valleys instead of glacial lakes because…", "the last glaciers didn't cover it", ["it is on a volcano", "an earthquake made it", "people dug the valleys"], "The Driftless Area.", true],
    ]
  ),
  copyOf(
    from(SCIENCE_COPIES["8"] ?? [], "or-g8-earth-history"),
    {
      id: "mn-g6-earth-history",
      title: "Earth's History & Fossils",
      emoji: "🦴",
      blurb: "Rock strata, the geologic time scale and evidence of change.",
      parentNote: "Practices how rock layers and the fossils in them are used to build the geologic time scale and to work out the relative ages of rocks, with examples from Minnesota, home to some of the oldest rocks in North America.",
      standards: ["6E.3.2.1.1; 6E.1.1.1.2", "rock layers, the geologic time scale and the relative ages of rocks"],
    },
    [
      ["Some rocks in the Minnesota River Valley are about 3.5 billion years old. They are among the…", "oldest rocks in North America", ["youngest rocks on Earth", "rocks from the moon", "newest lava flows"], "Very ancient.", true],
      ["In a stack of rock layers that hasn't been disturbed, the oldest layer is usually…", "at the bottom", ["at the top", "in the middle", "missing"], "Layers pile up over time."],
    ]
  ),
  copyOf(
    from(WASHINGTON_6, "wa-g6-climate"),
    {
      id: "mn-g6-climate",
      title: "Climate & Climate Change",
      emoji: "🌍",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices how sunlight, oceans, latitude and large lakes shape regional climates, the evidence for why Earth's average temperature is rising, and ways to reduce it, with how a warming climate is changing Minnesota's winters.",
      standards: ["6E.1.1.1.3; 6E.3.2.1.3", "the causes of the rise in global temperatures, and ways to lessen human impact"],
    },
    [
      ["Lake Superior keeps nearby Duluth cooler in summer and milder in winter because large lakes…", "warm up and cool down slowly", ["are always frozen", "make wind stop", "block sunlight"], "Water holds heat."],
      ["Minnesota's winters have been warming over the past century. One sign is that many lakes now…", "freeze later and thaw earlier", ["never thaw", "freeze in July", "turn salty"], "Shorter ice season."],
      ["Minnesota has a continental climate, with cold winters and warm summers, because it is…", "far from any ocean", ["on the equator", "next to the Pacific", "on a high mountain"], "In the middle of the continent.", true],
      ["Which gas, released by burning coal, oil and gas, is the main cause of recent warming?", "Carbon dioxide", ["Oxygen", "Nitrogen", "Helium"], "CO2."],
      ["Planting prairie grasses and trees helps fight climate change because plants…", "store carbon from the air", ["release more carbon dioxide", "melt snow", "block rain"], "Plants take in CO2.", true],
    ],
  ),
  copyOf(
    from(WASHINGTON_7, "wa-g7-resources"),
    {
      id: "mn-g6-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are spread unevenly, how scientists forecast natural hazards, and ways to reduce human impact on the environment, including Minnesota's iron ore and groundwater.",
      standards: ["6E.3.2.1.2; 6E.2.1.1.3; 6E.3.2.1.3", "why Earth's resources are spread unevenly, forecasting natural hazards, and lessening human impact"],
    },
    [
      ["Minnesota's Iron Range has rich iron ore because, long ago, iron settled out of…", "ancient seawater into rock layers", ["volcanoes on the moon", "melted glaciers last year", "rivers of gold"], "Banded iron formations."],
      ["Many Minnesota towns get drinking water from groundwater stored in…", "aquifers", ["clouds", "glaciers", "the atmosphere"], "Water-filled rock and sand."],
      ["Spring floods along the Red River are forecast by measuring…", "snow depth and river levels", ["the phases of the moon", "earthquake waves", "sunspots"], "Melting snow fills rivers.", true],
      ["Taconite pellets are made on the Iron Range by crushing rock and…", "pulling out the iron with magnets", ["melting it with lava", "dissolving it in seawater", "drying it in the sun"], "Iron is magnetic.", true],
      ["Reclaimed mine pits on the Iron Range are often turned into…", "lakes and parks", ["new mountains", "volcanoes", "deserts"], "Pits fill with water."],
    ],
  ),
];
