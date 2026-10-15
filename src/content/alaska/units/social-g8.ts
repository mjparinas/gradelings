import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { timelineUnit, type Dated } from "./kit";

// Alaska Grade 8 social studies, U.S. History and Civics: the Alaska connections the Grade 8 standards ask for. The
// peopling of Alaska and the Americas, artifacts and oral histories, and Indigenous place names (SS.8.1.19.1,
// SS.8.1.16.1, SS.8.1.23.1, SS.8.1.24.1, SS.8.1.18.2); the purchase of Alaska as part of US expansion, seen from
// several perspectives (SS.8.6.2.2, SS.8.6.23.1, SS.8.6.8.2, SS.8.2.23.1); and Tribal, state and federal governments
// (SS.8.5.6.3, SS.8.5.6.4, SS.8.1.6.1). Alaska Native content is light, in the present tense, about living communities
// and governments, with nothing sacred or ceremonial.

const FIRST_PEOPLES: Q[] = [
  ["During the last ice age, a wide land called Beringia joined…", "Asia and Alaska", ["Alaska and Hawaii", "Europe and Africa"], "Sea levels were much lower then."],
  ["Why was Beringia dry land during the ice age?", "so much water was frozen in ice sheets that sea levels dropped", ["the ocean dried up from heat", "volcanoes filled the sea"], "Water locked in ice lowers the sea."],
  ["Which is one pull factor that may have drawn early people across Beringia?", "herds of animals to hunt", ["cities with jobs", "railroads"], "Pull factors draw people toward a place."],
  ["Swan Point in the Tanana Valley is one of the oldest known sites in Alaska, about…", "14,000 years old", ["140 years old", "14 million years old"], "Archaeologists dated charcoal and tools there."],
  ["Some scientists think early people traveled south along the Pacific coast by…", "boat", ["train", "airplane"], "This is called the coastal route."],
  ["Monte Verde in Chile shows that people reached South America…", "more than 14,000 years ago", ["only 500 years ago", "after cars were invented"], "People spread quickly through the Americas."],
  ["Archaeologists learn about early people mainly from…", "artifacts such as stone tools and the remains of camps", ["their written diaries", "photographs"], "There were no written records."],
  ["Many Alaska Native oral histories teach that their people…", "have lived on their lands since time began", ["arrived last century", "came from Europe"], "Oral histories are passed down by Elders."],
  ["Why do historians value oral histories?", "they hold knowledge and perspectives passed down for generations", ["they are always exactly the same as science", "they replace all other sources"], "Each kind of source adds something."],
  ["Why are some early coastal sites hard to study?", "rising seas after the ice age covered them", ["they are too new", "people never lived on coasts"], "Evidence can be lost."],
  ["Radiocarbon dating helps archaeologists find…", "how old once-living material is", ["what people said", "the color of old clothing"], "It works on things like bone and charcoal."],
  ["Denali is a Koyukon Athabascan name for Alaska's tallest mountain. It means…", "the high one", ["the cold river", "the small hill"], "Many Alaska place names come from Native languages."],
  ["The name Alaska comes from an Unangam Tunuu word meaning…", "mainland", ["island of ice", "land of gold"], "Unangax̂ people saw the mainland from their islands."],
  ["In 2016, Barrow went back to its Iñupiaq name. What is it?", "Utqiaġvik", ["Juneau", "Sitka"], "It is the northernmost city in the United States."],
  ["The name Mississippi comes from an Ojibwe word meaning…", "great river", ["red rock", "tall forest"], "Indigenous place names are found across the Americas."],
  ["The name Mexico comes from the…", "Mexica people, who built Tenochtitlan", ["Spanish king", "Russian explorers"], "Tenochtitlan is now Mexico City."],
  ["Tlingit society is organized into two halves and many…", "clans", ["states", "kingdoms"], "Clan membership is passed through the mother's family."],
  ["The Haudenosaunee Confederacy united nations under…", "the Great Law of Peace", ["the US Constitution", "a Russian charter"], "It joined the Mohawk, Oneida, Onondaga, Cayuga, Seneca and later the Tuscarora."],
  ["The Inca built a huge network of…", "roads through the Andes", ["railways", "canals across Africa"], "Runners carried messages along the roads."],
  ["Why might two early groups in the Americas have lived in very different ways?", "they adapted to very different environments", ["they all lived in the same place", "they had the same climate"], "Geography shapes ways of life.", true],
  ["An archaeologist finds fish bones and net weights at an old camp by a river. What is a likely conclusion?", "the people there caught fish", ["the people there grew rice", "no one lived there"], "Artifacts are evidence.", true],
  ["Which of the five themes of geography asks how people change and adapt to the land?", "human-environment interaction", ["location", "region"], "The others are place and movement.", true],
  ["Why do scientists still debate exactly when and how people first came to the Americas?", "evidence is scattered, and new finds change the picture", ["no one has ever looked", "the answer is written on a monument"], "Historians revise ideas with new evidence.", true],
  ["Why do Indigenous place names matter to communities today?", "they carry knowledge of the land, history and language", ["they are only decoration", "they are never used"], "Names can describe a place's features or uses.", true],
  ["How do scientists and Elders together add to understanding of the past?", "they bring different kinds of evidence and knowledge", ["only one of them can be right", "neither adds anything"], "Multiple perspectives build fuller history.", true],
];

