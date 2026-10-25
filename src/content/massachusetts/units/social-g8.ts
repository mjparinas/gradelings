import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Massachusetts Grade 8 social studies, state and local government (8.T6): the Massachusetts Constitution beside the
// United States Constitution and federalism (8.T6.1 to 8.T6.7), and the government of the Commonwealth and its cities
// and towns (8.T6.8 to 8.T6.10).

const CONSTITUTIONS: Q[] = [
  ["Sharing power between the national government and the states is called…", "federalism", ["monarchy", "anarchy", "judicial review"], "Both levels have their own powers."],
  ["Which amendment reserves to the states the powers not given to the national government?", "the Tenth Amendment", ["the First Amendment", "the Fifth Amendment", "the Nineteenth Amendment"], "It is the last amendment in the Bill of Rights."],
  ["Which is a power of the national government?", "printing money", ["running local schools", "issuing driver's licenses", "setting up town meetings"], "Only one currency for the whole country."],
  ["Which is a power usually held by the states?", "running public schools", ["declaring war", "making treaties", "printing money"], "Each state sets its own school laws."],
  ["A power both the national and state governments have is…", "collecting taxes", ["declaring war", "making treaties", "printing money"], "Shared powers are called concurrent powers."],
  ["Powers written out in a constitution are called… powers.", "enumerated", ["implied", "imaginary", "royal"], "Enumerate means to list."],
  ["Powers a government has because they are needed to carry out its listed powers are… powers.", "implied", ["enumerated", "reserved", "forbidden"], "The elastic clause stretches to cover them."],
  ["The Massachusetts Constitution was adopted in…", "1780", ["1620", "1776", "1865"], "John Adams was its main author."],
  ["Compared with the US Constitution, the Massachusetts Constitution is…", "older", ["newer", "the same document", "unwritten"], "It is the oldest written constitution still in use."],
  ["The Massachusetts Constitution officially calls the state…", "the Commonwealth of Massachusetts", ["the Kingdom of Massachusetts", "the Province of Massachusetts", "the Republic of Boston"], "Commonwealth means for the common good."],
  ["The Massachusetts Constitution begins with a list of rights called the…", "Declaration of Rights", ["Bill of Attainder", "Mayflower Compact", "Federalist Papers"], "It comes before the plan of government."],
  ["The US Bill of Rights protects rights from the national government, and the Massachusetts Declaration of Rights protects rights…", "under state government", ["only in other countries", "only for the governor", "only in wartime"], "State constitutions can add protections."],
  ["A state constitution may protect rights…", "more than the US Constitution does, but not less", ["less than the US Constitution does", "only if the President agrees", "only for state workers"], "The US Constitution sets the floor."],
  ["The Massachusetts Constitution requires the state to support…", "public schools", ["a state army of knights", "a royal family", "one official religion"], "John Adams believed education kept a republic strong."],
  ["If a state law conflicts with the US Constitution, the… wins.", "US Constitution", ["state law", "governor's opinion", "city council"], "The Supremacy Clause says so."],
  ["Which level of government is responsible for the Post Office?", "national", ["state", "town", "county"], "Mail crosses state lines."],
  ["Which level of government usually picks up trash and plows local streets?", "local", ["national", "international", "none"], "Your city or town does this."],
  ["Who can change the Massachusetts Constitution?", "the voters, after the legislature proposes an amendment or a citizen petition", ["the governor alone", "the President", "the Supreme Court of the United States"], "Massachusetts voters decide amendments at the polls.", true],
  ["Massachusetts voters can propose laws themselves through the…", "initiative petition", ["veto", "impeachment", "filibuster"], "They collect signatures to put a question on the ballot.", true],
  ["In 2003, the Supreme Judicial Court ruled that the Massachusetts Constitution protects…", "the right of same-sex couples to marry", ["the right to own slaves", "a king's right to rule", "the right to skip school"], "The case was Goodridge v. Department of Public Health.", true],
  ["Why is the Tenth Amendment important to states?", "it protects the powers states keep", ["it makes states pay federal taxes", "it lets states print money", "it ends state governments"], "Reserved powers stay with the states or the people.", true],
  ["Education in the United States is mostly run by states and towns because…", "the Constitution leaves it to the states", ["the President runs every school", "Congress has banned schools", "schools are private only"], "It is a reserved power.", true],
  ["The “necessary and proper” clause is also called the… clause.", "elastic", ["supremacy", "commerce", "establishment"], "It stretches Congress's power.", true],
  ["Which document protects rights under both state and national law in Massachusetts?", "the US Constitution and the Massachusetts Constitution together", ["only the Mayflower Compact", "only town bylaws", "only the Magna Carta"], "Both apply at the same time.", true],
  ["Elizabeth Freeman's 1781 freedom suit relied on words in the…", "Massachusetts Declaration of Rights", ["US Bill of Rights", "Emancipation Proclamation", "Fourteenth Amendment"], "It says all people are born free and equal.", true],
];

