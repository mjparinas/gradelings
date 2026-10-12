import { describe, expect, it } from "vitest";
import { subjectInSentence } from "./subjects";

describe("subjectInSentence", () => {
  it("lowercases ordinary subject words but keeps language and French program names capitalized", () => {
    expect(subjectInSentence("Social Studies")).toBe("social studies");
    expect(subjectInSentence("English Language Arts")).toBe("English language arts");
    expect(subjectInSentence("French Immersion")).toBe("French Immersion");
    expect(subjectInSentence("Core French")).toBe("Core French");
    expect(subjectInSentence("Français")).toBe("Français");
  });
});
