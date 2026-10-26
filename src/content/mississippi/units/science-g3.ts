import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g3";
import { copyOf, from } from "./kit";

// Mississippi Grade 3 science: a copy of California's fossil unit without its California places, with Mississippi
// examples added.

export const SCIENCE_3: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g3-fossils"),
    {
      id: "ms-g3-fossils",
      title: "Fossils & Rock Layers",
      emoji: "🦴",
      blurb: "What fossils and rock layers tell us about long ago.",
      parentNote:
        "Practices how fossils form, how rock layers stack with the oldest at the bottom, and what fossils show about places long ago, such as the ancient whale bones and seashells found far from Mississippi's coast and the stone logs of the petrified forest near Flora.",
      standards: ["E.3.7A; L.3.4", "fossil formation and the superposition of rock layers, and how living things fit their environments"],
    },
    [
      ["Mississippi's state fossil is a prehistoric…", "whale", ["dinosaur", "mammoth", "shark"], "It swam in a warm sea long ago."],
      ["Ancient whale bones found in central Mississippi show the land was once…", "under the sea", ["a frozen desert", "a volcano", "a high mountain"], "Whales live in the ocean."],
      ["Near Flora, Mississippi, there are logs that slowly turned to stone. They are…", "petrified wood", ["plastic", "ice", "glass"], "Minerals filled the wood over a very long time."],
      ["Seashell fossils in a Mississippi field far from the Gulf tell us the field was once…", "covered by sea", ["a glacier", "a city", "a lava field"], "The sea once reached much farther inland."],
      ["Which of these can become a fossil?", "a shell pressed in mud", ["a cloud", "a song", "a shadow"], "Hard parts last longest."],
      ["Fossils are most often found in…", "sedimentary rock", ["lava that just cooled", "glass", "ice cubes"], "Layers of mud and sand harden into rock."],
      ["In layers of rock, the oldest layer is usually…", "at the bottom", ["at the top", "in the middle", "in the air"], "Lower layers formed first.", true],
      ["A shark-tooth fossil is found in a layer below a leaf fossil. Which lived first?", "the shark", ["the leaf's plant", "both at once", "neither"], "Deeper layers are older.", true],
    ],
  ),
];
