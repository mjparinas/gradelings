import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Iowa Grade 7 social studies, Modern World Studies: Iowa in a connected world, with international organizations
// (SS.7.8), international treaties and trade agreements (SS.7.9), and the benefits and challenges of economic
// globalization in Iowa and worldwide (SS.7.11). The world regions are practised with adopted units (see
// ../plan/social.ts).

const WORLD: Q[] = [
  ["The United Nations was formed in 1945, after World War II, mainly to…", "keep peace and settle conflicts between nations", ["run world sports", "print one world currency", "replace national governments"], "Its charter was signed in San Francisco."],
  ["The World Trade Organization sets rules for…", "trade between countries", ["school lunches", "space travel", "weather forecasts"], "It settles trade disputes too."],
  ["NATO, formed in 1949, is an alliance in which members agree to…", "defend each other if attacked", ["share one army uniform", "trade only with each other", "use one language"], "An attack on one is an attack on all."],
  ["The World Health Organization is part of the United Nations and works on…", "public health around the world", ["farm prices", "border walls", "elections"], "It tracks diseases like flu."],
  ["The United States-Mexico-Canada Agreement (USMCA), which replaced NAFTA in 2020, is a…", "trade agreement", ["military alliance", "space treaty", "sports league"], "It lowers barriers to trade in North America."],
  ["Iowa's two biggest export markets are its North American neighbors…", "Canada and Mexico", ["Brazil and Argentina", "France and Spain", "Egypt and Kenya"], "USMCA covers trade with both."],
  ["Iowa sells huge amounts of soybeans to other countries. Selling goods abroad is called…", "exporting", ["importing", "borrowing", "taxing"], "Exports leave the country."],
  ["Iowa leads the nation in raising hogs, and much of its pork is sold to…", "countries around the world", ["only Des Moines", "only farm families", "no one"], "Mexico, Japan and China buy Iowa pork."],
  ["John Deere tractors built in Waterloo are sold…", "around the world", ["only in Iowa", "only to Iowa farmers", "nowhere"], "Machinery is one of Iowa's top exports."],
  ["In 2018, tariffs between the United States and China hurt Iowa soybean farmers because…", "China bought fewer soybeans", ["soybeans stopped growing", "farms closed by law", "China bought more soybeans"], "A tariff is a tax on imports."],
  ["A benefit of globalization for Iowa farmers is…", "more buyers for their crops", ["no competition", "fixed prices forever", "no need for trade"], "World markets are big."],
  ["A challenge of globalization for some Iowa workers is that…", "factories can move to other countries", ["prices never change", "jobs never change", "no goods are imported"], "Maytag's Newton factory closed in 2007."],
  ["Iowa's sister-state partnership with Hebei, China, began in…", "1983", ["1776", "1846", "2020"], "Sister states trade ideas and visits."],
  ["In 1985, a young Chinese official named Xi Jinping visited farms in…", "Muscatine, Iowa", ["Paris, France", "Toronto, Canada", "Lima, Peru"], "He later became China's leader and returned in 2012."],
  ["After typhoons hit Yamanashi, Japan, in 1959, Iowans sent…", "hogs and corn to help farmers rebuild", ["soldiers", "nothing", "snow"], "It was called the Iowa Hog Lift."],
  ["The World Food Prize, started by Iowan Norman Borlaug, honors people who…", "improve the world's food supply", ["win sports", "build bridges", "write novels"], "Its home is in Des Moines."],
  ["Norman Borlaug won the Nobel Peace Prize in 1970 for…", "breeding wheat that fed millions", ["building tractors", "ending a war", "exploring space"], "His work is called the Green Revolution."],
  ["A treaty is effective when countries…", "follow it and enforce it", ["sign it and ignore it", "keep it secret", "never meet"], "Enforcement is the hard part."],
  ["The Paris Agreement of 2015 is a treaty about…", "climate change", ["trade in soybeans", "space travel", "Olympic games"], "Nations set goals to cut emissions."],
  ["The Geneva Conventions are international laws about…", "how prisoners and civilians are treated in war", ["trade in corn", "school rules", "sports"], "They protect people who aren't fighting."],
  ["Imports Iowa families buy, like phones and clothes, often come from…", "Asia", ["Iowa farms", "the moon", "the Arctic"], "Global trade brings goods from far away."],
  ["Ethanol made from Iowa corn is shipped to other countries as…", "fuel", ["food coloring", "clothing", "paper"], "Iowa makes more ethanol than any state."],
  ["Comparative advantage means a place should make what it…", "can make at the lowest opportunity cost", ["likes the most", "never sells", "buys from others"], "Iowa's soil gives it an advantage in crops."],
  ["Many international students and workers in Iowa come to study and work in fields such as…", "farming science and engineering", ["deep sea fishing", "glacier mapping", "mountain guiding"], "Iowa State is known for agriculture.", true],
  ["Why might a trade agreement be good for Iowa but hard for some workers elsewhere?", "trade creates winners and losers", ["trade helps everyone equally", "trade never changes jobs", "trade is illegal"], "Think about who gains and who loses.", true],
  ["When the price of soybeans falls worldwide, Iowa farmers…", "earn less for each bushel", ["earn more", "are not affected", "stop paying taxes"], "Iowa farms are tied to world markets.", true],
  ["The United Nations Security Council has five permanent members that can…", "veto its decisions", ["elect the President", "print money", "end treaties alone"], "They are the US, UK, France, Russia and China.", true],
  ["Why do countries join international organizations?", "to solve problems no country can solve alone", ["to give up all their laws", "to stop trading", "to avoid other countries"], "Disease, trade and war cross borders.", true],
];

export const SOCIAL_7: Unit[] = [
  bankUnit({
    id: "ia-g7-iowa-in-the-world",
    title: "Iowa in the World",
    emoji: "🌎",
    blurb: "Trade, treaties and world organizations",
    parentNote: "How Iowa is connected to the world: exports of soybeans, pork, corn, ethanol and tractors, trade agreements such as USMCA, tariffs and their effect on farmers, sister states such as Hebei and Yamanashi, the World Food Prize and Norman Borlaug, international organizations (the United Nations, NATO, the World Trade Organization and the World Health Organization), treaties such as the Paris Agreement and the Geneva Conventions, and the benefits and challenges of globalization.",
    standards: ["SS.7.8; SS.7.9; SS.7.11", "international organizations and their impact, the effectiveness of international treaties and laws, and the benefits and challenges of economic globalization in Iowa and worldwide"],
    items: WORLD,
  }),
];
