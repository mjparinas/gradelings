import type { Unit } from "../../types";
import { SOCIAL_3 as CALIFORNIA_3 } from "../../california/units/social-g3";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Kansas Grade 3 social studies, Local and National Communities (focus standard 3, how societies are shaped by the
// identities, beliefs and practices of individuals and groups): how Kansas towns and cities began, the groups who moved
// to Kansas and what they brought, push and pull factors and government responses, as the standards' Grade 3 history
// and geography units suggest (hometown, major cities, voluntary and involuntary migrations, settlers, migrations
// relevant to Kansas). World maps, cultures and sources are practised with adopted units (see ../plan/social.ts), and
// resources, money and voting with a copy of California's unit without its California places.

const MOVING: Q[] = [
  ["Moving from one place to another to live is called…", "migration", ["vacation", "erosion", "election"], "People migrate within a country or between countries."],
  ["Moving to a new country to live there is called…", "immigration", ["hibernation", "irrigation", "celebration"], "An immigrant comes from another country."],
  ["A push factor is a reason people…", "leave a place", ["move to a place", "stay home", "go on vacation"], "Something pushes them away."],
  ["A pull factor is a reason people…", "move to a place", ["leave a place", "stay asleep", "forget a place"], "Something attracts them."],
  ["Which pull factor drew many farm families to Kansas in the 1870s?", "free or cheap land to farm", ["a long war in Kansas", "no work at all", "a flood"], "The Homestead Act gave land to settlers who farmed it."],
  ["Which is a push factor?", "a war or famine at home", ["good jobs nearby", "family already there", "cheap land nearby"], "Hard times make people leave."],
  ["Many Black families, called Exodusters, moved to Kansas in 1879 to escape…", "unfair treatment in the South", ["deep snow", "too much gold", "the ocean"], "They hoped for land and freedom."],
  ["Nicodemus, in western Kansas, is a town built by…", "Black settlers after the Civil War", ["Vikings", "astronauts", "pirates"], "It is a national historic site today."],
  ["Mennonite families from Russia brought a hard winter wheat called…", "Turkey Red", ["Purple Rice", "Blue Corn", "Snow Barley"], "It grew well in Kansas winters."],
  ["Lindsborg, Kansas, is called Little Sweden because it was settled by…", "families from Sweden", ["families from Japan", "families from Brazil", "families from Egypt"], "The town still has Swedish festivals."],
  ["In the early 1900s, many Mexican workers came to Kansas to build and fix the…", "railroads", ["pyramids", "submarines", "space station"], "Many settled in railroad towns like Topeka and Emporia."],
  ["Many families from Mexico, Central America and Vietnam moved to Garden City and Dodge City for jobs in…", "meat packing plants", ["gold mines", "ocean fishing", "rice paddies"], "These towns now speak many languages."],
  ["Lawrence was founded in 1854 by settlers who wanted Kansas to be…", "a free state without slavery", ["part of Mexico", "a kingdom", "under the sea"], "They came from New England."],
  ["Wichita is named for the Wichita people, whose ancestors…", "lived and farmed in Kansas long ago", ["came from the moon", "never lived in Kansas", "built the railroad"], "Their grass houses stood by the rivers."],
  ["Freedom to choose your religion is a reason some people…", "move to a new country", ["stay home forever", "stop going to school", "forget their language"], "Mennonites came for religious freedom."],
  ["People who must flee their country because of war are called…", "refugees", ["tourists", "pilots", "voters"], "Refugees need a safe place to live."],
  ["Long ago, many towns grew up beside rivers because rivers gave them…", "water, food and a way to travel", ["sand and dust", "nothing at all", "snowstorms"], "Physical geography shapes where people live."],
  ["Topeka grew up beside the Kansas River. The river gave the town…", "water and a place to cross", ["oil", "gold coins", "salt"], "Ferries carried travelers across."],
  ["When newcomers arrive, they and their neighbors can learn…", "each other's foods, languages and holidays", ["nothing new", "only one game", "only the weather"], "Cultures share and mix."],
  ["Swedish festivals in Lindsborg and Mexican fiestas in Topeka show that…", "newcomers bring their traditions with them", ["no one moves", "everyone celebrates the same", "traditions never change"], "Traditions travel with people."],
  ["In the 1830s, the U.S. government forced many Native nations from the East to move to what is now Kansas. This was an…", "involuntary migration", ["vacation", "election", "invention"], "They did not choose to move.", true],
  ["Some Kansans welcomed the Exodusters, while others did not want them. This shows…", "people had different views about newcomers", ["everyone agreed", "no one had a view", "nothing happened"], "Historians compare points of view.", true],
  ["Why did some Kansas towns become empty after the railroad passed them by?", "people and stores moved to towns on the railroad", ["the towns floated away", "it rained gold", "everyone moved in"], "When jobs leave, people leave.", true],
  ["When a new family moves next door, a kind way to help them is to…", "say hello and show them around", ["ignore them", "laugh at them", "hide from them"], "Communities welcome newcomers.", true],
  ["Many immigrants become U.S. citizens by passing a test about…", "U.S. history and government", ["swimming", "cooking", "painting"], "The ceremony is called naturalization.", true],
  ["Dodge City began as a stop for buffalo hunters and grew into a…", "cattle town on the railroad", ["seaport", "mountain resort", "gold rush camp"], "Cattle drives ended there.", true],
];

const MONEY_EXTRA: Q[] = [
  ["Wheat fields, strong winds for wind farms and oil underground are Kansas's…", "natural resources", ["human resources", "capital resources", "wants"], "They come from nature."],
  ["A family needs food and a home, and wants a new video game. Which is a want?", "the video game", ["food", "a home", "clean water"], "Needs are what we must have to live."],
  ["Maya puts part of her allowance in the bank each week to buy a bike later. She is…", "saving", ["spending", "borrowing", "trading"], "Saving means keeping money for later."],
  ["Kansas voters choose their mayor, governor and lawmakers by…", "voting in elections", ["flipping a coin", "a race", "asking the President"], "Adults 18 and older can vote.", true],
];

export const SOCIAL_3: Unit[] = [
  bankUnit({
    id: "ks-g3-people-on-the-move",
    title: "People on the Move",
    emoji: "🧳",
    blurb: "Why people move, and who has come to Kansas",
    parentNote: "How Kansas towns and cities began (Lawrence, Topeka, Wichita, Dodge City and Nicodemus), migration and immigration with push and pull factors and refugees, voluntary and forced migrations such as the removal of Native nations to Kansas, different views of newcomers, and what Exoduster, Mennonite, Swedish, Mexican, Vietnamese and other communities have brought to Kansas.",
    standards: ["3.1; 3.2; 4.1", "how the identities, beliefs and practices of the groups who settled Kansas shaped its towns and cities, why they came, and how communities changed"],
    items: MOVING,
  }),
  copyOf(
    from(CALIFORNIA_3, "ca-g3-money-and-voting"),
    {
      id: "ks-g3-money-and-voting",
      title: "Money, Taxes & Voting",
      emoji: "🏦",
      blurb: "Resources, choices and taking part",
      parentNote:
        "Natural, human and capital resources, what is made locally and elsewhere, needs and wants, saving and spending, trade-offs and opportunity cost, how taxes pay for services, and how citizens vote and take part, with Kansas examples.",
      standards: ["1.1; 2.1", "choices about resources, needs and wants, saving and spending, and the rights and responsibilities of citizens who vote and take part"],
    },
    MONEY_EXTRA,
  ),
];
