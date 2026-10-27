import type { Unit } from "../../types";
import { SOCIAL_9 as MAINE_9 } from "../../maine/units/social-g9";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Hawaiʻi Grade 9 social studies, the high school courses Modern History of Hawaiʻi and Participation in Democracy.
// Modern History of Hawaiʻi: the overthrow, annexation and the arguments over its legality (SS.MHH.1.19.1 to
// SS.MHH.1.18.4), migration, organized labor and the plantations' effect on the land (SS.MHH.2.15.1, SS.MHH.2.10.2,
// SS.MHH.2.14.3), Pearl Harbor, martial law, internment and the Democratic Revolution of 1954 (SS.MHH.3.16.1 to
// SS.MHH.3.19.4), and statehood, tourism, the military and the Hawaiian Renaissance (SS.MHH.4.9.1, SS.MHH.4.19.2).
// Participation in Democracy: copies of Maine's United States government and economics units without their Maine
// items, with Hawaiʻi items added (SS.PID.2.6.1, SS.PID.2.8.2, SS.PID.3.17.1; SS.PID.4.10.2, SS.PID.4.16.3); its
// founding ideas, civic action and media standards are practised with adopted units (see ../plan/social.ts).

const ANNEXATION: Q[] = [
  ["A long-term cause of the 1893 overthrow was that sugar planters wanted…", "secure, tariff-free access to the US market", ["to end the sugar industry", "to restore the monarchy", "to leave Hawaiʻi"], "Their profits depended on US trade."],
  ["The Bayonet Constitution of 1887 shifted political power toward…", "wealthy, mostly foreign-born residents", ["the monarch", "Native Hawaiian voters", "Asian immigrants"], "Property and income rules limited voting."],
  ["The triggering event for the overthrow was Queen Liliʻuokalani's plan in January 1893 to…", "proclaim a new constitution", ["sell the kingdom", "join the United States", "leave Hawaiʻi"], "Annexationists used it as their reason to act."],
  ["Lorrin Thurston, a leader of the overthrow, was a…", "lawyer and grandson of missionaries who favored annexation", ["royal guard", "Hawaiian chief", "US President"], "He helped organize the Committee of Safety."],
  ["The Blount Report of 1893 concluded that the overthrow…", "succeeded because of improper help from US officials", ["was a fair vote of Hawaiians", "never happened", "was the queen's idea"], "President Cleveland accepted its findings."],
  ["The Morgan Report of 1894, from a US Senate committee, concluded that…", "US officials had acted properly", ["the queen should be restored at once", "Hawaiʻi should be a colony of Britain", "the overthrow never happened"], "Two US reports reached opposite conclusions."],
  ["Instead of restoring the queen, the Provisional Government declared the…", "Republic of Hawaiʻi in 1894", ["State of Hawaiʻi in 1894", "Kingdom of Oʻahu", "Territory of Hawaiʻi in 1880"], "It waited for annexation."],
  ["A treaty of annexation failed in the US Senate in 1897–1898 partly because of…", "the Kūʻē Petitions signed by Native Hawaiians", ["the queen's support for it", "a vote by Hawaiian citizens in favor", "a war with Japan"], "A treaty needed two-thirds of the Senate."],
  ["Hawaiʻi was annexed in 1898 by the Newlands Resolution, a joint resolution that needed only…", "a simple majority in both houses of Congress", ["a vote of Hawaiian citizens", "two-thirds of the Senate", "the queen's signature"], "Critics question whether a resolution could annex a country."],
  ["One argument that annexation was not legal is that…", "a joint resolution of Congress has no power over another country's territory", ["the queen signed a treaty", "Hawaiians voted for it", "it happened by treaty"], "This argument is still made today."],
  ["The Organic Act of 1900 made Hawaiʻi a…", "US territory", ["state", "kingdom", "colony of Spain"], "A governor was appointed by the President."],
  ["Under the territory, the governor of Hawaiʻi was…", "appointed by the US President", ["elected by all residents", "chosen by the queen", "a hereditary chief"], "Residents could not vote for President either."],
  ["Robert Wilcox, Hawaiʻi's first delegate to Congress in 1900, led the…", "Home Rule Party", ["Republican Party", "Committee of Safety", "Big Five"], "Many Native Hawaiian voters supported it."],
  ["Prince Jonah Kūhiō Kalanianaʻole, delegate to Congress from 1903, pushed for the…", "Hawaiian Homes Commission Act of 1921", ["Bayonet Constitution", "Reciprocity Treaty", "Organic Act"], "It set aside land for Native Hawaiian homesteads."],
  ["Hui Aloha ʻĀina, a Hawaiian patriotic league formed after the overthrow, worked to…", "restore the kingdom's independence", ["speed up annexation", "end the Hawaiian language", "sell government lands"], "Women formed their own branch too."],
  ["In 1993, President Bill Clinton signed the Apology Resolution, which said the overthrow was carried out…", "with the participation of US agents and citizens", ["by the queen herself", "by Britain", "without any US involvement"], "It marked the overthrow's 100th anniversary."],
  ["The Crown and Government Lands of the kingdom passed to the Republic and then to the…", "United States at annexation", ["Hawaiian royal family", "sugar companies directly", "Japanese government"], "These ceded lands are still debated."],
  ["Supporters of annexation argued that it would…", "give stability and protect business and US interests", ["restore the monarchy", "protect Native Hawaiian voting rights", "end the sugar trade"], "Their view centered on trade and security.", true],
  ["Opponents of annexation argued that…", "a recognized nation was taken over against its people's will", ["annexation would help the queen", "Hawaiians had voted for it", "the kingdom no longer existed in 1890"], "Hawaiʻi had treaties with many nations.", true],
  ["Why might the Blount and Morgan reports disagree?", "they were written by people with different political views and purposes", ["one was written in Hawaiian only", "they studied different islands", "one was a novel"], "Consider who wrote each source and why.", true],
  ["Why did the United States want Hawaiʻi more in 1898 than in 1893?", "the Spanish-American War made a Pacific naval base more valuable", ["sugar had disappeared", "Hawaiians asked to join", "the queen died"], "War raised Hawaiʻi's strategic value.", true],
  ["After annexation, English replaced Hawaiian as the language of public schools. One long-term effect was…", "a sharp decline in Hawaiian speakers", ["more Hawaiian speakers", "no effect on the language", "an end to English in Hawaiʻi"], "Language revival came decades later.", true],
  ["Today, the debate over the overthrow continues in discussions of…", "Native Hawaiian self-determination and the ceded lands", ["the price of sugar in 1890", "Cook's route", "the Kuleana Act alone"], "History shapes present-day issues.", true],
  ["A historian comparing the Kūʻē Petitions with annexationists' speeches is studying…", "multiple perspectives on annexation", ["only economic data", "weather records", "one point of view"], "Both are primary sources.", true],
  ["Because territorial residents could not vote for President or elect their governor, some argued that territorial rule…", "denied them full self-government", ["gave them more rights than states", "was the same as statehood", "made Hawaiʻi independent"], "This argument fed the statehood movement.", true],
];

