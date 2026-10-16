// @vitest-environment jsdom
import { render } from "@testing-library/react";
import jsQR from "jsqr";
import { describe, expect, it } from "vitest";
import { classSignInHref } from "@/lib/playLink";
import { QrCode, qrPath } from "./QrCode";

// Draws the code the way a printer would (SVG path to pixels) and reads it back with an independent decoder.
function scan(text: string, scale = 6): string | null {
  const { size, d } = qrPath(text);
  const quiet = 3;
  const edge = (size + quiet * 2) * scale;
  const pixels = new Uint8ClampedArray(edge * edge * 4).fill(255);
  for (const [, col, row] of d.matchAll(/M(\d+) (\d+)h1v1h-1z/g)) {
    for (let y = 0; y < scale; y++) {
      for (let x = 0; x < scale; x++) {
        const at = (((Number(row) + quiet) * scale + y) * edge + (Number(col) + quiet) * scale + x) * 4;
        pixels[at] = pixels[at + 1] = pixels[at + 2] = 0;
      }
    }
  }
  return jsQR(pixels, edge, edge)?.data ?? null;
}

describe("QR code", () => {
  it("reads back as the login card link, for every shape of code a class can have", () => {
    for (const [c, s] of [["AB12CD", "ZX91PQ2M"], ["999999", "00000000"], ["ZZZZZZ", "ZZZZZZZZ"], ["A2B3C4", "K7M8N9PQ"]]) {
      const link = classSignInHref({ classCode: c, studentCode: s }, "https://gradelings.com");
      expect(scan(link), link).toBe(link);
    }
  });

  it("holds a longer address too, such as a preview site", () => {
    const link = classSignInHref({ classCode: "AB12CD", studentCode: "ZX91PQ2M" }, "https://gradelings-git-feature-team.vercel.app");
    expect(scan(link)).toBe(link);
  });

  it("is a labelled picture, always black on white", () => {
    const { container } = render(<QrCode text="hello" label="Sign-in code for Maya" />);
    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("role", "img");
    expect(svg).toHaveAttribute("aria-label", "Sign-in code for Maya");
    expect(svg.querySelector("rect")).toHaveAttribute("fill", "#fff");
    expect(svg.querySelector("path")).toHaveAttribute("fill", "#000");
  });
});
