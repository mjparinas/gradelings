import type { Unit } from "../../types";
import { SOCIAL_9 as MAINE_9 } from "../../maine/units/social-g9";
import { UNITS as MINNESOTA_9 } from "../../minnesota/units/social-g9";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Wyoming Grade 9 social studies, high school civics and economics with personal finance: the Wyoming constitution of
// 1889, the legislature, the governor and the other statewide officers, the courts and counties, how the state pays its
// way with mineral taxes, and the sovereign powers of the Eastern Shoshone and Northern Arapaho (SS12.1.3, SS12.1.5,
// SS12.1.5.a), plus copies of Maine's United States government, personal finance and economics units and Minnesota's
// supply and demand unit without their state's items, with Wyoming items added.

const GOVERNING: Q[] = [
  ["Wyoming's constitution was written at a convention in Cheyenne in…", "1889", ["1776", "1803", "1959"], "It took effect when Wyoming became a state in 1890."],
  ["Wyoming's constitution was the first state constitution to guarantee equal political rights regardless of…", "sex", ["height", "eye color", "age"], "Women had voted in the territory since 1869."],
  ["Wyoming's legislature has two houses, the Senate and the…", "House of Representatives", ["General Court", "Assembly", "Parliament"], "Most states have two houses."],
  ["Since 2023, the Wyoming Senate has…", "31 members", ["100 members", "400 members", "5 members"], "The House has twice as many."],
  ["Since 2023, the Wyoming House of Representatives has…", "62 members", ["435 members", "31 members", "12 members"], "Each senate district holds two house districts."],
  ["Members of the Wyoming House serve two-year terms, and senators serve…", "four-year terms", ["six-year terms", "life terms", "one-year terms"], "Half the Senate is elected every two years."],
  ["Wyoming's legislature is part-time. In even-numbered years it meets in a short session mostly about…", "the state budget", ["choosing the President", "writing new treaties", "electing judges"], "Lawmakers have other jobs too."],
  ["Wyoming's governor serves a term of…", "four years", ["two years", "six years", "life"], "The governor heads the executive branch."],
  ["Wyoming has no lieutenant governor. If the governor's office becomes empty, it passes first to the…", "secretary of state", ["chief justice", "mayor of Cheyenne", "state senator from Laramie"], "The secretary of state is elected statewide."],
  ["Besides the governor and the secretary of state, Wyoming voters elect the state auditor, the state treasurer and the…", "superintendent of public instruction", ["state sheriff", "state judge", "state mayor"], "These five are the statewide elected officials."],
  ["Wyoming's highest court is the…", "Wyoming Supreme Court", ["Legislature", "Executive Council", "town meeting"], "It has five justices and sits in Cheyenne."],
  ["Wyoming picks its judges by having a commission suggest names, the governor appoint one, and then voters…", "decide whether to keep the judge in a retention election", ["choose from ten candidates", "never vote on judges", "elect the commission"], "This is called merit selection."],
  ["When the governor vetoes a bill, the legislature can pass it anyway with a vote of…", "two-thirds of each house", ["one member", "the Supreme Court", "half of one house"], "This is a check on the governor."],
  ["Wyoming is divided into how many counties?", "23", ["10", "50", "100"], "Each has elected county commissioners."],
  ["Wyoming has no personal income tax, so a large share of state money comes from…", "taxes on oil, gas, coal and other minerals", ["tolls on every road", "a tax on rain", "tariffs on imports"], "These are called severance taxes."],
  ["The Permanent Wyoming Mineral Trust Fund saves part of mineral tax money so that…", "the state earns income after the minerals run out", ["it can be spent in one year", "minerals can be bought back", "taxes go up"], "Voters approved it in 1974."],
  ["Wyoming citizens can put a new law on the ballot by gathering signatures. This is called…", "an initiative", ["a veto", "a filibuster", "an impeachment"], "Voters then decide."],
  ["Wyoming's constitution says the water of all natural streams belongs to…", "the state", ["the first person who uses it", "the federal government only", "nobody"], "Water rights are a big deal in a dry state."],
  ["An amendment to Wyoming's constitution needs two-thirds of each house of the legislature and then…", "approval by the voters", ["the President's signature", "a court order", "one county's approval"], "Voters have the last word."],
  ["Because they are sovereign, the Eastern Shoshone and Northern Arapaho decide for themselves…", "who can be a member of their nation", ["who becomes governor", "how Congress votes", "Wyoming's state taxes"], "Membership is a Tribal power."],
  ["On the Wind River Reservation, hunting and fishing by Tribal members follow…", "a Tribal fish and game code", ["Canadian law", "the laws of another state", "no rules at all"], "Tribes manage their own fish and game."],
  ["How is Wyoming's constitution like the US Constitution?", "both separate power among three branches", ["both were written in 1787", "neither can be amended", "both create a king"], "Separation of powers is a shared principle.", true],
  ["Why does Wyoming have only three electoral votes for President?", "it has one House seat plus two senators", ["it chose to have fewer", "it joined late", "it has no cities"], "Electoral votes follow population.", true],
  ["Why might Wyoming's budget rise and fall more than many states' budgets?", "mineral prices go up and down", ["the legislature never meets", "it has no budget", "its population doubles every year"], "Relying on one kind of tax adds risk.", true],
  ["How is a Tribal government like Wyoming's state government?", "both make and enforce laws for their own people", ["both answer to the governor", "neither can tax", "both are run by Congress"], "Each is a government in its own right.", true],
  ["The Fort Bridger Treaty of 1868 still matters today because treaties are…", "part of the supreme law of the land", ["only old stories", "cancelled after 100 years", "state laws"], "Article VI of the Constitution.", true],
  ["Why do Wyoming voters elect so many officials directly instead of letting the governor appoint them?", "to spread power and keep officials answerable to voters", ["to save money", "because the President asks", "because there are no laws"], "Elections are a check on power.", true],
];

