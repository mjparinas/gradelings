import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// North Dakota Grade 9 social studies, the high school government course: how federal, state, tribal and local
// governments share power in North Dakota and how citizens influence them (C.6_12.2.4, C.6_12.2.5, C.6_12.4.1), and
// responsible personal finance, from careers and paychecks to credit and debt (E.6_12.7.1 to E.6_12.7.5). The rest of
// the course (foundations, the Constitution, rights, the courts, elections, the media and supply and demand) is
// practised with adopted units (see ../plan/social.ts).

const GOVERNING: Q[] = [
  ["Under federalism, power is shared between the national government and the…", "state governments", ["cities only", "political parties", "courts only"], "The Constitution divides power."],
  ["Which level of government prints money and makes treaties with other countries?", "the federal government", ["North Dakota's government", "a county", "a school board"], "These are delegated powers."],
  ["Which level of government issues driver's licenses and runs elections in North Dakota?", "the state government", ["the federal government", "a township", "the United Nations"], "These are reserved powers."],
  ["Which level of government sets property taxes for a city's streets and police?", "the city government", ["Congress", "the President", "the State Supreme Court"], "Local governments provide local services."],
  ["Powers that both the federal and state governments have, such as collecting taxes, are called…", "concurrent powers", ["reserved powers", "veto powers", "pardons"], "Concurrent means at the same time."],
  ["The Tenth Amendment says powers not given to the federal government are reserved to the…", "states or the people", ["President", "counties only", "Supreme Court"], "It protects state powers."],
  ["Tribal nations are sovereign governments whose relationship is mainly with the…", "federal government", ["county governments", "city councils", "school boards"], "It is a government-to-government relationship."],
  ["The government of the Mandan, Hidatsa and Arikara Nation is led by a…", "Tribal Business Council", ["state senate", "city commission", "county board"], "Its members are elected by the nation's citizens."],
  ["Many tribal nations in North Dakota run their own courts, police, schools and…", "health programs", ["armies", "foreign embassies", "national currencies"], "Self-determination lets nations run programs."],
  ["Agreements between North Dakota and a tribal nation on matters such as taxes or gaming are called…", "compacts", ["vetoes", "amendments", "pardons"], "Both governments sign them."],
  ["The state office that works with North Dakota's tribal nations is the…", "Indian Affairs Commission", ["Department of Defense", "Supreme Court", "Office of the Mayor"], "It helps state and tribal leaders work together."],
  ["Each of North Dakota's 53 counties is run by elected…", "county commissioners", ["tribal chairs", "senators", "governors"], "The county seat is the county's center of government."],
  ["In rural North Dakota, many roads are cared for by…", "townships", ["the federal government", "the Supreme Court", "school boards"], "Township officers are local neighbors."],
  ["A city's laws are called…", "ordinances", ["treaties", "constitutions", "verdicts"], "City councils or commissions pass them."],
  ["A bill in North Dakota becomes law when it passes both chambers of the Legislative Assembly and is…", "signed by the governor", ["printed in a newspaper", "approved by the President", "read aloud at a city council"], "The governor can also veto it."],
  ["The Legislative Assembly can override a governor's veto with a vote of…", "two-thirds of each chamber", ["one member", "half of one chamber", "the Supreme Court"], "A supermajority is needed."],
  ["North Dakota voters can put a law on the ballot by collecting signatures. This is the…", "initiative", ["veto", "impeachment", "census"], "Constitutional measures need more signatures."],
  ["Writing to a state legislator, testifying at a hearing and voting are ways citizens…", "influence government", ["break the law", "become judges", "end elections"], "Hearings are open to the public."],
  ["A group that tries to influence lawmakers on behalf of farmers, workers or businesses is an…", "interest group", ["court", "army", "executive branch"], "Interest groups often hire lobbyists."],
  ["North Dakota law requires high school students to pass a civics test based on the… test.", "United States citizenship", ["driver's", "college entrance", "hunting safety"], "Students must answer at least 70 questions out of 100 correctly."],
  ["North Dakota voters do not register, but at the polls they must show…", "an ID with a North Dakota address", ["a passport only", "a library card", "nothing at all"], "Tribal IDs are accepted."],
  ["If a state law conflicts with the United States Constitution, which wins?", "the United States Constitution", ["the state law", "whichever is newer", "the county's choice"], "The Supremacy Clause makes it the supreme law.", true],
  ["Why can't North Dakota pass a state law that sets the rules for trade with another country?", "the Constitution gives that power to the federal government", ["states have no laws", "tribal nations decide it", "cities decide it"], "Some powers belong only to Congress.", true],
  ["Why do state laws often not apply on a reservation in the same way they do elsewhere?", "tribal nations are sovereign and make many of their own laws", ["reservations are in another country", "no laws apply there", "the county runs the reservation"], "Jurisdiction depends on who governs the land.", true],
  ["A new oil pipeline would cross state land, tribal land and private farms. Why would several governments be involved?", "each has authority over different land and issues", ["only the President decides", "pipelines need no permits", "only the city council decides"], "Jurisdiction can overlap.", true],
  ["Why might a citizen testify before a legislative committee in Bismarck?", "to share how a bill would affect people before lawmakers vote", ["to vote in the Legislative Assembly", "to sign the bill into law", "to judge the bill in court"], "Committees hear from the public.", true],
];

