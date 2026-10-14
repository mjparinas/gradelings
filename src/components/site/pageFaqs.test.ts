import { describe, expect, it } from "vitest";
import { gradesWithContent } from "./curriculum";
import { bandLine, curriculumFaqs, curriculumIndexFaqs, frenchLine, guideHubFaqs, pricingFaqs, reportCardIndexFaqs, reportingBands } from "./pageFaqs";
import { FRAMEWORKS, getFramework } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS } from "@/content/guides";
import { PRICES_BY_CURRENCY, REFUND_DAYS, TRIAL_DAYS } from "@/lib/plan";

const text = (faqs: { q: string; a: string }[]) => faqs.map((f) => `${f.q} ${f.a}`).join("\n");

describe("page FAQs", () => {
  it.each(FRAMEWORKS.map((f) => [f.id, f] as const))("%s: reporting bands cover every grade once, in order", (_, f) => {
    const bands = reportingBands(f);
    const covered = bands.flatMap((b) => {
      const grades = gradesWithContent(f);
      return grades.slice(grades.indexOf(b.from), grades.indexOf(b.to) + 1);
    });
    expect(covered).toEqual(gradesWithContent(f));
    // Neighbouring bands use different scales.
    bands.slice(1).forEach((b, i) => expect(b.scheme.id).not.toBe(bands[i].scheme.id));
  });

  it("never says a region's report card uses our practice steps", () => {
    const ab = getFramework("ca-ab");
    expect(reportingBands(ab).map((b) => bandLine(ab, b))).toEqual(["Kindergarten to Grade 9: no provincial scale, so Gradelings describes practice in four steps (Beginning, Approaching, Meeting and Exceeding)."]);
    const nu = getFramework("ca-nu");
    expect(bandLine(nu, reportingBands(nu)[0])).toContain("no territory-wide scale");
    const nl = getFramework("ca-nl");
    expect(reportingBands(nl).map((b) => bandLine(nl, b))).toEqual([
      "Kindergarten to Grade 6: Not Yet Achieving, Approaching, Good and Excellent.",
      "Grade 7 to Grade 9: no provincial scale, so Gradelings describes practice in four steps (Beginning, Approaching, Meeting and Exceeding).",
    ]);
    const ns = getFramework("ca-ns");
    expect(reportingBands(ns).length).toBeGreaterThan(1);
  });

  it("names the French each province teaches, and none in a US state", () => {
    expect(frenchLine(getFramework("ca-bc"))).toBe("French Immersion from Kindergarten to Grade 9 and Core French from Grade 5 to Grade 9");
    expect(frenchLine(getFramework("ca-on"))).toBe("French Immersion from Grade 1 to Grade 9 and Core French from Grade 4 to Grade 9");
    expect(frenchLine(getFramework("ca-pe"))).toBe("Core French from Grade 4 to Grade 9");
    expect(frenchLine(getFramework("us-wa"))).toBe("");
    expect(text(curriculumFaqs(getFramework("us-wa")))).not.toMatch(/French/);
  });

  it.each(FRAMEWORKS.map((f) => [f.id, f] as const))("%s: curriculum answers are complete and in the region's English", (_, f) => {
    const t = text(curriculumFaqs(f));
    expect(t).not.toMatch(/undefined|NaN/);
    expect(t).toContain(f.curriculumName);
    if (f.country === "US") expect(t).not.toMatch(/practis/);
  });

  it.each(GUIDE_FRAMEWORKS.map((f) => [f.id, f] as const))("%s: guide hub answers name the assessment grades and competencies", (_, f) => {
    const t = text(guideHubFaqs(f));
    expect(t).not.toMatch(/undefined/);
    if (f.country === "US") expect(t).not.toMatch(/practis/);
  });

  it("answers Ontario's EQAO question with the grades that write it", () => {
    const eqao = guideHubFaqs(getFramework("ca-on")).find((f) => f.q.includes("EQAO") || f.q.includes("Education Quality"))!;
    expect(eqao.a).toMatch(/^In Grade 3 and Grade 6\. It is separate from the report card\./);
  });

  it("reads every price and promise from the plan", () => {
    const t = text(pricingFaqs(true));
    expect(t).toContain(`${PRICES_BY_CURRENCY.CAD.month.label} a month or ${PRICES_BY_CURRENCY.CAD.year.label} a year in Canada`);
    expect(t).toContain(PRICES_BY_CURRENCY.USD.year.label);
    expect(t).toContain(`${TRIAL_DAYS} days`);
    expect(t).toContain(`${REFUND_DAYS} days`);
    expect(text(pricingFaqs(false))).not.toContain("US$");
  });

  it("lists the places with no single scale on the report-card index", () => {
    const t = text(reportCardIndexFaqs(FRAMEWORKS));
    expect(t).toContain("Alberta");
    expect(t).toContain("Washington");
    // Newfoundland and Labrador has a scale in Kindergarten to Grade 6.
    expect(t).not.toMatch(/Newfoundland/);
    expect(text(curriculumIndexFaqs(FRAMEWORKS))).toContain("province or state");
  });
});
