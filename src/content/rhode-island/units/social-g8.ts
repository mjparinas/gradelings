import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Rhode Island Grade 8 social studies, government and civic life: the state's own government within the federal
// system, from its 39 cities and towns (SS8.4.1) and the General Assembly, governor and courts (SS8.4.2) to the
// Narragansett Indian Tribe's own government (SS8.4.3) and which level of government handles what (SS8.4.4). The
// national side (rights, the branches, judicial review, civil rights and the media) is practised with adopted units
// (see ../plan/social.ts).

const GOVERNING: Q[] = [
  ["Rhode Island's lawmaking body, with a Senate and a House of Representatives, is called the…", "General Assembly", ["Town Meeting", "Parliament", "Supreme Court"], "Both chambers meet at the State House."],
  ["Rhode Island's State House, where the General Assembly meets, is in…", "Providence", ["Newport", "Westerly", "Boston"], "It is the capital city."],
  ["How many members sit in the Rhode Island Senate?", "38", ["2", "75", "100"], "The House is about twice as big."],
  ["How many members sit in the Rhode Island House of Representatives?", "75", ["38", "435", "13"], "It is the larger chamber."],
  ["Members of the General Assembly are elected for terms of…", "two years", ["six years", "life", "ten years"], "Every seat is on the ballot every other year."],
  ["The head of Rhode Island's executive branch is the…", "governor", ["mayor", "chief justice", "speaker"], "This leader is elected by the whole state."],
  ["Rhode Island's governor is elected for a term of…", "four years", ["one year", "ten years", "life"], "It used to be two years."],
  ["Which official takes over if the governor cannot serve?", "the lieutenant governor", ["the mayor of Providence", "the President", "a senator"], "This officer is next in line."],
  ["Rhode Island voters elect five general officers: the governor, lieutenant governor, attorney general, general treasurer and…", "secretary of state", ["chief of police", "school principal", "fire chief"], "This officer runs elections and keeps state records."],
  ["Rhode Island's highest court is the…", "Rhode Island Supreme Court", ["General Assembly", "town council", "school committee"], "It is the top of the state's judicial branch."],
  ["A bill passed by the General Assembly becomes law when it is…", "signed by the governor", ["printed in a newspaper", "read in school", "voted on by the Supreme Court"], "The executive approves or vetoes it."],
  ["When the governor rejects a bill, it is called a…", "veto", ["ballot", "census", "pledge"], "The General Assembly can try to override it."],
  ["Rhode Island is divided into how many cities and towns?", "39", ["5", "50", "100"], "Each has its own local government."],
  ["Rhode Island has five counties, but county governments…", "do not exist", ["run every school", "make state laws", "elect the governor"], "Cities and towns do the local work."],
  ["Many Rhode Island cities are led by a mayor and a…", "city council", ["royal court", "General Assembly", "Supreme Court"], "The council passes local rules."],
  ["Most Rhode Island towns make local decisions through a…", "town council", ["state senate", "federal court", "Congress"], "It is the town's lawmaking body."],
  ["In most Rhode Island cities and towns, public schools are run by an elected…", "school committee", ["state senate", "US Congress", "Supreme Court"], "It is a local body."],
  ["The Narragansett Indian Tribe has its own government, led by a chief sachem and a…", "tribal council", ["county board", "royal governor", "school committee"], "It is a sovereign nation."],
  ["The Narragansett Indian Tribe was recognized by the United States government in…", "1983", ["1663", "1776", "2020"], "Federal recognition means a government-to-government relationship."],
  ["Narragansett tribal lands are in the town of…", "Charlestown", ["Providence", "Newport", "Woonsocket"], "It is in southern Rhode Island."],
  ["Which level of government prints money and runs the post office?", "the national government", ["the town council", "the school committee", "the state government"], "These jobs are the same across the country."],
  ["Which level of government issues driver's licenses in Rhode Island?", "the state government", ["the national government", "a town council", "the school committee"], "The state's Division of Motor Vehicles does it."],
  ["Which level of government usually picks up trash and plows local streets?", "the city or town", ["the national government", "the Supreme Court", "Congress"], "These are local services."],
  ["Rhode Island's first constitution, written after the Dorr Rebellion, took effect in…", "1843", ["1663", "1776", "1986"], "Before that, the colony's royal charter was the plan of government.", true],
  ["Before 1843, Rhode Island was governed under a royal charter from King Charles II granted in…", "1663", ["1492", "1776", "1900"], "It promised freedom of religion.", true],
  ["In 2004 Rhode Island voters approved an amendment to strengthen…", "the separation of powers", ["the monarchy", "county governments", "the draft"], "It limited lawmakers serving on executive boards.", true],
  ["Rhode Island voters often see questions on the ballot asking whether the state may…", "borrow money for projects", ["choose a king", "close the post office", "print money"], "These are called bond questions.", true],
  ["When both the state and a tribal government have a say over the same land, they settle questions by…", "agreements and the courts", ["a coin toss", "ignoring the law", "asking another country"], "Sovereign governments work out jurisdiction.", true],
];

export const SOCIAL_8: Unit[] = [
  bankUnit({
    id: "ri-g8-governing-rhode-island",
    title: "Rhode Island's Government",
    emoji: "🏛️",
    blurb: "The State House, 39 cities and towns, and the Narragansett",
    parentNote: "How Rhode Island governs itself within the federal system: the General Assembly's 38 senators and 75 representatives, the governor and the other general officers, the state Supreme Court, how a bill becomes law, 39 cities and towns with no county government, school committees, the Narragansett Indian Tribe's own government, which level of government does which job, and the state's constitutions from the 1663 charter to today.",
    standards: ["SS8.4.1; SS8.4.2; SS8.4.3; SS8.4.4", "local governments, Rhode Island state government, tribal governments, and government jurisdiction"],
    items: GOVERNING,
  }),
];
