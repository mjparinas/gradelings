import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Idaho Kindergarten social studies: symbols of the United States, including the flag, the Pledge of Allegiance, the
// bald eagle, red, white and blue, and the Statue of Liberty (K.SS.4.2), what the Pledge means (K.SS.4.3), holidays and
// why they are kept (K.SS.4.4), and traditions that came to the United States from other parts of the world (K.SS.5.1).
// The rest of the grade is practised with shared and adopted units (see ../plan/social.ts).

const SYMBOLS: Q[] = [
  ["The flag of the United States is red, white and…", "blue", ["green", "orange", "purple"], "Look at the stripes and the stars."],
  ["How many stars are on the flag of the United States?", "50", ["10", "13", "100"], "There is one star for each state."],
  ["The stripes on the flag stand for the first…", "13 colonies", ["50 states", "10 cities", "4 seasons"], "There are 13 stripes."],
  ["Which bird is a symbol of the United States?", "the bald eagle", ["the robin", "the duck", "the parrot"], "It has a white head."],
  ["The Statue of Liberty holds up a…", "torch", ["fishing pole", "kite", "drum"], "It lights the way."],
  ["The Statue of Liberty welcomes people coming to…", "the United States", ["the moon", "a zoo", "a farm"], "It stands in a harbor."],
  ["When we say the Pledge of Allegiance, we face the…", "flag", ["door", "clock", "window"], "We put a hand on our heart."],
  ["During the Pledge, we put our right hand over our…", "heart", ["nose", "knee", "head"], "It shows respect."],
  ["The Pledge of Allegiance is a promise to be loyal to our…", "country", ["toys", "lunch", "pets"], "Loyal means you stand by it."],
  ["The Pledge says our country gives liberty and justice for…", "all", ["no one", "only grown-ups", "only kids"], "Everyone is included."],
  ["On the Fourth of July we celebrate our country's…", "birthday", ["first snow", "first school day", "new year"], "It began on July 4, 1776."],
  ["Fireworks and parades are part of which holiday?", "the Fourth of July", ["Halloween", "Thanksgiving", "Valentine's Day"], "It is in the summer."],
  ["On Thanksgiving, many families share a meal and give…", "thanks", ["homework", "tickets", "toys away"], "It is in November."],
  ["On Veterans Day we thank people who served in the…", "military", ["library", "kitchen", "garden"], "They kept our country safe."],
  ["On Martin Luther King Jr. Day we remember a leader who worked for…", "fair rules for everyone", ["bigger cars", "more candy", "longer winters"], "He had a dream."],
  ["On Presidents Day we remember George Washington and…", "Abraham Lincoln", ["Santa Claus", "a cartoon cat", "the Easter Bunny"], "Both were presidents."],
  ["George Washington was our country's first…", "president", ["astronaut", "teacher", "pilot"], "He led the country long ago."],
  ["On Memorial Day we remember soldiers who…", "died serving our country", ["won a race", "built a school", "baked bread"], "It is at the end of May."],
  ["Lunar New Year came to the United States from…", "Asia", ["the moon", "the ocean", "the North Pole"], "Families came here and kept it.", true],
  ["Piñatas at a party are a tradition from…", "Mexico", ["Antarctica", "the moon", "the desert"], "People brought it with them.", true],
  ["Many people eat pizza here. Pizza first came from…", "Italy", ["Mars", "the North Pole", "the sea"], "Foods travel with people.", true],
  ["When families move here from far away, they often bring their…", "traditions", ["houses", "rivers", "mountains"], "Songs, foods and holidays travel.", true],
  ["The White House is where the… lives.", "president", ["mayor", "teacher", "farmer"], "It is in Washington, D.C.", true],
  ["Why do we have holidays like the Fourth of July?", "to remember important days", ["to stop learning", "to stay inside", "to sleep all day"], "Holidays help us remember.", true],
];

export const SOCIAL_K: Unit[] = [
  bankUnit({
    id: "id-k-symbols-holidays",
    title: "Flags & Holidays",
    emoji: "🇺🇸",
    blurb: "The flag, the Pledge and the days we celebrate",
    parentNote: "Symbols of the United States (the flag and its stars and stripes, the bald eagle, red, white and blue, the Statue of Liberty and the White House), what the Pledge of Allegiance means and how we show respect while saying it, holidays such as the Fourth of July, Thanksgiving, Veterans Day and Martin Luther King Jr. Day and why we keep them, and traditions that came to the United States from other parts of the world.",
    standards: ["K.SS.4.2; K.SS.4.3; K.SS.4.4; K.SS.5.1", "symbols of the United States, the meaning of the Pledge of Allegiance, holidays and why we keep them, and traditions from around the world"],
    items: SYMBOLS,
  }),
];
