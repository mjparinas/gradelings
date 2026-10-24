import type { Entry } from "../kit";

// Georgia social studies: the units Georgia uses from other frameworks, per grade ("<grade>/social"). The Georgia
// Standards of Excellence for social studies are cited by standard and element: history (H), geography (G), civics
// and government (CG) and economics (E), "SS4H1.a", with Kindergarten as "SSK" ("SSKH2.d"). The map and globe skills
// ("SSMGS4") and information processing skills ("SSIPS6") run through every grade. Kindergarten to Grade 2 move from
// families and community to Georgia's historical figures, regions and leaders; Grade 3 is early American Indian
// cultures, exploration and the colonies; Grade 4 is United States history from the Revolution to Reconstruction and
// Grade 5 from 1900 to 2001; Grades 6 and 7 are world geography (Latin America, Europe and Australia; Africa,
// Southwest Asia and Southern and Eastern Asia); Grade 8 is Georgia Studies; Grade 9 is American Government/Civics
// with Personal Financial Literacy. Canada (and Quebec) in Grade 6 is left out. Only general units free of Canadian
// content and other states' places are adopted, never another state's units about its Tribes. Georgia's own units
// (its figures, regions, government and history) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["families", "share", "SSKG1", "the customs and celebrations of different families and communities"],
    ["needs-and-wants", "share", "SSKE4", "making choices because people cannot have everything they want"],
    ["mb-k-jobs-and-rules", "adopt", "SSKE1; SSKCG1.a; SSKCG1.b", "the work people do in a community, and how rules are made and why we follow them"],
    ["ny-k-symbols-holidays", "adopt", "SSKH1; SSKH2", "national holidays and the people they honor, and American symbols such as the flag, the bald eagle and the Statue of Liberty"],
    ["ca-k-calendar", "adopt", "SSKH3.c; SSKH3.d; SSKH3.e", "yesterday, today and tomorrow, first, next and last, and days, weeks, months and years"],
    ["ca-k-good-citizens", "adopt", "SSKCG2", "honesty, courtesy, respect and self-control, the traits of good citizens"],
    ["places-near-me", "adopt", "SSKG2; SSKG2.a", "maps as drawings of places, and land and water features"],
    ["or-k-money-and-work", "adopt", "SSKE2; SSKE3.a; SSKE3.b", "earning income by working, goods and services, and US coins and dollar bills"],
  ],
  "1/social": [
    ["maps", "share", "SS1G2", "finding your city, state, country and continent on a map or globe"],
    ["our-land", "share", "SS1G3.c", "landforms such as mountains, deserts, valleys and coasts"],
    ["my-community", "share", "SS1E1; SS1E3", "the goods people make and the services they provide, and being both producers and consumers"],
    ["or-g2-world-maps", "adopt", "SS1G3.a; SS1G3.b", "the seven continents and five oceans on a map or globe"],
    ["wa-g1-earn-save-share", "adopt", "SS1E4; SS1E2", "earning income, choosing how much to save and spend, and scarcity"],
    ["ca-g1-long-ago", "adopt", "SS1H1.b", "how everyday life long ago was like and unlike everyday life today"],
  ],
  "2/social": [
    ["needs-and-wants", "share", "SS2E1", "scarcity, and the choices and opportunity costs it brings"],
    ["caring-citizens", "share", "SS2CG1", "what government is, and why communities need rules and laws"],
    ["ca-g2-work-and-money", "adopt", "SS2E4; SS2E3", "using money to get goods and services, and the costs and benefits of saving and spending"],
  ],
  "3/social": [
    ["meeting-needs", "share", "SS3G3", "how the land and climate of a place shape the way people live there"],
    ["or-g2-world-maps", "adopt", "SS3G2", "the equator, the prime meridian, and lines of latitude and longitude on a globe"],
    ["ca-g5-thirteen-colonies", "adopt", "SS3H3.a; SS3H3.b; SS3G3.c", "why the New England, Mid-Atlantic and Southern colonies were founded, colonial life, and how geography shaped their economies"],
    ["ny-g3-trade", "adopt", "SS3E3.a; SS3E3.c; SS3E3.d", "trade between producers and consumers, goods made near and far, and the money of other countries"],
  ],
  "4/social": [
    ["wa-g5-road-to-revolution", "adopt", "SS4H1.a", "the events that led to the American Revolution, from the French and Indian War to the Boston Tea Party"],
    ["ca-g5-revolution", "adopt", "SS4H1.b; SS4H1.c; SS4H1.d; SS4G2.a", "the people, battles and Declaration of Independence of the American Revolution"],
    ["ca-g5-constitution", "adopt", "SS4H2.a; SS4H2.b; SS4CG3.a; SS4CG1.c", "the Constitutional Convention, the three branches and their checks and balances, and federalism"],
    ["wa-g8-bill-of-rights", "adopt", "SS4CG2; SS4CG3.b", "the freedoms of the First Amendment and the rights in the Bill of Rights"],
    ["ca-g8-new-nation", "adopt", "SS4H3.a; SS4H3.c", "the War of 1812, the Louisiana Purchase and the Lewis and Clark expedition"],
    ["ca-g5-westward", "adopt", "SS4H3.c; SS4G2.b; SS4E1.a", "westward expansion, the barriers and gateways settlers met, and the choices that led people west"],
    ["ca-g8-divided-nation", "adopt", "SS4H4.a; SS4H5.a; SS4H5.b", "abolitionists, and how slavery and states' rights divided the North and South"],
    ["ca-g8-civil-war", "adopt", "SS4H5.c; SS4H5.d; SS4H5.e", "the major battles and leaders of the Civil War and its effects on the North and South"],
    ["or-g8-reconstruction", "adopt", "SS4H6.a; SS4H6.c; SS4H6.d", "the 13th, 14th and 15th Amendments, sharecropping, and Jim Crow laws"],
    ["wa-g5-us-geography", "adopt", "SS4G1.a", "the physical features of the United States, from the Atlantic Coastal Plain to the Rocky Mountains"],
    ["or-g5-earn-and-save", "adopt", "SS4E2", "a personal budget of income, spending and saving"],
  ],
  "5/social": [
    ["ny-g8-world-war-i", "adopt", "SS5H2.a", "why the United States joined World War I and what it did in the war"],
    ["ny-g8-roaring-twenties", "adopt", "SS5H2.b", "the Jazz Age, the Harlem Renaissance and other changes of the 1920s"],
    ["ny-g8-great-depression", "adopt", "SS5H3.a; SS5H3.b", "the Stock Market Crash, the Dust Bowl and the New Deal"],
    ["ny-g8-world-war-ii", "adopt", "SS5H4.a; SS5H4.b; SS5H4.e; SS5H4.f", "the road to World War II, its major events, the home front and the founding of the United Nations"],
    ["ny-g8-cold-war", "adopt", "SS5H5.a; SS5H5.b; SS5H5.d; SS5H6.d", "the Iron Curtain, containment from the Berlin airlift to Vietnam, and the space race"],
    ["ny-g8-civil-rights", "adopt", "SS5H6.a; SS5H6.b", "Jim Crow laws and the key events and people of the civil rights movement"],
    ["ny-g8-new-era", "adopt", "SS5H7.a; SS5H7.b", "the end of the Soviet Union and the September 11, 2001 attacks"],
    ["or-g5-earn-and-save", "adopt", "SS5E4; SS5E3.b", "a personal budget, and earning income by selling one's labor"],
  ],
  "6/social": [
    ["tx-g6-economies", "adopt", "SS6E1.a; SS6E1.b; SS6E7.a", "traditional, command and market economies, and mixed economies on a continuum"],
    ["tx-g6-governments", "adopt", "SS6CG1.a; SS6CG1.b", "citizen participation in autocratic and democratic governments, and parliamentary and presidential democracies"],
    ["ny-g5-countries-capitals", "adopt", "SS6G1.b", "the countries and capitals of Latin America"],
    ["ny-g5-columbian-exchange", "adopt", "SS6H1.a; SS6H1.b", "the influence of African slavery and of the Spanish and Portuguese on Latin America"],
    ["al-g9-interwar", "adopt", "SS6H3.a", "the aftermath of World War I in Europe: communism, the Treaty of Versailles and the rise of Nazism"],
    ["al-g9-holocaust", "adopt", "SS6H3.b", "the rise of Nazism, its propaganda, and the Holocaust"],
    ["or-g5-earn-and-save", "adopt", "SS6E13.a; SS6E13.b; SS6E13.c", "income from work, budgets, and the reasons for saving"],
  ],
  "7/social": [
    ["ny-g6-eastern-hemisphere", "adopt", "SS7G1.a; SS7G5.a; SS7G9.a", "the physical features of Africa, Southwest Asia and Southern and Eastern Asia"],
    ["world-beliefs", "share", "SS7G8.c; SS7G12.b", "the major religions and belief systems of Southwest Asia and of Southern and Eastern Asia"],
    ["al-g9-decolonization", "adopt", "SS7H1.b; SS7H1.c; SS7H3.a", "independence movements in Africa and India, and the end of apartheid"],
    ["mn-g8-forms-of-government", "adopt", "SS7CG1.a; SS7CG1.b", "citizen participation in autocratic and democratic governments, and parliamentary and presidential systems"],
    ["or-g5-earn-and-save", "adopt", "SS7E10.a; SS7E10.b; SS7E10.c", "income, budgets, and the reasons for saving"],
  ],
  "8/social": [
    ["mb-evidence-8", "adopt", "SSIPS6; SSIPS4", "primary and secondary sources, and telling fact from opinion"],
    ["maps-graphs-8", "adopt", "SSMGS8; SSIPS7", "drawing conclusions from maps, timelines, charts and tables"],
  ],
  "9/social": [
    ["ca-g9-forms-of-government", "adopt", "SSCG1.a; SSCG1.b; SSCG1.d", "unitary, confederal and federal systems, autocracy, oligarchy and democracy, and direct and representative democracy"],
    ["ca-g9-foundations", "adopt", "SSCG2.a; SSCG2.b; SSCG2.c", "the Magna Carta, Hobbes, Locke and Montesquieu, and their influence on the Declaration and Constitution"],
    ["ca-g9-three-branches", "adopt", "SSCG3.c; SSCG4.a; SSCG4.b; SSCG8.c", "the principles of the Constitution, the powers of the three branches and checks and balances"],
    ["ca-g9-rights", "adopt", "SSCG6; SSCG7.a; SSCG7.b", "the Bill of Rights, civil liberties and civil rights"],
    ["ca-g9-supreme-court", "adopt", "SSCG13.c; SSCG13.d; SSCG13.e", "judicial review, how the Supreme Court decides cases, and judicial activism and restraint"],
    ["ca-g9-civic-action", "adopt", "SSCG16.b", "voluntary and responsible participation in the political process"],
    ["ca-g9-dictatorship-democracy", "adopt", "SSCG18.a; SSCG18.d; SSCG18.e", "totalitarian systems, how they conflict with American democracy, and why they rise and fall"],
  ],
};
