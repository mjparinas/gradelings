import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Connecticut Grade 4 social studies, United States Geography: the regions of the United States on maps, with their
// land, climate and landmarks (4.Geo.1.a, 4.Geo.3.a, 4.Geo.10.a); why people settle and move, the resources that draw
// them and the communities they build (4.Geo.2.a, 4.Geo.6.a, 4.Geo.7.a, 4.Geo.8.a, 4.His.5.a, 4.His.9.a); and how
// people in each region prepare for disasters and adapt to a changing climate (4.Geo.9.a, 4.Geo.12.a, 4.Geo.12.b,
// 4.Civ.14.a). Connecticut's own units may name other states: the course is about the whole country.

const REGIONS: Q[] = [
  ["Connecticut is in which region of the United States?", "the Northeast", ["the Southwest", "the West"], "It is one of the six New England states."],
  ["Which state is in the Southwest region?", "Arizona", ["Vermont", "Ohio"], "The Southwest has deserts and canyons."],
  ["Which state is in the Midwest region?", "Iowa", ["Georgia", "Nevada"], "The Midwest is known for farms and the Great Lakes."],
  ["Which state is in the Southeast region?", "Georgia", ["Montana", "Maine"], "The Southeast has warm, wet weather."],
  ["Which state is in the West region?", "Oregon", ["Kentucky", "New Jersey"], "The West reaches the Pacific Ocean."],
  ["Which ocean is on the east coast of the United States?", "the Atlantic Ocean", ["the Pacific Ocean", "the Arctic Ocean"], "Connecticut's shore leads out to it."],
  ["Which ocean is on the west coast of the United States?", "the Pacific Ocean", ["the Atlantic Ocean", "the Indian Ocean"], "California and Oregon touch it."],
  ["The longest mountain range in the eastern United States is the…", "Appalachian Mountains", ["Rocky Mountains", "Sierra Nevada"], "They run from Maine to Alabama."],
  ["The tall mountains that run through the western states are the…", "Rocky Mountains", ["Appalachian Mountains", "Berkshires"], "Colorado has many of their peaks."],
  ["The flat grassland in the middle of the country is called the…", "Great Plains", ["Great Basin", "Coastal Plain"], "Wheat and cattle farms cover much of it."],
  ["The five big freshwater lakes in the Midwest are the…", "Great Lakes", ["Finger Lakes", "Salt Lakes"], "Lake Michigan is one of them."],
  ["The longest river system in the United States is the…", "Mississippi and Missouri rivers", ["Connecticut River", "Hudson River"], "It drains much of the middle of the country."],
  ["Which region has the most desert land?", "the Southwest", ["the Northeast", "the Midwest"], "Little rain falls there."],
  ["On a map, the compass rose shows…", "north, south, east and west", ["how far apart places are", "what the symbols mean"], "N points north."],
  ["A map key, or legend, tells you…", "what the symbols on a map mean", ["the date the map was made", "who drew the map"], "It is usually in a corner."],
  ["A map scale helps you find…", "how far apart places are", ["what the weather is", "who lives there"], "One inch might stand for 100 miles."],
  ["Each state has a capital city. Hartford is the capital of…", "Connecticut", ["New York", "Rhode Island"], "The state's laws are made there."],
  ["Which kind of land is along the coast of the Southeast?", "low, flat coastal plain", ["tall snowy mountains", "deep canyons"], "Beaches and marshes line the shore."],
  ["The Grand Canyon is in which region?", "the Southwest", ["the Northeast", "the Southeast"], "The Colorado River carved it.", true],
  ["Why is the Midwest sometimes called America's breadbasket?", "it grows a lot of corn, wheat and soybeans", ["it has the most bakeries", "it has no farms"], "Its flat land and rich soil are good for crops.", true],
  ["Why are the Northeast's winters colder than the Southeast's?", "the Northeast is farther north", ["the Northeast is in a desert", "the Southeast has more mountains"], "Places farther from the equator are colder.", true],
  ["Why does the Southwest get so little rain?", "mountains block wet air and it is far from wet winds", ["it is next to the ocean", "it is very far north"], "Deserts form where little moisture reaches.", true],
  ["Lines that run east and west on a globe measure…", "latitude", ["longitude", "elevation"], "They tell how far north or south a place is.", true],
  ["A national park like Yellowstone is a place that is…", "protected for everyone to enjoy", ["owned by one family", "closed to all visitors"], "National parks protect nature and history.", true],
  ["Why do coastal regions often have milder weather than inland places?", "the ocean warms and cools slowly", ["the ocean is always hot", "there is no wind near the ocean"], "Water changes temperature slowly.", true],
  ["A region is a group of places that…", "share features like land, climate or culture", ["all have the same name", "are always in one state"], "Geographers group places to compare them.", true],
];

