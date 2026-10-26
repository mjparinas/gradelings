import type { Unit } from "../../types";
import { SOCIAL_9 as MAINE_9 } from "../../maine/units/social-g9";
import { UNITS as MINNESOTA_9 } from "../../minnesota/units/social-g9";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Kansas Grade 9 social studies, the high school Government of the United States course: how Kansas governs itself
// under its 1859 Wyandotte Constitution, compared with the US Constitution, with state, local and Tribal governments and
// its taxes (benchmarks 2.1 to 2.3 and 5.1 to 5.3), plus copies of Maine's United States government, personal finance and
// economics units and Minnesota's supply and demand unit without their state's items, with Kansas items added.

const GOVERNING: Q[] = [
  ["Kansas's constitution, still in force today with many amendments, was written in 1859 at…", "Wyandotte", ["Lecompton", "Philadelphia", "Dodge City"], "It is called the Wyandotte Constitution."],
  ["Kansas's constitution has been in force since Kansas became a state in…", "1861", ["1776", "1912", "1954"], "Kansas joined the Union on January 29, 1861."],
  ["The Kansas Legislature is made up of the Senate and the…", "House of Representatives", ["Assembly", "Grand Council", "Parliament"], "Both houses meet in the capitol in Topeka."],
  ["The Kansas Senate has 40 members. The Kansas House of Representatives has…", "125 members", ["40 members", "435 members", "105 members"], "House districts are smaller than Senate districts."],
  ["Kansas state senators serve four-year terms. Members of the Kansas House serve…", "two-year terms", ["six-year terms", "life terms", "one-year terms"], "The whole House is elected every two years."],
  ["The Kansas Legislature begins its regular session each year in…", "January", ["July", "October", "December"], "Sessions are held every year in Topeka."],
  ["Kansas's chief executive is the…", "governor", ["chief justice", "speaker of the House", "secretary of state"], "The governor is elected for four years."],
  ["Which statewide officer runs Kansas's elections?", "the secretary of state", ["the attorney general", "the lieutenant governor", "the treasurer"], "The office also registers businesses."],
  ["Which statewide officer is Kansas's chief lawyer?", "the attorney general", ["the governor", "the secretary of state", "the treasurer"], "The attorney general represents the state in court."],
  ["Kansas's highest court is the…", "Kansas Supreme Court", ["Court of Claims", "Legislature", "county court"], "It has seven justices and sits in Topeka."],
  ["When the governor of Kansas vetoes a bill, the Legislature can pass it anyway with a vote of…", "two-thirds of each house", ["one member", "the Supreme Court", "half of one house"], "This is a check on the governor."],
  ["Kansas is divided into how many counties?", "105", ["50", "16", "254"], "Each county has a county seat."],
  ["Most Kansas counties are run by an elected…", "board of county commissioners", ["king", "Supreme Court", "school board"], "Commissioners set county budgets."],
  ["Kansas's public schools are overseen by an elected…", "State Board of Education", ["Supreme Court", "county sheriff", "city council"], "Its 10 members are chosen by voters in districts."],
  ["Four Native nations have reservations in Kansas. Tribal nations are sovereign, which means they…", "govern themselves and make many of their own laws", ["have no government", "are run by the county", "are part of the state Legislature"], "Tribes deal with the United States government to government."],
  ["The US Constitution recognizes Tribal nations by giving Congress the power to…", "regulate commerce with the Indian tribes", ["elect Tribal leaders", "abolish Tribes", "tax Tribes as states"], "This is in Article I."],
  ["Much of the state of Kansas's money comes from…", "income taxes and sales taxes", ["tariffs on imports", "selling public land each year", "fees for library cards"], "Both individuals and businesses pay."],
  ["Kansas local governments and school districts get much of their money from…", "property taxes", ["tariffs", "selling stamps", "federal judges"], "Property taxes are based on what land and buildings are worth."],
  ["To change the Kansas Constitution, an amendment must first pass the Legislature and then be approved by…", "Kansas voters", ["the President", "the US Supreme Court", "the governor alone"], "Two-thirds of each house must vote to send it to voters."],
  ["Unlike some states, Kansas does not let citizens put a new law on the ballot by…", "gathering signatures for an initiative", ["voting for the governor", "electing legislators", "writing to their senator"], "In Kansas, the Legislature proposes laws and amendments."],
  ["A recall election lets Kansas voters…", "remove an elected official before the term ends", ["choose a new state bird", "elect the President directly", "skip an election"], "Recall needs a petition with a stated reason first.", true],
  ["How is the Kansas Constitution like the US Constitution?", "both separate power among three branches", ["both were written in 1787", "neither can be amended", "both create a king"], "Separation of powers is a shared principle.", true],
  ["How is the Kansas Constitution different from the US Constitution?", "it includes articles on topics like schools and counties", ["it has no rights", "it creates no courts", "it has no governor"], "State constitutions often cover more details.", true],
  ["The Kansas Bill of Rights, at the start of the state constitution, was written to make Kansas a free state by saying there shall be no…", "slavery", ["schools", "elections", "taxes"], "It was written during Bleeding Kansas.", true],
  ["Why might a citizen speak at a county commission or city council meeting in Kansas?", "to share a view before a local decision is made", ["to vote for President", "to change the US Constitution", "to elect the Supreme Court"], "Local government is closest to the people.", true],
  ["The falling water level of the Ogallala Aquifer is a major current issue in western Kansas because…", "farms and towns pump more water than rain puts back", ["the aquifer is filling too fast", "no one uses groundwater", "it is only in Topeka"], "Groundwater districts help set limits.", true],
  ["Why does Kansas's Legislature have more House members than senators?", "House districts are smaller, so each member represents fewer people", ["senators are not elected", "the House meets only once", "senators come from other states"], "Both houses are divided by population.", true],
];

