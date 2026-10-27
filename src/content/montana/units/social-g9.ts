import type { Unit } from "../../types";
import { SOCIAL_9 as MAINE_9 } from "../../maine/units/social-g9";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Montana Grade 9 social studies, civics and government: how Montana governs itself under the 1972 constitution, how
// state, local and tribal governments make decisions, and the foundations and complexity of sovereignty for the
// federally recognized Tribal Nations in Montana (SS.CG.9-12.7, SS.CG.9-12.9); plus copies of Maine's United States
// government and economics units without their Maine items, with Montana items added (SS.CG.9-12.1, SS.CG.9-12.6,
// SS.E.9-12.6, SS.E.9-12.3).

const GOVERNING: Q[] = [
  ["Montana's current constitution took effect in…", "1973", ["1889", "1959"], "Voters ratified it in June 1972."],
  ["The Montana Legislature has how many members in all?", "150", ["100", "435"], "100 representatives and 50 senators."],
  ["Montana state representatives serve terms of…", "2 years", ["4 years", "6 years"], "Senators serve 4-year terms."],
  ["Montana legislators and the governor are limited to…", "8 years in any 16-year period", ["one term only", "no limit at all"], "Voters approved term limits in 1992."],
  ["The Montana Legislature meets in regular session…", "for up to 90 days in odd-numbered years", ["all year, every year", "only when the governor wants"], "Special sessions can be called."],
  ["The governor and lieutenant governor of Montana run…", "together on one ticket", ["in different years", "against each other"], "Like the President and Vice President."],
  ["Montana's governor can return a bill with suggested changes. This is called an…", "amendatory veto", ["impeachment", "initiative"], "The legislature can accept or reject the changes."],
  ["Montana's governor can strike single spending items from a bill. This is a…", "line-item veto", ["pocket veto", "recall"], "It applies to appropriation bills."],
  ["To override a governor's veto, the Montana Legislature needs…", "a two-thirds vote of the members present in each house", ["a simple majority in one house", "the Supreme Court's approval"], "Overrides can also happen by mail poll when the session is over."],
  ["Montana Supreme Court justices are chosen by…", "nonpartisan elections", ["the governor alone, for life", "the US President"], "They serve 8-year terms."],
  ["How many justices sit on the Montana Supreme Court?", "7", ["9", "5"], "A chief justice and six associate justices."],
  ["Montana citizens can propose new laws by gathering signatures. This is called an…", "initiative", ["executive order", "filibuster"], "Montana has both statutory and constitutional initiatives."],
  ["A referendum lets Montana voters…", "approve or reject a law passed by the legislature", ["choose a governor", "appoint judges"], "It is a form of direct democracy."],
  ["How many counties does Montana have?", "56", ["12", "100"], "Most are run by three elected commissioners."],
  ["Every 10 years, Montana voters are asked whether to…", "review the form of their local governments", ["move the capital", "rewrite the US Constitution"], "Article XI of the constitution requires it."],
  ["Montana's constitution gives citizens a right to take part in agency decisions before they are final. This is the right of…", "participation", ["secession", "nullification"], "Agencies must allow public comment."],
  ["How many electoral votes does Montana have in presidential elections?", "4", ["3", "7"], "Montana gained a second House seat after the 2020 census."],
  ["Tribal sovereignty in Montana rests first on…", "the Nations' own inherent right to govern, which existed before the United States", ["a gift from the state legislature", "the 1972 state constitution"], "Treaties recognized it; they did not create it."],
  ["Under the US Constitution, the power to deal with Tribal Nations belongs mainly to…", "Congress", ["each state", "county commissioners"], "The Commerce Clause names the Indian tribes."],
  ["Worcester v. Georgia (1832) held that…", "state laws generally do not apply inside Tribal territory", ["states own all Tribal land", "treaties are not law"], "It is a foundation of tribal sovereignty."],
  ["Montana v. United States (1981), about hunting and fishing on the Crow Reservation, limited…", "Tribal power over non-members on land the Tribe does not own", ["all state power", "the right of Crow members to vote"], "It shows how complex jurisdiction can be.", true],
  ["Why is criminal jurisdiction on reservations often called a maze?", "it depends on who is involved, where, and the crime, among tribal, state and federal courts", ["only one court ever has power", "reservations have no courts"], "Federal laws and court cases divide the power.", true],
  ["In 2020, Congress approved the water compact between the Confederated Salish and Kootenai Tribes, Montana and the United States. A compact like this is…", "a negotiated agreement settling water rights among governments", ["a court sentence", "a treaty with Canada"], "Negotiation avoided decades of court fights.", true],
  ["The Crow Tribe's 2001 constitution set up…", "executive, legislative and judicial branches", ["a monarchy", "rule by the state of Montana"], "Tribal governments take many forms.", true],
  ["Federal recognition matters for a Tribal Nation because it…", "establishes a government-to-government relationship with the United States", ["makes it part of a state", "ends its sovereignty"], "The Little Shell Chippewa were recognized in 2019.", true],
  ["When the State of Montana and a Tribal Nation make an agreement on taxes or law enforcement, it is an example of…", "government-to-government cooperation", ["the state ruling the Nation", "a federal court order"], "Montana law asks state agencies to consult with Tribal governments.", true],
  ["Montana's attorney general and superintendent of public instruction are…", "elected by voters statewide", ["appointed by the President", "chosen by the legislature"], "Montana elects several executive officers, not only the governor."],
  ["The superintendent of public instruction leads Montana's…", "Office of Public Instruction", ["state police", "Supreme Court"], "The office oversees K-12 schools."],
  ["Montana's elected Public Service Commission regulates…", "utilities such as electricity and natural gas", ["school lunches", "national parks"], "It reviews the rates utilities charge."],
  ["Montana's main trial courts, where most cases begin, are the…", "district courts", ["tribal councils", "county commissions"], "Appeals go to the Montana Supreme Court."],
  ["A recall election lets Montana voters…", "remove an elected official before the term ends", ["elect a king", "skip an election"], "Voters must gather signatures first."],
  ["In a government-to-government relationship, the United States deals with a Tribal Nation as…", "a sovereign government", ["a private company", "a county of Montana"], "Federal recognition sets up this relationship."],
  ["Montana's Indian Education for All law shows the state…", "carrying out a duty written in its constitution", ["ignoring its constitution", "taking over tribal schools"], "Article X commits the state to it.", true],
  ["Why do Montana and Tribal Nations negotiate compacts instead of going to court?", "agreements can settle disputes faster and respect each government", ["courts are not allowed to hear them", "compacts cost nothing"], "Negotiation is government-to-government.", true],
  ["Why does a constitutional initiative in Montana need more signatures than a statutory one?", "changing the constitution is meant to be harder than changing a law", ["constitutions are shorter", "initiatives are illegal"], "Constitutions are the higher law.", true],
];

