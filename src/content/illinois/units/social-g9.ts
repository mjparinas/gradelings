import type { Unit } from "../../types";
import { SOCIAL_9 as MAINE_9 } from "../../maine/units/social-g9";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Illinois Grade 9 social studies, civics: how Illinois governs itself under the 1970 constitution next to the federal
// system (SS.9-12.CV.1 to CV.5), plus copies of Maine's United States government, personal finance and economics units
// without their Maine items, with Illinois items added (SS.9-12.CV.3 and CV.4, SS.9-12.EC.FL, SS.9-12.EC).

const GOVERNING: Q[] = [
  ["Illinois's current constitution was adopted in…", "1970", ["1818", "1948"], "It is the state's fourth constitution."],
  ["The Illinois Constitution's first article is its…", "Bill of Rights", ["tax code", "list of counties"], "Like the US Constitution, it protects rights first."],
  ["How many statewide executive officers do Illinois voters elect?", "six", ["two", "twelve"], "Governor, lieutenant governor, attorney general, secretary of state, comptroller and treasurer."],
  ["The governor and lieutenant governor of Illinois are elected…", "together on one ticket", ["in different years", "by the General Assembly"], "They run as a team, like the President and Vice President."],
  ["How long is the Illinois governor's term?", "4 years", ["2 years", "6 years"], "Illinois has no term limit for governor."],
  ["Illinois's comptroller…", "pays the state's bills and keeps its accounts", ["leads the state police", "runs elections"], "The treasurer invests and holds state money."],
  ["Illinois's secretary of state is known for running…", "driver's licenses and vehicle registration", ["the state courts", "public schools"], "The office also keeps state records and the state library."],
  ["How many members serve in the Illinois General Assembly?", "177", ["100", "435"], "59 senators and 118 representatives."],
  ["To override a governor's veto, the General Assembly needs…", "a three-fifths vote in each house", ["a simple majority in one house", "the Supreme Court's approval"], "Congress needs two-thirds; Illinois needs three-fifths."],
  ["An amendatory veto lets the Illinois governor…", "send a bill back with suggested changes", ["write a new law alone", "cancel an election"], "The General Assembly can accept the changes or override."],
  ["A reduction veto lets the governor…", "lower an amount of money in a spending bill", ["raise taxes", "remove a judge"], "Governors use it on the budget."],
  ["How many justices sit on the Illinois Supreme Court?", "7", ["9", "5"], "Three are elected from Cook County."],
  ["Illinois Supreme Court justices are chosen by…", "voters in judicial districts", ["the governor alone", "the US President"], "After 10 years they stand for retention."],
  ["To keep their seats, Illinois judges in a retention election need…", "yes votes from three-fifths of voters", ["no votes at all", "the governor's signature"], "Voters decide if a judge stays."],
  ["The Illinois Constitution requires the state income tax to be…", "a flat rate", ["graduated, with higher rates on higher incomes", "zero"], "Voters rejected changing it in 2020."],
  ["Illinois citizens can use a petition to propose constitutional amendments only about…", "the legislative article", ["any article", "the US Constitution"], "Other amendments must start in the General Assembly."],
  ["A 2010 amendment to the Illinois Constitution allows voters to…", "recall the governor", ["recall any judge", "dissolve the General Assembly"], "It takes a petition and a special election."],
  ["Home rule in Illinois lets large cities and Cook County…", "pass many local laws without asking the state first", ["ignore the US Constitution", "print their own money"], "Cities over 25,000 people get it automatically."],
  ["Illinois has more units of local government than any other state, including…", "counties, townships, cities, villages and special districts", ["only counties", "only cities"], "Park, library and school districts count too."],
  ["How many electoral votes does Illinois have in presidential elections?", "19", ["17", "2"], "17 House seats plus 2 senators."],
  ["In Illinois, a 17-year-old may vote in a primary if they will…", "be 18 by the general election", ["turn 17 that day", "pass a test"], "Pre-registration starts at 16."],
  ["Illinois lets eligible people register to vote…", "on Election Day at their polling place", ["only a year before", "only by mail"], "This is same-day registration."],
  ["Federalism means…", "power is divided between the national and state governments", ["all power belongs to the states", "all power belongs to the President"], "Illinois and the United States each have a constitution."],
  ["Which power belongs to the federal government, not to Illinois?", "coining money", ["setting up school districts", "issuing driver's licenses"], "The US Constitution gives Congress that power."],
  ["Cook County created the first… in the United States in 1899.", "juvenile court", ["state lottery", "public library"], "It handles cases about young people separately from adults.", true],
  ["In 2009, the General Assembly impeached and removed a governor. This shows…", "a check by the legislature on the executive", ["that governors can't be removed", "the courts choosing governors"], "The House impeaches; the Senate holds the trial.", true],
  ["Illinois's Open Meetings Act requires public bodies to…", "hold their meetings in public with notice", ["meet in secret", "never vote"], "Citizens can watch local boards decide.", true],
  ["Why does the Illinois Constitution let voters call a constitutional convention every 20 years?", "so the people can decide whether to rewrite it", ["so judges can change it alone", "because it expires"], "Voters said no in 2008.", true],
  ["Which is a civic responsibility rather than a legal duty?", "voting in elections", ["paying taxes", "serving on a jury when summoned"], "Voting is voluntary but vital.", true],
  ["Why might a citizen go to a county board meeting?", "to speak about a local decision before it is made", ["to vote for President", "to change the US Constitution"], "Local government is closest to the people.", true],
];

