import type { Unit } from "../../types";
import { SCIENCE_2 as washingtonScience2 } from "../../washington/units/science-k2";
import { copyOf, from } from "./kit";

/** Arkansas's own Grade 2 science units (`ar-` ids): copies of other states' units without their places, plus Arkansas items. */
export const UNITS: Unit[] = [
  // A copy of wa-g2-earth-changes without its questions about other states' places.
  copyOf(
    from(washingtonScience2, "wa-g2-earth-changes"),
    {
      id: "ar-g2-earth-changes",
      title: "Fast & Slow Earth Changes",
      emoji: "🌋",
      blurb: "Floods in a day, canyons over ages.",
      parentNote:
        "Practices sorting Earth events into fast ones (floods, landslides, earthquakes) and slow ones (rivers carving valleys, wind wearing down rock), and comparing ways people slow wind and water from changing land, with Arkansas examples.",
      standards: ["2-ESS1-1; 2-ESS2-1", "Earth changes that happen quickly or slowly, and ways to slow wind and water changing the land"],
    },
    [
      ["The Buffalo River cut its tall rock bluffs. Fast or slow?", "Slow, over many years", ["Fast, in one day", "It never changed"], "Rivers wear rock away little by little."],
      ["A big rain makes the Arkansas River flood its banks. Fast or slow?", "Fast", ["Slow", "It takes a million years", "It never happens"], "A flood can come in a day."],
      ["Water slowly melted away rock to make Blanchard Springs Caverns. Fast or slow?", "Slow", ["Fast", "In one storm", "In one minute"], "Caves grow over a very long time."],
      ["What can a farmer plant to keep soil from washing away?", "Grass with strong roots", ["Nothing at all", "Bare dirt", "Loose sand"], "Roots hold soil in place."],
      ["People build a high bank of dirt beside the Mississippi River. It helps…", "keep floodwater off farms and towns", ["make the river flow faster", "dry up the river", "make the water warmer"], "It is called a levee.", true],
    ],
  ),
];
