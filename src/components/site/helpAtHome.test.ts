import { describe, expect, it } from "vitest";
import { GRADE_ORDER } from "@/content/subjects";
import { HOME_TIPS, TIP_SUBJECTS } from "./homeTips";
import { HELP_GRADES, allHelpAtHomePaths, helpAtHomePath, helpGradeFromSlug, tipsFor } from "./helpAtHome";

describe("help at home pages", () => {
  it("has a page for every grade from Pre-K to Grade 9, found again by its address", () => {
    expect(HELP_GRADES).toEqual(GRADE_ORDER);
    for (const g of HELP_GRADES) {
      const slug = helpAtHomePath.grade(g).split("/")[2];
      expect(helpGradeFromSlug(slug)).toBe(g);
    }
    expect(helpGradeFromSlug("grade-10")).toBeUndefined();
    expect(allHelpAtHomePaths()).toHaveLength(HELP_GRADES.length + 1);
  });

  it("gives every grade and subject a focus line and three different ideas", () => {
    for (const g of HELP_GRADES) {
      expect(tipsFor(g).map((t) => t.subject)).toEqual([...TIP_SUBJECTS]);
      for (const s of TIP_SUBJECTS) {
        const t = HOME_TIPS[g][s];
        expect(t.focus.length, `${g} ${s}`).toBeGreaterThan(20);
        expect(t.ideas, `${g} ${s}`).toHaveLength(3);
        expect(new Set(t.ideas.map((i) => i.title)).size).toBe(3);
        for (const i of t.ideas) {
          expect(i.title.length).toBeGreaterThan(2);
          expect(i.text.length).toBeGreaterThan(30);
        }
      }
    }
  });

  it("names no curriculum, place, money or holiday, so it suits every region", () => {
    const text = JSON.stringify(HOME_TIPS);
    expect(text).not.toMatch(/curriculum|province|\bstate\b|canad|america|\$|¢|dollar|money|price|christmas|halloween|easter/i);
  });
});
