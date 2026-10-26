import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Mississippi Grade 3 social studies, Citizenship in Local Government: the three branches of government at the
// federal, state and local levels, civic leadership and forms of government (3.CI.2, 3.CI.3, 3.H.1), and how people in
// Mississippi change the land, get their energy and live with natural disasters (3.G.1, 3.G.2, 3.G.3). Money, voting,
// trade, rights and maps are practised with adopted units (see ../plan/social.ts).

const GOVERNMENT: Q[] = [
  ["Our government has three branches. The branch that makes laws is the…", "legislative branch", ["executive branch", "judicial branch", "school board"], "Legislators write and vote on laws."],
  ["The branch that carries out laws is the…", "executive branch", ["legislative branch", "judicial branch", "library"], "The leader of this branch makes sure laws are followed."],
  ["The branch that decides what laws mean is the…", "judicial branch", ["executive branch", "legislative branch", "fire department"], "Judges work in courts."],
  ["The leader of the United States is the…", "President", ["Governor", "Mayor", "Principal"], "The President leads the whole country."],
  ["The leader of Mississippi's state government is the…", "Governor", ["President", "Mayor", "Chief of Police"], "The Governor leads the executive branch of the state."],
  ["The leader of a city or town is usually the…", "mayor", ["governor", "president", "judge"], "Many towns in Mississippi elect a mayor."],
  ["Mississippi's laws are made by the Mississippi…", "Legislature", ["Supreme Court", "Governor's Mansion", "Post Office"], "It has a Senate and a House of Representatives."],
  ["Mississippi's state government meets in the capital city of…", "Jackson", ["Biloxi", "Tupelo", "Natchez"], "The Capitol building is in Jackson."],
  ["The United States Congress meets in…", "Washington, D.C.", ["Jackson", "New Orleans", "Memphis"], "It is the nation's capital."],
  ["Mississippi is divided into 82…", "counties", ["countries", "oceans", "planets"], "Each county has its own local government."],
  ["In Mississippi, each county is run by a Board of…", "Supervisors", ["Astronauts", "Pilots", "Chefs"], "Voters in each district elect a supervisor."],
  ["Who pays for things like parks, roads and fire trucks in a town?", "the local government, with taxes", ["one family", "the parks", "the fire trucks"], "Taxes pay for services everyone uses."],
  ["Which is a job of local government?", "fixing city streets", ["making money for the nation", "choosing the President", "signing treaties with other countries"], "Local government takes care of the town."],
  ["Which is a job of the national government?", "printing money", ["picking up a town's trash", "running a city library", "fixing a county road"], "Money is the same all over the country."],
  ["A good leader…", "listens and keeps promises", ["never listens", "only helps friends", "breaks rules"], "Leaders work for everyone."],
  ["Citizens choose many of their leaders by…", "voting", ["guessing", "racing", "drawing straws"], "Each vote counts."],
  ["Having three branches means no one branch…", "has all the power", ["has any power", "can make laws", "has workers"], "The branches check each other.", true],
  ["When the Governor signs a bill passed by the Legislature, the bill becomes a…", "law", ["tax", "court", "county"], "Both branches have a part.", true],
  ["A government where people elect leaders to make decisions for them is a…", "representative democracy", ["monarchy", "dictatorship", "direct democracy"], "Representatives speak for voters.", true],
  ["A government ruled by a king or queen who inherits the job is a…", "monarchy", ["democracy", "republic", "town council"], "The crown passes in the family.", true],
  ["A government where one ruler holds all the power and is not chosen by the people is a…", "dictatorship", ["democracy", "republic", "town meeting"], "Citizens have no say.", true],
  ["When every citizen votes on every law themselves, it is a…", "direct democracy", ["monarchy", "dictatorship", "representative democracy"], "Ancient Athens tried this.", true],
  ["To run for Governor, a person must meet rules about age and where they live. These rules are…", "requirements for leaders", ["school rules", "weather reports", "store prices"], "Leaders must meet requirements.", true],
  ["A judge in a Mississippi court decides whether someone…", "broke a law", ["can buy a car", "should be President", "can plant a garden"], "Courts settle questions about laws.", true],
];

