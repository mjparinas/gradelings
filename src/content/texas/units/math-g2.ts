import { units as albertaG2Math } from "../../alberta/g2-math";
import { questionText } from "../../locale";
import type { Question, Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { from } from "./kit";
import { keepOnly } from "./math-kit";

// Texas Grade 2 math written for Texas: fractions with halves, fourths and eighths only (2.3), and personal financial
// literacy (2.11).

/** Texas Grade 2 names halves, fourths and eighths; thirds, fifths, sixths and the rest wait for Grade 3. */
const OTHER_PARTS = /\b\d+\/(?!(?:2|4|8)\b)\d+\b|third|fifth|sixth|seventh|ninth|tenth|twelfth/i;
const halvesFourthsEighths = (q: Question): boolean => {
  const v = q.visual as { denominator?: number } | undefined;
  if (v?.denominator && ![2, 4, 8].includes(v.denominator)) return false;
  return !OTHER_PARTS.test(questionText(q));
};

export const fractionsG2: Unit = keepOnly(
  from(albertaG2Math, "unit-fractions-ab"),
  {
    id: "tx-g2-fair-parts",
    title: "Halves, Fourths & Eighths",
    emoji: "🍕",
    blurb: "Equal parts of a whole",
    parentNote: "Your child splits shapes into equal parts and names halves, fourths and eighths, and learns that the more equal parts a whole is cut into, the smaller each part is.",
    standards: ["2.3(A); 2.3(B); 2.3(D)", "naming halves, fourths and eighths, and seeing that more equal parts make smaller parts"],
  },
  halvesFourthsEighths,
);

const MONEY_ITEMS: Q[] = [
  ["Mia saves $2 every week. How much has she saved after 4 weeks?", "$8", ["$6", "$4", "$10"], "Add $2 four times: 2 + 2 + 2 + 2 = 8."],
  ["Leo saves $5 a month. How much does he have after 3 months?", "$15", ["$8", "$10", "$20"], "5 + 5 + 5 = 15."],
  ["Ana has $10 saved. She saves $3 more. How much does she have now?", "$13", ["$7", "$12", "$30"], "Saving adds to what you have: 10 + 3 = 13."],
  ["Jay saves 25¢ each day for 4 days. How much has he saved?", "$1.00", ["75¢", "50¢", "$1.25"], "4 quarters make one dollar."],
  ["Instead of buying a snack, Kai puts his money away. What is Kai doing?", "saving", ["spending", "borrowing", "lending"], "Keeping money instead of using it is saving."],
  ["Why is saving a choice instead of spending?", "money you save is money you do not spend now", ["you can save and spend the same dollar", "saving makes money disappear", "spending makes money grow"], "Each dollar can be spent now or saved for later."],
  ["Putting money into a bank account is called a…", "deposit", ["withdrawal", "loan", "price"], "A deposit puts money in."],
  ["Taking money out of a bank account is called a…", "withdrawal", ["deposit", "gift", "profit"], "A withdrawal takes money out."],
  ["Sara puts $20 into her account. Is that a deposit or a withdrawal?", "a deposit", ["a withdrawal"], "Money going in is a deposit."],
  ["Dad takes $40 out of the bank. Is that a deposit or a withdrawal?", "a withdrawal", ["a deposit"], "Money coming out is a withdrawal."],
  ["Ben borrows a book from the library and returns it on time. Is that responsible?", "yes", ["no"], "Returning what you borrow, on time, is responsible borrowing."],
  ["Which is responsible borrowing?", "paying the money back when you promised", ["never paying it back", "borrowing more than you can repay", "losing what you borrowed"], "Responsible borrowers pay back on time."],
  ["Which is irresponsible borrowing?", "borrowing money you can't pay back", ["paying back on time", "borrowing only what you need", "writing down what you owe"], "Borrowing money you can't repay is not responsible."],
  ["Mila borrows $2 from her brother. What should she do?", "pay him back $2", ["keep the money", "pay him back $1", "forget about it"], "When you borrow, you pay back all of it."],
  ["When you let someone use your money and they pay it back, you are…", "lending", ["borrowing", "spending", "earning"], "Lending means letting someone use what is yours for a while."],
  ["Your friend often forgets to pay back. Should you lend him money?", "it is risky, he may not pay back", ["yes, it is always safe", "yes, and lend him more"], "Think about the cost: you might not get it back."],
  ["What is a benefit of lending to a friend who pays back on time?", "you help your friend and get your money back", ["you lose your money", "you get less money back", "your friend gets mad"], "A good lending choice helps both people."],
  ["A person who makes or grows things to sell is a…", "producer", ["consumer"], "Producers make goods or give services."],
  ["A person who buys and uses goods and services is a…", "consumer", ["producer"], "Consumers buy and use things."],
  ["A baker makes bread to sell. The baker is a…", "producer", ["consumer"], "The baker makes the bread."],
  ["You buy bread from the baker. You are a…", "consumer", ["producer"], "You buy and use the bread."],
  ["Can one person be a producer and a consumer?", "yes", ["no"], "A farmer grows food to sell and also buys shoes.", true],
  ["To make a bracelet you need beads for $3 and string for $1. What does it cost to make?", "$4", ["$3", "$2", "$5"], "Add the cost of each part: 3 + 1 = 4.", true],
  ["A birdhouse needs wood for $6, nails for $2 and paint for $4. What is the cost to make it?", "$12", ["$10", "$8", "$14"], "6 + 2 + 4 = 12.", true],
  ["A cup of lemonade uses lemons for 20¢, sugar for 10¢ and a cup for 5¢. What is the cost?", "35¢", ["30¢", "25¢", "40¢"], "20 + 10 + 5 = 35.", true],
  ["Tess has $30 in the bank. She makes a $10 withdrawal. How much is left?", "$20", ["$40", "$10", "$30"], "A withdrawal takes money out: 30 − 10 = 20.", true],
  ["Omar has $15 in the bank. He makes a $5 deposit. How much is in the bank now?", "$20", ["$10", "$15", "$25"], "A deposit adds money: 15 + 5 = 20.", true],
];

export const moneyG2: Unit = bankUnit({
  id: "tx-g2-save-and-borrow",
  title: "Saving & Borrowing",
  emoji: "🏦",
  blurb: "Saving, deposits, borrowing and producers",
  parentNote: "Personal financial literacy: your child sees how savings grow over time, tells a deposit from a withdrawal, talks about responsible borrowing and lending, and tells producers from consumers, including the cost to make a simple item.",
  standards: ["2.11(A); 2.11(B); 2.11(C); 2.11(D); 2.11(E); 2.11(F)", "saving over time, deposits and withdrawals, borrowing and lending, and producers and consumers"],
  items: MONEY_ITEMS,
});

export const MATH_G2: Unit[] = [fractionsG2, moneyG2];
