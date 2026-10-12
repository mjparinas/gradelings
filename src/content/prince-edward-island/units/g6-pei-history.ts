import { bankUnit, type Q } from "../own";

// Grade 6 social studies, Prince Edward Island: the Prince Edward Island History course (time, people, transportation,
// government, economy, lifestyles, culture). Indigenous content is light, in the present tense for living communities,
// and needs review by Mi’kmaq partners (for example the Mi’kmaq Confederacy of PEI) and the PEI Department of Education
// before launch. No other province is named anywhere in this file ("the mainland" is used for the far side of the strait).
//
// Sources checked:
// PEI Grade 6 social studies outcomes, as recorded in docs/research/prince-edward-island/outcomes.json
// The Canadian Encyclopedia, "Prince Edward Island", "Prince Edward Island and Confederation", "Charlottetown Conference",
//   "George Coles", "Province House (Charlottetown)", "Confederation Bridge", "Reserves on Prince Edward Island"
// Government of Prince Edward Island, "Historic Milestones" (Executive Council Office) and Legislative Assembly, "The History of Province House"
// Island Archives (islandarchives.ca) and Island Register, Captain Samuel Holland's survey of St. John’s Island and the 1767 land lottery
// Dictionary of Canadian Biography (biographi.ca): L. M. Montgomery, Thomas Douglas, Earl of Selkirk, Charles Dalton, Robert Oulton
// Parks Canada, L.M. Montgomery’s Cavendish National Historic Site and Province House National Historic Site
// Marine Atlantic, "The SS Stanley" (marineatlantic.ca)
// Canada.ca, Government of Canada: Confederation Bridge and the 1873 ferry clause
// Statistics Canada, "Prince Edward Island leads the way in potato production" (Census of Agriculture, 2021)
// Abegweit First Nation (abegweit.ca) and Lennox Island First Nation: Epekwitk and Mi’kma’ki
// Tourism PEI, "Ceilidhs & Kitchen Parties"; Dictionary of Canadian Regionalisms, "kitchen party" (dchp.arts.ubc.ca)
// CBC News and Island Archives on the Island railway (opened 1875; last passenger train 1969; last trains 1989) and the 1908 car ban
//
// Left out because unverified: how many years the Mi’kmaq have lived on the Island (sources give 10 000 and 12 000, so
// only "thousands of years" is used), exact dates for responsible government (sources differ), the exact end date of the
// car ban, how Acadian traditions are practised today, lobster and church suppers, how many visitors tourism brings in
// now, and anything about Mi’kmaw ceremonies or language.

const TIME: Q[] = [
  ["What does a time line show?", "events in the order they happened", ["the weather on each day", "the height of mountains", "where roads go"], "Think of a line with dates along it."],
  ["Which year comes earliest on a time line?", "1720", ["1758", "1799", "1873"], "Earlier years sit farther to the left."],
  ["The French built Port-la-Joye in 1720. The Charlottetown Conference was in 1864. Which came first?", "the building of Port-la-Joye", ["the Charlottetown Conference", "They happened in the same year", "You cannot tell"], "Compare 1720 with 1864."],
  ["On a time line that reads left to right, where do later events go?", "farther to the right", ["farther to the left", "at the very top", "in the middle only"], "Time lines read like a book: earlier first."],
  ["How many years are there from 1864 to 1873?", "9 years", ["19 years", "11 years", "90 years"], "Subtract: 1873 − 1864."],
  ["The Island joined Confederation in 1873. How many years from 1873 to 1997, when the Confederation Bridge opened?", "124 years", ["114 years", "134 years", "24 years"], "Subtract 1873 from 1997 and check the hundreds."],
  ["How many years are in a decade?", "10 years", ["100 years", "1000 years", "5 years"], "Think of the 1860s, the 1870s and so on."],
  ["How many years are in a century?", "100 years", ["10 years", "1000 years", "50 years"], "The 1700s are one century."],
  ["The Island was renamed in 1799. In which decade is 1799?", "the 1790s", ["the 1780s", "the 1800s", "the 1700s"], "Look at the first three digits: 179."],
  ["In which century is the year 1864?", "the 1800s (19th century)", ["the 1700s", "the 1900s", "the 1600s"], "The 1800s are called the 19th century."],
  ["The Charlottetown Conference was held in 1864. In which decade was that?", "the 1860s", ["the 1840s", "the 1870s", "the 1800s"], "Look at the first three digits: 186."],
  ["Which marks are spaced with equal steps on a time line?", "1700, 1750, 1800, 1850", ["1700, 1720, 1800, 1900", "1700, 1780, 1790, 1900", "1720, 1758, 1763, 1767"], "Each step should be the same number of years.", true],
  ["Which list puts these years in order from earliest to latest?", "1720, 1758, 1767, 1873", ["1873, 1767, 1758, 1720", "1758, 1720, 1873, 1767", "1767, 1720, 1873, 1758"], "Start with the smallest number."],
  ["The Island railway opened in 1875. The icebreaking ferry SS Stanley began in 1888. Which came first?", "the railway opening", ["the SS Stanley", "They began in the same year", "Neither is on a time line"], "Compare 1875 with 1888.", true],
  ["How many years are there from 1875, when the railway opened, to 1888, when the SS Stanley began?", "13 years", ["12 years", "23 years", "113 years"], "Subtract 1875 from 1888."],
  ["Cars were banned on Island roads in 1908. How many years from 1908 to 1997?", "89 years", ["79 years", "99 years", "189 years"], "Subtract 1908 from 1997.", true],
  ["“1720: French build Port-la-Joye. 1758: British take the Island. 1763: a treaty gives it to Britain.” Which came last?", "the treaty in 1763", ["the building of Port-la-Joye", "the taking of the Island", "They all happened together"], "Look for the largest year.", true],
  ["“In 1864 leaders met in Charlottetown. In 1873 the Island became a province. In 1997 a bridge opened.” Which is in the middle?", "the Island became a province", ["leaders met in Charlottetown", "a bridge opened", "the French built a fort"], "Put the three years in order first.", true],
  ["What do dates on a time line help you see?", "how long ago things happened and how far apart they were", ["what the weather was like", "who the best singer was", "which colour is your favourite"], "Dates let you count the years between events."],
  ["A time line from 1700 to 2000 is 30 cm long, with a mark every 100 years. How far apart are the marks?", "10 cm", ["3 cm", "30 cm", "100 cm"], "There are three 100-year steps in 300 years.", true],
  ["The lots were given out by lottery in 1767. How many years until the Island was renamed in 1799?", "32 years", ["22 years", "42 years", "132 years"], "Subtract 1767 from 1799.", true],
  ["Which event happened between 1758 and 1799?", "the 1767 lottery that gave out the Island’s lots", ["the Charlottetown Conference", "the opening of the Confederation Bridge", "the Island joining Confederation"], "Look for a year between 1758 and 1799.", true],
  ["In what year was the Island renamed Prince Edward Island?", "1799", ["1720", "1864", "1997"], "It was named for a prince, near the end of the 1700s."],
  ["In what year did the Charlottetown Conference take place?", "1864", ["1767", "1908", "1989"], "It was held at Province House in September."],
  ["In what year did the Confederation Bridge open?", "1997", ["1875", "1888", "1969"], "It was the late 1990s."],
  ["In what year did the Island become Canada’s seventh province?", "1873", ["1867", "1799", "1908"], "It was nine years after the Charlottetown Conference."],
  ["The last trains ran on the Island in 1989. Which of these came after that?", "the Confederation Bridge opened in 1997", ["the SS Stanley began in 1888", "the Charlottetown Conference in 1864", "the car ban in 1908"], "Choose the year that is bigger than 1989."],
];

