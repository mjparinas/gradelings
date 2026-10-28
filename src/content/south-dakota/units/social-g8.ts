import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// South Dakota Grade 8 social studies: Dakota Territory in the late 1800s, from the railroad and the gold rush to the
// Dawes Act and statehood (8.SS.2), and South Dakota in the Great Depression and World War II, with Mount Rushmore, the
// Crazy Horse Memorial and the Lakota Code Talkers (8.SS.5).

const LATE_1800S: Q[] = [
  ["The Homestead Act of 1862 offered settlers…", "160 acres for living on and farming the land five years", ["free gold in the Black Hills", "a job on the railroad", "a seat in Congress"], "Thousands came to Dakota Territory."],
  ["The years from about 1878 to 1887, when settlers and railroads poured into Dakota Territory, are called the Great Dakota…", "Boom", ["Bust", "Depression", "Crash"], "Towns sprang up along new rail lines."],
  ["Railroads were vital to Dakota farmers because they…", "carried wheat and cattle to distant markets", ["banned farming", "only carried passengers", "ran only in winter"], "Without them, crops could not reach buyers."],
  ["Germans from Russia, Norwegians, Czechs and Dutch settlers brought to Dakota their own…", "languages, churches and foods", ["gold mines", "railroads", "treaties"], "Many towns still celebrate this heritage."],
  ["The Fort Laramie Treaty of 1868 promised the Lakota the…", "Black Hills as part of the Great Sioux Reservation", ["right to sell the Black Hills to miners", "whole of Dakota Territory to settlers", "Missouri River dams"], "The treaty said the land was theirs."],
  ["The Agreement of 1877 broke the 1868 treaty by…", "taking the Black Hills without the required consent", ["giving more land to the Lakota", "ending the gold rush", "creating North Dakota"], "Only a small share of Lakota men signed it."],
  ["The Dawes Act of 1887 divided reservation land into plots for individual families and…", "opened the leftover land to settlers", ["returned the Black Hills", "made all land shared again", "created the state government"], "Reservations lost millions of acres."],
  ["The Sioux Agreement of 1889 broke the Great Sioux Reservation into…", "six smaller reservations", ["one big reservation", "two states", "fifty counties"], "Millions of acres were opened to settlers."],
  ["On December 29, 1890, the US Army killed more than 250 Lakota people, many of them women and children, at…", "Wounded Knee Creek", ["Fort Pierre", "Yankton", "Deadwood"], "It is remembered as the Wounded Knee Massacre."],
  ["The government's Indian boarding schools forced Native children to…", "leave their families and stop speaking their languages", ["learn Lakota", "run their own schools", "visit home each week"], "School attendance was enforced on reservations."],
  ["The 1928 Meriam Report found that life on reservations under the Indian Bureau was marked by…", "poverty, poor health and failed policies", ["great wealth", "too many schools", "no government at all"], "It led to reforms in the 1930s."],
  ["South Dakota and North Dakota both became states on November 2, 1889, after Congress passed the…", "Enabling Act of 1889", ["Homestead Act", "Dawes Act", "Missouri Compromise"], "It let four territories write constitutions."],
  ["The capital of the new state of South Dakota was chosen by…", "a vote of the people", ["the president", "a lottery", "the railroad"], "Pierre won over Huron and other towns."],
  ["The Black Hills gold rush brought miners to Deadwood and to the Homestake Mine in…", "Lead", ["Yankton", "Sioux Falls", "Aberdeen"], "George Hearst's company owned Homestake.", true],
  ["Big companies like the Homestake Mining Company grew in the Gilded Age through…", "mass production and economies of scale", ["small family gardens", "the barter of furs only", "government ownership"], "Big operations could produce more for less.", true],
  ["Farmers in Dakota joined the Populist movement because they were angry about…", "high railroad rates and low crop prices", ["too much rain", "gold prices rising", "the Homestead Act"], "Populists wanted government to rein in railroads and banks.", true],
  ["In 1898, South Dakota became the first state to let voters…", "propose and pass laws themselves through initiative and referendum", ["elect the president directly", "vote at age 16", "skip all elections"], "It was a Populist idea.", true],
  ["Why do scholars say the Agreement of 1877 shows treaties were broken?", "the 1868 treaty required three-fourths of adult men to agree, and they did not", ["the Lakota asked for it", "Congress never voted", "the treaty had no rules"], "Compare what the treaty required with what happened.", true],
  ["In 1980, in United States v. Sioux Nation, the Supreme Court said the Black Hills were taken…", "illegally, and ordered payment", ["fairly, and no payment was due", "by Britain", "in 1492"], "The Lakota Nations have refused the money and seek the land.", true],
  ["How did the Dawes Act affect Tribal Nations?", "they lost much of their land and their shared way of holding it", ["they gained the Black Hills back", "it ended boarding schools", "it gave them statehood"], "Land was split and much was sold to settlers.", true],
  ["The Great Seal of South Dakota, adopted at statehood, carries the motto…", "Under God the people rule", ["E pluribus unum", "In God we trust", "Live free or die"], "It reflects the idea of self-government.", true],
  ["Laura Ingalls Wilder's books about De Smet describe pioneer life with blizzards, grasshoppers and…", "the hard work of homesteading", ["city skyscrapers", "ocean voyages", "gold mines"], "Her family lived there in the 1880s.", true],
  ["Why did the Black Hills gold rush lead to war in 1876?", "miners and the Army entered land the 1868 treaty promised to the Lakota", ["the Lakota wanted gold", "Britain invaded", "the railroad stopped"], "The treaty forbade outsiders there.", true],
  ["Why did open-range cattle ranching end in West River?", "fences, homesteads and hard winters", ["cattle moved to the ocean", "ranchers found gold", "railroads banned cattle"], "Barbed wire and settlers closed the range.", true],
];

