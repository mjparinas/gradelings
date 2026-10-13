import { describe, expect, it } from "vitest";
import { FRAMEWORKS } from "@/content/frameworks";
import { COUNTRIES, COUNTRY_ORDER, countryOf, toCountryCode } from "./country";

describe("countries", () => {
  it("reads stored codes, treating empty as Canada and refusing unknown ones", () => {
    expect(toCountryCode("US")).toBe("US");
    expect(toCountryCode("CA")).toBe("CA");
    expect(toCountryCode(null)).toBe("CA");
    expect(toCountryCode(undefined)).toBe("CA");
    expect(toCountryCode("")).toBe("CA");
    expect(() => toCountryCode("GB")).toThrow(/Unknown country/);
    expect(() => toCountryCode("toString")).toThrow(/Unknown country/);
  });

  it("finds a framework's country", () => {
    for (const f of FRAMEWORKS) expect(countryOf(f).code).toBe(f.country);
    expect(countryOf(null)).toBe(COUNTRIES.CA);
  });

  it("lists every country once, in picker order", () => {
    expect([...COUNTRY_ORDER].sort()).toEqual(Object.keys(COUNTRIES).sort());
  });

  it("asks US parents for consent and no one else", () => {
    expect(COUNTRY_ORDER.filter((c) => COUNTRIES[c].parentalConsent)).toEqual(["US"]);
  });
});
