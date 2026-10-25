import type { Unit } from "../../types";
import { SOCIAL_9 as MAINE_9 } from "../../maine/units/social-g9";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Wisconsin Grade 9 social studies, civics: how Wisconsin governs itself under the 1848 constitution next to the federal
// and tribal governments (SS.PS1 to SS.PS3), plus copies of Maine's United States government, personal finance and
// economics units without their Maine items, with Wisconsin items added (SS.PS2, SS.PS3, PFL.h, SS.Econ).

const GOVERNING: Q[] = [
  ["Wisconsin's constitution was adopted in…", "1848", ["1970", "1787"], "It is the state's only constitution."],
  ["The Wisconsin Constitution's first article is its…", "Declaration of Rights", ["tax code", "list of counties"], "Like the US Constitution's Bill of Rights, it protects rights."],
  ["How many statewide executive officers do Wisconsin voters elect?", "six", ["two", "twelve"], "Governor, lieutenant governor, attorney general, secretary of state, state treasurer and state superintendent."],
  ["Wisconsin's state superintendent of public instruction…", "leads the Department of Public Instruction, which oversees public schools", ["runs the state courts", "commands the National Guard"], "The superintendent is elected in a nonpartisan April election."],
  ["In the November election, Wisconsin's governor and lieutenant governor run…", "together on one ticket", ["in different years", "without a party"], "They run as a team, like the President and Vice President."],
  ["How long is the Wisconsin governor's term?", "4 years", ["2 years", "6 years"], "Wisconsin has no term limit for governor."],
  ["How many members serve in the Wisconsin Legislature?", "132", ["100", "435"], "33 senators and 99 Assembly members."],
  ["Each Wisconsin Senate district is made up of…", "three Assembly districts", ["one county", "ten cities"], "33 × 3 = 99."],
  ["To override a governor's veto, the Wisconsin Legislature needs…", "a two-thirds vote of the members present in each house", ["a simple majority in one house", "the Supreme Court's approval"], "The same fraction Congress needs."],
  ["Wisconsin's partial veto lets the governor…", "strike parts of a spending bill and sign the rest", ["write a new law alone", "cancel an election"], "Amendments in 1990 and 2008 limited it."],
  ["How many justices sit on the Wisconsin Supreme Court?", "7", ["9", "5"], "They are elected statewide."],
  ["Wisconsin Supreme Court justices serve terms of…", "10 years", ["2 years", "for life"], "Their elections are nonpartisan and held in April."],
  ["To amend the Wisconsin Constitution, a proposal must…", "pass two Legislatures in a row, then win a statewide vote", ["be signed by the governor only", "be approved by the US Congress"], "Wisconsin has no citizen initiative for amendments."],
  ["Wisconsin voters can remove an elected official before the term ends through a…", "recall election", ["veto", "pardon"], "A petition must be signed by many voters first."],
  ["In 2012, Wisconsin's governor became the first US governor to…", "survive a recall election", ["be removed by recall", "serve three terms at once"], "Voters chose to keep him in office."],
  ["In 1904, Wisconsin became the first state to choose party candidates by…", "a statewide direct primary election", ["a lottery", "party bosses alone"], "Robert La Follette pushed for it."],
  ["Wisconsin's state income tax is…", "graduated, with higher rates on higher incomes", ["a single flat rate for everyone", "zero"], "It has several brackets."],
  ["Wisconsin's local governments include…", "counties, cities, villages, towns and school districts", ["only counties", "only cities"], "There are 72 counties."],
  ["How many electoral votes does Wisconsin have in presidential elections?", "10", ["8", "2"], "8 House seats plus 2 senators."],
  ["Wisconsin lets eligible people register to vote…", "on Election Day at their polling place", ["only a year before", "only by mail"], "This is same-day registration."],
  ["To vote in Wisconsin, most voters must show…", "a photo ID", ["a birth certificate", "a passport only"], "A driver's license or state ID card works."],
  ["Wisconsin's eleven tribal nations are…", "sovereign governments with their own laws", ["counties of the state", "branches of the Legislature"], "Wisconsin works with them government to government."],
  ["Before graduating, Wisconsin students must answer at least 65 of 100 questions correctly on a test based on…", "the US citizenship civics test", ["the state driving test", "the times tables"], "State law requires it (Wis. Stat. 118.33)."],
  ["Which power belongs to the federal government, not to Wisconsin?", "coining money", ["setting up school districts", "issuing driver's licenses"], "The US Constitution gives Congress that power."],
  ["Wisconsin's open meetings law requires government bodies to…", "meet in public with notice", ["meet in secret", "never vote"], "Citizens can watch local boards decide.", true],
  ["Why does the Wisconsin Constitution make amendments pass two Legislatures and the voters?", "so big changes need wide, lasting support", ["so judges can change it alone", "because it expires"], "Constitutions are meant to be hard to change.", true],
  ["Why might a candidate for the Wisconsin Supreme Court be called nonpartisan?", "they are not listed with a political party on the ballot", ["they have no opinions", "they are appointed by the President"], "Spring elections in Wisconsin are nonpartisan.", true],
  ["Which is a civic responsibility rather than a legal duty?", "voting in elections", ["paying taxes", "serving on a jury when summoned"], "Voting is voluntary but vital.", true],
  ["Why might a citizen go to a county board meeting?", "to speak about a local decision before it is made", ["to vote for President", "to change the US Constitution"], "Local government is closest to the people.", true],
  ["Which is an example of a state and a tribal nation working together?", "an agreement on managing fish and wildlife in ceded lands", ["the state appointing tribal leaders", "a tribe running the state's courts"], "Treaty rights and sovereignty shape these agreements.", true],
];

