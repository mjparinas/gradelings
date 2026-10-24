import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Tennessee Grade 2 social studies: Tennessee's cities, rivers and mountains, and the eight states that border it
// (2.16, 2.17); the United States and Tennessee constitutions, the three branches and the principles of the American
// constitutional republic (2.18, 2.19, 2.20, 2.24); and national monuments and symbols (2.25).

const NEIGHBORS: Q[] = [
  ["How many states border Tennessee?", "8", ["4", "13"], "Tennessee ties for the most neighbors."],
  ["Which state is north of Tennessee?", "Kentucky", ["Georgia", "Mississippi"], "Kentucky and Virginia are to the north."],
  ["Which state is east of Tennessee, across the Smoky Mountains?", "North Carolina", ["Arkansas", "Missouri"], "The mountains are the border."],
  ["Which three states are south of Tennessee?", "Georgia, Alabama and Mississippi", ["Kentucky, Virginia and Missouri", "Ohio, Texas and Florida"], "Look below Tennessee on the map."],
  ["Which two states are west of Tennessee, across the Mississippi River?", "Arkansas and Missouri", ["Georgia and Alabama", "Kentucky and Virginia"], "The river is the border."],
  ["Virginia touches Tennessee's…", "northeast corner", ["southwest corner", "western edge"], "It is north and east."],
  ["Which river forms Tennessee's western border?", "the Mississippi River", ["the Cumberland River", "the Tennessee River"], "Memphis sits on it."],
  ["Which river runs through Nashville?", "the Cumberland River", ["the Mississippi River", "the Hudson River"], "It flows through Middle Tennessee."],
  ["Which river flows past Knoxville and Chattanooga?", "the Tennessee River", ["the Cumberland River", "the Mississippi River"], "It shares the state's name."],
  ["The Great Smoky Mountains are part of the…", "Appalachian Mountains", ["Rocky Mountains", "Andes"], "They run along the East Coast states."],
  ["The Great Smoky Mountains are on Tennessee's…", "eastern border", ["western border", "southern tip"], "North Carolina is on the other side."],
  ["Which city is in the far southwest corner of Tennessee?", "Memphis", ["Knoxville", "Nashville"], "It is on the Mississippi."],
  ["Which city sits near the Georgia state line?", "Chattanooga", ["Memphis", "Nashville"], "It is in southeast Tennessee."],
  ["Which city is Tennessee's capital?", "Nashville", ["Memphis", "Knoxville"], "It is in Middle Tennessee."],
  ["Which city is in East Tennessee, close to the Smokies?", "Knoxville", ["Memphis", "Nashville"], "It is near the mountains."],
  ["A political map shows…", "states, cities and borders", ["only mountains", "only weather"], "People make the borders."],
  ["Kentucky is north of Tennessee. Which state is north of Mississippi?", "Tennessee", ["Georgia", "Missouri"], "Mississippi is south of us.", true],
  ["The Tennessee River flows into Alabama, then turns north and crosses Tennessee again into…", "Kentucky", ["Georgia", "Arkansas"], "It joins the Ohio River there.", true],
  ["You cross the Mississippi River from Memphis. Which state are you in?", "Arkansas", ["Georgia", "Kentucky"], "It is just west of Memphis.", true],
  ["Why are many big cities built beside rivers?", "boats could carry people and goods", ["rivers keep cities cold", "rivers stop all rain"], "Rivers were the first highways.", true],
  ["Which state touches Tennessee only at its far northwest corner, across the river?", "Missouri", ["Georgia", "Virginia"], "It is north of Arkansas.", true],
  ["Using a compass rose, Georgia is which direction from Tennessee?", "south", ["north", "west"], "It is below Tennessee on the map.", true],
  ["Mountains on a physical map are often shown in…", "brown", ["blue", "pink"], "Water is blue.", true],
  ["Which state is between Tennessee and Washington, D.C.?", "Virginia", ["Arkansas", "Mississippi"], "It is to the northeast.", true],
  ["Tennessee shares the Great Smoky Mountains National Park with…", "North Carolina", ["Kentucky", "Alabama"], "The park crosses the border.", true],
];

