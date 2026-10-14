import type { Unit } from "../../types";
import { SOCIAL_9 as CALIFORNIA_9 } from "../../california/units/social-g9";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Arkansas's own Grade 9 social studies units (`ar-` ids), for Civics: Arkansas's state and local government under the
// Constitution of 1874 (C.2.CIV.2, C.4.CIV.1, C.4.CIV.5), and copies of California's three branches, elections,
// lawmaking and Supreme Court units without their California questions, with Arkansas items added (C.2.CIV.5 to
// C.2.CIV.7, C.3.CIV.5, C.3.CIV.12, C.3.CIV.13, C.4.CIV.1, C.4.CIV.3), including Cooper v. Aaron and Epperson v. Arkansas.

const ARKANSAS: Q[] = [
  ["The capital of Arkansas is…", "Little Rock", ["Fort Smith", "Hot Springs", "Fayetteville"], "On the Arkansas River."],
  ["Arkansas's current constitution was adopted in…", "1874", ["1776", "1836", "1957"], "It has been amended many times since."],
  ["Arkansas's lawmaking body is the…", "General Assembly", ["Congress", "Parliament", "Quorum Court"], "It has two houses."],
  ["The two houses of the Arkansas General Assembly are the Senate and the…", "House of Representatives", ["Assembly of Counties", "Cabinet", "Supreme Court"], "Bicameral, like Congress."],
  ["How many members serve in the Arkansas Senate?", "35", ["2", "100", "75"], "Senators serve four-year terms."],
  ["How many members serve in the Arkansas House of Representatives?", "100", ["35", "75", "435"], "Representatives serve two-year terms."],
  ["The chief executive of Arkansas is the…", "governor", ["lieutenant governor", "chief justice", "speaker of the House"], "Elected statewide."],
  ["An Arkansas governor serves a term of…", "4 years", ["2 years", "6 years", "for life"], "Up to two terms."],
  ["Who presides over the Arkansas Senate?", "the lieutenant governor", ["the chief justice", "the president", "the mayor of Little Rock"], "Like the vice president in the US Senate."],
  ["Which official runs elections and keeps state records in Arkansas?", "the secretary of state", ["the governor's chef", "the chief justice", "the county sheriff"], "One of Arkansas's constitutional officers."],
  ["The highest court in Arkansas is the…", "Arkansas Supreme Court", ["US Supreme Court", "Quorum Court", "General Assembly"], "Seven justices."],
  ["How are Arkansas Supreme Court justices chosen?", "elected by voters in nonpartisan elections", ["appointed for life by the president", "chosen by the General Assembly", "chosen by lottery"], "Different from federal judges."],
  ["Trials in Arkansas for serious crimes and large lawsuits are heard in…", "circuit courts", ["the General Assembly", "city councils", "the governor's office"], "Trial courts in each judicial circuit."],
  ["How many counties does Arkansas have?", "75", ["50", "100", "35"], "Each has a county seat."],
  ["In Arkansas, the chief executive of a county is the…", "county judge", ["governor", "mayor", "chief justice"], "An unusual title for an executive."],
  ["The lawmaking body of an Arkansas county is the…", "quorum court", ["General Assembly", "city council", "Supreme Court"], "Its members are called justices of the peace."],
  ["Cities in Arkansas are often led by a mayor and a…", "city council", ["quorum court", "General Assembly", "Cabinet"], "It passes ordinances."],
  ["A law passed by a city council is called an…", "ordinance", ["amendment", "treaty", "veto"], "Local laws."],
  ["In Arkansas, citizens can propose a new law or constitutional amendment by…", "gathering signatures for an initiative petition", ["writing to the president", "asking the Supreme Court", "voting in the General Assembly"], "Then voters decide on the ballot."],
  ["A referendum lets Arkansas voters…", "approve or reject a law on the ballot", ["choose the president", "appoint judges for life", "write the US Constitution"], "Direct democracy."],
  ["To override a governor's veto, the Arkansas General Assembly needs…", "a simple majority of each house", ["two-thirds of each house", "a vote of the people", "the US Supreme Court"], "Lower than the two-thirds Congress needs.", true],
  ["In even-numbered years, the Arkansas General Assembly meets in a short fiscal session, mainly to…", "pass the state budget", ["elect the president", "pick Supreme Court justices", "write treaties"], "Arkansas must balance its budget.", true],
  ["Arkansas's Constitution of 1874 is the state's…", "fifth constitution", ["first constitution", "only constitution", "tenth constitution"], "Earlier ones: 1836, 1861, 1864 and 1868.", true],
  ["Why do state and local governments in Arkansas work with the federal government on things like elections and highways?", "Each level has its own powers, so they must cooperate", ["The federal government does everything alone", "States have no powers", "Cities make all national laws"], "Federalism in action.", true],
  ["The 25 white stars around the diamond on the Arkansas flag stand for…", "Arkansas being the 25th state", ["the 25 counties", "25 rivers", "the 25 governors"], "The diamond recalls Arkansas's diamonds.", true],
  ["How is a county judge in Arkansas different from a circuit judge?", "A county judge runs county government; a circuit judge hears trials", ["They are the same job", "A county judge is appointed by the president", "A circuit judge runs elections"], "Same title, different branch.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "ar-g9-arkansas-government",
    title: "Governing Arkansas",
    emoji: "🏛️",
    blurb: "The General Assembly, governor and courts",
    parentNote:
      "Arkansas's government under the Constitution of 1874: the General Assembly's Senate and House of Representatives, the governor and other elected officers, the Arkansas Supreme Court and circuit courts, county judges and quorum courts, city governments, and how citizens make laws through initiatives and referendums.",
    standards: ["C.2.CIV.2; C.4.CIV.1; C.4.CIV.5", "Arkansas's state and local government, and how laws are made by initiative and referendum"],
    items: ARKANSAS,
  }),
  copyOf(
    from(CALIFORNIA_9, "ca-g9-three-branches"),
    {
      id: "ar-g9-three-branches",
      title: "Three Branches",
      emoji: "🏛️",
      blurb: "Congress, the president and the courts",
      parentNote:
        "The purpose, organization and powers of the legislative, executive and judicial branches of the US government, terms of office, checks and balances, and how Arkansas is represented in Congress.",
      standards: ["C.2.CIV.5; C.2.CIV.6; C.2.CIV.7; C.3.CIV.5", "the legislative, executive and judicial branches, and how the census sets House seats"],
    },
    [
      ["How many US senators does Arkansas have?", "2", ["1", "4", "6"], "Every state has two."],
      ["How many members does Arkansas send to the US House of Representatives?", "4", ["2", "6", "10"], "Based on population."],
      ["Arkansas has how many electoral votes for president?", "6", ["2", "4", "10"], "2 senators + 4 representatives."],
      ["The US census, which counts everyone every 10 years, decides…", "how many House seats each state gets", ["who is president", "how many senators each state gets", "the date of Election Day"], "Required by the Constitution."],
      ["Why does Arkansas have fewer House members than many larger states?", "House seats are based on population", ["Arkansas asked for fewer", "Arkansas joined the Union later", "Senators decide"], "About 3 million people live in Arkansas."],
      ["Which branch carries out and enforces federal laws?", "the executive branch", ["the legislative branch", "the judicial branch", "the states only"], "Led by the president."],
    ],
  ),
  copyOf(
    from(CALIFORNIA_9, "ca-g9-elections"),
    {
      id: "ar-g9-elections",
      title: "Elections & Voting",
      emoji: "🗳️",
      blurb: "Parties, primaries and the Electoral College",
      parentNote:
        "How elections work at the federal, state and local levels: voter registration, primary and general elections, political parties and platforms, the Electoral College and redistricting, with Arkansas's rules.",
      standards: ["C.3.CIV.12; C.3.CIV.13; C.3.CIV.16", "political parties, the election process and redistricting"],
    },
    [
      ["To vote in Arkansas, a person must register at least ___ days before the election.", "30", ["1", "3", "365"], "Registration closes before Election Day."],
      ["Who oversees elections statewide in Arkansas?", "the secretary of state", ["the chief justice", "the governor's chef", "the mayor of Little Rock"], "County election commissions run local voting."],
      ["Arkansas voters must show which of these when they vote in person?", "a photo ID", ["a library card only", "a report card", "nothing at all"], "Voters approved this rule in 2018."],
      ["How many electoral votes does Arkansas have?", "6", ["2", "4", "54"], "2 senators + 4 representatives."],
      ["In Arkansas, the county clerk's office helps citizens…", "register to vote", ["write state laws", "choose Supreme Court justices", "print money"], "Local election offices."],
      ["Who can vote in Arkansas elections?", "US citizens who are at least 18, live in Arkansas and are registered", ["anyone at least 12", "only people who own land", "only members of a party"], "Citizenship, age, residence and registration."],
    ],
  ),
  copyOf(
    from(CALIFORNIA_9, "ca-g9-lawmaking"),
    {
      id: "ar-g9-lawmaking",
      title: "How Laws Are Made",
      emoji: "📜",
      blurb: "From a bill to a law",
      parentNote:
        "How federal, state and local laws are made: bills, committees and hearings, votes in both houses, vetoes and overrides, lobbying and compromise, and in Arkansas, the General Assembly, initiatives and referendums.",
      standards: ["C.4.CIV.1; C.2.CIV.5", "how federal, state and local laws are made, including ballot initiatives and referendums"],
    },
    [
      ["The Arkansas General Assembly meets in the State Capitol in…", "Little Rock", ["Fort Smith", "Hot Springs", "Jonesboro"], "The capital city."],
      ["In Arkansas, citizens can put a proposed law on the ballot through…", "an initiative petition", ["a filibuster", "a veto", "an executive order"], "They must gather enough signatures."],
      ["To override the governor's veto, the Arkansas General Assembly needs…", "a simple majority of each house", ["two-thirds of each house", "a court order", "a recall"], "Lower than in Congress."],
      ["The Arkansas General Assembly has a Senate and a…", "House of Representatives", ["Quorum Court", "Cabinet", "Assembly of Mayors"], "Two houses."],
      ["A bill in the Arkansas General Assembly must pass…", "both the Senate and the House", ["only the Senate", "only the governor", "the US Congress"], "Then it goes to the governor."],
      ["A county's quorum court passes local laws called…", "ordinances", ["amendments", "treaties", "vetoes"], "County government."],
    ],
  ),
  copyOf(
    from(CALIFORNIA_9, "ca-g9-supreme-court"),
    {
      id: "ar-g9-supreme-court",
      title: "Landmark Supreme Court Cases",
      emoji: "⚖️",
      blurb: "Judicial review and rulings that changed rights",
      parentNote:
        "How the US Supreme Court shapes the law through judicial review and precedent, and landmark cases from Marbury v. Madison to Brown v. Board of Education, including two cases from Arkansas: Cooper v. Aaron (1958) and Epperson v. Arkansas (1968).",
      standards: ["C.4.CIV.3; C.3.CIV.1", "the Supreme Court's role in lawmaking, and landmark cases on citizens' rights"],
    },
    [
      ["In Cooper v. Aaron (1958), about integrating Central High School in Little Rock, the Supreme Court ruled that states…", "must obey the Court's decisions", ["can ignore federal courts", "can close the Supreme Court", "can secede"], "No state can overrule the Constitution."],
      ["In Epperson v. Arkansas (1968), the Supreme Court struck down an Arkansas law that banned teaching…", "evolution in public schools", ["math", "reading", "music"], "The First Amendment bars laws that favor a religion."],
      ["Cooper v. Aaron grew out of the crisis over the…", "Little Rock Nine", ["Louisiana Purchase", "Brooks-Baxter War", "Flood of 1927"], "Central High School, 1957."],
      ["Brown v. Board of Education (1954) ruled that…", "segregated public schools are unconstitutional", ["schools must close", "only states decide rights", "segregation is fair"], "It overturned Plessy v. Ferguson for schools."],
      ["Judicial review means courts can…", "strike down laws that break the Constitution", ["write new laws", "elect the president", "collect taxes"], "Set by Marbury v. Madison."],
      ["Which amendment's establishment clause was at the center of Epperson v. Arkansas?", "the First", ["the Second", "the Tenth", "the Nineteenth"], "Freedom of religion.", true],
    ],
  ),
];
