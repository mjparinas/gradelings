import type { Unit } from "../../types";
import { SOCIAL_9 as MAINE_9 } from "../../maine/units/social-g9";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Colorado Grade 9 social studies, civics: how Colorado governs itself under the 1876 constitution next to the federal
// and tribal governments (HS.C.1 to HS.C.3), plus copies of Maine's United States government, personal finance and
// economics units without their Maine items, with Colorado items added (HS.C.2, HS.PF.1 to HS.PF.5, HS.E.1 to HS.E.4).

const GOVERNING: Q[] = [
  ["Colorado's constitution was adopted in…", "1876", ["1970", "1912"], "It is still in force, with many amendments."],
  ["The Colorado Constitution's second article is its…", "Bill of Rights", ["tax code", "list of counties"], "Like the US Constitution, it protects individual rights."],
  ["Which statewide officers do Colorado voters elect besides the governor and lieutenant governor?", "the attorney general, secretary of state and treasurer", ["the chief justice and sheriff", "the mayor and city clerk"], "Five executive officers are elected statewide."],
  ["The governor and lieutenant governor of Colorado are elected…", "together on one ticket", ["in different years", "by the General Assembly"], "They run as a team, like the President and Vice President."],
  ["A Colorado governor may serve…", "two four-year terms in a row", ["one six-year term", "unlimited two-year terms"], "Term limits apply to statewide offices."],
  ["Colorado's secretary of state oversees…", "elections and business filings", ["the state courts", "the state police"], "The office also keeps official records."],
  ["How many members serve in the Colorado General Assembly?", "100", ["177", "435"], "35 senators and 65 representatives."],
  ["Colorado state senators serve terms of…", "four years", ["two years", "six years"], "Representatives serve two-year terms."],
  ["Colorado legislators are limited to…", "eight years in a row in each house", ["one term", "no limit at all"], "Voters added term limits in 1990."],
  ["The regular session of the General Assembly lasts at most…", "120 days", ["30 days", "a full year"], "It begins in January."],
  ["To override a governor's veto, the General Assembly needs…", "a two-thirds vote in each house", ["a simple majority in one house", "the Supreme Court's approval"], "Overrides are hard on purpose."],
  ["A line-item veto lets the Colorado governor…", "reject single items in a spending bill", ["write a new law alone", "cancel an election"], "It applies to appropriation bills."],
  ["How many justices sit on the Colorado Supreme Court?", "7", ["9", "5"], "It is the state's highest court."],
  ["Colorado Supreme Court justices are first chosen by…", "the governor from a list made by a nominating commission", ["voters in a party primary", "the US President"], "Then they face retention elections."],
  ["In a judicial retention election, voters decide…", "whether a judge stays in office", ["who runs for governor", "how much tax to pay"], "Judges do not run against an opponent."],
  ["Colorado citizens can put a new law or constitutional amendment on the ballot by…", "gathering enough petition signatures", ["writing to the governor", "asking a judge"], "This is the initiative."],
  ["Since 2016, a citizen-proposed amendment to the Colorado Constitution needs…", "55 percent of the vote", ["a simple majority", "the governor's signature"], "Voters raised the bar in Amendment 71."],
  ["The Taxpayer's Bill of Rights (TABOR) requires…", "voter approval for new state and local taxes", ["no taxes at all", "the President's approval of state taxes"], "It also limits how fast state revenue can grow."],
  ["Colorado voters can remove an elected official before the term ends by…", "a recall election", ["an executive order", "a court summons"], "It starts with a petition."],
  ["Home rule lets Colorado cities…", "write their own charters and local laws", ["ignore the US Constitution", "print their own money"], "Denver is a home rule city and county."],
  ["How many electoral votes does Colorado have in presidential elections?", "10", ["8", "2"], "8 House seats plus 2 senators."],
  ["Every registered voter in Colorado…", "is mailed a ballot", ["must vote in person only", "votes only every 10 years"], "Voters can also vote in person."],
  ["In Colorado, a 17-year-old may vote in a primary if they will…", "be 18 by the general election", ["turn 17 that day", "pass a test"], "Pre-registration starts at 16."],
  ["The Southern Ute Indian Tribe and the Ute Mountain Ute Tribe…", "are sovereign nations that work with Colorado government to government", ["are Colorado counties", "are run by the governor"], "Each has its own constitution and council."],
  ["Which power belongs to the federal government, not to Colorado?", "coining money", ["setting up school districts", "issuing driver's licenses"], "The US Constitution gives Congress that power."],
  ["Colorado's Sunshine Law requires public bodies to…", "hold their meetings in public with notice", ["meet in secret", "never vote"], "Citizens can watch local boards decide.", true],
  ["In 2013, two Colorado state senators lost their seats in…", "recall elections", ["impeachment trials", "a Supreme Court case"], "Voters used their recall power.", true],
  ["Why do some people say TABOR makes it harder to fund schools and roads?", "taxes and revenue can't grow without a vote", ["it bans all spending", "it ended state government"], "Supporters say it protects taxpayers; balance both views.", true],
  ["Which is a civic responsibility rather than a legal duty?", "voting in elections", ["paying taxes", "serving on a jury when summoned"], "Voting is voluntary but vital.", true],
  ["Why might a citizen go to a county commissioners' meeting?", "to speak about a local decision before it is made", ["to vote for President", "to change the US Constitution"], "Local government is closest to the people.", true],
];

