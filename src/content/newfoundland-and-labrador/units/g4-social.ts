import { bankUnit, type Q } from "../own";

// Grade 4 social studies, Newfoundland and Labrador: exploration. The Atlantic Canada social studies program teaches
// exploration in Grade 4 (what exploration is, why people explore, explorers’ stories, and the tools of exploration then
// and now). The grade guide is not public, so the units cite the Grade 6 key stage of the matching strands. These units
// stay with world and space exploration; how European exploration affected Indigenous peoples is left to the existing,
// partner-reviewed units (see gradelings-research/newfoundland-and-labrador/README.md, "Review needed").
//
// Sources checked (anything that could not be confirmed was left out):
// - The Canadian Encyclopedia: "Jacques Cartier", "Samuel de Champlain", "Henry Hudson", "Northwest Passage",
//   "Franklin Search", "Roald Amundsen", "Robert Abram Bartlett", "Marc Garneau", "Roberta Bondar", "Chris Hadfield"
// - Parks Canada: Wrecks of HMS Erebus and HMS Terror National Historic Site (found in 2014 and 2016); Cape Spear Lighthouse
// - Canadian Space Agency (asc-csa.gc.ca): Canadarm and Canadarm2; Canadian astronauts
// - NASA: Apollo 11 (1969); Mars rovers; the International Space Station
// - Encyclopaedia Britannica: Marco Polo, Ibn Battuta, Zheng He, Vasco da Gama, Ferdinand Magellan and Juan Sebastián
//   Elcano, Christopher Columbus, Edmund Hillary and Tenzing Norgay, Valentina Tereshkova, Yuri Gagarin, astrolabe, sextant
// - Woods Hole Oceanographic Institution: the 1985 discovery of the Titanic wreck, south of Newfoundland
// - Heritage NL (heritage.nf.ca): Alcock and Brown’s non-stop transatlantic flight from St. John’s, 1919; Bob Bartlett of Brigus
// - Natural Resources Canada, The Atlas of Canada: latitude, longitude, map scale and the compass rose

