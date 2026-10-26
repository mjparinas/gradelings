import type { Unit } from "../../types";
import { SOCIAL_9 as MAINE_9 } from "../../maine/units/social-g9";
import { UNITS as MINNESOTA_9 } from "../../minnesota/units/social-g9";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// New Mexico Grade 9 social studies, high school civics and economics with personal finance: New Mexico's constitution
// and its unique features, the contributions of New Mexico's diverse peoples to its government, the challenges between
// its state, local and Tribal governments, and the powers of each level (9-12.Civ.13, 9-12.Civ.29, 9-12.Civ.30,
// 9-12.Civ.31), plus copies of Maine's United States government, personal finance and economics units and Minnesota's
// supply and demand unit without their state's items, with New Mexico items added.

const GOVERNING: Q[] = [
  ["New Mexico's constitution, still in force today with many amendments, was approved by voters in…", "1911", ["1776", "1848", "1964"], "It took effect when New Mexico became a state in 1912."],
  ["New Mexico's constitution protects the right to vote no matter a citizen's religion, race, language, or inability to speak, read or write…", "English or Spanish", ["Latin", "French", "German"], "Delegates wrote this to protect Spanish-speaking citizens."],
  ["The parts of New Mexico's constitution that protect voting rights and language rights are very hard to change because amending them needs…", "three-fourths of voters statewide and two-thirds in every county", ["the governor's signature alone", "a simple majority in one county", "a vote of the state Supreme Court"], "They are often called the unamendable sections."],
  ["New Mexico's Legislature is made up of the Senate and the…", "House of Representatives", ["Assembly", "Grand Council", "Parliament"], "Both houses meet in the Roundhouse in Santa Fe."],
  ["The New Mexico Senate has 42 members. The New Mexico House has…", "70 members", ["42 members", "435 members", "100 members"], "House districts are smaller than Senate districts."],
  ["New Mexico senators serve four-year terms. Members of the House serve…", "two-year terms", ["six-year terms", "life terms", "one-year terms"], "The whole House is elected every two years."],
  ["New Mexico's Legislature meets for 60 days in odd-numbered years and for…", "30 days in even-numbered years", ["365 days every year", "one day a decade", "only when the President asks"], "The short session focuses mainly on the budget."],
  ["New Mexico is the only state whose legislators…", "receive no salary, only money for daily expenses", ["are appointed by the governor", "serve for life", "are chosen by lottery"], "It is called a citizen legislature."],
  ["New Mexico's chief executive is the…", "governor", ["chief justice", "speaker of the House", "secretary of state"], "The governor serves four years and may serve two terms in a row."],
  ["Which statewide officer runs New Mexico's elections?", "the secretary of state", ["the attorney general", "the lieutenant governor", "the state auditor"], "The office also keeps official records."],
  ["Which statewide officer manages New Mexico's state trust lands, whose oil and gas income helps pay for schools?", "the commissioner of public lands", ["the secretary of state", "the speaker of the House", "a county clerk"], "Trust lands were given to New Mexico at statehood."],
  ["New Mexico's highest court is the…", "New Mexico Supreme Court", ["Court of Claims", "Legislature", "county court"], "It has five justices and sits in Santa Fe."],
  ["When the governor vetoes a bill, the Legislature can pass it anyway with a vote of…", "two-thirds of each house", ["one member", "the Supreme Court", "half of one house"], "This is a check on the governor."],
  ["The New Mexico governor can strike out single spending items from a budget bill. This power is called a…", "line-item veto", ["pocket filibuster", "recall", "referendum"], "The US President does not have this power."],
  ["New Mexico is divided into how many counties?", "33", ["16", "50", "100"], "Each county has an elected commission."],
  ["New Mexico's 23 Tribes, Nations and Pueblos are sovereign, which means they…", "govern themselves and make many of their own laws", ["have no government", "are run by the county", "are part of the state Legislature"], "They deal with the United States government to government."],
  ["New Mexico's State-Tribal Collaboration Act requires state agencies to…", "work and consult with Tribal governments", ["run Tribal elections", "collect taxes on Tribal land", "close Tribal schools"], "It was passed in 2009."],
  ["New Mexico taxes most sales of goods and services through its…", "gross receipts tax, paid by businesses on what they take in", ["tariff on imports", "tax on rainfall", "tax on library books only"], "Businesses usually pass it on to customers."],
  ["Taxes on oil and gas pulled from the ground in New Mexico are called…", "severance taxes", ["property taxes", "tariffs", "tolls"], "Some go into permanent funds that pay for schools."],
  ["In New Mexico, citizens can petition to let voters approve or reject a law the Legislature passed. This is a…", "referendum", ["recall", "veto", "filibuster"], "New Mexico has no citizen initiative for new laws."],
  ["Amendments to New Mexico's constitution are proposed by the Legislature and then…", "approved or rejected by voters", ["signed by the President", "decided by the Supreme Court alone", "chosen by county clerks"], "Voters see them at general elections.", true],
  ["How is New Mexico's constitution like the US Constitution?", "both separate power among three branches", ["both were written in 1787", "neither can be amended", "both create a king"], "Separation of powers is a shared principle.", true],
  ["How is New Mexico's constitution different from the US Constitution?", "it is longer and protects Spanish-speaking citizens' rights by name", ["it has no rights", "it creates no courts", "it has no governor"], "State constitutions are often longer and more detailed.", true],
  ["Why did Hispano delegates at the 1910 constitutional convention push for protections of Spanish speakers?", "to keep their communities from losing the vote and schooling", ["to stop English being spoken", "to leave the United States", "to give land to railroads"], "Diverse delegates shaped the constitution.", true],
  ["Miguel Trujillo's 1948 court case changed New Mexico's government by…", "ending the ban on Native Americans voting in state elections", ["moving the capital", "ending the Legislature", "creating counties"], "Native voters now help decide state elections.", true],
  ["Water in the Rio Grande is a challenge between governments because…", "Tribes, cities, farmers and a neighboring state all claim a share", ["the river has too much water", "no one uses it", "it flows only in Mexico"], "Disputes have reached the US Supreme Court.", true],
  ["A challenge when a road crosses Tribal land, a county and a city is that…", "several governments must agree on building and paying for it", ["no government is involved", "only the President decides", "roads cannot cross borders"], "Overlapping governments must cooperate.", true],
  ["Which level of government in New Mexico sets the rules for a Pueblo's own elections and courts?", "the Pueblo's own government", ["the county commission", "the city council", "the state Legislature"], "Sovereign nations run their own affairs.", true],
];

