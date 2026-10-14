import { course as bcG7Math } from "../../grades/g7/math";
import { canadianWords, questionText } from "../../locale";
import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { from } from "./kit";
import { keepOnly } from "./math-kit";

// Texas Grade 7 math written for Texas: tips, discounts and simple interest from BC's unit with its Canadian sales
// taxes left out (7.4(D), 7.13(E), 7.13(F)), and personal financial literacy (7.13).

export const discountsG7: Unit = keepOnly(
  from(bcG7Math.units, "tax-tips-discounts"),
  {
    id: "tx-g7-tips-and-discounts",
    title: "Tips, Discounts & Interest",
    emoji: "🏷️",
    blurb: "Percents in shopping and saving",
    parentNote: "Your child uses percents to find tips, sale prices and percent discounts, compares two sales, and finds simple interest on savings.",
    standards: ["7.4(D); 7.13(E); 7.13(F)", "percent problems with tips, discounts and sales, and simple interest"],
  },
  (q) => canadianWords(questionText(q)).length === 0,
);

const MONEY_ITEMS: Q[] = [
  ["A game costs $40. The sales tax rate is 8%. How much is the sales tax?", "$3.20", ["$0.32", "$32.00", "$4.80"], "8% of 40 = 0.08 × 40 = 3.20."],
  ["Shoes cost $60 and the sales tax rate is 8.25%. What is the total cost?", "$64.95", ["$60.83", "$68.25", "$4.95"], "Tax: 0.0825 × 60 = 4.95. Total: 60 + 4.95 = 64.95."],
  ["A $25 shirt has a sales tax rate of 6%. What is the total cost?", "$26.50", ["$25.06", "$31.00", "$1.50"], "Tax: 0.06 × 25 = 1.50. Total: 26.50."],
  ["Ana earns $500. Her income tax rate is 10%. How much income tax does she pay?", "$50", ["$5", "$450", "$100"], "10% of 500 = 50."],
  ["Leo earns $2,000 a month and pays 12% income tax. How much does he keep after income tax?", "$1,760", ["$240", "$1,880", "$2,240"], "Tax: 0.12 × 2,000 = 240. 2,000 − 240 = 1,760."],
  ["Which is a part of a personal budget?", "planned savings for emergencies", ["your friend's income", "the price of a house you won't buy", "last year's weather"], "A budget lists income, savings, taxes and spending."],
  ["Which belongs in the savings part of a budget?", "money set aside for college and retirement", ["rent", "groceries", "a phone bill"], "Savings are planned, not leftover."],
  ["Taxes, housing and food in a budget are…", "expenses", ["income", "assets", "savings"], "Money going out is an expense."],
  ["An asset is…", "something of value that you own", ["money that you owe", "a monthly bill", "a tax"], "Assets are what you own."],
  ["A liability is…", "money that you owe", ["something of value you own", "your paycheck", "a savings account"], "Liabilities are debts."],
  ["Which is an asset?", "a savings account", ["a car loan", "a credit card balance", "a student loan"], "Money you own is an asset."],
  ["Which is a liability?", "a credit card balance", ["a bike you own", "cash", "a savings account"], "A balance you must pay is a liability."],
  ["Net worth equals…", "assets minus liabilities", ["assets plus liabilities", "income minus taxes", "liabilities minus assets"], "Net worth = what you own − what you owe."],
  ["Assets: $12,000. Liabilities: $4,500. What is the net worth?", "$7,500", ["$16,500", "$4,500", "-$7,500"], "12,000 − 4,500 = 7,500."],
  ["Assets: car $8,000, savings $2,000. Liabilities: car loan $6,000. What is the net worth?", "$4,000", ["$16,000", "$10,000", "$2,000"], "Assets total 10,000. 10,000 − 6,000 = 4,000."],
  ["A family's basic budget is $4,000 a month. One adult works 160 hours a month. What hourly wage is needed?", "$25 an hour", ["$40 an hour", "$16 an hour", "$20 an hour"], "4,000 ÷ 160 = 25."],
  ["A family budget estimator shows a minimum budget of $3,200 a month. What is that for a year?", "$38,400", ["$32,000", "$3,600", "$36,200"], "3,200 × 12 = 38,400."],
  ["Simple interest is earned on…", "only the original amount", ["the original amount and the interest already earned", "only the interest", "nothing"], "Simple interest uses the principal only."],
  ["Compound interest is earned on…", "the original amount and the interest already earned", ["only the original amount", "only the tax", "money you owe"], "Compound interest earns interest on interest."],
  ["$1,000 earns 5% simple interest a year. How much interest after 3 years?", "$150", ["$50", "$157.63", "$1,150"], "Simple interest = 1,000 × 0.05 × 3 = 150."],
  ["$1,000 earns 10% interest compounded yearly. How much is in the account after 2 years?", "$1,210", ["$1,200", "$1,100", "$1,020"], "Year 1: 1,100. Year 2: 1,100 × 1.10 = 1,210."],
  ["$200 earns 10% a year for 2 years. How much more does compound interest earn than simple interest?", "$2", ["$0", "$20", "$42"], "Simple: $40. Compound: 220 then 242, so $42. 42 − 40 = 2."],
  ["A $50 jacket is 20% off. What is the sale price?", "$40", ["$30", "$10", "$45"], "20% of 50 is 10. 50 − 10 = 40."],
  ["A $120 printer has a $25 mail-in rebate. What is the final cost after the rebate?", "$95", ["$145", "$100", "$25"], "A rebate gives money back: 120 − 25 = 95."],
  ["A coupon gives $5 off a $30 order. What do you pay?", "$25", ["$35", "$29.50", "$6"], "30 − 5 = 25."],
  ["Store A: a $80 bike at 25% off. Store B: the same bike for $65. Which is cheaper?", "Store A", ["Store B", "they cost the same"], "25% of 80 is 20, so Store A charges 80 − 20 = $60, which is less than $65.", true],
  ["Which deal saves more on a $60 game: 15% off or a $10 coupon?", "the $10 coupon", ["15% off", "they save the same"], "15% of 60 is $9, which is less than $10.", true],
  ["A $45 item is 10% off, then 8% sales tax is added. What is the total?", "$43.74", ["$40.50", "$44.10", "$48.60"], "Sale: 45 − 4.50 = 40.50. Tax: 40.50 × 1.08 = 43.74.", true],
  ["$500 earns 4% interest compounded yearly. How much is in the account after 2 years?", "$540.80", ["$540.00", "$520.00", "$504.00"], "Year 1: 520. Year 2: 520 × 1.04 = 540.80.", true],
];

export const moneyG7: Unit = bankUnit({
  id: "tx-g7-budget-and-interest",
  title: "Taxes, Net Worth & Interest",
  emoji: "📈",
  blurb: "Taxes, budgets, net worth and interest",
  parentNote: "Personal financial literacy: your child finds sales tax and income tax, names the parts of a budget, builds a net worth statement from assets and liabilities, uses a family budget to find the wage a family needs, compares simple and compound interest, and compares sales, rebates and coupons.",
  standards: ["7.13(A); 7.13(B); 7.13(C); 7.13(D); 7.13(E); 7.13(F)", "sales and income tax, budgets, net worth, family budgets, simple and compound interest, and sales, rebates and coupons"],
  items: MONEY_ITEMS,
});

export const MATH_G7: Unit[] = [discountsG7, moneyG7];