const SETTLING: Q[] = [
  ["Early towns in the United States were often built near rivers because…", "rivers gave water, food and travel", ["rivers kept people away", "rivers had no fish"], "Rivers were the first highways."],
  ["Which natural resource drew many people to California in 1849?", "gold", ["coal", "cotton"], "It was called the Gold Rush."],
  ["Fishing towns grew along the New England coast because…", "the ocean had many fish", ["the land was a desert", "there was no water"], "People settle near resources."],
  ["A push factor is something that makes people…", "want to leave a place", ["want to stay forever", "move to a place"], "War and hard times can push people away."],
  ["A pull factor is something that…", "draws people to a new place", ["makes people leave", "stops all travel"], "Jobs and safety can pull people in."],
  ["Which is an example of a pull factor?", "good jobs in a city", ["a long drought", "a war at home"], "Pull factors attract people."],
  ["Which is an example of a push factor?", "a storm that destroys homes", ["good schools", "a safe neighborhood"], "Push factors make people leave."],
  ["Migration means…", "moving from one place to live in another", ["staying in one place", "visiting for one day"], "People migrate within a country or to a new one."],
  ["Railroads across the country helped people…", "move west and ship goods", ["stop traveling", "live underwater"], "Trains made long trips faster."],
  ["Many cities grew up around ports because…", "ships could bring goods to trade", ["ports kept ships away", "ports had no water"], "Trade helps cities grow."],
  ["A cultural enclave, like a Chinatown, is a neighborhood where…", "people from one culture live and share their traditions", ["no one lives", "only tourists stay"], "Shops, foods and languages show the culture."],
  ["Hartford has a large community whose families came from…", "Puerto Rico", ["Antarctica", "the Moon"], "Many families moved there for work."],
  ["People who move to a new country often keep their…", "language, foods and holidays", ["old address", "same weather"], "Cultures travel with people."],
  ["A census counts…", "the people who live in a place", ["the trees in a forest", "the cars on a road"], "The United States holds one every 10 years."],
  ["Which source could show where people lived 100 years ago?", "an old census record", ["today's weather report", "a new video game"], "Records from the time are primary sources."],
  ["Farmers settled in the Midwest because it had…", "flat land and rich soil", ["tall mountains", "dry desert"], "Good land grows good crops."],
  ["During the Great Migration, millions of Black Americans moved from the South to…", "cities in the North and West", ["farms in the South", "other countries only"], "They looked for jobs and fairer treatment.", true],
  ["How did the Dust Bowl of the 1930s cause migration?", "dry, blowing soil ruined farms, so families moved west", ["it made farms richer", "it flooded the cities"], "A disaster pushed families from the Great Plains.", true],
  ["Why do many people move to the Southwest and Southeast today?", "warm weather and growing jobs", ["they have the coldest winters", "they have no cities"], "Climate and jobs can pull people.", true],
  ["Why did mill towns grow along Connecticut's fast rivers in the 1800s?", "falling water powered the machines", ["the rivers were frozen all year", "the rivers carried gold"], "Water power ran early factories.", true],
  ["A diary written by a family moving west is useful because it…", "tells what the trip was like from their point of view", ["is a map of today", "shows the future"], "Diaries are primary sources.", true],
  ["Why might people from one country settle near each other in a new city?", "to share a language, culture and help", ["because the law forces them", "to avoid all neighbors"], "Communities support newcomers.", true],
  ["Why are fewer people living in some small farm towns than before?", "farms need fewer workers and jobs moved to cities", ["the towns moved to the ocean", "people stopped eating food"], "Economic changes move people.", true],
  ["Water from the Colorado River lets cities grow in the dry Southwest. This shows…", "people settle where they can get water", ["deserts have lots of rain", "rivers stop cities from growing"], "Resources shape where people live.", true],
  ["Why do highways and airports matter for where businesses build?", "they move people and goods quickly", ["they block all travel", "they make goods cost more"], "Transportation links places.", true],
  ["Comparing an old map with a new map of a city can show…", "how the city grew and changed", ["tomorrow's weather", "only the oceans"], "Maps from different times show change.", true],
];

