import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { makerUnit, money, moneyChoice, pick, randInt, type Maker } from "./math-kit";

// Texas Grade 3 math written for Texas: the value of a collection of coins and bills (3.4(C)) and personal financial
// literacy (3.9).

const BILL: Record<number, string> = { 100: "$1 bill", 500: "$5 bill", 1000: "$10 bill" };
const NAME: Record<number, string> = { ...BILL, 1: "penny", 5: "nickel", 10: "dime", 25: "quarter" };
const PLURAL: Record<number, string> = { 100: "$1 bills", 500: "$5 bills", 1000: "$10 bills", 1: "pennies", 5: "nickels", 10: "dimes", 25: "quarters" };
const some = (value: number, n: number) => `${n} ${n === 1 ? NAME[value] : PLURAL[value]}`;

/** A handful of bills and coins, biggest first. */
function collection(d: 1 | 2 | 3): number[] {
  const bills = d === 1 ? [100] : d === 2 ? [500, 100] : [1000, 500, 100];
  const out: number[] = [];
  const nBills = randInt(1, d === 1 ? 2 : 3);
  for (let i = 0; i < nBills; i++) out.push(pick(bills));
  const nCoins = randInt(2, d === 1 ? 3 : 5);
  for (let i = 0; i < nCoins; i++) out.push(pick(d === 1 ? [25, 10, 5] : [25, 10, 5, 1]));
  return out.sort((a, b) => b - a);
}

const countCollection: Maker = (d) => {
  const items = collection(d);
  const total = items.reduce((s, c) => s + c, 0);
  return moneyChoice("How much money is this?", total, "Count the bills first, then count on with the coins, biggest coin first.", [total + 5, total - 5, total + 100, total - 10, total + 25], items);
};

const storyCollection: Maker = (d) => {
  const who = pick(["Rosa", "Dev", "Hana", "Luis", "Grace", "Tariq"]);
  const bill = pick(d === 1 ? [100] : [100, 500]);
  const nBills = randInt(1, 3);
  const coin = pick([25, 10, 5]);
  const nCoins = randInt(2, 4);
  const total = bill * nBills + coin * nCoins;
  return moneyChoice(`${who} has ${some(bill, nBills)} and ${some(coin, nCoins)}. How much money is that?`, total, `${some(bill, nBills)} is ${money(bill * nBills)}. Count on ${coin}¢ for each ${NAME[coin]}.`, [total + coin, total - coin, total + bill, bill * nBills + nCoins]);
};

const quartersToDollars: Maker = () => {
  const n = pick([4, 8, 12]);
  const extra = randInt(1, 3);
  const total = (n + extra) * 25;
  return moneyChoice(`How much are ${n + extra} quarters worth?`, total, "4 quarters make $1.00. Count dollars first, then the quarters left over.", [total - 25, total + 25, (n + extra) * 10, total + 100]);
};

const payAndChange: Maker = (d) => {
  const price = d === 1 ? randInt(2, 8) * 100 : randInt(11, 95) * 5;
  const paid = price < 500 ? 500 : 1000;
  const change = paid - price;
  return moneyChoice(`A book costs ${money(price)}. You pay with a ${NAME[paid]}. How much change do you get?`, change, `Count up from ${money(price)} to ${money(paid)}.`, [change + 5, change - 5, change + 100, change - 100, price]);
};

export const coinsBillsG3: Unit = makerUnit({
  id: "tx-g3-coins-and-bills",
  title: "Coins & Bills",
  emoji: "💵",
  blurb: "Count coins and bills",
  parentNote: "Your child finds the value of a mix of US coins and bills, writes it with the dollar sign and decimal point, and finds change.",
  standards: ["3.4(C)", "finding the value of a collection of coins and bills"],
  makers: [countCollection, countCollection, storyCollection, quartersToDollars, payAndChange],
});

