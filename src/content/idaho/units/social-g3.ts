import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Idaho Grade 3 social studies: why people call Idaho home and how they came here (3.SS.1.3, 3.SS.1.4), the cultures in
// Idaho's communities, including the five federally recognized tribes (3.SS.1.2), finding Idaho, Boise and Washington,
// D.C. on maps (3.SS.2.1, 3.SS.2.2) and how geography shaped where Idaho's towns grew (3.SS.2.3); and local and state
// government: what they do, how leaders are chosen, the services they provide, public and private property, and ways to
// take part (3.SS.4.3 to 3.SS.4.7, 3.SS.3.2). The rest of the grade is practised with shared and adopted units (see
// ../plan/social.ts).

const HOME: Q[] = [
  ["Idaho's state capital is…", "Boise", ["Pocatello", "Twin Falls", "Lewiston"], "The State Capitol is there."],
  ["The capital of the United States is…", "Washington, D.C.", ["Boise", "New York City", "Chicago"], "The president lives there."],
  ["On a map of the United States, Idaho is in the…", "Northwest", ["Southeast", "Northeast", "Gulf Coast"], "Look at the upper left of the map."],
  ["Boise grew up beside the…", "Boise River", ["Kootenai River", "Mississippi River", "Hudson River"], "The city and the river share a name."],
  ["Lewiston grew where the Snake River meets the…", "Clearwater River", ["Nile River", "Amazon River", "Ohio River"], "Two rivers join there."],
  ["Twin Falls, Idaho Falls and Pocatello are all…", "cities in southern Idaho", ["lakes", "mountains", "other states"], "They sit near the Snake River."],
  ["A map scale helps you find…", "how far apart places are", ["what time it is", "the weather", "who lives there"], "It compares map distance to real distance."],
  ["A grid of letters and numbers on a map helps you…", "find a place quickly", ["draw the ocean", "tell the time", "count people"], "Find the row and the column."],
  ["The Equator is an imaginary line around the middle of…", "Earth", ["Idaho", "the moon", "the sun"], "It splits Earth into north and south halves."],
  ["Is Idaho north or south of the Equator?", "north", ["south", "right on it"], "The United States is in the Northern Hemisphere."],
  ["Moving from one place to live in another is called…", "migration", ["hibernation", "erosion", "an election"], "People and animals both migrate."],
  ["Moving to a new country to live there is called…", "immigration", ["vacation", "a field trip", "a parade"], "Many Idaho families have immigrants in their past."],
  ["A family that moves to Boise for a new job is an example of…", "voluntary migration", ["forced migration", "a holiday", "a storm"], "Voluntary means by choice."],
  ["When people are made to move against their will, the move is…", "involuntary", ["voluntary", "a vacation", "a game"], "Not everyone who moved had a choice."],
  ["Many Basque families came to Idaho from Spain to work as…", "sheepherders", ["astronauts", "pilots", "deep sea divers"], "They cared for sheep on the hills."],
  ["Boise's Basque Block has foods, dances and festivals from…", "the Basque Country in Spain and France", ["the North Pole", "the moon", "an island in the Pacific"], "Families kept their traditions alive."],
  ["An interview means…", "asking someone questions and listening to the answers", ["reading a map", "drawing a picture", "taking a test"], "You can interview a family member."],
  ["A good question to ask a grandparent about living in Idaho is…", "What made you choose to live here?", ["What is 2 plus 2?", "Do you like my shoes?", "What color is the sky?"], "Ask about their story."],
  ["Many people say they call Idaho home because of its…", "mountains, rivers and outdoor fun", ["ocean beaches", "tall skyscrapers", "jungles"], "Idaho has lots of open land."],
  ["Huckleberries picked in Idaho's mountains are a favorite food in…", "jams and pies", ["soup broth", "salad dressing only", "bread dough only"], "They are Idaho's state fruit."],
  ["The five federally recognized tribes have lived in the land that is now Idaho…", "for thousands of years, and still do today", ["only for a few years", "only in the past", "never"], "They are living communities.", true],
  ["Many Idaho towns grew up beside rivers and railroads because…", "people needed water and a way to ship goods", ["rivers kept people away", "trains needed snow", "the law said so"], "Geography shapes where towns grow.", true],
  ["Idaho City grew very fast in the 1860s because…", "miners rushed in to look for gold", ["a big ocean port opened", "an airport was built", "it was the North Pole"], "Gold brought thousands of people.", true],
  ["Why do new people keep moving to Idaho today?", "for jobs, family and the outdoors", ["to see the ocean", "to escape all snow", "because there are no towns"], "People move for many reasons.", true],
  ["Why do fewer people live in Idaho's high mountains than in the Treasure Valley around Boise?", "the valley has flatter land, water and jobs", ["the mountains have no trees", "no one likes valleys", "the mountains are under water"], "Land and water shape settlement.", true],
];