const FINANCE: Q[] = [
  ["The total amount you earn before anything is taken out is your…", "gross pay", ["net pay", "credit limit", "interest"], "Gross is the whole amount."],
  ["The amount you take home after taxes and deductions is your…", "net pay", ["gross pay", "salary cap", "down payment"], "Net is what is left."],
  ["Social Security and Medicare taxes taken from a paycheck are called…", "FICA taxes", ["sales taxes", "property taxes", "tariffs"], "They fund benefits for retirees."],
  ["A plan for how you will spend and save your money each month is a…", "budget", ["loan", "credit score", "receipt"], "A budget tracks income and expenses."],
  ["Money set aside for surprise costs, like a car repair, is an…", "emergency fund", ["allowance", "interest rate", "credit card"], "Many experts suggest saving several months of expenses."],
  ["Rent, groceries and electricity are examples of…", "needs", ["wants", "investments", "taxes"], "Needs come first in a budget."],
  ["Concert tickets and new video games are examples of…", "wants", ["needs", "taxes", "debts"], "Wants can wait."],
  ["Interest earned on both your savings and the interest already added is called…", "compound interest", ["simple interest", "a fee", "a fine"], "Your money grows faster over time."],
  ["You save $100 at 5% simple interest per year. How much interest do you earn in one year?", "$5", ["$50", "$105", "$0.50"], "5% of 100 is 5."],
  ["Buying something now and paying for it later, often with interest, is using…", "credit", ["cash", "a budget", "a paycheck"], "Credit is borrowed money."],
  ["The yearly cost of borrowing money, shown as a percent, is the…", "APR (annual percentage rate)", ["GPA", "IRS", "ATM"], "A lower APR costs less."],
  ["A number that shows lenders how well you have paid back past debts is your…", "credit score", ["tax rate", "pay rate", "zip code"], "Paying on time raises it."],
  ["Which habit helps build a good credit score?", "paying bills on time", ["missing payments", "borrowing the most you can", "opening many cards at once"], "Payment history matters most."],
  ["Paying only the minimum on a credit card each month usually means…", "you pay much more in interest over time", ["you pay less overall", "the debt disappears", "interest stops"], "The balance shrinks slowly."],
  ["A loan to buy a home is called a…", "mortgage", ["scholarship", "grant", "paycheck"], "It is usually paid back over many years."],
  ["Money for college that does not have to be paid back is a…", "grant or scholarship", ["student loan", "credit card", "mortgage"], "Loans must be repaid with interest."],
  ["A short-term financial goal could be…", "saving for a bike in three months", ["saving for retirement", "paying off a 30-year mortgage", "saving for a grandchild's college"], "Short term means soon."],
  ["A long-term financial goal could be…", "saving for retirement", ["buying lunch tomorrow", "paying this week's phone bill", "buying a movie ticket"], "Long term means years away."],
  ["A job that needs more training or education often…", "pays more over a lifetime", ["always pays less", "pays nothing", "needs no skills"], "Education can raise earnings."],
  ["Your standard of living depends a lot on your…", "income", ["shoe size", "favorite color", "birthday"], "Income pays for what you need and want."],
  ["A borrower's responsibility is to…", "repay the loan on time as agreed", ["never pay it back", "change the interest rate", "keep the lender's money"], "Read the loan agreement before signing."],
  ["Someone earns $600 gross pay and $90 is taken out for taxes. What is the net pay?", "$510", ["$690", "$600", "$90"], "Subtract the taxes from gross pay.", true],
  ["You borrow $1,000 at 10% simple interest for 2 years. How much interest will you pay?", "$200", ["$100", "$1,200", "$20"], "10% of 1,000 is 100 each year.", true],
  ["Why is a high-interest loan a risky way to pay for something you want?", "the interest can make it cost much more than the price", ["interest makes things cheaper", "loans never charge interest", "you never have to pay it back"], "Borrowing has a cost.", true],
  ["One good strategy to get out of debt is to…", "pay more than the minimum, starting with the highest-interest debt", ["borrow more to pay it off", "ignore the bills", "open a new card each month"], "High-interest debt grows fastest.", true],
  ["Why does starting to save at 18 instead of 35 usually lead to much more money at retirement?", "compound interest has more years to grow", ["banks pay young people double", "money grows only for young people", "taxes stop at 18"], "Time is a saver's best friend.", true],
];

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "nd-g9-governing-north-dakota",
    title: "Federal, State, Tribal & Local",
    emoji: "🏛️",
    blurb: "Who governs what in North Dakota, and how to have a say",
    parentNote: "How power is shared in North Dakota among the federal government, the state, the tribal nations and counties, cities and townships: delegated, reserved and concurrent powers, tribal sovereignty and state-tribal compacts, how a bill becomes law in the Legislative Assembly, the initiative, the civics test, voting without registration, and how citizens and interest groups influence government.",
    standards: ["C.6_12.2.4; C.6_12.2.5; C.6_12.4.1", "the relationship among federal, state, tribal and local governments, tribal and local governments, and how citizens influence government"],
    items: GOVERNING,
  }),
  bankUnit({
    id: "nd-g9-personal-finance",
    title: "Personal Finance",
    emoji: "💵",
    blurb: "Paychecks, budgets, saving, credit and debt",
    parentNote: "Responsible personal finance: careers and income, gross and net pay and the taxes taken from a paycheck, budgets, needs and wants, emergency funds, simple and compound interest, short- and long-term goals, credit scores, credit cards and loans, the responsibilities of borrowers, and ways to avoid and pay off debt.",
    standards: ["E.6_12.7.1; E.6_12.7.2; E.6_12.7.3; E.6_12.7.4; E.6_12.7.5", "career choices and income, taxes, financial goals, credit and debt, and strategies to avoid and manage debt"],
    items: FINANCE,
  }),
];
