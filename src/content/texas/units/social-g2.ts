import type { Unit } from "../../types";
import { SOCIAL_2 as CALIFORNIA_2 } from "../../california/units/social-g2";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Texas social studies, Grade 2 (19 TAC §113.13): celebrations and landmarks, the people the TEKS name, Texas and the
// United States on maps, how people change the land, producers and consumers, government and public officials, and
// state and national symbols and songs.

const SYMBOLS: Q[] = [
  ["What is the state bird of Texas?", "the mockingbird", ["the bald eagle", "the cardinal", "the robin"], "It can copy the songs of other birds."],
  ["What is the state flower of Texas?", "the bluebonnet", ["the rose", "the sunflower", "the tulip"], "Fields turn blue with it in spring."],
  ["What is the state tree of Texas?", "the pecan tree", ["the palm tree", "the maple tree", "the apple tree"], "Its nuts are used in pies."],
  ["What is the national bird of the United States?", "the bald eagle", ["the mockingbird", "the turkey", "the blue jay"], "It is on the Great Seal."],
  ["What is the national flower of the United States?", "the rose", ["the bluebonnet", "the daisy", "the lily"], "It became the national flower in 1986."],
  ["Uncle Sam is a symbol of…", "the United States", ["Texas", "a sports team", "a city"], "His initials are U.S."],
  ["Uncle Sam usually wears a tall hat with…", "stars and stripes", ["polka dots", "flowers", "feathers"], "His clothes look like the flag."],
  ["Which song is our national anthem?", "The Star-Spangled Banner", ["America the Beautiful", "Texas, Our Texas", "Yankee Doodle"], "Francis Scott Key wrote it."],
  ["“O say can you see” is the first line of…", "The Star-Spangled Banner", ["America the Beautiful", "Happy Birthday", "Texas, Our Texas"], "It is the national anthem."],
  ["“For amber waves of grain” is a line from…", "America the Beautiful", ["The Star-Spangled Banner", "Texas, Our Texas", "Old MacDonald"], "It describes the land."],
  ["“America the Beautiful” is a song about the country's…", "land and people", ["sports teams", "favorite foods", "school rules"], "It sings of mountains and plains."],
  ["“Honor the Texas flag; I pledge allegiance to thee, Texas…” is the…", "Pledge to the Texas Flag", ["Pledge of Allegiance", "national anthem", "state song"], "It names our state."],
  ["Which pledge says “one nation under God, indivisible”?", "the Pledge of Allegiance", ["the Pledge to the Texas Flag", "the state song", "a school cheer"], "It is the pledge to the US flag."],
  ["The Alamo is a landmark because…", "a famous battle for Texas happened there", ["it is the newest building", "it is a mall", "it is a zoo"], "It is in San Antonio."],
  ["The Texas State Capitol in Austin is where…", "state lawmakers meet", ["the president lives", "the army trains", "movies are made"], "It has a big dome."],
  ["The White House is where…", "the president lives and works", ["the governor lives", "Congress meets", "the Supreme Court meets"], "It is in Washington, D.C."],
  ["The Lincoln Memorial honors…", "Abraham Lincoln", ["George Washington", "Sam Houston", "Thomas Edison"], "Its name tells you."],
  ["The Statue of Liberty stands for…", "freedom", ["farming", "sports", "weather"], "She holds a torch."],
  ["A landmark is a place that is…", "important or easy to recognize", ["always new", "always small", "secret"], "Monuments and capitols are landmarks."],
  ["A monument is built to…", "honor a person or event", ["sell food", "store cars", "grow crops"], "Monuments help us remember."],
  ["Texas is called the Lone Star State because of the star on its…", "flag", ["capitol", "money", "trees"], "The flag has one white star."],
  ["How does a class use voting to pick a field trip?", "each student gets one vote and the most votes wins", ["the teacher's pet picks", "the loudest picks", "nobody picks"], "Voting is fair."],
  ["The Statue of Liberty welcomed people who came to start new lives. This shows the American love of…", "freedom", ["rules", "silence", "homework"], "Liberty means freedom.", true],
  ["Francis Scott Key wrote the national anthem after watching a battle at…", "Fort McHenry", ["the Alamo", "San Jacinto", "Gettysburg"], "It was during the War of 1812.", true],
  ["The bald eagle was chosen as a national symbol because it stands for…", "strength and freedom", ["sleep", "speed limits", "school"], "It flies high and free.", true],
  ["Mount Rushmore is a landmark carved with the faces of…", "four presidents", ["four astronauts", "four inventors", "four governors of Texas"], "George Washington and Abraham Lincoln are two of them.", true],
  ["Inventors like the Wright brothers show the American love of…", "inventiveness", ["sleeping", "staying still", "giving up"], "They built the first successful airplane.", true],
  ["Why do people sing the national anthem before games?", "to show respect for the country", ["to start the snack bar", "to warm up", "to pick teams"], "It is a patriotic custom.", true],
];

