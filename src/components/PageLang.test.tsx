// @vitest-environment jsdom
import { render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PageLang } from "./PageLang";

function setLocale(locale?: string) {
  document.head.querySelectorAll('meta[property="og:locale"]').forEach((m) => m.remove());
  if (!locale) return;
  const meta = document.createElement("meta");
  meta.setAttribute("property", "og:locale");
  meta.setAttribute("content", locale);
  document.head.append(meta);
}

afterEach(() => {
  setLocale();
  document.documentElement.lang = "";
});

describe("PageLang", () => {
  it("sets the page's language from its Open Graph locale", () => {
    setLocale("en_US");
    render(<PageLang />);
    expect(document.documentElement.lang).toBe("en-US");
  });

  it("uses Canadian English when the page names no locale", () => {
    render(<PageLang />);
    expect(document.documentElement.lang).toBe("en-CA");
  });

  it("follows the next page's metadata as it arrives, and stops when unmounted", async () => {
    setLocale("en_CA");
    const view = render(<PageLang />);
    expect(document.documentElement.lang).toBe("en-CA");
    setLocale("en_US");
    await waitFor(() => expect(document.documentElement.lang).toBe("en-US"));
    document.head.querySelector('meta[property="og:locale"]')!.setAttribute("content", "en_CA");
    await waitFor(() => expect(document.documentElement.lang).toBe("en-CA"));
    view.unmount();
    setLocale("en_US");
    await new Promise((r) => setTimeout(r, 10));
    expect(document.documentElement.lang).toBe("en-CA");
  });
});