const NATION_EXTRA: Q[] = [
  ["After the 2020 census, New Mexico has how many seats in the US House of Representatives?", "3", ["2", "42", "70"], "Seats are divided by population after each census."],
  ["New Mexico has how many electoral votes for President?", "5", ["3", "42", "70"], "Its House seats plus its two senators."],
  ["Like every state, New Mexico sends how many senators to the US Senate?", "2", ["3", "42", "70"], "Each state has equal votes in the Senate.", true],
];

const FINANCE_EXTRA: Q[] = [
  ["The New Mexico Opportunity Scholarship helps New Mexico students pay for…", "tuition at New Mexico colleges", ["a new car", "a house", "a vacation"], "Students must meet the program's rules."],
  ["A New Mexico worker's paycheck has federal income tax and state income tax taken out. Taxes taken out automatically are…", "involuntary deductions", ["voluntary deductions", "bonuses", "tips"], "Retirement savings you choose are voluntary.", true],
  ["Getting a mortgage to buy a home on Tribal trust land can be harder because…", "the land usually can't be used as security for the loan", ["homes there are free", "banks are not allowed to exist", "interest rates are always zero"], "Special loan programs help Tribal members.", true],
];

const ECONOMICS_EXTRA: Q[] = [
  ["When world oil prices fall, New Mexico's state budget often shrinks because…", "much of the state's money comes from oil and gas taxes", ["it has no oil", "it has too many workers", "it raised taxes"], "A specialized economy feels global price changes."],
  ["New Mexico is one of the top oil-producing states. This is an example of…", "specialization based on natural resources", ["a traditional economy", "barter only", "a command economy"], "Places specialize in what their land offers."],
  ["New Mexico leaders try to grow film, space and outdoor recreation businesses to…", "diversify the economy beyond oil and gas", ["end all tourism", "close every lab", "stop trade with Mexico"], "A more varied economy is less risky.", true],
  ["Air pollution from oil and gas wells that affects nearby neighborhoods is an example of a negative…", "externality", ["dividend", "tariff", "subsidy"], "A cost that falls on people outside the deal.", true],
];

