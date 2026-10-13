import type { Unit } from "../../types";
import { SCIENCE_9 } from "../../washington/units/science-9";
import { copyOf, from } from "./kit";

// California copies of Washington and Oregon science units built around Pacific Northwest places. Each keeps the
// original's questions, leaves out the ones about Washington, Oregon or Puget Sound, and adds California items: the
// Sierra Nevada, the Central Valley, the San Andreas Fault, kelp forests and the La Brea Tar Pits. Their own `ca-` ids
// keep California progress apart from the originals.

export const SCIENCE_COPIES: Unit[] = [
  copyOf(
    from(SCIENCE_9, "wa-g9-ecosystems"),
    {
      id: "ca-g9-ecosystems",
      title: "Ecosystem Dynamics",
      emoji: "🐟",
      blurb: "Carrying capacity, energy pyramids and human impacts.",
      parentNote:
        "Practices carrying capacity, energy flow and the 10% rule, how ecosystems respond to disturbance, and evaluating solutions to human impacts, using California's chaparral, kelp forests and salmon rivers as examples.",
      standards: [
        "HS-LS2-1; HS-LS2-4; HS-LS2-6; HS-LS2-7",
        "carrying capacity, energy flow, ecosystem stability and reducing human impacts on biodiversity",
      ],
    },
    [
      [
        "Chaparral shrubs sprouting again after a wildfire are an example of…",
        "succession",
        ["extinction", "photosynthesis only", "erosion only"],
        "Communities rebuild over time.",
      ],
      [
        "Which solution to help Central Valley salmon is backed by evidence?",
        "Restoring river habitat and removing fish barriers",
        [
          "Adding more barriers that block fish",
          "Draining wetlands",
          "Paving river banks",
        ],
        "Give salmon habitat back.",
        true,
      ],
      [
        "Invasive quagga mussels in California lakes harm ecosystems by…",
        "eating plankton that native animals need",
        [
          "adding biodiversity",
          "pollinating plants",
          "making the water saltier",
        ],
        "Non-native competitors.",
        true,
      ],
      [
        "When sea otters disappear, sea urchins can wipe out kelp. This shows…",
        "how one species can keep an ecosystem stable",
        [
          "that kelp needs no animals",
          "that urchins are producers",
          "that otters eat kelp",
        ],
        "A keystone species.",
        true,
      ],
    ],
  ),
];