const NATION_EXTRA: Q[] = [
  ["After the 2020 census, Kansas has how many seats in the US House of Representatives?", "4", ["2", "40", "125"], "Seats are divided by population after each census."],
  ["Kansas has how many electoral votes for President?", "6", ["2", "4", "40"], "Its House seats plus its two senators."],
  ["Like every state, Kansas sends how many senators to the US Senate?", "2", ["4", "40", "125"], "Each state has equal votes in the Senate.", true],
];

const FINANCE_EXTRA: Q[] = [
  ["A Kansas worker's paycheck usually has both federal and… income tax taken out.", "Kansas state", ["city of Paris", "no other", "Canadian"], "Kansas has a state income tax."],
  ["The Kansas Promise Scholarship helps eligible Kansas students pay for…", "certain programs at Kansas community and technical colleges", ["a new car", "a house", "a vacation"], "It covers programs in fields Kansas needs.", true],
  ["Because Kansas adds sales tax to most purchases, a Kansas family's budget should plan for…", "sales tax on top of the price of many items", ["no taxes at all", "taxes only on cars", "a tax refund every week"], "Local sales tax rates differ by city and county.", true],
];

const ECONOMICS_EXTRA: Q[] = [
  ["When airplane makers in Wichita get fewer orders, Wichita's economy…", "slows down and may lose jobs", ["grows faster", "is not affected", "gets more rain"], "A specialized economy is hit hard when demand falls."],
  ["Kansas grows more wheat than almost any other state. This is an example of…", "specialization based on soil and climate", ["a traditional economy", "barter only", "a command economy"], "Places specialize in what their land offers."],
  ["Much Kansas wheat is sold to other countries, so world wheat prices…", "affect how much Kansas farmers earn", ["never matter in Kansas", "only matter in Topeka", "are set by the governor"], "Global markets reach local farms.", true],
];

const SUPPLY_EXTRA: Q[] = [
  ["When Kansas has a huge wheat harvest and demand stays the same, the price of wheat tends to…", "fall", ["rise", "double", "stop existing"], "More supply at the same demand."],
  ["When many people move to the Kansas City suburbs and few new homes are built, home prices tend to…", "rise", ["fall", "stay at zero", "disappear"], "Demand rises while supply stays about the same."],
  ["If the price of gasoline rises, demand for fuel-efficient cars tends to…", "rise", ["fall", "stay the same forever", "vanish"], "Related goods affect each other.", true],
];

const MAINE = (id: string) => from(MAINE_9, id);

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "ks-g9-governing-kansas",
    title: "Governing Kansas",
    emoji: "🗳️",
    blurb: "The Wyandotte Constitution, Topeka and local government",
    parentNote: "How Kansas governs itself within the federal system: the 1859 Wyandotte Constitution compared with the US Constitution, the Legislature and its yearly sessions, the governor and statewide officers, the Supreme Court, vetoes, the 105 counties and the State Board of Education, Tribal sovereignty, income, sales and property taxes, how amendments and recalls work, and current issues such as the Ogallala Aquifer.",
    standards: ["2.1; 2.2; 2.3; 5.1; 5.2", "the rights and responsibilities of citizens, the US and Kansas constitutions compared, the powers of local, state and Tribal governments, and current issues in Kansas"],
    items: GOVERNING,
  }),
  copyOf(
    MAINE("me-g9-us-government"),
    {
      id: "ks-g9-us-government",
      title: "How the Nation Governs",
      emoji: "🏛️",
      blurb: "Congress, the President, the courts and your rights",
      parentNote: "The United States government: the three articles that set up Congress, the presidency and the courts, terms and powers, checks and balances, the Bill of Rights and later amendments, landmark cases, and how the US system compares with a parliamentary one.",
      standards: ["2.1; 2.2; 5.1", "the three branches, checks and balances and separation of powers, how laws are made, the justice system and due process, and other models of government"],
    },
    NATION_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-personal-finance"),
    {
      id: "ks-g9-personal-finance",
      title: "Money Smarts",
      emoji: "💳",
      blurb: "Pay, interest, credit and risk",
      parentNote: "Personal finance: gross and net pay, simple and compound interest, the Rule of 72, discounts, credit cards and credit scores, budgets and emergency funds, banks and credit unions, insurance, and spreading risk across investments.",
      standards: ["1.1; 1.2; 1.3", "choices and consequences in personal finance: financial plans and saving, credit and debt, loans and interest, investing, and insurance"],
    },
    FINANCE_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-economics"),
    {
      id: "ks-g9-economics",
      title: "Markets & the Economy",
      emoji: "📈",
      blurb: "GDP, inflation, the Fed and trade",
      parentNote: "Economics: GDP, inflation and unemployment, the Federal Reserve and fiscal policy, specialization, comparative advantage and trade, and economic systems, with examples from Kansas.",
      standards: ["5.1; 5.2; 5.3", "economic indicators, government policy and the money supply, how national and global issues affect Kansas's economy, and international trade"],
    },
    ECONOMICS_EXTRA,
  ),
  copyOf(
    from(MINNESOTA_9, "mn-g9-supply-demand"),
    {
      id: "ks-g9-supply-demand",
      title: "Supply & Demand",
      emoji: "⚖️",
      blurb: "How buyers and sellers set prices",
      parentNote: "Supply and demand: how prices change when buyers and sellers interact, equilibrium, shortages and surpluses, price ceilings and floors, and how scarcity and incentives shape choices, with examples from Kansas.",
      standards: ["1.1; 1.2; 5.2", "what shapes production and distribution in a market, how supply and demand change prices, and judging government policies by costs and benefits"],
    },
    SUPPLY_EXTRA,
  ),
];
