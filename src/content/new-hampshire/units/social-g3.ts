import type { Unit } from "../../types";
import { SOCIAL_3 as CALIFORNIA_3 } from "../../california/units/social-g3";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// New Hampshire Grade 3 social studies, New Hampshire communities: the types and patterns of human migration
// (SS:GE:4:4.2), why groups have come to the United States (SS:HI:4:5.5) and what they have added to New Hampshire
// (SS:HI:4:5.1), New Hampshire's regions and the land and people that shape them (SS:GE:4:2.1, SS:GE:4:2.3), and local
// government, taxes and services (SS:CV:4:2.2, SS:EC:4:4.2) in a copy of California's unit without its California
// places. World maps and cultures are practised with adopted units (see ../plan/social.ts).

const MOVING: Q[] = [
  ["Moving from one place to another to live is called…", "migration", ["vacation", "erosion", "election"], "People migrate within a country or between countries."],
  ["Moving to a new country to live there is called…", "immigration", ["hibernation", "irrigation", "celebration"], "An immigrant comes from another country."],
  ["A push factor is a reason people…", "leave a place", ["move to a place", "stay home", "go on vacation"], "Something pushes them away."],
  ["A pull factor is a reason people…", "move to a place", ["leave a place", "stay asleep", "forget a place"], "Something attracts them."],
  ["In the late 1800s, the big mills in Manchester and Nashua drew new people because they offered…", "jobs", ["a long war", "a flood", "deep snow"], "Mill towns grew quickly beside the rivers."],
  ["Which is a push factor?", "a war or famine at home", ["good jobs nearby", "family already there", "cheap land nearby"], "Hard times make people leave."],
  ["Thousands of French-speaking families came from Quebec, to the north, to work in New Hampshire's…", "mills", ["gold mines", "rice fields", "space stations"], "Many New Hampshire families still speak some French."],
  ["Many Irish families came to New Hampshire in the 1800s after a terrible famine in Ireland. A famine is…", "a time when there is not enough food", ["a big party", "a kind of boat", "a snowstorm"], "Hunger pushed many people to leave."],
  ["Families from Greece, Poland and many other countries also came to work in New Hampshire's…", "mill cities", ["deserts", "islands", "volcanoes"], "Their churches, foods and festivals are still part of those cities."],
  ["In recent years, refugees from countries such as Bhutan and the Democratic Republic of the Congo have made new homes in…", "Concord and Manchester", ["the moon", "the ocean floor", "Antarctica"], "Refugees flee danger at home."],
  ["The Abenaki and Pennacook peoples lived in New Hampshire for thousands of years before…", "European settlers arrived", ["the Ice Age", "dinosaurs lived", "the mountains formed"], "Abenaki people still live in New Hampshire today."],
  ["Today, many people move to southern New Hampshire from nearby states to find…", "jobs, homes and good schools", ["the ocean floor", "deserts", "volcanoes"], "Towns near Massachusetts have grown a lot."],
  ["Freedom to choose your religion is a reason some people…", "move to a new country", ["stay home forever", "stop going to school", "forget their language"], "People seek freedom and fair treatment."],
  ["Freedom of speech and the right to vote can pull people to a country because they are…", "democratic principles", ["kinds of weather", "kinds of food", "landforms"], "People want a say in their government."],
  ["People who must flee their country because of war are called…", "refugees", ["tourists", "pilots", "voters"], "Refugees need a safe place to live."],
  ["Long ago, many towns grew beside rivers because rivers gave them…", "water power, food and a way to travel", ["sand and dust", "nothing at all", "snowstorms"], "Physical geography shapes where people live."],
  ["Manchester grew up beside the Amoskeag Falls on the Merrimack River. The falls gave the mills…", "water power", ["oil", "gold coins", "salt"], "Falling water turned the mill wheels."],
  ["When newcomers arrive, they and their neighbors can learn…", "each other's foods, languages and holidays", ["nothing new", "only one game", "only the weather"], "Cultures share and mix."],
  ["Greek festivals, French Canadian pork pies and African markets in New Hampshire cities show that…", "communities share their foods", ["no one moves", "everyone eats the same", "food never changes"], "Food travels with people."],
  ["A law in 1882 stopped most workers from China from coming to the United States. This was a…", "government response to immigration", ["a holiday", "a weather report", "a sports rule"], "It was called the Chinese Exclusion Act.", true],
  ["During wars with English settlers in the 1700s, many Abenaki families moved north. This shows that settlement…", "changed the lives of the people already living there", ["never affected anyone", "always helped everyone", "happened without people"], "Settlement affects the people already in a place.", true],
  ["Why did some New Hampshire hill farms become empty in the 1800s?", "families moved to mill towns and better land out west", ["the farms floated away", "it rained gold", "everyone moved in"], "When jobs leave, people leave.", true],
  ["When a new family moves next door, a kind way to help them is to…", "say hello and show them around", ["ignore them", "laugh at them", "hide from them"], "Communities welcome newcomers.", true],
  ["Many immigrants become US citizens by passing a test about…", "US history and government", ["swimming", "cooking", "painting"], "The ceremony is called naturalization.", true],
  ["Chain migration is when people move to a place because…", "family or friends from home already live there", ["a chain pulls them", "they are on vacation", "they lost a map"], "One family's move leads others to follow.", true],
  ["Cars and new highways made it easier for people to live in one town and work in…", "another town", ["another planet", "the ocean", "a cave"], "Technology changes where people can live.", true],
];

