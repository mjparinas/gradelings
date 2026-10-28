import type { Unit } from "../../types";
import { SOCIAL_3 as CALIFORNIA_3 } from "../../california/units/social-g3";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Vermont Grade 3 social studies, Global Interactions: the land, climate and peoples of Africa, Asia, Europe and Oceania
// and how places around the world are connected (D2.Geo.2.3-5, D2.Geo.10.3-5, D2.Eco.14.3-5), why people move and what
// newcomers from around the world have brought to Vermont (D2.Geo.7.3-5, D2.Geo.8.3-5, D2.His.14.3-5), and resources,
// taxes and taking part in town meeting (D2.Eco.3.3-5, D2.Eco.12.3-5, D2.Civ.2.3-5) in a copy of California's unit
// without its California places. World maps, globes and cultures are practised with adopted units (see ../plan/social.ts).

const WORLD: Q[] = [
  ["Which continent has the most people?", "Asia", ["Africa", "Europe", "Oceania"], "Asia is also the biggest continent."],
  ["The Sahara, the largest hot desert in the world, is in…", "Africa", ["Europe", "Asia", "Oceania"], "It stretches across the north of Africa."],
  ["The highest mountain on Earth, Mount Everest, is in the…", "Himalayas in Asia", ["Alps in Europe", "Sahara in Africa", "Outback in Australia"], "The Himalayas are between India and China."],
  ["Australia is a country and also a…", "continent", ["city", "river", "desert only"], "It is the only country that covers a whole continent."],
  ["The Nile, one of the longest rivers in the world, flows north through…", "Egypt in Africa", ["France in Europe", "Japan in Asia", "New Zealand in Oceania"], "It empties into the Mediterranean Sea."],
  ["The Alps are tall, snowy mountains in…", "Europe", ["Africa", "Australia", "the Pacific Ocean"], "Switzerland and Austria are in the Alps."],
  ["Oceania is made up of Australia, New Zealand and thousands of…", "islands in the Pacific Ocean", ["deserts in Africa", "mountains in Europe", "rivers in Asia"], "Fiji and Samoa are Pacific islands."],
  ["Japan and Indonesia are countries made up of many…", "islands", ["deserts", "glaciers", "volcano-free plains"], "Both are in Asia."],
  ["The imaginary line around the middle of Earth, which crosses Africa, is the…", "Equator", ["Prime Meridian", "Arctic Circle", "Great Wall"], "Places near it are warm all year."],
  ["Wide, grassy plains with a few trees, where lions, zebras and elephants live in Africa, are called…", "savannas", ["glaciers", "tundras", "fjords"], "Kenya and Tanzania have savannas."],
  ["The Great Barrier Reef, the largest coral reef in the world, is off the coast of…", "Australia", ["Egypt", "Norway", "India"], "Coral reefs grow in warm, shallow ocean water."],
  ["The dry middle of Australia, where few people live, is called the…", "Outback", ["Riviera", "Savanna", "Steppe"], "Most Australians live near the coast."],
  ["Rice grows well in parts of Asia that have warm weather and lots of…", "rain", ["snow", "sand", "ice"], "Rice fields are often flooded."],
  ["Heavy seasonal winds that bring months of rain to India and nearby countries are called…", "monsoons", ["blizzards", "tornadoes", "droughts"], "Farmers depend on the monsoon rains."],
  ["The tallest mountain in Africa is…", "Kilimanjaro", ["Everest", "Mont Blanc", "Mansfield"], "It is in Tanzania and has snow on top."],
  ["Which sea lies between Europe and Africa?", "the Mediterranean Sea", ["the Caribbean Sea", "the Red Sea", "the Bering Sea"], "Italy, Greece and Egypt all touch it."],
  ["Which country in Europe is famous for windmills and land saved from the sea?", "the Netherlands", ["Egypt", "Japan", "Australia"], "Walls called dikes hold back the sea."],
  ["Bananas, cocoa beans and coffee grow best in places that are…", "warm and wet near the Equator", ["cold and icy", "high on snowy peaks", "dry deserts"], "Climate decides what farmers can grow."],
  ["Africa has more countries than any other continent. About how many does it have?", "54", ["7", "12", "200"], "Nigeria, Kenya and Ghana are three of them."],
  ["The kangaroo and the koala live in the wild only in…", "Australia", ["Europe", "Africa", "Asia"], "Australia's animals are found nowhere else."],
  ["Maple syrup from Vermont is sold in Japan, and clothes made in Asia are sold in Vermont. This is an example of…", "world trade", ["hibernation", "erosion", "a town meeting"], "Countries trade what they make."],
  ["Which two countries have the most people in the world?", "India and China", ["Australia and New Zealand", "France and Spain", "Egypt and Kenya"], "Both are in Asia."],
  ["Why do many people in Egypt live close to the Nile River?", "it gives water for drinking and farming in a desert", ["it is always frozen", "no one is allowed in the desert towns", "the river is full of gold"], "Water decides where people can live.", true],
  ["Why are winters in Vermont cold but warm all year in Indonesia?", "Indonesia is near the Equator and Vermont is far from it", ["Vermont has more trees", "Indonesia has more people", "Vermont is next to an ocean"], "Places near the Equator get strong sunlight all year.", true],
  ["Lines of latitude measure how far a place is…", "north or south of the Equator", ["east or west of Vermont", "above the ocean floor", "from the nearest city"], "Lines of longitude measure east and west.", true],
  ["Ships carry most goods between Asia and Europe, but planes carry things that must arrive…", "quickly, like fresh flowers and medicine", ["slowly, like rocks", "never", "only in winter"], "Different goods move in different ways.", true],
  ["Farmers in the mountains of Asia carve flat steps into hillsides to grow rice. These steps are called…", "terraces", ["dikes", "dams", "canyons"], "People change the land to farm it.", true],
  ["A satellite photo of Earth at night shows the brightest lights where…", "many people live in cities", ["it is daytime", "there are deserts", "there are no roads"], "Lights show where people live.", true],
  ["New Zealand's Indigenous people, who have lived there for hundreds of years, are the…", "Māori", ["Vikings", "Romans", "Aztecs"], "Māori language and culture are part of New Zealand today.", true],
];