const PLANTATION: Q[] = [
  ["After annexation, US law ended most immigration from China to Hawaiʻi because the…", "Chinese Exclusion Act now applied to Hawaiʻi", ["kingdom banned it", "plantations closed", "workers refused to come"], "Planters turned to other countries."],
  ["By 1920, the largest ethnic group in Hawaiʻi was…", "Japanese Americans", ["Portuguese Americans", "Chinese Americans", "Puerto Ricans"], "They were about 4 in 10 residents."],
  ["After Japanese immigration was cut off, plantations recruited many workers from…", "the Philippines", ["Canada", "Norway", "Brazil"], "The workers were called sakadas."],
  ["Five large companies that controlled sugar, shipping, banking and trade in territorial Hawaiʻi were called the…", "Big Five", ["Committee of Safety", "Home Rule Party", "Hui Aloha ʻĀina"], "They had great political power."],
  ["Plantation workers went on strike in 1909 and 1920 to demand…", "higher wages and better conditions", ["shorter school days", "more sugar for themselves", "the return of the kingdom"], "The 1920 strike united Japanese and Filipino workers."],
  ["Early plantation strikes often failed partly because workers were organized…", "by ethnic group, so owners could set groups against each other", ["into one big union", "by the government", "by the Big Five"], "Divide and rule."],
  ["In 1924, a strike by Filipino workers on Kauaʻi ended in violence known as the…", "Hanapēpē Massacre", ["Battle of Nuʻuanu", "Bayonet Constitution", "Great Māhele"], "Sixteen strikers and four police officers were killed."],
  ["The union that organized sugar, pineapple and dock workers of every ethnic group in the 1940s was the…", "ILWU", ["Big Five", "Home Rule Party", "Committee of Safety"], "International Longshore and Warehouse Union."],
  ["The 1946 sugar strike was a turning point because it was…", "an interracial strike that won better wages and ended plantation housing control", ["led by the Big Five", "lost in a day", "about pineapple prices only"], "Workers of every group stood together."],
  ["Many plantation children went to public schools where they spoke a shared language called…", "Pidgin (Hawaiʻi Creole English)", ["Latin", "Spanish", "German"], "It grew from many workers' languages."],
  ["English Standard Schools, from the 1920s to the 1960s, admitted students who passed an English test. Critics said they…", "divided students by race and class", ["taught only Hawaiian", "were open to everyone", "had no tests"], "Few plantation children got in."],
  ["Large irrigation ditches built for sugar, such as those on Maui, took water from…", "windward streams", ["the ocean", "glaciers", "desert wells"], "Water was moved across the island to dry fields."],
  ["Diverting stream water to plantations harmed…", "native stream life and the loʻi kalo of downstream farmers", ["the sugar crop", "tourism only", "ocean tides"], "Some streams ran dry."],
  ["Clearing land for sugar and pineapple fields led to…", "soil running off into streams and reefs", ["more native forest", "cleaner reefs", "more rain"], "Bare soil washes away in heavy rain."],
  ["Plantation owners in the 1800s brought in plants and animals, some of which became…", "invasive species", ["endangered native species", "extinct right away", "the state bird"], "Some still spread today."],
  ["One reason many Native Hawaiians moved to Honolulu in the 1900s was…", "loss of land and the search for wage work", ["the end of the city", "free plantation land", "a law requiring it"], "Cities offered jobs."],
  ["After their contracts ended, many plantation workers and their children…", "opened businesses, farmed or moved to the cities", ["went back to the kingdom", "became aliʻi", "had to leave Hawaiʻi"], "The local middle class grew."],
  ["Compared with migration before the overthrow, migration after annexation was shaped more by…", "US immigration laws", ["the Hawaiian monarch", "the kapu system", "British treaties"], "Congress now made the rules.", true],
  ["Why did plantation owners prefer workers from many different countries?", "they hoped workers who spoke different languages would not unite", ["they wanted to learn many languages", "the law required it", "one country refused to send workers"], "Ethnic divisions weakened unions.", true],
  ["How did the 1946 strike change politics in Hawaiʻi?", "organized labor became a strong force that helped end Big Five control", ["it ended all unions", "it brought back the monarchy", "it had no effect"], "Workers became voters with a voice.", true],
  ["Restoring water to streams on Maui and other islands in recent years has helped…", "native species and kalo farmers", ["sugar plantations expand", "tourists only", "no one"], "Courts ordered some water returned.", true],
  ["A plantation town where families from many countries lived side by side helped create…", "Hawaiʻi's local culture", ["a single culture with no mixing", "the Bayonet Constitution", "the kapu system"], "Foods and words were shared.", true],
  ["Strikes that united workers across ethnic lines showed that…", "shared economic interests could overcome divisions", ["ethnic groups never worked together", "strikes always failed", "owners supported unions"], "Solidarity was a strategy.", true],
  ["Filipino strike leader Pablo Manlapit led strikes in 1920 and 1924, and was later…", "sent away from Hawaiʻi", ["elected governor", "made a plantation owner", "named a Big Five president"], "Owners and officials worked to stop him.", true],
  ["The plantation era's effects on the land are still seen in…", "dry streams, eroded soils and abandoned fields", ["new native forests everywhere", "untouched valleys", "growing glaciers"], "Environmental change lasts.", true],
];

