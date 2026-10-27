import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// West Virginia Grade 6 social studies, alongside world history from 1900: how capitalism, socialism and communism answer
// the basic economic questions (SS.6.8), renewable and non-renewable resources (SS.6.9), the United States-Mexico-Canada
// Agreement (SS.6.10), the oceans that kept the United States apart from wars abroad (SS.6.14), reading a world time zone
// map (SS.6.17) and the waterways that carry the world's trade (SS.6.18).

const WORLD_ECONOMY: Q[] = [
  ["In capitalism, most businesses are owned by…", "private people and companies", ["the government only", "no one at all"], "Owners compete to sell goods and services."],
  ["In communism, the government owns…", "most land, factories and businesses", ["nothing at all", "only the post office"], "The government plans what is made."],
  ["In socialism, the government owns or runs…", "key industries and services, while some private business remains", ["every single shop and farm", "no services at all"], "It sits between capitalism and communism."],
  ["In a market economy, prices are mostly set by…", "supply and demand", ["a single king", "the weather"], "Buyers and sellers decide together."],
  ["In a command economy, what to make and how much is decided by…", "government planners", ["each shopper", "a coin toss"], "The Soviet Union worked this way."],
  ["The United States has a mixed economy, which means…", "mostly private businesses with some government rules and services", ["the government owns every business", "there are no laws about business"], "Think of private stores and public roads together."],
  ["Which question does every economy have to answer?", "what to produce, how to produce it and who gets it", ["what color the money is", "which day is a holiday"], "These are the basic economic questions."],
  ["Coal, oil and natural gas are… resources.", "non-renewable", ["renewable", "endless"], "They took millions of years to form."],
  ["Sunlight, wind and flowing water are… resources.", "renewable", ["non-renewable", "used up forever after one use"], "Nature keeps supplying them."],
  ["Trees are renewable when people…", "plant new trees as they cut", ["cut every tree at once", "never water anything"], "Forests can regrow if managed."],
  ["When the price of natural gas falls, a town that depends on gas wells may see…", "fewer jobs and less money", ["more snow", "a bigger river"], "Resource prices affect local economies."],
  ["USMCA is a trade agreement among…", "the United States, Mexico and Canada", ["China, Japan and Korea", "France, Spain and Italy"], "It took effect in 2020."],
  ["USMCA replaced an older agreement called…", "NAFTA", ["the Marshall Plan", "the Bill of Rights"], "NAFTA began in 1994."],
  ["One main goal of USMCA is to…", "lower barriers to trade among the three countries", ["stop all trade", "end the use of money"], "Goods cross the borders more easily."],
  ["A tariff is…", "a tax on imported goods", ["a kind of ship", "a trade route"], "Trade agreements often lower tariffs."],
  ["Goods a country buys from another country are called…", "imports", ["exports", "taxes"], "Exports are goods it sells abroad."],
  ["Which oceans helped keep the United States far from wars in Europe and Asia?", "the Atlantic and the Pacific", ["the Arctic and the Southern", "the Indian and the Southern"], "Wide oceans are hard to cross with an army."],
  ["Staying out of other countries' wars is called…", "isolationism", ["imperialism", "nationalism"], "Oceans made it easier for a time."],
  ["Earth is divided into about 24 standard time zones because…", "it turns once every 24 hours", ["there are 24 continents", "the moon has 24 phases"], "Each zone is about 15° of longitude wide."],
  ["When it is noon in New York, it is 9 a.m. in…", "Los Angeles", ["London", "Tokyo"], "Pacific time is 3 hours behind Eastern time."],
  ["Traveling east across time zones, clocks are set…", "later", ["earlier", "the same"], "The sun rises earlier in the east."],
  ["When it is 12 noon in London, it is 7 a.m. in…", "New York", ["Paris", "Moscow"], "Eastern time is 5 hours behind London's."],
  ["The line where the date changes is the…", "International Date Line", ["equator", "prime meridian"], "It runs through the Pacific Ocean."],
  ["The Panama Canal connects the…", "Atlantic and Pacific oceans", ["Red Sea and Black Sea", "Arctic and Indian oceans"], "Ships no longer sail around South America."],
  ["The Suez Canal connects the Mediterranean Sea with the…", "Red Sea", ["Caribbean Sea", "Baltic Sea"], "It shortens trips between Europe and Asia."],
  ["The Erie Canal, opened in 1825, linked the Great Lakes to…", "the Hudson River and New York City", ["the Gulf of Mexico", "the Pacific Ocean"], "It made shipping from the Midwest cheaper."],
  ["The Mississippi River carries barges of grain and coal to…", "the Gulf of Mexico", ["the Arctic Ocean", "Lake Superior"], "New Orleans is near its mouth."],
  ["The Rhine River is a busy trade route in…", "Europe", ["South America", "Australia"], "It flows through Germany and the Netherlands."],
  ["The Amazon River flows across…", "South America", ["Africa", "Asia"], "Ships can travel far inland on it."],
  ["Coal from West Virginia can reach the Mississippi River and the world by way of the…", "Ohio River", ["Rhine River", "Amazon River"], "The Ohio flows into the Mississippi."],
  ["Why did the Panama Canal lower the cost of shipping?", "it cut thousands of miles off trips between the two oceans", ["it made ships bigger", "it removed all tariffs", "it stopped storms"], "Shorter routes save fuel and time.", true],
  ["Why might a country rich in oil still want renewable energy?", "oil will run out and its price goes up and down", ["renewable energy never needs workers", "oil is renewable", "sunlight is non-renewable"], "Think about the future and steady prices.", true],
  ["How does trade under USMCA affect West Virginia?", "it helps the state sell goods like coal and chemicals to Canada and Mexico", ["it stops all of the state's exports", "it closes the state's highways", "it bans West Virginia products"], "Canada is one of the state's top trading partners.", true],
  ["How is a socialist economy different from a communist one?", "socialism allows some private business, while communism puts nearly all of it under the state", ["they are exactly the same", "communism has no government", "socialism bans all government services"], "Think about who owns businesses.", true],
];

export const SOCIAL_6: Unit[] = [
  bankUnit({
    id: "wv-g6-world-economy",
    title: "Economies, Trade & Time Zones",
    emoji: "🌐",
    blurb: "Economic systems, USMCA, time zones and canals",
    parentNote:
      "How capitalism, socialism and communism answer the basic economic questions, renewable and non-renewable resources, the United States-Mexico-Canada Agreement and how trade works, the oceans that kept the United States apart from wars abroad, reading a world time zone map, and the canals and rivers that carry world trade.",
    standards: ["SS.6.8; SS.6.9; SS.6.10; SS.6.14; SS.6.17; SS.6.18", "capitalism, socialism and communism, renewable and non-renewable resources, the USMCA, the oceans that isolated the United States, world time zones, and the waterways of world trade"],
    items: WORLD_ECONOMY,
  }),
];
