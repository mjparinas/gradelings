import type { Unit } from "../../types";
import { SOCIAL_9 as ARIZONA_SOCIAL_9 } from "../../arizona/units/social-g9";
import { bankUnit, type Q } from "../own";
import { from, localCopy } from "./kit";

// Missouri Grade 9 social studies, government: how Missouri is governed next to the federal and local governments
// (9-12.GV.3.GS.F, 9-12.GV.4.GS.C, 9-12.GV.3.CC.D), which Missouri students study for the required test on the US and
// Missouri Constitutions (RSMo 170.011), and a Missouri copy of Arizona's civics test unit for the civics test Missouri
// requires for graduation (RSMo 170.345).

const GOVERNING: Q[] = [
  ["Missouri's current constitution was adopted in…", "1945", ["1821", "1776", "2001"], "It is Missouri's fourth constitution."],
  ["Missouri's legislature, the General Assembly, is made up of the Senate and the…", "House of Representatives", ["Supreme Court", "Cabinet", "Board of Education"], "It is bicameral, like Congress."],
  ["How many members serve in the Missouri Senate?", "34", ["100", "163", "7"], "Senators serve four-year terms."],
  ["How many members serve in the Missouri House of Representatives?", "163", ["34", "435", "50"], "Representatives serve two-year terms."],
  ["Missouri's governor is elected for a term of…", "four years, with a limit of two terms", ["two years, with no limit", "six years", "life"], "Term limits are in the state constitution."],
  ["The Missouri Supreme Court has…", "seven judges", ["nine judges", "three judges", "fifty judges"], "The US Supreme Court has nine."],
  ["Under the Missouri Plan, appellate judges are…", "appointed from a list made by a commission, then kept or removed by voters", ["elected in party primaries only", "appointed for life by the president", "chosen by lottery"], "Many states copied this nonpartisan plan."],
  ["Missouri voters can propose a law or a constitutional amendment through an…", "initiative petition", ["executive order", "impeachment", "filibuster"], "Enough signatures put it on the ballot."],
  ["Missouri lawmakers can be in office for at most…", "eight years in each chamber", ["two years in all", "forty years", "no limit"], "Missouri voters adopted term limits in 1992."],
  ["Missouri's local governments include 114 counties and the independent city of…", "St. Louis", ["Kansas City", "Jefferson City", "Columbia"], "St. Louis left St. Louis County in 1876."],
  ["Which level of government runs public schools day to day?", "local school districts", ["the federal government", "the governor alone", "the US Supreme Court"], "Elected school boards set policy."],
  ["Which level of government issues driver's licenses?", "the state", ["the federal government", "the county fair", "the United Nations"], "Each state licenses its drivers."],
  ["Which level of government prints money and makes treaties?", "the federal government", ["the state", "the county", "the city"], "These powers are delegated to Congress and the president."],
  ["Powers shared by the federal and state governments, such as taxing, are called…", "concurrent powers", ["reserved powers", "delegated powers", "implied vetoes"], "Both levels can tax."],
  ["The 10th Amendment says powers not given to the federal government belong to…", "the states or the people", ["the president", "Congress only", "the courts only"], "These are reserved powers."],
  ["If a Missouri law conflicts with a valid federal law, which wins?", "the federal law", ["the Missouri law", "neither", "whichever is newer"], "The Supremacy Clause makes federal law supreme."],
  ["A Missouri statewide primary election chooses…", "each party's candidates for the general election", ["the final winner of every office", "Supreme Court judges for life", "the president directly"], "The general election follows in November."],
  ["Missouri sends how many senators to the US Senate?", "two", ["one", "eight", "ten"], "Every state has two."],
  ["The number of US House seats Missouri has depends on…", "its population in the census", ["its land area", "its number of rivers", "its age as a state"], "Seats are recounted every ten years.", true],
  ["How have state and federal power changed over time in areas like civil rights?", "federal power grew as Congress and the courts protected rights in every state", ["states gained power over all rights", "nothing changed", "the federal government gave up civil rights"], "The 14th Amendment applied rights to the states.", true],
  ["Why might a governor's veto be overridden in Missouri?", "two-thirds of both houses vote to pass the bill anyway", ["the governor changes their mind", "a court votes on it", "the president decides"], "Overrides check the governor.", true],
  ["How does a county commission differ from the General Assembly?", "it governs one county, while the General Assembly makes laws for the whole state", ["it makes national laws", "it is a court", "they are the same body"], "Compare local and state governments.", true],
  ["Missouri requires high school students to pass a test on the US and Missouri Constitutions because…", "citizens need to understand how their governments work", ["it replaces voting", "it chooses the governor", "it is a math test"], "It is set in state law.", true],
  ["How are city leaders usually chosen in Missouri?", "by local voters in city elections", ["by the governor", "by the president", "by the US Senate"], "Local elections pick mayors and councils.", true],
];

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "mo-g9-governing-missouri",
    title: "Governing Missouri",
    emoji: "🏛️",
    blurb: "The Missouri Constitution, the state and the nation",
    parentNote: "How Missouri's government is set up under its 1945 constitution, the General Assembly, governor and courts, the Missouri Plan for judges, initiative petitions, local governments, how leaders are chosen at each level, and how state and federal power fit together.",
    standards: ["9-12.GV.3.GS.F; 9-12.GV.4.GS.C; 9-12.GV.3.CC.D", "local, state and federal governments compared, how leaders are chosen at each level, and the changing balance of state and federal power"],
    items: GOVERNING,
  }),
  localCopy(
    from(ARIZONA_SOCIAL_9, "az-g9-civics-test"),
    "mo-g9-civics-test",
    ["9-12.GV.3.GS.C; 9-12.GV.3.GS.E; 9-12.GV.4.GS.B", "the branches of government, rights and amendments, and citizens' duties, as asked on the civics test"],
    [
      ["Missouri students must pass a civics test, drawn from the questions on the US citizenship test, to…", "graduate from high school", ["get a driver's license", "vote for the first time", "join a sports team"], "It is set in Missouri law."],
      ["Who is in charge of the executive branch of Missouri's government?", "the governor", ["the president", "the chief justice", "the mayor"], "The president leads the federal executive branch."],
      ["What is the capital of Missouri?", "Jefferson City", ["St. Louis", "Kansas City", "Springfield"], "The capitol sits above the Missouri River."],
      ["How many US senators does Missouri have?", "two", ["one", "eight", "100"], "Every state has two."],
      ["What is one right in the First Amendment?", "freedom of religion", ["the right to bear arms", "the right to a speedy trial", "the right to vote at 18"], "Speech, religion, press, assembly and petition.", true],
    ],
    {
      parentNote:
        "Questions like those on the US citizenship test, which Missouri students must pass to graduate: the Constitution, the branches of government, rights and amendments, American history and citizens' duties.",
    },
  ),
];
