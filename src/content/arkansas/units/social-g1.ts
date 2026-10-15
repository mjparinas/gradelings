import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Arkansas's own Grade 1 social studies units (`ar-` ids): the state and national symbols, songs and holidays the Arkansas
// standards name for Grade 1 (C.1.1.4, H.1.1.5), and the goods Arkansas grows and makes, and trades with other places
// (E.1.1.9, E.1.1.10, G.1.1.7, G.1.1.9).

const SYMBOLS: Q[] = [
  ["The Arkansas state song is called…", "\"Arkansas\"", ["\"Yankee Doodle\"", "\"Jingle Bells\"", "\"Happy Birthday\""], "It has the same name as our state."],
  ["The Arkansas state mammal is the…", "white-tailed deer", ["bear", "rabbit", "horse"], "It lifts its white tail when it runs."],
  ["The Arkansas state drink is…", "milk", ["juice", "soda", "tea"], "Cows give it to us."],
  ["The Arkansas state dance is the…", "square dance", ["ballet", "tap dance", "hula"], "Four couples dance in a square."],
  ["The Arkansas state gem is the…", "diamond", ["ruby", "pearl", "emerald"], "It is also on the state flag."],
  ["Where on the Arkansas flag is the diamond?", "in the middle", ["in a corner", "on the back only", "under the stars"], "Look at the center of the flag."],
  ["The Arkansas state bird is the…", "mockingbird", ["cardinal", "owl", "blue jay"], "It copies other birds' songs."],
  ["Our national anthem is…", "The Star-Spangled Banner", ["America the Beautiful", "Row, Row, Row Your Boat", "This Old Man"], "It is sung at the start of big games."],
  ["The 50 stars on the American flag stand for the…", "50 states", ["50 presidents", "50 cities", "50 rivers"], "Arkansas is one of them."],
  ["The 13 stripes on the American flag stand for the…", "first 13 colonies", ["13 presidents", "13 states today", "13 rivers"], "They became the first states."],
  ["Flag rule: the American flag should never touch the…", "ground", ["sky", "wind", "flagpole"], "We keep it up high to show respect."],
  ["When the flag flies halfway down the pole, it is to…", "honor people who have died", ["say it is a holiday", "show it is windy", "start a race"], "It is called half-staff."],
  ["A flag that flies at night should have…", "a light shining on it", ["a hat on it", "no pole", "a bell on it"], "So people can still see it."],
  ["When we say the Pledge of Allegiance, we face…", "the flag", ["the door", "the clock", "a friend"], "We stand tall and look at it."],
  ["Independence Day is on…", "July 4", ["December 25", "January 1", "October 31"], "Fireworks in summer!"],
  ["Independence Day celebrates…", "the birthday of our country", ["the first day of school", "the start of winter", "a new year"], "The United States began in 1776."],
  ["Thanksgiving is a day to…", "give thanks", ["get presents", "dress in costumes", "plant trees"], "It's in the name."],
  ["Memorial Day honors soldiers who…", "died serving our country", ["are still in school", "won a game", "own farms"], "We remember them in May."],
  ["Veterans Day honors people who…", "served in the military", ["teach school", "drive buses", "grow food"], "Veterans are people who served."],
  ["Dr. Martin Luther King Jr. worked so that all people would be…", "treated fairly", ["very rich", "famous", "the same height"], "He spoke about fairness and equal rights."],
  ["Presidents' Day honors…", "presidents of the United States", ["the first teachers", "the fire department", "all the states"], "George Washington was the first one."],
  ["Which holiday is in November?", "Thanksgiving", ["Independence Day", "Memorial Day", "Presidents' Day"], "Turkey and family dinners.", true],
  ["Which holiday honors Dr. Martin Luther King Jr.?", "a day in January", ["a day in July", "a day in October", "a day in August"], "It is near his birthday, January 15.", true],
  ["Why do we have flag rules?", "to show respect for the flag", ["to keep the flag new", "to make flags cost more", "to hide the flag"], "Respect for the flag is respect for our country.", true],
  ["The American flag is folded into the shape of a…", "triangle", ["circle", "square", "heart"], "It has three sides.", true],
  ["A symbol of Arkansas that you can find at a state park is the…", "diamond", ["penguin", "palm tree", "camel"], "Visitors dig for these.", true],
];