const NATION_EXTRA: Q[] = [
  ["Wyoming has how many seats in the US House of Representatives?", "1", ["2", "23", "62"], "It has the smallest population of any state."],
  ["Wyoming has how many electoral votes for President?", "3", ["1", "23", "62"], "Its House seat plus its two senators."],
  ["Like every state, Wyoming sends how many senators to the US Senate?", "2", ["1", "23", "62"], "Each state has equal votes in the Senate.", true],
];

const FINANCE_EXTRA: Q[] = [
  ["Wyoming has no state income tax, so a worker's paycheck there has deductions for…", "federal income tax, Social Security and Medicare", ["state income tax only", "no taxes at all", "a sales tax"], "Federal taxes apply in every state."],
  ["Taxes taken out of a paycheck automatically are…", "involuntary deductions", ["voluntary deductions", "bonuses", "tips"], "Retirement savings you choose are voluntary.", true],
  ["A 529 plan is a savings account meant for…", "education costs such as college", ["buying a car", "paying rent", "vacations"], "Money in it can grow without being taxed if it is used for school.", true],
];

const ECONOMICS_EXTRA: Q[] = [
  ["Wyoming's economy relies heavily on mining, tourism and…", "agriculture, especially cattle and sheep", ["fishing fleets", "car factories", "banana farms"], "Ranching is a big part of Wyoming life."],
  ["Visitors who come to Yellowstone and Grand Teton are an important part of Wyoming's…", "tourism industry", ["oil industry", "fishing fleet", "gold mining"], "Tourism brings money to towns and businesses."],
  ["When fewer power plants burn coal, mining towns in the Powder River Basin lose jobs. This shows an economy…", "changing over time", ["staying exactly the same", "ending all trade", "returning to farming only"], "Economies adapt as industries rise and fall.", true],
  ["Wyoming ships coal and trona to other states and countries because it has more than it needs. This is an example of…", "specialization and trade", ["a tariff", "inflation", "a recession"], "Places trade what they produce well.", true],
];

