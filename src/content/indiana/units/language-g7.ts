import type { Unit } from "../../types";
import { LANGUAGE_7 as CALIFORNIA_LANGUAGE_7 } from "../../california/units/language-g7";
import { from, localCopy } from "./kit";

// Indiana copies of Grade 7 reading units that fit Indiana except for a few questions naming another state's places,
// cited with the Indiana standards IDOE's correlation guide pairs with the units' Common Core standards.

export const LANGUAGE_7: Unit[] = [
  localCopy(
    from(CALIFORNIA_LANGUAGE_7, "ca-g7-story-analysis"),
    "in-g7-story-analysis",
    ["7.RC.1; 7.RC.2; 7.RC.4", "citing several pieces of evidence, theme and objective summary, and fiction compared with history"],
  ),
  localCopy(
    from(CALIFORNIA_LANGUAGE_7, "ca-g7-info-analysis"),
    "in-g7-info-analysis",
    ["7.RC.1; 7.RC.5; 7.RC.6; 7.RC.9", "evidence, central ideas, how people, events and ideas interact, and comparing two writers"],
    [
      ["The central idea of an article is…", "the most important point it makes", ["the first word", "the title only"], "Supporting details explain it."],
      ["An author who lists events in time order is using… structure.", "chronological", ["compare and contrast", "problem and solution"], "First, next, then, finally."],
      ["To support a claim about a text, you should cite…", "evidence from the text", ["your own guess", "a random fact"], "Quote or paraphrase the text."],
      ["An objective summary…", "leaves out your opinions", ["adds your feelings", "retells every detail"], "Stick to the main points."],
      ["Two authors write about the first Indianapolis 500 in 1911. Comparing them helps you see…", "how they present the facts differently", ["which one is longer", "who has more pages"], "Authors choose what to stress.", true],
      ["A word with a strong feeling, like 'disaster', shows the author's…", "tone or point of view", ["page number", "headline size"], "Word choice shapes meaning.", true],
    ],
  ),
];
