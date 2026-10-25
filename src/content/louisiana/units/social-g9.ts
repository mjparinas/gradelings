import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Louisiana High School Civics: how Louisiana governs itself (C.9a). The state's three branches, its constitution and
// civil law, parish government (police juries and councils, sheriffs and other parish officials), how each level is
// paid for, and the four federally recognized Tribes of Louisiana as self-governing nations today.

const GOVERNMENT: Q[] = [
  ["The Louisiana Legislature has two houses: the Senate and the…", "House of Representatives", ["Cabildo", "Supreme Court"], "Like Congress, it is bicameral."],
  ["How many members serve in the Louisiana House of Representatives?", "105", ["39", "435"], "The Senate has 39."],
  ["How many members serve in the Louisiana Senate?", "39", ["105", "100"], "The House has 105."],
  ["How long is a term for the governor of Louisiana?", "4 years", ["2 years", "6 years"], "The governor can serve two terms in a row."],
  ["Who heads the executive branch of Louisiana's government?", "the governor", ["the Speaker of the House", "the Chief Justice"], "The governor carries out state laws."],
  ["What is the highest court in Louisiana?", "the Louisiana Supreme Court", ["the U.S. Supreme Court", "a parish court"], "It has seven justices."],
  ["Louisiana's local governments are organized by…", "parishes", ["counties", "provinces"], "There are 64."],
  ["In many Louisiana parishes, the governing body is called the…", "police jury", ["city council of New Orleans", "state senate"], "It is like a county commission elsewhere."],
  ["Some parishes adopted home rule charters and are governed instead by a…", "parish council and parish president", ["king", "federal judge"], "Home rule gives local control."],
  ["In Louisiana, the chief law enforcement officer of a parish is the…", "sheriff", ["mayor", "governor"], "Each parish elects one."],
  ["Louisiana's legal system is unique among the states because it is based on…", "civil law from French and Spanish traditions", ["English common law only", "Tribal law only"], "Louisiana has a Civil Code."],
  ["The Louisiana Civil Code was shaped by French law, including the…", "Napoleonic Code", ["Magna Carta", "Code of Hammurabi"], "France's civil code of 1804."],
  ["Louisiana's current constitution was adopted in…", "1974", ["1812", "1921"], "It has been amended many times."],
  ["To amend Louisiana's constitution, the Legislature proposes a change and then…", "the voters approve it", ["the governor signs it alone", "the U.S. Congress approves it"], "Amendments go on the ballot."],
  ["Which official takes over if Louisiana's governor cannot serve?", "the lieutenant governor", ["the attorney general", "the mayor of Baton Rouge"], "The lieutenant governor is next in line."],
  ["Which board sets policy for Louisiana's public schools?", "the Board of Elementary and Secondary Education (BESE)", ["the U.S. Senate", "the police jury"], "It adopts the state standards."],
  ["Which is one of the four federally recognized Tribes in Louisiana?", "the Chitimacha Tribe of Louisiana", ["the Navajo Nation", "the Cherokee Nation"], "Its land is at Charenton."],
  ["The four federally recognized Tribes in Louisiana are the Chitimacha, the Coushatta, the Jena Band of Choctaw and the…", "Tunica-Biloxi", ["Seminole", "Lakota"], "Its land is near Marksville."],
  ["Federally recognized Tribes in Louisiana have…", "their own governments that make decisions for their nations", ["no government at all", "a king chosen by the state"], "They are sovereign nations."],
  ["Which level of government prints money and makes treaties?", "federal", ["state", "parish"], "The Constitution gives these powers to the national government."],
  ["Which level of government runs driver's licenses and state highways?", "state", ["federal", "Tribal only"], "States handle these.", true],
  ["Parish governments in Louisiana are paid for mostly by…", "property and sales taxes", ["tariffs on imports", "selling stamps"], "Local taxes pay local services.", true],
  ["A large part of Louisiana's state money has come from taxes on…", "oil and gas taken from the ground", ["imported cars only", "postage stamps"], "These are called severance taxes.", true],
  ["In Louisiana, the sheriff also serves as the parish's…", "tax collector", ["governor", "school principal"], "Sheriffs collect property taxes.", true],
  ["How do Tribal, state and federal governments in Louisiana work together?", "through agreements on matters such as law enforcement, health and gaming", ["they never talk to each other", "the state governs all Tribal land"], "They cooperate as governments.", true],
  ["Why does Louisiana elect parish officials such as the assessor and clerk of court?", "so voters choose who runs local services", ["because the President appoints them", "so the state can skip elections"], "Local offices answer to local voters.", true],
  ["Louisiana's State Capitol in Baton Rouge is the…", "tallest state capitol in the United States", ["oldest building in North America", "smallest capitol"], "It is 34 stories high.", true],
];

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "la-g9-louisiana-government",
    title: "Louisiana's Government",
    emoji: "🏛️",
    blurb: "The Legislature, parishes, civil law and Tribal nations",
    parentNote:
      "How Louisiana governs itself: the Legislature, the governor and the courts, the 1974 constitution and the Civil Code, parish government (police juries, home rule councils, sheriffs and other parish officials), how each level of government is paid for, and the four federally recognized Tribes of Louisiana as self-governing nations today.",
    standards: ["C.9", "the structure and powers of local, state, Tribal and federal governments, with Louisiana's government"],
    items: GOVERNMENT,
  }),
];
