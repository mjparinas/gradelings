import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Kentucky Grade 5 social studies, colonization to the Constitution: the role of Kentucky settlers in the American
// Revolution, their lives compared with people elsewhere in the early United States, and incentives and opportunity
// costs in Kentucky history, through statehood in 1792 (5.H.KH.1, 5.G.KGE.1, 5.E.KE.1); and the roles and
// responsibilities of citizens, Kentucky citizens among them (5.C.RR.1, 5.C.KGO.1, 5.C.PR.1). The Revolution and the
// Constitution themselves are practised with adopted units (see ../plan/social.ts).

const SETTLERS: Q[] = [
  ["During the American Revolution, Kentucky was part of…", "Virginia", ["Canada", "Spain", "Pennsylvania"], "It was called Kentucky County."],
  ["George Rogers Clark led Kentucky and Virginia militia to capture British forts at…", "Kaskaskia and Vincennes", ["Boston and New York", "Paris and London", "Yorktown and Trenton"], "His campaign was in 1778 and 1779."],
  ["George Rogers Clark's campaign helped the United States claim the land…", "northwest of the Ohio River", ["in Florida", "in Mexico", "in Europe"], "This land became the Northwest Territory."],
  ["Which Kentucky city grew from a settlement George Rogers Clark started in 1778?", "Louisville", ["Lexington", "Bowling Green", "Paducah"], "It began on an island at the Falls of the Ohio."],
  ["In 1778, settlers at Boonesborough held out during a long…", "siege", ["parade", "harvest festival", "horse race"], "The fort did not fall."],
  ["The Battle of Blue Licks in 1782 was one of the last battles of the…", "American Revolution", ["Civil War", "War of 1812", "World War I"], "It was fought after Yorktown."],
  ["During the siege of Bryan's Station in 1782, women of the fort…", "carried water from a spring to the fort", ["surrendered at once", "rode to Boston", "left Kentucky"], "Their courage is remembered with a monument."],
  ["Kentucky settlers fought in the Revolution mostly to…", "defend the frontier and their homes", ["help the British", "find gold", "sail to France"], "The British and their allies raided the frontier."],
  ["Kentucky became the 15th state on…", "June 1, 1792", ["July 4, 1776", "January 1, 1800", "June 1, 1892"], "It was the first state west of the Appalachians."],
  ["Kentucky's first governor was…", "Isaac Shelby", ["Daniel Boone", "George Washington", "Henry Clay"], "He was a hero of the Revolution."],
  ["Before statehood, Kentuckians met in a series of conventions in…", "Danville", ["Boston", "Philadelphia", "Paris"], "There were ten conventions."],
  ["Kentucky's capital since 1793 has been…", "Frankfort", ["Lexington", "Louisville", "Harrodsburg"], "It is on the Kentucky River."],
  ["Compared with people in Philadelphia, most Kentucky settlers in the 1780s lived in…", "log cabins on farms", ["brick city houses", "castles", "apartment buildings"], "Kentucky was frontier land."],
  ["In 1787, Lexington got the first newspaper west of the mountains, the…", "Kentucky Gazette", ["New York Times", "Boston Globe", "London Times"], "John Bradford printed it."],
  ["A frontier is…", "land at the edge of where settlers live", ["a big city", "the ocean floor", "a castle wall"], "Kentucky was the western frontier."],
  ["Virginia promised land in Kentucky to soldiers. This was an…", "incentive to serve", ["opportunity cost", "tax", "punishment"], "An incentive encourages people to act."],
  ["Under Virginia law, early settlers who built a cabin and raised corn could claim…", "400 acres of land", ["a castle", "a ship", "nothing"], "These were called corn rights."],
  ["A family that left a safe town in Virginia for rich land in Kentucky gave up safety. Safety was their…", "opportunity cost", ["incentive", "profit", "tax"], "The opportunity cost is what you give up."],
  ["In 1784, Spain closed the port of New Orleans to Americans. This hurt Kentucky farmers because…", "they shipped goods down the Mississippi to sell", ["they had no farms", "they sold only to Spain", "it made goods cheaper"], "Rivers were their road to market."],
  ["Why did Kentuckians want statehood instead of staying part of Virginia?", "Virginia's capital was far away across the mountains", ["they wanted a king", "Virginia was too close", "they wanted fewer laws"], "Distance made it hard to be governed well.", true],
  ["Many Kentucky settlers, like Isaac Shelby, had fought in the Revolution. After the war they…", "helped write Kentucky's first constitution and lead the state", ["moved to England", "stopped voting", "gave Kentucky to Spain"], "Leaders of the war became leaders of the state.", true],
  ["Pinckney's Treaty in 1795 helped Kentucky because it…", "reopened the Mississippi and New Orleans to American trade", ["closed the Ohio River", "gave Kentucky to Spain", "ended farming"], "Trade could flow downriver again.", true],
  ["Enslaved African Americans in early Kentucky were forced to work without pay. Their labor…", "built farms and towns but gave them no freedom", ["was paid fairly", "was by choice", "was only in cities"], "Slavery was legal in Kentucky until 1865.", true],
  ["How was a Kentucky settler's life different from a Boston merchant's in 1790?", "settlers grew and made most of what they needed", ["settlers shopped in big stores", "settlers worked in banks", "there was no difference"], "Frontier life meant doing things yourself.", true],
];

