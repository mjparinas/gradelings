import type { Unit } from "../../types";
import { SOCIAL_9 as CALIFORNIA_9 } from "../../california/units/social-g9";
import { G9 as WASHINGTON_9 } from "../../washington/units/social-59-g9";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Texas social studies, Grade 9: United States Government (19 TAC §113.44, cited as GOV.). Texas schools usually teach
// it in high school; here it is the Grade 9 course, as in the other US states. California's and Washington's units are
// copied without their state's places, with Texas items added; Texas's own unit covers federalism and Texas
// government. Court cases and political questions are described factually and from more than one side.

const BRANCHES_TEXAS: Q[] = [
  ["How many US senators does Texas have?", "2", ["38", "31", "40"], "Every state has two senators."],
  ["NASA, whose Johnson Space Center is in Houston, is an example of…", "an independent executive agency", ["a federal court", "a committee of Congress", "a state agency"], "It reports to the president but is not a cabinet department."],
  ["Why does Texas have more members in the US House than Wyoming?", "House seats are based on population", ["Texas is older", "Texas asked for more", "seats are based on land area only"], "Each state has at least one."],
];

const RIGHTS_TEXAS: Q[] = [
  ["The Declaration of Independence names unalienable rights as life, liberty and…", "the pursuit of happiness", ["property taxes", "a free education", "the right to vote"], "Unalienable rights cannot be taken away by government."],
  ["The First Amendment says Congress shall make no law respecting an establishment of religion, or prohibiting…", "the free exercise thereof", ["any taxes", "jury trials", "the right to vote"], "The Founders protected religious freedom for all."],
  ["Due process means the government must…", "follow fair, established legal procedures before taking away life, liberty or property", ["arrest suspects without a reason", "skip trials to save time", "let the president decide every case"], "It is in the 5th and 14th Amendments."],
  ["The 14th Amendment (1868) was adopted after the Civil War to…", "guarantee citizenship and equal protection to people who had been enslaved", ["end the income tax", "lower the voting age", "create the Senate"], "Courts later used it to apply the Bill of Rights to the states.", true],
];

const COURT_TEXAS: Q[] = [
  ["Texas v. Johnson (1989) ruled that burning the US flag as a political protest is…", "symbolic speech protected by the First Amendment", ["always a federal crime", "allowed only on holidays", "a state power the courts cannot review"], "The case began in Dallas."],
  ["Hernandez v. Texas (1954) ruled that the 14th Amendment protects…", "Mexican Americans from being kept off juries", ["only people born in Texas", "states from federal taxes", "the right to bear arms"], "It was argued by Mexican American lawyers."],
  ["Sweatt v. Painter (1950) ordered the University of Texas law school to…", "admit Heman Sweatt, a Black student", ["close its doors", "move to Houston", "stop teaching law"], "It helped lead to Brown v. Board of Education."],
  ["Engel v. Vitale (1962) ruled that a state-written prayer led by public schools…", "violated the First Amendment's establishment clause", ["was required by the Constitution", "was a power of Congress", "was a matter for the president"], "Students may still pray on their own."],
  ["Schenck v. United States (1919) introduced the idea that speech creating a…", "clear and present danger can be limited", ["loud noise is always illegal", "newspaper must be licensed", "letter to Congress is a crime"], "Brandenburg v. Ohio later narrowed it."],
  ["Baker v. Carr (1962) allowed federal courts to hear cases about…", "unequal populations in voting districts", ["presidential pardons", "the size of the Senate", "the president's cabinet"], "It led to the idea of “one person, one vote.”", true],
];

const ELECTIONS_TEXAS: Q[] = [
  ["How many electoral votes does Texas have in the 2024 to 2028 elections?", "40", ["38", "54", "2"], "Electoral votes equal House seats plus two senators."],
  ["How many members does Texas send to the US House?", "38", ["40", "2", "150"], "Seats are based on population."],
  ["To vote in a Texas election, you must register at least…", "30 days before Election Day", ["on Election Day", "one year before", "after you vote"], "You can apply at 17 years and 10 months if you will be 18 by Election Day."],
  ["Texas has open primaries, which means voters…", "choose which party's primary to vote in on primary day", ["must join a party a year ahead", "vote in every party's primary", "cannot vote in primaries"], "You may vote in only one party's primary in an election."],
  ["If no candidate wins a majority in a Texas primary, the top two…", "meet again in a runoff", ["share the office", "are both eliminated", "flip a coin"], "Runoffs are held a few weeks later."],
  ["Texas voters who vote in person are asked to show…", "an acceptable photo ID", ["a library card", "a report card", "nothing at all"], "There are options for voters who cannot get one."],
  ["Who oversees elections statewide in Texas?", "the Texas secretary of state", ["the lieutenant governor", "the comptroller", "the mayor of Austin"], "County officials run local voting."],
  ["The 17th Amendment (1913) changed how senators are chosen from…", "state legislatures to direct election by voters", ["voters to the president", "the House to the courts", "governors to Congress"], "Before 1913, state legislatures picked senators.", true],
];