const PEOPLE: Q[] = [
  ["Who have lived on Epekwitk, the island we call Prince Edward Island, for thousands of years?", "the Mi’kmaq", ["the Selkirk settlers", "British soldiers", "French settlers from 1720"], "Their territory is called Mi’kma’ki."],
  ["What is the Mi’kmaw name for the Island?", "Epekwitk", ["Port-la-Joye", "Île Saint-Jean", "Charlotte Town"], "It is the name the Mi’kmaq have used for a very long time."],
  ["Which two Mi’kmaw First Nations have communities on the Island today?", "Lennox Island and Abegweit", ["Tignish and Alberton", "Cavendish and Brackley", "Georgetown and Souris"], "Both are Mi’kmaw communities that you can find on a map of the Island."],
  ["In 1720 French settlers built Port-la-Joye. What did they call the Island then?", "Île Saint-Jean", ["Epekwitk", "Prince Edward Island", "Charlottetown"], "The name means St. John’s Island in French."],
  ["People from which country built Port-la-Joye in 1720?", "France", ["Scotland", "Ireland", "Spain"], "It was the capital of the French colony of Île Saint-Jean."],
  ["What happened to many French and Acadian settlers on the Island in 1758?", "They were forced to leave by the British", ["They were given more land", "They voted to rename the Island", "They moved to Charlottetown by train"], "It happened after Louisbourg fell to the British.", true],
  ["In 1803 the Earl of Selkirk brought about 800 settlers to the Island from which part of the world?", "the Scottish Highlands", ["the coast of France", "the Arctic", "the Caribbean"], "Think of the group that brought fiddle music and ceilidhs."],
  ["How many ships did the Earl of Selkirk hire in 1803 to bring settlers to the Island?", "three", ["one", "seven", "twelve"], "They were the Polly, the Dykes and the Oughton.", true],
  ["Why was the Island named Prince Edward Island in 1799?", "to honour Prince Edward, Duke of Kent", ["after a farmer who owned many lots", "after the first premier", "after a fishing town in France"], "He was the father of Queen Victoria."],
  ["Queen Charlotte, wife of King George III, is honoured in the name of which Island city?", "Charlottetown", ["Summerside", "Souris", "Alberton"], "Look for “Charlotte” inside the name."],
  ["Which Royal Navy surveyor mapped the Island in the 1760s and divided it into 67 lots?", "Samuel Holland", ["George Coles", "Robert Oulton", "Charles Dalton"], "He drew the survey that gave us the Island’s “lots”.", true],
  ["George Coles is remembered as the Island’s first…", "premier under responsible government", ["railway engineer", "Mi’kmaw chief", "lighthouse keeper"], "He led the Reform party in the 1850s."],
  ["L. M. Montgomery was born on the Island. Which famous novel did she publish in 1908?", "Anne of Green Gables", ["Little Women", "Treasure Island", "The Secret Garden"], "She wrote it while living in Cavendish."],
  ["Charles Dalton and Robert Oulton are known for raising which animal in captivity on the Island?", "silver foxes", ["beavers", "wolves", "polar bears"], "They sold the animals’ fur.", true],
  ["Which sentence about Island history is best?", "Many groups, including the Mi’kmaq, French and Scots, shaped the Island", ["Only one group has ever lived on the Island", "Island history began when the bridge opened", "Only people born on the Island matter to its history"], "People came from many parts of the world."],
  ["Which is a reason a group of people might move to a new land?", "to find land, work or a better life", ["because they already live there", "because the land has no places in it", "because they want less food and work"], "Think about what families need."],
  ["Which activity first drew European settlers to the Island?", "fishing", ["tourism", "railway building", "fox farming"], "The waters around the Island were full of fish.", true],
  ["You want to research Samuel Holland. Which is a good research question?", "What did Holland do for the Island?", ["What colour is the Island’s soil?", "How long is the Confederation Bridge?", "Who sang at last night’s ceilidh?"], "A good question is about the person."],
  ["Which of these is a primary source about a person from long ago?", "a letter that the person wrote", ["a textbook chapter written last year", "a website that sums up their life", "a movie made about them"], "A primary source comes from the time itself."],
  ["Which is a secondary source about Samuel Holland?", "an encyclopedia article about him", ["a map he drew", "a diary he kept", "a letter he wrote"], "A secondary source is written later, by someone else."],
  ["Why should you use more than one source when you research a person?", "One source may leave things out or be wrong", ["All sources say exactly the same thing", "It makes the project shorter", "Sources never help"], "Compare what each source says."],
  ["What is a good way to check a fact about a person in history?", "find it in two or more trusted sources", ["ask a friend to guess", "use the first website you see", "pick the answer you like"], "Trust facts that more than one reliable source shares."],
  ["A fair description of a person’s contribution tells…", "what they did and how it affected others", ["only what they ate", "only what they looked like", "only how old they were"], "A contribution is something they gave or did."],
  ["Which source is most trustworthy for facts about Island history?", "a museum or archive page", ["a rumour passed around", "an advertisement for a game", "a post by someone with no name"], "Look for an author or place that checks its facts."],
  ["George Coles worked for responsible government. Which describes his contribution fairly?", "He helped the Island gain a government that answers to the elected assembly", ["He built the first railway engine", "He surveyed the Island’s lots", "He wrote Anne of Green Gables"], "Think about what responsible government means.", true],
  ["Why did George Coles at first oppose Confederation?", "The land question had not been dealt with", ["He disliked Charlottetown", "There were no ships", "He did not like cities"], "It was about who owned the Island’s land.", true],
  ["Lots were given out in 1767 to people with claims on the government. Why was this a problem?", "Most owners lived far away and farmers had to rent the land", ["Everyone received equal land", "No one was allowed to farm", "The lots were too small to show on a map"], "Think of owners who were not living on the Island.", true],
  ["Which statement about the Mi’kmaq is correct?", "They were here long before 1720, and their communities are here today", ["They arrived after the French", "They left the Island in 1758", "They exist only in history books"], "Epekwitk has been home to them for thousands of years."],
];

