import { describe, expect, it } from "vitest";
import { slashImageUrls } from "./ogUrls.mjs";

const page = (url: string) =>
  `<html><head><meta property="og:image" content="${url}"/><meta name="twitter:image" content="${url}"/><meta property="og:image:width" content="1200"/></head>` +
  `<body><script>self.__next_f.push([1,"[\\"$\\",\\"meta\\",\\"13\\",{\\"property\\":\\"og:image\\",\\"content\\":\\"${url}\\"}]"])</script></body></html>`;

describe("slashImageUrls", () => {
  it("points share images at the address that answers without a redirect, in the tags and in the page's React data", () => {
    const out = slashImageUrls(page("https://www.example.com/curriculum/bc/grade-4/opengraph-image?abc123"));
    expect(out).toContain('<meta property="og:image" content="https://www.example.com/curriculum/bc/grade-4/opengraph-image/?abc123"/>');
    expect(out).toContain('<meta name="twitter:image" content="https://www.example.com/curriculum/bc/grade-4/opengraph-image/?abc123"/>');
    expect(out).toContain('\\"content\\":\\"https://www.example.com/curriculum/bc/grade-4/opengraph-image/?abc123\\"');
    expect(out).not.toContain("opengraph-image?");
  });

  it("leaves other tags and file addresses alone, and is safe to run twice", () => {
    const once = slashImageUrls(page("https://www.example.com/opengraph-image?x1"));
    expect(once).toContain('content="1200"');
    expect(slashImageUrls(once)).toBe(once);
    const png = page("https://www.example.com/milestone/count/days/100/card.png");
    expect(slashImageUrls(png)).toBe(png);
  });
});
