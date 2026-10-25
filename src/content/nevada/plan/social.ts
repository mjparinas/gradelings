import type { Entry } from "../kit";

// Nevada social studies: the units Nevada uses from other frameworks, per grade ("<grade>/social"). The Nevada Academic
// Content Standards for Social Studies (revised 2018) number each standard within its grade or course: "SS.4.11" in
// Kindergarten to Grade 5, "SS.6-8.EWC.12" in the Grades 6-8 courses and "SS.9-12.CE.27" in high school. Each grade has
// a theme: Building Community (K), the Community We Live In and the Work We Do (1), Our National Identity and Culture
// (2), Movement Around Our World (3), Nevada Past and Present (4) and the U.S., Creating a New Nation (5). Grades 6-8 are
// three courses, placed in the order the standards list them: Early World Civilizations (6), World Geography and Global
// Studies (7) and Early U.S. History and Civic Ideals (8). Grade 9 is Civics and Economics, with financial literacy.
//
// Only general units free of Canadian content and of other states' places are adopted, and never another state's units
// about its Tribes. Nevada's own units (its symbols, local and state government, migration, money and voting, Nevada
// studies, the Eastern Woodland, Nevada in the world, Nevada in the nation and governing Nevada) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "SS.K.9", "comparing life in the past with life today, starting with a child's own life"],
    ["families", "share", "SS.K.13; SS.K.9", "how students and families are alike and different across cultures, and life in the past and today"],
    ["needs-and-wants", "share", "SS.K.19", "choices people make because of scarcity, and telling needs from wants"],
    ["places-near-me", "adopt", "SS.K.17; SS.K.18", "simple maps and models of spaces at school and home, and how people move around the community"],
    ["fair-and-kind", "adopt", "SS.K.11; SS.K.14", "ways to resolve conflicts in the classroom, and fairness and respect for others"],
    ["mb-k-jobs-and-rules", "adopt", "SS.K.15; SS.K.16", "rules at home and school, and how people work to improve their communities"],
    ["or-k-money-and-work", "adopt", "SS.K.19; SS.K.16", "choices about money and goods, and the work people do in a community"],
    ["ca-k-calendar", "adopt", "SS.K.12; SS.K.9", "finding celebrations on a calendar, and putting days and events in order"],
    ["ca-k-good-citizens", "adopt", "SS.K.10; SS.K.14", "honesty, courage, friendship, respect and responsibility, and acting as a good citizen"],
  ],
  "1/social": [
    ["maps", "share", "SS.1.19", "using simple maps to describe the physical characteristics of the community"],
    ["our-land", "share", "SS.1.19; SS.1.20", "land and water on maps, and how the environment shapes how we live and work"],
    ["my-community", "share", "SS.1.22; SS.1.15", "goods and services made in the community and elsewhere, and the people who play important roles in it"],
    ["changes-in-my-life", "adopt", "SS.1.9", "comparing life in the past with life today"],
    ["respect-and-inclusion", "adopt", "SS.1.12; SS.1.11", "how families are alike and different across cultures, and resolving conflicts"],
    ["community-services", "adopt", "SS.1.16; SS.1.15", "the services government provides, and the people who help the community"],
    ["wa-g1-earn-save-share", "adopt", "SS.1.21", "earning, saving and spending, and the role of banks and other businesses in the community"],
    ["ca-g1-long-ago", "adopt", "SS.1.9; SS.1.13", "comparing life long ago and today, and the traditions of different cultures"],
  ],
  "2/social": [
    ["ca-g2-citizens-and-leaders", "adopt", "SS.2.9; SS.2.19", "leaders who shaped the nation, and the rights and responsibilities of citizens"],
    ["mb-working-together", "adopt", "SS.2.13; SS.2.19", "how people work through conflict to solve problems, and the responsibilities of citizens"],
    ["ca-g2-work-and-money", "adopt", "SS.2.25", "how natural resources are used to produce goods and services, in the past and today"],
    ["communities-compared", "adopt", "SS.2.22; SS.2.14", "how the land shapes communities, and comparing places and traditions across the country"],
    ["ny-g1-american-symbols", "adopt", "SS.2.10; SS.2.21", "symbols and events that shaped the nation's identity, and national landmarks"],
  ],
  "3/social": [
    ["meeting-needs", "share", "SS.3.22; SS.3.24", "how people settle near natural resources, and use resources to produce goods and services"],
    ["or-g2-world-maps", "adopt", "SS.3.20; SS.3.21", "using maps of the world's continents, oceans and countries, and how places shape where people live"],
    ["or-g5-history-detective", "adopt", "SS.3.3; SS.3.4", "comparing sources, and the difference between primary and secondary sources"],
    ["ny-g3-globes-and-maps", "adopt", "SS.3.20", "using globes and maps of the world, the hemispheres, the Equator and the Prime Meridian"],
    ["ny-g3-culture", "adopt", "SS.3.23; SS.3.16", "how cultures interact with and influence each other, and how newcomers and their new communities meet"],
    ["az-g2-continents-oceans", "adopt", "SS.3.21", "the seven continents and five oceans, and the places people choose to live around the world"],
  ],
  "4/social": [
    ["or-g5-history-detective", "adopt", "SS.4.3; SS.4.4", "using primary and secondary sources, and checking them against each other"],
    ["or-g5-earn-and-save", "adopt", "SS.4.30; SS.4.31", "the benefits and ways of saving, banks, and ways to pay for goods and services"],
  ],
  "5/social": [
    ["ny-g5-columbian-exchange", "adopt", "SS.5.14; SS.5.35", "how Native, European and African cultures met and changed, and trade across the Atlantic"],
    ["wa-g5-thirteen-colonies", "adopt", "SS.5.13; SS.5.32", "the development of the colonies, and the differences among the New England, Middle and Southern colonies"],
    ["ca-g5-colonial-economy", "adopt", "SS.5.32; SS.5.34", "the economies of the colonial regions, and the role of slavery in them"],
    ["ca-g5-road-to-revolution", "adopt", "SS.5.16; SS.5.35", "the causes of the American Revolution, and trade and taxes in the colonies"],
    ["ca-g5-revolution", "adopt", "SS.5.16; SS.5.15", "the Declaration of Independence, the ideas behind it, and the war for independence"],
    ["wa-g5-constitution", "adopt", "SS.5.21; SS.5.26", "representative government, the debates of the Constitution, its structure and checks and balances"],
    ["or-g5-timeline", "adopt", "SS.5.13; SS.5.16", "putting the events from the colonies to the Constitution in order"],
  ],
  "6/social": [
    ["first-farmers", "adopt", "SS.6-8.EWC.29; SS.6-8.EWC.17", "how farming changed where people lived and how they used the land, and early technology"],
    ["where-civilizations-grew", "adopt", "SS.6-8.EWC.27; SS.6-8.EWC.26", "the river valleys where the first civilizations grew, and maps of early civilizations"],
    ["world-beliefs", "adopt", "SS.6-8.EWC.16", "the belief systems and philosophies of early civilizations and how they spread"],
    ["trade-networks", "adopt", "SS.6-8.EWC.30; SS.6-8.EWC.20", "patterns of trade between civilizations, and cultural diffusion"],
    ["wa-g6-time-sources", "adopt", "SS.6-8.EWC.4", "dating the past, and how historians gather and check sources"],
    ["wa-g6-mesopotamia-egypt", "adopt", "SS.6-8.EWC.23; SS.6-8.EWC.12", "the organization of the first civilizations, and the rise of kingdoms in Mesopotamia and Egypt"],
    ["wa-g6-greece-rome", "adopt", "SS.6-8.EWC.25; SS.6-8.EWC.22", "the governments and laws of ancient Greece and Rome, and their gifts to the modern world"],
    ["ny-g6-classical-china-india", "adopt", "SS.6-8.EWC.22; SS.6-8.EWC.16", "the achievements and belief systems of classical India and China"],
    ["or-g7-african-kingdoms", "adopt", "SS.6-8.EWC.31; SS.6-8.EWC.32", "the trading kingdoms of Africa and how trade built their economies"],
  ],
  "7/social": [
    ["ny-g5-countries-capitals", "adopt", "SS.6-8.WGGS.27; SS.6-8.WGGS.28", "mapping world regions and their countries, and the characteristics of places and regions"],
    ["ny-g5-cultures", "adopt", "SS.6-8.WGGS.16; SS.6-8.WGGS.14", "cultures, belief systems and the arts around the world, and what shapes identity"],
    ["ny-g5-governments", "adopt", "SS.6-8.WGGS.24; SS.6-8.WGGS.12", "comparing forms of government around the world"],
    ["ny-g5-economics", "adopt", "SS.6-8.WGGS.33; SS.6-8.WGGS.34", "how economic systems and policies shape nations, and comparing their economies"],
    ["maps-graphs-8", "adopt", "SS.6-8.WGGS.27", "using maps, charts and graphs to explain regional patterns"],
  ],
  "8/social": [
    ["or-g8-founding-ideas", "adopt", "SS.6-8.EUSH.32; SS.6-8.EUSH.12", "the Articles of Confederation, the Constitution and the growth of representative government, and the ideas behind them"],
    ["wa-g8-bill-of-rights", "adopt", "SS.6-8.EUSH.34; SS.6-8.EUSH.25", "the Bill of Rights and the amendments that followed, and the struggle for civil rights and liberties"],
    ["maps-graphs-8", "adopt", "SS.6-8.EUSH.35", "using maps and images to explain regional and cultural patterns in early U.S. history"],
    ["mb-evidence-8", "adopt", "SS.6-8.EUSH.4; SS.6-8.EUSH.7", "gathering and checking sources, and weighing different arguments"],
    ["ca-g8-industry-reform", "adopt", "SS.6-8.EUSH.40; SS.6-8.EUSH.25", "innovation and industry in the early United States, and reform movements"],
    ["ca-g8-civil-war", "adopt", "SS.6-8.EUSH.15; SS.6-8.EUSH.22", "regional differences that led to the Civil War, and the war's causes and effects"],
    ["or-g8-reconstruction", "adopt", "SS.6-8.EUSH.23; SS.6-8.EUSH.24", "the abolition of slavery, Reconstruction, and the discrimination that followed it"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "SS.9-12.CE.37; SS.9-12.CE.16", "the origins of American government in political theory and the rule of law, and how the founding documents are interpreted"],
    ["ca-g9-civic-action", "adopt", "SS.9-12.CE.24; SS.9-12.CE.34", "taking informed civic action, and how citizens' roles have changed"],
    ["ca-g9-media", "adopt", "SS.9-12.CE.30; SS.9-12.CE.31; SS.9-12.CE.5", "the media and interest groups in politics, and judging the credibility of sources"],
  ],
};
