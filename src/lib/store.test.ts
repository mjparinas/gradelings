import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./localdb", () => ({ setKV: vi.fn(), putEvents: vi.fn(), deleteProfileEvents: vi.fn() }));

import { MAX_CHILDREN } from "./plan";
import { useStore } from "./store";

const child = { name: "A", avatar: "ollie", colour: "#fff", grade: "2" as const };

beforeEach(() => {
  useStore.setState({
    profiles: [],
    activeId: null,
    settings: {},
    sync: { cursor: 0, status: "signed-out", dirtyProfiles: [], dirtyFamily: false },
  });
});

describe("adding a child", () => {
  it("stops at the family limit, and a removed child frees a place", () => {
    const ids = Array.from({ length: MAX_CHILDREN }, (_, i) => useStore.getState().addProfile({ ...child, name: `C${i}` }));
    expect(ids.every(Boolean)).toBe(true);
    expect(useStore.getState().profiles.filter((p) => !p.deleted)).toHaveLength(MAX_CHILDREN);
    expect(useStore.getState().addProfile({ ...child, name: "Extra" })).toBe("");
    expect(useStore.getState().profiles.filter((p) => !p.deleted)).toHaveLength(MAX_CHILDREN);
    useStore.getState().removeProfile(ids[0]);
    expect(useStore.getState().addProfile({ ...child, name: "Again" })).not.toBe("");
    expect(useStore.getState().profiles.filter((p) => !p.deleted)).toHaveLength(MAX_CHILDREN);
  });
});