const PEOPLE: Q[] = [
  ["Thurgood Marshall was the first African American…", "Supreme Court justice", ["president", "astronaut", "governor of Texas"], "He served on the highest court."],
  ["As a lawyer, Thurgood Marshall won a case that ended…", "segregated public schools", ["recess", "school lunches", "summer break"], "The case was Brown v. Board of Education."],
  ["Irma Rangel was the first Mexican American woman elected to…", "the Texas House of Representatives", ["the moon", "the Olympics", "a city zoo"], "She helped make Texas laws."],
  ["Irma Rangel worked to help more Texas students…", "go to college", ["skip school", "buy cars", "move away"], "She cared about education."],
  ["Theodore Roosevelt was a president who protected…", "land for national parks", ["only cities", "only factories", "only roads"], "He loved nature."],
  ["The teddy bear is named for…", "Theodore Roosevelt", ["Thurgood Marshall", "Paul Revere", "Sam Houston"], "His nickname was Teddy."],
  ["Paul Revere rode a horse at night to warn that…", "British soldiers were coming", ["a storm was coming", "school was closed", "a party had started"], "It was 1775."],
  ["Abigail Adams wrote letters asking leaders to…", "remember the ladies", ["build more roads", "close the schools", "plant more trees"], "She wanted women treated fairly."],
  ["Abigail Adams was married to…", "John Adams, the second president", ["George Washington", "Abraham Lincoln", "Paul Revere"], "She later lived in the White House."],
  ["The WASPs were women pilots who, in World War II, flew…", "military planes in the United States", ["spaceships", "hot air balloons", "kites"], "WASP stands for Women Airforce Service Pilots."],
  ["Many WASPs trained at Avenger Field in…", "Sweetwater, Texas", ["Paris, France", "Tokyo, Japan", "Rome, Italy"], "It is in West Texas."],
  ["The Navajo Code Talkers used their own language to…", "send secret messages in World War II", ["sing songs", "build houses", "write a cookbook"], "The enemy never broke the code."],
  ["Sojourner Truth escaped slavery and spoke out for…", "the end of slavery and women's rights", ["more taxes", "longer school days", "faster horses"], "She gave a famous speech."],
  ["Amelia Earhart was the first woman to fly alone across the…", "Atlantic Ocean", ["street", "playground", "pond"], "She was a brave pilot."],
  ["George Washington Carver found many uses for…", "peanuts and sweet potatoes", ["oil and gas", "gold and silver", "ice and snow"], "He was a scientist and teacher."],
  ["George Washington Carver taught farmers to rotate crops so that…", "the soil stayed healthy", ["the farm got bigger", "it rained more", "the cows ate less"], "Different crops help the soil."],
  ["A good citizen who is truthful…", "tells the truth", ["takes things", "breaks rules", "ignores others"], "Truthful means honest."],
  ["Equality means…", "everyone has the same rights", ["some people have more rights", "nobody has rights", "only adults have rights"], "Equal means the same."],
  ["Justice means…", "being fair", ["being fast", "being loud", "being rich"], "Judges work for justice."],
  ["Which is a way to practice good citizenship?", "help clean a park", ["litter", "cut in line", "break a window"], "Good citizens help the community."],
  ["Volunteering at a food bank is an example of…", "community service", ["a job for pay", "a law", "a tax"], "Volunteers help without pay."],
  ["Which two people were pilots?", "Amelia Earhart and the WASPs", ["Thurgood Marshall and Irma Rangel", "Paul Revere and Abigail Adams", "Sojourner Truth and Theodore Roosevelt"], "They flew airplanes.", true],
  ["Which person influenced Texas by making state laws?", "Irma Rangel", ["Amelia Earhart", "Paul Revere", "Sojourner Truth"], "She served in the Texas House.", true],
  ["Amelia Earhart and George Washington Carver both showed…", "inventiveness and courage to try new things", ["that rules don't matter", "that trying is pointless", "that only adults matter"], "They tried things no one had done.", true],
  ["Thurgood Marshall grew up in Baltimore and later served on the Supreme Court in…", "Washington, D.C.", ["Austin", "Galveston", "New Orleans"], "The Supreme Court meets in the US capital.", true],
  ["Why were the Navajo Code Talkers good citizens?", "they used their skills to serve their country", ["they stayed home", "they broke rules", "they kept secrets from their own side"], "They helped in World War II.", true],
  ["Learning about candidates before you vote is part of…", "good citizenship", ["breaking the law", "littering", "skipping school"], "Informed voters make good choices.", true],
  ["Who warned colonists with a midnight ride?", "Paul Revere", ["Theodore Roosevelt", "Thurgood Marshall", "George Washington Carver"], "One if by land, two if by sea.", true],
];

