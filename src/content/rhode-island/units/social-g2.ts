import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Rhode Island Grade 2 social studies, living and working together in global communities: migrations and movement
// (SS2.2.3), local cultures and their global connections (SS2.3.1) and global communications (SS2.3.3), told through
// the families from around the world who live in Rhode Island, the ships that reach its ports and the ways people
// share news across the world.

const GLOBAL: Q[] = [
  ["Moving from one country to live in another is called…", "immigration", ["vacation", "recess", "hibernation"], "Many families moved to Rhode Island from other countries."],
  ["Long ago and today, many people came to Rhode Island from Portugal and from islands in the Atlantic called…", "Cape Verde", ["Greenland", "Iceland", "Japan"], "Many Cape Verdean families live in Rhode Island."],
  ["People who move to a new place often bring their…", "foods, languages and traditions", ["houses", "weather", "mountains"], "Culture travels with people."],
  ["Many families in Providence speak Spanish. Spanish is a…", "language", ["food", "holiday", "game"], "People in many countries speak Spanish."],
  ["A reason people move to a new country, like a new job or a safe home, is called a…", "pull", ["push", "shove", "jump"], "Good things pull people toward a new place."],
  ["A reason people leave their home country, like war or no jobs, is called a…", "push", ["pull", "gift", "song"], "Hard times push people away."],
  ["Ships carry cars, salt and other goods into the Port of…", "Providence", ["the Moon", "the Desert", "the Mountains"], "Ships come from ports all over the world."],
  ["Goods that come into our country from other countries are called…", "imports", ["exports", "taxes", "chores"], "Im- means in."],
  ["Goods our country sells to other countries are called…", "exports", ["imports", "recess", "rules"], "Ex- means out."],
  ["Bananas in a Rhode Island store were grown far away because bananas need…", "a warm climate", ["snow", "ice", "a cold ocean"], "Bananas grow in hot places."],
  ["Talking to family in another country on a video call is a kind of…", "communication", ["transportation", "weather", "recess"], "Communication means sharing messages."],
  ["Long ago, a letter to another country traveled by…", "ship", ["email", "text message", "video call"], "It could take weeks to arrive."],
  ["Today, the fastest way to send a message across the world is by…", "the internet", ["horse", "sailing ship", "carrier pigeon"], "Messages arrive in seconds."],
  ["A festival with music and food from Cape Verde, Portugal or the Dominican Republic shows Rhode Island's…", "many cultures", ["weather", "mountains", "rivers"], "Our state is made of many cultures."],
  ["Many people in Rhode Island are Portuguese American. Their families' homeland, Portugal, is in…", "Europe", ["Asia", "Antarctica", "Australia"], "Portugal is in the southwest of Europe."],
  ["The Dominican Republic, the homeland of many Rhode Island families, is an island country in the…", "Caribbean Sea", ["Arctic Ocean", "Sahara", "Great Lakes"], "It shares an island with Haiti."],
  ["People who make things in one country and sell them in another are doing…", "trade", ["recess", "homework", "sleep"], "Trade connects communities around the world."],
  ["When people from many places live in one community, they can learn…", "from each other", ["nothing at all", "only one language", "to stop sharing"], "Sharing cultures helps everyone."],
  ["A word in English that came from another language, like taco or piano, shows how cultures…", "share and mix", ["never meet", "stay apart", "disappear"], "Languages borrow words."],
  ["Satellites in space help people around the world…", "talk, watch and share news", ["grow bananas", "build boats", "catch fish"], "Satellites send signals around Earth."],
  ["Why might a family from far away choose to live near others from their home country?", "to share language and help each other", ["because they must", "to stop learning English", "to avoid school"], "Communities support newcomers.", true],
  ["A Cambodian, a Liberian and a Guatemalan family all live on one street in Providence. This shows that…", "people come to Rhode Island from all over the world", ["everyone came from one country", "nobody moves anymore", "Providence is in Asia"], "Rhode Island is a global community.", true],
  ["A shirt made in one country with cotton grown in another shows that goods…", "connect many countries", ["come from one place only", "are made on the moon", "never travel"], "Global trade links people.", true],
  ["How did ships help Rhode Island grow long ago?", "they brought people and goods from around the world", ["they made the bay smaller", "they built the mills", "they stopped all travel"], "Rhode Island has always been a sea state.", true],
  ["One good thing about the internet for global communities is that people can…", "learn about other cultures quickly", ["stop talking", "never travel", "forget other places"], "Information travels fast.", true],
  ["Why do people in different countries depend on each other?", "no country makes everything it needs", ["every country makes everything", "they all speak one language", "they all eat the same food"], "Trade helps everyone get what they need.", true],
];

export const SOCIAL_2: Unit[] = [
  bankUnit({
    id: "ri-g2-global-rhode-island",
    title: "Rhode Island & the World",
    emoji: "🌐",
    blurb: "Families, goods and messages from around the world",
    parentNote: "How Rhode Island connects with the world: why people move (push and pull), the Cape Verdean, Portuguese, Dominican and other communities who have made homes here, imports and exports through the Port of Providence, and how people share news across the world.",
    standards: ["SS2.2.3; SS2.3.1; SS2.3.3", "migrations and movement, local cultures and their global connections, and global communications"],
    items: GLOBAL,
  }),
];
