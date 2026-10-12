import { describe, expect, it } from "vitest";
import { COURSES } from "@/content/all";
import { withSeed } from "@/content/random";
import type { GradeId, Question } from "@/content/types";
import { bubbleRound } from "@/components/play/games/content";
import { readAloudSegments } from "./readaloud";
import { forSpeech, speakStretched } from "./speech";

// A letter written three or more times in a row is read by every voice as its name, again and again.
const STRETCH = /\b([a-z])\1{2,}\b|\b(sh|ch|th)h+\b/i;

describe("stretched letter sounds", () => {
  it("reads each held sound once, as one short sound", () => {
    expect(speakStretched("vvv")).toBe("vuh");
    expect(speakStretched("rrr")).toBe("ruh");
    expect(speakStretched("lll")).toBe("luh");
    expect(speakStretched("Pop the letter that makes the sound mmm")).toBe("Pop the letter that makes the sound muh");
    expect(speakStretched("It starts with sss, the sound of s.")).toBe("It starts with suh, the sound of s.");
    expect(speakStretched("fff... ih... shhh")).toBe("fuh... ih... shuh");
    expect(speakStretched("Shh")).toBe("Shuh");
    expect(speakStretched("cccc")).toBe("kuh");
  });

  it("leaves ordinary words alone", () => {
    for (const text of ["Hmm.", "buh", "ship", "grass", "all three", "see www.example.ca", "Ssh no", "eee"]) {
      expect(speakStretched(text)).toBe(text);
    }
  });

  it("only changes English", () => {
    expect(forSpeech("rrr", "fr")).toBe("rrr");
    expect(forSpeech("rrr", "en")).toBe("ruh");
  });

  it("Bubble Pop never asks for a sound the voice would spell out", () => {
    for (let seed = 1; seed <= 60; seed++) {
      const round = withSeed(seed, () => bubbleRound("k"));
      expect(forSpeech(round.speak)).not.toMatch(STRETCH);
    }
  });

  it("no early-grade question, answer or hint is read as a spelled-out sound", () => {
    const early: GradeId[] = ["k", "1", "2"];
    const said = (q: Question) => [...readAloudSegments(q).filter((s) => s.lang === "en").map((s) => s.text), q.hint];
    for (const course of COURSES.filter((c) => early.includes(c.grade))) {
      for (const unit of course.units) {
        for (const difficulty of [1, 2, 3] as const) {
          for (let seed = 1; seed <= 4; seed++) {
            const qs = withSeed(seed * 101 + difficulty, () => unit.generate({ difficulty }));
            for (const text of qs.flatMap(said)) {
              expect(forSpeech(text), `${course.grade} ${unit.id}: ${text}`).not.toMatch(STRETCH);
            }
          }
        }
      }
    }
  });
});
