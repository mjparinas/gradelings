import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Alaska Grade 4 social studies, U.S. Cultures and Regions: the five regions of the United States, their resources and
// economies (SS.4.1.11.1, SS.4.2.14.1, SS.4.1.16.1), and Alaska's own industries and its ties to the nation and the world
// (SS.4.1.15.1, SS.4.1.20.1, SS.4.1.20.2, SS.4.1.25.1). The rest of the year adopts general map and history units.

const REGIONS: Q[] = [
  ["The United States is often split into five regions. Which is one of them?", "the Southwest", ["the Far East", "the Arctic Ocean"], "The five are the Northeast, Southeast, Midwest, Southwest and West."],
  ["Alaska is part of which US region?", "the West", ["the Northeast", "the Midwest"], "Alaska and Hawaii are both in the West."],
  ["Which region is known for farms that grow corn and wheat on wide, flat plains?", "the Midwest", ["the Northeast", "the Southwest"], "It is sometimes called America's breadbasket."],
  ["Which region has the oldest cities, like Boston and Philadelphia?", "the Northeast", ["the Southwest", "the West"], "Many of the first colonies were there."],
  ["Which region has deserts, canyons and mesas?", "the Southwest", ["the Northeast", "the Midwest"], "The Grand Canyon is in Arizona."],
  ["Which region has a warm, wet climate where cotton, peanuts and oranges grow?", "the Southeast", ["the Midwest", "the West"], "Florida and Georgia are there."],
  ["The Rocky Mountains run through which region?", "the West", ["the Northeast", "the Southeast"], "Colorado and Montana are Rocky Mountain states."],
  ["The Great Lakes border which region?", "the Midwest", ["the Southwest", "the West"], "Chicago and Detroit are on the Great Lakes."],
  ["Which river is the longest in the United States?", "the Missouri River", ["the Yukon River", "the Hudson River"], "The Mississippi is close behind."],
  ["Natural resources are…", "things from nature that people use", ["things made in factories", "people who work"], "Water, trees, oil and fish are natural resources."],
  ["Human capital means…", "the skills and knowledge of workers", ["a state capital", "money in a bank"], "Training and school build human capital."],
  ["Physical capital means…", "tools, machines and buildings used to make goods", ["the land itself", "a person's name"], "A fishing boat is physical capital."],
  ["A fishing boat in Alaska is an example of…", "physical capital", ["a natural resource", "human capital"], "It is a tool used to catch fish."],
  ["A skilled nurse's training is an example of…", "human capital", ["a natural resource", "physical capital"], "Skills and knowledge are human capital."],
  ["Coal in the Appalachian Mountains is an example of…", "a natural resource", ["human capital", "physical capital"], "It comes from the earth."],
  ["Why do many factories grow up near rivers and ports?", "goods can be shipped easily", ["rivers are quiet", "nobody lives there"], "Water travel moves heavy goods cheaply."],
  ["Why does the Midwest grow so much corn?", "it has rich soil and flat land", ["it has deserts", "it is always snowy"], "Geography shapes what people produce."],
  ["Oil and cattle ranching are important in Texas, in which region?", "the Southwest", ["the Northeast", "the Midwest"], "Texas has wide grasslands and oil fields."],
  ["Why do regions trade with one another?", "each produces different things", ["every region makes the same things", "trade is not allowed"], "Trade lets people get what their region does not make."],
  ["People in hot desert places often build houses with…", "thick walls and shade to stay cool", ["glass roofs to catch sun", "no windows or doors"], "People adapt homes to the climate."],
  ["Which tourist activity fits Florida's beaches in the Southeast?", "swimming and boating", ["dog mushing", "ice fishing"], "Warm weather draws visitors."],
  ["Why do people in the Northeast often build steep roofs?", "so heavy snow slides off", ["to catch rain for drinking", "to look like mountains"], "Steep roofs help in snowy winters."],
  ["Many places in the Southwest have Spanish names. Why?", "Spain once claimed that land", ["Spain is next to Texas", "it is a law"], "Culture leaves its mark on a region.", true],
  ["A Midwest farmer and an Alaska fisher both depend on…", "natural resources and the weather", ["the same crops", "living by the ocean"], "Both depend on what nature provides.", true],
  ["When a drought dries up farms in one region, why can food cost more in Alaska?", "Alaska buys much of its food from other regions", ["Alaska grows all its own food", "droughts never matter"], "Regional economies are connected.", true],
  ["Why do many people move to a region?", "to find jobs, family or a climate they like", ["because it has no stores", "because it is far from everyone"], "People follow work and opportunity.", true],
];

