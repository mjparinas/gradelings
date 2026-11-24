// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { beforeEach, describe, expect, it } from "vitest";
import { IOS_BUNDLE_ID, IOS_PRODUCTS, isIosApp } from "./ios";

describe("isIosApp", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    window.history.replaceState({}, "", "/parents/");
    delete window.__gradelingsIOS;
  });
  it("is false in an ordinary browser", () => {
    expect(isIosApp()).toBe(false);
  });
  it("is true for the app's start URL, and stays true on later pages", () => {
    window.history.replaceState({}, "", "/play/?app=ios");
    expect(isIosApp()).toBe(true);
    window.history.replaceState({}, "", "/parents/");
    expect(isIosApp()).toBe(true);
  });
  it("is true when the Swift shell set the boot flag", () => {
    window.__gradelingsIOS = true;
    expect(isIosApp()).toBe(true);
  });
});

describe("bundle and product ids", () => {
  it("match the XcodeGen project and StoreKit config", () => {
    const project = readFileSync("ios/project.yml", "utf8");
    expect(project).toContain(`PRODUCT_BUNDLE_IDENTIFIER: ${IOS_BUNDLE_ID}`);
    const storekit = readFileSync("ios/Gradelings/Products.storekit", "utf8");
    expect(storekit).toContain(IOS_PRODUCTS.month);
    expect(storekit).toContain(IOS_PRODUCTS.year);
    const store = readFileSync("ios/Gradelings/Store.swift", "utf8");
    expect(store).toContain(IOS_PRODUCTS.month);
    expect(store).toContain(IOS_PRODUCTS.year);
  });
});
