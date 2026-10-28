import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { copyOf, from } from "./kit";

// Washington, DC Grade 7 science: copies of California's resources and biodiversity units without their California
// places, with DC examples added (the stone of the capital's buildings, lead pipes, Potomac flood gauges and the 2011
// earthquake; the Hay's Spring amphipod, bald eagles, snakeheads and the emerald ash borer).

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "dc-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, how people monitor and reduce their impact, and how scientists forecast hazards, with Washington, DC examples such as the stone of its famous buildings, testing tap water for lead, river gauges on the Potomac and the earthquake of 2011.",
      standards: ["MS-ESS3-1; MS-ESS3-2; MS-ESS3-3", "the uneven distribution of Earth's resources, monitoring and reducing human impact on the environment, and forecasting natural hazards"],
    },
    [
      ["Granite, used in many monuments and buildings in Washington, DC, formed when…", "melted rock cooled slowly deep underground", ["seawater dried up", "sand blew into dunes", "shells piled up on a reef"], "Slow cooling makes the large crystals in granite."],
      ["The marble of the Washington Monument formed when limestone was changed by…", "heat and pressure deep in the Earth", ["melting into lava", "freezing in a glacier", "drying in the sun"], "Marble is a metamorphic rock."],
      ["The builders of the White House shipped sandstone up the Potomac from a quarry downriver because…", "good building stone is found only in certain places", ["every place has the same rocks", "stone falls from space", "rivers make stone each year"], "Geology decides where resources are."],
      ["Testing tap water in older DC homes for lead from old pipes, and replacing those pipes, helps…", "reduce a risk to people's health", ["make more rock", "stop all rain", "warm the water"], "Lead can dissolve from old pipes into water."],
      ["Measuring heavy rain and melting snow far upstream helps forecasters warn of…", "floods on the Potomac", ["earthquakes", "eclipses", "droughts only"], "Water from upstream raises the river in DC days later."],
      ["A gauge at Little Falls that reports the Potomac's level every few minutes helps the city…", "warn people before a flood reaches them", ["make more rain", "stop earthquakes", "move the river"], "Data gives people time to act."],
      ["An earthquake in 2011 shook Washington, DC from about 90 miles away. Seismographs help scientists…", "record earthquakes and map where they happen", ["predict eclipses", "forecast snow", "measure rain"], "Even distant earthquakes are recorded.", true],
      ["Why is it harder to forecast an earthquake than a flood?", "earthquakes give few warning signs", ["floods never happen", "earthquakes are always at noon", "rivers do not change"], "Some hazards are hard to predict.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "dc-g7-biodiversity",
      title: "Biodiversity & Habitats",
      emoji: "🌾",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with Washington, DC examples like the Hay's Spring amphipod, a tiny animal found almost nowhere but DC's springs, the return of bald eagles, snakehead fish in the Potomac and the emerald ash borer.",
      standards: ["MS-LS2-5", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["The Hay's Spring amphipod, a tiny endangered animal, lives in only a few springs in and near Rock Creek Park. Protecting those springs protects…", "a species that depends on one habitat", ["the river from flowing", "every animal the same", "the city from growing"], "Some species need one special place."],
      ["Bald eagles once nearly disappeared from the Washington area. Banning the pesticide DDT and protecting nest trees helped them…", "come back and nest along DC's rivers", ["leave for the desert", "stop eating fish", "turn into ducks"], "Removing a threat helps a species recover."],
      ["Wetlands provide ecosystem services such as…", "filtering water and holding flood water", ["making sand", "creating earthquakes", "blocking sunlight"], "Wetlands clean and store water."],
      ["Northern snakeheads, fish from Asia now found in the Potomac, can harm the river because they…", "eat and compete with native fish", ["make the water warm", "help native fish grow", "plant new trees"], "Invasive species compete with native ones."],
      ["The emerald ash borer, an insect from Asia, kills ash trees. Checking firewood before moving it helps…", "slow its spread", ["feed the insects", "grow more ash trees overnight", "warm the forest"], "Insects can ride along in firewood."],
      ["Which solution would best help a pollinator that is losing habitat?", "planting native flowers along roadsides", ["spraying more insect poison", "paving more parking lots", "mowing every field weekly"], "Food and shelter support pollinators.", true],
      ["Why does a forest with many species recover better after a disease than a forest of one tree type?", "other species survive and keep the ecosystem working", ["diseases never reach mixed forests", "one species always dies", "mixed forests grow faster"], "Biodiversity makes ecosystems stable.", true],
    ],
  ),
];
