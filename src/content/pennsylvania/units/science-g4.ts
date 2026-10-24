import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Pennsylvania's own Grade 4 science units (`pa-` ids), for the STEELS standards no shared unit practises: where energy
// and fuels come from, with Pennsylvania's coal, oil and natural gas as the examples (3.3.4.D; 3.4.3-5.F; 3.5.3-5.E, F),
// systems, subsystems and troubleshooting a design (3.5.3-5.BB, CC, DD, N, O, P, Q), and Pennsylvania's watersheds and
// local environmental issues (3.4.3-5.C, D, E).

const PENNS_ENERGY: Q[] = [
  ["Coal, oil and natural gas are called fossil fuels because they formed from…", "ancient plants and animals", ["melted metal", "volcano glass", "frozen clouds"], "They formed over millions of years."],
  ["Anthracite, a hard coal, is mined mostly in…", "northeastern Pennsylvania", ["southern Florida", "central Alaska", "western Texas"], "The anthracite region is in the northeast."],
  ["Bituminous, a softer coal, has been mined in…", "western Pennsylvania", ["the Atlantic Ocean", "the Great Lakes only", "the Pocono ice caves"], "Western Pennsylvania has bituminous coal."],
  ["Coal is burned in power plants to…", "make heat that makes electricity", ["make rain", "grow food", "make wind"], "Burning coal heats water into steam."],
  ["The first commercial oil well in the United States was drilled near Titusville, Pennsylvania, in…", "1859", ["1459", "1759", "1959"], "Edwin Drake's well started the oil boom."],
  ["Oil can be made into…", "gasoline and plastics", ["wood and paper", "milk and cheese", "sand and glass"], "Oil is refined into many products."],
  ["Natural gas is found deep underground in rock, such as the Marcellus Shale, which lies under much of…", "Pennsylvania", ["the Pacific Ocean", "the North Pole", "the Moon"], "Marcellus Shale gas is drilled in Pennsylvania."],
  ["People use natural gas to…", "heat homes and cook food", ["grow trees", "make paper", "fill rivers"], "It burns for heat."],
  ["Which is a renewable energy source?", "wind", ["coal", "oil", "natural gas"], "Wind keeps blowing."],
  ["Which is a nonrenewable energy source?", "natural gas", ["sunlight", "wind", "flowing water"], "It cannot be replaced quickly."],
  ["Burning fossil fuels puts gases into the air. That can…", "make the air dirtier and warm the Earth", ["make the air cleaner", "stop all rain", "freeze the oceans"], "Burning fuels has environmental effects."],
  ["Mining coal can scar the land. Companies in Pennsylvania are now required to…", "work to restore mined land", ["leave holes forever", "sell the land twice", "bury trash in streams"], "Reclaiming land repairs damage."],
  ["Which of these uses the Sun's energy directly?", "solar panels", ["a coal mine", "an oil well", "a gas pipeline"], "Solar panels capture sunlight."],
  ["A wind farm uses…", "turbines that spin in the wind", ["pipes of steam from coal", "drills that dig for oil", "bulldozers that move shale"], "Wind turns the blades."],
  ["Flowing water can spin a turbine at a dam. This makes…", "hydroelectric power", ["a coal mine", "a gas well", "a diesel engine"], "Hydro means water."],
  ["Which energy source will not run out in a human lifetime?", "sunlight", ["coal", "oil", "natural gas"], "The Sun will shine for billions of years."],
  ["Why did towns grow up near coal mines in Pennsylvania?", "miners needed places to live and work", ["coal made rain", "the Moon pulled people", "mines made beaches"], "Industry brought people.", true],
  ["Fuels give energy, but using them can harm the environment. How can people reduce harm?", "use less energy and choose cleaner sources", ["burn more fuel", "waste electricity", "pour oil in rivers"], "Reduce use and switch sources.", true],
  ["Which choice saves energy at home?", "turning off lights and electronics you are not using", ["leaving the heat on with the windows open", "running every light all night", "keeping the refrigerator door open"], "Use less energy.", true],
  ["Why are fossil fuels called nonrenewable?", "they take millions of years to form", ["they are made by cars", "they are renewed every night", "they fall as snow"], "We use them far faster than they form.", true],
  ["A map shows coal in the northeast and gas under much of the state. This helps people…", "decide where to mine or drill", ["decide the weather", "tell time", "choose a favorite color"], "Maps show where resources are.", true],
  ["Which pair are both fossil fuels?", "coal and oil", ["coal and wind", "sun and wind", "oil and sunlight"], "Coal, oil and natural gas are fossil fuels.", true],
  ["A family chooses an electric car instead of a gasoline car. How does this change fuel use?", "it can use less oil", ["it uses more coal only", "it makes no change", "it uses no energy"], "Electric cars use electricity instead of gasoline.", true],
  ["Why might a solar panel work less well in a very cloudy week?", "less sunlight reaches it", ["clouds make it hot", "panels need rain to run", "clouds make it spin"], "Panels need sunlight.", true],
  ["What can make Pennsylvania's air cleaner when power plants change?", "burning less coal and using cleaner sources", ["burning more coal", "adding more smoke", "closing the windows"], "Cleaner energy sources help the air.", true],
];

