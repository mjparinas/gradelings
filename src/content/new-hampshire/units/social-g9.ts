import type { Unit } from "../../types";
import { SOCIAL_9 as MAINE_9 } from "../../maine/units/social-g9";
import { UNITS as MINNESOTA_9 } from "../../minnesota/units/social-g9";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// New Hampshire Grade 9 social studies, high school civics and economics with personal finance: the New Hampshire
// constitution of 1784, the General Court, the governor and Executive Council, the courts, towns and counties, and how
// the state raises money (SS:CV:12:1.1, SS:CV:12:1.4, SS:CV:12:2.3), plus copies of Maine's United States government,
// personal finance and economics units and Minnesota's supply and demand unit without their state's items, with New
// Hampshire items added.

const GOVERNING: Q[] = [
  ["New Hampshire's constitution, still in force today with many amendments, took effect in…", "1784", ["1620", "1912", "1964"], "Only Massachusetts has an older state constitution still in use."],
  ["New Hampshire's legislature is called the…", "General Court", ["Grand Council", "Assembly", "Parliament"], "It has a Senate and a House of Representatives."],
  ["The New Hampshire House of Representatives has 400 members, which makes it…", "one of the largest legislative bodies in the world", ["the smallest legislature in the country", "a court", "part of Congress"], "Each member represents only a few thousand people."],
  ["The New Hampshire Senate has…", "24 members", ["400 members", "100 members", "2 members"], "Senate districts are much larger than House districts."],
  ["Members of New Hampshire's House and Senate serve…", "two-year terms", ["six-year terms", "life terms", "ten-year terms"], "Every seat is on the ballot every two years."],
  ["New Hampshire legislators are paid only…", "$100 a year, plus mileage", ["$100,000 a year", "nothing at all, ever", "$1 million a term"], "It is a citizen legislature of part-time members."],
  ["New Hampshire's governor serves a term of…", "two years", ["four years", "six years", "life"], "New Hampshire and Vermont are the only states with two-year terms for governor."],
  ["The five-member Executive Council must approve the governor's…", "choice of judges and large state contracts", ["every speech", "school lunch menus", "vacations"], "Councilors are elected every two years."],
  ["New Hampshire's secretary of state, who runs elections, is chosen by…", "the legislature", ["the voters directly", "the President", "a lottery"], "The legislature also elects the state treasurer."],
  ["New Hampshire's highest court is the…", "New Hampshire Supreme Court", ["Executive Council", "General Court", "town meeting"], "It has five justices and sits in Concord."],
  ["New Hampshire judges are appointed by the governor, approved by the Executive Council, and serve until…", "age 70", ["the next election", "one year", "the governor leaves office"], "They are not elected by voters."],
  ["When the governor vetoes a bill, the General Court can pass it anyway with a vote of…", "two-thirds of each house", ["one member", "the Supreme Court", "half of one house"], "This is a check on the governor."],
  ["New Hampshire is divided into how many counties?", "10", ["33", "50", "100"], "Most local government happens in towns and cities."],
  ["In many New Hampshire towns, voters meet once a year to pass the town budget at a…", "town meeting", ["Supreme Court hearing", "presidential primary", "party convention"], "Town meeting is often held in March."],
  ["New Hampshire has no general sales tax and no income tax on wages, so it relies heavily on…", "property taxes", ["tariffs", "tolls only", "a tax on rain"], "Property taxes pay for most of the cost of local schools."],
  ["In the Claremont cases of the 1990s, the New Hampshire Supreme Court ruled that the state must…", "pay for an adequate education for every child", ["close small schools", "end property taxes", "choose all textbooks"], "Towns had argued that school funding was unfair."],
  ["New Hampshire voters cannot put a new law on the ballot themselves because the state has no…", "citizen initiative", ["governor", "legislature", "courts"], "Laws are made by the General Court."],
  ["An amendment to New Hampshire's constitution needs three-fifths of each house of the legislature and then…", "two-thirds of the voters who vote on it", ["the President's signature", "a court order", "one town's approval"], "It is hard to change on purpose."],
  ["Every ten years, New Hampshire voters are asked whether to…", "hold a convention to revise the constitution", ["move the capital", "elect a king", "leave the United States"], "Voters have often said no."],
  ["Article 10 of New Hampshire's Bill of Rights says that when government becomes a danger to liberty, the people have a right to…", "reform it or set up a new one", ["ignore every law", "stop paying all taxes forever", "join another state"], "It is called the right of revolution."],
  ["How is New Hampshire's constitution like the US Constitution?", "both separate power among three branches", ["both were written in 1787", "neither can be amended", "both create a king"], "Separation of powers is a shared principle.", true],
  ["How is the New Hampshire governor's power different from the US President's?", "the Executive Council must approve many of the governor's decisions", ["the governor appoints Congress", "the governor serves for life", "the governor has no veto"], "The council is an extra check.", true],
  ["Why might a 400-member House give New Hampshire voters close contact with their representatives?", "each member represents a small number of people", ["members never meet voters", "only cities have representatives", "members are appointed"], "Smaller districts mean closer neighbors.", true],
  ["Why can a town with high property values pay for schools more easily than a town with low property values?", "the same tax rate raises more money", ["it has fewer rules", "it pays no taxes", "the state pays for nothing"], "This was the heart of the Claremont cases.", true],
  ["Which level of government in New Hampshire usually decides how much to spend on a town's roads and library?", "the town, often at town meeting", ["the US Congress", "the President", "the state Supreme Court"], "Local government handles local services.", true],
  ["Why are New Hampshire's governor and legislators elected so often?", "to keep them close to the voters", ["to save money on ballots", "because the constitution is new", "because the President asks"], "Two-year terms mean frequent elections.", true],
];