const LAND: Q[] = [
  ["Long walls of earth built along the Mississippi River to stop floods are called…", "levees", ["canyons", "volcanoes", "glaciers"], "They hold back high water."],
  ["People built the Ross Barnett Reservoir near Jackson by…", "damming the Pearl River", ["digging a mine", "building a highway", "planting a forest"], "A dam holds water back to make a lake."],
  ["The Tennessee-Tombigbee Waterway was dug so that…", "boats could travel between two rivers", ["trains could cross the sea", "people could ski", "the river would dry up"], "It is a long canal in eastern Mississippi."],
  ["Farmers in the Delta cleared forests to make…", "fields for crops", ["deserts", "oceans", "volcanoes"], "The Delta's rich soil is good for farming."],
  ["Building a new road through a forest is a way people…", "change the Earth", ["make it rain", "stop the wind", "make mountains"], "People change the land to meet their needs."],
  ["A huge, spinning storm that comes in from the Gulf of Mexico is a…", "hurricane", ["blizzard", "drought", "earthquake"], "Hurricanes form over warm ocean water."],
  ["A twisting funnel cloud that touches the ground is a…", "tornado", ["hurricane", "flood", "volcano"], "Mississippi has many tornadoes in spring."],
  ["When a river rises over its banks, it causes a…", "flood", ["drought", "earthquake", "fire"], "Heavy rain can make rivers rise."],
  ["In 2005, Hurricane Katrina caused great damage on the…", "Mississippi Gulf Coast", ["top of a mountain", "North Pole", "moon"], "Storm surge flooded coastal towns."],
  ["A long time with too little rain is a…", "drought", ["flood", "hurricane", "tornado"], "Crops can dry up."],
  ["Which is an energy source that comes from under the ground?", "natural gas", ["sunlight", "wind", "rain"], "Mississippi has gas and oil wells."],
  ["Solar panels turn sunlight into…", "electricity", ["oil", "rain", "coal"], "The sun's energy can power homes."],
  ["Which energy source will never run out?", "the sun", ["oil", "coal", "natural gas"], "The sun shines every day."],
  ["Oil, coal and natural gas are called…", "fossil fuels", ["fresh fuels", "wind fuels", "water fuels"], "They formed from living things long ago."],
  ["Planting trees after cutting a forest helps…", "the forest grow back", ["make more floods", "dry out the soil", "stop the rain"], "Mississippi has many tree farms."],
  ["A tornado warning means you should…", "go to a safe room inside", ["go outside to watch", "stand by a window", "go swimming"], "Stay low and away from windows."],
  ["When a hurricane is coming, people near the coast may be told to…", "evacuate to a safer place", ["go to the beach", "open all windows", "stay in a boat"], "Leaving early keeps people safe."],
  ["Why do some homes on the Mississippi coast stand on tall posts?", "to stay above flood water", ["to see the moon", "to keep cool in snow", "to stop earthquakes"], "Storm surge can flood low houses.", true],
  ["Which change to the land can make floods worse?", "paving over fields and wetlands", ["planting trees", "keeping wetlands", "building levees"], "Pavement can't soak up rain.", true],
  ["Wetlands along the coast help during storms because they…", "soak up water like a sponge", ["make storms bigger", "push water into towns", "stop all rain"], "Marshes slow down storm water.", true],
  ["Grand Gulf, near Port Gibson, makes electricity from…", "nuclear energy", ["wind", "sunlight", "burning wood"], "It is Mississippi's nuclear power plant.", true],
  ["Burning fossil fuels for energy can…", "pollute the air", ["clean the air", "make more oil", "grow trees"], "Smoke carries gases into the air.", true],
  ["The Great Flood of 1927 covered much of the Delta. Afterward, people built…", "bigger, stronger levees", ["more dams on the moon", "new mountains", "deserts"], "People changed the river to protect towns.", true],
  ["Why do people build towns near rivers, even with the risk of floods?", "rivers give water, rich soil and a way to travel", ["rivers stop all storms", "rivers never flood", "rivers keep people cold"], "Rivers help people meet their needs.", true],
];

export const SOCIAL_3: Unit[] = [
  bankUnit({
    id: "ms-g3-government",
    title: "Branches of Government",
    emoji: "🏛️",
    blurb: "Who makes, carries out and judges laws, near and far.",
    parentNote:
      "Practices the three branches of government at the national, state and local levels (the President, Congress and courts; Mississippi's Governor, Legislature and courts; mayors and county boards of supervisors), what makes a good leader, and kinds of government such as democracy and monarchy.",
    standards: ["3.CI.2; 3.CI.3; 3.H.1", "the three branches of government at the federal, state and local levels, civic leadership, and kinds of government"],
    items: GOVERNMENT,
  }),
  bankUnit({
    id: "ms-g3-land-and-energy",
    title: "Land, Storms & Energy",
    emoji: "🌀",
    blurb: "How people change the land, stay safe and get energy.",
    parentNote:
      "Practices how people change the land to meet their needs (levees, reservoirs, canals and farms), natural disasters such as hurricanes, tornadoes and floods and how people stay safe, and where energy comes from, with Mississippi examples.",
    standards: ["3.G.1; 3.G.2; 3.G.3", "how humans change the Earth, the effects of natural disasters, and Earth's energy sources"],
    items: LAND,
  }),
];