const LAWMAKING_TEXAS: Q[] = [
  ["The Texas Legislature meets in regular session in odd-numbered years for up to…", "140 days", ["365 days", "10 days", "4 years"], "Texas is one of a few states with sessions every two years."],
  ["Who can call the Texas Legislature into a special session?", "the governor", ["any senator", "the US president", "the Supreme Court of Texas"], "A special session lasts up to 30 days."],
  ["The Texas Legislature meets in the State Capitol in…", "Austin", ["Houston", "Dallas", "San Antonio"], "It has a Senate and a House of Representatives."],
  ["The Texas governor's line-item veto lets the governor strike out…", "single items in a spending bill", ["any word in any law", "court decisions", "votes in an election"], "The president does not have this power."],
  ["To override a governor's veto, the Texas Legislature needs…", "a two-thirds vote in each house", ["a simple majority", "a court order", "a recall"], "Overrides are rare."],
  ["Texas citizens cannot put a statewide law on the ballot themselves, because Texas has no…", "statewide citizen initiative", ["governor", "legislature", "elections"], "Some Texas cities do allow local initiatives.", true],
];

const ECONOMY_TEXAS: Q[] = [
  ["Unlike most states, Texas has no state…", "personal income tax", ["sales tax", "property tax", "government"], "Texas relies more on sales and property taxes."],
  ["The biggest single source of tax money for the Texas state government is the…", "sales tax", ["income tax", "toll on rivers", "lottery"], "The comptroller collects it."],
  ["In Texas, local property taxes pay for much of the cost of…", "public schools", ["the US Army", "national parks", "the Supreme Court"], "School districts set tax rates within state limits."],
  ["The Texas Economic Stabilization Fund, or Rainy Day Fund, is filled largely by taxes on…", "oil and gas production", ["movie tickets", "income", "library books"], "It saves money for hard times.", true],
  ["Trade agreements the president negotiates, such as the USMCA with Mexico and Canada, need approval from…", "Congress", ["the governors", "the United Nations", "the Supreme Court alone"], "Mexico is Texas's largest trading partner."],
];

