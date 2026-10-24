import type { Unit } from "../../types";
import { SOCIAL_9 as MAINE_9 } from "../../maine/units/social-g9";
import { UNITS as MINNESOTA_9 } from "../../minnesota/units/social-g9";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Michigan Grade 9 social studies, the high school civics and economics courses Michigan requires for graduation: how
// Michigan governs itself under its 1963 constitution, with state, local and Tribal governments (C3.2.3, C3.2.4, C3.2.5,
// C3.2.6), plus copies of Maine's United States government, personal finance and economics units and Minnesota's
// supply and demand unit without their state's items, with Michigan items added.

const GOVERNING: Q[] = [
  ["Michigan has had four constitutions. The one in force today was adopted in…", "1963", ["1776", "1837", "2001"], "It replaced the constitution of 1908."],
  ["Michigan's lawmaking body is the Legislature, made up of the Senate and the…", "House of Representatives", ["General Assembly", "Grand Council", "Parliament"], "Both houses meet in the Capitol in Lansing."],
  ["The Michigan Senate has 38 members. The Michigan House of Representatives has…", "110 members", ["38 members", "435 members", "50 members"], "House districts are smaller than Senate districts."],
  ["Michigan state senators serve four-year terms. State representatives serve…", "two-year terms", ["six-year terms", "life terms", "one-year terms"], "The whole House is elected every two years."],
  ["Michigan's chief executive is the…", "governor", ["chief justice", "speaker of the House", "secretary of state"], "The governor is elected for four years."],
  ["Which statewide officer runs Michigan's elections and issues driver's licenses?", "the secretary of state", ["the attorney general", "the lieutenant governor", "the treasurer"], "Many people visit a Secretary of State office."],
  ["Which statewide officer is Michigan's chief lawyer?", "the attorney general", ["the governor", "the secretary of state", "the lieutenant governor"], "The attorney general represents the state in court."],
  ["Michigan's highest court is the…", "Michigan Supreme Court", ["Court of Claims", "Legislature", "county court"], "It has seven justices."],
  ["Michigan Supreme Court justices are chosen by…", "voters, for eight-year terms", ["the President, for life", "the Legislature, every year", "a coin toss"], "Parties nominate them, but they appear on the nonpartisan ballot."],
  ["When the governor vetoes a bill, the Legislature can pass it anyway with a vote of…", "two-thirds of each house", ["one member", "the Supreme Court", "half of one house"], "This is a check on the governor."],
  ["Michigan's capital, where the Legislature meets, is…", "Lansing", ["Detroit", "Grand Rapids", "Ann Arbor"], "It became the capital in 1847."],
  ["Michigan has how many counties?", "83", ["50", "100", "12"], "Each county has a county seat."],
  ["Most Michigan counties are run by an elected…", "board of commissioners", ["king", "Supreme Court", "school board"], "Voters elect commissioners by district."],
  ["A Michigan township is run by a board that includes a supervisor, a clerk and a…", "treasurer", ["general", "senator", "judge"], "Townships serve areas outside many cities."],
  ["How many federally recognized Tribes are in Michigan?", "12", ["1", "50", "83"], "Each has its own government."],
  ["Tribal nations in Michigan are sovereign. This means they…", "govern themselves and make many of their own laws", ["have no government", "are run by the county", "are part of Canada"], "Tribes deal with the United States government to government."],
  ["Treaties between Tribes and the United States…", "are still the law and protect rights such as fishing", ["were only promises with no force", "ended in 1900", "were about sports"], "Some Michigan Tribes manage Great Lakes fisheries under treaty rights."],
  ["Michigan's state government gets much of its money from…", "income and sales taxes", ["selling the Great Lakes", "fines on tourists only", "the United Nations"], "Michigan has a 6 percent sales tax."],
  ["Local governments in Michigan get much of their money from…", "property taxes", ["tariffs", "selling stamps", "federal judges"], "Homeowners and businesses pay them."],
  ["In Michigan, citizens can put a proposed law or constitutional amendment on the ballot by…", "gathering enough voter signatures for an initiative", ["asking the President", "writing to the Supreme Court", "voting in a poll online"], "Many ballot proposals start this way.", true],
  ["A recall election lets Michigan voters…", "remove an elected official before the term ends", ["choose a new state bird", "elect the President directly", "skip an election"], "Recall needs a petition first.", true],
  ["A referendum lets Michigan voters…", "approve or reject a law the Legislature passed", ["elect judges for life", "change the US Constitution", "end a Tribe's government"], "Voters gather signatures to put a law on the ballot.", true],
  ["Since a 2018 ballot proposal, Michigan's legislative and congressional maps are drawn by…", "an independent citizens redistricting commission", ["the governor alone", "the political parties alone", "the US Supreme Court"], "It has 13 members chosen from voters.", true],
  ["Since 2018, Michigan citizens may register to vote…", "up to and on Election Day", ["only once in their lives", "only in Lansing", "only after the election"], "Voters approved same-day registration.", true],
  ["How is the Michigan Constitution like the US Constitution?", "both separate power among three branches", ["both were written in 1787", "neither can be amended", "both create a king"], "Separation of powers is a shared principle.", true],
  ["How is the Michigan Constitution different from the US Constitution?", "it is much longer and voters can amend it directly", ["it has no rights", "it creates no courts", "it has no governor"], "Michigan voters often decide amendments.", true],
  ["Why might a citizen speak at a township board or city council meeting?", "to share a view before a local decision is made", ["to vote for President", "to change the US Constitution", "to elect the Supreme Court"], "Local government is closest to the people.", true],
];

