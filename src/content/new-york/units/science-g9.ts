import type { Unit } from "../../types";
import { SCIENCE_9 } from "../../washington/units/science-9";
import { bankUnit } from "../own";
import { copyOf, from } from "./kit";

// New York's own Grade 9 science units. Most New York 9th graders take a high school course, often Earth and Space
// Sciences or Life Science: Biology, so Grade 9 mixes the biology units New York shares with other frameworks and the
// Earth and space units written here (`ny-` ids), with examples from New York's landscapes: the Adirondacks, the
// Finger Lakes, Long Island's moraines and Niagara Falls. The ecosystems unit is a New York copy of Washington's,
// without its Pacific Northwest questions.

const ECOSYSTEMS = copyOf(
  from(SCIENCE_9, "wa-g9-ecosystems"),
  {
    id: "ny-g9-ecosystems",
    title: "Ecosystem Dynamics",
    emoji: "🌲",
    blurb: "Carrying capacity, energy pyramids and human impacts.",
    parentNote:
      "Practices carrying capacity, energy flow and the 10% rule, how ecosystems respond to disturbance, and evaluating solutions to human impacts, using New York's Adirondack lakes, Great Lakes and Hudson River as examples.",
    standards: [
      "HS-LS2-1; HS-LS2-4; HS-LS2-6; HS-LS2-7",
      "carrying capacity, energy flow, ecosystem stability and reducing human impacts on biodiversity",
    ],
  },
  [
    ["Forests growing back on old, abandoned farm fields in New York are an example of…", "succession", ["extinction", "erosion only", "photosynthesis only"], "Communities rebuild over time."],
    ["Zebra mussels in the Great Lakes threaten native species by…", "outcompeting them for food", ["adding biodiversity", "pollinating plants", "making the lakes saltier"], "Non-native competitors."],
    ["Which solution to help river herring and shad in the Hudson River's streams is backed by evidence?", "Removing old dams and restoring habitat", ["Adding more barriers", "Draining wetlands", "Paving stream banks"], "Fish need to reach spawning streams.", true],
    ["Acid rain once harmed many Adirondack lakes. Laws that cut power plant pollution helped by…", "reducing the acid in rain so lakes could recover", ["making the rain more acidic", "removing all fish", "adding salt to the lakes"], "Less pollution, less acid.", true],
  ],
);

