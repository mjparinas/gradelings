import type { Unit } from "../../types";
import { SOCIAL_2 as CALIFORNIA } from "../../california/units/social-g2";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// New York's own Grade 2 social units (`ny-` ids), from the NYS K-12 Social Studies Framework ("My Community and Other
// United States Communities"): urban, suburban and rural communities with New York examples, community jobs and taxes,
// and copies of California's map and local government units with California's places left out and New York items added.

const COMMUNITY_TYPES: Q[] = [
  ["A city with many people and tall buildings close together is…", "urban", ["rural", "suburban", "a desert"], "Urban means city."],
  ["A community with farms and lots of open land is…", "rural", ["urban", "suburban", "downtown"], "Rural places have few people and much land."],
  ["A community just outside a city, with houses and yards, is…", "suburban", ["urban", "rural", "an island"], "It is near a city but less crowded."],
  ["Which is an urban community in New York State?", "New York City", ["a dairy farm town", "a cabin in the mountains", "a small farming village"], "It is the biggest city in the United States."],
  ["Which word best describes New York City?", "urban", ["rural", "suburban", "empty"], "Millions of people live there close together."],
  ["Many people in New York City get around by…", "subway and bus", ["tractor", "horse and wagon", "snowmobile"], "Trains run under the city streets."],
  ["In a rural community, people often travel by…", "car or truck on long roads", ["subway", "elevator", "city bus every few minutes"], "Homes and stores are far apart."],
  ["In which type of community are homes farthest apart?", "rural", ["urban", "suburban", "a city block"], "There is lots of open land."],
  ["Many people who live in suburbs work in…", "a nearby city", ["outer space", "the ocean", "another country every day"], "They travel into the city."],
  ["Which would you most likely see in a rural community?", "a dairy farm", ["a skyscraper", "a subway station", "a crowded avenue"], "Cows give milk."],
  ["Which would you most likely see in an urban community?", "apartment buildings", ["wide cornfields", "a barn", "a pasture of sheep"], "Many people live stacked up high."],
  ["Which would you most likely see in a suburban community?", "houses with yards and a mall", ["miles of open fields", "skyscrapers", "a forest with no roads"], "Suburbs have more space than cities."],
  ["Population density tells…", "how crowded a place is", ["how old a place is", "how hot a place is", "how big the trees are"], "It is about how many people live in an area."],
  ["Which type of community has the most people in a small area?", "urban", ["rural", "suburban", "a farm"], "Cities are crowded."],
  ["Buffalo is a city on which lake?", "Lake Erie", ["Lake Tahoe", "Lake Michigan", "Great Salt Lake"], "It is one of the Great Lakes."],
  ["The Finger Lakes region of New York is known for…", "farms and orchards", ["skyscrapers", "deserts", "volcanoes"], "The land is good for growing food."],
  ["The Adirondack Mountains have many…", "small towns and forests", ["subway lines", "skyscrapers", "big airports"], "It is a mostly rural region."],
  ["Which river flows past Albany and New York City?", "the Hudson River", ["the Nile River", "the Amazon River", "the Rio Grande"], "It is named after an explorer."],
  ["Why did many cities grow next to rivers and lakes?", "for water and shipping", ["to avoid people", "to stay dry", "because land was cold"], "Boats carried goods."],
  ["A farmer in a rural community provides…", "food", ["subway rides", "haircuts", "movie tickets"], "Think about crops and milk."],
  ["A kid in a city might play at…", "a park between tall buildings", ["a big barn", "a wide pasture", "a cornfield maze every day"], "Cities have parks."],
  ["A kid in a rural community might help…", "feed animals on a farm", ["drive the subway", "run a skyscraper", "direct city traffic"], "Many rural families farm."],
  ["Every community, urban, suburban or rural, has…", "people who need food, water and shelter", ["a subway", "a beach", "a mountain"], "Some needs are the same everywhere."],
  ["People in many communities celebrate holidays with…", "parades and festivals", ["homework", "traffic", "taxes"], "They bring people together."],
  ["A community gets stronger when people…", "share ideas and talents", ["never talk", "keep everything", "ignore neighbors"], "Diversity helps a community."],
  ["Long Island has many suburban towns near which city?", "New York City", ["Buffalo", "Syracuse", "Plattsburgh"], "Many people travel from there into the big city.", true],
  ["Why do fewer people live in rural areas?", "the land is used for farms and forests", ["it is always night", "there is no air", "people are not allowed"], "The land is used in other ways.", true],
  ["Which is a reason someone might move to a suburb?", "more space and a yard", ["to be on a farm far from town", "to live in a skyscraper", "to ride the subway more"], "Suburbs have more room than cities.", true],
  ["On a map, a big dot or star often shows a…", "city", ["farm", "pond", "tree"], "Check the map key.", true],
  ["Rochester and Syracuse are…", "cities in New York State", ["farms in Ohio", "lakes in Canada", "mountains in Texas"], "They are urban communities upstate.", true],
];

