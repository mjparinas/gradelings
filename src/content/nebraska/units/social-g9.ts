import type { Unit } from "../../types";
import { SOCIAL_9 as MAINE_9 } from "../../maine/units/social-g9";
import { UNITS as MINNESOTA_9 } from "../../minnesota/units/social-g9";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Nebraska Grade 9 social studies, the high school civics and economics standards: how Nebraska governs itself under its
// 1875 constitution with the one-house, nonpartisan Unicameral, compared with the US Constitution, with local and Tribal
// governments and its taxes (SS HS.1.1 and SS HS.1.2), plus copies of Maine's United States government, personal
// finance and economics units and Minnesota's supply and demand unit without their state's items, with Nebraska items
// added (SS HS.2).

const GOVERNING: Q[] = [
  ["Nebraska's current constitution, still in force with many amendments, was adopted in…", "1875", ["1776", "1854", "1937"], "It replaced the first state constitution of 1866."],
  ["Nebraska's Legislature, called the Unicameral, is the only state legislature in the country that has…", "one house and is officially nonpartisan", ["two houses and three parties", "no elections", "members chosen by the governor"], "Voters chose this system in 1934."],
  ["The Unicameral has how many members?", "49", ["40", "100", "435"], "Each senator represents one legislative district."],
  ["Nebraska state senators serve four-year terms and are limited to…", "two terms in a row", ["one year", "life terms", "ten terms in a row"], "Voters added term limits in 2000."],
  ["The Unicameral's regular session begins each January and lasts 90 working days in odd years and… in even years.", "60 working days", ["10 days", "a full year", "365 days"], "Short sessions are in even-numbered years."],
  ["Who presides over the Unicameral?", "the lieutenant governor", ["the chief justice", "the governor", "the secretary of state"], "In a two-house legislature, a speaker or senate president presides."],
  ["Nebraska's chief executive is the…", "governor", ["chief justice", "speaker", "secretary of state"], "The governor is elected for four years."],
  ["Which statewide officer runs Nebraska's elections?", "the secretary of state", ["the attorney general", "the lieutenant governor", "the treasurer"], "The office also keeps official state records."],
  ["Which statewide officer is Nebraska's chief lawyer?", "the attorney general", ["the governor", "the secretary of state", "the treasurer"], "The attorney general represents the state in court."],
  ["Nebraska's highest court is the…", "Nebraska Supreme Court", ["Court of Claims", "Unicameral", "county court"], "It has seven judges and sits in Lincoln."],
  ["Nebraska judges are appointed by the governor from a list made by a commission, and then voters decide…", "whether to keep them in retention elections", ["their party", "their salary", "which cases they hear"], "This is called merit selection."],
  ["When the governor vetoes a bill, the Unicameral can pass it anyway with the votes of…", "30 of the 49 senators", ["one senator", "the Supreme Court", "a simple majority of 25"], "That is three fifths of the members."],
  ["The governor's line-item veto lets the governor…", "reject single spending items in a budget bill", ["veto the Supreme Court", "write new laws alone", "cancel elections"], "The Unicameral can override it too."],
  ["Nebraska is divided into how many counties?", "93", ["49", "105", "254"], "Each county has a county seat."],
  ["Nebraska counties are run by an elected…", "county board", ["king", "Supreme Court", "school board"], "County boards set county budgets and taxes."],
  ["Nebraska's public schools are overseen by an elected…", "State Board of Education", ["Supreme Court", "county sheriff", "city council"], "Its members are chosen by voters in districts."],
  ["Four Tribes have their headquarters in Nebraska. Tribal nations are sovereign, which means they…", "govern themselves and make many of their own laws", ["have no government", "are run by the county", "are part of the Unicameral"], "Tribes deal with the United States government to government."],
  ["The US Constitution recognizes Tribal nations by giving Congress the power to…", "regulate commerce with the Indian tribes", ["elect Tribal leaders", "abolish Tribes", "tax Tribes as states"], "This is in Article I."],
  ["Nebraska local governments and school districts get much of their money from…", "property taxes", ["tariffs", "selling stamps", "federal judges"], "Property taxes are based on what land and buildings are worth."],
  ["Nebraska citizens can put a new law on the ballot by…", "gathering enough signatures on an initiative petition", ["writing to the President", "asking a judge", "texting the governor"], "Initiatives let voters make laws directly."],
  ["A referendum petition in Nebraska lets voters…", "decide whether to keep a law the Unicameral passed", ["choose the state bird", "elect the President directly", "skip an election"], "It is a check on the Legislature.", true],
  ["How is the Nebraska Constitution like the US Constitution?", "both separate power among three branches", ["both were written in 1787", "neither can be amended", "both create a king"], "Separation of powers is a shared principle.", true],
  ["How is Nebraska's Legislature different from the US Congress?", "it has one house and no party labels, while Congress has two houses and partisan elections", ["it has more members than Congress", "it never meets", "its members serve for life"], "Senator George Norris argued for the change.", true],
  ["Why did supporters of the Unicameral say one house would be better?", "fewer steps and no conference committees make it easier to see who decides", ["it would cost more", "it would end elections", "it would give the governor all power"], "Bills cannot be changed behind closed doors in a conference committee.", true],
  ["Why might a citizen testify at a committee hearing in Lincoln?", "every bill gets a public hearing where anyone may speak", ["to vote for President", "to change the US Constitution", "to elect the Supreme Court"], "Nebraska gives every bill a hearing.", true],
  ["Property tax relief is a major current issue in Nebraska because…", "farmers and homeowners pay high property taxes to fund schools and local services", ["Nebraska has no taxes", "property taxes pay for the U.S. Army", "no one owns land"], "Lawmakers debate how else to pay for schools.", true],
  ["Nebraska and Maine are the only states that can split their electoral votes because they…", "give one electoral vote to the winner of each congressional district", ["have no electoral votes", "let the governor pick the President", "vote only by mail"], "The other two votes go to the statewide winner.", true],
];

