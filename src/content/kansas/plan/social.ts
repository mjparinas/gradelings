import type { Entry } from "../kit";

// Kansas social studies: the units Kansas uses from other frameworks, per grade ("<grade>/social"). The Kansas History,
// Government, and Social Studies Standards (2020) have five standards, each with four benchmarks that are the same in
// every grade, so units cite benchmark codes such as "5.1": 1 choices have consequences, 2 individuals have rights and
// responsibilities, 3 societies are shaped by beliefs, ideas and diversity, 4 societies experience continuity and change
// over time, and 5 relationships among people, places, ideas and environments are dynamic. Not every standard is taught
// in every early grade: Kindergarten (a sense of self) uses standard 1; Grade 1 (the role of individuals) standards 1
// and 2; Grade 2 (societies then and now) standards 1, 2 and 4; Grade 3 (local and national communities) standards 1 to
// 4; and Grades 4 to 9 all five. Grade 4 is Kansas and the regions of the U.S., Grade 5 U.S. history to 1789, Grade 6
// the ancient world to 1300 CE, Grade 7 global geography or Kansas history, Grade 8 U.S. history 1789 to 1898, and
// Grade 9 the high school Government of the United States course.
//
// Only general units free of Canadian content and of other states' places are adopted, and never another state's units
// about its Tribes. Kansas's own units (its symbols, local and state government, history, migration, money and voting,
// Kansas studies, the regions of the U.S., the Eastern Woodland, Kansas history, Kansas and the nation, and governing
// Kansas) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "1.1", "the choices a child makes and their consequences, starting with a child's own life"],
    ["families", "share", "1.1; 1.2", "choices families make, and how families are alike and different"],
    ["needs-and-wants", "share", "1.1", "choices people make because of scarcity, and telling needs from wants"],
    ["places-near-me", "adopt", "1.1", "simple maps of spaces at school and home, and choosing how to move around the community"],
    ["fair-and-kind", "adopt", "1.1; 1.2", "choices that resolve conflicts in the classroom, and their consequences"],
    ["mb-k-jobs-and-rules", "adopt", "1.1; 1.2", "rules at home and school and the consequences of following them, and the work people do"],
    ["or-k-money-and-work", "adopt", "1.1", "choices about money and goods, and the work people do in a community"],
    ["ca-k-calendar", "adopt", "1.1", "finding celebrations on a calendar, and putting days and events in order"],
    ["ca-k-good-citizens", "adopt", "1.1; 1.2", "honesty, courage, friendship, respect and responsibility, and the choices of a good citizen"],
  ],
  "1/social": [
    ["maps", "share", "1.1", "using simple maps of the community to make choices about getting around"],
    ["our-land", "share", "1.1; 1.2", "land and water on maps, and the choices people make about how they live and work"],
    ["my-community", "share", "2.1; 1.1", "the people who play important roles in the community, and goods and services"],
    ["changes-in-my-life", "adopt", "1.1", "the choices that changed a child's own life, and life in the past and today"],
    ["respect-and-inclusion", "adopt", "2.1; 2.2", "the responsibility to respect others, and how families are alike and different"],
    ["community-services", "adopt", "2.1", "the services government provides, and the people who help the community"],
    ["wa-g1-earn-save-share", "adopt", "1.1; 1.2", "choices about earning, saving and spending, and their consequences"],
    ["ca-g1-long-ago", "adopt", "1.1; 2.1", "comparing life long ago and today, and the roles of individuals in families and communities"],
  ],
  "2/social": [
    ["ca-g2-citizens-and-leaders", "adopt", "2.1; 1.1", "the rights and responsibilities of citizens, and leaders whose choices shaped the nation"],
    ["mb-working-together", "adopt", "2.1; 1.1", "how people work through conflict to solve problems, and the responsibilities of citizens"],
    ["ca-g2-work-and-money", "adopt", "1.1; 4.1", "choices about natural resources, goods and services, in the past and today"],
    ["communities-compared", "adopt", "4.1; 4.2", "how communities compare across the country and how they have changed and stayed the same"],
    ["ny-g1-american-symbols", "adopt", "4.1; 2.1", "symbols and events that shaped the nation's identity, and national landmarks"],
  ],
  "3/social": [
    ["meeting-needs", "share", "1.1; 3.1", "how people settle near natural resources and use them to meet their needs"],
    ["or-g2-world-maps", "adopt", "3.1; 4.1", "maps of the world's continents, oceans and countries, and how places shape where communities grow"],
    ["or-g5-history-detective", "adopt", "4.1; 4.2", "comparing sources about the past, and the difference between primary and secondary sources"],
    ["ny-g3-globes-and-maps", "adopt", "3.1", "using globes and maps of the world, the hemispheres, the Equator and the Prime Meridian"],
    ["ny-g3-culture", "adopt", "3.1; 3.2", "how communities are shaped by the beliefs and practices of the people in them, and how cultures meet"],
    ["az-g2-continents-oceans", "adopt", "3.1", "the seven continents and five oceans, and the communities people build around the world"],
  ],
  "4/social": [
    ["or-g5-history-detective", "adopt", "4.1; 4.2", "using primary and secondary sources about Kansas, and checking them against each other"],
    ["or-g5-earn-and-save", "adopt", "1.1; 1.2", "choices about saving, banks, and ways to pay for goods and services"],
  ],
  "5/social": [
    ["ny-g5-columbian-exchange", "adopt", "5.1; 3.1", "how Native, European and African cultures met and changed each other, and trade across the Atlantic"],
    ["wa-g5-thirteen-colonies", "adopt", "3.1; 5.1", "the development of the colonies, and the differences among the New England, Middle and Southern colonies"],
    ["ca-g5-colonial-economy", "adopt", "1.1; 2.1", "choices in the economies of the colonial regions, and the denial of rights under slavery"],
    ["ca-g5-road-to-revolution", "adopt", "1.1; 1.2", "the choices that led to the American Revolution and their consequences, and trade and taxes"],
    ["ca-g5-revolution", "adopt", "2.1; 1.1", "the Declaration of Independence, the rights it claimed, and the war for independence"],
    ["wa-g5-constitution", "adopt", "2.1; 2.2", "representative government, the debates of the Constitution, its structure and checks and balances"],
    ["or-g5-timeline", "adopt", "4.1; 4.2", "putting the events from the colonies to the Constitution in order"],
  ],
  "6/social": [
    ["first-farmers", "adopt", "4.1; 5.1", "how farming changed where people lived and how they used the land"],
    ["where-civilizations-grew", "adopt", "5.1; 5.2", "the river valleys where the first civilizations grew, and maps of early civilizations"],
    ["world-beliefs", "adopt", "3.1; 3.2", "the belief systems of early civilizations and how they shaped societies"],
    ["trade-networks", "adopt", "5.1; 5.2", "trade between civilizations, and how goods and ideas spread"],
    ["wa-g6-time-sources", "adopt", "4.1; 4.2", "dating the past, and how historians gather and check sources"],
    ["wa-g6-mesopotamia-egypt", "adopt", "4.1; 1.1", "the rise of the first civilizations and kingdoms in Mesopotamia and Egypt"],
    ["wa-g6-greece-rome", "adopt", "2.1; 4.1", "the governments, laws and citizenship of ancient Greece and Rome, and their gifts to the modern world"],
    ["ny-g6-classical-china-india", "adopt", "3.1; 4.1", "the achievements and belief systems of classical India and China"],
    ["or-g7-african-kingdoms", "adopt", "5.1; 1.1", "the trading kingdoms of Africa and how trade built their economies"],
  ],
  "7/social": [
    ["ny-g5-countries-capitals", "adopt", "5.1", "mapping world regions and their countries"],
    ["ny-g5-cultures", "adopt", "3.1; 3.2", "cultures, belief systems and the arts around the world, and what shapes identity"],
    ["ny-g5-governments", "adopt", "2.1; 2.2", "comparing forms of government around the world and the rights they give people"],
    ["ny-g5-economics", "adopt", "1.1; 5.2", "how economic choices shape nations, and comparing their economies"],
    ["maps-graphs-8", "adopt", "5.1; 5.2", "using maps, charts and graphs to explain regional patterns"],
  ],
  "8/social": [
    ["or-g8-founding-ideas", "adopt", "2.1; 2.2", "the Articles of Confederation, the Constitution and the growth of representative government"],
    ["wa-g8-bill-of-rights", "adopt", "2.1; 2.3", "the Bill of Rights and the amendments that followed, and the struggle for civil rights"],
    ["maps-graphs-8", "adopt", "5.1", "using maps and images to explain regional patterns in early U.S. history"],
    ["mb-evidence-8", "adopt", "1.4; 4.4", "gathering and checking sources, and weighing different arguments"],
    ["ca-g8-industry-reform", "adopt", "4.1; 3.1", "innovation and industry in the early United States, and reform movements"],
    ["ca-g8-civil-war", "adopt", "1.1; 1.2", "the choices that led to the Civil War, and the war's causes and consequences"],
    ["or-g8-reconstruction", "adopt", "2.1; 4.2", "the abolition of slavery, Reconstruction, and the discrimination that followed it"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "2.1; 4.1", "the origins of American government in political theory and the rule of law, and how the founding documents are interpreted"],
    ["ca-g9-civic-action", "adopt", "2.3; 2.4", "taking informed civic action, and how citizens' roles have changed"],
    ["ca-g9-media", "adopt", "5.3; 1.4", "the media and interest groups in politics, and judging the credibility of sources"],
  ],
};
