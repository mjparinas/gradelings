import type { GradeRich } from "./index";
import * as q from "./questions";

// Which units mix in the newer question kinds, by grade. Add a unit here to give it some variety.

export const RICH: Record<string, GradeRich> = {
  pk: {
    "math/count-to-5": q.sayCount(2, 5),
    "language/first-sounds": q.sayPicture,
  },
  k: {
    "math/count-to-10": q.sayCount(3, 10),
    "language/first-sounds": q.sayPicture,
  },
  g1: {
    "math/numbers-to-20": q.sayCount(6, 20),
    "language/word-families": q.wordPictures,
    "language/blend-it": q.buildWord,
    "science/living-things": q.livingThings,
  },
  g2: { "science/life-cycles": q.babyAnimals },
  g3: {
    "language/word-jobs": q.wordJobs,
    "language/sentence-smarts": q.sentenceBuild,
    "math/multiplication": q.multiplyMistake,
    "science/grouping-living-things": q.mammals,
  },
  g4: {
    "language/parts-of-speech": q.partsOfSpeech,
    "math/times-tables": q.timesTableMultiples,
    "math/equations": q.oneStepMistake,
    "science/phase-changes": q.phaseChanges,
  },
  g5: {
    "language/verb-tenses": q.verbTenses,
    "math/equivalent-fractions": q.equivalentFill,
  },
  g6: { "math/equations": q.twoStepMistake },
};
