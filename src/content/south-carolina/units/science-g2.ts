import type { Unit } from "../../types";
import { SCIENCE_2 as washingtonScience2 } from "../../washington/units/science-k2";
import { copyOf, from } from "./kit";

/** South Carolina's own Grade 2 science units (`sc-` ids): copies of other states' units without their places, plus South Carolina items. */
export const UNITS: Unit[] = [
  // A copy of wa-g2-earth-changes without its questions about other states' places.
  copyOf(
    from(washingtonScience2, "wa-g2-earth-changes"),
    {
      id: "sc-g2-earth-changes",
      title: "Fast & Slow Earth Changes",
      emoji: "🌋",
      blurb: "Floods in a day, canyons over ages.",
      parentNote:
        "Practices sorting Earth events into fast ones (floods, landslides, earthquakes) and slow ones (rivers carving valleys, waves wearing down a beach), and comparing ways people slow wind and water from changing land, with South Carolina examples.",
      standards: ["2-ESS1-1; 2-ESS2-1", "Earth changes that happen quickly or slowly, and ways to slow wind and water changing the land"],
    },
    [
      ["A hurricane's waves wash away part of a beach near Myrtle Beach in one night. Fast or slow?", "Fast", ["Slow", "It takes a million years", "It never happens"], "A storm can change a beach in hours."],
      ["Rivers in the Blue Ridge Mountains carved deep valleys. Fast or slow?", "Slow, over many years", ["Fast, in one day", "It never changed"], "Rivers wear rock away little by little."],
      ["A big rain makes the Congaree River flood its banks. Fast or slow?", "Fast", ["Slow", "It takes a million years", "It never happens"], "A flood can come in a day."],
      ["People plant sea oats on sand dunes at the beach. The roots help…", "hold the sand in place", ["make the waves bigger", "turn the sand into rock", "dry up the ocean"], "Roots hold sand and soil."],
      ["What can a farmer plant to keep soil from washing away?", "Grass with strong roots", ["Nothing at all", "Bare dirt", "Loose sand"], "Roots hold soil in place."],
      ["People build a wall of rocks along a beach. It helps…", "keep waves from washing the land away", ["make the water warmer", "make the tide stop", "grow more fish"], "It breaks the force of the waves.", true],
    ],
  ),
];