const CONSTITUTIONS: Q[] = [
  ["The United States Constitution is…", "the plan for our nation's government and laws", ["a song", "a map of the states"], "It was written in 1787."],
  ["Tennessee's constitution is the basis for…", "our state's laws", ["the country's flag", "the weather"], "Each state has one."],
  ["How many branches does the United States government have?", "3", ["2", "50"], "Legislative, executive and judicial."],
  ["Which branch makes the laws?", "the legislative branch", ["the executive branch", "the judicial branch"], "In the nation, it is Congress."],
  ["Which branch carries out the laws?", "the executive branch", ["the legislative branch", "the judicial branch"], "The President leads it."],
  ["Which branch decides what the laws mean?", "the judicial branch", ["the executive branch", "the legislative branch"], "Courts and judges."],
  ["The nation's laws are made by…", "Congress", ["the Supreme Court", "the mayor"], "Congress meets in Washington, D.C."],
  ["Who leads the executive branch of the United States?", "the President", ["the governor", "a judge"], "The President signs laws."],
  ["The highest court in the United States is the…", "Supreme Court", ["Congress", "White House"], "Its judges are called justices."],
  ["Who leads Tennessee's executive branch?", "the governor", ["the President", "the mayor"], "The governor works in Nashville."],
  ["Equality means…", "everyone is treated the same under the law", ["only grown-ups have rights", "some people get more"], "Fair treatment for all."],
  ["Respecting other people's property means you…", "don't take or break their things", ["borrow without asking", "keep what you find"], "Property is what belongs to someone."],
  ["The right to vote lets citizens…", "choose their leaders", ["skip school", "make any law alone"], "Voting is a right and a responsibility."],
  ["Why do we have three branches?", "so no one part has all the power", ["so there are more holidays", "so laws are secret"], "Each branch checks the others."],
  ["The Constitution begins with the words…", "We the People", ["Once upon a time", "Dear Sir"], "The people are in charge."],
  ["Who can vote in elections in the United States?", "citizens who are 18 or older", ["anyone age 5 or older", "only the President"], "You will vote one day.", true],
  ["Tennessee's lawmakers meet in Nashville in the…", "General Assembly", ["Supreme Court", "White House"], "It makes Tennessee's laws.", true],
  ["If a law is broken, there are…", "consequences, such as a fine", ["prizes", "no changes at all"], "Laws keep us safe.", true],
  ["Changes to the Constitution are called…", "amendments", ["chapters", "verses"], "There are 27.", true],
  ["Why is a constitution important for a state?", "it sets up the government and protects rights", ["it lists the state's songs", "it names every town"], "It is the basic plan.", true],
  ["Which is a fair way to choose class leaders?", "everyone votes", ["the tallest child decides", "one person picks alone"], "Each vote counts.", true],
  ["Courts and judges are part of which branch?", "the judicial branch", ["the legislative branch", "the executive branch"], "They settle disagreements about laws.", true],
  ["Congress is part of which branch?", "the legislative branch", ["the executive branch", "the judicial branch"], "It writes laws.", true],
  ["The first ten amendments to the Constitution are the…", "Bill of Rights", ["Ten Commandments", "Pledge of Allegiance"], "They protect freedoms like speech.", true],
  ["A republic is a country where people choose…", "leaders to make decisions for them", ["a king by birth", "nobody to lead"], "We elect our leaders.", true],
];

