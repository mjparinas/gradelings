import type { Unit } from "../../types";
import { SCIENCE_COPIES as oregonCopies } from "../../oregon/units/science-copies";
import { copyOf, from } from "./kit";

/** South Carolina's own Grade 4 science units (`sc-` ids): copies of other states' units without their places, plus South Carolina items. */
export const UNITS: Unit[] = [
  // A copy of or-g4-rocks-erosion without its questions about other states' places.
  copyOf(
    from(oregonCopies["4"] ?? [], "or-g4-rocks-erosion"),
    {
      id: "sc-g4-rocks-erosion",
      title: "Rock Layers & Erosion",
      emoji: "🏞️",
      blurb: "Weathering, erosion and what rock layers tell us.",
      parentNote:
        "Practices how water, ice, wind and plants break down and move rock, and how patterns in rock layers and fossils show how a landscape changed over time, with South Carolina examples such as the Sandhills and the coast.",
      standards: ["4-ESS1-1; 4-ESS2-1", "rock layers and fossils as clues to change over time, and weathering and erosion"],
    },
    [
      ["The Sandhills in the middle of South Carolina are made of sand from ancient beaches. This tells us that long ago…", "the ocean reached much farther inland", ["the area was a volcano", "the sand fell from space", "a city stood there"], "Beaches form at the edge of the sea."],
      ["Shark teeth fossils are often found far from the beach in South Carolina. This tells us the land was once…", "under the sea", ["always a desert", "covered by a city", "on the moon"], "Sharks live in the sea."],
      ["Waves and storms slowly move sand along South Carolina's beaches. This is an example of…", "erosion", ["a volcano erupting", "rock melting", "photosynthesis"], "Moving water carries sand away."],
      ["Rivers flowing from the Blue Ridge carry mud and sand toward the coast. Where they slow down, they…", "drop the mud and sand", ["pick up more speed", "turn into rock at once", "flow uphill"], "Slow water drops what it carried."],
      ["In a cliff with many rock layers, which layer is usually the oldest?", "The bottom layer", ["The top layer", "The middle layer", "They are all the same age"], "Layers pile up one on top of another.", true],
    ],
  ),
];