const WAR: Q[] = [
  ["On December 7, 1941, Japan attacked the US Pacific Fleet at…", "Pearl Harbor", ["Lāhainā", "Hilo Bay", "Kaneʻohe Bay only"], "The attack brought the US into World War II."],
  ["Japan attacked Pearl Harbor partly because it wanted to…", "stop the US fleet from blocking its expansion into Southeast Asia", ["take over Hawaiʻi's sugar", "free the Philippines", "end World War I"], "Japan needed oil and other resources."],
  ["More than 2,000 Americans were killed in the attack, and the battleship… sank with more than 1,100 of its crew.", "USS Arizona", ["USS Boston", "USS Hawaiʻi", "USS Missouri"], "A memorial now stands over it."],
  ["After the attack, Hawaiʻi was placed under…", "martial law", ["the monarchy", "British rule", "Japanese rule"], "The military ran the government."],
  ["Martial law in Hawaiʻi lasted until…", "October 1944", ["December 8, 1941", "1959", "1893"], "Military courts tried civilians."],
  ["Under martial law, residents of Hawaiʻi faced…", "curfews, blackouts and military courts", ["no rules at all", "a new monarchy", "free travel"], "Civil rights were restricted."],
  ["In 1946, the US Supreme Court ruled in Duncan v. Kahanamoku that trying civilians in Hawaiʻi's military courts was…", "not allowed", ["required", "a state matter", "a matter for Japan"], "The civil courts had been open."],
  ["On the West Coast, about 120,000 Japanese Americans were…", "forced from their homes into camps", ["drafted into the Navy", "sent to Hawaiʻi to work", "left alone"], "This was mass removal."],
  ["In Hawaiʻi, where Japanese Americans were about a third of the population, the government interned…", "a much smaller number, mostly community leaders", ["every Japanese American", "no one at all", "only children"], "Mass removal would have shut down the islands' economy."],
  ["The largest internment camp in Hawaiʻi, on Oʻahu, was…", "Honouliuli", ["ʻIolani Palace", "Pearl Harbor", "Waikīkī"], "It is now a national historic site."],
  ["Japanese American soldiers from Hawaiʻi served in the 100th Infantry Battalion and the…", "442nd Regimental Combat Team", ["Committee of Safety", "Royal Guard", "Big Five"], "Their motto was \"Go for Broke.\""],
  ["The 442nd Regimental Combat Team became famous as…", "one of the most decorated units for its size in US history", ["a unit that never fought", "the Navy's band", "a group of spies"], "Many soldiers earned high honors."],
  ["Daniel Inouye, who lost his arm fighting with the 442nd, later became Hawaiʻi's first…", "member of the US House", ["governor", "king", "plantation owner"], "He later served in the Senate for nearly 50 years."],
  ["In the 1954 elections, the Democratic Party won control of the territorial legislature. This is called the…", "Democratic Revolution of 1954", ["Bayonet Constitution", "Great Māhele", "Organic Act"], "It ended decades of Republican control."],
  ["The Democratic Revolution of 1954 was led by labor unions, John Burns and many…", "returning Japanese American veterans", ["Big Five executives", "royalists", "Committee of Safety members"], "Veterans used the GI Bill to go to college."],
  ["Hawaiʻi became the 50th state on…", "August 21, 1959", ["July 4, 1776", "January 17, 1893", "December 7, 1941"], "In a vote that June, about 94 percent of voters favored statehood."],
  ["Hawaiʻi's statehood was delayed for years partly because some members of Congress…", "opposed admitting a state with a majority of Asian and Pacific Islander residents", ["thought it was too cold", "wanted it to be a kingdom", "said it had too few people to count"], "Prejudice and politics both played a part."],
  ["Why was Hawaiʻi important to the US in the Pacific during World War II?", "its location made it the main base for the war against Japan", ["it made most US weapons", "it was close to Europe", "it had the largest army"], "Geography gave Hawaiʻi strategic value.", true],
  ["How did the war help lead to the Democratic Revolution of 1954?", "veterans came home expecting equal rights and used new education to enter politics", ["the war ended all elections", "the Big Five gained more power", "martial law continued until 1954"], "Service changed expectations.", true],
  ["Comparing internment in Hawaiʻi with the West Coast shows that…", "the policy was shaped by economics and politics, not only security", ["Hawaiʻi interned more people", "the West Coast interned no one", "there was no difference"], "Hawaiʻi could not run without its Japanese American workers.", true],
  ["In 1988, Congress passed the Civil Liberties Act, which…", "apologized and paid redress to Japanese Americans who were interned", ["extended martial law", "made Hawaiʻi a state", "ended the 442nd"], "It recognized the injustice.", true],
  ["The Varsity Victory Volunteers were Japanese American university students in Hawaiʻi who…", "worked as laborers for the Army after being removed from the territorial guard", ["opposed the war", "joined Japan's army", "ran the internment camps"], "They later joined the 442nd.", true],
  ["The vote on statehood in 1959 did not offer independence as a choice. Some argue this matters because…", "Native Hawaiians were not asked whether to restore their nation", ["everyone voted for independence", "the vote was in 1893", "Congress had no say"], "The ballot asked only yes or no on statehood.", true],
  ["After 1954, the new Democratic legislature passed laws for…", "land reform, public education and workers' rights", ["restoring the monarchy", "banning unions", "selling all public land to the Big Five"], "Policy followed political change.", true],
  ["A historian studying the local effects of Pearl Harbor might use…", "letters, newspapers and oral histories of Hawaiʻi residents", ["only Japanese battle plans", "weather reports", "sugar prices"], "Local sources show local effects.", true],
];

