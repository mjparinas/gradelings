import { pick, randInt, shuffle, textChoice } from "../../random";
import type { Question, Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { fromItems, mixUnit, timelineUnit, type Dated } from "./social-kit";

// Oregon Grade 4 social studies: Oregon, from time immemorial to the present (2024 standards). Every unit is
// written for Oregon. Content about the nine federally recognized Tribes follows Tribal History/Shared History:
// light, in the present tense, each Tribe named as it names itself, nothing sacred or ceremonial.

const LAND: Q[] = [
  ["Which ocean forms Oregon's western border?", "the Pacific Ocean", ["the Atlantic Ocean", "the Arctic Ocean"], "Oregon's coast faces the Pacific."],
  ["What is the highest mountain in Oregon?", "Mount Hood", ["Mount Shasta", "Mount Jefferson", "Mount McLoughlin"], "Mount Hood is a volcano near Portland."],
  ["Crater Lake formed when which volcano collapsed?", "Mount Mazama", ["Mount Hood", "Mount Fuji"], "Mount Mazama erupted and collapsed about 7 700 years ago."],
  ["Crater Lake is the deepest lake in…", "the United States", ["the world", "Europe"], "It is almost 2 000 feet deep."],
  ["Which Oregon region has the mildest, wettest climate?", "the Coast", ["the High Desert", "the Blue Mountains"], "Ocean air keeps the coast mild and rainy."],
  ["Why is eastern Oregon drier than western Oregon?", "the Cascades block rain clouds from the Pacific", ["eastern Oregon is closer to the ocean", "it never gets sunlight"], "Clouds drop their rain on the west side of the mountains."],
  ["The dry area on the side of mountains away from the ocean is called a…", "rain shadow", ["rainforest", "delta"], "Mountains cast a 'shadow' of dry land."],
  ["Which river flows north through the Willamette Valley?", "the Willamette River", ["the Snake River", "the Rogue River"], "The Willamette flows north into the Columbia."],
  ["The Columbia River Gorge cuts through which mountains?", "the Cascade Range", ["the Blue Mountains", "the Klamath Mountains"], "The Columbia carved a path through the Cascades."],
  ["Hells Canyon, one of the deepest river gorges in North America, was carved by the…", "Snake River", ["Willamette River", "Columbia River"], "It lies on the Oregon–Idaho border."],
  ["A compass rose on a map shows…", "directions", ["distance", "population"], "N, S, E and W."],
  ["A map scale shows…", "how distance on the map compares to real distance", ["the date", "the weather"], "Use the scale to measure distance."],
  ["Which US region is Oregon in?", "the Northwest", ["the Southeast", "the Northeast"], "Oregon is in the Pacific Northwest."],
  ["Which US region includes Florida and Georgia?", "the Southeast", ["the Northwest", "the Midwest"], "They are in the south and east."],
  ["Which US region includes Arizona and New Mexico?", "the Southwest", ["the Northeast", "the Midwest"], "Deserts and canyons mark the Southwest."],
  ["Which US region includes Iowa and Illinois?", "the Midwest", ["the Southwest", "the Northwest"], "The Midwest is in the middle of the country."],
  ["Which US region includes New York and Maine?", "the Northeast", ["the Southeast", "the Southwest"], "They are in the north and east."],
  ["What is the capital of California?", "Sacramento", ["Los Angeles", "San Francisco"], "Sacramento is in central California."],
  ["What is the capital of Idaho?", "Boise", ["Pocatello", "Idaho Falls"], "Boise is in southwestern Idaho."],
  ["What is the capital of Nevada?", "Carson City", ["Las Vegas", "Reno"], "Carson City is near Lake Tahoe."],
  ["What is the capital of Alaska?", "Juneau", ["Anchorage", "Fairbanks"], "Juneau can only be reached by sea or air."],
  ["What is the capital of Hawaii?", "Honolulu", ["Hilo", "Lahaina"], "Honolulu is on the island of Oʻahu."],
  ["What is the capital of Mexico?", "Mexico City", ["Guadalajara", "Monterrey"], "Mexico City is one of the world's largest cities."],
  ["What is the capital of Canada?", "Ottawa", ["Toronto", "Vancouver"], "Ottawa is in eastern Canada."],
  ["Dams on the Columbia River make electricity, but they also…", "make it harder for salmon to swim upstream", ["make the river salty", "stop all rain"], "Fish ladders help, but salmon runs fell after dams were built."],
  ["Wind turbines in eastern Oregon make electricity from…", "wind, a renewable resource", ["coal", "oil"], "Wind does not run out."],
  ["Celilo Falls, a great fishing and trading place on the Columbia for thousands of years, was flooded in 1957 by…", "The Dalles Dam", ["Hoover Dam", "a tsunami"], "Tribes still fish along the Columbia today.", true],
  ["Which Oregon river flows west through the Klamath Mountains to the Pacific?", "the Rogue River", ["the John Day River", "the Deschutes River"], "The Rogue reaches the ocean at Gold Beach.", true],
  ["The Deschutes River flows north through central Oregon into the…", "Columbia River", ["Pacific Ocean", "Snake River"], "Many Oregon rivers end in the Columbia.", true],
  ["Why did many early Oregon towns grow along rivers?", "rivers gave water, power and a way to move goods", ["rivers were the only flat roads for cars", "there was no other water"], "Rivers were highways.", true],
  ["Oregon's 1967 Beach Bill keeps the dry-sand beaches…", "open to the public", ["owned by hotels", "closed to visitors"], "Everyone can use Oregon's beaches.", true],
];

const TRIBES: Q[] = [
  ["How many federally recognized Tribes are in Oregon?", "nine", ["two", "fifty"], "Oregon has nine federally recognized Tribes."],
  ["A federally recognized Tribe is…", "a sovereign nation with a government-to-government relationship with the United States", ["a club", "a city department"], "Tribes are nations with their own governments."],
  ["Tribal sovereignty means a Tribe…", "governs itself, making its own laws and decisions", ["has no government", "is run by a city"], "Sovereign means self-governing."],
  ["Many Tribal governments in Oregon have a written…", "constitution", ["menu", "report card"], "A constitution sets out how a government works."],
  ["A Tribal constitution sets out…", "how the Tribe's government works and who its members are", ["the rules of a board game", "school lunch prices"], "Like Oregon's constitution, it is a plan for government."],
  ["Many Tribes in Oregon elect a council to…", "lead their government", ["run the state of Oregon", "plan school recess"], "Tribal members choose their leaders."],
  ["The Confederated Tribes of Warm Springs are the Warm Springs, Wasco and… peoples.", "Paiute", ["Modoc", "Coos"], "Three peoples make up the Confederated Tribes of Warm Springs."],
  ["The Confederated Tribes of the Umatilla Indian Reservation are the Cayuse, Umatilla and… peoples.", "Walla Walla", ["Modoc", "Wasco"], "Their reservation is near Pendleton."],
  ["The Klamath Tribes are the Klamath, Modoc and… peoples.", "Yahooskin", ["Wasco", "Cayuse"], "The Klamath Tribes are in south-central Oregon."],
  ["Which Tribe's reservation is near Pendleton in northeastern Oregon?", "the Confederated Tribes of the Umatilla Indian Reservation", ["the Coquille Indian Tribe", "the Confederated Tribes of Siletz Indians"], "Pendleton is in Umatilla County."],
  ["The Burns Paiute Tribe's homeland is in…", "the High Desert of southeastern Oregon", ["the north coast", "the Willamette Valley"], "The Burns Paiute Reservation is near the town of Burns."],
  ["The Confederated Tribes of Siletz Indians are based near…", "the central Oregon coast", ["the High Desert", "Hells Canyon"], "Siletz is in Lincoln County."],
  ["The Coquille Indian Tribe and the Confederated Tribes of Coos, Lower Umpqua and Siuslaw Indians are based on Oregon's…", "southern coast", ["eastern border", "Columbia Plateau"], "Both are near Coos Bay."],
  ["The Cow Creek Band of Umpqua Tribe of Indians has its homeland in…", "southwestern Oregon", ["northeastern Oregon", "the far north coast"], "Their homeland is in the Umpqua River area."],
  ["The Confederated Tribes of Grand Ronde are made up of…", "more than 30 tribes and bands", ["one family", "people from one town"], "Many western Oregon peoples are part of Grand Ronde."],
  ["In the 1950s, the US government ended its recognition of the Klamath Tribes and many western Oregon Tribes. This was called…", "termination", ["restoration", "statehood"], "Termination took away federal recognition and much land."],
  ["Tribes worked for years to win back federal recognition. This is called…", "restoration", ["termination", "migration"], "Restored Tribes rebuilt their governments."],
  ["Which terminated Tribe in Oregon was the first to be restored, in 1977?", "the Confederated Tribes of Siletz Indians", ["the Klamath Tribes", "the Coquille Indian Tribe"], "Siletz was restored in 1977."],
  ["Oregon's Tribal History/Shared History law makes sure students…", "learn about the Tribes of Oregon in school", ["learn only about other states", "never learn history"], "The law was passed in 2017."],
  ["Tribes in Oregon today run…", "schools, health clinics, businesses and natural resource programs", ["nothing", "only museums"], "Tribal governments serve their communities."],
  ["Salmon, deer, roots and berries are foods that…", "many Tribes in Oregon have gathered for thousands of years and still do", ["no one in Oregon eats", "came from Europe"], "These foods are still important today."],
  ["Many Tribes in Oregon keep their languages strong by…", "teaching them to children", ["forgetting them", "banning them"], "Language programs help young people learn."],
  ["Is it right to say all Tribes in Oregon are the same?", "No, each Tribe has its own history, government and culture", ["Yes, they are one group", "Yes, they share one language"], "There are nine different Tribes, and many peoples within them."],
  ["Tribes in Oregon have lived on these lands…", "since time immemorial", ["only since 1859", "for about 100 years"], "Time immemorial means longer than anyone can remember."],
  ["When comparing two Tribal constitutions, you might look at…", "how leaders are chosen and who can be a member", ["their favourite colours", "the weather"], "Constitutions describe government and membership.", true],
  ["The Klamath Tribes regained federal recognition in…", "1986", ["1859", "1776"], "The Klamath Tribes were restored in 1986.", true],
  ["The Confederated Tribes of Grand Ronde were restored in…", "1983", ["1954", "1912"], "Grand Ronde was restored in 1983.", true],
  ["Treaties signed in 1855 by the Tribes of Warm Springs and of the Umatilla Reservation…", "are still law and protect rights the Tribes kept, such as fishing", ["were all cancelled", "were only about money"], "Treaty rights are still honoured in court.", true],
  ["Tribes and the State of Oregon work together through…", "government-to-government meetings", ["school field trips only", "a single shared government"], "Oregon law sets up regular meetings between the state and the nine Tribes.", true],
];

const COUNTRY: Q[] = [
  ["Before explorers arrived, the land that is now Oregon was home to…", "many Tribes with their own lands, languages and governments", ["no one", "one single tribe"], "Many peoples lived here."],
  ["In 1792, American captain Robert Gray sailed into a great river and named it after his ship. Which river?", "the Columbia River", ["the Willamette River", "the Snake River"], "His ship was the Columbia Rediviva."],
  ["Which two explorers led the Corps of Discovery to the Pacific in 1805?", "Meriwether Lewis and William Clark", ["Robert Gray and John McLoughlin", "Christopher Columbus and Ferdinand Magellan"], "Thomas Jefferson sent them west."],
  ["Which Lemhi Shoshone woman travelled with Lewis and Clark and helped them?", "Sacagawea", ["Abigail Scott Duniway", "Pocahontas"], "She helped with languages and travel."],
  ["Where did Lewis and Clark spend the winter of 1805–1806?", "Fort Clatsop, near the mouth of the Columbia", ["Fort Astoria", "Salem"], "They built Fort Clatsop near today's Astoria."],
  ["Astoria was founded in 1811 as a…", "fur-trading post", ["gold-mining camp", "railroad town"], "It was the first US settlement on the Pacific coast."],
  ["Fur traders wanted beaver pelts mostly to make…", "hats", ["boats", "houses"], "Beaver felt hats were popular in Europe."],
  ["Dr. John McLoughlin, who ran a large British fur-trading fort on the Columbia, is often called the…", "Father of Oregon", ["first governor of Oregon", "captain of the Columbia"], "He helped many newcomers."],
  ["In 1818, the United States and Britain agreed to share the Oregon Country. This was called…", "joint occupation", ["statehood", "the Gold Rush"], "Both countries could trade and settle there."],
  ["The Oregon Treaty of 1846 set the border between US and British lands at…", "the 49th parallel", ["the Columbia River", "the 42nd parallel"], "Land south of 49° north went to the United States."],
  ["In 1843, settlers met at Champoeg and voted to form a…", "provisional government", ["Tribal council", "state legislature"], "It was a temporary government."],
  ["The Oregon Country included land that is now Oregon, Idaho and parts of…", "Montana and Wyoming", ["Texas and Florida", "Arizona and Utah"], "It stretched from California to Alaska's border."],
  ["Explorers' maps from the 1700s and 1800s often left out…", "the Tribal lands and villages already there", ["the Pacific Ocean", "all rivers"], "Compare old maps with Tribal maps."],
  ["Comparing an old fur-trade map with a modern map can show…", "how places, names and borders changed", ["that nothing changed", "that the ocean moved"], "Maps change over time."],
  ["Diseases brought by newcomers, such as smallpox and malaria,…", "killed many Native people in the Oregon Country", ["helped crops grow", "didn't affect anyone"], "Native people had no immunity to these diseases."],
  ["Tribes along the Columbia River traded salmon, shells and other goods long before…", "European traders arrived", ["the Pacific Ocean formed", "people lived anywhere"], "Trade networks are thousands of years old."],
  ["Why did fur traders build posts near rivers?", "rivers were the main routes for travel and trade", ["rivers had no animals", "roads were already paved"], "Canoes and boats carried furs."],
  ["Missionaries came to the Oregon Country in the 1830s hoping to…", "convert Native people to their religion", ["start a gold mine", "build railroads"], "Jason Lee's mission came in 1834."],
  ["How did physical features affect exploration?", "explorers followed rivers and looked for passes through mountains", ["they didn't matter", "explorers flew over them"], "Geography shapes routes."],
  ["Beaver, salmon and timber drew…", "traders and settlers to the Pacific Northwest", ["no one", "only tourists"], "Natural resources attract people."],
  ["Who was President when Lewis and Clark set out?", "Thomas Jefferson", ["George Washington", "Abraham Lincoln"], "Jefferson planned the expedition."],
  ["Lewis and Clark's trip followed the Louisiana Purchase of…", "1803", ["1776", "1859"], "The US bought the Louisiana Territory from France."],
  ["York, an enslaved Black man on the Lewis and Clark expedition,…", "hunted, scouted and worked like the other members", ["stayed home in Missouri", "led the expedition"], "York's work helped the expedition succeed.", true],
  ["Why did the United States and Britain both want the Oregon Country?", "its furs, farmland, harbours and rivers", ["its deserts only", "its gold coins"], "It was rich in resources.", true],
  ["Early settlers' maps often gave English names to places that already had…", "names in Tribal languages", ["no names", "only numbers"], "Many places have older names.", true],
  ["The fur trade changed many Tribes' lives because…", "new goods, new diseases and new people arrived", ["nothing changed", "Tribes stopped trading"], "Change came quickly.", true],
];

const TRAIL: Q[] = [
  ["About how long was the Oregon Trail, from Missouri to Oregon?", "2 000 miles", ["200 miles", "20 000 miles"], "That is about 3 200 kilometres."],
  ["Most families on the Oregon Trail travelled in…", "covered wagons pulled by oxen", ["trains", "steamships"], "Oxen were slow but strong."],
  ["The journey on the Oregon Trail took about…", "four to six months", ["one week", "three years"], "Families left in spring to beat the snow."],
  ["Many pioneers wanted to reach the Willamette Valley because of its…", "rich farmland", ["gold mines", "deserts"], "The valley has good soil and rain."],
  ["The first big wagon train to Oregon, the 'Great Migration', was in…", "1843", ["1492", "1912"], "About 1 000 people came in 1843."],
  ["Manifest Destiny was the belief that…", "the United States should spread across the continent", ["Tribes should keep all their lands", "Oregon should stay British"], "This idea drove westward expansion."],
  ["The idea of Manifest Destiny ignored that…", "Tribes already lived on and governed the land", ["the land was empty", "the ocean was in the way"], "The land was already home to many nations."],
  ["The Donation Land Claim Act of 1850 gave free land mostly to…", "white settlers, while Black and Hawaiian people were left out", ["everyone equally", "only Tribes"], "The law was unfair to many groups."],
  ["Land given away under the Donation Land Claim Act was…", "Tribal homelands, often given out before any treaty", ["empty land no one had used", "land bought from Britain"], "Settlers claimed land Tribes had lived on for thousands of years."],
  ["Oregon became a US territory in…", "1848", ["1776", "1912"], "Oregon Territory was created in 1848."],
  ["Oregon became a state on…", "February 14, 1859", ["July 4, 1776", "January 1, 1900"], "Oregon joined the Union on Valentine's Day, 1859."],
  ["Oregon was the ___ state to join the United States.", "33rd", ["13th", "50th"], "Oregon was the 33rd state."],
  ["Oregon's 1857 constitution included an exclusion clause that…", "banned Black people from moving to Oregon", ["gave everyone the vote", "made Salem the capital"], "This racist clause was removed in 1926."],
  ["Oregon's 1857 constitution kept which residents from voting?", "Black and Chinese residents", ["farmers", "people born in Oregon"], "Racist laws denied many people the vote."],
  ["Racial prejudice in early Oregon led to laws that…", "kept people of colour out or treated them unfairly", ["treated everyone equally", "welcomed all newcomers"], "Many early laws were unfair."],
  ["Which city at the end of the Oregon Trail was the first capital of Oregon Territory?", "Oregon City", ["Astoria", "Bend"], "Salem became the capital later."],
  ["To get wagons over the Cascades instead of rafting down the Columbia, many pioneers used the…", "Barlow Road", ["Interstate 5", "Santa Fe Trail"], "The Barlow Road opened in 1846."],
  ["Pioneers sometimes traded with Tribes along the trail for…", "food, horses and help crossing rivers", ["cars", "phones"], "Tribes helped many travellers."],
  ["Why did many people leave the eastern United States for Oregon?", "free land and a chance at a new life", ["to escape the ocean", "to find snow"], "Land was a big pull factor."],
  ["As settlers poured in, many Tribes…", "lost land, food sources and lives", ["gained more land", "were not affected"], "Settlement brought great harm."],
  ["Diaries and letters written by pioneers are…", "primary sources about the trail", ["secondary sources", "fiction"], "They were written at the time."],
  ["To understand the trail from many points of view, you should read…", "accounts from Tribes, pioneers and others", ["only one diary", "only a movie script"], "History has many voices."],
  ["Which rock formation in Nebraska told travellers they were on the right trail?", "Chimney Rock", ["Mount Rushmore", "Haystack Rock"], "It was a famous landmark."],
  ["What was Oregon's capital when it became a state?", "Salem", ["Oregon City", "Portland"], "Salem has been the capital since statehood."],
  ["In 1857, Oregon voters decided that slavery would be…", "banned", ["allowed", "required"], "Oregon joined as a free state.", true],
  ["Racist wording stayed in Oregon's constitution until voters removed it in…", "2002", ["1859", "1900"], "Voters removed the last of it in 2002.", true],
  ["Joint occupation of the Oregon Country ended in 1846 with the…", "Oregon Treaty", ["Treaty of Paris", "Louisiana Purchase"], "The treaty set the 49th parallel border.", true],
  ["Who was Oregon's first governor after statehood?", "John Whiteaker", ["John McLoughlin", "Robert Gray"], "He took office in 1859.", true],
];

const CHANGE: Q[] = [
  ["As more settlers arrived in the 1850s, many Tribes…", "resisted the taking of their lands", ["gave up their lands happily", "moved to Europe"], "Tribes defended their homes."],
  ["The Rogue River Wars of 1855–1856 were fought in…", "southwestern Oregon", ["the Columbia Plateau", "the north coast"], "The Rogue River is in southwestern Oregon."],
  ["After the Rogue River Wars, many Native people from southwestern Oregon were forced to move to…", "reservations far from home, such as Siletz and Grand Ronde", ["Europe", "the High Desert by choice"], "Forced removal separated people from their homelands."],
  ["The Modoc War of 1872–1873 was fought near…", "the Oregon–California border", ["Portland", "Hells Canyon"], "It was fought in the lava beds near Tule Lake."],
  ["Kintpuash, also called Captain Jack, was a leader of the…", "Modoc", ["Nez Perce", "Siletz"], "He led Modoc people who resisted removal."],
  ["In 1877, Chief Joseph led Nez Perce people who did not want to leave their homeland in Oregon's…", "Wallowa Valley", ["Willamette Valley", "Rogue Valley"], "The Wallowa Valley is in northeastern Oregon."],
  ["Chief Joseph's band of Nez Perce travelled more than 1 000 miles while trying to…", "escape the US Army and reach safety", ["find gold", "sell horses"], "They were stopped just short of Canada."],
  ["Resilience means…", "staying strong and keeping your culture through hard times", ["giving up", "forgetting everything"], "Tribes in Oregon show resilience."],
  ["Many Tribes in Oregon show resilience today by…", "restoring languages, lands and salmon runs", ["doing nothing", "leaving Oregon"], "Tribes lead many restoration projects."],
  ["Chinese workers came to Oregon in the 1800s to work in…", "mines, railroads and canneries", ["space stations", "airports"], "They helped build Oregon."],
  ["The Chinese Exclusion Act of 1882…", "stopped most Chinese workers from coming to the United States", ["welcomed all immigrants", "gave Chinese workers land"], "It was a federal law based on prejudice."],
  ["During World War II, Japanese Americans in western Oregon were…", "forced to leave their homes and sent to camps", ["given new farms", "made governors"], "This happened in 1942."],
  ["Vanport, a city of wartime workers near Portland with many Black residents, was destroyed in 1948 by a…", "flood", ["fire", "volcano"], "The Columbia River broke through a dike."],
  ["After the Vanport flood, many Black families in Portland faced…", "housing discrimination", ["free new houses", "no problems"], "Unfair rules limited where they could live."],
  ["During World War II, workers from Mexico came to Oregon farms through the… program.", "Bracero", ["Homestead", "Donation"], "Braceros helped harvest crops."],
  ["Oregon's diverse culture today comes from…", "Tribes and many immigrant groups", ["one group only", "no one"], "Many peoples shaped Oregon."],
  ["Displacement means…", "people being forced from their homes or lands", ["people choosing a vacation", "building a new road"], "Many groups in Oregon faced displacement."],
  ["Long ago, many Native children were sent to boarding schools where they were not allowed to…", "speak their own languages", ["learn to read", "eat lunch"], "This caused cultural and language loss."],
  ["The legacy of discrimination means…", "unfair laws from the past still affect people today", ["the past doesn't matter", "everything is fixed"], "History shapes the present."],
  ["Letitia Carson, a Black pioneer, went to court in the 1850s to…", "keep the cattle and land she had earned", ["become governor", "close a school"], "She won her case."],
  ["Why is it important to learn about conflicts in Oregon's history?", "to understand how the past shapes people's lives today", ["to blame students today", "it isn't important"], "History helps us understand the present."],
  ["Big dams and canneries helped Oregon's economy but…", "hurt Tribes who lost fishing places", ["hurt no one", "stopped all fishing forever"], "Change affects groups differently."],
  ["Competition for jobs sometimes led to…", "unfair laws against immigrant workers", ["equal pay for all", "free land for immigrants"], "Economic competition can fuel prejudice."],
  ["Why did Tribes resist settlers moving onto their lands?", "to protect their homes, food and ways of life", ["they wanted to move away", "they had no reason"], "Land meant home and food.", true],
  ["A boundary dispute in Oregon's history was…", "whether the United States or Britain would control the Oregon Country", ["which school had the best team", "where to put a park"], "It ended with the Oregon Treaty of 1846.", true],
  ["Tribes along the Columbia today help manage salmon, which shows…", "their treaty rights and leadership", ["they no longer fish", "salmon are gone"], "Tribes work with state and federal agencies.", true],
  ["Chemawa Indian School in Salem opened in 1880. Today it…", "is still open, serving Native students", ["is a shopping mall", "is the state capitol"], "Schools for Native students have changed over time.", true],
];

const GOVERNMENT: Q[] = [
  ["Oregon's state constitution was written in…", "1857", ["1776", "1959"], "Delegates met in Salem in 1857."],
  ["Where was Oregon's constitutional convention held?", "Salem", ["Portland", "Astoria"], "Salem was the territorial capital."],
  ["Oregon's state legislature is called the…", "Legislative Assembly", ["Congress", "Parliament"], "It meets in the State Capitol."],
  ["How many members are in the Oregon State Senate?", "30", ["60", "100"], "Oregon has 30 state senators."],
  ["How many members are in the Oregon House of Representatives?", "60", ["30", "435"], "Oregon has 60 state representatives."],
  ["Oregon's governor serves a term of…", "four years", ["two years", "six years"], "Governors are elected every four years."],
  ["If Oregon's governor leaves office, who usually takes over?", "the Secretary of State", ["the mayor of Salem", "the oldest senator"], "Oregon has no lieutenant governor."],
  ["How many justices are on the Oregon Supreme Court?", "seven", ["nine", "three"], "Seven justices hear cases."],
  ["The three branches of Oregon's government are…", "legislative, executive and judicial", ["city, county and state", "red, white and blue"], "Each branch has its own job."],
  ["In 1902, Oregon voters added the initiative and referendum, which let citizens…", "propose and vote on laws themselves", ["skip elections", "choose judges by lottery"], "This gave voters direct power."],
  ["An initiative lets citizens…", "gather signatures to put a new law on the ballot", ["fire the President", "ignore laws"], "Enough signatures puts a measure on the ballot."],
  ["A referendum lets voters…", "approve or reject a law", ["write a newspaper", "start a war"], "Voters have the final say."],
  ["Oregon's direct democracy became known around the country as the…", "Oregon System", ["Bottle System", "Salem Plan"], "Other states copied it."],
  ["In 1908, Oregon voters added the recall, which lets voters…", "remove an elected official before the term ends", ["re-count votes", "move the capital"], "A recall needs a petition and a vote."],
  ["Oregon women won the right to vote through a ballot measure in…", "1912", ["1859", "1971"], "Voters approved it on their sixth try."],
  ["Oregon's 1971 Bottle Bill, the first in the US,…", "pays back a deposit when you return bottles and cans", ["banned all bottles", "taxed water"], "It cut litter and raised recycling."],
  ["Article I of Oregon's constitution, its Bill of Rights, protects…", "rights such as free speech and freedom of worship", ["only the governor", "the price of bread"], "The Bill of Rights comes first."],
  ["Which unfair part of Oregon's 1857 constitution was later removed?", "the clause banning Black people from moving to Oregon", ["the right to free speech", "the Supreme Court"], "Voters repealed it in 1926."],
  ["Oregon voters can change the state constitution by…", "voting on a ballot measure", ["asking a friend", "writing a song"], "Constitutional amendments go to voters."],
  ["Since 1998, Oregon has held elections…", "by mail", ["only by phone", "once every ten years"], "Every voter gets a ballot in the mail."],
  ["Why does civic participation matter?", "people's votes and voices can change laws", ["it doesn't", "only leaders count"], "Oregonians change laws by voting."],
  ["Two neighbours disagree about a new dam. Their different views may come from…", "their different identities, jobs and experiences", ["the weather", "a coin toss"], "Identity shapes perspective."],
  ["Oregon's constitution says no citizen or group should get special privileges that…", "other citizens can't have on the same terms", ["the governor approves", "cost money"], "Equal treatment under the law."],
  ["In 2014, Oregon voters added an amendment saying equal rights can't be denied because of…", "sex", ["height", "favourite sport"], "It is Oregon's Equal Rights Amendment.", true],
  ["William U'Ren is remembered for…", "leading the fight for the initiative and referendum", ["exploring the Columbia River", "founding Astoria"], "He was a leader of the Oregon System.", true],
  ["In 2016, Oregon became the first state to register eligible voters automatically when they…", "get or renew a driver's licence", ["turn 10", "buy groceries"], "This is called Motor Voter.", true],
  ["Which branch decides whether a state law follows Oregon's constitution?", "the judicial branch", ["the legislative branch", "the executive branch"], "Courts interpret laws.", true],
  ["Oregon state senators serve terms of… and representatives terms of…", "four years; two years", ["two years; four years", "six years; six years"], "Senators serve longer terms.", true],
];

const ECONOMY: Q[] = [
  ["A wage is…", "pay for each hour worked", ["pay for each sale", "a gift from a customer"], "Hourly workers earn a wage."],
  ["A salary is…", "a set amount of pay for a year", ["pay for each hour", "extra money from customers"], "Salaried workers get the same pay each period."],
  ["A commission is…", "pay based on how much a worker sells", ["a set yearly amount", "a tax"], "Salespeople often earn commission."],
  ["A tip is…", "extra money a customer gives for good service", ["a tax on food", "a worker's yearly pay"], "Servers and drivers often get tips."],
  ["A restaurant server often earns…", "an hourly wage plus tips", ["only commission", "nothing"], "Many jobs mix kinds of pay."],
  ["Taxes pay for government services such as…", "public schools, roads and parks", ["your video games", "private vacations"], "Taxes pay for shared services."],
  ["Oregon is one of the few states with no general…", "sales tax", ["income tax", "schools"], "Oregon relies more on income tax."],
  ["Producers are people who…", "make goods or provide services", ["only buy things", "only save money"], "Farmers and bakers are producers."],
  ["Consumers are people who…", "buy and use goods and services", ["make all goods", "collect taxes"], "Shoppers are consumers."],
  ["Labour is…", "the work people do", ["a kind of tax", "a natural resource"], "Workers provide labour."],
  ["Oregon grows almost all the hazelnuts in the US. If the hazelnut crop is small, the price will likely…", "rise", ["fall", "stay at zero"], "Lower supply raises prices."],
  ["Oregon leads the nation in growing…", "Christmas trees and hazelnuts", ["oranges and pineapples", "cotton and sugar cane"], "Oregon's climate suits these crops."],
  ["Targeted marketing means ads are…", "aimed at a certain group, like kids", ["shown to no one", "only on paper"], "Ads are designed for an audience."],
  ["A cereal box with a cartoon character on the bottom shelf is an example of…", "targeted marketing", ["a tax", "a salary"], "It is placed at kids' eye level."],
  ["Opportunity cost is…", "the next-best choice you give up", ["the price on a tag", "free money"], "Every choice has an opportunity cost."],
  ["Which is a safe thing to do online?", "keep your password and address private", ["share your password with friends", "post your home address"], "Protect personal information."],
  ["A game website asks for your home address. You should…", "not share it and tell a trusted adult", ["type it in", "post it publicly"], "Never share personal information."],
  ["Oregon sells wheat to Asia and buys electronics from other countries. This shows…", "trade and interdependence", ["self-sufficiency", "a tax"], "Trade connects economies."],
  ["A budget is…", "a plan for how to spend and save money", ["a type of bank", "a kind of tax"], "Budgets balance needs and wants."],
  ["In a budget, which should come first?", "needs like food and rent", ["toys and games", "concert tickets"], "Needs come before wants."],
  ["Wealth means…", "everything a person owns that has value", ["only the cash in a pocket", "a person's age"], "Homes, savings and land are wealth."],
  ["People with more money and power can…", "have more say in decisions, which can be unfair to others", ["never affect decisions", "only help everyone equally"], "Power affects who is heard."],
  ["If Oregon berry farmers can't find enough workers, the supply of berries…", "goes down and prices may rise", ["goes up", "has no effect"], "Fewer berries picked, fewer for sale.", true],
  ["Why do businesses advertise to kids?", "kids influence what families buy", ["kids have the most money", "it's required by law"], "Kids are a target market.", true],
];

/** Oregon budget and earnings questions. */
function budgetQuestion(): Question {
  const names = ["Maya", "Jay", "Amir", "Lena", "Kenji", "Zoe", "Ravi", "Ana", "Noah", "Priya"];
  const name = pick(names);
  const dollars = (n: number) => `$${n}`;
  const options = (right: number, wrong: number[]) => {
    const w = [...new Set(wrong.filter((x) => x > 0 && x !== right))].slice(0, 3);
    for (let k = 1; w.length < 3; k++) if (right + k !== right && !w.includes(right + k)) w.push(right + k);
    return w.map(dollars);
  };
  switch (pick(["wage", "save", "left", "weeks"] as const)) {
    case "wage": {
      const rate = randInt(8, 16);
      const hours = randInt(2, 6);
      const r = rate * hours;
      return textChoice(`${name} earns a wage of $${rate} an hour and works ${hours} hours. How much does ${name} earn?`, dollars(r), options(r, [rate + hours, r - rate, r + rate]), `Wage × hours: ${rate} × ${hours} = ${r}.`);
    }
    case "save": {
      const per = randInt(2, 9);
      const weeks = randInt(3, 8);
      const r = per * weeks;
      return textChoice(`${name} saves $${per} a week for ${weeks} weeks. How much is saved?`, dollars(r), options(r, [per + weeks, r - per, r + per]), `${per} × ${weeks} = ${r}.`);
    }
    case "left": {
      const income = randInt(20, 60);
      const needs = randInt(5, Math.floor(income / 2));
      const saveAmt = randInt(2, 8);
      const r = income - needs - saveAmt;
      return textChoice(
        `${name}'s budget: $${income} earned, $${needs} for needs, $${saveAmt} to savings. How much is left for wants?`,
        dollars(r),
        options(r, [income - needs, income - saveAmt, needs + saveAmt]),
        `${income} − ${needs} − ${saveAmt} = ${r}.`,
      );
    }
    case "weeks": {
      const per = randInt(3, 10);
      const weeks = randInt(3, 9);
      const price = per * weeks;
      return textChoice(
        `${name} wants a $${price} jacket and saves $${per} a week. How many weeks will it take?`,
        `${weeks} weeks`,
        shuffle([weeks - 1, weeks + 1, weeks + 2, per].filter((x, i, a) => x > 0 && x !== weeks && a.indexOf(x) === i)).slice(0, 3).map((x) => `${x} weeks`),
        `${price} ÷ ${per} = ${weeks}.`,
      );
    }
  }
}

const TIMELINE: Dated[] = [
  ["Robert Gray sails into the Columbia River", 1792],
  ["Lewis and Clark reach the Pacific", 1805],
  ["Astoria is founded as a fur post", 1811],
  ["The US and Britain agree to joint occupation", 1818],
  ["Settlers vote at Champoeg to form a provisional government", 1843],
  ["The Oregon Treaty sets the 49th parallel border", 1846],
  ["Oregon Territory is created", 1848],
  ["The Donation Land Claim Act is passed", 1850],
  ["Treaties with the Tribes of Warm Springs and Umatilla are signed", 1855],
  ["Oregon's constitution is written", 1857],
  ["Oregon becomes the 33rd state", 1859],
  ["The Modoc War ends", 1873],
  ["Chief Joseph's Nez Perce band leaves the Wallowa Valley", 1877],
  ["Oregon adopts the initiative and referendum", 1902],
  ["Oregon women win the right to vote", 1912],
  ["Voters repeal the exclusion clause", 1926],
  ["Japanese Americans are forced from their Oregon homes", 1942],
  ["The Vanport flood", 1948],
  ["Celilo Falls is flooded by The Dalles Dam", 1957],
  ["The Beach Bill keeps beaches public", 1967],
  ["The Bottle Bill passes", 1971],
  ["The Siletz Tribe is restored", 1977],
  ["The Confederated Tribes of Grand Ronde are restored", 1983],
  ["The Klamath Tribes are restored", 1986],
  ["Oregon votes to hold all elections by mail", 1998],
  ["The Tribal History/Shared History law passes", 2017],
];

export const OWN_SOCIAL_4: Unit[] = [
  bankUnit({
    id: "or-g4-oregon-land",
    title: "Oregon's Land & Neighbours",
    emoji: "🌋",
    blurb: "Mountains, rivers, regions and capitals",
    parentNote: "Oregon's physical geography (Mount Hood, Crater Lake, the rain shadow, its great rivers), US regions and western capitals on maps, and how dams, wind turbines and the Beach Bill shape Oregon's land and people.",
    standards: ["4.G.GR.1; 4.G.GR.2; 4.G.HI.6; 4.G.GE.7", "reading regional maps, locating western states and neighbours, how geography shapes land use, and the effects of dams and wind power"],
    items: LAND,
  }),
  bankUnit({
    id: "or-g4-nine-tribes",
    title: "The Nine Tribes of Oregon",
    emoji: "🏞️",
    blurb: "Sovereign nations, past and present",
    parentNote: "Oregon's nine federally recognized Tribes, each named as it names itself: where their homelands are, Tribal sovereignty and constitutions, termination and restoration, and Tribes today. Light and in the present tense, following Tribal History/Shared History.",
    standards: ["4.C.PI.2; 4.G.GE.8; 4.H.CP.6; 4.G.MM.5", "the nine federally recognized Tribes of Oregon, their governments and constitutions, their homelands and their resilience"],
    items: TRIBES,
  }),
  bankUnit({
    id: "or-g4-oregon-country",
    title: "The Oregon Country",
    emoji: "🛶",
    blurb: "Explorers, fur traders and Tribes",
    parentNote: "Tribes of the Oregon Country before and during exploration, Robert Gray, Lewis and Clark with Sacagawea and York, the fur trade, joint occupation, Champoeg and the Oregon Treaty, and comparing old and new maps.",
    standards: ["4.H.CH.1; 4.G.MM.4; 4.G.GR.3", "the Indigenous peoples of Oregon during exploration, patterns of exploration and settlement, and comparing historical maps"],
    items: COUNTRY,
  }),
  bankUnit({
    id: "or-g4-trail-to-statehood",
    title: "Trail to Statehood",
    emoji: "🐂",
    blurb: "Wagons, land claims and 1859",
    parentNote: "The Oregon Trail, Manifest Destiny, the Donation Land Claim Act, Oregon Territory, statehood on February 14, 1859, and the racist exclusion laws of early Oregon, from many points of view.",
    standards: ["4.H.CE.5; 4.H.CH.2", "the Oregon Trail's significance and the role of Manifest Destiny and racial prejudice in Oregon's path to statehood"],
    items: TRAIL,
  }),
  bankUnit({
    id: "or-g4-resistance-and-change",
    title: "Resistance, Resilience & Change",
    emoji: "🌱",
    blurb: "Conflicts and the people who shaped Oregon",
    parentNote: "Tribal resistance in the Rogue River and Modoc Wars and Chief Joseph's Nez Perce, and the experiences of Chinese, Japanese American, Black and Mexican workers and families in Oregon. Told plainly and age-appropriately.",
    standards: ["4.H.CC.3; 4.H.CE.4; 4.H.CP.7; 4.H.CP.8", "Indigenous resistance, how change affected underrepresented groups, the legacy of discrimination, and conflicts in Oregon's history"],
    items: CHANGE,
  }),
  bankUnit({
    id: "or-g4-oregon-government",
    title: "Governing Oregon",
    emoji: "🏛️",
    blurb: "Constitution, legislature and ballot measures",
    parentNote: "Oregon's 1857 constitution and how it has changed, the governor, the 30-member Senate and 60-member House, the Supreme Court, the initiative, referendum and recall, and laws Oregon voters and lawmakers made, such as women's suffrage in 1912 and the Bottle Bill.",
    standards: ["4.C.PI.1; 4.C.IR.3; 4.C.DP.4; 4.C.CE.5", "the creation and parts of Oregon's constitution, equality in it, and the initiative process and civic participation"],
    items: GOVERNMENT,
  }),
  mixUnit({
    id: "or-g4-oregon-economy",
    title: "Oregon's Economy",
    emoji: "🌰",
    blurb: "Wages, budgets and Oregon products",
    parentNote: "Kinds of pay (wages, salaries, commissions and tips), budgets, taxes and services, supply and demand for Oregon products, targeted marketing, staying safe online, and trade.",
    standards: ["4.E.ES.1; 4.E.ES.2; 4.E.ES.3; 4.E.MI.4; 4.E.MI.5; 4.E.IC.6; 4.E.IC.7; 4.E.IC.8; 4.E.IC.9; 4.E.ST.10", "kinds of pay, taxes, producers and consumers, supply and demand for Oregon goods, budgets, marketing, online safety and trade"],
    make: (d) => [...fromItems(ECONOMY, 5, d), budgetQuestion(), budgetQuestion(), budgetQuestion()],
  }),
  timelineUnit({
    id: "or-g4-oregon-timeline",
    title: "Oregon Through Time",
    emoji: "⏳",
    blurb: "Put Oregon's history in order",
    parentNote: "Ordering events in Oregon's history from the first explorers on the Columbia to statehood, the Oregon System, Tribal restoration and vote by mail.",
    standards: ["4.H.CH.1; 4.H.CE.4", "Oregon's history in order, from exploration and settlement to change in the 1900s"],
    events: TIMELINE,
  }),
];
