import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Pennsylvania's own Grade 5 science units (`pa-` ids), for the STEELS standards no shared unit practises: how people and
// the environment affect each other and what to do about an environmental issue (3.4.3-5.A, B, E, F; 3.3.5.F), the
// engineering design process in full (3.5.3-5.M, O, P, S, U, V, Y), and how technology changes society and how it is
// adapted when needs change (3.5.3-5.H, J, EE, GG, HH).

const PEOPLE_AND_ENVIRONMENT: Q[] = [
  ["Living things and their environment affect each other. A beaver dam is an example of an animal…", "changing its environment", ["avoiding the environment", "being unaffected", "disappearing"], "Beavers build dams that make ponds."],
  ["When a forest is cleared for a town, the animals that lived there…", "lose their habitat", ["gain more habitat", "do not need a home", "turn into plants"], "Habitat loss affects animals."],
  ["Which is an effect of litter in a stream?", "it can harm fish and other animals", ["it cleans the water", "it makes fish bigger", "it adds oxygen"], "Pollution harms living things."],
  ["Which is a way people depend on the environment?", "they get water, food and air from it", ["they never use it", "they make it disappear", "it uses people"], "People rely on natural resources."],
  ["A person can make a choice that affects the environment, like…", "walking instead of driving a short trip", ["stopping the Sun", "moving a mountain by wishing", "changing the seasons"], "Our choices matter."],
  ["Which pair shows an environmental effect on a living thing?", "a dry summer makes a stream shrink and fish crowd together", ["a stone is smooth", "a cloud is white", "a bike is red"], "Environments change living things."],
  ["A class compares litter before and after a cleanup. This is…", "collecting data about their local environment", ["a game with no data", "a story", "a song"], "Data show whether an action worked."],
  ["Which display best shows how much litter was found each week?", "a bar graph", ["a poem", "a recipe", "a map of the sky"], "Bar graphs compare amounts."],
  ["A town is deciding whether to build a new road through woods. Which should it think about?", "benefits for people and effects on wildlife and water", ["only the color of the road", "only the name of the road", "nothing at all"], "Weigh both sides."],
  ["Acid rain once harmed forests and lakes. Laws that reduced air pollution…", "helped the environment recover", ["made acid rain worse", "stopped all rain", "had no effect"], "Rules can protect the environment."],
  ["Planting native trees along a stream can…", "shade the water and hold the soil", ["dry up the stream", "warm the water", "block all fish"], "Roots hold soil; shade cools water."],
  ["Which action is a way to reduce waste?", "composting food scraps", ["burning all trash in the yard", "throwing food in a stream", "burying plastic"], "Compost turns scraps into soil."],
  ["Which is better for a stream: a lawn with fertilizer right up to the bank, or a strip of plants along the bank?", "a strip of plants", ["fertilizer up to the bank", "no plants at all", "a paved bank"], "Plants filter runoff."],
  ["A solution to a litter problem should be…", "something people can really do", ["impossible", "silly", "harmful"], "Good solutions work in real life."],
  ["A school wants to cut paper waste. A good measure of success is…", "the weight of paper thrown away each week", ["the color of the paper", "the name of the class", "the day of the week"], "Measure the change."],
  ["Which statement is an argument supported by evidence?", "The cleanup worked because there was less litter the next week.", ["Cleanups are fun, so they work.", "Litter is blue.", "Streams are wide."], "Evidence supports a claim.", true],
  ["Why might people disagree about cutting trees for lumber?", "some value jobs and wood, others value the forest's habitat", ["trees are not real", "no one uses wood", "everyone agrees"], "People have different values.", true],
  ["Why can a problem in one place, such as a polluted stream, become a bigger problem downstream?", "water carries the pollution along", ["water stays put", "pollution disappears", "streams flow uphill"], "Local problems connect to larger systems.", true],
  ["A group wants to know if a new rain garden helps. What should they compare?", "how much runoff reaches the stream before and after", ["the color of the flowers only", "how tall the fence is", "the name of the garden"], "Test the result with data.", true],
  ["Which of these is an example of people changing the environment in a helpful way?", "restoring a wetland", ["draining a stream for no reason", "dumping trash in a pond", "cutting all the trees"], "Restoration helps wildlife.", true],
  ["A farm uses less water by watering plants at their roots. This is…", "a way to conserve a resource", ["a way to waste water", "a harm to plants", "an unneeded step"], "Conserving means using less.", true],
  ["Which action would most reduce the energy a school uses?", "turning off lights and computers when not needed", ["leaving lights on all night", "using more machines", "opening windows in winter"], "Using less energy reduces impact.", true],
  ["A community compares three plans for a local park. How can they choose?", "check each plan against what the community needs", ["pick the one with the longest name", "flip a coin without discussing", "choose no plan"], "Evaluate with criteria.", true],
  ["Hellbenders and brook trout need clean streams. When streams are polluted, these animals may…", "decline in number", ["increase in number", "turn into other animals", "move into trees"], "Sensitive animals show water quality.", true],
  ["How do people who study the environment learn what is happening in a stream?", "by measuring and observing it over time", ["by guessing", "by ignoring it", "by painting it"], "Scientists collect data.", true],
];

