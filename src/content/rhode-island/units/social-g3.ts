import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Rhode Island Grade 3 social studies, living and working together in the regions of the United States: the Northeast,
// Rhode Island's own region, its geography, states, peoples over time and life today (SS3.2.1 to SS3.2.4), and the
// states and territories and the national government (SS3.1.3, SS3.1.4). The other regions are practised with adopted
// units (see ../plan/social.ts).

const NORTHEAST: Q[] = [
  ["Rhode Island is in which region of the United States?", "the Northeast", ["the Southwest", "the West", "the Midwest"], "It is in the northeast corner of the country."],
  ["The six states of New England are Maine, New Hampshire, Vermont, Massachusetts, Connecticut and…", "Rhode Island", ["Ohio", "Texas", "Oregon"], "New England is part of the Northeast."],
  ["Which ocean is along the coast of the Northeast?", "the Atlantic Ocean", ["the Pacific Ocean", "the Arctic Ocean", "the Indian Ocean"], "It is on the east coast."],
  ["The old, rounded mountains that run through the Northeast are the…", "Appalachian Mountains", ["Rocky Mountains", "Andes", "Himalayas"], "They are much older than the Rockies."],
  ["The largest city in the United States, in the Northeast, is…", "New York City", ["Providence", "Phoenix", "Denver"], "More than eight million people live there."],
  ["The highest peak in the Northeast, famous for strong winds, is Mount…", "Washington", ["Everest", "Rushmore", "Fuji"], "It is in New Hampshire."],
  ["Vermont is famous for a sweet syrup made from the sap of…", "maple trees", ["palm trees", "cactus", "seaweed"], "Sap is collected in early spring."],
  ["Fishing boats along the Northeast coast catch…", "lobster, clams and fish", ["bananas", "oranges", "cotton"], "The ocean is a big resource here."],
  ["Winters in most of the Northeast are…", "cold and snowy", ["hot and dry", "warm all year", "rainless"], "Snow falls in most of the region."],
  ["In the fall, many Northeast trees turn…", "red, orange and yellow", ["blue", "white", "black"], "People visit to see the colorful leaves."],
  ["Long before Europeans came, the Northeast was home to many Native nations, including the Wampanoag, the Narragansett and the…", "Haudenosaunee", ["Aztec", "Inca", "Maya"], "Many Native nations live in the Northeast today."],
  ["In 1620, the Pilgrims sailed on the Mayflower and started a colony at…", "Plymouth", ["Jamestown", "Santa Fe", "San Diego"], "Plymouth is in today's Massachusetts."],
  ["The Dutch built a town called New Amsterdam, which later became…", "New York City", ["Boston", "Providence", "Philadelphia"], "The English took it over in 1664."],
  ["Many of the first factories in the United States were built in the Northeast because fast rivers could…", "power the machines", ["make it warm", "grow cotton", "make gold"], "Water wheels turned the machines."],
  ["Philadelphia, in the Northeast, is where the… was signed.", "Declaration of Independence", ["Louisiana Purchase", "Treaty of Paris", "Emancipation Proclamation"], "It was signed in 1776."],
  ["The chain of big cities from Boston to Washington, D.C., is sometimes called a…", "megalopolis", ["desert", "plateau", "glacier"], "The cities run into each other."],
  ["Many people visit the Northeast to see its historic sites, beaches and…", "fall leaves", ["volcanoes", "deserts", "glaciers"], "Tourism is a big business here."],
  ["Which Northeast city has the oldest public park in the country, Boston Common?", "Boston", ["Providence", "Hartford", "Albany"], "Boston is the capital of Massachusetts."],
  ["Niagara Falls, a huge waterfall, is on the border between the Northeast and…", "Canada", ["Mexico", "Alaska", "Cuba"], "The falls are in New York.", true],
  ["Many people in the Northeast work in schools, hospitals, banks and offices. These jobs give…", "services", ["goods", "crops", "minerals"], "Services are work done for others.", true],
  ["The Northeast has many big cities and many people close together. Its population is…", "dense", ["empty", "frozen", "underground"], "Dense means crowded.", true],
  ["Why did many immigrants first arrive in the Northeast?", "ships from Europe landed at its ports", ["it had the warmest weather", "it had no cities", "it was closest to Asia"], "Ellis Island is in New York Harbor.", true],
  ["The rocky soil of New England made farming hard, so many people turned to…", "fishing, shipping and trade", ["growing rice", "mining gold", "herding camels"], "The sea gave other ways to earn a living.", true],
  ["How is the Northeast today different from 200 years ago?", "more people live in cities", ["it has no cities", "no one lives there", "it is now a desert"], "Cities grew as factories and jobs grew.", true],
  ["Rhode Island's neighbors are Massachusetts and…", "Connecticut", ["New York", "Vermont", "Maine"], "Connecticut is to the west.", true],
];

