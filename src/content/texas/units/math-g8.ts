import type { Unit } from "../../types";
import { num, pickOne } from "../../washington/units/math-kit";
import { bankUnit, type Q } from "../own";
import { makerUnit, pick, randInt, type Maker } from "./math-kit";

// Texas Grade 8 math written for Texas: equations with the variable on both sides (8.8(A), 8.8(C)) and personal
// financial literacy (8.12).

const signed = (n: number) => (n < 0 ? `− ${-n}` : `+ ${n}`);
const term = (a: number, v: string) => `${a === 1 ? "" : a}${v}`;
const side = (a: number, b: number, v = "x") => (b === 0 ? term(a, v) : `${term(a, v)} ${signed(b)}`);
const show = (n: number) => (n < 0 ? `−${-n}` : String(n));

/** ax + b = cx + e with a whole-number solution (negative from difficulty 3). */
function bothSides(d: 1 | 2 | 3): { a: number; b: number; c: number; e: number; x: number } {
  const x = d === 3 ? pick([-1, 1]) * randInt(1, 9) : randInt(1, 9);
  const c = randInt(1, d === 1 ? 4 : 7);
  const a = c + randInt(1, d === 1 ? 3 : 5);
  const b = d === 1 ? randInt(0, 12) : randInt(-12, 12);
  return { a, b, c, e: (a - c) * x + b, x };
}

const solveBoth: Maker = (d) => {
  const { a, b, c, e, x } = bothSides(d);
  return num(`Solve for x: ${side(a, b)} = ${side(c, e)}`, x, `Subtract ${term(c, "x")} from both sides: ${side(a - c, b)} = ${e}. ${b === 0 ? "Then" : `Then undo the ${signed(b)} and`} divide by ${a - c}.`, { extra: [-x, x + 1, x - 1, e - b], min: -20, label: show });
};

const checkValue: Maker = (d) => {
  const { a, b, c, e, x } = bothSides(d);
  const v = pick([x, x, x + 1, x - 1]);
  const yes = v === x;
  return pickOne(`Is x = ${show(v)} a solution of ${side(a, b)} = ${side(c, e)}?`, yes ? "Yes" : "No", [yes ? "No" : "Yes"], `Put ${show(v)} in for x on both sides. A solution makes both sides equal.`);
};

const plansStory: Maker = (d) => {
  const m = randInt(2, d === 1 ? 6 : 12);
  const ra = randInt(2, 8);
  const rb = ra + randInt(1, 5);
  const jb = randInt(1, 4) * 5;
  const ja = jb + (rb - ra) * m;
  return num(`Plan A costs $${ja} plus $${ra} a month. Plan B costs $${jb} plus $${rb} a month. After how many months do they cost the same?`, m, `Set them equal: ${ja} + ${ra}m = ${jb} + ${rb}m. Then solve for m.`, { min: 1, extra: [m + 1, m - 1, m * 2] });
};

const writeIt: Maker = () => {
  const ra = randInt(2, 8);
  const rb = ra + randInt(1, 5);
  const jb = randInt(1, 4) * 5;
  const ja = jb + randInt(2, 6) * 5;
  const right = `${ja} + ${ra}m = ${jb} + ${rb}m`;
  return pickOne(
    `Gym A charges $${ja} to join plus $${ra} a month. Gym B charges $${jb} to join plus $${rb} a month. Which equation finds when they cost the same?`,
    right,
    [`${ja} + ${rb}m = ${jb} + ${ra}m`, `${ra} + ${ja}m = ${rb} + ${jb}m`, `${ja} + ${ra}m + ${jb} + ${rb}m = 0`],
    "Write the cost of each gym for m months, then set the two costs equal.",
  );
};

export const bothSidesG8: Unit = makerUnit({
  id: "tx-g8-both-sides",
  title: "Variables on Both Sides",
  emoji: "⚖️",
  blurb: "Equations with x on both sides",
  parentNote: "Your child writes and solves equations with the variable on both sides of the equal sign, such as comparing two phone plans, and checks whether a value is a solution.",
  standards: ["8.8(A); 8.8(C)", "writing and solving equations with variables on both sides"],
  makers: [solveBoth, solveBoth, checkValue, plansStory, writeIt],
});

