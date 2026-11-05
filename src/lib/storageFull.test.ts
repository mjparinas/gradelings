// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { dismissStorageFull, isStorageFull, reportStorageFull, resetStorageFull, useStorageFull } from "./storageFull";

beforeEach(() => resetStorageFull());

describe("storage full", () => {
  it("recognises the errors browsers give when a device has no room", () => {
    expect(isStorageFull(Object.assign(new Error("x"), { name: "QuotaExceededError" }))).toBe(true);
    expect(isStorageFull(new Error("QuotaExceededError: Encountered disk full while committing transaction."))).toBe(true);
    expect(isStorageFull(new Error("IO error: 000003.log: FILE_ERROR_NO_SPACE (ChromeMethodBFE)"))).toBe(true);
    expect(isStorageFull({ code: 22 })).toBe(true);
  });

  it("leaves other errors alone", () => {
    expect(isStorageFull(new Error("The database connection is closing."))).toBe(false);
    expect(isStorageFull(null)).toBe(false);
    expect(isStorageFull("disk full")).toBe(false);
  });

  it("shows the notice once storage is full and hides it when dismissed", () => {
    const { result } = renderHook(() => useStorageFull());
    expect(result.current).toBe(false);
    act(() => reportStorageFull());
    expect(result.current).toBe(true);
    act(() => reportStorageFull());
    expect(result.current).toBe(true);
    act(() => dismissStorageFull());
    expect(result.current).toBe(false);
    act(() => reportStorageFull());
    expect(result.current).toBe(false);
  });
});
