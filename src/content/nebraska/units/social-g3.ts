import type { Unit } from "../../types";
import { SOCIAL_3 as CALIFORNIA_3 } from "../../california/units/social-g3";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Nebraska Grade 3 social studies, Communities Near and Far: how Nebraska communities began and the groups who came to
// them, push and pull factors and how cultures change in a community (SS 3.3.4.b), the role of diverse groups of people
// in a community's development (SS 3.4.2.a) and different views about the past (SS 3.4.2.b). World maps, cultures and
// sources are practised with adopted units (see ../plan/social.ts), and resources, money and voting with a copy of
// California's unit without its California places.

const MOVING: Q[] = [
  ["Moving from one place to another to live is called…", "migration", ["vacation", "erosion", "election"], "People migrate within a country or between countries."],
  ["Moving to a new country to live there is called…", "immigration", ["hibernation", "irrigation", "celebration"], "An immigrant comes from another country."],
  ["A push factor is a reason people…", "leave a place", ["move to a place", "stay home", "go on vacation"], "Something pushes them away."],
  ["A pull factor is a reason people…", "move to a place", ["leave a place", "stay asleep", "forget a place"], "Something attracts them."],
  ["Which pull factor drew many farm families to Nebraska after 1862?", "free land to farm", ["a long war in Nebraska", "no work at all", "a flood"], "The Homestead Act gave land to settlers who farmed it."],
  ["Which is a push factor?", "a war or famine at home", ["good jobs nearby", "family already there", "cheap land nearby"], "Hard times make people leave."],
  ["Railroad companies sent posters to Europe to get people to…", "buy land and farm in Nebraska", ["stay in Europe", "build ships", "move to the ocean"], "The railroads had land to sell and wanted riders."],
  ["Wilber, Nebraska, is known for its festivals of families who came from…", "the Czech lands of Europe", ["Japan", "Brazil", "Egypt"], "The town still holds a Czech festival every summer."],
  ["Dannebrog, Nebraska, was named for the flag of the country its settlers came from,…", "Denmark", ["China", "Peru", "Kenya"], "Dannebrog is the name of the Danish flag."],
  ["In the early 1900s, Black homesteaders built the farming community of DeWitty in the…", "Sandhills", ["Rocky Mountains", "Everglades", "Arctic"], "They raised cattle and crops on homestead land."],
  ["In the early 1900s, many Mexican workers came to western Nebraska to work on the railroads and in fields of…", "sugar beets", ["rice", "bananas", "coffee"], "Many families settled near Scottsbluff."],
  ["Many families from Mexico, Central America and Africa moved to Lexington and Grand Island for jobs in…", "meat packing plants", ["gold mines", "ocean fishing", "rice paddies"], "These towns now speak many languages."],
  ["Lincoln has become home to many refugees from…", "Vietnam, Sudan, Iraq and other countries", ["the moon", "nowhere at all", "only Nebraska"], "Refugees came to find safety."],
  ["Omaha is named for the Omaha people, who live today in…", "northeastern Nebraska", ["the ocean", "the moon", "the South Pole"], "The Omaha Tribe of Nebraska has its home near Macy."],
  ["In 1846, Mormon pioneers who left their homes because of unfair treatment spent the winter near…", "what is now Omaha", ["the North Pole", "an island", "a desert in Africa"], "Their camp was called Winter Quarters."],
  ["People who must flee their country because of war are called…", "refugees", ["tourists", "pilots", "voters"], "Refugees need a safe place to live."],
  ["Long ago, many towns grew up beside rivers because rivers gave them…", "water, food and a way to travel", ["sand and dust", "nothing at all", "snowstorms"], "Physical geography shapes where people live."],
  ["North Platte grew up where the North and South Platte Rivers meet and beside the…", "railroad", ["ocean", "mountains", "volcano"], "Trains stopped there for water and fuel."],
  ["When newcomers arrive, they and their neighbors can learn…", "each other's foods, languages and holidays", ["nothing new", "only one game", "only the weather"], "Cultures share and mix."],
  ["Czech festivals in Wilber and Mexican fiestas in Scottsbluff show that…", "newcomers bring their traditions with them", ["no one moves", "everyone celebrates the same", "traditions never change"], "Traditions travel with people."],
  ["In 1877, the U.S. government forced the Ponca to leave their homes in Nebraska and move south. This was an…", "involuntary migration", ["vacation", "election", "invention"], "They did not choose to move.", true],
  ["Some Nebraskans welcomed new immigrants, while others did not want them. This shows…", "people had different views about newcomers", ["everyone agreed", "no one had a view", "nothing happened"], "Historians compare points of view.", true],
  ["Why did some Nebraska towns become empty after the railroad passed them by?", "people and stores moved to towns on the railroad", ["the towns floated away", "it rained gold", "everyone moved in"], "When jobs leave, people leave.", true],
  ["When a new family moves next door, a kind way to help them is to…", "say hello and show them around", ["ignore them", "laugh at them", "hide from them"], "Communities welcome newcomers.", true],
  ["Many immigrants become U.S. citizens by passing a test about…", "U.S. history and government", ["swimming", "cooking", "painting"], "The ceremony is called naturalization.", true],
  ["The town of Lancaster got a new name in 1867, when it became the state capital. Its new name was…", "Lincoln", ["Omaha", "Kearney", "Ogallala"], "It was named for President Abraham Lincoln.", true],
];

const MONEY_EXTRA: Q[] = [
  ["Rich soil, strong winds for wind farms and water underground are Nebraska's…", "natural resources", ["human resources", "capital resources", "wants"], "They come from nature."],
  ["A family needs food and a home, and wants a new video game. Which is a want?", "the video game", ["food", "a home", "clean water"], "Needs are what we must have to live."],
  ["Maya puts part of her allowance in the bank each week to buy a bike later. She is…", "saving", ["spending", "borrowing", "trading"], "Saving means keeping money for later."],
  ["Nebraska voters choose their mayor, governor and state senators by…", "voting in elections", ["flipping a coin", "a race", "asking the President"], "Adults 18 and older can vote.", true],
];

export const SOCIAL_3: Unit[] = [
  bankUnit({
    id: "neb-g3-people-on-the-move",
    title: "People on the Move",
    emoji: "🧳",
    blurb: "Why people move, and who has come to Nebraska",
    parentNote: "How Nebraska towns and cities began (Omaha, Lincoln, North Platte, Wilber, Dannebrog and DeWitty), migration and immigration with push and pull factors and refugees, voluntary and forced migrations such as the Ponca removal of 1877, different views of newcomers, and what Czech, Danish, Black homesteader, Mexican, refugee and other communities have brought to Nebraska.",
    standards: ["SS 3.3.4.b; SS 3.4.2.a; SS 3.4.2.b", "how and why cultures change in a community through migration, the role of diverse groups of people in a community's development, and different views about the past"],
    items: MOVING,
  }),
  copyOf(
    from(CALIFORNIA_3, "ca-g3-money-and-voting"),
    {
      id: "neb-g3-money-and-voting",
      title: "Money, Taxes & Voting",
      emoji: "🏦",
      blurb: "Resources, choices and taking part",
      parentNote:
        "Natural, human and capital resources, what is made locally and elsewhere, needs and wants, saving and spending, trade-offs and opportunity cost, how taxes pay for services, and how citizens vote and take part, with Nebraska examples.",
      standards: ["SS 3.2.1.a; SS 3.2.2.a; SS 3.1.2.a", "goods and services paid for by taxes, budget choices about buying, giving up and saving, and the rights and responsibilities of citizens such as voting"],
    },
    MONEY_EXTRA,
  ),
];