const TRANSPORT: Q[] = [
  ["Which is a land mode of transportation?", "a train", ["a ferry", "an icebreaking ship", "a sailboat"], "It runs on tracks."],
  ["Which is a water mode of transportation?", "a ferry", ["a train", "a bicycle", "a horse-drawn wagon"], "It floats and carries people and cars across the strait."],
  ["Which is an air mode of transportation?", "an airplane", ["a ferry", "a train", "a car"], "It travels through the sky."],
  ["Before cars, which animals pulled wagons and sleighs on Island roads?", "horses", ["moose", "foxes", "seals"], "Think of farm animals."],
  ["In what year was the Island railway officially opened?", "1875", ["1799", "1908", "1997"], "It was in the 1870s."],
  ["The Island railway used narrow-gauge track. What does that mean?", "The rails were closer together than on standard track", ["The rails were made of wood", "There was only one rail", "The train ran underwater"], "Gauge is the distance between the two rails.", true],
  ["What happened to many old railway routes after the last trains in 1989?", "They became trails for walking and cycling", ["They became airports", "They became canals", "They were flooded to make harbours"], "A trail uses the same flat path."],
  ["In what year did the last passenger train leave the Island?", "1969", ["1875", "1908", "1997"], "Freight trains ran for 20 more years.", true],
  ["What was the SS Stanley?", "an icebreaking steamship ferry", ["the first airplane", "a train engine", "a fishing schooner"], "It crossed the Northumberland Strait."],
  ["The SS Stanley began service in 1888. What problem did it help with?", "crossing the Northumberland Strait in winter ice", ["crossing sand dunes", "fixing roads", "carrying mail by air"], "The word “icebreaker” is a clue."],
  ["In 1908 the Island banned cars. Why did many people want the ban?", "Cars frightened horses and roads were poor", ["Cars were too quiet", "Nobody had horses", "Trains were banned already"], "Think about safety on country roads."],
  ["About how many cars were on the Island when the ban began in 1908?", "about seven", ["about 700", "about 7000", "none at all"], "Cars were very rare.", true],
  ["In 1913 the rules changed for cars. What happened?", "Cars were allowed on roads only on certain days", ["All rules were removed forever", "All cars were sent off the Island", "Only trains were allowed"], "It was a step, not the end of the rules.", true],
  ["Which new way of travel let people cross to the mainland without a boat after 1997?", "the Confederation Bridge", ["the SS Stanley", "the railway", "a tunnel"], "It opened in the late 1990s."],
  ["How long is the Confederation Bridge?", "12.9 kilometres", ["1.29 kilometres", "129 kilometres", "29 kilometres"], "It is more than ten kilometres long, but not more than twenty."],
  ["Which body of water does the Confederation Bridge cross?", "the Northumberland Strait", ["the Bay of Fundy", "Hudson Bay", "Lake Erie"], "A strait is a narrow stretch of water."],
  ["What is special about the Confederation Bridge?", "It is the longest bridge over ice-covered water in the world", ["It is the tallest building in the world", "It is made only of wood", "It is the oldest bridge in Canada"], "The strait freezes in winter.", true],
  ["Where does the Confederation Bridge start on the Island?", "Borden-Carleton", ["Souris", "Tignish", "Cavendish"], "It is on the south side of the Island."],
  ["Before the bridge opened in 1997, how did cars cross the strait?", "on a ferry", ["on a train over the ice", "by airplane only", "through a tunnel"], "A ship carried them across."],
  ["Why were new modes of transportation developed?", "to move people and goods faster or more easily", ["to make travel harder", "to stop people visiting", "to keep ships from sailing"], "Inventors look for a better way.", true],
  ["How can a railway help a farmer?", "It can carry crops to places far away", ["It can make the soil richer", "It stops the rain", "It plants the seeds"], "Think about getting goods to buyers."],
  ["The Island’s debt from building the railway helped push it to do what in 1873?", "join Confederation", ["ban cars", "build the bridge", "rename the Island"], "It was a big political decision.", true],
  ["Which list is in order from earliest to latest?", "railway (1875), car ban (1908), bridge (1997)", ["bridge (1997), railway (1875), car ban (1908)", "car ban (1908), bridge (1997), railway (1875)", "railway (1875), bridge (1997), car ban (1908)"], "Put the years in order.", true],
  ["How is crossing to the mainland different now than in 1888?", "In 1888 you crossed on a ship; today you can also drive over a bridge", ["In 1888 you drove over a bridge; today only ships cross", "Nothing has changed", "In 1888 you flew; now you walk"], "Compare the SS Stanley with the Confederation Bridge.", true],
  ["On a route map, a dashed line marked “ferry” crosses water. What does it show?", "the path a ferry takes", ["a road for cars", "a railway line", "a hiking trail"], "Match the label to the picture."],
  ["Which part of a map explains what its symbols mean?", "the legend", ["the scale", "the title", "the compass rose"], "It is sometimes called the key."],
  ["Which list sorts these correctly: train, ferry, car, icebreaker?", "Land: train, car. Water: ferry, icebreaker", ["Land: ferry, car. Water: train, icebreaker", "Land: icebreaker, car. Water: train, ferry", "Land: train, ferry. Water: car, icebreaker"], "Ships go on water; trains and cars go on land."],
];