const LAND: Q[] = [
  ["What is the capital of Texas?", "Austin", ["Houston", "Dallas", "San Antonio"], "The State Capitol is there."],
  ["What is the capital of the United States?", "Washington, D.C.", ["New York City", "Austin", "Philadelphia"], "The president lives there."],
  ["Which country borders the United States to the north?", "Canada", ["Mexico", "Brazil", "Cuba"], "It is a large country to the north."],
  ["Which country borders Texas to the south?", "Mexico", ["Canada", "Peru", "Spain"], "The Rio Grande separates them."],
  ["Which river forms the border between Texas and Mexico?", "the Rio Grande", ["the Mississippi", "the Hudson", "the Ohio"], "Its name means big river."],
  ["On which continent are Texas and the United States?", "North America", ["South America", "Europe", "Africa"], "Canada and Mexico are on it too."],
  ["How many continents are there?", "seven", ["five", "four", "ten"], "Asia is the largest."],
  ["Which is the largest ocean?", "the Pacific Ocean", ["the Atlantic Ocean", "the Indian Ocean", "the Arctic Ocean"], "It lies west of North America."],
  ["Which ocean lies between North America and Europe?", "the Atlantic Ocean", ["the Pacific Ocean", "the Indian Ocean", "the Southern Ocean"], "Columbus crossed it."],
  ["Which continent is at the South Pole?", "Antarctica", ["Australia", "Africa", "Europe"], "It is covered in ice."],
  ["A big body of salt water that covers much of Earth is an…", "ocean", ["island", "hill", "pond"], "Earth has five of them."],
  ["A mountain is a…", "very high landform", ["kind of lake", "flat field", "road"], "It rises high above the land around it."],
  ["People cleared land for farms. They…", "changed the environment", ["made more forests", "stopped using land", "made it rain"], "Clearing land changes it."],
  ["Drilling for oil in Texas is a way people…", "use and change the land", ["grow trees", "make rivers", "build mountains"], "Oil is pumped out of the ground."],
  ["Building a new road through a field can…", "cut down trees and change animal homes", ["make the field bigger", "plant new trees", "make it rain"], "Changes have results."],
  ["Building a dam on a river can make a…", "lake", ["mountain", "desert", "volcano"], "Water piles up behind the dam."],
  ["Which is a way to conserve water?", "turn off the tap while brushing", ["leave the hose on", "take very long showers", "water the sidewalk"], "Conserve means save."],
  ["Planting trees after cutting some is a way to…", "replenish a resource", ["waste a resource", "pollute water", "build a road"], "Replenish means put back."],
  ["Recycling cans and paper helps…", "save Earth's resources", ["make more trash", "dirty the water", "waste energy"], "Things get used again."],
  ["Which is a natural resource found in Texas?", "oil", ["plastic toys", "cars", "computers"], "It comes from the ground."],
  ["Texas farms and ranches use land for…", "crops and cattle", ["skyscrapers", "airports only", "oceans"], "Cotton and cattle are big in Texas."],
  ["One effect of too much pollution is…", "dirty air and water", ["more fish", "cleaner rivers", "taller trees"], "Pollution harms the environment."],
  ["Which state is north of Texas?", "Oklahoma", ["Louisiana", "New Mexico", "Florida"], "The Red River is between them.", true],
  ["On a globe, which country is directly south of the United States?", "Mexico", ["Canada", "Greenland", "Russia"], "Texas shares a border with it.", true],
  ["Which continent is the largest?", "Asia", ["Europe", "Australia", "South America"], "China and India are on it.", true],
  ["Which ocean is at the far north of Earth?", "the Arctic Ocean", ["the Indian Ocean", "the Pacific Ocean", "the Atlantic Ocean"], "It is very cold and icy.", true],
  ["When a forest is cleared for houses, one consequence is…", "animals lose their homes", ["more trees grow", "the river gets bigger", "nothing changes"], "Every change has effects.", true],
  ["Which continent is Mexico on?", "North America", ["South America", "Asia", "Africa"], "Mexico is next to Texas.", true],
];

