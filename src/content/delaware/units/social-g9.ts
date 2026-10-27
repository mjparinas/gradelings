import type { Unit } from "../../types";
import { SOCIAL_9 as MAINE_9 } from "../../maine/units/social-g9";
import { UNITS as MINNESOTA_9 } from "../../minnesota/units/social-g9";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Delaware Grade 9 social studies, high school civics and economics with personal finance: the Delaware
// constitution of 1897, the General Assembly, the governor and other elected officers, the courts and their party
// balance, the counties, and how the state raises money (C.2.9-12.b, C.3.9-12.a, C.4.9-12.a), plus copies of Maine's
// United States government, personal finance and economics units and Minnesota's supply and demand unit without their
// state's items, with Delaware items added.

const GOVERNING: Q[] = [
  ["Delaware's constitution, still in force today with many amendments, was adopted in…", "1897", ["1620", "1776", "1964"], "It is Delaware's fourth constitution."],
  ["Delaware's legislature is called the…", "General Assembly", ["General Court", "Grand Council", "Parliament"], "It has a Senate and a House of Representatives."],
  ["The Delaware House of Representatives has…", "41 members", ["400 members", "100 members", "2 members"], "Each represents one district."],
  ["The Delaware Senate has…", "21 members", ["41 members", "100 members", "2 members"], "Senate districts are about twice the size of House districts."],
  ["Members of the Delaware House serve…", "two-year terms", ["six-year terms", "life terms", "ten-year terms"], "Every House seat is on the ballot every two years."],
  ["Delaware's governor serves a term of…", "four years, and no more than two terms", ["two years with no limit", "six years", "life"], "The term limit is in the state constitution."],
  ["Delaware's lieutenant governor is elected separately from the governor and…", "presides over the state Senate", ["chooses the judges alone", "runs every school", "leads the US Senate"], "The lieutenant governor votes only to break a tie."],
  ["Delaware voters also elect the attorney general, the treasurer, the auditor and the…", "insurance commissioner", ["secretary of state", "school principals", "chief justice"], "The governor appoints the secretary of state."],
  ["Delaware's highest court is the…", "Delaware Supreme Court", ["General Assembly", "Levy Court", "Court of Common Pleas"], "It has five justices."],
  ["Delaware judges are chosen by the governor, confirmed by the state Senate and serve terms of…", "12 years", ["2 years", "life", "until the next election"], "They are not elected by voters."],
  ["Delaware's constitution says no more than a bare majority of the judges on its top courts may belong to…", "one political party", ["one county", "one family", "one law school"], "It keeps the courts balanced between parties."],
  ["Delaware's Court of Chancery, known around the world, decides cases about…", "businesses and how companies are run", ["traffic tickets", "the Olympics", "the weather"], "Many of the biggest US companies are legally based in Delaware."],
  ["When the governor vetoes a bill, the General Assembly can pass it anyway with a vote of…", "three-fifths of each house", ["one member", "the Supreme Court", "half of one house"], "This is a check on the governor."],
  ["Delaware is divided into how many counties?", "3", ["10", "50", "100"], "New Castle, Kent and Sussex."],
  ["Kent County's governing body has an unusual old name, the…", "Levy Court", ["Town Meeting", "Executive Council", "House of Lords"], "New Castle and Sussex counties have county councils."],
  ["Unlike most states, Delaware's state government takes care of…", "most of the roads in the state", ["every family's groceries", "all private businesses", "nothing at all"], "Counties and towns look after only a few roads."],
  ["Delaware has no general sales tax, so the state raises money with an income tax, a tax on businesses' sales and…", "fees from the many companies incorporated in Delaware", ["tariffs on other states", "a tax on rain", "tolls on bicycles"], "Corporate fees are one of the state's biggest sources of money."],
  ["Delaware voters cannot put a new law on the ballot themselves because the state has no…", "citizen initiative", ["governor", "legislature", "courts"], "Laws are made by the General Assembly."],
  ["To amend Delaware's constitution, two-thirds of each house must agree in two General Assemblies in a row, and then…", "it takes effect without a statewide vote", ["the President must sign it", "a court must order it", "every town must vote on it"], "Delaware is the only state that amends its constitution without the voters."],
  ["Article I of Delaware's constitution is its…", "Bill of Rights", ["budget", "list of counties", "state song"], "It lists the people's rights first."],
  ["How is Delaware's constitution like the US Constitution?", "both separate power among three branches", ["both were written in 1787", "neither can be amended", "both create a king"], "Separation of powers is a shared principle.", true],
  ["How is the way Delaware changes its constitution different from most states?", "the legislature can amend it without asking the voters", ["it can never be changed", "only the President can change it", "every citizen must agree"], "Most states need a vote of the people.", true],
  ["Why might rules that balance the parties on Delaware's courts matter to the public?", "people trust courts more when no one party controls them", ["it makes trials faster", "it lowers taxes", "it chooses the governor"], "Balance is meant to keep courts fair.", true],
  ["Delaware's counties had not updated property values for school taxes in decades until a court case in 2020 led them to…", "reassess every property", ["end all school taxes", "close every school", "move the capital"], "Old values made the taxes uneven.", true],
  ["Which level of government in Delaware usually decides how much to spend on a town's library and parks?", "the town or city council", ["the US Congress", "the President", "the state Supreme Court"], "Local government handles local services.", true],
  ["Why do House members face the voters every two years while senators usually serve four?", "the House is meant to stay closest to the voters", ["to save money on ballots", "because the constitution is new", "because the President asks"], "Shorter terms mean more frequent elections.", true],
];

