import type { Unit } from "../../types";
import { SOCIAL_9 as MAINE_9 } from "../../maine/units/social-g9";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Kentucky Grade 9 social studies, high school civics and economics: how the Kentucky Constitution embodies rule of
// law, popular sovereignty and separation of powers, Kentucky's government compared with other states and the federal
// government, and how active citizens bring about change in Kentucky (HS.C.KGO.1 to HS.C.KGO.3); Kentucky's economy, its
// market structures, the national and international trends that shape it, and GDP (HS.E.KE.1 to HS.E.KE.3); plus a copy
// of Maine's personal finance unit without its state's items, with Kentucky items added (HS.E.MA.5, HS.E.IC.3).

const GOVERNING: Q[] = [
  ["Kentucky has had four constitutions. The one in force today was adopted in…", "1891", ["1776", "1792", "1965"], "It replaced the constitution of 1850."],
  ["Section 4 of the Kentucky Constitution says that all power is inherent in…", "the people", ["the governor", "the General Assembly", "the courts"], "This is popular sovereignty."],
  ["The Kentucky Constitution says absolute and arbitrary power exists nowhere in a republic, “not even in the largest…”", "majority", ["army", "county", "city"], "Even a majority's power is limited by law."],
  ["Kentucky's legislature, the General Assembly, has a Senate of 38 members and a House of Representatives of…", "100 members", ["38 members", "435 members", "120 members"], "House districts are smaller than Senate districts."],
  ["Kentucky state senators serve four-year terms. State representatives serve…", "two-year terms", ["six-year terms", "life terms", "one-year terms"], "The whole House is elected every two years."],
  ["Kentucky's governor may serve…", "two four-year terms in a row", ["one two-year term", "for life", "unlimited terms in a row"], "Voters approved succession in 1992."],
  ["Kentucky elects its governor in…", "odd-numbered years, like 2023 and 2027", ["every presidential election year", "every year", "years ending in zero"], "It is one of a few states that do."],
  ["In Kentucky, the governor and lieutenant governor are elected…", "together as a team", ["in different years", "by the General Assembly", "by the Supreme Court"], "They run on one ticket."],
  ["Which Kentucky statewide officer is the state's chief lawyer?", "the attorney general", ["the treasurer", "the auditor", "the commissioner of agriculture"], "The attorney general represents the state in court."],
  ["Which Kentucky statewide officer oversees elections?", "the secretary of state", ["the treasurer", "the attorney general", "the auditor"], "The secretary of state chairs the State Board of Elections."],
  ["Kentucky's highest court is the…", "Kentucky Supreme Court", ["Court of Appeals", "fiscal court", "General Assembly"], "It has seven justices."],
  ["Kentucky Supreme Court justices are chosen by…", "voters in nonpartisan elections, for eight-year terms", ["the President, for life", "the governor alone, for life", "the General Assembly, every year"], "Federal judges, by contrast, are appointed for life."],
  ["To override a governor's veto, the Kentucky General Assembly needs…", "a majority of all members of each house", ["two-thirds of each house", "the Supreme Court's approval", "a vote of the people"], "Congress needs two-thirds to override a President."],
  ["Kentucky's 120 counties are each governed by a…", "fiscal court led by a county judge/executive", ["king", "school board", "General Assembly"], "Fiscal courts set county budgets."],
  ["A proposed amendment to the Kentucky Constitution must be passed by three-fifths of each house and then…", "approved by Kentucky voters", ["signed by the President", "approved by Congress", "approved by the Supreme Court only"], "Voters decide amendments at a general election."],
  ["Unlike some states, Kentucky citizens cannot put a new law on the ballot by…", "gathering signatures for an initiative", ["voting", "contacting legislators", "testifying at hearings"], "Kentucky has no citizen initiative."],
  ["In Rose v. Council for Better Education (1989), the Kentucky Supreme Court ruled that…", "the state's school system did not meet the constitution's demand for efficient schools", ["Kentucky must have no schools", "the governor could close schools", "schools should be run by the federal government"], "The ruling led to a new school law in 1990."],
  ["After the Rose ruling, the General Assembly passed the Kentucky Education Reform Act of 1990. This shows…", "the judicial and legislative branches checking and responding to each other", ["the courts writing laws alone", "the governor ignoring the courts", "no branch having any power"], "Branches check one another."],
  ["How is Kentucky's government like the federal government?", "both separate power among three branches", ["both elect judges", "both have a 100-member House", "neither can be amended"], "Separation of powers is shared."],
  ["Kentucky state law and federal law both apply in Kentucky. Under the US Constitution, when they truly conflict…", "federal law wins", ["state law always wins", "the county decides", "neither applies"], "This is the supremacy clause."],
  ["A Kentuckian who wants a bill passed can testify before a…", "legislative committee", ["jury", "fiscal court only", "federal court"], "Committees hold hearings on bills.", true],
  ["Kentucky's General Assembly meets for 60 legislative days in even-numbered years and…", "30 days in odd-numbered years", ["365 days every year", "never in odd years", "one day every ten years"], "Voters approved annual sessions in 2000.", true],
  ["Why do people argue about whether Kentucky judges should be elected?", "elections make judges answer to voters but may bring politics into courts", ["judges are never elected", "elections make courts disappear", "everyone agrees completely"], "Weigh accountability against independence.", true],
  ["Which is an example of an active citizen changing a Kentucky community?", "organizing neighbors to ask the city council for a safer crosswalk", ["skipping every election", "ignoring local news", "staying silent about a problem"], "Local action can change policy.", true],
  ["Kentucky's executive branch carries out laws through cabinets, such as the Education and Labor Cabinet and the…", "Transportation Cabinet", ["Supreme Court", "House of Representatives", "Electoral College"], "Cabinets run state programs.", true],
  ["How does Kentucky's veto override differ from the federal one, and what does it mean?", "Kentucky needs only a majority, so its legislature is relatively strong against the governor", ["Kentucky needs a unanimous vote", "Kentucky has no veto", "the governor can't be overridden"], "Compare majority with two-thirds.", true],
];

