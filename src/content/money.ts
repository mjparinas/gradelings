// Coins and bills, in cents. Canadian money is the default; US units set `currency: "USD"` on the question.
export type Currency = "CAD" | "USD";

/** Canadian coins and bills. There are no pennies, so amounts are multiples of 5¢. */
export const COIN_NAMES: Record<number, string> = {
  5: "nickel",
  10: "dime",
  25: "quarter",
  100: "loonie",
  200: "toonie",
  500: "$5 bill",
  1000: "$10 bill",
  2000: "$20 bill",
  5000: "$50 bill",
};

/** US coins and bills. Pennies are still in use, and $1 is usually a bill. */
export const US_COIN_NAMES: Record<number, string> = {
  1: "penny",
  5: "nickel",
  10: "dime",
  25: "quarter",
  50: "half-dollar",
  100: "$1 bill",
  500: "$5 bill",
  1000: "$10 bill",
  2000: "$20 bill",
  5000: "$50 bill",
};

/** The coins and bills of a currency, smallest first. */
export function moneyOf(currency: Currency = "CAD"): number[] {
  return Object.keys(currency === "USD" ? US_COIN_NAMES : COIN_NAMES).map(Number);
}

/** What a coin or bill is called, e.g. "loonie" or "$1 bill". */
export function coinName(cents: number, currency: Currency = "CAD"): string {
  return (currency === "USD" ? US_COIN_NAMES : COIN_NAMES)[cents] ?? formatMoney(cents);
}

export function formatMoney(cents: number): string {
  if (cents < 100) return `${cents}¢`;
  const dollars = cents / 100;
  return `$${Number.isInteger(dollars) ? dollars : dollars.toFixed(2)}`;
}
