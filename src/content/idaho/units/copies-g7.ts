import type { Unit } from "../../types";
import { LANGUAGE_7 as CALIFORNIA_LANGUAGE_7 } from "../../california/units/language-g7";
import { from, localCopy } from "./kit";

// Idaho copies of Grade 7 units that fit Idaho except for a few questions naming another state's places.

export const LANGUAGE_COPIES: Unit[] = [
  localCopy(
    from(CALIFORNIA_LANGUAGE_7, "ca-g7-story-analysis"),
    "id-g7-story-analysis",
    [
      "7.RC.TE.3; 7.RC.L.5a; 7.RC.L.5c; 7.RC.L.5e",
      "citing several pieces of evidence, theme and objective summary, how structure shapes meaning, and fiction compared with history",
    ],
  ),
  localCopy(
    from(CALIFORNIA_LANGUAGE_7, "ca-g7-info-analysis"),
    "id-g7-info-analysis",
    [
      "7.RC.TE.3; 7.RC.NF.6a; 7.RC.NF.6b; 7.RC.NF.6c; 7.RC.NF.6e; 7.VD.WB.2d; 7.VD.AV.3",
      "evidence, central ideas, how people, events and ideas interact, text structure, comparing two writers, word choice, and academic words",
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
        "Two authors write about the Big Burn, the 1910 wildfire in northern Idaho. Comparing them helps you see…",
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