const HAZARDS: Q[] = [
  ["Hurricanes most often hit which part of the United States?", "the Atlantic and Gulf coasts", ["the Rocky Mountains", "the Great Plains only"], "They form over warm ocean water."],
  ["Tornadoes happen most often in the…", "Great Plains", ["Northeast coast", "Pacific Ocean"], "That area is sometimes called Tornado Alley."],
  ["Earthquakes happen most often in which state?", "California", ["Florida", "Iowa"], "It sits where large plates of rock meet."],
  ["Wildfires are a big danger in dry parts of the…", "West", ["Northeast coast", "Great Lakes"], "Dry forests and grass burn easily."],
  ["A nor'easter is a storm that brings snow, wind and flooding to the…", "Northeast coast", ["Southwest desert", "Hawaiian islands"], "Its winds blow from the northeast."],
  ["A levee is a wall of earth built to…", "keep a river from flooding towns", ["make rivers longer", "hold up a bridge"], "Levees line the Mississippi River."],
  ["Building codes are rules that make buildings…", "safer in storms and earthquakes", ["taller than ever", "cheaper to paint"], "Strong buildings protect people."],
  ["What should a family keep in an emergency kit?", "water, food, a flashlight and a first-aid kit", ["only toys", "only snacks"], "Kits help in a power outage or storm."],
  ["Before a big hurricane, people near the coast may need to…", "evacuate to a safer place", ["go swimming", "open all windows"], "Evacuate means leave for safety."],
  ["After a disaster, groups like the Red Cross help by…", "giving shelter, food and supplies", ["closing all stores", "making the storm stronger"], "Volunteers help communities recover."],
  ["A drought is a long time with…", "very little rain", ["too much snow", "lots of floods"], "Crops and rivers can dry up."],
  ["During a drought, people can help by…", "using less water", ["watering lawns more", "filling extra pools"], "Saving water helps everyone."],
  ["Climate is…", "the usual weather of a place over many years", ["today's weather only", "the time of day"], "Weather changes daily; climate is the pattern."],
  ["Warmer temperatures can make the growing season…", "longer", ["disappear", "colder"], "Farmers may plant earlier."],
  ["Rising sea levels are a problem for…", "towns along the coast", ["mountain tops", "deserts far inland"], "Higher water can flood the shore."],
  ["Tornado sirens warn people to…", "go to a safe room or basement", ["go outside to watch", "stand by windows"], "Low, inside rooms are safest."],
  ["In 2012, Superstorm Sandy flooded the coasts of New Jersey, New York and…", "Connecticut", ["Arizona", "Nevada"], "Storm surge pushed seawater onto the shore.", true],
  ["After Hurricane Katrina in 2005, many families from New Orleans…", "moved to other cities and states", ["moved to the Moon", "stayed in flooded homes"], "Disasters can cause migration.", true],
  ["Why do some coastal towns raise houses up on posts?", "so floodwater can pass underneath", ["to see the stars better", "to make them colder"], "People adapt to flooding.", true],
  ["Why do towns in the West clear dry brush near homes?", "to slow wildfires", ["to grow more grass", "to bring rain"], "Less fuel means smaller fires.", true],
  ["How can planting trees in a city help in hot summers?", "trees give shade and cool the air", ["trees make it hotter", "trees stop all wind"], "Cities adapt to heat.", true],
  ["Why does a community plan before a disaster happens?", "so people know what to do and stay safe", ["to cause the disaster", "so no one gets help"], "Plans save lives.", true],
  ["Rules that cleaned up smoky air came after people worked together to…", "ask leaders to change the laws", ["build more smokestacks", "stop all cars forever"], "People can change laws in a democracy.", true],
  ["Why might a dam help a dry region but harm fish?", "it stores water but blocks fish from swimming upriver", ["it makes fish grow wings", "it adds more rivers"], "Every choice has costs and benefits.", true],
  ["Why are wetlands along the coast helpful in storms?", "they soak up water and slow waves", ["they make waves bigger", "they cause storms"], "Protecting marshes protects towns.", true],
  ["A family in the Midwest moves away after floods ruin their farm year after year. This is an example of…", "an environmental push factor", ["a pull factor", "a vacation"], "Repeated disasters push people away.", true],
];

export const SOCIAL_4: Unit[] = [
  bankUnit({
    id: "ct-g4-us-regions",
    title: "Regions of the United States",
    emoji: "🗺️",
    blurb: "The Northeast, Southeast, Midwest, Southwest and West",
    parentNote:
      "The five regions of the United States on maps, with their landforms (the Appalachians, the Rockies, the Great Plains, the Great Lakes, the Mississippi), their climates, and map tools such as the compass rose, key and scale.",
    standards: ["4.Geo.1.a; 4.Geo.3.a; 4.Geo.10.a", "maps of the regions of the United States, their landmarks, and how and why their environments differ"],
    items: REGIONS,
  }),
  bankUnit({
    id: "ct-g4-moving-and-settling",
    title: "Moving & Settling",
    emoji: "🧳",
    blurb: "Why people settle where they do, and why they move",
    parentNote:
      "How resources like rivers, soil, fish and gold shaped where people settled; push and pull factors; migrations such as the Great Migration and the Dust Bowl; cultural communities in cities; and sources like census records and diaries.",
    standards: ["4.Geo.2.a; 4.Geo.6.a; 4.Geo.7.a; 4.Geo.8.a; 4.His.5.a; 4.His.9.a", "natural resources and settlement, why people migrate, cultural communities, and the sources that show settlement"],
    items: SETTLING,
  }),
  bankUnit({
    id: "ct-g4-hazards-and-climate",
    title: "Storms, Hazards & Climate",
    emoji: "🌪️",
    blurb: "How each region prepares for disasters and adapts",
    parentNote:
      "The natural hazards of each region (hurricanes, tornadoes, earthquakes, wildfires, nor'easters and droughts), how communities prepare and respond (levees, building codes, emergency kits, evacuation), how disasters cause migration, and how people adapt to a changing climate.",
    standards: ["4.Geo.9.a; 4.Geo.12.a; 4.Geo.12.b; 4.Civ.14.a", "how disasters cause migration, how people prepare for and respond to them, adapting to climate change, and people working for change"],
    items: HAZARDS,
  }),
];
