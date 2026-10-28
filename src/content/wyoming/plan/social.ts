import type { Entry } from "../kit";

// Wyoming social studies: the units Wyoming uses from other frameworks, per grade ("<grade>/social"). The Wyoming
// Social Studies Content and Performance Standards (2014, with the Indigenous benchmarks added in 2018) have six
// standards, Citizenship, Government and Democracy (1), Culture and Cultural Diversity (2), Production, Distribution
// and Consumption (3), Time, Continuity and Change (4), People, Places and Environments (5) and Technology, Literacy and
// Global Connections (6), and set benchmarks for grade bands, not single grades: units cite them as printed, such as
// "SS5.4.2" (the band ending in Grade 5, standard 4, benchmark 2) or "SS5.5.1.a" (a benchmark about the Tribes of
// Wyoming). Kindergarten to Grade 2 cite the K-2 band (SS2), Grades 3 to 5 the 3-5 band (SS5), Grades 6 to 8 the 6-8
// band (SS8) and Grade 9 the high school band (SS12). Within those bands the grades follow the usual order: community and
// nation in the early grades, communities and regions in Grade 3 and Wyoming history and government in Grade 4, United
// States history and the trails west in Grade 5, the ancient world in Grade 6, the world after the ancient era in Grade
// 7, United States and Wyoming history and civics in Grade 8, and high school civics and economics with personal finance
// in Grade 9.
//
// Only general units free of Canadian content and of other states' places are adopted, and never another state's units
// about its Tribes. Wyoming's own units (its flag and symbols, then and now, symbols and difference makers, migration and
// regions, Wyoming history and government, trails west and explorers, Wyoming and the West, and governing Wyoming) are
// in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "SS2.2.1; SS2.2.2", "how groups such as families and schools meet people's needs for belonging, and the ways culture makes each person unique"],
    ["families", "share", "SS2.2.1; SS2.2.2", "how families meet needs such as belonging, and how families and their traditions differ"],
    ["needs-and-wants", "share", "SS2.3.1", "telling needs from wants, and goods and services"],
    ["places-near-me", "adopt", "SS2.5.1; SS2.5.2", "using simple maps of familiar places, and the physical and human features of a community"],
    ["fair-and-kind", "adopt", "SS2.1.1", "the rules schools and communities have, and why they must be followed"],
    ["mb-k-jobs-and-rules", "adopt", "SS2.1.1; SS2.3.1", "rules at school, and the jobs and services of community helpers"],
    ["or-k-money-and-work", "adopt", "SS2.3.1; SS2.3.2", "goods, services and work, and how price affects buying and saving"],
    ["ca-k-calendar", "adopt", "SS2.1.3", "the people and events honored on United States holidays through the year"],
    ["ca-k-good-citizens", "adopt", "SS2.1.1; SS2.2.1", "following rules, and how people help each other in a community"],
  ],
  "1/social": [
    ["maps", "share", "SS2.5.1", "using maps, globes, map keys and the compass rose"],
    ["our-land", "share", "SS2.5.2; SS2.5.4", "physical features of the land, and how people adjust to and use their environment"],
    ["my-community", "share", "SS2.2.1; SS2.3.1", "how community helpers meet people's needs, and goods and services"],
    ["changes-in-my-life", "adopt", "SS2.4.1", "how events change what happens next in a child's life"],
    ["respect-and-inclusion", "adopt", "SS2.2.2", "recognizing the ways culture, language and traditions shape people"],
    ["community-services", "adopt", "SS2.2.1", "the people and services that meet a community's needs"],
    ["wa-g1-earn-save-share", "adopt", "SS2.3.2", "how price affects decisions to buy, sell and save"],
    ["ca-g1-long-ago", "adopt", "SS2.4.2; SS2.1.3", "the tools and technologies that changed daily life, and the holidays that remember the past"],
  ],
  "2/social": [
    ["ca-g2-citizens-and-leaders", "adopt", "SS2.1.1; SS2.1.4", "rules and laws, and the leaders who make and carry them out"],
    ["mb-working-together", "adopt", "SS2.1.1; SS2.2.1", "making and following fair rules, and working together to meet needs"],
    ["ca-g2-work-and-money", "adopt", "SS2.3.1; SS2.3.3", "producers, goods and services, and how technology changes the way things are made"],
    ["communities-compared", "adopt", "SS2.5.2; SS2.5.3", "comparing the physical and human features of different communities"],
    ["ny-g1-american-symbols", "adopt", "SS2.1.2", "the symbols and traditions that stand for the United States"],
  ],
  "3/social": [
    ["meeting-needs", "share", "SS5.5.4; SS5.2.1", "how the environment shapes the way people meet their needs, and how groups meet human needs"],
    ["or-g2-world-maps", "adopt", "SS5.5.1", "using maps and globes to locate places and features on Earth"],
    ["ny-g3-globes-and-maps", "adopt", "SS5.5.1", "using globes and maps, the hemispheres, the Equator and the Prime Meridian"],
    ["ny-g3-culture", "adopt", "SS5.2.2; SS5.2.3", "how groups express their cultures, and the contributions of cultural groups"],
    ["az-g2-continents-oceans", "adopt", "SS5.5.1", "locating the continents and oceans on maps and globes"],
  ],
  "4/social": [
    ["or-g5-earn-and-save", "adopt", "SS5.3.4; SS5.3.1", "money, banking, saving and budgeting, and choices when resources are scarce"],
  ],
  "5/social": [
    ["ny-g5-columbian-exchange", "adopt", "SS5.4.1; SS5.3.2", "how one change, such as bringing horses and crops across the ocean, led to big changes, and trade"],
    ["wa-g5-thirteen-colonies", "adopt", "SS5.2.3; SS5.5.3", "the groups who built the colonies, and the human features of the colonial regions"],
    ["ca-g5-colonial-economy", "adopt", "SS5.3.2; SS5.2.4", "trade, supply and demand in the colonies, and slavery and other tensions between groups"],
    ["ca-g5-road-to-revolution", "adopt", "SS5.1.3; SS5.4.1", "the origins of the Constitution in the Declaration of Independence, and how small changes led to revolution"],
    ["ca-g5-revolution", "adopt", "SS5.1.3; SS5.4.1", "the Declaration of Independence and the war for independence, and cause and effect"],
    ["wa-g5-constitution", "adopt", "SS5.1.3; SS5.1.5", "the origins of the Constitution, and the purposes of the three branches of government"],
    ["or-g5-timeline", "adopt", "SS5.4.1", "putting the events from the colonies to the Constitution in order, by cause and effect"],
  ],
  "6/social": [
    ["first-farmers", "adopt", "SS8.4.2; SS8.4.1", "how farming tools and technology changed the way people lived, and what came of it"],
    ["where-civilizations-grew", "adopt", "SS8.5.3; SS8.5.1", "how rivers and settlement patterns shaped where the first cities grew"],
    ["world-beliefs", "adopt", "SS8.2.2", "how beliefs and traditions shape societies and spread"],
    ["trade-networks", "adopt", "SS8.4.1; SS8.3.2", "how trade routes spread goods and ideas to other places, and how people organize trade"],
    ["wa-g6-mesopotamia-egypt", "adopt", "SS8.4.2; SS8.1.6", "the invention of writing and other tools, and the political systems of the first civilizations"],
    ["wa-g6-greece-rome", "adopt", "SS8.1.6; SS8.2.2", "the governments of ancient Greece and Rome, and their art and architecture"],
    ["ny-g6-classical-china-india", "adopt", "SS8.2.2; SS8.1.6", "the beliefs and traditions of classical India and China, and how they shaped government"],
    ["or-g7-african-kingdoms", "adopt", "SS8.3.2; SS8.5.3", "the trade that built Africa's kingdoms, and the rise of cities such as Timbuktu"],
  ],
  "7/social": [
    ["ca-g7-rome-byzantium", "adopt", "SS8.1.6; SS8.2.2", "how Byzantine rulers governed, and architecture as an expression of a society's values"],
    ["ca-g7-arabia-islam", "adopt", "SS8.2.2; SS8.4.1", "how religion, art and learning shaped a civilization, and how ideas spread to other places"],
    ["ca-g7-west-african-life", "adopt", "SS8.3.2; SS8.1.6", "trade across the Sahara, and the rulers of West Africa"],
    ["ca-g7-imperial-china", "adopt", "SS8.1.6; SS8.4.2", "how emperors governed with Confucian ideas, and Chinese inventions"],
    ["ca-g7-medieval-japan", "adopt", "SS8.1.6; SS8.2.2", "how shoguns and emperors held power, and Japan's art and literature"],
    ["ca-g7-church-and-crowns", "adopt", "SS8.1.6; SS8.4.1", "the church and kings in medieval government, and the effects of the Black Death"],
    ["ca-g7-aztec-inca", "adopt", "SS8.2.2; SS8.5.4", "Aztec and Inca cities and temples, and how they changed their environment"],
    ["ny-g5-countries-capitals", "adopt", "SS8.5.1", "using maps of the world to locate countries and capitals"],
    ["ny-g5-cultures", "adopt", "SS8.2.3; SS8.2.2", "the cultural characteristics of groups around the world, and how traditions carry culture"],
    ["ny-g5-governments", "adopt", "SS8.1.6", "the structures of political systems around the world"],
    ["ny-g5-economics", "adopt", "SS8.3.2; SS8.3.1", "how countries organize production and trade, and basic economic ideas"],
    ["maps-graphs-8", "adopt", "SS8.5.1; SS8.6.1", "using maps, globes and graphs, and information in different formats"],
  ],
  "8/social": [
    ["or-g8-founding-ideas", "adopt", "SS8.1.3; SS8.1.5", "the historical development of the Constitution, and its structure"],
    ["wa-g8-bill-of-rights", "adopt", "SS8.1.1; SS8.1.5", "the rights and responsibilities of citizens, and the Bill of Rights and amendments"],
    ["maps-graphs-8", "adopt", "SS8.5.1; SS8.6.1", "using maps, globes and graphs, and information in different formats"],
    ["ca-g8-industry-reform", "adopt", "SS8.3.3; SS8.4.1", "how new technology changed production, and how the industrial revolution spread"],
    ["ca-g8-civil-war", "adopt", "SS8.4.1; SS8.4.4", "the causes of the Civil War, and the interactions between groups and governments"],
    ["or-g8-reconstruction", "adopt", "SS8.1.5; SS8.4.1", "the amendments that expanded rights after the Civil War, and their effects"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "SS12.1.3; SS12.1.5", "the historical development and structure of the United States Constitution"],
    ["ca-g9-civic-action", "adopt", "SS12.1.1; SS12.1.2", "the freedoms and responsibilities of a democratic society, and how to take part in the political process"],
    ["ca-g9-media", "adopt", "SS12.1.2; SS12.6.2", "forming opinions and taking part in politics, and judging whether evidence supports a claim"],
  ],
};