const MONEY_ITEMS: Q[] = [
  ["What is human capital?", "the skills and knowledge a worker brings to a job", ["the money in a bank", "the buildings a company owns", "the price of a toy"], "Human capital is what people know and can do."],
  ["Why do workers with more training often earn more?", "their skills are worth more to employers", ["they work fewer hours", "training is free", "they get gifts"], "More skills and knowledge can lead to higher income."],
  ["Kim learns to fix bikes. How could this help her earn income?", "people will pay her to fix their bikes", ["she will never need money", "bikes cost less", "she will get gifts"], "A new skill can turn into paid work."],
  ["Which choice builds human capital?", "taking a class to learn a new skill", ["buying a new toy", "watching more TV", "skipping practice"], "Learning builds the skills workers use."],
  ["A worker earns $10 an hour and works 3 hours. How much does she earn?", "$30", ["$13", "$20", "$40"], "Income = pay per hour × hours: 10 × 3 = 30."],
  ["Strawberries are scarce this winter. What usually happens to their price?", "it goes up", ["it goes down", "it stays at zero"], "When something is scarce, it usually costs more."],
  ["Many farmers grow lots of corn this year. What usually happens to the price of corn?", "it goes down", ["it goes up"], "When there is plenty of something, it often costs less."],
  ["Why does bottled water cost more after a big storm?", "less is available and many people want it", ["water gets heavier", "stores close forever", "it costs nothing to make"], "Scarcity pushes prices up."],
  ["Which is a planned spending decision?", "making a list before going shopping", ["buying candy at the checkout without thinking", "buying a toy because a friend has one", "spending all your money at once"], "Planning means deciding before you spend."],
  ["Which is an unplanned spending decision?", "grabbing a toy you see at the register", ["saving for a bike for weeks", "following a shopping list", "comparing prices first"], "Unplanned spending happens without thinking ahead."],
  ["What is a cost of unplanned spending?", "you may not have money left for things you need", ["you always save more", "prices go down", "you get paid more"], "Spending without a plan can leave you short."],
  ["What is a benefit of planned spending?", "your money goes to what matters most to you", ["things become free", "you never need to save", "you can buy everything"], "A plan helps you choose wisely."],
  ["What is credit?", "borrowing money now and paying it back later", ["money you are given as a gift", "money you earn at work", "money you find"], "Credit means using money you will pay back."],
  ["When do people use credit?", "when what they want or need costs more than they can pay now", ["when they have extra money", "only on holidays", "never"], "Credit fills the gap until they can pay."],
  ["Who must pay back money borrowed on credit?", "the borrower", ["the store", "the lender", "nobody"], "The person who borrows is responsible for paying it back."],
  ["Jada uses credit to buy a $50 bike. What must she do?", "pay the $50 back to the lender", ["nothing, it was free", "pay only $5", "give the bike to the lender"], "Borrowed money must be paid back."],
  ["Which is a good reason to save?", "to pay for college someday", ["to lose your money", "to make prices go up", "to stop working"], "Saving helps pay for big goals like college."],
  ["What is a savings plan?", "a plan to put away money regularly for a goal", ["a list of toys", "a plan to spend everything", "a store coupon"], "A savings plan sets aside money a bit at a time."],
  ["Paul saves $4 each week for 5 weeks. How much has he saved?", "$20", ["$9", "$16", "$25"], "4 × 5 = 20."],
  ["Lin wants a $30 game. She saves $5 a week. How many weeks will it take?", "6 weeks", ["5 weeks", "25 weeks", "35 weeks"], "30 ÷ 5 = 6."],
  ["Why is it good to save for an emergency?", "you will have money if something unexpected happens", ["emergencies never happen", "so you can spend it today", "banks require it"], "Savings protect you when surprises happen."],
  ["Giving money to help a food bank is…", "charitable giving", ["credit", "income", "spending on a want"], "Giving to help others is charitable giving."],
  ["Ty gets paid $8. He saves $3, gives $1 and spends the rest. How much does he spend?", "$4", ["$5", "$3", "$8"], "8 − 3 − 1 = 4.", true],
  ["Which is an income decision?", "taking a job after school", ["buying a sandwich", "putting money in a bank", "giving to a shelter"], "Income decisions are about how you earn money.", true],
  ["Which is a credit decision?", "borrowing to buy a bike and paying it back monthly", ["saving in a piggy bank", "earning money walking dogs", "donating to a school"], "Credit decisions are about borrowing.", true],
  ["A family earns $500 and spends $420. How much can they save?", "$80", ["$120", "$920", "$20"], "500 − 420 = 80.", true],
  ["A shirt costs $12. You have a $10 bill and 6 quarters. Can you buy it?", "no, you have $11.50", ["yes, you have $12.50", "yes, you have exactly $12.00"], "6 quarters is $1.50. $10 + $1.50 = $11.50.", true],
];

export const moneyG3: Unit = bankUnit({
  id: "tx-g3-money-choices",
  title: "Money Choices",
  emoji: "🧾",
  blurb: "Skills, prices, credit and saving",
  parentNote: "Personal financial literacy: your child connects skills and work to income, sees how scarcity changes prices, weighs planned and unplanned spending, learns what credit is and who pays it back, and makes a simple savings plan.",
  standards: ["3.9(A); 3.9(B); 3.9(C); 3.9(D); 3.9(E); 3.9(F)", "work and income, scarcity and cost, spending decisions, credit, and saving"],
  items: MONEY_ITEMS,
});

export const MATH_G3: Unit[] = [coinsBillsG3, moneyG3];