const EXPANSION_EVENTS: Dated[] = [
  ["The United States buys Louisiana from France", 1803],
  ["Congress passes the Indian Removal Act", 1830],
  ["The Mexican-American War ends and the US gains the Southwest", 1848],
  ["The Gadsden Purchase adds land in the Southwest", 1853],
  ["The United States buys Russia's claim to Alaska", 1867],
  ["The First Organic Act makes Alaska a district with a civil government", 1884],
  ["Gold is found on the beaches of Nome", 1899],
  ["The Alaska Native Brotherhood is founded in Sitka", 1912],
  ["Congress makes Alaska a US territory", 1912],
  ["The Indian Citizenship Act makes Native Americans US citizens", 1924],
];

const PURCHASE: Q[] = [
  ["Who was the US Secretary of State who arranged the purchase of Alaska?", "William Seward", ["Abraham Lincoln", "Thomas Jefferson"], "Critics called it Seward's Folly."],
  ["How much did the United States pay Russia for its claim to Alaska?", "$7.2 million", ["$7.2 billion", "$72"], "That was about 2 cents an acre."],
  ["The flag was raised over Sitka on October 18, 1867. Alaskans remember this day as…", "Alaska Day", ["Statehood Day", "Seward's Day"], "Seward's Day is in March, when the treaty was signed."],
  ["Who was asked whether Alaska should be sold?", "no Alaska Native nation was asked", ["every Alaska Native village voted", "only the Tlingit voted"], "The treaty was made between two empires."],
  ["Some Tlingit leaders said Russia could not sell Alaska because…", "Russia did not own the land", ["it was too cold", "they wanted to buy it themselves"], "Perspectives on land ownership differed."],
  ["Manifest Destiny was the belief that the United States should…", "expand across North America", ["stay east of the Mississippi", "return land to Europe"], "Some leaders saw Alaska as part of that growth."],
  ["Why did some Americans in 1867 think buying Alaska was a mistake?", "they thought it was a frozen wasteland worth little", ["it had too many railroads", "it cost billions"], "Some called it Seward's Icebox."],
  ["What did later discoveries show about the purchase?", "Alaska held great wealth in fish, gold and oil", ["Alaska had no resources", "Russia bought it back"], "Gold rushes came in the 1890s."],
  ["After the purchase, Alaska was first governed mostly by…", "the US Army", ["an elected governor", "the Alaska Legislature"], "Civil government came with the 1884 Organic Act."],
  ["The Louisiana Purchase and the Alaska purchase were both…", "land deals with European empires", ["wars with Mexico", "treaties with no money involved"], "France sold Louisiana; Russia sold Alaska."],
  ["The Indian Removal Act of 1830 forced many Native nations to…", "leave their homelands in the Southeast and move west", ["move to Alaska", "become sailors"], "Many died on forced marches.", true],
  ["Why was the purchase of Alaska also important for trade and defense?", "it gave the US a long Pacific coast near Asia", ["it ended all wars", "it closed the Pacific"], "Location shapes a place's importance.", true],
  ["How did the 1884 Organic Act treat Alaska Native land rights?", "it said Native people should not be disturbed on their lands but left the question for later", ["it gave all land to the Russians", "it settled every land claim at once"], "Land claims were not settled until 1971.", true],
];

