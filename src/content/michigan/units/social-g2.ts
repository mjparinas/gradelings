import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Michigan Grade 2 social studies, The Local Community: how local government makes, carries out and judges local laws and
// the services it provides (2 – C3.0.1 to C3.0.3), and where a local community is within Michigan (2 – G1.0.3).

const LOCAL: Q[] = [
  ["A law made by a city or town is called an…", "ordinance", ["election", "allowance", "invitation"], "Local laws have their own name."],
  ["Who leads many cities in Michigan?", "a mayor", ["a king", "the President", "a principal"], "A mayor is elected by the people of the city."],
  ["A group of people elected to make a city's laws is the…", "city council", ["school board only", "baseball team", "fire crew"], "The council votes on ordinances."],
  ["Many small communities in Michigan are governed by a…", "township board", ["royal court", "ship's crew", "club"], "Michigan has more than 1,200 townships."],
  ["Which service does local government provide?", "fire protection", ["selling toys", "making movies", "growing candy"], "Fire stations belong to the community."],
  ["Who keeps people safe and makes sure laws are followed in a town?", "police officers", ["bakers", "painters", "farmers"], "They enforce the laws."],
  ["Where can you borrow books for free in many communities?", "the public library", ["the gas station", "a shoe store", "the bank"], "Libraries are a community service."],
  ["Who plows snow from the streets in many Michigan towns?", "public works crews", ["the mayor's dog", "students", "doctors"], "They also fix potholes."],
  ["How do local governments pay for services like parks and roads?", "with taxes", ["with game tickets", "with free candy", "with coupons"], "People pay taxes to the community."],
  ["A judge in a local court decides…", "if a law was broken", ["what is for lunch", "who wins a race", "how tall a tree grows"], "Courts interpret the laws."],
  ["A town makes a rule that dogs must be on a leash in the park. This is an example of…", "making a law", ["breaking a law", "a holiday", "a birthday"], "The council made a new ordinance."],
  ["A park ranger tells a family about the leash rule. This is…", "enforcing a law", ["making a law", "voting", "a holiday"], "Enforcing means making sure people follow it."],
  ["Clean drinking water from the tap is often a service of…", "the local government", ["a toy store", "a movie theater", "the weather"], "Many towns run a water plant."],
  ["Who chooses the mayor in a city?", "the voters", ["the President", "the mayor's family", "the teachers"], "Adults vote in elections."],
  ["Michigan is made of two parts called the…", "Upper and Lower Peninsulas", ["East and West Islands", "North and South Mountains", "big and small deserts"], "The Mackinac Bridge joins them."],
  ["Which city is the capital of Michigan?", "Lansing", ["Detroit", "Grand Rapids", "Chicago"], "State leaders meet there."],
  ["Which is the largest city in Michigan?", "Detroit", ["Lansing", "Marquette", "Toledo"], "It is called the Motor City."],
  ["Which state is just south of Michigan?", "Ohio", ["Florida", "Maine", "Alaska"], "Ohio and Indiana are south of Michigan."],
  ["Which country is across the Detroit River from Detroit?", "Canada", ["Mexico", "France", "Japan"], "A bridge and a tunnel cross the river."],
  ["On a map, a star often shows a…", "capital city", ["lake", "mountain", "farm"], "Look at the map key."],
  ["A county is…", "a part of a state with its own government", ["a kind of lake", "a big park", "a type of road"], "Michigan has 83 counties.", true],
  ["Why do communities have local governments?", "to solve problems and provide services close to home", ["to plan birthday parties", "to choose everyone's job", "to make the weather"], "Local leaders know local needs.", true],
  ["If a street has too many crashes, who might add a stop sign?", "the local government", ["the President", "a grocery store", "a school bus driver"], "Local roads are a local job.", true],
  ["A city asks people to vote on building a new library. This is an example of…", "people taking part in community decisions", ["breaking a law", "a holiday", "a court trial"], "Citizens help decide.", true],
  ["Which body of water is on Michigan's west side?", "Lake Michigan", ["Lake Erie", "the Atlantic Ocean", "the Gulf of Mexico"], "It shares the state's name.", true],
];

export const SOCIAL_2: Unit[] = [
  bankUnit({
    id: "mi-g2-local-government",
    title: "Our Local Government",
    emoji: "🏛️",
    blurb: "Mayors, councils, townships and the services they run",
    parentNote: "How local government in Michigan cities, townships and counties makes laws (ordinances), enforces and judges them, and provides services such as fire protection, libraries, water and snow plowing, plus where a community sits within Michigan.",
    standards: ["2-C3.0.1; 2-C3.0.2; 2-C3.0.3; 2-G1.0.3", "how local governments make, enforce and interpret laws and provide services, and where the local community is in Michigan"],
    items: LOCAL,
  }),
];