const SUPPLY_EXTRA: Q[] = [
  ["During the summer tourist season near Yellowstone, hotel room prices tend to…", "rise", ["fall", "stay at zero", "disappear"], "Demand rises while the number of rooms stays the same."],
  ["When a wet year grows lots of hay and the number of buyers stays the same, hay prices tend to…", "fall", ["rise", "double", "stop existing"], "More supply at the same demand."],
  ["If the price of gasoline rises, demand for fuel-efficient cars tends to…", "rise", ["fall", "stay the same forever", "vanish"], "Related goods affect each other.", true],
];

const MAINE = (id: string) => from(MAINE_9, id);

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "wy-g9-governing-wyoming",
    title: "Governing Wyoming",
    emoji: "🏛️",
    blurb: "The 1889 constitution, the legislature and Tribal sovereignty",
    parentNote: "How Wyoming governs itself within the federal system: the 1889 constitution, its equal-rights clause and how it is amended, the 31-member Senate and 62-member House, the governor and the other statewide officers, merit selection of judges, counties, the initiative, mineral taxes and the Permanent Mineral Trust Fund, and the sovereign powers of the Eastern Shoshone and Northern Arapaho.",
    standards: ["SS12.1.3; SS12.1.5; SS12.1.5.a", "the development and structure of the United States and Wyoming constitutions and treaties, and the inherent powers the Tribes of Wyoming hold as sovereign nations"],
    items: GOVERNING,
  }),
  copyOf(
    MAINE("me-g9-us-government"),
    {
      id: "wy-g9-us-government",
      title: "How the Nation Governs",
      emoji: "🏛️",
      blurb: "Congress, the President, the courts and your rights",
      parentNote: "The United States government: the three articles that set up Congress, the presidency and the courts, terms and powers, checks and balances, the Bill of Rights and later amendments, landmark cases, and how the US system compares with a parliamentary one.",
      standards: ["SS12.1.1; SS12.1.2; SS12.1.5", "the freedoms, rights and responsibilities of living in a democracy, how to take part in the political process, and the structure of the United States Constitution"],
    },
    NATION_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-personal-finance"),
    {
      id: "wy-g9-personal-finance",
      title: "Money Smarts",
      emoji: "💳",
      blurb: "Pay, interest, credit and risk",
      parentNote: "Personal finance: gross and net pay, simple and compound interest, the Rule of 72, discounts, credit cards and credit scores, budgets and emergency funds, banks and credit unions, insurance, and spreading risk across investments.",
      standards: ["SS12.3.4; SS12.3.5", "how banks and other institutions make decisions about investment, credit and debt, and how values shape personal money choices"],
    },
    FINANCE_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-economics"),
    {
      id: "wy-g9-economics",
      title: "Markets & the Economy",
      emoji: "📈",
      blurb: "GDP, inflation, the Fed and trade",
      parentNote: "Economics: GDP, inflation and unemployment, the Federal Reserve and fiscal policy, specialization, comparative advantage and trade, and economic systems, with examples from Wyoming.",
      standards: ["SS12.3.2; SS12.3.3; SS12.3.4", "how economic systems organize production, how technology affects the economy, and how financial and government institutions make economic decisions"],
    },
    ECONOMICS_EXTRA,
  ),
  copyOf(
    from(MINNESOTA_9, "mn-g9-supply-demand"),
    {
      id: "wy-g9-supply-demand",
      title: "Supply & Demand",
      emoji: "⚖️",
      blurb: "How buyers and sellers set prices",
      parentNote: "Supply and demand: how prices change when buyers and sellers interact, equilibrium, shortages and surpluses, price ceilings and floors, and how scarcity and incentives shape choices, with examples from Wyoming.",
      standards: ["SS12.3.1", "how supply, demand, scarcity, prices, incentives and competition shape what is produced and consumed"],
    },
    SUPPLY_EXTRA,
  ),
];
