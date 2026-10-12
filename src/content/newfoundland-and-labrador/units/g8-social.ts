import { bankUnit, type Q } from "../own";

// Grade 8 social studies, Newfoundland and Labrador: making a living, from the 1800s to Confederation. The Grade 8 course
// studies the province’s history; this unit covers the economy and society (the salt fish trade and the credit system,
// the seal hunt, the railway, mines and paper mills, unions, and links with the wider world), next to the existing unit on
// Confederation. The grade guide is not public, so the unit cites the Grade 9 key stage.
//
// Sources checked (anything that could not be confirmed was left out):
// - Heritage NL (heritage.nf.ca, Memorial University): "The Truck System", "The Labrador Fishery", "The Seal Fishery",
//   "The 1914 Sealing Disaster", "Newfoundland Railway", "The Bank Crash of 1894", "The Great Fire of 1892",
//   "Bell Island Mines", "Grand Falls" and "Corner Brook" paper mills, "Buchans", "The Fishermen’s Protective Union",
//   "Women’s Suffrage", "Dominion Status", "The Great Depression", "Beaumont-Hamel" and "Communications" (Heart’s Content
//   cable, Marconi at Signal Hill)
// - The Canadian Encyclopedia: "William Coaker", "Newfoundland and Labrador and the First World War", "Gander"
// - Veterans Affairs Canada: Beaumont-Hamel Newfoundland Memorial (July 1, 1916)

