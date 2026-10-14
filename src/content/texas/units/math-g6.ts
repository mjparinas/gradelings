import { units as albertaG6Math } from "../../alberta/g6-math";
import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { from } from "./kit";
import { keepOnly } from "./math-kit";

// Texas Grade 6 math written for Texas: adding and subtracting integers (6.3(C), 6.3(D)), from Alberta's unit with its
// Alberta city temperatures left out, and personal financial literacy (6.14).

export const integersG6: Unit = keepOnly(
  from(albertaG6Math, "integer-moves-ab"),
  {
    id: "tx-g6-integer-moves",
    title: "Adding & Subtracting Integers",
    emoji: "🌡️",
    blurb: "Positive and negative numbers",
    parentNote: "Your child adds and subtracts positive and negative integers, uses zero pairs and opposites, and compares negative numbers.",
    standards: ["6.3(C); 6.3(D); 6.2(B)", "adding and subtracting integers with models, and opposites"],
  },
  // The temperature questions are set in Alberta cities.
  (q) => !/ a\.m\. in /.test(q.prompt),
);

const MONEY_ITEMS: Q[] = [
  ["A checking account is mainly used for…", "paying for everyday things and bills", ["earning lots of interest", "borrowing money", "buying a house"], "Checking accounts are for everyday spending."],
  ["Bank A charges a $5 monthly fee for checking. Bank B charges $0 if you keep $100 in it. You keep $150. Which costs less?", "Bank B", ["Bank A", "they cost the same"], "With $150, Bank B has no fee."],
  ["Bank A charges $3 a month. Bank B charges $1 a month plus $2 for each ATM use outside its network. You use 2 outside ATMs a month. Which costs less?", "Bank A", ["Bank B", "they cost the same"], "Bank A: $3. Bank B: $1 + 2 × $2 = $5."],
  ["A debit card…", "takes money straight from your checking account", ["lets you borrow money and pay it back later", "can never be used in stores", "always charges interest"], "Debit uses money you already have."],
  ["A credit card…", "lets you borrow money that you must pay back", ["takes money straight from savings", "is the same as cash", "never charges interest"], "Credit is borrowed money."],
  ["Which card can lead to interest charges if you don't pay the bill in full?", "a credit card", ["a debit card", "a library card"], "Unpaid credit card balances can earn interest."],
  ["Which card can you only use up to the money in your account?", "a debit card", ["a credit card"], "Debit is limited by your account balance."],
  ["A check register shows a balance of $250. You deposit $75. What is the new balance?", "$325", ["$175", "$250", "$300"], "A deposit adds: 250 + 75 = 325."],
  ["A check register shows a balance of $480. You write a check for $95. What is the new balance?", "$385", ["$575", "$395", "$485"], "A check is a withdrawal: 480 − 95 = 385."],
  ["Balance $120. Withdrawal $40. Deposit $60. What is the new balance?", "$140", ["$100", "$220", "$20"], "120 − 40 + 60 = 140."],
  ["You transfer $50 from checking to savings. What happens to the checking balance?", "it goes down by $50", ["it goes up by $50", "it stays the same"], "A transfer out of checking lowers its balance."],
  ["Balance $300. Deposit $45.50. Debit card purchase $12.25. What is the new balance?", "$333.25", ["$357.75", "$242.25", "$345.50"], "300 + 45.50 − 12.25 = 333.25."],
  ["Why is a positive credit history important?", "lenders are more likely to lend to you at lower interest", ["it lets you skip paying bills", "it raises your income", "it makes prices lower"], "Good credit history shows you repay what you borrow."],
  ["Which helps build a positive credit history?", "paying bills on time", ["missing payments", "borrowing more than you can repay", "ignoring statements"], "On-time payments build good credit."],
  ["A credit report shows…", "how a person has borrowed and repaid money", ["a person's grades in school", "the stores a person likes", "a person's height"], "Credit reports track borrowing and repaying."],
  ["Which is usually in a credit report?", "loans, credit cards and late payments", ["school grades", "medical history", "sports awards"], "Credit reports list borrowing history."],
  ["About how long do most late payments stay on a credit report?", "about 7 years", ["about 1 month", "about 1 year", "forever"], "Most negative information stays for about 7 years."],
  ["How does a credit report help a lender?", "it shows whether the borrower is likely to repay", ["it tells the lender the borrower's age only", "it sets the price of groceries", "it pays the loan"], "Lenders use reports to judge risk."],
  ["How can a credit report help a borrower?", "a good report can get them better loan terms", ["it lowers their taxes", "it gives them free money", "it erases their debts"], "Good credit can mean lower interest."],
  ["Which way to pay for college does NOT have to be paid back?", "a scholarship", ["a student loan", "a credit card", "a car loan"], "Scholarships and grants are not repaid."],
  ["A grant for college is usually based on…", "financial need", ["how fast you run", "your shoe size", "how tall you are"], "Grants often go to students who need help paying."],
  ["What is work-study?", "a part-time job that helps a student pay for college", ["a loan from a bank", "a type of scholarship for athletes only", "a savings account"], "Work-study lets students earn money while in school."],
  ["Which way to pay for college must be paid back with interest?", "a student loan", ["a scholarship", "a grant", "savings"], "Loans are borrowed money."],
  ["Saving money for college each month before you go is an example of…", "paying with savings", ["a grant", "work-study", "a scholarship"], "Savings you set aside can pay for college."],
  ["Job A needs a high school diploma and pays $30,000 a year. Job B needs a 4-year degree and pays $55,000. What is the difference in pay?", "$25,000", ["$85,000", "$30,000", "$15,000"], "55,000 − 30,000 = 25,000."],
  ["Over 10 years, how much more does a $50,000 salary earn than a $38,000 salary?", "$120,000", ["$12,000", "$880,000", "$1,200"], "The difference is $12,000 a year. 12,000 × 10 = 120,000.", true],
  ["An electrician (trade school) earns $52,000. A cashier earns $26,000. How many times as much does the electrician earn?", "2 times", ["3 times", "1.5 times", "4 times"], "52,000 ÷ 26,000 = 2.", true],
  ["Bank C charges $0.50 per check. You write 12 checks a month. What is the monthly cost?", "$6.00", ["$5.00", "$12.50", "$0.60"], "12 × 0.50 = 6.", true],
  ["Balance $95. You make a $110 purchase with your debit card. What could happen?", "an overdraft fee, because the account goes below $0", ["nothing, debit cards have no limit", "the bank adds $110", "your balance becomes $205"], "Spending more than the balance can cause an overdraft.", true],
];

export const moneyG6: Unit = bankUnit({
  id: "tx-g6-banking-and-credit",
  title: "Banking, Credit & College",
  emoji: "💳",
  blurb: "Checking, cards, credit and college",
  parentNote: "Personal financial literacy: your child compares checking accounts, tells debit from credit cards, balances a check register, learns why credit history and credit reports matter, compares ways to pay for college, and compares salaries for jobs that need different training.",
  standards: ["6.14(A); 6.14(B); 6.14(C); 6.14(D); 6.14(E); 6.14(F); 6.14(G); 6.14(H)", "checking accounts, debit and credit cards, check registers, credit history and reports, paying for college, and salaries"],
  items: MONEY_ITEMS,
});

export const MATH_G6: Unit[] = [integersG6, moneyG6];