const JOBS_AND_TAXES: Q[] = [
  ["A good is…", "a thing people make or grow", ["a job someone does for you", "a feeling", "a song"], "You can hold it."],
  ["A service is…", "work someone does for others", ["a toy", "an apple", "a shoe"], "A haircut is one."],
  ["Which is a good?", "a loaf of bread", ["a haircut", "a doctor's checkup", "a bus ride"], "You can touch it."],
  ["Which is a service?", "a firefighter putting out a fire", ["a box of crayons", "a bike", "a carton of milk"], "It is work done for people."],
  ["Who keeps streets clean by picking up trash?", "sanitation workers", ["dentists", "pilots", "artists"], "They drive garbage trucks."],
  ["Who teaches children in school?", "teachers", ["mail carriers", "plumbers", "farmers"], "They help you learn."],
  ["Who helps keep a community safe and enforces laws?", "police officers", ["bakers", "librarians", "painters"], "They help in emergencies."],
  ["Who puts out fires and rescues people?", "firefighters", ["chefs", "cashiers", "writers"], "They drive red trucks."],
  ["Who brings letters and packages to homes?", "mail carriers", ["nurses", "pilots", "builders"], "They work for the post office."],
  ["Who cares for sick people in a hospital?", "doctors and nurses", ["bus drivers", "farmers", "artists"], "They help people get well."],
  ["What are taxes?", "money people pay to the government", ["gifts from stores", "prizes for winning", "money found on the street"], "It pays for things everyone uses."],
  ["What do taxes help pay for?", "schools, parks and roads", ["your toys", "a friend's birthday", "your snacks"], "Things the whole community uses."],
  ["Who pays the firefighters in a town?", "the community, with taxes", ["only the people with fires", "the fire truck company", "nobody"], "Everyone chips in."],
  ["Why do communities need many different workers?", "no one can do every job alone", ["workers are bored", "jobs are all the same", "people like waiting"], "People depend on each other."],
  ["When people depend on each other's jobs, it is called…", "interdependence", ["independence", "a vacation", "recess"], "Inter means between."],
  ["A small town has no hospital. Its people might…", "go to the hospital in a nearby town", ["never get sick", "build one each day", "go to the zoo"], "Neighboring communities share."],
  ["Two towns share one fire truck. This shows they…", "share resources", ["fight", "waste things", "are the same town"], "Neighbors help each other."],
  ["A farmer sells milk to a store. The farmer is a…", "producer", ["consumer", "mayor", "judge"], "Producers make goods."],
  ["You buy apples at a market. You are a…", "consumer", ["producer", "farmer", "mail carrier"], "Consumers buy and use goods."],
  ["People work at jobs to earn…", "money", ["homework", "rain", "recess"], "They use it to buy what they need."],
  ["Which community needs more snowplows?", "a place with snowy winters", ["a hot desert town", "a tropical island", "a place with no roads"], "Plows push snow."],
  ["Which job is most important in a farming community?", "farmer", ["subway driver", "elevator repairer", "ferry captain"], "Rural communities grow food."],
  ["Which job is more common in a big city?", "taxi driver", ["dairy farmer", "forest ranger", "fisher on a quiet lake"], "Cities have busy streets."],
  ["A crossing guard helps children…", "cross the street safely", ["learn math", "fix cars", "plant seeds"], "They hold a stop sign."],
  ["Volunteers are people who…", "help without being paid", ["get paid a lot", "only work at night", "never help"], "They give their time."],
  ["Which is a way a citizen serves the community?", "volunteering at a food bank", ["littering", "skipping school", "breaking a window"], "It helps people in need."],
  ["A public library is paid for by…", "taxes", ["one family", "the books", "a toy store"], "Everyone can use it.", true],
  ["Specializing means a worker…", "does one kind of job very well", ["does every job", "never works", "works only on weekends"], "A dentist specializes in teeth.", true],
  ["Some resources are hard to get in a rural area, like…", "a big hospital nearby", ["fresh air", "open land", "farm fields"], "Rural places may be far from big services.", true],
  ["A city collects more taxes when…", "more people live and work there", ["it rains more", "the park is closed", "school is out"], "More people pay in.", true],
];

