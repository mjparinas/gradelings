import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { timelineUnit, type Dated } from "./kit";

// Montana Grade 8 social studies: how Montana changed from the fur trade to today and how that history shapes the
// present (SS.H.6-8.5), how events and policies since European contact affected American Indian and settler societies
// in Montana (SS.H.6-8.3), and the 1972 Montana Constitution and its key principles (SS.CG.6-8.2), with a timeline.

const MONTANA_STORY: Q[] = [
  ["Horses reached the Plains Nations of Montana in the 1700s and changed…", "how they hunted bison and traveled", ["the language they spoke", "where the rivers flowed"], "Horses spread north from Spanish colonies."],
  ["In 1837, a smallpox epidemic carried up the Missouri by steamboat…", "killed many Blackfeet, Assiniboine and other people", ["made settlers leave Montana", "ended the fur trade at once"], "Native people had no immunity to the disease."],
  ["St. Mary's Mission, founded in the Bitterroot Valley in 1841, was started by…", "Jesuit missionaries", ["gold miners", "railroad workers"], "Salish people had asked for the 'Black Robes' to come."],
  ["In January 1870, US soldiers attacked Heavy Runner's peaceful Piikani camp on the Marias River. This is called the…", "Marias Massacre", ["Battle of the Greasy Grass", "Hard Winter"], "Most of those killed were women, children and elders."],
  ["During the Starvation Winter of 1883–84, many Blackfeet died because…", "the bison were gone and promised food did not arrive", ["the rivers flooded", "the railroad brought too much food"], "The government failed to send enough rations."],
  ["The copper kings, William A. Clark, Marcus Daly and F. Augustus Heinze, fought for control of…", "the mines of Butte", ["the fur trade", "Glacier National Park"], "Copper made Butte one of the richest places on Earth."],
  ["The Anaconda Copper Mining Company was so powerful in Montana that people called it…", "the Company", ["the Railroad", "the Ranch"], "It owned mines, forests and most daily newspapers."],
  ["William A. Clark's bribing of legislators to win a US Senate seat helped build support for…", "letting voters elect senators directly", ["ending statehood", "closing the mines"], "The 17th Amendment was ratified in 1913."],
  ["Montana women won the right to vote in…", "1914", ["1776", "1970"], "That was six years before the 19th Amendment."],
  ["Jeannette Rankin voted against the United States entering…", "both World War I and World War II", ["the Civil War", "no war ever"], "She was the only member of Congress to vote against war in 1941."],
  ["In 1917, a fire in Butte's Granite Mountain and Speculator mines…", "killed 168 miners", ["closed all US mines", "started the Gold Rush"], "It is the worst hard-rock mining disaster in US history."],
  ["The Berkeley Pit in Butte is now…", "a huge pit lake of acidic, metal-laden water", ["a ski area", "a national park"], "Open-pit copper mining there stopped in 1982."],
  ["Mike Mansfield of Montana was the longest-serving…", "Senate Majority Leader", ["Chief Justice", "President"], "He led the Senate from 1961 to 1977."],
  ["Montana's 1972 constitution was written by…", "100 elected citizen delegates", ["the US Congress", "the governor alone"], "The convention met in Helena in 1972."],
  ["Montana's 1972 constitution gives every person the right to a…", "clean and healthful environment", ["free college degree", "job for life"], "It is in Article II, the Declaration of Rights."],
  ["Article X of Montana's constitution commits the state to…", "preserve the cultural integrity of American Indians in education", ["teach only state history", "close tribal colleges"], "This led to Indian Education for All."],
  ["Montana's constitution protects a right to privacy that…", "can't be infringed without a compelling state interest", ["applies only to the governor", "was removed in 2000"], "Montana's privacy right is stronger than the US Constitution's."],
  ["Montana's constitution says citizens have a right to examine government documents and observe meetings. This is the…", "right to know", ["right to bear arms", "right to vote"], "It keeps state government open."],
  ["The 1972 constitution replaced the constitution Montana had used since…", "1889", ["1776", "1950"], "Delegates wanted a more modern, open government.", true],
  ["Why did many Montanans want a new constitution in 1972?", "the old one gave too much power to mining companies and limited citizens", ["Montana had no constitution", "Congress ordered it"], "Reformers wanted a government more answerable to citizens.", true],
  ["How did the fur trade affect Tribal Nations in the 1800s?", "it brought new goods and also disease and conflict", ["it had no effect", "it ended all hunting"], "Contact changed both societies.", true],
  ["How did the end of the bison change life for Plains Nations?", "it took away food and forced dependence on government rations", ["it made hunting easier", "it brought more bison to Canada"], "Commercial hunters killed millions of bison for their hides.", true],
  ["How did Butte's mining history shape Montana today?", "it left jobs, strong unions and a costly environmental cleanup", ["it left no traces", "it made Butte a farm town"], "History affects the present.", true],
  ["Montana's Indian Education for All Act became law in…", "1999", ["1889", "1950"], "The legislature first funded it in 2005.", true],
  ["How has Montana's economy changed since the copper days?", "health care, tourism and services now employ more people than mining", ["mining now employs everyone", "farms have disappeared"], "Montana's work has shifted over time.", true],
  ["In 2015, the Confederated Salish and Kootenai Tribes bought a major dam on the Flathead River and renamed it…", "Séliš Ksanka Qlispé Dam", ["Fort Peck Dam", "Hoover Dam"], "It was the first such dam owned by a Tribal Nation.", true],
];

