import type { Entry } from "../kit";

// Alaska social studies: the units Alaska uses from other frameworks, per grade ("<grade>/social"). The Alaska Social
// Studies Standards (adopted December 2024) give each grade a theme and leveled content standards, cited by code:
// "SS.4.1.18.1" is Grade 4, the first standard under content anchor standard 18 (geographic representations). Grades 6
// to 8 number standards by theme ("SS.6.2.22.1"), and Grade 9 cites the Grades 9-12 civics standards ("SS.9-12.9.1") and
// the Alaska History course ("SS.AKH.5.8.1").
//
// Grade themes: Me and My World (K), My Place in the World (1), My Local Community (2), Alaska's Past, Present, and
// Future (3), U.S. Cultures and Regions (4), Foundations and History of the U.S. (5), Alaska Studies and Geography (6),
// World History and Geography (7), U.S. History and Civics (8); Grade 9 is civics, as in the other US states, with
// Alaska's own government and history. Only general units free of Canadian content and of Washington State, Oregon and
// California are adopted, and never another state's units about its Tribes. Alaska's own units (the state's land,
// history, government and economy, and Alaska Native cultures) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "SS.K.1.25.1; SS.K.2.21.1", "exploring the traditions of families and cultural groups, and describing events from a child's own point of view"],
    ["families", "share", "SS.K.2.23.1; SS.K.1.23.1", "describing a past event, and putting family events in order"],
    ["needs-and-wants", "share", "SS.K.1.12.1; SS.K.2.12.1", "the difference between needs and wants, and why people choose between them"],
    ["places-near-me", "adopt", "SS.K.1.18.1; SS.K.3.16.1", "simple maps of familiar places and the land around the school"],
    ["fair-and-kind", "adopt", "SS.K.3.6.1; SS.K.2.7.1; SS.K.1.8.1", "rules for different places, respect for others, and solving problems by sharing"],
    ["mb-k-jobs-and-rules", "adopt", "SS.K.1.6.1; SS.K.2.6.1", "the leaders in a child's life and the important jobs people do"],
    ["or-k-money-and-work", "adopt", "SS.K.1.11.1; SS.K.4.11.1", "goods and services, and how people work to support their families"],
    ["ca-k-calendar", "adopt", "SS.K.1.23.1", "days, weeks and months, and putting events in order on a timeline"],
    ["ca-k-good-citizens", "adopt", "SS.K.3.7.1; SS.K.2.8.1", "working together to make decisions, and what happens when rules are or aren't followed"],
  ],
  "1/social": [
    ["maps", "share", "SS.1.1.18.1; SS.1.2.18.1", "making and reading maps with a key, symbols and a compass rose"],
    ["our-land", "share", "SS.1.1.16.1; SS.1.2.19.1", "how weather and the land affect people, and how they use it to meet their needs"],
    ["my-community", "share", "SS.1.2.6.1; SS.1.1.14.1", "roles at home, at school and in the community, and trading for what a place doesn't have"],
    ["changes-in-my-life", "adopt", "SS.1.1.23.1", "making a personal timeline of events in order"],
    ["respect-and-inclusion", "adopt", "SS.1.2.7.1; SS.1.4.7.1", "equality and fairness, and comparing different points of view"],
    ["community-services", "adopt", "SS.1.2.13.1; SS.1.1.6.1", "the services communities provide, and the leaders and workers who provide them"],
    ["wa-g1-earn-save-share", "adopt", "SS.1.1.13.1; SS.1.2.12.1", "decisions about spending and saving, and choosing between needs and wants"],
    ["ca-g1-long-ago", "adopt", "SS.1.2.23.1", "how communities and daily life change over time"],
  ],
  "2/social": [
    ["needs-and-wants", "share", "SS.2.1.12.1", "scarcity and how it affects the choices people make"],
    ["then-and-now", "adopt", "SS.2.2.23.1; SS.2.2.22.1", "comparing life in a community in the past and today, using historical sources"],
    ["communities-compared", "adopt", "SS.2.2.19.1; SS.2.1.16.1", "how different communities use their environments, and how weather and land shape lives"],
    ["ns-community-change-2", "adopt", "SS.2.3.8.1; SS.2.1.23.1", "how people have improved their community over time, and putting events in order"],
    ["mb-working-together", "adopt", "SS.2.1.8.1; SS.2.3.7.1", "making decisions together and taking on roles in a group"],
    ["ca-g2-citizens-and-leaders", "adopt", "SS.2.1.6.1; SS.2.2.6.1", "leaders and their jobs, and choosing leaders by voting"],
    ["ca-g2-reading-maps", "adopt", "SS.2.1.18.1; SS.2.2.18.1", "making and reading maps of places in the community"],
    ["ca-g2-work-and-money", "adopt", "SS.2.4.11.1; SS.2.1.13.1", "how and why people earn money, and short- and long-term saving goals"],
    ["or-g2-world-maps", "adopt", "SS.2.3.18.1", "finding continents, oceans and regions on a globe"],
  ],
  "3/social": [
    ["meeting-needs", "share", "SS.3.1.11.1; SS.3.2.11.1", "natural resources and capital, and how people specialize and trade to meet their needs"],
    ["mb-working-together", "adopt", "SS.3.6.6.1; SS.3.3.7.1", "how people benefit from working together, and why groups need ways to make decisions"],
  ],
  "4/social": [
    ["or-g6-world-maps", "adopt", "SS.4.1.18.1", "maps and globes of the world's regions, latitude and longitude"],
    ["or-g5-history-detective", "adopt", "SS.4.2.22.1; SS.4.5.22.1", "using different kinds of historical sources and judging when and by whom they were made"],
    ["or-g5-states-capitals", "adopt", "SS.4.2.18.1", "using maps to find the states of the United States and their capitals"],
    ["or-g5-earn-and-save", "adopt", "SS.4.3.11.1; SS.4.1.13.1", "how money makes exchange easier, and interest as the price of using someone else's money"],
  ],
  "5/social": [
    ["wa-g5-thirteen-colonies", "adopt", "SS.5.2.16.1; SS.5.1.17.1", "the thirteen colonies, their regions and how the land shaped life in each"],
    ["ca-g5-colonial-economy", "adopt", "SS.5.5.11.1; SS.5.2.11.1", "how colonial producers, workers and trade met people's needs"],
    ["ca-g5-road-to-revolution", "adopt", "SS.5.1.24.1; SS.5.3.13.1", "the causes of the American Revolution, including British taxes in the colonies"],
    ["ca-g5-revolution", "adopt", "SS.5.2.21.1; SS.5.1.24.1", "the American Revolution and the perspectives of people in the colonies"],
    ["wa-g5-constitution", "adopt", "SS.5.5.6.1; SS.5.3.6.1; SS.5.1.9.1", "the Constitution, the three branches of the national government and the Bill of Rights"],
    ["or-g5-timeline", "adopt", "SS.5.1.23.1", "putting the events from the founding of the colonies to the Constitution in order"],
  ],
  "6/social": [
    ["wa-g6-world-maps", "adopt", "SS.6.1.18.1; SS.6.1.18.3", "absolute and relative location, and latitude and longitude"],
    ["wa-g6-world-regions", "adopt", "SS.6.1.18.2; SS.6.2.16.1", "the major regions of the Earth, using maps to show their physical features and peoples"],
    ["wa-g6-time-sources", "adopt", "SS.6-8.2.3; SS.6-8.2.2", "telling primary from secondary sources and judging where information comes from, and counting time in BCE and CE"],
  ],
  "7/social": [
    ["first-farmers", "share", "SS.7.1.2.1; SS.7.1.2.2", "the Agricultural Revolution, and hunter-gatherer and early farming societies"],
    ["where-civilizations-grew", "share", "SS.7.1.16.2; SS.7.2.19.2", "how geography, climate and resources shaped the first civilizations"],
    ["world-beliefs", "share", "SS.7.2.18.2; SS.7.3.7.1", "the world's major religions and how religion and politics connected in early societies"],
    ["trade-networks", "share", "SS.7.2.19.1; SS.7.4.23.2", "how trade spread people and ideas, and the results of cultural diffusion"],
    ["wa-g6-mesopotamia-egypt", "adopt", "SS.7.2.19.2; SS.7.2.8.2", "Mesopotamia and Egypt, and comparing early laws with laws today"],
    ["wa-g6-india-china", "adopt", "SS.7.2.18.2; SS.7.3.21.1", "ancient India and China and the beliefs that began there"],
    ["wa-g6-greece-rome", "adopt", "SS.7.3.10.1; SS.7.2.8.2", "citizens in Athens and Rome, and early forms of government"],
    ["medieval-europe", "adopt", "SS.7.3.21.1; SS.7.3.16.4", "medieval Europe, its social structure and the control of land"],
    ["islamic-world", "adopt", "SS.7.3.16.3; SS.7.4.23.2", "the Islamic world, its cities and trade, and the exchange of ideas"],
    ["or-g7-african-kingdoms", "adopt", "SS.7.3.16.3; SS.7.4.16.2", "the kingdoms of West Africa and the trade that connected them to other regions"],
    ["ca-g7-aztec-inca", "adopt", "SS.7.3.16.1; SS.7.3.21.1", "the Maya, Aztec and Inca and how their lands shaped them"],
  ],
  "8/social": [
    ["ca-g7-exploration-and-empire", "adopt", "SS.8.2.21.2; SS.8.2.17.1", "why Europeans explored, and the long-term effects of the Columbian Exchange"],
    ["or-g8-founding-ideas", "adopt", "SS.8.4.21.3; SS.8.4.6.1", "Enlightenment ideas and the writing of the Constitution and the Bill of Rights"],
    ["ca-g8-new-nation", "adopt", "SS.8.4.23.1; SS.8.4.3.1", "the challenges the new United States faced and the people who shaped its first years"],
    ["wa-g8-bill-of-rights", "adopt", "SS.8.4.6.1; SS.8.5.10.1", "the Bill of Rights and the rights and responsibilities of people in a democracy"],
    ["ca-g8-industry-reform", "adopt", "SS.8.7.23.1; SS.8.7.23.3", "the reform movements of the 1800s and their effects"],
    ["or-g8-reconstruction", "adopt", "SS.8.8.8.1; SS.8.8.22.2", "Reconstruction and the 13th, 14th and 15th Amendments"],
    ["ca-g8-civil-war", "adopt", "SS.8.7.4.1; SS.8.7.21.2; SS.8.7.22.1", "slavery and the sectional tensions behind the Civil War, and the war's key events"],
    ["mb-evidence-8", "adopt", "SS.8.3.2.1; SS.8.8.2.1", "analyzing primary and secondary sources and different interpretations of events"],
    ["maps-graphs-8", "adopt", "SS.8.1.16.3", "using maps, graphs and the five themes of geography"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "SS.9-12.6.1; SS.9-12.6.3", "the ideas behind the Constitution and the principles it is built on"],
    ["ca-g9-civic-action", "adopt", "SS.9-12.10.3; SS.9-12.7.8", "how engaged citizens make change, and how to register and vote"],
    ["ca-g9-media", "adopt", "SS.9-12.7.2; SS.9-12.7.3", "bias in the media and judging news sources"],
    ["ca-g9-forms-of-government", "adopt", "SS.9-12.6.1; SS.USH.7.6.1", "representative democracy compared with other forms of government around the world"],
    ["me-g9-us-government", "adopt", "SS.9-12.8.6; SS.9-12.6.3", "the three branches of government and how they make, carry out and interpret laws"],
    ["tx-g9-rights", "adopt", "SS.9-12.10.2; SS.9-12.6.7", "rights and responsibilities under the founding documents, and balancing liberty and the public good"],
  ],
};
