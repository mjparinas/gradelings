import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Texas Grade 4 math written for Texas: personal financial literacy (4.10).

const MONEY_ITEMS: Q[] = [
  ["A fixed expense is one that…", "stays the same each month", ["changes every month", "you never have to pay", "is always a want"], "Fixed expenses cost the same amount each time."],
  ["A variable expense is one that…", "can change from month to month", ["is the same every month", "is always paid once a year", "is never a need"], "Variable expenses go up and down."],
  ["Monthly rent of $900 is a…", "fixed expense", ["variable expense"], "Rent is usually the same each month."],
  ["The grocery bill is $120 one week and $95 the next. It is a…", "variable expense", ["fixed expense"], "The amount changes, so it is variable."],
  ["Which is usually a fixed expense?", "a car payment", ["the electric bill", "eating out", "gas for the car"], "A car payment is the same each month."],
  ["Which is usually a variable expense?", "the water bill", ["rent", "a phone plan with a set price", "a loan payment"], "The water bill changes with how much water you use."],
  ["Profit is…", "money earned minus the costs", ["the costs plus the money earned", "the price of one item", "money given as a gift"], "Profit = income − costs."],
  ["A lemonade stand earns $25. The lemons, sugar and cups cost $9. What is the profit?", "$16", ["$34", "$25", "$14"], "25 − 9 = 16."],
  ["Mira sells 6 bracelets for $4 each. The supplies cost $10. What is her profit?", "$14", ["$24", "$34", "$10"], "She earns 6 × 4 = 24. Profit = 24 − 10 = 14."],
  ["A class bake sale earns $85 and spends $30 on supplies. What is the profit?", "$55", ["$115", "$65", "$45"], "85 − 30 = 55."],
  ["Theo mows 5 lawns for $12 each. Gas costs $8. What is his profit?", "$52", ["$60", "$68", "$47"], "5 × 12 = 60. 60 − 8 = 52."],
  ["A booth earns $40 but spends $45 on costs. What happened?", "it lost $5", ["it made $5 profit", "it made $85 profit", "it broke even"], "Costs were more than earnings, so there was a loss."],
  ["What is an advantage of a savings account at a bank?", "the money is kept safe and can earn interest", ["you can never take money out", "it always loses money", "it costs nothing to open everywhere"], "Banks keep money safe and often pay interest."],
  ["What is a disadvantage of keeping savings in a piggy bank?", "it does not earn interest and could be lost", ["it earns too much interest", "you can't see it", "it is kept by a bank"], "A piggy bank is easy to reach but earns nothing."],
  ["What is an advantage of a piggy bank?", "you can reach your money easily", ["it earns interest", "the money is insured", "it pays you each month"], "A piggy bank is easy to use."],
  ["Why might someone choose a savings account over a piggy bank?", "to earn interest on their money", ["to spend money faster", "to lose money", "to pay higher prices"], "Interest helps savings grow."],
  ["Interest on savings is…", "money the bank pays you for keeping your money there", ["money you pay to buy a toy", "a kind of tax", "a fixed expense"], "Banks pay interest on savings."],
  ["Eva gets a $10 allowance. She spends $5, saves $3 and shares $2. What fraction does she save?", "3/10", ["5/10", "2/10", "3/5"], "She saves $3 of $10."],
  ["Sam gets $12 a week. He shares $2 and spends $6. How much is left to save?", "$4", ["$8", "$6", "$2"], "12 − 2 − 6 = 4."],
  ["Which is a smart plan for a weekly allowance?", "spend some, save some and share some", ["spend it all on the first day", "lose track of it", "give it all to a friend to hold"], "Dividing an allowance helps you meet goals."],
  ["Ari saves $3 of his allowance each week for college. How much does he save in 10 weeks?", "$30", ["$13", "$300", "$3"], "3 × 10 = 30."],
  ["Sharing part of an allowance might mean…", "giving to a charity", ["buying a snack", "putting it under a pillow", "paying a fixed expense"], "Sharing is giving to help others."],
  ["What is one purpose of a bank?", "to keep money safe", ["to make all prices higher", "to sell groceries", "to print homework"], "Banks are financial institutions that protect money."],
  ["What else do banks do?", "lend money to people and businesses", ["grow food", "build roads", "teach classes"], "Banks lend money and charge interest."],
  ["When a bank lends money, the borrower must…", "pay it back, usually with interest", ["keep it forever", "pay back less than borrowed", "give the bank a toy"], "Loans are paid back with interest."],
  ["A family borrows money from a bank to buy a house. The bank is…", "lending", ["borrowing", "saving", "donating"], "The bank lends; the family borrows."],
  ["A shop owner earns $200 and has fixed costs of $80 and variable costs of $45. What is the profit?", "$75", ["$120", "$155", "$125"], "200 − 80 − 45 = 75.", true],
  ["A fixed expense is $50 a month. How much is it for a year?", "$600", ["$500", "$62", "$550"], "There are 12 months: 50 × 12 = 600.", true],
  ["Kai puts $100 in a savings account that pays $2 interest a year. How much does he have after 1 year?", "$102", ["$98", "$100", "$120"], "100 + 2 = 102.", true],
  ["Rae sells 8 cards for $3 each. Her costs are $7. Is her profit more or less than $20?", "less, it is $17", ["more, it is $24", "less, it is $13", "more, it is $31"], "8 × 3 = 24, and 24 − 7 = 17.", true],
];

export const moneyG4: Unit = bankUnit({
  id: "tx-g4-money-smarts",
  title: "Expenses, Profit & Banks",
  emoji: "🏦",
  blurb: "Expenses, profit, saving and banks",
  parentNote: "Personal financial literacy: your child tells fixed from variable expenses, works out profit, compares ways to save, plans how to split an allowance between spending, saving and sharing, and learns what banks do.",
  standards: ["4.10(A); 4.10(B); 4.10(C); 4.10(D); 4.10(E)", "fixed and variable expenses, profit, savings options, an allowance plan, and what banks do"],
  items: MONEY_ITEMS,
});

export const MATH_G4: Unit[] = [moneyG4];
