import type { Unit } from "../../types";
import { bankUnit } from "../own";

// New York's own Grade 9 Earth science and engineering units (`ny-` ids), for the Earth and Space Sciences standards no
// other New York unit covers: Earth's formation and early history and how life and Earth's systems changed each other
// (HS-ESS1-6, HS-ESS2-7), air masses and fronts (HS-ESS2-8, one of New York's additions), and engineering solutions for
// sustainability (HS-ESS3-3, HS-ESS3-4, HS-ETS1-1, HS-ETS1-2, HS-ETS1-4).

const EARLY_EARTH = bankUnit({
  id: "ny-g9-early-earth",
  title: "Earth's Early History",
  emoji: "☄️",
  blurb: "How Earth formed, and how life and Earth changed each other.",
  parentNote:
    "Practices using evidence from meteorites, moon rocks and Earth's oldest minerals to describe how Earth formed about 4.6 billion years ago, and how living things and Earth's systems changed each other, from early microbes adding oxygen to the air to plants building soil.",
  standards: [
    "HS-ESS1-6; HS-ESS2-7",
    "evidence of Earth's formation and early history, and how Earth's systems and life have changed each other",
  ],
  items: [
    ["Earth is about how old?", "4.6 billion years", ["6,000 years", "46 million years", "460 billion years"], "Billions of years."],
    ["Meteorites help date Earth because they…", "formed with the solar system and have changed little", ["fell to Earth last year", "came from the sun's core", "are made of ice"], "Leftovers from the beginning."],
    ["Most of Earth's oldest rocks are gone because of…", "plate tectonics, weathering and erosion", ["photosynthesis", "the moon", "snowfall"], "Earth recycles its surface."],
    ["The moon is covered in craters but Earth has few because Earth…", "has weathering, erosion and moving plates that erase them", ["was never hit", "has no gravity", "is made of ice"], "Earth's surface keeps changing."],
    ["Moon rocks brought back by astronauts are about…", "4.5 billion years old", ["10,000 years old", "1 million years old", "100 billion years old"], "Almost as old as Earth."],
    ["The oldest known minerals on Earth, tiny zircon crystals, are about…", "4.4 billion years old", ["4,400 years old", "44 million years old", "44 billion years old"], "Older than any whole rock found."],
    ["Earth's early atmosphere had almost no…", "oxygen", ["carbon dioxide", "water vapor", "nitrogen"], "Volcano gases filled the air."],
    ["Most of the oxygen in Earth's air was added by…", "photosynthesis, first by microbes and later by plants", ["volcanoes", "meteorites", "lightning"], "Living things made it."],
    ["Stromatolites are layered rock mounds built by…", "colonies of microbes", ["volcanoes", "glaciers", "dinosaurs"], "Some of the oldest fossils."],
    ["Banded iron formations formed when oxygen made by early microbes…", "reacted with iron dissolved in the oceans", ["froze the oceans", "formed the moon", "melted the crust"], "Rust layers on the sea floor."],
    ["Once oxygen built up, the ozone layer formed and…", "blocked harmful UV light, so life could live on land", ["stopped all rain", "cooled Earth's core", "blocked all sunlight"], "A shield in the sky."],
    ["When plants spread onto land, they changed Earth by…", "building soil and slowing erosion", ["stopping all rain", "making the oceans boil", "moving the continents"], "Roots hold soil."],
    ["Corals and shelled sea animals take carbon from seawater to build shells, which can become…", "limestone", ["granite", "basalt", "glass"], "Rock made of old shells."],
    ["Life and Earth's systems changing each other over time is called…", "coevolution", ["erosion", "condensation", "melting"], "Each shapes the other."],
    ["Plant roots crack rocks and give off acids, which…", "speed up weathering", ["stop weathering", "melt the rock", "make rock magnetic"], "Life helps break rock."],
    ["Coal formed from…", "ancient plants buried for millions of years", ["volcanic ash only", "meteorites", "sea salt"], "Swamp forests long ago."],
    ["Most scientists think the moon formed when…", "a large object collided with the young Earth", ["Earth split in half on its own", "the sun threw off a piece", "a comet froze"], "A giant impact."],
    ["Shortly after it formed, Earth's surface was mostly…", "molten rock", ["ice", "forest", "grassland"], "Very hot from impacts."],
    ["Earth's oceans formed when water vapor from volcanoes and impacts…", "cooled and condensed into rain", ["froze into rock", "turned into oxygen", "escaped into space"], "Rain for millions of years."],
    ["Moon rocks and meteorites tell us about Earth's beginning because Earth's earliest surface…", "has mostly been recycled or worn away", ["is perfectly preserved", "is made of moon rock", "never existed"], "Look elsewhere for old evidence.", true],
    ["Radiometric dating works because radioactive elements…", "decay at a steady, known rate", ["decay at random speeds", "never change", "decay only in sunlight"], "A natural clock.", true],
    ["A rock has half of its original uranium-238 left. The half-life of uranium-238 is 4.5 billion years. The rock is about…", "4.5 billion years old", ["9 billion years old", "2.25 billion years old", "45 million years old"], "One half-life has passed.", true],
    ["When oxygen rose in the air about 2.4 billion years ago, many microbes…", "that could not live with oxygen died out", ["started making volcanoes", "formed the moon", "dried up the oceans"], "Oxygen was toxic to them.", true],
    ["Over millions of years, Earth's climate warmed or cooled partly as living things…", "added or removed carbon dioxide from the air", ["changed the moon's orbit", "stopped plate motion", "changed the sun's color"], "Life affects the atmosphere.", true],
    ["As grasslands spread across continents millions of years ago, grazing animals evolved…", "teeth suited to grinding tough grass", ["no teeth", "wings for flying", "gills"], "Life responds to Earth's changes.", true],
  ],
});

