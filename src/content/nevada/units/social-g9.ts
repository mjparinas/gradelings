import type { Unit } from "../../types";
import { SOCIAL_9 as MAINE_9 } from "../../maine/units/social-g9";
import { UNITS as MINNESOTA_9 } from "../../minnesota/units/social-g9";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Nevada Grade 9 social studies, the high school Civics and Economics course with financial literacy: how Nevada
// governs itself under its 1864 constitution, compared with the US Constitution, with state, local and Tribal
// governments and its taxes (SS.9-12.CE.18, SS.9-12.CE.19, SS.9-12.CE.32, SS.9-12.CE.33), plus copies of Maine's United
// States government, personal finance and economics units and Minnesota's supply and demand unit without their state's
// items, with Nevada items added.

const GOVERNING: Q[] = [
  ["Nevada's constitution, still in force today with many amendments, was adopted in…", "1864", ["1776", "1912", "1963"], "It was written the year Nevada became a state."],
  ["Nevada's constitution was sent to Washington, D.C. by…", "telegraph, in one of the longest telegrams of its time", ["Pony Express", "ship around South America", "railroad"], "Statehood was urgent before the 1864 election."],
  ["Nevada's Legislature is made up of the Senate and the…", "Assembly", ["House of Representatives", "Grand Council", "Parliament"], "Both houses meet in Carson City."],
  ["The Nevada Senate has 21 members. The Nevada Assembly has…", "42 members", ["21 members", "435 members", "100 members"], "Assembly districts are half the size of Senate districts."],
  ["Nevada state senators serve four-year terms. Members of the Assembly serve…", "two-year terms", ["six-year terms", "life terms", "one-year terms"], "The whole Assembly is elected every two years."],
  ["Nevada's Legislature holds its regular session…", "for 120 days in odd-numbered years", ["every day of every year", "once a decade", "only when the President asks"], "Special sessions can be called in between."],
  ["Nevada's chief executive is the…", "governor", ["chief justice", "speaker of the Assembly", "secretary of state"], "The governor is elected for four years and may serve two terms."],
  ["Which statewide officer runs Nevada's elections?", "the secretary of state", ["the attorney general", "the lieutenant governor", "the controller"], "The office also registers businesses."],
  ["Which statewide officer is Nevada's chief lawyer?", "the attorney general", ["the governor", "the secretary of state", "the treasurer"], "The attorney general represents the state in court."],
  ["Nevada's highest court is the…", "Nevada Supreme Court", ["Court of Claims", "Legislature", "county court"], "It has seven justices and sits in Carson City."],
  ["Nevada Supreme Court justices are chosen by…", "voters, in nonpartisan elections for six-year terms", ["the President, for life", "the Legislature, every year", "a coin toss"], "Judges run without a party label."],
  ["When the governor vetoes a bill, the Legislature can pass it anyway with a vote of…", "two-thirds of each house", ["one member", "the Supreme Court", "half of one house"], "This is a check on the governor."],
  ["Nevada is divided into 16 counties and…", "Carson City, a consolidated city and county", ["Lake Tahoe", "the Las Vegas Strip", "Hoover Dam"], "Each county has a seat of government."],
  ["Most Nevada counties are run by an elected…", "board of county commissioners", ["king", "Supreme Court", "school board"], "Clark County's commission governs the unincorporated area that includes the Strip."],
  ["Nevada has more than 20 federally recognized Tribes. Tribal nations are sovereign, which means they…", "govern themselves and make many of their own laws", ["have no government", "are run by the county", "are part of the state Legislature"], "Tribes deal with the United States government to government."],
  ["The US Constitution recognizes Tribal nations by giving Congress the power to…", "regulate commerce with the Indian tribes", ["elect Tribal leaders", "abolish Tribes", "tax Tribes as states"], "This is in Article I."],
  ["Nevada does not have a personal income tax. Much of the state's money comes from…", "sales taxes and taxes on gaming", ["income taxes", "tariffs on imports", "selling public land each year"], "Visitors pay a large share of both."],
  ["Local governments in Nevada get much of their money from…", "property taxes and a share of sales taxes", ["tariffs", "selling stamps", "federal judges"], "The state collects some taxes and shares them with counties."],
  ["In Nevada, citizens can propose a law or a constitutional amendment by…", "gathering enough voter signatures for an initiative", ["asking the President", "writing to the Supreme Court", "voting in an online poll"], "Initiatives appear on the general election ballot."],
  ["A constitutional amendment proposed by initiative in Nevada must be approved by voters…", "at two general elections in a row", ["once by the governor", "by the US Congress", "by the county commissioners"], "This makes the constitution harder to change quickly."],
  ["A recall election lets Nevada voters…", "remove an elected official before the term ends", ["choose a new state bird", "elect the President directly", "skip an election"], "Recall needs a petition first.", true],
  ["A referendum lets Nevada voters…", "approve or reject a law already passed", ["elect judges for life", "change the US Constitution", "end a Tribe's government"], "A law voters approve this way is hard for the Legislature to change.", true],
  ["How is the Nevada Constitution like the US Constitution?", "both separate power among three branches", ["both were written in 1787", "neither can be amended", "both create a king"], "Separation of powers is a shared principle.", true],
  ["How is the Nevada Constitution different from the US Constitution?", "it is longer and voters can amend it directly by initiative", ["it has no rights", "it creates no courts", "it has no governor"], "Nevada voters often decide ballot questions.", true],
  ["Nevada's constitution includes a clause written during the Civil War saying citizens owe their paramount allegiance to…", "the federal government", ["the state alone", "a foreign country", "the county"], "Nevada joined as a loyal Union state.", true],
  ["Why might a citizen speak at a county commission or city council meeting in Nevada?", "to share a view before a local decision is made", ["to vote for President", "to change the US Constitution", "to elect the Supreme Court"], "Local government is closest to the people.", true],
  ["Water from the Colorado River is a major current issue in Nevada politics because…", "drought has cut the share southern Nevada can use", ["Nevada has too much water", "no one uses the river", "the river flows only in winter"], "Lake Mead supplies most of the Las Vegas valley.", true],
];

