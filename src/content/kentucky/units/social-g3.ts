import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Kentucky Grade 3 social studies, world communities: how world events affect Kentucky (3.H.KH.1), how cultures from
// around the world have blended in Kentucky (3.G.KGE.1) and how trade benefits Kentucky (3.E.KE.1); and the
// contributions of inventors in diverse world communities, Kentucky's among them (3.H.CH.2).

const WORLD: Q[] = [
  ["Trade is when people…", "exchange goods and services", ["hide their goods", "throw goods away", "make everything themselves"], "Both sides get something they want."],
  ["Kentucky sells Thoroughbred horses to buyers from…", "countries all around the world", ["only Kentucky", "only one city", "nowhere"], "Buyers fly in for the horse sales in Lexington."],
  ["Cars and trucks built in Kentucky are sold…", "across the United States and in other countries", ["only in Frankfort", "only to farmers", "never"], "Kentucky is a big car-making state."],
  ["Kentucky buys bananas and coffee from other countries because…", "they don't grow well in Kentucky's climate", ["Kentucky has too many", "they are against the law", "no one likes them"], "Trade brings goods we can't make easily."],
  ["When Kentucky sells goods to other countries, Kentucky workers…", "have more jobs", ["lose all their jobs", "stop working", "move to the moon"], "Selling more means making more."],
  ["Goods sent to another country to be sold are called…", "exports", ["imports", "taxes", "chores"], "Exports go out."],
  ["Goods brought in from another country are called…", "imports", ["exports", "fossils", "laws"], "Imports come in."],
  ["Cultural diffusion means…", "ideas and customs spreading from one place to another", ["a kind of weather", "a type of rock", "a cave"], "Food, music and words spread."],
  ["Bluegrass music blends Irish and Scottish fiddle tunes with the banjo, which grew from instruments made by…", "Africans and African Americans", ["Vikings only", "robots", "astronauts"], "Kentucky's music mixes cultures."],
  ["Bill Monroe, the \"Father of Bluegrass\" music, was from…", "Kentucky", ["Japan", "Brazil", "Egypt"], "He grew up in Rosine, Kentucky."],
  ["In the 1800s, many families came to Louisville from…", "Germany and Ireland", ["Antarctica", "the moon", "Mars"], "German neighborhoods still have old churches and bakeries."],
  ["Since the 1990s, many families from Bosnia have made homes in…", "Bowling Green", ["Antarctica", "the Sahara", "the moon"], "They came as refugees from a war."],
  ["Refugees are people who…", "had to leave their country to stay safe", ["go on vacation", "never travel", "live in caves"], "Many refugees have settled in Kentucky."],
  ["Tacos and other Mexican foods are popular in Kentucky. This is an example of…", "cultural blending", ["erosion", "hibernation", "a law"], "Foods travel with people."],
  ["When a world event raises the price of gasoline, Kentucky families…", "pay more to drive", ["pay nothing", "never drive", "get free cars"], "World events reach every community."],
  ["During World War II, Kentucky factories and farms…", "made supplies for soldiers", ["closed forever", "made only toys", "stopped working"], "The whole country helped."],
  ["The gold at Fort Knox in Kentucky belongs to…", "the United States government", ["one family", "a pirate", "a horse farm"], "It is kept in a vault."],
  ["Many people from other countries visit Kentucky to see…", "Mammoth Cave and the Kentucky Derby", ["the Eiffel Tower", "the pyramids", "the Great Wall"], "Visitors spend money in Kentucky."],
  ["Kentucky farmers sell soybeans to other countries. This is an example of…", "interdependence", ["a natural disaster", "a holiday", "a law"], "Countries depend on each other for goods.", true],
  ["When a storm hurts crops in another country, the price of that food in Kentucky may…", "go up", ["go down to zero", "never change", "turn into coal"], "Less supply can raise prices.", true],
  ["Why do many Kentucky towns have Mexican, Vietnamese and Somali restaurants?", "people from those places brought their foods", ["laws say every town needs them", "the foods grow wild", "tourists cook them"], "Migration brings culture.", true],
  ["How does trade help Kentucky families?", "they can buy goods from far away and sell what Kentucky makes", ["they must make everything themselves", "it stops all shopping", "it closes farms"], "Trade gives more choices.", true],
  ["Many Kentucky words, songs and quilting patterns came from…", "people who moved here from many places", ["one family", "a robot", "nowhere"], "Cultures blend over time.", true],
  ["A drought in Kentucky that hurts the corn crop could change prices in…", "other states and countries that buy Kentucky corn", ["no other place", "outer space", "the past"], "Trade links places together.", true],
];

