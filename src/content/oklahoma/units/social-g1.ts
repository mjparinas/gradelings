import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Oklahoma Grade 1 social studies: our nation's government and how people hold its power by electing leaders (1.C.1.1,
// 1.C.1.2), patriotic traditions and the national motto (1.C.1.5, 1.C.1.7), and the symbols of the United States
// (1.C.2.1). Prompts stay short for little readers.

const NATION: Q[] = [
  ["Our nation's government helps keep people…", "safe", ["hungry", "lost"], "It makes rules for everyone."],
  ["The leader of our whole country is the…", "President", ["mayor", "principal"], "The President lives in the White House."],
  ["How do people choose the President?", "they vote", ["they guess", "they race"], "Grown-up citizens vote."],
  ["The people we elect make our…", "laws", ["lunches", "toys"], "Laws are rules for a country."],
  ["Laws help protect our…", "rights", ["shoes", "snacks"], "Rights are freedoms we all have."],
  ["Who chooses our leaders?", "the people", ["one king", "a robot"], "In our country, the people hold the power."],
  ["Our nation's flag is red, white and…", "blue", ["green", "purple"], "Look at the stars and stripes."],
  ["How many stars are on the flag of the United States?", "50", ["13", "10"], "One star for each state."],
  ["The 13 stripes on our flag stand for the first…", "13 colonies", ["13 presidents", "13 rivers"], "The colonies became the first states."],
  ["Our national bird is the…", "bald eagle", ["robin", "owl"], "It is a symbol of freedom."],
  ["The Statue of Liberty holds up a…", "torch", ["hammer", "book bag"], "Its light welcomes people."],
  ["The Liberty Bell has a famous…", "crack", ["hat", "flag"], "It rang for freedom long ago."],
  ["Our nation's motto is…", "In God We Trust", ["Work Hard", "Go Team"], "It is printed on our money."],
  ["Where can you find our motto, In God We Trust?", "on coins and bills", ["on a stop sign", "on a cereal box"], "Look closely at a penny."],
  ["When we say the Pledge of Allegiance, we face the…", "flag", ["door", "window"], "We put a hand over our heart."],
  ["On the Fourth of July, our country celebrates its…", "birthday", ["first snow", "spring break"], "It began in 1776."],
  ["The White House is where the… lives and works.", "President", ["governor", "teacher"], "It is in Washington, D.C."],
  ["Singing the national anthem is a… tradition.", "patriotic", ["silly", "secret"], "Patriotic means showing love for your country."],
  ["Our national anthem is…", "\"The Star-Spangled Banner\"", ["\"Twinkle, Twinkle\"", "\"Old MacDonald\""], "People sing it at games.", true],
  ["Uncle Sam is a symbol of the…", "United States", ["moon", "ocean"], "He wears red, white and blue.", true],
  ["Why do we vote?", "to choose leaders", ["to win prizes", "to skip school"], "Voting gives each person a say.", true],
  ["Why is the bald eagle our national bird?", "it stands for freedom and strength", ["it is the smallest bird", "it cannot fly"], "Eagles fly high and free.", true],
  ["The people we elect to make laws work in the…", "Capitol", ["zoo", "library"], "The US Capitol has a big dome.", true],
  ["Flying the flag on holidays shows…", "respect for our country", ["that it is raining", "a lost dog"], "It is a way to honor our nation.", true],
  ["Mount Rushmore shows the faces of four…", "presidents", ["astronauts", "kings"], "Washington and Lincoln are two of them.", true],
];

export const SOCIAL_1: Unit[] = [
  bankUnit({
    id: "ok-g1-our-nation",
    title: "Our Nation",
    emoji: "🇺🇸",
    blurb: "Leaders, laws, symbols and our motto",
    parentNote:
      "The basic purposes of our nation's government, how people hold power by electing leaders who make laws, patriotic traditions such as the Pledge of Allegiance and the national anthem, the national motto, In God We Trust, and symbols of the United States: the flag, the bald eagle, the Statue of Liberty and the Liberty Bell.",
    standards: ["1.C.1.1; 1.C.1.2; 1.C.1.5; 1.C.1.7; 1.C.2.1", "our nation's government and elected leaders, patriotic traditions, the national motto and the symbols of the United States"],
    items: NATION,
  }),
];
