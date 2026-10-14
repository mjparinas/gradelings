import type { Unit } from "../../types";
import { SOCIAL_3 as CALIFORNIA_3 } from "../../california/units/social-g3";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Texas social studies, Grade 3 (19 TAC §113.14): how individuals, events and ideas shape communities, the land and
// how people adapt to it, maps with directions, scale and grids, earning, spending, saving and donating, local, state
// and national government, and the heroes, writers, artists and inventors the TEKS name. California's units are copied
// without their California places, with Texas items added.

const BUILDERS: Q[] = [
  ["Pierre-Charles L'Enfant is known for planning the layout of…", "Washington, D.C.", ["Austin", "Boston", "Chicago"], "He drew its wide streets and circles."],
  ["Benjamin Banneker helped survey the land for…", "Washington, D.C.", ["the Alamo", "New Orleans", "Philadelphia"], "Surveyors measure land."],
  ["Benjamin Banneker also wrote popular…", "almanacs", ["comic books", "cookbooks", "newspapers about sports"], "Almanacs list weather, tides and the stars."],
  ["Benjamin Franklin helped his city of Philadelphia by starting a…", "lending library and a fire company", ["shopping mall and a zoo", "highway and an airport", "TV station and a radio"], "He wanted his community to be safer and smarter."],
  ["Daniel Boone helped settlers move west by marking the…", "Wilderness Road", ["Oregon Trail", "Silk Road", "Pony Express"], "It went through the Cumberland Gap."],
  ["Daniel Boone helped start a new community in…", "Kentucky", ["Texas", "Florida", "Maine"], "The town was named Boonesborough."],
  ["The Founding Fathers helped create…", "a new nation, the United States", ["the first city", "a new ocean", "the first school"], "They wrote the Declaration and the Constitution."],
  ["The Pilgrims formed a community in Plymouth mainly for…", "religious freedom", ["gold", "sports", "a vacation"], "They wanted to worship in their own way."],
  ["Many people form communities to be safe. This is a need for…", "security", ["recreation", "decoration", "music"], "Living together can protect people."],
  ["People who move to a place for good jobs are looking for…", "material well-being", ["religious freedom", "a vacation", "a new language"], "Material well-being means having what you need."],
  ["Communities make laws so that people…", "can live together safely", ["never meet", "have no rules", "stop working"], "Laws keep order."],
  ["Henry Ford made cars cheaper by using an…", "assembly line", ["airplane", "oven", "elevator"], "Workers each did one step as the car moved along."],
  ["Henry Ford's Model T was the first car many families could…", "afford", ["fly", "fold", "hide"], "Afford means have enough money for."],
  ["Sam Walton started a business that grew into a chain of…", "discount stores", ["airlines", "car factories", "farms"], "He opened his first discount store in Arkansas in 1962."],
  ["Starting a new business is called being an…", "entrepreneur", ["astronaut", "engineer", "explorer"], "Henry Ford and Sam Walton were entrepreneurs."],
  ["Jonas Salk developed a vaccine to prevent…", "polio", ["the common cold", "sunburn", "allergies"], "Polio once made many children very sick."],
  ["Louis Pasteur found that heating milk kills germs. This is called…", "pasteurization", ["freezing", "baking", "recycling"], "It is named after him."],
  ["Cyrus McCormick invented a reaper that helped farmers…", "harvest grain faster", ["catch fish", "build houses", "make clothes"], "A reaper cuts wheat."],
  ["Bill Gates helped start a company that made…", "software for computers", ["cars", "toys", "shoes"], "Software is the programs a computer runs."],
  ["Vaccines changed communities because fewer people…", "got very sick", ["went to school", "had jobs", "moved away"], "Vaccines prevent disease."],
  ["Personal computers changed communities by making it easier to…", "share information and work", ["grow crops", "build roads", "catch fish"], "People write, learn and talk using computers."],
  ["A decade is…", "10 years", ["100 years", "1 year", "1,000 years"], "Think of a dime: 10 cents."],
  ["A century is…", "100 years", ["10 years", "50 years", "1,000 years"], "Think of a cent: 100 make a dollar."],
  ["The years 1900 to 1999 are the…", "20th century", ["19th century", "21st century", "10th century"], "The 1900s are the 20th century.", true],
  ["How many decades are in a century?", "10", ["100", "5", "12"], "10 × 10 = 100.", true],
  ["Pasteurized milk helped communities because it…", "made milk safer to drink", ["made milk sweeter", "turned milk blue", "made cows bigger"], "Germs were killed.", true],
  ["How did the reaper change farm communities?", "fewer workers could harvest more grain", ["farms got smaller", "people stopped farming", "wheat stopped growing"], "Machines do work faster.", true],
  ["Washington, D.C., was planned on purpose. Most early towns grew…", "little by little, as people settled", ["overnight from a map", "under the sea", "on mountaintops only"], "Many towns grew slowly.", true],
  ["An idea that changed communities was a free public library, started by…", "Benjamin Franklin", ["Henry Ford", "Daniel Boone", "Jonas Salk"], "He loved books and learning.", true],
];

