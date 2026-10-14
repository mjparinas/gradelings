import type { Unit } from "../../types";
import { G5_UNITS as washingtonG5 } from "../../washington/units/math-middle";
import { bankUnit, type Q } from "../own";
import { from } from "./kit";
import { keepOnly } from "./math-kit";

// Texas Grade 5 math written for Texas: fraction operations as the TEKS state them (5.3(I), 5.3(J), 5.3(L): a whole
// number times a fraction, and unit fractions and whole numbers divided by each other), and personal financial
// literacy (5.10).

/** A whole number times a fraction, a unit fraction divided by a whole number, or a whole number divided by a unit fraction. */
const TEKS_5 = [/^What is \d+\/\d+ × \d+\?$/, /^What is 1\/\d+ ÷ \d+\?$/, /^What is \d+ ÷ 1\/\d+\?$/, /^A recipe uses \d+\/\d+ cup/];

export const fractionOpsG5: Unit = keepOnly(
  from(washingtonG5, "wa-g5-fraction-multiply"),
  {
    id: "tx-g5-fraction-times-divide",
    title: "Fractions Times & Divided",
    emoji: "🍰",
    blurb: "Whole numbers and unit fractions",
    parentNote: "Your child multiplies a whole number by a fraction, divides a unit fraction (like 1/3) by a whole number, and divides a whole number by a unit fraction, often with recipes and sharing.",
    standards: ["5.3(I); 5.3(J); 5.3(L)", "multiplying a whole number and a fraction, and dividing whole numbers and unit fractions"],
  },
  (q) => TEKS_5.some((re) => re.test(q.prompt)),
);

const MONEY_ITEMS: Q[] = [
  ["A tax on money people earn from work is…", "income tax", ["sales tax", "property tax", "a tip"], "Income tax is taken from what people earn."],
  ["A tax added to the price of things you buy at a store is…", "sales tax", ["income tax", "property tax", "payroll tax"], "Sales tax is added when you buy something."],
  ["A tax people pay each year on homes and land they own is…", "property tax", ["sales tax", "payroll tax", "income tax"], "Property tax is based on the value of a home or land."],
  ["A tax taken from a paycheck to pay for Social Security and Medicare is…", "payroll tax", ["property tax", "sales tax", "a fee"], "Payroll taxes are withheld from paychecks."],
  ["Property taxes often help pay for…", "local schools and roads", ["video games", "a family's groceries", "a worker's vacation"], "Local governments use property tax for schools and roads."],
  ["Gross income is…", "all the money earned before taxes are taken out", ["the money left after taxes", "only money from gifts", "the cost of a home"], "Gross means the total, before anything is taken out."],
  ["Net income is…", "the money left after taxes and other deductions", ["the money earned before taxes", "the price of what you buy", "the sales tax"], "Net is what you actually take home."],
  ["Lena earns $800. $120 is taken out for taxes. What is her net income?", "$680", ["$920", "$800", "$120"], "Net = gross − deductions: 800 − 120 = 680."],
  ["Omar's gross pay is $1,000 and his net pay is $850. How much was taken out?", "$150", ["$1,850", "$850", "$250"], "1,000 − 850 = 150."],
  ["Which is larger, gross income or net income?", "gross income", ["net income", "they are always equal"], "Taxes come out of gross income, so net is smaller."],
  ["What is an advantage of paying with a debit card?", "the money comes straight from your bank account, so you don't owe more later", ["you can spend money you don't have", "it never needs a bank account", "it earns you interest"], "A debit card uses money you already have."],
  ["What is a disadvantage of a credit card?", "you can owe interest if you don't pay the full bill", ["it uses only cash in your wallet", "it can't buy things online", "it never needs to be paid back"], "Credit card balances can grow with interest."],
  ["What is an advantage of paying with cash?", "it is easy to see how much you have left", ["it can't be lost", "it keeps a record of every purchase", "it earns interest"], "Cash helps you spend only what you have."],
  ["What is a disadvantage of paying with cash?", "if it is lost or stolen, it is usually gone", ["it always costs a fee", "stores never take it", "you pay interest on it"], "Lost cash is hard to get back."],
  ["What is a disadvantage of paying by check?", "it can take days to clear", ["it can never be tracked", "it is the same as cash", "it earns interest"], "Checks take time to be processed."],
  ["Which payment method takes money right away from a bank account electronically?", "an electronic payment", ["a paper check mailed next week", "a credit card bill paid next month", "a coin jar"], "Electronic payments move money quickly."],
  ["Why keep financial records, like receipts and a money log?", "to track where your money goes", ["to make prices lower", "to avoid paying taxes", "to get gifts"], "Records help you see your spending and saving."],
  ["Which is a good way to keep financial records?", "write each purchase and deposit in a notebook or spreadsheet", ["throw away all receipts", "guess at the end of the month", "only remember big purchases"], "Writing everything down keeps records accurate."],
  ["A money log starts with $50. You spend $12 and deposit $20. What is the new balance?", "$58", ["$82", "$42", "$38"], "50 − 12 + 20 = 58."],
  ["A budget is balanced when…", "income is equal to or more than expenses", ["expenses are more than income", "you spend everything you earn and borrow more", "you have no income"], "Balanced means you don't spend more than you have."],
  ["Expenses are more than income. Which action helps balance the budget?", "cut back on wants", ["buy more wants", "ignore the bills", "borrow every month"], "Spending less on wants helps balance a budget."],
  ["Which action could also help balance a budget?", "earn more income", ["spend more on games", "stop tracking expenses", "use credit for everything"], "More income can cover expenses."],
  ["A family earns $3,000 and has expenses of $3,200. By how much is the budget short?", "$200", ["$6,200", "$100", "$300"], "3,200 − 3,000 = 200."],
  ["Income: $500. Expenses: rent $250, food $150, fun $60. How much is left?", "$40", ["$90", "$60", "$960"], "500 − 250 − 150 − 60 = 40."],
  ["Income: $400. Expenses: $180, $90, $70 and $60. Is the budget balanced?", "yes, expenses equal income", ["no, expenses are $40 more", "no, income is $100 more"], "180 + 90 + 70 + 60 = 400.", true],
  ["A shirt costs $20 and sales tax is $1.60. What is the total?", "$21.60", ["$18.40", "$20.16", "$36.00"], "Add the tax to the price: 20 + 1.60 = 21.60.", true],
  ["Jo's gross pay is $600. Taxes take $90 and insurance takes $30. What is her net pay?", "$480", ["$510", "$570", "$720"], "600 − 90 − 30 = 480.", true],
  ["Income: $250. Expenses: $120 food, $70 gas, $85 phone. Which change balances the budget?", "cut $25 from expenses", ["cut $5 from expenses", "add $25 in expenses", "nothing, it is balanced"], "120 + 70 + 85 = 275, which is $25 more than income.", true],
];

export const moneyG5: Unit = bankUnit({
  id: "tx-g5-taxes-and-budgets",
  title: "Taxes, Pay & Budgets",
  emoji: "📒",
  blurb: "Taxes, net pay, payments and budgets",
  parentNote: "Personal financial literacy: your child names income, payroll, sales and property taxes, tells gross from net income, weighs ways to pay (cash, check, debit, credit, electronic), keeps simple records, and balances a simple budget.",
  standards: ["5.10(A); 5.10(B); 5.10(C); 5.10(D); 5.10(E); 5.10(F)", "kinds of taxes, gross and net income, ways to pay, financial records, and balancing a budget"],
  items: MONEY_ITEMS,
});

export const MATH_G5: Unit[] = [fractionOpsG5, moneyG5];
