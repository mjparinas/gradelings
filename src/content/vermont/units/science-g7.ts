import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { copyOf, from } from "./kit";

// Vermont Grade 7 science: copies of California's resources and biodiversity units without their California places,
// with Vermont examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "vt-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, how people monitor and reduce their impact, and how scientists forecast hazards, with Vermont examples such as its granite, marble and slate quarries, its groundwater wells and its spring floods.",
      standards: ["MS-ESS3-1; MS-ESS3-2; MS-ESS3-3", "the uneven distribution of Earth's resources, monitoring and reducing human impact on the environment, and forecasting natural hazards"],
    },
    [
      ["The granite quarried near Barre formed when…", "melted rock cooled slowly deep underground", ["seawater dried up", "sand blew into dunes", "shells piled up on a reef"], "Slow cooling makes the large crystals in granite."],
      ["The marble quarried near Proctor and Danby formed when limestone was changed by…", "heat and pressure deep in the Earth", ["melting into lava", "freezing in a glacier", "drying in the sun"], "Marble is a metamorphic rock."],
      ["Vermont's slate, used for roofs, is found mostly in a narrow band along its western border because…", "the rock formed only under special conditions there", ["people moved it there", "it falls from space", "animals make it each year"], "Geology decides where resources are."],
      ["Testing well water for natural chemicals like arsenic and radon, which come from some rock, helps…", "monitor a risk to people's health", ["make more rock", "stop all rain", "warm the water"], "Some rock adds natural chemicals to groundwater."],
      ["Measuring how much snow is in the mountains in late winter helps forecasters warn of…", "spring floods", ["earthquakes", "eclipses", "droughts only"], "Melting snow raises the rivers."],
      ["Gauges on Vermont rivers that report water levels every few minutes help towns…", "warn people before a flood reaches them", ["make more rain", "stop earthquakes", "move the river"], "Data gives people time to act."],
      ["Small earthquakes sometimes shake Vermont. Seismographs help scientists…", "record them and map where they happen", ["predict eclipses", "forecast snow", "measure rain"], "Even small earthquakes are recorded.", true],
      ["Why is it harder to forecast an earthquake than a flood?", "earthquakes give few warning signs", ["floods never happen", "earthquakes are always at noon", "rivers do not change"], "Some hazards are hard to predict.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "vt-g7-biodiversity",
      title: "Biodiversity & Habitats",
      emoji: "🌾",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with Vermont examples like the Bicknell's thrush of the high peaks, the return of the common loon, zebra mussels in Lake Champlain and the emerald ash borer.",
      standards: ["MS-LS2-5", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["The Bicknell's thrush nests only in the cold spruce and fir forests near the tops of mountains like Mount Mansfield. Protecting those forests protects…", "a species that depends on one habitat", ["the river from flowing", "every bird the same", "the city from growing"], "Some species need one special place."],
      ["Common loons once nearly disappeared from Vermont. Floating nest rafts and signs asking boaters to keep away helped them…", "come back to many lakes", ["leave for the desert", "stop eating fish", "turn into ducks"], "Protecting nests helps a species recover."],
      ["Wetlands provide ecosystem services such as…", "filtering water and holding flood water", ["making sand", "creating earthquakes", "blocking sunlight"], "Wetlands clean and store water."],
      ["Zebra mussels, which arrived in Lake Champlain from far away, harm the lake because they…", "crowd out native mussels and clog pipes", ["make the water warm", "help native fish grow", "plant new trees"], "Invasive species compete with native ones."],
      ["The emerald ash borer, an insect from Asia, kills ash trees. Checking firewood before moving it helps…", "slow its spread", ["feed the insects", "grow more ash trees overnight", "warm the forest"], "Insects can ride along in firewood."],
      ["Which solution would best help a pollinator that is losing habitat?", "planting native flowers along roadsides", ["spraying more insect poison", "paving more parking lots", "mowing every field weekly"], "Food and shelter support pollinators.", true],
      ["Why does a forest with many species recover better after a disease than a forest of one tree type?", "other species survive and keep the ecosystem working", ["diseases never reach mixed forests", "one species always dies", "mixed forests grow faster"], "Biodiversity makes ecosystems stable.", true],
    ],
  ),
];
