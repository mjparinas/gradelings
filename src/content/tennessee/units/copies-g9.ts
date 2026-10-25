import type { Unit } from "../../types";
import { SCIENCE_9 as WASHINGTON_UNITS_SCIENCE_9_SCIENCE_9 } from "../../washington/units/science-9";
import { from, localCopy } from "./kit";

// Tennessee copies of Grade 9 units that fit Tennessee except for a few questions naming another state's places, with
// Tennessee examples added.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_UNITS_SCIENCE_9_SCIENCE_9, "wa-g9-ecosystems"), "tn-g9-ecosystems", ["BIO1.LS2.1; BIO1.LS2.2; BIO1.LS2.3; BIO1.LS2.4", "carrying capacity, energy flow, ecosystem stability and reducing human impacts on biodiversity"], [
      ["The hemlock woolly adelgid, an insect from Asia, has killed many hemlock trees in the Smokies. It is an…", "invasive species", ["native keystone species", "producer"], "It arrived without its natural predators."],
      ["Kudzu, a vine that covers Tennessee hillsides, spreads quickly because…", "it has few natural enemies here", ["it needs no sunlight", "it is a predator"], "Invasive plants outcompete natives."],
      ["Restoring wetlands along the Mississippi River helps by…", "filtering runoff and giving habitat", ["adding pollution", "raising water temperature"], "Wetlands act like filters."],
      ["Only about 10% of energy passes from one trophic level to the next, so…", "food chains rarely have more than four or five levels", ["top predators are most numerous", "producers eat consumers"], "Energy is lost as heat at each step."],
    ], { parentNote: "Practises carrying capacity, energy flow and the 10% rule, how ecosystems respond to disturbance, and evaluating solutions to human impacts on ecosystems and biodiversity." }),
];