const CELEBRATIONS: Q[] = [
  ["Veterans Day honors people who…", "served in the armed forces", ["built houses", "wrote books", "grew food"], "It is in November."],
  ["Memorial Day honors people who…", "died serving in the military", ["won a race", "started a business", "planted a tree"], "It is the last Monday in May."],
  ["Independence Day celebrates the…", "Declaration of Independence in 1776", ["first moon landing", "end of school", "first Thanksgiving"], "It is on July 4."],
  ["Thanksgiving is a time to…", "give thanks and share a meal", ["wear costumes", "light fireworks", "exchange valentines"], "It is in November."],
  ["Juneteenth celebrates the day in 1865 when people in Galveston, Texas, learned…", "enslaved people were free", ["the war had started", "school was out", "the railroad was done"], "It is on June 19."],
  ["Texas Independence Day, March 2, marks the day Texas…", "declared independence from Mexico", ["became a city", "built its capitol", "joined Canada"], "It was in 1836."],
  ["Lunar New Year is celebrated by many families with roots in…", "East Asia", ["Antarctica", "the Arctic", "the moon"], "Families share foods and red envelopes."],
  ["Diwali is a festival of…", "lights", ["snow", "kites only", "silence"], "Families light small lamps."],
  ["Hanukkah is a Jewish festival when families light…", "candles for eight nights", ["a bonfire", "fireworks", "one lantern"], "The candles go in a menorah."],
  ["Día de los Muertos is a Mexican celebration to…", "remember loved ones who have died", ["start the school year", "celebrate rain", "honor presidents"], "Families make altars with photos and flowers."],
  ["Cinco de Mayo remembers a Mexican victory in a battle at…", "Puebla", ["the Alamo", "Galveston", "Gettysburg"], "It was on May 5, 1862."],
  ["Kwanzaa is a week-long celebration of…", "African American culture and family", ["the first snow", "a sports win", "a new president"], "Families light seven candles."],
  ["A parade with lion dancers is part of…", "Lunar New Year", ["Thanksgiving", "Veterans Day", "Independence Day"], "The lion dance brings good luck."],
  ["An ethnic celebration is a celebration of a group's…", "culture and heritage", ["sports team", "weather", "lunch menu"], "It shares traditions."],
  ["Why do communities hold cultural festivals?", "to share and keep traditions", ["to stop traditions", "to close schools", "to sell cars"], "Festivals bring people together."],
  ["How are Diwali and Hanukkah alike?", "both use lights", ["both are in July", "both are about turkeys", "both honor presidents"], "Think of lamps and candles."],
  ["How are Juneteenth and Independence Day alike?", "both celebrate freedom", ["both are in winter", "both are about food only", "both began in Mexico"], "Think about what each day means."],
  ["Many Texas towns hold rodeos to celebrate…", "ranching traditions", ["ocean fishing only", "snow sports", "space travel"], "Cowboys and cattle are part of Texas history."],
  ["A tamalada is a gathering where families make…", "tamales", ["snowmen", "kites", "quilts"], "It is a Mexican American holiday tradition."],
  ["Which celebration is for the whole nation?", "Independence Day", ["a family reunion", "a birthday", "a school play"], "The whole country celebrates it."],
  ["Which celebration began in Texas?", "Juneteenth", ["Hanukkah", "Diwali", "Lunar New Year"], "It began in Galveston.", true],
  ["How is Memorial Day different from Veterans Day?", "Memorial Day remembers those who died serving", ["Memorial Day is in July", "Veterans Day has no flags", "they are the same day"], "Veterans Day thanks all who served.", true],
  ["How is Día de los Muertos different from Halloween?", "it honors loved ones who have died", ["it is about candy only", "it is in summer", "it is about presidents"], "Families remember people they love.", true],
  ["Comparing two celebrations means finding how they are…", "alike and different", ["only alike", "only different", "right or wrong"], "Look for both.", true],
  ["Your town holds a festival each year to honor its founding. This is a…", "community celebration", ["national holiday", "law", "tax"], "It is for your community.", true],
  ["San Jacinto Day, April 21, is a Texas celebration because Texans…", "won their independence in that battle", ["found gold", "built a port", "started school"], "Sam Houston led the Texans.", true],
  ["Many Vietnamese American families celebrate the Lunar New Year, called…", "Tết", ["Diwali", "Kwanzaa", "Hanukkah"], "It is a time for family and new beginnings.", true],
];

