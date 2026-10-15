import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { copyOf, from } from "./kit";

// Alaska Grade 7 science: copies of California's resources-and-hazards and biodiversity units without their California
// places, with Alaska examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "ak-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, and how scientists map and forecast hazards like earthquakes, tsunamis, floods and wildfires, with Alaska examples.",
      standards: ["MS-ESS3-1; MS-ESS3-2", "the uneven distribution of Earth's resources, and forecasting natural hazards"],
    },
    [
      ["North America's largest oil field is at…", "Prudhoe Bay", ["Kodiak Island", "Denali", "Juneau"], "It is on Alaska's North Slope."],
      ["Oil formed from…", "tiny sea organisms buried and heated over millions of years", ["melted glaciers", "volcanic ash only", "tree sap last year"], "Heat and pressure change buried remains."],
      ["The Red Dog Mine in northwest Alaska is one of the world's biggest sources of…", "zinc", ["salt", "diamonds", "coffee"], "Zinc is used to protect steel from rust."],
      ["Why are mineral deposits found in some places and not others?", "past geologic processes concentrated them there", ["people put them there", "they fall from space each year", "they form wherever it rains"], "Volcanoes, water and plate motion move minerals."],
      ["Which tool helps forecast volcanic eruptions in the Aleutians?", "seismometers that record small earthquakes", ["rain gauges", "telescopes pointed at stars", "fishing nets"], "Magma moving underground shakes the ground."],
      ["Why can scientists warn coastal towns about a tsunami but not predict the exact day of an earthquake?", "a tsunami takes time to cross the ocean after a quake", ["tsunamis happen every Monday", "earthquakes are too small to measure", "the ocean is shallow"], "Sensors detect the quake and the wave.", true],
      ["Spring river flooding in Alaska is often caused by…", "ice jams during breakup", ["drought", "too much sunshine", "volcanic ash"], "Ice blocks the flow of water.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "ak-g7-biodiversity",
      title: "Biodiversity & Kelp Forests",
      emoji: "🦦",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect ecosystems such as Alaska's kelp forests, salmon streams and tundra.",
      standards: ["MS-LS2-5", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["Sea otters eat sea urchins. How does that help kelp forests?", "fewer urchins graze on the kelp", ["otters plant kelp", "otters eat kelp", "urchins grow kelp"], "Too many urchins can wipe out kelp."],
      ["After salmon spawn and die, their bodies…", "add nutrients to the stream and forest", ["poison the river", "turn into rocks", "disappear with no effect"], "Bears also carry salmon into the forest."],
      ["Wetlands slow floodwater and filter water. These benefits are called…", "ecosystem services", ["natural hazards", "fossil fuels", "invasive species"], "Ecosystems give people free benefits."],
      ["Which solution helps salmon reach their spawning streams?", "replacing blocked road culverts with fish-friendly ones", ["building more dams with no passage", "filling in streams", "removing all streamside trees"], "Fish need a clear path upstream."],
      ["An invasive plant crowds out native plants. What happens to biodiversity?", "it goes down", ["it goes up", "it stays exactly the same", "it doubles"], "Fewer kinds of plants mean less variety.", true],
      ["Fishing limits on salmon are set each year to…", "leave enough fish to spawn for future runs", ["catch every fish", "end all fishing", "make the fish bigger"], "Managers count fish returning to rivers.", true],
      ["Why does high biodiversity help an ecosystem recover from change?", "more kinds of organisms can fill different roles", ["fewer species means more food for all", "biodiversity stops all change", "it makes the ecosystem colder"], "Variety makes ecosystems more stable.", true],
    ],
  ),
];
