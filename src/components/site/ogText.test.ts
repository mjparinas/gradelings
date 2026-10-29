import { describe, expect, it } from "vitest";
import { FRAMEWORKS, getFramework } from "@/content/frameworks";
import { gradeSlug } from "@/content/subjects";
import { coursesFor, gradesWithContent } from "./curriculum";
import { cardQuestion, countMilestoneCard, curriculumCard, guideCard, gradeQuestionCard, gradeSheetsCard, reportCardCard, unitCard, unitMilestoneCard, worksheetCard } from "./ogText";
import type { Question } from "@/content/types";
import { GUIDE_FRAMEWORKS } from "@/content/guides";

describe("share cards", () => {
  it("names the province, grade and subject on a curriculum subject page", () => {
    const card = curriculumCard({ framework: "bc", grade: "grade-4", subject: "math" });
    expect(card).toMatchObject({ kicker: "British Columbia curriculum · Grade 4", title: "Grade 4 Math", colour: "#4f8ef7" });
    expect(card?.line).toBeTruthy();
  });

  it("has a card for every curriculum, guide and report-card page that gets one", () => {
    for (const f of FRAMEWORKS) {
      expect(curriculumCard({ framework: f.slug })?.title).toMatch(f.country === "US" ? /^(Kindergarten|Pre-K|Transitional Kindergarten) through 9th grade practice$/ : /Kindergarten to Grade 9 practice|to Grade/);
      expect(reportCardCard(f.slug)?.title).toContain(f.shortName);
      for (const g of gradesWithContent(f)) {
        expect(curriculumCard({ framework: f.slug, grade: gradeSlug(g) })).toBeDefined();
        for (const c of coursesFor(f, g)) expect(curriculumCard({ framework: f.slug, grade: gradeSlug(g), subject: c.subject })?.title).toBeTruthy();
      }
    }
    for (const f of GUIDE_FRAMEWORKS) {
      expect(guideCard({ framework: f.slug })).toBeDefined();
      for (const g of gradesWithContent(f)) for (const c of coursesFor(f, g)) expect(guideCard({ framework: f.slug, grade: gradeSlug(g), subject: c.subject })?.title).toContain("help at home");
    }
  });

  it("speaks US English on a state's cards: 4th grade, 4th grader, practice, no French", () => {
    expect(curriculumCard({ framework: "washington" })).toMatchObject({ title: "Pre-K through 9th grade practice", line: "Math · Language Arts · Science · Social Studies" });
    expect(curriculumCard({ framework: "washington", grade: "grade-4", subject: "math" })).toMatchObject({ kicker: "Washington curriculum · 4th grade", title: "4th grade Math" });
    expect(guideCard({ framework: "washington" })?.line).toBe("Pre-K through 9th grade, in the words of the report card");
    expect(worksheetCard({ framework: "washington", grade: "grade-4", subject: "math" })?.line).toBe("Print it, try it, then practice free");
    expect(worksheetCard({ framework: "bc", grade: "grade-4", subject: "math" })?.line).toBe("Print it, try it, then practise free");
    const unit = coursesFor(getFramework("us-wa"), "4").find((c) => c.subject === "math")!.units.find((u) => unitCard({ framework: "washington", grade: "grade-4", subject: "math", unit: u.id })?.question)!;
    expect(unitCard({ framework: "washington", grade: "grade-4", subject: "math", unit: unit.id })?.title).toBe("Can your 4th grader solve this?");
    expect(curriculumCard({ framework: "bc" })?.line).toContain("French");
  });

  it("has no card for a page that doesn't exist", () => {
    expect(curriculumCard({ framework: "nowhere" })).toBeUndefined();
    expect(reportCardCard("nowhere")).toBeUndefined();
  });

  it("puts the subject's guide on subject cards", () => {
    expect(curriculumCard({ framework: "bc", grade: "grade-4", subject: "math" })?.critter).toBe("hoot");
    expect(guideCard({ framework: "ontario", grade: "grade-2", subject: "science" })?.critter).toBe("bolt");
  });

  it("asks \"Can your Grade 4 solve this?\" with one of the unit's own questions, the same on every build", () => {
    const params = { framework: "bc", grade: "grade-4", subject: "math", unit: "fractions" };
    const card = unitCard(params);
    expect(card).toMatchObject({ title: "Can your Grade 4 solve this?", critter: "hoot", colour: "#4f8ef7" });
    expect(card?.kicker).toBe("BC · Grade 4 Math · Fractions");
    expect(card?.question?.prompt).toBeTruthy();
    expect(unitCard(params)).toEqual(card);
    expect(unitCard({ ...params, unit: "nope" })).toBeUndefined();
  });

  it("has a card for every unit page, with a question on most and no emoji anywhere", () => {
    let total = 0;
    let asked = 0;
    for (const f of FRAMEWORKS) {
      for (const g of gradesWithContent(f)) {
        for (const c of coursesFor(f, g)) {
          for (const u of c.units.filter((x) => x.standards[f.id])) {
            const card = unitCard({ framework: f.slug, grade: gradeSlug(g), subject: c.subject, unit: u.id });
            expect(card, `${f.id} ${g} ${u.id}`).toBeDefined();
            total++;
            if (card?.question) asked++;
            const text = [card?.title, card?.question?.prompt, ...(card?.question?.choices ?? [])].join(" ");
            expect(text).not.toMatch(/\p{Extended_Pictographic}/u);
          }
        }
      }
    }
    expect(asked / total).toBeGreaterThan(0.6);
  });

  it("asks \"Can your Grade 4 solve this?\" on a grade's pages, math first, the same on every build", () => {
    const card = gradeQuestionCard({ framework: "bc", grade: "grade-4" });
    expect(card).toMatchObject({ title: "Can your Grade 4 solve this?", critter: "hoot", colour: "#4f8ef7" });
    expect(card?.kicker).toMatch(/^BC · Grade 4 Math · /);
    expect(card?.question?.prompt).toBeTruthy();
    expect(gradeQuestionCard({ framework: "bc", grade: "grade-4" })).toEqual(card);
    expect(gradeQuestionCard({ framework: "washington", grade: "grade-4" })?.title).toBe("Can your 4th grader solve this?");
    expect(gradeQuestionCard({ framework: "bc", grade: "grade-42" })).toBeUndefined();
    expect(gradeQuestionCard({ framework: "quebec", grade: "grade-4" })).toBeUndefined();
  });

  it("has a question card for every grade, with no emoji", () => {
    for (const f of FRAMEWORKS) {
      for (const g of gradesWithContent(f)) {
        const card = gradeQuestionCard({ framework: f.slug, grade: gradeSlug(g) });
        expect(card?.question, `${f.id} ${g}`).toBeDefined();
        const text = [card?.title, card?.kicker, card?.question?.prompt, ...(card?.question?.choices ?? [])].join(" ");
        expect(text).not.toMatch(/\p{Extended_Pictographic}/u);
      }
    }
  });

  it("only uses questions that read well without their picture", () => {
    const base = { prompt: "Which is bigger?", hint: "" };
    expect(cardQuestion({ ...base, kind: "choice", answer: "a", choices: [{ id: "a", label: "7" }, { id: "b", label: "3" }] })).toEqual({ prompt: "Which is bigger?", choices: ["7", "3"] });
    expect(cardQuestion({ ...base, kind: "choice", answer: "a", choices: [{ id: "a", label: "🍎" }, { id: "b", label: "3" }] })).toBeUndefined();
    expect(cardQuestion({ ...base, kind: "choice", answer: "a", choices: [{ id: "a", label: "a", emoji: "🍎" }] })).toBeUndefined();
    expect(cardQuestion({ ...base, kind: "input", answer: "4", suffix: "cm" })).toEqual({ prompt: "Which is bigger?", suffix: "cm" });
    expect(cardQuestion({ ...base, kind: "input", answer: "4", visual: { type: "angle", degrees: 30 } } as Question)).toBeUndefined();
    expect(cardQuestion({ ...base, kind: "order", items: [] })).toBeUndefined();
  });

  it("makes a tall Pinterest card for every worksheet", () => {
    for (const f of GUIDE_FRAMEWORKS) {
      for (const g of gradesWithContent(f)) {
        for (const c of coursesFor(f, g)) {
          const card = worksheetCard({ framework: f.slug, grade: gradeSlug(g), subject: c.subject });
          expect(card?.title).toMatch(/worksheet$/);
          expect(card?.items?.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("lists every subject on a grade's printable sheets pin, and only for real grades", () => {
    expect(gradeSheetsCard({ framework: "bc", grade: "grade-6" })).toMatchObject({
      kicker: "British Columbia · Grade 6",
      title: "Grade 6 printable worksheets",
      items: ["Math", "English Language Arts", "Science", "Social Studies", "French Immersion", "Core French"],
    });
    for (const f of GUIDE_FRAMEWORKS) {
      for (const g of gradesWithContent(f)) {
        const card = gradeSheetsCard({ framework: f.slug, grade: gradeSlug(g) });
        expect(card?.items).toHaveLength(coursesFor(f, g).length);
        expect(card?.line).toBe(`${coursesFor(f, g).length} free sheets with answer keys`);
      }
    }
    expect(gradeSheetsCard({ framework: "bc", grade: "grade-13" })).toBeUndefined();
    expect(gradeSheetsCard({ framework: "quebec", grade: "grade-4" })).toBeUndefined();
  });

  it("words shared milestones from the link's fields only, and refuses anything else", () => {
    expect(unitMilestoneCard({ framework: "bc", grade: "grade-4", subject: "math", unit: "fractions", level: "2" })).toMatchObject({
      title: "Grew into a Tree in Fractions!",
      kicker: "A milestone · Grade 4 Math",
      critter: "hoot",
      more: { href: "/curriculum/bc/grade-4/math/fractions/" },
    });
    expect(unitMilestoneCard({ framework: "bc", grade: "grade-4", subject: "math", unit: "fractions", level: "3" })?.title).toBe("Became a Star in Fractions!");
    for (const level of ["0", "1", "4", "02", "Sam"]) expect(unitMilestoneCard({ framework: "bc", grade: "grade-4", subject: "math", unit: "fractions", level })).toBeUndefined();
    expect(unitMilestoneCard({ framework: "bc", grade: "grade-4", subject: "math", unit: "Sam", level: "2" })).toBeUndefined();
    expect(countMilestoneCard({ kind: "right", n: "1000" })?.title).toBe("1,000 questions right on the first try!");
    expect(countMilestoneCard({ kind: "right", n: "999" })).toBeUndefined();
    expect(countMilestoneCard({ kind: "streak", n: "1e3" })).toBeUndefined();
  });
});