const WHAT_IS: Q[] = [
  ["What is exploration?", "travelling to a place you do not know in order to learn about it", ["staying home every day", "building a new house", "reading a recipe"], "Explorers go looking for what they do not know yet."],
  ["What do we call a person who travels to learn about unknown places?", "an explorer", ["a farmer", "a baker", "a referee"], "Their trips are called expeditions."],
  ["What is an expedition?", "a journey made for a special purpose, like exploring", ["a kind of food", "a school holiday", "a type of map"], "Explorers plan expeditions carefully."],
  ["What is a voyage?", "a long trip by sea or through space", ["a short walk", "a song", "a kind of fish"], "Sailors went on voyages across the ocean."],
  ["Which is a reason people have explored?", "to find new routes for trade", ["to sleep more", "to stop learning", "to stay in one place"], "Trade means buying and selling goods."],
  ["Why did many European explorers in the 1400s and 1500s want a sea route to Asia?", "to trade for spices and silk", ["to find snow", "to see penguins", "to buy cars"], "Spices like pepper and cinnamon were very valuable."],
  ["Which is a reason people explore today?", "to learn about deep oceans and outer space", ["to find the edge of a flat Earth", "to look for dinosaurs alive", "to sail to the Sun"], "Scientists are explorers too."],
  ["Who often paid for explorers’ voyages long ago?", "kings, queens and merchants", ["children", "the explorers’ pets", "nobody"], "They hoped to gain land, riches or trade."],
  ["What is a crew?", "the people who work together on a ship or spacecraft", ["the captain’s hat", "the food on a ship", "a map of the stars"], "A captain leads the crew."],
  ["Which dangers did sailors face on long ocean voyages long ago?", "storms, sickness and running out of food", ["traffic jams", "power outages", "losing their phones"], "Trips could take many months."],
  ["Which illness did sailors get from not eating fresh fruit and vegetables?", "scurvy", ["the flu", "a cold", "chicken pox"], "It comes from a lack of vitamin C."],
  ["How did sailors learn to prevent scurvy?", "by eating citrus fruit like lemons and limes", ["by sleeping more", "by drinking sea water", "by eating only bread"], "These fruits have vitamin C."],
  ["Which kind of exploration happens in space?", "astronauts travelling to the International Space Station", ["hiking up a hill", "sailing on a lake", "walking to school"], "Space exploration goes beyond Earth’s air."],
  ["Which is an example of ocean exploration?", "a robot submarine mapping the sea floor", ["a plane flying over a city", "a rover on Mars", "a hike in the woods"], "The deep ocean is still mostly unexplored."],
  ["What is a primary source about an explorer’s voyage?", "the explorer’s own journal from the trip", ["a cartoon made last year", "a textbook written today", "a video game"], "A primary source comes from the time and the people involved."],
  ["Why do historians read explorers’ journals carefully?", "They show one person’s point of view", ["They are always complete", "They were written by machines", "They have no dates"], "Other people at the time may have seen things differently."],
  ["Which words describe a good explorer?", "curious, brave and well prepared", ["lazy and careless", "afraid to try anything", "always lost"], "Explorers plan for danger."],
  ["How can you be an explorer in your own community?", "by visiting new places and asking questions", ["by never going outside", "by ignoring what you see", "by closing your eyes"], "Exploring starts with curiosity."],
  ["Which new foods first travelled from the Americas to Europe after explorers crossed the Atlantic?", "potatoes, tomatoes and corn", ["apples, pears and plums", "rice and noodles", "cheese and butter"], "Ships carried foods in both directions.", true],
  ["What is one positive result of exploration?", "new maps and new knowledge about the world", ["fewer maps", "nobody learns anything", "the ocean gets smaller"], "Explorers brought back information.", true],
  ["What is one negative result that exploration has sometimes had?", "spreading diseases to people who had no protection from them", ["better maps for everyone", "new foods to try", "more knowledge about the stars"], "Results can be helpful or harmful.", true],
  ["An explorer wants to claim land for a king. What is the main reason?", "to gain land and power", ["to plant flowers", "to learn to swim", "to take a vacation"], "Kings wanted to grow their empires.", true],
  ["Why is it important to hear more than one point of view about an exploration?", "Different people experienced the same event differently", ["Only one story is ever true", "Explorers never wrote anything", "Points of view do not matter"], "Ask who was there and how it affected them.", true],
  ["What is a sponsor of an expedition?", "a person or group who pays for it", ["the ship’s cook", "the youngest sailor", "a kind of sail"], "Sponsors expected something in return.", true],
  ["Which of these is the biggest risk for astronauts exploring space?", "having no air to breathe outside the spacecraft", ["getting a sunburn at the beach", "rain at night", "missing a bus"], "Space suits carry air and protect the body.", true],
  ["Why do explorers today often use robots?", "Robots can go where it is too dangerous for people", ["Robots like to travel", "People cannot use maps", "Robots never break"], "Mars and the deep sea are hard places for humans.", true],
  ["Why do explorers keep careful notes and maps?", "so others can learn from what they found", ["so nobody can read them", "to throw them away", "to stop others exploring"], "Sharing knowledge helps the next explorer.", true],
  ["Which question would an explorer most likely ask?", "What is on the other side of these mountains?", ["What time is lunch at home?", "Which show is on TV?", "Where is my pencil?"], "Explorers wonder about places they have not seen.", true],
];

