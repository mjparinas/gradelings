import type { Unit } from "../../types";
import { SOCIAL_3 as CALIFORNIA_3 } from "../../california/units/social-g3";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Nevada Grade 3 social studies, Movement Around Our World: why people migrate and immigrate (SS.3.18, SS.3.22), how
// governments have responded (SS.3.11), different views of migration (SS.3.12), how newcomers and their new
// communities meet (SS.3.16), and what migrant groups have brought to Nevada (SS.3.13). The rest of the grade (world
// maps, cultures and sources) is practised with adopted units (see ../plan/social.ts), and resources, money and voting
// with a copy of California's unit without its California places (SS.3.24, SS.3.26, SS.3.27, SS.3.10).

const MOVING: Q[] = [
  ["Moving from one place to another to live is called…", "migration", ["vacation", "erosion", "election"], "People migrate within a country or between countries."],
  ["Moving to a new country to live there is called…", "immigration", ["hibernation", "irrigation", "celebration"], "An immigrant comes from another country."],
  ["A push factor is a reason people…", "leave a place", ["move to a place", "stay home", "go on vacation"], "Something pushes them away."],
  ["A pull factor is a reason people…", "move to a place", ["leave a place", "stay asleep", "forget a place"], "Something attracts them."],
  ["Which is a pull factor that drew people to Nevada in 1859?", "silver found in the hills", ["a long war in Nevada", "no work at all", "a flood"], "The Comstock Lode was a huge silver find."],
  ["Which is a push factor?", "a war or famine at home", ["good jobs nearby", "family already there", "cheap land nearby"], "Hard times make people leave."],
  ["Many Basque people came to Nevada from Spain and France to work as…", "sheepherders", ["sailors", "pilots", "astronauts"], "They watched flocks in the mountains."],
  ["Elko holds a Basque festival each summer with…", "dancing, music and food", ["snowball fights", "surfing", "ice fishing"], "Families share their culture."],
  ["Many Chinese workers came to Nevada in the 1860s to build the…", "railroad", ["Hoover Dam", "airport", "highway"], "The railroad crossed Nevada in 1868."],
  ["Many Mexican cowhands, called vaqueros, taught Nevada ranchers how to…", "work with cattle and horses", ["mine silver", "build ships", "grow rice"], "The word buckaroo comes from vaquero."],
  ["About three in ten Nevadans today have family roots in…", "Mexico and other Spanish-speaking countries", ["Iceland", "Australia", "Japan only"], "Spanish is spoken in many Nevada homes."],
  ["Las Vegas has a large community of people with roots in the…", "Philippines", ["North Pole", "Antarctica", "Moon"], "Many Filipino families work in hospitals and hotels."],
  ["Why have many people moved to Las Vegas in the last 50 years?", "jobs in hotels, building and hospitals", ["to see the ocean", "for deep snow", "to farm rice"], "Las Vegas grew very fast."],
  ["Freedom to choose your religion is a reason some people…", "move to a new country", ["stay home forever", "stop going to school", "forget their language"], "People seek freedom and fair treatment."],
  ["Freedom of speech and the right to vote can pull people to a country because they are…", "democratic principles", ["kinds of weather", "kinds of food", "landforms"], "People want a say in their government."],
  ["People who must flee their country because of war are called…", "refugees", ["tourists", "pilots", "voters"], "Refugees need a safe place to live."],
  ["Long ago, many people settled near rivers because rivers gave them…", "water, food and a way to travel", ["sand and dust", "nothing at all", "snowstorms"], "Physical geography shapes where people live."],
  ["Reno grew up beside the Truckee River. The river gave the town…", "water", ["oil", "gold coins", "salt"], "Towns need water."],
  ["When newcomers arrive, they and their neighbors can learn…", "each other's foods, languages and holidays", ["nothing new", "only one game", "only the weather"], "Cultures share and mix."],
  ["Taco shops, Basque restaurants and Chinese bakeries in Nevada show that…", "newcomers bring their foods with them", ["no one moves", "everyone eats the same", "food never changes"], "Food travels with people."],
  ["A law in 1882 stopped most workers from China from coming to the United States. This was a…", "government response to immigration", ["a holiday", "a weather report", "a sports rule"], "It was called the Chinese Exclusion Act.", true],
  ["Some people in the 1800s welcomed Chinese workers, while others treated them unfairly. This shows…", "people had different views about immigration", ["everyone agreed", "no one had a view", "nothing happened"], "Historians compare points of view.", true],
  ["Why did many Nevada mining towns become empty ghost towns?", "the silver or gold ran out and people moved away", ["the towns floated away", "it rained gold", "everyone moved in"], "When jobs leave, people leave.", true],
  ["When a new family moves next door, a kind way to help them is to…", "say hello and show them around", ["ignore them", "laugh at them", "hide from them"], "Communities welcome newcomers.", true],
  ["Many immigrants become US citizens by passing a test about…", "US history and government", ["swimming", "cooking", "painting"], "The ceremony is called naturalization.", true],
  ["Air conditioning made it easier for people to move to…", "hot desert cities like Las Vegas", ["the North Pole", "the ocean floor", "Antarctica"], "Technology changes where people can live.", true],
];

const MONEY_EXTRA: Q[] = [
  ["Water from Lake Mead, sunshine for solar farms and gold in the hills are Nevada's…", "natural resources", ["human resources", "capital resources", "wants"], "They come from nature."],
  ["A family needs food and a home, and wants a new video game. Which is a want?", "the video game", ["food", "a home", "clean water"], "Needs are what we must have to live."],
  ["Maya puts part of her allowance in the bank each week to buy a bike later. She is…", "saving", ["spending", "borrowing", "trading"], "Saving means keeping money for later."],
  ["Nevada voters choose their mayor, governor and lawmakers by…", "voting in elections", ["flipping a coin", "a race", "asking the President"], "Adults 18 and older can vote.", true],
];

export const SOCIAL_3: Unit[] = [
  bankUnit({
    id: "nv-g3-people-on-the-move",
    title: "People on the Move",
    emoji: "🧳",
    blurb: "Why people move, and who has come to Nevada",
    parentNote: "Migration and immigration: push and pull factors, refugees, democratic principles as a reason to move, how governments have responded (such as the Chinese Exclusion Act of 1882), different views of newcomers, and what Basque, Chinese, Mexican, Filipino and other communities have brought to Nevada.",
    standards: ["SS.3.11; SS.3.12; SS.3.13; SS.3.16; SS.3.18; SS.3.22", "why people migrate and immigrate, government responses, different views, how newcomers and communities interact, and migrant groups' contributions to Nevada"],
    items: MOVING,
  }),
  copyOf(
    from(CALIFORNIA_3, "ca-g3-money-and-voting"),
    {
      id: "nv-g3-money-and-voting",
      title: "Money, Taxes & Voting",
      emoji: "🏦",
      blurb: "Resources, choices and taking part",
      parentNote:
        "Natural, human and capital resources, what is made locally and elsewhere, needs and wants, saving and spending, trade-offs and opportunity cost, how taxes pay for services, and how citizens vote and take part, with Nevada examples.",
      standards: ["SS.3.24; SS.3.26; SS.3.27; SS.3.10", "using resources to produce goods and services, needs and wants, saving and spending, and democratic ways to take action"],
    },
    MONEY_EXTRA,
  ),
];