const GOVERNMENT: Q[] = [
  ["What is a political decision?", "a choice made by people in government", ["a choice made by a family at supper", "a choice about what to wear", "a choice made by the weather"], "Governments make choices that affect many people."],
  ["Who makes laws for the Island?", "elected members of the Legislative Assembly", ["ferry captains", "newspaper editors", "fox ranchers"], "They are chosen in elections."],
  ["How do people choose who sits in the Island’s government?", "by voting in elections", ["by drawing names from a hat at school", "by who is tallest", "by who lives closest to the bridge"], "Voters choose their members."],
  ["Where in Charlottetown do the Island’s elected members meet?", "Province House", ["Green Gables House", "the old railway station", "a lighthouse"], "It is also a national historic site."],
  ["What took place at Province House in September 1864?", "the Charlottetown Conference", ["the Island joined Confederation", "the Confederation Bridge opened", "the car ban began"], "Leaders came to talk about uniting colonies."],
  ["The Charlottetown Conference first aimed to discuss what kind of union?", "a union of the Maritime colonies", ["a union with France", "a union with the United States", "no union at all"], "Other leaders then asked to talk about something bigger.", true],
  ["In 1873 the Island made which political decision?", "to join Confederation", ["to ban cars", "to rename itself", "to build a bridge"], "It became Canada’s seventh province."],
  ["Joining Confederation made the Island part of…", "Canada", ["the United States", "France", "Britain only, with no link to Canada"], "The Island is a Canadian province."],
  ["What helped after the Island joined Confederation?", "Federal money helped buy out the last absentee landlords", ["The railway was torn up", "The lots were taken from farmers", "The Island was renamed again"], "It helped with the land question.", true],
  ["What was the land question?", "Most land was owned by landlords who lived elsewhere, and farmers rented it", ["Where to put the capital", "How to cross the strait", "Whose fox was the fastest"], "It was about who owned the farmland."],
  ["In 1767 how were the Island’s 67 lots given out?", "by a lottery (ballot)", ["sold at a market to local farmers", "given to the French settlers", "voted on one by one by Islanders"], "Names were drawn from a ballot box."],
  ["The 1767 land lottery still affects maps today. How?", "The 67 lots are still used as areas on Island maps", ["There are 67 bridges", "There are 67 lighthouses", "There are 67 ferries"], "Look at an Island map for numbered “Lot” areas.", true],
  ["The 1799 decision to rename the Island affects us today because…", "we still use the name Prince Edward Island", ["we still use the name Île Saint-Jean", "we still speak only French", "we still have no roads"], "Check the name on a map."],
  ["Which cause helped lead to the Island’s 1873 decision?", "a large debt from building the railway", ["a new bridge", "a car ban", "a fox ranch"], "Money problems pushed Islanders to act."],
  ["Under the 1873 terms, what link did the Government of Canada provide until 1997?", "a ferry service across the strait", ["an airline", "a bridge", "a railway under the sea"], "The bridge came later.", true],
  ["Which decision came first?", "joining Confederation in 1873", ["banning cars in 1908", "opening the bridge in 1997", "ending the last trains in 1989"], "Put the years in order."],
  ["Put these decisions in order: the lottery (1767), the renaming (1799), joining Confederation (1873).", "lottery, renaming, joining Confederation", ["joining Confederation, renaming, lottery", "renaming, lottery, joining Confederation", "lottery, joining Confederation, renaming"], "Look at the years.", true],
  ["Why might people disagree about a decision like joining Confederation?", "They may have different needs or beliefs", ["Everyone always agrees", "Decisions never affect anyone", "Only one person lives on the Island"], "People can see the same choice in different ways."],
  ["Which statement uses evidence to explain an impact?", "The bridge opened in 1997, so cars can now cross to the mainland without a boat", ["The bridge is nice", "I think everyone likes the bridge", "The bridge is big, so it must be good"], "Evidence includes facts and dates."],
  ["Cars were kept off roads soon after the 1908 ban. What kind of effect is this?", "a short-term effect", ["a long-term effect only", "no effect", "a cause"], "It happened right away."],
  ["Joining Canada in 1873 still shapes how the Island is governed. What kind of effect is this?", "a long-term effect", ["a short-term effect only", "no effect", "a cause"], "It lasts to today."],
  ["A person might have supported joining Confederation because…", "the Island had a large debt and Canada offered help", ["they wanted fewer roads", "they wanted to rename the Island", "they disliked the sea"], "Think about money problems.", true],
  ["A person might have disagreed with joining because…", "they felt the land question was not being solved", ["they wanted the bridge sooner", "they wanted more cars", "they wanted to leave the Island"], "George Coles raised this worry.", true],
  ["Who was the first premier under responsible government?", "George Coles", ["Samuel Holland", "Charles Dalton", "L. M. Montgomery"], "He led the Reform party."],
  ["What does “responsible government” mean?", "The government must answer to the elected assembly", ["The government never changes", "The government is chosen by lottery", "The government stays out of Island life"], "The people’s elected members hold power.", true],
  ["Which is NOT a political decision?", "a storm damaging a harbour", ["banning cars", "joining Confederation", "renaming the Island"], "Governments make decisions; storms do not."],
  ["How did the 1997 bridge change life compared with before?", "People could drive across the strait", ["People had to take a ferry", "People could not leave the Island", "People could only travel by train"], "Compare before and after."],
];

