import type { Unit } from "../../types";
import { LANGUAGE_7 as CALIFORNIA_LANGUAGE_7 } from "../../california/units/language-g7";
import { SCIENCE_7 as WASHINGTON_SCIENCE_7 } from "../../washington/units/science-68";
import { units as ALBERTA_SOCIAL_8 } from "../../alberta/g8-social";
import { from, localCopy } from "./kit";

// Wisconsin copies of Grade 7 units that fit Wisconsin except for a few questions naming another state's places.

export const LANGUAGE_COPIES: Unit[] = [
  localCopy(
    from(CALIFORNIA_LANGUAGE_7, "ca-g7-story-analysis"),
    "wi-g7-story-analysis",
    [
      "ELA.7.R.1; ELA.7.R.2; ELA.7.R.7; ELA.7.R.9",
      "citing several pieces of evidence, theme and objective summary, comparing a text with its staged, filmed or audio version, and fiction compared with history",
    ],
  ),
  localCopy(
    from(CALIFORNIA_LANGUAGE_7, "ca-g7-info-analysis"),
    "wi-g7-info-analysis",
    [
      "ELA.7.R.1; ELA.7.R.2; ELA.7.R.3; ELA.7.R.4; ELA.7.R.5; ELA.7.R.7; ELA.7.R.9; ELA.7.L.4",
      "evidence, central ideas, how people, events and ideas interact, word choice, text structure, comparing media versions, comparing two writers, and academic words",
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
        "Two authors write about the Peshtigo Fire. Comparing them helps you see…",
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
    "wi-g7-earth-surface",
    [
      "SCI.m.ESS.2",
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
        "Sedimentary rock like Wisconsin limestone forms from…",
        "layers of sediment pressed together",
        ["cooled lava", "melted metal"],
        "Many contain shells and fossils.",
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
        "Glaciers dropping sand and gravel across Wisconsin is an example of…",
        "deposition",
        ["melting rock", "a volcano"],
        "Ice carries and drops sediment.",
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

export const SOCIAL_COPIES: Unit[] = [
  localCopy(from(ALBERTA_SOCIAL_8, "japan-land-values-ab"), "wi-g7-japan", [
    "SS.Geog4.a.m; SS.BH2.a.m",
    "how Japan's geography shaped its culture and government",
  ]),
];
