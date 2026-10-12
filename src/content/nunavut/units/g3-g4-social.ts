import { bankUnit, type Q } from "../own";

// Nunavut-only social studies units for Grades 3 and 4. Facts about Nunavut's places, symbols and languages come from the
// Government of Nunavut. Inuktut words vary by community.

const territory: Q[] = [
  ["What is the capital of Nunavut?", "Iqaluit", ["Rankin Inlet", "Cambridge Bay", "Arviat"], "Iqaluit is on Baffin Island."],
  ["What does the name “Nunavut” mean in Inuktitut?", "Our land", ["Cold place", "Big ice", "Sea people"], "The name tells us the land belongs to the people who live there."],
  ["Which of these is one of Nunavut's three regions?", "Qikiqtaaluk", ["Nunavik", "Dehcho", "Nunatsiavut"], "Nunavut has the Qikiqtaaluk, Kivalliq and Kitikmeot regions."],
  ["Nunavut became Canada's newest territory in which year?", "1999", ["1949", "1967", "1982"], "Nunavut began on April 1, 1999."],
  ["How many regions does Nunavut have?", "3", ["2", "4", "5"], "Count Qikiqtaaluk, Kivalliq and Kitikmeot."],
  ["Which region includes Baffin Island?", "Qikiqtaaluk", ["Kivalliq", "Kitikmeot", "Nunavik"], "Iqaluit is on Baffin Island, in the Qikiqtaaluk region."],
  ["Rankin Inlet is a hub community in which region?", "Kivalliq", ["Kitikmeot", "Qikiqtaaluk", "Nunatsiavut"], "Kivalliq is on the west side of Hudson Bay."],
  ["Cambridge Bay is in which region?", "Kitikmeot", ["Kivalliq", "Qikiqtaaluk", "Nunavik"], "Kitikmeot is the western region of Nunavut."],
  ["Which Nunavut region is farthest west?", "Kitikmeot", ["Kivalliq", "Qikiqtaaluk", "Nunavik"], "Look at a map: Kitikmeot is next to the Northwest Territories."],
  ["Which large bay lies along the Kivalliq coast?", "Hudson Bay", ["Lake Superior", "Pacific Ocean", "Great Slave Lake"], "Rankin Inlet and Arviat are on its west shore."],
  ["Iqaluit is on which island?", "Baffin Island", ["Victoria Island", "Vancouver Island", "Newfoundland"], "Baffin Island is one of the biggest islands in the world."],
  ["Which community is the only one in Nunavut that is inland, away from the coast?", "Baker Lake", ["Iqaluit", "Rankin Inlet", "Pond Inlet"], "Its name has the word lake in it.", true],
  ["What is Nunavut's territorial flower?", "Purple saxifrage", ["Prairie crocus", "Wild rose", "Trillium"], "It is a small purple flower that blooms on the tundra."],
  ["What is Nunavut's territorial bird?", "Rock ptarmigan", ["Gyrfalcon", "Common loon", "Canada jay"], "In winter this bird has white feathers."],
  ["What is Nunavut's territorial animal?", "Canadian Inuit Dog", ["Moose", "Beaver", "Grizzly bear"], "It is a strong sled dog, called a qimmiq in Inuktitut."],
  ["Which ocean is north of Canada?", "Arctic Ocean", ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean"], "Nunavut is close to the top of the world."],
  ["In summer the sun can stay up all day and all night in the far north. What is this called?", "Midnight sun", ["Northern lights", "Sun dog", "Polar vortex"], "The sun shines even at midnight."],
  ["Which kind of land has no tall trees and low plants growing over frozen ground?", "Tundra", ["Rainforest", "Prairie", "Desert"], "Most of Nunavut is this kind of land."],
  ["What are the colourful lights that dance in the northern night sky called?", "Aurora (northern lights)", ["Sun dogs", "Eclipse", "Rainbow"], "They are also called the aurora borealis."],
  ["What stone landmark do Inuit build to help travellers find their way?", "Inuksuk", ["Totem pole", "Tipi", "Windmill"], "Many inuksuit stand on the land. The plural is inuksuit."],
  ["Where does the Legislative Assembly of Nunavut meet?", "Iqaluit", ["Yellowknife", "Whitehorse", "Churchill"], "The capital is where the territory's lawmakers meet."],
  ["Which of these is a community in Nunavut?", "Pangnirtung", ["Whitehorse", "Yellowknife", "Churchill"], "Pangnirtung is on Baffin Island.", true],
  ["What does the name “Iqaluit” mean?", "Place of many fish", ["Place of ice", "Big bay", "River mouth"], "Fish such as Arctic char are found in the waters nearby.", true],
  ["Is Nunavut the largest or the smallest of Canada's provinces and territories by area?", "Largest", ["Smallest", "Same size as Ontario", "Same size as Nova Scotia"], "Nunavut covers a huge area, more than two million square kilometres.", true],
  ["Before 1999, the land that is now Nunavut was part of which territory?", "Northwest Territories", ["Yukon", "Manitoba", "Quebec"], "Nunavut was made when the Northwest Territories was divided.", true],
  ["Resolute is on which island?", "Cornwallis Island", ["Baffin Island", "Victoria Island", "Southampton Island"], "Resolute is in the High Arctic.", true],
  ["Cambridge Bay is on which island?", "Victoria Island", ["Baffin Island", "Ellesmere Island", "Cornwallis Island"], "Victoria Island is shared with the Northwest Territories.", true],
];

const iq: Q[] = [
  ["What does Inuit Qaujimajatuqangit (IQ) mean?", "Inuit knowledge and ways of knowing", ["A kind of sled", "A school test", "A new law"], "IQ is the knowledge and values Inuit have passed down."],
  ["Inuuqatigiitsiarniq means…", "Respecting others and caring for people", ["Building a boat", "Counting numbers", "Telling time"], "It is about relationships and caring."],
  ["Tunnganarniq means…", "Being open, welcoming and inclusive", ["Hunting alone", "Keeping secrets", "Winning every game"], "A good spirit makes everyone feel welcome."],
  ["Pijitsirniq means…", "Serving and providing for family and community", ["Sleeping late", "Drawing maps", "Collecting rocks"], "It is about helping others have what they need."],
  ["Aajiiqatigiinniq means…", "Making decisions by talking together", ["Choosing by a coin toss", "One person decides for all", "Waiting for a vote of strangers"], "Everyone is heard, until the group agrees."],
  ["Pilimmaksarniq (also called Pijariuqsarniq) means…", "Learning skills by watching, practising and working hard", ["Skipping lessons", "Buying new tools", "Staying inside"], "People learn from mentors and by trying again."],
  ["Piliriqatigiinniq (also called Ikajuqtigiinniq) means…", "Working together for a common goal", ["Working alone", "Racing each other", "Taking turns resting"], "Many hands make the work lighter."],
  ["Qanuqtuurniq means…", "Being creative and resourceful", ["Being very quiet", "Being late", "Being first in line"], "Try new ways to solve problems with what you have."],
  ["Avatittinnik Kamatsiarniq means…", "Respect and care for the land, animals and environment", ["Building a bigger town", "Moving away", "Counting stars"], "People depend on the land and animals."],
  ["Which principle is shown when a class works together to build a snow fort?", "Piliriqatigiinniq", ["Tunnganarniq", "Qanuqtuurniq", "Pijitsirniq"], "They work together for one goal."],
  ["A new student joins the class and everyone says hello and invites them to play. Which principle is this?", "Tunnganarniq", ["Pijitsirniq", "Aajiiqatigiinniq", "Qanuqtuurniq"], "Being welcoming and inclusive."],
  ["A girl brings food to her grandmother's home each week. Which principle is this?", "Pijitsirniq", ["Tunnganarniq", "Qanuqtuurniq", "Pilimmaksarniq"], "Serving and providing for family."],
  ["A class talks until everyone agrees on a rule. Which principle is this?", "Aajiiqatigiinniq", ["Pijitsirniq", "Avatittinnik Kamatsiarniq", "Qanuqtuurniq"], "Decisions are made through discussion."],
  ["A boy practises sewing patches with an aunt until he can do it by himself. Which principle is this?", "Pilimmaksarniq", ["Tunnganarniq", "Aajiiqatigiinniq", "Pijitsirniq"], "He learns a skill by watching and practising."],
  ["A student uses an empty box and string to make a toy with no store nearby. Which principle is this?", "Qanuqtuurniq", ["Pijitsirniq", "Aajiiqatigiinniq", "Piliriqatigiinniq"], "Being resourceful with what you have."],
  ["A family picks up garbage on the beach after the ice melts. Which principle is this?", "Avatittinnik Kamatsiarniq", ["Tunnganarniq", "Pijitsirniq", "Pilimmaksarniq"], "Caring for the land."],
  ["A girl thanks her teacher and listens politely when a classmate speaks. Which principle is this?", "Inuuqatigiitsiarniq", ["Qanuqtuurniq", "Avatittinnik Kamatsiarniq", "Pilimmaksarniq"], "Respecting others and caring for people."],
  ["Who often shares knowledge and stories in Inuit communities?", "Elders", ["Strangers only", "Machines", "Only children"], "Elders have lived a long time and know a lot."],
  ["How many Inuit Qaujimajatuqangit principles are in the Government of Nunavut's list?", "Eight", ["Three", "Five", "Twelve"], "Count the names you have learned.", true],
  ["Which principle is about learning by observing, mentoring and practising?", "Pilimmaksarniq", ["Tunnganarniq", "Pijitsirniq", "Qanuqtuurniq"], "Think of learning a skill from a mentor.", true],
  ["A group makes a plan only after everybody has had a turn to speak. Which two words describe it best?", "Discussion and agreement", ["Speed and silence", "Winning and losing", "Rules and punishment"], "Aajiiqatigiinniq means decisions through discussion and consensus.", true],
  ["Which principle fits a neighbour who shares a catch with several families?", "Pijitsirniq", ["Qanuqtuurniq", "Tunnganarniq", "Aajiiqatigiinniq"], "Providing for family and community.", true],
  ["A student invents a way to dry mittens quickly using what is in the classroom. Which principle is this?", "Qanuqtuurniq", ["Piliriqatigiinniq", "Pijitsirniq", "Inuuqatigiitsiarniq"], "Being innovative and resourceful.", true],
  ["Which statement about IQ is true?", "It guides how people live and learn together", ["It is only about the past", "It is only for Elders", "It is a kind of sport"], "IQ is still alive today in homes, schools and government.", true],
  ["Why does Nunavut's government talk about IQ in schools?", "To teach through Inuit knowledge and values", ["To end school early", "To remove math", "To replace all teachers"], "The Education Act supports Inuit knowledge in schools.", true],
  ["Which pair match?", "Avatittinnik Kamatsiarniq and caring for the land", ["Tunnganarniq and building a boat", "Pijitsirniq and counting", "Qanuqtuurniq and sleeping"], "Match each word to its meaning.", true],
];

const languages: Q[] = [
  ["Which of these are official languages of Nunavut?", "Inuit language, English and French", ["English only", "Spanish and German", "Cree and Dene"], "Nunavut has more than one official language."],
  ["“Inuktut” is a word for…", "The Inuit languages, including Inuktitut and Inuinnaqtun", ["A kind of sled", "A type of food", "A school subject for math"], "Inuktut includes Inuktitut and Inuinnaqtun."],
  ["What does “Inuit” mean?", "The people", ["The land", "The ice", "The sea"], "Inuit is the word for Inuit people."],
  ["What is one person called?", "Inuk", ["Inuit", "Inuktut", "Inuksuk"], "Inuit is plural. Inuk is one person."],
  ["Inuktitut is often written in…", "Syllabics", ["Hieroglyphs", "Braille only", "Emoji"], "Syllabics use symbols that each stand for a sound."],
  ["In syllabics, each symbol usually stands for…", "A consonant and a vowel sound together", ["A whole sentence", "A picture of an animal", "A number"], "Turn the shape to change the vowel."],
  ["Inuinnaqtun is mostly written with…", "Roman letters (like English)", ["Syllabics", "Hieroglyphs", "Numbers"], "It uses the same letters as English."],
  ["In which part of Nunavut is Inuinnaqtun mainly spoken?", "Kitikmeot", ["Kivalliq", "Qikiqtaaluk", "Nunavik"], "Think of Cambridge Bay and Kugluktuk."],
  ["“Nakurmiik” is a way to say…", "Thank you", ["Good night", "Please", "Sorry"], "Say it to thank someone."],
  ["“Qanuippit?” asks…", "How are you?", ["Where is it?", "What time is it?", "Who are you?"], "It is a friendly greeting."],
  ["“Ilaa” means…", "Yes", ["No", "Maybe", "Later"], "Ilaa means yes. Naamik means no."],
  ["“Naamik” means…", "No", ["Yes", "Hello", "Thank you"], "It is the opposite of ilaa."],
  ["Who often helps keep the Inuit language strong by speaking and telling stories?", "Elders and families", ["Only visitors", "Only machines", "Nobody"], "Languages are handed on by people speaking them."],
  ["Which law supports the Inuit language in Nunavut?", "Inuit Language Protection Act", ["School Lunch Act", "Sled Safety Act", "Weather Act"], "Its name says what it does."],
  ["Nunavut's schools aim to be…", "Bilingual", ["Silent", "English only", "Math only"], "Students learn in Inuktut and English."],
  ["“Nunavummiut” are…", "People of Nunavut", ["Animals of Nunavut", "Towns of Nunavut", "Seasons of Nunavut"], "The ending -miut means people of a place."],
  ["“Inuktitut” can be understood as…", "In the way of the Inuit", ["Cold weather", "Open water", "A type of boat"], "It names how Inuit speak."],
  ["What is a good way to learn Inuktut at home?", "Listen to family and practise speaking", ["Never speak it", "Only read English", "Wait until you are grown"], "Practice with people who speak it.", true],
  ["Which writing system uses small triangles, curves and dots to show sounds?", "Syllabics", ["Roman letters", "Braille", "Maps"], "Inuktitut can be written with these symbols.", true],
  ["Which language does the Nunavut government offer services in?", "Inuktut, English and French", ["English only", "French only", "Latin only"], "The territory has more than one official language.", true],
  ["Inuktut words and spellings…", "Can differ from community to community", ["Are the same everywhere", "Never change", "Are only in books"], "Dialects differ, and that is normal.", true],
  ["If you want to learn how a word is said in your community, you should…", "Ask a local speaker or an Elder", ["Guess", "Ignore it", "Use a different language"], "Local speakers know best.", true],
  ["Why is it important to protect the Inuit language?", "It carries Inuit knowledge, stories and identity", ["It is only for school", "It is old and not useful", "It is hard to say"], "Language holds a way of seeing the world.", true],
  ["Which pair is correct?", "Inuk is one person, Inuit is many people", ["Inuit is one person, Inuk is many people", "Inuk is a place", "Inuit is a sled"], "Singular and plural.", true],
  ["Syllabics in Nunavut are often used in…", "Signs, books and schools", ["Only on boats", "Only on maps of Europe", "Nowhere"], "Look at the signs in Iqaluit.", true],
];

const regions: Q[] = [
  ["Which community is on Ellesmere Island?", "Grise Fiord", ["Iqaluit", "Baker Lake", "Arviat"], "Ellesmere Island is in the far north."],
  ["Which community is in the Belcher Islands in Hudson Bay?", "Sanikiluaq", ["Pond Inlet", "Cambridge Bay", "Resolute"], "It is a small island community."],
  ["Pangnirtung is on which sound?", "Cumberland Sound", ["Hudson Bay", "Lake Superior", "Gulf of Mexico"], "It is on the east side of Baffin Island."],
  ["Iqaluit sits on which bay?", "Frobisher Bay", ["Hudson Bay", "Baffin Bay", "Bathurst Inlet"], "Iqaluit is on the shore of Frobisher Bay."],
  ["Arviat is on the shore of…", "Hudson Bay", ["Lake Superior", "Victoria Island", "Frobisher Bay"], "It is in the Kivalliq."],
  ["Which community is on Southampton Island?", "Coral Harbour", ["Cambridge Bay", "Pangnirtung", "Gjoa Haven"], "It is in Hudson Bay."],
  ["Which community is on Cornwallis Island?", "Resolute", ["Iqaluit", "Sanikiluaq", "Kugluktuk"], "It is in the High Arctic."],
  ["Kugluktuk is in which region?", "Kitikmeot", ["Kivalliq", "Qikiqtaaluk", "Nunavik"], "It is in the west."],
  ["Pond Inlet is on which island?", "Baffin Island", ["Victoria Island", "Cornwallis Island", "Ellesmere Island"], "It is on the north end of Baffin Island."],
  ["Gjoa Haven is in which region?", "Kitikmeot", ["Kivalliq", "Qikiqtaaluk", "Nunavik"], "It is on King William Island."],
  ["Naujaat (Repulse Bay) is special because…", "The Arctic Circle passes through it", ["It is the capital", "It has the tallest tree", "It is inland"], "The Arctic Circle is a line of latitude.", true],
  ["Which of these is a Kivalliq community?", "Chesterfield Inlet", ["Pond Inlet", "Resolute", "Kugluktuk"], "Kivalliq is on the west coast of Hudson Bay.", true],
  ["Which of these is a Qikiqtaaluk community?", "Clyde River", ["Rankin Inlet", "Baker Lake", "Cambridge Bay"], "Qikiqtaaluk includes Baffin Island.", true],
  ["Which of these is a Kitikmeot community?", "Taloyoak", ["Pangnirtung", "Whale Cove", "Resolute"], "Kitikmeot is the western region.", true],
  ["Why do most Nunavut communities sit on the coast?", "People have long used the sea for food and travel", ["There are no roads at all inland", "Inland has no sun", "Water is warm there"], "The sea provides marine animals and a travel route.", true],
  ["How do most people travel between Nunavut communities?", "By plane", ["By highway", "By train", "By subway"], "There are no roads joining the communities.", true],
  ["What do we call a small community in Nunavut with a mayor and council?", "Hamlet", ["Metropolis", "Kingdom", "Planet"], "Most Nunavut communities are hamlets."],
  ["Which Nunavut community is a city?", "Iqaluit", ["Pond Inlet", "Baker Lake", "Arviat"], "It is the capital."],
  ["How many communities are in Nunavut?", "25", ["5", "12", "50"], "It is a bit more than two dozen."],
  ["Which direction is Hudson Bay from the Kitikmeot region?", "East", ["West", "North", "South"], "Kitikmeot is the western region and Kivalliq faces Hudson Bay.", true],
  ["What do a map's compass directions help us do?", "Say where places are", ["Count fish", "Make snow", "Choose names"], "North, south, east and west."],
  ["Cambridge Bay is on Victoria Island. Victoria Island is…", "Shared with the Northwest Territories", ["Only in Manitoba", "Only in Alberta", "In Greenland"], "The island is split between two territories.", true],
  ["Which community is the largest by population in Nunavut?", "Iqaluit", ["Resolute", "Grise Fiord", "Sanikiluaq"], "It is the capital.", true],
  ["Which sea sits on the west side of the Kivalliq?", "Hudson Bay", ["Beaufort Sea", "Pacific Ocean", "Sea of Japan"], "Look at a map of Nunavut.", true],
  ["Whale Cove is in which region?", "Kivalliq", ["Kitikmeot", "Qikiqtaaluk", "Nunatsiavut"], "It is south of Rankin Inlet.", true],
];

export const ourTerritory3 = bankUnit({
  id: "nu-our-territory-3",
  title: "Our Territory: Nunavut",
  emoji: "🗺️",
  blurb: "Places, symbols and facts about Nunavut.",
  parentNote:
    "Covers Nunavut's regions, capital, communities, symbols and landscape. Some names are written in Inuktitut. Nunavut-only content, written from Government of Nunavut sources.",
  standards: ["Nunavut Social Studies K–6 (2025), Nunavusiutit", "Nunavut's regions, communities, symbols and landscape"],
  items: territory,
});

export const iqPrinciples4 = bankUnit({
  id: "nu-iq-principles-4",
  title: "Inuit Qaujimajatuqangit",
  emoji: "🧭",
  blurb: "The Inuit values that guide how we live well together.",
  parentNote:
    "Introduces the eight Inuit Qaujimajatuqangit principles used by the Government of Nunavut, with everyday examples. The Inuktut spellings vary by community; Inuit partners should review this unit.",
  standards: ["Inuuqatigiit (NWT, 1996), Heritage and culture", "the Inuit Qaujimajatuqangit principles and how they show up in daily life"],
  items: iq,
});

export const languages4 = bankUnit({
  id: "nu-languages-4",
  title: "Languages of Nunavut",
  emoji: "💬",
  blurb: "Inuktut, English and French, and how they are written.",
  parentNote:
    "Covers Nunavut's official languages, Inuit words and the writing systems used for Inuktitut and Inuinnaqtun. A few words are given in Inuktitut; spellings and words vary by community. This does not replace Inuktut language arts.",
  standards: ["Inuuqatigiit (NWT, 1996), Heritage and culture", "the languages of Nunavut, Inuit words, and syllabics and Roman letters"],
  items: languages,
});

export const regions4 = bankUnit({
  id: "nu-regions-communities-4",
  title: "Regions and Communities",
  emoji: "🏘️",
  blurb: "Find Nunavut's communities, islands and bays.",
  parentNote:
    "Practises where Nunavut's communities, islands and bodies of water are, and how the three regions fit together. Use a map of Nunavut alongside.",
  standards: ["Elementary Social Studies (NWT, 1993), Geography", "locating Nunavut's communities, regions and landforms on a map"],
  items: regions,
});