const TECTONICS = bankUnit({
  id: "ny-g9-plate-tectonics",
  title: "Plate Tectonics",
  emoji: "🌋",
  blurb: "Earth's layers, moving plates and the age of rocks.",
  parentNote:
    "Practices modeling Earth's interior from seismic evidence, how convection in the mantle moves plates, what happens at each kind of plate boundary, and why ocean crust is young while some continental rock, like the Adirondacks', is over a billion years old.",
  standards: [
    "HS-ESS2-1; HS-ESS2-3; HS-ESS1-5",
    "Earth's layers and the movement of plates, how plate motion builds and wears down landforms, and the ages of crustal rocks",
  ],
  items: [
    ["Earth's layers from the outside in are…", "crust, mantle, outer core, inner core", ["mantle, crust, inner core, outer core", "inner core, crust, mantle, outer core", "crust, outer core, mantle, inner core"], "Start at the surface."],
    ["Which layer of Earth is liquid?", "The outer core", ["The inner core", "The crust", "The lithosphere"], "It surrounds the solid inner core."],
    ["Scientists learn about Earth's deep interior mainly by studying…", "seismic waves from earthquakes", ["holes drilled to the core", "photos from space", "smoke from volcanoes"], "Waves bend and change speed in each layer."],
    ["Tectonic plates move because of…", "heat and convection in the mantle", ["the moon's light", "ocean waves", "wind"], "Hot rock rises slowly and cool rock sinks."],
    ["At a mid-ocean ridge, plates…", "move apart and new crust forms", ["collide and build mountains", "stop moving", "sink into the core"], "A divergent boundary."],
    ["Rocks near a mid-ocean ridge are…", "younger than rocks far from it", ["older than rocks far from it", "all the same age as the continents", "made of ice"], "New crust forms at the ridge."],
    ["When an ocean plate meets a continental plate, the ocean plate usually…", "sinks beneath it", ["rises over it", "stops moving", "melts the continent"], "Ocean crust is denser. This is subduction."],
    ["The Himalayas formed where two continental plates…", "collided", ["pulled apart", "slid past each other", "sank into the mantle"], "Neither plate could sink."],
    ["At a transform boundary, plates…", "slide past each other", ["pull apart", "collide head-on", "stop moving"], "Side by side."],
    ["Most earthquakes and volcanoes happen…", "along plate boundaries", ["in the middle of plates", "only at the poles", "evenly everywhere"], "Look at a world map of quakes."],
    ["The Atlantic Ocean is slowly getting…", "wider", ["narrower", "shallower by meters each year", "much saltier each day"], "The Mid-Atlantic Ridge is spreading."],
    ["Plates move at about the speed…", "your fingernails grow", ["of a car on a highway", "of a running horse", "of a person walking"], "A few centimeters a year."],
    ["Which kind of rock forms when magma or lava cools?", "Igneous", ["Sedimentary", "Metamorphic", "Fossil"], "Fire-formed rock."],
    ["Heat and pressure deep underground change rock into…", "metamorphic rock", ["igneous rock", "sedimentary rock", "soil"], "Changed rock."],
    ["Layers of sand and mud pressed together become…", "sedimentary rock", ["igneous rock", "metamorphic rock", "lava"], "Sediments pile up and harden."],
    ["The rigid outer shell of Earth that is broken into plates is the…", "lithosphere", ["atmosphere", "outer core", "hydrosphere"], "Litho means rock."],
    ["Mountains wear down over millions of years mainly because of…", "weathering and erosion", ["photosynthesis", "magnetism", "the moon's light"], "Water, ice and wind."],
    ["A hot spot under a moving plate makes…", "a chain of volcanoes", ["a deep trench", "a mid-ocean ridge", "a glacier"], "The plate slides over a fixed plume."],
    ["S-waves cannot pass through the outer core. This shows the outer core is…", "liquid", ["solid", "made of granite", "empty"], "S-waves only travel through solids.", true],
    ["Stripes of reversed magnetism on the sea floor are evidence of…", "sea-floor spreading", ["meteor impacts", "ocean tides", "warming oceans"], "Matching stripes on both sides of a ridge.", true],
    ["Matching fossils and rock types on Africa and South America suggest that…", "the continents were once joined", ["the continents have never moved", "the Atlantic is older than Earth", "fossils formed at sea"], "Evidence for continental drift.", true],
    ["Ocean crust is rarely older than about 200 million years because…", "it forms at ridges and is destroyed at subduction zones", ["it never forms", "it floats higher than continents", "it is made of ice"], "Ocean crust is recycled.", true],
    ["Some continental rock is about 4 billion years old because continental crust…", "is too light to sink back into the mantle", ["forms at mid-ocean ridges", "is recycled every million years", "is made in the core"], "Less dense crust stays on top.", true],
    ["Rock in New York's Adirondack Mountains is about…", "1 billion years old", ["100 years old", "10,000 years old", "1 million years old"], "Some of the oldest rock in the state.", true],
    ["Earth's interior stays hot partly because of…", "radioactive decay of elements", ["sunlight soaking in", "friction from wind", "the moon's glow"], "Unstable atoms release heat.", true],
    ["Scientists date igneous rocks most accurately with…", "radioactive isotopes", ["the color of the rock", "how heavy the rock is", "the shape of the crystals"], "Radiometric dating.", true],
  ],
});