const AIR_MASSES = bankUnit({
  id: "ny-g9-air-masses",
  title: "Air Masses & Fronts",
  emoji: "🌬️",
  blurb: "How moving air masses and fronts change the weather.",
  parentNote:
    "Practices how air masses get their temperature and humidity from where they form, what happens when they meet at cold, warm and stationary fronts, reading front symbols and air pressure, and explaining New York weather such as nor'easters and lake-effect snow.",
  standards: [
    "HS-ESS2-8",
    "how the movement and meeting of air masses change weather conditions",
  ],
  items: [
    ["An air mass is…", "a huge body of air with similar temperature and humidity", ["a single cloud", "a gust of wind", "a layer of the ocean"], "It can cover thousands of miles."],
    ["An air mass that forms over cold land far to the north is…", "cold and dry", ["warm and moist", "warm and dry", "cold and moist"], "Cold land, little water."],
    ["An air mass that forms over the Gulf of Mexico is…", "warm and moist", ["cold and dry", "cold and moist", "warm and dry"], "Warm water, lots of moisture."],
    ["The boundary between two air masses is a…", "front", ["ridge", "current", "plate"], "Where they meet."],
    ["After a cold front passes, temperatures usually…", "drop", ["rise sharply", "stay the same", "double"], "Colder air moves in."],
    ["Cold fronts often bring…", "short, heavy rain or thunderstorms", ["weeks of steady drizzle", "cloudless skies", "fog that lasts all summer"], "Fast lifting of warm air."],
    ["Warm fronts often bring…", "long periods of light, steady rain", ["sudden hail only", "clear skies always", "tornadoes every time"], "Warm air slides up gently."],
    ["Cold air pushes under warm air at a front because cold air is…", "denser", ["lighter", "wetter", "faster"], "Dense air sinks."],
    ["On a weather map, a line with blue triangles shows a…", "cold front", ["warm front", "high-pressure center", "stationary front"], "Blue for cold."],
    ["On a weather map, a line with red half circles shows a…", "warm front", ["cold front", "jet stream", "hurricane"], "Red for warm."],
    ["High-pressure systems usually bring…", "clear, calm weather", ["heavy storms", "tornadoes", "constant rain"], "Sinking air."],
    ["Low-pressure systems usually bring…", "clouds and precipitation", ["clear skies", "calm, dry air", "frost every time"], "Rising air."],
    ["In the Northern Hemisphere, winds around a low-pressure center turn…", "counterclockwise", ["clockwise", "straight up only", "not at all"], "Earth's spin bends the winds."],
    ["Most weather systems in New York move from…", "west to east", ["east to west", "south to north only", "north to south only"], "Carried by the westerlies."],
    ["The jet stream steers air masses because it is…", "a fast wind high in the atmosphere", ["an ocean current", "a river", "a mountain range"], "A river of air."],
    ["A barometer measures…", "air pressure", ["temperature", "wind direction", "rainfall"], "Baro means weight."],
    ["Falling air pressure often means…", "stormy weather is coming", ["clear weather is coming", "the season is changing", "an earthquake is near"], "Low pressure is on the way."],
    ["Humidity is the amount of…", "water vapor in the air", ["dust in the air", "oxygen in the air", "heat in the ground"], "Moisture in the air."],
    ["Clouds form when rising air…", "cools and its water vapor condenses", ["warms and dries", "sinks and heats up", "freezes the ground"], "Cooling makes droplets."],
    ["A front that stops moving is a…", "stationary front", ["cold front", "warm front", "high-pressure system"], "It stays in place."],
    ["A cold front passes Albany. Which change is most likely?", "Temperature falls and the wind shifts to the northwest", ["Temperature rises and fog lasts for days", "Air pressure keeps falling all week", "Humidity rises sharply"], "Cold, dry air follows.", true],
    ["The dew point is the temperature at which…", "air becomes saturated and water vapor condenses", ["water boils", "ice melts", "wind stops"], "Dew forms.", true],
    ["Thunderstorms form along a cold front because…", "warm, moist air is forced upward quickly", ["cold air rises above warm air", "the ground is too cold", "the pressure is very high"], "Quick lifting builds tall clouds.", true],
    ["A nor'easter can bury New York in snow when a coastal low-pressure system…", "pulls moist ocean air over cold land", ["blocks all moisture", "brings hot, dry desert air", "stays over the middle of the country"], "Moisture meets cold air.", true],
    ["A warm front passes, followed a day later by a cold front. Which sequence of weather is likely?", "Steady rain, then warmer air, then storms and cooling", ["Snow, then a heat wave for weeks", "No change at all", "Clear skies, then only fog"], "Follow each front in turn.", true],
    ["A cold air mass moving over the warmer Great Lakes picks up…", "moisture that can fall as lake-effect snow", ["salt that makes it hotter", "dust that stops snow", "nothing at all"], "Air masses change as they move.", true],
  ],
});