const ECONOMY: Q[] = [
  ["What is an economic activity?", "work people do to make, sell or provide things people need or want", ["a game played at recess", "a kind of weather", "a song sung at a ceilidh"], "Think of jobs and trade."],
  ["Which of these is a good?", "a bag of potatoes", ["a haircut", "a ferry ride", "a music lesson"], "You can hold a good in your hands."],
  ["Which of these is a service?", "a ferry ride", ["a bag of potatoes", "a silver fox pelt", "a wooden ship"], "A service is work done for you."],
  ["In the 1800s wooden ships built on the Island were sold to other places. What is this called?", "exporting", ["importing", "surveying", "voting"], "Selling goods beyond the Island.", true],
  ["Which natural resource made building wooden ships possible?", "trees (wood)", ["coal", "oil", "gold"], "Early ships were made of timber."],
  ["Which natural resource do Island farmers depend on most?", "soil", ["ice", "iron ore", "tides"], "Crops grow in it."],
  ["Which crop is the Island most famous for growing?", "potatoes", ["bananas", "rice", "cotton"], "It is often called the Island’s biggest crop."],
  ["In 2021 about how much of Canada’s potato acres were on the Island?", "more than one fifth", ["less than one tenth", "nearly all", "exactly half"], "It is a big share, but not most.", true],
  ["When does the main potato harvest usually begin?", "late September", ["January", "March", "late June"], "Think of autumn."],
  ["Which group did fishing first draw to the Island?", "European settlers", ["tourists", "railway workers", "bridge builders"], "Fishing came long before the railway."],
  ["Which Island industry had shrunk a great deal by the late 1870s?", "building wooden ships", ["potato farming", "tourism", "bridge building"], "Wooden sailing ships were being replaced.", true],
  ["Who raised silver foxes in captivity with lasting success?", "Charles Dalton and Robert Oulton", ["Samuel Holland and George Coles", "L. M. Montgomery and the Earl of Selkirk", "Queen Charlotte and Prince Edward"], "They worked together in the 1890s.", true],
  ["When did Charles Dalton first market silver fox pelts?", "1896", ["1756", "1920", "2001"], "It was in the late 1890s.", true],
  ["About how many fox ranches were on the Island by 1913?", "277", ["27", "2 700", "9"], "There were hundreds of them.", true],
  ["In what year was fox farming named a National Historic Event?", "1939", ["1799", "1873", "1997"], "It was more than 40 years after the first pelts.", true],
  ["A farmer grows potatoes and sells them. The farmer is a…", "producer", ["consumer", "surveyor", "tourist"], "A producer makes or grows goods."],
  ["A family buys potatoes at a market. The family is…", "a consumer", ["a producer", "a surveyor", "an exporter"], "A consumer buys and uses goods."],
  ["Which job is part of tourism?", "running a guest house for visitors", ["building a wooden ship in 1850", "trapping foxes for ranches", "digging a canal"], "Tourism serves people who visit."],
  ["How could the end of wooden shipbuilding affect a family?", "Workers lost jobs and families had less money to spend", ["Everyone got a bigger home", "Nothing at all changed", "The ships became faster"], "A job change affects the whole household."],
  ["How can a bridge help Island businesses?", "Goods and visitors can travel to and from the mainland more easily", ["It makes goods vanish", "It stops all visitors", "It closes the harbour"], "Better travel helps selling and visiting."],
  ["Which of these started earliest?", "fishing that drew early European settlers", ["fox farming in the 1890s", "the railway in 1875", "the Confederation Bridge in 1997"], "Fishing is the oldest on this list."],
  ["What is a natural resource?", "something from nature that people use", ["a toy from a store", "a song people sing", "a coin"], "Soil, trees and fish are examples."],
  ["Which pair shows a resource and a job that uses it?", "the sea and fishing", ["trees and potato farming", "ice and silver fox pelts", "wind and railway tickets"], "Match the resource to the work."],
  ["Half the Island’s land is farmed, which helped give it which nickname?", "the Garden Province", ["the Mountain Province", "the Ice Province", "the Island of Gold"], "Gardens are full of growing plants."],
  ["Why does the Island trade goods beyond its shores?", "to sell what it makes or grows and get what it needs", ["to keep everything the same", "to stop people working", "to hide its goods"], "No place has everything."],
  ["Silver foxes were raised mostly for their…", "fur (pelts)", ["milk", "wool", "feathers"], "People wore the fur."],
  ["In 1913 the Island’s foxes were worth about $14 million. What does that show?", "Fox ranching was a big business then", ["Foxes were not worth much", "Ranching had just begun", "No one wanted fur"], "A lot of money means a big industry.", true],
  ["A change in one activity can affect others. If potato farms sell more, who may also have more work?", "truck and ferry workers who move the crop", ["wooden ship builders in the 1800s", "fox ranchers in 1913", "railway builders in 1875"], "Think of who carries potatoes to buyers today."],
];