const NATION_EXTRA: Q[] = [
  ["After the 2020 census, New Hampshire has how many seats in the US House of Representatives?", "2", ["4", "24", "400"], "Seats are divided by population after each census."],
  ["New Hampshire has how many electoral votes for President?", "4", ["2", "24", "400"], "Its House seats plus its two senators."],
  ["Like every state, New Hampshire sends how many senators to the US Senate?", "2", ["4", "24", "400"], "Each state has equal votes in the Senate.", true],
];

const FINANCE_EXTRA: Q[] = [
  ["New Hampshire has no state income tax on wages, so a worker's paycheck there has deductions for…", "federal income tax, Social Security and Medicare", ["state income tax only", "no taxes at all", "a sales tax"], "Federal taxes apply in every state."],
  ["Taxes taken out of a paycheck automatically are…", "involuntary deductions", ["voluntary deductions", "bonuses", "tips"], "Retirement savings you choose are voluntary.", true],
  ["A 529 plan, which New Hampshire offers, is a savings account meant for…", "education costs such as college", ["buying a car", "paying rent", "vacations"], "Money in it can grow without being taxed if it is used for school.", true],
];

const ECONOMICS_EXTRA: Q[] = [
  ["Shoppers from neighboring states often cross into New Hampshire to buy big items because…", "New Hampshire has no general sales tax", ["prices are set by the President", "stores there give everything away", "it is the only state with stores"], "Tax differences change where people shop."],
  ["Visitors who come to see the fall leaves in the White Mountains are an important part of New Hampshire's…", "tourism industry", ["oil industry", "fishing fleet", "gold mining"], "Tourism brings money to towns and businesses."],
  ["When the old textile mills closed, Manchester's mill buildings filled with technology and health businesses. This shows an economy…", "changing over time", ["staying exactly the same", "ending all trade", "returning to farming only"], "Economies adapt as industries rise and fall.", true],
  ["Acid rain from far-off power plants that harms New Hampshire's lakes and forests is an example of a negative…", "externality", ["dividend", "tariff", "subsidy"], "A cost that falls on people outside the deal.", true],
];