const EVENTS: readonly Dated[] = [
  ["Smallpox sweeps the upper Missouri", 1837],
  ["St. Mary's Mission is founded in the Bitterroot Valley", 1841],
  ["The Hellgate Treaty is signed", 1855],
  ["Gold is found at Grasshopper Creek", 1862],
  ["Montana Territory is created", 1864],
  ["The Marias Massacre", 1870],
  ["The Battle of the Little Bighorn", 1876],
  ["The Blackfeet Starvation Winter begins", 1883],
  ["Montana becomes the 41st state", 1889],
  ["The Salish are forced from the Bitterroot Valley", 1891],
  ["William A. Clark resigns his US Senate seat over bribery", 1900],
  ["Montana women win the right to vote", 1914],
  ["Jeannette Rankin is elected to Congress", 1916],
  ["The Speculator Mine fire in Butte", 1917],
  ["Fort Peck Dam is finished", 1940],
  ["The Anaconda Company sells its newspapers", 1959],
  ["Mike Mansfield becomes Senate Majority Leader", 1961],
  ["Montana adopts its new constitution", 1972],
  ["Mining in the Berkeley Pit stops", 1982],
  ["The Indian Education for All Act is passed", 1999],
  ["The Little Shell Chippewa Tribe is recognized", 2019],
];

const TIMELINE_ITEMS: Q[] = [
  ["How many years before the 19th Amendment (1920) did Montana women win the vote?", "6", ["4", "16"], "1920 − 1914 = 6."],
  ["How many years passed between the 1972 constitution and the Indian Education for All Act?", "27", ["17", "37"], "1999 − 1972 = 27."],
  ["Which came first, the Marias Massacre or the Battle of the Little Bighorn?", "the Marias Massacre", ["the Battle of the Little Bighorn", "they happened the same year"], "1870 comes before 1876."],
  ["How many years did the Little Shell Chippewa wait between statehood and their recognition?", "130", ["100", "150"], "2019 − 1889 = 130.", true],
];

export const SOCIAL_8: Unit[] = [
  bankUnit({
    id: "mt-g8-montana-story",
    title: "Montana's Story",
    emoji: "⛏️",
    blurb: "Contact, copper kings and the 1972 constitution",
    parentNote:
      "How contact, disease, the fur trade, the loss of the bison and government policy affected Montana's Tribal Nations; the copper kings and the Anaconda Company; women's suffrage, Jeannette Rankin and Mike Mansfield; and the 1972 Montana Constitution with its rights to a clean environment, privacy and open government and its commitment to Indian education.",
    standards: ["SS.H.6-8.5; SS.H.6-8.3; SS.CG.6-8.2", "how Montana changed over time, how events since contact affected American Indian and European societies, and the Montana Constitution"],
    items: MONTANA_STORY,
  }),
  timelineUnit({
    id: "mt-g8-montana-timeline",
    title: "Montana from Contact to Today",
    emoji: "📜",
    blurb: "Put Montana's history in order",
    parentNote:
      "Ordering events in Montana history from the smallpox epidemic of 1837 to the Little Shell recognition in 2019 (treaties, statehood, the copper era, suffrage, the 1972 constitution) and working out how far apart they are.",
    standards: ["SS.H.6-8.5; SS.H.6-8.2", "how Montana changed over time, and how historical events relate to one another"],
    events: EVENTS,
    items: TIMELINE_ITEMS,
  }),
];