const MODERN: Q[] = [
  ["After statehood, jet airplanes helped make… Hawaiʻi's largest industry.", "tourism", ["sugar", "whaling", "sandalwood"], "Visitors could arrive in hours instead of days."],
  ["The last sugar plantation in Hawaiʻi, on Maui, closed in…", "2016", ["1898", "1946", "1959"], "Sugar had been king for more than a century."],
  ["Sugar and pineapple declined in Hawaiʻi largely because…", "they could be grown more cheaply in other countries", ["the crops stopped growing", "the state banned them", "no one ate sugar"], "Labor and land in Hawaiʻi are costly."],
  ["The US military is one of Hawaiʻi's biggest…", "sources of jobs and spending", ["farms", "tourist beaches", "plantations"], "The Pacific command is based on Oʻahu."],
  ["One socioeconomic effect of tourism's growth is…", "high housing costs and many service jobs", ["fewer visitors", "the return of sugar", "lower prices"], "Tourism brings jobs and pressures."],
  ["Many Hawaiʻi families find it hard to stay in the islands because of the…", "high cost of living", ["cold weather", "lack of jobs of any kind", "lack of schools"], "Housing is especially costly."],
  ["The 1970s revival of Hawaiian language, music, hula, voyaging and land rights is called the…", "Hawaiian Renaissance", ["Great Māhele", "Democratic Revolution", "Bayonet era"], "Renaissance means rebirth."],
  ["The voyaging canoe Hōkūleʻa's 1976 trip to Tahiti showed that…", "Polynesians could have settled the Pacific by planned voyages", ["voyaging was impossible", "Hawaiʻi was settled by accident", "canoes need motors"], "Navigated by Mau Piailug."],
  ["The Protect Kahoʻolawe ʻOhana protested the US Navy's use of the island of Kahoʻolawe for…", "bombing practice", ["a sugar plantation", "a hotel", "an airport"], "Activists landed on the island in 1976."],
  ["The Navy stopped bombing Kahoʻolawe in 1990 and returned the island to the state in…", "1994", ["1959", "1893", "2016"], "It is now a reserve."],
  ["The 1978 state Constitutional Convention made Hawaiian an official language and created the…", "Office of Hawaiian Affairs", ["Big Five", "Committee of Safety", "Department of Sugar"], "OHA serves Native Hawaiians."],
  ["The 1978 Constitutional Convention also required public schools to teach…", "Hawaiian culture, history and language", ["only sugar farming", "only English grammar", "military drills"], "This is why Hawaiian studies is taught in schools."],
  ["Pūnana Leo preschools, started in 1984, teach young children…", "entirely in the Hawaiian language", ["only in English", "only math", "only surfing"], "They helped bring the language back."],
  ["Hawaiian language immersion schools in the public school system are called…", "Kaiapuni schools", ["English Standard Schools", "plantation schools", "mission schools"], "Students learn every subject in Hawaiian."],
  ["The Hawaiian sovereignty movement seeks…", "self-determination for Native Hawaiians, from greater self-government to independence", ["the return of sugar", "more military bases", "the end of the state government's schools"], "Views within the movement differ."],
  ["A major concern for Hawaiʻi's economy is that depending heavily on tourism makes it…", "vulnerable when travel drops", ["immune to world events", "rely on sugar", "self-sufficient"], "A downturn hits jobs hard.", true],
  ["Because about 85 to 90 percent of Hawaiʻi's food is shipped in, the state is working to…", "grow more food locally", ["import more food", "end farming", "close its harbors"], "Food security matters on islands.", true],
  ["Musicians like Gabby Pahinui and the Sons of Hawaiʻi were part of the Renaissance through…", "slack key guitar and traditional Hawaiian music", ["opera", "heavy metal", "country western only"], "Music carried the language too.", true],
  ["George Helm and Kimo Mitchell, leaders of the Protect Kahoʻolawe ʻOhana, were lost at sea in…", "1977", ["1893", "1941", "2016"], "They are remembered as activists for the ʻāina.", true],
  ["The military's presence in Hawaiʻi brings jobs but also raises concerns about…", "land use and environmental harm", ["too few jobs", "not enough planes", "too much farmland"], "The Red Hill fuel leak in 2021 is one example.", true],
  ["The number of fluent Hawaiian speakers had fallen very low by the 1980s mainly because…", "Hawaiian had been kept out of schools for decades after 1896", ["no one had ever spoken it", "it was only a written language", "it was spoken only on Kahoʻolawe"], "A 1896 law made English the language of school.", true],
  ["How did the Hawaiian Renaissance connect culture and politics?", "pride in culture led to action on land, language and rights", ["it was only about music", "it had nothing to do with land", "it ended political protest"], "Culture and land rights went together.", true],
  ["Tourism, the military and the decline of agriculture together changed Hawaiʻi's economy from…", "plantations to services and government spending", ["services to plantations", "fishing to whaling", "tourism to sandalwood"], "Look at who employs people now.", true],
  ["When visitors outnumber residents on some beaches and trails, communities debate…", "how to manage tourism so it benefits residents and protects the land", ["ending all travel", "building more plantations", "closing all schools"], "Balance is the question.", true],
  ["Students who began in Pūnana Leo preschools went on to graduate from Kaiapuni high schools. This shows that…", "language revival efforts are working", ["Hawaiian is disappearing faster", "no one wants to learn Hawaiian", "schools stopped teaching it"], "A new generation grew up speaking Hawaiian.", true],
];