const MODERN: Q[] = [
  ["Sculptor Gutzon Borglum led the carving of Mount Rushmore from 1927 to…", "1941", ["1889", "1876", "1999"], "His son Lincoln finished the work after he died."],
  ["The four presidents on Mount Rushmore are Washington, Jefferson, Theodore Roosevelt and…", "Lincoln", ["Franklin Roosevelt", "Jackson", "Kennedy"], "They stand for the nation's birth, growth, development and preservation."],
  ["Lakota leader Henry Standing Bear invited sculptor Korczak Ziolkowski to carve a memorial to…", "Crazy Horse", ["Sitting Bull", "George Custer", "Abraham Lincoln"], "Work began in 1948 and continues today."],
  ["In the 1930s, drought and dust storms on the plains were called the…", "Dust Bowl", ["Gold Rush", "Great Boom", "Roaring Twenties"], "Dry soil blew away in great clouds."],
  ["Besides drought, Dakota farms in the 1930s were hit by swarms of…", "grasshoppers", ["bees", "butterflies", "ladybugs"], "They ate the crops in the fields."],
  ["The Great Depression began after the stock market crashed in…", "1929", ["1889", "1941", "1969"], "Banks failed and many lost their jobs."],
  ["President Franklin Roosevelt's plan to fight the Depression was called the…", "New Deal", ["Square Deal", "Fair Deal", "Great Society"], "It created programs and jobs."],
  ["The Civilian Conservation Corps (CCC) gave young men jobs in the Black Hills building…", "trails, dams and parks", ["skyscrapers", "battleships", "railroads in Europe"], "It was a New Deal program."],
  ["The Indian Reorganization Act of 1934 ended the Dawes Act's land splitting and encouraged Tribes to…", "write constitutions and form Tribal councils", ["move to cities", "give up their land", "join the Army"], "Many Tribal governments today began then."],
  ["During World War II, Lakota soldiers used their language to send messages enemies could not understand. They were the Lakota…", "Code Talkers", ["Navigators", "Pilots", "Spies of Rome"], "Congress honored them with gold medals in 2013."],
  ["World War II began for the United States after Japan attacked…", "Pearl Harbor", ["Normandy", "Midway", "Okinawa"], "The attack was on December 7, 1941."],
  ["Joe Foss of Sioux Falls was a Marine fighter pilot in World War II who later became…", "governor of South Dakota", ["president", "a Supreme Court justice", "a mining owner"], "He won the Medal of Honor."],
  ["An Army air base built near Rapid City during World War II is today…", "Ellsworth Air Force Base", ["Fort Pierre", "Wind Cave", "Homestake Mine"], "Bomber crews trained there."],
  ["The Allies landed in Normandy, France on June 6, 1944, a day called…", "D-Day", ["V-E Day", "Memorial Day", "Labor Day"], "It began the freeing of Western Europe."],
  ["The program that built the first atomic bombs was the…", "Manhattan Project", ["New Deal", "Marshall Plan", "Dust Bowl"], "The bombs were dropped on Hiroshima and Nagasaki.", true],
  ["The Navajo and the Lakota Code Talkers were valuable because their languages were…", "unknown to enemy code breakers", ["the same as German", "written in numbers", "easy for anyone to learn"], "Few outsiders knew them.", true],
  ["The Flood Control Act of 1944 led to big dams on the Missouri in South Dakota, which…", "flooded Tribal bottomlands and towns", ["created the Black Hills", "ended the Dust Bowl at once", "carved Mount Rushmore"], "Cheyenne River, Standing Rock, Lower Brule and Crow Creek lost land.", true],
  ["Why did the Dust Bowl hit the plains so hard?", "plowed-up prairie soil blew away in the drought", ["it rained too much", "the ocean flooded", "gold mines collapsed"], "Grass roots once held the soil.", true],
  ["Farmers learned from the Dust Bowl to plant rows of trees called…", "shelterbelts", ["orchards of oranges", "hedgerows of roses", "palm groves"], "They slow the wind and hold the soil.", true],
  ["Why do some people question Mount Rushmore's place in the Black Hills?", "it was carved on land promised to the Lakota by treaty", ["it is too small", "it is in the ocean", "it shows only kings"], "The Black Hills were taken in 1877.", true],
  ["Japanese American internment during World War II meant…", "the government forced Japanese Americans into camps", ["Japanese Americans led the army", "camps for soldiers only", "a vacation program"], "Most were American citizens.", true],
  ["The Tuskegee Airmen were…", "Black pilots who fought in World War II", ["Lakota Code Talkers", "New Deal workers", "Dust Bowl farmers"], "They flew despite segregation.", true],
  ["Holodomor, the Holocaust and the gulag are examples of…", "mass murder and terror by dictatorships", ["New Deal programs", "inventions", "elections"], "These were crimes against millions of people.", true],
  ["The Rapid City Army Air Base was renamed for…", "General Richard Ellsworth", ["Joe Foss", "Gutzon Borglum", "Crazy Horse"], "He died in a training flight in 1953.", true],
];