const REGIONS: Q[] = [
  ["New Hampshire's capital city is…", "Concord", ["Manchester", "Portsmouth", "Berlin"], "The State House is there."],
  ["The tallest mountains in New Hampshire are in the…", "White Mountains", ["Seacoast", "Merrimack Valley", "Lakes Region"], "Mount Washington is there."],
  ["The Lakes Region is named for its many lakes, the biggest of which is Lake…", "Winnipesaukee", ["Erie", "Superior", "Victoria"], "It has more than 250 islands."],
  ["The Seacoast region is where New Hampshire meets the…", "Atlantic Ocean", ["Pacific Ocean", "Gulf of Mexico", "Arctic Ocean"], "New Hampshire has the shortest ocean coast of any coastal state."],
  ["The Merrimack Valley, with Manchester, Nashua and Concord, is the part of the state where…", "the most people live", ["no one lives", "there are no roads", "it never snows"], "Many cities grew along the Merrimack River."],
  ["The Great North Woods, at the top of the state, is known for…", "thick forests, moose and few towns", ["big cities", "sandy deserts", "ocean beaches"], "Few people live there."],
  ["Mount Monadnock, in the southwest corner of the state, is famous because…", "so many people climb it", ["it is a volcano", "it is under water", "it is the tallest mountain in the world"], "It is one of the most climbed mountains in the world."],
  ["Which river forms most of New Hampshire's border with Vermont?", "the Connecticut River", ["the Merrimack River", "the Mississippi River", "the Hudson River"], "It runs along the west side of the state."],
  ["Which state is to the south of New Hampshire?", "Massachusetts", ["Vermont", "Maine", "New York"], "Boston is not far from the border."],
  ["Which state is to the east of New Hampshire?", "Maine", ["Vermont", "Massachusetts", "Ohio"], "Maine is between New Hampshire and the ocean to the east."],
  ["A region is an area that…", "shares something in common, like land or how people live", ["has no people", "is always a city", "is under the ocean"], "Regions are grouped by what they share."],
  ["Why do many people visit the White Mountains in fall?", "to see the colorful leaves", ["to swim in warm water", "to see a desert", "to watch volcanoes"], "Fall leaf watching brings many visitors."],
  ["New Hampshire is part of a group of six states in the northeast called…", "New England", ["the Southwest", "the Midwest", "the Pacific Coast"], "It got its name from English settlers."],
  ["Most of New Hampshire's land is covered by…", "forest", ["desert", "ice", "farmland only"], "It is one of the most forested states."],
  ["Portsmouth grew up as a port city because it is…", "beside the ocean where ships can dock", ["on top of a mountain", "in the middle of a forest", "far from water"], "Ships brought goods in and out."],
  ["A city where state leaders meet and make laws is called the…", "capital", ["county", "harbor", "border"], "Concord is New Hampshire's capital."],
  ["Where would you most likely see a ski area in New Hampshire?", "on a mountain in the north", ["on a beach", "in a lake", "in a city parking lot"], "Skiing needs slopes and snow.", true],
  ["New Hampshire is divided into 10 parts called…", "counties", ["countries", "continents", "oceans"], "Each county has many towns.", true],
  ["Why do fewer people live in the far north of New Hampshire than in the south?", "it has more mountains and forest and fewer jobs", ["it is under water", "it is a desert", "no one is allowed there"], "People settle where there are jobs and easier land.", true],
  ["The Isles of Shoals are small rocky islands in the…", "Atlantic Ocean", ["Lakes Region", "White Mountains", "Connecticut River"], "They lie off the Seacoast.", true],
  ["Lots of rivers and lakes helped New Hampshire's mill towns because water could…", "turn wheels to run machines", ["make the land flat", "grow cotton", "stop the snow"], "Water power came before electricity.", true],
  ["Comparing a Seacoast town with a town in the Great North Woods, the Seacoast town is more likely to have…", "a harbor and fishing boats", ["moose crossing every street", "no roads", "deep snow all year"], "Regions shape how people live and work.", true],
  ["On a map of New Hampshire, the White Mountains are mostly in the…", "north", ["south", "far west", "ocean"], "The land rises toward the north.", true],
  ["New Hampshire has towns and cities. In most towns, people make decisions at a yearly…", "town meeting", ["birthday party", "sports game", "parade"], "Voters gather to decide on rules and spending.", true],
];

