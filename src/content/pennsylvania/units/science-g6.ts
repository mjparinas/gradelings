import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";
import { UNITS as NEW_YORK_6 } from "../../new-york/units/science-g6";
import { UNITS as NEW_YORK_7 } from "../../new-york/units/science-g7";

// Pennsylvania's own Grade 6 science units (`pa-` ids), for the STEELS environment standards no shared unit practises:
// how watersheds and wetlands work as systems and how to describe a local environment from data (3.4.6-8.C, E),
// Pennsylvania's environmental issues (3.4.6-8.D, H), and why Earth's resources, such as Pennsylvania's coal and gas, are
// spread unevenly (3.3.6-8.K, N; 3.4.6-8.B).

const WATERSHEDS_AND_WETLANDS: Q[] = [
  ["A watershed is…", "an area of land where all the water drains to the same stream, river or lake", ["a building that stores water", "the top of a mountain", "a kind of cloud"], "Divides between watersheds follow ridges."],
  ["What separates one watershed from the next?", "a ridge or high ground called a divide", ["a road", "a cloud", "a bridge"], "Water runs downhill on each side of a divide."],
  ["Water that soaks into the ground and moves slowly underground is…", "groundwater", ["runoff", "vapor", "snow"], "It fills spaces in soil and rock."],
  ["Water that flows over the land to a stream is…", "runoff", ["groundwater", "vapor", "ice"], "Surface flow."],
  ["Which surface makes the most runoff in a rainstorm?", "a paved parking lot", ["a forest floor", "a meadow", "a wetland"], "Pavement lets little water soak in."],
  ["Forests help a watershed by…", "slowing runoff and letting water soak in", ["sending all water downhill at once", "making rain stop", "removing soil"], "Roots and leaf litter soak up water."],
  ["A wetland is a place where…", "soil is wet or covered with water for much of the year", ["the ground is always dry", "only cactuses grow", "only ice forms"], "Marshes and swamps are wetlands."],
  ["One job of a wetland is to…", "slow floodwater and filter pollution", ["cause floods", "add pollution", "dry up streams"], "Wetlands act like sponges and filters."],
  ["Wetlands are important to wildlife because they…", "provide food and shelter for many species", ["are always empty", "have no plants", "are too salty for life"], "Many animals depend on wetlands."],
  ["The Susquehanna River's watershed drains much of Pennsylvania and flows to…", "Chesapeake Bay", ["Lake Erie", "the Gulf of Mexico", "Delaware Bay"], "Its water ends up in the bay."],
  ["Rain that falls near Pittsburgh and flows into the Ohio River eventually reaches the…", "Mississippi River and the Gulf of Mexico", ["Chesapeake Bay", "Lake Ontario", "Hudson Bay"], "The Ohio joins the Mississippi."],
  ["Rain that falls in the Delaware River watershed flows toward…", "Delaware Bay and the Atlantic Ocean", ["the Gulf of Mexico", "Lake Erie", "Chesapeake Bay"], "It flows south to the sea."],
  ["Lake Erie receives water from streams in a small part of…", "northwestern Pennsylvania", ["southeastern Pennsylvania", "the Pocono Mountains", "Philadelphia"], "The Lake Erie watershed is in the northwest."],
  ["A drop of oil spills in a parking lot in the Susquehanna watershed. Rain washes it into a storm drain. It may reach…", "a stream that flows to the Susquehanna", ["the Moon", "a mountain top", "a tree top"], "Storm drains empty into waterways."],
  ["A stream's water quality can be checked by measuring…", "temperature, clarity and dissolved oxygen", ["its color on a map", "its name", "the size of its sign"], "These are standard measures."],
  ["Trout need cool water with a lot of dissolved oxygen. Warm water holds…", "less dissolved oxygen", ["more dissolved oxygen", "no water", "more trout"], "Cold water holds more gas.", true],
  ["Small animals such as mayfly larvae are found in clean streams. Finding many kinds suggests the stream is…", "healthy", ["very polluted", "dry", "frozen"], "Sensitive species indicate good water.", true],
  ["Removing streamside trees makes a stream warmer because the water has…", "less shade", ["more shade", "more ice", "no sun"], "Shade cools water.", true],
  ["A model of a watershed uses a tray, clay hills and a spray bottle. What does the spray represent?", "rain", ["the Sun", "wind only", "soil"], "Models show how water moves.", true],
  ["In your model, a bit of food coloring placed on a hill shows how pollution moves. It flows…", "downhill with the water into the stream", ["uphill", "straight up", "nowhere"], "Pollution travels with runoff.", true],
  ["Why can a pollution problem in a small stream affect a large river?", "streams flow into the river", ["streams never join rivers", "pollution disappears", "rivers flow uphill"], "A watershed is a connected system.", true],
  ["A group collects data on stream temperature at the same spot every month. Which display shows change over time?", "a line graph", ["a pie chart of colors", "a map of the sky", "a bar of one value"], "Line graphs show trends.", true],
  ["Why do people build rain gardens near parking lots?", "to soak up runoff and filter pollution", ["to make more runoff", "to dry the soil", "to hide the pavement"], "Rain gardens slow water.", true],
  ["A river flows through a wetland before it reaches a town. How might the wetland affect the town's flood risk?", "it can lower flooding by storing water", ["it raises flooding", "it has no effect", "it makes floods bigger"], "Wetlands store floodwater.", true],
  ["To describe a local environment, a student should collect…", "data such as measurements and counts, and then look for patterns", ["only guesses", "only stories", "only opinions"], "Use data to describe it.", true],
  ["Which pair includes something living and something nonliving in a stream?", "a trout and a rock", ["a trout and a frog", "a rock and a pebble", "a leaf and a tree"], "Living and nonliving parts form a system.", true],
];

