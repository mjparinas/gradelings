import { describe, expect, test } from "vitest";
import type { Question } from "@/content/types";
import { workedSolution } from "./workedSolution";

const input = (prompt: string, answer: string, extra: Partial<Question> = {}): Question =>
  ({ kind: "input", prompt, answer, hint: "h", ...extra }) as Question;

describe("workedSolution", () => {
  test("adds with a carry, place by place", () => {
    const s = workedSolution(input("What is 709 + 281?", "990"))!;
    expect(s.answer).toBe("990");
    expect(s.steps[1].say).toBe("Ones: 9 + 1 = 10. Write 0 and carry 1 to the next place.");
    expect(s.steps[2].say).toContain("Tens: 0 + 8 + 1 (carried) = 9");
    expect(s.steps.at(-1)!.board.join("\n")).toContain("990");
  });

  test("a carry out of the top place becomes the leading digit", () => {
    const s = workedSolution(input("What is 95 + 27?", "122"))!;
    expect(s.steps.at(-1)!.board.at(-1)!.trim()).toBe("122");
  });

  test("adds decimals with the points lined up", () => {
    const s = workedSolution(input("What is 3.4 + 2.85?", "6.25"))!;
    expect(s.steps[0].say).toContain("decimal points");
    expect(s.steps[1].say).toContain("Hundredths");
    expect(s.steps.at(-1)!.board.at(-1)!.trim()).toBe("6.25");
  });

  test("subtracts with borrowing across a zero", () => {
    const s = workedSolution(input("What is 503 − 238?", "265"))!;
    expect(s.steps.some((st) => st.say.includes("Borrow 1"))).toBe(true);
    expect(s.steps.some((st) => st.say.includes("becomes 9"))).toBe(true);
    expect(s.steps.at(-1)!.board.at(-1)!.trim()).toBe("265");
  });

  test("subtracts decimals and reads big grouped numbers", () => {
    expect(workedSolution(input("What is 7.24 − 5.41?", "1.83"))!.answer).toBe("1.83");
    expect(workedSolution(input("Subtract: 591 915 − 232 096", "359819"))!.answer).toBe("359819");
  });

  test("the board's last line is the right answer for many sums and differences", () => {
    let seed = 7;
    const next = (n: number) => ((seed = (seed * 1103515245 + 12345) % 2147483648), seed % n);
    for (let i = 0; i < 300; i++) {
      const a = next(9000) + 10;
      const b = next(9000) + 10;
      const [hi, lo] = a >= b ? [a, b] : [b, a];
      const sum = workedSolution(input(`What is ${a} + ${b}?`, String(a + b)))!;
      expect(sum.steps.at(-1)!.board.at(-1)!.trim()).toBe(String(a + b));
      const diff = workedSolution(input(`What is ${hi} − ${lo}?`, String(hi - lo)))!;
      expect(diff.steps.at(-1)!.board.at(-1)!.trim()).toBe(String(hi - lo));
    }
  });

  test("multiplies by splitting into place values", () => {
    const s = workedSolution(input("What is 319 × 4?", "1276"))!;
    expect(s.steps[0].say).toContain("300 + 10 + 9");
    expect(s.steps.at(-2)!.say).toContain("1200 + 40 + 36 = 1276");
    expect(workedSolution(input("What is 44 × 8?", "352"))!.answer).toBe("352");
  });

  test("multiplies two multi-digit numbers with partial products", () => {
    const s = workedSolution(input("What is 36 × 24?", "864"))!;
    expect(s.steps[0].say).toContain("20 + 4");
    expect(s.answer).toBe("864");
  });

  test("divides: a fact family, then long division", () => {
    expect(workedSolution(input("What is 18 ÷ 3?", "6"))!.steps[0].say).toContain("opposite of multiplying");
    const s = workedSolution(input("What is 952 ÷ 7?", "136"))!;
    expect(s.answer).toBe("136");
    expect(s.steps.at(-1)!.say).toContain("7 × 136 = 952");
  });

  test("adds and subtracts fractions with a common bottom and simplifying", () => {
    const s = workedSolution(input("Add: 3/5 + 1/8. Type the answer as a fraction in lowest terms.", "29/40"))!;
    expect(s.steps[1].say).toContain("40");
    expect(workedSolution(input("What is 1/4 + 1/4?", "1/2"))!.steps.some((st) => st.say.includes("simplify"))).toBe(true);
  });

  test("finds a percent of a whole number", () => {
    const s = workedSolution(input("What is 20% of 260?", "52"))!;
    expect(s.steps[1].say).toContain("260 × 20 = 5200".replace(/(\d)(?=(\d{3})+$)/g, "$1"));
    expect(s.answer).toBe("52");
  });

  test("works from a multiple-choice question's right label", () => {
    const q = { kind: "choice", prompt: "What is 12 + 9?", choices: [{ id: "a", label: "20" }, { id: "b", label: "21" }], answer: "b", hint: "h" } as Question;
    expect(workedSolution(q)!.answer).toBe("21");
  });

  test("shows nothing when the working disagrees with the answer", () => {
    expect(workedSolution(input("What is 12 + 9?", "22"))).toBeNull();
  });

  test("shows nothing for questions that aren't plain arithmetic or have a picture", () => {
    expect(workedSolution(input("How many grams are in 2 kilograms?", "2000"))).toBeNull();
    expect(workedSolution(input("What is 8 + 6?", "14"))).toBeNull();
    // A picture beside a prompt that states the sum doesn't stop the working.
    expect(workedSolution(input("What is 12 + 9?", "21", { visual: { type: "equation", text: "12 + 9" } }))).not.toBeNull();
    expect(workedSolution(input("What is 7 ÷ 2?", "3.5"))).toBeNull();
  });
});
