import type { Unit } from "../../types";
import { SCIENCE_8 } from "../../washington/units/science-68";
import { copyOf, from } from "./kit";
import { MORE } from "./science-g8-signals";

// New York copies of Washington science units built around Pacific Northwest places. Each keeps the original's
// questions, leaves out the ones about Washington, Oregon or California, and adds New York items: the rock layers of its
// gorges, the ancient sea over western New York, the Ice Age that shaped its valleys and its seasons. Their own `ny-` ids
// keep New York progress apart from the originals.
export const UNITS: Unit[] = [
  copyOf(
    from(SCIENCE_8, "wa-g8-earth-history"),
    {
      id: "ny-g8-earth-history",
      title: "Earth's History",
      emoji: "🦕",
      blurb: "Rock layers, the fossil record and common ancestors.",
      parentNote:
        "Practices using rock strata to organize Earth's 4.6-billion-year history, reading patterns in the fossil record, and comparing body structures for evidence of common ancestry, with the rock layers and sea fossils of New York's gorges as examples.",
      standards: [
        "MS-ESS1-4; MS-LS4-1; MS-LS4-2",
        "rock strata and Earth's history, the fossil record, and anatomical evidence of common ancestry",
      ],
    },
    [
      ["In the rock walls of a New York gorge, the lowest layers are usually…", "the oldest", ["the youngest", "made last", "all the same age"], "Layers stack up over time."],
      ["Fossils of sea creatures in rocks across western New York show that, long ago, the area was…", "covered by a shallow sea", ["a high desert", "the top of a volcano", "a grassland"], "Sea animals lived there."],
      ["The Finger Lakes and many New York valleys were shaped during the most recent…", "Ice Age", ["age of the dinosaurs", "Cambrian explosion", "Bronze Age"], "Glaciers covered the state.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_8, "wa-g8-space"),
    {
      id: "ny-g8-space",
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
      ["In June, New York has long days because…", "the Northern Hemisphere tilts toward the sun", ["the sun is bigger", "Earth is closest to the sun", "the moon is full"], "Tilt toward the sun."],
      ["In December, the noon sun over New York is…", "lower in the sky than in June", ["straight overhead", "higher than in June", "below the horizon"], "Tilt away from the sun.", true],
    ],
  ),
  ...MORE,
];