const NATION_EXTRA: Q[] = [
  ["How many representatives does Montana send to the US House today?", "2", ["1", "4"], "Seats are divided by population after each census."],
  ["Montana's two US senators each serve terms of…", "6 years", ["2 years", "4 years"], "Every state has two senators."],
  ["Montana's Jeannette Rankin was the first woman to serve in the…", "US Congress", ["US Supreme Court", "President's Cabinet"], "She was elected to the House in 1916."],
];

const ECONOMICS_EXTRA: Q[] = [
  ["Montana farmers sell much of their wheat abroad. If a buying country put a tariff on US wheat, Montana farmers would most likely…", "sell less wheat there", ["sell more wheat there", "see no change at all"], "A tariff raises the price buyers pay."],
  ["Montana has no general statewide sales tax, so most state revenue comes from…", "income and property taxes", ["tariffs", "selling stamps"], "Some resort towns add a local resort tax."],
  ["Visitors to Glacier and Yellowstone spend money on lodging, food and guides. This shows how tourism…", "creates jobs in local service businesses", ["takes money out of the state", "only helps the federal government"], "Tourism is a major part of Montana's economy.", true],
];

const MAINE = (id: string) => from(MAINE_9, id);

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "mt-g9-governing-montana",
    title: "Governing Montana",
    emoji: "🗳️",
    blurb: "The 1972 constitution, the legislature and tribal sovereignty",
    parentNote:
      "How Montana governs itself: the 1972 constitution and its rights to know and participate, the legislature, vetoes and term limits, the elected Supreme Court, initiatives and referendums, counties and local government review; and the foundations and complexity of sovereignty for Montana's federally recognized Tribal Nations, from inherent sovereignty and treaties to court cases, compacts and recognition.",
    standards: ["SS.CG.9-12.7; SS.CG.9-12.9", "the foundations and complexity of tribal sovereignty in Montana, and how local, state, national and tribal governments make decisions"],
    items: GOVERNING,
  }),
  copyOf(
    MAINE("me-g9-us-government"),
    {
      id: "mt-g9-us-government",
      title: "How the Nation Governs",
      emoji: "🏛️",
      blurb: "Congress, the President, the courts and your rights",
      parentNote:
        "The United States government: the three articles that set up Congress, the presidency and the courts, terms and powers, checks and balances, the Bill of Rights and later amendments, landmark cases, and how the US system compares with a parliamentary one.",
      standards: ["SS.CG.9-12.1; SS.CG.9-12.6", "the principles of the founding documents and how they set up a system of government, compared with other countries' systems"],
    },
    NATION_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-economics"),
    {
      id: "mt-g9-economics",
      title: "Markets & the Economy",
      emoji: "📈",
      blurb: "Supply, demand, trade and economic policy",
      parentNote:
        "Economics for citizens: supply and demand, shortages and surpluses, GDP, inflation and unemployment, the Federal Reserve and fiscal policy, specialization, comparative advantage, tariffs and trade, with examples from Montana.",
      standards: ["SS.E.9-12.6; SS.E.9-12.3; SS.E.9-12.9", "government policies that influence markets, what drives production in a market system, and monetary and fiscal policy"],
    },
    ECONOMICS_EXTRA,
  ),
];