const SKY = bankUnit({
  id: "ny-g9-moon-tides-seasons",
  title: "Moon, Tides & Seasons",
  emoji: "🌗",
  blurb: "Cycles in the sky: phases, eclipses, tides and seasons.",
  parentNote:
    "Practices explaining the repeating cycles of moon phases, eclipses, tides and seasons, and how gravity and Kepler's laws describe the orbits of the moon, planets and satellites.",
  standards: [
    "HS-ESS1-7; HS-ESS1-4",
    "the cycles of moon phases, eclipses, tides and seasons, and the motion of orbiting objects",
  ],
  items: [
    ["Earth has seasons because…", "its axis is tilted", ["its distance from the sun changes a lot", "the sun gets hotter in summer", "the moon blocks the sun in winter"], "Tilt changes how directly sunlight hits."],
    ["It is summer in the Northern Hemisphere when…", "the North Pole tilts toward the sun", ["Earth is closest to the sun", "the sun grows bigger", "the moon is full"], "Tilt toward the sun."],
    ["The moon's phases are caused by…", "how much of its lit half we see from Earth", ["Earth's shadow on the moon", "clouds covering it", "the moon changing shape"], "Half the moon is always lit."],
    ["A full cycle of moon phases takes about…", "29.5 days", ["24 hours", "7 days", "365 days"], "About a month."],
    ["A lunar eclipse happens when…", "Earth passes between the sun and the moon", ["the moon passes between the sun and Earth", "the sun passes between Earth and the moon", "clouds cover the moon"], "Earth's shadow falls on the moon."],
    ["A solar eclipse can only happen during a…", "new moon", ["full moon", "first quarter moon", "waning gibbous moon"], "The moon must be between Earth and the sun."],
    ["A lunar eclipse can only happen during a…", "full moon", ["new moon", "first quarter moon", "waxing crescent moon"], "Earth must be between the sun and the moon."],
    ["Ocean tides are caused mainly by…", "the moon's gravity", ["wind", "earthquakes", "the sun's light"], "The moon pulls on the oceans."],
    ["Most coastal places have about how many high tides each day?", "Two", ["One each month", "Ten", "None"], "About every 12 hours."],
    ["Spring tides, with the biggest tidal range, happen when…", "the sun, moon and Earth line up", ["the moon is at first quarter", "it is springtime", "the moon is farthest away"], "Their pulls add together."],
    ["On the summer solstice in New York, the noon sun is…", "at its highest point of the year", ["at its lowest point of the year", "below the horizon", "in the northern sky"], "The longest day of the year."],
    ["On an equinox, day and night are…", "about equal in length", ["24 hours of daylight everywhere", "dark everywhere", "twice as long as usual"], "Equi means equal."],
    ["A year is the time it takes Earth to…", "orbit the sun once", ["spin once on its axis", "orbit the moon", "go through one moon phase"], "One trip around the sun."],
    ["A day is the time it takes Earth to…", "spin once on its axis", ["orbit the sun", "go around the moon", "change seasons"], "One rotation."],
    ["When it is summer in New York, in Australia it is…", "winter", ["summer", "spring", "fall"], "Opposite hemispheres."],
    ["Day length in New York changes through the year because of…", "Earth's tilt as it orbits the sun", ["the moon's phases", "the tides", "the sun moving closer"], "Tilt plus orbit."],
    ["When the moon is waxing, the lit part we see each night…", "grows", ["shrinks", "stays the same", "disappears"], "Waxing means growing."],
    ["Gravity keeps the moon in orbit by…", "pulling it toward Earth as it moves forward", ["pushing it away from Earth", "stopping its motion", "heating it"], "Falling around Earth."],
    ["Neap tides, with the smallest tidal range, happen when the moon is at…", "first or third quarter", ["new moon", "full moon", "a lunar eclipse"], "The sun and moon pull at right angles.", true],
    ["We don't get an eclipse every month because…", "the moon's orbit is tilted compared with Earth's", ["the moon stops moving", "clouds hide them", "the sun turns off"], "The three rarely line up exactly.", true],
    ["The same side of the moon always faces Earth because…", "the moon spins once each time it orbits Earth", ["the moon does not spin", "Earth does not spin", "the far side is too dark to see"], "Its spin matches its orbit.", true],
    ["Kepler's laws say planets move in…", "ellipses, faster when closer to the sun", ["perfect circles at one speed", "straight lines", "squares"], "Orbits are stretched circles.", true],
    ["A satellite in a lower orbit travels…", "faster than one in a higher orbit", ["slower than one in a higher orbit", "at the same speed as all satellites", "backward"], "Stronger gravity closer in.", true],
    ["The moon rises about how much later each day?", "About 50 minutes", ["Exactly 12 hours", "No later at all", "About 5 hours"], "It moves along its orbit each day.", true],
    ["Earth is closest to the sun in early…", "January", ["July", "June", "August"], "So distance does not cause seasons.", true],
    ["Besides the side facing the moon, high tide also happens on…", "the side of Earth facing away from the moon", ["no other side", "only the poles", "only the equator"], "Two bulges of water.", true],
  ],
});

