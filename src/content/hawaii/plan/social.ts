import type { Entry } from "../kit";

// Hawaiʻi social studies: the units Hawaiʻi uses from other frameworks, per grade ("<grade>/social"). The Hawaiʻi Core
// Standards for Social Studies (HCSSS, 2018) number each content standard by grade, theme, anchor standard and number:
// "SS.4.7.14.1". The inquiry standards are numbered by grade band ("SS.3-5.2.2"). Kindergarten to Grade 3 widen from self
// and family to the community and the world, Grade 4 is Hawaiian history, Grade 5 is the United States to the
// Revolution, Grade 6 is world history, Grade 7 is Hawaiian History: the Hawaiian Kingdom ("SS.7HHK.…") with Pacific
// Island Studies ("SS.7PI.…"), and Grade 8 is United States history to Reconstruction. Grade 9 here is the high school
// courses Modern History of Hawaiʻi ("SS.MHH.…") and Participation in Democracy ("SS.PID.…").
//
// Only general units free of Canadian content and of other states' places are adopted, and never another state's units
// about its Tribes. Hawaiʻi's own units (its islands and communities, migration to Hawaiʻi, Hawaiian history in Grades 4
// and 7, the Pacific Islands, and Modern Hawaiʻi in Grade 9) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "SS.K.2.17.1; SS.K.2.19.2", "sequencing important events in a child's life, and the effects of an event"],
    ["families", "share", "SS.K.1.7.3; SS.K.2.18.3", "roles at home and school, and seeing an event from two perspectives"],
    ["needs-and-wants", "share", "SS.K.3.10.2; SS.K.3.9.1", "telling needs from wants, and how scarcity affects daily choices"],
    ["places-near-me", "adopt", "SS.K.3.13.3; SS.K.3.15.4", "maps of familiar places with positional words, and how and why people move around"],
    ["fair-and-kind", "adopt", "SS.K.1.8.1; SS.K.1.8.2", "rules in different settings, and working together to make decisions"],
    ["mb-k-jobs-and-rules", "adopt", "SS.K.1.7.3; SS.K.1.8.1", "the roles of people in the community, and what happens when rules are followed or not"],
    ["or-k-money-and-work", "adopt", "SS.K.3.9.1; SS.K.3.10.2", "the choices people make with money, and needs and wants"],
    ["ca-k-calendar", "adopt", "SS.K.2.17.1; SS.K-2.4.1", "putting events in order through the year, and explaining them in sequence"],
    ["ca-k-good-citizens", "adopt", "SS.K.1.8.2; SS.K-2.5.2", "working together, and ways people help solve problems at school"],
  ],
  "1/social": [
    ["maps", "share", "SS.1.1.13.3", "using maps and map features to describe places"],
    ["our-land", "share", "SS.1.2.13.2; SS.1.1.13.3", "physical features of the continents and oceans, and maps of places"],
    ["my-community", "share", "SS.1.1.7.1; SS.1.1.8.2", "shared values in the community, and following agreed-upon rules"],
    ["changes-in-my-life", "adopt", "SS.1.3.17.3; SS.1.4.19.3", "life in the past and today, and causes and effects in a child's own life"],
    ["respect-and-inclusion", "adopt", "SS.1.1.7.1; SS.1.1.8.2", "shared democratic values, and listening respectfully to others"],
    ["community-services", "adopt", "SS.1.4.10.1", "the goods and services that help the community"],
    ["wa-g1-earn-save-share", "adopt", "SS.1.4.10.2; SS.1.2.9.1", "ways of getting what we need and want, and scarcity from limited resources"],
    ["ca-g1-long-ago", "adopt", "SS.1.3.17.3; SS.1.3.18.2", "life long ago and today, and fact and opinion in stories from the past"],
  ],
  "2/social": [
    ["ca-g2-citizens-and-leaders", "adopt", "SS.2.1.6.1; SS.2.1.7.2", "school, community and national leaders, and how historical figures show shared democratic values"],
    ["mb-working-together", "adopt", "SS.2.4.8.3", "working together on logical solutions to community problems"],
    ["ca-g2-work-and-money", "adopt", "SS.2.3.14.5; SS.2.4.9.4", "how people use the Earth's resources, and the costs and benefits of saving money"],
    ["communities-compared", "adopt", "SS.2.3.13.4; SS.2.3.12.2", "the geographic features of places, and how people depend on each other"],
    ["ny-g1-american-symbols", "adopt", "SS.2.1.7.2", "the symbols and people that stand for shared democratic values"],
  ],
  "3/social": [
    ["meeting-needs", "share", "SS.3.3.13.1; SS.3.3.16.3", "how geography affects life in communities, and how people, goods and ideas move"],
    ["or-g5-history-detective", "adopt", "SS.3.4.18.4; SS.3-5.2.2", "the reliability of historical accounts, and primary and secondary sources"],
    ["ny-g3-globes-and-maps", "adopt", "SS.3.3.13.1", "using globes and maps, the hemispheres, the Equator and the Prime Meridian"],
    ["ny-g3-culture", "adopt", "SS.3.3.14.4", "how cultural practices create and influence communities"],
  ],
  "4/social": [
    ["or-g5-history-detective", "adopt", "SS.3-5.2.1; SS.3-5.2.2", "fact and opinion in sources, and primary and secondary sources"],
  ],
  "5/social": [
    ["ny-g5-columbian-exchange", "adopt", "SS.5.2.19.2; SS.5.3.15.1", "the effects of European arrival on Native Americans, and how cultures shaped new settlements"],
    ["wa-g5-thirteen-colonies", "adopt", "SS.5.5.15.1; SS.5.3.8.2", "how geography shaped the New England, Mid-Atlantic and Southern colonies, and early colonial government"],
    ["ca-g5-colonial-economy", "adopt", "SS.5.4.10.2; SS.5.4.15.1", "labor systems in Colonial America, and the transatlantic slave trade"],
    ["ca-g5-road-to-revolution", "adopt", "SS.5.6.19.1", "the economic and political conflicts that led to the American Revolution"],
    ["ca-g5-revolution", "adopt", "SS.5.6.19.3; SS.5.6.7.2", "the key battles, alliances and people of the Revolutionary War, and the principles of the Declaration of Independence"],
    ["wa-g5-constitution", "adopt", "SS.5.6.7.2; SS.3-5.2.3", "the founding ideas of American democracy, and gathering information from sources"],
    ["or-g5-timeline", "adopt", "SS.5.6.19.1; SS.5.6.19.3", "putting the events from the colonies to the Revolution in order"],
  ],
  "6/social": [
    ["first-farmers", "adopt", "SS.6.1.19.3", "the role of technological change, beginning with farming, in early river valley civilizations"],
    ["where-civilizations-grew", "adopt", "SS.6.1.14.1", "the river valleys where the first civilizations grew, and their cultures"],
    ["world-beliefs", "adopt", "SS.6.3.14.1", "how religion and philosophy shaped societies in the classical period"],
    ["trade-networks", "adopt", "SS.6.5.10.1; SS.6.5.15.2", "trade networks that linked societies, and how goods and ideas spread along them"],
    ["wa-g6-time-sources", "adopt", "SS.6-8.2.1; SS.6-8.2.2", "judging a source's credibility, and gathering information from credible sources"],
    ["wa-g6-mesopotamia-egypt", "adopt", "SS.6.1.6.2; SS.6.1.14.1", "politics and religion in Mesopotamia and Egypt, and their cultures"],
    ["wa-g6-greece-rome", "adopt", "SS.6.2.6.2; SS.6.2.16.3", "the political structures of classical Greece and Rome, and their lasting impact"],
    ["ny-g6-classical-china-india", "adopt", "SS.6.2.6.1; SS.6.2.19.4", "the cultural and political structures of classical India and China, and why their empires declined"],
    ["or-g7-african-kingdoms", "adopt", "SS.6.4.14.2; SS.6.5.10.1", "the growth of Sub-Saharan African kingdoms, and the trade that linked them"],
  ],
  "7/social": [
    ["maps-graphs-8", "adopt", "SS.7PI.1.13.1; SS.6-8.2.2", "using maps and other geographic representations, and gathering information from sources"],
  ],
  "8/social": [
    ["or-g8-founding-ideas", "adopt", "SS.8.1.6.1", "how the challenges facing the government were resolved at the Constitutional Convention"],
    ["wa-g8-bill-of-rights", "adopt", "SS.8.1.7.3; SS.8.1.6.2", "how the Bill of Rights protects individual liberties, and the three branches of government"],
    ["maps-graphs-8", "adopt", "SS.8.3.16.2; SS.6-8.2.2", "maps of how the United States gained territory, and gathering information from sources"],
    ["mb-evidence-8", "adopt", "SS.6-8.2.1; SS.6-8.3.1", "judging a source's credibility, and claims and counterclaims"],
    ["ca-g8-westward", "adopt", "SS.8.3.19.1; SS.8.3.16.2", "the reasons for U.S. territorial expansion, and how the United States gained new territories"],
    ["ca-g8-industry-reform", "adopt", "SS.8.4.15.2; SS.8.6.7.2", "how innovations reshaped American society, and the reform movements of the 1800s"],
    ["ca-g8-civil-war", "adopt", "SS.8.5.9.1; SS.8.7.19.1", "how slavery shaped the economies of the North and South, and the conflicts over slavery that led to war"],
    ["ca-g8-new-nation", "adopt", "SS.8.2.6.2; SS.8.2.17.1", "how political parties grew out of conflicts in the new nation, and who could vote in early America"],
    ["or-g8-reconstruction", "adopt", "SS.8.8.8.1; SS.8.8.17.2", "the new order after emancipation, and how the end of Reconstruction affected African Americans"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "SS.PID.1.17.1; SS.PID.1.19.2", "the ideas behind the Constitution, and the problems and compromises that shaped it"],
    ["ca-g9-civic-action", "adopt", "SS.PID.5.7.1; SS.PID.3.7.2", "how an active citizen can make change, and the rights and responsibilities of citizenship"],
    ["ca-g9-three-branches", "adopt", "SS.PID.2.8.2; SS.PID.2.6.1", "how the three branches make laws, and the principles the Constitution is built on"],
    ["ca-g9-supreme-court", "adopt", "SS.PID.3.17.1", "landmark Supreme Court cases and their impact"],
    ["ca-g9-media", "adopt", "SS.PID.4.7.1; SS.9-12.2.1", "how policy makers, interest groups and the media shape public policy, and judging a source's credibility"],
  ],
};