const MAPS_NEW_YORK: Q[] = [
  ["A map of New York City would show…", "its streets and parks", ["only farms", "only oceans", "the whole world"], "A city map shows one city."],
  ["On a map of New York State, Albany is marked with a star. The star means…", "it is the state capital", ["it is a farm", "it is a lake", "it is a mountain"], "Check the map key."],
  ["Lake Erie and Lake Ontario are on which side of New York State?", "the west and north", ["the south", "the far east", "the middle"], "They are near Buffalo and Rochester."],
  ["The Atlantic Ocean is on which side of New York State?", "the southeast", ["the northwest", "the west", "the north"], "Long Island sticks out into it."],
  ["On a map, a thick black line between two states is a…", "border", ["river", "road", "railroad"], "It shows where one state ends."],
  ["Which state is just south of New York?", "Pennsylvania", ["Florida", "Texas", "Maine"], "It shares a long border with New York."],
];

const LOCAL_GOVERNMENT_NEW_YORK: Q[] = [
  ["Who leads New York State?", "the governor", ["the mayor", "the principal", "the president"], "The governor works in Albany."],
  ["What is the capital of New York State?", "Albany", ["New York City", "Buffalo", "Long Island"], "It is on the Hudson River."],
  ["People in New York choose their governor by…", "voting in an election", ["drawing straws", "a race", "a coin toss"], "Citizens vote for leaders."],
  ["Election Day in the United States is in…", "November", ["July", "March", "January"], "It is in the fall."],
  ["Which is a symbol of American democracy?", "a ballot box", ["a soccer ball", "a lunch box", "a toolbox"], "Voters put their choices in it."],
  ["In a democracy, leaders are chosen by…", "the people", ["one family", "the strongest person", "a lottery"], "Each vote counts."],
  ["Who leads New York City?", "the mayor", ["the governor", "the president", "a judge"], "Every big city has one."],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "ny-g2-community-types",
    title: "City, Suburb & Country",
    emoji: "🏙️",
    blurb: "Urban, suburban and rural communities",
    parentNote:
      "How urban, suburban and rural communities differ in population and land use, with New York examples such as New York City, Long Island suburbs, the Finger Lakes and the Adirondacks, and what every community shares.",
    standards: [
      "2.1a; 2.1b; 2.1c; 2.1d; 2.2b",
      "urban, suburban and rural communities, how many people live there and how land is used, and what makes each community strong",
    ],
    items: COMMUNITY_TYPES,
  }),
  bankUnit({
    id: "ny-g2-jobs-and-taxes",
    title: "Community Jobs & Taxes",
    emoji: "🚒",
    blurb: "Workers, goods, services and taxes",
    parentNote:
      "Goods and services, community workers such as teachers, firefighters, sanitation workers and police officers, how taxes pay for community services, and how neighboring communities share resources.",
    standards: [
      "2.9a; 2.9b; 2.9c; 2.8a; 2.8d",
      "community workers and the goods and services they provide, taxes, and how communities share resources and workers",
    ],
    items: JOBS_AND_TAXES,
  }),
  copyOf(
    from(CALIFORNIA, "ca-g2-reading-maps"),
    {
      id: "ny-g2-reading-maps",
      title: "Reading Maps",
      emoji: "🗺️",
      blurb: "Keys, directions and map grids",
      parentNote:
        "Map titles, keys, compass directions, grids and scale, physical and human-made features, and finding New York places on a map.",
      standards: [
        "2.5a; 2.5d",
        "locating communities on maps and describing places with symbols, map keys and geography words",
      ],
    },
    MAPS_NEW_YORK,
  ),
  copyOf(
    from(CALIFORNIA, "ca-g2-who-runs-our-town"),
    {
      id: "ny-g2-who-runs-our-town",
      title: "Who Runs Our Community?",
      emoji: "🏛️",
      blurb: "Leaders, laws, voting and taxes",
      parentNote:
        "Mayors, city councils, judges and the governor of New York, why communities have laws, voting in elections, and services paid for by taxes.",
      standards: [
        "2.3b; 2.3c; 2.3d; 2.4a; 2.4b",
        "community leaders who make and enforce laws, voting in elections, symbols of democracy and laws for the common good",
      ],
    },
    LOCAL_GOVERNMENT_NEW_YORK,
  ),
];
