import type { Unit } from "../../types";
import { SOCIAL_9 as MAINE_9 } from "../../maine/units/social-g9";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Ohio Grade 9 social studies, the high school American Government and Economics and Financial Literacy courses Ohio
// requires for graduation: how Ohio governs itself under its 1851 constitution within the federal system (American
// Government 16, 17 and 19), plus copies of Maine's United States government, personal finance and economics units
// without their Maine items, with Ohio items added.

const GOVERNING: Q[] = [
  ["Ohio's first constitution was written in 1802. The one in force today was adopted in…", "1851", ["1776", "1960"], "It has been amended many times since."],
  ["Like the US Constitution, Ohio's constitution begins its list of protected rights with a…", "Bill of Rights", ["tax table", "map of counties"], "Article I of the Ohio Constitution is its Bill of Rights."],
  ["One change the 1851 constitution made was that Ohio's judges are…", "elected by the voters", ["appointed for life by the President", "chosen by the counties at random"], "Under the 1802 constitution the legislature chose judges."],
  ["Ohio's lawmaking body is called the…", "General Assembly", ["State Congress", "Grand Council"], "It has a Senate and a House of Representatives."],
  ["The Ohio Senate has 33 members. The Ohio House of Representatives has…", "99 members", ["33 members", "435 members"], "House districts are smaller than Senate districts."],
  ["Ohio senators serve four-year terms. Members of the Ohio House serve…", "two-year terms", ["six-year terms", "life terms"], "The whole House is elected every two years."],
  ["Ohio's chief executive is the…", "governor", ["chief justice", "speaker of the House"], "The governor is elected for four years."],
  ["Which statewide officer is Ohio's chief lawyer?", "the attorney general", ["the treasurer", "the auditor"], "The attorney general represents the state in court."],
  ["Which statewide officer runs Ohio's elections?", "the secretary of state", ["the lieutenant governor", "the auditor of state"], "The secretary of state oversees the boards of elections."],
  ["Ohio's highest court is the…", "Ohio Supreme Court", ["Court of Claims", "General Assembly"], "It has a chief justice and six justices."],
  ["Ohio Supreme Court justices are chosen by…", "voters, for six-year terms", ["the President, for life", "the General Assembly, every year"], "Ohio elects its judges."],
  ["When the governor vetoes a bill, the General Assembly can still pass it with a vote of…", "three-fifths of each house", ["one member", "the Ohio Supreme Court"], "This is a check on the governor."],
  ["The governor can veto single spending items in a budget bill. This is called a…", "line-item veto", ["filibuster", "pocket recall"], "Many governors have it; the President does not."],
  ["Ohio's capital, where the General Assembly meets, is…", "Columbus", ["Cleveland", "Cincinnati"], "The Statehouse is in downtown Columbus."],
  ["Ohio has how many counties?", "88", ["50", "102"], "Each county has a county seat."],
  ["Most Ohio counties are run by a board of…", "three county commissioners", ["one king", "nine senators"], "Voters elect the commissioners."],
  ["In Ohio, a township is usually run by…", "three elected trustees", ["the governor", "a federal judge"], "Townships serve areas outside many cities and villages."],
  ["Under Ohio law, a city is a municipality with at least 5,000 people. A smaller one is a…", "village", ["county", "state"], "Cities and villages are both municipalities."],
  ["Home rule in Ohio's constitution lets cities and villages…", "govern their own local matters", ["print their own money", "make treaties with other countries"], "Home rule was added in 1912."],
  ["The 1912 changes to Ohio's constitution let citizens propose laws and amendments by…", "gathering signatures for an initiative", ["asking the President", "writing to the Supreme Court"], "The initiative and referendum came from the Progressive era.", true],
  ["A referendum lets Ohio voters…", "approve or reject a law the General Assembly passed", ["choose a new state flag every year", "elect the President directly"], "Voters gather signatures to put a law on the ballot.", true],
  ["How is the Ohio Constitution like the US Constitution?", "both separate power among three branches", ["both were written in 1787", "neither can be amended"], "Separation of powers is a shared principle.", true],
  ["How is the Ohio Constitution different from the US Constitution?", "it is much longer and has been amended far more often", ["it has no Bill of Rights", "it creates no courts"], "State constitutions cover many details.", true],
  ["Members of the Ohio General Assembly may serve at most eight years in a row in each house. This is a…", "term limit", ["veto", "recall"], "Voters added term limits in 1992.", true],
  ["Why might a citizen speak at a city council or township trustees' meeting?", "to share a view before a local decision is made", ["to vote for President", "to change the US Constitution"], "Local government is closest to the people.", true],
  ["To vote in Ohio, a citizen must be registered at least…", "30 days before the election", ["one hour before the election", "five years before the election"], "Registration deadlines give boards of elections time to prepare.", true],
  ["Ohio voters show a photo ID when they vote in person. Who sets this rule?", "the state, through Ohio law", ["each voter", "the United Nations"], "States run elections within federal law.", true],
  ["When a city in Ohio wants to raise a local tax levy, it usually must…", "ask the voters to approve it", ["ask the President", "ask another state"], "Many school and city levies appear on Ohio ballots.", true],
];