const PENNS_ENVIRONMENT: Q[] = [
  ["Acid mine drainage is…", "water polluted by minerals from abandoned mines", ["rain made of soda", "a kind of snow", "water from a clean spring"], "Old coal mines can send acidic water into streams."],
  ["Acid mine drainage often turns a stream bed…", "orange or yellow-brown", ["bright blue", "pink", "pure white"], "Iron in the water settles on rocks."],
  ["Acid mine drainage is a problem for streams in Pennsylvania because many streams run past…", "old coal mining areas", ["deserts", "oceans", "glaciers"], "Coal mining left a legacy."],
  ["Stormwater runoff can carry fertilizer from lawns and fields into streams. This can…", "cause too many algae to grow", ["clean the water", "cool the water", "stop the algae"], "Extra nutrients fuel algae growth."],
  ["The spotted lanternfly was first found in the United States in Pennsylvania in 2014. It is…", "an invasive insect that harms plants", ["a native songbird", "a helpful pollinator", "a fish"], "Invasive species come from other places."],
  ["An invasive species is one that…", "is not native and causes harm where it spreads", ["is native and rare", "is always helpful", "is extinct"], "Invasives spread and outcompete native species."],
  ["The hemlock woolly adelgid is a tiny insect that attacks…", "eastern hemlock trees", ["oak leaves only", "trout", "corn"], "It threatens Pennsylvania's state tree."],
  ["A large number of white-tailed deer in a forest can…", "eat so many young plants that new trees cannot grow", ["help all young trees", "plant seeds", "clean streams"], "Browsing changes forests."],
  ["White-nose syndrome has harmed Pennsylvania's…", "bats", ["trout", "oaks", "ferns"], "A fungus affects hibernating bats."],
  ["Which of these is a Pennsylvania environmental issue?", "stormwater and polluted runoff", ["a glacier melting in the Poconos in July", "volcanoes in the Alleghenies", "sandstorms in the desert"], "Local issues affect local systems."],
  ["How does a forest fire or clear-cutting on a steep slope affect nearby streams?", "soil can wash in and make the water muddy", ["the streams get colder", "the streams flow uphill", "nothing changes"], "Bare soil erodes."],
  ["A good way to reduce erosion on a slope is to…", "plant trees and ground cover", ["remove all plants", "pave the slope", "pour water on it"], "Roots hold soil."],
  ["Which action helps protect the Chesapeake Bay from far away in Pennsylvania?", "keeping fertilizer and pollution out of streams", ["dumping trash in a river", "removing streamside trees", "paving all fields"], "Pennsylvania's rivers flow to the bay."],
  ["Planting trees along a stream is called a…", "riparian buffer", ["rain barrel", "landfill", "compost pile"], "Riparian means along a stream bank."],
  ["A rain barrel collects water from a roof. It can…", "reduce runoff and give water for gardens", ["increase runoff", "make pollution", "dry the garden"], "Collected water can be reused."],
  ["Composting yard waste keeps it out of landfills and…", "makes soil for gardens", ["makes plastic", "adds metal", "makes sand"], "Compost enriches soil.", true],
  ["People in a neighborhood want to design a project to improve a local stream. What should they do first?", "gather data about the problem", ["start digging at random", "ignore it", "choose a color"], "Know the problem first.", true],
  ["Which student action shows environmental stewardship?", "joining a stream cleanup and planting native plants", ["leaving litter at the park", "pouring oil down a drain", "ignoring a problem"], "Stewards care for the environment.", true],
  ["Why do invasive species spread quickly?", "they may have no natural enemies in their new home", ["they are slow", "they cannot reproduce", "they need no food"], "Natural enemies keep populations in check.", true],
  ["Why should people not move firewood long distances?", "it can carry insects that harm trees", ["wood is too heavy", "wood becomes plastic", "it makes smoke"], "Pests travel in wood.", true],
  ["How do environmental problems in Pennsylvania affect people as well as nature?", "they can change water quality, jobs and health", ["they never reach people", "they only affect the Moon", "they make stars brighter"], "Human and natural systems are linked.", true],
  ["A town shrinks a lawn and adds native plants beside a stream. This reduces runoff and…", "gives habitat to pollinators and birds", ["adds more mowing", "removes food for animals", "dries up the stream"], "Native plants support wildlife.", true],
  ["Which is a good source for data on a local stream?", "measurements taken with a thermometer and water test kit", ["a rumor", "a cartoon", "a guess"], "Data come from careful measurement.", true],
  ["Why are healthy forests important to a community's water?", "forests filter rain and protect streams", ["forests make all rain stop", "forests make water muddy", "forests have no effect on water"], "Forested watersheds give cleaner water.", true],
  ["Which solution to litter in a park gives the most lasting benefit?", "trash and recycling bins plus education", ["a one-time cleanup only", "ignoring it", "burning it"], "Combine action and prevention.", true],
];

