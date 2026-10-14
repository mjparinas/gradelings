import type { Entry } from "../kit";

// Minnesota social studies: the units Minnesota uses from other frameworks, per grade ("<grade>/social"). Codes are the
// benchmarks of the 2021 Minnesota K-12 Academic Standards in Social Studies ("6.4.19.3": grade, strand, standard,
// benchmark). The five strands are Citizenship and Government (1), Economics (2), Geography (3), History (4) and
// Ethnic Studies (5). Each grade has a theme: Family and Community (K), Communities and Culture (1), People and the
// Environment (2), the Ancient World (3), the Contemporary World (4), Early American Studies (5), Minnesota Studies (6,
// all Minnesota's own units), United States Studies (7) and Global Studies (8). Grade 9 is civics, from the high school
// Citizenship and Government and Economics strands. Minnesota's own units (`mn-` ids) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "K.5.23.1; K.1.3.1", "describing myself and my family, and my roles in the groups I belong to"],
    ["i-am-me", "adopt", "K.5.23.1", "describing myself and what makes me who I am"],
    ["families", "share", "K.4.19.1; K.1.2.1", "how families celebrate, and how members show they belong to a group"],
    ["fair-and-kind", "adopt", "K.5.24.1; K.4.22.1", "what is fair and unfair, and stories of honesty, courage and friendship"],
    ["mb-k-jobs-and-rules", "adopt", "K.1.4.1; K.1.1.1", "rules at school and in the neighborhood, why they exist, and working toward a class goal"],
    ["pe-first-maps-k", "adopt", "K.3.13.1", "showing routes between places on simple maps"],
    ["places-near-me", "adopt", "K.3.14.1; K.3.17.1", "physical and human features in the community, and a favorite place"],
    ["mb-k-yesterday-today-tomorrow", "adopt", "K.4.21.1; K.4.18.1", "words for the past, present and future, and asking questions about the past"],
    ["needs-and-wants", "share", "K.2.9.1", "telling needs from wants"],
    ["or-k-money-and-work", "adopt", "K.2.10.1; K.2.12.1", "goods and services, and why people trade"],
  ],
  "1/social": [
    ["changes-in-my-life", "adopt", "1.4.21.1; 1.4.18.1", "a timeline of my life, and what has changed or stayed the same"],
    ["ca-g1-long-ago", "adopt", "1.4.20.1", "how people lived long ago, from historical sources"],
    ["my-community", "share", "1.1.1.1; 1.3.15.1", "taking part in community life, and how people and goods move between communities"],
    ["respect-and-inclusion", "adopt", "1.5.24.1; 1.1.3.1", "how people care for each other, and respecting the rights of every learner"],
    ["my-roles", "adopt", "1.1.3.1; 1.1.4.1", "rights and responsibilities in the classroom, and what makes a good rule"],
    ["maps", "share", "1.3.13.1", "sketch maps, positional words and addresses"],
    ["our-land", "share", "1.3.14.1", "the features that make a place a region"],
    ["pe-needs-and-wants-1", "adopt", "1.2.8.1", "scarcity: not enough of something for everyone's wants"],
    ["pe-goods-and-services-1", "adopt", "1.2.11.1; 1.2.12.1", "how a community shares goods and services, and goods that come from other countries"],
    ["wa-g1-earn-save-share", "adopt", "1.2.7.1", "weighing the costs and benefits of two choices"],
  ],
  "2/social": [
    ["communities-compared", "adopt", "2.5.25.1; 2.4.19.1", "communities made of many cultures, and how a community's culture reflects its history"],
    ["climate-and-ways-of-life", "adopt", "2.3.16.1; 2.4.21.1", "how the environment shapes how people live, and how people change the environment"],
    ["talking-together-ab", "adopt", "2.1.1.1", "taking part in a fair vote"],
    ["mb-working-together", "adopt", "2.1.3.1", "rules, rights and responsibilities at school and at home"],
    ["ca-g2-citizens-and-leaders", "adopt", "2.1.4.1; 2.1.2.1", "levels of government, and how elections show democratic principles"],
    ["then-and-now", "adopt", "2.4.20.1", "how the relationship between people and the environment has changed"],
    ["ns-community-change-2", "adopt", "2.4.19.1", "how a community's culture today reflects its past"],
    ["pe-work-and-prices-2", "adopt", "2.2.8.1", "opportunity cost: the next best choice you give up"],
    ["ca-g2-work-and-money", "adopt", "2.2.7.1; 2.2.9.1", "what makes something work as money, and choosing the best way to reach a goal"],
  ],
  "3/social": [
    ["meeting-needs", "share", "3.3.15.1", "where people live in relation to natural resources in different parts of the world"],
    ["mb-global-communities", "adopt", "3.3.14.1", "physical and human regions, past and present"],
    ["first-farmers", "adopt", "3.4.21.1; 3.4.18.2", "how farming changed life long ago, and comparing ancient life with today"],
    ["where-civilizations-grew", "adopt", "3.4.21.2; 3.3.13.1", "how rivers and land shaped where ancient peoples moved and settled"],
    ["wa-g6-mesopotamia-egypt", "adopt", "3.4.19.1; 3.4.22.1", "daily life in ancient Mesopotamia and Egypt, and what they gave the world"],
    ["wa-g6-india-china", "adopt", "3.4.19.1; 3.4.21.1", "daily life in ancient India and China, and inventions that changed life"],
    ["ca-g6-greece-rome", "adopt", "3.4.22.1; 3.4.19.1", "how ancient Greece and Rome shaped the world we live in"],
    ["wa-g6-time-sources", "adopt", "3.4.20.1; 3.4.18.1", "historical sources that survive from the ancient world, and ways of marking time"],
    ["mb-working-together", "adopt", "3.1.3.1", "majority rule with minority rights, and respectful talk"],
  ],
  "4/social": [
    ["or-g5-states-capitals", "adopt", "4.3.14.1", "the states, their capitals and major cities"],
  ],
  "5/social": [
    ["ca-g5-thirteen-colonies", "adopt", "5.4.21.1; 5.3.14.1", "the thirteen colonies and their regions"],
    ["ca-g5-colonial-economy", "adopt", "5.4.21.2; 5.2.10.1", "work and trade in the colonies, and indentured servitude and slavery"],
    ["ca-g5-road-to-revolution", "adopt", "5.4.19.2; 5.4.20.2", "the events that led to the American Revolution, from several perspectives"],
    ["ca-g5-revolution", "adopt", "5.4.18.2; 5.4.19.2", "the American Revolution and what it meant for different groups"],
    ["ca-g5-constitution", "adopt", "5.1.4.1; 5.1.2.1", "the Constitution's three branches, and the ideas of the Declaration of Independence"],
    ["or-g5-timeline", "adopt", "5.4.18.2", "putting the events from the colonies to the Constitution in order"],
  ],
  "6/social": [
    ["mb-evidence-8", "adopt", "6.3.13.2; 6.4.20.1", "using sources and evidence to support a claim"],
  ],
  "7/social": [
    ["or-g8-reconstruction", "adopt", "7.4.18.1; 7.4.18.2", "Reconstruction, and how racism and segregation followed it"],
    ["ca-g8-industrial-america", "adopt", "7.4.22.1; 7.3.15.1", "the Industrial Revolution and the movement of people and goods"],
    ["ca-g8-industry-reform", "adopt", "7.4.20.1; 7.5.24.1", "reformers and the campaign for women's right to vote"],
    ["wa-g8-bill-of-rights", "adopt", "7.1.3.1", "the Bill of Rights and the protections it gives"],
  ],
  "8/social": [
    ["pe-human-rights-6", "adopt", "8.1.3.1", "the Universal Declaration of Human Rights and how rights are protected"],
    ["world-beliefs", "adopt", "8.4.19.2", "the variety of religious and spiritual beliefs in the world"],
    ["maps-graphs-8", "adopt", "8.3.13.1", "using maps, graphs and data to answer geographic questions"],
  ],
  "9/social": [
    ["ca-g9-civic-action", "adopt", "9.1.1.4; 9.1.5.3", "ways of taking part and influencing public policy"],
    ["ca-g9-media", "adopt", "9.1.1.3; 9.1.5.2", "judging sources and persuasion, and the media's role in politics"],
  ],
};
