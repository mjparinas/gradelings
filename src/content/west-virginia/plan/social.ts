import type { Entry } from "../kit";

// West Virginia social studies: the units West Virginia uses from other frameworks, per grade ("<grade>/social"). The
// West Virginia College- and Career-Readiness Standards for Social Studies (Policy 2520.4, 2024) number each standard by
// grade ("SS.4.12"), in civics, economics, geography and history. Each grade has a focus: the child's own community and
// state (Kindergarten to 2), the broader community, state, nation and world with Native American settlement and world
// exploration (3), the United States from colonization to Westward Expansion before 1854 (4), the United States from
// the Civil War to its rise as a world power, and how West Virginia became a state (5), the world in the 20th and 21st
// centuries (6), a continent-by-continent study of world geography and the ancient world (7) and West Virginia Studies
// (8). Grade 9 is World Studies ("SS.W.16"), the first of the three social studies courses every West Virginia student
// takes in high school. Only general units free of Canadian content and of other states' places are adopted, and never
// another state's units about its Tribes. West Virginia's own units (its symbols, regions, counties, statehood and
// history) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "SS.K.14; SS.K.17", "a child's own story, from name and birthday to the events of their life"],
    ["families", "share", "SS.K.16", "learning about other people, times and cultures through family stories, customs and traditions"],
    ["needs-and-wants", "share", "SS.K.6; SS.K.8", "the basic needs of people, and telling wants from needs"],
    ["places-near-me", "adopt", "SS.K.9; SS.K.21", "simple maps of familiar places, and the local community"],
    ["pe-first-maps-k", "adopt", "SS.K.9; SS.K.10", "simple maps of familiar places, land and water on a map, and direction words"],
    ["mb-k-jobs-and-rules", "adopt", "SS.K.3; SS.K.4; SS.K.5", "why we have rules, leaders at home and school, and jobs in the community"],
    ["or-k-money-and-work", "adopt", "SS.K.7", "trading goods and services with money"],
    ["fair-and-kind", "adopt", "SS.K.1; SS.K.2", "being a good citizen at school, and getting along with others"],
    ["ca-k-good-citizens", "adopt", "SS.K.1", "citizenship: sharing, taking turns, helping and being honest"],
    ["mb-k-yesterday-today-tomorrow", "adopt", "SS.K.17; SS.K.16", "past, present and future in a child's own life, and how people lived long ago"],
    ["ca-k-calendar", "adopt", "SS.K.17", "days, weeks and months, and putting events in order"],
  ],
  "1/social": [
    ["maps", "share", "SS.1.10; SS.1.14", "directions, map symbols and landforms on simple maps, and using maps and globes"],
    ["our-land", "share", "SS.1.11; SS.1.12", "how climate and location shape how people live, and natural resources and their uses"],
    ["my-community", "share", "SS.1.5; SS.1.6", "working together on a community need, and the jobs people do in a community"],
    ["changes-in-my-life", "adopt", "SS.1.19", "putting the events of a child's own life in order"],
    ["respect-and-inclusion", "adopt", "SS.1.1; SS.1.17", "cooperation and respect for others, and what families from many cultures bring to a community"],
    ["community-services", "adopt", "SS.1.2; SS.1.6", "the rules and laws that keep a community safe, and the jobs and services in it"],
    ["pe-goods-and-services-1", "adopt", "SS.1.8", "goods and services, and how people trade them"],
    ["ca-g1-long-ago", "adopt", "SS.1.16", "how school, travel and daily life have changed, from old photos and stories"],
    ["wa-g1-earn-save-share", "adopt", "SS.1.7; SS.1.9", "needs and wants, and how families earn, spend and save money"],
  ],
  "2/social": [
    ["needs-and-wants", "share", "SS.2.6", "sorting needs and wants, and the cost of one choice over another"],
    ["then-and-now", "adopt", "SS.2.14; SS.2.11", "how a community and its families change over time, and why"],
    ["communities-compared", "adopt", "SS.2.11", "how climate, location and land shape a community over time"],
    ["ns-community-change-2", "adopt", "SS.2.14", "putting a community's events in order on a timeline"],
    ["mb-working-together", "adopt", "SS.2.1", "fairness, rules and working together"],
    ["ca-g2-citizens-and-leaders", "adopt", "SS.2.2; SS.2.4", "local, state and national government and their leaders, and national symbols and holidays"],
    ["ca-g2-work-and-money", "adopt", "SS.2.7; SS.2.5", "making and trading goods and services, and the work people do"],
    ["az-g2-continents-oceans", "adopt", "SS.2.10", "finding the continents and oceans on a map and a globe"],
  ],
  "3/social": [
    ["meeting-needs", "share", "SS.3.9; SS.3.10", "the path from raw material to product, and how jobs follow a region's resources"],
    ["tx-g3-money-and-voting", "adopt", "SS.3.7; SS.3.1", "banks, saving, spending and borrowing, and the values behind voting and taking part"],
    ["mb-working-together", "adopt", "SS.3.6", "working together on a service project, and how it improves a community"],
  ],
  "4/social": [
    ["wa-g5-thirteen-colonies", "adopt", "SS.4.12", "why the colonies were founded, and the New England, Middle and Southern colonies"],
    ["ca-g5-colonial-economy", "adopt", "SS.4.12; SS.4.5", "the resources, work and trade of the colonies, and people as producers and consumers"],
    ["ca-g5-slavery-and-resistance", "adopt", "SS.4.7", "how slavery shaped the early economy of the United States, and the resistance of enslaved people"],
    ["ca-g5-road-to-revolution", "adopt", "SS.4.13", "the French and Indian War, British policies and the protests that led to the Revolution"],
    ["ca-g5-revolution", "adopt", "SS.4.13; SS.4.11", "the Declaration of Independence and the major events of the Revolutionary War"],
    ["wa-g5-constitution", "adopt", "SS.4.14; SS.4.2", "from the Articles of Confederation to the Constitution and the Bill of Rights, and the three branches"],
    ["wa-g8-bill-of-rights", "adopt", "SS.4.1; SS.4.3", "the rights in the founding documents, and how the rule of law protects them"],
    ["tx-g5-growing-nation", "adopt", "SS.4.15", "the Louisiana Purchase, the War of 1812 and the causes and effects of Westward Expansion"],
    ["wa-g5-us-geography", "adopt", "SS.4.8; SS.4.9", "the physical features of the United States, and how land and water shaped where people settled"],
  ],
  "5/social": [
    ["ca-g8-divided-nation", "adopt", "SS.5.10; SS.5.21", "the industrial North and the agricultural South, and the reform movements before the Civil War"],
    ["wa-g8-civil-war", "adopt", "SS.5.21", "the causes, leaders and turning points of the Civil War"],
    ["or-g8-reconstruction", "adopt", "SS.5.6; SS.5.22; SS.5.12", "the Thirteenth, Fourteenth and Fifteenth Amendments, and Reconstruction and its effects"],
    ["ny-g8-expansion-empire", "adopt", "SS.5.13; SS.5.23; SS.5.24", "railroads and the West, the effects on Native Americans, and the Spanish-American War"],
    ["ca-g8-industrial-america", "adopt", "SS.5.25", "inventions, big business and workers in the Industrial Revolution"],
    ["ny-g8-city-immigrants", "adopt", "SS.5.15; SS.5.8", "immigration in the early 1900s, Ellis Island, and why people moved"],
    ["ga-g5-amendments", "adopt", "SS.5.4", "how amendments are made, and what they mean for people's lives"],
    ["or-g5-states-capitals", "adopt", "SS.5.17", "locating the fifty states and their capitals"],
  ],
  "6/social": [
    ["ny-g8-world-war-i", "adopt", "SS.6.19", "the causes, key events and outcomes of World War I"],
    ["ny-g8-great-depression", "adopt", "SS.6.20; SS.6.11", "the causes and effects of the Great Depression, and the New Deal's economic policies"],
    ["ny-g8-world-war-ii", "adopt", "SS.6.21", "the rise of dictators, and the key events and outcomes of World War II"],
    ["ny-g8-cold-war", "adopt", "SS.6.22", "the Cold War between the United States and the Soviet Union"],
    ["ny-g8-civil-rights", "adopt", "SS.6.23", "the key figures and events of the Civil Rights Movement"],
    ["fl-g7-us-and-world", "adopt", "SS.6.24; SS.6.5", "world conflicts of the late 20th and early 21st centuries, September 11, and how Americans responded"],
    ["ca-g9-three-branches", "adopt", "SS.6.3; SS.6.1", "Congress and its members, and how a bill becomes a law"],
    ["az-g7-world-since-1945", "adopt", "SS.6.6; SS.6.12", "the United Nations, aid organizations and the alliances of the world since 1945"],
  ],
  "7/social": [
    ["wa-g6-world-maps", "adopt", "SS.7.11", "latitude, longitude, the equator and the prime meridian, and reading world maps"],
    ["ga-g6-latin-america", "adopt", "SS.7.13", "the land, people and countries of Central and South America and the Caribbean"],
    ["ga-g6-europe", "adopt", "SS.7.14", "the physical features of Europe and how they shaped its countries and cultures"],
    ["ga-g7-africa", "adopt", "SS.7.17", "the physical features, resources and people of Africa"],
    ["ma-g7-asia-geography", "adopt", "SS.7.18; SS.7.19", "the mountains, rivers and countries of South, East and Southeast Asia"],
    ["ga-g6-australia", "adopt", "SS.7.20", "the land, people and trade of Australia"],
    ["ga-g7-economies", "adopt", "SS.7.5; SS.7.9", "supply, demand, trade and scarcity, and how natural resources shape an economy"],
    ["tx-g6-governments", "adopt", "SS.7.1", "democracy, monarchy, dictatorship and other forms of government"],
    ["wa-g6-mesopotamia-egypt", "adopt", "SS.7.22; SS.7.21", "the first river valley civilizations of Mesopotamia and Egypt"],
    ["wa-g6-india-china", "adopt", "SS.7.22; SS.7.23", "the ancient civilizations of India and China"],
    ["wa-g6-greece-rome", "adopt", "SS.7.23; SS.7.1", "classical Greece and Rome, democracy and the republic"],
    ["wa-g6-americas-africa", "adopt", "SS.7.22; SS.7.24", "the Maya, Aztec and Inca, the kingdoms of Ghana and Mali, and their trade"],
  ],
  "8/social": [
    ["wa-g8-bill-of-rights", "adopt", "SS.8.3", "the rights of citizens in the United States Constitution"],
  ],
  "9/social": [
    ["ca-g6-roman-empire", "adopt", "SS.W.16; SS.W.3", "the Roman Empire, its laws and its legacy"],
    ["ny-g6-classical-china-india", "adopt", "SS.W.16", "the classical civilizations of China and India"],
    ["ny-g9-crusades-plague", "adopt", "SS.W.17", "post-classical societies, the Crusades and the Black Death"],
    ["ca-g7-renaissance-cities", "adopt", "SS.W.18", "the Renaissance and the trade that spread its ideas"],
    ["ny-g9-atlantic-world", "adopt", "SS.W.18; SS.W.6", "the Age of Exploration, the Atlantic slave trade and new trade patterns"],
    ["ny-g9-absolutism-enlightenment", "adopt", "SS.W.19; SS.W.18", "strong monarchs, the Scientific Revolution and the Enlightenment"],
    ["al-g9-industrial-revolution", "adopt", "SS.W.20", "the causes and effects of the Industrial Revolution"],
    ["or-g7-age-of-revolutions", "adopt", "SS.W.21", "political revolutions and the governments they formed"],
    ["al-g9-imperialism", "adopt", "SS.W.22", "imperial expansion in Africa and Asia, and resistance to it"],
    ["al-g9-interwar", "adopt", "SS.W.24", "the Great Depression and the rise of totalitarian regimes"],
    ["al-g9-world-war-ii", "adopt", "SS.W.25", "the causes, turning points and results of World War II"],
    ["al-g9-holocaust", "adopt", "SS.W.25", "the Holocaust"],
    ["al-g9-decolonization", "adopt", "SS.W.27", "independence movements after World War II"],
    ["al-g9-world-today", "adopt", "SS.W.28; SS.W.14", "globalization, competition for resources and the challenges of today's world"],
  ],
};
