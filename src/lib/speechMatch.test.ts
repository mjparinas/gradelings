import { describe, expect, it } from "vitest";
import { cleanHeard, countedTo, heardNothing, heardNumbers, likeness, saidWord, soundKey } from "./speechMatch";

describe("saidWord", () => {
  it("accepts the word, with any capitals and punctuation", () => {
    expect(saidWord(" Cat!", "cat", ["sun", "dog"])).toBe(true);
    expect(saidWord("The cat.", "cat", ["sun"])).toBe(true);
  });

  it("accepts the rough hearings a little child's voice produces, when they are closest to the target", () => {
    expect(saidWord(" Blah", "ball", ["cat", "sun"])).toBe(true);
    expect(saidWord(" JUG!", "dog", ["cat", "sun"])).toBe(true);
  });

  it("does not accept a different word on screen", () => {
    expect(saidWord("sun", "cat", ["sun", "dog"])).toBe(false);
    expect(saidWord("dog", "cat", ["dog"])).toBe(false);
  });

  it("does not accept silence, noise or filler", () => {
    for (const heard of ["", " [BLANK_AUDIO]", "(music)", " you", "Thank you.", "♪"]) {
      expect(heardNothing(heard)).toBe(true);
      expect(saidWord(heard, "cat", ["sun"])).toBe(false);
    }
  });

  it("takes other spellings", () => {
    expect(saidWord("two", "2", [], ["two", "to"])).toBe(true);
  });
});

describe("counting", () => {
  it("reads digits and number words", () => {
    expect(heardNumbers(" 1, 2, 3, four five")).toEqual([1, 2, 3, 4, 5]);
  });
  it("counts to the target, and forgives a stumble", () => {
    expect(countedTo("1 2 3 4 5", 5)).toBe(true);
    expect(countedTo("one two two three four five six", 5)).toBe(true);
    expect(countedTo("1 2 3", 5)).toBe(false);
    expect(countedTo("2 3 4 5", 5)).toBe(false);
    expect(countedTo("", 3)).toBe(false);
  });
});

describe("helpers", () => {
  it("cleans text", () => expect(cleanHeard("  Hello,   World! ")).toBe("hello world"));
  it("sound keys match look-alike sounds", () => {
    expect(soundKey("ball")).toBe(soundKey("bal"));
    expect(likeness("zebra", "zebra")).toBe(1);
  });
});