const HEROES: Q[] = [
  ["Helen Keller could not see or hear, but she learned to…", "read, write and speak", ["fly a plane", "drive a car", "paint a mural"], "Her teacher, Anne Sullivan, spelled words into her hand."],
  ["Helen Keller worked to help…", "people with disabilities", ["only rich people", "car makers", "sports teams"], "She spoke and wrote for others' rights."],
  ["Clara Barton started the…", "American Red Cross", ["first airline", "first library", "first zoo"], "She was a nurse in the Civil War."],
  ["Clara Barton was called the “Angel of the Battlefield” because she…", "cared for wounded soldiers", ["led an army", "built ships", "wrote songs"], "She was a nurse."],
  ["In 1960, at age 6, Ruby Bridges became one of the first Black students at…", "an all-white school in New Orleans", ["a school in space", "a college", "a new school in Austin"], "She showed great courage."],
  ["Hector P. Garcia was a Texas doctor who started a group to help…", "Mexican American veterans", ["only farmers", "only children", "astronauts"], "The group is the American GI Forum."],
  ["Hector P. Garcia worked in Corpus Christi for…", "equal rights and health care", ["a sports team", "a toy company", "a bank"], "He was a doctor and a veteran."],
  ["James A. Lovell commanded Apollo 13 and helped bring the crew…", "safely home to Earth", ["to Mars", "to the Sun", "to a new planet"], "An explosion damaged the spacecraft."],
  ["The Four Chaplains gave away their life jackets when their ship…", "sank in World War II", ["won a race", "reached a port", "found treasure"], "They helped others survive."],
  ["The Four Chaplains were heroes because they…", "put others' lives before their own", ["won a medal in sports", "found gold", "built a bridge"], "They gave others their life jackets."],
  ["Harriet Tubman escaped slavery and then led others to freedom on the…", "Underground Railroad", ["Transcontinental Railroad", "Chisholm Trail", "Erie Canal"], "It was a secret network of helpers."],
  ["During the Civil War, Harriet Tubman also served as a…", "scout and nurse", ["general", "president", "judge"], "She helped the Union army."],
  ["Todd Beamer was a passenger who, with others, fought back against hijackers on…", "Flight 93 on September 11, 2001", ["Apollo 13", "a ship in 1943", "a train in 1865"], "His words “Let's roll” are remembered."],
  ["A first responder is someone who…", "rushes to help in an emergency", ["is first in the lunch line", "wins a race", "answers every question first"], "Firefighters, police and paramedics are first responders."],
  ["Kadir Nelson is known for his…", "paintings in picture books about history", ["inventions", "songs", "buildings"], "He is an artist and illustrator."],
  ["Tomie dePaola wrote and illustrated…", "children's books such as Strega Nona", ["maps", "newspapers", "dictionaries"], "He made more than 200 books."],
  ["Carmen Lomas Garza is a Texas artist whose paintings show…", "Mexican American family life and traditions", ["outer space", "only animals", "city traffic"], "She grew up in Kingsville, Texas."],
  ["Laura Ingalls Wilder wrote the Little House books about…", "pioneer family life", ["space travel", "robots", "the ocean floor"], "Her family moved west in a covered wagon."],
  ["Writers and artists add to a community's…", "cultural heritage", ["traffic", "taxes", "weather"], "Their work keeps stories alive."],
  ["A hero is someone who…", "shows courage to help others", ["is famous for being rich", "always wins", "never fails"], "Heroes help others, often at a risk."],
  ["Which trait did Ruby Bridges show?", "courage", ["greed", "laziness", "rudeness"], "She went to school even when people shouted at her."],
  ["Which person was a Texas hero who helped veterans?", "Hector P. Garcia", ["Laura Ingalls Wilder", "Tomie dePaola", "James A. Lovell"], "He founded the American GI Forum.", true],
  ["Which person was an astronaut?", "James A. Lovell", ["Todd Beamer", "Hector P. Garcia", "Kadir Nelson"], "He flew on Apollo missions.", true],
  ["Clara Barton and Harriet Tubman both…", "helped people during the Civil War", ["were astronauts", "were painters", "were presidents"], "Both served during the war.", true],
  ["How do paintings like Carmen Lomas Garza's help a community?", "they record and share its traditions", ["they make laws", "they collect taxes", "they build roads"], "Art shows how people live.", true],
  ["Laura Ingalls Wilder's books help readers today understand…", "what life was like for pioneers", ["how to build a rocket", "how to grow cotton", "how to fly"], "Her stories are about her own childhood.", true],
  ["A contemporary hero is a hero from…", "recent times", ["ancient times only", "fairy tales", "the future"], "Contemporary means of today.", true],
  ["The Four Chaplains came from different faiths but…", "worked together to save others", ["refused to help", "argued the whole time", "left the ship first"], "They stood together.", true],
];