const NATION_EXTRA: Q[] = [
  ["After the 2020 census, Nevada has how many seats in the US House of Representatives?", "4", ["2", "21", "42"], "Seats are divided by population after each census."],
  ["Nevada has how many electoral votes for President?", "6", ["2", "4", "42"], "Its House seats plus its two senators."],
  ["Like every state, Nevada sends how many senators to the US Senate?", "2", ["4", "21", "42"], "Each state has equal votes in the Senate.", true],
];

const FINANCE_EXTRA: Q[] = [
  ["A Nevada worker's paycheck has federal income tax taken out, but no state income tax, because…", "Nevada has no personal income tax", ["Nevada pays workers in silver", "taxes are paid only in Carson City", "Nevada has no sales tax"], "Nevada raises money in other ways."],
  ["The Millennium Scholarship helps Nevada high school graduates pay for…", "college in Nevada", ["a new car", "a house", "a vacation"], "Students must meet grade and course rules.", true],
  ["Because Nevada collects most of its taxes through sales, a Nevada family's budget should plan for…", "sales tax added to most purchases", ["no taxes at all", "a state income tax bill in April", "taxes only on food"], "Sales tax rates differ by county.", true],
];

const ECONOMICS_EXTRA: Q[] = [
  ["In April 2020, when travel stopped, Nevada had one of the highest unemployment rates in the nation because…", "so many jobs depend on tourism", ["it had no factories", "it had too many workers", "it raised taxes"], "A specialized economy is hit hard when demand falls."],
  ["Nevada mines most of the gold produced in the United States. This is an example of…", "specialization based on natural resources", ["a traditional economy", "barter only", "a command economy"], "Places specialize in what their land offers."],
  ["Nevada leaders try to attract technology and battery makers to…", "diversify the economy beyond tourism and gaming", ["end all tourism", "close the mines", "raise the income tax"], "A more varied economy is less risky.", true],
];

