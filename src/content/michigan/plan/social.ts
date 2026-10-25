import type { Entry } from "../kit";

// Michigan social studies: the units Michigan uses from other frameworks, per grade ("<grade>/social"). The Michigan
// K-12 Standards for Social Studies (2019) are cited by code: "K – C2.0.1" is written "K-C2.0.1", Grade 8's United
// States history era codes are "8-U5.2.1", and high school civics and economics are "C3.2.3" and "E4.1.3". Each grade
// has a theme: Myself and Others (K), Families and Schools (1), the Local Community (2), Michigan Studies (3), United
// States Studies with Michigan history from statehood (4), Integrated United States History to 1791 (5), Global
// Geography (6), World History and Geography to 1500 (7) and Integrated United States History from 1787 to 1877 (8).
// Grade 9 is civics and economics, the high school courses Michigan requires for graduation.
//
// Only general units free of Canadian content and of other states' places are adopted, and never another state's units
// about its Tribes. Michigan's own units (its symbols, local government, Michigan studies, industries, migration, the
// Eastern Woodland, Michigan in the Civil War era and governing Michigan) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "K-H2.0.1; K-H2.0.2", "past, present and future, and a timeline of a child's own life"],
    ["families", "share", "K-H2.0.3; K-H2.0.1", "families, their traditions, and how people learn about the past"],
    ["needs-and-wants", "share", "K-E1.0.1; K-G5.0.1", "economic wants, and how the environment meets basic needs"],
    ["places-near-me", "adopt", "K-G1.0.1; K-G1.0.2; K-G2.0.1", "maps and globes, positional words, and places near home and school"],
    ["fair-and-kind", "adopt", "K-C2.0.3; K-C2.0.2", "fair ways to make group decisions, and why people can't do whatever they want"],
    ["mb-k-jobs-and-rules", "adopt", "K-C1.0.1; K-E1.0.2", "rules at home and school, and the goods and services community workers provide"],
    ["or-k-money-and-work", "adopt", "K-E1.0.3; K-E1.0.2", "trading money for goods and services"],
    ["ca-k-calendar", "adopt", "K-H2.0.1; K-H2.0.2", "days, weeks and months, and putting events in order"],
    ["ca-k-good-citizens", "adopt", "K-C5.0.1; K-C2.0.3", "self-discipline and responsibility, and taking part in classroom decisions"],
  ],
  "1/social": [
    ["maps", "share", "1-G1.0.1; 1-G1.0.2", "making simple maps and describing where places are"],
    ["our-land", "share", "1-G1.0.3; 1-G5.0.1; 1-G5.0.2", "land and water on maps and globes, and how people adapt to their environment"],
    ["my-community", "share", "1-G2.0.1; 1-E1.0.1", "the physical and human characteristics of places, and producers and consumers"],
    ["changes-in-my-life", "adopt", "1-H2.0.1; 1-H2.0.2", "past, present and future, and a family's history"],
    ["respect-and-inclusion", "adopt", "1-G4.0.1; 1-C2.0.1", "diversity in family life, and fair ways to make decisions and resolve conflicts"],
    ["community-services", "adopt", "1-E1.0.5; 1-C5.0.1", "how people earn money, and responsibilities at home and at school"],
    ["wa-g1-earn-save-share", "adopt", "1-E1.0.3; 1-E1.0.6; 1-E1.0.2", "scarcity, how money simplifies trade, and how families spend and save"],
    ["ca-g1-long-ago", "adopt", "1-H2.0.4; 1-H2.0.3", "comparing life today with life in the past, using historical sources"],
  ],
  "2/social": [
    ["needs-and-wants", "share", "2-E1.0.1; 2-E1.0.5", "opportunity cost, and the benefits and costs of a personal decision"],
    ["then-and-now", "adopt", "2-H2.0.4; 2-H2.0.1", "how the local community changed over time, in years and decades"],
    ["ns-community-change-2", "adopt", "2-H2.0.6; 2-H2.0.5", "a community's history and how its people responded to problems"],
    ["communities-compared", "adopt", "2-G2.0.1; 2-G4.0.1", "comparing the local community with others, and how land is used"],
    ["mb-working-together", "adopt", "2-C5.0.1; 2-C5.0.2", "how people take part in community decisions, and personal and civic responsibilities"],
    ["ca-g2-citizens-and-leaders", "adopt", "2-C1.0.1; 2-C2.0.2; 2-H2.0.3", "why people form governments, the Pledge of Allegiance, and people who made changes"],
    ["ca-g2-work-and-money", "adopt", "2-E1.0.2; 2-E1.0.3; 2-E1.0.4", "how businesses meet wants, resources for production, and specialization"],
  ],
  "3/social": [
    ["meeting-needs", "share", "3-G4.0.1; 3-E1.0.2", "how people use resources and location to meet their needs, and what places produce"],
    ["or-g2-world-maps", "adopt", "3-G1.0.3", "using maps and globes to find continents, oceans and countries"],
    ["or-g5-history-detective", "adopt", "3-H3.0.1; 3-H3.0.2", "asking historical questions and using primary and secondary sources"],
  ],
  "4/social": [
    ["wa-g5-constitution", "adopt", "4-C1.0.2; 4-C3.0.3; 4-C3.0.4; 4-C3.0.5", "the Preamble, the three branches of the federal government, and checks and balances"],
    ["or-g5-history-detective", "adopt", "4-H3.0.2", "using primary and secondary sources to learn about the past"],
    ["or-g5-earn-and-save", "adopt", "4-E1.0.3; 4-E1.0.7", "incentives, money, saving and banks"],
  ],
  "5/social": [
    ["ny-g5-columbian-exchange", "adopt", "5-U1.4.4; 5-U1.4.1; 5-U2.2.1", "the Columbian Exchange, the meeting of three worlds, and the Triangular Trade"],
    ["wa-g5-thirteen-colonies", "adopt", "5-U2.3.1; 5-U2.1.4; 5-U2.3.2", "the New England, Middle and Southern colonies and daily life in each"],
    ["ca-g5-colonial-economy", "adopt", "5-U2.3.4; 5-U2.1.5", "the colonial labor force and why people migrated to colonial North America"],
    ["ca-g5-road-to-revolution", "adopt", "5-U3.1.1; 5-U3.1.2", "the French and Indian War, the Stamp Act and the events that led to revolution"],
    ["ca-g5-revolution", "adopt", "5-U3.1.5; 5-U3.2.2; 5-U3.2.4", "the Declaration of Independence, key battles and the Treaty of Paris"],
    ["wa-g5-constitution", "adopt", "5-U3.3.3; 5-U3.3.6; 5-U3.3.8", "why the Constitution was written, federalism, and the Bill of Rights"],
    ["or-g5-timeline", "adopt", "5-U3.1.2; 5-U3.3.2", "putting the events from the colonies to the Constitution in order"],
  ],
  "6/social": [
    ["ny-g5-countries-capitals", "adopt", "6-G1.1.2; 6-C3.6.1", "mapping world regions and their countries, and modern nation-states"],
    ["ny-g5-cultures", "adopt", "6-G4.1.1; 6-G4.1.3; 6-G4.1.4", "culture and cultural diffusion, and the languages and religions of a region"],
    ["ny-g5-governments", "adopt", "6-C3.6.2; 6-C1.1.1", "comparing forms of government around the world"],
    ["ny-g5-economics", "adopt", "6-E3.1.1; 6-E1.1.1", "how traditional, command and market economies answer the basic economic questions"],
    ["maps-graphs-8", "adopt", "6-G1.1.1; 6-G1.2.3", "using geographic tools, maps and graphs"],
  ],
  "7/social": [
    ["first-farmers", "share", "7-W1.1.1; 7-W1.2.1; 7-W1.2.3", "how people populated the world, and the first Agricultural Revolution"],
    ["where-civilizations-grew", "share", "7-W2.1.3; 7-W1.2.2", "the river valleys where the first civilizations grew"],
    ["world-beliefs", "share", "7-W3.2.1; 7-W3.2.2", "the core beliefs of major world religions and where they spread"],
    ["trade-networks", "share", "7-W3.1.6; 7-W3.1.7; 7-W2.1.5", "trade networks linking classical empires, and cultural diffusion"],
    ["wa-g6-time-sources", "adopt", "7-H1.1.1; 7-H1.2.1", "calendar systems, and how historians use sources"],
    ["wa-g6-mesopotamia-egypt", "adopt", "7-W2.1.4; 7-W2.1.1", "the common features of early civilizations, and the development of writing"],
    ["wa-g6-greece-rome", "adopt", "7-W3.1.4; 7-W3.1.3", "Greek ideas about democracy and citizenship, and city-states, civilizations and empires"],
    ["ny-g6-classical-china-india", "adopt", "7-W3.1.5; 7-W3.1.1", "the achievements of classical India and China"],
    ["or-g7-african-kingdoms", "adopt", "7-W4.1.2", "how trade integrated cultures in Africa to 1500"],
  ],
  "8/social": [
    ["or-g8-founding-ideas", "adopt", "8-U3.3.1; 8-U3.3.3; 8-U3.3.5; 8-U3.3.7", "the Articles of Confederation, the Constitutional Convention, ratification and the ideas behind the Constitution"],
    ["wa-g8-bill-of-rights", "adopt", "8-U3.3.6; 8-U5.3.4", "the Bill of Rights and the amendments that followed the Civil War"],
    ["maps-graphs-8", "adopt", "8-U6.1.1", "maps, graphs and data that compare the United States at different times"],
    ["mb-evidence-8", "adopt", "8-U6.2.1; 8-P3.1.1", "using credible sources and historical perspectives to analyze an issue"],
    ["ca-g8-industry-reform", "adopt", "8-U4.2.1; 8-U4.3.3; 8-U4.3.4", "the Northeast's economy, and the women's rights and temperance movements"],
    ["ca-g8-civil-war", "adopt", "8-U5.1.4; 8-U5.2.1; 8-U5.2.2; 8-U5.2.3", "rising sectional tensions, secession, Lincoln and why the North won"],
    ["or-g8-reconstruction", "adopt", "8-U5.3.1; 8-U5.3.2; 8-U5.3.3; 8-U5.3.5", "the plans for Reconstruction, the Freedmen's Bureau, new Black officeholders and the end of Reconstruction"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "C2.1.1; C2.1.2; C2.1.3", "the origins of American constitutional democracy, Democratic Values, and the debates over ratification"],
    ["ca-g9-civic-action", "adopt", "C6.3.1; C6.3.2; C6.4.2", "civic dispositions, informed participation, and ways people work for change"],
    ["ca-g9-media", "adopt", "C3.3.2; C3.3.6; C3.3.7", "political parties, the news media, and judging the credibility of political communication"],
  ],
};
