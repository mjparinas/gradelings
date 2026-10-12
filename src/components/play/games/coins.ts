import { pick, randInt } from "@/content/random";
import type { GradeId } from "@/content/types";

// Coin Shop: pay an exact amount (Grades 1 to 3) or give change (Grades 4 and 5) in Canadian
// money. No pennies, so every amount is a multiple of 5¢.

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
  if (d === 0) return `${c} cents`;
  if (c === 0) return dollars;
  return `${dollars} and ${c} cents`;
}

const step5 = (min: number, max: number) => randInt(min / 5, max / 5) * 5;

/** The fewest coins and bills that make an amount (greedy works for Canadian money). */
export function fewestPieces(cents: number, money: Money[]): number {
  let left = cents;
  let count = 0;
  for (const m of [...money].sort((a, b) => b.cents - a.cents)) {
    count += Math.floor(left / m.cents);
    left %= m.cents;
  }
  return left === 0 ? count : Infinity;
}

export function shopOrder(grade: GradeId): ShopOrder {
  const g = G[grade] ?? 5;
  const item = pick(ITEMS);
  const coins = (ids: string[]) => MONEY.filter((m) => ids.includes(m.id));
  if (g <= 3) {
    const target = g === 1 ? step5(5, 50) : g === 2 ? step5(5, 100) : step5(105, 500);
    const money = g === 1 ? coins(["nickel", "dime", "quarter"]) : g === 2 ? coins(["nickel", "dime", "quarter", "loonie"]) : coins(["nickel", "dime", "quarter", "loonie", "toonie"]);
    return { target, item, money, prompt: `${item} costs ${formatMoney(target)}. Pay exactly ${formatMoney(target)}.`, speak: `It costs ${sayMoney(target)}. Pay exactly ${sayMoney(target)}.` };
  }
  // Change: the customer pays with a bill; give back the difference.
  const paid = g === 4 ? pick([500, 1000]) : pick([1000, 2000]);
  const price = step5(Math.max(5, paid - (g === 4 ? 500 : 1000)), paid - 5);
  const target = paid - price;
  const money = g === 4 ? coins(["nickel", "dime", "quarter", "loonie", "toonie"]) : MONEY;
  return {
    target,
    item,
    money,
    prompt: `${item} costs ${formatMoney(price)}. They pay ${formatMoney(paid)}. Give the change.`,
    speak: `It costs ${sayMoney(price)}. They pay ${sayMoney(paid)}. Give the change.`,
  };
}
