import type { Unit } from "../../types";
import { SOCIAL_3 as CALIFORNIA_SOCIAL_3 } from "../../california/units/social-g3";
import { from, localCopy } from "./kit";

// Mississippi copies of Grade 3 units that fit Mississippi except for a few questions naming another state's places.

export const SOCIAL_COPIES: Unit[] = [
  localCopy(
    from(CALIFORNIA_SOCIAL_3, "ca-g3-money-and-voting"),
    "ms-g3-money-and-voting",
    ["3.E.1; 3.CR.2", "how local governments get and use money, and how democracy relies on citizens taking part"],
    [
      ["Catfish raised on a Mississippi farm and sold in a nearby town are made…", "locally", ["in another country", "on the moon", "nowhere"], "Local means close to home."],
      ["A Mississippi county uses property taxes to pay for…", "roads, schools and fire stations", ["toys for one family", "a trip for the mayor", "nothing at all"], "Taxes pay for services everyone shares."],
    ],
  ),
];