const NATION_EXTRA: Q[] = [
  ["Hawaiʻi has how many seats in the US House of Representatives?", "2", ["1", "4", "51"], "Seats are divided by population after each census."],
  ["Hawaiʻi has how many electoral votes for President?", "4", ["2", "3", "25"], "Its House seats plus its two senators."],
  ["Hawaiʻi's state legislature has 25 senators and…", "51 representatives", ["435 representatives", "100 representatives", "2 representatives"], "It meets at the State Capitol in Honolulu."],
  ["Like every state, Hawaiʻi sends how many senators to the US Senate?", "2", ["1", "4", "51"], "Each state has equal votes in the Senate.", true],
];

const ECONOMICS_EXTRA: Q[] = [
  ["When fewer visitors travel, Hawaiʻi's economy suffers because…", "tourism is its largest industry", ["it has no tourists", "it grows all its own food", "sugar is its main crop"], "A specialized economy feels outside shocks."],
  ["Hawaiʻi imports most of its food and fuel. This makes prices there sensitive to…", "shipping costs and world prices", ["local rainfall only", "the number of beaches", "school schedules"], "Long supply lines add cost."],
  ["Federal military spending in Hawaiʻi is an example of how the government…", "affects the economy through its spending", ["controls the weather", "sets the price of every good", "owns every business"], "Government spending creates jobs.", true],
];

