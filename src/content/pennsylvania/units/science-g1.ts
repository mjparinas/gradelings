import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Pennsylvania's own Grade 1 science units (`pa-` ids), for the STEELS standards no shared unit practises: how people
// harvest and use natural resources and reduce, reuse and recycle (3.4.K-2.A, D; 3.5.K-2.D), the engineering design
// process (3.5.K-2.M, T, U, V, X), and how places and the way people value them differ, with Pennsylvania as the example
// (3.4.K-2.B, C).

const RESOURCES: Q[] = [
  ["Farmers grow food. Food comes from…", "plants and animals", ["only factories", "only the Moon", "only glass"], "Farms grow plants and raise animals."],
  ["Wood from trees is used to make…", "paper and furniture", ["glass jars", "metal pans", "water"], "Many things are made of wood."],
  ["Which one is a natural resource?", "water", ["a toy robot", "a plastic fork", "a pencil case"], "Natural resources come from the Earth."],
  ["Coal is dug out of the ground. This is called…", "mining", ["farming", "fishing", "baking"], "Miners dig minerals out of the Earth."],
  ["Where does the water in a tap often come from?", "a river, lake or well", ["a cloud factory", "a toy store", "the Sun"], "Water is moved through pipes."],
  ["Pipes carry water from a river to homes. This is how people…", "move a resource to where it is used", ["make water", "break water", "color water"], "People move resources to where they are needed."],
  ["A truck brings apples from an orchard to a store. The truck…", "moves food to people", ["grows the apples", "paints the apples", "eats the apples"], "Trucks carry things."],
  ["Which one is something we can reuse?", "a cloth bag", ["a banana peel", "a used tissue", "a candy wrapper"], "A bag can be used many times."],
  ["Which one can be recycled?", "an empty plastic bottle", ["a muddy sock", "a used napkin", "a dirty sponge"], "Clean bottles can be recycled."],
  ["Which choice reduces trash?", "bringing a water bottle you fill again", ["buying a new bottle each time", "throwing paper outside", "using many napkins"], "Use less and reuse more."],
  ["What does recycle mean?", "make old things into new things", ["throw things in a river", "hide things", "break things on purpose"], "Materials get a second life."],
  ["Which one grows back after it is cut?", "a tree, if people plant new ones", ["a rock", "a lump of coal", "a metal can"], "Trees can be replanted."],
  ["Which of these do people drill or dig from the Earth?", "oil and coal", ["apples and corn", "milk and eggs", "wool and cotton"], "Fuels come from the ground."],
  ["Which of these is a plant crop?", "corn", ["coal", "oil", "iron"], "Farmers plant corn."],
  ["Which resource do we use to heat many homes?", "natural gas or wood", ["sand", "snow", "pebbles"], "Fuels can make heat."],
  ["Wind can turn a turbine to make…", "electricity", ["water", "food", "paper"], "Wind is a resource."],
  ["The Sun gives…", "light and heat", ["coal", "water pipes", "wood"], "We can use sunlight."],
  ["Farmers, miners and loggers all…", "take things from nature for people to use", ["only draw pictures", "only sing songs", "only paint walls"], "They harvest natural resources.", true],
  ["Which choice is a way to reuse?", "use an old jar to hold pencils", ["throw the jar in a pond", "break the jar", "bury the jar"], "Find a new job for it.", true],
  ["Why is it good to turn off a light when you leave the room?", "it saves energy", ["it makes the room bigger", "it grows plants", "it makes noise"], "Less energy used means fewer resources used.", true],
  ["Why do people sort trash and recycling?", "recycling can be made into new things", ["to make more trash", "to make food", "to hide messes"], "Sorting helps recycling work.", true],
  ["Which one does NOT come from a farm?", "a plastic toy", ["milk", "corn", "eggs"], "Toys are made in factories.", true],
  ["A class wants less waste at lunch. What could they investigate?", "how much food and paper gets thrown away", ["what color the walls are", "how tall the door is", "what song to sing"], "Ask a question and look for an answer.", true],
  ["Which is a good plan to cut down on waste at home?", "use both sides of the paper", ["use a new sheet each time", "tear paper into bits", "leave paper in the rain"], "Reduce, reuse, recycle.", true],
  ["Where does paper come from?", "trees", ["metal", "sand", "water"], "Paper is made from wood.", true],
];

