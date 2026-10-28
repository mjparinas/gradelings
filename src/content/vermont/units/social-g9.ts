import type { Unit } from "../../types";
import { SOCIAL_9 as MAINE_9 } from "../../maine/units/social-g9";
import { UNITS as MINNESOTA_9 } from "../../minnesota/units/social-g9";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Vermont Grade 9 social studies, high school civics and economics with personal finance: Vermont's constitution of
// 1793 and how it is amended, the General Assembly, two-year terms for every statewide office, the courts, towns and
// counties, and how the state raises money (D2.Civ.1.9-12, D2.Civ.4.9-12, D2.Civ.11.9-12), plus copies of Maine's United
// States government, personal finance and economics units and Minnesota's supply and demand unit without their state's
// items, with Vermont items added.

const GOVERNING: Q[] = [
  ["Vermont's present constitution, still in force today with many amendments, was adopted in…", "1793", ["1620", "1912", "1964"], "It replaced the constitutions of 1777 and 1786."],
  ["Chapter I of Vermont's constitution, which lists the people's rights, is called the…", "Declaration of Rights", ["Bill of Attainder", "Frame of Government", "Articles of Confederation"], "Chapter II sets up the government."],
  ["Vermont's legislature is called the…", "General Assembly", ["General Court", "Grand Council", "Parliament"], "It has a Senate and a House of Representatives."],
  ["The Vermont House of Representatives has…", "150 members", ["30 members", "400 members", "2 members"], "Each member represents about 4,300 people."],
  ["The Vermont Senate has…", "30 members", ["150 members", "100 members", "2 members"], "Senate districts are much larger than House districts."],
  ["Members of Vermont's House and Senate serve…", "two-year terms", ["six-year terms", "life terms", "ten-year terms"], "Every seat is on the ballot every two years."],
  ["Vermont's governor serves a term of…", "two years", ["four years", "six years", "life"], "Vermont and New Hampshire are the only states with two-year terms for governor."],
  ["Besides the governor, Vermont voters elect the lieutenant governor, treasurer, secretary of state, auditor and attorney general every…", "two years", ["four years", "eight years", "ten years"], "Every statewide office is on the ballot together."],
  ["If no candidate for governor wins more than half of the votes, Vermont's constitution says the governor is chosen by…", "the General Assembly", ["a coin toss", "the President", "the Supreme Court"], "Lawmakers vote in a joint session."],
  ["Vermont's highest court is the…", "Vermont Supreme Court", ["General Assembly", "Executive Council", "town meeting"], "It has five justices and sits in Montpelier."],
  ["Vermont Supreme Court justices are appointed by the governor, confirmed by the Senate, and then every six years…", "the General Assembly votes on whether to keep them", ["they run against each other", "the President reappoints them", "they must move towns"], "This is called a retention vote."],
  ["When the governor vetoes a bill, the General Assembly can pass it anyway with a vote of…", "two-thirds of each house", ["one member", "the Supreme Court", "half of one house"], "This is a check on the governor."],
  ["Vermont is divided into how many counties?", "14", ["10", "50", "100"], "Most local government happens in towns and cities."],
  ["In many Vermont towns, voters meet once a year to pass the town budget at…", "town meeting", ["a Supreme Court hearing", "a party convention", "the State House"], "Town Meeting Day is the first Tuesday in March."],
  ["Vermont pays for state services with an income tax, a sales tax and…", "property taxes that help fund schools statewide", ["tolls only", "a tax on rain", "tariffs on other states"], "Act 60 created a statewide education fund."],
  ["Vermont voters cannot put a new law on the statewide ballot themselves because the state has no…", "citizen initiative", ["governor", "legislature", "courts"], "Laws are made by the General Assembly."],
  ["Amendments to Vermont's constitution can be proposed only once every four years, starting in the…", "state Senate", ["governor's office", "Supreme Court", "town meeting"], "This is often called the time lock."],
  ["A proposed amendment to Vermont's constitution must pass two different sessions of the General Assembly and then…", "be approved by the voters", ["be signed by the President", "be approved by a court", "be read at one town meeting"], "It is hard to change on purpose."],
  ["Vermont's 1777 constitution was the first in the nation to…", "outlaw adult slavery and let men without property vote", ["create a king", "ban all elections", "join Canada"], "Its wording on slavery was finally made complete in 2022."],
  ["Article 7 of Vermont's Declaration of Rights says government is for the common benefit of the people, not for…", "the advantage of any single person or group", ["the people's safety", "fair courts", "free elections"], "It is called the Common Benefits Clause."],
  ["How is Vermont's constitution like the US Constitution?", "both separate power among three branches", ["both were written in 1787", "neither can be amended", "both create a king"], "Separation of powers is a shared principle.", true],
  ["Why might the General Assembly, rather than voters, choose the governor in a close three-way race?", "the constitution requires a majority, not just the most votes", ["the governor resigned", "voting is banned", "the President asked"], "Lawmakers usually pick the candidate with the most votes.", true],
  ["Why does a 150-member House give Vermont voters close contact with their representatives?", "each member represents a small number of people", ["members never meet voters", "only cities have representatives", "members are appointed"], "Smaller districts mean closer neighbors.", true],
  ["In Baker v. State (1999), the Vermont Supreme Court used the Common Benefits Clause to rule that same-sex couples must receive…", "the same legal benefits as married couples", ["no rights at all", "a separate state", "free land"], "Lawmakers answered by creating civil unions in 2000.", true],
  ["Which level of government in Vermont usually decides how much to spend on a town's roads and library?", "the town, often at town meeting", ["the US Congress", "the President", "the state Supreme Court"], "Local government handles local services.", true],
  ["Why are Vermont's governor and legislators elected so often?", "to keep them close to the voters", ["to save money on ballots", "because the constitution is new", "because the President asks"], "Two-year terms mean frequent elections.", true],
];