const MONEY_ITEMS: Q[] = [
  ["Two loans are for $2,000. Which one costs the most to repay?", "8% for 5 years", ["8% for 2 years", "4% for 2 years", "4% for 5 years"], "A higher rate and a longer time both add interest."],
  ["You borrow $1,000 at 6% simple interest for 3 years. How much interest do you pay?", "$180", ["$60", "$18", "$1,180"], "I = Prt = 1,000 × 0.06 × 3 = 180."],
  ["You borrow $1,000 at 6% simple interest for 3 years. What is the total you repay?", "$1,180", ["$1,060", "$1,018", "$180"], "Principal plus interest: 1,000 + 180 = 1,180."],
  ["A $5,000 car loan is at 4% simple interest. How much more interest is a 5-year loan than a 3-year loan?", "$400", ["$200", "$600", "$1,000"], "5 years: $1,000. 3 years: $600. 1,000 − 600 = 400."],
  ["Loan A: $3,000 at 5% for 4 years. Loan B: $3,000 at 7% for 2 years. Which costs less in simple interest?", "Loan B", ["Loan A", "they cost the same"], "A: 3,000 × 0.05 × 4 = 600. B: 3,000 × 0.07 × 2 = 420."],
  ["A credit card balance of $600 is not paid off and grows by 20% in a year. What is owed after the year?", "$720", ["$620", "$612", "$1,200"], "20% of 600 is 120. 600 + 120 = 720."],
  ["An easy access loan of $300 charges a $45 fee every 2 weeks it is not repaid. What is owed after 6 weeks?", "$435", ["$345", "$390", "$480"], "6 weeks is 3 fees: 300 + 3 × 45 = 435."],
  ["Why can easy access (payday) loans be risky?", "their fees and interest are very high", ["they are always free", "they lower your total cost", "they never have to be repaid"], "Short loans with high fees can cost much more than you borrowed."],
  ["Mia saves $25 a month from age 14 to age 18. How much has she deposited in 4 years?", "$1,200", ["$100", "$300", "$2,500"], "25 × 12 × 4 = 1,200."],
  ["Why does money invested regularly grow over time?", "regular deposits add up and earn interest on interest", ["prices go down every year", "banks give away free money", "money grows only if you never deposit"], "Compound interest makes regular saving grow faster."],
  ["Who will likely have more at age 65 if both invest $100 a month at the same rate?", "someone who starts at 25", ["someone who starts at 45", "they will have the same"], "Starting earlier gives interest more time to compound."],
  ["$2,000 earns 5% simple interest for 2 years. How much interest is earned?", "$200", ["$205", "$100", "$2,200"], "2,000 × 0.05 × 2 = 200."],
  ["$2,000 earns 5% interest compounded yearly for 2 years. How much interest is earned?", "$205", ["$200", "$210", "$2,205"], "Year 1: 2,100. Year 2: 2,205. Interest: 205."],
  ["Over many years, which earns more on the same amount and rate?", "compound interest", ["simple interest", "they always earn the same"], "Compound interest earns interest on interest."],
  ["What is an advantage of paying with a debit card?", "you spend only money you already have", ["you can build debt", "it charges interest", "it pays you back later"], "Debit draws from your own account."],
  ["What is a disadvantage of paying with a credit card?", "unpaid balances can grow with high interest", ["it can't be used online", "it never builds credit", "it is the same as cash"], "Carrying a balance costs interest."],
  ["What is an advantage of paying with a credit card and paying the bill in full each month?", "it can build a good credit history without interest", ["it costs more interest", "it lowers your income", "it stops you from spending"], "Paying in full avoids interest and builds credit."],
  ["Which is a financially responsible decision?", "comparing prices before a big purchase", ["buying on credit without a plan to repay", "skipping bills to buy wants", "taking a payday loan for a game"], "Responsible decisions plan ahead."],
  ["Which is a financially responsible decision?", "keeping an emergency fund", ["spending every paycheck right away", "using a credit card you can't pay off", "borrowing to buy snacks"], "An emergency fund protects you from surprises."],
  ["What is one benefit of financial responsibility?", "less debt and more choices later", ["higher interest rates", "more late fees", "a worse credit report"], "Good habits give you more options."],
  ["A 4-year college costs $11,000 a year. What is the total cost?", "$44,000", ["$22,000", "$11,000", "$40,000"], "11,000 × 4 = 44,000."],
  ["A 2-year college costs $4,500 a year. What is the total cost?", "$9,000", ["$4,500", "$18,000", "$6,500"], "4,500 × 2 = 9,000."],
  ["College costs $40,000. The family can give $10,000. How much more is needed?", "$30,000", ["$50,000", "$10,000", "$40,000"], "40,000 − 10,000 = 30,000."],
  ["A family needs $12,000 for college in 5 years. How much must they save each year?", "$2,400", ["$2,000", "$6,000", "$1,200"], "12,000 ÷ 5 = 2,400."],
  ["A family needs $6,000 more for college in 4 years. About how much is that per month?", "$125", ["$1,500", "$250", "$500"], "6,000 ÷ 48 months = 125."],
  ["A $10,000 loan at 5% simple interest for 10 years. What is the total repaid?", "$15,000", ["$10,500", "$5,000", "$20,000"], "Interest: 10,000 × 0.05 × 10 = 5,000. Total: 15,000.", true],
  ["$1,000 earns 10% compounded yearly. How much is it worth after 3 years?", "$1,331", ["$1,300", "$1,210", "$1,030"], "1,000 × 1.1 × 1.1 × 1.1 = 1,331.", true],
  ["A $400 phone is bought on a card at 24% a year, paid off after 1 year. How much does it really cost?", "$496", ["$424", "$400", "$960"], "24% of 400 is 96. 400 + 96 = 496.", true],
  ["4-year college: $48,000. Scholarships: $8,000. Family: $16,000. Saving for 8 years, how much a year?", "$3,000", ["$6,000", "$2,000", "$4,000"], "Needed: 48,000 − 8,000 − 16,000 = 24,000. 24,000 ÷ 8 = 3,000.", true],
];

export const moneyG8: Unit = bankUnit({
  id: "tx-g8-credit-and-saving",
  title: "Loans, Interest & College",
  emoji: "🎓",
  blurb: "Cost of credit, investing and college",
  parentNote: "Personal financial literacy: your child sees how the interest rate and the length of a loan change the cost of credit, works out what a loan or credit card balance really costs, watches regular investing grow, compares simple and compound interest and ways to pay, and estimates college costs with a savings plan.",
  standards: ["8.12(A); 8.12(B); 8.12(C); 8.12(D); 8.12(E); 8.12(F); 8.12(G)", "the cost of credit, investing over time, simple and compound interest, ways to pay, and saving for college"],
  items: MONEY_ITEMS,
});

export const MATH_G8: Unit[] = [bothSidesG8, moneyG8];
