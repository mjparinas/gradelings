import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// North Dakota Grade 3 social studies, my community and the nation's regions: city government, its officials, its
// services and how it makes decisions (C.3_5.1, C.3_5.3, C.3_5.5, E.3_5.4), and the Midwest, North Dakota's region, with
// its land, resources and economy (G.3_5.6, E.3_5.6, E.3_5.7). The other regions are practised with adopted units (see
// ../plan/social.ts).

const CITY: Q[] = [
  ["The leader of a city government, chosen by voters, is the…", "mayor", ["governor", "president", "principal"], "Fargo, Bismarck and Minot each have one."],
  ["The group of people who make a city's laws is the city…", "council or commission", ["orchestra", "team", "jury"], "Some North Dakota cities call it a city commission."],
  ["City laws are called…", "ordinances", ["treaties", "amendments", "verdicts"], "An ordinance might set a speed limit."],
  ["Who chooses the mayor and the city council?", "the city's voters", ["the governor", "the president", "the police chief"], "Adults who live in the city vote."],
  ["Which is a service a city provides?", "clean drinking water", ["new video games", "movie tickets", "candy"], "Cities run water plants."],
  ["Plowing snow off city streets is paid for with…", "taxes", ["allowance money", "coupons", "lottery tickets"], "Taxes pay for services everyone uses."],
  ["Firefighters, police officers and librarians are…", "public workers who serve the community", ["store owners", "farmers", "tourists"], "They work for the city."],
  ["A county is a part of a state made up of several…", "cities, towns and rural areas", ["countries", "continents", "oceans"], "North Dakota has 53 counties."],
  ["The county's leaders are often called county…", "commissioners", ["kings", "captains", "coaches"], "They run county roads and services."],
  ["When a city wants to build a new swimming pool, the council may hold a…", "public meeting", ["secret party", "fire drill", "parade only"], "Citizens can share their ideas."],
  ["One way citizens help decide things in a community is by…", "voting", ["littering", "staying silent", "hiding"], "Every vote counts."],
  ["A rule everyone at school must follow is like a law because it…", "keeps people safe and treats them fairly", ["is a secret", "only applies to adults", "changes every hour"], "Rules and laws protect people."],
  ["If many people want a stop sign at a busy corner, they can…", "ask the city council", ["paint one themselves", "move the street", "close the school"], "Councils listen to citizens."],
  ["A park, a library and a swimming pool are… that everyone in the city can use.", "public places", ["private homes", "secret clubs", "farms"], "Public means for everyone."],
  ["The city budget is a plan for how the city will…", "spend its money", ["choose a mascot", "pick a holiday", "plant one tree"], "Leaders decide what to pay for first."],
  ["A good citizen in a community…", "helps others and follows the laws", ["breaks rules", "litters", "ignores neighbors"], "Responsibility makes communities strong."],
  ["Volunteering at a food pantry is an example of…", "civic responsibility", ["a city law", "a tax", "an election"], "Helping your community matters."],
  ["Why do cities have zoning rules about where factories can be built?", "to keep noise and pollution away from homes", ["to make factories secret", "to stop all jobs", "to grow crops"], "Planning helps neighbors.", true],
  ["When the Red River rises, Fargo's leaders decide where to put sandbags and dikes. This shows city government…", "protects people in emergencies", ["makes floods", "only collects taxes", "never meets"], "Emergency services are a big job.", true],
  ["A city cannot pass a law that goes against the… constitution.", "state or US", ["school's", "store's", "club's"], "Higher laws come first.", true],
  ["A city council voting 4 to 3 means the idea…", "passes", ["fails", "is tied", "is cancelled"], "The majority decides.", true],
  ["How is a mayor different from a governor?", "a mayor leads a city and a governor leads a state", ["they are the same job", "a mayor leads the nation", "a governor leads a school"], "Different levels of government.", true],
  ["Why does a city charge a small fee to use the swimming pool?", "to help pay for lifeguards and cleaning", ["to keep everyone out", "to buy candy", "because pools are free to run"], "Services cost money.", true],
  ["Tribal nations in North Dakota have their own governments, led by an elected council and a…", "chairman or chairwoman", ["king", "mayor of Fargo", "principal"], "Each tribal nation governs itself.", true],
  ["A school board is elected to make decisions about…", "the community's public schools", ["the state's highways", "the US Army", "the post office"], "Voters choose school board members.", true],
];

