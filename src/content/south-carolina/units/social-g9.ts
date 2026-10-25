import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// South Carolina's own Grade 9 social studies unit (`sc-` id), for United States Government: how governments in South
// Carolina are organized and how they work within the American constitutional system (USG.2.CC).

const SC_GOVERNMENT: Q[] = [
  ["South Carolina's current state constitution was adopted in…", "1895", ["1776", "1868", "1990"], "It has been amended many times since."],
  ["Like the US government, South Carolina's government has…", "three branches", ["one branch", "two branches", "five branches"], "Legislative, executive and judicial."],
  ["South Carolina's legislature is called the…", "General Assembly", ["Congress", "Parliament", "Commons House"], "It meets at the State House in Columbia."],
  ["The General Assembly has two houses: the House of Representatives and the…", "Senate", ["Council", "Cabinet", "Court"], "It is bicameral."],
  ["How many members does the South Carolina Senate have?", "46", ["100", "124", "50"], "One for each of 46 districts, the same number as the counties."],
  ["How many members does the South Carolina House of Representatives have?", "124", ["46", "435", "100"], "Members serve two-year terms."],
  ["South Carolina senators serve terms of…", "four years", ["two years", "six years", "life"], "House members serve two."],
  ["The head of South Carolina's executive branch is the…", "governor", ["lieutenant governor", "chief justice", "speaker of the House"], "Elected every four years."],
  ["A South Carolina governor may serve at most…", "two terms in a row", ["one term ever", "unlimited terms", "ten terms"], "Then they must sit out a term."],
  ["The highest court in South Carolina is the…", "South Carolina Supreme Court", ["US Supreme Court", "Court of Appeals", "county council"], "It has five justices."],
  ["Unlike most states, South Carolina's judges are chosen by…", "the General Assembly", ["voters in each county", "the President", "the governor alone"], "Lawmakers elect them."],
  ["South Carolina has how many counties?", "46", ["50", "13", "100"], "Each has a county council."],
  ["A city with an elected mayor and city council uses a…", "mayor-council government", ["monarchy", "parliament", "Supreme Court"], "Many South Carolina cities use it."],
  ["In a council-manager city, the day-to-day work is run by a…", "hired city manager", ["king", "governor", "judge"], "The council sets policy."],
  ["The governor can veto single spending items in a budget bill. This is the…", "line-item veto", ["filibuster", "pocket veto", "judicial review"], "The General Assembly can override it."],
  ["To override a governor's veto, the General Assembly needs a…", "two-thirds vote in each house", ["simple majority in one house", "vote of the voters", "Supreme Court ruling"], "The same rule as for the President's veto in Congress."],
  ["Which is a power reserved to the states rather than the federal government?", "running public schools", ["printing money", "declaring war", "making treaties"], "The 10th Amendment reserves powers to the states."],
  ["Which is a power of the federal government, not South Carolina?", "coining money", ["issuing driver's licenses", "setting up counties", "running elections for the General Assembly"], "Article I gives it to Congress."],
  ["Powers shared by the state and federal governments, such as taxing, are called…", "concurrent powers", ["reserved powers", "enumerated powers only", "implied powers only"], "Both levels can use them."],
  ["To change the South Carolina constitution, an amendment must pass the General Assembly and then be approved by…", "the voters", ["the President", "the Supreme Court", "the governor alone"], "Voters decide at an election.", true],
  ["The Home Rule Act of 1975 gave South Carolina counties…", "more power to run their own affairs", ["less power than before", "control of the army", "the right to print money"], "Before, the legislature ran much of county government.", true],
  ["If a South Carolina law conflicts with the US Constitution, which wins?", "the US Constitution", ["the state law", "the county ordinance", "whichever is newer"], "The Supremacy Clause.", true],
  ["Since 2018, candidates for governor in South Carolina run on the same ticket as their choice for…", "lieutenant governor", ["chief justice", "attorney general", "senator"], "Before, they were elected separately.", true],
  ["South Carolina's constitution requires the state budget to be…", "balanced", ["larger every year", "set by the President", "paid only by counties"], "Spending cannot exceed revenue.", true],
  ["School districts and special purpose districts, such as water or fire districts, are forms of…", "local government", ["federal government", "state courts", "political parties"], "They serve one area.", true],
  ["The 1895 constitution was written to take the vote from Black citizens. Those parts no longer apply because of…", "federal amendments, court rulings and the Voting Rights Act", ["a vote in Britain", "a governor's order", "a county council rule"], "Federal law protects the right to vote.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "sc-g9-sc-government",
    title: "Governing South Carolina",
    emoji: "🏛️",
    blurb: "The General Assembly, the governor, the courts and local government",
    parentNote:
      "How South Carolina's government is organized under its 1895 constitution: the General Assembly, the governor and the line-item veto, judges chosen by the legislature, counties, cities and special districts, and how state and federal powers fit together.",
    standards: ["USG.2.CC", "how governments in South Carolina are organized and work within the American constitutional system"],
    items: SC_GOVERNMENT,
  }),
];