const ECONOMY: Q[] = [
  ["In the 1800s, what was Newfoundland’s most important export?", "salted, dried cod", ["wheat", "gold", "cotton"], "Fish was the backbone of the economy."],
  ["What was a fish flake?", "a wooden platform for drying salted cod", ["a kind of fishing net", "a small boat", "a coin"], "Fish dried in the sun and wind on it."],
  ["Under the credit (truck) system, how did a fishing family usually get supplies in spring?", "on credit from a merchant, to be paid back with fish in the fall", ["with cash from a bank loan", "free from the government", "by trading with other fishers only"], "The merchant set the price of both the supplies and the fish."],
  ["Why did many fishing families stay in debt under the credit system?", "Merchants set prices, and a poor catch did not cover the bill", ["Fish was always worth more than supplies", "Families were paid in gold", "There were no merchants"], "Little cash changed hands."],
  ["Where was much of Newfoundland’s salt fish sold?", "southern Europe, the Caribbean and Brazil", ["China and Japan", "the Prairies", "Australia"], "Warm countries needed fish that would keep."],
  ["What was the Labrador fishery?", "fishing each summer along the Labrador coast by crews from the island and from Labrador", ["fishing only in rivers", "a winter ice-fishing contest", "a fish market in St. John’s"], "Thousands of people went there every summer."],
  ["In the Labrador fishery, what were “floaters”?", "crews who fished from schooners and moved along the coast", ["people who could not swim", "fish that floated", "crews who stayed on shore all year"], "Their schooners were their base."],
  ["What were seals hunted for in the spring seal hunt?", "their oil and skins", ["their teeth", "their bones only", "their milk"], "Seal oil was used for lamps and machines."],
  ["What kind of ships carried sealers to the ice from the mid-1800s?", "steamers", ["rowboats", "canoes", "submarines"], "Steam power made the ships stronger in ice."],
  ["In the 1890s, what was built to connect St. John’s with the west coast of the island?", "a railway", ["a highway", "an airport", "a canal"], "It ran to Port aux Basques."],
  ["Why did the government want a railway across the island?", "to open the interior to mining, forestry and farming", ["to stop the fishery", "to carry tourists only", "to join the island to Labrador"], "Leaders hoped to rely less on fish alone."],
  ["What does it mean to diversify an economy?", "to depend on more kinds of industries", ["to depend on one industry", "to close all businesses", "to stop trading"], "Do not put all your eggs in one basket."],
  ["Which mineral was mined on Bell Island from 1895 to 1966?", "iron ore", ["gold", "diamonds", "coal"], "The mines ran under Conception Bay."],
  ["Which town grew around a paper mill that opened in 1909?", "Grand Falls", ["Nain", "Brigus", "Trinity"], "The mill made newsprint."],
  ["Which west coast city grew around a large paper mill that opened in 1925?", "Corner Brook", ["Bonavista", "Placentia", "Twillingate"], "It is on the Humber Arm."],
  ["What is newsprint?", "cheap paper used to print newspapers", ["a kind of fish", "a metal", "a fishing boat"], "Pulp from trees is pressed into paper."],
  ["Who founded the Fishermen’s Protective Union in 1908?", "William Coaker", ["Joey Smallwood", "Philip Francis Little", "Robert Bond"], "He wanted fairer treatment for fishers."],
  ["What was one goal of the Fishermen’s Protective Union?", "fairer prices and better conditions for fishers", ["higher profits for merchants only", "closing all schools", "ending the fishery"], "A union speaks for its members."],
  ["What is a co-operative business?", "a business owned and run by its members", ["a business owned by one rich person", "a government office", "a bank in another country"], "Members share decisions and profits."],
  ["What happened in St. John’s on July 8, 1892?", "a great fire destroyed much of the city", ["the railway opened", "Confederation began", "the first airplane landed"], "Thousands of people lost their homes."],
  ["In December 1894, Newfoundland’s two main banks closed. What is this event called?", "the Bank Crash", ["the Great Fire", "the Commission", "the Referendum"], "Many people lost their savings."],
  ["In 1907, Newfoundland became a…", "dominion within the British Empire", ["province of Canada", "colony of France", "state of the United States"], "It was self-governing, like Canada and Australia."],
  ["In 1925, which group of people gained the right to vote in Newfoundland?", "women aged 25 and over", ["children", "all people over 16", "only merchants"], "Men could vote from age 21."],
  ["On July 1, 1916, the Newfoundland Regiment suffered terrible losses at which battle?", "Beaumont-Hamel", ["Vimy Ridge", "Waterloo", "Hastings"], "July 1 is Memorial Day in the province."],
  ["During the Great Depression of the 1930s, what happened to the price of fish?", "it fell sharply", ["it doubled", "it stayed the same", "fish became free"], "Many families could not earn a living."],
  ["What was “the dole” in the 1930s?", "a small amount of public relief for people in need", ["a fishing boat", "a type of bread", "a railway station"], "It was about six cents a day per person."],
  ["In 1866, a lasting telegraph cable across the Atlantic was landed at which Newfoundland community?", "Heart’s Content", ["Gander", "Grand Falls", "Corner Brook"], "Messages could cross the ocean in minutes.", true],
  ["In 1901, Guglielmo Marconi received the first transatlantic wireless signal at which place?", "Signal Hill, St. John’s", ["Cape Spear", "Bell Island", "Port aux Basques"], "The signal came from England.", true],
  ["In 1914, 78 sealers from the SS Newfoundland died after being left on the ice in a storm. What did the disaster lead to?", "calls for safer rules for the seal hunt", ["the end of all fishing", "the building of the railway", "Confederation"], "People asked why the men had been put in danger.", true],
  ["How does the credit system show an imbalance of power?", "Merchants controlled both the price of supplies and the price of fish", ["Fishers set all prices", "Banks gave fishers free money", "Prices were set by a vote"], "Think about who made the decisions.", true],
  ["Why did mining and paper mills change life for many families?", "They offered paid work for wages, not credit", ["They ended all work", "They paid only in fish", "They closed the towns"], "Cash wages were new for many people.", true],
  ["Which mine, opened in 1928 in central Newfoundland, produced lead, zinc and copper?", "Buchans", ["Bell Island", "Voisey’s Bay", "Wabush"], "A town grew up around it.", true],
  ["During the Second World War, why did Gander become important?", "Its airport was a base for planes crossing the Atlantic", ["It was the capital city", "It had the only railway", "It was a fishing port"], "It was one of the largest airports in the world at the time.", true],
  ["Why did depending mostly on the fishery make Newfoundland’s economy risky?", "A bad catch or low fish prices hurt almost everyone", ["Fish never run out", "Fish prices never change", "Everyone worked in mining"], "Think about the 1930s.", true],
  ["Which is a primary source about life in an outport in the 1890s?", "a merchant’s account book from that time", ["a history website written last year", "a modern novel", "a documentary made in 2015"], "A primary source comes from the time studied.", true],
  ["How did economic hardship in the 1930s help lead to the Commission of Government?", "The government could not pay its debts", ["Fish prices were too high", "Too many people were rich", "Britain asked to join Newfoundland"], "Debt grew as income fell.", true],
  ["Why might a fisher and a merchant in 1900 describe the credit system differently?", "Their interests and experiences of it were different", ["One of them never saw fish", "They spoke different languages", "Only one of them lived there"], "Perspective shapes how people see events.", true],
];

export const economy = bankUnit({
  id: "nl-economy-8",
  title: "Making a Living, 1800s to 1949",
  emoji: "🐟",
  blurb: "Salt fish, the credit system, railways, mines and mills.",
  parentNote:
    "Grade 8 looks at how people in Newfoundland and Labrador earned a living before 1949: the salt fish trade and the credit system, the seal hunt, the railway, mines, paper mills and the fishers’ union. Ask your child why depending on one industry was risky.",
  standards: [
    "Individuals, societies and economic decisions (by Grade 9)",
    "how the fishery, the credit system, the railway, mines and mills shaped the economy and daily life of Newfoundland and Labrador before 1949",
  ],
  items: ECONOMY,
});