const ALASKA_NATION: Q[] = [
  ["Which industry brings in the most money for Alaska's state government?", "oil and gas", ["cotton farming", "car making"], "Oil from the North Slope has paid for much of the state budget."],
  ["Prudhoe Bay, on the North Slope, is famous for…", "oil fields", ["orange groves", "skyscrapers"], "Oil was found there in 1968."],
  ["What carries oil 800 miles from Prudhoe Bay to Valdez?", "the Trans-Alaska Pipeline", ["the Alaska Railroad", "a river"], "Tankers carry the oil from Valdez by sea."],
  ["Which Alaska industry catches salmon, pollock and crab?", "commercial fishing", ["mining", "lumber"], "Alaska lands more seafood than any other state."],
  ["Bristol Bay in Southwest Alaska is famous for its…", "sockeye salmon run", ["gold mines", "corn fields"], "It is the largest sockeye run in the world."],
  ["Visitors come to Alaska on cruise ships to see glaciers and wildlife. That industry is…", "tourism", ["mining", "fishing"], "Most cruise visitors arrive in summer."],
  ["Gold, zinc and other metals dug from the ground are part of the…", "mining industry", ["tourism industry", "fishing industry"], "The Red Dog Mine is one of the world's largest zinc mines."],
  ["Which Alaska city grew up as a gold-rush town in the Interior?", "Fairbanks", ["Ketchikan", "Kodiak"], "Gold was found nearby in 1902."],
  ["Why did Ketchikan and Sitka grow in Southeast Alaska?", "fishing, timber and later tourism", ["oil fields", "wheat farms"], "Their forests and waters provide resources."],
  ["Why did Anchorage first grow?", "it was a camp for building the Alaska Railroad", ["it was a gold mine", "it was a cruise port"], "Anchorage began as a tent city in 1915."],
  ["Many military bases in Alaska are there because…", "Alaska is close to Asia and the Arctic", ["it is always warm", "it has no airports"], "Its location matters for the nation's defense."],
  ["Anchorage's airport is one of the busiest in the world for…", "cargo planes", ["space rockets", "hot-air balloons"], "Planes between Asia and North America stop there."],
  ["Most of Alaska uses which time zone?", "Alaska Time", ["Eastern Time", "Hawaii Time only"], "Part of the western Aleutians uses Hawaii-Aleutian Time."],
  ["When it is 12 noon in Anchorage, what time is it in New York?", "4 p.m.", ["8 a.m.", "12 noon"], "Eastern Time is 4 hours ahead of Alaska Time."],
  ["When it is 3 p.m. in Juneau, what time is it in Chicago (Central Time)?", "6 p.m.", ["12 noon", "3 p.m."], "Central Time is 3 hours ahead of Alaska Time."],
  ["Why does the time change as you travel east across the United States?", "the sun rises earlier in the east", ["clocks are broken there", "each state picks a random time"], "Earth turns toward the east."],
  ["Much of Alaska's food and goods arrive by…", "ship, barge and plane", ["horse and wagon", "pipeline"], "Most goods come north by sea."],
  ["Why do groceries cost more in a remote Alaska village?", "goods must be flown or barged in", ["villages charge for fun", "food grows there for free"], "Shipping far adds cost."],
  ["During World War II, Japan occupied two of Alaska's…", "Aleutian Islands", ["largest cities", "oil fields"], "Attu and Kiska were occupied in 1942."],
  ["The Alaska Highway was built in 1942 to…", "connect Alaska with the lower 48 through Canada during the war", ["link Alaska to Russia", "reach Hawaii"], "It was built in about eight months."],
  ["The Permanent Fund Dividend is money…", "paid to eligible Alaskans from oil savings", ["borrowed from the bank", "collected from tourists only"], "Alaskans voted to save some oil money in 1976."],
  ["When world oil prices fall, what happens to Alaska's state budget?", "it has less money", ["it has more money", "nothing changes"], "Global events reach Alaska.", true],
  ["Fish caught in Alaska are sold in Japan and Europe. This shows that Alaska…", "is part of a global economy", ["trades with nobody", "eats all its own fish"], "Alaska exports seafood around the world.", true],
  ["How did the gold rushes change Alaska's regions?", "towns, trails and railroads grew where gold was found", ["nothing changed", "everyone left Alaska"], "Skagway, Nome and Fairbanks grew fast.", true],
  ["Why is fishing such an important industry along Alaska's coast?", "Alaska has a long coastline with rich ocean waters", ["fish only live in Alaska", "Alaska has no land"], "Alaska has more coastline than all other states together.", true],
  ["How can a storm or volcano far away affect Alaska?", "it can stop planes and ships that bring goods", ["it never can", "it makes oil cheaper"], "Alaska depends on travel and shipping.", true],
];

export const SOCIAL_4: Unit[] = [
  bankUnit({
    id: "ak-g4-us-regions",
    title: "Regions of the United States",
    emoji: "🗺️",
    blurb: "Land, resources and work in the five US regions",
    parentNote: "The five regions of the United States (Northeast, Southeast, Midwest, Southwest and West) and how their land, climate and resources shape the work people do, with natural resources, human capital and physical capital, and why regions trade.",
    standards: ["SS.4.1.11.1; SS.4.2.14.1; SS.4.1.16.1", "human capital, physical capital and natural resources in US regions, how regional economies connect, and how people adapt to each region's environment"],
    items: REGIONS,
  }),
  bankUnit({
    id: "ak-g4-alaska-and-the-nation",
    title: "Alaska and the Nation",
    emoji: "🛢️",
    blurb: "Oil, fish, tourism, time zones and world events",
    parentNote: "Alaska's industries (oil and gas, fishing, mining, tourism and the military), how its regions and cities grew, Alaska Time and other US time zones, shipping and the cost of goods, and how national and world events like World War II and oil prices reach Alaska.",
    standards: ["SS.4.1.15.1; SS.4.1.20.1; SS.4.1.20.2; SS.4.1.25.1", "the significance of Alaska's industries, how its regions grew through economic activity and resources, and how national and global events affect Alaska"],
    items: ALASKA_NATION,
  }),
];
