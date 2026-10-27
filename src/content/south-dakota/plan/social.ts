import type { Entry } from "../kit";

// South Dakota social studies: the units South Dakota uses from other frameworks, per grade ("<grade>/social"). The
// South Dakota Social Studies Standards (adopted by the Board of Education Standards on April 17, 2023) number each
// standard by grade and number, "4.SS.5" ("K.SS.2" in kindergarten), and the high school courses by course: "9-12.C.6"
// (United States Government/American Civics), "9-12.USH.3", "9-12.WH.2", "9-12.WG.1" and "9-12.E.3". The standards
// move through history in order, with world and American history in the same grade: kindergarten is an introduction to
// America; Grade 1 is the world to 315 and America from 1492 to 1787; Grade 2 is the world from 315 to 1492 and
// America from 1787 to 1908; Grade 3 is the world to 60 BCE and America from 1492 to 1763; Grade 4 is the world from
// 60 BCE to 1300 and America from 1763 to 1820; Grade 5 is the world from 1300 to 1648 and America from 1820 to 1908;
// Grade 6 is influential ideas in history and civics to 1815; Grade 7 is America from 1492 to 1877; and Grade 8 is
// America from 1877 to 2008. The standards don't place high school courses in grades; Grade 9 here is United States
// Government/American Civics.
//
// Only general units free of Canadian content are adopted, and never another state's units about its Tribes. South
// Dakota's own units (where we live, South Dakota on the map, the Oceti Sakowin, the ancient world and the founding for
// young learners, the Middle Ages, the growing nation, South Dakota's land, Lewis and Clark on the Missouri, Dakota
// Territory and statehood, South Dakota in the 1900s and governing South Dakota) are in ../units.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  "k/social": [
    ["needs-and-wants", "share", "K.SS.1", "words about work, such as food, clothing, home, need and want"],
    ["families", "share", "K.SS.1", "homes, clothing and family life in different times"],
    ["places-near-me", "adopt", "K.SS.1", "maps of the classroom and the places near school"],
    ["fair-and-kind", "adopt", "K.SS.1", "treating others with respect for the equal dignity of each person"],
    ["mb-k-jobs-and-rules", "adopt", "K.SS.1", "examples of rules and laws, and jobs at home and school"],
    ["or-k-money-and-work", "adopt", "K.SS.1", "words about work, such as buy, sell, serve and money"],
    ["ca-k-calendar", "adopt", "K.SS.1", "using a calendar for days, weeks and months, and today, yesterday and tomorrow"],
    ["mb-k-yesterday-today-tomorrow", "adopt", "K.SS.1", "words for time and order, such as first, next, last, long ago and in the future"],
    ["ca-k-good-citizens", "adopt", "K.SS.1; K.SS.3", "virtues like honesty and hard work, and the character of figures from American history"],
    ["ca-k-american-stories", "adopt", "K.SS.3", "stories about figures from American history"],
    ["ny-k-symbols-holidays", "adopt", "K.SS.4", "symbols of America, such as the flag, the bald eagle and national holidays"],
  ],
  "1/social": [
    ["maps", "share", "1.SS.1", "north, south, east and west on a map and a globe"],
    ["ca-g1-continents-oceans", "adopt", "1.SS.2", "the continents and oceans on a map"],
    ["ca-g1-long-ago", "adopt", "1.SS.3", "comparing travel, school and daily life today with earlier times"],
    ["pe-goods-and-services-1", "adopt", "1.SS.1", "goods and services that people buy, sell and use"],
    ["wa-g1-earn-save-share", "adopt", "1.SS.1", "trade-offs when working, buying, selling and saving"],
    ["ny-g1-rules-and-government", "adopt", "1.SS.1; 1.SS.7", "ways a group can make decisions, and why rules and laws help people live freely and in peace"],
    ["ny-g1-american-symbols", "adopt", "1.SS.11", "the meaning of the American flag and other symbols"],
    ["ga-g1-american-heroes", "adopt", "1.SS.11", "Benjamin Franklin, Thomas Jefferson and other people who shaped America"],
  ],
  "2/social": [
    ["ca-g2-reading-maps", "adopt", "2.SS.1", "map keys, directions and grids"],
    ["or-g2-world-maps", "adopt", "2.SS.2", "continents, oceans and countries on maps of the world"],
    ["fl-g2-citizens-documents", "adopt", "2.SS.5; 2.SS.6", "the Constitution and Bill of Rights, laws and American citizenship"],
    ["caring-citizens", "share", "2.SS.6", "the rights and responsibilities of citizens"],
    ["ca-g2-citizens-and-leaders", "adopt", "2.SS.6", "voting, leaders and taking part in civic life"],
    ["al-g2-founders", "adopt", "2.SS.7; 2.SS.12", "the founders, and Americans who made a difference"],
    ["fl-g2-immigration", "adopt", "2.SS.12", "immigration through Ellis Island at the beginning of the 20th century"],
  ],
  "3/social": [
    ["ny-g3-globes-and-maps", "adopt", "3.SS.1; 3.SS.2", "latitude, longitude, hemispheres and world maps"],
    ["wa-g6-mesopotamia-egypt", "adopt", "3.SS.3", "Mesopotamia and ancient Egypt"],
    ["wa-g6-india-china", "adopt", "3.SS.3", "ancient India and ancient China"],
    ["ca-g6-greece-rome", "adopt", "3.SS.4", "ancient Greece and the Roman Republic"],
    ["ga-g3-explorers", "adopt", "3.SS.5; 3.SS.6", "the voyages of Christopher Columbus and European exploration"],
    ["ca-g5-thirteen-colonies", "adopt", "3.SS.7", "the New England, Middle and Southern colonies"],
    ["ca-g5-colonial-economy", "adopt", "3.SS.7", "work, trade and resources in colonial America"],
  ],
  "4/social": [
    ["ca-g6-roman-empire", "adopt", "4.SS.3", "the Roman Empire from Augustus to its legacies"],
    ["ca-g7-rome-byzantium", "adopt", "4.SS.3; 4.SS.4", "the fall of Rome in the West and the Byzantine Empire"],
    ["medieval-europe", "adopt", "4.SS.4; 4.SS.5", "feudalism, towns and the Black Death in the Middle Ages"],
    ["ny-g9-crusades-plague", "adopt", "4.SS.5", "the Crusades and the Black Death"],
    ["ca-g5-road-to-revolution", "adopt", "4.SS.6", "taxes, protests and the events leading to the American Revolution"],
    ["ca-g5-revolution", "adopt", "4.SS.7; 4.SS.8", "declaring independence and the War of Independence"],
    ["ca-g5-constitution", "adopt", "4.SS.9", "the Articles of Confederation, the Constitution and the Bill of Rights"],
    ["wa-g8-bill-of-rights", "adopt", "4.SS.9; 4.SS.10", "the Bill of Rights and the rights and duties of citizens"],
  ],
  "5/social": [
    ["ga-g6-europe", "adopt", "5.SS.2", "the countries, rivers and mountains of Europe"],
    ["renaissance-and-reformation", "adopt", "5.SS.3; 5.SS.4", "the Renaissance and the Reformation"],
    ["ca-g7-exploration-and-empire", "adopt", "5.SS.3", "the Age of Exploration"],
    ["ca-g5-westward", "adopt", "5.SS.5; 5.SS.6", "moving west and new states"],
    ["ca-g5-slavery-and-resistance", "adopt", "5.SS.7", "slavery and the struggle for freedom before the Civil War"],
    ["ca-g8-civil-war", "adopt", "5.SS.8", "the American Civil War"],
    ["or-g8-reconstruction", "adopt", "5.SS.8", "Reconstruction"],
    ["ca-g8-industrial-america", "adopt", "5.SS.9", "inventions, railroads and industry in the Gilded Age"],
    ["ny-g8-city-immigrants", "adopt", "5.SS.9; 5.SS.10", "immigrants and growing cities around the beginning of the 20th century"],
  ],
  "6/social": [
    ["ga-g7-southern-eastern-asia", "adopt", "6.SS.3", "the geography of southern and eastern Asia"],
    ["wa-g6-mesopotamia-egypt", "adopt", "6.SS.4", "influential ideas from Mesopotamia and Egypt, such as written law"],
    ["ca-g6-hebrews-kush", "adopt", "6.SS.4", "influential ideas from the ancient Hebrews"],
    ["wa-g6-greece-rome", "adopt", "6.SS.4; 6.SS.5", "democracy in Athens, the Roman Republic and Roman law"],
    ["ca-g6-roman-empire", "adopt", "6.SS.5", "the Roman Empire and its legacies"],
    ["medieval-europe", "adopt", "6.SS.6", "influential ideas from the Middle Ages"],
    ["renaissance-and-reformation", "adopt", "6.SS.7", "influential ideas from the Late Middle Ages and the Reformation"],
    ["ny-g9-absolutism-enlightenment", "adopt", "6.SS.8", "the Scientific Revolution and the Enlightenment"],
    ["or-g7-age-of-revolutions", "adopt", "6.SS.8", "the American and French Revolutions"],
  ],
  "7/social": [
    ["ca-g7-exploration-and-empire", "adopt", "7.SS.4", "European exploration and settlement of North America"],
    ["ca-g5-thirteen-colonies", "adopt", "7.SS.4; 7.SS.5", "the British colonies and colonial America"],
    ["ca-g5-revolution", "adopt", "7.SS.6", "the American Revolution"],
    ["ca-g8-founding-ideals", "adopt", "7.SS.7; 7.SS.8", "the Declaration of Independence and the principles of the Constitution"],
    ["ca-g8-constitution-at-work", "adopt", "7.SS.9", "the structure and function of the Constitution"],
    ["ca-g9-three-branches", "adopt", "7.SS.9", "the three branches of government"],
    ["ca-g8-westward", "adopt", "7.SS.10; 7.SS.11", "the Louisiana Purchase and westward expansion to the Mexican-American War"],
    ["ca-g8-civil-war", "adopt", "7.SS.12; 7.SS.13", "the sectional divide over slavery and the Civil War"],
    ["or-g8-reconstruction", "adopt", "7.SS.13", "Reconstruction"],
  ],
  "8/social": [
    ["ca-g8-industrial-america", "adopt", "8.SS.2", "industry, railroads and inventions in the Gilded Age"],
    ["ny-g8-workers-progressives", "adopt", "8.SS.3", "workers and Progressive reformers at the turn of the 20th century"],
    ["ny-g8-world-war-i", "adopt", "8.SS.4", "World War I"],
    ["ny-g8-roaring-twenties", "adopt", "8.SS.4", "the Roaring Twenties"],
    ["ny-g8-great-depression", "adopt", "8.SS.5", "the Great Depression and the New Deal"],
    ["ny-g8-world-war-ii", "adopt", "8.SS.5", "World War II"],
    ["ny-g8-postwar-america", "adopt", "8.SS.6", "post-war America"],
    ["ny-g8-civil-rights", "adopt", "8.SS.6", "the Civil Rights Movement"],
    ["ny-g8-great-society", "adopt", "8.SS.7", "America in the years of the Vietnam War"],
    ["ny-g8-new-era", "adopt", "8.SS.8", "America at the turn of the 21st century"],
  ],
  "9/social": [
    ["ca-g9-foundations", "adopt", "9-12.C.3; 9-12.C.4", "the ideas from world history that shaped the founding, and the Declaration of Independence"],
    ["ca-g9-three-branches", "adopt", "9-12.C.5; 9-12.C.6", "separation of powers, checks and balances and the three branches"],
    ["ca-g9-rights", "adopt", "9-12.C.7", "the Bill of Rights"],
    ["ca-g9-supreme-court", "adopt", "9-12.C.6; 9-12.C.10", "the Supreme Court and landmark civil rights cases"],
    ["ca-g9-elections", "adopt", "9-12.C.16", "elections, parties and politics in America"],
    ["ca-g9-citizens-and-society", "adopt", "9-12.C.15", "the rights and duties of citizenship in America"],
    ["ca-g9-dictatorship-democracy", "adopt", "9-12.C.18", "self-government compared with other regimes"],
    ["ca-g9-forms-of-government", "adopt", "9-12.C.18", "forms of government in history and today"],
    ["ca-g9-lawmaking", "adopt", "9-12.C.6; 9-12.C.12", "how Congress makes laws, and the governing institutions of the United States"],
    ["ca-g9-media", "adopt", "9-12.C.16", "the news media and politics in America"],
    ["pa-g9-foreign-policy", "adopt", "9-12.C.14", "American foreign policy: diplomacy, treaties, alliances and the president's and Congress's roles"],
  ],
};