const MAPS: Q[] = [
  ["The direction between north and east is…", "northeast", ["southwest", "northwest", "southeast"], "Put the two words together."],
  ["The direction between south and west is…", "southwest", ["northeast", "southeast", "northwest"], "Put the two words together."],
  ["North, south, east and west are called…", "cardinal directions", ["intermediate directions", "map keys", "grid lines"], "They are the four main directions."],
  ["Northeast, northwest, southeast and southwest are called…", "intermediate directions", ["cardinal directions", "scales", "symbols"], "They are in between the main ones."],
  ["The part of a map that shows directions is the…", "compass rose", ["legend", "title", "scale"], "It looks like a star with points."],
  ["The part of a map that explains its symbols is the…", "legend", ["title", "compass rose", "grid"], "It is also called a key."],
  ["The part of a map that tells what the map is about is the…", "title", ["scale", "legend", "compass rose"], "It is usually at the top."],
  ["The part of a map that helps you find real distances is the…", "scale", ["legend", "title", "grid"], "It might say 1 inch = 10 miles."],
  ["A map's scale says 1 inch = 10 miles. Two towns are 3 inches apart. How far?", "30 miles", ["3 miles", "13 miles", "10 miles"], "3 × 10 = 30."],
  ["A map's scale says 1 inch = 5 miles. A lake is 4 inches away. How far?", "20 miles", ["9 miles", "4 miles", "5 miles"], "4 × 5 = 20."],
  ["A map's scale says 1 inch = 50 miles. Two cities are 2 inches apart. How far?", "100 miles", ["52 miles", "50 miles", "25 miles"], "2 × 50 = 100."],
  ["On a grid map, the park is in square B3. B is the…", "column letter", ["scale", "title", "legend"], "Letters go across, numbers go down (or the other way)."],
  ["A grid system on a map helps you…", "find places using letters and numbers", ["measure the temperature", "read the legend", "draw a title"], "Each square has a name like C4."],
  ["On most maps, north is at the…", "top", ["bottom", "left", "right"], "Look at the compass rose."],
  ["Amarillo is in the far north of Texas. Brownsville is in the far…", "south", ["north", "east", "west"], "Brownsville is near the southern tip of Texas."],
  ["El Paso is at the far west of Texas. To go from El Paso to Dallas, you travel mostly…", "east", ["west", "south", "north"], "Dallas is far to the east of El Paso."],
  ["Houston is east of San Antonio. San Antonio is ___ of Houston.", "west", ["east", "north", "south"], "East and west are opposites."],
  ["The library is northeast of your school. To get there, you go…", "north and east", ["south and west", "only west", "only south"], "Northeast is between north and east."],
  ["A symbol of a tent in a park map legend probably means…", "a campground", ["a hospital", "a school", "an airport"], "Symbols stand for real things."],
  ["Which map would best show the distance between two cities?", "a map with a scale", ["a map with no scale", "a picture of a city", "a weather report"], "The scale measures distance."],
  ["A map of the whole world on a ball is a…", "globe", ["grid", "legend", "scale"], "It is round like Earth."],
  ["Corpus Christi is southeast of San Antonio. San Antonio is ___ of Corpus Christi.", "northwest", ["southeast", "northeast", "southwest"], "Turn each part around.", true],
  ["On a map, 1 inch = 20 miles. A road is 2 1/2 inches long. How long is it?", "50 miles", ["40 miles", "25 miles", "22 miles"], "2 inches is 40 miles; half an inch is 10 more.", true],
  ["Your grid map shows the school in A1 and the park in A4. They are in the same…", "column", ["row", "legend", "scale"], "They share the letter A.", true],
  ["You make a map of your neighborhood. What should you add so others can read your symbols?", "a legend", ["a poem", "a bar graph", "a timeline"], "A legend explains the symbols.", true],
  ["A blue line on a map most likely shows a…", "river", ["road", "border", "railroad"], "Blue usually means water."],
  ["A star inside a circle on a state map often marks the…", "state capital", ["biggest farm", "tallest mountain", "oldest tree"], "Austin has this symbol on a Texas map.", true],
  ["A city is 60 miles away. The scale is 1 inch = 20 miles. How many inches apart are they on the map?", "3 inches", ["60 inches", "20 inches", "40 inches"], "60 ÷ 20 = 3.", true],
];

