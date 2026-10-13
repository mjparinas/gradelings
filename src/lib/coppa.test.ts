import { describe, expect, it } from "vitest";
import { CONSENT_NOTICE, consentNeeded, familyCountry } from "./coppa";
import type { FamilyInfo, Profile } from "./model";

const child = (framework: string, createdAt: number, deleted = false) => ({ framework, createdAt, deleted }) as Pick<Profile, "framework" | "createdAt" | "deleted">;
const account = { email: "p@example.com", familyId: "f1" };

describe("a family's country", () => {
  it("is Canada with no children, or when the first child added follows a Canadian curriculum", () => {
    expect(familyCountry([])).toBe("CA");
    expect(familyCountry([child("ca-bc", 1)])).toBe("CA");
    expect(familyCountry([child("ca-on", 1), child("us-wa", 2)])).toBe("CA");
  });

  it("is the US when the first child added follows a US curriculum, whatever the order sent", () => {
    expect(familyCountry([child("us-wa", 1)])).toBe("US");
    expect(familyCountry([child("ca-ab", 5), child("us-wa", 2)])).toBe("US");
  });

  it("skips deleted children and treats an unknown curriculum as Canadian", () => {
    expect(familyCountry([child("us-wa", 1, true), child("ca-bc", 2)])).toBe("CA");
    expect(familyCountry([child("xx-zz", 1)])).toBe("CA");
  });
});

describe("whether consent is needed", () => {
  const fam = (over: Partial<FamilyInfo>) => ({ account, country: "US", consentAt: null, ...over }) as FamilyInfo;
  it("asks only signed-in US parents who haven't agreed yet", () => {
    expect(consentNeeded(fam({}))).toBe(true);
    expect(consentNeeded(fam({ consentAt: 123 }))).toBe(false);
    expect(consentNeeded(fam({ country: "CA" }))).toBe(false);
    expect(consentNeeded(fam({ country: undefined }))).toBe(false);
    expect(consentNeeded(fam({ account: undefined }))).toBe(false);
  });

  it("never asks a class student account, which the school's consent covers", () => {
    expect(consentNeeded(fam({ account: { ...account, student: true } }))).toBe(false);
  });

  it("names what is kept, why, what never happens, how long and the parent's choices", () => {
    expect(CONSENT_NOTICE.collect).toMatch(/first name or nickname, grade, an optional birth year .* avatar, and practice results/);
    expect(CONSENT_NOTICE.never).toMatch(/don’t sell/);
    expect(CONSENT_NOTICE.retention).toMatch(/delete/);
    expect(CONSENT_NOTICE.rights).toMatch(/review .* delete .* refuse further collection/);
  });
});
