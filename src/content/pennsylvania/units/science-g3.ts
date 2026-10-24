import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Pennsylvania's own Grade 3 science units (`pa-` ids), for the STEELS standards no shared unit practises: tools,
// machines and how technology helps and harms (3.5.3-5.A, B, C, D, G, K, L, W), renewable and nonrenewable resources and
// sustainable choices (3.4.3-5.A, F; 3.5.3-5.E, F), and the habitats of Pennsylvania's own plants and animals (3.1.3.G;
// 3.4.3-5.A).

const TOOLS_AND_TECHNOLOGY: Q[] = [
  ["A technology is something people make to…", "meet a need or solve a problem", ["grow in a forest", "fall from a cloud", "live in a pond"], "Technology is human-made."],
  ["Which is a technology?", "a bicycle", ["a pebble", "a cloud", "a puddle"], "People design bicycles."],
  ["A simple machine such as a lever or a ramp helps people…", "do work with less effort", ["make rain", "see in the dark", "stop time"], "Machines extend what people can do."],
  ["A wheelbarrow helps a gardener…", "carry a heavy load", ["see through walls", "fly", "stay dry"], "It extends human carrying."],
  ["A pair of tongs helps people…", "hold hot things", ["see far", "hear better", "learn fast"], "Tools extend holding."],
  ["A pulley helps people…", "lift things", ["paint things", "cool things", "hear things"], "A rope and wheel make lifting easier."],
  ["A calculator helps people…", "compute with numbers", ["lift boxes", "dig holes", "carry water"], "It extends our ability to compute."],
  ["A drill makes holes. This is an example of a tool that helps people…", "separate or pierce materials", ["tell time", "keep warm", "see far"], "Tools can cut, drill and fasten."],
  ["A screw and a nail are both used for…", "fastening things together", ["cooling food", "telling the time", "growing plants"], "Fasteners hold materials."],
  ["Which shows a tool used to measure?", "a ruler", ["a hammer", "a broom", "a rope"], "A ruler measures length."],
  ["What would your day be like without electric lights?", "darker in the evening", ["much brighter at night", "exactly the same", "colder at noon"], "Technology changes daily life."],
  ["Without refrigerators, a family would have to…", "buy and cook fresh food often", ["never eat", "keep ice cream forever", "stop using water"], "Refrigeration keeps food fresh."],
  ["A helpful effect of cars is that they…", "move people and goods quickly", ["clean the air", "grow trees", "make rain"], "Cars carry people."],
  ["A harmful effect of many cars is…", "air pollution", ["cooler weather", "cleaner rivers", "quieter cities"], "Exhaust makes the air dirty."],
  ["A new phone is shiny but costs a lot. Comparing its good and bad points is looking at…", "trade-offs", ["weather", "habitats", "fossils"], "Every product has pluses and minuses."],
  ["When you follow directions to build a model, you…", "do the steps in order", ["skip the steps", "do the steps backwards", "ignore the plan"], "Follow the directions."],
  ["Which material is best for a cooking pot handle that must not get hot?", "wood", ["copper", "iron", "aluminum foil"], "Wood is a poor conductor of heat."],
  ["A good rope for a swing should be…", "strong and flexible", ["brittle and thin", "wet and slippery", "weak and short"], "Properties must fit the job."],
  ["Which material is the best choice for a window?", "clear glass", ["wood", "brick", "cardboard"], "A window must let light through."],
  ["Which words describe the properties of a rubber band?", "stretchy and flexible", ["hard and brittle", "heavy and rigid", "clear and hard"], "Properties show what a material is good for.", true],
  ["A picture of a bike with a red circle and line through it means…", "bikes are not allowed", ["bikes are free", "bikes are for sale", "bikes are fast"], "Symbols communicate key ideas.", true],
  ["Which is the best tool for judging which cart design rolls faster?", "a timer and a ruler", ["a mirror", "a feather", "a pillow"], "Measure distance and time.", true],
  ["To pick the best tool for a job, you should…", "think about what the job needs", ["pick the shiniest tool", "pick the biggest tool", "pick any tool"], "Judge technologies for the task.", true],
  ["Why do people put a sign with a picture on a recycling bin?", "so everyone can understand it quickly", ["to make the bin heavier", "to hide the bin", "to stop recycling"], "Symbols communicate quickly.", true],
  ["A tool that makes work easier for people is…", "a technology", ["a fossil", "a habitat", "a season"], "Tools are technology.", true],
  ["Which pair is a natural thing and a human-made thing?", "a river and a bridge", ["a bridge and a road", "a tree and a rock", "a lake and a pond"], "Rivers are natural; bridges are made.", true],
];