const GOVERNMENT_TEXAS: Q[] = [
  ["Who leads the government of Texas?", "the governor", ["the mayor", "the president", "a judge"], "Texans elect a governor every four years."],
  ["The group that makes laws for Texas is the…", "Texas Legislature", ["city council", "school board", "Supreme Court of the United States"], "It meets in the Capitol in Austin."],
  ["The Texas Legislature has two parts, the Senate and the…", "House of Representatives", ["Cabinet", "Court", "Council"], "The US Congress has the same two parts."],
  ["The Declaration of Independence was written to explain why the colonies…", "were breaking away from Great Britain", ["needed a new flag", "wanted a king", "were building roads"], "It was adopted in 1776."],
  ["The US Constitution is a plan that…", "sets up how our government works", ["lists every city", "tells the history of Texas", "names all the rivers"], "It was written in 1787."],
  ["The Bill of Rights is the first ten…", "amendments to the Constitution", ["presidents", "states", "laws of Texas"], "They protect people's rights."],
  ["“Consent of the governed” means a government gets its power from…", "the people", ["a king", "the army", "one rich family"], "People agree to be governed, often by voting."],
  ["Which service does a city government usually provide?", "trash pickup and parks", ["national defense", "printing money", "making treaties"], "Cities take care of local needs."],
  ["Which service does the national government provide?", "printing money and defending the country", ["picking up trash", "fixing city streets", "running the city library"], "The national government serves the whole country."],
  ["Which service does the state of Texas provide?", "state highways and state parks", ["national defense", "city trash pickup", "printing money"], "State services cover the whole state.", true],
  ["Mayors, governors and members of Congress are usually chosen by…", "election", ["birth", "a coin toss", "appointment by a king"], "Citizens vote for them.", true],
  ["Some officials, like many judges, are appointed. Appointed means…", "chosen by a leader, not by voters", ["chosen by a race", "born into the job", "picked at random"], "A governor or president can appoint people.", true],
];

const MONEY_TEXAS: Q[] = [
  ["Giving money to help others, like a food bank, is called…", "donating", ["spending", "earning", "borrowing"], "Donating means giving."],
  ["A budget is a plan for…", "spending and saving money", ["a party", "a trip only", "a game"], "It shows where money will go."],
  ["Lena earns $10. She plans to save $4 and spend $6. This plan is a…", "budget", ["tax", "loan", "profit"], "It divides money between saving and spending."],
  ["Kai earns $20. He saves half. How much does he save?", "$10", ["$5", "$15", "$20"], "Half of 20 is 10."],
  ["When there is not enough of something for everyone who wants it, that is…", "scarcity", ["profit", "a budget", "a donation"], "Scarce means hard to get."],
  ["It costs $2 to make a cup of lemonade. You sell it for $3. Your profit per cup is…", "$1", ["$5", "$2", "$3"], "Profit = price − cost."],
  ["If the cost to make something goes up but the price stays the same, profit…", "goes down", ["goes up", "stays the same", "doubles"], "Less money is left over.", true],
  ["Many people want a new toy, but stores have only a few. The price will likely…", "go up", ["go down", "stay at zero", "disappear"], "High demand and low supply raise prices.", true],
];