const MIDWEST: Q[] = [
  ["North Dakota is in which region of the United States?", "the Midwest", ["the Southwest", "the Northeast", "the Southeast"], "It is in the middle and north of the country."],
  ["The flat, grassy land that covers much of the Midwest is called the…", "Great Plains", ["Appalachians", "Rocky Mountains", "Everglades"], "The plains stretch for hundreds of miles."],
  ["The longest river in the United States, which flows through North Dakota, is the…", "Missouri River", ["Hudson River", "Rio Grande", "Columbia River"], "It joins the Mississippi."],
  ["The five huge lakes on the eastern side of the Midwest are the…", "Great Lakes", ["Finger Lakes", "Salt Lakes", "Glacier Lakes"], "They hold a lot of the world's fresh water."],
  ["The Midwest is often called America's…", "breadbasket", ["toolbox", "attic", "playground"], "It grows much of the country's grain."],
  ["Which crops grow on many Midwest farms?", "wheat, corn and soybeans", ["bananas and coffee", "oranges and lemons", "rice and sugarcane"], "The soil is rich and deep."],
  ["Which natural resource helps the Midwest grow so much food?", "rich, dark soil", ["gold mines", "coral reefs", "volcanoes"], "Grasses built up the soil over thousands of years."],
  ["Midwest winters are usually…", "cold and snowy", ["hot and dry", "warm all year", "rainless"], "Snow covers the plains."],
  ["Midwest summers are usually…", "warm or hot", ["freezing", "dark all day", "snowy"], "Crops grow in summer."],
  ["North Dakota grows more… than any other state.", "spring wheat", ["oranges", "cotton", "pineapples"], "It is used for bread flour."],
  ["Bright yellow sunflowers grown on North Dakota farms are used for…", "seeds and oil", ["wood", "metal", "glass"], "Sunflower seeds are a snack too."],
  ["Many factories in the Midwest's big cities make…", "cars, machines and food products", ["surfboards", "palm oil", "ski lifts only"], "The region has lots of manufacturing."],
  ["Grain from Midwest farms is shipped to other places by…", "train, truck and river barge", ["camel", "hot air balloon", "submarine"], "Railroads cross the plains."],
  ["In western North Dakota, workers pump… from deep underground.", "oil", ["maple syrup", "sea water", "lava"], "Oil is an important resource there."],
  ["The many windmills on the Midwest plains make…", "electricity", ["bread", "snow", "rain"], "The plains are windy."],
  ["A region is an area where places share…", "features in common", ["one family", "the same street", "one school"], "Land, climate or ways of life."],
  ["On a map of the United States, the Midwest is…", "in the north center", ["along the Pacific", "in the far southeast", "in the far southwest"], "It is between the Rockies and the Northeast."],
  ["Bison once roamed the Great Plains in herds of…", "millions", ["ten", "a hundred", "none"], "They ate the prairie grasses."],
  ["Why did so many farmers move to the Midwest long ago?", "the land was flat and the soil was good for crops", ["it was full of gold", "it was warm all year", "there were no winters"], "Good land drew settlers.", true],
  ["Why do towns on the Great Plains often have tall grain elevators by the railroad?", "farmers store grain there before it is shipped", ["they are lighthouses", "they hold water", "they are for skiing"], "Grain moves by train.", true],
  ["How does the Midwest's economy differ from a region with many ports on the ocean?", "it depends more on farming and land transport", ["it depends on fishing", "it has no economy", "it only makes surfboards"], "Natural resources shape an economy.", true],
  ["Why does the Midwest have colder winters than the Southeast?", "it is farther north and far from warm oceans", ["it is closer to the sun", "it has more volcanoes", "it is always cloudy"], "Location shapes climate.", true],
  ["A drought on the Great Plains can raise the price of bread because…", "less wheat is grown", ["more wheat is grown", "bakers go on vacation", "bread is made of oil"], "Supply affects price.", true],
  ["What do the Midwest and the Southwest regions have in common?", "both have wide, open land", ["both are along the Atlantic", "both have the Great Lakes", "both are rainforests"], "Regions can share features.", true],
  ["Why is the Red River Valley one of the best farming areas in the world?", "an ancient lake left very flat land and rich soil", ["it is in the desert", "it has tall mountains", "it never snows"], "Glacial Lake Agassiz once covered it.", true],
];

export const SOCIAL_3: Unit[] = [
  bankUnit({
    id: "nd-g3-city-government",
    title: "How a City Works",
    emoji: "🏛️",
    blurb: "Mayors, councils, services and good citizens",
    parentNote: "How city and county government works in North Dakota: the mayor and the city council or commission, ordinances, county commissioners, the services taxes pay for (water, snowplows, parks, libraries, flood protection), how citizens take part in decisions, and civic responsibility.",
    standards: ["C.3_5.1; C.3_5.3; C.3_5.5; E.3_5.4", "government officials at different levels, how government in North Dakota serves its residents, making decisions, and community services"],
    items: CITY,
  }),
  bankUnit({
    id: "nd-g3-midwest",
    title: "The Midwest, Our Region",
    emoji: "🌾",
    blurb: "Plains, rivers, farms and work in the Midwest",
    parentNote: "The Midwest region, where North Dakota is: the Great Plains, the Missouri River and the Great Lakes, its climate, its rich soil and farm crops (spring wheat, sunflowers, corn and soybeans), oil, wind and factories, and how natural resources shape the way people in the region live and work.",
    standards: ["G.3_5.6; E.3_5.6; E.3_5.7", "how regions are formed, the economies of the regions of the United States, and how natural resources affect them"],
    items: MIDWEST,
  }),
];