const SUPPLY_EXTRA: Q[] = [
  ["When a huge convention comes to Las Vegas, hotel room prices tend to…", "rise", ["fall", "stay at zero", "disappear"], "Demand rises while the number of rooms stays the same."],
  ["When many new homes are built in Henderson and buyers stay the same, home prices tend to…", "fall", ["rise", "double", "stop existing"], "More supply at the same demand."],
  ["If the price of gasoline rises, demand for fuel-efficient cars tends to…", "rise", ["fall", "stay the same forever", "vanish"], "Related goods affect each other.", true],
];

const MAINE = (id: string) => from(MAINE_9, id);

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "nv-g9-governing-nevada",
    title: "Governing Nevada",
    emoji: "🗳️",
    blurb: "The 1864 constitution, Carson City and local government",
    parentNote: "How Nevada governs itself within the federal system: the 1864 constitution compared with the US Constitution, the Legislature and its sessions every two years, the governor and statewide officers, the elected Supreme Court, vetoes, counties and Carson City, Tribal sovereignty, taxes without a personal income tax, initiatives, referendums and recall, and current issues such as Colorado River water.",
    standards: ["SS.9-12.CE.18; SS.9-12.CE.19; SS.9-12.CE.32; SS.9-12.CE.33", "current issues in Nevada politics, the US and Nevada constitutions compared, the powers of local, state and Tribal governments, and taxes"],
    items: GOVERNING,
  }),
  copyOf(
    MAINE("me-g9-us-government"),
    {
      id: "nv-g9-us-government",
      title: "How the Nation Governs",
      emoji: "🏛️",
      blurb: "Congress, the President, the courts and your rights",
      parentNote: "The United States government: the three articles that set up Congress, the presidency and the courts, terms and powers, checks and balances, the Bill of Rights and later amendments, landmark cases, and how the US system compares with a parliamentary one.",
      standards: ["SS.9-12.CE.27; SS.9-12.CE.28; SS.9-12.CE.29; SS.9-12.CE.36; SS.9-12.CE.37", "the three branches, checks and balances and separation of powers, how laws are made, the justice system and due process, and other models of government"],
    },
    NATION_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-personal-finance"),
    {
      id: "nv-g9-personal-finance",
      title: "Money Smarts",
      emoji: "💳",
      blurb: "Pay, interest, credit and risk",
      parentNote: "Personal finance: gross and net pay, simple and compound interest, the Rule of 72, discounts, credit cards and credit scores, budgets and emergency funds, banks and credit unions, insurance, and spreading risk across investments.",
      standards: ["SS.9-12.FL.4; SS.9-12.FL.5; SS.9-12.FL.6; SS.9-12.FL.7; SS.9-12.FL.9; SS.9-12.FL.10", "personal financial plans and saving, credit, debt and credit reports, loans and interest, investing, and insurance"],
    },
    FINANCE_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-economics"),
    {
      id: "nv-g9-economics",
      title: "Markets & the Economy",
      emoji: "📈",
      blurb: "GDP, inflation, the Fed and trade",
      parentNote: "Economics: GDP, inflation and unemployment, the Federal Reserve and fiscal policy, specialization, comparative advantage and trade, and economic systems, with examples from Nevada.",
      standards: ["SS.9-12.CE.47; SS.9-12.CE.48; SS.9-12.CE.49; SS.9-12.CE.51; SS.9-12.CE.52", "economic indicators, government policy and the money supply, how national and global issues affect Nevada's economy, and international trade"],
    },
    ECONOMICS_EXTRA,
  ),
  copyOf(
    from(MINNESOTA_9, "mn-g9-supply-demand"),
    {
      id: "nv-g9-supply-demand",
      title: "Supply & Demand",
      emoji: "⚖️",
      blurb: "How buyers and sellers set prices",
      parentNote: "Supply and demand: how prices change when buyers and sellers interact, equilibrium, shortages and surpluses, price ceilings and floors, and how scarcity and incentives shape choices, with examples from Nevada.",
      standards: ["SS.9-12.CE.43; SS.9-12.CE.44; SS.9-12.CE.45", "what shapes production and distribution in a market, how supply and demand change prices, and judging government policies by costs and benefits"],
    },
    SUPPLY_EXTRA,
  ),
];
