import { pick, randInt } from "@/content/random";
import type { Currency } from "@/content/money";
import type { GradeId } from "@/content/types";

// Coin Shop: pay an exact amount (Grades 1 to 3) or give change (Grades 4 and 5). Canadian money
// has no pennies, so every amount is a multiple of 5¢. US children pay in US money: pennies, so any
// amount, and a $1 bill instead of the loonie and toonie.

export interface Money {
  id: string;
  name: string;
  cents: number;
  bill?: boolean;
}

export const MONEY: Money[] = [
  { id: "nickel", name: "nickel", cents: 5 },
  { id: "dime", name: "dime", cents: 10 },
  { id: "quarter", name: "quarter", cents: 25 },
  { id: "loonie", name: "loonie", cents: 100 },
  { id: "toonie", name: "toonie", cents: 200 },
  { id: "five", name: "$5 bill", cents: 500, bill: true },
];

export const US_MONEY: Money[] = [
  { id: "penny", name: "penny", cents: 1 },
  { id: "nickel", name: "nickel", cents: 5 },
  { id: "dime", name: "dime", cents: 10 },
  { id: "quarter", name: "quarter", cents: 25 },
  { id: "one", name: "$1 bill", cents: 100, bill: true },
  { id: "five", name: "$5 bill", cents: 500, bill: true },
];

/** The coins and bills on the counter for a currency. */
export const moneyFor = (currency: Currency = "CAD"): Money[] => (currency === "USD" ? US_MONEY : MONEY);

export interface ShopOrder {
  /** What the child has to make. */
  target: number;
  /** Shown at the top. */
  prompt: string;
  speak: string;
  /** The coins (and bills) on the counter to choose from. */
  money: Money[];
  item: string;
}

const G: Partial<Record<GradeId, number>> = { "1": 1, "2": 2, "3": 3, "4": 4, "5": 5 };

const ITEMS = ["🍎", "🧃", "🍪", "✏️", "🎈", "🧸", "📒", "🍌", "🧁", "🪁", "🎨", "⚽"];

export function formatMoney(cents: number): string {
  if (cents < 100) return `${cents}¢`;
  return `$${Math.floor(cents / 100)}.${String(cents % 100).padStart(2, "0")}`;
}

/** Said aloud: "35 cents", "3 dollars and 65 cents". */
export function sayMoney(cents: number): string {
  const d = Math.floor(cents / 100);
  const c = cents % 100;
  const dollars = d === 1 ? "1 dollar" : `${d} dollars`;
  const pennies = c === 1 ? "1 cent" : `${c} cents`;
  if (d === 0) return pennies;
  if (c === 0) return dollars;
  return `${dollars} and ${pennies}`;
}

const step5 = (min: number, max: number) => randInt(min / 5, max / 5) * 5;

/** The fewest coins and bills that make an amount (greedy works for Canadian and US money). */
export function fewestPieces(cents: number, money: Money[]): number {
  let left = cents;
  let count = 0;
  for (const m of [...money].sort((a, b) => b.cents - a.cents)) {
    count += Math.floor(left / m.cents);
    left %= m.cents;
  }
  return left === 0 ? count : Infinity;
}

export function shopOrder(grade: GradeId, currency: Currency = "CAD"): ShopOrder {
  const g = G[grade] ?? 5;
  const item = pick(ITEMS);
  const us = currency === "USD";
  const all = moneyFor(currency);
  const coins = (ids: string[]) => all.filter((m) => ids.includes(m.id));
  // Canadian amounts are in 5¢ steps; US amounts can be any number of cents.
  const amount = us ? randInt : step5;
  const small = us ? ["penny", "nickel", "dime", "quarter"] : ["nickel", "dime", "quarter"];
  const dollar = us ? ["one"] : ["loonie"];
  const dollars = us ? ["one"] : ["loonie", "toonie"];
  if (g <= 3) {
    const target = g === 1 ? amount(us ? 1 : 5, 50) : g === 2 ? amount(us ? 1 : 5, 100) : amount(105, 500);
    const money = g === 1 ? coins(us ? ["penny", "nickel", "dime"] : small) : g === 2 ? coins([...small, ...dollar]) : coins([...small, ...dollars]);
    return { target, item, money, prompt: `${item} costs ${formatMoney(target)}. Pay exactly ${formatMoney(target)}.`, speak: `It costs ${sayMoney(target)}. Pay exactly ${sayMoney(target)}.` };
  }
  // Change: the customer pays with a bill; give back the difference.
  const paid = g === 4 ? pick([500, 1000]) : pick([1000, 2000]);
  const price = amount(Math.max(5, paid - (g === 4 ? 500 : 1000)), paid - (us ? 1 : 5));
  const target = paid - price;
  const money = g === 4 ? coins([...small, ...dollars]) : all;
  return {
    target,
    item,
    money,
    prompt: `${item} costs ${formatMoney(price)}. They pay ${formatMoney(paid)}. Give the change.`,
    speak: `It costs ${sayMoney(price)}. They pay ${sayMoney(paid)}. Give the change.`,
  };
}
