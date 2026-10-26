import type { Unit } from "../../types";
import { SOCIAL_9 as MAINE_9 } from "../../maine/units/social-g9";
import { UNITS as MINNESOTA_9 } from "../../minnesota/units/social-g9";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Idaho Grade 9 social studies, American Government with Economics: how Idaho governs itself under the Constitution of
// the State of Idaho (9-12.GOV.45), its counties, cities and special districts (9-12.GOV.47), and the sovereignty of the
// five federally recognized tribes and the federal responsibility toward them, such as hunting and fishing rights
// (9-12.GOV.44); plus copies of Maine's United States government, personal finance and economics units and Minnesota's
// supply and demand unit without their state's items, with Idaho items added.

const GOVERNING: Q[] = [
  ["Idaho's constitution, still in force with many amendments, was written in…", "1889", ["1776", "1863", "1959"], "It took effect when Idaho became a state in 1890."],
  ["Article I of Idaho's constitution is a…", "Declaration of Rights", ["list of counties", "description of the governor's powers", "table of tax rates"], "Rights come first in Idaho's constitution."],
  ["Idaho's legislative branch, the Idaho Legislature, has a Senate and a…", "House of Representatives", ["General Assembly", "Grand Council", "Parliament"], "Both houses meet in the Capitol in Boise."],
  ["Idaho has 35 legislative districts. Each district elects one senator and…", "two representatives", ["one representative", "five representatives", "no representatives"], "That makes 35 senators and 70 representatives."],
  ["Members of both houses of the Idaho Legislature serve terms of…", "two years", ["four years", "six years", "life"], "The whole Legislature is elected every two years."],
  ["Idaho's regular legislative session begins each year in…", "January", ["July", "September", "December"], "Lawmakers usually finish by spring."],
  ["Idaho's governor serves a four-year term with…", "no limit on the number of terms", ["a one-term limit", "a two-term limit", "a ten-term limit"], "Idaho's lawmakers repealed term limits in 2002."],
  ["Idaho's governor can strike out a single item in a spending bill. This is called a…", "line-item veto", ["pocket veto", "filibuster", "recall"], "It applies to appropriation bills."],
  ["The Idaho Legislature can override the governor's veto with…", "a two-thirds vote in each house", ["a simple majority in one house", "a vote of the Supreme Court", "a vote of the counties"], "It is the same fraction as in Congress."],
  ["Which statewide elected officer runs Idaho's elections?", "the secretary of state", ["the attorney general", "the state controller", "the treasurer"], "The office also keeps official records."],
  ["Which statewide elected officer is Idaho's chief lawyer?", "the attorney general", ["the governor", "the secretary of state", "the superintendent"], "The attorney general represents the state in court."],
  ["Idaho voters also elect the leader of the state's public schools, the…", "superintendent of public instruction", ["chief justice", "lieutenant governor", "mayor of Boise"], "Not every state elects this office."],
  ["Idaho Supreme Court justices are chosen by…", "voters in nonpartisan elections", ["the President", "the Idaho Legislature", "the tribal councils"], "The governor fills a seat that opens between elections."],
  ["The Idaho Supreme Court has…", "five justices", ["nine justices", "three justices", "fifteen justices"], "They serve six-year terms."],
  ["To amend Idaho's constitution, an amendment must pass both houses of the Legislature by two-thirds and then…", "be approved by a majority of voters", ["be signed by the President", "be approved by the US Supreme Court", "be approved by every county"], "Voters have the final say."],
  ["Idaho citizens can put a proposed law on the ballot themselves by…", "collecting signatures for an initiative", ["writing to the President", "voting for a new governor", "asking the Supreme Court"], "Voters used an initiative to expand Medicaid in 2018."],
  ["A referendum lets Idaho voters…", "approve or reject a law the Legislature passed", ["choose a new state bird", "pick the President alone", "close the Legislature"], "Signatures put it on the ballot."],
  ["Idaho has 44 counties, each governed by an elected…", "board of county commissioners", ["king", "Supreme Court", "school board"], "Most boards have three commissioners."],
  ["Besides commissioners, Idaho counties elect officers such as the…", "sheriff, assessor and clerk", ["governor and lieutenant governor", "president and vice president", "chief justice"], "County officers run local services."],
  ["Idaho's cities are run by an elected mayor and…", "city council", ["state senate", "county sheriff", "federal judge"], "The council passes city ordinances."],
  ["Highway districts, fire districts and irrigation districts in Idaho are examples of…", "special districts", ["tribal governments", "federal agencies", "state courts"], "They provide one service in an area."],
  ["Idaho's local school districts are governed by elected…", "boards of trustees", ["county sheriffs", "state senators", "federal judges"], "They set budgets and hire superintendents."],
  ["Cities and counties in Idaho get their powers from…", "the state constitution and state laws", ["the US President", "tribal councils", "other states"], "Local governments are created by the state."],
  ["Much of the money for Idaho's cities, counties and school districts comes from…", "property taxes", ["tariffs", "the sale of stamps", "federal judges"], "The state also shares sales tax money with them."],
  ["The five federally recognized tribes in Idaho are sovereign nations, which means they…", "govern themselves within the United States", ["are part of the state government", "must follow every county ordinance", "are foreign countries"], "Tribes deal with the federal government government-to-government."],
  ["Treaties, such as the Nez Perce Treaty of 1855, reserved tribal rights to…", "hunt and fish at their usual places, even off the reservation", ["tax the state of Idaho", "elect Idaho's governor", "print money"], "Courts still uphold these rights."],
  ["The federal government's trust responsibility to tribes means it must…", "protect tribal lands, resources and treaty rights", ["run tribal governments", "choose tribal leaders", "collect tribal taxes"], "It comes from treaties and federal law."],
  ["Tribal land held in trust by the federal government can be leased for farming or grazing, usually with…", "approval of the tribe and the federal government", ["no rules at all", "the governor's permission only", "a vote of the state Legislature"], "Leasing earns income for tribes and landowners."],
  ["The State of Idaho and the tribes work together through agreements and through the Legislature's…", "Council on Indian Affairs", ["Board of Pardons", "Fish and Game licenses only", "county fair board"], "It brings lawmakers and tribal leaders together.", true],
  ["How does Idaho's constitution differ from the US Constitution?", "it can be amended by Idaho's Legislature and voters alone", ["it has no rights", "it creates no courts", "it has no governor"], "The US Constitution needs three-fourths of the states.", true],
  ["Why might a county and a tribe both claim a role in a road on a reservation?", "both have responsibilities to the people who use it", ["roads belong to no one", "only the President decides", "tribes have no authority"], "Overlapping governments often cooperate.", true],
  ["How are Idaho's local governments different from the tribes in their relationship to the state?", "local governments are created by the state, while tribes are sovereign", ["they are exactly the same", "tribes are created by counties", "counties are sovereign nations"], "Sovereignty comes from different sources.", true],
];

