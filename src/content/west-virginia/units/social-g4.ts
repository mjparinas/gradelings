import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { factQuestions, fromItems, mixUnit } from "./kit";

// West Virginia Grade 4 social studies, alongside United States history to 1854: the county seats on a West Virginia map
// (SS.4.16), how the state's mountains and rivers shaped travel, settlement and work (SS.4.17), and West Virginia's
// people, products, resources and transportation from the 1700s to today (SS.4.18).

/** County and county seat, for the county seats the counties' own governments name. */
const COUNTY_SEATS: readonly (readonly [string, string])[] = [
  ["Kanawha County", "Charleston"],
  ["Cabell County", "Huntington"],
  ["Monongalia County", "Morgantown"],
  ["Ohio County", "Wheeling"],
  ["Wood County", "Parkersburg"],
  ["Berkeley County", "Martinsburg"],
  ["Jefferson County", "Charles Town"],
  ["Raleigh County", "Beckley"],
  ["Harrison County", "Clarksburg"],
  ["Marion County", "Fairmont"],
  ["Randolph County", "Elkins"],
  ["Greenbrier County", "Lewisburg"],
  ["Mercer County", "Princeton"],
  ["Mineral County", "Keyser"],
  ["Hampshire County", "Romney"],
  ["Pocahontas County", "Marlinton"],
  ["Mingo County", "Williamson"],
  ["McDowell County", "Welch"],
  ["Upshur County", "Buckhannon"],
  ["Lewis County", "Weston"],
  ["Fayette County", "Fayetteville"],
  ["Preston County", "Kingwood"],
  ["Hardy County", "Moorefield"],
  ["Mason County", "Point Pleasant"],
  ["Marshall County", "Moundsville"],
  ["Taylor County", "Grafton"],
  ["Barbour County", "Philippi"],
  ["Nicholas County", "Summersville"],
  ["Summers County", "Hinton"],
  ["Morgan County", "Berkeley Springs"],
];

const GEOGRAPHY: Q[] = [
  ["A county seat is the town where…", "the county government has its offices", ["the county's biggest farm is", "the state capital is"], "The county courthouse is there."],
  ["Charleston is both a county seat and the…", "state capital", ["largest port in the world", "highest town in the state"], "It is the seat of Kanawha County."],
  ["Early roads and railroads in West Virginia often followed…", "river valleys", ["mountaintops", "straight lines over the ridges"], "Valleys are flatter than the steep hills."],
  ["Why were so many West Virginia towns built along rivers?", "rivers gave water, power and a way to ship goods", ["rivers never flood", "the hills were too warm", "rivers kept visitors away"], "Rivers were the first highways."],
  ["Steep mountains made it hard for early West Virginians to…", "travel and trade with faraway places", ["find water", "grow trees", "see the sky"], "Getting over the ridges was slow."],
  ["The National Road, built in the early 1800s, crossed the Northern Panhandle to reach…", "Wheeling", ["Charleston", "Bluefield"], "It linked the East with the Ohio River."],
  ["Coal barges are pushed down the Ohio and Kanawha rivers because…", "boats can carry heavy loads cheaply", ["coal floats by itself", "trucks are not allowed", "the rivers are frozen"], "Rivers carry heavy freight."],
  ["Mountain farms in West Virginia were often small because…", "flat land for fields was scarce", ["there was too much flat land", "it never rained", "crops grow only on mountaintops"], "Steep hillsides are hard to plow."],
  ["Long, cold winters in the mountains meant families needed…", "warm clothing and stored food", ["air conditioning", "swimsuits only"], "People prepared for winter in the fall."],
  ["Interstate highways like I-64 and I-79 help West Virginians…", "travel and ship goods faster", ["stay home", "climb mountains on foot"], "Highways cut through and around the hills."],
  ["The New River Gorge Bridge lets drivers cross the gorge in about a minute instead of…", "driving down and up the gorge for much longer", ["swimming across", "taking a plane"], "It opened in 1977.", true],
  ["Why did the county seat of each county often grow into one of its bigger towns?", "people came there for courts, records and business", ["it was always on a mountaintop", "laws forced everyone to live there", "it had no roads"], "Government brings people and jobs.", true],
];

