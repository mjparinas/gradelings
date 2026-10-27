import type { Entry } from "../kit";

// Rhode Island social studies: the units Rhode Island uses from other frameworks, per grade ("<grade>/social"). The Rhode
// Island Social Studies Standards (taken up by the Council on Elementary and Secondary Education in February 2023) number
// each standard by grade, outcome group and standard: "SS4.2.3" in Kindergarten to Grade 8 ("SSK.1.1" in kindergarten),
// and "SSHS.CVC.6.3" in the high school courses (Civics, US History I and II, World History I and II). Each grade has a
// theme: kindergarten is families, schools and neighborhoods, Grade 1 is local communities, Grade 2 is global
// communities, Grade 3 is the regions of the United States, Grade 4 is Rhode Island, Grade 5 is United States history
// to Reconstruction, Grade 6 is the ancient and medieval world, Grade 7 is the early modern and modern world, and Grade
// 8 is government and civic life. Grade 9 here is the high school Civics course.
//
// Only general units free of Canadian content and of other states' places are adopted, and never another state's units
// about its Tribes. Rhode Island's own units (its flag and symbols, then and now, Rhode Island and the world, the
// Northeast, states and the nation, the eight Grade 4 Rhode Island units, the new nation, governing Rhode Island and
// voting rights) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["all-about-me", "share", "SSK.1.1", "members of and roles in families"],
    ["families", "share", "SSK.1.1; SSK.1.3", "members of and roles in families, and family traditions"],
    ["needs-and-wants", "share", "SSK.1.4", "family needs and wants"],
    ["places-near-me", "adopt", "SSK.1.2; SSK.2.1", "family and school locations in the local community"],
    ["fair-and-kind", "adopt", "SSK.2.3", "classroom citizenship"],
    ["mb-k-jobs-and-rules", "adopt", "SSK.2.2; SSK.3.2", "roles and responsibilities in schools, and roles in the community"],
    ["or-k-money-and-work", "adopt", "SSK.1.4; SSK.3.2", "family needs and wants, and roles in the community"],
    ["ca-k-calendar", "adopt", "SSK.2.4; SSK.3.3", "shared holidays and traditions, and community traditions and celebrations"],
    ["ca-k-good-citizens", "adopt", "SSK.2.3; SSK.3.2", "classroom citizenship, and community citizenship"],
  ],
  "1/social": [
    ["maps", "share", "SS1.1.2", "reading maps and understanding directions"],
    ["our-land", "share", "SS1.1.3; SS1.1.4", "physical features and natural resources of the community"],
    ["my-community", "share", "SS1.1.1; SS1.3.2", "understanding community, and jobs and careers"],
    ["changes-in-my-life", "adopt", "SS1.2.2", "how communities change"],
    ["respect-and-inclusion", "adopt", "SS1.2.1; SS1.4.4", "culture and diversity in the community, and resolving problems"],
    ["community-services", "adopt", "SS1.3.1; SS1.4.2", "goods and services in the community, and community leaders"],
    ["wa-g1-earn-save-share", "adopt", "SS1.3.3", "how money works"],
    ["ca-g1-long-ago", "adopt", "SS1.2.2", "how communities change"],
  ],
  "2/social": [
    ["ny-g3-globes-and-maps", "adopt", "SS2.1.1", "understanding maps and globes"],
    ["az-g2-continents-oceans", "adopt", "SS2.1.1; SS2.1.2", "maps and globes, and physical features of the globe"],
    ["or-g2-world-maps", "adopt", "SS2.1.1; SS2.1.2", "maps and globes, and physical features of the globe"],
    ["ny-g3-culture", "adopt", "SS2.2.1", "culture and diversity around the world"],
    ["ny-g3-world-communities", "adopt", "SS2.2.1; SS2.4.1", "culture and diversity around the world, and global citizenship"],
    ["communities-compared", "adopt", "SS2.2.1; SS2.3.1", "culture and diversity around the world, and local cultures and their global connections"],
    ["ca-g2-work-and-money", "adopt", "SS2.1.3; SS2.3.2", "natural resources around the globe, and global goods and services"],
    ["ca-g2-citizens-and-leaders", "adopt", "SS2.4.2; SS2.4.5", "global leaders, and creating change"],
  ],
  "3/social": [
    ["or-g5-history-detective", "adopt", "SS3.1.1", "uses of social science"],
    ["ny-g3-globes-and-maps", "adopt", "SS3.1.2", "United States geography and environment"],
    ["ga-g3-us-map", "adopt", "SS3.1.2", "United States geography and environment"],
    ["fl-g3-us-regions", "adopt", "SS3.2.1; SS3.3.1; SS3.4.1; SS3.5.1; SS3.6.1", "the geography and environment of the Northeast, Southeast, Midwest, Southwest and West"],
    ["ga-g3-three-branches", "adopt", "SS3.1.4", "national government"],
    ["ny-g3-governments-rights", "adopt", "SS3.1.4; SS3.1.5", "national government, and the United States today"],
  ],
  "4/social": [],
  "5/social": [
    ["ny-g5-columbian-exchange", "adopt", "SS5.2.1", "European colonization"],
    ["wa-g5-thirteen-colonies", "adopt", "SS5.2.2", "the thirteen colonies"],
    ["ca-g5-colonial-economy", "adopt", "SS5.2.2; SS5.2.4", "the thirteen colonies and their economies, and slavery in the colonies"],
    ["ca-g5-slavery-and-resistance", "adopt", "SS5.2.4; SS5.5.1", "slavery in the colonies, and resistance and abolition"],
    ["ca-g5-road-to-revolution", "adopt", "SS5.3.1", "the causes of the American Revolution"],
    ["ca-g5-revolution", "adopt", "SS5.3.2; SS5.3.3", "the American Revolution"],
    ["wa-g5-constitution", "adopt", "SS5.3.4", "forming a new government"],
    ["or-g5-timeline", "adopt", "SS5.3.1; SS5.3.4", "the road to revolution and forming a new government, in order"],
    ["ca-g8-industry-reform", "adopt", "SS5.4.4", "growth of industry"],
    ["ca-g8-civil-war", "adopt", "SS5.5.2; SS5.5.3", "the road to secession, and the Civil War"],
    ["or-g8-reconstruction", "adopt", "SS5.5.4", "Reconstruction"],
  ],
  "6/social": [
    ["wa-g6-time-sources", "adopt", "SS6.1.2; SS6.1.3", "sources of the past, and understanding time"],
    ["first-farmers", "adopt", "SS6.2.1; SS6.2.2", "environment and early humans, and the expansion of early societies"],
    ["where-civilizations-grew", "adopt", "SS6.2.3; SS6.3.1", "complex societies, and early river valley civilizations"],
    ["wa-g6-mesopotamia-egypt", "adopt", "SS6.3.1", "early river valley civilizations"],
    ["wa-g6-greece-rome", "adopt", "SS6.4.1; SS6.4.2", "the rise of empires, and the spread of ideas"],
    ["ny-g6-classical-china-india", "adopt", "SS6.4.1; SS6.6.1", "the rise of empires, and world religions"],
    ["world-beliefs", "adopt", "SS6.6.1; SS6.7.2", "comparing world religions, and the expansion of religion"],
    ["trade-networks", "adopt", "SS6.5.2", "connecting the Afro-Eurasian regions"],
    ["or-g7-african-kingdoms", "adopt", "SS6.5.1; SS6.7.1", "major empires, and the expansion of territory"],
  ],
  "7/social": [
    ["ca-g7-exploration-and-empire", "adopt", "SS7.2.1; SS7.2.2; SS7.2.3", "voyages of exploration, global commerce, and the Atlantic slave trade"],
    ["renaissance-and-reformation", "adopt", "SS7.3.1; SS7.3.2", "religious changes, and cultural and intellectual movements"],
    ["ca-g7-science-enlightenment", "adopt", "SS7.3.2; SS7.4.1", "cultural and intellectual movements, and political revolutions"],
    ["or-g7-age-of-revolutions", "adopt", "SS7.4.1", "political revolutions"],
    ["ga-g7-economies", "adopt", "SS7.4.2; SS7.7.2", "economic reordering, and globalization"],
    ["al-g9-imperialism", "adopt", "SS7.5.1; SS7.5.2", "imperialism and colonialism, and resistance to colonialism"],
    ["az-g7-world-war-i", "adopt", "SS7.6.1", "World War I (1914-1918)"],
    ["az-g7-world-war-ii", "adopt", "SS7.6.2", "World War II (1939-1945)"],
    ["az-g7-cold-war", "adopt", "SS7.6.3", "the Cold War (1947-1991)"],
    ["az-g7-industry-and-empire", "adopt", "SS7.4.2; SS7.5.1", "economic reordering, and imperialism and colonialism"],
    ["al-g9-decolonization", "adopt", "SS7.7.1", "decolonization and nation building"],
  ],
  "8/social": [
    ["ca-g8-revolutionary-ideas", "adopt", "SS8.1.1; SS8.2.1", "natural rights, and the Declaration of Independence"],
    ["or-g8-founding-ideas", "adopt", "SS8.1.3; SS8.2.2", "constructing a rule of law, and the Constitution and Bill of Rights"],
    ["wa-g8-bill-of-rights", "adopt", "SS8.2.2; SS8.6.1", "the Constitution and Bill of Rights, and the rights of a citizen"],
    ["ca-g9-three-branches", "adopt", "SS8.3.1; SS8.3.2; SS8.3.3", "the legislative, executive and judicial branches"],
    ["ca-g8-constitution-at-work", "adopt", "SS8.3.4; SS8.5.1", "checks and balances, and amendments, bills and executive orders"],
    ["ca-g9-supreme-court", "adopt", "SS8.5.2", "judicial review"],
    ["ca-g9-civic-action", "adopt", "SS8.6.2; SS8.6.3", "the responsibilities of a citizen, and political participation"],
    ["ny-g8-civil-rights", "adopt", "SS8.6.4", "movements for civil rights"],
    ["pe-human-rights-6", "adopt", "SS8.6.5", "human rights and global citizenship"],
    ["ca-g9-media", "adopt", "SS8.7.1", "the function of media in a democracy"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "SSHS.CVC.2.1; SSHS.CVC.2.2", "governmental power and role, ideological influences on the American Revolution, and the ideas of Common Sense and the Declaration of Independence"],
    ["ca-g9-forms-of-government", "adopt", "SSHS.CVC.1.1; SSHS.CVC.1.2", "the earliest forms of government, and governmental power and role"],
    ["ca-g9-rights", "adopt", "SSHS.CVC.3.4", "civil rights and civil liberties"],
    ["ca-g9-three-branches", "adopt", "SSHS.CVC.4.1; SSHS.CVC.4.2; SSHS.CVC.4.3", "checks and balances, and the roles and powers of the legislative and executive branches"],
    ["ca-g9-lawmaking", "adopt", "SSHS.CVC.4.2", "the role and powers of the legislative branch"],
    ["ca-g9-supreme-court", "adopt", "SSHS.CVC.4.4", "the role and powers of the judicial branch"],
    ["ca-g9-citizens-and-society", "adopt", "SSHS.CVC.1.3", "citizenship and the obligations of citizens"],
    ["ca-g9-elections", "adopt", "SSHS.CVC.6.1; SSHS.CVC.6.2", "voting systems, and primary and general elections"],
    ["ca-g9-civic-action", "adopt", "SSHS.CVC.5.4; SSHS.CVC.5.5", "the participation of citizens, and tactics to influence politics"],
    ["pa-g9-foreign-policy", "adopt", "SSHS.CVC.7.2; SSHS.CVC.8.2", "historical forms of dissent and protest, and the role the United States plays in securing human rights"],
  ],
};