const LIFESTYLES: Q[] = [
  ["Which was used for light in homes long ago?", "an oil lamp", ["a television", "a smart speaker", "an LED bulb"], "It burned oil to make a flame."],
  ["Which is a clue that a picture shows life long ago?", "a horse and wagon on a dirt road", ["a smartphone in a hand", "an electric car charging", "a satellite dish"], "Look for tools people no longer use every day."],
  ["Cars arrived on the Island in the early 1900s. How did they change life?", "People could travel farther in less time", ["People could not leave home", "Roads became rivers", "Farms disappeared"], "A car is faster than a wagon."],
  ["How did the railway (1875) change travel?", "People and goods could cross the Island faster than by horse", ["People had to walk", "Boats could no longer sail", "Roads were closed forever"], "Trains are faster than horses."],
  ["In the 1800s most rural Islanders earned a living by…", "farming, fishing and lumbering", ["flying airplanes", "building cars", "programming computers"], "Think of jobs that use land, sea and forest."],
  ["Long ago, how did people send a message to a friend far away?", "by letter", ["by text message", "by video call", "by email"], "It had to travel in a bag."],
  ["Today messages can arrive in seconds. What made this possible?", "new technology", ["more horses", "shorter roads", "a new calendar"], "People invented new tools."],
  ["What is technology?", "tools and machines people make to solve problems", ["only computers", "only old tools", "stories and songs"], "A wheel is technology too."],
  ["Which is a cause of lifestyle change?", "new inventions such as cars and telephones", ["the colour of the sky", "the number of letters in a name", "the size of a coin"], "Inventions change how people live.", true],
  ["Which has stayed the same on the Island from long ago to today?", "neighbours get together for music, like at ceilidhs", ["everyone travels by horse", "nobody uses boats", "all homes use oil lamps"], "Some customs last for generations."],
  ["Long ago many Island families grew much of their own food. Today many…", "buy food at stores as well", ["never eat vegetables", "have stopped eating", "only eat food from the sea"], "Compare then and now."],
  ["“We ride the train to town and heat our house with a wood stove.” When might this be from?", "before 1969", ["the 2020s", "last week", "after 1997"], "The last passenger train left in 1969.", true],
  ["A photo shows people driving over a very long bridge to the mainland. When was it taken?", "after 1997", ["in 1850", "in 1888", "in 1908"], "The bridge opened in 1997.", true],
  ["In 1908 why would an Island family be unlikely to own a car?", "Cars were banned on Island roads", ["Cars had not been invented", "Everyone owned a car", "Cars were free"], "Look at the law.", true],
  ["Which activity at a community hall has been enjoyed long ago and today?", "a ceilidh with fiddle music", ["watching a streaming show on a phone", "chatting in an app", "playing an online game"], "It needs no screens."],
  ["Which job was common in the 1800s but is less common today?", "building wooden sailing ships", ["teaching school", "growing potatoes", "driving a delivery truck"], "Shipbuilding declined by the late 1870s.", true],
  ["Which change is true for getting around the Island since 1875?", "Cars have mostly replaced horses and trains", ["Horses have replaced cars", "Everyone now travels by ship", "Roads have disappeared"], "Think about what people drive today."],
  ["Long ago light came from lamps. Today most homes use…", "electric lights", ["candles only", "gas lamps only", "no light"], "You flip a switch."],
  ["Which clue belongs to an earlier lifestyle?", "washing clothes by hand with a washboard", ["running a dishwasher", "charging a tablet", "using a microwave"], "Look for tools that need no electricity."],
  ["Which clue belongs to a later lifestyle?", "using a smartphone to check the weather", ["pumping water by hand", "writing with a quill pen", "reading by candlelight"], "Choose the newest tool.", true],
  ["“We fetch water from the well and read by oil lamp.” Where did the family get water?", "from a well", ["from a tap", "from a lamp", "from a train"], "Read the first part of the sentence."],
  ["Which could cause a family to leave shipbuilding work in the late 1800s?", "wooden shipbuilding declined", ["new bridges opened", "potatoes stopped growing", "foxes were banned"], "Jobs end when an industry shrinks.", true],
  ["How did silver fox ranching change some Islanders’ lives around 1900?", "It created new work and, for some, new wealth", ["It ended all farming", "It brought the first railway", "It closed the harbours"], "A big new industry brings new jobs.", true],
  ["A letter takes days to arrive. A telephone call connects…", "at once", ["next week", "only in summer", "after a month"], "Think about speed."],
  ["Which need is the same for families long ago and today?", "food, shelter and clothing", ["oil lamps", "washboards", "horse-drawn wagons"], "Some needs never change."],
  ["Long ago many people sewed or knitted clothes at home. Today most people…", "buy clothes in shops", ["make all their own cloth", "go without clothes", "wear only wool"], "Compare then and now.", true],
  ["Which describes how communication has changed?", "from letters by mail to messages in seconds", ["from phones to letters", "from email to smoke signals", "it has not changed"], "Look at how fast a message travels."],
];

