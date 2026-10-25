import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Massachusetts Grade 4 social studies: ancient and classic civilizations of North America and how archaeologists
// study them (4.T2), and the five regions of the United States (4.T4a to 4.T4e). Native content is light and in the
// present tense, with nothing sacred or ceremonial; the archaeological sites are named as places people visit today.

const FIRST_PEOPLES: Q[] = [
  ["People who study the past by digging up objects people left behind are…", "archaeologists", ["astronauts", "architects", "pilots"], "They work at sites called digs."],
  ["Objects made by people long ago, like tools and pottery, are called…", "artifacts", ["fossils", "minerals", "maps"], "Archaeologists study them."],
  ["Why do archaeologists dig slowly and carefully?", "to record exactly where each object was found", ["to make the hole deeper", "to find gold faster", "to plant gardens"], "Where something lies tells part of the story."],
  ["Many scientists think the first people in North America came…", "from Asia, by land or along the coast, more than 15,000 years ago", ["from Europe on the Mayflower", "from Australia by plane", "only 500 years ago"], "Scientists keep testing different theories."],
  ["Many Native nations have their own accounts of their origins that say they…", "have always lived on their homelands", ["came on the Mayflower", "arrived from Europe", "came from the Moon"], "These accounts are an important way of knowing too."],
  ["Cahokia, near the Mississippi River, was a large city built by…", "Mississippian peoples", ["Vikings", "Romans", "Pilgrims"], "Its biggest earthen mound is called Monks Mound."],
  ["The Mississippian peoples are known for building…", "large earthen mounds", ["pyramids of glass", "steel bridges", "railroads"], "Some mounds held buildings on top."],
  ["Mesa Verde is known for homes built…", "into cliffs", ["on ice", "under the sea", "in treetops"], "Ancestral Puebloan people built them."],
  ["The Ancestral Puebloans lived in what is now the…", "Southwest of the United States", ["Northeast coast", "Arctic", "Florida Keys"], "It is a dry land of mesas and canyons."],
  ["Today's Pueblo peoples, such as the Hopi and Zuni, are…", "descendants of the Ancestral Puebloans", ["Vikings", "Spanish explorers", "Pilgrims"], "Their communities live in the Southwest today."],
  ["A culture region is…", "an area where people shared similar ways of life", ["a single city", "a kind of weather", "a sports league"], "Climate and resources shaped how people lived."],
  ["Native Peoples of the Northwest Coast are known for…", "fishing for salmon and building cedar plank houses", ["herding camels", "growing rice", "building igloos only"], "Tall cedar trees grow there."],
  ["Many Plains nations long ago depended on the…", "bison", ["kangaroo", "camel", "penguin"], "Bison gave food, clothing and shelter."],
  ["Native Peoples of the Eastern Woodlands often grew…", "corn, beans and squash", ["wheat, rice and coffee", "only oranges", "cotton and sugar"], "These are called the Three Sisters."],
  ["Inuit and other peoples of the Arctic are known for…", "hunting seals and fishing in a cold climate", ["growing bananas", "building pyramids", "desert farming"], "They live in the far North today."],
  ["How did geography shape the homes of Native Peoples?", "people built with materials found nearby", ["everyone built the same house", "homes came from Europe", "homes were bought in stores"], "Wood, bark, clay or hides, depending on the place."],
  ["National parks and monuments, like Mesa Verde, protect…", "archaeological sites so people can learn from them", ["shopping malls", "airports", "new apartment buildings"], "They are preserved for everyone.", true],
  ["Radiocarbon dating helps archaeologists find…", "how old something is", ["what color it was", "who owned it", "how heavy it is"], "It measures carbon in old materials.", true],
  ["Archaeologists shake soil through a… to find tiny artifacts.", "screen", ["telescope", "magnet", "megaphone"], "Small beads and chips stay behind.", true],
  ["Why do archaeologists talk with Native nations about sites?", "the sites are part of those nations' history", ["to sell the artifacts", "to get permission to build malls", "because they want new names"], "Native nations care for their ancestors' places.", true],
  ["Chaco Canyon was a center of trade and building for…", "Ancestral Puebloan peoples", ["Vikings", "Aztecs only", "English colonists"], "Its great houses had hundreds of rooms.", true],
  ["What can trade goods found far from their source tell archaeologists?", "that people traded over long distances", ["that people never traveled", "that the objects fell from the sky", "nothing at all"], "Shells from the ocean have been found far inland.", true],
  ["Which statement about Native Peoples is true?", "there are many nations with different languages and cultures", ["they are all one nation", "they all lived the same way", "they no longer exist"], "Hundreds of nations live in North America today.", true],
  ["A theory is…", "an explanation scientists test with evidence", ["a proven fact that never changes", "a kind of artifact", "a story about dragons"], "New evidence can change a theory.", true],
  ["Native nations in the United States today often have their own…", "governments", ["kings from Europe", "currency only", "space programs"], "Tribal governments make decisions for their nations.", true],
];

