import { describe, expect, it } from "vitest";
import { pageMeta } from "./pageMeta";
import { DEFAULT_LANG, langFromOgLocale, setPageLang } from "./pageLang.mjs";

const page = (og?: string) =>
  `<!DOCTYPE html><html lang="en-CA" class="a b"><head><meta charSet="utf-8"/>${og ? `<meta property="og:locale" content="${og}"/>` : ""}` +
  `</head><body><script>self.__next_f.push([1,"<meta property=\\"og:locale\\" content=\\"en_US\\"/>"])</script></body></html>`;

describe("langFromOgLocale", () => {
  it("turns an Open Graph locale into a language tag", () => {
    expect(langFromOgLocale("en_US")).toBe("en-US");
    expect(langFromOgLocale("en_CA")).toBe("en-CA");
  });

  it("ignores anything that isn't one", () => {
    expect(langFromOgLocale(undefined)).toBeNull();
    expect(langFromOgLocale("")).toBeNull();
    expect(langFromOgLocale("en")).toBeNull();
    expect(langFromOgLocale('en_US" onload="x')).toBeNull();
  });
});

describe("setPageLang", () => {
  it("gives a US state's page en-US", () => {
    expect(setPageLang(page("en_US"))).toContain('<html lang="en-US" class="a b">');
  });

  it("keeps Canadian pages, and pages with no locale, in Canadian English", () => {
    expect(setPageLang(page("en_CA"))).toContain('<html lang="en-CA"');
    expect(setPageLang(page())).toContain(`<html lang="${DEFAULT_LANG}"`);
  });

  it("reads the locale from <head> only, never from the page's data", () => {
    expect(setPageLang(page())).not.toContain('lang="en-US"');
  });

  it("changes nothing else and is safe to run twice", () => {
    const once = setPageLang(page("en_US"));
    expect(setPageLang(once)).toBe(once);
    expect(once.replace('lang="en-US"', 'lang="en-CA"')).toBe(page("en_US"));
  });

  it("reads what pageMeta writes for a US state and a province", () => {
    const og = (country: "US" | "CA") => (pageMeta({ title: "t", description: "d", path: "/", framework: { country } }).openGraph as { locale: string }).locale;
    expect(langFromOgLocale(og("US"))).toBe("en-US");
    expect(langFromOgLocale(og("CA"))).toBe("en-CA");
  });
});
