import type { Entry } from "../kit";

// Maine social studies: the units Maine uses from other frameworks, per grade ("<grade>/social"). The Maine Learning
// Results for social studies (2019) have four strands, each with named performance expectations for every grade from
// Kindergarten to Grade 5 and for the spans Grades 6-8 and 9-Diploma: "Civics & Government 1", "Personal Finance",
// "Economics", "Global Connections", "Geography 2", "History 3". A unit cites the expectations it practises.
//
// Maine leaves the order of topics in Grades 6 to 12 to each school unit, so this app follows the usual US pattern:
// world geography and ancient civilizations in Grade 6, world history from 600 to 1900 in Grade 7, United States
// history with Maine's part in it in Grade 8, and civics and personal finance in Grade 9. Only general units free of
// Canadian content and of Washington State, Oregon and California are adopted, and never another state's units about
// its Tribes. Maine's own units (the state's symbols, land, history and government, and the Wabanaki Nations) are in
// ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "History 3", "how each person and family shares common and unique parts of culture and traditions"],
    ["families", "share", "History 2; History 3", "families and their traditions, and putting events in order with before and after"],
    ["needs-and-wants", "share", "Economics", "how people make choices to meet their needs and wants"],
    ["places-near-me", "adopt", "Geography 1; Geography 2", "places near home and school and how the land around us affects families"],
    ["fair-and-kind", "adopt", "Civics & Government 3; Civics & Government 4", "classroom rules, rights and responsibilities, and settling conflicts peacefully"],
    ["mb-k-jobs-and-rules", "adopt", "Civics & Government 1; Civics & Government 3", "community workers and volunteers, and why school has rules"],
    ["or-k-money-and-work", "adopt", "Personal Finance; Global Connections", "how money has value and is traded for goods and services, and how families are part of an economy"],
    ["ca-k-calendar", "adopt", "History 2", "days, weeks and months, and using before and after to put events in order"],
    ["ca-k-good-citizens", "adopt", "Civics & Government 4; Civics & Government 5", "taking part in classroom decisions, following rules and respecting different opinions"],
  ],
  "1/social": [
    ["maps", "share", "Geography 1", "gathering information about the neighborhood from maps and pictures"],
    ["our-land", "share", "Geography 2", "how the land, water and weather around a community affect the people who live there"],
    ["my-community", "share", "Global Connections; Civics & Government 2", "how families and communities depend on one another, and the rules and laws that help a community"],
    ["changes-in-my-life", "adopt", "History 1", "past, present and future in a child's own life"],
    ["respect-and-inclusion", "adopt", "Civics & Government 2; History 2", "fair play, respect and the shared and unique parts of each person's culture"],
    ["community-services", "adopt", "Global Connections", "the work people do in a community and how it meets everyone's needs"],
    ["wa-g1-earn-save-share", "adopt", "Personal Finance; Economics", "spending, saving and sharing as ways to use money, and making choices with scarce resources"],
    ["ca-g1-long-ago", "adopt", "History 1", "school, travel and daily life long ago compared with today"],
  ],
  "2/social": [
    ["needs-and-wants", "share", "Economics", "choices people make about using scarce resources to meet needs and wants"],
    ["then-and-now", "adopt", "History 1; History 2", "family and community history from sources, and comparing life then and now"],
    ["communities-compared", "adopt", "Geography 2", "how the features of a place shape the lives of the people in different communities"],
    ["ns-community-change-2", "adopt", "History 1", "key events in the history of the community and how it has changed"],
    ["mb-working-together", "adopt", "Civics & Government 3", "working together fairly to solve problems at school"],
    ["ca-g2-citizens-and-leaders", "adopt", "Civics & Government 1; Civics & Government 2", "democratic ideals, and the leaders, symbols and celebrations of the nation"],
    ["ca-g2-reading-maps", "adopt", "Geography 1", "using maps, a compass rose and a map key to find local and distant places"],
    ["ca-g2-work-and-money", "adopt", "Personal Finance; Economics", "planning ahead with money, and how people use resources to meet their needs"],
    ["or-g2-world-maps", "adopt", "Geography 1", "using maps and globes to find continents, oceans and countries"],
  ],
  "3/social": [
    ["meeting-needs", "share", "Economics; Geography 1", "how people in different places use resources and climate to decide what to produce"],
    ["mb-global-communities", "adopt", "Global Connections; Civics & Government 5", "comparing the daily life and economies of communities around the world"],
    ["mb-working-together", "adopt", "Civics & Government 3; Civics & Government 4", "the rights and responsibilities of citizens and working together for the common good"],
  ],
  "4/social": [
    ["or-g6-world-maps", "adopt", "Geography 1", "maps and globes, latitude and longitude, the equator and the prime meridian"],
    ["or-g5-history-detective", "adopt", "History 1", "using primary and secondary sources and timelines to study the past"],
  ],
  "5/social": [
    ["wa-g5-thirteen-colonies", "adopt", "History 1; Geography 2", "the thirteen colonies, their regions and how geography shaped life in each"],
    ["ca-g5-colonial-economy", "adopt", "Economics", "how colonial producers, workers and trade met people's wants and needs"],
    ["ca-g5-road-to-revolution", "adopt", "History 1", "the events and ideas that led the colonies toward independence"],
    ["ca-g5-revolution", "adopt", "History 1; Civics & Government 4", "the American Revolution, the Declaration of Independence and how people worked for change"],
    ["wa-g5-constitution", "adopt", "Civics & Government 1; Civics & Government 2; Civics & Government 3", "the Constitution, the three branches of the national government and the Bill of Rights"],
    ["or-g5-timeline", "adopt", "History 1", "putting the events from the founding of the colonies to the Constitution in order"],
    ["or-g5-earn-and-save", "adopt", "Personal Finance", "choices about earning, saving and using banks and other financial institutions"],
  ],
  "6/social": [
    ["wa-g6-world-regions", "adopt", "Geography 1", "the major regions of the Earth, their physical features and their countries"],
    ["wa-g6-time-sources", "adopt", "History 1", "studying the past from primary and secondary sources, and counting time in BCE and CE"],
    ["first-farmers", "adopt", "History 1", "early people, and how farming led to settled villages"],
    ["where-civilizations-grew", "adopt", "Geography 2; History 1", "how rivers and land shaped where the first civilizations grew"],
    ["wa-g6-mesopotamia-egypt", "adopt", "History 1", "Mesopotamia and Egypt: rivers, farming, laws and early writing"],
    ["wa-g6-india-china", "adopt", "History 1; History 2", "ancient India and China and the beliefs that began there"],
    ["wa-g6-greece-rome", "adopt", "Civics & Government 1; History 1", "democracy in Athens, the Roman Republic and other early forms of government"],
    ["world-beliefs", "adopt", "History 2", "the origins and central teachings of major world religions"],
    ["trade-networks", "adopt", "Global Connections; Economics", "how trade between early cultures spread goods and ideas"],
  ],
  "7/social": [
    ["medieval-europe", "adopt", "History 1; Civics & Government 1", "medieval Europe, feudalism and early English law"],
    ["islamic-world", "adopt", "History 1; History 2", "the Islamic world, its cities and trade, and the exchange of ideas"],
    ["or-g7-asian-empires", "adopt", "History 1", "the empires of China and Asia, and their trade and inventions"],
    ["or-g7-african-kingdoms", "adopt", "History 1; Global Connections", "the kingdoms of West Africa and trans-Saharan trade"],
    ["japan-land-values-ab", "adopt", "Geography 2; History 2", "how Japan's geography shaped its culture and government"],
    ["ca-g7-aztec-inca", "adopt", "History 1; Geography 2", "the Maya, Aztec and Inca and how their lands shaped them"],
    ["renaissance-and-reformation", "adopt", "History 1", "the Renaissance and the Reformation and how new ideas spread"],
    ["or-g7-age-of-revolutions", "adopt", "History 1; Civics & Government 1", "Enlightenment ideas and the revolutions that shaped democratic government"],
    ["or-g7-world-timeline", "adopt", "History 1", "putting major events in world history from 600 to 1900 in order"],
  ],
  "8/social": [
    ["or-g8-founding-ideas", "adopt", "Civics & Government 1; History 1", "the ideas behind the Declaration of Independence and the Constitution"],
    ["wa-g8-bill-of-rights", "adopt", "Civics & Government 2", "the rights the Constitution and the Bill of Rights protect, and how government power is limited"],
    ["ca-g8-industry-reform", "adopt", "History 1; Economics", "factories, workers and the reformers of the 1800s"],
    ["or-g8-reconstruction", "adopt", "History 2; Civics & Government 2", "Reconstruction and the amendments that ended slavery and promised equal rights"],
    ["maps-graphs-8", "adopt", "Geography 1", "using maps, graphs and data to show change over time"],
    ["mb-evidence-8", "adopt", "History 1", "analyzing primary and secondary sources and judging how reliable they are"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "Civics & Government 1; History 1", "the roots of democratic ideals and the principles of the Constitution"],
    ["ca-g9-civic-action", "adopt", "Civics & Government 2; Civics & Government 3", "how citizens take part, from voting and service to civic action"],
    ["ca-g9-media", "adopt", "Civics & Government 2", "the media's role in a democracy and judging sources of news"],
  ],
};
