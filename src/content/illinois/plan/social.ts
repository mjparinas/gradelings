import type { Entry } from "../kit";

// Illinois social studies: the units Illinois uses from other frameworks, per grade ("<grade>/social"). The Illinois
// Learning Standards for Social Science (2016) have an inquiry strand and four disciplinary strands (civics, economics
// and financial literacy, geography, history), cited by code: "SS.4.H.3", "SS.2.EC.FL.1", "SS.K-2.IS.4". Kindergarten to
// Grade 5 each have a theme (My Social World; Living, Learning, and Working Together; Families, Neighborhoods, and
// Communities; Communities Near and Far; Our State, Our Nation; Our Nation, Our World). Grades 6 to 8 share one band of
// standards at three levels of complexity ("SS.6-8.H.1.LC", ".MdC", ".MC"), and Grades 9 to 12 one more.
//
// Illinois leaves the order of middle school topics to each district, so this app follows the usual pattern: world
// geography and ancient civilizations in Grade 6, world history from 600 to 1900 in Grade 7, and United States history
// from the founding to Reconstruction in Grade 8, with the United States and Illinois constitutions every 8th grader
// studies. Grade 9 is civics, the semester every Illinois high school student takes. Only general units free of Canadian
// content and of other states' places are adopted, and never another state's units about its Tribes. Illinois's own units
// (its symbols, communities, land, history and government) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "SS.K.H.1", "comparing life in the past with life today, starting with each child and family"],
    ["families", "share", "SS.K.H.1; SS.K.H.2", "families and their traditions, holidays, and life long ago and today"],
    ["needs-and-wants", "share", "SS.K.EC.1", "how people make choices because they can't have everything they want"],
    ["places-near-me", "adopt", "SS.K.G.1; SS.K.G.3", "places near home and school, maps and pictures, and how weather and the land affect people"],
    ["fair-and-kind", "adopt", "SS.K.CV.2", "classroom rules, rights and responsibilities, and settling conflicts peacefully"],
    ["mb-k-jobs-and-rules", "adopt", "SS.K.CV.1; SS.K.CV.2", "community workers and leaders, and why school has rules"],
    ["or-k-money-and-work", "adopt", "SS.K.EC.1; SS.K.G.2", "how money is traded for goods and services, and how goods move from place to place"],
    ["ca-k-calendar", "adopt", "SS.K.H.1; SS.K-2.IS.1", "days, weeks and months, and using before and after to put events in order"],
    ["ca-k-good-citizens", "adopt", "SS.K.CV.1; SS.K.CV.2", "taking part in classroom decisions, following rules and respecting different opinions"],
  ],
  "1/social": [
    ["maps", "share", "SS.1.G.1", "making and reading simple maps of the neighborhood"],
    ["our-land", "share", "SS.1.G.2; SS.1.G.3", "how the land, water and weather around a community affect the people who live there"],
    ["my-community", "share", "SS.1.CV.1; SS.1.EC.2", "how people who live and work together make decisions, and the work people do"],
    ["changes-in-my-life", "adopt", "SS.1.H.1", "putting events from a child's own life in order: past, present and future"],
    ["respect-and-inclusion", "adopt", "SS.1.CV.2; SS.1.H.2", "fair rules, respect, and the people and groups who make a community"],
    ["community-services", "adopt", "SS.1.EC.2; SS.1.EC.FL.1", "the jobs people do in a community, the skills they need, and earning pay for work"],
    ["wa-g1-earn-save-share", "adopt", "SS.1.EC.1; SS.1.EC.FL.1", "earning, spending, saving and sharing, and giving up one thing to choose another"],
    ["ca-g1-long-ago", "adopt", "SS.1.H.1; SS.1.H.3", "school, travel and daily life long ago compared with today"],
  ],
  "2/social": [
    ["needs-and-wants", "share", "SS.2.EC.1", "how choices about needs and wants affect ourselves and others"],
    ["then-and-now", "adopt", "SS.2.H.1", "how the local community has changed over time, from sources about then and now"],
    ["communities-compared", "adopt", "SS.2.G.2; SS.2.G.3", "comparing the land, jobs and ways of life of different communities"],
    ["ns-community-change-2", "adopt", "SS.2.H.1; SS.2.H.2", "key events in a community's history and how it has changed"],
    ["mb-working-together", "adopt", "SS.2.CV.2", "how people in a community work together, take on roles and solve problems"],
    ["ca-g2-citizens-and-leaders", "adopt", "SS.2.CV.1; SS.2.H.2", "what governments do, and the leaders, symbols and celebrations of the nation"],
        ["ca-g2-work-and-money", "adopt", "SS.2.EC.2; SS.2.EC.FL.1", "what money is for, and saving or spending it on goods and services"],
    ["or-g2-world-maps", "adopt", "SS.2.G.1", "using maps and globes to find continents, oceans and countries"],
  ],
  "3/social": [
    ["meeting-needs", "share", "SS.3.EC.1; SS.3.G.2", "how people in different places use resources and climate to decide what to produce"],
    ["mb-global-communities", "adopt", "SS.3.G.3; SS.3.H.2", "comparing the daily life and economies of communities around the world"],
    ["mb-working-together", "adopt", "SS.3.CV.1; SS.3.CV.2", "how families, groups and governments work together to improve communities"],
    ["or-g2-world-maps", "adopt", "SS.3.G.1", "using maps and globes to find continents, oceans and countries"],
  ],
  "4/social": [
    ["or-g5-history-detective", "adopt", "SS.4.H.2; SS.3-5.IS.3", "using primary and secondary sources and timelines to ask questions about the past"],
  ],
  "5/social": [
    ["wa-g5-thirteen-colonies", "adopt", "SS.5.G.2; SS.5.H.1", "the thirteen colonies, their regions and how geography shaped life in each"],
    ["ca-g5-colonial-economy", "adopt", "SS.5.EC.1", "how colonial producers, workers and trade specialized and traded to meet people's wants and needs"],
    ["ca-g5-road-to-revolution", "adopt", "SS.5.H.1", "the chain of causes and effects that led the colonies toward independence"],
    ["ca-g5-revolution", "adopt", "SS.5.H.1; SS.5.H.2", "the American Revolution, the Declaration of Independence and the sources that tell its story"],
    ["wa-g5-constitution", "adopt", "SS.5.CV.1; SS.5.CV.2", "the Constitution, the three branches of the national government and the Bill of Rights"],
    ["or-g5-timeline", "adopt", "SS.5.H.1", "putting the events from the founding of the colonies to the Constitution in order"],
    ["or-g5-earn-and-save", "adopt", "SS.5.EC.2; SS.5.EC.4", "incentives, saving, interest and using banks and other financial institutions"],
  ],
  "6/social": [
        ["wa-g6-time-sources", "adopt", "SS.6-8.H.3.LC", "studying the past from primary and secondary sources, and counting time in BCE and CE"],
    ["first-farmers", "adopt", "SS.6-8.H.1.LC", "early people, and how farming led to settled villages"],
    ["where-civilizations-grew", "adopt", "SS.6-8.G.3.LC; SS.6-8.G.2.LC", "how rivers and land shaped where the first civilizations grew"],
    ["wa-g6-mesopotamia-egypt", "adopt", "SS.6-8.H.1.LC", "Mesopotamia and Egypt: rivers, farming, laws and early writing"],
    ["wa-g6-india-china", "adopt", "SS.6-8.H.1.LC; SS.6-8.H.2.LC", "ancient India and China and the beliefs that began there"],
    ["wa-g6-greece-rome", "adopt", "SS.6-8.CV.4.LC; SS.6-8.H.1.LC", "democracy in Athens, the Roman Republic and other early forms of government"],
    ["world-beliefs", "adopt", "SS.6-8.H.2.LC", "the origins and central teachings of major world religions"],
    ["trade-networks", "adopt", "SS.6-8.G.4.MC; SS.6-8.EC.3.MdC", "how trade between early cultures spread goods and ideas"],
  ],
  "7/social": [
    ["medieval-europe", "adopt", "SS.6-8.H.1.MdC; SS.6-8.CV.2.LC", "medieval Europe, feudalism and early English law"],
    ["islamic-world", "adopt", "SS.6-8.H.1.MdC; SS.6-8.H.2.MdC", "the Islamic world, its cities and trade, and the exchange of ideas"],
    ["or-g7-asian-empires", "adopt", "SS.6-8.H.1.MdC", "the empires of China and Asia, and their trade and inventions"],
    ["or-g7-african-kingdoms", "adopt", "SS.6-8.H.1.MdC; SS.6-8.G.4.MC", "the kingdoms of West Africa and trans-Saharan trade"],
        ["ca-g7-aztec-inca", "adopt", "SS.6-8.H.1.MdC; SS.6-8.G.2.MdC", "the Maya, Aztec and Inca and how their lands shaped them"],
    ["renaissance-and-reformation", "adopt", "SS.6-8.H.2.MdC", "the Renaissance and the Reformation and how new ideas spread"],
    ["or-g7-age-of-revolutions", "adopt", "SS.6-8.H.1.MC; SS.6-8.CV.4.MdC", "Enlightenment ideas and the revolutions that shaped democratic government"],
    ["or-g7-world-timeline", "adopt", "SS.6-8.H.4.LC", "putting major events in world history from 600 to 1900 in order and linking causes and effects"],
  ],
  "8/social": [
    ["or-g8-founding-ideas", "adopt", "SS.6-8.CV.4.MdC; SS.6-8.H.1.MC", "the ideas behind the Declaration of Independence and the Constitution"],
    ["wa-g8-bill-of-rights", "adopt", "SS.6-8.CV.3.MdC", "the rights the Constitution and the Bill of Rights protect, and how government power is limited"],
    ["ca-g8-industry-reform", "adopt", "SS.6-8.H.1.MC; SS.6-8.EC.2.MdC", "factories, workers, labor unions and the reformers of the 1800s"],
    ["or-g8-reconstruction", "adopt", "SS.6-8.CV.2.MCa; SS.6-8.H.1.MC", "Reconstruction and the amendments that ended slavery and promised equal rights"],
    ["maps-graphs-8", "adopt", "SS.6-8.G.1.MdC", "using maps, graphs and data to show change over time"],
    ["mb-evidence-8", "adopt", "SS.6-8.H.3.MdC", "analyzing primary and secondary sources and detecting bias in them"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "SS.9-12.CV.4; SS.9-12.CV.7", "the roots of democratic ideals and the principles of the Constitution"],
    ["ca-g9-civic-action", "adopt", "SS.9-12.CV.2; SS.9-12.CV.8", "how citizens take part, from voting and elections to challenging laws and civic action"],
    ["ca-g9-media", "adopt", "SS.9-12.CV.6", "how political parties, the media and interest groups influence and reflect public opinion"],
  ],
};
