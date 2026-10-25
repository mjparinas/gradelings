import type { Unit } from "../../types";
import { SOCIAL_9 as MAINE_9 } from "../../maine/units/social-g9";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Connecticut Grade 9 social studies, Civics and Government: how Connecticut governs itself under the 1965 constitution
// next to the federal and tribal governments, with its 169 towns, town meetings, elections and the people who run them
// (CG.Civ.1.a, CG.Civ.1.b, CG.Civ.2.a, CG.Civ.3.a, CG.Civ.8.a, CG.Civ.8.b), plus copies of Maine's United States
// government and economics units without their Maine items, with Connecticut items added (CG.Civ.4.b, CG.Civ.4.c,
// CG.Civ.3.b, CG.Civ.2.e, CG.Eco.7.a, CG.Eco.9.a).

const GOVERNING: Q[] = [
  ["Connecticut's current constitution was adopted in…", "1965", ["1639", "1818"], "It replaced the constitution of 1818."],
  ["Connecticut's constitution begins with a…", "Declaration of Rights", ["list of towns", "tax code"], "Like the US Constitution, it protects rights."],
  ["How many statewide executive officers do Connecticut voters elect?", "six", ["two", "twelve"], "Governor, lieutenant governor, secretary of the state, treasurer, comptroller and attorney general."],
  ["The governor and lieutenant governor of Connecticut are elected…", "together on one ticket", ["in different years", "by the General Assembly"], "They run as a team, like the President and Vice President."],
  ["How long is the Connecticut governor's term?", "4 years", ["2 years", "6 years"], "Connecticut has no term limit for governor."],
  ["Connecticut's secretary of the state is the official who…", "oversees elections and keeps state records", ["leads the state police", "runs the courts"], "The office also registers businesses."],
  ["Connecticut's comptroller…", "keeps the state's accounts and pays its employees", ["writes the laws", "commands the National Guard"], "The treasurer invests and holds state money."],
  ["Connecticut's legislature is called the…", "General Assembly", ["Congress", "Parliament"], "It meets at the State Capitol in Hartford."],
  ["How many members serve in the Connecticut General Assembly?", "187", ["100", "435"], "36 senators and 151 representatives."],
  ["Connecticut state senators and representatives serve terms of…", "2 years", ["4 years", "6 years"], "Every seat is on the ballot in each even year."],
  ["To override a governor's veto, the General Assembly needs…", "a two-thirds vote in each house", ["a simple majority in one house", "the Supreme Court's approval"], "The same as Congress needs."],
  ["A line-item veto lets Connecticut's governor…", "reject single spending items in a budget bill", ["write a new law alone", "cancel an election"], "The General Assembly can override it."],
  ["How many justices sit on the Connecticut Supreme Court?", "7", ["9", "5"], "It is the state's highest court."],
  ["Connecticut Supreme Court justices are…", "nominated by the governor and appointed by the General Assembly", ["elected by voters", "chosen by the US President"], "They serve 8-year terms."],
  ["How many towns does Connecticut have?", "169", ["8", "50"], "Every part of the state is in a town or city."],
  ["Connecticut ended its county governments in…", "1960", ["1776", "2020"], "Towns and the state took over their jobs."],
  ["In a town meeting, voters…", "decide local questions themselves", ["elect the President", "choose state judges"], "It is a form of direct democracy."],
  ["Many smaller Connecticut towns are led by a…", "board of selectmen", ["king", "Senate"], "The first selectman is the town's chief officer."],
  ["Each Connecticut town has registrars of voters who…", "keep the voter list and run local elections", ["write state laws", "collect federal taxes"], "Most towns have two, from different parties."],
  ["Since 2024, Connecticut voters can…", "vote early in person before Election Day", ["vote only by phone", "vote at age 14"], "Voters approved early voting in 2022."],
  ["Connecticut lets eligible people register to vote…", "on Election Day at a registration site in their town", ["only a year before", "only by mail"], "This is Election Day registration."],
  ["How many electoral votes does Connecticut have in presidential elections?", "7", ["5", "2"], "5 House seats plus 2 senators."],
  ["Two Native nations in Connecticut with their own federally recognized governments are the Mashantucket Pequot and the…", "Mohegan", ["Aztec", "Inca"], "Tribal governments make laws for their nations."],
  ["Federalism means…", "power is divided between the national and state governments", ["all power belongs to the states", "all power belongs to the President"], "Connecticut and the United States each have a constitution."],
  ["Which power belongs to the federal government, not to Connecticut?", "coining money", ["setting up school districts", "issuing driver's licenses"], "The US Constitution gives Congress that power."],
  ["Connecticut changes its constitution when…", "the General Assembly proposes an amendment and voters approve it", ["the governor signs a paper", "one town votes"], "Connecticut has no citizen ballot initiatives.", true],
  ["Every 20 years, Connecticut voters are asked whether to…", "call a convention to revise the state constitution", ["elect a new king", "move the capital"], "Voters said no in 2008.", true],
  ["Connecticut's Freedom of Information Act lets citizens…", "see public records and attend public meetings", ["read private emails", "skip jury duty"], "A state commission hears complaints.", true],
  ["Why do towns, the state, tribal nations and the federal government each matter after a hurricane?", "each has its own powers and jobs in the response", ["only one government can act", "none of them can help"], "Different levels share the work.", true],
  ["Why might a citizen go to a board of education meeting?", "to speak about a local decision before it is made", ["to vote for President", "to change the US Constitution"], "Local government is closest to the people.", true],
  ["Which is a civic responsibility rather than a legal duty?", "voting in elections", ["paying taxes", "serving on a jury when summoned"], "Voting is voluntary but vital.", true],
  ["Why does Connecticut have two registrars from different parties in each town?", "so both parties can watch that elections are fair", ["to double the cost", "so one party can win"], "Checks build trust in elections.", true],
  ["Connecticut's General Assembly passes a state budget for…", "two years at a time", ["ten years at a time", "one month at a time"], "It is called a biennial budget.", true],
  ["Connecticut's constitution has a spending cap. It limits…", "how fast state spending can grow", ["how many towns there are", "who may vote"], "Voters added it in 1992.", true],
  ["Probate courts in Connecticut handle matters such as…", "wills, estates and guardianships", ["federal crimes", "presidential elections"], "Each probate district serves one or more towns.", true],
  ["In 1818, Connecticut replaced its royal charter with…", "its first state constitution", ["a king", "the Articles of Confederation"], "It separated church and state and set up three branches.", true],
];