const ENGINEERING_PROCESS: Q[] = [
  ["The engineering design process starts by…", "defining a problem", ["throwing things away", "building without thinking", "choosing a prize"], "First, know the problem."],
  ["After defining a problem, engineers…", "brainstorm possible solutions", ["stop working", "hide the problem", "pick one at random"], "Many ideas first."],
  ["After building a prototype, engineers…", "test it", ["forget it", "paint it only", "give it away"], "Test and improve."],
  ["A prototype is…", "a first model that can be tested", ["a finished product on a shelf", "a recipe", "a map"], "Prototypes are early versions."],
  ["Why do engineers test a design more than once?", "to make sure the result is reliable", ["to waste time", "to hide the results", "because tests do not matter"], "Repeat tests give trustworthy data."],
  ["A requirement of a design is a…", "feature it must have", ["feature it must not have", "color", "name"], "Requirements say what is needed."],
  ["A constraint is a…", "limit such as time, cost or materials", ["free supply", "prize", "result"], "Constraints limit choices."],
  ["A team has $10 for a project. The $10 is a…", "constraint", ["criterion", "result", "mistake"], "Money is a limit."],
  ["A bridge model must hold at least 500 g. That is a…", "criterion", ["constraint", "joke", "color"], "Criteria are goals to meet."],
  ["Which is a safe way to use tools?", "wear safety glasses and follow the rules", ["use tools while running", "share sharp tools without looking", "use tools without help"], "Safe tool use is part of design."],
  ["Which would be a good way to compare three paper airplane designs?", "fly each one the same way and measure the distance", ["choose the prettiest", "guess", "pick the heaviest"], "Use fair tests."],
  ["A fair test changes only…", "one thing at a time", ["everything at once", "nothing", "the person measuring"], "Keep the other conditions the same."],
  ["After a test, engineers look at the data to find…", "the strengths and weaknesses of the design", ["the best song", "the weather on Mars", "the name of the tester"], "Use data to improve."],
  ["Combining the best parts of two designs can…", "make a better design", ["always make a worse design", "stop the design", "remove all parts"], "Engineers combine good ideas."],
  ["Design skills include sketching, measuring and…", "testing", ["sleeping", "forgetting", "hiding"], "Practice design skills."],
  ["A drawing with measurements that shows how to build something is a…", "plan", ["poem", "story", "tune"], "Plans help builders."],
  ["Engineers often work with…", "teams of people with different skills", ["no one", "only one person", "only machines"], "Teamwork helps."],
  ["A good design is one that…", "meets the criteria within the constraints", ["breaks the rules", "ignores the problem", "uses the most materials"], "It solves the problem within limits.", true],
  ["Two designs both work. One costs less and uses fewer materials. Which meets the constraints better?", "the one that costs less", ["the one that costs more", "neither", "both fail"], "Constraints include cost.", true],
  ["A model car does not roll straight. Which is the best next step?", "check the wheels and axles and try again", ["throw it away", "paint it", "say it works"], "Diagnose, change, retest.", true],
  ["A team's tower falls. Which message is most helpful?", "The base was too narrow; make it wider and test again.", ["You are bad at building.", "Towers cannot be built.", "It does not matter."], "Useful feedback points to a fix.", true],
  ["How can you tell whether a solution is good?", "see how well it meets the criteria", ["whether you like the color", "whether it is the biggest", "whether it is the first one"], "Compare with the goals.", true],
  ["Why is it helpful to sketch several designs before choosing one?", "you can compare them before building", ["sketches are required", "sketches use paper", "sketches are beautiful"], "More options give better choices.", true],
  ["A solution that works but costs too much breaks which limit?", "a cost constraint", ["a color criterion", "a name rule", "a weather rule"], "Cost is a limit.", true],
  ["Which resource is needed to get a technical job done?", "people, materials, tools, time and energy", ["only a name", "only a wish", "only a color"], "Projects need resources.", true],
  ["A designer wants a product everyone can use. This is thinking about…", "different people's needs", ["only the designer's needs", "weather", "geology"], "Good design helps many people.", true],
];