const CULTURE: Q[] = [
  ["What is a cultural tradition?", "a custom or practice passed down in a group", ["a rule only for one person", "a kind of weather", "a type of road"], "Families and communities share them."],
  ["How are traditions passed on?", "families and communities share them with younger people", ["only by laws", "they cannot be passed on", "only by buying a book"], "People teach what they love."],
  ["A kitchen party is a gathering with music. It is a descendant of which older tradition?", "the Gaelic ceilidh", ["a car parade", "the Selkirk lottery", "a railway trip"], "The Scottish Highland settlers brought it.", true],
  ["Which traditions came to the region with Scottish Gaelic-speaking settlers?", "fiddle music, dancing and storytelling", ["silver fox farming and shipbuilding", "railway building and car racing", "lottery drawing and surveying"], "These are traditions people do together."],
  ["Where are many Island ceilidhs held?", "in community halls, churches and legion branches", ["on the Confederation Bridge", "in a ferry engine room", "on railway tracks"], "Look for places where neighbours meet."],
  ["How do ceilidhs influence Island life today?", "People of all ages still gather for music and to visit", ["Nobody plays music", "Everyone stays home", "People travel only by train"], "A tradition lives when people keep doing it."],
  ["Which instrument is strongly linked to Island ceilidhs?", "the fiddle", ["the tuba", "the xylophone", "the triangle"], "Island fiddle music has Scottish roots."],
  ["Which place honours L. M. Montgomery as a national historic site?", "Cavendish", ["Tignish", "Souris", "Borden-Carleton"], "She lived there with her grandparents."],
  ["Which story by an Island author do readers around the world know?", "Anne of Green Gables", ["Treasure Island", "Alice in Wonderland", "The Hobbit"], "It was a worldwide success."],
  ["Which important event took place at Province House in 1864?", "the Charlottetown Conference", ["the Selkirk settlers’ arrival", "the opening of the bridge", "the first railway ride"], "Leaders met there in the autumn."],
  ["In which month and year did the Charlottetown Conference begin?", "September 1864", ["July 1873", "May 1997", "August 1803"], "It was in the early autumn of the 1860s."],
  ["Who first planned to meet in Charlottetown in 1864?", "leaders of the Maritime colonies", ["leaders of the whole world", "railway workers", "fox ranchers"], "They wanted to talk about a Maritime union.", true],
  ["Why did other leaders come to Charlottetown in 1864?", "to ask the Maritime leaders to think about a bigger union", ["to open the bridge", "to start the lottery", "to ban cars"], "They hoped for a union of more colonies.", true],
  ["What was the main consequence of the Charlottetown Conference?", "It helped start the talks that led to Confederation", ["It ended the Island’s name", "It built the railway", "It stopped all talks"], "Cause comes first, consequence follows.", true],
  ["Why is Charlottetown called the birthplace of Confederation?", "Talks about uniting the colonies began there in 1864", ["Canada’s first ferry sailed from there", "Anne of Green Gables was born there", "It is the biggest city in the world"], "Think of the 1864 meeting."],
  ["What honour does Province House have?", "It is a national historic site", ["It is the longest bridge", "It was the first railway station", "It is the oldest ferry"], "Parks Canada looks after places like this."],
  ["How is the Charlottetown Conference remembered today?", "Charlottetown is honoured as the birthplace of Confederation", ["It is forgotten", "It is remembered as a ferry route", "It is remembered as a fox ranch"], "Look for a title Charlottetown holds."],
  ["Which list puts these events in order: the Conference, the Island joining Confederation, the bridge opening?", "1864, 1873, 1997", ["1873, 1864, 1997", "1997, 1873, 1864", "1864, 1997, 1873"], "Start with the earliest year.", true],
  ["How many years after the Conference did the Island join Confederation?", "9 years", ["19 years", "90 years", "1 year"], "Subtract 1864 from 1873.", true],
  ["Why do people call an event significant?", "It changed life for many people for a long time", ["It happened on a sunny day", "It was small and quick", "Few people ever heard of it"], "Think about long-lasting changes."],
  ["Which would a historian most likely call a significant event?", "the Island joining Confederation in 1873", ["a school lunch menu change", "a missing mitten", "a rainy afternoon"], "It changed how the Island is governed."],
  ["The Charlottetown Conference began as a meeting about a union of how many colonies?", "three", ["one", "seven", "twelve"], "They were the Maritime colonies.", true],
  ["The Confederation Bridge opened on 31 May 1997. How can we describe it as a significant event?", "It joined the Island to the mainland by road", ["It ended the Island’s railway", "It was a sports game", "It was only a small repair"], "Think about how travel changed."],
  ["Lennox Island is a Mi’kmaw community on the Island. What does this show?", "Mi’kmaw communities and culture continue on the Island today", ["Mi’kmaw culture ended in 1720", "Only the French live there", "Lennox Island is a bridge"], "The Mi’kmaq are here today."],
  ["What helps keep a tradition alive?", "people keep practising and teaching it", ["no one remembers it", "it is never shared", "it is locked away"], "Traditions live in people."],
  ["Which sentence tells the Conference story in order?", "Maritime leaders planned a meeting, other leaders joined, then talks turned to a bigger union", ["Talks turned to a bigger union, then leaders planned a meeting, then others joined", "Other leaders joined, then the meeting ended, then it was planned", "The bridge opened, then leaders met, then the meeting was planned"], "Follow the story from planning to result.", true],
  ["Which is NOT a cultural tradition?", "a rainy day", ["a ceilidh", "a storytelling night", "a fiddle tune handed down"], "A tradition is something people do and pass on."],
  ["In which city is Province House?", "Charlottetown", ["Summerside", "Souris", "Tignish"], "It is the Island’s capital."],
];

