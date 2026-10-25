import { units as ONTARIO_SCIENCE_3 } from "../../ontario/g3-science";
import type { Unit } from "../../types";
import { from, localCopy } from "./kit";

// North Carolina copies of units used in Grade 3 that fit North Carolina except for a few questions naming Canadian
// places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(ONTARIO_SCIENCE_3, "soil-3"),
    "nc-g3-soil",
    ["LS.3.3.2", "what soil is made of, and how soil supports plant growth"],
    [
      ["Much of North Carolina's Piedmont has soil that looks red because it contains…", "iron", ["salt", "sugar"], "Iron gives clay a reddish color."],
      ["Sweet potatoes grow well in the Coastal Plain's loose, sandy soil because…", "the roots can spread and water drains well", ["the soil is frozen", "there is no soil there"], "Loose soil lets roots grow."],
      ["Earthworms help soil by…", "making tunnels that let in air and water", ["eating all the plants", "turning soil into rock"], "Their tunnels loosen the soil."],
      ["Dead leaves that rot into the soil add…", "nutrients that help plants grow", ["salt", "plastic"], "Decomposed plants feed the soil."],
    ],
  ),
];
