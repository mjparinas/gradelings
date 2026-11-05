import { describe, expect, it } from "vitest";
import { allBreakPuzzles, BREAK_LENGTH, breakSet } from "./breaks";
import type { AgeBand } from "./types";

const BANDS: AgeBand[] = ["little", "middle", "big"];

describe("brain break puzzles", () => {
  it("has hand-written puzzles whose right answer is the only right choice", () => {
    for (const { band, raw } of allBreakPuzzles()) {
      const [prompt, right, wrongs, why] = raw;
      const all = [right, ...wrongs];
      expect(new Set(all).size, prompt).toBe(all.length);
      expect(wrongs.length, prompt).toBeGreaterThanOrEqual(2);
      expect(why.length, prompt).toBeGreaterThan(5);
      if (band === "little") {
        expect(prompt.length, prompt).toBeLessThanOrEqual(80);
        expect(all.length, prompt).toBe(3);
        // Picture only: every choice is one emoji.
        for (const c of all) expect([...c].length, c).toBeLessThanOrEqual(2);
      }
    }
  });

  it("never repeats a prompt in a band", () => {
    for (const band of BANDS) {
      const prompts = allBreakPuzzles().filter((p) => p.band === band).map((p) => p.raw[0]);
      expect(new Set(prompts).size).toBe(prompts.length);
    }
  });

  it("is the same for everyone: no curriculum, place, money or holiday", () => {
    const text = allBreakPuzzles().map((p) => p.raw.flat().join(" ")).join(" ");
    expect(text).not.toMatch(/curriculum|province|state\b|canad|america|\$|¢|dollar|cent\b|christmas|halloween|easter|colour|metre|litre/i);
  });

  it("gives each seed the same set, and different seeds different sets", () => {
    for (const band of BANDS) {
      const a = breakSet(band, "p1:2026-11-05:0");
      expect(breakSet(band, "p1:2026-11-05:0")).toEqual(a);
      const others = [1, 2, 3, 4].map((n) => breakSet(band, `p1:2026-11-05:${n}`).map((p) => p.prompt + p.sequence.join()).join("|"));
      expect(new Set([a.map((p) => p.prompt + p.sequence.join()).join("|"), ...others]).size).toBeGreaterThan(1);
    }
  });

  it("builds sets of five with one right choice each and no repeats", () => {
    for (const band of BANDS) {
      for (let n = 0; n < 40; n++) {
        const set = breakSet(band, `seed${n}`);
        expect(set).toHaveLength(BREAK_LENGTH);
        expect(new Set(set.map((p) => p.prompt + p.sequence.join(""))).size).toBe(BREAK_LENGTH);
        for (const p of set) {
          expect(new Set(p.choices).size, p.prompt).toBe(p.choices.length);
          expect(p.answer).toBeGreaterThanOrEqual(0);
          expect(p.answer).toBeLessThan(p.choices.length);
          // Big picture buttons: always for little kids, otherwise only for emoji choices.
          expect(p.pictures).toBe(band === "little" || p.choices.every((c) => !/[A-Za-z0-9]/.test(c)));
          if (band === "little") expect(p.choices.length).toBe(3);
        }
      }
    }
  });

  it("makes number patterns whose answer follows the rule", () => {
    let seen = 0;
    for (const band of ["middle", "big"] as const) {
      for (let n = 0; n < 200; n++) {
        for (const p of breakSet(band, `num${n}`)) {
          if (p.prompt !== "What number comes next?") continue;
          seen++;
          const terms = p.sequence.slice(0, 5).map(Number);
          const answer = Number(p.choices[p.answer]);
          const diff = terms[1] - terms[0];
          const arithmetic = terms.every((t, i) => i === 0 || t - terms[i - 1] === diff);
          const double = terms.every((t, i) => i === 0 || t === terms[i - 1] * 2);
          const square = terms.every((t, i) => t === (i + 1) ** 2);
          expect(arithmetic || double || square, terms.join()).toBe(true);
          if (arithmetic) expect(answer).toBe(terms[4] + diff);
          else if (double) expect(answer).toBe(terms[4] * 2);
          else expect(answer).toBe(36);
        }
      }
    }
    expect(seen).toBeGreaterThan(50);
  });

  it("makes picture patterns whose answer continues the repeat", () => {
    for (const band of BANDS) {
      for (let n = 0; n < 100; n++) {
        for (const p of breakSet(band, `seq${n}`)) {
          if (p.prompt !== "What comes next?") continue;
          const shown = p.sequence.slice(0, -1);
          const answer = p.choices[p.answer];
          // Some period of 2 to 5 pictures repeats through the whole row, and the answer continues it.
          const fits = [2, 3, 4, 5].some((k) => [...shown, answer].every((s, i) => i < k || s === [...shown, answer][i - k]) && shown.length >= 2 * k);
          expect(fits, shown.join("")).toBe(true);
        }
      }
    }
  });

  it("counts pictures for the youngest", () => {
    let seen = 0;
    for (let n = 0; n < 100; n++) {
      for (const p of breakSet("little", `c${n}`)) {
        if (p.prompt !== "How many?") continue;
        seen++;
        expect(p.choices[p.answer]).toBe(String(p.sequence.length));
      }
    }
    expect(seen).toBeGreaterThan(20);
  });
});
