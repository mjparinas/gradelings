import type { Entry } from "../kit";

// Delaware social studies: the units Delaware uses from other frameworks, per grade ("<grade>/social"). The Delaware
// Standards for Civics, Economics, Geography and History (2018) each have four standards, and set benchmarks for grade
// clusters, not single grades: units cite them as printed, such as "C.1.4-5.b" (Civics standard 1, the 4-5 cluster,
// benchmark b). Kindergarten to Grade 3 cite the K-3 cluster, Grades 4 and 5 the 4-5 cluster, Grades 6 to 8 the 6-8
// cluster, and Grade 9 the high school cluster ("C.2.9-12.a"). Within those clusters the grades follow the history
// standard's own topics (H.4): families and communities then and now in the early grades, Delaware history and
// geography in Grade 4, themes in United States history and how the nation got its government in Grade 5, the ancient
// world in Grade 6, the world from 300 to 1500 with world geography in Grade 7, United States history to Reconstruction
// with Delaware's part in it in Grade 8, and high school civics and economics with personal finance in Grade 9.
//
// Only general units free of Canadian content and of other states' places are adopted, and never another state's units
// about its Tribes. Delaware's own units (its flag and symbols, then and now, national symbols and difference makers,
// family journeys, Delaware's counties and regions, Delaware history, geography and government, the Eastern Woodland
// peoples, Delaware and the nation, and governing Delaware) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "H.4.K-3.a; C.2.K-3.a", "the idea of diversity, and the responsibilities of each person in a family, school and community"],
    ["families", "share", "H.4.K-3.a; C.3.K-3.a", "the responsibilities of members of a family, and how families differ"],
    ["needs-and-wants", "share", "E.1.K-3.a; E.3.K-3.a", "telling needs from wants, and goods and services"],
    ["places-near-me", "adopt", "G.1.K-3.a; G.3.K-3.a", "what maps are for, and the physical and human features of familiar places"],
    ["fair-and-kind", "adopt", "C.2.K-3.a; C.1.K-3.b", "classroom and school rules, and whether rules are fair"],
    ["mb-k-jobs-and-rules", "adopt", "C.1.K-3.b; C.3.K-3.a", "rules at school and why they are fair, and the jobs of community helpers"],
    ["or-k-money-and-work", "adopt", "E.2.K-3.a; E.1.K-3.a", "the characteristics of money, and goods, services, producers and consumers"],
    ["ca-k-calendar", "adopt", "H.1.K-3.a", "calendars and the national and Delaware celebrations through the year"],
    ["ca-k-good-citizens", "adopt", "C.3.K-3.a; C.4.K-3.a", "the responsibilities of individuals, and ways to be involved in the community"],
  ],
  "1/social": [
    ["maps", "share", "G.1.K-3.a", "what maps and globes are for, and map keys and the compass rose"],
    ["our-land", "share", "G.2.K-3.a; E.3.K-3.a", "major physical features on Earth, and how people use resources"],
    ["my-community", "share", "C.1.K-3.b; E.1.K-3.a", "community helpers and their responsibilities, and goods and services"],
    ["changes-in-my-life", "adopt", "H.4.K-3.a; H.1.K-3.a", "how the lives of children have changed over time"],
    ["respect-and-inclusion", "adopt", "C.2.K-3.a; H.4.K-3.a", "the idea of diversity, and values and beliefs"],
    ["community-services", "adopt", "C.1.K-3.b; G.3.K-3.a", "the people and services that help the community"],
    ["wa-g1-earn-save-share", "adopt", "E.2.K-3.a; E.1.K-3.b", "the characteristics of money, and what banks do for savers"],
    ["ca-g1-long-ago", "adopt", "H.4.K-3.a; H.2.K-3.a", "how life has changed over time, and the celebrations and symbols that remember the past"],
  ],
  "2/social": [
    ["ca-g2-citizens-and-leaders", "adopt", "C.1.K-3.a; C.4.K-3.a", "how public officials are chosen, and ways people help their community"],
    ["mb-working-together", "adopt", "C.4.K-3.a; C.2.K-3.a", "working together in the community, and making fair rules"],
    ["ca-g2-work-and-money", "adopt", "E.1.K-3.a; E.2.K-3.a", "resources, and the different kinds of work in the United States economy"],
    ["communities-compared", "adopt", "G.3.K-3.a; G.4.K-3.a", "places that share geographic characteristics, and where people live in cities and on farms"],
    ["ny-g1-american-symbols", "adopt", "H.4.K-3.b; C.3.K-3.a", "the documents and symbols that stand for the core ideals of the United States"],
  ],
  "3/social": [
    ["meeting-needs", "share", "E.3.K-3.a; G.2.K-3.a", "how the environment gives people opportunities, and the role of natural resources in daily life"],
    ["or-g2-world-maps", "adopt", "G.1.K-3.a; G.2.K-3.a", "locating major features on Earth, and the purposes of geographic tools"],
    ["ny-g3-globes-and-maps", "adopt", "G.1.K-3.a", "using globes and maps, the hemispheres, the Equator and the Prime Meridian"],
    ["ny-g3-culture", "adopt", "H.4.K-3.a; G.4.K-3.a", "how societies express their cultures, and the contributions of different groups"],
    ["az-g2-continents-oceans", "adopt", "G.1.K-3.a", "locating the continents and oceans"],
  ],
  "4/social": [
    ["or-g5-earn-and-save", "adopt", "E.2.4-5.a; E.1.4-5.b", "how households make economic choices such as saving, and the ways people exchange goods and services"],
  ],
  "5/social": [
    ["ny-g5-columbian-exchange", "adopt", "E.4.4-5.a; H.1.4-5.a", "how trade routes connected the world, and the spread of goods, ideas and technology"],
    ["wa-g5-thirteen-colonies", "adopt", "H.4.4-5.b; G.3.4-5.a", "the heritage early settlers brought, and the groups who built the colonies"],
    ["ca-g5-colonial-economy", "adopt", "E.3.4-5.a; H.4.4-5.b", "the colonial economy, including slavery, and specialization"],
    ["ca-g5-road-to-revolution", "adopt", "H.4.4-5.b; H.1.4-5.a", "how and why the colonists moved toward self-government, and the founding ideals of government in the United States"],
    ["ca-g5-revolution", "adopt", "H.4.4-5.b; C.1.4-5.a", "the war for independence, and the core ideals in the founding documents"],
    ["wa-g5-constitution", "adopt", "C.1.4-5.a; C.1.4-5.b", "the principles in the Constitution, and how American government is founded on them"],
    ["or-g5-timeline", "adopt", "H.1.4-5.a; H.2.4-5.b", "putting the events from the colonies to the Constitution in order"],
  ],
  "6/social": [
    ["first-farmers", "adopt", "H.4.6-8.b; G.2.6-8.a", "the agricultural revolution, and the tension between farmers and herders"],
    ["where-civilizations-grew", "adopt", "H.4.6-8.b; G.3.6-8.b", "the rise of cities, and settlement along rivers"],
    ["world-beliefs", "adopt", "H.4.6-8.b; G.3.6-8.a", "the spread of world religions"],
    ["trade-networks", "adopt", "E.4.6-8.a; H.4.6-8.b", "how land and water routes shaped trade, and the spread of ideas and technology"],
    ["wa-g6-mesopotamia-egypt", "adopt", "H.4.6-8.b; H.2.6-8.b", "the invention of writing, and the political systems of the first civilizations"],
    ["wa-g6-greece-rome", "adopt", "H.4.6-8.b; C.1.6-8.a", "the governments of ancient Greece and Rome, and limited and unlimited governments"],
    ["ny-g6-classical-china-india", "adopt", "H.4.6-8.b; G.3.6-8.a", "the belief systems of classical India and China, and how education shaped them"],
    ["or-g7-african-kingdoms", "adopt", "H.4.6-8.b; E.4.6-8.a", "the trade routes that built Africa's kingdoms, and the rise of cities such as Timbuktu"],
  ],
  "7/social": [
    ["ca-g7-rome-byzantium", "adopt", "H.4.6-8.b; H.1.6-8.a", "how rulers claimed the right to govern, and architecture as a symbol of a society's values"],
    ["ca-g7-arabia-islam", "adopt", "H.4.6-8.b; G.3.6-8.a", "the influence of religion on political systems, and how ideas spread through art and learning"],
    ["ca-g7-west-african-life", "adopt", "H.4.6-8.b; G.4.6-8.a", "trade connecting regions across the Sahara, and the rulers of West Africa"],
    ["ca-g7-imperial-china", "adopt", "H.4.6-8.b; E.3.6-8.a", "Confucian ideas in government, and how emperors claimed the right to rule"],
    ["ca-g7-medieval-japan", "adopt", "H.4.6-8.b; G.3.6-8.a", "how shoguns and emperors held power, and Japan's art and literature"],
    ["ca-g7-church-and-crowns", "adopt", "H.4.6-8.b; H.1.6-8.a", "the church's influence on medieval governments, and the Black Death"],
    ["ca-g7-aztec-inca", "adopt", "H.4.6-8.b; G.2.6-8.a", "Aztec and Inca cities and temples, and how people perceive and adapt to their places"],
    ["ny-g5-countries-capitals", "adopt", "G.1.6-8.a; G.4.6-8.b", "the types of regions, and using maps to locate countries"],
    ["ny-g5-cultures", "adopt", "G.3.6-8.a; G.3.6-8.b", "how culture affects how people see places, and how art and traditions carry culture"],
    ["ny-g5-governments", "adopt", "C.1.6-8.a; E.3.6-8.a", "forms of government around the world, and countries working together"],
    ["ny-g5-economics", "adopt", "E.3.6-8.a; E.4.6-8.a", "the ways economies allocate resources, and changing economies and world trade"],
    ["maps-graphs-8", "adopt", "G.1.6-8.a", "the strengths of maps, globes, photographs and graphs"],
  ],
  "8/social": [
    ["or-g8-founding-ideas", "adopt", "C.2.6-8.b; H.4.6-8.a", "why limiting government protects rights, and the arguments over representative government"],
    ["wa-g8-bill-of-rights", "adopt", "C.2.6-8.b; C.3.6-8.a", "limits on government that protect individual rights, and how Americans take part in civic life"],
    ["maps-graphs-8", "adopt", "G.1.6-8.a; G.4.6-8.a", "using maps, globes, photographs and graphs, and the types of regions"],
    ["ca-g8-industry-reform", "adopt", "H.4.6-8.a; E.3.6-8.a", "conflict between management and labor, and how industry changed families"],
    ["ca-g8-civil-war", "adopt", "H.4.6-8.a; H.1.6-8.a", "states' rights and national authority, and the role of economics in war"],
    ["or-g8-reconstruction", "adopt", "H.4.6-8.a; C.2.6-8.a", "how voting rights expanded, and the conflict between states and the nation after the Civil War"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "C.2.9-12.b; C.1.9-12.a", "the fundamental ideals of American government, and the Constitution as a living document"],
    ["ca-g9-civic-action", "adopt", "C.3.9-12.a; C.4.9-12.b", "how engaged citizens have preserved and changed democracy, and why liberty needs informed participation"],
    ["ca-g9-media", "adopt", "C.3.9-12.a; C.2.9-12.a", "responsible practices in the political process, and the rise and fall of political parties and movements"],
  ],
};
