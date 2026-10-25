import type { Unit } from "../../types";
import { SOCIAL_9 as MAINE_9 } from "../../maine/units/social-g9";
import { UNITS as MINNESOTA_9 } from "../../minnesota/units/social-g9";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Iowa Grade 9 social studies, the high school government course with economics and financial literacy: how Iowa
// governs itself under its 1857 constitution, with its state government, the sovereign Meskwaki Nation's government and
// Iowa's local governments (SS.9-12.Gov.18, SS.9-12.Gov.19, SS.9-12.Gov.20, SS.9-12.Gov.3), plus copies of Maine's
// United States government, personal finance and economics units and Minnesota's supply and demand unit without their
// state's items, with Iowa items added.

const GOVERNING: Q[] = [
  ["Iowa's current constitution, still in force with many amendments, was adopted in…", "1857", ["1776", "1846", "1964"], "It replaced the 1846 constitution."],
  ["Iowa's constitution begins with Article I, which is…", "a Bill of Rights", ["a list of counties", "the governor's powers", "the state tax rates"], "Rights come first in Iowa's constitution."],
  ["Iowa's legislature, the General Assembly, is made up of the Senate and the…", "House of Representatives", ["Assembly of Counties", "Grand Council", "Parliament"], "Both houses meet in the Capitol in Des Moines."],
  ["The Iowa Senate has 50 members. The Iowa House has…", "100 members", ["50 members", "435 members", "99 members"], "Each Senate district holds two House districts."],
  ["Iowa senators serve four-year terms. Members of the Iowa House serve…", "two-year terms", ["six-year terms", "life terms", "one-year terms"], "The whole House is elected every two years."],
  ["The General Assembly begins its regular session each year in…", "January", ["July", "October", "December"], "Sessions usually end in spring."],
  ["Iowa's governor serves four-year terms, and Iowa limits the number of terms a governor may serve to…", "no limit", ["one term", "two terms", "three terms"], "Terry Branstad served six terms."],
  ["Iowa's governor can strike out parts of a spending bill and sign the rest. This is called an…", "item veto", ["pocket veto", "impeachment", "filibuster"], "It applies to appropriations bills."],
  ["When the governor vetoes a bill, the General Assembly can pass it anyway with…", "a two-thirds vote of each house", ["one member's vote", "the Supreme Court's approval", "half of one house"], "This is a check on the governor."],
  ["Which statewide elected officer runs Iowa's elections?", "the secretary of state", ["the attorney general", "the treasurer", "the auditor"], "The office also registers businesses."],
  ["Which statewide elected officer is Iowa's chief lawyer?", "the attorney general", ["the governor", "the secretary of state", "the secretary of agriculture"], "The attorney general represents the state in court."],
  ["Iowa also elects a secretary of agriculture, which shows that…", "farming is central to Iowa's economy", ["Iowa has no farms", "farms are run by the state", "every state elects one"], "Few states elect this office."],
  ["Iowa's Supreme Court has seven justices, who are first chosen by…", "the governor from names sent by a nominating commission", ["voters in party primaries", "the President", "the General Assembly"], "This is called merit selection."],
  ["After a justice serves, Iowa voters decide in a retention election…", "whether the justice keeps the job", ["who the next governor is", "the state's budget", "a new state motto"], "Judges don't run against opponents."],
  ["To amend Iowa's constitution, an amendment must pass two General Assemblies in a row and then…", "be approved by voters", ["be signed by the President", "be approved by the US Supreme Court", "be approved by every county"], "Voters have the final say."],
  ["Every ten years, Iowa's ballot asks voters whether to…", "hold a convention to revise the constitution", ["change the state bird", "move the capital", "leave the Union"], "Voters have always said no so far."],
  ["Unlike many western states, Iowa does not let citizens put laws on the ballot by…", "initiative petition", ["voting", "writing letters", "calling lawmakers"], "Iowa laws come from the General Assembly."],
  ["The Meskwaki Nation's official name is the…", "Sac and Fox Tribe of the Mississippi in Iowa", ["Iowa Territory", "State of Tama", "Midwest Council"], "It is the only federally recognized tribe based in Iowa."],
  ["The Meskwaki Nation is sovereign, which means it…", "governs itself and makes many of its own laws", ["has no government", "is run by Tama County", "is part of the General Assembly"], "It deals with the United States government to government."],
  ["The Meskwaki Nation's government is led by an elected…", "tribal council and its chair", ["governor of Iowa", "county sheriff", "mayor of Tama"], "Tribal members vote for the council."],
  ["The Meskwaki Settlement is unusual because its land was…", "bought by the Meskwaki people themselves, starting in 1857", ["given by the King of France", "won in a lottery", "rented from the state"], "The first purchase was 80 acres."],
  ["The Meskwaki Nation runs its own court, police and…", "school", ["army", "post office for the state", "state university"], "The Meskwaki Settlement School teaches students from kindergarten to 12th grade."],
  ["The US Constitution recognizes Tribal nations by giving Congress the power to…", "regulate commerce with the Indian tribes", ["elect tribal leaders", "abolish tribes", "tax tribes as states"], "This is in Article I."],
  ["Iowa has 99 counties, each run by an elected…", "board of supervisors", ["king", "Supreme Court", "school board"], "Most boards have three or five members."],
  ["Which elected county officer runs the jail and enforces the law outside city police?", "the sheriff", ["the auditor", "the recorder", "the treasurer"], "Every county elects one."],
  ["Many Iowa cities are run by an elected mayor and council, and some hire a professional…", "city manager", ["governor", "judge", "sheriff"], "The council hires and supervises the manager."],
  ["Iowa's local school districts are governed by elected…", "school boards", ["county sheriffs", "state senators", "federal judges"], "They set budgets and hire superintendents."],
  ["Much of the money for Iowa's cities, counties and schools comes from…", "property taxes", ["tariffs", "the sale of stamps", "federal judges"], "The state also shares money with them."],
  ["Iowa's state sales tax is 6%, and many counties add a…", "local option sales tax", ["tariff", "toll on every road", "tax on air"], "Voters approve the local tax.", true],
  ["Why might a citizen speak at a county supervisors' or city council meeting?", "to share a view before a local decision is made", ["to vote for President", "to amend the US Constitution", "to appoint a justice"], "Local government is closest to the people.", true],
  ["How does Iowa's constitution differ from the US Constitution?", "it can be amended by the legislature and voters without other states", ["it has no rights", "it creates no courts", "it has no governor"], "The US Constitution needs three-fourths of the states.", true],
  ["The Meskwaki Nation's government and the State of Iowa work together on issues such as…", "roads, law enforcement and schools", ["printing money", "declaring war", "making treaties with other countries"], "Sovereign governments cooperate.", true],
];