const NATION_EXTRA: Q[] = [
  ["How many representatives does Connecticut send to the US House?", "5", ["7", "2"], "Seats are divided by population after each census."],
  ["Connecticut's two US senators each serve terms of…", "6 years", ["2 years", "4 years"], "Every state has two senators, thanks to the Connecticut Compromise."],
  ["The idea of a Senate with equal votes for every state came from…", "the Connecticut Compromise", ["the Bill of Rights", "the Emancipation Proclamation"], "Roger Sherman and Oliver Ellsworth proposed it in 1787."],
];

const ECONOMICS_EXTRA: Q[] = [
  ["Connecticut factories build jet engines and submarines. If another country put a tariff on jet engines, Connecticut makers would most likely…", "sell fewer engines there", ["sell more engines there", "pay no attention"], "A tariff raises the price buyers pay."],
  ["Many insurance companies are based in Hartford. That shows…", "specialization", ["self-sufficiency", "a command economy"], "Hartford is called the Insurance Capital."],
  ["Connecticut ships goods to other countries through ports like New London and New Haven. That shows…", "economic interdependence", ["isolation", "barter only"], "Countries rely on each other for goods.", true],
];

const MAINE = (id: string) => from(MAINE_9, id);

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "ct-g9-governing-connecticut",
    title: "Governing Connecticut",
    emoji: "🗳️",
    blurb: "The 1965 constitution, the General Assembly and 169 towns",
    parentNote:
      "How Connecticut governs itself within the federal system: the 1965 constitution and its Declaration of Rights, the six elected executive officers, the General Assembly and vetoes, the courts, 169 towns with no county government, town meetings and selectmen, registrars and early voting, tribal governments, and how the constitution is amended.",
    standards: ["CG.Civ.1.a; CG.Civ.1.b; CG.Civ.2.a; CG.Civ.3.a; CG.Civ.8.a; CG.Civ.8.b", "local, state, tribal and national governments, election officials, models of democracy in state and town government, and how elections work"],
    items: GOVERNING,
  }),
  copyOf(
    MAINE("me-g9-us-government"),
    {
      id: "ct-g9-us-government",
      title: "How the Nation Governs",
      emoji: "🏛️",
      blurb: "Congress, the President, the courts and your rights",
      parentNote:
        "The United States government: the three articles that set up Congress, the presidency and the courts, terms and powers, checks and balances, the Bill of Rights and later amendments, landmark cases, and how the US system compares with a parliamentary one.",
      standards: ["CG.Civ.4.b; CG.Civ.4.c; CG.Civ.3.b; CG.Civ.2.e", "how the Constitution divides and limits power, how it has been interpreted, the courts, and the rights of individuals"],
    },
    NATION_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-economics"),
    {
      id: "ct-g9-economics",
      title: "Markets & the Economy",
      emoji: "📈",
      blurb: "Supply, demand, trade and economic policy",
      parentNote:
        "Economics for citizens: supply and demand, shortages and surpluses, GDP, inflation and unemployment, the Federal Reserve and fiscal policy, specialization, comparative advantage, tariffs and trade, with examples from Connecticut.",
      standards: ["CG.Eco.7.a; CG.Eco.9.a", "the costs and benefits of trade policy, and the government's role in economic policy"],
    },
    ECONOMICS_EXTRA,
  ),
];