const MOVING: Q[] = [
  ["Moving from one place to another to live is called…", "migration", ["vacation", "erosion", "election"], "People migrate within a country or between countries."],
  ["Moving to a new country to live there is called…", "immigration", ["hibernation", "irrigation", "celebration"], "An immigrant comes from another country."],
  ["A push factor is a reason people…", "leave a place", ["move to a place", "stay home", "go on vacation"], "Something pushes them away."],
  ["A pull factor is a reason people…", "move to a place", ["leave a place", "stay asleep", "forget a place"], "Something attracts them."],
  ["Which is a push factor?", "a war or famine at home", ["good jobs nearby", "family already there", "cheap land nearby"], "Hard times make people leave."],
  ["Many French-speaking families came from Quebec, just north of Vermont, to work on farms and in…", "mills", ["gold mines", "rice fields", "space stations"], "Many Vermont families have French last names."],
  ["Stone carvers from Italy and Scotland came to Barre in the late 1800s to work with…", "granite", ["gold", "sand", "ice"], "Barre is famous for its granite quarries."],
  ["Workers from Wales came to Poultney and Fair Haven to split…", "slate for roofs", ["wood for canoes", "ice for drinks", "glass for windows"], "Slate splits into thin, flat sheets."],
  ["Many Irish workers came to Vermont in the 1840s and 1850s to build the…", "railroads", ["highways", "airports", "space station"], "Famine in Ireland pushed many people to leave."],
  ["Workers from Sweden and other countries came to Proctor to cut and carve…", "marble", ["coal", "cotton", "rubber"], "Proctor is known as the Marble Town."],
  ["In recent years, refugees from countries such as Bhutan, Somalia and the Congo have made new homes in…", "Burlington and Winooski", ["the moon", "the ocean floor", "Antarctica"], "Refugees flee danger at home."],
  ["People who must flee their country because of war are called…", "refugees", ["tourists", "pilots", "voters"], "Refugees need a safe place to live."],
  ["The Abenaki people have lived in the land that is now Vermont for…", "thousands of years", ["about 50 years", "one year", "since the year 2000"], "Abenaki people still live in Vermont today."],
  ["Long ago, many towns grew beside rivers because rivers gave them…", "water power, food and a way to travel", ["sand and dust", "nothing at all", "snowstorms"], "Physical geography shapes where people live."],
  ["Freedom to choose your religion is a reason some people…", "move to a new country", ["stay home forever", "stop going to school", "forget their language"], "People seek freedom and fair treatment."],
  ["Freedom of speech and the right to vote can pull people to a country because they are…", "democratic principles", ["kinds of weather", "kinds of food", "landforms"], "People want a say in their government."],
  ["When newcomers arrive, they and their neighbors can learn…", "each other's foods, languages and holidays", ["nothing new", "only one game", "only the weather"], "Cultures share and mix."],
  ["Italian bakeries in Barre and Nepali and Somali markets in Winooski show that…", "people bring their foods with them", ["no one moves", "everyone eats the same", "food never changes"], "Food travels with people."],
  ["When a new family moves next door, a kind way to help them is to…", "say hello and show them around", ["ignore them", "laugh at them", "hide from them"], "Communities welcome newcomers."],
  ["Many immigrants become US citizens by passing a test about…", "US history and government", ["swimming", "cooking", "painting"], "The ceremony is called naturalization."],
  ["In the 1800s, many Vermont hill farms became empty because families moved to…", "cities and better farmland out west", ["the bottom of Lake Champlain", "the moon", "the top of Mount Mansfield"], "When jobs leave, people leave.", true],
  ["Chain migration is when people move to a place because…", "family or friends from home already live there", ["a chain pulls them", "they are on vacation", "they lost a map"], "One family's move leads others to follow.", true],
  ["Wars between the English and the French and their Abenaki allies in the 1700s changed Abenaki life because…", "many families moved to stay safe", ["no one was affected", "everyone moved to the ocean", "the mountains moved"], "Settlement and war affect the people already in a place.", true],
  ["Barre's granite workers came because Barre had…", "a natural resource that needed skilled workers", ["no work at all", "a desert", "an ocean port"], "Resources pull workers to a place.", true],
  ["A law in 1882 stopped most workers from China from coming to the United States. This was a…", "government response to immigration", ["holiday", "weather report", "sports rule"], "It was called the Chinese Exclusion Act.", true],
  ["Cars and the interstate highways made it easier for people to live in one Vermont town and work in…", "another town", ["another planet", "the ocean", "a cave"], "Technology changes where people can live.", true],
  ["A refugee family from Bhutan lived for years in a camp in Nepal before coming to Vermont. The war at home was a…", "push factor", ["pull factor", "natural resource", "kind of map"], "It pushed them to leave.", true],
];

