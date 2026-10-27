import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// South Dakota Grade 4 social studies: South Dakota's regions and historic cities and the features of the West
// (4.SS.2), and the Corps of Discovery on the Missouri River, with the winter counts in which the Lakota recorded these
// years (4.SS.11).

const REGIONS: Q[] = [
  ["The great river that Lewis and Clark followed west, flowing across South Dakota, is the…", "Missouri River", ["Columbia River", "Hudson River", "Ohio River"], "It is the longest river in the United States."],
  ["The tall mountains that run north to south across the western United States are the…", "Rocky Mountains", ["Black Hills", "Appalachian Mountains", "Badlands"], "They are far higher than the Black Hills."],
  ["The flat, grassy land between the Mississippi River and the Rocky Mountains is the…", "Great Plains", ["Grand Canyon", "Coteau des Prairies", "Missouri Plateau"], "Bison once roamed it by the millions."],
  ["A huge, deep canyon carved by the Colorado River is the…", "Grand Canyon", ["Spearfish Canyon", "Badlands", "James River Valley"], "It is about a mile deep."],
  ["The river that Lewis and Clark followed to reach the Pacific Ocean is the…", "Columbia River", ["Missouri River", "James River", "Big Sioux River"], "It flows into the Pacific."],
  ["The city where Lewis and Clark began their journey up the Missouri was near…", "St. Louis", ["Detroit", "Pierre", "Sioux Falls"], "It is where the Missouri meets the Mississippi."],
  ["Which city on the Missouri River in Nebraska was a starting point for settlers heading west?", "Omaha", ["Chicago", "Detroit", "Cincinnati"], "It is just south of South Dakota."],
  ["A high, rolling plateau between the Big Sioux and James Rivers in eastern South Dakota is the…", "Coteau des Prairies", ["Black Hills", "Badlands", "Missouri Plateau"], "Its name is French for hills of the prairie."],
  ["The broad, flat valley between the Coteau des Prairies and the Missouri River is the…", "James River Valley", ["Spearfish Canyon", "Grand Canyon", "Black Hills"], "Glaciers flattened it long ago."],
  ["West of the Missouri River, most of South Dakota is high, dry land called the…", "Missouri Plateau", ["Prairie Plains", "Minnesota Valley Lowland", "Great Lakes"], "Ranches spread across this land."],
  ["South Dakota's first capital, when it was part of Dakota Territory, was…", "Yankton", ["Deadwood", "Aberdeen", "Rapid City"], "It sits on the Missouri River in the southeast."],
  ["A gold rush town in the northern Black Hills is…", "Deadwood", ["Yankton", "Aberdeen", "Sioux Falls"], "Gold was found nearby in the 1870s."],
  ["A city in northeastern South Dakota that grew up around the railroad is…", "Aberdeen", ["Deadwood", "Rapid City", "Yankton"], "It is the state's third-largest city."],
  ["East of the Missouri River, most of South Dakota is farmland called the…", "Prairie Plains", ["Missouri Plateau", "Black Hills", "Badlands"], "Corn and soybeans grow well there."],
  ["Water north of the Traverse Gap flows north. Water south of it flows south. A line like this is a…", "continental divide", ["coastline", "canyon", "butte"], "It divides which way rivers flow.", true],
  ["The low land in the far northeast corner of South Dakota, along the border with Minnesota, is the…", "Minnesota Valley Lowland", ["Missouri Plateau", "Black Hills", "James River Valley"], "Big Stone Lake is there.", true],
  ["Which city was a fur trading and steamboat stop in the 1800s and is now the state capital?", "Pierre", ["Sioux Falls", "Aberdeen", "Deadwood"], "It is across the river from Fort Pierre.", true],
  ["Why did many South Dakota towns grow up along rivers and railroads?", "they made it easier to travel and ship goods", ["the land there had no water", "rivers kept people away", "railroads were only for fun"], "Goods moved by boat and train.", true],
  ["Chicago, on Lake Michigan, grew during westward expansion as a center for…", "railroads and trade", ["gold mining", "ocean shipping", "cattle drives in the mountains"], "Many rail lines met there.", true],
  ["Why do ranches cover most of West River while farms cover most of East River?", "West River is drier, so grass for cattle grows better than crops", ["West River has more rain", "East River has mountains", "cattle cannot live in the east"], "Rain decreases as you go west.", true],
  ["Detroit and Cincinnati grew because they were on…", "lakes and rivers that carried goods", ["mountain tops", "deserts", "the Pacific coast"], "Water routes connected them to the West.", true],
  ["The Black Hills rise from the plains like an island of…", "pine forest", ["sand dunes", "ice", "palm trees"], "Rain and snow fall more on high ground.", true],
  ["Glaciers covered eastern South Dakota but not western South Dakota. That is one reason East River is…", "flatter, with many lakes", ["full of tall mountains", "a desert", "covered with canyons"], "Glaciers flattened the land and left lakes behind.", true],
  ["A trip from Sioux Falls to Rapid City crosses the Missouri River. Which direction is it?", "west", ["east", "north", "south"], "Rapid City is near the Black Hills.", true],
];

