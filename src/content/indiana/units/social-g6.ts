import type { Unit } from "../../types";
import { bankUnit } from "../own";

// Indiana Grade 6 social studies: the Indiana Constitution and state government from Indiana's Middle School Civics
// course (6.CIV.5, CIV.6, CIV.9, CIV.12), with the Preamble and principles of the United States Constitution and the
// three levels of government it shares with the state (6.CIV.1, CIV.2, CIV.10).

export const SOCIAL_6: Unit[] = [
  bankUnit({
    id: "in-g6-indiana-constitution",
    title: "Indiana's Constitution",
    emoji: "📜",
    blurb: "Its purposes, its rights and its three branches",
    parentNote:
      "Practices the purposes of government in the Preambles to the United States and Indiana Constitutions, the rights in Article 1 of the Indiana Constitution, the General Assembly, governor and courts (Articles 4, 5 and 7), state and local officials, and how the levels of government share power.",
    standards: ["6.CIV.1; 6.CIV.2; 6.CIV.5; 6.CIV.6; 6.CIV.9; 6.CIV.10; 6.CIV.12", "the purposes of the US and Indiana Constitutions, rights under Article I, state officials, the levels of government and Indiana's three branches"],
    items: [
      ["Indiana's current constitution was adopted in…", "1851", ["1776", "1816", "1999"], "It replaced the first constitution of 1816."],
      ["The Preamble of the Indiana Constitution says government exists so that justice is established, public order maintained and…", "liberty perpetuated", ["taxes raised", "kings crowned", "borders closed"], "Perpetuated means kept going."],
      ["The Preamble of the United States Constitution begins with the words…", "We the People", ["Hear ye", "Once upon a time", "By order of the King"], "Power comes from the people."],
      ["Article 1 of the Indiana Constitution is called the…", "Bill of Rights", ["Executive Article", "Tax Code", "Election Law"], "It lists rights the state must respect."],
      ["Which right is protected in Article 1 of the Indiana Constitution?", "freedom of speech", ["the right to skip all laws", "the right to a free car", "the right to never pay taxes"], "Like the First Amendment."],
      ["Article 4 of the Indiana Constitution sets up the…", "legislative branch", ["executive branch", "judicial branch", "school boards"], "It describes the General Assembly."],
      ["Article 5 of the Indiana Constitution sets up the…", "executive branch", ["legislative branch", "judicial branch", "county fairs"], "It describes the governor's office."],
      ["Article 7 of the Indiana Constitution sets up the…", "judicial branch", ["legislative branch", "executive branch", "state parks"], "It describes the courts."],
      ["The Indiana Senate has 50 members and the Indiana House of Representatives has…", "100 members", ["10 members", "435 members", "50 members"], "Together they are the General Assembly."],
      ["Indiana's governor is elected for a term of…", "four years", ["two years", "six years", "life"], "The governor can serve eight years in any twelve."],
      ["The Indiana Supreme Court has…", "five justices", ["nine justices", "one justice", "100 justices"], "A chief justice leads it."],
      ["Limited government means government…", "has only the powers the people give it", ["can do anything it wants", "has no rules", "is run by one person"], "Constitutions set limits."],
      ["The rule of law means…", "everyone, including leaders, must follow the law", ["leaders are above the law", "laws are suggestions", "only children follow laws"], "No one is above the law."],
      ["The three levels of government in the United States are local, state and…", "national", ["global", "school", "family"], "Each has its own powers."],
      ["Which official leads an Indiana city's executive branch?", "the mayor", ["the governor", "the chief justice", "the President"], "Mayors are elected locally."],
      ["Which Indiana official is the state's chief lawyer?", "the attorney general", ["the treasurer", "the lieutenant governor", "the auditor"], "The attorney general represents the state in court."],
      ["Indiana's secretary of state is in charge of…", "overseeing elections and business records", ["leading the army", "printing money", "writing all laws alone"], "The secretary of state is elected by voters."],
      ["County commissioners in Indiana are part of…", "local government", ["the national government", "a foreign government", "a private company"], "Indiana has 92 counties."],
      ["Both the United States and Indiana Constitutions divide power among three branches. This is called…", "separation of powers", ["federalism", "monarchy", "anarchy"], "No branch holds all power.", true],
      ["Federalism means power is shared between…", "the national government and the states", ["two kings", "cities and their parks", "teachers and students"], "States keep the powers not given to the nation.", true],
      ["Why might the Indiana Constitution protect some rights in words different from the US Bill of Rights?", "each state writes its own constitution", ["the US Bill of Rights does not apply in Indiana", "Indiana has no constitution", "rights are the same as rules for games"], "States can protect rights in their own words.", true],
      ["An Indiana law that goes against the United States Constitution is…", "not valid", ["stronger than the US Constitution", "valid only on weekends", "automatically a federal law"], "The US Constitution is the supreme law of the land.", true],
      ["How can the Indiana Constitution be amended?", "the General Assembly approves it twice and then voters approve it", ["the governor decides alone", "a mayor signs it", "it can never be changed"], "Amendments need lawmakers and voters.", true],
      ["Why do Indiana voters elect judges to stay on the Indiana Supreme Court after the governor appoints them?", "to let voters keep a check on the courts", ["to choose new laws", "to pick the governor", "to end the court"], "It is called a retention vote.", true],
      ["Why are rights in a constitution written down?", "so the government cannot easily take them away", ["so they can be ignored", "so only leaders know them", "because they change every day"], "Written rights are protected.", true],
      ["A town wants to build a park. Which level of government would most likely decide?", "local", ["national", "a foreign government", "the Indiana Supreme Court"], "Local government handles local places.", true],
    ],
  }),
];