const NATION_EXTRA: Q[] = [
  ["After the 2020 census, Iowa has how many seats in the US House of Representatives?", "4", ["2", "6", "10"], "Seats are divided by population after each census."],
  ["Iowa has how many electoral votes for President?", "6", ["2", "4", "10"], "Its House seats plus its two senators."],
  ["Like every state, Iowa sends how many senators to the US Senate?", "2", ["4", "6", "50"], "Each state has equal votes in the Senate.", true],
];

const FINANCE_EXTRA: Q[] = [
  ["An Iowa worker's paycheck has both federal and state income tax taken out, because…", "Iowa has a state income tax", ["Iowa has no taxes", "taxes are paid only in Des Moines", "only farmers pay tax"], "Iowa moved to a single flat income tax rate in 2025."],
  ["College Savings Iowa is a plan that helps families save for…", "education after high school", ["a new car", "a vacation", "a house"], "Earnings grow without federal tax when used for school.", true],
  ["Because Iowa adds a 6% state sales tax to most purchases, a family's budget should plan for…", "sales tax on what they buy", ["no taxes at all", "taxes only on food", "taxes only once a year"], "Many counties add a local tax too.", true],
];

const ECONOMICS_EXTRA: Q[] = [
  ["When world prices for corn and soybeans fall, Iowa's economy is hurt because…", "so many jobs depend on farming", ["Iowa has no farms", "prices never matter", "Iowa imports all its food"], "A specialized economy feels market swings."],
  ["Iowa leads the nation in corn, hogs and eggs. This is an example of…", "specialization based on natural resources", ["a traditional economy", "barter only", "a command economy"], "Places specialize in what their land offers."],
  ["Des Moines is a center for insurance and finance companies, which helps Iowa…", "diversify its economy beyond farming", ["end all farming", "close its factories", "stop trading"], "A more varied economy is less risky.", true],
];