const NATION_EXTRA: Q[] = [
  ["After the 2020 census, Delaware has how many seats in the US House of Representatives?", "1", ["2", "21", "41"], "Seats are divided by population after each census."],
  ["Delaware has how many electoral votes for President?", "3", ["1", "21", "41"], "Its one House seat plus its two senators."],
  ["Like every state, Delaware sends how many senators to the US Senate?", "2", ["1", "21", "41"], "Each state has equal votes in the Senate.", true],
];

const FINANCE_EXTRA: Q[] = [
  ["Delaware taxes wages, so a worker's paycheck there has deductions for federal and state income tax, Social Security and…", "Medicare", ["sales tax", "a toll", "a tariff"], "Medicare is health insurance for older Americans."],
  ["Taxes taken out of a paycheck automatically are…", "involuntary deductions", ["voluntary deductions", "bonuses", "tips"], "Retirement savings you choose are voluntary.", true],
  ["A 529 plan, which Delaware offers, is a savings account meant for…", "education costs such as college", ["buying a car", "paying rent", "vacations"], "Money in it can grow without being taxed if it is used for school.", true],
];

const ECONOMICS_EXTRA: Q[] = [
  ["Shoppers from neighboring states often cross into Delaware to buy big items because…", "Delaware has no general sales tax", ["prices are set by the President", "stores there give everything away", "it is the only state with stores"], "Tax differences change where people shop."],
  ["Visitors who come to Delaware's beaches each summer are an important part of its…", "tourism industry", ["oil industry", "mining industry", "gold rush"], "Tourism brings money to towns and businesses."],
  ["After a car factory in Newark closed, the University of Delaware turned the site into a campus for science and health businesses. This shows an economy…", "changing over time", ["staying exactly the same", "ending all trade", "returning to farming only"], "Economies adapt as industries rise and fall.", true],
  ["Fertilizer from farms that washes into the Inland Bays and harms fishing there is an example of a negative…", "externality", ["dividend", "tariff", "subsidy"], "A cost that falls on people outside the deal.", true],
];

const SUPPLY_EXTRA: Q[] = [
  ["During a busy summer weekend at Rehoboth Beach, hotel room prices tend to…", "rise", ["fall", "stay at zero", "disappear"], "Demand rises while the number of rooms stays the same."],
  ["When a great growing season floods the market with Delaware watermelons and buyers stay the same, melon prices tend to…", "fall", ["rise", "double", "stop existing"], "More supply at the same demand."],
  ["If the price of gasoline rises, demand for fuel-efficient cars tends to…", "rise", ["fall", "stay the same forever", "vanish"], "Related goods affect each other.", true],
];

const MAINE = (id: string) => from(MAINE_9, id);

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "de-g9-governing-delaware",
    title: "Governing Delaware",
    emoji: "🏛️",
    blurb: "The 1897 constitution, the General Assembly and the courts",
    parentNote: "How Delaware governs itself within the federal system: the 1897 constitution and how the legislature amends it, the 41-member House and 21-member Senate of the General Assembly, the governor, lieutenant governor and other elected officers, the Supreme Court, the Court of Chancery and the courts' party balance, the three counties and Kent's Levy Court, state roads, and how the state raises money without a sales tax.",
    standards: ["C.2.9-12.b; C.3.9-12.a; C.4.9-12.a", "how government works as a dynamic balance of powers, citizens keeping informed about state and local policy, and working with government agencies"],
    items: GOVERNING,
  }),
  copyOf(
    MAINE("me-g9-us-government"),
    {
      id: "de-g9-us-government",
      title: "How the Nation Governs",
      emoji: "🏛️",
      blurb: "Congress, the President, the courts and your rights",
      parentNote: "The United States government: the three articles that set up Congress, the presidency and the courts, terms and powers, checks and balances, the Bill of Rights and later amendments, landmark cases, and how the US system compares with a parliamentary one.",
      standards: ["C.2.9-12.b; C.1.9-12.a; C.2.9-12.a; C.3.9-12.a", "how the Constitution's balance of powers works in practice, how governments around the world compare, the role of political parties, and keeping informed as a citizen"],
    },
    NATION_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-personal-finance"),
    {
      id: "de-g9-personal-finance",
      title: "Money Smarts",
      emoji: "💳",
      blurb: "Pay, interest, credit and risk",
      parentNote: "Personal finance: gross and net pay, simple and compound interest, the Rule of 72, discounts, credit cards and credit scores, budgets and emergency funds, banks and credit unions, insurance, and spreading risk across investments.",
      standards: ["E.1.9-12.a; E.2.9-12.a", "personal economic choices in a market economy, and how inflation and interest rates affect them"],
    },
    FINANCE_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-economics"),
    {
      id: "de-g9-economics",
      title: "Markets & the Economy",
      emoji: "📈",
      blurb: "GDP, inflation, the Fed and trade",
      parentNote: "Economics: GDP, inflation and unemployment, the Federal Reserve and fiscal policy, specialization, comparative advantage and trade, and economic systems, with examples from Delaware.",
      standards: ["E.2.9-12.a; E.3.9-12.a; E.4.9-12.a", "how the economy works as a whole, including inflation, unemployment and the business cycle, how economic systems serve social goals, and world trade"],
    },
    ECONOMICS_EXTRA,
  ),
  copyOf(
    from(MINNESOTA_9, "mn-g9-supply-demand"),
    {
      id: "de-g9-supply-demand",
      title: "Supply & Demand",
      emoji: "⚖️",
      blurb: "How buyers and sellers set prices",
      parentNote: "Supply and demand: how prices change when buyers and sellers interact, equilibrium, shortages and surpluses, price ceilings and floors, and how scarcity and incentives shape choices, with examples from Delaware.",
      standards: ["E.1.9-12.a", "how markets, and government actions in them, decide what is produced and the prices of goods and services"],
    },
    SUPPLY_EXTRA,
  ),
];