export const peIslandTime6 = bankUnit({
  id: "pe-island-time-6",
  title: "Island Time Lines",
  emoji: "⏳",
  blurb: "Put Island history events in order",
  parentNote: "Practises reading and building time lines to place selected events of the Contemporary/European period of Prince Edward Island history in order.",
  standards: ["6.1.1", "placing selected events of the Contemporary/European period of Island history on a time line"],
  items: TIME,
});

export const peIslandPeople6 = bankUnit({
  id: "pe-island-people-6",
  title: "People of Island History",
  emoji: "🧑‍🤝‍🧑",
  blurb: "Many people, one Island story",
  parentNote: "Practises how people from many parts of the world are part of Prince Edward Island history, and how to research the historical contributions of one individual.",
  standards: ["6.2.1; 6.2.2", "people from many parts of the world in Island history, and researching one person's contributions"],
  items: PEOPLE,
});

export const peIslandTransport6 = bankUnit({
  id: "pe-island-transport-6",
  title: "Getting Around the Island",
  emoji: "🚂",
  blurb: "Transportation on the Island over time",
  parentNote: "Practises how the modes of transportation on the Island have developed over time.",
  standards: ["6.3.1", "how the modes of transportation on the Island developed over time"],
  items: TRANSPORT,
});

export const peIslandGovernment6 = bankUnit({
  id: "pe-island-government-6",
  title: "Island Decisions",
  emoji: "🏛️",
  blurb: "How past decisions shape today",
  parentNote: "Practises how past political decisions have affected present-day life on Prince Edward Island.",
  standards: ["6.4.1", "how past political decisions have shaped present-day life on the Island"],
  items: GOVERNMENT,
});

export const peIslandEconomy6 = bankUnit({
  id: "pe-island-economy-6",
  title: "Island Economy Over Time",
  emoji: "💰",
  blurb: "Jobs and trade through the years",
  parentNote: "Practises the economic activities carried out on Prince Edward Island over time and how they have changed.",
  standards: ["6.5.1", "the economic activities on the Island and how they have changed over time"],
  items: ECONOMY,
});

export const peIslandLifestyles6 = bankUnit({
  id: "pe-island-lifestyles-6",
  title: "Changing Island Lifestyles",
  emoji: "🏡",
  blurb: "Then and now",
  parentNote: "Practises how the lifestyles of people on Prince Edward Island have changed over time.",
  standards: ["6.6.1", "how the lifestyles of people on the Island have changed over time"],
  items: LIFESTYLES,
});

export const peIslandCulture6 = bankUnit({
  id: "pe-island-culture-6",
  title: "Island Traditions & Big Events",
  emoji: "🎉",
  blurb: "Culture and a significant event",
  parentNote: "Practises how Island cultural traditions influence life on Prince Edward Island today, and the importance of a significant event of Island history.",
  standards: ["6.7.1; 6.7.2", "the cultural traditions of the Island today, and a significant event of Island history"],
  items: CULTURE,
});
