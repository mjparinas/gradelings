import type { Unit } from "../../types";
import { LANGUAGE_7 as CALIFORNIA_LANGUAGE_7 } from "../../california/units/language-g7";
import { SCIENCE_7 as WASHINGTON_SCIENCE_7 } from "../../washington/units/science-68";
import { from, localCopy } from "./kit";

// Nebraska copies of Grade 7 units that fit Nebraska except for a few questions naming another state's places.

export const LANGUAGE_COPIES: Unit[] = [
  localCopy(
    from(CALIFORNIA_LANGUAGE_7, "ca-g7-story-analysis"),
    "neb-g7-story-analysis",
    [
      "LA.7.RP.1; LA.7.RP.2; LA.7.RP.5",
      "themes and the details that support them, how events and details develop the plot, and fiction compared with history",
    ],
  ),
  localCopy(
    from(CALIFORNIA_LANGUAGE_7, "ca-g7-info-analysis"),
    "neb-g7-info-analysis",
    [
      "LA.7.RI.1; LA.7.RI.2; LA.7.RI.3; LA.7.RI.4; LA.7.RI.5; LA.7.V.1",
      "central ideas and their support, how people, events and ideas interact, the author's perspective, text structure, comparing two writers, and academic words",
    ],
    [
      [
        "The central idea of an article is…",
        "the most important point it makes",
        ["the first word", "the title only"],
        "Supporting details explain it.",
      ],
      [
        "An author who lists events in time order is using… structure.",
        "chronological",
        ["compare and contrast", "problem and solution"],
        "First, next, then, finally.",
      ],
      [
        "To support a claim about a text, you should cite…",
        "evidence from the text",
        ["your own guess", "a random fact"],
        "Quote or paraphrase the text.",
      ],
      [
        "An objective summary…",
        "leaves out your opinions",
        ["adds your feelings", "retells every detail"],
        "Stick to the main points.",
      ],
      [
        "Two authors write about the Blizzard of 1888 in Nebraska. Comparing them helps you see…",
        "how they present the facts differently",
        ["which one is longer", "who has more pages"],
        "Authors choose what to stress.",
        true,
      ],
      [
        "A word with a strong feeling, like 'disaster', shows the author's…",
        "tone or point of view",
        ["page number", "headline size"],
        "Word choice shapes meaning.",
        true,
      ],
    ],
  ),
];

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_7, "wa-g7-earth-surface"),
    "neb-g7-earth-surface",
    [
      "SC.7.13.5.a; SC.7.14.6.a; SC.7.14.6.b",
      "the rock cycle, surface processes at different scales, and evidence for plate motion",
    ],
    [
      [
        "The rock cycle shows how rocks…",
        "change from one type to another",
        ["never change", "only melt"],
        "Igneous, sedimentary and metamorphic rocks.",
      ],
      [
        "Sedimentary rock like the sandstone layers of Scotts Bluff forms from…",
        "layers of sediment pressed together",
        ["cooled lava", "melted metal"],
        "Sandstone forms from layers of sand.",
      ],
      [
        "Rock that forms from cooled magma or lava is…",
        "igneous",
        ["sedimentary", "metamorphic"],
        "Granite and basalt are igneous.",
      ],
      [
        "Heat and pressure change rock into… rock.",
        "metamorphic",
        ["igneous", "sedimentary"],
        "Marble forms from limestone.",
      ],
      [
        "Matching fossils on continents now far apart are evidence that…",
        "the continents were once joined",
        ["fossils can swim oceans", "the oceans are new"],
        "Plates move slowly.",
        true,
      ],
      [
        "A flooding river dropping sand and mud on Nebraska farm fields is an example of…",
        "deposition",
        ["melting rock", "a volcano"],
        "Water carries and drops sediment.",
        true,
      ],
    ],
    {
      blurb: "Plates, the rock cycle and changing landforms.",
      parentNote:
        "Practices plate tectonics and evidence from fossils, rocks and continent shapes, the rock cycle, and how processes at different speeds shape Earth's surface.",
    },
  ),
];