const GOODS: Q[] = [
  ["Which crop does Arkansas grow more of than any other state?", "rice", ["oranges", "coconuts", "bananas"], "It grows in wet, flat fields."],
  ["Rice grows best in fields that are…", "flat and flooded with water", ["snowy", "rocky and dry", "on steep mountains"], "Rice plants like their feet wet."],
  ["Arkansas farmers grow soybeans. Soybeans are a…", "good", ["service", "tool", "job"], "You can touch a good."],
  ["Many Arkansas farms raise chickens for…", "meat and eggs", ["wool", "milk", "honey"], "What do chickens give us?"],
  ["Cotton grown in Arkansas can be made into…", "clothes", ["juice", "bricks", "glass"], "T-shirts are often made from it."],
  ["Wood from Arkansas forests is called…", "timber", ["cotton", "steel", "oil"], "It comes from trees."],
  ["Timber from trees can be made into…", "paper and houses", ["milk and cheese", "glass and metal", "rice and beans"], "Trees give us wood."],
  ["A natural resource is something that comes from…", "nature", ["a factory", "a store", "a computer"], "It's in the name."],
  ["Which is a natural resource found in Arkansas?", "natural gas", ["plastic", "candy", "toys"], "It is used to heat homes and cook."],
  ["Natural gas is used to…", "heat homes and cook food", ["grow hair", "make rain", "paint walls"], "A gas stove uses it."],
  ["An export is something we…", "sell to another country", ["buy from another country", "throw away", "keep at home"], "Ex means out."],
  ["An import is something we…", "buy from another country", ["sell to another country", "make at school", "grow in our yard"], "Im means in."],
  ["Arkansas rice sent to another country is an…", "export", ["import", "invention", "election"], "It goes out of our country."],
  ["Bananas grow in hot places. Bananas brought to Arkansas are…", "imports", ["exports", "services", "symbols"], "They come in from far away."],
  ["People trade with other countries to get things they…", "can't make or grow at home", ["already have", "don't want", "can't use"], "Every place can't make everything."],
  ["Why can't Arkansas farmers grow coconuts?", "Arkansas is too cold for them", ["Arkansas is too hot", "coconuts are not real", "it is not allowed"], "Coconuts need hot weather all year."],
  ["A tag in your shirt says it was made in another country. The shirt is…", "an import", ["an export", "a service", "a tradition"], "It came into our country."],
  ["Which carries goods from farms to stores?", "trucks", ["bicycles", "swings", "slides"], "Big ones drive on highways."],
  ["Boats called barges carry goods on the…", "Arkansas River", ["playground", "sidewalk", "sky"], "A big river runs across the state."],
  ["Which good might Arkansas buy from another country?", "bananas", ["rice", "soybeans", "chickens"], "Arkansas grows the others itself."],
  ["Toys, clothes and food can connect us to…", "people in other countries", ["no one", "only our street", "only the past"], "Many things we use are made far away."],
  ["A farmer sells rice and buys a tractor. This is an example of…", "trade", ["a rule", "a holiday", "a symbol"], "Giving something to get something.", true],
  ["Arkansas grows lots of rice but no coffee. To get coffee, Arkansas must…", "trade", ["vote", "build a dam", "plant more rice"], "Buy it from where it grows.", true],
  ["Which is an Arkansas export?", "rice sold to Mexico", ["bananas from Ecuador", "a toy from China", "coffee from Brazil"], "It goes out of the United States.", true],
  ["Trees, water and soil are all…", "natural resources", ["services", "imports", "holidays"], "They come from nature.", true],
  ["Why do people in Arkansas buy goods made in other places?", "no place can make everything it needs", ["it is a law", "goods from far away are free", "Arkansas makes nothing"], "Places depend on each other.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "ar-g1-symbols",
    title: "Symbols, Songs & Holidays",
    emoji: "🎆",
    blurb: "Arkansas symbols, flag rules and national holidays",
    parentNote:
      "The Arkansas state song, mammal, drink, dance and gem, how to treat the American flag, the national anthem and Pledge, and what our national holidays honor.",
    standards: ["C.1.1.4; H.1.1.5", "state and national symbols, patriotic songs and flag etiquette, and the meaning of national holidays"],
    items: SYMBOLS,
  }),
  bankUnit({
    id: "ar-g1-goods-trade",
    title: "Arkansas Goods & Trade",
    emoji: "🌾",
    blurb: "Rice, chickens, timber, and trading with the world",
    parentNote:
      "What Arkansas grows and makes (rice, soybeans, cotton, chickens and timber), natural resources such as natural gas, how goods travel, and why people import and export goods.",
    standards: ["E.1.1.9; E.1.1.10; G.1.1.7; G.1.1.9", "goods Arkansas imports and exports, natural resources in the community, and how products connect us to other places"],
    items: GOODS,
  }),
];