const EARTH_RESOURCES: Q[] = [
  ["Coal formed from plants that lived in swampy forests long ago and were…", "buried and squeezed over millions of years", ["melted in a day", "frozen in ice", "washed to sea"], "Heat and pressure change buried plants."],
  ["Pennsylvania has a lot of coal because it was a place with…", "swampy forests about 300 million years ago", ["glaciers in a desert", "a huge ocean only", "a volcano chain"], "Ancient swamp plants became coal."],
  ["Natural gas in the Marcellus Shale is trapped in…", "tiny spaces in a layer of shale rock", ["a huge underground lake", "a cave full of ice", "a layer of salt only"], "Gas is held in the rock."],
  ["Resources like coal and gas are found where certain rocks formed long ago. So they are…", "spread unevenly around Earth", ["spread evenly everywhere", "found nowhere", "found only on the Moon"], "Geoscience processes put them in certain places."],
  ["The anthracite coal region is in northeastern Pennsylvania, not in the south. This shows…", "resources are found only where the rock and its history allow", ["coal is everywhere", "coal falls from clouds", "coal is made by people"], "Geology decides where."],
  ["Limestone is found where…", "ancient seas left shells and sediment", ["volcanoes erupted lava recently", "glaciers melted last week", "winds blew sand"], "Limestone is sedimentary rock."],
  ["Groundwater is stored in…", "spaces in soil and rock called aquifers", ["clouds", "open air", "tree trunks"], "Aquifers hold water."],
  ["Wells reach down to…", "groundwater", ["magma", "coal seams", "ice"], "Wells bring up groundwater."],
  ["Which of these is a nonrenewable resource?", "coal", ["wind", "sunlight", "flowing water"], "It takes millions of years to form."],
  ["Which is a renewable resource?", "wind", ["coal", "oil", "natural gas"], "The wind keeps blowing."],
  ["Which source of energy would be limited by where the wind blows hardest?", "wind power", ["coal power", "gas power", "oil power"], "Location matters."],
  ["Drilling a gas well in shale usually involves pumping a mixture of water, sand and chemicals underground. People must…", "take care to protect groundwater and streams", ["ignore leaks", "dump the waste in rivers", "hide the problem"], "Resource use has risks.", true],
  ["A larger population that uses more energy per person…", "uses up resources faster", ["uses fewer resources", "needs no energy", "stops all mining"], "More use means faster use.", true],
  ["If a community uses a resource faster than it forms, the resource will…", "run out", ["grow back faster", "get bigger", "stay the same"], "Nonrenewable resources are limited.", true],
  ["Why do some countries import oil even though they use a lot of it?", "oil is not found everywhere", ["oil is free", "oil falls from the sky", "oil is made by cars"], "Resources are unevenly spread.", true],
  ["Mining and drilling can change the land. People who run mines in Pennsylvania are required to…", "restore the land afterward", ["leave it bare", "dump trash on it", "build a lake of acid"], "Reclamation repairs the site.", true],
  ["Which statement best explains why coal is mostly in some regions and not others?", "ancient swamps and later burial happened only in some places", ["coal was dropped by clouds", "people planted coal", "coal is made on the surface"], "Past geologic processes decide.", true],
  ["How do people in the community decide how to use a resource such as a forest?", "they weigh the needs of people and the environment", ["by flipping a coin", "they ignore the facts", "they let nature stop"], "Societies manage resources differently.", true],
  ["A society that values clean rivers might pass a law that…", "limits what factories can release into water", ["bans all water", "removes the rivers", "makes pollution legal"], "Laws reflect values.", true],
  ["Different societies manage forests differently. One cuts and replants; another protects wild areas. This shows…", "different cultures and economies use resources differently", ["forests are the same everywhere", "nobody uses forests", "forests are not resources"], "Management differs.", true],
  ["A map shows where aquifers are. Why is this useful?", "it helps plan where wells can reach water", ["it shows weather", "it shows the time", "it shows holidays"], "Maps of resources guide decisions.", true],
  ["Why can mining coal change nearby streams?", "water that touches exposed rock can become acidic", ["coal makes rain", "streams like coal", "coal cleans water"], "Exposed minerals react with air and water.", true],
  ["Which choice reduces how fast we use up fossil fuels?", "use energy more efficiently", ["use more energy", "waste heat", "leave lights on"], "Efficiency stretches resources.", true],
  ["Resources like iron ore and limestone are important for making…", "steel and cement", ["milk and eggs", "wool and cotton", "paper and ink"], "Industry needs them.", true],
  ["Pennsylvania's history of making steel depended on nearby…", "coal and iron ore", ["bananas", "sea salt", "palm oil"], "Industries grow near resources.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "pa-g6-watersheds-and-wetlands",
    title: "Watersheds & Wetlands",
    emoji: "💧",
    blurb: "How rain moves through a watershed, and what wetlands do.",
    parentNote:
      "Practices how watersheds and wetlands work as systems (divides, runoff, groundwater, flood control, filtering), where Pennsylvania's rivers flow (the Susquehanna, Delaware, Ohio and Lake Erie watersheds), and describing a local stream from measurements.",
    standards: ["3.4.6-8.C; 3.4.6-8.E", "modeling how watersheds and wetlands function as systems, and collecting, analyzing and interpreting environmental data to describe a local environment"],
    items: WATERSHEDS_AND_WETLANDS,
  }),
  bankUnit({
    id: "pa-g6-penns-environment",
    title: "Pennsylvania's Environment",
    emoji: "🌲",
    blurb: "Acid mine drainage, invasive species, runoff and how people can help.",
    parentNote:
      "Practices how environmental issues in Pennsylvania (acid mine drainage, stormwater runoff, invasive species such as the spotted lanternfly and hemlock woolly adelgid, too many deer for young trees, white-nose syndrome in bats) affect people and nature, and ways that individuals and communities can act as stewards.",
    standards: ["3.4.6-8.D; 3.4.6-8.E; 3.4.6-8.H", "how Pennsylvania environmental issues affect Pennsylvania's human and natural systems, collecting and interpreting data about a local environment, and designing a solution in which people act as stewards of the environment"],
    items: PENNS_ENVIRONMENT,
  }),
  bankUnit({
    id: "pa-g6-earth-resources",
    title: "Earth's Resources & Pennsylvania",
    emoji: "⛏️",
    blurb: "Why coal, gas, water and minerals are where they are.",
    parentNote:
      "Practices why Earth's mineral, energy and groundwater resources are unevenly spread because of past geologic processes, using Pennsylvania's coal, Marcellus Shale gas, limestone and groundwater as examples, and how different societies manage resources.",
    standards: ["3.3.6-8.K; 3.3.6-8.N; 3.4.6-8.B", "how the uneven distribution of Earth's mineral, energy and groundwater resources comes from geoscience processes, how population and resource use affect Earth's systems, and how different societies use and manage natural resources"],
    items: EARTH_RESOURCES,
  }),
  copyOf(
    from(NEW_YORK_6, "ny-g6-climate"),
    {
      id: "pa-g6-climate",
      title: "Climate & Warming",
      emoji: "🌡️",
      blurb: "What shapes a region's climate, and why Earth is warming.",
      parentNote:
        "Practices what shapes regional climate (latitude, elevation, nearby water, air and ocean circulation) and the causes of the rise in global temperatures, with Pennsylvania examples such as lake-effect snow near Lake Erie and cooler mountains.",
      standards: ["3.3.6-8.I; 3.3.6-8.O", "what shapes regional climate, and the causes of rising global temperatures"],
    },
    [
      ["Pennsylvania has hot summers and cold winters because it is…", "in the middle latitudes, where seasons change", ["on the equator", "at the North Pole", "under the ocean"], "Latitude affects climate."],
      ["Areas near Erie get a lot of winter snow because cold air picks up…", "moisture from the warm lake water", ["dust", "heat from the Moon", "salt"], "This is called lake-effect snow."],
      ["The Allegheny and Pocono mountains are cooler than Philadelphia because…", "air gets cooler as elevation rises", ["they are closer to the Sun", "they have no wind", "they have no clouds"], "Higher places are cooler."],
      ["Ocean currents and air masses help set a region's…", "climate", ["day length", "gravity", "tides only"], "They move heat around Earth."],
      ["Average temperatures in Pennsylvania have risen over the past century. A main cause is…", "more greenhouse gases from burning fossil fuels", ["a closer Sun", "fewer stars", "bigger tides"], "Greenhouse gases trap heat."],
      ["Which gas released by burning coal, oil and gas traps heat?", "carbon dioxide", ["helium", "neon", "argon"], "It is the main greenhouse gas from fuels."],
      ["Climate is…", "the typical weather of a place over many years", ["today's weather", "the weather this hour", "one storm"], "Weather is short-term; climate is long-term."],
      ["A data table shows Harrisburg's yearly average temperature rising over 100 years. This is evidence of…", "a warming trend", ["no change", "a cooling trend", "a single storm"], "Look at the pattern over time.", true],
    ],
  ),
  copyOf(
    from(NEW_YORK_7, "ny-g7-earth-surface"),
    {
      id: "pa-g6-earth-surface",
      title: "Rocks, Plates & Changing Land",
      emoji: "⛰️",
      blurb: "The rock cycle, slow and fast changes to the land, and evidence of moving plates.",
      parentNote:
        "Practices the rock cycle, how geoscience processes change Earth's surface over different times and sizes, and evidence of moving plates, with Pennsylvania examples such as the Appalachian Mountains, limestone, slate, glaciers and coal.",
      standards: ["3.3.6-8.F; 3.3.6-8.E; 3.3.6-8.G", "the rock cycle, surface processes at different time and size scales, and evidence of moving plates"],
    },
    [
      ["Pennsylvania's Appalachian Mountains formed when…", "moving plates collided long ago", ["a comet hit", "a volcano erupted last year", "a flood"], "Collisions fold and lift rock."],
      ["Pennsylvania's mountains are old and rounded because they have been…", "worn down by weathering and erosion for millions of years", ["built last year", "made of soft sand", "sanded by machines"], "Slow processes wear rock away."],
      ["Pennsylvania has no active volcanoes because it is…", "far from plate boundaries", ["right on a plate boundary", "on a hot spot", "under water"], "Volcanoes cluster at plate edges."],
      ["Limestone in Pennsylvania's caves formed from…", "shells and sediment on an ancient sea floor", ["lava", "glaciers", "wind"], "Limestone is sedimentary rock."],
      ["Slate quarried in eastern Pennsylvania is a metamorphic rock formed when shale is changed by…", "heat and pressure", ["cooling lava", "dissolving in rain", "wind"], "Metamorphic rock is rock changed by heat and pressure."],
      ["Glaciers once covered parts of northwestern and northeastern Pennsylvania. Evidence includes…", "scratched rocks and lakes the ice left behind", ["volcano cones", "tropical coral", "sand dunes only"], "Moving ice scrapes and carves the land."],
      ["Fossils of ocean animals on Pennsylvania ridges are evidence that…", "the land was once under a sea and has since been lifted", ["oceans are on the ridges today", "fossils fall from the sky", "the animals climbed up"], "Plate motion raised ancient sea floor."],
      ["Coal beds in Pennsylvania are evidence that the area was once…", "a warm, swampy forest", ["a desert", "a glacier", "a deep ocean"], "Coal comes from buried plants.", true],
    ],
  ),
];
/** Put the own units before the planned ones. */
export const FIRST = false;