const NATION_EXTRA: Q[] = [
  ["How many representatives does Wisconsin send to the US House?", "8", ["10", "2"], "Seats are divided by population after each census."],
  ["Robert La Follette of Wisconsin ran for President in 1924 for the…", "Progressive Party", ["Whig Party", "Federalist Party"], "He won Wisconsin's electoral votes."],
  ["The Republican Party, one of the two major parties, began at meetings including one in…", "Ripon, Wisconsin, in 1854", ["Boston in 1776", "Madison in 1948"], "Opponents of spreading slavery organized it."],
];

const FINANCE_EXTRA: Q[] = [
  ["Wisconsin's minimum wage for most adult workers is…", "$7.25 an hour, the same as the federal minimum", ["$20 an hour", "$1 an hour"], "Some cities and employers pay more."],
  ["Wisconsin's college savings plan, a 529 plan, is called…", "Edvest", ["Fast Lane", "Gold Coast"], "Money in a 529 plan grows for education.", true],
  ["A 2023 Wisconsin law requires high school students to earn a half credit in…", "personal financial literacy", ["only sports", "only grammar"], "It starts with students graduating in 2028.", true],
];

const ECONOMICS_EXTRA: Q[] = [
  ["If Wisconsin's dairy farms produce much more milk than buyers want, the price of milk will most likely…", "fall", ["rise", "stay the same no matter what"], "A surplus pushes prices down."],
  ["Wisconsin produces more cheese than any other state. Specializing in cheese helps it…", "trade with other states for goods it makes less of", ["avoid all trade", "stop growing other crops by law"], "Specialization leads to trade."],
  ["Wisconsin farmers export ginseng and cheese to other countries. That shows…", "economic interdependence", ["self-sufficiency", "a command economy"], "Countries rely on each other for goods.", true],
];

const MAINE = (id: string) => from(MAINE_9, id);

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "wi-g9-governing-wisconsin",
    title: "Governing Wisconsin",
    emoji: "🗳️",
    blurb: "The 1848 constitution, the governor and local government",
    parentNote: "How Wisconsin governs itself within the federal system: the 1848 constitution and its Declaration of Rights, the six elected executive officers, the Legislature and vetoes (including the partial veto), the elected Supreme Court, amendments and recall, local and tribal governments, voting in Wisconsin and the civics test needed to graduate.",
    standards: ["SS.PS1.a.h; SS.PS2.b.h; SS.PS3.a.h; SS.PS3.c.h", "constitutional government, the rights and responsibilities of citizens, and the structure of local, state, tribal and national government"],
    items: GOVERNING,
  }),
  copyOf(
    MAINE("me-g9-us-government"),
    {
      id: "wi-g9-us-government",
      title: "How the Nation Governs",
      emoji: "🏛️",
      blurb: "Congress, the President, the courts and your rights",
      parentNote: "The United States government: the three articles that set up Congress, the presidency and the courts, terms and powers, checks and balances, the Bill of Rights and later amendments, landmark cases, and how the US system compares with a parliamentary one.",
      standards: ["SS.PS2.a.h; SS.PS2.c.h; SS.PS3.c.h", "the powers and limits of the branches of government, and the rights in the Constitution, the Bill of Rights and landmark cases"],
    },
    NATION_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-personal-finance"),
    {
      id: "wi-g9-personal-finance",
      title: "Money Smarts",
      emoji: "💳",
      blurb: "Pay, interest, credit and risk",
      parentNote: "Personal finance: gross and net pay, simple and compound interest, the Rule of 72, discounts, credit cards and credit scores, budgets and emergency funds, banks and credit unions, insurance, and spreading risk across investments.",
      standards: ["PFL.h.EE.1.a.1; PFL.h.SI.2.d.1; PFL.h.CD.1.c.1; PFL.h.RMI.2.b.1", "earning income, saving and investing, managing credit, and protecting against risk"],
    },
    FINANCE_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-economics"),
    {
      id: "wi-g9-economics",
      title: "Markets & the Economy",
      emoji: "📈",
      blurb: "Supply, demand and economic indicators",
      parentNote: "Economics: supply and demand, shortages and surpluses, GDP, inflation and unemployment, the Federal Reserve and fiscal policy, specialization, comparative advantage and trade, and economic systems, with examples from Wisconsin.",
      standards: ["SS.Econ2.b.h; SS.Econ3.c.h; SS.Econ4.b.h; SS.Econ4.e.h", "markets and prices, economic indicators and policy, and trade between nations"],
    },
    ECONOMICS_EXTRA,
  ),
];