const TEXAS_GOV: Q[] = [
  ["The Texas Constitution in use today was adopted in…", "1876", ["1836", "1845", "1945"], "It replaced the constitution of 1869."],
  ["The Texas Legislature has a Senate with 31 members and a House with…", "150 members", ["100 members", "31 members", "435 members"], "Representatives serve two-year terms."],
  ["Who presides over the Texas Senate?", "the lieutenant governor", ["the governor", "the attorney general", "the chief justice"], "The lieutenant governor is elected statewide."],
  ["Who presides over the Texas House of Representatives?", "the Speaker of the House", ["the governor", "the lieutenant governor", "the secretary of state"], "Members choose the Speaker."],
  ["Texas's highest court for civil cases is the…", "Supreme Court of Texas", ["Court of Criminal Appeals", "US Supreme Court", "county court"], "Texas has two high courts."],
  ["Texas's highest court for criminal cases is the…", "Court of Criminal Appeals", ["Supreme Court of Texas", "US Supreme Court", "city council"], "Only Texas and Oklahoma split their high courts this way."],
  ["How many counties does Texas have?", "254", ["50", "100", "1,000"], "That is more than any other state."],
  ["A Texas county is governed by a…", "commissioners court", ["city council", "state senate", "school board"], "A county judge and four commissioners lead it."],
  ["Texas has a plural executive, which means…", "several top officials are elected separately instead of chosen by the governor", ["Texas has two governors", "the governor makes every decision", "the legislature runs the executive branch"], "Voters elect the lieutenant governor, attorney general and comptroller."],
  ["A Texas governor serves a term of…", "four years, with no term limit", ["two years, with one term only", "six years", "life"], "Elections are held in even years between presidential elections."],
  ["Texas judges, including Supreme Court of Texas justices, are chosen mainly by…", "partisan elections", ["appointment for life", "the US president", "a lottery"], "The governor fills vacancies until the next election."],
  ["Texas mayors and city council members are usually chosen in…", "nonpartisan elections", ["party primaries only", "appointments by the governor", "elections held by Congress"], "Party labels do not appear on city ballots."],
  ["In Texas, the secretary of state is…", "appointed by the governor", ["elected by voters", "chosen by the Speaker", "named by the president"], "Most other top officials are elected."],
  ["The Texas attorney general is…", "the state's lawyer, elected statewide", ["a federal judge", "the leader of the House", "appointed by the president"], "The office represents Texas in court."],
  ["Independent school districts in Texas are run by…", "elected boards of trustees", ["the governor", "the US Congress", "the county sheriff"], "Voters elect board members locally."],
  ["Which power belongs only to the national government?", "coining money", ["collecting taxes", "building roads", "making laws"], "These are called delegated, or enumerated, powers."],
  ["Which power is reserved to the states?", "creating local governments such as counties and cities", ["declaring war", "coining money", "running foreign policy"], "The 10th Amendment reserves powers to the states."],
  ["Which is a concurrent, or shared, power?", "collecting taxes", ["declaring war", "coining money", "admitting new states"], "Both national and state governments use it."],
  ["The 10th Amendment says powers not given to the national government are…", "reserved to the states or the people", ["given to the president", "banned forever", "held by the courts"], "It is part of the Bill of Rights."],
  ["The supremacy clause means that when a state law conflicts with the Constitution or a federal law…", "the federal law wins", ["the state law wins", "both are canceled", "the governor decides"], "It is in Article VI."],
  ["The Constitution limits state governments by forbidding them to…", "coin their own money", ["collect a sales tax", "run public schools", "build highways"], "Article I, Section 10 lists limits on the states."],
  ["Under the 14th Amendment, most of the Bill of Rights now limits…", "both the national and state governments", ["only city councils", "only the president", "no government at all"], "Courts applied the rights to the states case by case."],
  ["The Founders chose federalism instead of a unitary system because they wanted…", "a national government strong enough to govern, with states keeping many powers", ["a king to rule the states", "no national government", "states with no powers"], "The Articles of Confederation had been too weak.", true],
  ["The Nullification Crisis of 1832 and the Civil War were conflicts over…", "the powers of the states compared with the national government", ["the size of the Supreme Court", "the price of cotton only", "who would be king"], "Arguments about state and national power continue today.", true],
  ["When Congress offers states highway money only if they set the drinking age at 21, it shows…", "how the national government uses grants to influence states", ["that states have no powers", "that the Constitution bans highways", "that cities make national laws"], "This happened in 1984.", true],
  ["Amendments to the Texas Constitution become part of it when…", "two-thirds of each house proposes them and voters approve them", ["the governor signs them alone", "the US Congress passes them", "a county judge approves them"], "Texans vote on amendments in many November elections.", true],
  ["The Texas Constitution has been amended more than 500 times mainly because…", "it is very detailed, so many changes need an amendment", ["it is only one page long", "the US Constitution requires it", "amendments are made every week"], "The US Constitution has 27 amendments.", true],
  ["The Railroad Commission of Texas today mainly regulates…", "the oil and gas industry", ["passenger trains only", "public schools", "national parks"], "Its name comes from its first job, regulating railroads.", true],
  ["Texas cities with more than 5,000 people can become home-rule cities, which means they can…", "adopt their own charter", ["ignore state law", "print money", "make their own army"], "A charter is a city's basic plan of government.", true],
];