const TECHNOLOGY_AND_SOCIETY: Q[] = [
  ["Why do people invent new technologies?", "to meet needs and wants", ["to confuse others", "to waste time", "by accident only"], "Needs drive invention."],
  ["Telephones changed society by letting people…", "talk across long distances", ["see in the dark", "fly", "live underwater"], "Communication changed."],
  ["Long ago, people washed clothes by hand. Washing machines changed how people…", "spend their time", ["see colors", "hear music", "grow taller"], "Technology changes daily life."],
  ["Which is an example of technology adapting to a changing need?", "phones that can also take pictures", ["a rock", "a puddle", "a cloud"], "Devices change as people want new things."],
  ["Early people used simple tools to farm. Over time, tools became…", "more complex", ["simpler always", "invisible", "natural"], "Technology builds on earlier ideas."],
  ["Which of these is the work of an engineer?", "designing a bridge", ["studying the stars only", "painting the sky", "counting clouds"], "Engineers design solutions."],
  ["Which of these is the work of a scientist?", "asking questions and testing ideas about nature", ["building a bridge only", "only fixing cars", "only selling toys"], "Scientists investigate."],
  ["A technician might…", "install and repair equipment", ["only write stories", "only sing", "only draw"], "Technicians keep systems running."],
  ["Science and technology are connected because science helps people…", "design better technology", ["avoid all tools", "stop learning", "forget how to build"], "Scientific ideas help inventions."],
  ["A bird's wing inspired people to design…", "airplane wings", ["spoons", "pillows", "socks"], "Nature can inspire inventions."],
  ["Which is human-made, not natural?", "a bridge", ["a river", "a mountain", "a valley"], "People build bridges."],
  ["Which is natural, not human-made?", "a waterfall", ["a dam", "a canal", "a road"], "Waterfalls form without people."],
  ["The wheel changed how people…", "moved heavy loads", ["saw the stars", "grew crops from the sky", "told time at night"], "Wheels help carry things."],
  ["A new technology can have helpful and harmful effects. An example is…", "cars that move people quickly and add air pollution", ["a cloud with no effects", "a rock with no use", "a tree with no shade"], "Weigh both sides."],
  ["When a society needs cleaner energy, engineers may…", "design better solar panels and batteries", ["stop designing", "burn more coal", "remove all power"], "Needs change designs."],
  ["Which factor can change how a society's roads and bridges are built?", "how many people need to use them", ["the color of the sky", "the name of a street", "the shape of a cloud"], "Population and needs shape infrastructure."],
  ["Which is a way that a community's culture can shape technology?", "people build homes from materials common in their area", ["rocks decide", "clouds decide", "no one decides"], "Culture and resources shape design.", true],
  ["Why might two communities solve the same problem in different ways?", "they have different needs, resources and ideas", ["they cannot think", "they have no problems", "they have the same tools"], "Context matters.", true],
  ["A farmer in a dry area uses drip lines to save water. This design responds to…", "a local need", ["a cloud", "a song", "a color"], "Needs shape designs.", true],
  ["Which is more likely to change a society's technology?", "a new need or a new resource", ["a name", "a color", "a number"], "Needs and resources drive change.", true],
  ["Why do communities pay taxes to build roads and water systems?", "they are shared technologies many people need", ["roads are free", "systems never break", "roads are decoration"], "Infrastructure is shared.", true],
  ["How did people in the past make tools?", "from materials around them such as stone, bone and wood", ["from plastic only", "from computers only", "from nothing"], "Natural materials were tools' first source.", true],
  ["Which technology would be hardest to use without electricity?", "a refrigerator", ["a spoon", "a broom", "a wooden toy"], "It needs power.", true],
  ["Why do many products come with warning labels?", "to help people use them safely", ["to make them heavier", "to hide the product", "to make them taste good"], "Labels communicate safety.", true],
  ["A technology used to be too expensive for most people. As it got cheaper, more people could…", "use it", ["not use it", "see it vanish", "forget about it"], "Cost affects who can use technology.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "pa-g5-people-and-environment",
    title: "People & the Environment",
    emoji: "🌳",
    blurb: "How people and nature affect each other, and what we can do about it.",
    parentNote:
      "Practices how living things and their environment affect each other, collecting and graphing data about a local issue, weighing a plan that affects the environment, and arguing from evidence for an action such as a cleanup, streamside planting or a rain garden.",
    standards: ["3.4.3-5.A; 3.4.3-5.B; 3.4.3-5.C; 3.4.3-5.E; 3.4.3-5.F; 3.3.5.F", "how living things and the environment affect each other, the impacts of design solutions and civic actions, collecting and displaying data, arguing whether action is needed on an environmental issue, how people depend on and change the environment, and designing solutions to an environmental issue"],
    items: PEOPLE_AND_ENVIRONMENT,
  }),
  bankUnit({
    id: "pa-g5-engineering-process",
    title: "The Engineering Process",
    emoji: "📏",
    blurb: "Define, design, test and improve: criteria, constraints and fair tests.",
    parentNote:
      "Practices the full engineering design process: defining a problem, criteria and constraints, building and testing prototypes with fair tests, using data to compare designs, combining the best parts, and working safely and as a team.",
    standards: ["3.5.3-5.M; 3.5.3-5.O; 3.5.3-5.P; 3.5.3-5.R; 3.5.3-5.S; 3.5.3-5.U; 3.5.3-5.Y", "the engineering design process, the requirements of a design, evaluating strengths and weaknesses, safe use of tools, multiple approaches to design, evaluating designs against criteria and constraints, and the resources needed for a technical job"],
    items: ENGINEERING_PROCESS,
  }),
  bankUnit({
    id: "pa-g5-technology-and-society",
    title: "Technology & Society",
    emoji: "🏗️",
    blurb: "How inventions change life, and how needs shape the things we make.",
    parentNote:
      "Practices how technologies are developed or adapted when needs and wants change, how culture and place shape design, helpful and harmful effects of technology, the link between science and technology, and the roles of scientists, engineers and technicians.",
    standards: ["3.5.3-5.H; 3.5.3-5.J; 3.5.3-5.EE; 3.5.3-5.FF; 3.5.3-5.GG; 3.5.3-5.HH", "what changes a society's technology, how technologies are adapted when needs change, how economic, political and cultural forces shape solutions, comparing nature and the human-made world, the relationship between science and technology, and the roles of scientists, engineers and technicians"],
    items: TECHNOLOGY_AND_SOCIETY,
  }),
];
/** Put the own units before the planned ones. */
export const FIRST = false;
