import type { Unit } from "../../types";
import { SOCIAL_9 as CALIFORNIA_SOCIAL_9 } from "../../california/units/social-g9";
import { from, localCopy } from "./kit";

// Massachusetts copy of a Grade 8 civics unit that fits Massachusetts except for its questions about California's own
// elections, with Massachusetts items in their place.

export const SOCIAL_COPIES: Unit[] = [
  localCopy(from(CALIFORNIA_SOCIAL_9, "ca-g9-elections"), "ma-g8-elections", ["8.T3.4; 8.T3.5", "elections, political parties and how citizens take part"], [
    ["In Massachusetts, state primary elections are usually held in…", "September", ["January", "April", "July"], "The general election follows in November."],
    ["Massachusetts voters who are not enrolled in a party are called…", "unenrolled voters", ["delegates", "electors", "senators"], "They can choose a party's ballot in a primary."],
    ["How many members does Massachusetts send to the US House after the 2020 census?", "9", ["2", "14", "52"], "Every state also has 2 senators."],
    ["How many electoral votes does Massachusetts have in the 2024 to 2028 elections?", "11", ["2", "9", "54"], "House members plus 2 senators."],
    ["In Massachusetts, a 16-year-old can…", "preregister to vote", ["vote for governor", "run for the Senate", "serve on a jury"], "They can then vote once they turn 18."],
    ["Massachusetts voters can vote before Election Day by…", "early voting or a mail ballot", ["phoning the governor", "voting twice", "texting a vote"], "Early voting began in 2016."],
    ["Who draws the lines of Massachusetts's districts after each census?", "the General Court", ["the President", "the US Supreme Court", "each town alone"], "The state legislature passes the new maps."],
  ], {
    title: "Elections & Parties",
    blurb: "Voting, parties, primaries and campaigns",
    parentNote: "How Americans and Massachusetts voters register and vote, primaries, parties and nominations, the Electoral College, polls and campaign money, and how district lines are drawn.",
  }),
];
