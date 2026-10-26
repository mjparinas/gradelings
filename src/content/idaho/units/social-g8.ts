import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Idaho Grade 8 social studies, United States History I: Idaho's part in the story of the West, from territory to
// statehood, with the competition for land and resources (the Homestead Act, railroads, the end of the open range and
// the destruction of the bison; 6-12.US1.44), the rights of different groups as the West grew (women's suffrage, Chinese
// workers and the Chinese Exclusion Act; 6-12.US1.54), labor conflict in the mines (6-12.US1.52), and how the five
// tribes' dealings with national, state and local governments have shaped tribal sovereignty over time (6-12.US1.37).
// The rest of the course is practised with adopted units (see ../plan/social.ts).

const TERRITORY: Q[] = [
  ["Before Idaho Territory was created in 1863, northern Idaho was part of the…", "Washington Territory", ["Louisiana Territory", "Republic of Texas", "Indian Territory"], "Gold strikes there led to a new territory."],
  ["Idaho Territory was created in 1863 by a law signed by President…", "Abraham Lincoln", ["George Washington", "Andrew Jackson", "Theodore Roosevelt"], "It was during the Civil War."],
  ["When it was created, Idaho Territory was huge and included most of present-day…", "Montana and Wyoming", ["Texas and Oklahoma", "Ohio and Indiana", "Maine and Vermont"], "It was larger than Texas."],
  ["Idaho Territory got much smaller in 1864 when Congress created the…", "Montana Territory", ["Louisiana Purchase", "Oregon Trail", "Gadsden Purchase"], "Gold strikes in Montana drew miners east."],
  ["The first governor of Idaho Territory was…", "William Wallace", ["George Shoup", "Brigham Young", "Jefferson Davis"], "He had been a delegate from Washington Territory."],
  ["Thousands of miners rushing to Idaho in the 1860s needed courts and laws, so Congress…", "created Idaho Territory", ["closed the mines", "made Idaho a state at once", "gave the land to another country"], "Population growth led to new government."],
  ["Idaho's constitution was written at a convention in Boise in…", "1889", ["1776", "1863", "1950"], "Voters approved it that November."],
  ["Idaho became the 43rd state on July 3, 1890, when the bill was signed by President…", "Benjamin Harrison", ["Abraham Lincoln", "Ulysses S. Grant", "Woodrow Wilson"], "Several western states joined around then."],
  ["Idaho's first state governor was…", "George Shoup", ["William Wallace", "Chief Joseph", "Brigham Young"], "He soon left to serve in the US Senate."],
  ["The Homestead Act of 1862 offered settlers… acres of land if they lived on it and farmed it for five years.", "160", ["16", "1,600", "16,000"], "A quarter of a square mile."],
  ["The Carey Act of 1894 helped settle southern Idaho by…", "letting companies build irrigation projects on dry federal land", ["banning farming", "giving land only to railroads", "closing the Snake River"], "Twin Falls grew from one of these projects."],
  ["Milner Dam and the Twin Falls canals, finished in the early 1900s, turned sagebrush desert into…", "irrigated farms", ["a national park", "a lake for ships", "a gold mine"], "Water from the Snake River made it possible."],
  ["Railroads built across southern Idaho in the 1880s helped Idaho by…", "carrying crops and ore to markets and helping towns grow", ["keeping settlers out", "ending trade", "replacing rivers"], "Pocatello became a railroad hub."],
  ["The open range era ended in the West when…", "settlers and ranchers fenced land with barbed wire", ["all cattle disappeared", "railroads were torn up", "the bison returned"], "Homesteads and fences divided the land."],
  ["The destruction of the great bison herds in the 1800s harmed many western tribes because…", "bison were a key source of food, clothing and shelter", ["bison were pets", "bison were used for money only", "tribes never hunted"], "Some tribes in Idaho traveled east to hunt bison."],
  ["Chinese immigrants worked in Idaho's mines and on its railroads, but the Chinese Exclusion Act of 1882…", "banned most new Chinese immigrants from coming to the United States", ["gave them free land", "made them citizens", "paid them extra"], "It was the first US law to bar a group by nationality."],
  ["Idaho women won the right to vote in 1896, decades before…", "the Nineteenth Amendment of 1920", ["the Declaration of Independence", "the Civil War", "statehood"], "Several western states led on women's suffrage."],
  ["In 1892 and 1899, labor conflict in the Coeur d'Alene mining district was between…", "miners' unions and mine owners", ["two tribes", "farmers and ranchers", "two railroads"], "Troops were sent in both years."],
  ["Unions in the Silver Valley mines wanted…", "better pay and safer working conditions", ["longer hours for less pay", "to close all mines", "no rules at all"], "Mining was dangerous work."],
  ["Silver City in the Owyhee Mountains, once a busy mining town, is now…", "a ghost town that preserves mining history", ["Idaho's capital", "a seaport", "a big factory city"], "Many buildings from the 1860s still stand."],
  ["Federal allotment policy in the 1890s divided parts of the Nez Perce and Coeur d'Alene reservations into family plots and…", "opened the remaining land to settlers", ["gave the tribes more land", "ended all farming", "returned land to the tribes"], "Tribes lost much of their reservation land."],
  ["The Indian Reorganization Act of 1934 encouraged tribes to…", "write constitutions and form their own governments", ["move to cities", "give up all their land", "join the army"], "It ended allotment."],
  ["In 2001, the US Supreme Court confirmed that the Coeur d'Alene Tribe owns…", "the southern part of Lake Coeur d'Alene", ["the city of Boise", "the Snake River", "all of northern Idaho"], "The reservation's original boundaries included the lake."],
  ["The Nez Perce Tribe and the State of Idaho both manage salmon in Idaho's rivers. This shows that…", "tribal and state governments must work together on shared resources", ["only the state has a say", "tribes have no rights to fish", "salmon belong to no one"], "Treaty fishing rights still stand.", true],
  ["Why did westward settlement lead to conflict with tribes in Idaho in the 1870s?", "settlers, miners and ranchers competed with tribes for land and food sources", ["tribes wanted more settlers", "there was too much land", "settlers stayed in towns"], "Think about the Nez Perce and Bannock conflicts.", true],
  ["How did irrigation projects like the Carey Act change who could farm in southern Idaho?", "they opened dry land to thousands of new farm families", ["they ended farming there", "they gave all land to tribes", "they made the land a wilderness"], "Water was the key resource.", true],
  ["How has tribal sovereignty in Idaho changed over time?", "it was reduced by treaties and allotment, then strengthened by tribal constitutions and court cases", ["it has never changed", "it ended in 1890", "it grew every year without limits"], "Look at the 1800s, 1934 and 2001.", true],
];

export const SOCIAL_8: Unit[] = [
  bankUnit({
    id: "id-g8-idaho-territory",
    title: "Idaho: Territory to State",
    emoji: "⛰️",
    blurb: "The West, the territory, statehood and tribal sovereignty",
    parentNote: "Idaho's place in the history of the West: the creation of Idaho Territory in 1863 and statehood in 1890, the Homestead Act, the Carey Act and irrigation, railroads, the end of the open range and the destruction of the bison, Chinese workers and the Chinese Exclusion Act, women's suffrage in 1896, labor conflict in the Silver Valley mines, and how treaties, allotment, the Indian Reorganization Act and court cases have shaped the five tribes' sovereignty over time.",
    standards: ["6-12.US1.37; 6-12.US1.44; 6-12.US1.54; 6-12.US1.52", "Idaho's tribes and tribal sovereignty over time, competition for land and resources in the West, the rights of groups as the West grew, and labor conflict"],
    items: TERRITORY,
  }),
];