const NATION_EXTRA: Q[] = [
  ["After the 2020 census, Nebraska has how many seats in the US House of Representatives?", "3", ["2", "5", "49"], "Seats are divided by population after each census."],
  ["Nebraska has how many electoral votes for President?", "5", ["2", "3", "49"], "Its House seats plus its two senators."],
  ["Like every state, Nebraska sends how many senators to the US Senate?", "2", ["3", "5", "49"], "Each state has equal votes in the Senate.", true],
];

const FINANCE_EXTRA: Q[] = [
  ["A Nebraska worker's paycheck usually has both federal and… income tax taken out.", "Nebraska state", ["city of Paris", "no other", "foreign"], "Nebraska has a state income tax."],
  ["A 529 college savings plan, such as the one Nebraska's state treasurer runs, helps families…", "save for education with tax benefits", ["buy a new car", "pay a mortgage", "go on vacation"], "Saving early lets interest grow.", true],
  ["Because Nebraska adds sales tax to most purchases, a Nebraska family's budget should plan for…", "sales tax on top of the price of many items", ["no taxes at all", "taxes only on cars", "a tax refund every week"], "Local sales tax rates differ by city.", true],
];

const ECONOMICS_EXTRA: Q[] = [
  ["When cattle prices fall, much of rural Nebraska's economy…", "slows down as ranchers and the businesses they buy from earn less", ["grows faster", "is not affected", "gets more rain"], "A specialized economy is hit hard when prices fall."],
  ["Nebraska produces more beef and corn than almost any other state. This is an example of…", "specialization based on land, water and climate", ["a traditional economy", "barter only", "a command economy"], "Places specialize in what their land offers."],
  ["Much Nebraska beef and corn is sold to other countries, so trade policies and world prices…", "affect how much Nebraska farmers and ranchers earn", ["never matter in Nebraska", "only matter in Lincoln", "are set by the governor"], "Global markets reach local farms.", true],
];

