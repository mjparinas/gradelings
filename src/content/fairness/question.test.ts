import { describe, expect, it } from "vitest";
import { checkQuestion } from "./question";
import type { Question } from "../types";

// checkQuestion uses its own light assertions (see the top of question.ts), so make sure it still fails on bad questions.
const good: Question = {
  kind: "choice",
  prompt: "What is 2 + 3?",
  hint: "Count on from 2.",
  choices: [
    { id: "a", label: "4" },
    { id: "b", label: "5" },
    { id: "c", label: "6" },
  ],
  answer: "b",
  visual: { type: "equation", text: "2 + 3 = ?" },
} as Question;

describe("checkQuestion", () => {
  it("passes a fair question", () => {
    expect(() => checkQuestion(good, { grade: "2" })).not.toThrow();
  });

  it("fails when the answer is not among the choices", () => {
    expect(() => checkQuestion({ ...good, answer: "z" } as Question, { grade: "2" })).toThrow(/contain/);
  });

  it("fails on two choices that look the same", () => {
    const dup = { ...good, choices: [...(good as { choices: unknown[] }).choices, { id: "d", label: "6" }] } as Question;
    expect(() => checkQuestion(dup, { grade: "2" })).toThrow(/duplicate choices/);
  });

  it("fails when the maths is wrong", () => {
    const wrong = { ...good, answer: "a" } as Question;
    expect(() => checkQuestion(wrong, { grade: "2" })).toThrow(/2 \+ 3/);
  });

  it("fails on an empty hint and on a long prompt for little kids", () => {
    expect(() => checkQuestion({ ...good, hint: " " } as Question, { grade: "2" })).toThrow();
    expect(() => checkQuestion({ ...good, prompt: "x".repeat(81) } as Question, { grade: "k" })).toThrow(/too long/);
  });
});
