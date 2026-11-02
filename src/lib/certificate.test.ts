import { describe, expect, it } from "vitest";
import { CERTIFICATE_NOTE, certificateDate, gradeCertificate, unitCertificate } from "./certificate";

describe("certificates", () => {
  it("name the child and the achievement, and say it is practice, not a mark", () => {
    const g = gradeCertificate("Maya", "Grade 4");
    expect(g.line).toBe("Maya finished Grade 4!");
    const u = unitCertificate("Maya", "Fractions", "Tree");
    expect(u.line).toBe("Maya grew into a Tree in Fractions!");
    for (const c of [g, u]) {
      expect(c.note).toBe(CERTIFICATE_NOTE);
      expect(c.note).toMatch(/teacher decides/);
    }
  });
  it("write the date in words", () => {
    expect(certificateDate(new Date(2026, 10, 2, 12).getTime())).toBe("November 2, 2026");
  });
});
