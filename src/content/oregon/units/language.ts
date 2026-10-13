import type { GenerateOptions, GradeId, Question, Unit } from "../../types";
import { RML_8, RML_9 } from "../../washington/units/language-rml-upper";
import { ore } from "../cite";
import { STORY_OR_FACTS, FIRSTHAND_SECONDHAND } from "./language-reading";

// Oregon-only language units, per grade. Oregon has no Research and Media Literacy strand, so Washington's research and
// media units are cited to Oregon's writing, speaking and informational reading codes. Most are adopted in
// ../plan/language.ts. Two hold a few questions that don't fit Oregon (a Washington statehood source, and "native
// advertising", which oregon.test.ts reads as a Tribal word), so Oregon has its own copies (`or-` ids) without them.

/** An Oregon copy of a Washington unit, with its own id and parent note and without questions that match `skip`. */
function forOregon(unit: Unit, id: string, codes: string, text: string, parentNote: string, skip: RegExp): Unit {
  return {
    ...unit,
    id,
    standards: ore(codes, text),
    parentNote,
    generate: (opts?: GenerateOptions): Question[] => {
      const out: Question[] = [];
      const seen = new Set<string>();
      let size = 0;
      for (let round = 0; round < 12 && (size === 0 || out.length < size); round++) {
        const set = unit.generate(opts);
        size ||= set.length;
        for (const q of set) {
          if (out.length >= size) break;
          if (skip.test(JSON.stringify(q)) || seen.has(q.prompt)) continue;
          seen.add(q.prompt);
          out.push(q);
        }
      }
      return out;
    },
  };
}

const unitById = (units: Unit[], id: string): Unit => {
  const u = units.find((x) => x.id === id);
  if (!u) throw new Error(`Oregon language: no Washington unit "${id}"`);
  return u;
};

const WEIGH_THE_EVIDENCE = forOregon(
  unitById(RML_8, "wa-g8-weigh-the-evidence"),
  "or-g8-weigh-the-evidence",
  "ELA.8.W.8; ELA.8.RI.8",
  "judging sources and whether evidence is relevant, sufficient and logical",
  "Children judge evidence and sources for accuracy, logic and fairness, spot fallacies and weak statistics, check content made by technology and combine sources with proper citations.",
  /Washington/,
);

const MEDIA_ANALYSIS = forOregon(
  unitById(RML_9, "wa-g9-media-analysis"),
  "or-g9-media-analysis",
  "ELA.9-10.RI.7; ELA.9-10.SL.2",
  "analyzing how media messages use appeals, framing and other techniques",
  "Students analyze the purposes and techniques of media messages (rhetorical appeals, framing, propaganda, sponsored content, deepfakes) and how beliefs and algorithms shape interpretation.",
  /native advertising/i,
);

export const OWN_LANGUAGE: Partial<Record<GradeId, Unit[]>> = {
  "1": [STORY_OR_FACTS],
  "4": [FIRSTHAND_SECONDHAND],
  "8": [WEIGH_THE_EVIDENCE],
  "9": [MEDIA_ANALYSIS],
};