const DESIGN_IT: Q[] = [
  ["Engineers solve problems by…", "designing and building things", ["only reading", "only sleeping", "only painting"], "Engineers make solutions."],
  ["What is the first step in solving a problem?", "know what the problem is", ["build it right away", "throw it away", "do nothing"], "First, ask what is wrong."],
  ["Maya's backpack rips. What is the problem?", "the bag cannot carry her books", ["the bag is a bag", "the bag is blue", "the bag is on a chair"], "A problem is something to fix."],
  ["A design is a…", "plan for making something", ["kind of food", "kind of weather", "kind of bird"], "You can draw a design first."],
  ["Which one can show a design before you build it?", "a drawing", ["a loud noise", "a nap", "a snack"], "A sketch shows the plan."],
  ["After you build something, what should you do?", "test it to see if it works", ["hide it", "break it", "forget it"], "Testing shows what works."],
  ["A paper bridge folds under a toy car. What can you do next?", "change the design and try again", ["give up forever", "say it is perfect", "throw it at the wall"], "Engineers improve a design."],
  ["Which material is best for a raincoat?", "plastic that keeps water out", ["paper towels", "tissue paper", "cotton balls"], "Pick a material for its job."],
  ["Why do we make boots from rubber?", "rubber keeps feet dry", ["rubber is a snack", "rubber sings", "rubber glows"], "Rubber keeps water out."],
  ["Which material is best for a pillow?", "soft cloth", ["metal", "glass", "brick"], "A pillow needs to be soft."],
  ["Which material would make a good window?", "clear glass", ["a brick", "a rock", "a wooden board"], "We need to see through a window."],
  ["A design has requirements. A requirement is something the design…", "must do", ["can never do", "does not need", "forgets"], "It tells what the design must do."],
  ["A cup must hold water. This is a…", "requirement", ["wish for a pet", "kind of weather", "song"], "A cup must not leak."],
  ["Two students build towers. One is tall and one is short. Both are…", "different solutions", ["the same tower", "not designs", "broken"], "There is more than one way to design."],
  ["A good plan has…", "steps in order", ["no steps", "steps backwards", "only surprises"], "First, next, then."],
  ["Making a plan before you build helps you…", "know what to do first", ["forget what to do", "use no materials", "work with no tools"], "Plan, then build."],
  ["Which tool helps you measure how long a stick is?", "a ruler", ["a spoon", "a crayon", "a cup"], "A ruler measures length."],
  ["A team builds a boat from foil. Teammates should…", "share ideas and take turns", ["grab all the foil", "not talk", "walk away"], "Engineers work together."],
  ["No design is perfect. This means we can…", "keep making it better", ["never use it", "never test it", "stop thinking"], "Designs can be improved.", true],
  ["Which question helps you test a paper airplane?", "How far does it fly?", ["What song is it?", "Is it Monday?", "Who is tallest?"], "Measure how well it works.", true],
  ["A shelter must keep out rain. Which design would work best?", "a roof that slopes so water runs off", ["a flat roof full of holes", "a roof of paper towels", "no roof at all"], "Water runs off a slope.", true],
  ["You want a straw that bends. Which material could you use?", "flexible plastic", ["a rock", "a metal pipe", "a brick"], "Flexible materials bend.", true],
  ["A bridge must hold a toy car. How can you test it?", "roll the car across and watch", ["blow on it", "look at the clock", "sing to it"], "Test it the way it will be used.", true],
  ["Why do engineers sketch ideas before building?", "to share and fix ideas before they build", ["to waste paper", "to hide ideas", "to be silly"], "A sketch is cheaper to change than a build.", true],
  ["Which is a tool a designer might use?", "a ruler and a pencil", ["a pillow and a blanket", "a swing and a slide", "a coat and a hat"], "Designers draw and measure.", true],
];