const THEN_AND_NOW: Q[] = [
  ["In the 1700s, most families in what is now West Virginia lived by…", "farming and hunting", ["working in offices", "making computer chips"], "They grew and gathered most of their food."],
  ["In the 1700s, West Virginia was part of…", "the colony of Virginia", ["Mexico", "Canada"], "It became its own state in 1863."],
  ["Early settlers built homes from…", "logs from the forest", ["steel and glass", "plastic panels"], "Trees were everywhere."],
  ["In the 1800s, salt from the Kanawha Valley was shipped…", "down the rivers on boats", ["by airplane", "through pipelines to the ocean"], "Rivers carried heavy goods."],
  ["In the late 1800s, railroads helped West Virginia…", "ship coal and timber to faraway cities", ["stop all mining", "grow cotton"], "Trains reached the coalfields."],
  ["Around 1900, many people moved to West Virginia's coalfields to…", "work in the mines", ["find gold", "go surfing"], "Coal companies needed many workers."],
  ["Coal camps were towns built and owned by…", "coal companies", ["the federal government only", "sailors"], "Families rented company houses."],
  ["Workers came to West Virginia's mines from other states and from countries like…", "Italy, Hungary and Poland", ["only one country", "nowhere"], "Black workers from the South came too."],
  ["Long ago, much of West Virginia's timber was floated down rivers or carried by…", "logging railroads", ["helicopters", "trucks on interstates"], "Small railroads climbed into the forests."],
  ["Today, more West Virginians work in… than in coal mining.", "health care", ["whaling", "gold panning"], "Hospitals and clinics are big employers."],
  ["Today, natural gas from deep shale is one of West Virginia's top…", "resources", ["toys", "crops"], "Wells reach rock far underground."],
  ["Today, visitors spend money in West Virginia on…", "rafting, skiing and state parks", ["ocean cruises", "desert tours"], "Tourism brings jobs."],
  ["Long ago, people traveled across the state by horse, boat and train. Today most people travel by…", "car on highways", ["stagecoach", "canal boat"], "Interstates were built in the 1900s."],
  ["Long ago, news traveled by letter and newspaper. Today it also travels by…", "phone and internet", ["smoke signals only", "carrier pigeon only"], "Technology connects people."],
  ["West Virginia's population is about…", "1.8 million people", ["50,000 people", "40 million people"], "It is one of the smaller states by population."],
  ["A product made in West Virginia for more than a century is…", "glass", ["bananas", "airplanes made of paper"], "Glass factories used local sand and natural gas."],
  ["Why did the number of coal mining jobs go down after the mid-1900s?", "machines did more of the work and demand changed", ["coal ran out everywhere at once", "mining was banned", "miners moved to the moon"], "Technology and markets change jobs.", true],
  ["Why did West Virginia's population grow in the early 1900s?", "jobs in coal, railroads and factories drew people", ["the ocean moved closer", "farms got bigger than cities", "the state got larger"], "People move where there is work.", true],
  ["Why is broadband internet important for West Virginia's mountain towns today?", "it lets people work, learn and see doctors from far away", ["it stops snow", "it builds roads", "it replaces water"], "Technology helps with distance.", true],
  ["Compare: in the 1700s, goods moved on rivers and trails; today they move on…", "highways, railroads, rivers and pipelines", ["only trails", "only canoes"], "Transportation has many forms today.", true],
  ["Long ago, many families made their own soap, candles and clothes. Today most people…", "buy them in stores", ["never use them", "trade them for coal"], "Factories make most goods now."],
  ["In the 1700s, a trip across the mountains took weeks. Today the same trip by car takes…", "a few hours", ["a whole year", "a few seconds"], "Roads and cars made travel faster."],
  ["Children in the 1800s often learned in…", "one-room schoolhouses", ["online classes", "huge city high schools"], "One teacher taught every grade together."],
  ["Long ago, light at night came from candles and oil lamps. Today it comes from…", "electricity", ["only campfires", "the moon only"], "Power lines reached most homes in the 1900s."],
  ["Chemical plants grew in the Kanawha Valley in the 1900s using the area's…", "salt, coal and natural gas", ["oranges", "seashells"], "Local resources fed new factories."],
  ["Which of these is a resource West Virginia used in the 1700s and still uses today?", "timber from its forests", ["oil from the ocean floor", "sugar cane"], "Forests still cover most of the state.", true],
];

export const SOCIAL_4: Unit[] = [
  mixUnit({
    id: "wv-g4-counties",
    title: "West Virginia's Counties",
    emoji: "🗺️",
    blurb: "County seats, mountains, rivers and roads",
    parentNote:
      "The county seats of West Virginia's counties on a state map, and how the state's mountains, valleys and rivers shaped where people settled, how they traveled, the work they did and how they lived.",
    standards: ["SS.4.16; SS.4.17", "county seats on a West Virginia map, and how the state's geography affects transportation, settlement, jobs and daily life"],
    make: (d) => [
      ...factQuestions(COUNTY_SEATS, 4, {
        ask: (county) => `What is the county seat of ${county}?`,
        reverse: (seat) => `${seat} is the county seat of which county?`,
        hint: (county, seat) => `${seat} is the county seat of ${county}.`,
      }),
      ...fromItems(GEOGRAPHY, 4, d),
    ],
  }),
  bankUnit({
    id: "wv-g4-then-and-now",
    title: "West Virginia Then & Now",
    emoji: "🕰️",
    blurb: "People, products and travel from the 1700s to today",
    parentNote:
      "How West Virginia's people, products, resources and transportation have changed from the 1700s to today: farms and log homes, Kanawha salt, railroads, coal camps and the people who came to work in them, and today's health care, natural gas, tourism, highways and internet.",
    standards: ["SS.4.18", "comparing West Virginia's population, products, resources and transportation from the 18th century to today"],
    items: THEN_AND_NOW,
  }),
];