const NATION_EXTRA: Q[] = [
  ["How many representatives does Colorado send to the US House?", "8", ["10", "2"], "Seats are divided by population after each census."],
  ["Neil Gorsuch, a US Supreme Court justice since 2017, was born in…", "Denver", ["Atlanta", "Boston"], "He also served on a federal appeals court in Denver."],
  ["Byron White, who served on the US Supreme Court from 1962 to 1993, grew up in…", "Colorado", ["Texas", "Maine"], "He was from Wellington."],
];

const FINANCE_EXTRA: Q[] = [
  ["Colorado's minimum wage goes up each year with…", "inflation", ["the price of gold", "the number of tourists"], "Voters tied it to the cost of living."],
  ["Colorado's 529 college savings program is called…", "CollegeInvest", ["Fast Lane", "Gold Coast"], "Money in a 529 plan grows for education.", true],
  ["Students who can't use the federal FAFSA may apply for Colorado aid with the…", "CASFA", ["W-2", "1040"], "The Colorado Application for State Financial Aid.", true],
];

const ECONOMICS_EXTRA: Q[] = [
  ["A drought on Colorado's wheat farms would most likely…", "raise the price of wheat", ["lower the price of wheat", "end demand for wheat"], "Supply falls, so the price tends to rise."],
  ["Seven states share the Colorado River's water under a 1922 compact. This is an example of…", "dividing a scarce resource", ["unlimited supply", "a command economy"], "Scarcity forces choices."],
  ["Colorado ranchers sell beef to other countries. That shows…", "economic interdependence", ["self-sufficiency", "a command economy"], "Countries rely on each other for goods.", true],
];

const MAINE = (id: string) => from(MAINE_9, id);

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "co-g9-governing-colorado",
    title: "Governing Colorado",
    emoji: "🗳️",
    blurb: "The 1876 constitution, the governor and local government",
    parentNote: "How Colorado governs itself within the federal system: the 1876 constitution and its Bill of Rights, the elected executive officers, the General Assembly, term limits and vetoes, the courts and retention elections, initiatives, TABOR and recall, home rule, the Ute tribes as sovereign nations, and voting in Colorado.",
    standards: ["HS.C.1.b; HS.C.1.e; HS.C.2.b; HS.C.2.c; HS.C.2.e; HS.C.2.g; HS.C.2.j; HS.C.3.a; HS.C.3.c", "civic participation, the structure of local, state and national government, amending and the founding documents of Colorado, the courts, tribal governments, and elections"],
    items: GOVERNING,
  }),
  copyOf(
    MAINE("me-g9-us-government"),
    {
      id: "co-g9-us-government",
      title: "How the Nation Governs",
      emoji: "🏛️",
      blurb: "Congress, the President, the courts and your rights",
      parentNote: "The United States government: the three articles that set up Congress, the presidency and the courts, terms and powers, checks and balances, the Bill of Rights and later amendments, landmark cases, and how the US system compares with a parliamentary one.",
      standards: ["HS.C.2.a; HS.C.2.d; HS.C.2.f; HS.C.2.i; HS.C.3.d", "the origins and principles of government, the powers and limits of the branches of government, and the rights in the Constitution, the Bill of Rights and landmark cases"],
    },
    NATION_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-personal-finance"),
    {
      id: "co-g9-personal-finance",
      title: "Money Smarts",
      emoji: "💳",
      blurb: "Pay, interest, credit and risk",
      parentNote: "Personal finance: gross and net pay, simple and compound interest, the Rule of 72, discounts, credit cards and credit scores, budgets and emergency funds, banks and credit unions, insurance, and spreading risk across investments.",
      standards: ["HS.PF.2.a; HS.PF.2.e; HS.PF.3.a; HS.PF.3.c; HS.PF.3.d; HS.PF.3.f; HS.PF.4.a; HS.PF.5.a; HS.PF.5.c", "earning income, paying for college, saving and investing, managing credit, and protecting against risk"],
    },
    FINANCE_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-economics"),
    {
      id: "co-g9-economics",
      title: "Markets & the Economy",
      emoji: "📈",
      blurb: "Supply, demand and economic indicators",
      parentNote: "Economics: supply and demand, shortages and surpluses, GDP, inflation and unemployment, the Federal Reserve and fiscal policy, specialization, comparative advantage and trade, and economic systems, with examples from Colorado.",
      standards: ["HS.E.1.a; HS.E.2.a; HS.E.2.b; HS.E.3.a; HS.E.3.b; HS.E.4.a; HS.E.4.c", "scarcity, economic systems, markets and prices, economic indicators and policy, and trade between nations"],
    },
    ECONOMICS_EXTRA,
  ),
];