const SUSTAINABLE_DESIGN = bankUnit({
  id: "ny-g9-sustainable-design",
  title: "Engineering for Sustainability",
  emoji: "♻️",
  blurb: "Designing solutions that reduce human impact on Earth.",
  parentNote:
    "Practices how engineers tackle big challenges such as clean water and pollution: setting criteria and constraints, breaking a problem into smaller parts, using models and computer simulations to test ideas and manage resources sustainably, and refining technologies that reduce human impacts on natural systems.",
  standards: [
    "HS-ESS3-3; HS-ESS3-4; HS-ETS1-1; HS-ETS1-2; HS-ETS1-4",
    "managing resources sustainably, refining technologies that reduce human impacts, and designing solutions to large challenges with criteria, constraints and simulations",
  ],
  items: [
    ["The first step in solving a big engineering problem is to…", "define the problem with criteria and constraints", ["build the final product", "skip testing", "pick the cheapest material first"], "Know what success looks like."],
    ["Criteria are…", "what a solution must do to succeed", ["the limits on a solution", "the final product", "the cost of materials only"], "Goals."],
    ["Constraints are…", "limits such as cost, time, materials and safety", ["goals the design must reach", "the test results", "the name of the design"], "Limits."],
    ["Engineers break a complex problem into smaller parts so they can…", "solve each part and combine the solutions", ["avoid solving it", "make it harder", "skip testing"], "Divide and conquer."],
    ["A computer simulation helps engineers…", "test many designs quickly and cheaply", ["skip defining the problem", "avoid using data", "guarantee perfect results"], "Try it on a model first."],
    ["Which is a global challenge engineers work on?", "Supplying clean drinking water", ["Choosing a favorite color", "Naming a pet", "Picking a song"], "Affects billions of people."],
    ["A trade-off means…", "giving up some of one thing to gain another", ["getting everything at no cost", "refusing to choose", "making no decisions"], "You can't have it all."],
    ["Scrubbers on power plant smokestacks reduce human impact by…", "removing pollutants before they reach the air", ["making more smoke", "heating the air", "adding sulfur"], "Clean the exhaust."],
    ["Catalytic converters in cars help by…", "changing harmful exhaust gases into less harmful ones", ["making engines louder", "adding fuel", "removing the brakes"], "Chemistry in the tailpipe."],
    ["Sustainable resource use means…", "meeting today's needs without harming future generations", ["using everything up quickly", "never using resources", "using only fossil fuels"], "Think long term."],
    ["Fishing limits help fish populations by…", "letting enough fish survive to reproduce", ["catching every fish", "stopping fish from breeding", "adding more boats"], "Leave some to breed."],
    ["As a human population grows, its demand for water, food and energy…", "increases", ["decreases", "stays the same", "disappears"], "More people, more needs."],
    ["Which reduces the impact of farm runoff on rivers?", "Planting strips of plants along streams", ["Adding more fertilizer", "Removing all trees", "Paving the fields"], "Plants catch the runoff."],
    ["Green roofs on city buildings help by…", "soaking up rainwater and cooling the building", ["making more runoff", "heating the city", "adding pollution"], "Plants on the roof."],
    ["Recycling aluminum saves resources because…", "it takes much less energy than making new metal from ore", ["aluminum never runs out", "it makes the metal heavier", "mining is free"], "Melt it, don't mine it."],
    ["Engineers prioritize criteria by deciding…", "which goals matter most", ["which tools are cheapest", "which color is best", "nothing at all"], "Rank the goals."],
    ["Why do engineers test a model before building the full solution?", "To find and fix problems early", ["To skip the design step", "To make it cost more", "To avoid using data"], "Small tests first."],
    ["Which is a constraint for a new water treatment plant?", "The budget available", ["Providing clean water", "Removing germs", "Serving the whole town"], "A limit, not a goal."],
    ["A simulation shows that cutting 30% of a forest each year leads to collapse, but cutting 5% lets it regrow. This helps planners…", "set a sustainable harvest", ["cut more trees faster", "stop all research", "ignore the forest"], "Use the model's results.", true],
    ["A town compares two flood barriers. One protects more homes but harms a wetland. Choosing between them means…", "weighing trade-offs among the criteria", ["looking only at cost", "looking only at color", "ignoring the wetland"], "Several goals compete.", true],
    ["A new filter cuts car pollution by 40% but doubles the cost. Engineers might refine it by…", "finding cheaper materials that keep most of the benefit", ["removing the benefit", "doubling the pollution", "stopping all testing"], "Improve the trade-off.", true],
    ["Models of population, resource use and biodiversity show that when resource use per person rises,…", "pressure on ecosystems grows even if population stays the same", ["ecosystems always recover at once", "biodiversity always increases", "nothing changes"], "Use per person matters.", true],
    ["Why must solutions to global challenges consider social, cultural and environmental impacts?", "A solution that ignores them may fail or cause new problems", ["Only cost matters", "Impacts never matter", "People accept any solution"], "Real-world constraints.", true],
    ["A dam makes clean electricity but blocks fish from swimming upstream. A refinement that reduces its impact is…", "adding a fish ladder", ["making the dam taller", "removing the turbines", "draining the river"], "Let the fish pass.", true],
    ["Carbon capture technology is designed to…", "trap carbon dioxide before it enters the air", ["release more carbon dioxide", "make more coal", "cool the sun"], "Catch it at the source.", true],
  ],
});

export const EARTH: Unit[] = [EARLY_EARTH, AIR_MASSES, SUSTAINABLE_DESIGN];
