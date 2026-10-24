import type { Unit } from "../../types";
import { SOCIAL_9 as MAINE_9 } from "../../maine/units/social-g9";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// New Jersey Grade 9 social studies, civics: how New Jersey governs itself under its three constitutions, and how its
// 1947 constitution, courts and laws worked to end segregation (6.1.12.CivicsPI.2.a, 6.1.12.CivicsPI.13.a,
// 6.1.12.CivicsPI.14.a), plus copies of Maine's United States government, personal finance and economics units without
// their Maine items, with New Jersey items added (6.1.12.CivicsPR.2.a and CivicsPI.14.b and 14.c; 9.1.12; 6.1.12.EconNE.9).

const GOVERNING: Q[] = [
  ["New Jersey has had how many state constitutions?", "three", ["one", "seven"], "They were adopted in 1776, 1844 and 1947."],
  ["Under New Jersey's 1776 constitution, the governor was chosen by…", "the legislature", ["the voters directly", "the king"], "The 1844 constitution let voters elect the governor."],
  ["Under the 1776 constitution, some women and free Black men could vote because it allowed…", "all inhabitants who owned enough property", ["only white men", "only soldiers"], "A law ended this in 1807."],
  ["New Jersey's current constitution was adopted in…", "1947", ["1776", "1970"], "Voters approved it after a convention in New Brunswick."],
  ["The 1947 constitution made New Jersey's governor stronger by…", "giving a four-year term and broad appointment powers", ["removing the veto", "ending elections"], "Earlier governors had shorter terms."],
  ["New Jersey voters elect only two statewide executive officials:", "the governor and lieutenant governor", ["the governor and attorney general", "six officers"], "The governor appoints the attorney general and secretary of state."],
  ["A New Jersey governor may serve…", "two terms in a row", ["unlimited terms in a row", "one term only for life"], "After a break, a governor may run again."],
  ["The office of lieutenant governor was first filled in…", "2010", ["1776", "1947"], "Voters approved creating it in 2005."],
  ["How many legislative districts does New Jersey have?", "40", ["21", "100"], "Each elects one senator and two Assembly members."],
  ["Members of the General Assembly serve terms of…", "two years", ["six years", "life"], "Senators usually serve four years."],
  ["To override a governor's veto, the Legislature needs…", "a two-thirds vote of each house", ["a simple majority of one house", "a court's approval"], "This is a check on the executive."],
  ["A line-item veto lets the governor…", "cut single spending items from the budget", ["write a new law alone", "cancel an election"], "Many governors have this power."],
  ["A conditional veto lets the governor…", "return a bill with changes that would earn a signature", ["fire a lawmaker", "change the constitution alone"], "The Legislature may accept the changes."],
  ["New Jersey Supreme Court justices are…", "appointed by the governor with the Senate's consent", ["elected by voters", "chosen by the US President"], "After seven years, a justice may be given tenure until age 70."],
  ["The 1947 constitution was one of the first state constitutions to ban…", "segregation in public schools", ["all taxes", "elections for governor"], "It also banned segregation in the state militia."],
  ["In the 1944 case Hedgepeth and Williams v. Trenton Board of Education, the court ruled that…", "a school could not turn away Black students because of race", ["segregated schools were fair", "only Trenton had schools"], "It came ten years before Brown v. Board of Education."],
  ["New Jersey's Law Against Discrimination, first passed in 1945, bans discrimination in…", "jobs, housing and public places", ["only sports", "nothing at all"], "A state division enforces it."],
  ["In the Abbott v. Burke cases, New Jersey's Supreme Court required more state aid for…", "schools in poorer urban districts", ["private schools only", "colleges in other states"], "The constitution promises a thorough and efficient education."],
  ["The Mount Laurel decisions require New Jersey towns to…", "allow their fair share of affordable housing", ["ban new homes", "stop collecting taxes"], "Zoning cannot shut out families with low incomes."],
  ["New Jersey elects its governor in…", "odd-numbered years, like 2025", ["presidential election years", "every two years"], "Only New Jersey and Virginia hold governor races the year after a presidential election."],
  ["How can New Jersey's constitution be amended?", "the Legislature proposes and the voters approve", ["the governor signs a decree", "citizens petition without the Legislature"], "New Jersey has no statewide citizen initiative."],
  ["New Jersey's 21 counties are led by…", "boards of county commissioners", ["kings", "the Supreme Court"], "Before 2021 they were called freeholders."],
  ["How many electoral votes does New Jersey have in presidential elections?", "14", ["12", "40"], "12 House seats plus 2 senators."],
  ["Federalism means…", "power is divided between the national and state governments", ["all power belongs to the states", "all power belongs to the President"], "New Jersey and the United States each have a constitution."],
  ["Which power belongs to the federal government, not to New Jersey?", "coining money", ["setting up school districts", "issuing driver's licenses"], "The US Constitution gives Congress that power."],
  ["Why did the authors of the 1776 constitution keep the governor weak?", "they feared power like the king's", ["they wanted a king", "they forgot to add a governor"], "Colonists distrusted royal governors.", true],
  ["Why might the 1947 constitution's ban on school segregation matter for the whole country?", "it showed a state outlawing segregation before Brown v. Board", ["it ended segregation everywhere at once", "it was never enforced anywhere"], "Laws and courts in New Jersey came before the national ruling.", true],
  ["Why do the Abbott decisions remain debated?", "people disagree about how to fund schools fairly", ["they ended public schools", "everyone agrees on taxes"], "School funding mixes fairness and cost.", true],
  ["Which is a civic responsibility rather than a legal duty?", "voting in elections", ["paying taxes", "serving on a jury when summoned"], "Voting is voluntary but vital.", true],
  ["Why might a citizen go to a town council meeting?", "to speak about a local decision before it is made", ["to vote for President", "to change the US Constitution"], "Local government is closest to the people.", true],
];