const NATION_EXTRA: Q[] = [
  ["After the 2020 census, Vermont has how many seats in the US House of Representatives?", "1", ["2", "14", "150"], "Seats are divided by population after each census."],
  ["Vermont has how many electoral votes for President?", "3", ["1", "14", "150"], "Its one House seat plus its two senators."],
  ["Like every state, Vermont sends how many senators to the US Senate?", "2", ["1", "14", "150"], "Each state has equal votes in the Senate.", true],
];

const FINANCE_EXTRA: Q[] = [
  ["A worker's paycheck in Vermont has deductions for federal and state income tax, Social Security and…", "Medicare", ["the sales tax", "property tax", "tolls"], "Medicare pays for health care for older people."],
  ["Taxes taken out of a paycheck automatically are…", "involuntary deductions", ["voluntary deductions", "bonuses", "tips"], "Retirement savings you choose are voluntary.", true],
  ["A 529 plan, which Vermont offers, is a savings account meant for…", "education costs such as college", ["buying a car", "paying rent", "vacations"], "Money in it can grow without being taxed if it is used for school.", true],
];

const ECONOMICS_EXTRA: Q[] = [
  ["Some Vermonters near the border shop in a state with no sales tax. This shows that…", "tax differences change where people shop", ["prices are set by the President", "stores give everything away", "taxes never matter"], "People respond to incentives."],
  ["Visitors who come to ski and to see the fall leaves in the Green Mountains are an important part of Vermont's…", "tourism industry", ["oil industry", "fishing fleet", "gold mining"], "Tourism brings money to towns and businesses."],
  ["When the old woolen mills in Winooski closed, the buildings filled with shops, offices and apartments. This shows an economy…", "changing over time", ["staying exactly the same", "ending all trade", "returning to farming only"], "Economies adapt as industries rise and fall.", true],
  ["Acid rain from far-off power plants that harms Vermont's lakes and forests is an example of a negative…", "externality", ["dividend", "tariff", "subsidy"], "A cost that falls on people outside the deal.", true],
];