export const SOCIAL_8: Unit[] = [
  bankUnit({
    id: "sd-g8-dakota-1800s",
    title: "Dakota in the Gilded Age",
    emoji: "🚂",
    blurb: "Railroads, homesteads, treaties and statehood",
    parentNote:
      "Dakota Territory in the late 1800s: the Homestead Act and the Great Dakota Boom, immigrants and their heritage, railroads, the Black Hills gold rush and the Homestake Mine, the Fort Laramie Treaty of 1868, the Agreement of 1877, the Dawes Act, the 1889 Sioux Agreement, Wounded Knee, boarding schools and the Meriam Report, Populism and statehood in 1889.",
    standards: ["8.SS.2", "the Gilded Age in South Dakota: railroads, homesteading, gold, treaties kept and broken, Wounded Knee and statehood"],
    items: LATE_1800S,
  }),
  bankUnit({
    id: "sd-g8-depression-and-war",
    title: "South Dakota in Hard Times & War",
    emoji: "🗿",
    blurb: "The Dust Bowl, Mount Rushmore and World War II",
    parentNote:
      "The Great Depression and World War II with South Dakota's part in them: the Dust Bowl and grasshoppers, the New Deal and the CCC in the Black Hills, the Indian Reorganization Act, the carving of Mount Rushmore and the Crazy Horse Memorial, the Lakota Code Talkers, Joe Foss, the Rapid City air base, and the war's major events and crimes.",
    standards: ["8.SS.5", "the Great Depression and World War II, the carving of Mount Rushmore and the Crazy Horse Memorial, and the Lakota Code Talkers"],
    items: MODERN,
  }),
];
