import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Nevada Grade 7 social studies, World Geography and Global Studies: Nevada's role in the world through the five themes
// of geography (SS.6-8.WGGS.18), with how places and regions compare (SS.6-8.WGGS.28) and how a place's environment
// shapes what it produces and trades (SS.6-8.WGGS.31). The rest of the course is practised with adopted units (see
// ../plan/social.ts).

const WORLD: Q[] = [
  ["The five themes of geography are location, place, human-environment interaction, movement and…", "region", ["weather", "history", "money"], "Geographers use them to study any place."],
  ["Saying Las Vegas is at about 36° N, 115° W describes its…", "absolute location", ["relative location", "region", "movement"], "Latitude and longitude give an exact spot."],
  ["Saying Reno is about 30 miles north of Carson City describes its…", "relative location", ["absolute location", "climate", "population"], "It is described in relation to another place."],
  ["Describing Nevada's mountains, deserts and sagebrush is describing its…", "place", ["movement", "location", "time zone"], "Place means a location's physical and human features."],
  ["Building Hoover Dam to store water and make electricity is an example of…", "human-environment interaction", ["absolute location", "region", "relative location"], "People changed the environment to meet their needs."],
  ["Millions of tourists flying into Las Vegas from around the world is an example of…", "movement", ["place", "absolute location", "region"], "Movement covers people, goods and ideas."],
  ["Nevada is part of the Great Basin, a region defined by…", "rivers that never reach the ocean", ["a shared language", "a single city", "ocean coastlines"], "Physical features can define a region."],
  ["Nevada's dry climate comes partly from the rain shadow of mountains to its…", "west", ["east", "north", "south"], "Moist Pacific air drops its rain before it reaches Nevada."],
  ["Which world desert has a climate most like southern Nevada's?", "the deserts of the Middle East and North Africa", ["the Amazon rain forest", "the Arctic tundra", "the Swiss Alps"], "Hot, dry deserts lie at similar latitudes."],
  ["Las Vegas and Dubai are both desert cities that grew fast around…", "tourism, hotels and big events", ["fishing fleets", "rice farms", "coal mines"], "Similar places can grow in similar ways."],
  ["Gold mined in Nevada is mostly sold to buyers in…", "other countries around the world", ["only Carson City", "nowhere", "only Reno"], "Gold is traded worldwide."],
  ["Nevada mines more gold than any other state. This is an example of how a place's… shapes what it produces.", "environment and resources", ["population size", "language", "holidays"], "Its rocks hold gold."],
  ["Lithium mined in Nevada goes into batteries used around the world. This shows Nevada is linked to the world by…", "trade and technology", ["only tourism", "the ocean", "a shared border"], "Resources travel in global supply chains."],
  ["Solar farms in Nevada's deserts show how people use a region's…", "sunny climate", ["heavy rain", "ocean waves", "glaciers"], "Nevada has many cloudless days."],
  ["Interstate 80 and the railroad across northern Nevada follow the…", "Humboldt River valley", ["Colorado River canyon", "Atlantic coast", "Mississippi delta"], "Routes follow easy ground and water."],
  ["Many Nevadans speak Spanish, Tagalog and other languages at home. This shows Nevada is connected to the world by…", "migration", ["glaciers", "earthquakes", "tides"], "People bring their languages with them."],
  ["The Colorado River supplies water to Nevada, other states and Mexico. Sharing a river between places is managed by…", "agreements and treaties", ["no rules", "one family", "the river itself"], "Shared resources need shared rules."],
  ["Which theme of geography is the main focus when studying how water moves from Lake Mead to Las Vegas homes?", "human-environment interaction", ["absolute location", "region", "place names"], "People move and use water from nature.", true],
  ["Big conventions in Las Vegas bring businesses from many countries. This makes Las Vegas part of the… economy.", "global", ["local only", "closed", "traditional"], "Ideas and money move across borders.", true],
  ["Why would a geographer compare Nevada with Chile's Atacama region?", "both are dry and both mine minerals used in batteries", ["both are tropical islands", "both have rain forests", "both are under the ocean"], "Comparing places shows patterns.", true],
  ["When fewer international tourists visit Las Vegas, Nevada's economy…", "slows down and loses jobs", ["grows faster", "is not affected", "gets more rain"], "Global events reach local places.", true],
  ["Lake Mead's falling water level during long droughts shows how… affects a region.", "climate", ["population maps", "time zones", "languages"], "Less snow in the mountains means less river water.", true],
  ["A region defined by a shared feature people made, like the Las Vegas metro area, is a…", "human region", ["physical region", "climate zone", "landform"], "People draw human regions.", true],
  ["Nevada's mountains and basins formed because the Earth's crust there is slowly…", "stretching apart", ["sinking under the ocean", "freezing", "melting"], "Faults let blocks rise and drop.", true],
  ["Nevada lies between the Sierra Nevada to the west and the Rocky Mountains to the east. This describes Nevada's…", "relative location", ["absolute location", "climate", "population"], "It is located by what is around it."],
  ["Reno and Las Vegas are about 440 miles apart. Which tool would best show the distance?", "a map with a scale", ["a thermometer", "a calendar", "a compass rose alone"], "A scale turns map distance into miles."],
  ["The Great Basin and the Sahara are both deserts, but the Great Basin is…", "colder in winter, with snow on its mountains", ["a tropical rain forest", "at the equator", "under the ocean"], "Latitude and elevation shape climate."],
  ["Interstate 15 links Las Vegas with cities to its southwest and northeast. This is part of the theme of…", "movement", ["place", "region", "absolute location"], "Highways move people and goods."],
  ["Farmers in Fallon use water from rivers to grow crops in the desert. This is an example of…", "human-environment interaction", ["absolute location", "region", "movement"], "People change the environment to meet their needs."],
  ["A map that shows where Nevada's people live, with most in two metro areas, is studying…", "population distribution", ["rainfall only", "time zones", "rock types"], "Where people live is a pattern geographers map.", true],
  ["Las Vegas welcomes visitors who speak many languages. This makes Las Vegas a… city.", "global", ["closed", "isolated", "rural"], "People from around the world meet there.", true],
  ["Why might the price of gold in world markets matter to towns like Elko?", "many local jobs depend on gold mines", ["Elko is on the ocean", "gold is not mined there", "prices never change"], "Global prices reach local economies.", true],
];

export const SOCIAL_7: Unit[] = [
  bankUnit({
    id: "nv-g7-nevada-in-the-world",
    title: "Nevada in the World",
    emoji: "🌐",
    blurb: "The five themes of geography, with Nevada as the example",
    parentNote: "Nevada's place in the world through the five themes of geography (location, place, human-environment interaction, movement and region): its latitude and longitude, the Great Basin and rain shadow, Hoover Dam and Lake Mead, tourism and trade in gold and lithium, and comparisons with desert places elsewhere in the world.",
    standards: ["SS.6-8.WGGS.18; SS.6-8.WGGS.28; SS.6-8.WGGS.31", "Nevada's role in the world through the five themes of geography, the characteristics of places and regions, and how environment shapes production"],
    items: WORLD,
  }),
];