const STARS = bankUnit({
  id: "ny-g9-stars-universe",
  title: "Stars & the Universe",
  emoji: "✨",
  blurb: "How stars shine, live and die, and how the universe began.",
  parentNote:
    "Practices how fusion in the sun's core makes the energy that reaches Earth, the life cycles of stars and the elements they make, and the evidence for the Big Bang: galaxies moving apart, leftover microwave radiation and the mix of elements.",
  standards: [
    "HS-ESS1-1; HS-ESS1-2; HS-ESS1-3",
    "nuclear fusion in the sun, the life cycles of stars and the elements they make, and evidence for the Big Bang",
  ],
  items: [
    ["The sun makes its energy by…", "nuclear fusion of hydrogen into helium", ["burning coal", "splitting uranium atoms", "burning oxygen"], "Small nuclei join together."],
    ["Most stars spend most of their lives…", "fusing hydrogen in their cores", ["as black holes", "as red giants", "as nebulas"], "The main sequence."],
    ["Stars are born in…", "clouds of gas and dust called nebulas", ["black holes", "comets", "the oceans of planets"], "Gravity pulls the cloud together."],
    ["A star's color tells us its…", "surface temperature", ["number of planets", "distance from Earth", "name"], "Blue is hot; red is cooler."],
    ["Which star is hottest?", "A blue star", ["A red star", "An orange star", "A yellow star"], "Blue is hottest."],
    ["When the sun runs low on hydrogen, it will become a…", "red giant", ["black hole", "neutron star", "blue supergiant"], "It will swell up."],
    ["A very massive star ends its life in a…", "supernova", ["quiet fade", "red dwarf", "comet"], "A huge explosion."],
    ["The Big Bang theory says the universe…", "began very hot and dense and has been expanding", ["has always been the same size", "is shrinking", "is a flat disk"], "Everything is moving apart."],
    ["Light from distant galaxies is shifted toward red. This shows they are…", "moving away from us", ["moving toward us", "standing still", "getting hotter"], "Redshift."],
    ["The cosmic microwave background is…", "leftover radiation from the early universe", ["light from the moon", "radio signals from phones", "heat from Earth's core"], "An echo of the Big Bang."],
    ["Our solar system is about how old?", "4.6 billion years", ["13.8 billion years", "10,000 years", "1 billion years"], "Younger than the universe."],
    ["A light-year is a measure of…", "distance", ["time", "brightness", "mass"], "How far light travels in a year."],
    ["The Milky Way is a…", "spiral galaxy", ["single star", "planet", "nebula"], "Billions of stars in a spiral."],
    ["The sun is a…", "medium-sized star", ["planet", "giant blue star", "black hole"], "An ordinary yellow star."],
    ["Energy from the sun reaches Earth as…", "light and other radiation", ["sound waves", "wind", "flowing water"], "It crosses empty space."],
    ["Sunspots are…", "cooler, darker areas on the sun's surface", ["holes in the sun", "planets in front of the sun", "moons of the sun"], "Darker because they are cooler."],
    ["A white dwarf is…", "the small, hot core left after a star like the sun dies", ["a newborn star", "a planet", "a cloud of gas"], "What remains of the sun someday."],
    ["After the sun, the nearest star to Earth is about…", "4 light-years away", ["4 miles away", "4 hours away by car", "400 feet away"], "Proxima Centauri."],
    ["Which is largest?", "The universe", ["A galaxy", "The solar system", "A star"], "It holds everything."],
    ["Elements heavier than iron, like gold, were made mostly in…", "supernovas and collisions of dead stars", ["the Big Bang", "Earth's core", "comets"], "Extreme events make heavy elements.", true],
    ["The universe is about how old?", "13.8 billion years", ["4.6 billion years", "1 million years", "100 million years"], "Older than the solar system.", true],
    ["Hydrogen and helium, the most common elements, were made mostly…", "in the Big Bang", ["on Earth", "in comets", "in volcanoes"], "The first elements.", true],
    ["In the sun's core, fusion turns a little mass into…", "a lot of energy", ["water", "rock", "oxygen"], "E = mc².", true],
    ["Spectra of starlight let scientists find a star's…", "chemical makeup", ["exact number of planets", "age in days", "name"], "Each element leaves its own lines.", true],
    ["Solar flares can affect Earth by…", "disturbing satellites and radio signals", ["changing the seasons", "causing earthquakes", "making tides"], "Bursts of charged particles.", true],
    ["Distant galaxies farther away are moving away faster. This supports…", "an expanding universe", ["a shrinking universe", "a universe that never changes", "galaxies orbiting Earth"], "Hubble's discovery.", true],
  ],
});

