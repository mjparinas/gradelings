import type { Entry } from "../kit";

// Connecticut social studies: the units Connecticut uses from other frameworks, per grade ("<grade>/social"). The
// Connecticut Elementary and Secondary Social Studies Standards (2023) have an inquiry strand and four disciplines
// (civics, economics, geography, history), cited by code: "K.Civ.1.a", "3.His.3.a", "8.Eco.7.a". Each grade has a theme:
// Understanding My Communities (Kindergarten), Society and Ourselves (1), Contributing to Society (2), Connecticut and
// Local History (3), United States Geography (4), United States History I (5), World Regional Studies I and II (6 and
// 7) and United States History II (8). High school has three courses (Civics and Government, Modern World History,
// United States History III, coded "CG.", "MW.", "US."); Grade 9 here is Civics and Government, the half credit every
// Connecticut student needs to graduate. Only general units free of Canadian content and of other states' places are
// adopted, and never another state's units about its Tribes. Connecticut's own units (its symbols, Native nations,
// towns, history and government) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "K.His.2.a", "comparing life in the past with life today, starting with each child and family"],
    ["families", "share", "K.His.2.a; K.His.10.a", "families and their traditions, and using family stories to learn about the past"],
    ["needs-and-wants", "share", "K.Eco.4.a", "needs and wants, and where the goods and services people use come from"],
    ["places-near-me", "adopt", "K.Geo.1.a; K.Geo.2.a", "places near home and school shown on maps and in pictures"],
    ["pe-first-maps-k", "adopt", "K.Geo.1.a; K.Geo.1.b", "simple maps of familiar places, and land and water on a map"],
    ["mb-k-jobs-and-rules", "adopt", "K.Civ.1.a; K.Civ.3.a; K.Eco.3.a", "community leaders and workers, the skills jobs need, and why we have rules"],
    ["or-k-money-and-work", "adopt", "K.Eco.5.a; K.Eco.6.a", "how people earn money and pay for what they buy"],
    ["fair-and-kind", "adopt", "K.Civ.3.a; K.Civ.6.a", "classroom rules, and working together to make the community better"],
    ["ca-k-good-citizens", "adopt", "K.Civ.2.a; K.Civ.6.a", "how everyone, not only leaders, helps the community"],
    ["mb-k-yesterday-today-tomorrow", "adopt", "K.His.2.a; K.His.9.a", "past, present and future, and objects that show how people lived long ago"],
    ["ca-k-calendar", "adopt", "K.His.2.a", "days, weeks and months, and putting events in order"],
  ],
  "1/social": [
    ["maps", "share", "1.Geo.2.a; 1.Geo.3.b", "finding a community on maps and globes"],
    ["our-land", "share", "1.Geo.2.b; 1.Geo.4.a", "how land, water, weather and climate shape the way people live"],
    ["my-community", "share", "1.Geo.8.a; 1.Civ.14.a", "how communities meet their needs, and people working to improve them"],
    ["changes-in-my-life", "adopt", "1.His.9.a", "putting events from a child's own life in order, and the sources that show them"],
    ["respect-and-inclusion", "adopt", "1.Civ.8.a; 1.Geo.6.a", "fairness, respect and equal treatment, and the many cultures in a community"],
    ["community-services", "adopt", "1.Geo.9.a; 1.Civ.12.a", "the businesses and services in a community, and the rules that keep people safe"],
    ["pe-goods-and-services-1", "adopt", "1.Eco.4.a; 1.Geo.11.a", "goods and services made here and in other places"],
    ["ca-g1-long-ago", "adopt", "1.His.6.a; 1.His.9.a", "school, travel and daily life long ago, from different kinds of sources"],
  ],
  "2/social": [
    ["needs-and-wants", "share", "2.Eco.1.a", "how scarcity and abundance shape the choices people make"],
    ["then-and-now", "adopt", "2.Geo.2.a; 2.His.4.a", "how the local community and its needs have changed over time"],
    ["communities-compared", "adopt", "2.Geo.3.a; 2.Geo.4.a", "comparing communities, and how climate and land shape people's decisions"],
    ["ns-community-change-2", "adopt", "2.His.1.a; 2.Geo.2.a", "putting a community's events in order and seeing how it changed"],
    ["mb-working-together", "adopt", "2.Civ.6.a; 2.Civ.8.a", "working together, fairness and respect in a community"],
    ["ca-g2-citizens-and-leaders", "adopt", "2.Civ.1.a; 2.Civ.5.a; 2.His.14.a", "local leaders, what local government does, and national holidays"],
    ["ca-g2-work-and-money", "adopt", "2.Eco.7.a; 2.Eco.12.a", "the costs of making goods, and the goods and services governments provide"],
  ],
  "3/social": [
    ["meeting-needs", "share", "3.Eco.3.a; 3.Geo.6.a", "the resources people use to make goods and services, and where they live and work"],
    ["tx-g3-money-and-voting", "adopt", "3.Eco.12.a; 3.Civ.2.a", "how taxes pay for services, and why democracy needs people to take part"],
    ["mb-working-together", "adopt", "3.Civ.6.a; 3.Civ.6.b", "the benefits and challenges of working together to solve problems"],
  ],
  "4/social": [
    ["or-g6-world-maps", "adopt", "4.Geo.1.a", "maps, globes, latitude and longitude, and the continents and oceans"],
    ["wa-g6-time-sources", "adopt", "4.His.9.a; 4.Inq.3.b", "primary and secondary sources, fact and opinion, and counting time"],
    ["or-g5-history-detective", "adopt", "4.His.9.a; 4.Inq.3.a", "using different kinds of sources and gathering information from more than one"],
    ["climate-and-ways-of-life", "adopt", "4.Geo.10.a; 4.Geo.12.b", "how climate differs from place to place and how people adapt to it"],
    ["fl-g4-earning-income", "adopt", "4.Eco.6.a; 4.Eco.7.a", "jobs, skills and income, and how businesses decide what to sell"],
    ["wa-g8-bill-of-rights", "adopt", "4.Civ.12.a; 4.Civ.14.a", "rights and amendments, and how people have worked to change laws"],
  ],
  "5/social": [
    ["ca-g7-exploration-and-empire", "adopt", "5.His.14.b; 5.Geo.8.a", "European exploration of the Americas and its causes and effects"],
    ["wa-g5-thirteen-colonies", "adopt", "5.Geo.2.a; 5.Eco.4.a", "the New England, Middle and Southern colonies and how their environments shaped them"],
    ["ca-g5-colonial-economy", "adopt", "5.Eco.3.a; 5.Eco.14.a", "the resources, work and trade of the colonies"],
    ["ca-g5-road-to-revolution", "adopt", "5.His.1.a; 5.Civ.8.a", "the events that led to the American Revolution and the rejection of British rule"],
    ["ca-g5-revolution", "adopt", "5.His.14.e; 5.His.10.a", "turning points of the American Revolution and the sources about them"],
    ["wa-g5-constitution", "adopt", "5.Civ.3.a; 5.Civ.5.a", "the Constitution, the branches of government and the Bill of Rights"],
    ["or-g5-timeline", "adopt", "5.His.1.a", "putting the events from the colonies to the Constitution in order"],
  ],
  "6/social": [
    ["or-g6-world-maps", "adopt", "6.Geo.1.a; 6.His.11.a", "maps of the world's regions and what a map's maker chose to show"],
    ["ga-g6-latin-america", "adopt", "6.Geo.2.b; 6.Geo.5.b", "the countries, land and people of Latin America"],
    ["ga-g6-europe", "adopt", "6.Geo.5.a; 6.Geo.5.c", "the countries, land and people of Europe, and how land shapes borders"],
    ["ca-g7-aztec-inca", "adopt", "6.Geo.6.a; 6.His.2.a", "the Maya, Aztec and Inca, and how their lands shaped their cultures"],
    ["world-beliefs", "adopt", "6.Geo.4.a; 6.Geo.6.b", "the world's major religions and how culture shapes daily life in a region"],
    ["tx-g6-economies", "adopt", "6.Eco.3.a; 6.Eco.4.a", "economic systems, supply and demand, and competition"],
    ["trade-networks", "adopt", "6.Eco.15.a; 6.His.3.a", "trade between regions and how it spreads goods and ideas"],
    ["quality-of-life-8", "adopt", "6.Eco.1.a; 6.Eco.8.a", "how economic decisions affect people's well-being in different regions"],
  ],
  "7/social": [
    ["ny-g6-eastern-hemisphere", "adopt", "7.Geo.10.b", "the regions, landforms, waters and climates of the Eastern Hemisphere"],
    ["ga-g7-africa", "adopt", "7.Geo.10.a; 7.Geo.8.a", "the countries, people and environments of Africa"],
    ["ga-g7-southwest-asia", "adopt", "7.Geo.3.a; 7.Geo.9.a", "the countries, people and resources of Southwest Asia"],
    ["ga-g7-southern-eastern-asia", "adopt", "7.Geo.7.a; 7.Geo.10.a", "the countries, people and environments of southern and eastern Asia"],
    ["ga-g7-population", "adopt", "7.Geo.12.a; 7.Geo.8.a", "population patterns, cities and migration"],
    ["ga-g7-economies", "adopt", "7.Eco.4.a; 7.Eco.4.b; 7.Eco.14.a", "command, market and mixed economies, competition and trade barriers"],
    ["az-g8-supply-demand", "adopt", "7.Eco.6.a", "how supply and demand change prices and quantities"],
    ["tx-g6-governments", "adopt", "7.Civ.2.a", "forms of government and how people take part in each"],
  ],
  "8/social": [
    ["or-g8-founding-ideas", "adopt", "8.His.4.a; 8.His.16.a", "the ideas behind the Declaration of Independence and the Constitution"],
    ["wa-g8-bill-of-rights", "adopt", "8.Civ.8.a; 8.Civ.8.b", "the Bill of Rights and how it shapes American society"],
    ["ca-g8-industry-reform", "adopt", "8.Eco.1.a; 8.Eco.3.a; 8.Civ.14.b", "factories, workers and the reform movements of the 1800s"],
    ["or-g8-reconstruction", "adopt", "8.His.14.b; 8.Civ.13.a", "Reconstruction and the amendments that ended slavery and promised equal rights"],
    ["maps-graphs-8", "adopt", "8.Geo.11.a", "using maps, graphs and data to show expansion and change"],
    ["mb-evidence-8", "adopt", "8.Inq.3.a; 8.Inq.3.c", "judging sources, and the strengths and limits of the evidence they give"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "CG.His.5.a; CG.Civ.4.a", "social contract ideas and the founding of a federal democratic republic"],
    ["ca-g9-civic-action", "adopt", "CG.Civ.2.c; CG.Civ.5.b; CG.Civ.14.a", "how citizens take part, from voting to civic action and defending rights"],
    ["ca-g9-media", "adopt", "CG.Civ.5.c; CG.His.5.b", "the media, political parties and how they shape public opinion and elections"],
    ["az-g8-citizens-and-society", "adopt", "CG.Civ.2.c; CG.Civ.5.b", "how individuals and groups take part in civic life and address problems"],
    ["ga-g9-criminal-justice", "adopt", "CG.Civ.3.b; CG.Civ.2.e; CG.Civ.5.a", "the courts, the rights of the accused and jury service"],
    ["ca-g9-dictatorship-democracy", "adopt", "CG.His.5.a; CG.Civ.6.a", "how democracies differ from dictatorships, and the ideas behind government by consent"],
  ],
};
