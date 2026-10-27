import type { Entry } from "../kit";

// Montana social studies: the units Montana uses from other frameworks, per grade ("<grade>/social"). The Montana
// Social Studies Content Standards (2021) have four disciplines (civics and government, economics, geography, history)
// plus inquiry skills, cited by code: "SS.CG.4.4", "SS.E.2.1", "SS.G.6-8.2", "SS.H.9-12.10". Kindergarten's
// geography and history standards are single statements ("SS.G.K", "SS.H.K"); Grades 6 to 8 share one band
// ("6-8") and high school another ("9-12"), and Grade 9 here is the civics and government course. Every grade asks
// students to learn about the Tribal Nations of Montana (Indian Education for All). Only general units free of
// Canadian content and of other states' places are adopted, and never another state's units about its Tribes.
// Montana's own units (its Tribal Nations, government, land and history) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "SS.H.K", "past, present and future, starting with each child and family"],
    ["families", "share", "SS.H.K", "families and their traditions, and telling the past from the present"],
    ["needs-and-wants", "share", "SS.E.K.1", "needs and wants, and the goods and services people use"],
    ["places-near-me", "adopt", "SS.G.K", "places near home and school shown on maps and in pictures"],
    ["pe-first-maps-k", "adopt", "SS.G.K", "simple maps of familiar places, and land and water on a map"],
    ["mb-k-jobs-and-rules", "adopt", "SS.CG.K.1; SS.CG.K.2", "the people who make and carry out rules, and why we have rules"],
    ["or-k-money-and-work", "adopt", "SS.E.K.1", "how people earn money and pay for goods and services"],
    ["fair-and-kind", "adopt", "SS.CG.K.2; SS.CG.K.3", "classroom rules, and being a good citizen of the classroom"],
    ["ca-k-good-citizens", "adopt", "SS.CG.K.3", "showing citizenship in the classroom and school community"],
    ["mb-k-yesterday-today-tomorrow", "adopt", "SS.H.K", "past, present and future, and objects that show how people lived long ago"],
    ["ca-k-calendar", "adopt", "SS.H.K", "days, weeks and months, and putting events in order"],
  ],
  "1/social": [
    ["maps", "share", "SS.G.1.2", "maps and globes of familiar places"],
    ["our-land", "share", "SS.G.1.1", "the land, water and landmarks near home"],
    ["my-community", "share", "SS.E.1.1; SS.CG.1.2", "how communities meet their needs and wants, and the people who help run them"],
    ["changes-in-my-life", "adopt", "SS.H.1.1", "putting events from a child's own life in order: past, present and future"],
    ["respect-and-inclusion", "adopt", "SS.CG.1.1", "fairness, respect and being a good citizen of the classroom"],
    ["community-services", "adopt", "SS.CG.1.2", "the people and services in a community, and the rules that keep people safe"],
    ["pe-goods-and-services-1", "adopt", "SS.E.1.2", "goods and services made here and in other places"],
    ["ca-g1-long-ago", "adopt", "SS.H.1.1", "school, travel and daily life long ago and today"],
  ],
  "2/social": [
    ["needs-and-wants", "share", "SS.E.2.3", "the resources people use to get what they want and need"],
    ["then-and-now", "adopt", "SS.H.2.1", "how people lived differently in the past than they do today"],
    ["communities-compared", "adopt", "SS.G.2.2", "comparing communities, and how land and people shape each other"],
    ["ns-community-change-2", "adopt", "SS.H.2.1", "putting a community's events in order and seeing how life changed"],
    ["mb-working-together", "adopt", "SS.CG.2.2", "working together, fairness and respect in a community"],
    ["ca-g2-citizens-and-leaders", "adopt", "SS.CG.2.1; SS.CG.2.2", "the people who help govern communities, and good citizenship"],
    ["ca-g2-work-and-money", "adopt", "SS.E.2.1; SS.E.2.2", "the goods and services people make, and those governments provide"],
  ],
  "3/social": [
    ["meeting-needs", "share", "SS.E.3.2", "the human and natural resources used to make goods and services"],
    ["tx-g3-money-and-voting", "adopt", "SS.CG.3.2; SS.E.3.1", "taxes and voting, and the costs and benefits of choices"],
  ],
  "4/social": [
    ["wa-g6-time-sources", "adopt", "SS.H.4.4", "primary and secondary sources, fact and opinion, and whose point of view a source gives"],
    ["or-g5-history-detective", "adopt", "SS.H.4.4", "using different kinds of sources and seeing how a writer's view shapes an account"],
    ["climate-and-ways-of-life", "adopt", "SS.G.4.4", "how climate differs from place to place and how people adapt to it"],
    ["fl-g4-earning-income", "adopt", "SS.E.4.1; SS.E.4.3", "jobs, skills and income, and the pressures and incentives behind choices"],
  ],
  "5/social": [
    ["wa-g5-us-geography", "adopt", "SS.G.5.1", "the regions, states, rivers and mountains of the United States on maps"],
    ["ca-g7-exploration-and-empire", "adopt", "SS.H.5.2; SS.H.5.3", "European exploration of the Americas, its causes and effects"],
    ["wa-g5-thirteen-colonies", "adopt", "SS.G.5.2; SS.H.5.3", "the New England, Middle and Southern colonies and where people settled"],
    ["ca-g5-colonial-economy", "adopt", "SS.E.5.3; SS.E.5.5", "the resources, work, farming and trade of the colonies"],
    ["ca-g5-road-to-revolution", "adopt", "SS.H.5.2; SS.E.5.2", "the chain of events that led to the American Revolution"],
    ["ca-g5-revolution", "adopt", "SS.H.5.3", "the people and groups who shaped the American Revolution"],
    ["wa-g5-constitution", "adopt", "SS.CG.5.1; SS.CG.5.5", "the Constitution, the three branches of government and the Bill of Rights"],
    ["or-g5-timeline", "adopt", "SS.H.5.1; SS.H.5.2", "reading a timeline from the colonies to the Constitution"],
  ],
  "6/social": [
    ["or-g6-world-maps", "adopt", "SS.G.6-8.1", "maps of the world's regions using scale, direction, legends and projections"],
    ["ga-g6-latin-america", "adopt", "SS.G.6-8.2", "the countries, land and people of Latin America"],
    ["ga-g6-europe", "adopt", "SS.G.6-8.2; SS.G.6-8.7", "the countries, land and people of Europe, and its cultural roots"],
    ["ca-g7-aztec-inca", "adopt", "SS.H.6-8.1; SS.H.6-8.2", "the Maya, Aztec and Inca, complex civilizations of the Americas"],
    ["world-beliefs", "adopt", "SS.G.6-8.7", "the world's major religions and the cultural roots of world regions"],
    ["tx-g6-economies", "adopt", "SS.E.6-8.3; SS.E.6-8.4", "producers and consumers in markets, and competition"],
    ["trade-networks", "adopt", "SS.G.6-8.6; SS.E.6-8.5", "how goods, money and ideas move between regions"],
    ["quality-of-life-8", "adopt", "SS.E.6-8.1", "how economic decisions affect people and societies"],
  ],
  "7/social": [
    ["ny-g6-eastern-hemisphere", "adopt", "SS.G.6-8.2", "the regions, landforms, waters and climates of the Eastern Hemisphere"],
    ["ga-g7-africa", "adopt", "SS.G.6-8.2; SS.G.6-8.5", "the countries, people and environments of Africa"],
    ["ga-g7-southwest-asia", "adopt", "SS.G.6-8.2; SS.G.6-8.4", "the countries, people and resources of Southwest Asia"],
    ["ga-g7-southern-eastern-asia", "adopt", "SS.G.6-8.2; SS.G.6-8.4", "the countries, people and environments of southern and eastern Asia"],
    ["ga-g7-population", "adopt", "SS.G.6-8.5; SS.G.6-8.6", "population patterns, cities and migration"],
    ["ga-g7-economies", "adopt", "SS.E.6-8.3; SS.E.6-8.4", "command, market and mixed economies, and competition"],
    ["az-g8-supply-demand", "adopt", "SS.E.6-8.6", "how supply and demand change prices and quantities"],
    ["tx-g6-governments", "adopt", "SS.CG.6-8.1", "forms of government, past and present"],
  ],
  "8/social": [
    ["or-g8-founding-ideas", "adopt", "SS.CG.6-8.2; SS.CG.6-8.6", "the ideas behind the founding documents, and the United States as a democratic republic"],
    ["wa-g8-bill-of-rights", "adopt", "SS.CG.6-8.5", "the Bill of Rights and how it protects equality and civil rights"],
    ["ca-g8-industry-reform", "adopt", "SS.E.6-8.2; SS.H.6-8.2", "factories, workers and reform movements, and the choices behind them"],
    ["or-g8-reconstruction", "adopt", "SS.CG.6-8.5; SS.H.6-8.2", "Reconstruction and the amendments that promised equal rights"],
    ["maps-graphs-8", "adopt", "SS.G.6-8.3", "maps and charts from a time period, used to understand events"],
    ["mb-evidence-8", "adopt", "SS.H.6-8.8", "judging sources for their limits and biases"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "SS.CG.9-12.1", "the ideas in the founding documents and the system of government they set up"],
    ["ca-g9-civic-action", "adopt", "SS.CG.9-12.5; SS.CG.9-12.10", "how citizens address problems, change society and protect rights"],
    ["ca-g9-media", "adopt", "SS.CG.9-12.11", "how media, parties and interest groups shape civic life"],
    ["az-g8-citizens-and-society", "adopt", "SS.CG.9-12.4; SS.CG.9-12.5", "civic virtues, working with others and addressing problems"],
    ["ga-g9-criminal-justice", "adopt", "SS.CG.9-12.12", "the courts, the rights of the accused and protecting civil rights"],
    ["ca-g9-dictatorship-democracy", "adopt", "SS.CG.9-12.6", "the American system of government compared with others"],
  ],
};
