import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Oklahoma Grade 2 social studies: the principles of our nation's government (2.C.1.1, 2.C.1.2), local, state, national
// and Tribal governments (2.C.1.4), American Indian nations as self-governing peoples (2.C.1.5), the Bill of Rights
// (2.C.1.6) and E Pluribus Unum (2.C.1.10). Tribal nations are living nations, written about in the present tense.

const GOVERNMENT: Q[] = [
  ["Liberty means…", "freedom", ["a holiday", "a river"], "The Liberty Bell rang for freedom."],
  ["Equality means that all people…", "are treated fairly under the law", ["are the same height", "like the same food"], "Everyone has the same rights."],
  ["People form a government to…", "protect their lives, property and rights", ["make everyone wear hats", "end all rules"], "Government works for the people."],
  ["The leader of the United States is the…", "President", ["governor", "mayor"], "The President is elected every four years."],
  ["The leader of Oklahoma's government is the…", "governor", ["President", "principal"], "Each state has a governor."],
  ["The leader of a city or town is often the…", "mayor", ["President", "governor"], "The mayor works with the city council."],
  ["Which is a level of government?", "state", ["playground", "grocery store"], "There are local, state, national and Tribal governments."],
  ["Local, state, national and Tribal governments all exist to…", "meet the needs of the people", ["sell toys", "make the weather"], "Each serves its people."],
  ["An American Indian nation that makes its own decisions is…", "self-governing", ["a state", "a company"], "It has its own government."],
  ["Many Tribal nations in Oklahoma choose their leaders by…", "voting", ["drawing straws", "a race"], "Tribal citizens elect their leaders."],
  ["The Cherokee Nation's leader is called the…", "Principal Chief", ["President", "Captain"], "Cherokee citizens elect the Principal Chief."],
  ["Tribal governments make decisions about things like…", "schools, health care and roads for their citizens", ["the US Army", "the US mail"], "They serve their own citizens."],
  ["The Bill of Rights is part of the…", "US Constitution", ["state flag", "phone book"], "It lists important freedoms."],
  ["The First Amendment protects our freedom to…", "speak and worship as we choose", ["take other people's things", "skip all laws"], "It is the first of the Bill of Rights."],
  ["Freedom of the press means people can…", "write and share the news", ["only read old books", "never read newspapers"], "It is in the First Amendment."],
  ["How many amendments are in the Bill of Rights?", "10", ["3", "50"], "They were added in 1791."],
  ["E Pluribus Unum means…", "Out of many, one", ["In God we trust", "Work conquers all"], "It is on the Great Seal."],
  ["E Pluribus Unum reminds us that many states and people make…", "one nation", ["many countries", "no country"], "We are united together."],
  ["Where can you see E Pluribus Unum?", "on the Great Seal and on coins", ["on a stop sign", "on a milk carton"], "Look closely at a quarter."],
  ["Fair play means…", "following the rules and treating others well", ["always winning", "changing the rules to win"], "It is part of being a good citizen."],
  ["In Oklahoma, a person can be a citizen of a Tribal nation, of Oklahoma and of the…", "United States", ["moon", "ocean"], "People can belong to more than one government.", true],
  ["Why do people in a free country have a written list of rights?", "so the government cannot take those rights away", ["so they can forget them", "so only leaders have rights"], "Writing them down protects them.", true],
  ["The Great Seal of the United States shows a…", "bald eagle", ["bison", "horse"], "The eagle holds a banner with E Pluribus Unum.", true],
  ["Why do Tribal nations have their own constitutions?", "to set up how they govern themselves", ["to join another country", "because they have no laws"], "A constitution is a plan for government.", true],
  ["Equal justice means laws are applied…", "the same way to everyone", ["only to children", "only on Mondays"], "Nobody is above the law.", true],
];

export const SOCIAL_2: Unit[] = [
  bankUnit({
    id: "ok-g2-government",
    title: "Governments & Rights",
    emoji: "📜",
    blurb: "Liberty, equality, Tribal nations and the Bill of Rights",
    parentNote:
      "The principles of our nation's government (liberty, equality, fair play and equal justice), why free people form governments, local, state, national and Tribal governments, American Indian nations as self-governing peoples, the Bill of Rights and the First Amendment, and the meaning of E Pluribus Unum.",
    standards: ["2.C.1.1; 2.C.1.2; 2.C.1.4; 2.C.1.5; 2.C.1.6; 2.C.1.10", "the principles of our government, local, state, national and Tribal governments, the Bill of Rights and E Pluribus Unum"],
    items: GOVERNMENT,
  }),
];