const CULTURE_TEXAS: Q[] = [
  ["Many Texas communities celebrate Juneteenth, which began in…", "Galveston, Texas", ["Boston", "Chicago", "Denver"], "It began on June 19, 1865."],
  ["Many Texas towns with Czech roots celebrate with…", "kolaches and polka music", ["kimonos", "kangaroos", "igloos"], "Czech families settled in Central Texas."],
  ["Diez y seis de septiembre celebrates…", "Mexico's independence", ["the first Thanksgiving", "the end of school", "Texas joining the US"], "It is September 16."],
  ["Many German Texans in towns like Fredericksburg hold festivals with…", "German food and music", ["only rodeos", "only fireworks", "only boat races"], "German families settled in the Hill Country."],
];

const LAND_TEXAS: Q[] = [
  ["Big Bend in West Texas has mountains and a dry…", "desert", ["rainforest", "glacier", "swamp"], "Little rain falls there."],
  ["The Piney Woods of East Texas are known for their…", "tall pine forests", ["deserts", "glaciers", "volcanoes"], "East Texas gets more rain."],
  ["Communities on the Texas coast must prepare for…", "hurricanes", ["avalanches", "blizzards every week", "volcanoes"], "Big storms come from the sea."],
  ["Texas farmers on the plains of the Panhandle grow crops such as…", "wheat and cotton", ["coconuts", "rice in snow", "pineapples"], "The plains are flat and wide."],
  ["People in dry West Texas adapt by…", "saving water and building with thick walls", ["building igloos", "growing rice", "wearing snow boots"], "Deserts are hot and dry."],
  ["Wetlands along the Texas coast are home to many…", "birds and fish", ["polar bears", "camels", "penguins"], "Wetlands are wet, marshy land."],
  ["Many Texas cities build reservoirs to store water because Texas sometimes has…", "droughts", ["blizzards all year", "no rivers at all", "too many glaciers"], "A drought is a long time with little rain.", true],
  ["Planting native grasses that need little water is a kind of…", "conservation", ["pollution", "flooding", "erosion"], "Conservation means using resources wisely.", true],
  ["When a new neighborhood is built on farmland, the landscape…", "changes from fields to streets and homes", ["stays the same", "turns into a lake", "becomes a forest"], "Building changes the land."],
];

const CHANGE_TEXAS: Q[] = [
  ["Ruby Bridges took a risk at age 6 to…", "attend a school that had been for white students only", ["climb a mountain", "fly a plane", "win a race"], "She helped end segregation in schools."],
  ["Hector P. Garcia worked for change in Texas by…", "speaking up for equal treatment of veterans", ["breaking laws", "staying silent", "hiding"], "He started the American GI Forum."],
];

