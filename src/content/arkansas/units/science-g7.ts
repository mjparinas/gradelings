import type { Unit } from "../../types";
import { SCIENCE_7 as washingtonScience7 } from "../../washington/units/science-68";
import { copyOf, from } from "./kit";

/** Arkansas's own Grade 7 science units (`ar-` ids): copies of other states' units without their places, plus Arkansas items. */
export const UNITS: Unit[] = [
  // A copy of wa-g7-earth-surface without its questions about other states' places.
  copyOf(
    from(washingtonScience7, "wa-g7-earth-surface"),
    {
      id: "ar-g7-earth-surface",
      title: "Earth's Moving Surface",
      emoji: "⛰️",
      blurb: "Plates, the rock cycle and the shaping of the Ozarks and Ouachitas.",
      parentNote:
        "Practices plate tectonics and evidence from fossils, rocks and continent shapes, the rock cycle, and how processes at different speeds shape Earth's surface, with Arkansas examples such as the Ouachita Mountains and the Mississippi River delta lands.",
      standards: ["7-ESS2-1; 7-ESS2-2; 7-ESS2-3", "the rock cycle, forces that change Earth's surface, and evidence of moving plates"],
    },
    [
      ["The Ouachita Mountains have rock layers that are folded and bent. This shows the rock was…", "squeezed when plates pushed together long ago", ["melted by the sun", "laid down by a single flood", "carved by the wind in a day"], "Colliding plates fold rock layers."],
      ["The water at Hot Springs comes out warm because it…", "sinks deep underground, is heated, then rises through cracks", ["is heated by the sun on the surface", "comes from a volcano erupting today", "is warmed by the river"], "Rock gets hotter the deeper you go."],
      ["Diamonds at Crater of Diamonds State Park were carried up from deep inside Earth by…", "magma from an ancient volcanic pipe", ["the Arkansas River", "glaciers", "wind"], "Diamonds form deep in the mantle."],
      ["Sandstone at Petit Jean Mountain formed from…", "sand grains pressed and cemented together", ["cooled lava", "melted ice", "dissolved limestone"], "Sedimentary rock forms from layers of sediment."],
      ["Strong earthquakes in 1811 and 1812 shook northeast Arkansas. Earthquakes happen when…", "rocks along a fault suddenly slip", ["the Moon pulls on rivers", "it rains for many days", "rivers flood"], "Stress builds up, then the rock moves.", true],
      ["The Mississippi River builds new land where it drops mud and sand. Compared with mountain building, this is…", "faster, taking years to thousands of years", ["slower, taking billions of years", "instant, in one second", "impossible"], "Different processes work at different speeds.", true],
    ],
  ),
];
