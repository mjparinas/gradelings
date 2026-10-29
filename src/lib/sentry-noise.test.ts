import type { ErrorEvent } from "@sentry/nextjs";
import { describe, expect, it } from "vitest";
import { IGNORE_ERRORS, groupEvent } from "./sentry-noise";

const event = (type: string, value: string): ErrorEvent => ({ type: undefined, exception: { values: [{ type, value }] } });

describe("Sentry noise", () => {
  it("groups every script that came back as an HTML page into one issue", () => {
    expect(groupEvent(event("SyntaxError", "Unexpected token '<'")).fingerprint).toEqual(["script-served-as-html"]);
    expect(groupEvent(event("SyntaxError", "expected expression, got '<'")).fingerprint).toEqual(["script-served-as-html"]);
  });

  it("leaves other errors to Sentry's own grouping", () => {
    expect(groupEvent(event("SyntaxError", "Unexpected token '}'")).fingerprint).toBeUndefined();
    expect(groupEvent(event("TypeError", "Unexpected token '<'")).fingerprint).toBeUndefined();
    expect(groupEvent({ type: undefined }).fingerprint).toBeUndefined();
  });

  it("ignores errors from Zalo's in-app browser and nothing of ours", () => {
    const ignored = (m: string) => IGNORE_ERRORS.some((r) => r.test(m));
    expect(ignored("ReferenceError: Can't find variable: zaloJSV2")).toBe(true);
    expect(ignored("ReferenceError: Can't find variable: speak")).toBe(false);
  });
});