const CLIMATE = bankUnit({
  id: "ny-g9-climate-systems",
  title: "Climate & Earth's Systems",
  emoji: "🌡️",
  blurb: "Energy, feedbacks, the carbon cycle and climate change.",
  parentNote:
    "Practices how energy flow and feedbacks among Earth's systems change climate, how carbon cycles through air, oceans, rocks and life, the evidence from ice cores and glaciers, and how people can reduce the causes of climate change.",
  standards: [
    "HS-ESS2-2; HS-ESS2-4; HS-ESS2-6; HS-ESS3-5",
    "feedbacks among Earth's systems, what changes climate, the carbon cycle, and evidence of climate change",
  ],
  items: [
    ["Climate is…", "the average weather of a place over many years", ["the weather today", "one big storm", "the temperature at noon"], "Long-term patterns."],
    ["Weather is…", "the conditions of the air at one time and place", ["the average over 30 years", "the same as climate", "the length of a season"], "Short-term conditions."],
    ["The greenhouse effect happens because some gases…", "trap heat given off by Earth", ["block all sunlight", "make oxygen", "cool the planet"], "Like a blanket."],
    ["Which is a greenhouse gas?", "Carbon dioxide", ["Nitrogen", "Argon", "Helium"], "It is released when fuels burn."],
    ["Burning fossil fuels adds which gas to the air?", "Carbon dioxide", ["Oxygen", "Helium", "Neon"], "Carbon plus oxygen."],
    ["Plants remove carbon dioxide from the air through…", "photosynthesis", ["respiration", "combustion", "evaporation"], "They build sugar from it."],
    ["Ice cores from glaciers help scientists learn about…", "past temperatures and air", ["future earthquakes", "ocean tides", "the colors of stars"], "Air bubbles trapped in ice."],
    ["Water heats up slowly, so oceans…", "warm up and cool down slowly", ["change temperature quickly", "never change temperature", "boil in summer"], "High heat capacity."],
    ["Sea level rises when land ice melts and when…", "ocean water expands as it warms", ["more fish are born", "sand washes onto beaches", "the moon moves away"], "Warm water takes up more space."],
    ["Over the past century, Earth's average temperature has…", "risen", ["fallen", "stayed exactly the same", "dropped below freezing"], "The planet is warming."],
    ["Which helps reduce the causes of climate change?", "Using more renewable energy", ["Burning more coal", "Cutting down forests", "Wasting electricity"], "Less carbon dioxide."],
    ["The carbon cycle moves carbon among…", "air, oceans, living things and rocks", ["only rocks", "only the air", "only the sun"], "Carbon is always moving."],
    ["Scratches on bedrock across New York show that…", "thick ice sheets once covered the state", ["the state was once a desert", "volcanoes erupted there recently", "the ocean was boiling"], "Glaciers drag rocks across rock."],
    ["Earth's energy comes almost entirely from…", "the sun", ["the moon", "ocean tides", "lightning"], "Sunlight drives weather and climate."],
    ["Ocean currents affect climate by…", "carrying heat from warm places to cool places", ["causing earthquakes", "stopping all rain", "changing the tides"], "Moving water moves heat."],
    ["Cutting down forests adds to climate change because…", "fewer trees take in carbon dioxide", ["trees only release carbon dioxide", "forests block the wind", "trees cool the sun"], "Trees store carbon."],
    ["Which is evidence of a warming climate?", "Glaciers shrinking around the world", ["Lakes freezing for more days each year", "Colder summers everywhere", "Glaciers growing everywhere"], "Ice is melting."],
    ["Coastal wetlands in New York help during storms because they…", "absorb flood water and soften waves", ["make waves bigger", "attract hurricanes", "raise sea level"], "Nature's sponge."],
    ["Melting Arctic sea ice exposes dark water that absorbs more sunlight, which melts more ice. This is a…", "positive feedback", ["negative feedback", "balanced cycle", "closed loop with no change"], "The change makes itself bigger.", true],
    ["Slow changes in Earth's orbit and tilt over tens of thousands of years helped cause…", "ice ages", ["daily weather", "tides", "earthquakes"], "Milankovitch cycles.", true],
    ["Large volcanic eruptions can cool Earth for a year or two because…", "ash and gases block some sunlight", ["lava heats the oceans", "they stop the wind", "they add fresh water"], "Particles high in the air.", true],
    ["The ocean absorbs carbon dioxide, which makes seawater more…", "acidic", ["salty", "frozen", "basic"], "Ocean acidification.", true],
    ["Climate models help scientists…", "project how climate may change in the future", ["stop storms", "measure earthquakes", "count stars"], "Computer simulations.", true],
    ["Snow and ice reflect sunlight. When they melt, Earth's surface…", "absorbs more energy", ["reflects more energy", "stops absorbing energy", "cools faster"], "Darker surfaces absorb more.", true],
    ["Rock weathering and burial of shells slowly remove carbon dioxide from the air over…", "millions of years", ["a single day", "one season", "one hour"], "The slow carbon cycle.", true],
    ["Air bubbles in ice cores show that carbon dioxide and temperature over the last 800,000 years…", "rose and fell together", ["never changed", "had no connection", "only rose"], "They track each other.", true],
  ],
});

