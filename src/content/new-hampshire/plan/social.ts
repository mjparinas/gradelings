import type { Entry } from "../kit";

// New Hampshire social studies: the units New Hampshire uses from other frameworks, per grade ("<grade>/social"). The
// K-12 Social Studies New Hampshire Curriculum Framework (2006) has five strands, Civics and Government (CV), Economics
// (EC), Geography (GE), US and New Hampshire History (HI) and World History and Contemporary Issues (WH), and sets its
// expectations for grade spans, not single grades: units cite them as printed, such as "SS:CV:4:2.1" (civics, the span
// ending in grade 4, standard 2, expectation 1). Kindergarten to Grade 2 cite the K-2 span, Grades 3 and 4 the 3-4 span,
// Grades 5 and 6 the 5-6 span, Grades 7 and 8 the 7-8 span, and Grade 9 the high school span ("SS:CV:12:1.1"). Within
// those spans the grades follow the usual order: community and nation in the early grades, New Hampshire communities in
// Grade 3 and New Hampshire history and government in Grade 4, United States history in Grade 5, the ancient world in
// Grade 6, the world after the ancient era in Grade 7, United States history and civics in Grade 8, and high school
// civics and economics with personal finance in Grade 9.
//
// Only general units free of Canadian content and of other states' places are adopted, and never another state's units
// about its Tribes. New Hampshire's own units (its flag and symbols, then and now, national symbols and difference
// makers, migration and regions, New Hampshire history and government, the Eastern Woodland and explorers, New
// Hampshire and the nation, and governing New Hampshire) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "SS:HI:2:5.2; SS:CV:2:4.1", "the idea of diversity, and the responsibilities of each person in a family, school and community"],
    ["families", "share", "SS:CV:2:4.1; SS:HI:2:5.2", "the responsibilities of members of a family, and how families differ"],
    ["needs-and-wants", "share", "SS:EC:2:2.1; SS:EC:2:1.1", "telling needs from wants, and goods and services"],
    ["places-near-me", "adopt", "SS:GE:2:1.1; SS:GE:2:2.1", "what maps are for, and the physical and human features of familiar places"],
    ["fair-and-kind", "adopt", "SS:CV:2:1.1; SS:CV:2:1.4", "classroom and school rules, and whether rules are fair"],
    ["mb-k-jobs-and-rules", "adopt", "SS:CV:2:1.4; SS:CV:2:4.1", "rules at school and why they are fair, and the jobs of community helpers"],
    ["or-k-money-and-work", "adopt", "SS:EC:2:4.1; SS:EC:2:1.1", "the characteristics of money, and goods, services, producers and consumers"],
    ["ca-k-calendar", "adopt", "SS:HI:2:1.1", "national and New Hampshire celebrations through the year"],
    ["ca-k-good-citizens", "adopt", "SS:CV:2:4.1; SS:CV:2:4.2", "the responsibilities of individuals, and ways to be involved in the community"],
  ],
  "1/social": [
    ["maps", "share", "SS:GE:2:1.1; SS:GE:2:1.2", "what maps and globes are for, and map keys and the compass rose"],
    ["our-land", "share", "SS:GE:2:1.3; SS:GE:2:5.2", "major physical features on Earth, and how people use resources"],
    ["my-community", "share", "SS:CV:2:4.1; SS:EC:2:1.1", "community helpers and their responsibilities, and goods and services"],
    ["changes-in-my-life", "adopt", "SS:HI:2:5.1", "how the lives of children have changed over time"],
    ["respect-and-inclusion", "adopt", "SS:HI:2:5.2; SS:WH:2:5.1", "the idea of diversity, and values and beliefs"],
    ["community-services", "adopt", "SS:CV:2:4.1", "the people and services that help the community"],
    ["wa-g1-earn-save-share", "adopt", "SS:EC:2:4.1; SS:EC:2:4.2", "the characteristics of money, and what banks do for savers"],
    ["ca-g1-long-ago", "adopt", "SS:HI:2:5.1; SS:HI:2:1.1", "how life has changed over time, and the celebrations and symbols that remember the past"],
  ],
  "2/social": [
    ["ca-g2-citizens-and-leaders", "adopt", "SS:CV:2:2.1; SS:CV:2:4.2", "how public officials are chosen, and ways people help their community"],
    ["mb-working-together", "adopt", "SS:CV:2:4.2; SS:CV:2:1.4", "working together in the community, and making fair rules"],
    ["ca-g2-work-and-money", "adopt", "SS:EC:2:5.1; SS:HI:2:4.1", "resources, and the different kinds of work in the United States economy"],
    ["communities-compared", "adopt", "SS:GE:2:2.2; SS:GE:2:4.1", "places that share geographic characteristics, and where people live in cities and on farms"],
    ["ny-g1-american-symbols", "adopt", "SS:CV:2:1.2", "the documents and symbols that stand for the core ideals of the United States"],
  ],
  "3/social": [
    ["meeting-needs", "share", "SS:GE:4:5.2; SS:GE:4:5.4", "how the environment gives people opportunities, and the role of natural resources in daily life"],
    ["or-g2-world-maps", "adopt", "SS:GE:4:1.3; SS:GE:4:1.1", "locating major features on Earth, and the purposes of geographic tools"],
    ["ny-g3-globes-and-maps", "adopt", "SS:GE:4:1.1", "using globes and maps, the hemispheres, the Equator and the Prime Meridian"],
    ["ny-g3-culture", "adopt", "SS:WH:4:5.1; SS:HI:4:5.1", "how societies express their cultures, and the contributions of different groups"],
    ["az-g2-continents-oceans", "adopt", "SS:GE:4:1.3", "locating the continents and oceans"],
  ],
  "4/social": [
    ["or-g5-earn-and-save", "adopt", "SS:EC:4:2.3; SS:EC:4:4.1", "how households make economic choices such as saving, and the ways people exchange goods and services"],
  ],
  "5/social": [
    ["ny-g5-columbian-exchange", "adopt", "SS:WH:6:2.1; SS:WH:6:2.2", "how trade routes connected the world, and the spread of goods, ideas and technology"],
    ["wa-g5-thirteen-colonies", "adopt", "SS:CV:6:2.2; SS:HI:6:5.1", "the heritage early settlers brought, and the groups who built the colonies"],
    ["ca-g5-colonial-economy", "adopt", "SS:HI:6:4.1; SS:EC:6:1.2", "the colonial economy, including slavery, and specialization"],
    ["ca-g5-road-to-revolution", "adopt", "SS:HI:6:1.1; SS:CV:6:2.1", "how and why the colonists moved toward self-government, and the founding ideals of government in the United States"],
    ["ca-g5-revolution", "adopt", "SS:HI:6:1.1; SS:CV:6:1.2", "the war for independence, and the core ideals in the founding documents"],
    ["wa-g5-constitution", "adopt", "SS:CV:6:1.2; SS:CV:6:2.1", "the principles in the Constitution, and how American government is founded on them"],
    ["or-g5-timeline", "adopt", "SS:HI:6:1.1", "putting the events from the colonies to the Constitution in order"],
  ],
  "6/social": [
    ["first-farmers", "adopt", "SS:WH:6:4.1; SS:WH:6:4.2", "the agricultural revolution, and the tension between farmers and herders"],
    ["where-civilizations-grew", "adopt", "SS:WH:6:5.1; SS:GE:6:4.4", "the rise of cities, and settlement along rivers"],
    ["world-beliefs", "adopt", "SS:WH:6:3.1", "the spread of world religions"],
    ["trade-networks", "adopt", "SS:WH:6:2.1; SS:WH:6:2.2", "how land and water routes shaped trade, and the spread of ideas and technology"],
    ["wa-g6-mesopotamia-egypt", "adopt", "SS:WH:6:4.4; SS:WH:6:1.1", "the invention of writing, and the political systems of the first civilizations"],
    ["wa-g6-greece-rome", "adopt", "SS:WH:6:1.1; SS:CV:6:1.4", "the governments of ancient Greece and Rome, and limited and unlimited governments"],
    ["ny-g6-classical-china-india", "adopt", "SS:WH:6:3.1; SS:WH:6:3.2", "the belief systems of classical India and China, and how education shaped them"],
    ["or-g7-african-kingdoms", "adopt", "SS:WH:6:2.1; SS:WH:6:5.1", "the trade routes that built Africa's kingdoms, and the rise of cities such as Timbuktu"],
  ],
  "7/social": [
    ["ca-g7-rome-byzantium", "adopt", "SS:WH:8:1.1; SS:WH:8:3.2", "how rulers claimed the right to govern, and architecture as a symbol of a society's values"],
    ["ca-g7-arabia-islam", "adopt", "SS:WH:8:1.2; SS:WH:8:3.1", "the influence of religion on political systems, and how ideas spread through art and learning"],
    ["ca-g7-west-african-life", "adopt", "SS:GE:8:2.2; SS:WH:8:1.1", "trade connecting regions across the Sahara, and the rulers of West Africa"],
    ["ca-g7-imperial-china", "adopt", "SS:WH:8:1.2; SS:WH:8:1.1", "Confucian ideas in government, and how emperors claimed the right to rule"],
    ["ca-g7-medieval-japan", "adopt", "SS:WH:8:1.1; SS:WH:8:3.1", "how shoguns and emperors held power, and Japan's art and literature"],
    ["ca-g7-church-and-crowns", "adopt", "SS:WH:8:1.2; SS:WH:8:2.1", "the church's influence on medieval governments, and the Black Death"],
    ["ca-g7-aztec-inca", "adopt", "SS:WH:8:3.2; SS:GE:8:2.3", "Aztec and Inca cities and temples, and how people perceive and adapt to their places"],
    ["ny-g5-countries-capitals", "adopt", "SS:GE:8:2.1; SS:GE:8:1.1", "the types of regions, and using maps to locate countries"],
    ["ny-g5-cultures", "adopt", "SS:GE:8:2.3; SS:WH:8:3.1", "how culture affects how people see places, and how art and traditions carry culture"],
    ["ny-g5-governments", "adopt", "SS:WH:8:1.1; SS:CV:8:3.1", "forms of government around the world, and countries working together"],
    ["ny-g5-economics", "adopt", "SS:EC:8:5.1; SS:EC:8:5.4", "the ways economies allocate resources, and changing economies and world trade"],
    ["maps-graphs-8", "adopt", "SS:GE:8:1.1", "the strengths of maps, globes, photographs and graphs"],
  ],
  "8/social": [
    ["or-g8-founding-ideas", "adopt", "SS:CV:8:1.1; SS:CV:8:1.2", "why limiting government protects rights, and the arguments over representative government"],
    ["wa-g8-bill-of-rights", "adopt", "SS:CV:8:1.1; SS:CV:8:4.1", "limits on government that protect individual rights, and how Americans take part in civic life"],
    ["maps-graphs-8", "adopt", "SS:GE:8:1.1; SS:GE:8:2.1", "using maps, globes, photographs and graphs, and the types of regions"],
    ["ca-g8-industry-reform", "adopt", "SS:HI:8:4.2; SS:HI:8:5.1", "conflict between management and labor, and how industry changed families"],
    ["ca-g8-civil-war", "adopt", "SS:HI:8:1.4; SS:EC:8:5.3", "states' rights and national authority, and the role of economics in war"],
    ["or-g8-reconstruction", "adopt", "SS:HI:8:1.1; SS:HI:8:1.4", "how voting rights expanded, and the conflict between states and the nation after the Civil War"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "SS:CV:12:2.1; SS:CV:12:2.2", "the fundamental ideals of American government, and the Constitution as a living document"],
    ["ca-g9-civic-action", "adopt", "SS:CV:12:4.2; SS:CV:12:4.3", "how engaged citizens have preserved and changed democracy, and why liberty needs informed participation"],
    ["ca-g9-media", "adopt", "SS:CV:12:4.1; SS:HI:12:1.1", "responsible practices in the political process, and the rise and fall of political parties and movements"],
  ],
};
