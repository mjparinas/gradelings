import type { Unit } from "../../types";
import { SCIENCE_COPIES as oregonCopies } from "../../oregon/units/science-copies";
import { copyOf, from } from "./kit";

/** Arkansas's own Grade 4 science units (`ar-` ids): copies of other states' units without their places, plus Arkansas items. */
export const UNITS: Unit[] = [
  // A copy of or-g4-rocks-erosion without its questions about other states' places.
  copyOf(
    from(oregonCopies["4"] ?? [], "or-g4-rocks-erosion"),
    {
      id: "ar-g4-rocks-erosion",
      title: "Rock Layers & Erosion",
      emoji: "🏞️",
      blurb: "Weathering, erosion and what rock layers tell us.",
      parentNote:
        "Practices how water, ice, wind and plants break down and move rock, and how patterns in rock layers and fossils show how a landscape changed over time, with Arkansas examples such as the Buffalo River bluffs.",
      standards: ["4-ESS1-1; 4-ESS2-1", "rock layers and fossils as clues to change over time, and weathering and erosion"],
    },
    [
      ["Over a very long time, the Buffalo River cut tall bluffs into the rock of the Ozarks. This is an example of…", "erosion by running water", ["a volcano erupting", "an earthquake", "rock melting"], "Moving water carries rock away bit by bit."],
      ["Fossils of sea animals are found in rock layers in the Ozarks. This tells us that long ago the area was…", "covered by a shallow sea", ["always a desert", "covered by a city", "on the moon"], "Sea animals lived in the sea."],
      ["Blanchard Springs Caverns formed when water slowly…", "dissolved limestone underground", ["froze the rock solid", "piled up sand", "built a volcano"], "Slightly acidic water dissolves limestone."],
      ["The flat, rich soil of the Arkansas Delta was laid down by…", "floods of the Mississippi River dropping mud and sand", ["glaciers carving it", "a volcano erupting", "wind blowing it from the ocean"], "When a river floods and slows, it drops what it carried."],
      ["In a cliff with many rock layers, which layer is usually the oldest?", "The bottom layer", ["The top layer", "The middle layer", "They are all the same age"], "Layers pile up one on top of another.", true],
    ],
  ),
];
