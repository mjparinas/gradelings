import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Nevada Grade 2 social studies, Our National Identity and Culture: events and symbols that shaped the nation's identity
// (SS.2.10), the role and responsibilities of the president (SS.2.17), and national landmarks (SS.2.21), with the
// holidays that remember them.

const SYMBOLS: Q[] = [
  ["What does each star on the American flag stand for?", "a state", ["a city", "a lake", "a president"], "There are 50 stars."],
  ["What do the 13 stripes on the flag stand for?", "the first 13 colonies", ["13 lakes", "13 presidents", "13 holidays"], "The colonies became the first states."],
  ["Which bird is a symbol of the United States?", "the bald eagle", ["the bluebird", "the penguin", "the parrot"], "It is our national bird."],
  ["The Liberty Bell is a symbol of…", "freedom", ["winter", "food", "sports"], "It has a famous crack."],
  ["The Statue of Liberty welcomes people to…", "the United States", ["the moon", "Nevada only", "the ocean floor"], "She holds a torch high."],
  ["Who lives and works in the White House?", "the President", ["the governor", "the mayor", "the principal"], "It is in Washington, D.C."],
  ["The President is the leader of…", "the whole country", ["one city", "one school", "one state"], "The governor leads a state."],
  ["The President is chosen by…", "voters, every four years", ["a coin toss", "the last President", "the teachers"], "Presidential elections are in November."],
  ["One job of the President is to…", "sign or veto laws Congress passes", ["teach every class", "fix every road", "run every store"], "A veto means saying no."],
  ["The President is also commander in chief of the…", "armed forces", ["school band", "baseball league", "post office"], "The armed forces protect the country."],
  ["Which song is our national anthem?", "The Star-Spangled Banner", ["Happy Birthday", "Jingle Bells", "Old MacDonald"], "We sing it at ball games."],
  ["Why do we say the Pledge of Allegiance?", "to show we are loyal to our country", ["to start lunch", "to win a game", "to go home"], "We face the flag."],
  ["On the Fourth of July, we celebrate…", "the birthday of the United States", ["the first snow", "a new school year", "Thanksgiving"], "It began in 1776."],
  ["On Martin Luther King Jr. Day, we remember a leader who worked for…", "fair rules for everyone", ["more homework", "faster cars", "bigger stores"], "He shared a famous dream."],
  ["On Presidents' Day, we remember George Washington and…", "Abraham Lincoln", ["Santa Claus", "a pilgrim", "a cowboy"], "Both were great presidents."],
  ["George Washington was our country's first…", "President", ["teacher", "astronaut", "doctor"], "His face is on the dollar bill."],
  ["On Veterans Day, we thank people who…", "served in the military", ["drive buses", "bake bread", "build toys"], "It is on November 11."],
  ["On Memorial Day, we remember soldiers who…", "died serving our country", ["won races", "were teachers", "went to space"], "It is in late May."],
  ["On Labor Day, we honor…", "workers", ["pets", "snowmen", "birthdays"], "It is in early September."],
  ["Hoover Dam is a national landmark on the Colorado River. It was built to…", "hold back water and make electricity", ["make snow", "catch fish", "hide gold"], "It made Lake Mead."],
  ["The Lincoln Memorial in Washington, D.C. honors the President who…", "led the country in the Civil War", ["built the first car", "wrote Jingle Bells", "flew to the moon"], "Lincoln helped end slavery."],
  ["Nevada became a state while Abraham Lincoln was…", "President", ["a baby", "a governor of Nevada", "a mayor"], "Nevada joined in 1864.", true],
  ["Juneteenth, on June 19, celebrates the end of…", "slavery in the United States", ["the school year", "winter", "a war with England"], "It became a national holiday in 2021.", true],
  ["Why is the bald eagle a good symbol for our country?", "it is strong and free", ["it is tiny", "it lives in the ocean", "it can't fly"], "Symbols show what people value.", true],
  ["The Statue of Liberty was a gift from…", "France", ["Mexico", "Japan", "Spain"], "It came across the ocean in 1885.", true],
  ["Where can you see the faces of four presidents carved in stone?", "Mount Rushmore", ["Hoover Dam", "the Statue of Liberty", "the White House"], "It is in South Dakota.", true],
  ["How many years is one President's term?", "four", ["one", "ten", "forty"], "A President can serve two terms.", true],
];

export const SOCIAL_2: Unit[] = [
  bankUnit({
    id: "nv-g2-symbols-holidays",
    title: "Symbols, Landmarks & the President",
    emoji: "🦅",
    blurb: "American symbols, national holidays and the President's job",
    parentNote: "Symbols of the United States (the flag, the bald eagle, the Liberty Bell and the Statue of Liberty), national landmarks such as Hoover Dam and the Lincoln Memorial, the holidays that remember the nation's people and events, and the role and responsibilities of the President.",
    standards: ["SS.2.10; SS.2.17; SS.2.21", "events and symbols that shaped national identity, the role and responsibilities of the president, and national landmarks"],
    items: SYMBOLS,
  }),
];
