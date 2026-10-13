import type { Unit } from "../../types";
import { SCIENCE_8 } from "../../washington/units/science-68";
import { copyOf, from } from "./kit";

// California copies of Washington and Oregon science units built around Pacific Northwest places. Each keeps the
// original's questions, leaves out the ones about Washington, Oregon or Puget Sound, and adds California items: the
// Sierra Nevada, the Central Valley, the San Andreas Fault, kelp forests and the La Brea Tar Pits. Their own `ca-` ids
// keep California progress apart from the originals.

export const SCIENCE_COPIES: Unit[] = [
  copyOf(
    from(SCIENCE_8, "wa-g8-space"),
    {
      id: "ca-g8-space",
      title: "Space Systems",
      emoji: "🪐",
      blurb: "Moon phases, eclipses, seasons, gravity and scale.",
      parentNote:
        "Practices modeling the Earth-sun-moon system (phases, eclipses and seasons), the role of gravity in the solar system and galaxy, and the scale of objects in the solar system.",
      standards: [
        "MS-ESS1-1; MS-ESS1-2; MS-ESS1-3",
        "the Earth-sun-moon system, gravity in the solar system, and its scale",
      ],
    },
    [
      [
        "In June, California has long days because…",
        "the Northern Hemisphere tilts toward the sun",
        [
          "the sun is bigger",
          "Earth is closest to the sun",
          "the moon is full",
        ],
        "Tilt toward the sun.",
      ],
      [
        "In December, the sun at noon in California is…",
        "lower in the sky than in June",
        ["straight overhead", "higher than in June", "below the horizon"],
        "Tilt away from the sun.",
        true,
      ],
    ],
  ),
];
