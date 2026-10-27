import type { Unit } from "../../types";
import { SOCIAL_3 as CALIFORNIA_3 } from "../../california/units/social-g3";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Delaware Grade 3 social studies, Delaware communities: who lives in Delaware and how they got here (H.4.K-3.b),
// types of settlement and the connections between them (G.3.K-3.a), Delaware's regions and the places they connect to
// (G.4.K-3.a, G.2.K-3.a), and local government, taxes and services (C.1.K-3.a, E.1.K-3.b) in a copy of California's unit
// without its California places. World maps and cultures are practised with adopted units (see ../plan/social.ts).

const MOVING: Q[] = [
  ["Moving from one place to another to live is called…", "migration", ["vacation", "erosion", "election"], "People migrate within a country or between countries."],
  ["Moving to a new country to live there is called…", "immigration", ["hibernation", "irrigation", "celebration"], "An immigrant comes from another country."],
  ["A push factor is a reason people…", "leave a place", ["move to a place", "stay home", "go on vacation"], "Something pushes them away."],
  ["A pull factor is a reason people…", "move to a place", ["leave a place", "stay asleep", "forget a place"], "Something attracts them."],
  ["In the 1800s, the mills and factories of Wilmington drew new people because they offered…", "jobs", ["a long war", "a flood", "deep snow"], "Wilmington grew quickly beside its rivers."],
  ["Which is a push factor?", "a war or famine at home", ["good jobs nearby", "family already there", "cheap land nearby"], "Hard times make people leave."],
  ["Many Irish families came to work in the gunpowder mills along Delaware's…", "Brandywine Creek", ["Mississippi River", "Rocky Mountains", "Great Lakes"], "The creek's falling water ran the mills."],
  ["Many Irish families came to Delaware in the 1800s after a terrible famine in Ireland. A famine is…", "a time when there is not enough food", ["a big party", "a kind of boat", "a snowstorm"], "Hunger pushed many people to leave."],
  ["Families from Italy, Poland and many other countries also came to work in…", "Wilmington's factories and shipyards", ["deserts", "islands", "volcanoes"], "Their churches, foods and festivals are still part of the city."],
  ["In the 1900s, many Black families moved from the South to cities in the North, such as Wilmington. This was called the Great…", "Migration", ["Vacation", "Election", "Celebration"], "They were looking for jobs and fairer treatment."],
  ["The Lenape and Nanticoke peoples lived in Delaware for thousands of years before…", "European settlers arrived", ["the Ice Age", "dinosaurs lived", "the oceans formed"], "Lenape and Nanticoke communities still live in Delaware today."],
  ["Today, many people move to Sussex County, near the beaches, to…", "retire or find work", ["climb tall mountains", "live in a desert", "see volcanoes"], "Sussex County is one of the fastest growing parts of the state."],
  ["Freedom to choose your religion is a reason some people…", "move to a new country", ["stay home forever", "stop going to school", "forget their language"], "People seek freedom and fair treatment."],
  ["Freedom of speech and the right to vote can pull people to a country because they are…", "democratic principles", ["kinds of weather", "kinds of food", "landforms"], "People want a say in their government."],
  ["People who must flee their country because of war are called…", "refugees", ["tourists", "pilots", "voters"], "Refugees need a safe place to live."],
  ["Long ago, many towns grew beside rivers because rivers gave them…", "water power, food and a way to travel", ["sand and dust", "nothing at all", "snowstorms"], "Physical geography shapes where people live."],
  ["Many families from Guatemala and Mexico have come to Sussex County to work on farms and in…", "chicken processing plants", ["gold mines", "ski resorts", "oil fields"], "Chicken farming is a big business in southern Delaware."],
  ["When newcomers arrive, they and their neighbors can learn…", "each other's foods, languages and holidays", ["nothing new", "only one game", "only the weather"], "Cultures share and mix."],
  ["Italian festivals in Wilmington and Latino markets in Georgetown show that…", "communities share their foods", ["no one moves", "everyone eats the same", "food never changes"], "Food travels with people."],
  ["A law in 1882 stopped most workers from China from coming to the United States. This was a…", "government response to immigration", ["a holiday", "a weather report", "a sports rule"], "It was called the Chinese Exclusion Act.", true],
  ["As settlers took over their land in the 1700s, many Lenape families moved west. This shows that settlement…", "changed the lives of the people already living there", ["never affected anyone", "always helped everyone", "happened without people"], "Settlement affects the people already in a place.", true],
  ["Why do some people from nearby states cross into Delaware to shop?", "Delaware has no sales tax", ["Delaware has no stores", "shopping is free", "it is always summer"], "Prices cost a little less without the tax.", true],
  ["When a new family moves next door, a kind way to help them is to…", "say hello and show them around", ["ignore them", "laugh at them", "hide from them"], "Communities welcome newcomers.", true],
  ["Many immigrants become US citizens by passing a test about…", "US history and government", ["swimming", "cooking", "painting"], "The ceremony is called naturalization.", true],
  ["Chain migration is when people move to a place because…", "family or friends from home already live there", ["a chain pulls them", "they are on vacation", "they lost a map"], "One family's move leads others to follow.", true],
  ["Cars and new highways made it easier for people to live in one town and work in…", "another town", ["another planet", "the ocean", "a cave"], "Technology changes where people can live.", true],
];

