import { describe, expect, it } from "vitest";
import { titleCase } from "./titleCase";

describe("titleCase", () => {
  it("capitalizes each word but short joining words", () => {
    expect(titleCase("Families who have paid")).toBe("Families Who Have Paid");
    expect(titleCase("Back to school")).toBe("Back to School");
    expect(titleCase("Free (trial over, not paying)")).toBe("Free (Trial Over, Not Paying)");
  });

  it("always capitalizes the first and last word, and both halves of a hyphenated word", () => {
    expect(titleCase("a child practised")).toBe("A Child Practised");
    expect(titleCase("what it's for")).toBe("What It's For");
    expect(titleCase("Sign-ups")).toBe("Sign-Ups");
  });

  it("leaves words that already have a capital alone", () => {
    expect(titleCase("Builds (GitHub Actions)")).toBe("Builds (GitHub Actions)");
    expect(titleCase("Download CSV")).toBe("Download CSV");
  });
});