const SUPPLY_EXTRA: Q[] = [
  ["When Nebraska has a huge corn harvest and demand stays the same, the price of corn tends to…", "fall", ["rise", "double", "stop existing"], "More supply at the same demand."],
  ["When many people move to the Omaha suburbs and few new homes are built, home prices tend to…", "rise", ["fall", "stay at zero", "disappear"], "Demand rises while supply stays about the same."],
  ["If the price of gasoline rises, demand for fuel-efficient cars tends to…", "rise", ["fall", "stay the same forever", "vanish"], "Related goods affect each other.", true],
];

const MAINE = (id: string) => from(MAINE_9, id);

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "neb-g9-governing-nebraska",
    title: "Governing Nebraska",
    emoji: "🗳️",
    blurb: "The Unicameral, the state constitution and local government",
    parentNote: "How Nebraska governs itself within the federal system: the 1875 constitution compared with the US Constitution, the one-house, nonpartisan Unicameral and its sessions, public hearings and term limits, the governor and statewide officers, the Supreme Court and merit selection, vetoes and overrides, the 93 counties and the State Board of Education, Tribal sovereignty, property taxes, initiatives and referendums, and how Nebraska splits its electoral votes.",
    standards: ["SS HS.1.1.b; SS HS.1.1.d; SS HS.1.1.e; SS HS.1.2.a; SS HS.1.2.d", "the structure of constitutional government, the foundations and functions of local and state government (bicameral and unicameral), using government to address issues, and choosing the right level of government"],
    items: GOVERNING,
  }),
  copyOf(
    MAINE("me-g9-us-government"),
    {
      id: "neb-g9-us-government",
      title: "How the Nation Governs",
      emoji: "🏛️",
      blurb: "Congress, the President, the courts and your rights",
      parentNote: "The United States government: the three articles that set up Congress, the presidency and the courts, terms and powers, checks and balances, the Bill of Rights and later amendments, landmark cases, and how the US system compares with a parliamentary one.",
      standards: ["SS HS.1.1.a; SS HS.1.1.b; SS HS.1.1.c", "the foundations of the Constitution, the structure of American constitutional government, and the functions of the national government and their outcomes"],
    },
    NATION_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-personal-finance"),
    {
      id: "neb-g9-personal-finance",
      title: "Money Smarts",
      emoji: "💳",
      blurb: "Pay, interest, credit and risk",
      parentNote: "Personal finance: gross and net pay, simple and compound interest, the Rule of 72, discounts, credit cards and credit scores, budgets and emergency funds, banks and credit unions, insurance, and spreading risk across investments.",
      standards: ["SS HS.2.2.a; SS HS.2.2.b; SS HS.2.3.a; SS HS.2.4.a; SS HS.2.4.c", "budgets and bank accounts, the costs and benefits of credit and debt, saving and investing early, and managing risk with insurance"],
    },
    FINANCE_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-economics"),
    {
      id: "neb-g9-economics",
      title: "Markets & the Economy",
      emoji: "📈",
      blurb: "GDP, inflation, the Fed and trade",
      parentNote: "Economics: GDP, inflation and unemployment, the Federal Reserve and fiscal policy, specialization, comparative advantage and trade, and economic systems, with examples from Nebraska.",
      standards: ["SS HS.2.6.b; SS HS.2.6.c; SS HS.2.9.b; SS HS.2.10.a", "economic indicators, the Federal Reserve and monetary policy, fiscal policy and the national debt, and comparative advantage in trade"],
    },
    ECONOMICS_EXTRA,
  ),
  copyOf(
    from(MINNESOTA_9, "mn-g9-supply-demand"),
    {
      id: "neb-g9-supply-demand",
      title: "Supply & Demand",
      emoji: "⚖️",
      blurb: "How buyers and sellers set prices",
      parentNote: "Supply and demand: how prices change when buyers and sellers interact, equilibrium, shortages and surpluses, price ceilings and floors, and how scarcity and incentives shape choices, with examples from Nebraska.",
      standards: ["SS HS.2.5.a; SS HS.2.5.b; SS HS.2.5.d; SS HS.2.8.b", "competition, markets and prices, how supply and demand set equilibrium prices, shortages and surpluses, and the effects of government policies on markets"],
    },
    SUPPLY_EXTRA,
  ),
];