const EXPLORERS: Q[] = [
  ["Which explorer from Venice travelled to China in the late 1200s?", "Marco Polo", ["Jacques Cartier", "Henry Hudson", "Neil Armstrong"], "His book about his travels was read across Europe."],
  ["Ibn Battuta travelled for almost 30 years in the 1300s. Where did his journeys start?", "Morocco, in North Africa", ["England", "China", "Iceland"], "He visited Africa, the Middle East and Asia."],
  ["Zheng He led huge fleets of ships in the early 1400s. Which country did he sail for?", "China", ["France", "Spain", "England"], "His ships crossed the Indian Ocean to East Africa."],
  ["In 1492, Christopher Columbus sailed west for which country?", "Spain", ["England", "France", "China"], "He was hoping to reach Asia."],
  ["Where did Columbus land in 1492?", "islands in the Caribbean Sea", ["the coast of China", "the North Pole", "Australia"], "He thought he had reached the Indies in Asia."],
  ["Vasco da Gama reached India by sea in 1498. Which way did he sail?", "around the southern tip of Africa", ["across the North Pole", "through the Arctic ice", "over the Rocky Mountains"], "He sailed for Portugal."],
  ["Which expedition was the first to sail all the way around the world?", "the one Ferdinand Magellan led", ["Columbus’s first voyage", "Cartier’s first voyage", "the Apollo 11 mission"], "It left in 1519 and returned in 1522."],
  ["In 1534, Jacques Cartier explored the Gulf of St. Lawrence for which country?", "France", ["Spain", "Portugal", "China"], "He came back the next year and sailed up the St. Lawrence River."],
  ["Who founded Quebec City in 1608?", "Samuel de Champlain", ["Marco Polo", "John Cabot", "Vasco da Gama"], "He is often called the father of New France."],
  ["In 1610, Henry Hudson sailed into a huge bay in the north. What is it called today?", "Hudson Bay", ["Conception Bay", "Bay of Islands", "Placentia Bay"], "It is named after him."],
  ["What were explorers like Hudson searching for in the Arctic?", "the Northwest Passage, a sea route to Asia", ["gold mines", "a lost city", "the South Pole"], "They hoped to sail from the Atlantic to the Pacific."],
  ["Which explorer was the first to reach the South Pole, in 1911?", "Roald Amundsen", ["Marco Polo", "Samuel de Champlain", "Christopher Columbus"], "He came from Norway."],
  ["Bob Bartlett, a famous Arctic ship captain, grew up in which Newfoundland community?", "Brigus", ["Corner Brook", "Gander", "Labrador City"], "It is on Conception Bay."],
  ["In 1953, Edmund Hillary and Tenzing Norgay were the first known climbers to reach the top of…", "Mount Everest", ["Gros Morne Mountain", "Mount Kilimanjaro", "Signal Hill"], "It is the highest mountain on Earth."],
  ["In 1969, who became the first person to walk on the Moon?", "Neil Armstrong", ["Chris Hadfield", "Yuri Gagarin", "Roberta Bondar"], "The mission was called Apollo 11."],
  ["Who was the first person to travel into space, in 1961?", "Yuri Gagarin", ["Neil Armstrong", "Marc Garneau", "Bob Bartlett"], "He orbited Earth once."],
  ["Who was the first Canadian in space, in 1984?", "Marc Garneau", ["Chris Hadfield", "Jacques Cartier", "Henry Hudson"], "He later became a member of Parliament."],
  ["Who was the first Canadian woman in space, in 1992?", "Roberta Bondar", ["Valentina Tereshkova", "Marc Garneau", "Chris Hadfield"], "She is a doctor and scientist."],
  ["Which Canadian astronaut was the first Canadian to command the International Space Station?", "Chris Hadfield", ["Marc Garneau", "Neil Armstrong", "Yuri Gagarin"], "He shared photos and songs from space in 2013."],
  ["In 1985, a team of ocean explorers found the wreck of which famous ship, south of Newfoundland?", "the Titanic", ["the Matthew", "the Santa María", "the Mayflower"], "It sank in 1912 after hitting an iceberg."],
  ["In 1919, Alcock and Brown made the first non-stop flight across the Atlantic. Where did it start?", "St. John’s", ["Gander", "Corner Brook", "Labrador City"], "They landed in a bog in Ireland."],
  ["Who led the survivors of Magellan’s expedition home after Magellan died?", "Juan Sebastián Elcano", ["Vasco da Gama", "Henry Hudson", "Marco Polo"], "Only one of the five ships made it back to Spain.", true],
  ["Who was the first woman to travel into space, in 1963?", "Valentina Tereshkova", ["Roberta Bondar", "Amelia Earhart", "Marie Curie"], "She flew alone around Earth many times.", true],
  ["Who was the first to sail all the way through the Northwest Passage, finishing in 1906?", "Roald Amundsen", ["Henry Hudson", "Jacques Cartier", "John Franklin"], "His small ship took about three years.", true],
  ["John Franklin’s 1845 expedition to find the Northwest Passage did not return. What was found in 2014 and 2016?", "the wrecks of his two ships", ["a gold mine", "a new island", "his diary on a beach in Europe"], "The ships were HMS Erebus and HMS Terror.", true],
  ["Columbus, Cabot and Cartier all crossed which ocean?", "the Atlantic Ocean", ["the Pacific Ocean", "the Indian Ocean", "the Arctic Ocean"], "It lies between Europe and North America.", true],
  ["Put these explorers in order, oldest first.", "Marco Polo, Cartier, Armstrong", ["Armstrong, Cartier, Marco Polo", "Cartier, Marco Polo, Armstrong", "Marco Polo, Armstrong, Cartier"], "Think 1200s, 1500s, 1900s.", true],
  ["How was Zheng He’s fleet different from Columbus’s?", "It had many more and much bigger ships", ["It had no ships", "It sailed only on rivers", "It used aeroplanes"], "His fleets had hundreds of ships. Columbus sailed in 1492 with three.", true],
  ["What did Cartier and Cabot have in common?", "Both sailed to the coast of North America looking for a route to Asia", ["Both went to the Moon", "Both sailed for Spain", "Both reached the South Pole"], "Asia’s riches drew many explorers west.", true],
  ["What do space explorers and ocean explorers have in common?", "They study places that are hard for people to reach", ["They both use sailing ships", "They both travel by train", "They never use maps"], "Both need special tools to survive.", true],
];