const NATION_EXTRA: Q[] = [
  ["After the 2020 census, Michigan has how many seats in the US House of Representatives?", "13", ["2", "38", "110"], "Seats are divided by population after each census."],
  ["Gerald Ford, who grew up in Grand Rapids, is the only person who became…", "President without being elected President or Vice President", ["Chief Justice and governor", "king of Michigan", "Speaker of every state house"], "He was appointed Vice President in 1973."],
  ["Like every state, Michigan sends how many senators to the US Senate?", "2", ["13", "38", "83"], "Each state has equal votes in the Senate."],
];

const FINANCE_EXTRA: Q[] = [
  ["Michigan's sales tax on most goods is…", "6 percent", ["60 percent", "0.6 percent", "100 percent"], "It is added at the register."],
  ["Michigan's 529 college savings plan is called the…", "Michigan Education Savings Program", ["Motor City Fund", "Great Lakes Bank", "Mitten Account"], "Money in a 529 plan grows for education.", true],
  ["Michigan's state income tax charges…", "one flat rate on taxable income", ["a different rate for each county", "nothing at all", "only on tips"], "Every earner pays the same percent of taxable income.", true],
];

const ECONOMICS_EXTRA: Q[] = [
  ["A late frost that ruins Michigan's cherry blossoms would most likely…", "raise the price of cherries", ["lower the price of cherries", "end demand for cherries", "have no effect"], "Supply falls, so the price tends to rise."],
  ["Canada is Michigan's biggest trading partner. This shows…", "economic interdependence", ["self-sufficiency", "a command economy", "a traditional economy"], "The Ambassador Bridge carries a huge share of the trade."],
  ["Michigan car plants buy parts from other states and countries. This shows…", "specialization and trade", ["a traditional economy", "barter only", "a closed economy"], "Each place makes what it makes best.", true],
];

const SUPPLY_EXTRA: Q[] = [
  ["When a new car model is very popular and dealers run short, the price tends to…", "rise", ["fall", "stay at zero", "disappear"], "Demand is greater than supply."],
  ["A bumper crop of Michigan blueberries most likely…", "lowers blueberry prices", ["raises blueberry prices", "ends the market", "has no effect"], "More supply at the same demand."],
  ["If the price of gasoline rises, demand for fuel-efficient cars tends to…", "rise", ["fall", "stay the same forever", "vanish"], "Related goods affect each other.", true],
];

const MAINE = (id: string) => from(MAINE_9, id);

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "mi-g9-governing-michigan",
    title: "Governing Michigan",
    emoji: "🗳️",
    blurb: "The 1963 constitution, Lansing and local government",
    parentNote: "How Michigan governs itself within the federal system: the 1963 constitution, the Legislature, the governor and statewide officers, the elected Supreme Court, vetoes, counties and townships, state and local taxes, Michigan's 12 federally recognized Tribes and their sovereignty, and initiatives, referendums, recall and redistricting.",
    standards: ["C3.2.3; C3.2.4; C3.2.5; C3.2.6", "how state, local and Tribal governments are organized and funded, Tribal sovereignty, and initiatives, referendums and recall"],
    items: GOVERNING,
  }),
  copyOf(
    MAINE("me-g9-us-government"),
    {
      id: "mi-g9-us-government",
      title: "How the Nation Governs",
      emoji: "🏛️",
      blurb: "Congress, the President, the courts and your rights",
      parentNote: "The United States government: the three articles that set up Congress, the presidency and the courts, terms and powers, checks and balances, the Bill of Rights and later amendments, landmark cases, and how the US system compares with a parliamentary one.",
      standards: ["C3.1.1; C3.1.2; C3.1.3; C3.1.4; C1.1.3; C4.1.1; C4.2.1", "the legislative, executive and judicial branches, separation of powers and checks and balances, models of representation, and the rights the Constitution protects"],
    },
    NATION_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-personal-finance"),
    {
      id: "mi-g9-personal-finance",
      title: "Money Smarts",
      emoji: "💳",
      blurb: "Pay, interest, credit and risk",
      parentNote: "Personal finance: gross and net pay, simple and compound interest, the Rule of 72, discounts, credit cards and credit scores, budgets and emergency funds, banks and credit unions, insurance, and spreading risk across investments.",
      standards: ["E4.1.1; E4.1.2; E4.1.3; E4.1.4; E4.1.5; E4.1.6", "earning income, buying goods and services, saving, using credit, investing and protecting against financial risk"],
    },
    FINANCE_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-economics"),
    {
      id: "mi-g9-economics",
      title: "Markets & the Economy",
      emoji: "📈",
      blurb: "GDP, inflation, the Fed and trade",
      parentNote: "Economics: GDP, inflation and unemployment, the Federal Reserve and fiscal policy, specialization, comparative advantage and trade, and economic systems, with examples from Michigan.",
      standards: ["E2.1.2; E2.2.3; E2.2.4; E3.1.3; E3.2.1", "economic indicators, fiscal and monetary policy, comparing economic systems, and absolute and comparative advantage"],
    },
    ECONOMICS_EXTRA,
  ),
  copyOf(
    from(MINNESOTA_9, "mn-g9-supply-demand"),
    {
      id: "mi-g9-supply-demand",
      title: "Supply & Demand",
      emoji: "⚖️",
      blurb: "How buyers and sellers set prices",
      parentNote: "Supply and demand: how prices change when buyers and sellers interact, equilibrium, shortages and surpluses, price ceilings and floors, and how scarcity and incentives shape choices, with examples from Michigan.",
      standards: ["E1.1.1; E1.3.1; E1.3.2; E1.4.6", "scarcity and incentives, the laws of supply and demand, prices and equilibrium, and price controls"],
    },
    SUPPLY_EXTRA,
  ),
];