const GOVERNMENT_TEXAS: Q[] = [
  ["Who leads the government of Texas?", "the governor", ["the mayor", "the president", "the principal"], "Every state has a governor."],
  ["A mayor leads a city. A governor leads a…", "state", ["school", "country", "family"], "Texas is a state."],
  ["The president leads the…", "whole country", ["city", "state", "school"], "The president works in Washington, D.C."],
  ["Texas voters choose their governor in an…", "election", ["auction", "lottery", "race"], "People vote for leaders."],
  ["A judge picked by a governor is chosen by…", "appointment", ["election", "a coin toss", "a race"], "Appoint means pick for a job."],
  ["Citizens can tell leaders what they think by…", "writing letters or speaking at meetings", ["staying silent", "littering", "hiding"], "Public officials want input."],
];

const MAPS_TEXAS: Q[] = [
  ["A map of Austin would show…", "streets, parks and buildings of the city", ["every country", "the moon", "only oceans"], "A city map shows city places."],
  ["On a map of Texas, Dallas is north of Houston. Houston is ___ of Dallas.", "south", ["north", "east", "west"], "North and south are opposites."],
];

const TRADING_TEXAS: Q[] = [
  ["Cotton from a Texas farm is made into…", "T-shirts", ["pecan pie", "gasoline", "bricks"], "Cotton is a plant fiber."],
  ["Cattle raised on a Texas ranch give us beef and…", "leather for boots", ["glass", "cotton", "paper"], "Leather comes from cowhide."],
  ["Oil pumped from the ground in Texas is made into…", "gasoline", ["bread", "wool", "wood"], "Cars use it."],
  ["Pecans from a Texas orchard can be made into…", "a pie", ["a shirt", "a tire", "a window"], "Pecans are nuts."],
];