const NATION_EXTRA: Q[] = [
  ["How many representatives does New Jersey send to the US House?", "12", ["14", "2"], "Seats are divided by population after each census."],
  ["Which New Jersey governor became the 28th President?", "Woodrow Wilson", ["Grover Cleveland", "Abraham Lincoln"], "He had been president of Princeton University."],
  ["Supreme Court justices Antonin Scalia and Samuel Alito were both born in…", "Trenton, New Jersey", ["Boston", "Chicago"], "Justice William Brennan was also from New Jersey.", true],
];

const FINANCE_EXTRA: Q[] = [
  ["New Jersey high school students must earn credits in…", "financial, economic, business and entrepreneurial literacy", ["only sports", "only grammar"], "It is part of the state's graduation requirements."],
  ["New Jersey's college savings plan, a 529 plan, is called…", "NJBEST", ["Fast Lane", "Gold Coast"], "Money in a 529 plan grows for education.", true],
  ["A 2019 New Jersey law requires financial literacy lessons in…", "grades 6 through 8", ["kindergarten only", "college only"], "Students learn budgeting, saving, credit and debt.", true],
];

const ECONOMICS_EXTRA: Q[] = [
  ["A shipping slowdown at the Port of New York and New Jersey would most likely…", "raise the prices of imported goods in the region", ["lower all prices", "end demand for goods"], "Supply falls, so prices tend to rise."],
  ["Many medicine companies in New Jersey sell their products around the world. That shows…", "economic interdependence", ["self-sufficiency", "a command economy"], "Countries rely on each other for goods."],
  ["New Jersey's beach towns earn most of their money in summer. That is an example of…", "seasonal demand", ["inflation", "a monopoly"], "Demand rises and falls with the seasons.", true],
];

const MAINE = (id: string) => from(MAINE_9, id);

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "nj-g9-governing-new-jersey",
    title: "Governing New Jersey",
    emoji: "🗳️",
    blurb: "Three constitutions, a strong governor and the courts",
    parentNote: "How New Jersey governs itself within the federal system: the 1776, 1844 and 1947 constitutions, the strong governor and lieutenant governor, the Legislature and vetoes, the appointed Supreme Court, the 1947 ban on school segregation, Hedgepeth and Williams, the Law Against Discrimination, the Abbott and Mount Laurel decisions, amendments, counties and elections.",
    standards: ["6.1.12.CivicsPI.2.a; 6.1.12.CivicsPI.13.a; 6.1.12.CivicsPI.14.a", "New Jersey's 1776 and 1947 constitutions, how its constitution, courts and laws worked to end segregation, and how officials are elected"],
    items: GOVERNING,
  }),
  copyOf(
    MAINE("me-g9-us-government"),
    {
      id: "nj-g9-us-government",
      title: "How the Nation Governs",
      emoji: "🏛️",
      blurb: "Congress, the President, the courts and your rights",
      parentNote: "The United States government: the three articles that set up Congress, the presidency and the courts, terms and powers, checks and balances, judicial review, the Bill of Rights and later amendments, landmark cases, and how the US system compares with a parliamentary one.",
      standards: ["6.1.12.CivicsPR.2.a; 6.1.12.CivicsPI.14.b; 6.1.12.CivicsPI.14.c", "judicial review, checks and balances among the branches, and how the Supreme Court has defined and expanded individual rights"],
    },
    NATION_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-personal-finance"),
    {
      id: "nj-g9-personal-finance",
      title: "Money Smarts",
      emoji: "💳",
      blurb: "Pay, interest, credit and risk",
      parentNote: "Personal finance: gross and net pay, simple and compound interest, the Rule of 72, discounts, credit cards and credit scores, budgets and emergency funds, banks and credit unions, insurance, and spreading risk across investments.",
      standards: ["9.1.12.PB.1; 9.1.12.CDM.8; 9.1.12.CP.3; 9.1.12.RM.3", "saving and investing, interest, credit ratings, and comparing insurance"],
    },
    FINANCE_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-economics"),
    {
      id: "nj-g9-economics",
      title: "Markets & the Economy",
      emoji: "📈",
      blurb: "Supply, demand and economic indicators",
      parentNote: "Economics: supply and demand, shortages and surpluses, GDP, inflation and unemployment, the Federal Reserve and fiscal policy, specialization, comparative advantage and trade, and economic systems, with examples from New Jersey.",
      standards: ["6.1.12.EconNE.9.a; 6.1.12.EconNE.9.c; 6.1.12.EconNE.9.d", "economic indicators, how government adjusts taxes, interest rates and spending, and how the parts of a market economy depend on each other"],
    },
    ECONOMICS_EXTRA,
  ),
];