const ECONOMY: Q[] = [
  ["Gross domestic product (GDP) measures…", "the value of all final goods and services made in a place in a year", ["the number of workers", "the amount of money printed", "how much people save"], "It is the main measure of an economy's size."],
  ["The four parts of GDP are consumer spending, business investment, government spending and…", "net exports", ["taxes paid", "money printed", "savings accounts"], "Exports minus imports."],
  ["A family in Lexington buying groceries adds to which part of GDP?", "consumer spending", ["investment", "government spending", "net exports"], "Households buying goods and services."],
  ["A company building a new factory in Kentucky adds to which part of GDP?", "investment", ["consumer spending", "government spending", "net exports"], "Investment is spending on capital."],
  ["The state paying to repave a Kentucky interstate adds to which part of GDP?", "government spending", ["consumer spending", "investment", "net exports"], "Governments buy goods and services too."],
  ["Aircraft parts and cars made in Kentucky and sold abroad add to which part of GDP?", "net exports", ["consumer spending", "government spending", "investment"], "Exports bring money in."],
  ["If Kentucky's GDP falls for two quarters in a row, economists may say the economy is in a…", "recession", ["boom", "monopoly", "surplus"], "Output is shrinking."],
  ["Kentucky's electric companies are regulated by the Public Service Commission because they are…", "natural monopolies in their areas", ["perfectly competitive", "owned by the federal government", "illegal"], "Regulators set rates where there is no competition."],
  ["Many Kentucky corn and soybean farmers sell nearly identical crops at market prices. This is close to…", "perfect competition", ["monopoly", "oligopoly", "a command economy"], "No single farmer can set the price."],
  ["A few very large companies make most of the cars sold in the United States. This market structure is an…", "oligopoly", ["perfect competition", "monopoly", "barter system"], "A few sellers dominate."],
  ["Restaurants in Louisville sell similar but different meals and compete on taste and price. This is…", "monopolistic competition", ["monopoly", "oligopoly", "perfect competition"], "Many sellers, each a little different."],
  ["A monopoly can usually charge…", "higher prices and make less than a competitive market would", ["lower prices than anyone", "nothing", "only what the government says, always"], "Without rivals, a seller has power over price."],
  ["As power plants switched from coal to natural gas and renewable energy, eastern Kentucky saw…", "a sharp drop in coal mining jobs", ["a rise in coal jobs", "no change", "new ocean ports"], "National energy trends reach local economies."],
  ["Kentucky's largest export category in recent years has been…", "aerospace products and parts", ["bananas", "seafood", "cotton cloth"], "Much of it goes to Europe."],
  ["When another country puts tariffs on Kentucky's exports, Kentucky producers may…", "sell less abroad", ["sell more abroad", "pay no taxes", "get free shipping"], "Tariffs raise prices for foreign buyers."],
  ["When the Federal Reserve raises interest rates, Kentucky families buying homes or cars usually…", "pay more to borrow", ["pay less to borrow", "get free loans", "pay no interest"], "Interest is the price of borrowing."],
  ["Factories making batteries for electric vehicles opened in Kentucky in the 2020s because of…", "national and global demand for electric cars", ["a drop in car demand", "Kentucky's beaches", "a ban on cars"], "Global trends create new industries."],
  ["Why do economists use real GDP, not just GDP, to compare Kentucky's economy over time?", "real GDP removes the effect of inflation", ["real GDP counts only farms", "real GDP ignores services", "it is the same thing"], "Rising prices alone can raise GDP.", true],
  ["Kentucky's car and truck plants depend on parts shipped from many states and countries. A shortage of computer chips overseas would most likely…", "slow production in Kentucky", ["speed up production", "lower car prices", "have no effect"], "Global supply chains link economies.", true],
  ["Why might a new auto plant raise incomes beyond the plant itself?", "workers' spending creates jobs at stores and suppliers", ["plants pay no wages", "it lowers everyone's pay", "it ends other businesses"], "Spending multiplies through the economy.", true],
  ["Kentucky cities often offer tax breaks to companies that build plants there. This is an example of…", "an incentive", ["a monopoly", "a tariff", "a recession"], "Incentives change decisions.", true],
  ["How might a national recession affect Kentucky's state budget?", "lower tax revenue and more demand for services", ["more tax revenue and fewer needs", "no effect", "the state would print money"], "States can't print money.", true],
  ["A strong US dollar makes Kentucky's exports…", "more expensive for foreign buyers", ["cheaper for foreign buyers", "free", "illegal"], "Exchange rates affect trade.", true],
  ["Why do eastern Kentucky communities work to attract new industries, such as tourism and manufacturing?", "to replace jobs lost as coal declined", ["because coal jobs are growing fast", "to close their towns", "because tourism is banned"], "Diversifying an economy spreads risk.", true],
];