const SYSTEMS_AND_DESIGN: Q[] = [
  ["A system is a group of parts that…", "work together as a whole", ["never touch", "break easily", "stay in a box"], "The parts depend on each other."],
  ["A bicycle's brake, chain and wheel are parts of one…", "system", ["season", "habitat", "food chain"], "A bicycle is a system."],
  ["A subsystem is…", "a smaller system that is part of a larger system", ["a broken part", "a weather map", "a kind of rock"], "A bike's braking system is a subsystem."],
  ["A car's engine is a subsystem of the car. The car is the…", "larger system", ["smallest system", "weather", "habitat"], "Subsystems fit inside systems."],
  ["A flashlight has a battery, a switch and a bulb. If the switch is broken, the flashlight…", "will not work properly", ["will work better", "will float", "will change color"], "A missing or broken part affects the system."],
  ["A school bus system has the bus, the driver, the route and the schedule. If the driver is missing…", "the system will not work as planned", ["the bus runs on its own", "the schedule changes color", "the route disappears"], "All the parts matter."],
  ["Simple machines such as a lever and a wheel can be combined to make a…", "more complex machine", ["rock", "cloud", "fossil"], "A bicycle uses many simple machines."],
  ["A pair of scissors is two levers joined at a pivot. Scissors are…", "a combined simple machine", ["a natural material", "an animal", "a landform"], "Levers can be combined."],
  ["A toy car will not roll. What is the best first step to find the problem?", "check each part, such as the wheels and axles", ["buy a new toy", "throw it away", "paint it"], "Troubleshoot by checking parts."],
  ["To fix a lamp that will not light, what should you check first?", "whether it is plugged in and the bulb works", ["the color of the shade", "the weather outside", "the time of day"], "Check the likely causes first."],
  ["Which step is part of the engineering design process?", "testing and improving a design", ["ignoring the problem", "hiding the results", "never trying again"], "Engineers test and improve."],
  ["Before building, engineers define the problem and list the…", "criteria and constraints", ["colors of the sky", "names of the stars", "songs they like"], "Criteria say what must be achieved."],
  ["A criterion is…", "something the design must do", ["a kind of weather", "a type of rock", "a bird"], "For a bridge: hold 5 toy cars."],
  ["A constraint is…", "a limit, such as cost, time or materials", ["a free gift", "an unlimited supply", "a prize"], "For a bridge: only 20 craft sticks."],
  ["A team builds a paper tower with only 10 sheets of paper. The 10 sheets are a…", "constraint", ["criterion", "prize", "result"], "A limit is a constraint."],
  ["A tower must be at least 30 cm tall. That is a…", "criterion", ["constraint", "hobby", "mistake"], "It says what the design must do."],
  ["Which measure helps compare two bridge designs?", "how much weight each holds", ["how pretty the paper is", "what day it is", "who built it"], "Test with the same load.", true],
  ["You test a design and it fails. What do engineers do next?", "learn why it failed and improve it", ["say engineering is impossible", "hide the design", "stop all testing"], "Failure gives information.", true],
  ["Two designs hold 4 kg and 6 kg. If the goal is to hold as much as possible, which is better?", "the one that holds 6 kg", ["the one that holds 4 kg", "neither", "both are equal"], "Compare with the criterion.", true],
  ["A team tests a boat design three times and gets 40 g, 42 g and 41 g. This shows…", "the result is reliable", ["the boat is broken", "the test was not a test", "the numbers are random"], "Repeated tests that agree are more trustworthy.", true],
  ["If one part of a system is changed, other parts of the system…", "may be affected too", ["never change", "disappear", "turn into water"], "Systems are connected.", true],
  ["An engineer wants a stronger paper bridge. Which change might help?", "fold the paper into a pleated shape", ["wet the paper", "make it flatter and thinner", "cut holes in it"], "Folds add strength.", true],
  ["An engineer compares what is good and bad about three designs. This is…", "evaluating strengths and weaknesses", ["guessing", "ignoring", "daydreaming"], "Evaluate each design.", true],
  ["When a design needs to be safe, the team should…", "test it carefully and follow safety rules", ["test it in a hurry", "skip the tests", "hide problems"], "Safety is a design criterion.", true],
  ["Which of these shows good design skills?", "making a sketch, building, testing and improving", ["building without a plan", "never checking", "ignoring the results"], "Practice the design steps.", true],
];