const MONUMENTS: Q[] = [
  ["The Liberty Bell is a symbol of…", "freedom", ["breakfast", "rain"], "It has a famous crack."],
  ["The White House is where…", "the President lives and works", ["Congress meets", "the Supreme Court meets"], "It is in Washington, D.C."],
  ["The Statue of Liberty welcomed people arriving by ship to…", "New York Harbor", ["the Gulf of Mexico", "the Great Lakes"], "She holds a torch."],
  ["The Statue of Liberty was a gift from…", "France", ["Japan", "Brazil"], "It arrived in 1885."],
  ["Our national bird is the…", "bald eagle", ["mockingbird", "robin"], "It stands for strength and freedom."],
  ["The National Mall is in…", "Washington, D.C.", ["Nashville", "Memphis"], "It is a long park with memorials."],
  ["The tall stone tower on the National Mall honors…", "George Washington", ["Abraham Lincoln", "Martin Luther King, Jr."], "It is the Washington Monument."],
  ["The Lincoln Memorial honors the President who…", "led the country during the Civil War", ["wrote the Pledge", "built the White House"], "Abraham Lincoln sits in the memorial."],
  ["The Martin Luther King, Jr. Memorial honors a leader of the…", "Civil Rights Movement", ["American Revolution", "first airplane flight"], "He worked for equal rights."],
  ["The Capitol building is where…", "Congress meets", ["the President lives", "children go to school"], "It has a big dome."],
  ["The United States flag has 50 stars for the…", "50 states", ["50 presidents", "50 rivers"], "Tennessee has a star."],
  ["Mount Rushmore shows the faces of…", "four presidents", ["four kings", "four astronauts"], "They are carved in stone."],
  ["Why do we build monuments?", "to remember important people and events", ["to hide treasure", "to block roads"], "They help us remember."],
  ["The Liberty Bell is in…", "Philadelphia", ["Nashville", "Chattanooga"], "It rang for independence."],
  ["Which is a symbol of our whole country?", "the American flag", ["Tennessee's iris", "a city's park sign"], "Every state flies it."],
  ["The Statue of Liberty stands for…", "freedom and welcome", ["war", "winter"], "Many immigrants saw it first.", true],
  ["Which monument honors soldiers who served in the Vietnam War?", "the Vietnam Veterans Memorial", ["the Liberty Bell", "the White House"], "It is a long black wall of names.", true],
  ["The Hermitage, near Nashville, was the home of President…", "Andrew Jackson", ["George Washington", "Abraham Lincoln"], "He was from Tennessee.", true],
  ["The bald eagle was chosen as a symbol because it stands for…", "strength and freedom", ["speed and snow", "sleep and rest"], "It soars high.", true],
  ["Which is a primary source about the Liberty Bell?", "a photo of the real bell", ["a cartoon made today", "a guess by a friend"], "Primary sources come from the time or thing itself.", true],
  ["Why might families visit memorials in Washington, D.C.?", "to learn about the country's history", ["to go swimming", "to buy groceries"], "Memorials teach us.", true],
  ["The Great Seal of the United States shows a…", "bald eagle", ["raccoon", "lion"], "It holds arrows and an olive branch.", true],
  ["The Tennessee State Capitol is in…", "Nashville", ["Memphis", "Washington, D.C."], "Tennessee's lawmakers meet there.", true],
  ["Which word is on the Liberty Bell?", "Liberty", ["Snow", "Pizza"], "It means freedom.", true],
  ["How are a symbol and a monument alike?", "both stand for something important", ["both are animals", "both are songs"], "They help us remember ideas.", true],
];

export const SOCIAL_2: Unit[] = [
  bankUnit({
    id: "tn-g2-tennessee-neighbors",
    title: "Tennessee & Its Neighbors",
    emoji: "🧭",
    blurb: "Eight neighbor states, rivers and the Smokies",
    parentNote:
      "Locating Chattanooga, Knoxville, Memphis and Nashville, the Cumberland, Mississippi and Tennessee rivers, and the Appalachian Mountains with the Great Smoky Mountains, and the eight states that border Tennessee: Kentucky, Virginia, North Carolina, Georgia, Alabama, Mississippi, Arkansas and Missouri.",
    standards: ["2.12; 2.16; 2.17", "locating Tennessee's cities, rivers and mountains, and the eight states that border it, with a compass rose"],
    items: NEIGHBORS,
  }),
  bankUnit({
    id: "tn-g2-constitutions-branches",
    title: "Constitutions & Three Branches",
    emoji: "📜",
    blurb: "How our nation and state are governed",
    parentNote:
      "The United States Constitution and the Tennessee Constitution as the basis for laws, the three branches of government and what each one does, and the principles of our constitutional republic: equality, fair treatment for all, the right to vote and respect for others' property.",
    standards: ["2.18; 2.19; 2.20; 2.24", "the US and Tennessee constitutions, the three branches of government, and the principles of the American constitutional republic"],
    items: CONSTITUTIONS,
  }),
  bankUnit({
    id: "tn-g2-monuments-symbols",
    title: "Monuments & Symbols",
    emoji: "🗽",
    blurb: "The Liberty Bell, the White House and more",
    parentNote:
      "Well-known national monuments and symbols (the Liberty Bell, the White House, the Statue of Liberty, the bald eagle and the memorials on the National Mall) and why they matter.",
    standards: ["2.25", "well-known national monuments and symbols and their significance"],
    items: MONUMENTS,
  }),
];
