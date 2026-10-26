import type { Unit } from "../../types";
import { SOCIAL_2 as CALIFORNIA_SOCIAL_2 } from "../../california/units/social-g2";
import { SCIENCE_2 as WASHINGTON_SCIENCE_2 } from "../../washington/units/science-k2";
import { from, localCopy } from "./kit";

// Mississippi copies of Grade 2 units that fit Mississippi except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_2, "wa-g2-earth-changes"),
    "ms-g2-earth-changes",
    ["E.2.10", "how wind and water wear away soil and rock, and ways to slow erosion"],
    [
      ["A spring flood covers a Mississippi field in one day. Is that a fast or slow change?", "fast", ["slow", "no change"], "Floods happen quickly."],
      ["Over many years, the Mississippi River wears away its banks. Is that a fast or slow change?", "slow", ["fast", "no change"], "Erosion takes a long time."],
      ["Planting grass on a bare hillside helps stop…", "soil washing away", ["rain from falling", "wind from blowing", "the sun from shining"], "Roots hold soil in place."],
    ],
  ),
];

export const SOCIAL_COPIES: Unit[] = [
  localCopy(
    from(CALIFORNIA_SOCIAL_2, "ca-g2-reading-maps"),
    "ms-g2-reading-maps",
    ["2.G.1", "reading different kinds of maps with keys, grids and directions"],
    [
      ["A map of Jackson would show…", "streets and buildings in the city", ["the whole world", "only the ocean", "the moon"], "A city map shows a small area up close."],
      ["On a map of Mississippi, the Mississippi River is on the…", "west side", ["east side", "north side only", "south pole"], "Find the compass rose."],
    ],
  ),
];
