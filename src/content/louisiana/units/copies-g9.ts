import type { Unit } from "../../types";
import { SCIENCE_9 as WASHINGTON_UNITS_SCIENCE_9_SCIENCE_9 } from "../../washington/units/science-9";
import { from, localCopy } from "./kit";

// Louisiana copies of high school units that fit Louisiana except for a few questions naming another state's places,
// with Louisiana examples added.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_UNITS_SCIENCE_9_SCIENCE_9, "wa-g9-ecosystems"), "la-g9-ecosystems", ["HS-LS2-1; HS-LS2-4; HS-LS2-6; HS-LS2-7", "carrying capacity, energy in food webs, ecosystem stability and human solutions to protect biodiversity"], [
      ["Only about 10% of the energy at one level of a food chain passes to the next. If marsh grass holds 10,000 units, about how much reaches the snails that eat it?", "1,000 units", ["10,000 units", "100 units"], "Take 10%."],
      ["Restoring barrier islands off the Louisiana coast is an example of…", "a human solution to protect ecosystems", ["a natural disaster", "a food chain"], "People rebuild habitats."],
      ["After an oil spill, a marsh slowly recovers. This shows an ecosystem's…", "resilience", ["carrying capacity is zero", "food chain is gone"], "Ecosystems can bounce back."],
      ["The largest number of nutria a marsh can support is its…", "carrying capacity", ["food chain", "biome"], "Resources set a limit."],
    ]),
];