const CORPS: Q[] = [
  ["In 1803, President Jefferson bought the Louisiana Territory from…", "France", ["Spain", "Great Britain", "Mexico"], "Napoleon sold it to pay for wars."],
  ["Jefferson sent Meriwether Lewis and William Clark to…", "explore the Louisiana Territory", ["fight Britain", "build a capital", "find gold in the Black Hills"], "Their group was the Corps of Discovery."],
  ["The Corps of Discovery traveled up the Missouri River in big boats called…", "keelboats and pirogues", ["steamships", "submarines", "canoes with motors"], "They rowed, poled and pulled them upstream."],
  ["In August 1804, near today's Yankton, the Corps held a council with the…", "Yankton Sioux", ["Wampanoag", "Cherokee", "Aztec"], "They met at Calumet Bluff."],
  ["In September 1804, near the Bad River, the Corps had a tense meeting with leaders of the…", "Lakota", ["Pilgrims", "British", "Romans"], "The Lakota controlled travel on that part of the river."],
  ["Farther up the river, the Corps visited earth lodge villages of the…", "Arikara", ["Aztec", "Inca", "Maya"], "The Arikara traded corn and other foods."],
  ["The Corps wrote about animals new to them on the plains, like the…", "prairie dog", ["kangaroo", "penguin", "camel"], "They even sent one back to Jefferson alive."],
  ["The Corps spent its first winter with the Mandan and Hidatsa, where they met…", "Sacagawea", ["Pocahontas", "Paul Revere", "Betsy Ross"], "She was a Lemhi Shoshone woman."],
  ["Sacagawea helped the Corps by…", "translating and guiding", ["building a fort", "writing the Constitution", "mining gold"], "She knew the Shoshone language."],
  ["York, an enslaved man, also traveled with the Corps. He belonged to…", "William Clark", ["George Washington", "Thomas Jefferson", "Andrew Jackson"], "York hunted, scouted and worked for the Corps."],
  ["The Corps finally reached the… Ocean in 1805.", "Pacific", ["Atlantic", "Arctic", "Indian"], "They followed the Columbia River."],
  ["Lewis and Clark came back down the Missouri through South Dakota in…", "1806", ["1492", "1776", "1889"], "The trip took about two and a half years."],
  ["Lakota people kept a record of each year with one picture for the year's most important event. This record is a…", "winter count", ["diary", "newspaper", "census"], "It was often painted on a hide."],
  ["A picture carved or pecked into rock, like those found in the Black Hills, is a…", "petroglyph", ["map", "letter", "coin"], "Petro means rock."],
  ["The first president, George Washington, tried to keep America out of the war between France and…", "Great Britain", ["Spain", "Mexico", "Russia"], "He wanted the new nation to grow in peace."],
  ["Alexander Hamilton wanted America to grow through banks and…", "factories and trade", ["only small farms", "no government", "a king"], "Jefferson wanted a nation of farmers."],
  ["In the War of 1812, the United States fought…", "Great Britain", ["France", "Spain", "the Lakota"], "British troops burned Washington, D.C."],
  ["\"The Star-Spangled Banner\" was written during the War of 1812 by…", "Francis Scott Key", ["Thomas Jefferson", "Meriwether Lewis", "John Adams"], "He saw the flag still flying over Fort McHenry."],
  ["Jefferson's purchase of Louisiana nearly… the size of the United States.", "doubled", ["halved", "tripled", "did not change"], "It stretched from the Mississippi to the Rockies.", true],
  ["Why did the Corps hold councils with the Nations along the river?", "to tell them the United States now claimed the land and to seek trade", ["to buy the Black Hills", "to start a war", "to sell steamboats"], "The Nations already lived on and used this land.", true],
  ["The Lakota at the Bad River would not let the boats pass at first because they…", "controlled trade on their part of the river", ["did not like boats", "were asleep", "had never seen people"], "Trade was important to them.", true],
  ["Lewis and Clark's maps and journals were important because they…", "described the land, rivers, plants and peoples of the West", ["were written in code", "showed the way to Asia", "were about the ocean"], "Later travelers used them.", true],
  ["How does a winter count help us learn about history?", "it records an important event for each year", ["it shows weather maps", "it lists every person", "it tells the future"], "Each picture is a memory for a year.", true],
  ["During Jefferson's presidency, Congress banned the… trade, starting in 1808.", "international slave", ["fur", "corn", "steamboat"], "No more enslaved people could be brought into the country.", true],
  ["In his Farewell Address, George Washington warned Americans about…", "political parties and foreign quarrels", ["the Corps of Discovery", "steamboats", "gold mines"], "He wanted Americans to stay united.", true],
];

export const SOCIAL_4: Unit[] = [
  bankUnit({
    id: "sd-g4-regions",
    title: "Regions of South Dakota",
    emoji: "🌾",
    blurb: "East River, West River and the features of the West",
    parentNote:
      "South Dakota's regions (the Coteau des Prairies, James River Valley, Prairie Plains, Missouri Plateau, Minnesota Valley Lowland and the Traverse Gap continental divide) and its historic cities (Aberdeen, Deadwood, Pierre, Rapid City, Sioux Falls and Yankton), with the Great Plains, Rocky Mountains, Missouri and Columbia Rivers and the cities of westward expansion.",
    standards: ["4.SS.2", "America's physical features, the cities of westward expansion, and South Dakota's regions and historic cities"],
    items: REGIONS,
  }),
  bankUnit({
    id: "sd-g4-corps-of-discovery",
    title: "Lewis & Clark on the Missouri",
    emoji: "🛶",
    blurb: "The Corps of Discovery and the early nation",
    parentNote:
      "The early United States from Washington to the War of 1812, centered on the Louisiana Purchase and the Corps of Discovery's journey up the Missouri River through South Dakota in 1804, including its meetings with the Yankton, Lakota and Arikara peoples, Sacagawea and York, and how Lakota winter counts and petroglyphs record history.",
    standards: ["4.SS.11", "American history from Washington's presidency through the War of 1812, including the Corps of Discovery and winter counts"],
    items: CORPS,
  }),
];
