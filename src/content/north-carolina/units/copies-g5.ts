import { units as ALBERTA_SCIENCE_3 } from "../../alberta/g3-science";
import type { Unit } from "../../types";
import { SCIENCE_5 as WASHINGTON_SCIENCE_5 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// North Carolina copies of units used in Grade 5 that fit North Carolina except for a few questions naming another
// state's or a Canadian place.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_5, "wa-g5-ecosystems"),
    "nc-g5-ecosystems",
    ["LS.5.2.3", "how plants, animals and decomposers depend on each other in an ecosystem"],
    [
      ["In a salt marsh, marsh grass is a…", "producer", ["consumer", "decomposer"], "It makes its own food from sunlight."],
      ["If the oysters in an estuary died off, the birds that eat them would…", "have less food", ["have more food", "not be affected"], "Living things in an ecosystem depend on each other."],
      ["Mushrooms on a fallen log in a forest are…", "decomposers", ["producers", "predators"], "They break down dead things."],
      ["Shrimp and crabs use estuaries as…", "safe places to grow up", ["deserts", "mountain tops"], "Estuaries are nurseries for many sea animals."],
    ],
    { parentNote: "Practices how matter moves among plants, animals, decomposers and the environment, with examples from forests, salt marshes and estuaries." },
  ),
  localCopy(
    from(ALBERTA_SCIENCE_3, "water-cycle-ab"),
    "nc-g5-water-cycle",
    ["ESS.5.1.4", "how the sun's energy drives evaporation, transpiration, condensation and precipitation"],
    [
      ["Water evaporating from the Pamlico Sound on a hot day is powered by…", "the sun's energy", ["the moon", "the wind alone"], "Heat turns liquid water into vapor."],
      ["Water vapor given off by the leaves of pine trees is called…", "transpiration", ["condensation", "runoff"], "Plants release water through their leaves."],
      ["Clouds form over the mountains when rising air cools and water vapor…", "condenses into tiny drops", ["evaporates", "turns into soil"], "Cooling vapor becomes liquid."],
      ["Rain that falls on the Blue Ridge and flows into the French Broad River is part of…", "runoff", ["transpiration", "evaporation"], "Water flows downhill to rivers."],
    ],
    { parentNote: "Practices how the sun's energy drives the water cycle: evaporation, transpiration, condensation, precipitation and runoff." },
  ),
];