const INVENTORS: Q[] = [
  ["An inventor is a person who…", "creates something new", ["only reads books", "never works", "copies others"], "Inventions solve problems."],
  ["Johannes Gutenberg of Germany invented a printing press that made…", "books faster and cheaper", ["cars", "phones", "airplanes"], "Before that, books were copied by hand."],
  ["Paper was first made long ago in…", "China", ["Kentucky", "Brazil", "Canada"], "Cai Lun is credited with it."],
  ["The Wright brothers of Ohio flew the first powered…", "airplane", ["submarine", "car", "train"], "They flew in 1903."],
  ["Alexander Graham Bell is known for inventing the…", "telephone", ["light bulb", "printing press", "airplane"], "It carried voices on wires."],
  ["Thomas Edison worked on the…", "light bulb", ["wheel", "compass", "paper"], "He also worked as a telegraph operator in Louisville."],
  ["Garrett Morgan, born in Paris, Kentucky, invented an early…", "traffic signal", ["telephone", "airplane", "radio telescope"], "It helped stop crashes at crossroads."],
  ["Garrett Morgan also invented a hood that helped people…", "breathe in smoke", ["fly", "swim faster", "see in the dark"], "Firefighters used it."],
  ["Nathan Stubblefield of Murray, Kentucky, sent voices…", "without wires", ["by mail", "by horse", "by train"], "He showed a wireless telephone to a crowd in Murray in 1902."],
  ["Louis Braille of France invented a way for people who are blind to…", "read with raised dots", ["see in color", "fly", "drive"], "Braille is used all over the world."],
  ["The magnetic compass was first used for finding direction in…", "China", ["Antarctica", "Kentucky", "Australia"], "Sailors used it to find north."],
  ["Alessandro Volta of Italy invented an early…", "battery", ["bicycle", "telephone", "camera"], "The word volt comes from his name."],
  ["Tim Berners-Lee of England invented the…", "World Wide Web", ["printing press", "steam engine", "plow"], "It lets us share pages on the internet."],
  ["The wheel was first used thousands of years ago in…", "Mesopotamia", ["Kentucky", "Antarctica", "the Moon"], "It made moving heavy loads easier."],
  ["Inventions often solve…", "problems people have", ["nothing", "only games", "weather"], "Think about what the invention helps with."],
  ["How did the printing press change the world?", "more people could read and share ideas", ["books disappeared", "people stopped reading", "it made cars"], "Books became cheaper."],
  ["Before the traffic signal, crossroads were dangerous because…", "no one knew who should go first", ["cars could fly", "roads had no cars", "it was always dark"], "Signals take turns."],
  ["Which came first?", "the printing press", ["the airplane", "the telephone", "the World Wide Web"], "Gutenberg lived in the 1400s."],
  ["Which came last?", "the World Wide Web", ["the printing press", "the light bulb", "the telephone"], "It began in 1989.", true],
  ["Why do inventors in different countries often build on each other's ideas?", "ideas spread and inspire new inventions", ["inventors never talk", "every invention is the same", "ideas never travel"], "Invention is a world project.", true],
  ["Kentuckian Garrett Morgan's safety hood helped rescue workers trapped in a tunnel in…", "1916", ["1492", "1776", "2020"], "He went into the tunnel himself.", true],
  ["Mary Anderson, an inventor from Alabama, invented the…", "windshield wiper", ["light bulb", "telephone", "airplane"], "It cleared rain and snow from car windows.", true],
  ["Why is Nathan Stubblefield remembered in Murray, Kentucky?", "he was an early inventor of wireless voice sending", ["he built the first car", "he discovered Mammoth Cave", "he was the first governor"], "He showed it to a crowd in Murray in 1902.", true],
  ["Putting inventions in order of when they were made is called…", "a timeline", ["a recipe", "a map key", "a poem"], "Timelines show order.", true],
];

export const SOCIAL_3: Unit[] = [
  bankUnit({
    id: "ky-g3-kentucky-and-the-world",
    title: "Kentucky & the World",
    emoji: "🌍",
    blurb: "Trade, cultures and world events at home",
    parentNote: "How Kentucky is connected to world communities: trade in horses, cars and farm goods, imports and exports, cultures that have blended in Kentucky (bluegrass music, German and Irish Louisville, Bosnian families in Bowling Green, Mexican foods), and how world events reach Kentucky families.",
    standards: ["3.H.KH.1; 3.G.KGE.1; 3.E.KE.1", "how world events affect Kentucky, cultural diffusion and blending in Kentucky, and how trade benefits Kentucky"],
    items: WORLD,
  }),
  bankUnit({
    id: "ky-g3-world-inventors",
    title: "Inventors Around the World",
    emoji: "💡",
    blurb: "From paper and the compass to Garrett Morgan",
    parentNote: "Inventors from many world communities and what their inventions changed: paper and the compass from China, Gutenberg's printing press, Braille, the battery, the telephone, the airplane and the World Wide Web, with Kentucky inventors Garrett Morgan and Nathan Stubblefield.",
    standards: ["3.H.CH.2", "contributions made by inventors in diverse world communities"],
    items: INVENTORS,
  }),
];