export const SOCIAL_2: Unit[] = [
  bankUnit({
    id: "tx-g2-symbols",
    title: "Symbols, Songs & Landmarks",
    emoji: "🦅",
    blurb: "The mockingbird, the bluebonnet and Uncle Sam",
    parentNote:
      "State and national birds and flowers, Uncle Sam, the two pledges, “The Star-Spangled Banner” and “America the Beautiful,” and landmarks such as the Alamo, the Texas Capitol and the White House.",
    standards: ["2.1(B); 2.11(A); 2.11(B); 2.11(C); 2.11(D); 2.11(E)", "landmarks, the pledges, patriotic songs, state and national symbols, and voting"],
    items: SYMBOLS,
  }),
  bankUnit({
    id: "tx-g2-people",
    title: "People Who Made a Difference",
    emoji: "✈️",
    blurb: "Leaders, good citizens and inventors",
    parentNote:
      "The people the Texas standards name for Grade 2: Thurgood Marshall, Irma Rangel, Theodore Roosevelt, Paul Revere, Abigail Adams, the Women Airforce Service Pilots, the Navajo Code Talkers, Sojourner Truth, Amelia Earhart and George Washington Carver, and what good citizenship means.",
    standards: ["2.2(A); 2.10(A); 2.10(B); 2.10(C); 2.14", "historical figures who influenced the state and nation, good citizenship, and inventive individuals"],
    items: PEOPLE,
  }),
  bankUnit({
    id: "tx-g2-our-land",
    title: "Texas, Our Land",
    emoji: "🌎",
    blurb: "Places on the map and how people change the land",
    parentNote:
      "Finding Texas, Austin, the United States, Washington, D.C., Canada and Mexico on maps and globes, the continents and oceans, how people change the land by farming, building roads and drilling for oil, and ways to conserve resources.",
    standards: ["2.4(A); 2.4(B); 2.5(A); 2.5(B); 2.5(C)", "continents, oceans and places on maps, how people modify the environment, and conserving resources"],
    items: LAND,
  }),
  bankUnit({
    id: "tx-g2-celebrations",
    title: "Celebrations Near & Far",
    emoji: "🏮",
    blurb: "Community, state, national and cultural celebrations",
    parentNote:
      "Why we celebrate Veterans Day, Memorial Day, Independence Day, Thanksgiving, Juneteenth and Texas Independence Day, and what some ethnic and cultural celebrations mean, compared side by side. Religious and cultural celebrations are described factually.",
    standards: ["2.1(A); 2.12(A); 2.12(B)", "community, state and national celebrations, and ethnic and cultural celebrations compared"],
    items: CELEBRATIONS,
  }),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-who-runs-our-town"),
    {
      id: "tx-g2-government",
      title: "Who Runs Our Community?",
      emoji: "🏛️",
      blurb: "Laws, services and public officials",
      parentNote:
        "What governments do (keep order, provide security, manage conflict), services such as police, fire protection, libraries, schools and parks, and how a mayor, the governor and the president are chosen and what they do.",
      standards: ["2.8(A); 2.8(B); 2.9(B); 2.9(C); 2.9(D)", "functions and services of government, and the roles and selection of public officials"],
    },
    GOVERNMENT_TEXAS,
  ),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-reading-maps"),
    {
      id: "tx-g2-reading-maps",
      title: "Reading Maps",
      emoji: "🧭",
      blurb: "Titles, directions and legends",
      parentNote: "Map titles, cardinal and in-between directions, legends and symbols, grids and simple scales, and maps of the home, school and community.",
      standards: ["2.3(A); 2.3(B)", "using map elements such as title, cardinal directions and legend, and making maps of familiar places"],
    },
    MAPS_TEXAS,
  ),
  copyOf(
    from(CALIFORNIA_2, "ca-g2-making-trading"),
    {
      id: "tx-g2-making-trading",
      title: "Making & Trading",
      emoji: "🧺",
      blurb: "Producers, consumers and where things come from",
      parentNote:
        "Producing and consuming, how people are both producers and consumers, and how a natural resource becomes a finished product, with Texas cotton, cattle, oil and pecans.",
      standards: ["2.7(A); 2.7(B); 2.7(C)", "producers and consumers, and tracing a product from a natural resource to a finished good"],
    },
    TRADING_TEXAS,
  ),
];
