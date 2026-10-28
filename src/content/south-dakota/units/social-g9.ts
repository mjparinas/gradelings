import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// South Dakota Grade 9 social studies: South Dakota and Native American government and politics (9-12.C.17): how South
// Dakota became a state, its constitution and branches, local government and elections, the governments of the nine
// Tribal Nations, and how federal, state, local and Tribal governments relate.

const GOVERNING: Q[] = [
  ["South Dakota's constitution was approved by voters in…", "1889", ["1776", "1861", "1960"], "It came with statehood."],
  ["South Dakota's legislature has two houses: the Senate and the…", "House of Representatives", ["Assembly of Lords", "Tribal Council", "Supreme Court"], "Together they make state laws."],
  ["South Dakota's state Senate has… members.", "35", ["50", "100", "9"], "One senator from each legislative district."],
  ["South Dakota's state House of Representatives has… members.", "70", ["35", "435", "100"], "Most districts elect two representatives."],
  ["The head of South Dakota's executive branch is the…", "governor", ["chief justice", "speaker of the House", "mayor of Pierre"], "The governor signs or vetoes bills."],
  ["South Dakota's governor serves a term of…", "four years", ["two years", "six years", "life"], "A governor may serve two terms in a row."],
  ["The highest court in South Dakota is the South Dakota…", "Supreme Court", ["Senate", "Tribal Court", "Board of Regents"], "It has five justices."],
  ["The legislature meets each year in Pierre beginning in…", "January", ["July", "October", "December"], "Sessions are short, about two or three months."],
  ["In 1898, South Dakota became the first state to adopt the initiative and…", "referendum", ["recall of the president", "Electoral College", "filibuster"], "Voters can propose laws and vote on laws the legislature passed."],
  ["An initiated measure lets South Dakota voters…", "put a proposed law on the ballot by gathering signatures", ["remove the president", "skip elections", "choose federal judges"], "It is direct democracy."],
  ["South Dakota is divided into 66…", "counties", ["states", "reservations", "parishes"], "Each has a county seat."],
  ["Most South Dakota counties are governed by an elected board of…", "county commissioners", ["senators", "Tribal elders", "justices"], "They oversee roads, budgets and courts."],
  ["Cities like Sioux Falls and Rapid City are led by a…", "mayor and city council", ["governor", "Tribal chair", "county judge"], "Voters elect them."],
  ["How many federally recognized Tribes have reservations in South Dakota?", "9", ["4", "35", "66"], "All are Nations of the Oceti Sakowin Oyate."],
  ["Tribal Nations in South Dakota are sovereign, which means they…", "govern themselves and make their own laws", ["are part of county government", "have no courts", "are run by the governor"], "Their relationship with the United States is nation to nation."],
  ["Most of South Dakota's Tribes are governed by an elected…", "Tribal council with a chair or president", ["king", "state legislature", "county commission"], "Each Tribe's constitution sets up its government."],
  ["The Oglala Sioux Tribe on the Pine Ridge Reservation is led by an elected…", "president and Tribal council", ["governor and lieutenant governor", "mayor", "county sheriff"], "Elections are held under the Tribe's constitution."],
  ["Disputes on a reservation are often decided in…", "Tribal courts", ["the South Dakota Senate", "county fairs", "the State Capitol"], "Tribes run their own justice systems."],
  ["Who signs treaties with Tribal Nations on behalf of the United States?", "the federal government", ["the state of South Dakota", "county commissioners", "city councils"], "The Constitution gives Congress power over relations with Tribes."],
  ["South Dakota's state government works with Tribes through its Department of…", "Tribal Relations", ["Gold Mining", "Railroads", "Fishing Only"], "It is part of the governor's cabinet.", true],
  ["In 1990, South Dakota replaced Columbus Day with…", "Native American Day", ["Statehood Day", "Pioneer Day", "Founders Day"], "It falls on the second Monday of October.", true],
  ["Why does federal law, not state law, mostly govern relations with Tribes?", "the US Constitution gives Congress that power, and treaties are federal", ["states own all reservations", "Tribes asked the states to decide", "there are no laws about it"], "Treaties are made between nations.", true],
  ["A referendum lets voters…", "approve or reject a law the legislature passed", ["write the US Constitution", "pick federal judges", "choose Tribal leaders"], "It is the second half of 1898's reform.", true],
  ["Why are frequent, fair elections important to self-government?", "they let the people hold leaders accountable", ["they let leaders serve for life", "they replace the courts", "they end all laws"], "Consent of the governed depends on them.", true],
  ["South Dakota legislators are limited to four two-year terms in a row in one house. This is a…", "term limit", ["filibuster", "veto", "treaty"], "Voters approved it in 1992.", true],
  ["When a person lives on a reservation in South Dakota, they are citizens of…", "their Tribe, South Dakota and the United States", ["only their Tribe", "only South Dakota", "no government"], "Native Americans became US citizens in 1924.", true],
];

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "sd-g9-governing-south-dakota",
    title: "Governing South Dakota",
    emoji: "⚖️",
    blurb: "State, local and Tribal governments",
    parentNote:
      "South Dakota and Native American government: the 1889 constitution, the legislature, governor and Supreme Court, the initiative and referendum (first adopted in 1898), counties, cities and elections, the sovereign governments, councils and courts of the nine Tribal Nations, and how federal, state, local and Tribal governments relate.",
    standards: ["9-12.C.17", "South Dakota and Native American government and politics"],
    items: GOVERNING,
  }),
];