const SUPPLY_EXTRA: Q[] = [
  ["During peak fall foliage season in the Green Mountains, hotel room prices tend to…", "rise", ["fall", "stay at zero", "disappear"], "Demand rises while the number of rooms stays the same."],
  ["When a great sugaring season floods the market with maple syrup and buyers stay the same, syrup prices tend to…", "fall", ["rise", "double", "stop existing"], "More supply at the same demand."],
  ["If the price of gasoline rises, demand for fuel-efficient cars tends to…", "rise", ["fall", "stay the same forever", "vanish"], "Related goods affect each other.", true],
];

const MAINE = (id: string) => from(MAINE_9, id);

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "vt-g9-governing-vermont",
    title: "Governing Vermont",
    emoji: "🏛️",
    blurb: "The 1793 constitution, the General Assembly and town meeting",
    parentNote: "How Vermont governs itself within the federal system: the 1793 constitution, its Declaration of Rights and Common Benefits Clause, and how it is amended (the four-year time lock), the 150-member House and 30-member Senate of the General Assembly, two-year terms for every statewide office, the courts and retention votes, counties, towns and town meeting, and how the state raises money.",
    standards: ["D2.Civ.1.9-12; D2.Civ.4.9-12; D2.Civ.11.9-12", "the powers of local, state and national institutions, how constitutions set up a government with powers and limits, and procedures for making decisions at different levels"],
    items: GOVERNING,
  }),
  copyOf(
    MAINE("me-g9-us-government"),
    {
      id: "vt-g9-us-government",
      title: "How the Nation Governs",
      emoji: "🏛️",
      blurb: "Congress, the President, the courts and your rights",
      parentNote: "The United States government: the three articles that set up Congress, the presidency and the courts, terms and powers, checks and balances, the Bill of Rights and later amendments, landmark cases, and how the US system compares with a parliamentary one.",
      standards: ["D2.Civ.1.9-12; D2.Civ.3.9-12; D2.Civ.4.9-12; D2.Civ.2.9-12", "the powers of national institutions, the impact of constitutions and laws, how the Constitution sets up a government with powers and limits, and the role of citizens"],
    },
    NATION_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-personal-finance"),
    {
      id: "vt-g9-personal-finance",
      title: "Money Smarts",
      emoji: "💳",
      blurb: "Pay, interest, credit and risk",
      parentNote: "Personal finance: gross and net pay, simple and compound interest, the Rule of 72, discounts, credit cards and credit scores, budgets and emergency funds, banks and credit unions, insurance, and spreading risk across investments.",
      standards: ["D2.Eco.1.9-12; D2.Eco.2.9-12; D2.Eco.9.9-12", "how incentives shape choices, weighing marginal benefits and costs, and the institutions of a market economy"],
    },
    FINANCE_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-economics"),
    {
      id: "vt-g9-economics",
      title: "Markets & the Economy",
      emoji: "📈",
      blurb: "GDP, inflation, the Fed and trade",
      parentNote: "Economics: GDP, inflation and unemployment, the Federal Reserve and fiscal policy, specialization, comparative advantage and trade, and economic systems, with examples from Vermont.",
      standards: ["D2.Eco.11.9-12; D2.Eco.12.9-12; D2.Eco.14.9-12", "economic indicators, monetary and fiscal policy, and comparative advantage in trade"],
    },
    ECONOMICS_EXTRA,
  ),
  copyOf(
    from(MINNESOTA_9, "mn-g9-supply-demand"),
    {
      id: "vt-g9-supply-demand",
      title: "Supply & Demand",
      emoji: "⚖️",
      blurb: "How buyers and sellers set prices",
      parentNote: "Supply and demand: how prices change when buyers and sellers interact, equilibrium, shortages and surpluses, price ceilings and floors, and how scarcity and incentives shape choices, with examples from Vermont.",
      standards: ["D2.Eco.3.9-12; D2.Eco.4.9-12", "how incentives shape what markets produce, and competition among buyers and sellers"],
    },
    SUPPLY_EXTRA,
  ),
];