const CITIZENS: Q[] = [
  ["A citizen of Kentucky is also a citizen of…", "the United States", ["only Kentucky", "Virginia", "no country"], "Citizens belong to both their state and their country."],
  ["At what age can a citizen vote in Kentucky?", "18", ["10", "14", "30"], "Kentuckians can register at 18, or at 17 if they will be 18 by the next general election."],
  ["Kentucky voters choose their governor every…", "four years, in odd-numbered years", ["year", "ten years", "month"], "Kentucky elected a governor in 2023."],
  ["Serving on a jury is a…", "responsibility of citizens", ["punishment", "game", "job for children"], "Juries decide cases in court."],
  ["Obeying laws is a…", "responsibility of every person", ["choice only for adults", "privilege of the governor", "rule only in school"], "Laws apply to everyone."],
  ["Paying taxes is a citizen's responsibility because taxes pay for…", "schools, roads, police and parks", ["only the governor's house", "toys for lawmakers", "nothing"], "Government uses taxes to serve people."],
  ["Which is a right, not a responsibility?", "freedom of speech", ["paying taxes", "serving on a jury", "obeying laws"], "Rights protect what you may do."],
  ["Which shows good citizenship at school?", "helping a classmate and following rules", ["breaking the rules", "littering", "teasing others"], "Good citizens care for their community."],
  ["Staying informed means…", "learning about issues in the news", ["never reading", "only playing games", "ignoring elections"], "Informed citizens make better choices."],
  ["Volunteering at a food bank is an example of…", "civic participation", ["breaking the law", "paying a fine", "a vacation"], "Citizens help their communities."],
  ["Kentucky law says children must attend school from about age 6 until age…", "18", ["8", "10", "30"], "Education is a responsibility."],
  ["A citizen who disagrees with a law can…", "contact their state lawmakers", ["break the law", "ignore it", "move the Capitol"], "Lawmakers listen to the people they represent."],
  ["Kentucky's state lawmakers meet in the…", "General Assembly in Frankfort", ["White House", "Supreme Court in Washington", "town library"], "They make Kentucky's laws."],
  ["The Kentucky Constitution says that power comes from…", "the people", ["a king", "the army", "one family"], "This is called popular sovereignty."],
  ["Respecting other people's rights is part of…", "good citizenship", ["breaking rules", "winning a game", "being a judge"], "Everyone's rights matter."],
  ["Who can become a United States citizen?", "people born here, and immigrants who complete the steps to become citizens", ["only people born in Kentucky", "only adults over 50", "no one new"], "Becoming a citizen is called naturalization."],
  ["A law that requires helmets for young bike riders mainly promotes…", "the general welfare", ["a king's power", "higher prices", "fewer parks"], "General welfare means the good of everyone."],
  ["Why do citizens vote?", "to choose leaders and decide issues", ["to get a prize", "to skip school", "to pay fewer taxes always"], "Each vote is one voice."],
  ["Which Kentucky official enforces laws for a county?", "the sheriff", ["the governor's chef", "the librarian", "the coach"], "Each county elects one."],
  ["Kentucky citizens choose the members of the General Assembly by…", "voting in elections", ["lottery", "birth order", "the governor's choice"], "Each district elects its own members.", true],
  ["Why are some laws, like speed limits, good for the general welfare?", "they protect everyone's safety", ["they help only drivers", "they slow down mail on purpose", "they raise prices"], "Think about who the law protects.", true],
  ["Writing a letter to the editor of a Kentucky newspaper is a way to…", "share an opinion on a public issue", ["break a law", "skip jury duty", "vote twice"], "Citizens speak up in many ways.", true],
  ["A citizen's duty to serve on a jury helps protect the right to…", "a fair trial", ["free candy", "a bigger house", "no taxes"], "Juries are made of ordinary citizens.", true],
  ["Which is a responsibility of a Kentucky citizen but not a requirement of law?", "voting", ["paying taxes", "obeying traffic laws", "going to school as a child"], "Voting is a right and a responsibility, but no one is forced to vote.", true],
];

export const SOCIAL_5: Unit[] = [
  bankUnit({
    id: "ky-g5-kentucky-settlers",
    title: "Kentucky in the Revolution",
    emoji: "🏰",
    blurb: "George Rogers Clark, Boonesborough and statehood",
    parentNote: "Kentucky settlers in the American Revolution (George Rogers Clark's campaign, the siege of Boonesborough, Bryan's Station and Blue Licks), frontier life compared with life in Eastern cities, land and other incentives and their opportunity costs, enslaved people's forced labor, and the road to statehood on June 1, 1792, with Isaac Shelby as the first governor.",
    standards: ["5.H.KH.1; 5.G.KGE.1; 5.E.KE.1", "the role of Kentucky settlers in the American Revolution, their lives compared with others in the early United States, and incentives and opportunity costs in Kentucky history"],
    items: SETTLERS,
  }),
  bankUnit({
    id: "ky-g5-citizenship",
    title: "Being a Good Citizen",
    emoji: "🗳️",
    blurb: "Rights, responsibilities and voting in Kentucky",
    parentNote: "The roles and responsibilities of citizens of Kentucky and the United States: voting, jury service, obeying laws, paying taxes, going to school, staying informed and volunteering, the difference between rights and responsibilities, and how laws can promote the general welfare.",
    standards: ["5.C.RR.1; 5.C.KGO.1; 5.C.PR.1", "the responsibilities of US citizens and good citizenship, the roles and responsibilities of a Kentucky citizen, and whether rules and laws promote the general welfare"],
    items: CITIZENS,
  }),
];