const TOOLS: Q[] = [
  ["Which tool shows which way is north?", "a compass", ["a thermometer", "a clock", "a ruler"], "Its needle is a magnet."],
  ["What are the four cardinal directions?", "north, east, south and west", ["up, down, left and right", "front, back, top and bottom", "near, far, high and low"], "They are shown on a compass rose."],
  ["Which direction is halfway between north and east?", "northeast", ["southwest", "northwest", "southeast"], "Put the two names together."],
  ["What does a map legend (or key) tell you?", "what the symbols on the map mean", ["who drew the map", "how old the map is", "how much the map cost"], "It is usually in a box in the corner."],
  ["What does a map scale tell you?", "how far apart places really are", ["what colour the land is", "the weather today", "the names of streets only"], "One centimetre on a map might stand for many kilometres."],
  ["What is a compass rose on a map?", "a drawing that shows directions", ["a flower that grows on maps", "a list of cities", "a picture of the explorer"], "It shows N, E, S and W."],
  ["Which is a round model of the Earth?", "a globe", ["a map", "a chart", "a compass"], "It shows Earth’s true shape."],
  ["What is a map of water for sailors called?", "a chart", ["a globe", "a recipe", "a calendar"], "It shows depths, rocks and coastlines."],
  ["The equator is an imaginary line around the Earth. Where is it?", "halfway between the North and South Poles", ["at the North Pole", "through Newfoundland", "at the South Pole"], "It divides the Earth into northern and southern halves."],
  ["Lines of latitude run east and west. What do they tell you?", "how far north or south of the equator a place is", ["how high a mountain is", "how deep the ocean is", "what time it is"], "Newfoundland and Labrador is north of the equator."],
  ["Which tool helped sailors long ago find their latitude using the Sun or stars?", "an astrolabe", ["a microscope", "a telephone", "a thermometer"], "It measured the angle of the Sun or a star above the horizon."],
  ["How did sailors long ago keep track of time on a ship?", "with an hourglass full of sand", ["with a phone", "with a digital watch", "with a television"], "The sand took a set time to run through."],
  ["Which tool let sailors see faraway ships and coastlines?", "a telescope", ["a compass", "an hourglass", "an anchor"], "It makes faraway things look closer."],
  ["What helps ships today find their exact position anywhere on Earth?", "GPS, using signals from satellites", ["a paper bag", "a candle", "a kite"], "Satellites circle high above Earth."],
  ["How does sonar help explore the ocean?", "It uses sound echoes to map the sea floor", ["It lights up the water", "It warms the water", "It catches fish"], "Sound bounces back from the bottom."],
  ["What is a lighthouse for?", "warning ships of rocks and guiding them to safety", ["storing fish", "growing food", "making maps"], "Cape Spear has a famous one."],
  ["Which robotic arm, built in Canada, has helped astronauts in space?", "the Canadarm", ["the Hubble telescope", "the Mars rover", "the Titanic"], "Canadarm2 works on the International Space Station."],
  ["Which robot explorers drive across the surface of Mars?", "rovers", ["submarines", "sailboats", "trains"], "They have wheels, cameras and tools."],
  ["What kind of ship can break through thick sea ice?", "an icebreaker", ["a canoe", "a rowboat", "a sailboard"], "Its strong hull pushes and crushes the ice."],
  ["How did sailors long ago keep meat and fish from spoiling on long voyages?", "by salting and drying it", ["by freezing it in a freezer", "by putting it in a fridge", "by keeping it in the sun wet"], "There were no fridges on ships."],
  ["What are the seven large areas of land on Earth called?", "continents", ["oceans", "islands", "provinces"], "North America is one of them."],
  ["How many oceans are there on Earth?", "five", ["two", "seven", "ten"], "The Atlantic is one of them."],
  ["The prime meridian is the line of 0° longitude. Which city does it pass through?", "Greenwich, in London, England", ["St. John’s", "Paris", "Tokyo"], "Lines of longitude run from pole to pole.", true],
  ["Which tool, invented after the astrolabe, let sailors measure angles more exactly?", "a sextant", ["a hammer", "a lantern", "a barometer"], "Navigators used it until GPS came along.", true],
  ["You face north. Which direction is on your right?", "east", ["west", "south", "north"], "The Sun rises in this direction.", true],
  ["On a map, 1 cm stands for 10 km. Two towns are 4 cm apart on the map. How far apart are they?", "40 km", ["4 km", "14 km", "400 km"], "Multiply the map distance by 10.", true],
  ["Why is a globe more accurate than a flat world map?", "A flat map must stretch the round Earth", ["Globes are always bigger", "Maps have no colours", "Globes show the weather"], "Try flattening an orange peel.", true],
  ["Why did sailors use the North Star to find their way?", "It stays in nearly the same spot in the night sky", ["It is the only star", "It moves fastest", "It is always red"], "Other stars seem to turn around it.", true],
  ["Why are tools like GPS and sonar important for explorers today?", "They make travel safer and help map unknown places", ["They make ships slower", "They replace all ships", "They stop people exploring"], "Better tools mean better maps.", true],
  ["Compared with sailing ships of the 1500s, how do modern ships cross the Atlantic?", "faster and with tools to know exactly where they are", ["slower and with no maps", "only with oars", "only in summer"], "Engines and satellites changed travel.", true],
];