const REGIONS: Q[] = [
  ["Delaware's capital city is…", "Dover", ["Wilmington", "Newark", "Lewes"], "Legislative Hall is there."],
  ["How many counties does Delaware have?", "three", ["ten", "fifty", "one hundred"], "That is fewer than any other state."],
  ["Delaware's three counties, from north to south, are New Castle, Kent and…", "Sussex", ["Dover", "Brandywine", "Atlantic"], "The southern county has the beaches."],
  ["Delaware's biggest city, Wilmington, is in…", "New Castle County", ["Kent County", "Sussex County", "Maryland"], "It is in the north of the state."],
  ["Dover, the capital, is in the middle county,…", "Kent County", ["Sussex County", "New Castle County", "Lancaster County"], "Kent is between the other two."],
  ["The beaches at Rehoboth, Bethany and Lewes are along the…", "Atlantic Ocean", ["Pacific Ocean", "Gulf of Mexico", "Arctic Ocean"], "They are in Sussex County."],
  ["Delaware shares a peninsula with Maryland and Virginia. It is called the…", "Delmarva Peninsula", ["Florida Peninsula", "Rocky Peninsula", "Great Plains"], "Its name joins the three states' names."],
  ["Which state is across the Delaware River and Delaware Bay from Delaware?", "New Jersey", ["Ohio", "Texas", "Maine"], "It is to the east."],
  ["Which state is to the north of Delaware?", "Pennsylvania", ["Maryland", "Virginia", "New Jersey"], "Its border with Delaware is part of a circle."],
  ["Which state is to the west and south of Delaware?", "Maryland", ["Pennsylvania", "New Jersey", "New York"], "Maryland wraps around two sides."],
  ["A region is an area that…", "shares something in common, like land or how people live", ["has no people", "is always a city", "is under the ocean"], "Regions are grouped by what they share."],
  ["Most of Delaware is low, flat land called the Atlantic Coastal…", "Plain", ["Mountain", "Desert", "Canyon"], "It is good land for farming."],
  ["The far north of Delaware, the Piedmont, has…", "rolling hills and rocky creeks", ["tall snowy mountains", "sand dunes only", "volcanoes"], "Brandywine Creek runs through it."],
  ["Much of the land in Kent and Sussex counties is used for…", "farms", ["ski slopes", "deserts", "glaciers"], "Corn, soybeans and chickens are raised there."],
  ["Wilmington grew up as a port city because it is…", "beside rivers where ships can dock", ["on top of a mountain", "in the middle of a desert", "far from water"], "Ships brought goods in and out."],
  ["A city where state leaders meet and make laws is called the…", "capital", ["county", "harbor", "border"], "Dover is Delaware's capital."],
  ["Where would you most likely see fishing boats in Delaware?", "in Lewes, by Delaware Bay", ["on a hilltop", "in a cornfield", "in a city parking lot"], "Boats need water and a harbor.", true],
  ["Delaware is the second smallest state. The only smaller state is…", "Rhode Island", ["Texas", "Alaska", "California"], "You can drive across Delaware in about two hours.", true],
  ["The Chesapeake and Delaware Canal cuts across the state so ships can travel between…", "two big bays", ["two mountains", "two deserts", "two cities on land"], "It joins the Chesapeake Bay and the Delaware River.", true],
  ["Why do more people live in New Castle County than in the other two counties?", "it has the biggest cities and the most jobs", ["it is under water", "it is a desert", "no one is allowed in the south"], "People settle where there are jobs.", true],
  ["Bombay Hook, in Kent County, is a big wetland where many…", "birds stop to rest and eat", ["cars are built", "skyscrapers stand", "volcanoes erupt"], "Wetlands are home to many animals.", true],
  ["Comparing a beach town in Sussex County with a farm town in Kent County, the beach town is more likely to have…", "visitors in summer and shops by the sea", ["deep snow all year", "no roads", "tall mountains"], "Regions shape how people live and work.", true],
  ["On a map of Delaware, the beaches on the Atlantic Ocean are in the…", "southeast", ["northwest", "far north", "middle of the state"], "Look for the coast in Sussex County.", true],
  ["Delaware has towns and cities. Many towns are led by a mayor and a…", "town council", ["king", "captain", "coach"], "Voters choose them.", true],
];