const RESOURCES_AND_SUSTAINABILITY: Q[] = [
  ["A renewable resource is one that…", "can be replaced in a short time", ["lasts for millions of years", "never exists", "is only found on the Moon"], "Sun, wind and replanted trees are renewable."],
  ["A nonrenewable resource is one that…", "cannot be replaced quickly once it is used up", ["grows back every day", "falls as rain", "is made new each year"], "Coal and oil take millions of years to form."],
  ["Which is a renewable resource?", "sunlight", ["coal", "oil", "natural gas"], "The Sun keeps shining."],
  ["Which is a nonrenewable resource?", "coal", ["wind", "sunlight", "flowing water"], "Coal cannot be replaced quickly."],
  ["Wind turbines use…", "moving air to make electricity", ["coal to make heat", "oil to make paper", "sand to make glass"], "Wind is renewable."],
  ["Solar panels make electricity from…", "sunlight", ["coal", "oil", "wind only"], "Panels capture the Sun's energy."],
  ["Farmers use soil, water and sunlight to…", "grow food", ["make coal", "make oil", "make rocks"], "Food needs those resources."],
  ["What is one way people change the environment?", "building roads and towns", ["making the Moon bigger", "moving the Sun", "stopping the wind"], "People build and farm."],
  ["How do trees help the environment?", "they give shade, food and homes to animals", ["they make rocks", "they use up all the water", "they stop all rain"], "Trees do many jobs."],
  ["How can a forest change when many trees are cut down?", "animals lose their homes", ["more animals move in at once", "the air gets cleaner right away", "the soil becomes stronger"], "Animals need habitats."],
  ["A pond fills with trash. The living things in it may…", "get sick or die", ["grow faster", "learn to read", "turn into birds"], "The environment affects living things."],
  ["Which choice helps reduce waste?", "refilling a water bottle", ["buying a new bottle each time", "throwing paper outside", "using many bags a day"], "Reuse cuts waste."],
  ["Recycling paper saves…", "trees and energy", ["sand", "snow", "salt"], "Recycled paper means fewer trees cut."],
  ["Turning off lights saves…", "electricity", ["trees", "fish", "rain"], "Less energy used."],
  ["Which of these is a good habit for protecting water?", "do not pour paint or oil down a drain", ["wash the dog in a stream", "throw trash in a river", "leave a tap running"], "Keep pollution out of water."],
  ["A town makes a rule that people must not dump trash in a stream. This helps…", "keep the water clean for living things", ["make the stream disappear", "hide the stream", "make the trash heavy"], "Rules can protect the environment."],
  ["A person can affect the environment by…", "the choices they make every day", ["only by sleeping", "only by reading", "only by singing"], "Our actions add up."],
  ["Planting a tree is an action that…", "can help the environment over time", ["always hurts the soil", "always dries up streams", "has no effect"], "Trees take in carbon dioxide and give shade.", true],
  ["Burning coal makes electricity but also…", "puts smoke and gases into the air", ["cleans the air", "makes new trees", "makes rain"], "Fuels have trade-offs.", true],
  ["Why do many communities add wind and solar power?", "they use renewable resources", ["they use up more coal", "they need no equipment", "they make more smoke"], "Renewables can be used again.", true],
  ["Which is a good question for a class study of litter at school?", "How much litter do we find each week?", ["What is the weather on Mars?", "How tall is the Moon?", "What color is the sky on Venus?"], "Collect data about a local issue.", true],
  ["A class counts bottles in the trash for a week. What could they display the data in?", "a table or a bar graph", ["a poem", "a song", "a recipe"], "Display data to see patterns.", true],
  ["Which is a way to be sustainable?", "use resources so they will still be there for the future", ["use as much as possible now", "waste water", "throw away working things"], "Sustainable means lasting.", true],
  ["Which one is better for a school lunch with less trash?", "reusable containers", ["many small plastic bags", "single-use wrappers for each item", "a new bag each day"], "Reusable items make less waste.", true],
  ["Dirty air and dirty water show that people's actions can…", "harm the environment", ["only help the environment", "never matter", "make the Sun bigger"], "Actions have effects.", true],
];