const SUPPLY_EXTRA: Q[] = [
  ["During peak fall foliage season in the White Mountains, hotel room prices tend to…", "rise", ["fall", "stay at zero", "disappear"], "Demand rises while the number of rooms stays the same."],
  ["When a great sugaring season floods the market with maple syrup and buyers stay the same, syrup prices tend to…", "fall", ["rise", "double", "stop existing"], "More supply at the same demand."],
  ["If the price of gasoline rises, demand for fuel-efficient cars tends to…", "rise", ["fall", "stay the same forever", "vanish"], "Related goods affect each other.", true],
];

const MAINE = (id: string) => from(MAINE_9, id);

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "nh-g9-governing-new-hampshire",
    title: "Governing New Hampshire",
    emoji: "🏛️",
    blurb: "The 1784 constitution, the General Court and town meeting",
    parentNote: "How New Hampshire governs itself within the federal system: the 1784 constitution and how it is amended, the 400-member House and 24-member Senate of the General Court, two-year terms, the governor and the Executive Council, the courts, counties, towns and town meeting, and how the state pays for schools without a sales or wage income tax.",
    standards: ["SS:CV:12:1.1; SS:CV:12:1.4; SS:CV:12:2.3", "the structures and functions of government at various levels, where legitimate authority comes from, and the roles of the United States and New Hampshire constitutions"],
    items: GOVERNING,
  }),
  copyOf(
    MAINE("me-g9-us-government"),
    {
      id: "nh-g9-us-government",
      title: "How the Nation Governs",
      emoji: "🏛️",
      blurb: "Congress, the President, the courts and your rights",
      parentNote: "The United States government: the three articles that set up Congress, the presidency and the courts, terms and powers, checks and balances, the Bill of Rights and later amendments, landmark cases, and how the US system compares with a parliamentary one.",
      standards: ["SS:CV:12:1.1; SS:CV:12:2.2; SS:CV:12:2.4; SS:CV:12:4.1", "the structures and functions of government, the Constitution as a living document, how individual rights have been extended, and responsible practices in the political process"],
    },
    NATION_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-personal-finance"),
    {
      id: "nh-g9-personal-finance",
      title: "Money Smarts",
      emoji: "💳",
      blurb: "Pay, interest, credit and risk",
      parentNote: "Personal finance: gross and net pay, simple and compound interest, the Rule of 72, discounts, credit cards and credit scores, budgets and emergency funds, banks and credit unions, insurance, and spreading risk across investments.",
      standards: ["SS:EC:12:6.1; SS:EC:12:6.2; SS:EC:12:6.3; SS:EC:12:6.4", "the risk, return and liquidity of investments, sources of consumer credit, creditworthiness, and insurance"],
    },
    FINANCE_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-economics"),
    {
      id: "nh-g9-economics",
      title: "Markets & the Economy",
      emoji: "📈",
      blurb: "GDP, inflation, the Fed and trade",
      parentNote: "Economics: GDP, inflation and unemployment, the Federal Reserve and fiscal policy, specialization, comparative advantage and trade, and economic systems, with examples from New Hampshire.",
      standards: ["SS:EC:12:3.1; SS:EC:12:3.2; SS:EC:12:4.3; SS:EC:12:5.1", "economic indicators and the business cycle, inflation, monetary and fiscal policy, and comparative advantage in trade"],
    },
    ECONOMICS_EXTRA,
  ),
  copyOf(
    from(MINNESOTA_9, "mn-g9-supply-demand"),
    {
      id: "nh-g9-supply-demand",
      title: "Supply & Demand",
      emoji: "⚖️",
      blurb: "How buyers and sellers set prices",
      parentNote: "Supply and demand: how prices change when buyers and sellers interact, equilibrium, shortages and surpluses, price ceilings and floors, and how scarcity and incentives shape choices, with examples from New Hampshire.",
      standards: ["SS:EC:12:1.1; SS:EC:12:2.3", "the roles of workers and consumers in markets, and reading demand and supply schedules and the influences on price"],
    },
    SUPPLY_EXTRA,
  ),
];
