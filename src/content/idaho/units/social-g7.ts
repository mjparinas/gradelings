import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Idaho Grade 7 social studies: Idaho in a connected world, with the costs and benefits of global connections and
// international organizations (6-9.WG.5.5), the economic links between Idaho, the nation and the world (6-9.WG.3.5) and
// global issues (6-9.WG.5.6). The world regions, world history and world geography are practised with adopted units
// (see ../plan/social.ts).

const WORLD: Q[] = [
  ["The United Nations was formed in 1945, after World War II, mainly to…", "keep peace and settle conflicts between nations", ["run world sports", "print one world currency", "replace national governments"], "Its charter was signed in 1945."],
  ["The World Trade Organization sets rules for…", "trade between countries", ["school lunches", "space travel", "weather forecasts"], "It settles trade disputes too."],
  ["NATO, formed in 1949, is an alliance in which members agree to…", "defend each other if attacked", ["share one army uniform", "trade only with each other", "use one language"], "An attack on one is an attack on all."],
  ["The World Health Organization is part of the United Nations and works on…", "public health around the world", ["farm prices", "border walls", "elections"], "It tracks diseases like flu."],
  ["Idaho sells potatoes, cheese and wheat to other countries. Selling goods abroad is called…", "exporting", ["importing", "borrowing", "taxing"], "Exports leave the country."],
  ["Wheat from northern Idaho is loaded onto river barges at Lewiston and sold to countries in…", "Asia", ["Antarctica", "the Arctic", "outer space"], "Barges carry it toward the Pacific Ocean."],
  ["Computer memory chips made in Boise are sold…", "around the world", ["only in Idaho", "only to Idaho farmers", "nowhere"], "Electronics are among Idaho's top exports."],
  ["Cheese made from the milk of Idaho dairy cows and sold in other countries is one of Idaho's…", "exports", ["imports", "taxes", "treaties"], "Idaho is one of the top dairy states."],
  ["When other countries put tariffs on US farm goods, Idaho farmers can be hurt because…", "buyers abroad pay more and buy less", ["crops stop growing", "farms close by law", "buyers abroad buy more"], "A tariff is a tax on imports."],
  ["A benefit of globalization for Idaho farmers is…", "more buyers for their crops", ["no competition", "fixed prices forever", "no need for trade"], "World markets are big."],
  ["A challenge of globalization for some Idaho workers is that…", "factories can move to other countries", ["prices never change", "jobs never change", "no goods are imported"], "Some jobs move where costs are lower."],
  ["Norman Borlaug won the Nobel Peace Prize in 1970 for…", "breeding wheat that fed millions", ["building tractors", "ending a war", "exploring space"], "His work is called the Green Revolution."],
  ["A treaty is effective when countries…", "follow it and enforce it", ["sign it and ignore it", "keep it secret", "never meet"], "Enforcement is the hard part."],
  ["The Paris Agreement of 2015 is a treaty about…", "climate change", ["trade in potatoes", "space travel", "Olympic games"], "Nations set goals to cut emissions."],
  ["The Geneva Conventions are international laws about…", "how prisoners and civilians are treated in war", ["trade in wheat", "school rules", "sports"], "They protect people who aren't fighting."],
  ["Imports Idaho families buy, like phones and clothes, often come from…", "Asia", ["Idaho farms", "the moon", "the Arctic"], "Global trade brings goods from far away."],
  ["Comparative advantage means a place should make what it…", "can make at the lowest opportunity cost", ["likes the most", "never sells", "buys from others"], "Idaho's soil and irrigation give it an advantage in potatoes."],
  ["The International Space Station is run by several countries working together. This is an example of…", "international cooperation", ["a trade war", "an embargo", "a tariff"], "Some goals are too big for one country."],
  ["A tariff on imported steel makes… cost more in Idaho.", "goods made with that steel", ["sunlight", "river water", "fresh air"], "Tariffs raise prices for buyers."],
  ["Forest fires that spread across borders and smoke that drifts between countries are examples of…", "global issues that need cooperation", ["purely local problems", "trade agreements", "tariffs"], "Smoke doesn't stop at borders."],
  ["Many international students come to Idaho's universities to study fields such as…", "farming science and engineering", ["deep sea fishing", "glacier mapping on ice sheets", "desert camel herding"], "Universities draw students from many countries.", true],
  ["Why might a trade agreement be good for Idaho but hard for some workers elsewhere?", "trade creates winners and losers", ["trade helps everyone equally", "trade never changes jobs", "trade is illegal"], "Think about who gains and who loses.", true],
  ["When the world price of wheat falls, Idaho wheat farmers…", "earn less for each bushel", ["earn more", "are not affected", "stop paying taxes"], "Idaho farms are tied to world markets.", true],
  ["The United Nations Security Council has five permanent members that can…", "veto its decisions", ["elect the President", "print money", "end treaties alone"], "They are the US, UK, France, Russia and China.", true],
  ["Why do countries join international organizations?", "to solve problems no country can solve alone", ["to give up all their laws", "to stop trading", "to avoid other countries"], "Disease, trade and war cross borders.", true],
];

export const SOCIAL_7: Unit[] = [
  bankUnit({
    id: "id-g7-idaho-in-the-world",
    title: "Idaho in the World",
    emoji: "🌎",
    blurb: "Trade, treaties and world organizations",
    parentNote: "How Idaho is connected to the world: exports of potatoes, cheese, wheat and computer chips, tariffs and their effect on farmers, comparative advantage, international organizations (the United Nations, NATO, the World Trade Organization and the World Health Organization), treaties such as the Paris Agreement and the Geneva Conventions, global issues like wildfire smoke, and the benefits and challenges of globalization.",
    standards: ["6-9.WG.5.5; 6-9.WG.3.5; 6-9.WG.5.6", "the costs and benefits of global connections and international organizations, economic links between Idaho and the world, and global issues"],
    items: WORLD,
  }),
];