const SUPPLY_EXTRA: Q[] = [
  ["A drought cuts the Iowa corn harvest while demand stays the same. The price of corn will likely…", "rise", ["fall", "stay the same", "drop to zero"], "Less supply with the same demand raises prices."],
  ["When more drivers want ethanol blends, demand for Iowa corn…", "rises", ["falls", "disappears", "stays fixed by law"], "Ethanol is made from corn.", true],
];

const MAINE = (id: string) => from(MAINE_9, id);

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "ia-g9-governing-iowa",
    title: "Governing Iowa",
    emoji: "🗳️",
    blurb: "The 1857 constitution, the Meskwaki Nation and local government",
    parentNote: "How Iowa governs itself within the federal system: the 1857 constitution and its Bill of Rights compared with the US Constitution, the General Assembly, the governor, item vetoes and statewide officers, merit selection and retention of judges, how the constitution is amended, the sovereign Meskwaki Nation's tribal council, court and school, and Iowa's counties, cities, school boards and taxes.",
    standards: ["SS.9-12.Gov.18; SS.9-12.Gov.19; SS.9-12.Gov.20; SS.9-12.Gov.3", "the government of the state of Iowa, the sovereign Meskwaki Nation tribal government, Iowa's local governments, and Iowa's founding documents"],
    items: GOVERNING,
  }),
  copyOf(
    MAINE("me-g9-us-government"),
    {
      id: "ia-g9-us-government",
      title: "How the Nation Governs",
      emoji: "🏛️",
      blurb: "Congress, the President, the courts and your rights",
      parentNote: "The United States government: the three articles that set up Congress, the presidency and the courts, terms and powers, checks and balances, the Bill of Rights and later amendments, landmark cases, and how the US system compares with a parliamentary one.",
      standards: ["SS.9-12.Gov.4; SS.9-12.Gov.5; SS.9-12.Gov.9; SS.9-12.Gov.10", "the principles of the US Constitution, government's role in keeping order, federalism, and the requirements to serve in public office"],
    },
    NATION_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-personal-finance"),
    {
      id: "ia-g9-personal-finance",
      title: "Money Smarts",
      emoji: "💳",
      blurb: "Pay, interest, credit and risk",
      parentNote: "Personal finance: gross and net pay, simple and compound interest, the Rule of 72, discounts, credit cards and credit scores, budgets and emergency funds, banks and credit unions, insurance, and spreading risk across investments.",
      standards: ["SS.9-12.FL.4; SS.9-12.FL.5; SS.9-12.FL.6; SS.9-12.FL.7; SS.9-12.FL.8; SS.9-12.FL.9; SS.9-12.FL.10", "budgets and saving, investment tools, taxes on income, how credit works and what it costs, and insurance"],
    },
    FINANCE_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-economics"),
    {
      id: "ia-g9-economics",
      title: "Markets & the Economy",
      emoji: "📈",
      blurb: "GDP, inflation, the Fed and trade",
      parentNote: "Economics: GDP, inflation and unemployment, the Federal Reserve and fiscal policy, specialization, comparative advantage and trade, and economic systems, with examples from Iowa.",
      standards: ["SS.9-12.Econ.3; SS.9-12.Econ.7; SS.9-12.Econ.9; SS.9-12.Econ.11; SS.9-12.Econ.12", "economic systems, measuring the economy's health, fiscal and monetary policy, how national and global issues affect Iowa's economy, and trade"],
    },
    ECONOMICS_EXTRA,
  ),
  copyOf(
    from(MINNESOTA_9, "mn-g9-supply-demand"),
    {
      id: "ia-g9-supply-demand",
      title: "Supply & Demand",
      emoji: "⚖️",
      blurb: "How buyers and sellers set prices",
      parentNote: "Supply and demand: how prices change when buyers and sellers interact, equilibrium, shortages and surpluses, price ceilings and floors, and how scarcity and incentives shape choices, with examples from Iowa.",
      standards: ["SS.9-12.Econ.5; SS.9-12.Econ.2; SS.9-12.Econ.8", "how supply, demand and price interact in a market, economic reasoning, and the role of government in a market economy"],
    },
    SUPPLY_EXTRA,
  ),
];