const MONEY_EXTRA: Q[] = [
  ["New Hampshire's forests, granite and rivers are its…", "natural resources", ["human resources", "capital resources", "wants"], "They come from nature."],
  ["A family needs food and a home, and wants a new video game. Which is a want?", "the video game", ["food", "a home", "clean water"], "Needs are what we must have to live."],
  ["In most New Hampshire towns, voters decide how much to spend on schools and roads at…", "town meeting", ["the movies", "the beach", "a ball game"], "Town meeting is often in March."],
  ["New Hampshire towns pay for schools, roads and fire trucks mostly with…", "property taxes", ["sales taxes on toys", "lemonade stands", "bake sales only"], "New Hampshire has no general sales tax.", true],
];

export const SOCIAL_3: Unit[] = [
  bankUnit({
    id: "nh-g3-people-on-the-move",
    title: "People on the Move",
    emoji: "🧳",
    blurb: "Why people move, and who has come to New Hampshire",
    parentNote: "Migration and immigration: push and pull factors, refugees, chain migration and democratic principles as reasons to move, how governments have responded (such as the Chinese Exclusion Act of 1882), the Abenaki and Pennacook peoples, and what French Canadian, Irish, Greek, Bhutanese, Congolese and other families have brought to New Hampshire.",
    standards: ["SS:GE:4:4.2; SS:GE:4:4.3; SS:HI:4:5.1; SS:HI:4:5.5", "the types and patterns of human migration and their effects on places, what different groups have added to New Hampshire, and why groups have come to the United States"],
    items: MOVING,
  }),
  bankUnit({
    id: "nh-g3-regions",
    title: "New Hampshire's Regions",
    emoji: "🏔️",
    blurb: "Mountains, lakes, valley and seacoast",
    parentNote: "New Hampshire's regions (the Great North Woods, the White Mountains, the Lakes Region, the Dartmouth-Lake Sunapee and Monadnock regions, the Merrimack Valley and the Seacoast), its neighbors, rivers and lakes, and how the land shapes where people live and work.",
    standards: ["SS:GE:4:2.1; SS:GE:4:2.3; SS:GE:4:4.1", "the physical and human characteristics of places, regions with shared characteristics, and where people live and why"],
    items: REGIONS,
  }),
  copyOf(
    from(CALIFORNIA_3, "ca-g3-money-and-voting"),
    {
      id: "nh-g3-money-and-voting",
      title: "Money, Taxes & Voting",
      emoji: "🏦",
      blurb: "Resources, choices and taking part",
      parentNote:
        "Natural, human and capital resources, needs and wants, saving and spending, trade-offs and opportunity cost, how taxes pay for services, and how citizens vote and take part, with New Hampshire examples such as town meeting and the property taxes that pay for schools and roads.",
      standards: ["SS:EC:4:2.2; SS:EC:4:4.2; SS:CV:4:2.2", "scarcity and economic choices, the goods and services local government provides, and how local and state laws and policies are made"],
    },
    MONEY_EXTRA,
  ),
];
