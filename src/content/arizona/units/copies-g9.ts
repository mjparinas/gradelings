import type { Unit } from "../../types";
import { SOCIAL_9 as CALIFORNIA_9 } from "../../california/units/social-g9";
import type { Q } from "../own";
import { copyOf, from } from "./kit";

// Arizona copies of California's Grade 9 civics units that use California examples: the questions that name another state
// are left out, and Arizona items fill in. The three branches (HS.C4.1, HS.C3.1) and elections (HS.C4.3, HS.C3.3).

const BRANCHES_EXTRA: Q[] = [
  ["Like every state, Arizona elects how many US senators?", "2", ["9", "30"], "Every state has two senators."],
  ["Since the 2020 census, how many members does Arizona send to the US House?", "9", ["2", "53"], "Seats are divided by population."],
];

const ELECTIONS_EXTRA: Q[] = [
  ["How many electoral votes does Arizona have in the 2024 to 2028 elections?", "11", ["9", "2"], "A state's electoral votes equal its senators plus its House members."],
  ["Who runs statewide elections in Arizona?", "the Arizona Secretary of State", ["the Arizona Supreme Court", "the US Senate"], "County recorders and election officials run local voting."],
  ["Arizona citizens can put a new law on the ballot by gathering signatures for an…", "initiative", ["impeachment", "veto"], "Arizona's constitution of 1912 gave voters this power."],
  ["Arizona voters can remove an elected official early with a…", "recall election", ["census", "filibuster"], "Enough voters must sign a petition first."],
  ["Many Arizona voters get their ballots by mail through the…", "Active Early Voting List", ["Electoral College", "Federal Reserve"], "Voters can mail the ballot back or drop it off.", true],
  ["Arizona's legislature has how many districts?", "30", ["9", "50"], "Each district elects one senator and two representatives."],
];

const COURT_EXTRA: Q[] = [
  ["Miranda v. Arizona (1966) ruled that police must tell suspects…", "their right to stay silent and to have a lawyer", ["the name of the judge", "how long the trial will be"], "These are now called Miranda rights."],
  ["The Miranda case began when Ernesto Miranda was questioned by police in…", "Phoenix", ["Tucson", "Yuma"], "The Supreme Court overturned his first conviction."],
  ["The Miranda warning protects rights in the…", "Fifth and Sixth Amendments", ["First and Second Amendments", "Tenth Amendment"], "The Fifth protects against self-incrimination; the Sixth guarantees a lawyer.", true],
  ["Sandra Day O'Connor, who served in the Arizona Senate, was the first woman on the…", "US Supreme Court", ["Arizona Corporation Commission", "US Senate"], "President Reagan named her in 1981."],
];

export const COPIES_9: Unit[] = [
  copyOf(
    from(CALIFORNIA_9, "ca-g9-three-branches"),
    {
      id: "az-g9-three-branches",
      title: "Three Branches",
      emoji: "⚖️",
      blurb: "Congress, the President and the courts, and how they check each other",
      parentNote: "The structure, powers and checks of Congress, the presidency and the federal courts, how each branch makes decisions, and Arizona's seats in Congress.",
      standards: ["HS.C4.1; HS.C3.1", "procedures for decisions in all three branches, and how the US Constitution divides and limits power"],
    },
    BRANCHES_EXTRA,
  ),
  copyOf(
    from(CALIFORNIA_9, "ca-g9-elections"),
    {
      id: "az-g9-elections",
      title: "Elections & Voting",
      emoji: "🗳️",
      blurb: "Registering, primaries, parties and the Electoral College",
      parentNote: "How people register and vote, primaries and parties, the Electoral College, polls, campaign money and the media, and redistricting, with Arizona's electoral votes and who runs its elections.",
      standards: ["HS.C4.3; HS.C3.3", "the procedures for elections at each level, and the impact of parties, interest groups, elections and the media"],
    },
    ELECTIONS_EXTRA,
  ),
  copyOf(
    from(CALIFORNIA_9, "ca-g9-supreme-court"),
    {
      id: "az-g9-supreme-court",
      title: "Landmark Supreme Court Cases",
      emoji: "👩‍⚖️",
      blurb: "How the Court reads the Constitution",
      parentNote: "Landmark decisions from Marbury v. Madison to recent cases, including Miranda v. Arizona, judicial activism and restraint, precedent, and how readings of the Bill of Rights and civil rights have changed, presented factually and from more than one side.",
      standards: ["HS.C2.3", "landmark Supreme Court cases and how rights have changed over time"],
    },
    COURT_EXTRA,
  ),
];