export const SOCIAL_9: Unit[] = [
  copyOf(
    from(CALIFORNIA_9, "ca-g9-three-branches"),
    {
      id: "tx-g9-three-branches",
      title: "Three Branches",
      emoji: "🏛️",
      blurb: "Congress, the president and the courts",
      parentNote:
        "How Articles I, II and III set up Congress, the presidency and the courts, terms and numbers, independent agencies such as NASA, checks and balances, and how the Constitution is amended.",
      standards: ["GOV.6(E); GOV.7(A); GOV.7(B); GOV.7(C); GOV.7(D); GOV.7(E)", "the structure and functions of the three branches, independent agencies, checks and balances, and amending the Constitution"],
    },
    BRANCHES_TEXAS,
  ),
  copyOf(
    from(CALIFORNIA_9, "ca-g9-rights"),
    {
      id: "tx-g9-rights",
      title: "Rights & Responsibilities",
      emoji: "⚖️",
      blurb: "The Bill of Rights and citizens' duties",
      parentNote:
        "Unalienable rights, the freedoms in the Bill of Rights and later amendments, religious freedom, due process, the 14th Amendment, civil rights laws, and citizens' duties such as jury service and paying taxes.",
      standards: ["GOV.12(A); GOV.12(B); GOV.12(C); GOV.12(D); GOV.12(F); GOV.12(G)", "unalienable rights, the Bill of Rights, religious freedom, due process and the 14th Amendment"],
    },
    RIGHTS_TEXAS,
  ),
  copyOf(
    from(CALIFORNIA_9, "ca-g9-supreme-court"),
    {
      id: "tx-g9-supreme-court",
      title: "Landmark Supreme Court Cases",
      emoji: "👩‍⚖️",
      blurb: "How the Court reads the Constitution",
      parentNote:
        "Landmark decisions such as Marbury v. Madison, Engel v. Vitale, Schenck, Brandenburg, Texas v. Johnson, Miranda, Gideon and Mapp, cases about Texas such as Hernandez v. Texas and Sweatt v. Painter, and judicial activism and restraint, presented factually and from more than one side.",
      standards: ["GOV.3(C); GOV.7(F); GOV.12(E); GOV.16(A)", "landmark Supreme Court interpretations of rights, judicial activism and restraint, and decisions that affected particular groups"],
    },
    COURT_TEXAS,
  ),
  copyOf(
    from(CALIFORNIA_9, "ca-g9-elections"),
    {
      id: "tx-g9-elections",
      title: "Elections & Voting",
      emoji: "🗳️",
      blurb: "Registering, primaries and the Electoral College",
      parentNote:
        "How Texans register and vote, open primaries and runoffs, political parties and third parties, the Electoral College, the 17th Amendment, campaigns, and redistricting after the census.",
      standards: ["GOV.3(A); GOV.9(B); GOV.9(C); GOV.10(A); GOV.10(B); GOV.13(C)", "political parties, the Electoral College, the 17th Amendment, and how to register and who may vote"],
    },
    ELECTIONS_TEXAS,
  ),
  copyOf(
    from(CALIFORNIA_9, "ca-g9-lawmaking"),
    {
      id: "tx-g9-lawmaking",
      title: "How Laws Are Made",
      emoji: "📑",
      blurb: "Bills and vetoes, in Congress and in Austin",
      parentNote:
        "How a bill becomes law in Congress and in the Texas Legislature, committees, vetoes and overrides, the governor's line-item veto and special sessions, regulations, and how citizens and interest groups influence lawmaking.",
      standards: ["GOV.2(A); GOV.7(A); GOV.7(H)", "how bills become law in Congress and the Texas Legislature, and how individuals and groups affect public policy"],
    },
    LAWMAKING_TEXAS,
  ),
  copyOf(
    from(WASHINGTON_9, "wa-g9-government-economy"),
    {
      id: "tx-g9-economy",
      title: "Government & the Economy",
      emoji: "💵",
      blurb: "Taxes, budgets and policy",
      parentNote:
        "How governments raise and spend money, Texas's taxes and Rainy Day Fund, deficits and debt, fiscal and monetary policy, regulation, the free enterprise system, and trade policy.",
      standards: ["GOV.4(A); GOV.4(B); GOV.4(C); GOV.5(B)", "government fiscal and regulatory policy at each level, free enterprise, taxation, and trade policy"],
    },
    ECONOMY_TEXAS,
  ),
  bankUnit({
    id: "tx-g9-texas-government",
    title: "Federalism & Texas Government",
    emoji: "⭐",
    blurb: "National, state and local powers",
    parentNote:
      "Why the Founders chose federalism, national, reserved and shared powers, the supremacy clause and limits on the states, conflicts between state and national government, and how Texas is governed: the Constitution of 1876, the Legislature, the plural executive, the two high courts, counties, cities and school districts.",
    standards: [
      "GOV.7(H); GOV.8(A); GOV.8(B); GOV.8(C); GOV.8(D); GOV.9(A)",
      "federalism, national, state and shared powers, and the structures of national, state and local government in Texas",
    ],
    items: TEXAS_GOV,
  }),
];
