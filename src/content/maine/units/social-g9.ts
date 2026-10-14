import { pick, randInt, shuffle, textChoice } from "../../random";
import type { Question, Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { fromItems, mixUnit, type Difficulty } from "./kit";

// Maine Grade 9 social studies: how Maine governs itself next to the federal system (Civics & Government 1 and 2),
// the United States government (Civics & Government 1 and 2), personal finance (Personal Finance, with generated
// interest, discount and pay questions) and economics (Economics, Global Connections).

const GOVERNING: Q[] = [
  ["Since 2018, Maine uses ranked-choice voting in primaries and federal elections. Voters…", "rank candidates in order of preference", ["vote for only one candidate", "vote twice"], "If no one has a majority, the last-place candidate is dropped and those votes move to the next choice."],
  ["Ranked-choice voting in Maine was first approved by…", "voters through a citizen initiative", ["the US Supreme Court", "the President"], "Voters approved it in 2016."],
  ["In ranked-choice voting, counting continues round by round until a candidate has…", "a majority of the votes", ["exactly 100 votes", "the most money"], "A majority is more than half."],
  ["A citizen initiative lets Maine voters…", "put a proposed law on the ballot by collecting signatures", ["remove a judge by petition", "choose the Senate President"], "The Legislature can pass it or send it to the voters."],
  ["A people's veto lets Maine voters…", "reject a law the Legislature just passed", ["veto the President", "dissolve the Legislature"], "Voters collect signatures within 90 days after the session ends."],
  ["Maine is one of two states that can split its electoral votes. The other is…", "Nebraska", ["Texas", "Ohio"], "Each congressional district awards one electoral vote."],
  ["How many electoral votes does Maine have?", "4", ["2", "10"], "Two for its senators and two for its House districts."],
  ["The Maine Clean Election Act lets qualifying candidates…", "run with public funding instead of private donations", ["skip the election", "serve for life"], "Candidates first collect small qualifying contributions."],
  ["Maine's Secretary of State, Attorney General and Treasurer are chosen by…", "the Legislature", ["the voters directly", "the Governor alone"], "Maine is the only state where the Legislature elects all three."],
  ["How many consecutive terms can a member of the Maine House serve?", "four two-year terms", ["one six-year term", "no limit"], "Maine has legislative term limits."],
  ["Maine's Legislature is often called a citizen legislature because…", "members serve part-time and hold other jobs", ["any citizen can vote on every bill", "it has no elections"], "Many lawmakers are teachers, farmers or business owners."],
  ["Maine voters may register to vote…", "on Election Day at their town office or polling place", ["only in person in Augusta", "only five years ahead"], "Maine has same-day registration."],
  ["Federalism means…", "power is divided between the national and state governments", ["all power belongs to the states", "all power belongs to the President"], "Maine and the United States each have a constitution."],
  ["Which power belongs to the federal government, not to Maine?", "coining money", ["setting up town schools", "issuing driver's licenses"], "The US Constitution gives Congress that power."],
  ["Which power belongs to Maine, not the federal government?", "running elections and licensing drivers", ["declaring war", "making treaties"], "Powers not given to the US are reserved to the states."],
  ["The Tenth Amendment says powers not delegated to the United States are reserved to…", "the states or the people", ["the President", "the Supreme Court"], "It is part of the Bill of Rights."],
  ["How many members are in the US House of Representatives?", "435", ["100", "50"], "Seats are divided by population."],
  ["Judicial review, the power of courts to strike down unconstitutional laws, was established in…", "Marbury v. Madison", ["Brown v. Board of Education", "Miranda v. Arizona"], "Chief Justice John Marshall wrote the opinion in 1803."],
  ["The first ten amendments to the US Constitution are called the…", "Bill of Rights", ["Articles of Confederation", "Federalist Papers"], "They were ratified in 1791."],
  ["Consent of the governed means…", "government gets its power from the people", ["leaders inherit power", "the army chooses leaders"], "The idea is in the Declaration of Independence."],
  ["Which is a civic duty, required by law?", "serving on a jury when called", ["joining a political party", "volunteering at a food bank"], "Responsibilities like volunteering are encouraged, not required."],
  ["Which is a civic responsibility, encouraged but not required?", "voting in elections", ["paying taxes", "obeying laws"], "Duties are required by law; responsibilities are chosen."],
  ["Civil disobedience means…", "peacefully breaking a law seen as unjust and accepting the penalty", ["rioting", "ignoring all laws in secret"], "Henry David Thoreau wrote about it.", true],
  ["Why did a Maine court rule ranked-choice voting could not be used in general elections for Governor?", "the Maine Constitution says those races are won by a plurality", ["the federal government banned it", "too few people voted"], "Federal races and primaries are not bound by that clause.", true],
  ["A checks and balances example in Maine: if the Governor vetoes a bill, the Legislature can…", "override it with a two-thirds vote of both houses", ["remove the Governor", "ignore the veto"], "The same rule exists for Congress.", true],
  ["Brown v. Board of Education (1954) ruled that…", "segregated public schools are unconstitutional", ["slavery was legal", "states could ban newspapers"], "It applied the 14th Amendment's equal protection clause.", true],
  ["Why might a state like Maine try a new voting method before others?", "states can act as laboratories of democracy", ["states must copy each other", "the federal government requires it"], "Federalism lets states test ideas.", true],
  ["Which is the best way to evaluate a ballot question?", "read the full text and compare sources on both sides", ["vote however a friend says", "read only the title"], "Maine sends voters a guide with each question.", true],
];

const NATION: Q[] = [
  ["Which article of the US Constitution sets up Congress?", "Article I", ["Article II", "Article III"], "Article II is the President, Article III the courts."],
  ["Which article of the US Constitution sets up the presidency?", "Article II", ["Article I", "Article III"], "Article I is Congress, Article III the courts."],
  ["Which article of the US Constitution sets up the federal courts?", "Article III", ["Article I", "Article II"], "Article I is Congress, Article II the President."],
  ["How many senators does each state have?", "2", ["1", "4"], "Every state has two, whatever its population."],
  ["How long is a US senator's term?", "6 years", ["2 years", "4 years"], "About a third of the Senate is elected every two years."],
  ["How long is a US representative's term?", "2 years", ["4 years", "6 years"], "The whole House is elected every two years."],
  ["How long is a President's term?", "4 years", ["2 years", "6 years"], "The 22nd Amendment limits a President to two elected terms."],
  ["How many justices sit on the US Supreme Court?", "9", ["7", "12"], "Congress sets the number by law."],
  ["Who nominates federal judges?", "the President", ["the Speaker of the House", "the voters"], "The Senate must confirm them."],
  ["Who must confirm a President's nominee to the Supreme Court?", "the Senate", ["the House", "the Governor of each state"], "It is a check on the President."],
  ["Which body has the power to impeach a federal official?", "the House of Representatives", ["the Senate", "the Supreme Court"], "The Senate then holds the trial."],
  ["Which body holds the trial after an impeachment?", "the Senate", ["the House", "the Supreme Court alone"], "Two-thirds of senators must vote to remove."],
  ["Which body has the power to declare war?", "Congress", ["the President", "the Supreme Court"], "The President is commander in chief of the armed forces."],
  ["Which branch makes treaties, with the Senate's approval?", "the executive branch", ["the judicial branch", "the House of Representatives"], "Two-thirds of the Senate must ratify a treaty."],
  ["How many amendments does the US Constitution have?", "27", ["10", "50"], "The first ten are the Bill of Rights."],
  ["Which amendment protects freedom of speech, religion, press, assembly and petition?", "the First Amendment", ["the Fifth Amendment", "the Tenth Amendment"], "It is the first item in the Bill of Rights."],
  ["Which amendment protects against unreasonable searches and seizures?", "the Fourth Amendment", ["the Second Amendment", "the Eighth Amendment"], "Police usually need a warrant."],
  ["Which amendment lets a person refuse to testify against themselves?", "the Fifth Amendment", ["the First Amendment", "the Tenth Amendment"], "People sometimes say they plead the Fifth."],
  ["Which amendment lowered the voting age to 18?", "the 26th Amendment", ["the 19th Amendment", "the 15th Amendment"], "It was ratified in 1971."],
  ["Which amendment guaranteed women the right to vote?", "the 19th Amendment", ["the 26th Amendment", "the 13th Amendment"], "It was ratified in 1920."],
  ["The idea that government power is split among three branches is…", "separation of powers", ["federalism", "popular sovereignty"], "Montesquieu wrote about it."],
  ["The idea that the people are the source of government's power is…", "popular sovereignty", ["judicial review", "separation of powers"], "The Constitution begins “We the People.”"],
  ["The President's veto can be overridden by…", "a two-thirds vote in both houses of Congress", ["a simple majority in the House", "the Supreme Court"], "It is a check on the President."],
  ["A federal law passes Congress when…", "both the House and Senate pass the same bill", ["only the House passes it", "one committee approves it"], "Then the President signs or vetoes it."],
  ["Which document did the Constitution replace?", "the Articles of Confederation", ["the Declaration of Independence", "the Magna Carta"], "The Articles left the national government too weak.", true],
  ["The Great Compromise created…", "a Senate with equal seats and a House by population", ["the Bill of Rights", "the Electoral College only"], "It balanced large and small states.", true],
  ["The Federalist Papers were written to…", "persuade states to ratify the Constitution", ["declare independence", "end the Civil War"], "Hamilton, Madison and Jay wrote them.", true],
  ["Tinker v. Des Moines (1969) ruled that students…", "keep free speech rights at school", ["have no rights at school", "must wear uniforms"], "The case was about armbands protesting a war.", true],
  ["Gideon v. Wainwright (1963) ruled that a person accused of a serious crime…", "has a right to a lawyer even if they cannot pay", ["must defend themselves", "cannot appeal"], "It applied the Sixth Amendment to the states.", true],
  ["In a parliamentary system, unlike the US system, the head of government is usually…", "chosen by the majority in the legislature", ["elected directly by voters", "appointed by judges"], "The United Kingdom has a prime minister.", true],
];

const FINANCE: Q[] = [
  ["Gross pay is…", "your pay before taxes and deductions", ["your pay after taxes", "your yearly bonus"], "Net pay is what lands in your account."],
  ["Net pay is…", "what you take home after taxes and deductions", ["your pay before taxes", "the money you owe"], "It is smaller than gross pay."],
  ["Simple interest on $1,000 at 5% a year for 2 years is…", "$100", ["$50", "$1,100"], "1,000 × 0.05 × 2 = 100."],
  ["Compound interest earns interest on…", "the original amount and the interest already earned", ["only the original amount", "nothing after the first year"], "That is why saving early grows faster."],
  ["The Rule of 72 estimates how long money takes to…", "double", ["disappear", "triple"], "Divide 72 by the yearly interest rate."],
  ["At 6% a year, about how long does it take money to double?", "12 years", ["6 years", "72 years"], "72 ÷ 6 = 12."],
  ["APR on a credit card is…", "the yearly cost of borrowing as a percentage", ["the card's spending limit", "a reward point"], "A higher APR means borrowing costs more."],
  ["Paying only the minimum on a credit card usually means…", "paying much more in interest over time", ["paying no interest", "your balance disappears"], "Interest keeps building on what is left."],
  ["A credit score mainly shows…", "how reliably you have repaid debts", ["how much money you earn", "your bank balance"], "Lenders use it to decide loans and rates."],
  ["Which helps build a good credit score?", "paying every bill on time", ["missing payments", "maxing out every card"], "Payment history matters most."],
  ["A budget compares…", "income with expenses", ["prices at two stores", "two bank logos"], "It helps you plan what to spend and save."],
  ["An emergency fund is money saved for…", "unexpected costs like a car repair", ["a vacation you planned", "daily snacks"], "Many advisers suggest three to six months of expenses."],
  ["Deposits at an insured bank are protected up to $250,000 by the…", "FDIC", ["IRS", "FBI"], "Credit union deposits have similar protection from the NCUA."],
  ["A credit union differs from a bank because it is…", "owned by its members", ["owned by the government", "not allowed to lend"], "Maine has many local credit unions."],
  ["Diversification means…", "spreading money across different investments", ["putting all your money in one stock", "keeping cash under a mattress"], "It lowers the risk of losing everything."],
  ["Which investment usually has the highest risk and the highest possible return?", "stocks", ["a savings account", "a certificate of deposit"], "Stock prices can rise or fall a lot."],
  ["An insurance deductible is…", "what you pay before insurance pays", ["the monthly price of insurance", "a refund from the insurer"], "The monthly price is the premium."],
  ["An insurance premium is…", "the regular payment to keep a policy", ["what you pay before insurance pays", "money the insurer owes you"], "Premiums can be monthly or yearly."],
  ["A fixed expense is one that…", "stays the same each month, like rent", ["changes every month", "happens only once"], "Groceries are a variable expense."],
  ["A variable expense is one that…", "changes from month to month, like groceries", ["is always the same", "is never paid"], "Rent is usually fixed."],
  ["Which is an asset?", "money in savings", ["a credit card balance", "a car loan"], "Assets are what you own; liabilities are what you owe."],
  ["Which is a liability?", "a student loan", ["a savings account", "a paid-off bike"], "Liabilities are debts you owe."],
  ["Identity thieves often try to get…", "your Social Security number and passwords", ["your favorite color", "your shoe size"], "Never share them in an unexpected message."],
  ["A $40 sweater is 25% off. What is the sale price?", "$30", ["$15", "$35"], "25% of 40 is 10.", true],
  ["You earn $15 an hour for 20 hours. About 15% is taken for taxes. What is your take-home pay?", "$255", ["$300", "$45"], "300 − 45 = 255.", true],
  ["Which loan costs the least over time, if everything else is equal?", "the one with the lowest APR", ["the one with the highest APR", "the one with the longest name"], "A lower rate means less interest.", true],
  ["Opportunity cost in personal finance means…", "what you give up when you choose to spend or save", ["the cost of opening an account", "a bank fee"], "Spending $50 now means not saving it.", true],
  ["A 529 plan is designed to help families save for…", "education", ["groceries", "vacations"], "Maine's plan is called NextGen.", true],
];

const ECONOMICS: Q[] = [
  ["When the price of a good rises, the quantity demanded usually…", "falls", ["rises", "stays exactly the same"], "This is the law of demand."],
  ["When the price of a good rises, the quantity supplied usually…", "rises", ["falls", "drops to zero"], "Higher prices encourage producers to make more."],
  ["The price where supply equals demand is the…", "equilibrium price", ["minimum wage", "tax rate"], "At that price there is no shortage or surplus."],
  ["If a price is set below equilibrium, the result is a…", "shortage", ["surplus", "profit"], "More people want it than producers supply."],
  ["If a price is set above equilibrium, the result is a…", "surplus", ["shortage", "recession"], "Producers supply more than people buy."],
  ["A poor wild blueberry harvest in Maine would most likely…", "raise the price of wild blueberries", ["lower the price", "end demand for blueberries"], "Supply falls, so the price tends to rise."],
  ["Gross domestic product (GDP) measures…", "the value of all final goods and services made in a country in a year", ["the number of people in a country", "the money the government owes"], "Economists use it to track growth."],
  ["Inflation is…", "a general rise in prices over time", ["a fall in unemployment", "a rise in the stock market"], "It lowers what each dollar can buy."],
  ["The unemployment rate counts people who…", "want a job and are looking but don't have one", ["are retired", "are in school full-time"], "People not looking for work aren't counted."],
  ["Which agency sets US monetary policy?", "the Federal Reserve", ["the Treasury Department", "Congress"], "It raises or lowers interest rates."],
  ["Fiscal policy is decided by…", "Congress and the President through taxes and spending", ["the Federal Reserve alone", "private banks"], "Monetary policy is the Federal Reserve's job."],
  ["To fight high inflation, the Federal Reserve usually…", "raises interest rates", ["prints much more money", "cuts all taxes"], "Higher rates slow borrowing and spending."],
  ["A recession is…", "a significant decline in economic activity lasting months", ["a rise in prices", "a new tax"], "Jobs and production fall."],
  ["Specialization means…", "focusing on producing what you do best", ["making everything yourself", "refusing to trade"], "Maine specializes in lobster and wood products."],
  ["Comparative advantage means producing a good at a lower…", "opportunity cost than others", ["price than any other country", "quality than others"], "Trade lets both sides gain."],
  ["A tariff is…", "a tax on imported goods", ["a loan to a business", "a type of bank account"], "Tariffs raise the price of imports."],
  ["Economic interdependence means…", "regions and countries rely on each other for goods", ["every country makes everything it needs", "countries never trade"], "Maine exports seafood and imports oil."],
  ["In a market economy, most decisions about what to produce are made by…", "consumers and businesses", ["a central government plan", "tradition alone"], "Prices guide choices."],
  ["In a command economy, the main economic decisions are made by…", "the government", ["individual consumers", "small businesses"], "Central planners set production goals."],
  ["Most countries today, including the United States, have…", "mixed economies", ["pure command economies", "pure traditional economies"], "Markets work alongside some government rules."],
  ["Which is an example of a public good?", "a lighthouse", ["a candy bar", "a private car"], "One ship using its light doesn't stop others using it."],
  ["Why do Maine's tourism businesses hire more workers in summer?", "demand rises when visitors arrive", ["wages are lower in summer", "the government requires it"], "Seasonal demand affects jobs."],
  ["An entrepreneur is someone who…", "takes a risk to start a business", ["works only for the government", "never uses money"], "Entrepreneurs combine land, labor and capital.", true],
  ["Which is an example of capital in economics?", "a lobster boat used to catch lobsters", ["the ocean", "a worker's time"], "Capital means tools and equipment used to produce goods.", true],
  ["If the price of gasoline rises, demand for fuel-efficient cars will likely…", "increase", ["decrease", "disappear"], "They are a substitute way to save on fuel.", true],
  ["How does the Penobscot Nation's role in restoring the Penobscot River connect to economics?", "healthy fish runs support fishing, tourism and culture", ["it ended all trade", "it raised taxes for everyone"], "Sustainable resources support future jobs.", true],
  ["Sustainability in an economy means…", "meeting today's needs without harming future generations' ability to meet theirs", ["using every resource as fast as possible", "never producing anything"], "Maine's fishing rules aim for sustainability.", true],
  ["Why might a government subsidize a crop or industry?", "to keep it running or lower its prices", ["to stop people from buying it", "to raise its taxes"], "Subsidies are payments that support producers.", true],
];

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

/** A choice question with numeric dollar answers; drops wrong answers that equal the right one or each other. */
function moneyChoice(prompt: string, right: number, wrong: number[], hint: string, unit = usd): Question {
  const others = [...new Set([...wrong, right * 2, right + 10].filter((w) => w > 0 && w !== right))].slice(0, 3);
  return textChoice(prompt, unit(right), others.map(unit), hint);
}

function simpleInterest(): Question {
  const p = randInt(2, 50) * 100;
  const r = pick([2, 3, 4, 5, 6, 8]);
  const t = randInt(2, 5);
  const i = (p * r * t) / 100;
  return moneyChoice(
    `How much simple interest does ${usd(p)} earn at ${r}% a year for ${t} years?`,
    i,
    [p + i, (p * r) / 100, i * 2],
    `Interest = principal × rate × time = ${usd(p)} × ${r / 100} × ${t}.`,
  );
}

function salePrice(): Question {
  const price = randInt(1, 15) * 20;
  const d = pick([10, 20, 25, 50]);
  const off = (price * d) / 100;
  return moneyChoice(
    `A jacket costs ${usd(price)} and is ${d}% off. What is the sale price?`,
    price - off,
    [off, price - d, price + off, price],
    `${d}% of ${usd(price)} is ${usd(off)}, so subtract that from the price.`,
  );
}

function takeHome(): Question {
  const hours = pick([10, 20, 30, 40]);
  const wage = randInt(12, 20);
  const rate = pick([10, 20]);
  const gross = hours * wage;
  const tax = (gross * rate) / 100;
  return moneyChoice(
    `You earn ${usd(wage)} an hour for ${hours} hours, and ${rate}% is withheld for taxes. What is your take-home pay?`,
    gross - tax,
    [gross, tax, gross + tax],
    `Gross pay is ${usd(wage)} × ${hours} = ${usd(gross)}. Subtract ${rate}% of it.`,
  );
}

function doubling(): Question {
  const r = pick([2, 3, 4, 6, 8, 9, 12]);
  const years = 72 / r;
  const yrs = (n: number) => `about ${n} years`;
  return moneyChoice(
    `Using the Rule of 72, about how long does money take to double at ${r}% a year?`,
    years,
    [years * 2, r, 72 - r],
    `Divide 72 by the rate: 72 ÷ ${r} = ${years}.`,
    yrs,
  );
}

const MAKERS = [simpleInterest, salePrice, takeHome, doubling];

/** Bank items plus generated money questions, more of them as difficulty rises. */
function financeSet(d: Difficulty): Question[] {
  const n = d === 1 ? 3 : 4;
  return [...fromItems(FINANCE, 8 - n, d), ...shuffle(MAKERS).slice(0, n).map((make) => make())];
}

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "me-g9-governing-maine",
    title: "Governing Maine",
    emoji: "🗳️",
    blurb: "Ranked-choice voting, initiatives and federalism",
    parentNote: "How Maine governs itself within the federal system: ranked-choice voting, citizen initiatives and the people's veto, split electoral votes, the Clean Election Act, a part-time citizen legislature, federalism and the Bill of Rights, and civic duties compared with civic responsibilities.",
    standards: ["Civics & Government 1; Civics & Government 2", "the structures and processes of government in Maine and the United States, and the rights, duties and responsibilities of citizens"],
    items: GOVERNING,
  }),
  bankUnit({
    id: "me-g9-us-government",
    title: "How the Nation Governs",
    emoji: "🏛️",
    blurb: "Congress, the President, the courts and your rights",
    parentNote: "The United States government: the three articles that set up Congress, the presidency and the courts, terms and powers, checks and balances, the Bill of Rights and later amendments, landmark cases, and how the US system compares with a parliamentary one.",
    standards: ["Civics & Government 1; Civics & Government 2", "the purpose, structures and processes of the American political system, and the rights in the Constitution, the Bill of Rights and landmark cases"],
    items: NATION,
  }),
  mixUnit({
    id: "me-g9-personal-finance",
    title: "Money Smarts",
    emoji: "💳",
    blurb: "Pay, interest, credit and risk",
    parentNote: "Personal finance: gross and net pay, simple and compound interest, the Rule of 72, discounts, credit cards and credit scores, budgets and emergency funds, banks and credit unions, insurance, and spreading risk across investments.",
    standards: ["Personal Finance", "saving, investing and managing money, consumer credit, and strategies for money and risk management"],
    make: financeSet,
  }),
  bankUnit({
    id: "me-g9-economics",
    title: "Markets & the Economy",
    emoji: "📈",
    blurb: "Supply, demand and economic indicators",
    parentNote: "Economics: supply and demand, shortages and surpluses, GDP, inflation and unemployment, the Federal Reserve and fiscal policy, specialization, comparative advantage and trade, and economic systems, with examples from Maine.",
    standards: ["Economics; Global Connections", "markets, financial institutions, economic indicators and policy, and economic systems around the world"],
    items: ECONOMICS,
  }),
];
