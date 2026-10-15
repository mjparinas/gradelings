import { describe, expect, it } from "vitest";
import { cleanReportDetails, detailLines, reportDetails } from "./questionReport";

describe("reportDetails", () => {
  it("carries a choice question's options, its right answer by label and its picture", () => {
    const d = reportDetails({
      kind: "choice",
      prompt: "What is 2 × 4?",
      hint: "",
      visual: { type: "equation", text: "2 × 4 = ?" },
      choices: [
        { id: "8", label: "8" },
        { id: "10", label: "10" },
        { id: "a", label: "Apple", emoji: "🍎" },
        { id: "c", label: "", coin: 25 },
      ],
      answer: "8",
    });
    expect(d).toEqual({ choices: ["8", "10", "🍎 Apple", "25¢"], answer: "8", visual: { type: "equation", text: "2 × 4 = ?" } });
  });

  it("names the answer for typed, build, coin, order and sort questions", () => {
    expect(reportDetails({ kind: "input", prompt: "", hint: "", answer: "12", suffix: "cm" })).toEqual({ answer: "12 cm" });
    expect(reportDetails({ kind: "build", prompt: "", hint: "", target: 47 })).toEqual({ answer: "47" });
    expect(reportDetails({ kind: "coins", prompt: "", hint: "", target: 35, coins: [5, 10, 25] })).toEqual({ answer: "35¢" });
    expect(reportDetails({ kind: "order", prompt: "", hint: "", items: [{ id: "1", label: "egg" }, { id: "2", label: "chick" }] }).choices).toEqual(["egg", "chick"]);
    const sort = reportDetails({
      kind: "sort",
      prompt: "",
      hint: "",
      bins: [{ id: "l", label: "Living", emoji: "🌱" }],
      items: [{ id: "t", label: "tree", emoji: "🌳", bin: "l" }],
    });
    expect(sort.choices).toEqual(["🌳 tree → Living"]);
  });
});

describe("cleanReportDetails", () => {
  it("keeps well-formed details", () => {
    const d = { choices: ["8", "10"], answer: "8", visual: { type: "array", rows: 2, cols: 4 } };
    expect(cleanReportDetails(d)).toEqual(d);
  });

  it("drops what a caller shouldn't send", () => {
    expect(cleanReportDetails(null)).toBeUndefined();
    expect(cleanReportDetails("hi")).toBeUndefined();
    expect(cleanReportDetails({ choices: [1, 2], answer: "", visual: { rows: 2 } })).toBeUndefined();
    expect(cleanReportDetails({ visual: { type: "equation", text: "x".repeat(7000) } })).toBeUndefined();
    const many = cleanReportDetails({ choices: Array.from({ length: 30 }, (_, i) => `${i} ${"y".repeat(200)}`) })!;
    expect(many.choices).toHaveLength(12);
    expect(many.choices![0].length).toBeLessThanOrEqual(120);
  });
});

describe("detailLines", () => {
  it("writes the choices, answer and picture for the email", () => {
    expect(detailLines({ choices: ["8", "10"], answer: "8", visual: { type: "equation", text: "2 × 4 = ?" } })).toEqual([
      "Choices: 8 · 10",
      "Answer: 8",
      "Picture: equation (2 × 4 = ?)",
    ]);
    expect(detailLines(undefined)).toEqual([]);
  });
});