const NATION_EXTRA: Q[] = [
  ["How many representatives does Illinois send to the US House?", "17", ["19", "2"], "Seats are divided by population after each census."],
  ["Which Illinoisan was the 16th President?", "Abraham Lincoln", ["Ulysses S. Grant", "Barack Obama"], "He led the nation through the Civil War."],
  ["Barack Obama represented Illinois in the US Senate before becoming the…", "44th President", ["Chief Justice", "Speaker of the House"], "He took office in 2009."],
];

const FINANCE_EXTRA: Q[] = [
  ["Illinois's minimum wage for adult workers reached $15 an hour in…", "2025", ["1990", "2040"], "It rose in steps from $8.25."],
  ["Illinois's college savings plan, a 529 plan, is called…", "Bright Start", ["Fast Lane", "Gold Coast"], "Money in a 529 plan grows for education.", true],
  ["Illinois requires high school students to learn consumer education, which covers…", "budgeting, credit and consumer rights", ["only sports", "only grammar"], "It is part of graduation requirements.", true],
];

const ECONOMICS_EXTRA: Q[] = [
  ["A drought in Illinois's corn fields would most likely…", "raise the price of corn", ["lower the price of corn", "end demand for corn"], "Supply falls, so the price tends to rise."],
  ["Futures contracts for corn and soybeans are traded at the Chicago Board of Trade so farmers can…", "lock in a price before harvest", ["avoid paying taxes", "grow crops faster"], "Futures help manage price risk."],
  ["Illinois exports many soybeans to other countries. That shows…", "economic interdependence", ["self-sufficiency", "a command economy"], "Countries rely on each other for goods.", true],
];

const MAINE = (id: string) => from(MAINE_9, id);

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "il-g9-governing-illinois",
    title: "Governing Illinois",
    emoji: "🗳️",
    blurb: "The 1970 constitution, the governor and local government",
    parentNote: "How Illinois governs itself within the federal system: the 1970 constitution and its Bill of Rights, the six elected executive officers, the General Assembly and vetoes, the courts and retention elections, the flat income tax, amendments and recall, home rule and local government, and voting in Illinois.",
    standards: ["SS.9-12.CV.1; SS.9-12.CV.2; SS.9-12.CV.3; SS.9-12.CV.5", "the roles of citizens, the powers and limits of state and federal government, and how Illinois's government works"],
    items: GOVERNING,
  }),
  copyOf(
    MAINE("me-g9-us-government"),
    {
      id: "il-g9-us-government",
      title: "How the Nation Governs",
      emoji: "🏛️",
      blurb: "Congress, the President, the courts and your rights",
      parentNote: "The United States government: the three articles that set up Congress, the presidency and the courts, terms and powers, checks and balances, the Bill of Rights and later amendments, landmark cases, and how the US system compares with a parliamentary one.",
      standards: ["SS.9-12.CV.3; SS.9-12.CV.4", "the powers and limits of the branches of government, and the rights in the Constitution, the Bill of Rights and landmark cases"],
    },
    NATION_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-personal-finance"),
    {
      id: "il-g9-personal-finance",
      title: "Money Smarts",
      emoji: "💳",
      blurb: "Pay, interest, credit and risk",
      parentNote: "Personal finance: gross and net pay, simple and compound interest, the Rule of 72, discounts, credit cards and credit scores, budgets and emergency funds, banks and credit unions, insurance, and spreading risk across investments.",
      standards: ["SS.9-12.EC.FL.2; SS.9-12.EC.FL.3; SS.9-12.EC.FL.4; SS.9-12.EC.FL.5", "earning income, saving and investing, managing credit, and protecting against risk"],
    },
    FINANCE_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-economics"),
    {
      id: "il-g9-economics",
      title: "Markets & the Economy",
      emoji: "📈",
      blurb: "Supply, demand and economic indicators",
      parentNote: "Economics: supply and demand, shortages and surpluses, GDP, inflation and unemployment, the Federal Reserve and fiscal policy, specialization, comparative advantage and trade, and economic systems, with examples from Illinois.",
      standards: ["SS.9-12.EC.1; SS.9-12.EC.8; SS.9-12.EC.9; SS.9-12.EC.12", "markets and prices, economic indicators and policy, and trade between nations"],
    },
    ECONOMICS_EXTRA,
  ),
];
