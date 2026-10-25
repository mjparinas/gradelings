import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Michigan Grade 1 social studies, Families and Schools: symbols of the United States and what they stand for
// (1 – C2.0.2), and the people and events celebrated on national holidays (1 – H2.0.5).

const SYMBOLS: Q[] = [
  ["What does each star on the American flag stand for?", "a state", ["a city", "a lake", "a president"], "There are 50 stars."],
  ["What do the 13 stripes on the flag stand for?", "the first 13 colonies", ["13 lakes", "13 presidents", "13 holidays"], "The colonies became the first states."],
  ["Which bird is a symbol of the United States?", "the bald eagle", ["the robin", "the penguin", "the parrot"], "It is our national bird."],
  ["The Liberty Bell is a symbol of…", "freedom", ["winter", "food", "sports"], "It has a famous crack."],
  ["The Statue of Liberty welcomes people to…", "the United States", ["the moon", "Michigan only", "the ocean floor"], "She holds a torch high."],
  ["Who lives and works in the White House?", "the President", ["the governor", "the mayor", "the principal"], "It is in Washington, D.C."],
  ["Which song is our national anthem?", "The Star-Spangled Banner", ["Happy Birthday", "Jingle Bells", "Old MacDonald"], "We sing it at ball games."],
  ["Why do we say the Pledge of Allegiance?", "to show we are loyal to our country", ["to start lunch", "to win a game", "to go home"], "We face the flag."],
  ["Uncle Sam wears a hat with…", "stars and stripes", ["polka dots", "flowers", "fish"], "He is a symbol of the United States."],
  ["On the Fourth of July, we celebrate…", "the birthday of the United States", ["the first snow", "a new school year", "Thanksgiving"], "It began in 1776."],
  ["On Martin Luther King Jr. Day, we remember a leader who worked for…", "fair rules for everyone", ["more homework", "faster cars", "bigger stores"], "He shared a famous dream."],
  ["On Presidents' Day, we remember George Washington and…", "Abraham Lincoln", ["Santa Claus", "a pilgrim", "a cowboy"], "Both were great presidents."],
  ["George Washington was our country's first…", "President", ["teacher", "astronaut", "doctor"], "His face is on the dollar bill."],
  ["On Veterans Day, we thank people who…", "served in the military", ["drive buses", "bake bread", "build toys"], "It is on November 11."],
  ["On Memorial Day, we remember soldiers who…", "died serving our country", ["won races", "were teachers", "went to space"], "It is in late May."],
  ["On Labor Day, we honor…", "workers", ["pets", "snowmen", "birthdays"], "It is in early September."],
  ["On Thanksgiving, many families share a meal and give…", "thanks", ["homework", "tickets", "speeding fines"], "It is in November."],
  ["Which holiday has fireworks for the country's birthday?", "the Fourth of July", ["Thanksgiving", "Labor Day", "Veterans Day"], "It is in summer."],
  ["Michigan's state flag shows an elk, a moose and an…", "eagle", ["owl", "fox", "bear"], "It is on a blue flag."],
  ["A symbol is something that…", "stands for something else", ["is always food", "is always a toy", "makes music"], "The flag stands for our country."],
  ["Juneteenth, on June 19, celebrates the end of…", "slavery in the United States", ["the school year", "winter", "a war with England"], "It became a national holiday in 2021.", true],
  ["Why is the bald eagle a good symbol for our country?", "it is strong and free", ["it is tiny", "it lives in the ocean", "it can't fly"], "Symbols show what people value.", true],
  ["The Statue of Liberty was a gift from…", "France", ["Canada", "Mexico", "Japan"], "It came across the ocean in 1885.", true],
  ["Where can you see the faces of four presidents carved in stone?", "Mount Rushmore", ["the Mackinac Bridge", "the Statue of Liberty", "the White House"], "It is in South Dakota.", true],
  ["Why do flags fly at half-staff on Memorial Day morning?", "to honor people who died for our country", ["the wind is weak", "the pole is broken", "it is a race"], "Half-staff shows sadness and respect.", true],
];

export const SOCIAL_1: Unit[] = [
  bankUnit({
    id: "mi-g1-symbols-holidays",
    title: "Symbols & Holidays",
    emoji: "🦅",
    blurb: "American symbols and the days we celebrate",
    parentNote: "Symbols of the United States (the flag, the bald eagle, the Liberty Bell, the Statue of Liberty and the White House) and the people and events we remember on national holidays such as the Fourth of July, Martin Luther King Jr. Day, Presidents' Day and Veterans Day.",
    standards: ["1-C2.0.2; 1-H2.0.5", "important symbols of the United States, and the events or people celebrated on national holidays"],
    items: SYMBOLS,
  }),
];
