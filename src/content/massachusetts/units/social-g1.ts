import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Massachusetts Grade 1 social studies: citizens and leaders (1.T1.7, 1.T1.8, 1.T1.9), Boston as the capital of
// Massachusetts (1.T2.3), and natural resources and the jobs they bring (1.T4.1, 1.T4.2, 1.T4.4). Prompts stay short
// for little kids.

const CITIZENS: Q[] = [
  ["People who belong to a town or a country are called…", "citizens", ["visitors", "neighbors' pets"], "You are one too!"],
  ["A person born in the United States is a…", "citizen", ["tourist", "guest"], "They belong to the country."],
  ["Some people become citizens after they…", "move here from another country", ["lose a tooth", "go to bed"], "They take a citizenship test."],
  ["A good citizen…", "helps and follows the rules", ["litters", "breaks things"], "Good citizens care."],
  ["Who leads our whole country?", "the President", ["the mayor", "the principal"], "The President is elected."],
  ["Who leads our state?", "the governor", ["the President", "the coach"], "Massachusetts has one governor."],
  ["Who often leads a city?", "the mayor", ["the governor", "the President"], "Boston has one."],
  ["How do people choose the governor?", "they vote", ["they flip a coin", "they race"], "It is an election."],
  ["A capital city is where…", "the government meets", ["all the farms are", "the beach is"], "Leaders work there."],
  ["What is the capital of Massachusetts?", "Boston", ["Salem", "Lowell"], "The State House is there."],
  ["What is the capital of the United States?", "Washington, D.C.", ["Boston", "Chicago"], "The President lives there."],
  ["The building in Boston with a gold dome is the…", "State House", ["White House", "fire station"], "State leaders meet there."],
  ["Things from nature that people use are…", "natural resources", ["toys", "videos"], "Water, trees and fish."],
  ["Which is a natural resource?", "trees", ["plastic cups", "cars"], "They grow in nature."],
  ["Fishing boats in Gloucester catch…", "fish", ["trees", "rocks"], "Gloucester is by the sea."],
  ["Cranberries are a crop grown in…", "bogs", ["deserts", "snowbanks"], "Bogs are wet fields."],
  ["Which resource can grow back?", "trees", ["oil", "coal"], "We can plant more."],
  ["A resource that can be used up for good is…", "nonrenewable", ["renewable", "growing"], "Oil and coal take millions of years to form."],
  ["When you are paid for a job, you earn…", "income", ["homework", "a nap"], "Money for work."],
  ["Money paid for each hour of work is a…", "wage", ["toy", "gift card"], "It adds up hour by hour."],
  ["People learn skills in school so they can…", "do jobs well", ["stay up late", "skip lunch"], "People are a resource too.", true],
  ["Why do people vote for leaders?", "to choose who leads", ["to get candy", "to sing"], "Each vote counts.", true],
  ["Wind turbines turn wind into…", "electricity", ["water", "snow"], "Wind is a renewable resource.", true],
  ["A group needs a leader to…", "help it work together", ["eat all the snacks", "be the loudest"], "Leaders have more responsibility.", true],
  ["Being employed means you…", "have a job", ["are on vacation", "are a baby"], "You work and get paid.", true],
];

export const SOCIAL_1: Unit[] = [
  bankUnit({
    id: "ma-g1-citizens-and-resources",
    title: "Citizens, Leaders & Resources",
    emoji: "🏛️",
    blurb: "Leaders, Boston and the jobs nature gives us",
    parentNote: "What it means to be a citizen, leaders chosen by elections (the President, the governor of Massachusetts and mayors), Boston as the state capital, and how natural resources such as fish, cranberries, trees and wind bring jobs, with the words income and wage.",
    standards: ["1.T1.7; 1.T1.8; 1.T1.9; 1.T2.3; 1.T4.1; 1.T4.2; 1.T4.4", "citizens and elected leaders, the state capital, and natural resources and jobs"],
    items: CITIZENS,
  }),
];