const PENNS_WILDLIFE: Q[] = [
  ["White-tailed deer eat leaves, twigs and grasses. They live where there are…", "woods and fields with plants to eat", ["only frozen ponds", "only bare rock", "only deserts"], "A habitat must have food."],
  ["The ruffed grouse is Pennsylvania's state bird. It lives mostly in…", "forests", ["oceans", "deserts", "caves of ice"], "It nests on the forest floor."],
  ["Brook trout need cold, clean, flowing water. A good home for them is…", "a shady mountain stream", ["a hot, muddy puddle", "a dry riverbed", "a swimming pool"], "Cold water holds more oxygen."],
  ["Eastern hemlock, Pennsylvania's state tree, grows well in…", "cool, shady, moist woods", ["hot, dry deserts", "salt marshes", "the middle of a field in full sun"], "Hemlocks like shade."],
  ["Mountain laurel grows under forest trees. It is a…", "shrub with clusters of flowers", ["fish", "bird", "rock"], "It is a flowering shrub."],
  ["A firefly, Pennsylvania's state insect, flashes light. Fireflies often live near…", "meadows and woods with damp ground", ["hot sand", "ice fields", "city rooftops only"], "Fireflies like damp, grassy places."],
  ["The eastern hellbender is Pennsylvania's state amphibian. It lives in…", "clean, fast, rocky streams", ["dry deserts", "mud puddles in town", "tree tops"], "Hellbenders hide under flat rocks."],
  ["An amphibian lives part of its life in water and part on land. A salamander is…", "an amphibian", ["a fish", "a bird", "an insect"], "Amphibians have thin, moist skin."],
  ["If a stream becomes too warm, brook trout may…", "not survive there", ["grow bigger", "turn into frogs", "move into trees"], "Trout need cold water."],
  ["If a forest is cut down, a ruffed grouse may…", "lose its nesting place and food", ["find more nests", "turn into a fish", "grow wings of metal"], "Habitat loss hurts animals."],
  ["Some trees lose their leaves in fall. Deer then eat…", "twigs, buds and acorns", ["only fish", "only leaves from the Moon", "only sand"], "They find other foods."],
  ["Some animals in Pennsylvania are active at night, like…", "owls and fireflies", ["sunflowers", "trout only", "tree bark"], "Night animals come out after dark."],
  ["An animal's habitat must provide food, water, shelter and…", "space", ["a television", "a ticket", "a map"], "Living things need room."],
  ["A pond, a forest and a meadow are different…", "habitats", ["seasons", "tools", "fossils"], "Each habitat holds different life."],
  ["An animal that is well suited to its habitat is…", "more likely to survive", ["more likely to disappear", "never hungry", "always the largest"], "Suited traits help survival."],
  ["A deer's brown fur helps it…", "blend in with the woods", ["glow at night", "swim underwater", "fly"], "Camouflage helps it hide.", true],
  ["Why do hellbenders live under rocks in clean streams?", "the rocks give shelter and the clean water has oxygen", ["rocks are food", "dirty water is best", "streams have no animals"], "A habitat meets needs.", true],
  ["If runoff makes a stream muddy, what may happen to animals that need clear water?", "some may leave or die", ["they all grow faster", "they all turn into birds", "nothing at all"], "Pollution changes habitats.", true],
  ["Why do some animals survive well in Pennsylvania's winters and others do not?", "their traits fit the cold or they can leave", ["winter is always warm", "all animals love cold", "winter has no effect"], "Traits and behavior matter.", true],
  ["A forest has many layers: trees, shrubs and plants on the ground. This gives animals…", "many different places to live", ["only one place to live", "no place to live", "a place only for fish"], "Variety makes habitats.", true],
  ["Why does it help a deer to live near both woods and fields?", "it can find food and shelter in each", ["fields have fish", "woods are made of glass", "it likes the noise"], "Different parts of a habitat meet different needs.", true],
  ["A shrew and a bear live in the same forest. They are…", "different kinds of animals sharing a habitat", ["the same animal", "plants", "rocks"], "Many species share habitats.", true],
  ["Which sentence is an argument supported by evidence?", "Trout need cold water because they were found only in cold streams.", ["Trout are the best because I like them.", "Trout live anywhere.", "Trout are made of paper."], "Evidence supports a claim.", true],
  ["Why might a hemlock forest stay cooler than an open field?", "the thick branches make shade", ["the trees are made of ice", "the field has no sun", "the hemlocks make snow"], "Shade lowers temperature.", true],
  ["When a stream's banks have plants, the stream often stays…", "cooler and cleaner", ["hotter and muddier", "dry", "frozen all summer"], "Plants shade and hold soil.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "pa-g3-tools-and-technology",
    title: "Tools & Technology",
    emoji: "🛠️",
    blurb: "Machines that extend what people can do, and their trade-offs.",
    parentNote:
      "Practices how tools and simple machines extend human abilities (lifting, holding, fastening, computing), choosing the right tool or material for a job, symbols that carry directions, and the helpful and harmful effects of technology.",
    standards: ["3.5.3-5.A; 3.5.3-5.B; 3.5.3-5.C; 3.5.3-5.D; 3.5.3-5.G; 3.5.3-5.K; 3.5.3-5.L; 3.5.3-5.W", "using symbols to communicate, weighing trade-offs, following directions, how daily life would differ without technology, helpful and harmful effects, judging the best technology for a task, how tools extend human abilities, and the properties of materials"],
    items: TOOLS_AND_TECHNOLOGY,
  }),
  bankUnit({
    id: "pa-g3-resources-and-sustainability",
    title: "Resources & Our Choices",
    emoji: "🌿",
    blurb: "Renewable and nonrenewable resources, and how people change the environment.",
    parentNote:
      "Practices telling renewable resources (sunlight, wind, replanted trees) from nonrenewable ones (coal, oil, natural gas), how living things and the environment affect each other, and everyday choices that protect water, air and habitats.",
    standards: ["3.4.3-5.A; 3.4.3-5.C; 3.4.3-5.F; 3.5.3-5.E; 3.5.3-5.F", "how living things and their environment affect each other, collecting and displaying data about a local issue, how people depend on and change the environment, responsible use of resources, and renewable and nonrenewable resources"],
    items: RESOURCES_AND_SUSTAINABILITY,
  }),
  bankUnit({
    id: "pa-g3-penns-wildlife",
    title: "Pennsylvania Wildlife & Habitats",
    emoji: "🦌",
    blurb: "Deer, grouse, trout, hellbenders and the places they live.",
    parentNote:
      "Practices how animals and plants survive in their habitats through Pennsylvania's own state plants and animals (white-tailed deer, ruffed grouse, brook trout, eastern hellbender, firefly, eastern hemlock and mountain laurel), and how changes to a habitat affect them.",
    standards: ["3.1.3.G; 3.1.3.H; 3.4.3-5.A", "how well different organisms survive in a habitat, how changes to the environment affect the plants and animals that live there, and how living things and their environment affect each other"],
    items: PENNS_WILDLIFE,
  }),
];
/** Put the own units before the planned ones. */
export const FIRST = false;
