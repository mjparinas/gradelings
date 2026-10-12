import { describe, expect, it } from "vitest";
import { cancelReason, cancelReasonRows } from "./cancelReasons";

describe("cancel reasons", () => {
  it("keeps only the reasons Stripe's portal offers", () => {
    expect(cancelReason("too_expensive")).toBe("too_expensive");
    expect(cancelReason("made_up")).toBeNull();
    expect(cancelReason(null)).toBeNull();
  });

  it("lists the most common reason first, with its share", () => {
    expect(cancelReasonRows([{ reason: "unused", n: 1 }, { reason: "too_expensive", n: 3 }, { reason: "nonsense", n: 0 }])).toEqual([
      { label: "Too expensive", value: 3, note: "75%" },
      { label: "Not using it enough", value: 1, note: "25%" },
    ]);
  });
});