const NATION_EXTRA: Q[] = [
  ["Idaho has how many seats in the US House of Representatives?", "2", ["1", "4", "10"], "Seats are divided by population after each census."],
  ["Idaho has how many electoral votes for President?", "4", ["2", "6", "10"], "Its House seats plus its two senators."],
  ["Like every state, Idaho sends how many senators to the US Senate?", "2", ["4", "6", "50"], "Each state has equal votes in the Senate.", true],
];

const FINANCE_EXTRA: Q[] = [
  ["An Idaho worker's paycheck has both federal and state income tax taken out, because…", "Idaho has a state income tax", ["Idaho has no taxes", "taxes are paid only in Boise", "only farmers pay tax"], "Idaho has one flat income tax rate."],
  ["IDeal, Idaho's 529 plan, helps families save for…", "education after high school", ["a new car", "a vacation", "a house"], "Earnings grow without federal tax when used for school.", true],
  ["Because Idaho adds a 6% state sales tax to most purchases, a family's budget should plan for…", "sales tax on what they buy", ["no taxes at all", "taxes only on cars", "taxes only once a year"], "Idaho taxes groceries too, with a credit on income taxes.", true],
];

const ECONOMICS_EXTRA: Q[] = [
  ["When world prices for potatoes, milk and wheat fall, Idaho's economy is hurt because…", "many jobs depend on farming and food processing", ["Idaho has no farms", "prices never matter", "Idaho imports all its food"], "A specialized economy feels market swings."],
  ["Idaho leads the nation in potatoes and farm-raised trout. This is an example of…", "specialization based on natural resources", ["a traditional economy", "barter only", "a command economy"], "Places specialize in what their land offers."],
  ["The growth of computer chip making and other technology jobs in the Boise area helps Idaho…", "diversify its economy beyond farming", ["end all farming", "close its factories", "stop trading"], "A more varied economy is less risky.", true],
];