const MONEY_EXTRA: Q[] = [
  ["Vermont's forests, granite, marble and rich farmland are its…", "natural resources", ["human resources", "capital resources", "wants"], "They come from nature."],
  ["A family needs food and a home, and wants a new video game. Which is a want?", "the video game", ["food", "a home", "clean water"], "Needs are what we must have to live."],
  ["On Town Meeting Day, the first Tuesday in March, Vermont voters decide on…", "town and school budgets", ["the weather", "movie times", "the price of maple syrup in stores"], "It is a state holiday in Vermont."],
  ["Much of the money for Vermont's public schools comes from…", "property taxes", ["lemonade stands", "bake sales only", "selling the schools"], "People who own land and buildings pay property tax.", true],
];

export const SOCIAL_3: Unit[] = [
  bankUnit({
    id: "vt-g3-world-regions",
    title: "Africa, Asia, Europe & Oceania",
    emoji: "🌏",
    blurb: "Lands, climates and peoples around the world",
    parentNote: "Global interactions: the landforms, climates and peoples of Africa, Asia, Europe and Oceania (the Sahara and the Nile, the Himalayas and the monsoons, the Alps and the Mediterranean, the Outback and the Pacific islands), why climate differs near and far from the Equator, how people adapt the land, and how world trade connects Vermont with other countries.",
    standards: ["D2.Geo.2.3-5; D2.Geo.10.3-5; D2.Eco.14.3-5", "using maps and images to explain where places and regions are, why environments differ among world regions, and how trade connects nations"],
    items: WORLD,
  }),
  bankUnit({
    id: "vt-g3-people-on-the-move",
    title: "People on the Move",
    emoji: "🧳",
    blurb: "Why people move, and who has come to Vermont",
    parentNote: "Migration and immigration: push and pull factors, refugees, chain migration and democratic principles as reasons to move, how governments have responded (such as the Chinese Exclusion Act of 1882), the Abenaki people, and what French Canadian, Irish, Italian, Scottish, Welsh, Swedish, Bhutanese, Somali, Congolese and other families have brought to Vermont.",
    standards: ["D2.Geo.7.3-5; D2.Geo.8.3-5; D2.His.14.3-5", "how cultural and environmental characteristics affect the movement of people, how settlement relates to natural resources, and the causes and effects of events"],
    items: MOVING,
  }),
  copyOf(
    from(CALIFORNIA_3, "ca-g3-money-and-voting"),
    {
      id: "vt-g3-money-and-voting",
      title: "Money, Taxes & Voting",
      emoji: "🏦",
      blurb: "Resources, choices and taking part",
      parentNote:
        "Natural, human and capital resources, needs and wants, saving and spending, trade-offs and opportunity cost, how taxes pay for services, and how citizens vote and take part, with Vermont examples such as Town Meeting Day and the property taxes that pay for schools.",
      standards: ["D2.Eco.3.3-5; D2.Eco.12.3-5; D2.Civ.2.3-5", "the resources used to produce goods and services, how government pays for the services it provides, and how democracy relies on people's responsible participation"],
    },
    MONEY_EXTRA,
  ),
];
