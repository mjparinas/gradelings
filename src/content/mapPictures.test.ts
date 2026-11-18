import { describe, expect, it } from "vitest";
import { mapPictureFor, plainGenerate, withMapPictures } from "./mapPictures";
import type { Course, Question, Unit } from "./types";

const q = (prompt: string, visual?: unknown) => ({ prompt, visual });

describe("mapPictureFor", () => {
  it("rings the direction in 'the opposite of …' questions", () => {
    expect(mapPictureFor(q("What is the opposite of north?"))).toEqual({ type: "compass", mark: "N" });
    expect(mapPictureFor(q("Which direction is the opposite of east?"))).toEqual({ type: "compass", mark: "E" });
    expect(mapPictureFor(q("Which direction is directly opposite north?"))).toEqual({ type: "compass", mark: "N" });
  });

  it("shows the bare rose when the question is about directions in between", () => {
    expect(mapPictureFor(q("Which direction is between north and east?"))).toEqual({ type: "compass" });
    expect(mapPictureFor(q("Southwest is between which two directions?"))).toEqual({ type: "compass" });
    expect(mapPictureFor(q("Washington, D.C. is northeast of Tennessee. Which way is that?"))).toEqual({ type: "compass" });
  });

  it("puts the sun where the prompt says it is for shadow questions, and the person in the middle", () => {
    expect(mapPictureFor(q("In the morning the sun is in the east, so your shadow points…"))).toEqual({
      type: "compass",
      center: "🧍",
      around: [{ at: "E", emoji: "☀️" }],
    });
  });

  it("never draws the answer: no rose for questions that ask which direction a place or the sun is", () => {
    for (const prompt of [
      "On most maps, north is at the…",
      "The sun comes up in the…",
      "Which ocean is on the east side of Canada?",
      "Which tool helps you find north?",
      "In the morning in Ohio, your shadow points…",
      "Which direction is the Gulf from most of Florida?",
    ])
      expect(mapPictureFor(q(prompt)), prompt).toBeUndefined();
  });

  it("keeps a question's own picture", () => {
    expect(mapPictureFor(q("What is the opposite of north?", { type: "emoji", emoji: "🧭" }))).toBeUndefined();
  });
});

const question = (prompt: string): Question => ({
  kind: "choice",
  prompt,
  hint: "h",
  answer: "a",
  choices: [{ id: "a", label: "south" }, { id: "b", label: "east" }],
});

const unit = (id: string, prompts: string[]): Unit =>
  ({ id, title: id, emoji: "🧭", blurb: "", standards: {}, generate: () => prompts.map(question) }) as unknown as Unit;

const course = (subject: Course["subject"], units: Unit[]) => ({ grade: "1", subject, units }) as unknown as Course;

describe("withMapPictures", () => {
  it("adds the rose in social studies and science units and changes nothing else", () => {
    const [social, math] = withMapPictures([course("social", [unit("a", ["What is the opposite of north?", "What does a map show?"])]), course("math", [unit("b", ["What is the opposite of north?"])])]);
    const [drawn, plain] = social.units[0].generate();
    expect(drawn).toMatchObject({ prompt: "What is the opposite of north?", visual: { type: "compass", mark: "N" } });
    expect(plain).toEqual(question("What does a map show?"));
    expect(math.units[0].generate()[0]).toEqual(question("What is the opposite of north?"));
  });

  it("gives the same generator to every copy of a unit, so merged frameworks still match", () => {
    const shared = unit("a", ["x"]);
    const first = withMapPictures([course("social", [shared])])[0].units[0];
    const second = withMapPictures([course("social", [shared])])[0].units[0];
    expect(first.generate).toBe(second.generate);
    expect(withMapPictures([course("social", [first])])[0].units[0].generate).toBe(first.generate);
    expect(plainGenerate(first.generate)).toBe(shared.generate);
    expect(plainGenerate(shared.generate)).toBe(shared.generate);
  });
});