const MAINE = (id: string) => from(MAINE_9, id);

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "hi-g9-annexation",
    title: "Overthrow & Annexation",
    emoji: "📜",
    blurb: "1893, 1898 and the debate that continues",
    parentNote: "The long-term causes and triggering events of the 1893 overthrow, the conflicting Blount and Morgan reports, the Republic of Hawaiʻi, the Kūʻē Petitions, annexation by joint resolution in 1898 and the argument over its legality, territorial government under the Organic Act, Prince Kūhiō and the Hawaiian Homes Commission Act, and the 1993 Apology Resolution.",
    standards: ["SS.MHH.1.19.1; SS.MHH.1.19.2; SS.MHH.1.19.3; SS.MHH.1.18.4", "the causes of the overthrow, the political issues that followed, the argument over the legality of annexation, and multiple perspectives on both"],
    items: ANNEXATION,
  }),
  bankUnit({
    id: "hi-g9-plantation-era",
    title: "Plantations & Labor",
    emoji: "🌾",
    blurb: "Workers, strikes, unions and the land",
    parentNote: "Migration to and from Hawaiʻi before and after annexation, the Big Five, plantation strikes from 1909 to the 1946 interracial sugar strike and the ILWU, the Hanapēpē Massacre, Pidgin and the English Standard Schools, and how sugar's ditches and fields changed Hawaiʻi's streams, soils and reefs.",
    standards: ["SS.MHH.2.15.1; SS.MHH.2.10.2; SS.MHH.2.14.3", "the causes and effects of migration before and after the overthrow, the growth of organized labor on the plantations, and the environmental changes the plantation system caused"],
    items: PLANTATION,
  }),
  bankUnit({
    id: "hi-g9-war-statehood",
    title: "War & Statehood",
    emoji: "⚓",
    blurb: "Pearl Harbor, martial law, the 442nd and 1959",
    parentNote: "Why Japan attacked Pearl Harbor and what it meant for Hawaiʻi, martial law from 1941 to 1944, internment in Hawaiʻi compared with the West Coast, the 100th Battalion and 442nd, the Democratic Revolution of 1954, and statehood in 1959.",
    standards: ["SS.MHH.3.16.1; SS.MHH.3.19.2; SS.MHH.3.17.3; SS.MHH.3.19.4", "Hawaiʻi in the geopolitics of Pearl Harbor, the attack's local effects, internment in Hawaiʻi and on the West Coast, and the causes and effects of the Democratic Revolution of 1954"],
    items: WAR,
  }),
  bankUnit({
    id: "hi-g9-modern-hawaii",
    title: "Modern Hawaiʻi",
    emoji: "🌺",
    blurb: "Tourism, the military and the Hawaiian Renaissance",
    parentNote: "The end of sugar and pineapple, the growth of tourism and its costs, the military's role in the economy, the Hawaiian Renaissance (Hōkūleʻa, Kahoʻolawe, music and hula), the 1978 Constitutional Convention and the Office of Hawaiian Affairs, Hawaiian language revival, and the sovereignty movement.",
    standards: ["SS.MHH.4.9.1; SS.MHH.4.19.2", "the socioeconomic effects of agriculture's decline, tourism and the military, and the causes and impact of the Hawaiian Renaissance"],
    items: MODERN,
  }),
  copyOf(
    MAINE("me-g9-us-government"),
    {
      id: "hi-g9-us-government",
      title: "How the Nation Governs",
      emoji: "🏛️",
      blurb: "Congress, the President, the courts and your rights",
      parentNote: "The United States government: the three articles that set up Congress, the presidency and the courts, terms and powers, checks and balances, how a bill becomes law, the Bill of Rights and later amendments, landmark cases, and Hawaiʻi's place in Congress.",
      standards: ["SS.PID.2.6.1; SS.PID.2.8.2; SS.PID.3.17.1", "the constitutional principles of rule of law, separation of powers and checks and balances, the lawmaking process, and landmark Supreme Court cases"],
    },
    NATION_EXTRA,
  ),
  copyOf(
    MAINE("me-g9-economics"),
    {
      id: "hi-g9-economics",
      title: "Markets & the Economy",
      emoji: "📈",
      blurb: "GDP, inflation, the Fed and trade",
      parentNote: "Economics: GDP, inflation and unemployment, the Federal Reserve and fiscal policy, specialization, comparative advantage and trade, and economic systems, with examples from Hawaiʻi's tourism and import-dependent economy.",
      standards: ["SS.PID.4.10.2; SS.PID.4.16.3", "how government affects citizens' economic well-being, and how the United States affects and is affected by international economics"],
    },
    ECONOMICS_EXTRA,
  ),
];