const SUPPLY_EXTRA: Q[] = [
  ["A drought cuts the Idaho potato harvest while demand stays the same. The price of potatoes will likely…", "rise", ["fall", "stay the same", "drop to zero"], "Less supply with the same demand raises prices."],
  ["When more restaurants around the world want french fries, demand for Idaho potatoes…", "rises", ["falls", "disappears", "stays fixed by law"], "French fries are made from potatoes.", true],
];

const MAINE = (id: string) => from(MAINE_9, id);

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "id-g9-governing-idaho",
    title: "Governing Idaho",
    emoji: "🗳️",
    blurb: "The state constitution, local governments and tribal sovereignty",
    parentNote: "How Idaho governs itself under the Constitution of the State of Idaho: its Declaration of Rights, the Legislature, the governor, the line-item veto and statewide officers, the elected Supreme Court, amendments, initiatives and referendums; its counties, cities, school districts and special districts and the taxes that fund them; and the sovereignty of the five federally recognized tribes, treaty rights to hunt and fish, the federal trust responsibility and leasing of tribal lands.",
    standards: ["9-12.GOV.45; 9-12.GOV.47; 9-12.GOV.44; 9-12.GOV.46", "the organization and powers of Idaho's state and local governments, lawmaking at each level, and tribal sovereignty and the federal responsibility to tribes"],
    items: GOVERNING,
  }),
  copyOf(
    MAINE("me-g9-us-government"),
    {
      id: "id-g9-us-government",
      title: "How the Nation Governs",
      emoji: "🏛️",
      blurb: "Congress, the President, the courts and your rights",
      parentNote: "The United States government: the three articles that set up Congress, the presidency and the courts, terms and powers, checks and balances, the Bill of Rights and later amendments, landmark cases, and how the US system compares with a parliamentary one.",
      standards: ["9-12.GOV.7; 9-12.GOV.8; 9-12.GOV.9; 9-12.GOV.43", "limited government and checks and balances, the structure of the Constitution and amendments, the Bill of Rights, and federalism"],
    },
    NATION_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-personal-finance"),
    {
      id: "id-g9-personal-finance",
      title: "Money Smarts",
      emoji: "💳",
      blurb: "Pay, interest, credit and risk",
      parentNote: "Personal finance: gross and net pay, simple and compound interest, the Rule of 72, discounts, credit cards and credit scores, budgets and emergency funds, banks and credit unions, insurance, and spreading risk across investments.",
      standards: ["9-12.EC.14; 9-12.EC.15; 9-12.EC.16; 9-12.EC.17; 9-12.EC.19; 9-12.EC.20; 9-12.EC.21; 9-12.EC.23", "financial goals and budgets, bank accounts, investments, credit and credit scores, insurance, and the taxes each citizen pays"],
    },
    FINANCE_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-economics"),
    {
      id: "id-g9-economics",
      title: "Markets & the Economy",
      emoji: "📈",
      blurb: "GDP, inflation, the Fed and trade",
      parentNote: "Economics: GDP, inflation and unemployment, the Federal Reserve and fiscal policy, specialization, comparative advantage and trade, and economic systems, with examples from Idaho.",
      standards: ["9-12.EC.5; 9-12.EC.6; 9-12.EC.8; 9-12.EC.10; 9-12.EC.11", "the business cycle, economic systems, monetary and fiscal policy, and global trade and interdependence"],
    },
    ECONOMICS_EXTRA,
  ),
  copyOf(
    from(MINNESOTA_9, "mn-g9-supply-demand"),
    {
      id: "id-g9-supply-demand",
      title: "Supply & Demand",
      emoji: "⚖️",
      blurb: "How buyers and sellers set prices",
      parentNote: "Supply and demand: how prices change when buyers and sellers interact, equilibrium, shortages and surpluses, price ceilings and floors, and how scarcity and incentives shape choices, with examples from Idaho.",
      standards: ["9-12.EC.1; 9-12.EC.2; 9-12.EC.3", "supply and demand, scarcity and opportunity cost, how buyers and sellers set prices, and incentives in a market"],
    },
    SUPPLY_EXTRA,
  ),
];
