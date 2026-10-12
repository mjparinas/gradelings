import { describe, expect, it } from "vitest";
import { APP_NAME } from "./brand";
import { fillMessage, isSegment, joinNames, MESSAGE_PRESETS, messageProblem, paragraphs } from "./adminEmails";

const ok = { subject: "Hi", body: "Hello", button: { label: "Play", path: "/play/" } };

describe("admin email helpers", () => {
  it("fills names and the app's name, with a stand-in for the panel's preview", () => {
    expect(fillMessage("{children} in {app}", ["Mia"])).toBe(`Mia in ${APP_NAME}`);
    expect(fillMessage("{children}", null)).toBe("[child's first name]");
    expect(joinNames([])).toBe("your child");
    expect(joinNames(["A", "B"])).toBe("A and B");
    expect(joinNames(["A", "B", "C"])).toBe("A, B and C");
  });

  it("splits paragraphs on blank lines", () => {
    expect(paragraphs("One\nstill one\n\n  \n\nTwo  ")).toEqual(["One\nstill one", "Two"]);
  });

  it("accepts a good message and every preset but the blank one", () => {
    expect(messageProblem(ok)).toBeNull();
    expect(messageProblem({ ...ok, button: null })).toBeNull();
    for (const p of MESSAGE_PRESETS) expect(messageProblem({ subject: p.subject, body: p.body, button: p.button }) === null).toBe(p.id !== "custom");
  });

  it("refuses empty, too long and off-site messages", () => {
    expect(messageProblem(null)).toMatch(/Write/);
    expect(messageProblem({ ...ok, subject: " " })).toMatch(/subject/);
    expect(messageProblem({ ...ok, body: "" })).toMatch(/message/);
    expect(messageProblem({ ...ok, subject: "x".repeat(151) })).toMatch(/under 150/);
    expect(messageProblem({ ...ok, body: "x".repeat(5001) })).toMatch(/under 5000/);
    expect(messageProblem({ ...ok, button: { label: "", path: "/play/" } })).toMatch(/label/);
    for (const path of ["https://evil.example/", "//evil.example/", "play/", "/play now/", "javascript:alert(1)"]) expect(messageProblem({ ...ok, button: { label: "Go", path } })).toMatch(/this site/);
  });

  it("knows its groups", () => {
    expect(isSegment("quiet-7")).toBe(true);
    expect(isSegment("toString")).toBe(false);
    expect(isSegment(3)).toBe(false);
  });
});
