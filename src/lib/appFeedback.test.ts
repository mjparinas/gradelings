import { describe, expect, it } from "vitest";
import { checkFeedback, MAX_COMMENT } from "./appFeedback";

describe("checkFeedback", () => {
  it("takes a rating alone, a comment alone, or both", () => {
    expect(checkFeedback({ audience: "parent", rating: 4 })).toMatchObject({ ok: true, value: { rating: 4, comment: "", canReply: false } });
    expect(checkFeedback({ audience: "teacher", comment: "  Nice \r\n" })).toMatchObject({ ok: true, value: { rating: null, comment: "Nice" } });
  });
  it("needs something, a known audience and a whole rating from 1 to 5", () => {
    for (const b of [null, {}, { audience: "parent" }, { audience: "kid", rating: 3 }, { audience: "parent", rating: 0 }, { audience: "parent", rating: 6 }, { audience: "parent", rating: 1.5 }, { audience: "parent", comment: "   " }]) {
      expect(checkFeedback(b).ok).toBe(false);
    }
  });
  it("clips long comments, drops unknown topics and takes canReply only when exactly true", () => {
    const r = checkFeedback({ audience: "parent", comment: "x".repeat(MAX_COMMENT + 50), topic: "nope", canReply: "yes" });
    expect(r.ok && r.value.comment.length).toBe(MAX_COMMENT);
    expect(r.ok && r.value.topic).toBeNull();
    expect(r.ok && r.value.canReply).toBe(false);
  });
});
