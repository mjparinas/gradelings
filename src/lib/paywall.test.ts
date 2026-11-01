import { beforeAll, describe, expect, it } from "vitest";
import { allUnitRefs, loadGrade, type UnitRef } from "@/content";
import { lockingUnits, stakeFor, stakeLine, titleList } from "./paywall";
import { FREE_UNITS_PER_COURSE } from "./plan";

let math: UnitRef[];
beforeAll(async () => {
  await loadGrade("3", "ca-bc");
  await loadGrade("3", "us-ca");
  math = allUnitRefs("3", "ca-bc").filter((r) => r.course.subject === "math");
});

describe("lockingUnits", () => {
  it("keeps only started units past the free ones in their course, most practised first", () => {
    const rows = [
      { ref: math[0], attempts: 20 },
      { ref: math[FREE_UNITS_PER_COURSE], attempts: 3 },
      { ref: math[FREE_UNITS_PER_COURSE + 1], attempts: 9 },
      { ref: math[FREE_UNITS_PER_COURSE + 2], attempts: 0 },
    ];
    expect(lockingUnits(rows, "ca-bc").map((r) => r.key)).toEqual([math[FREE_UNITS_PER_COURSE + 1].key, math[FREE_UNITS_PER_COURSE].key]);
  });

  it("counts a US child's localized units in their own state's course", () => {
    const us = allUnitRefs("3", "us-ca").filter((r) => r.course.subject === "math");
    expect(lockingUnits([{ ref: us[FREE_UNITS_PER_COURSE], attempts: 1 }], "us-ca")).toHaveLength(1);
    expect(lockingUnits([{ ref: us[0], attempts: 1 }], "us-ca")).toHaveLength(0);
  });
});

describe("stakeFor", () => {
  it("counts each started unit once", () => {
    const ref = math[FREE_UNITS_PER_COURSE];
    expect(stakeFor("Maya", "ca-bc", [{ ref, attempts: 4 }, { ref, attempts: 4 }, { ref: math[0], attempts: 1 }])).toEqual({ name: "Maya", started: 2, locking: [ref.unit.title] });
  });
});

describe("titleList", () => {
  it("names two and counts the rest", () => {
    expect(titleList(["A"])).toBe("A");
    expect(titleList(["A", "B"])).toBe("A and B");
    expect(titleList(["A", "B", "C", "D"])).toBe("A, B and 2 more");
  });
});

describe("stakeLine", () => {
  it("says what locks when the trial ends", () => {
    expect(stakeLine({ name: "Maya", started: 9, locking: ["Fractions", "Place value", "A", "B", "C", "D"] }, "trial")).toBe(
      "Maya has started 9 units. 6 of them lock when the trial ends: Fractions, Place value and 4 more.",
    );
    expect(stakeLine({ name: "Leo", started: 1, locking: ["Fractions"] }, "trial")).toBe("Leo has started 1 unit. It locks when the trial ends: Fractions.");
    expect(stakeLine({ name: "Leo", started: 2, locking: ["A", "B"] }, "trial")).toBe("Leo has started 2 units. All 2 lock when the trial ends: A and B.");
  });

  it("says what is waiting after the trial", () => {
    expect(stakeLine({ name: "Maya", started: 4, locking: ["Fractions"] }, "free")).toBe("Maya has 1 started unit waiting for the family plan: Fractions.");
  });

  it("says nothing when every started unit stays free", () => {
    expect(stakeLine({ name: "Maya", started: 2, locking: [] }, "trial")).toBeNull();
  });
});