const LANDSCAPES = bankUnit({
  id: "ny-g9-water-landscapes",
  title: "Water, Ice & Landscapes",
  emoji: "🏞️",
  blurb: "How water and glaciers shape the land, and why it matters to people.",
  parentNote:
    "Practices how water's properties drive weathering, erosion and deposition, how glaciers shaped New York's valleys, lakes and Long Island, and how landforms, water and hazards shape where people live and work.",
  standards: [
    "HS-ESS2-5; HS-ESS3-1",
    "how water's properties shape Earth's surface, and how resources and natural hazards influence where people live",
  ],
  items: [
    ["Water expands when it freezes, so water in rock cracks…", "pries the rock apart", ["glues the rock together", "melts the rock", "turns the rock into sand at once"], "Frost wedging."],
    ["Frost wedging is most common where temperatures…", "go above and below freezing often", ["are always hot", "are always far below freezing", "never change"], "Freeze, thaw, repeat."],
    ["Howe Caverns in New York formed when water slowly dissolved…", "limestone", ["granite", "ice", "glass"], "Slightly acidic water dissolves it."],
    ["A stream can carry more and bigger sediment when its…", "speed increases", ["speed decreases", "water freezes", "color changes"], "Faster water has more energy."],
    ["A U-shaped valley was most likely carved by…", "a glacier", ["a river alone", "wind", "an earthquake"], "Ice scrapes wide, round valleys."],
    ["A V-shaped valley was most likely carved by…", "a river", ["a glacier", "wind", "a volcano"], "Water cuts down narrowly."],
    ["The hills along Long Island are moraines, which are…", "ridges of rock and sediment left by glaciers", ["old volcanoes", "coral reefs", "desert sand dunes"], "Where the ice sheet stopped."],
    ["Most of Earth's fresh water is in…", "ice sheets and glaciers", ["rivers", "lakes", "the air"], "Frozen water."],
    ["Groundwater is stored in…", "spaces between particles of rock and soil", ["giant underground oceans", "clouds", "the mantle"], "Pores and cracks."],
    ["Rain soaks into the ground best when soil is…", "loose and not frozen", ["paved over", "frozen solid", "packed hard"], "Water needs space to enter."],
    ["Paving over land usually increases…", "runoff and flooding", ["groundwater", "rain soaking in", "forest growth"], "Water can't soak in."],
    ["Flat land beside rivers is good for farms and towns, but it risks…", "flooding", ["volcanic eruptions", "glaciers", "sand storms"], "It is called a floodplain."],
    ["Chemical weathering happens fastest where it is…", "warm and wet", ["cold and dry", "airless", "frozen all year"], "Heat and water speed up reactions."],
    ["Salt spread on New York roads in winter works because salt…", "lowers the freezing point of water", ["raises the freezing point of water", "heats the road like a fire", "absorbs all sunlight"], "Salty water freezes at a lower temperature."],
    ["Water is called the universal solvent because it…", "dissolves many substances", ["dissolves nothing", "is always frozen", "is the heaviest liquid"], "Many things dissolve in water."],
    ["A landslide is driven mainly by…", "gravity", ["magnetism", "sunlight", "the moon's light"], "Things move downhill."],
    ["Ice wedging and roots cracking rocks are examples of…", "physical weathering", ["chemical weathering", "deposition", "melting"], "The rock breaks but does not change chemically."],
    ["Smooth, rounded pebbles in a stream got their shape from…", "tumbling in moving water", ["being cut by people", "volcanic heat", "freezing"], "Abrasion."],
    ["Why are many cities built along coasts and rivers?", "For water, transport and trade", ["To stay away from water", "Because rivers stop storms", "Because coasts never flood"], "Water is a resource."],
    ["As a stream slows down entering a lake, it drops…", "its largest sediments first", ["its smallest sediments first", "no sediment at all", "only salt"], "Heavy particles settle first.", true],
    ["Sediment left directly by a glacier is usually…", "unsorted, with many sizes mixed", ["sorted into neat layers by size", "only fine clay", "only large boulders"], "Ice drops everything at once.", true],
    ["Niagara Falls has moved upstream over thousands of years because…", "water erodes soft rock beneath a hard top layer", ["the river flows uphill", "people moved it", "earthquakes push it"], "The cap rock breaks off.", true],
    ["Kettle lakes formed where…", "blocks of glacier ice melted in buried sediment", ["volcanoes erupted", "meteors hit", "beavers built dams"], "Holes left by melted ice.", true],
    ["Which resource did glaciers leave in large amounts across New York?", "Sand and gravel", ["Gold", "Oil", "Diamonds"], "Used to build roads.", true],
    ["Fertile soil left by glaciers and rivers drew early farms to valleys like the…", "Mohawk and Genesee valleys", ["middle of the Atlantic Ocean", "tops of the Adirondack peaks", "Arctic ice sheet"], "Flat land with good soil.", true],
    ["Water has a high heat capacity, so large lakes like Lake Ontario…", "keep nearby land milder in fall", ["make nearby summers much hotter", "freeze solid every October", "have no effect on nearby land"], "They release stored heat slowly.", true],
  ],
});

export const UNITS: Unit[] = [ECOSYSTEMS, TECTONICS, SKY, STARS, CLIMATE, LANDSCAPES];