const NATION_EXTRA: Q[] = [
  ["How many representatives does Ohio send to the US House?", "15", ["2", "99"], "Seats are divided by population after each census."],
  ["William Howard Taft of Cincinnati is the only person who served as both President and…", "Chief Justice of the United States", ["Speaker of the House", "governor of every state"], "He led the Supreme Court from 1921 to 1930."],
  ["Like every state, Ohio sends how many senators to the US Senate?", "2", ["15", "33"], "Each state has equal votes in the Senate."],
];

const FINANCE_EXTRA: Q[] = [
  ["Ohio's minimum wage goes up each year with…", "inflation", ["the price of gold", "the number of tourists"], "Voters tied it to the cost of living in 2006."],
  ["Ohio's 529 college savings plan is called…", "CollegeAdvantage", ["Fast Lane", "Buckeye Bucks"], "Money in a 529 plan grows for education.", true],
  ["Ohio high school students must earn credit in which subject before they graduate?", "financial literacy", ["skiing", "astronomy"], "Ohio added the requirement for students starting high school in 2022.", true],
];

const ECONOMICS_EXTRA: Q[] = [
  ["A drought on Ohio's corn farms would most likely…", "raise the price of corn", ["lower the price of corn", "end demand for corn"], "Supply falls, so the price tends to rise."],
  ["Canada is Ohio's biggest buyer of exports. This shows…", "economic interdependence", ["self-sufficiency", "a command economy"], "Countries rely on each other for goods."],
  ["Car factories in Ohio buy parts from other states and countries. This shows…", "specialization and trade", ["a traditional economy", "barter only"], "Each place makes what it makes best.", true],
];

const MAINE = (id: string) => from(MAINE_9, id);

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "oh-g9-governing-ohio",
    title: "Governing Ohio",
    emoji: "🗳️",
    blurb: "The 1851 constitution, the governor and local government",
    parentNote: "How Ohio governs itself within the federal system: the 1802 and 1851 constitutions and Ohio's Bill of Rights, the statewide officers, the General Assembly, term limits and vetoes, the elected courts, the initiative and referendum, counties, townships, cities, villages and home rule, and voting in Ohio.",
    standards: ["American Government 16; American Government 17; American Government 19", "the Ohio Constitution compared with the federal one and its 1851 changes, and citizens' roles in state and local government"],
    items: GOVERNING,
  }),
  copyOf(
    MAINE("me-g9-us-government"),
    {
      id: "oh-g9-us-government",
      title: "How the Nation Governs",
      emoji: "🏛️",
      blurb: "Congress, the President, the courts and your rights",
      parentNote: "The United States government: the three articles that set up Congress, the presidency and the courts, terms and powers, checks and balances, the Bill of Rights and later amendments, landmark cases, and how the US system compares with a parliamentary one.",
      standards: ["American Government 7; American Government 8; American Government 9; American Government 10; American Government 11; American Government 12; American Government 13; American Government 14; American Government 15", "how amendments, court decisions and laws changed the government, the three branches and their interaction, and the rights the Constitution protects"],
    },
    NATION_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-personal-finance"),
    {
      id: "oh-g9-personal-finance",
      title: "Money Smarts",
      emoji: "💳",
      blurb: "Pay, interest, credit and risk",
      parentNote: "Personal finance: gross and net pay, simple and compound interest, the Rule of 72, discounts, credit cards and credit scores, budgets and emergency funds, banks and credit unions, insurance, and spreading risk across investments.",
      standards: ["Economics and Financial Literacy 11; Economics and Financial Literacy 12; Economics and Financial Literacy 14; Economics and Financial Literacy 16; Economics and Financial Literacy 18; Economics and Financial Literacy 19; Economics and Financial Literacy 20; Economics and Financial Literacy 21; Economics and Financial Literacy 23; Economics and Financial Literacy 24", "income and earning statements, budgets, saving and investing, credit and debt, and insurance"],
    },
    FINANCE_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-economics"),
    {
      id: "oh-g9-economics",
      title: "Markets & the Economy",
      emoji: "📈",
      blurb: "Supply, demand and economic indicators",
      parentNote: "Economics: supply and demand, shortages and surpluses, GDP, inflation and unemployment, the Federal Reserve and fiscal policy, specialization, comparative advantage and trade, and economic systems, with examples from Ohio.",
      standards: ["Economics and Financial Literacy 3; Economics and Financial Literacy 4; Economics and Financial Literacy 5; Economics and Financial Literacy 7; Economics and Financial Literacy 9; American Government 20; American Government 21", "scarcity, economic systems, markets and prices, economic well-being, comparative advantage and trade, and fiscal and monetary policy"],
    },
    ECONOMICS_EXTRA,
  ),
];