const REGIONS: Q[] = [
  ["How many regions do maps of the United States often divide it into?", "5", ["2", "13", "50"], "Northeast, Southeast, Midwest, Southwest and West."],
  ["Massachusetts is in which region?", "the Northeast", ["the Southeast", "the Midwest", "the West"], "So are the other New England states."],
  ["Which state is in the Northeast?", "Pennsylvania", ["Georgia", "Iowa", "Nevada"], "It is west of New Jersey."],
  ["Which state is in the Southeast?", "Georgia", ["Vermont", "Kansas", "Utah"], "Its capital is Atlanta."],
  ["Which state is in the Midwest?", "Iowa", ["Maine", "Florida", "Arizona"], "It is known for corn farms."],
  ["Which state is in the Southwest?", "Arizona", ["Ohio", "Delaware", "Montana"], "It has the Grand Canyon."],
  ["Which state is in the West?", "Utah", ["New York", "Alabama", "Indiana"], "Its capital is Salt Lake City."],
  ["The capital of the United States, Washington, D.C., is in the…", "Southeast region on many maps", ["West", "Midwest", "Southwest"], "It is beside Maryland and Virginia."],
  ["Which region is known for hurricanes along its coasts?", "the Southeast", ["the Midwest", "the Northeast mountains", "the Great Plains"], "Warm ocean water feeds these storms."],
  ["Which region is known for tornadoes and wide, flat farmland?", "the Midwest", ["the Northeast", "the West coast", "the Southeast islands"], "Part of it is called Tornado Alley."],
  ["Which region has deserts, mesas and canyons?", "the Southwest", ["the Northeast", "the Midwest", "the Southeast"], "It is hot and dry."],
  ["Which region has the Rocky Mountains and the Pacific coast?", "the West", ["the Southeast", "the Northeast", "the Midwest"], "Forest fires and drought affect it."],
  ["Texas, Arizona and New Mexico were once part of…", "Mexico", ["France", "Canada", "Russia"], "The United States gained them in the 1800s."],
  ["The largest state by area, in the West, is…", "Alaska", ["Texas", "Rhode Island", "Ohio"], "It is far to the northwest."],
  ["The Great Lakes border many states in the…", "Midwest", ["Southwest", "Southeast", "West coast"], "Michigan touches four of them."],
  ["Which river flows south through the middle of the country?", "the Mississippi River", ["the Charles River", "the Colorado River", "the Hudson River"], "It reaches the Gulf near New Orleans."],
  ["People in the Northeast adapted to cold winters by…", "building warm homes and clearing snow", ["growing bananas", "living in tents all year", "ignoring the weather"], "Snowplows are a common sight.", true],
  ["Why did many factories grow in the Northeast in the 1800s?", "rivers powered mills and ports helped trade", ["it had no rivers", "it was a desert", "it had no cities"], "Lowell's mills used the Merrimack River.", true],
  ["When a hurricane or flood hits, government and citizens often…", "rescue people, give shelter and help rebuild", ["do nothing", "move the state", "close every school forever"], "Neighbors and agencies work together.", true],
  ["Why might people in the West worry about water?", "droughts make water scarce", ["it rains every day", "there is too much ice", "rivers run uphill"], "Much of the West is dry.", true],
  ["Why did people want territories to become states?", "states have a vote in Congress and their own government", ["states pay no taxes", "states have a king", "states don't follow the Constitution"], "Statehood gave people a voice.", true],
  ["Which state was the last to join the United States, in 1959?", "Hawaii", ["Maine", "Texas", "California"], "It is a group of islands.", true],
  ["Which of these is a natural resource of the Midwest?", "rich soil for farming", ["coral reefs", "glaciers", "desert sand dunes"], "Corn and soybeans grow there.", true],
  ["Many Native nations live in every region today, such as the Navajo Nation in the…", "Southwest", ["Northeast", "Southeast", "Midwest"], "It is the largest Native nation by land.", true],
  ["A map that shows the borders of states is a… map.", "political", ["physical", "weather", "star"], "Physical maps show landforms.", true],
];

export const SOCIAL_4: Unit[] = [
  bankUnit({
    id: "ma-g4-first-peoples",
    title: "First Peoples of North America",
    emoji: "🏺",
    blurb: "Archaeology, culture regions and ancient cities",
    parentNote: "How archaeologists study the past, theories and Native accounts of how people came to North America, culture regions of North America, and ancient sites such as Cahokia, Mesa Verde and Chaco Canyon, with Native nations described as living communities today.",
    standards: ["4.T2.1; 4.T2.2; 4.T2.3; 4.T2.4", "origins of people in North America, culture regions, how archaeologists work and preserved archaeological sites"],
    items: FIRST_PEOPLES,
  }),
  bankUnit({
    id: "ma-g4-us-regions",
    title: "Regions of the United States",
    emoji: "🧭",
    blurb: "Northeast, Southeast, Midwest, Southwest and West",
    parentNote: "The five regions of the United States, the states in each, their land, resources and natural hazards (hurricanes, tornadoes, drought and forest fires), how people adapt, and how some states came from land that belonged to Mexico.",
    standards: ["4.T4a.1; 4.T4a.4; 4.T4b.1; 4.T4b.3; 4.T4c.1; 4.T4c.3; 4.T4d.1; 4.T4d.2; 4.T4e.1; 4.T4e.4", "the states in each region of the United States, how people adapt to each region, and natural disasters"],
    items: REGIONS,
  }),
];