const MONEY_EXTRA: Q[] = [
  ["Delaware's farmland, rivers and beaches are its…", "natural resources", ["human resources", "capital resources", "wants"], "They come from nature."],
  ["A family needs food and a home, and wants a new video game. Which is a want?", "the video game", ["food", "a home", "clean water"], "Needs are what we must have to live."],
  ["In Delaware, voters choose the people who decide how a town spends money, such as the…", "mayor and town council", ["school bus driver", "lifeguard", "mail carrier"], "Leaders are chosen by election."],
  ["Delaware has no sales tax, so towns and the state pay for services with taxes like…", "property taxes and income taxes", ["taxes on recess", "lemonade stands", "bake sales only"], "Grown-ups pay taxes on homes and on money they earn.", true],
];

export const SOCIAL_3: Unit[] = [
  bankUnit({
    id: "de-g3-people-on-the-move",
    title: "People on the Move",
    emoji: "🧳",
    blurb: "Why people move, and who has come to Delaware",
    parentNote: "Migration and immigration: push and pull factors, refugees, chain migration and democratic principles as reasons to move, how governments have responded (such as the Chinese Exclusion Act of 1882), the Lenape and Nanticoke peoples, the Great Migration, and what Irish, Italian, Polish, Guatemalan, Mexican and other families have brought to Delaware.",
    standards: ["H.4.K-3.b; G.3.K-3.a", "who lives in Delaware and the United States and how they got here, and types of human settlement and the connections between them"],
    items: MOVING,
  }),
  bankUnit({
    id: "de-g3-regions",
    title: "Delaware's Counties & Regions",
    emoji: "🗺️",
    blurb: "Three counties, from the hills to the beaches",
    parentNote: "Delaware's three counties (New Castle, Kent and Sussex), the Piedmont hills in the north and the flat Atlantic Coastal Plain, the Delmarva Peninsula and its neighbors, the Delaware River and Bay, the Chesapeake and Delaware Canal and the Atlantic beaches, and how the land shapes where people live and work.",
    standards: ["G.4.K-3.a; G.2.K-3.a; G.3.K-3.a", "places and regions and the connections between them, landforms, and types of human settlement"],
    items: REGIONS,
  }),
  copyOf(
    from(CALIFORNIA_3, "ca-g3-money-and-voting"),
    {
      id: "de-g3-money-and-voting",
      title: "Money, Taxes & Voting",
      emoji: "🏦",
      blurb: "Resources, choices and taking part",
      parentNote:
        "Natural, human and capital resources, needs and wants, saving and spending, trade-offs and opportunity cost, how taxes pay for services, and how citizens vote and take part, with Delaware examples such as electing a mayor and town council, and paying for services without a sales tax.",
      standards: ["E.1.K-3.b; E.1.K-3.a; C.1.K-3.a", "weighing costs and benefits in economic choices, meeting wants with limited resources, and choosing leaders by election"],
    },
    MONEY_EXTRA,
  ),
];
