import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Tennessee Grade 9 social studies, United States Government and Civics: Tennessee in Congress (GC.16), the structures
// and functions of Tennessee's executive, legislative and judicial departments (GC.39), local governments in Tennessee
// (GC.40) and finding current officials (GC.41). Officials are taught by office, not by name, so the unit stays true
// after an election.

const GOVERNING: Q[] = [
  ["How many US senators does Tennessee have?", "2", ["9", "33"], "Every state has two."],
  ["How many members does Tennessee send to the US House of Representatives?", "9", ["2", "99"], "Seats depend on population."],
  ["The number of Tennessee's US House seats is set by…", "the census every ten years", ["the governor", "a coin toss"], "This is apportionment."],
  ["US senators from Tennessee serve terms of…", "six years", ["two years", "four years"], "A third of the Senate is elected every two years."],
  ["Tennessee's legislative department is the…", "General Assembly", ["Supreme Court", "Cabinet"], "It meets in the State Capitol in Nashville."],
  ["Tennessee's state Senate has how many members?", "33", ["99", "100"], "State senators serve four-year terms."],
  ["Tennessee's state House of Representatives has how many members?", "99", ["33", "435"], "House members serve two-year terms."],
  ["The head of Tennessee's executive department is the…", "governor", ["lieutenant governor", "attorney general"], "The governor serves a four-year term."],
  ["In Tennessee, the lieutenant governor is also…", "the Speaker of the state Senate", ["the mayor of Nashville", "a Supreme Court justice"], "The Senate elects its speaker."],
  ["Tennessee's highest court is the Tennessee Supreme Court, with…", "five justices", ["nine justices", "one judge"], "It hears appeals on state law."],
  ["Tennessee has three grand divisions. The state constitution says no more than two Supreme Court justices may come from…", "the same grand division", ["the same family", "the same county"], "It keeps the court balanced across the state."],
  ["The governor's power to reject a bill passed by the General Assembly is the…", "veto", ["census", "filibuster"], "In Tennessee, a simple majority of each house can override it."],
  ["Tennessee has how many counties?", "95", ["50", "100"], "Each county has its own government."],
  ["A county government in Tennessee is led by a county mayor and a…", "county commission", ["state senate", "school board only"], "The commission sets the county budget."],
  ["A metro government, such as Nashville-Davidson County, is…", "a city and county joined into one government", ["a subway system", "a state agency"], "Nashville joined with its county in 1963."],
  ["Cities and towns in Tennessee get their powers from…", "the state, through charters and state law", ["the federal government alone", "the county commission alone"], "Local governments are created by the state."],
  ["Which level of government in Tennessee usually runs public schools day to day?", "local school districts", ["the US Congress", "the Tennessee Supreme Court"], "Districts are run by elected school boards."],
  ["Tennessee does not tax wages, so the state relies heavily on…", "the sales tax", ["a wage tax", "a tariff"], "Tennessee has one of the highest combined sales tax rates."],
  ["How can you find out who represents your district in the General Assembly?", "look up your address on the General Assembly's or the county election office's website", ["ask the President", "check a road map"], "Districts are drawn by address."],
  ["Which officials are elected statewide in Tennessee?", "the governor", ["the attorney general", "the secretary of state"], "The other two are chosen in other ways.", true],
  ["Tennessee's attorney general is chosen by…", "the Tennessee Supreme Court", ["the voters", "the governor alone"], "Tennessee is unusual in this.", true],
  ["Tennessee's secretary of state, treasurer and comptroller are elected by…", "the General Assembly", ["the voters", "the Supreme Court"], "They are chosen in a joint session.", true],
  ["Under Tennessee's Plan, appellate judges are appointed by the governor, confirmed by the General Assembly and then…", "face yes-or-no retention elections", ["serve for life with no vote", "are chosen by lottery"], "Voters decide whether to keep them.", true],
  ["How are federal and state powers shared in Tennessee?", "the federal government handles matters like defense, and the state handles matters like driver's licenses", ["the state runs the army", "the federal government sets every local speed limit"], "This is federalism.", true],
  ["Why do Tennessee's county and city budgets depend on the state?", "the state shares tax money and sets rules on what local taxes they may raise", ["the state sets no rules", "local governments print their own money"], "Local and state finances are linked.", true],
  ["A Tennessee voter who disagrees with a state law can…", "contact their state legislators or vote in the next election", ["ignore it with no consequence", "veto it personally"], "Citizens take part in many ways.", true],
];

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "tn-g9-governing-tennessee",
    title: "Governing Tennessee",
    emoji: "🏛️",
    blurb: "Tennessee's government, from Congress to county",
    parentNote:
      "Tennessee's two US senators and nine US representatives, the General Assembly, the governor and the Tennessee Supreme Court, how state officials and judges are chosen, and the county, city and metro governments of Tennessee and how they relate to the state. Officials are taught by office, so look up your own representatives together.",
    standards: ["GC.16; GC.39; GC.40; GC.41", "Tennessee in Congress, the three departments of Tennessee's government, local governments in Tennessee, and finding current officials"],
    items: GOVERNING,
  }),
];
