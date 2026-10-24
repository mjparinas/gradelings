import type { Entry } from "../kit";

// Wisconsin social studies: the units Wisconsin uses from other frameworks, per grade ("<grade>/social"). Wisconsin's
// Standards for Social Studies (2018) have five strands (behavioral sciences, economics, geography, history, political
// science) plus inquiry, each with standards ("SS.Hist1") and performance indicators by grade band ("SS.Hist2.b.i": e
// for Kindergarten to Grade 2, i for 3 to 5, m for 6 to 8, h for high school; some name a grade, "SS.Geog2.d.4-5").
// Borrowed units cite the standard they practise, valid in every grade; Wisconsin's own units cite indicators.
// Personal financial literacy (2020) is cited by code ("PFL.e.MM.1.b.1").
//
// Wisconsin leaves the order of topics to each district, so this app follows the usual pattern: communities in
// Kindergarten to Grade 3 (with Wisconsin's symbols in 1 and its land, communities and local government in 3), Wisconsin
// studies in Grade 4, early United States history in 5, world geography and ancient civilizations in 6, world history in
// 7, United States history to Reconstruction with Wisconsin and the two constitutions in 8, and civics in 9. Only
// general units free of Canadian content and of other states' places are adopted, and never another state's units about
// its Tribes. Wisconsin's own units are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "SS.Hist2", "comparing life in the past with life today, starting with each child and family"],
    ["families", "share", "SS.Hist2; SS.Hist3", "families and their traditions, holidays, and life long ago and today"],
    ["needs-and-wants", "share", "SS.Econ1", "how people make choices because they can't have everything they want"],
    ["places-near-me", "adopt", "SS.Geog1; SS.Geog5", "places near home and school, maps and pictures, and how weather and the land affect people"],
    ["fair-and-kind", "adopt", "SS.PS2", "classroom rules, rights and responsibilities, and settling conflicts peacefully"],
    ["mb-k-jobs-and-rules", "adopt", "SS.PS3; SS.PS2", "community workers and leaders, and why school has rules"],
    ["or-k-money-and-work", "adopt", "SS.Econ1; SS.Geog4", "how money is traded for goods and services, and how goods move from place to place"],
    ["ca-k-calendar", "adopt", "SS.Hist2; SS.Inq1", "days, weeks and months, and using before and after to put events in order"],
    ["ca-k-good-citizens", "adopt", "SS.PS3; SS.PS2", "taking part in classroom decisions, following rules and respecting different opinions"],
  ],
  "1/social": [
    ["maps", "share", "SS.Geog1", "making and reading simple maps of the neighborhood"],
    ["our-land", "share", "SS.Geog4; SS.Geog5", "how the land, water and weather around a community affect the people who live there"],
    ["my-community", "share", "SS.PS3; SS.Econ2", "how people who live and work together make decisions, and the work people do"],
    ["changes-in-my-life", "adopt", "SS.Hist2", "putting events from a child's own life in order: past, present and future"],
    ["respect-and-inclusion", "adopt", "SS.PS2; SS.Hist3", "fair rules, respect, and the people and groups who make a community"],
    ["community-services", "adopt", "SS.Econ2; PFL.e.MM.1.b.1", "the jobs people do in a community, the skills they need, and earning pay for work"],
    ["wa-g1-earn-save-share", "adopt", "SS.Econ1; PFL.e.MM.1.b.1", "earning, spending, saving and sharing, and giving up one thing to choose another"],
    ["ca-g1-long-ago", "adopt", "SS.Hist2", "school, travel and daily life long ago compared with today"],
  ],
  "2/social": [
    ["needs-and-wants", "share", "SS.Econ1", "how choices about needs and wants affect ourselves and others"],
    ["then-and-now", "adopt", "SS.Hist2", "how the local community has changed over time, from sources about then and now"],
    ["communities-compared", "adopt", "SS.Geog4; SS.Geog5", "comparing the land, jobs and ways of life of different communities"],
    ["ns-community-change-2", "adopt", "SS.Hist2; SS.Hist3", "key events in a community's history and how it has changed"],
    ["mb-working-together", "adopt", "SS.PS2", "how people in a community work together, take on roles and solve problems"],
    ["ca-g2-citizens-and-leaders", "adopt", "SS.PS3; SS.Hist3", "what governments do, and the leaders, symbols and celebrations of the nation"],
    ["ca-g2-work-and-money", "adopt", "SS.Econ2; PFL.e.MM.1.b.1", "what money is for, and saving or spending it on goods and services"],
    ["or-g2-world-maps", "adopt", "SS.Geog1", "using maps and globes to find continents, oceans and countries"],
  ],
  "3/social": [
    ["meeting-needs", "share", "SS.Econ1; SS.Geog4", "how people in different places use resources and climate to decide what to produce"],
    ["mb-global-communities", "adopt", "SS.Geog5; SS.Hist2", "comparing the daily life and economies of communities around the world"],
    ["mb-working-together", "adopt", "SS.PS3; SS.PS2", "how families, groups and governments work together to improve communities"],
    ["or-g2-world-maps", "adopt", "SS.Geog1", "using maps and globes to find continents, oceans and countries"],
  ],
  "4/social": [
    ["or-g5-history-detective", "adopt", "SS.Hist2; SS.Inq2", "using primary and secondary sources and timelines to ask questions about the past"],
  ],
  "5/social": [
    ["wa-g5-thirteen-colonies", "adopt", "SS.Geog4; SS.Hist3", "the thirteen colonies, their regions and how geography shaped life in each"],
    ["ca-g5-colonial-economy", "adopt", "SS.Econ1", "how colonial producers, workers and trade specialized and traded to meet people's wants and needs"],
    ["ca-g5-road-to-revolution", "adopt", "SS.Hist3", "the chain of causes and effects that led the colonies toward independence"],
    ["ca-g5-revolution", "adopt", "SS.Hist3; SS.Hist2", "the American Revolution, the Declaration of Independence and the sources that tell its story"],
    ["wa-g5-constitution", "adopt", "SS.PS3; SS.PS2", "the Constitution, the three branches of the national government and the Bill of Rights"],
    ["or-g5-timeline", "adopt", "SS.Hist3", "putting the events from the founding of the colonies to the Constitution in order"],
    ["or-g5-earn-and-save", "adopt", "SS.Econ2; SS.Econ4", "incentives, saving, interest and using banks and other financial institutions"],
  ],
  "6/social": [
    ["wa-g6-time-sources", "adopt", "SS.Hist4", "studying the past from primary and secondary sources, and counting time in BCE and CE"],
    ["first-farmers", "adopt", "SS.Hist2", "early people, and how farming led to settled villages"],
    ["where-civilizations-grew", "adopt", "SS.Geog2; SS.Geog5", "how rivers and land shaped where the first civilizations grew"],
    ["wa-g6-mesopotamia-egypt", "adopt", "SS.Hist2", "Mesopotamia and Egypt: rivers, farming, laws and early writing"],
    ["wa-g6-india-china", "adopt", "SS.Hist2", "ancient India and China and the beliefs that began there"],
    ["wa-g6-greece-rome", "adopt", "SS.PS1; SS.Hist2", "democracy in Athens, the Roman Republic and other early forms of government"],
    ["world-beliefs", "adopt", "SS.Hist2", "the origins and central teachings of major world religions"],
    ["trade-networks", "adopt", "SS.Geog3; SS.Econ3", "how trade between early cultures spread goods and ideas"],
  ],
  "7/social": [
    ["medieval-europe", "adopt", "SS.Hist2; SS.PS2", "medieval Europe, feudalism and early English law"],
    ["islamic-world", "adopt", "SS.Hist2", "the Islamic world, its cities and trade, and the exchange of ideas"],
    ["or-g7-asian-empires", "adopt", "SS.Hist2", "the empires of China and Asia, and their trade and inventions"],
    ["or-g7-african-kingdoms", "adopt", "SS.Hist2; SS.Geog3", "the kingdoms of West Africa and trans-Saharan trade"],
    ["ca-g7-aztec-inca", "adopt", "SS.Hist2; SS.Geog5", "the Maya, Aztec and Inca and how their lands shaped them"],
    ["renaissance-and-reformation", "adopt", "SS.Hist2", "the Renaissance and the Reformation and how new ideas spread"],
    ["or-g7-age-of-revolutions", "adopt", "SS.Hist2; SS.PS1", "Enlightenment ideas and the revolutions that shaped democratic government"],
    ["or-g7-world-timeline", "adopt", "SS.Hist1", "putting major events in world history from 600 to 1900 in order and linking causes and effects"],
  ],
  "8/social": [
    ["or-g8-founding-ideas", "adopt", "SS.PS1; SS.Hist2", "the ideas behind the Declaration of Independence and the Constitution"],
    ["wa-g8-bill-of-rights", "adopt", "SS.PS2", "the rights the Constitution and the Bill of Rights protect, and how government power is limited"],
    ["ca-g8-industry-reform", "adopt", "SS.Hist2; SS.Econ2", "factories, workers, labor unions and the reformers of the 1800s"],
    ["or-g8-reconstruction", "adopt", "SS.PS2; SS.Hist2", "Reconstruction and the amendments that ended slavery and promised equal rights"],
    ["maps-graphs-8", "adopt", "SS.Geog1", "using maps, graphs and data to show change over time"],
    ["mb-evidence-8", "adopt", "SS.Hist4", "analyzing primary and secondary sources and detecting bias in them"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "SS.PS1", "the roots of democratic ideals and the principles of the Constitution"],
    ["ca-g9-civic-action", "adopt", "SS.PS3; SS.Inq5", "how citizens take part, from voting and elections to challenging laws and civic action"],
    ["ca-g9-media", "adopt", "SS.PS3", "how political parties, the media and interest groups influence and reflect public opinion"],
  ],
};
