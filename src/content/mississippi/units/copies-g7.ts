import type { Unit } from "../../types";
import { LANGUAGE_7 as CALIFORNIA_LANGUAGE_7 } from "../../california/units/language-g7";
import { SCIENCE_6 as TEXAS_SCIENCE_6 } from "../../texas/units/science-6";
import { from, localCopy } from "./kit";

// Mississippi copies of Grade 7 units that fit Mississippi except for a few questions naming another state's places.

export const LANGUAGE_COPIES: Unit[] = [
  localCopy(
    from(CALIFORNIA_LANGUAGE_7, "ca-g7-story-analysis"),
    "ms-g7-story-analysis",
    [
      "RL.7.1; RL.7.2; RL.7.7; RL.7.9",
      "citing several pieces of evidence, theme and objective summary, comparing a text with its staged, filmed or audio version, and fiction compared with history",
    ],
  ),
  localCopy(
    from(CALIFORNIA_LANGUAGE_7, "ca-g7-info-analysis"),
    "ms-g7-info-analysis",
    [
      "RI.7.1; RI.7.2; RI.7.3; RI.7.4; RI.7.5; RI.7.7; RI.7.9; L.7.6",
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
        "Two authors write about the building of Hoover Dam. Comparing them helps you see…",
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
    from(TEXAS_SCIENCE_6, "tx-g6-seasons-tides"),
    "ms-g7-seasons-tides",
    ["E.7.9C", "the seasons as the result of Earth's tilt and the intensity of sunlight on each hemisphere"],
    [
      ["A shrimp boat captain in Biloxi checks tide tables because tides…", "raise and lower the water level each day", ["change the season", "stop the wind", "make the water fresh"], "The moon's pull causes tides."],
      ["Mississippi has long summer days because in June the Northern Hemisphere…", "tilts toward the sun", ["is closest to the moon", "tilts away from the sun", "stops spinning"], "Tilt, not distance, makes the seasons."],
    ],
  ),
];