export const whatIsExploration = bankUnit({
  id: "nl-exploration-4",
  title: "Why People Explore",
  emoji: "🧭",
  blurb: "What exploration is, why people do it and what it changes.",
  parentNote:
    "Grade 4 social studies asks what exploration is, why people have explored and what happened because of it. Ask your child what place they would most like to explore, and what they would need to bring.",
  standards: ["Time, continuity and change (by Grade 6)", "what exploration is, why people explore, and its positive and negative results"],
  items: WHAT_IS,
});

export const explorers = bankUnit({
  id: "nl-explorers-4",
  title: "Explorers’ Stories",
  emoji: "⛵",
  blurb: "Explorers of land, sea and space, long ago and today.",
  parentNote:
    "Grade 4 social studies meets explorers from many places and times, from Marco Polo to Canadian astronauts. Ask your child which explorer they would like to have travelled with, and why.",
  standards: ["Time, continuity and change (by Grade 6)", "explorers of land, sea and space, long ago and today, and what they found"],
  items: EXPLORERS,
});

export const tools = bankUnit({
  id: "nl-exploration-tools-4",
  title: "Maps & Tools of Exploration",
  emoji: "🗺️",
  blurb: "Compasses, maps, astrolabes and satellites.",
  parentNote:
    "Grade 4 social studies uses maps, directions and scale, and compares the tools explorers used long ago with those used today. Ask your child to find north at home and to read a map legend together.",
  standards: ["People, place and environment (by Grade 6)", "using maps, globes, directions and scale, and the tools explorers used long ago and use today"],
  items: TOOLS,
});