const FINANCE_EXTRA: Q[] = [
  ["Kentucky's sales tax on most goods is…", "6 percent", ["60 percent", "0.6 percent", "100 percent"], "It is added at the register."],
  ["Kentucky's state income tax charges…", "one flat rate on taxable income", ["a different rate for each county", "nothing at all", "only on tips"], "Every earner pays the same percent of taxable income.", true],
  ["Kentucky's 529 plan, which helps families save for college, is called…", "KY Saves 529", ["Bluegrass Bank", "Derby Fund", "Commonwealth Lottery"], "Money in a 529 plan grows for education.", true],
];

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "ky-g9-governing-kentucky",
    title: "Governing Kentucky",
    emoji: "🗳️",
    blurb: "The 1891 constitution, Frankfort and change",
    parentNote: "How Kentucky governs itself: the 1891 constitution and its principles, the General Assembly, the governor and statewide officers, elected judges and the Rose case, vetoes and overrides, counties and fiscal courts, amendments and the lack of a citizen initiative, Kentucky compared with the federal government, and how active citizens bring change.",
    standards: ["HS.C.KGO.1; HS.C.KGO.2; HS.C.KGO.3", "how the Kentucky Constitution embodies rule of law, popular sovereignty, separation of powers and checks and balances, Kentucky's government compared with other states and the federal government, and how active citizens bring change"],
    items: GOVERNING,
  }),
  bankUnit({
    id: "ky-g9-kentucky-economy",
    title: "Kentucky's Economy",
    emoji: "📈",
    blurb: "GDP, market structures and global trends",
    parentNote: "Kentucky's economy today: the four parts of GDP, recessions and real GDP, market structures from regulated utilities and farm markets to car makers and restaurants, and how national and international trends (energy, exports, tariffs, interest rates and supply chains) affect Kentucky.",
    standards: ["HS.E.KE.1; HS.E.KE.2; HS.E.KE.3", "market structures in Kentucky, how national and international trends affect Kentucky's economy, and how the components of GDP measure its health"],
    items: ECONOMY,
  }),
  copyOf(
    from(MAINE_9, "me-g9-personal-finance"),
    {
      id: "ky-g9-personal-finance",
      title: "Money Smarts",
      emoji: "💳",
      blurb: "Pay, interest, credit and risk",
      parentNote: "Personal finance: gross and net pay, simple and compound interest, the Rule of 72, discounts, credit cards and credit scores, budgets and emergency funds, banks and credit unions, insurance, and spreading risk across investments.",
      standards: ["HS.E.MA.5; HS.E.IC.3", "how interest rates influence borrowing and investing, and weighing the costs and benefits of a decision"],
    },
    FINANCE_EXTRA,
  ),
];
