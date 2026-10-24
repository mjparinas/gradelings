import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// South Carolina's own Grade 2 social studies units (`sc-` ids), for Life in the United States: the nation's symbols,
// landmarks, holidays and the events they recall (2.H.1, 2.H.4), and the landforms, regions and resources of the United
// States (2.G.2, 2.CG.1).

const SYMBOLS: Q[] = [
  ["The bald eagle is a symbol of…", "the United States", ["South Carolina only", "Canada", "the ocean"], "It is our national bird."],
  ["The 50 stars on the American flag stand for the…", "50 states", ["50 presidents", "50 cities", "50 rivers"], "South Carolina is one of them."],
  ["The 13 stripes on the American flag stand for the…", "first 13 colonies", ["13 presidents", "13 states today", "13 rivers"], "South Carolina was one of the 13."],
  ["The Statue of Liberty was a gift from…", "France", ["England", "Mexico", "Japan"], "It stands in a harbor and welcomes people."],
  ["The Liberty Bell is a symbol of…", "freedom", ["winter", "sports", "farming"], "It has a famous crack."],
  ["The Declaration of Independence was signed in…", "1776", ["1492", "1865", "1969"], "We celebrate it every summer."],
  ["On the Fourth of July we celebrate…", "the birthday of the United States", ["the first day of school", "the end of winter", "Thanksgiving"], "Independence Day."],
  ["Who was the first President of the United States?", "George Washington", ["Abraham Lincoln", "Martin Luther King Jr.", "Thomas Edison"], "His face is on the one-dollar bill."],
  ["The White House is the home of the…", "President", ["governor", "mayor", "king"], "It is in Washington, D.C."],
  ["Mount Rushmore shows the faces of four…", "Presidents", ["astronauts", "inventors", "singers"], "They are carved into a mountain."],
  ["Martin Luther King Jr. Day honors a leader who worked for…", "equal rights for everyone", ["faster cars", "new games", "bigger cities"], "He spoke about his dream."],
  ["Veterans Day honors people who…", "served in the armed forces", ["planted gardens", "wrote books", "won races"], "Soldiers, sailors and pilots."],
  ["Memorial Day honors soldiers who…", "died serving our country", ["are still in school", "built roads", "sailed for fun"], "It is in late May."],
  ["The Pledge of Allegiance is a promise to be loyal to the…", "United States", ["school team", "state bird", "ocean"], "We say it facing the flag."],
  ["Our national anthem is…", "The Star-Spangled Banner", ["Row, Row, Row Your Boat", "Happy Birthday", "Jingle Bells"], "It was written during the War of 1812."],
  ["The capital of the United States is…", "Washington, D.C.", ["Columbia", "Charleston", "New Orleans"], "Congress and the President work there."],
  ["Which is a primary source about a past event?", "a photo taken that day", ["a cartoon made last week", "a guess", "a made-up story"], "It comes from the time of the event."],
  ["Which is a fact?", "The flag has 50 stars.", ["The flag is the prettiest one.", "Blue is the best color.", "Parades are boring."], "A fact can be checked.", true],
  ["Why did people in the colonies want independence?", "they wanted to make their own laws", ["they wanted a new king", "they liked high taxes", "they wanted to move to France"], "Think about who made the rules.", true],
  ["Abraham Lincoln was President during the…", "Civil War", ["American Revolution", "first moon landing", "War of 1812"], "He helped end slavery.", true],
  ["In 1969, American astronauts were the first people to…", "walk on the Moon", ["fly a kite", "sail to Europe", "climb a mountain"], "Neil Armstrong took the first step.", true],
  ["Presidents' Day, in February, honors George Washington and…", "other Presidents", ["the first astronauts", "famous singers", "state birds"], "It is about the nation's leaders.", true],
  ["How can you tell if a website about history is trustworthy?", "check who wrote it and compare with other sources", ["believe it if it has pictures", "trust it if it is long", "never check"], "Good researchers check facts.", true],
  ["The Constitution begins with the words…", "We the People", ["Once upon a time", "Hello America", "The End"], "It is about the people.", true],
];