const PENNS_WATERSHEDS: Q[] = [
  ["A watershed is…", "all the land that drains into one river or stream", ["a shed for water", "a kind of cloud", "a mountain top"], "Rain flows downhill into the same waterway."],
  ["Rain falling on a hill flows…", "downhill into streams", ["uphill", "into the sky", "into a mountain"], "Gravity pulls water down."],
  ["Small streams join to form…", "larger rivers", ["mountains", "deserts", "glaciers"], "Streams flow together."],
  ["The Susquehanna River drains much of Pennsylvania. It flows into…", "Chesapeake Bay", ["Lake Erie", "the Great Salt Lake", "the Pacific Ocean"], "It flows south to the bay."],
  ["The Delaware River forms much of Pennsylvania's eastern border. It flows toward…", "Delaware Bay and the Atlantic Ocean", ["Lake Erie", "the Gulf of Mexico", "Hudson Bay"], "It flows south to the sea."],
  ["Pittsburgh is where the Allegheny and Monongahela Rivers meet to make the…", "Ohio River", ["Susquehanna River", "Delaware River", "Hudson River"], "Three rivers meet there."],
  ["What can happen to a stream when rain runs over a parking lot?", "oil and trash can wash into it", ["the stream gets cleaner", "the stream disappears", "the stream turns to ice"], "Runoff carries pollution."],
  ["Which helps keep a stream clean?", "plants along its banks", ["dumping trash", "pouring chemicals", "stripping the banks bare"], "Plants hold soil and filter water."],
  ["When farm fields lose soil in a storm, the soil may…", "wash into streams and make the water muddy", ["rise into the clouds", "turn into glass", "cool the stream"], "Erosion carries soil."],
  ["Storm drains in a town usually lead to…", "a stream or river", ["a mountain top", "a cloud", "the Moon"], "Storm drains empty into waterways."],
  ["Which of these things can you do to keep storm drains clean?", "keep litter and leaves out of them", ["pour oil in them", "dump paint", "fill them with soil"], "Whatever goes in a drain goes to a stream."],
  ["Muddy water can hurt fish because it…", "makes it hard to breathe and see", ["gives them more food", "cools the water", "adds oxygen"], "Mud clogs gills."],
  ["Which test could show if a stream is healthy?", "counting the kinds of small animals living in it", ["counting the clouds", "listening to a song", "measuring the Moon"], "Many kinds of insects mean cleaner water."],
  ["A class measures the temperature of a stream each week. They are collecting…", "environmental data", ["recipes", "poems", "songs"], "Data show patterns over time."],
  ["Brook trout need cold water. If a stream loses its shade trees, the water may…", "get warmer", ["get colder", "turn into ice", "turn into soil"], "Shade keeps water cool."],
  ["A class makes a model of a watershed with crumpled paper and a spray bottle. The model shows…", "how rain flows downhill", ["how stars form", "how volcanoes erupt", "how trees grow"], "Models show systems.", true],
  ["Why is a local pollution problem connected to the larger watershed?", "water carries pollution downstream", ["water stays in one place", "pollution never moves", "streams flow uphill"], "Everything flows downstream.", true],
  ["If a factory upstream releases waste, who may be affected?", "people and animals downstream", ["only the factory", "only the clouds", "no one"], "Water flows from upstream to downstream.", true],
  ["A town builds a pond to catch rain from a big parking lot. This pond helps by…", "slowing runoff and letting dirt settle", ["making more runoff", "adding trash", "raising the streets"], "Basins slow water and trap sediment.", true],
  ["Which graph best shows stream temperature changing over a week?", "a line graph", ["a map of the Moon", "a picture of a cloud", "a list of colors"], "Line graphs show change over time.", true],
  ["Why do wetlands help a watershed?", "they soak up water and filter it", ["they have no plants", "they make dirt flow faster", "they dry up streams"], "Wetlands slow and clean water.", true],
  ["The Susquehanna is the largest river flowing into Chesapeake Bay. What happens upstream affects…", "the water that reaches the bay", ["only the mountains", "nothing", "only the sky"], "Rivers connect places.", true],
  ["Which action would help the Susquehanna's watershed?", "planting trees along streams", ["dumping trash", "pouring paint", "removing all plants"], "Streamside trees protect water.", true],
  ["A group wants to find where litter in a stream comes from. What could they do first?", "walk along the stream and record what they find", ["guess", "ask a stranger on the Moon", "ignore it"], "Investigate and collect data.", true],
  ["Why is it important to keep our local stream healthy?", "it is part of the water everyone downstream uses", ["streams are just ditches", "streams never matter", "streams only matter in winter"], "Water is shared.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "pa-g4-penns-energy",
    title: "Pennsylvania's Fuels & Energy",
    emoji: "⚡",
    blurb: "Coal, oil, natural gas, wind and sun: where energy comes from.",
    parentNote:
      "Practices where energy and fuels come from, using Pennsylvania's own coal (anthracite and bituminous), the first commercial oil well at Titusville (1859) and Marcellus Shale gas as examples, renewable and nonrenewable resources, and how using them affects the environment.",
    standards: ["3.3.4.D; 3.4.3-5.F; 3.5.3-5.E; 3.5.3-5.F", "energy and fuels come from natural resources and their use affects the environment, how people depend on and change the environment, responsible use of resources, and renewable and nonrenewable resources"],
    items: PENNS_ENERGY,
  }),
  bankUnit({
    id: "pa-g4-systems-and-design",
    title: "Systems & Design",
    emoji: "🧩",
    blurb: "Parts, subsystems, criteria, constraints and fixing what does not work.",
    parentNote:
      "Practices how systems and subsystems work, what happens when a part is missing, troubleshooting a product that does not work, criteria and constraints, and testing and comparing designs.",
    standards: ["3.5.3-5.BB; 3.5.3-5.CC; 3.5.3-5.DD; 3.5.3-5.N; 3.5.3-5.O; 3.5.3-5.P; 3.5.3-5.Q", "systems with missing parts, subsystems, combining simple technologies, finding why a product is not working, the requirements of a design, evaluating the strengths and weaknesses of design solutions, and practicing design skills"],
    items: SYSTEMS_AND_DESIGN,
  }),
  bankUnit({
    id: "pa-g4-penns-watersheds",
    title: "Pennsylvania Watersheds",
    emoji: "🏞️",
    blurb: "How rain flows to the Susquehanna, Delaware and Ohio, and how to keep water clean.",
    parentNote:
      "Practices what a watershed is, where Pennsylvania's rivers flow (the Susquehanna to Chesapeake Bay, the Delaware to the Atlantic, the Ohio below Pittsburgh), how runoff carries pollution, and collecting data about a local stream.",
    standards: ["3.4.3-5.C; 3.4.3-5.D; 3.4.3-5.A", "collecting and displaying data about a local environment, modeling how a local environmental issue connects to larger systems, and how living things and the environment affect each other"],
    items: PENNS_WATERSHEDS,
  }),
];
/** Put the own units before the planned ones. */
export const FIRST = false;
