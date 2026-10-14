import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";

// Every picture in the apps and on the site says what it shows, or says it is decoration
// (WCAG 1.1.1). Checked in the source, so a new image can't ship without it:
// - <img> and next/image <Image> always carry `alt` (alt="" for decoration).
// - <svg> is either hidden (aria-hidden) or a labelled image (role="img" plus aria-label or
//   aria-labelledby). An <svg> inside a labelled container still gets aria-hidden.
// - Anything with role="img" has a label.
// The axe scan in scripts/e2e-a11y.mjs checks the rendered pages too.

const ROOT = join(__dirname, "..");

function tsxFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const path = join(dir, e.name);
    if (e.isDirectory()) return tsxFiles(path);
    return e.name.endsWith(".tsx") && !e.name.includes(".test.") ? [path] : [];
  });
}

type Problem = string;

function attrs(node: ts.JsxOpeningLikeElement) {
  const found = new Map<string, string | true>();
  for (const p of node.attributes.properties) {
    if (!ts.isJsxAttribute(p)) continue;
    const name = p.name.getText();
    const init = p.initializer;
    found.set(name, init && ts.isStringLiteral(init) ? init.text : true);
  }
  return found;
}

export function imageProblems(file: string, source: string): Problem[] {
  const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const problems: Problem[] = [];
  const visit = (node: ts.Node) => {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName.getText();
      const a = attrs(node);
      const where = `${file}:${sf.getLineAndCharacterOfPosition(node.getStart()).line + 1}`;
      const hidden = a.get("aria-hidden") !== undefined && a.get("aria-hidden") !== "false";
      const labelled = a.has("aria-label") || a.has("aria-labelledby");
      if ((tag === "img" || tag === "Image") && !a.has("alt")) problems.push(`${where} <${tag}> has no alt`);
      if (tag === "svg" && !hidden && !(a.get("role") === "img" && labelled)) {
        problems.push(`${where} <svg> needs aria-hidden="true", or role="img" with aria-label`);
      }
      if (a.get("role") === "img" && !labelled) problems.push(`${where} role="img" has no aria-label`);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return problems;
}

describe("image alternatives", () => {
  it("every image in src has alt text or is marked decorative", () => {
    const problems = tsxFiles(ROOT).flatMap((f) => imageProblems(relative(ROOT, f), readFileSync(f, "utf8")));
    expect(problems).toEqual([]);
  });

  it("catches a missing alt, an unlabelled svg and an unlabelled role=img", () => {
    const bad = `export const A = () => (<div>
      <img src="/a.png" />
      <svg viewBox="0 0 1 1" />
      <span role="img">⭐</span>
    </div>);`;
    expect(imageProblems("a.tsx", bad)).toHaveLength(3);
    const good = `export const B = () => (<div>
      <img src="/a.png" alt="" />
      <svg aria-hidden="true" />
      <svg role="img" aria-label="a clock" />
      <span role="img" aria-label="3 stars">⭐</span>
    </div>);`;
    expect(imageProblems("b.tsx", good)).toEqual([]);
  });
});
