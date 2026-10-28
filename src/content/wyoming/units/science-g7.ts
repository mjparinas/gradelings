import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { copyOf, from } from "./kit";

// Wyoming Grade 7 science: copies of California's resources and biodiversity units without their California
// places, with Wyoming examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "wy-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, how people monitor and reduce their impact, and how scientists forecast hazards, with Wyoming examples such as its coal, trona and oil, mine reclamation, testing well water and watching Yellowstone's earthquakes.",
      standards: ["MS-ESS3-3", "monitoring and minimizing the impacts of using Earth's resources on the environment"],
    },
    [
      ["Most of Wyoming's coal is mined in the Powder River Basin because there the coal…", "formed in thick layers from swamp plants long ago", ["falls from the sky", "grows back each year", "was brought by trucks"], "Coal forms from buried plants over millions of years."],
      ["Near Green River, Wyoming has the world's largest deposit of trona, a mineral used to make glass and baking soda. It formed when…", "an ancient lake dried up", ["a volcano erupted last year", "glaciers melted", "people buried it"], "Minerals left by evaporating water."],
      ["Why are some resources found in only a few places?", "they formed under special conditions long ago", ["people put them there", "they fall from space each year", "they are made by animals today"], "Geology decides where resources are."],
      ["Planting native grasses and shrubs on land after a mine closes helps…", "reduce the mine's impact on the land", ["make more coal", "stop all rain", "warm the soil"], "This is called reclamation."],
      ["Testing well water near oil and gas fields helps people…", "monitor a risk to their water", ["make more oil", "stop all rain", "warm the water"], "Monitoring finds problems early."],
      ["Seismographs in Yellowstone record small earthquakes so scientists can…", "watch for changes underground", ["predict eclipses", "forecast snow", "measure rain"], "Monitoring shows what the ground is doing.", true],
      ["Why might a town choose wind power over a new coal plant?", "to cut the gases and pollution it adds to the air", ["wind never stops", "coal is impossible to burn", "wind makes coal"], "Each energy source has costs and benefits.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "wy-g7-biodiversity",
      title: "Biodiversity & Habitats",
      emoji: "🌾",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with Wyoming examples like pronghorn overpasses, sage grouse, black-footed ferrets, wetlands and cheatgrass.",
      standards: ["MS-LS2-5", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["Pronghorn migrate across a highway near Pinedale. Building wildlife overpasses there protects…", "the animals' migration route", ["the river from flowing", "every animal the same", "the town from growing"], "Crossings let animals move safely."],
      ["Wetlands provide ecosystem services such as…", "filtering water and holding flood water", ["making sand", "creating earthquakes", "blocking sunlight"], "Wetlands clean and store water."],
      ["Cheatgrass, a plant from far away, harms Wyoming's sagebrush land because it…", "crowds out native plants and spreads fire", ["makes the soil cold", "helps sage grouse nest", "plants new trees"], "Invasive species compete with native ones."],
      ["Wyoming protects large areas of sagebrush where sage grouse nest because the birds…", "need sagebrush to survive", ["live only in deserts", "eat only fish", "are an invasive species"], "Habitat loss is a big threat to species."],
      ["Black-footed ferrets, once thought extinct, were found near Meeteetse in 1981. Breeding them and releasing them helps…", "restore a species to its ecosystem", ["make prairie dogs disappear", "stop all hunting", "build new towns"], "Recovery programs protect biodiversity."],
      ["Which solution would best help a pollinator that is losing habitat?", "planting native flowers along roadsides", ["spraying more insect poison", "paving more parking lots", "mowing every field weekly"], "Food and shelter support pollinators.", true],
      ["Why does a forest with many species recover better after a beetle outbreak than a forest of one tree type?", "other species survive and keep the ecosystem working", ["beetles never reach mixed forests", "one species always dies", "mixed forests grow faster"], "Biodiversity makes ecosystems stable.", true],
    ],
  ),
];