const GOVERNMENTS: Q[] = [
  ["About how many federally recognized Tribes are in Alaska?", "229", ["2", "2,000"], "That is more than a third of all Tribes in the United States."],
  ["The relationship between Tribes and the federal government is…", "government-to-government", ["owner and property", "company and customer"], "Tribes are sovereign nations."],
  ["Sovereignty means…", "the power of a people to govern themselves", ["paying no taxes ever", "owning a business"], "Tribes, states and nations have their own powers."],
  ["Which is a service many Alaska Tribal governments provide?", "health care, housing or family services", ["printing US money", "declaring war"], "Tribes run programs for their communities."],
  ["Many Alaska Tribal governments are led by an elected…", "Tribal council", ["king", "army general"], "Members choose their leaders."],
  ["Alaska Native regional corporations are different from Tribes because corporations…", "are businesses owned by shareholders", ["are sovereign nations", "run Tribal courts"], "They were created by a 1971 law."],
  ["Alaska's only Indian reservation is…", "the Metlakatla Indian Community on Annette Island", ["Anchorage", "Fairbanks"], "Most Alaska Tribes do not have reservations."],
  ["The Central Council of the Tlingit & Haida Indian Tribes of Alaska is a…", "regional Tribal government in Southeast Alaska", ["state agency", "federal court"], "It serves many communities."],
  ["Alaska's state government meets in…", "Juneau", ["Anchorage", "Washington, D.C."], "Juneau is Alaska's capital."],
  ["Alaska's state Legislature has how many members?", "60: 40 representatives and 20 senators", ["100: one per city", "9 justices"], "Two houses make up the Legislature."],
  ["Instead of counties, Alaska is divided into…", "boroughs", ["parishes", "provinces"], "Much of Alaska is in the Unorganized Borough."],
  ["Federalism means power is shared between…", "the national government and the states", ["two political parties", "cities only"], "Each level has its own powers."],
  ["Which level of government prints money and runs the military?", "federal", ["state", "borough"], "Some powers belong only to the national government."],
  ["Which level of government runs most public schools in Alaska?", "local school districts under state law", ["the US Army", "foreign governments"], "Education is mostly a state and local job."],
  ["Tribal courts in Alaska often hear cases about…", "children and families", ["international trade", "the US president"], "Tribal courts serve Tribal members."],
  ["The Indian Child Welfare Act of 1978 gives Tribes a role in…", "decisions about Native children in foster care and adoption", ["choosing the governor", "setting fishing prices"], "It keeps children connected to their Tribes."],
  ["Which organization brings Alaska Native peoples together each year to discuss shared issues?", "the Alaska Federation of Natives", ["the United Nations", "the Supreme Court"], "Its convention is one of the largest gatherings in Alaska."],
  ["Why might a village have a Tribal government, a city government and a village corporation?", "each has a different role and set of powers", ["it is a mistake", "they are all the same thing"], "Roles overlap but are not the same.", true],
  ["Why can Tribal, state and federal rules on fishing and hunting conflict?", "each government has powers over different lands and people", ["fish follow only one law", "there are no rules"], "Overlapping powers need cooperation.", true],
  ["How do Tribal health organizations in Alaska get federal funds?", "through agreements to run health programs themselves", ["by selling land to Russia", "they get none"], "Self-governance lets Tribes run their own programs.", true],
  ["Why do Tribal governments in Alaska often work with the state on public safety?", "many villages are far from roads and police", ["the state has no police", "Tribes run the US Army"], "Cooperation fills gaps.", true],
  ["How is a Tribal constitution like the US Constitution?", "both set up a government and limit its powers", ["both were written by Russia", "neither can be changed"], "Constitutions organize power.", true],
  ["In 2022 the State of Alaska passed a law that…", "formally recognized Alaska's federally recognized Tribes", ["ended all Tribal governments", "moved the capital"], "It affirmed a government-to-government relationship.", true],
  ["Which is an example of a state power?", "issuing driver's licenses", ["making treaties with other countries", "coining money"], "States handle many everyday services.", true],
  ["Why do many Alaska Tribes not have reservations?", "the 1971 land claims law set up corporations instead of reservations", ["Tribes refused all land", "reservations are illegal in Alaska"], "Alaska's history differs from other states'.", true],
];

export const SOCIAL_8: Unit[] = [
  bankUnit({
    id: "ak-g8-first-peoples",
    title: "First Peoples of the Americas",
    emoji: "🧭",
    blurb: "Beringia, artifacts, oral histories and place names",
    parentNote: "How people came to live across Alaska and the Americas: Beringia, push and pull factors, what artifacts and oral histories each tell us and the limits of the evidence, how some Indigenous societies organize themselves, and Indigenous place names. Kept light and in the present tense.",
    standards: ["SS.8.1.19.1; SS.8.1.16.1; SS.8.1.23.1; SS.8.1.24.1; SS.8.1.18.2; SS.8.1.6.1", "migration of early people across Alaska and the Americas, artifacts and oral histories, and Indigenous place names"],
    items: FIRST_PEOPLES,
  }),
  timelineUnit({
    id: "ak-g8-alaska-purchase",
    title: "Alaska Joins the United States",
    emoji: "🇺🇸",
    blurb: "The 1867 purchase in the story of US expansion",
    parentNote: "The purchase of Alaska as part of US expansion: Manifest Destiny, the 1867 treaty and its critics, Russian, American and Alaska Native perspectives on land ownership, and the district and territory years, set beside the Louisiana Purchase and Indian Removal, with timeline practice. Perspectives are presented factually and without taking sides.",
    standards: ["SS.8.6.2.2; SS.8.6.23.1; SS.8.6.8.2; SS.8.2.23.1", "perspectives on land ownership and sovereignty, Manifest Destiny and the events of US expansion, and encounters between newcomers and Indigenous peoples"],
    events: EXPANSION_EVENTS,
    items: PURCHASE,
  }),
  bankUnit({
    id: "ak-g8-tribal-state-federal",
    title: "Tribal, State & Federal Governments",
    emoji: "🏛️",
    blurb: "Who governs what in Alaska, and how they work together",
    parentNote: "Federalism and Alaska's three kinds of government: Alaska's 229 Tribes and the government-to-government relationship, the State of Alaska and its boroughs, and the federal government, with the services each provides and how they work together. Alaska Native corporations are explained as businesses, separate from Tribes.",
    standards: ["SS.8.5.6.3; SS.8.5.6.4; SS.8.1.6.1", "the role of state, local and Tribal governments and their relationship to the federal government, and how they meet community needs"],
    items: GOVERNMENTS,
  }),
];