export const SOCIAL_3: Unit[] = [
  bankUnit({
    id: "tx-g3-community-builders",
    title: "People Who Built Communities",
    emoji: "🏗️",
    blurb: "Planners, settlers, entrepreneurs and inventors",
    parentNote:
      "Why people form communities, and the people the Texas standards name: Pierre-Charles L'Enfant, Benjamin Banneker, Benjamin Franklin, Daniel Boone and the Founding Fathers; entrepreneurs Henry Ford and Sam Walton; and Jonas Salk, Cyrus McCormick, Bill Gates and Louis Pasteur. Also decades and centuries.",
    standards: [
      "3.1(A); 3.1(B); 3.1(C); 3.2(A); 3.6(D); 3.13(A); 3.13(B); 3.15(C)",
      "people who shaped and created communities, why communities form, entrepreneurs and inventors, and decades and centuries",
    ],
    items: BUILDERS,
  }),
  bankUnit({
    id: "tx-g3-heroes-artists",
    title: "Heroes, Writers & Artists",
    emoji: "🦸",
    blurb: "Brave helpers and the stories they leave",
    parentNote:
      "Good citizens and heroes the Texas standards name (Helen Keller, Clara Barton, Ruby Bridges, Hector P. Garcia, James A. Lovell, the Four Chaplains, Harriet Tubman and Todd Beamer) and writers and artists such as Kadir Nelson, Tomie dePaola, Carmen Lomas Garza and Laura Ingalls Wilder.",
    standards: ["3.9(B); 3.11(A); 3.11(B); 3.12", "good citizens, state and national heroes and first responders, and writers and artists"],
    items: HEROES,
  }),
  bankUnit({
    id: "tx-g3-maps",
    title: "Maps, Scale & Grids",
    emoji: "📏",
    blurb: "Directions, distances and map parts",
    parentNote:
      "Cardinal and intermediate directions, using a map scale to find distances, letter-number grids, and the title, compass rose, legend and scale of a map, with places in Texas.",
    standards: ["3.4(A); 3.4(B); 3.4(C)", "cardinal and intermediate directions, map scale and distance, and map elements including a grid system"],
    items: MAPS,
  }),
  copyOf(
    from(CALIFORNIA_3, "ca-g3-our-region"),
    {
      id: "tx-g3-land-and-people",
      title: "Land & People",
      emoji: "🏜️",
      blurb: "How people adapt to and change the land",
      parentNote:
        "Landforms, climate, resources and natural hazards, how people in deserts, forests, plains and wetlands adapt to or change their surroundings, and the effects of building, conservation and pollution, with Texas regions.",
      standards: ["3.3(A); 3.3(B); 3.3(C)", "differences in physical environments, how communities adapt to or change them, and how human activity shapes the land"],
    },
    LAND_TEXAS,
  ),
  copyOf(
    from(CALIFORNIA_3, "ca-g3-government"),
    {
      id: "tx-g3-government",
      title: "Rules, Laws & Government",
      emoji: "🏛️",
      blurb: "Local, state and national government",
      parentNote:
        "How local, state and national government are set up, how officials are chosen, the services each level provides, the purposes of the Declaration of Independence, the Constitution and the Bill of Rights, and consent of the governed.",
      standards: ["3.7(A); 3.7(B); 3.7(C); 3.8(A); 3.8(B)", "the structure, officials and services of local, state and national government, founding documents and consent of the governed"],
    },
    GOVERNMENT_TEXAS,
  ),
  copyOf(
    from(CALIFORNIA_3, "ca-g3-money-and-voting"),
    {
      id: "tx-g3-money-and-voting",
      title: "Money, Business & Voting",
      emoji: "💵",
      blurb: "Earning, saving, prices and profit",
      parentNote:
        "Earning, spending, saving and donating money, simple budgets, supply and demand, scarcity, costs and profit, and voting as a civic responsibility.",
      standards: ["3.5(A); 3.5(B); 3.6(A); 3.6(B); 3.6(C); 3.9(C)", "earning, spending, saving and donating, budgets, supply and demand, scarcity and profit, and civic responsibility"],
    },
    MONEY_TEXAS,
  ),
  copyOf(
    from(CALIFORNIA_3, "ca-g3-culture"),
    {
      id: "tx-g3-culture",
      title: "Culture & Celebrations",
      emoji: "🎎",
      blurb: "The traditions that make up our communities",
      parentNote:
        "What culture is, the ethnic and cultural celebrations of Texas communities and others, and how they compare. Cultures and religions are described factually.",
      standards: ["3.10(A); 3.10(B)", "the significance of ethnic and cultural celebrations, compared across communities"],
    },
    CULTURE_TEXAS,
  ),
  copyOf(
    from(CALIFORNIA_3, "ca-g3-changemakers"),
    {
      id: "tx-g3-changemakers",
      title: "Changemakers & Good Citizens",
      emoji: "🤝",
      blurb: "Taking part and learning from sources",
      parentNote:
        "Traits of good citizens, how people work for change in their communities, primary and secondary sources, and reading timelines.",
      standards: ["3.9(A); 3.14(B); 3.15(B)", "characteristics of good citizenship, primary and secondary sources, and timelines"],
    },
    CHANGE_TEXAS,
  ),
];
