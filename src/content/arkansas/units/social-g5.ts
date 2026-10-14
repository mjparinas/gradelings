import type { Unit } from "../../types";
import { UNITS as ALABAMA_7 } from "../../alabama/units/social-g7";
import { COPIES_7 as ARIZONA_7 } from "../../arizona/units/copies-g7";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";

// Arkansas's own Grade 5 social studies units (`ar-` ids), for World Geography: copies of other states' world maps,
// population and global trade units without their state questions, with Arkansas items added (G.2.5.2, G.3.5.1,
// G.3.5.2, G.3.5.7, G.4.5.3), and a unit on how people around the world adapt to and change their environment, from
// natural disasters to sustainability (G.3.5.3, G.4.5.1, G.4.5.2, G.4.5.5).

const ENVIRONMENT: Q[] = [
  ["People in the Netherlands built dikes and pumped water out of the sea to make new…", "farmland", ["deserts", "mountains", "volcanoes"], "Land taken from the sea."],
  ["Farmers in mountain areas of Asia cut steps into hillsides called…", "terraces", ["canals", "levees", "dunes"], "Flat steps hold water for rice."],
  ["Bringing river water to dry fields through ditches and pipes is…", "irrigation", ["erosion", "migration", "pollution"], "Watering crops."],
  ["Levees along the Mississippi River were built to…", "protect towns and farms from floods", ["make the river saltier", "stop all boats", "dry up the river"], "Walls of earth along the banks."],
  ["Cutting down large areas of forest is called…", "deforestation", ["irrigation", "urbanization", "conservation"], "Forests disappear."],
  ["One effect of cutting down rainforests is that…", "many animals and plants lose their habitat", ["more rain falls everywhere", "the soil gets richer", "rivers stop flowing to the sea"], "Homes for wildlife are lost."],
  ["Land turning into desert after drought and overgrazing is…", "desertification", ["reforestation", "irrigation", "terracing"], "It happens at the edges of deserts."],
  ["People in very hot, dry places often build homes with thick walls and small windows to…", "keep the inside cool", ["let in more heat", "catch snow", "float in floods"], "Adapting to climate."],
  ["Homes on stilts help people who live…", "where floods are common", ["on the top of tall mountains", "in deserts with no rain", "where it never rains"], "Raised above the water."],
  ["A hurricane forms over…", "warm ocean water", ["cold mountain peaks", "dry deserts", "frozen lakes"], "Warm water fuels the storm."],
  ["Many earthquakes and volcanoes happen where…", "tectonic plates meet", ["rivers meet the sea", "deserts meet forests", "cities are large"], "The Ring of Fire around the Pacific."],
  ["Arkansas and nearby states are often hit by tornadoes in…", "spring", ["only in winter", "never", "only at night in fall"], "Warm and cold air meet."],
  ["After a big flood, a government might pass new laws to…", "build stronger levees and plan where people build", ["stop all farming forever", "move every city to the mountains", "ban rain"], "Planning to lower future harm."],
  ["Using resources so there is enough for the future is called…", "sustainability", ["globalization", "urbanization", "inflation"], "Thinking about the future."],
  ["Which is a renewable resource?", "sunlight", ["coal", "oil", "natural gas"], "It will not run out."],
  ["Which is a nonrenewable resource?", "coal", ["wind", "sunlight", "flowing water"], "It took millions of years to form."],
  ["Recycling aluminum cans helps the environment because it…", "saves resources and energy", ["makes more trash", "uses more mining", "pollutes rivers"], "Old cans become new ones."],
  ["Planting trees where a forest was cut down is called…", "reforestation", ["deforestation", "desertification", "irrigation"], "Re- means again."],
  ["When fresh water is scarce in a region, people may…", "build reservoirs and use water-saving irrigation", ["use more water for lawns", "pour water into the sea", "stop drinking water"], "Saving every drop."],
  ["A big dam on a river can make electricity but can also…", "flood land and change habitats upstream", ["create oil", "stop the rain", "make the river longer"], "Every change has trade-offs."],
  ["Smoke from factories and cars can cause…", "air pollution", ["more fresh water", "richer soil", "fewer clouds"], "Dirty air harms health."],
  ["Farmers in the Arkansas Delta pump groundwater from aquifers to irrigate rice. Pumping too much can…", "lower the water underground faster than rain refills it", ["make the aquifer bigger", "turn the water into oil", "stop all rain"], "Groundwater is limited.", true],
  ["The Aral Sea in Central Asia shrank a lot because rivers feeding it were used to…", "irrigate cotton fields", ["make ice", "build cities on boats", "fill swimming pools"], "Water taken for farming.", true],
  ["China's Three Gorges Dam on the Yangtze River was built mainly to…", "make electricity and control floods", ["create a desert", "stop ships", "make the river saltier"], "The world's largest hydroelectric dam.", true],
  ["Why do communities work together across borders to clean up a shared river?", "pollution flows downstream to everyone", ["rivers stop at borders", "only one country uses water", "clean rivers are not needed"], "A river crosses many places.", true],
  ["A city plants trees, adds bike lanes and builds a recycling center. These are examples of…", "sustainability practices", ["deforestation", "desertification", "push factors"], "Lowering harm to the environment.", true],
  ["After the Mississippi River flood of 1927, Congress passed a law to…", "build a national system of levees and floodways", ["drain the river", "move the river to the west", "stop all boats on the river"], "The Flood Control Act of 1928.", true],
];

