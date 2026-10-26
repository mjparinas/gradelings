import type { Unit } from "../../types";
import { SOCIAL_3 as CALIFORNIA_3 } from "../../california/units/social-g3";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// New Mexico Grade 3 social studies, Global Immigration and Migration: how democratic principles motivate people to
// migrate (3.8), the reasons for migration and immigration and their effects (3.10), how settlement and movement affect
// diverse groups (3.11), and the removal and return of Indigenous people in New Mexico (3.12). The rest of the grade
// (world maps, cultures and sources) is practised with adopted units (see ../plan/social.ts), and citizenship, resources
// and money with a copy of California's unit without its California places (3.9, 3.16, 3.29, 3.30).

const MOVING: Q[] = [
  ["Moving from one place to another to live is called…", "migration", ["vacation", "erosion", "election"], "People migrate within a country or between countries."],
  ["Moving to a new country to live there is called…", "immigration", ["hibernation", "irrigation", "celebration"], "An immigrant comes from another country."],
  ["A push factor is a reason people…", "leave a place", ["move to a place", "stay home", "go on vacation"], "Something pushes them away."],
  ["A pull factor is a reason people…", "move to a place", ["leave a place", "stay asleep", "forget a place"], "Something attracts them."],
  ["When the railroad reached New Mexico around 1880, it drew new people because it brought…", "jobs and trade", ["a long war", "a flood", "deep snow"], "New towns grew up along the tracks."],
  ["Which is a push factor?", "a war or famine at home", ["good jobs nearby", "family already there", "cheap land nearby"], "Hard times make people leave."],
  ["In 1598, Spanish settlers led by Juan de Oñate came north from Mexico to…", "start a colony in New Mexico", ["find the ocean", "build a railroad", "start a ski resort"], "They traveled on El Camino Real."],
  ["About half of New Mexicans today have family roots in…", "Spain, Mexico and other Spanish-speaking places", ["Iceland", "Australia", "Japan only"], "Spanish is spoken in many New Mexico homes."],
  ["Many Vietnamese families came to Albuquerque after a war in Vietnam as…", "refugees seeking a safe home", ["tourists on vacation", "astronauts", "sailors"], "Refugees flee danger at home."],
  ["In the 1940s, scientists moved to Los Alamos to…", "work on secret science research", ["mine silver", "build ships", "grow rice"], "The town grew very quickly."],
  ["In 1864, the U.S. Army forced thousands of Navajo (Diné) people to walk far from home to Bosque Redondo. This is called the…", "Long Walk", ["Gold Rush", "Santa Fe Trail", "Pony Express"], "Many people suffered on the journey."],
  ["In 1868, a treaty let the Navajo people…", "return to their homeland", ["move to the ocean", "leave the country", "stay at Bosque Redondo forever"], "Today the Navajo Nation is the largest reservation in the country."],
  ["Why have many people moved to New Mexico cities like Albuquerque and Las Cruces?", "jobs, schools and family", ["to see the ocean", "for deep snow all year", "to farm rice"], "Cities grow when people find work."],
  ["Freedom to choose your religion is a reason some people…", "move to a new country", ["stay home forever", "stop going to school", "forget their language"], "People seek freedom and fair treatment."],
  ["Freedom of speech and the right to vote can pull people to a country because they are…", "democratic principles", ["kinds of weather", "kinds of food", "landforms"], "People want a say in their government."],
  ["People who must flee their country because of war are called…", "refugees", ["tourists", "pilots", "voters"], "Refugees need a safe place to live."],
  ["Long ago, many people settled near rivers because rivers gave them…", "water, food and a way to travel", ["sand and dust", "nothing at all", "snowstorms"], "Physical geography shapes where people live."],
  ["Albuquerque grew up beside the Rio Grande. The river gave the town…", "water", ["oil", "gold coins", "salt"], "Towns need water."],
  ["When newcomers arrive, they and their neighbors can learn…", "each other's foods, languages and holidays", ["nothing new", "only one game", "only the weather"], "Cultures share and mix."],
  ["Mexican bakeries, Vietnamese restaurants and bread baked in outdoor hornos in New Mexico show that…", "communities share their foods", ["no one moves", "everyone eats the same", "food never changes"], "Food travels with people."],
  ["A law in 1882 stopped most workers from China from coming to the United States. This was a…", "government response to immigration", ["a holiday", "a weather report", "a sports rule"], "It was called the Chinese Exclusion Act.", true],
  ["When new settlers took land and water that people already used, the people already living there were…", "harmed and had to fight for their rights", ["always helped", "never affected", "given more land"], "Settlement affects the people already in a place.", true],
  ["Why did many New Mexico mining towns become empty ghost towns?", "the silver or gold ran out and people moved away", ["the towns floated away", "it rained gold", "everyone moved in"], "When jobs leave, people leave.", true],
  ["When a new family moves next door, a kind way to help them is to…", "say hello and show them around", ["ignore them", "laugh at them", "hide from them"], "Communities welcome newcomers.", true],
  ["Many immigrants become US citizens by passing a test about…", "US history and government", ["swimming", "cooking", "painting"], "The ceremony is called naturalization.", true],
  ["Air conditioning made it easier for people to move to…", "hot desert cities", ["the North Pole", "the ocean floor", "Antarctica"], "Technology changes where people can live.", true],
];

const MONEY_EXTRA: Q[] = [
  ["Water from the Rio Grande, sunshine for solar farms and oil under the ground are New Mexico's…", "natural resources", ["human resources", "capital resources", "wants"], "They come from nature."],
  ["A family needs food and a home, and wants a new video game. Which is a want?", "the video game", ["food", "a home", "clean water"], "Needs are what we must have to live."],
  ["Maya puts part of her allowance in the bank each week to buy a bike later. She is…", "saving", ["spending", "borrowing", "trading"], "Saving means keeping money for later."],
  ["New Mexico voters choose their mayor, governor and lawmakers by…", "voting in elections", ["flipping a coin", "a race", "asking the President"], "Adults 18 and older can vote.", true],
];

export const SOCIAL_3: Unit[] = [
  bankUnit({
    id: "nm-g3-people-on-the-move",
    title: "People on the Move",
    emoji: "🧳",
    blurb: "Why people move, and who has come to New Mexico",
    parentNote: "Migration and immigration: push and pull factors, refugees, democratic principles as a reason to move, how governments have responded (such as the Chinese Exclusion Act of 1882), the Long Walk of the Navajo people and their return home, and what Spanish, Mexican, Vietnamese and other communities have brought to New Mexico.",
    standards: ["3.8; 3.10; 3.11; 3.12", "how democratic principles motivate migration, the reasons for migration and immigration and their effects, how settlement affects diverse groups, and the removal and return of Indigenous people"],
    items: MOVING,
  }),
  copyOf(
    from(CALIFORNIA_3, "ca-g3-money-and-voting"),
    {
      id: "nm-g3-money-and-voting",
      title: "Money, Taxes & Voting",
      emoji: "🏦",
      blurb: "Resources, choices and taking part",
      parentNote:
        "Natural, human and capital resources, what is made locally and elsewhere, needs and wants, saving and spending, trade-offs and opportunity cost, how taxes pay for services, and how citizens vote and take part, with New Mexico examples.",
      standards: ["3.9; 3.16; 3.29; 3.30", "being a responsible citizen in a democracy, surplus and scarcity of resources, how people earn a living, and planning to reach a savings goal"],
    },
    MONEY_EXTRA,
  ),
];