const GOVERNMENT: Q[] = [
  ["A city's mayor is usually chosen by…", "an election", ["a coin toss", "the oldest person", "a lottery"], "Voters pick their mayor."],
  ["Idaho's governor is chosen by…", "the voters of Idaho", ["the president", "the mayor of Boise", "a judge"], "There is a statewide election."],
  ["A city council…", "votes on city rules and budgets", ["runs the whole country", "drives the school buses", "makes state laws"], "The council meets at city hall."],
  ["In Idaho, the leaders elected to run a county are the…", "county commissioners", ["school band", "bus drivers", "fair judges"], "Idaho has 44 counties."],
  ["Who makes laws for the whole state of Idaho?", "the Idaho Legislature", ["the city council", "the school board", "the fire chief"], "It meets in the Capitol in Boise."],
  ["Fire departments, parks and libraries are examples of…", "services that governments provide", ["private toys", "secret clubs", "sports teams"], "Governments serve the whole community."],
  ["Taxes help pay for…", "roads, schools and parks", ["your own toys", "private vacations", "movie popcorn"], "Taxes pay for things we share."],
  ["Who plows snow off city streets in winter?", "city workers paid by the local government", ["the president", "the mail carrier", "nobody"], "Snowplowing is a city service."],
  ["A park owned by the city is…", "public property", ["private property", "a secret place", "no one's land"], "Public property is for everyone."],
  ["Your family's house and yard are…", "private property", ["public property", "a city park", "a state highway"], "Private property belongs to a person or business."],
  ["Idaho's state government builds and fixes…", "state highways", ["your bedroom", "the moon", "private cars"], "State roads connect towns."],
  ["A judge's job is to…", "decide cases using the law", ["make all the laws", "collect the trash", "drive a fire truck"], "Courts apply the law."],
  ["A school board…", "makes decisions for local schools", ["runs the state", "makes national laws", "builds highways"], "Voters elect school board members."],
  ["A county sheriff is elected to…", "keep people safe in the county", ["teach math", "run the post office", "fix computers"], "The sheriff leads county law enforcement."],
  ["Some leaders are appointed. Appointed means…", "chosen by another leader, not by voters", ["elected by everyone", "picked from a hat", "born into the job"], "A mayor might appoint a police chief."],
  ["Following traffic laws helps…", "keep everyone safe", ["make trips longer", "cause crashes", "stop all cars"], "Laws protect people."],
  ["Breaking a city rule, like parking where you shouldn't, can lead to…", "a fine", ["a prize", "a party", "a free car"], "Breaking rules has consequences."],
  ["Kids can take part in their community by…", "volunteering to clean up a park", ["littering", "staying silent", "breaking rules"], "Everyone can help."],
  ["Adults can take part in local government by…", "voting and going to city council meetings", ["ignoring the news", "never voting", "breaking laws"], "Meetings are open to the public."],
  ["Holidays like Independence Day help people in the United States feel…", "they share one national identity", ["they live in different countries", "lonely", "lost"], "Shared symbols bring people together."],
  ["Why does a city need a budget?", "to plan how to spend tax money", ["to decide the weather", "to pick a city color", "to name the streets"], "Money must be planned.", true],
  ["A town wants a new playground. Who would most likely vote on it?", "the city council", ["the president", "the US Supreme Court", "the governor of another state"], "Local choices are made locally.", true],
  ["Which is a job of state government rather than city government?", "running state parks and state highways", ["fixing a city sidewalk", "running the city library", "city trash pickup"], "State government serves the whole state.", true],
  ["How can you find out who your local leaders are?", "check the city or county website, or ask a librarian", ["guess", "ask a stranger online", "look at a cereal box"], "Local governments share who their leaders are.", true],
  ["What is one way local and state government work together?", "the state helps pay for local schools and roads", ["they never talk", "the city makes state laws", "the state runs every city hall"], "Governments share some jobs.", true],
];

export const SOCIAL_3: Unit[] = [
  bankUnit({
    id: "id-g3-idaho-home",
    title: "Calling Idaho Home",
    emoji: "🏡",
    blurb: "Why people live here, and where Idaho's towns grew",
    parentNote: "Why people call Idaho home and how they came here, by choice or not: interviewing family members, migration and immigration, the Basque families of Boise, the five tribes as living communities, and favorite Idaho foods like huckleberries; finding Idaho, Boise and Washington, D.C. on maps with scales, grids and the Equator; and how rivers, railroads and gold shaped where towns like Boise, Lewiston and Idaho City grew.",
    standards: ["3.SS.1.3; 3.SS.1.4; 3.SS.1.2; 3.SS.2.2; 3.SS.2.3", "why people call Idaho home, migration and immigration, cultures in the community, finding Idaho and Boise on maps, and settlement patterns"],
    items: HOME,
  }),
  bankUnit({
    id: "id-g3-local-government",
    title: "Local & State Government",
    emoji: "🏛️",
    blurb: "Mayors, councils, counties and the services they provide",
    parentNote: "What local and state governments do in Idaho: mayors and city councils, county commissioners and sheriffs, school boards, the governor and the Idaho Legislature; how leaders are elected or appointed; the services governments provide and the taxes that pay for them; public and private property; following laws; and ways children and adults can take part.",
    standards: ["3.SS.4.3; 3.SS.4.4; 3.SS.4.5; 3.SS.4.6; 3.SS.4.7; 3.SS.3.2", "the functions of local and state government, how officials are chosen, government services, public and private property, and taking part"],
    items: GOVERNMENT,
  }),
];
