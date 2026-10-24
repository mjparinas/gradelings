import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Ohio Grade 2 social studies: Ohio's regions and how manufacturing, farming and business shaped its communities
// (Statements 7 and 8).

const REGIONS: Q[] = [
  ["Ohio's big lake in the north is…", "Lake Erie", ["Lake Superior", "Salt Lake"], "It is one of the Great Lakes."],
  ["Ohio's southern border is a river called the…", "Ohio River", ["Mississippi River", "Rio Grande"], "Barges carry goods on it."],
  ["Long ago, giant sheets of ice called… flattened much of Ohio.", "glaciers", ["volcanoes", "deserts"], "They left flat land and rich soil."],
  ["Western Ohio has flat land and rich soil. It is a great place for…", "farms", ["ski hills", "ocean ports"], "Farmers grow corn and soybeans there."],
  ["Two crops many Ohio farmers grow are…", "corn and soybeans", ["bananas and coffee", "rice and pineapples"], "They grow well on flat, rich land."],
  ["Southeastern Ohio is part of the hilly…", "Appalachian Plateau", ["Great Plains", "Rocky Mountains"], "It has hills, forests and valleys."],
  ["Hocking Hills in southern Ohio is known for its…", "caves, cliffs and waterfalls", ["sand dunes", "volcanoes"], "People go there to hike."],
  ["The land along Lake Erie is mostly…", "flat", ["mountains", "desert"], "This region is called the Lake Plains."],
  ["Which Ohio city is on Lake Erie?", "Cleveland", ["Cincinnati", "Columbus"], "It has a big port."],
  ["Which Ohio city is on the Ohio River?", "Cincinnati", ["Toledo", "Cleveland"], "It is in the southwest corner."],
  ["Which city is near the middle of Ohio?", "Columbus", ["Toledo", "Cleveland"], "It is the capital."],
  ["Ohio's only national park is…", "Cuyahoga Valley National Park", ["Yellowstone", "Grand Teton"], "It is between Cleveland and Akron."],
  ["A factory where workers build cars is part of…", "manufacturing", ["farming", "fishing"], "Manufacturing means making goods."],
  ["Many cars are made in Ohio. Making cars is an example of…", "manufacturing", ["mining", "tourism"], "Factories make goods."],
  ["Toledo is called the Glass City because it…", "makes a lot of glass", ["is made of glass", "has glass roads"], "Glass factories grew there."],
  ["Akron is known for making…", "tires", ["boats", "chocolate"], "Big tire companies started there."],
  ["Farms, factories and stores are all kinds of…", "businesses", ["holidays", "weather"], "They give people jobs.", true],
  ["Why did many factories start near Lake Erie and the Ohio River?", "ships could carry goods to and from them", ["the water made the factories float", "there was no land anywhere else"], "Water was the best road.", true],
  ["How is southeastern Ohio different from western Ohio?", "it is hilly with forests, while the west is flat farmland", ["it has more flat farmland", "they are exactly the same"], "Think about the glaciers.", true],
  ["Why do many people in big Ohio cities work in factories, offices and stores?", "there are many businesses there", ["cities have more farmland", "nobody lives in cities"], "Jobs bring people to cities.", true],
  ["When a new factory opens in a town, what often happens?", "more people get jobs there", ["everyone moves away", "the town closes its schools"], "Businesses shape communities.", true],
  ["A dairy farm in Ohio gives us…", "milk", ["steel", "glass"], "Cows make milk.", true],
  ["Coal was dug out of the ground in southeastern Ohio. This is called…", "mining", ["fishing", "farming"], "Miners work underground or in pits.", true],
  ["Why do Ohio's regions have different jobs?", "each has different land and resources", ["each has the same land", "jobs are picked by the weather"], "Land shapes how people live.", true],
  ["A region is…", "an area that shares features, like land or jobs", ["one single house", "a kind of food"], "Ohio has several regions.", true],
];

export const SOCIAL_2: Unit[] = [
  bankUnit({
    id: "oh-g2-ohio-regions",
    title: "Ohio's Regions",
    emoji: "🌽",
    blurb: "Farms, hills, lakes and factories",
    parentNote: "Ohio's regions (the flat Lake Plains and farmland left by glaciers, the hilly Appalachian Plateau), Lake Erie and the Ohio River, its big cities, Cuyahoga Valley National Park, and how farming, manufacturing (cars, Toledo's glass, Akron's tires) and business shaped its communities.",
    standards: ["Statement 7; Statement 8", "how manufacturing, agriculture and business shaped Ohio's communities, and how Ohio's regions are alike and different"],
    items: REGIONS,
  }),
];