const PENNS_PLACES: Q[] = [
  ["The Appalachian Mountains cross Pennsylvania. Mountains are…", "high, tall landforms", ["flat, low land", "bodies of water", "kinds of clouds"], "Mountains rise high."],
  ["Lake Erie touches the northwest corner of Pennsylvania. A lake is…", "a body of water with land around it", ["a high mountain", "a desert", "a kind of cloud"], "A lake is water."],
  ["The Delaware River is on Pennsylvania's eastern edge. A river…", "flows across the land", ["stays on a mountain top", "never moves", "is made of sand"], "Rivers flow downhill."],
  ["The state capital, Harrisburg, sits beside the Susquehanna River. A river is a…", "body of water", ["landform made of rock", "kind of weather", "kind of tree"], "Rivers are water."],
  ["Pennsylvania's mountains have trees and streams. A stream is…", "a small river", ["a big ocean", "a hot desert", "a tall hill"], "Streams are narrow."],
  ["A valley is the low land between…", "hills or mountains", ["two clouds", "two oceans", "two roads in the sky"], "Valleys are low."],
  ["Which place has a lot of trees?", "a forest", ["a parking lot", "a desert", "a swimming pool"], "A forest has many trees."],
  ["Pennsylvania has hot summers and cold winters. This is how its…", "seasons feel", ["rocks feel", "rivers taste", "mountains sound"], "Weather changes with the seasons."],
  ["Pennsylvania has cities, towns and farms. These are different kinds of…", "communities", ["clouds", "mountains", "rocks"], "People live in communities."],
  ["Some people live on a farm. A farm is a place where people…", "grow crops and raise animals", ["only build ships", "only dig tunnels", "only fly planes"], "Farms make food."],
  ["Some people live in a city. A city has…", "many buildings and many people", ["no people", "only trees", "no roads"], "Cities are busy."],
  ["A park is a place people go to…", "play and enjoy nature", ["do nothing ever", "close the sky", "stop the wind"], "People value parks."],
  ["Many families in Pennsylvania go hiking in the woods. Why?", "they enjoy being in nature", ["trees give them pizza", "mountains give them toys", "rivers give them shoes"], "People enjoy nature."],
  ["Some people fish in Pennsylvania's streams and lakes. They value…", "the water and the fish", ["only the sand", "only the Moon", "only the road"], "People use and enjoy nature."],
  ["A garden is a place where people…", "grow plants they care about", ["stop plants growing", "build bridges", "dig for coal"], "People tend gardens."],
  ["A local park can be important because…", "neighbors can play and rest there", ["it has no use", "no one can go in", "it is made of glass"], "Places can matter to a community."],
  ["Which two places are very different?", "a mountain top and a river bank", ["two lakes", "two streams", "two ponds"], "One is high and dry, one is low and wet."],
  ["A hill in your town and a mountain are both…", "landforms", ["rivers", "clouds", "seasons"], "They are higher than the land around."],
  ["A place can be special to a person because of…", "the memories they have there", ["its price tag", "the color of its sky only", "nothing at all"], "Places can have meaning.", true],
  ["Why might one family love a river and another love a farm?", "people value different places", ["rivers and farms are the same", "nobody loves a place", "places have no meaning"], "People care about different places.", true],
  ["Which is a physical feature of a place?", "a mountain", ["a birthday", "a song", "a story"], "Physical features are land and water.", true],
  ["Rivers can be important for…", "water, fish and travel", ["only making noise", "only sleeping", "making mountains"], "People use rivers in many ways.", true],
  ["A town beside a river might use the river for…", "drinking water and fishing", ["growing mountains", "making snow", "stopping the Moon"], "Rivers give people water and food.", true],
  ["Which sentence tells about how a place looks?", "It has hills and a clear stream.", ["It is my sister's birthday.", "I like pizza.", "It rang at noon."], "Describe what you can see.", true],
  ["An Appalachian ridge is long and high, like…", "a wall of rock and trees", ["a flat table", "a puddle", "a bowl of water"], "Ridges are long, high lines of land.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "pa-g1-resources-and-recycling",
    title: "Resources & Recycling",
    emoji: "♻️",
    blurb: "How people get and use things from nature, and how to waste less.",
    parentNote:
      "Practices how people harvest, move and use natural resources (food, wood, water, fuels, sunlight and wind) and how to reduce, reuse and recycle, with simple questions about a local problem.",
    standards: ["3.4.K-2.A; 3.4.K-2.D; 3.5.K-2.D", "ways people harvest, move and use natural resources, investigating a local issue, and reducing, reusing and recycling"],
    items: RESOURCES,
  }),
  bankUnit({
    id: "pa-g1-design-it",
    title: "Design It, Test It",
    emoji: "📐",
    blurb: "Plan, build, test and improve a design, and choose the right material.",
    parentNote:
      "Practices the engineering design process in simple steps: naming a problem, planning, choosing materials for their properties, testing and improving, and working with a team.",
    standards: ["3.5.K-2.M; 3.5.K-2.T; 3.5.K-2.U; 3.5.K-2.V; 3.5.K-2.X", "the steps of engineering design, designs having requirements, designing in response to a need, choosing materials for their properties, and planning a task"],
    items: DESIGN_IT,
  }),
  bankUnit({
    id: "pa-g1-penns-places",
    title: "Places in Pennsylvania",
    emoji: "⛰️",
    blurb: "Mountains, rivers, lakes and farms, and why people care about them.",
    parentNote:
      "Practices describing how places differ (mountains, valleys, rivers, lakes, forests, farms and cities in Pennsylvania) and why different people and communities value them.",
    standards: ["3.4.K-2.B; 3.4.K-2.C", "how people and communities value nature in different ways, and how places differ in their physical characteristics and what they mean to people"],
    items: PENNS_PLACES,
  }),
];
/** Put the own units before the planned ones. */
export const FIRST = false;