const SUPPLY_EXTRA: Q[] = [
  ["During the Albuquerque International Balloon Fiesta, hotel room prices tend to…", "rise", ["fall", "stay at zero", "disappear"], "Demand rises while the number of rooms stays the same."],
  ["When a big chile harvest floods the market and buyers stay the same, chile prices tend to…", "fall", ["rise", "double", "stop existing"], "More supply at the same demand."],
  ["If the price of gasoline rises, demand for fuel-efficient cars tends to…", "rise", ["fall", "stay the same forever", "vanish"], "Related goods affect each other.", true],
];

const MAINE = (id: string) => from(MAINE_9, id);

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "nm-g9-governing-new-mexico",
    title: "Governing New Mexico",
    emoji: "🗳️",
    blurb: "The 1911 constitution, the Roundhouse and Tribal governments",
    parentNote: "How New Mexico governs itself within the federal system: the 1911 constitution and its protections for Spanish-speaking citizens, the unpaid citizen Legislature and its 60- and 30-day sessions, the governor and statewide officers, the five-justice Supreme Court, vetoes and the line-item veto, counties, Tribal sovereignty and state-Tribal collaboration, the gross receipts and severance taxes, referendums, and challenges such as sharing Rio Grande water.",
    standards: ["9-12.Civ.13; 9-12.Civ.29; 9-12.Civ.30; 9-12.Civ.31", "the powers of local, state, Indigenous and national governments, the features of New Mexico's constitution, the contributions of New Mexico's diverse peoples to its government, and challenges between its government entities"],
    items: GOVERNING,
  }),
  copyOf(
    MAINE("me-g9-us-government"),
    {
      id: "nm-g9-us-government",
      title: "How the Nation Governs",
      emoji: "🏛️",
      blurb: "Congress, the President, the courts and your rights",
      parentNote: "The United States government: the three articles that set up Congress, the presidency and the courts, terms and powers, checks and balances, the Bill of Rights and later amendments, landmark cases, and how the US system compares with a parliamentary one.",
      standards: ["9-12.Civ.14; 9-12.Civ.15; 9-12.Civ.19; 9-12.Civ.28; 9-12.Civ.45", "the purpose, processes, strengths and weaknesses of US government, changes to the Constitution over time, systems of government, the justice system, and citizens' rights and obligations"],
    },
    NATION_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-personal-finance"),
    {
      id: "nm-g9-personal-finance",
      title: "Money Smarts",
      emoji: "💳",
      blurb: "Pay, interest, credit and risk",
      parentNote: "Personal finance: gross and net pay, simple and compound interest, the Rule of 72, discounts, credit cards and credit scores, budgets and emergency funds, banks and credit unions, insurance, and spreading risk across investments.",
      standards: ["9-12.Econ.47; 9-12.Econ.48; 9-12.Econ.50; 9-12.Econ.51; 9-12.Econ.53; 9-12.Econ.55; 9-12.Econ.57; 9-12.Econ.58", "saving and credit, risk, paycheck deductions, budgets, credit scores, the cost of loans, investing, and insurance"],
    },
    FINANCE_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-economics"),
    {
      id: "nm-g9-economics",
      title: "Markets & the Economy",
      emoji: "📈",
      blurb: "GDP, inflation, the Fed and trade",
      parentNote: "Economics: GDP, inflation and unemployment, the Federal Reserve and fiscal policy, specialization, comparative advantage and trade, and economic systems, with examples from New Mexico.",
      standards: ["9-12.Econ.20; 9-12.Econ.23; 9-12.Econ.26; 9-12.Econ.36; 9-12.Econ.37; 9-12.Econ.43", "economic systems, how national and global trends affect New Mexico's economy, diversification, economic indicators, fiscal and monetary policy, and why countries trade"],
    },
    ECONOMICS_EXTRA,
  ),
  copyOf(
    from(MINNESOTA_9, "mn-g9-supply-demand"),
    {
      id: "nm-g9-supply-demand",
      title: "Supply & Demand",
      emoji: "⚖️",
      blurb: "How buyers and sellers set prices",
      parentNote: "Supply and demand: how prices change when buyers and sellers interact, equilibrium, shortages and surpluses, price ceilings and floors, and how scarcity and incentives shape choices, with examples from New Mexico.",
      standards: ["9-12.Econ.15; 9-12.Econ.27; 9-12.Econ.28; 9-12.Econ.32", "cost-benefit and marginal analysis, how buyers and sellers create markets, what determines price, and the outcomes of government policies in markets"],
    },
    SUPPLY_EXTRA,
  ),
];