const US_LAND: Q[] = [
  ["The United States is on which continent?", "North America", ["South America", "Europe", "Africa"], "Canada and Mexico are on it too."],
  ["Which country is north of the United States?", "Canada", ["Mexico", "Brazil", "China"], "It is a very big country."],
  ["Which country is south of the United States?", "Mexico", ["Canada", "England", "Japan"], "It shares a long border."],
  ["Which ocean is on the east coast of the United States?", "the Atlantic Ocean", ["the Pacific Ocean", "the Arctic Ocean", "the Indian Ocean"], "South Carolina's beaches are on it."],
  ["Which ocean is on the west coast of the United States?", "the Pacific Ocean", ["the Atlantic Ocean", "the Arctic Ocean", "the Indian Ocean"], "It is the largest ocean."],
  ["The longest river system in the United States is the…", "Mississippi and Missouri rivers", ["Santee River", "Nile River", "Amazon River"], "It flows south to the Gulf."],
  ["The Rocky Mountains are in the…", "West", ["East", "middle of the ocean", "Southeast coast"], "They are tall and rocky."],
  ["The Appalachian Mountains are in the…", "East", ["West", "middle of the Pacific", "far North in Canada only"], "They reach into the Upstate of South Carolina."],
  ["The Great Plains are…", "wide, flat lands in the middle of the country", ["tall mountains", "a big ocean", "a group of islands"], "Farmers grow wheat and corn there."],
  ["Deep canyons in the West were carved over millions of years by…", "rivers", ["volcanoes", "people with shovels", "tornadoes"], "Water slowly wore away rock."],
  ["The five Great Lakes are on the border between the United States and…", "Canada", ["Mexico", "Cuba", "Brazil"], "They are in the north."],
  ["A dry place that gets very little rain is a…", "desert", ["swamp", "rainforest", "lake"], "Cactus plants grow there."],
  ["Wheat and corn grow well on the Great Plains because…", "the land is flat and the soil is rich", ["it is always snowy", "it is in the ocean", "there are no plants"], "Flat land and good soil help farms."],
  ["Fishing towns grow up near…", "oceans and lakes", ["deserts", "mountain tops", "caves"], "Fish live in water."],
  ["People who move to a new country to live are called…", "immigrants", ["governors", "tourists", "farmers"], "Many families in the United States came this way."],
  ["People in the United States come from many cultures. A culture is a group's…", "way of life, food, language and holidays", ["favorite color only", "house number", "weather"], "It is how a group lives."],
  ["People from many places living together and sharing their cultures can…", "learn from each other", ["never talk", "only argue", "stay apart"], "Respect builds friendships."],
  ["Over time, people built dams on rivers to…", "make electricity and store water", ["make rivers longer", "dry up the ocean", "grow mountains"], "Dams hold back water.", true],
  ["Why did many towns grow beside rivers long ago?", "rivers gave water and a way to travel", ["rivers were quiet", "there was no land elsewhere", "rivers kept people away"], "Boats moved goods on rivers.", true],
  ["Coal and oil are natural resources used to…", "make energy", ["grow food", "make clouds", "build mountains"], "They are burned for power.", true],
  ["A river slowly changing its path over many years is an example of…", "a landform changing over time", ["a holiday", "a law", "a culture"], "Land changes slowly.", true],
  ["When roads and railroads were built across the country, towns near them…", "grew", ["disappeared", "turned into lakes", "moved to the ocean"], "Easier travel brings people and trade.", true],
  ["Which is a human feature?", "a bridge", ["a mountain", "a river", "a lake made by a glacier"], "People built it.", true],
  ["Which is a physical feature?", "a canyon", ["a highway", "a school", "a farm"], "Nature made it.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "sc-g2-american-symbols",
    title: "American Symbols & History",
    emoji: "🦅",
    blurb: "Flags, landmarks, holidays and the events behind them",
    parentNote:
      "American symbols, landmarks and holidays and the events and people they recall, from 1776 to the Moon landing, plus telling facts from opinions and judging sources.",
    standards: ["2.H.1; 2.H.4", "significant events, symbols and holidays in US history, and judging evidence"],
    items: SYMBOLS,
  }),
  bankUnit({
    id: "sc-g2-us-land",
    title: "Our Country's Land & People",
    emoji: "🗺️",
    blurb: "Mountains, plains, rivers and the many cultures of the United States",
    parentNote:
      "Where the United States is, its major landforms and rivers, how land and resources shape where people live and work, and the many cultural groups who live in the country.",
    standards: ["2.G.2; 2.CG.1", "US landforms and how they change, and the cultural groups of the United States"],
    items: US_LAND,
  }),
];