export const UNITS: Unit[] = [
  copyOf(
    from(ALABAMA_7, "al-g7-world-maps"),
    {
      id: "ar-g5-world-maps",
      title: "World Maps & Globes",
      emoji: "🌐",
      blurb: "Latitude, longitude, map types and scale",
      parentNote:
        "Using geographic tools: kinds of maps and what each shows, map projections and why flat maps distort, scale, latitude and longitude, hemispheres, and technology such as GPS and GIS.",
      standards: ["G.2.5.2; G.2.5.5", "the uses of maps, globes and other geographic tools"],
    },
    [
      ["Little Rock, Arkansas, is at about 35° N, 92° W. Which hemispheres is it in?", "Northern and Western", ["Southern and Western", "Northern and Eastern", "Southern and Eastern"], "North of the Equator, west of the Prime Meridian."],
      ["Arkansas is on which continent?", "North America", ["South America", "Europe", "Africa"], "Like the rest of the 48 states next to each other."],
      ["Arkansas is in which time zone?", "Central", ["Eastern", "Mountain", "Pacific"], "The same as Chicago."],
      ["Which kind of map would best show the highlands and lowlands of Arkansas?", "a physical map", ["a political map", "a road map", "a population map"], "It shows landforms."],
      ["Which line of latitude is closest to Arkansas?", "35° N", ["0°", "35° S", "70° N"], "Arkansas is north of the Equator, about a third of the way to the pole."],
      ["A GPS receiver in a phone finds its location using signals from…", "satellites", ["volcanoes", "rivers", "libraries"], "They orbit Earth."],
    ],
  ),
  copyOf(
    from(ARIZONA_7, "az-g7-population"),
    {
      id: "ar-g5-population",
      title: "Population & Migration",
      emoji: "👪",
      blurb: "Where people live and why they move",
      parentNote:
        "Reading population data such as density and population pyramids, push and pull factors for migration, refugees, urbanization and cultural diffusion, with examples from Arkansas.",
      standards: ["G.3.5.1; G.3.5.2", "population data, and the push and pull factors behind migration"],
    },
    [
      ["Arkansas's population in the 2020 census was about…", "3 million", ["300,000", "30 million", "300 million"], "A little over 3,000,000 people."],
      ["Northwest Arkansas, around Fayetteville, Springdale, Rogers and Bentonville, has grown fast because of…", "new jobs and businesses", ["a gold rush", "a war", "a new ocean port"], "A pull factor."],
      ["Many counties in the Arkansas Delta have lost people since the 1950s because…", "farm machines replaced many farm jobs", ["the land became a desert", "the rivers dried up", "the land was sold to another country"], "Fewer workers were needed on farms."],
      ["Moving from one part of your own country to another is called…", "internal migration", ["emigration from a country", "deforestation", "a tariff"], "You stay in the same country."],
      ["Where do most people in Arkansas live today?", "in cities and towns", ["on mountaintops", "on boats", "in caves"], "Like most of the United States."],
      ["A population pyramid with a wide bottom shows a country with many…", "young people", ["old people", "factories", "rivers"], "The bottom bars are the youngest ages."],
    ],
  ),
  copyOf(
    from(ARIZONA_7, "az-g7-economies"),
    {
      id: "ar-g5-global-trade",
      title: "Global Trade",
      emoji: "🚢",
      blurb: "Imports, exports and a connected world",
      parentNote:
        "How countries depend on each other through trade: imports and exports, tariffs, outsourcing, globalization, economic systems, and the ships, barges and routes that move goods, with examples from Arkansas.",
      standards: ["G.4.5.3; G.3.5.7", "globalization and trade, and how transportation networks connect regions"],
    },
    [
      ["Arkansas farmers sell much of their rice to other countries. Rice sold to another country is an…", "export", ["import", "tariff", "budget"], "It goes out of the country."],
      ["Barges on the Arkansas River can carry goods to the Mississippi River and then to ports on the…", "Gulf of Mexico", ["Arctic Ocean", "Red Sea", "Great Salt Lake"], "The Mississippi flows south to the sea."],
      ["Shipping containers changed trade because they…", "can move from ship to train to truck without unpacking", ["are made of paper", "only carry water", "can fly"], "Standard boxes save time."],
      ["The Panama Canal makes trade faster by connecting the Atlantic Ocean and the…", "Pacific Ocean", ["Indian Ocean", "Arctic Ocean", "Mediterranean Sea"], "Ships no longer sail around South America."],
      ["Which helps goods move quickly across Arkansas by truck?", "interstate highways such as I-40", ["hiking trails", "canoes", "hot-air balloons"], "I-40 crosses the state from east to west."],
      ["A phone designed in one country, with parts from several others, shows…", "globalization", ["isolation", "a traditional economy", "a barter system"], "Many countries make one product."],
    ],
  ),
  bankUnit({
    id: "ar-g5-people-environment",
    title: "People & the Environment",
    emoji: "🌍",
    blurb: "Adapting to and changing the land",
    parentNote:
      "How people around the world adapt to and change their environment: dams, levees, irrigation and terraces, natural disasters and the laws that follow them, deforestation and desertification, scarce water, and sustainability practices.",
    standards: ["G.4.5.1; G.4.5.2; G.3.5.3; G.4.5.5", "how people adapt to and change the environment, natural disasters and sustainability"],
    items: ENVIRONMENT,
  }),
];
