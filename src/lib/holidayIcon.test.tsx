// @vitest-environment jsdom
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { HolidayHat } from "@/components/CritterArt";
import { HOLIDAYS } from "./holidays";
import { applyHolidayIcon, holidayIconUrl } from "./holidayIcon";

// Each icon is /icon.svg with the hat laid over the buddy's head. Run with UPDATE_ICONS=1 to rewrite them.
function build(id: (typeof HOLIDAYS)[number]["id"]): string {
  const base = readFileSync("public/icon.svg", "utf8").trimEnd();
  const hat = renderToStaticMarkup(<HolidayHat holiday={id} />);
  const group = `<g transform="translate(256 168) scale(1.9) translate(-100 -44)">${hat}</g>`;
  return base.replace("</svg>", `  ${group}\n</svg>`) + "\n";
}

describe("holiday tab icons", () => {
  for (const h of HOLIDAYS) {
    it(`${h.id} icon is up to date`, () => {
      const file = `public/icons/holiday-${h.id}.svg`;
      if (process.env.UPDATE_ICONS) writeFileSync(file, build(h.id));
      expect(existsSync(file)).toBe(true);
      expect(readFileSync(file, "utf8")).toBe(build(h.id));
    });
  }

  it("points the tab icon at the holiday and back", () => {
    document.head.innerHTML = '<link rel="icon" href="/icon.svg" type="image/svg+xml">';
    applyHolidayIcon("easter");
    expect(document.querySelector("link")!.getAttribute("href")).toBe("/icons/holiday-easter.svg");
    applyHolidayIcon(null);
    expect(document.querySelector("link")!.getAttribute("href")).toBe(holidayIconUrl(null));
  });
});
