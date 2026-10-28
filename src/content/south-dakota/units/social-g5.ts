import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// South Dakota Grade 5 social studies: the fur trade and the treaties of Dakota's early years (5.SS.6), and Dakota
// Territory to statehood: homesteaders and immigrants, the railroad and the Black Hills gold rush, the Treaty of 1868
// and the Agreement of 1877, and statehood in 1889 (5.SS.9).

const TERRITORY: Q[] = [
  ["Pierre Chouteau Jr.'s fur company built a trading post on the Missouri River in 1832 called Fort…", "Pierre", ["Yankton", "Laramie", "Sumter"], "The capital city across the river took its name."],
  ["Fur traders on the Missouri River traded goods like cloth and metal pots for…", "bison robes and furs", ["gold coins", "railroad tickets", "corn seed"], "Bison robes were valuable in the East."],
  ["In 1831, the steamboat Yellow Stone carried goods up the Missouri River to…", "the fur trading posts", ["the Atlantic Ocean", "the Black Hills", "Lake Michigan"], "Steamboats made river travel faster."],
  ["Dakota Territory was created by Congress in…", "1861", ["1776", "1804", "1889"], "It was the year the Civil War began."],
  ["The first capital of Dakota Territory was…", "Yankton", ["Pierre", "Rapid City", "Deadwood"], "It is on the Missouri River."],
  ["The Homestead Act of 1862 gave settlers 160 acres if they…", "lived on and farmed the land for five years", ["paid in gold", "found gold", "built a railroad"], "Many families came to Dakota this way."],
  ["Many homesteaders on the treeless prairie built houses out of…", "sod", ["stone", "bricks from the East", "glass"], "They cut blocks of grassy soil."],
  ["Laura Ingalls Wilder wrote about growing up in the Dakota town of…", "De Smet", ["Deadwood", "Pierre", "Sturgis"], "Her family homesteaded there."],
  ["Many immigrants to Dakota came from Norway, Germany, Russia and other parts of…", "Europe", ["Asia", "South America", "Australia"], "They came for land of their own."],
  ["Railroads helped Dakota grow because they…", "brought settlers and shipped crops to market", ["took away the land", "only carried gold", "stopped at the border"], "Towns grew up along the tracks."],
  ["In 1874, an Army expedition led by George Custer reported finding gold in the…", "Black Hills", ["Badlands", "James River Valley", "Coteau des Prairies"], "Miners rushed in soon after."],
  ["The Fort Laramie Treaty of 1868 set aside the Black Hills as part of the Great Sioux…", "Reservation", ["Railroad", "Gold Mine", "Territory Capital"], "It promised the land to the Lakota."],
  ["After the gold rush, the Agreement of 1877 took the Black Hills from the Lakota…", "without the agreement the treaty required", ["after a fair vote by all", "in exchange for gold", "at the Lakota's request"], "The 1868 treaty required most adult men to agree."],
  ["In 1980, the United States Supreme Court ruled that the Black Hills were…", "taken illegally", ["sold fairly", "never part of any treaty", "given as a gift"], "The Court awarded money, which the Lakota Nations have refused."],
  ["Many Lakota Nations refuse the money for the Black Hills because they want…", "the land returned", ["more gold", "a railroad", "a new treaty with Britain"], "The Black Hills hold deep meaning for them."],
  ["South Dakota became a state on…", "November 2, 1889", ["July 4, 1776", "December 25, 1861", "April 30, 1803"], "North Dakota became a state the same day."],
  ["When Dakota Territory was split, the two new states were North Dakota and…", "South Dakota", ["Nebraska", "Montana", "Iowa"], "Both joined the Union in 1889."],
  ["The gold mine at Lead that became one of the biggest in the world was the…", "Homestake Mine", ["Deadwood Mine", "Yankton Mine", "Pierre Mine"], "It ran for more than 125 years.", true],
  ["Big cattle ranches spread across West River because the dry grassland was good for…", "grazing", ["rice farming", "orange trees", "fishing"], "Cattle ate the prairie grass on the open range.", true],
  ["Lakota leaders who resisted the taking of their lands included Sitting Bull and…", "Crazy Horse", ["George Custer", "Laura Ingalls Wilder", "Pierre Chouteau"], "They fought at the Battle of the Little Bighorn in 1876.", true],
  ["At the Battle of the Little Bighorn (the Greasy Grass) in 1876, Lakota and Cheyenne warriors defeated…", "Custer's soldiers", ["the British army", "fur traders", "homesteaders"], "It was a famous victory for the Lakota and Cheyenne.", true],
  ["In December 1890, US soldiers killed hundreds of Lakota people, many of them women and children, at…", "Wounded Knee", ["Yankton", "Fort Pierre", "Deadwood"], "It was a massacre of Big Foot's band.", true],
  ["The government forced many Native children to attend boarding schools, where they were…", "made to stop speaking their own languages", ["taught Lakota every day", "allowed to go home each night", "paid for going"], "The schools tried to erase Native ways of life.", true],
  ["The Great Seal of South Dakota shows a farmer, a smelting furnace, a steamboat and…", "cattle and hills", ["an ocean beach", "a castle", "a pyramid"], "It shows how South Dakotans worked in 1889.", true],
  ["After the Treaty of 1868 was broken, the Black Hills gold rush brought thousands of…", "miners onto Lakota land", ["Lakota families to Yankton", "steamboats to the Black Hills", "farmers to the Badlands"], "Miners poured in after 1874.", true],
];

export const SOCIAL_5: Unit[] = [
  bankUnit({
    id: "sd-g5-dakota-territory",
    title: "Dakota Territory to Statehood",
    emoji: "⛏️",
    blurb: "Fur traders, homesteaders, gold and statehood",
    parentNote:
      "South Dakota's 1800s: the fur trade at Fort Pierre, Dakota Territory and its first capital at Yankton, homesteaders, immigrants and sod houses, the railroad, the Black Hills gold rush and the Homestake Mine, the Fort Laramie Treaty of 1868, the Agreement of 1877 and the 1980 Supreme Court ruling on the Black Hills, the Battle of the Little Bighorn, Wounded Knee and boarding schools, and statehood on November 2, 1889.",
    standards: ["5.SS.6; 5.SS.9", "settlers, governments and Native Americans in South Dakota, and the Gilded Age in South Dakota: homesteading, gold, treaties and statehood"],
    items: TERRITORY,
  }),
];
