import type { Unit } from "../../types";
import { OWN_SOCIAL_9 as OREGON_9 } from "../../oregon/units/social-g9";
import { SOCIAL_9 as CALIFORNIA_9 } from "../../california/units/social-g9";
import { copyOf, from } from "./kit";
import { bankUnit, type Q } from "../own";

// Minnesota's own Grade 9 social studies unit (`mn-` id): the powers and operations of Minnesota's state and local
// governments, and Tribal governments in Minnesota.

const STATE: Q[] = [
  ["Minnesota's state government is organized by the…", "Constitution of the State of Minnesota", ["Articles of Confederation", "Magna Carta", "city charter of Duluth"], "Adopted in 1857."],
  ["Minnesota's Legislature is made up of the Senate and the…", "House of Representatives", ["Cabinet", "Supreme Court", "Electoral College"], "Bicameral."],
  ["How many members are in the Minnesota Senate?", "67", ["100", "134", "50"], "One per legislative district."],
  ["How many members are in the Minnesota House of Representatives?", "134", ["67", "100", "435"], "Two per Senate district."],
  ["Minnesota House members serve terms of…", "2 years", ["4 years", "6 years", "life"], "Every even-numbered year."],
  ["Minnesota's governor serves a term of…", "4 years", ["2 years", "6 years", "8 years"], "No term limit."],
  ["Which of these is an elected statewide officer in Minnesota's executive branch?", "Attorney General", ["Speaker of the House", "Chief Justice", "County sheriff"], "The state's lawyer."],
  ["Minnesota's Secretary of State is in charge of…", "elections and business filings", ["the state's armed forces", "writing court opinions", "school lunches"], "Runs elections."],
  ["The State Auditor checks how ___ spend public money.", "local governments", ["private families", "other states", "foreign countries"], "Cities and counties."],
  ["Minnesota Supreme Court justices are chosen by…", "election, for six-year terms", ["the president", "a lottery", "inheritance"], "Governors fill vacancies until an election.", true],
  ["Between district courts and the Minnesota Supreme Court is the…", "Court of Appeals", ["US Senate", "Electoral College", "county board"], "An intermediate court."],
  ["A Minnesota governor may veto single spending items in a bill. This is a…", "line-item veto", ["pocket treaty", "filibuster", "recall"], "On appropriations.", true],
  ["To override a veto, the Minnesota Legislature needs a vote of…", "two-thirds in each chamber", ["a simple majority in one chamber", "the governor's approval", "every county"], "A supermajority."],
  ["Minnesota passes its state budget for…", "two years at a time", ["one week", "ten years", "a single day"], "A biennium.", true],
  ["To amend the Minnesota Constitution, a proposal passed by the Legislature must also be approved by…", "the voters", ["the US Congress", "the governor alone", "the Supreme Court alone"], "On the ballot."],
  ["Unlike some states, Minnesota does not let citizens put new laws on the ballot by…", "petition (initiative)", ["voting", "writing letters", "calling legislators"], "No citizen initiative.", true],
  ["Minnesota has how many counties?", "87", ["50", "100", "11"], "Each run by a county board.", true],
  ["County governments in Minnesota usually handle…", "roads, courts' records and social services", ["foreign treaties", "printing money", "the US mail"], "Local services."],
  ["A township is a form of…", "local government in rural areas", ["federal court", "Tribal council", "state agency"], "Common in rural Minnesota."],
  ["School districts are run by…", "elected school boards", ["the governor alone", "the President", "a Tribal court"], "Local voters choose them."],
  ["Minnesota lets eligible voters register…", "on Election Day", ["only a year ahead", "only by email", "never"], "Same-day registration."],
  ["Minnesota's Democratic-Farmer-Labor Party was formed by joining the Democratic Party with the…", "Farmer-Labor Party", ["Whig Party", "Federalist Party", "Green Party"], "In 1944.", true],
  ["Six Anishinaabe bands in Minnesota share a constitution as the…", "Minnesota Chippewa Tribe", ["Minnesota Legislature", "Metropolitan Council", "Dakota Nation"], "Red Lake governs separately.", true],
  ["The relationship between Tribal Nations and the State of Minnesota is…", "government to government", ["employer to worker", "landlord to tenant", "state to county"], "Both are governments.", true],
  ["The Metropolitan Council plans transit and services for the…", "Twin Cities region", ["whole country", "Iron Range only", "Canada"], "Seven counties.", true],
  ["Minnesota's state government gets most of its money from…", "income and sales taxes", ["tolls on every road", "lottery tickets only", "fines only"], "Two big taxes.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "mn-g9-minnesota-government",
    title: "Minnesota's Government",
    emoji: "🏛️",
    blurb: "State branches, local government and Tribal governments",
    parentNote:
      "The powers and operations of Minnesota's government under its constitution: the Legislature, the governor and other statewide officers, the courts, the state budget, counties, cities, townships and school districts, and how Tribal governments work with the state.",
    standards: ["9.1.4.7; 9.1.4.8; 9.1.6.3", "the powers and operations of Minnesota's state and local governments, and the governing structures of Tribal Nations in Minnesota"],
    items: STATE,
  }),
  copyOf(
    from(CALIFORNIA_9, "ca-g9-foundations"),
    {
      id: "mn-g9-foundations",
      title: "Foundations of Democracy",
      emoji: "📜",
      blurb: "Ideas behind the Constitution",
      parentNote: "Practices the founding ideas of the US government (natural rights, popular sovereignty, the social contract, limited government and the rule of law) and why democratic values matter for fair elections.",
      standards: ["9.1.2.1; 9.1.2.2", "the founding ideas of the US government, and democratic values"],
    },
  ),
  copyOf(
    from(CALIFORNIA_9, "ca-g9-three-branches"),
    {
      id: "mn-g9-three-branches",
      title: "Three Branches",
      emoji: "⚖️",
      blurb: "Congress, the president and the courts",
      parentNote: "Practices the purposes, organization and powers of Congress, the president and the federal courts under Articles 1 to 3 of the Constitution, and checks and balances.",
      standards: ["9.1.4.2; 9.1.4.3; 9.1.4.4", "the legislative, executive and judicial branches"],
    },
    [
      ["Minnesota has how many seats in the US House of Representatives?", "8", ["2", "50", "100"], "Based on population.", true],
      ["Like every state, Minnesota elects how many US senators?", "2", ["1", "8", "10"], "Every state is equal in the Senate."],
    ]
  ),
  copyOf(
    from(CALIFORNIA_9, "ca-g9-rights"),
    {
      id: "mn-g9-rights",
      title: "Rights & Responsibilities",
      emoji: "🗽",
      blurb: "The Bill of Rights and citizens' duties",
      parentNote: "Practices the rights in the Constitution, the Bill of Rights and later amendments, their limits, and the responsibilities and duties of people in a republic.",
      standards: ["9.1.3.1; 9.1.3.6", "rights in the Constitution and Bill of Rights, and a citizen's duties"],
    },
  ),
  copyOf(
    from(CALIFORNIA_9, "ca-g9-supreme-court"),
    {
      id: "mn-g9-supreme-court",
      title: "Landmark Supreme Court Cases",
      emoji: "🔨",
      blurb: "How the Court reads the Constitution",
      parentNote: "Practices landmark Supreme Court cases and how the Court has interpreted due process and equal protection over time.",
      standards: ["9.1.3.5; 9.1.4.4", "landmark Supreme Court cases on due process and equal protection"],
    },
    [
      ["In Near v. Minnesota (1931), the Supreme Court ruled that the government usually can't stop a newspaper from publishing in advance. This protects…", "freedom of the press", ["the right to bear arms", "the right to a jury", "freedom from search"], "First Amendment.", true],
    ]
  ),
  copyOf(
    from(CALIFORNIA_9, "ca-g9-elections"),
    {
      id: "mn-g9-elections",
      title: "Elections & Voting",
      emoji: "🗳️",
      blurb: "From registering to the Electoral College",
      parentNote: "Practices how people register and vote, primaries and parties, the Electoral College, campaigns and polls, and redistricting, with how Minnesota runs its elections.",
      standards: ["9.1.4.5; 9.1.1.2", "elections and how to take part in them"],
    },
    [
      ["Minnesota lets eligible voters register…", "at the polls on Election Day", ["only a year ahead", "only by email", "never"], "Same-day registration."],
      ["Minnesota's voter turnout is often…", "among the highest in the nation", ["the lowest in the nation", "zero", "not recorded"], "Many Minnesotans vote."],
      ["Minneapolis and St. Paul let voters rank candidates in order of preference in city elections. This is called…", "ranked-choice voting", ["the Electoral College", "a filibuster", "gerrymandering"], "First, second and third choices."],
      ["In Minnesota, the political party called the DFL stands for…", "Democratic-Farmer-Labor", ["Democrats for Liberty", "Direct Federal Law", "Duluth Farmers League"], "Formed in 1944.", true],
    ]
  ),
  copyOf(
    from(CALIFORNIA_9, "ca-g9-lawmaking"),
    {
      id: "mn-g9-lawmaking",
      title: "How Laws Are Made",
      emoji: "📝",
      blurb: "Bills, vetoes and kinds of laws",
      parentNote: "Practices how a bill becomes a law in Congress and in the Minnesota Legislature, committees, vetoes and overrides, regulations, the kinds of laws, and how citizens influence lawmaking.",
      standards: ["9.1.4.6; 9.1.4.2", "how laws are made, and the kinds of laws"],
    },
    [
      ["In Minnesota, state laws are passed by the Legislature, which meets in…", "St. Paul", ["Minneapolis", "Duluth", "Washington, D.C."], "The capital."],
      ["Unlike some states, Minnesota does not let citizens pass laws directly by…", "ballot initiative", ["voting for legislators", "writing to the governor", "testifying at hearings"], "No citizen initiative.", true],
    ]
  ),
  copyOf(
    from(OREGON_9, "or-g9-supply-demand"),
    {
      id: "mn-g9-supply-demand",
      title: "Supply & Demand",
      emoji: "📈",
      blurb: "Shifts, prices, shortages and surpluses",
      parentNote: "Practices how buyers and sellers set market prices, what shifts supply and demand, and shortages and surpluses.",
      standards: ["9.2.10.4; 9.2.10.5", "supply, demand and market prices"],
    },
    [
      ["A record corn harvest in Minnesota and other states increases the supply of corn. The price of corn will most likely…", "fall", ["rise", "stay exactly the same", "become zero"], "More supply, lower price."],
    ]
  ),
];