const STATES: Q[] = [
  ["How many states are in the United States?", "50", ["13", "48", "100"], "There is one star on the flag for each."],
  ["The largest state by area is…", "Alaska", ["Texas", "Rhode Island", "Ohio"], "It is in the far northwest."],
  ["The smallest state by area is…", "Rhode Island", ["Alaska", "Texas", "California"], "That's our state!"],
  ["The state with the most people is…", "California", ["Rhode Island", "Vermont", "Wyoming"], "It is on the Pacific coast."],
  ["The capital of the United States is…", "Washington, D.C.", ["New York City", "Providence", "Chicago"], "The President lives there."],
  ["Washington, D.C., is not a state. It is a…", "federal district", ["county", "island", "country"], "D.C. stands for District of Columbia."],
  ["The capital of Rhode Island is…", "Providence", ["Newport", "Warwick", "Westerly"], "The State House is there."],
  ["The two states not connected to the other 48 are Alaska and…", "Hawaiʻi", ["Florida", "Maine", "Texas"], "Hawaiʻi is a group of islands."],
  ["Puerto Rico and Guam are not states. They are United States…", "territories", ["countries", "cities", "oceans"], "Territories belong to the United States."],
  ["Puerto Rico is an island in the…", "Caribbean Sea", ["Arctic Ocean", "Great Lakes", "Gulf of Alaska"], "It is southeast of Florida."],
  ["People born in Puerto Rico are… citizens.", "United States", ["Spanish", "Canadian", "Mexican"], "Puerto Rico is a US territory."],
  ["The leader of the United States government is the…", "President", ["governor", "mayor", "principal"], "The President works in the White House."],
  ["The part of the national government that makes laws is…", "Congress", ["the Supreme Court", "the White House", "the army"], "Congress meets in the Capitol."],
  ["The highest court in the United States is the…", "Supreme Court", ["town court", "Congress", "school board"], "It decides what the Constitution means."],
  ["The national government has three parts called…", "branches", ["leaves", "roots", "rivers"], "Each branch has its own job."],
  ["The leader of a state government is the…", "governor", ["President", "mayor", "king"], "Rhode Island has a governor too."],
  ["The national government prints money and runs the…", "post office", ["school lunch", "town library", "neighborhood park"], "Mail goes all across the country."],
  ["Which river is the longest in the United States?", "the Missouri River", ["the Blackstone River", "the Hudson River", "the Providence River"], "The Mississippi is close behind."],
  ["The United States is on the continent of…", "North America", ["Europe", "Asia", "Africa"], "Canada and Mexico are on it too."],
  ["The country to the north of the United States is…", "Canada", ["Mexico", "Brazil", "Cuba"], "It is the second-largest country."],
  ["The country to the south of the United States is…", "Mexico", ["Canada", "Peru", "Spain"], "It borders four US states.", true],
  ["Why does every state get two senators, no matter how small?", "so small states have an equal voice in the Senate", ["because big states asked", "because it is the law in Canada", "so the President can choose them"], "In the House, bigger states get more seats.", true],
  ["Rhode Island has two members in the US House of Representatives because…", "seats are shared out by population", ["every state gets two", "it is the oldest state", "the governor picks two"], "States with more people get more seats.", true],
  ["Which is a job of the national government, not a state government?", "making treaties with other countries", ["running town libraries", "picking a school mascot", "fixing a town's sidewalks"], "The nation deals with other countries.", true],
  ["The US Virgin Islands, American Samoa and the Northern Mariana Islands are…", "US territories", ["US states", "countries in Europe", "Canadian provinces"], "There are five territories with people living in them.", true],
];

export const SOCIAL_3: Unit[] = [
  bankUnit({
    id: "ri-g3-northeast",
    title: "The Northeast, Our Region",
    emoji: "🍁",
    blurb: "Land, states, peoples and life in the Northeast",
    parentNote: "The Northeast region, where Rhode Island is: its coast and mountains, its states (including the six New England states), the Native nations who have lived there for thousands of years, the Pilgrims and the Dutch, early factories, and life in its cities and towns today.",
    standards: ["SS3.2.1; SS3.2.2; SS3.2.3; SS3.2.4", "the geography, environment, states, peoples over time and life today in the Northeast"],
    items: NORTHEAST,
  }),
  bankUnit({
    id: "ri-g3-states-and-nation",
    title: "States, Territories & the Nation",
    emoji: "🗺️",
    blurb: "Fifty states, the territories and the national government",
    parentNote: "The fifty states and Washington, D.C., the US territories such as Puerto Rico and Guam, the largest and smallest states, the United States' neighbors, and the national government's three branches and some of its jobs.",
    standards: ["SS3.1.3; SS3.1.4", "states and territories, and the national government"],
    items: STATES,
  }),
];
