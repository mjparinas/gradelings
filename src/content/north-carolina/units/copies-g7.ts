import { INFO_ANALYSIS_7, STORY_ANALYSIS_7 } from "../../california/units/language-g7";
import type { Unit } from "../../types";
import { localCopy } from "./kit";

// North Carolina copies of California's Grade 7 reading units, without the passages set in California (the 1906 San
// Francisco earthquake, the railroad built from Sacramento).

export const LANGUAGE_COPIES: Unit[] = [
  localCopy(STORY_ANALYSIS_7, "nc-g7-story-analysis", [
    "RL.7.1; RL.7.2; RL.7.7; RL.7.9",
    "citing several pieces of evidence, theme and objective summary, comparing a text with its staged, filmed or audio version, and fiction compared with history",
  ]),
  localCopy(
    INFO_ANALYSIS_7,
    "nc-g7-info-analysis",
    [
      "RI.7.1; RI.7.2; RI.7.3; RI.7.4; RI.7.5; RI.7.7; RI.7.9; L.7.6",
      "evidence, central ideas, how people, events and ideas interact, word choice, text structure, comparing media versions, comparing two writers, and academic words",
    ],
    [
      ["An article about the Wright brothers says their first flight lasted 12 seconds. What kind of detail is this?", "a fact that can be checked", ["an opinion", "a theme"], "Facts can be proved true or false."],
      ["Two articles about the Greensboro sit-ins tell the same events but quote different people. What should a reader compare?", "which evidence each writer chose to include", ["which article has more pages", "which article has the longer title"], "Writers emphasize different evidence."],
      ["A section of an article compares a river before and after a flood. What is this structure?", "compare and contrast", ["chronological order", "problem and solution"], "It shows how two things differ."],
      ["Which sentence best states a central idea of an article about the Outer Banks lighthouses?", "Lighthouses helped ships avoid dangerous shoals along a stormy coast.", ["Lighthouses are tall.", "I would like to visit a lighthouse."], "A central idea is the main point the text develops."],
      ["In the phrase “a deluge of letters poured in,” what does “deluge” suggest?", "a huge number arriving at once", ["a single letter", "letters lost in the rain"], "Deluge means a great flood."],
    ],
  ),
];
