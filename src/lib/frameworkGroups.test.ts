import { describe, expect, it } from "vitest";
import { FRAMEWORKS, getFramework } from "@/content/frameworks";
import { frameworkGroups, frameworkMenu, orderedFrameworks } from "./frameworkGroups";

const WASHINGTON = getFramework("washington");
// The pickers with Washington offered, whether or not it has moved into FRAMEWORKS yet.
const withUs = [...FRAMEWORKS.filter((f) => f.country === "CA"), WASHINGTON];

describe("frameworkGroups", () => {
  it("is Washington, a US state", () => {
    expect(WASHINGTON).toMatchObject({ id: "us-wa", country: "US" });
  });

  it("puts Canadian provinces and territories first, then US states, keeping their order", () => {
    const groups = frameworkGroups([WASHINGTON, ...FRAMEWORKS.filter((f) => f.country === "CA")]);
    expect(groups.map((g) => g.label)).toEqual(["Canada", "United States"]);
    expect(groups[0].frameworks.map((f) => f.id)).toEqual(FRAMEWORKS.filter((f) => f.country === "CA").map((f) => f.id));
    expect(groups[1].frameworks.map((f) => f.id)).toEqual(["us-wa"]);
    expect(orderedFrameworks(withUs).at(-1)?.id).toBe("us-wa");
  });

  it("leaves out a country with nothing offered", () => {
    const canada = FRAMEWORKS.filter((f) => f.country === "CA");
    expect(frameworkGroups(canada).map((g) => g.country)).toEqual(["CA"]);
  });

  it("offers every framework that is live, so Washington appears once it launches", () => {
    expect(orderedFrameworks().map((f) => f.id).sort()).toEqual(FRAMEWORKS.map((f) => f.id).sort());
  });

  it("builds plain options for one country and groups for two", () => {
    const canada = FRAMEWORKS.filter((f) => f.country === "CA");
    const one = frameworkMenu((f) => f.region, canada);
    expect(one.groups).toBeUndefined();
    expect(one.options?.[0]).toEqual({ value: "ca-bc", label: "British Columbia" });
    const two = frameworkMenu((f) => f.region, withUs);
    expect(two.options).toBeUndefined();
    expect(two.groups?.map((g) => g.label)).toEqual(["Canada", "United States"]);
    expect(two.groups?.[1].options).toEqual([{ value: "us-wa", label: WASHINGTON.region }]);
  });
});
