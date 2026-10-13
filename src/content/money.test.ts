import { describe, expect, it } from "vitest";
import { coinName, formatMoney, moneyOf } from "./money";

describe("money", () => {
  it("lists each currency's coins and bills, smallest first", () => {
    expect(moneyOf()).toEqual([5, 10, 25, 100, 200, 500, 1000, 2000, 5000]);
    expect(moneyOf("USD")).toEqual([1, 5, 10, 25, 50, 100, 500, 1000, 2000, 5000]);
  });

  it("names coins the way each country does", () => {
    expect(coinName(100)).toBe("loonie");
    expect(coinName(100, "USD")).toBe("$1 bill");
    expect(coinName(1, "USD")).toBe("penny");
    expect(coinName(50, "USD")).toBe("half-dollar");
    // An amount with no coin of its own is written out.
    expect(coinName(75)).toBe("75¢");
    expect(formatMoney(1250)).toBe("$12.50");
  });
});