const GOVERNING: Q[] = [
  ["The head of the executive branch of Massachusetts is the…", "governor", ["mayor", "Speaker of the House", "chief justice"], "The governor is elected every four years."],
  ["The Massachusetts legislature is officially called the…", "General Court", ["Parliament", "Congress", "Town Meeting"], "It has a House and a Senate."],
  ["The two parts of the General Court are the House of Representatives and the…", "Senate", ["Cabinet", "Supreme Court", "Governor's Council"], "Like Congress, it has two chambers."],
  ["The highest court in Massachusetts is the…", "Supreme Judicial Court", ["Supreme Court of the United States", "Probate Court", "Town Court"], "It is the oldest appellate court in the Americas."],
  ["An elected group that approves the governor's choices of judges in Massachusetts is the…", "Governor's Council", ["Electoral College", "school committee", "city council"], "It has eight members and the lieutenant governor."],
  ["Who takes over if the governor cannot serve?", "the lieutenant governor", ["the mayor of Boston", "the Senate President", "the attorney general"], "They are elected together."],
  ["Which statewide officer is Massachusetts's chief lawyer?", "the attorney general", ["the treasurer", "the auditor", "the secretary of state"], "The office protects consumers and enforces state laws."],
  ["Which statewide officer in Massachusetts oversees elections and public records?", "the Secretary of the Commonwealth", ["the treasurer", "the attorney general", "the auditor"], "It is called secretary of state in many other states."],
  ["Which officer manages the state's money and the state lottery?", "the treasurer", ["the auditor", "the governor", "the attorney general"], "The treasurer and receiver general."],
  ["A bill in Massachusetts becomes law when it passes both chambers and is…", "signed by the governor", ["read on the radio", "approved by the President", "voted on by every town"], "The governor can also veto it."],
  ["Which is a service paid for by the Commonwealth?", "state highways and state police", ["the US Army", "the Post Office", "passports"], "State taxes pay for them."],
  ["Which is a service usually paid for by a city or town?", "the local public library", ["the US Navy", "interstate highways", "national parks"], "Property taxes help fund it."],
  ["Massachusetts cities are usually led by a mayor and a…", "city council", ["select board", "General Court", "parliament"], "Boston, Worcester and Springfield are cities."],
  ["Many Massachusetts towns are governed by an open town meeting and a…", "select board", ["city council", "governor", "king"], "Voters attend town meeting in person."],
  ["In an open town meeting, who can vote on the town's budget and bylaws?", "any registered voter of the town", ["only the mayor", "only the governor", "only business owners"], "It is direct democracy."],
  ["The local board that oversees public schools is the…", "school committee", ["Governor's Council", "zoning board", "board of health"], "Voters elect its members."],
  ["Local laws passed by a Massachusetts town are called…", "bylaws", ["treaties", "amendments", "executive orders"], "Cities call theirs ordinances.", true],
  ["Massachusetts's state and local governments both collect taxes. The main local tax is the…", "property tax", ["income tax only", "tariff", "toll on the Mass Pike"], "It is based on the value of homes and land.", true],
  ["Proposition 2½ limits how much a Massachusetts town can raise…", "property taxes each year", ["the speed limit", "the number of schools", "the voting age"], "Voters can approve an override.", true],
  ["How is the governor's power to veto checked?", "the General Court can override with a two-thirds vote", ["the mayor can cancel it", "the President approves it", "it cannot be checked"], "Checks and balances work at the state level too.", true],
  ["Massachusetts has 14 counties, but many county governments were…", "abolished, with their jobs moved to the state", ["made into new states", "given their own armies", "turned into cities"], "Some counties, like Barnstable, still have governments.", true],
  ["Where does the General Court meet?", "the State House in Boston", ["Faneuil Hall", "Plymouth Rock", "the US Capitol"], "It has a gold dome.", true],
  ["A ballot question in Massachusetts lets voters…", "decide on a proposed law or constitutional amendment directly", ["choose the President only", "skip an election", "elect a king"], "Questions appear on November ballots.", true],
  ["Why do towns hold public hearings?", "so citizens can speak before decisions are made", ["to keep decisions secret", "to hire a king", "to cancel elections"], "Citizens can testify and give comments.", true],
  ["Which branch of Massachusetts government interprets the state's laws?", "the judicial branch", ["the legislative branch", "the executive branch", "the press"], "Courts decide what laws mean.", true],
];

export const SOCIAL_8: Unit[] = [
  bankUnit({
    id: "ma-g8-two-constitutions",
    title: "Two Constitutions",
    emoji: "📜",
    blurb: "Federalism and the Massachusetts Constitution",
    parentNote: "How the US Constitution and the Massachusetts Constitution share and divide power (federalism, enumerated, implied, reserved and shared powers, and the Tenth Amendment), and what the 1780 Massachusetts Constitution and its Declaration of Rights add, from public education to rights the courts have found in it.",
    standards: ["8.T6.1; 8.T6.2; 8.T6.3; 8.T6.4; 8.T6.5; 8.T6.6; 8.T6.7", "comparing state and national government, the US and Massachusetts constitutions, and the powers and rights each protects"],
    items: CONSTITUTIONS,
  }),
  bankUnit({
    id: "ma-g8-governing-massachusetts",
    title: "Governing Massachusetts",
    emoji: "🏛️",
    blurb: "The Commonwealth, its cities and its towns",
    parentNote: "How the Commonwealth of Massachusetts is governed: the governor and statewide officers, the General Court, the Supreme Judicial Court and the Governor's Council, how a bill becomes law, the services state and local taxes pay for, and how cities and towns govern themselves with mayors, councils, select boards, town meetings and school committees.",
    standards: ["8.T6.8; 8.T6.9; 8.T6.10", "the leadership of the Commonwealth, the services state and local governments provide, and local government in Massachusetts"],
    items: GOVERNING,
  }),
];
