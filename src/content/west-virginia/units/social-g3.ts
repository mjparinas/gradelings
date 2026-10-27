import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// West Virginia Grade 3 social studies: West Virginia's physical regions, communities and resources (SS.3.22), its nine
// travel regions (SS.3.23), how its occupations follow its resources (SS.3.10), the path from raw material to product
// (SS.3.9) and SMART529, the state's college savings plan (SS.3.11). The West Virginia Geological and Economic Survey
// names two main physical provinces (the Appalachian Plateau and the Valley and Ridge) and a small piece of the Blue
// Ridge; questions name only those, with the Allegheny Mountains as the plateau's high eastern edge.

const REGIONS: Q[] = [
  ["Most of West Virginia is part of the…", "Appalachian Plateau", ["Great Plains", "Coastal Plain"], "Rivers have cut it into steep hills and narrow valleys."],
  ["Eastern West Virginia has long mountain ridges with valleys between them. This region is the…", "Ridge and Valley", ["Great Plains", "Coastal Plain"], "The ridges run from northeast to southwest."],
  ["A small piece of the Blue Ridge Mountains reaches into West Virginia's…", "Eastern Panhandle", ["Northern Panhandle", "southern coalfields"], "It is near Harpers Ferry."],
  ["The Allegheny Mountains, with Spruce Knob, are the highest part of…", "the Appalachian Plateau", ["the Coastal Plain", "the Great Plains"], "They rise along the plateau's eastern edge."],
  ["Charleston, the capital, grew up along the…", "Kanawha River", ["Potomac River", "Cheat River"], "The Elk River joins the Kanawha there."],
  ["Huntington is a city on the…", "Ohio River", ["Greenbrier River", "Potomac River"], "It is in the western part of the state."],
  ["Morgantown, home of West Virginia University, is on the…", "Monongahela River", ["Kanawha River", "Ohio River"], "The river flows north into Pennsylvania."],
  ["Wheeling is a city in the…", "Northern Panhandle", ["Eastern Panhandle", "southern coalfields"], "It is on the Ohio River."],
  ["Martinsburg is a city in the…", "Eastern Panhandle", ["Northern Panhandle", "Ohio River valley"], "It is close to Maryland and Virginia."],
  ["Parkersburg grew where the Little Kanawha River meets the…", "Ohio River", ["New River", "Potomac River"], "River meeting places were good spots for towns."],
  ["Much of West Virginia's coal is mined in the…", "southern part of the state", ["Eastern Panhandle orchards", "middle of the Ohio River"], "The southern counties are called the coalfields."],
  ["Apple and peach orchards grow well in the…", "Eastern Panhandle", ["deep coal mines", "high spruce forests"], "Its valleys are lower, wider and warmer."],
  ["The Monongahela National Forest covers much of the…", "high mountains in the east", ["Ohio River shore", "Northern Panhandle"], "Forests there give timber and places to hike."],
  ["Why are many West Virginia towns built in narrow valleys?", "the land between the steep hills is flatter", ["mountaintops are warmer", "valleys never flood", "there is no water on hills"], "Roads, railroads and rivers follow the valleys."],
  ["West Virginia's tourism office divides the state into how many travel regions?", "nine", ["three", "fifty"], "Each region has its own things to see."],
  ["Which of these is one of West Virginia's travel regions?", "Mountain Lakes", ["Desert Sands", "Coral Coast"], "It is named for lakes in the middle of the state."],
  ["The Hatfield-McCoy Mountains region is named for two families famous for a…", "long feud", ["railroad", "flood"], "Their feud is part of the region's history."],
  ["The New River-Greenbrier Valley region includes…", "the New River Gorge", ["Wheeling", "Harpers Ferry"], "The gorge is now a national park."],
  ["Seneca Rocks and Spruce Knob are in the… travel region.", "Potomac Highlands", ["Metro Valley", "Northern Panhandle"], "Both are in Pendleton County."],
  ["Mountaineer Country, in north-central West Virginia, includes…", "Morgantown", ["Charleston", "Martinsburg"], "West Virginia University is there."],
  ["The Metro Valley travel region includes Charleston and…", "Huntington", ["Wheeling", "Elkins"], "It is the state's most populated area."],
  ["The Mid-Ohio Valley travel region includes…", "Parkersburg", ["Beckley", "Martinsburg"], "It is along the middle of the Ohio River."],
  ["The Eastern Panhandle travel region includes…", "Harpers Ferry", ["Huntington", "Morgantown"], "It sits where the Potomac and Shenandoah rivers meet."],
  ["The Northern Panhandle travel region includes…", "Wheeling", ["Parkersburg", "Lewisburg"], "It is the state's thin northern tip."],
  ["Which county is in the Eastern Panhandle?", "Jefferson County", ["Kanawha County", "Cabell County"], "Harpers Ferry is in this county."],
  ["Which county is in the Metro Valley region?", "Kanawha County", ["Jefferson County", "Ohio County"], "Charleston is its county seat."],
  ["Which county is in the Northern Panhandle?", "Ohio County", ["Kanawha County", "Berkeley County"], "Wheeling is its county seat."],
  ["Which county is in the Mountaineer Country region?", "Monongalia County", ["Cabell County", "Jefferson County"], "Morgantown is its county seat."],
  ["Why does the Mountain Lakes region have big lakes?", "dams were built across mountain rivers", ["glaciers dug them", "the ocean left them", "volcanoes made them"], "The dams hold back water and help control floods.", true],
  ["Why do the Allegheny Mountains get more snow than the Ohio River valley?", "they are higher and colder", ["they are closer to the sun", "rivers make snow", "they are farther south"], "Air cools as it rises over the mountains.", true],
  ["Why did glass factories grow along the Ohio River?", "sand, natural gas and river transport were close by", ["the river is salty", "there were no other jobs anywhere", "glass floats"], "Glassmaking needs sand and lots of heat.", true],
];

const AT_WORK: Q[] = [
  ["Coal mining jobs are found where there is…", "coal under the ground", ["a big ocean", "a desert"], "Jobs follow resources."],
  ["Workers who drill wells for natural gas work in the…", "gas industry", ["fishing industry", "space industry"], "Natural gas lies in deep rock layers."],
  ["Many jobs in West Virginia's forests are in…", "timber and lumber", ["coral diving", "cotton picking"], "Forests cover most of the state."],
  ["Chemical plants grew in the Kanawha Valley because it had…", "salt, gas, coal and a river for shipping", ["gold mines", "ocean ports", "deserts"], "Factories need raw materials and transport."],
  ["Hospitals in West Virginia employ many…", "nurses and doctors", ["pilots", "sailors"], "Health care is one of the biggest kinds of work."],
  ["Rafting guides on the New River work in the…", "tourism industry", ["coal industry", "steel industry"], "Visitors pay for trips and fun."],
  ["Ski resorts like Snowshoe need workers in…", "winter", ["only summer", "never"], "Snow brings visitors."],
  ["Many farms in Hardy and Grant counties raise…", "chickens and turkeys", ["penguins", "camels"], "Poultry is a big farm product in West Virginia."],
  ["In the example in West Virginia's standards, West Virginia has coal mining and Pennsylvania has…", "steel mills", ["gold mines", "rice farms"], "Different places have different resources."],
  ["A raw material is…", "something from nature used to make goods", ["a finished toy", "a store"], "Wood, sand and coal are raw materials."],
  ["Put in order: a tree is cut, the log goes to a sawmill, then the boards become…", "a table", ["a seed", "a tree"], "Raw materials become products step by step."],
  ["Glass marbles are made from melted…", "sand", ["coal dust", "leaves"], "Sand is heated until it melts."],
  ["Coal is burned at a power plant to make…", "electricity", ["water", "lumber"], "Electricity travels on wires to homes."],
  ["Apples picked in an orchard can be made into…", "applesauce", ["glass", "steel"], "A factory cooks and packs them."],
  ["When there is not enough of something for everyone who wants it, that is…", "scarcity", ["a surplus", "a holiday"], "People must make choices."],
  ["If many people want a product and there is little of it, the price usually…", "goes up", ["goes down", "becomes free"], "That is supply and demand."],
  ["If stores have more of a product than people want, the price usually…", "goes down", ["goes up", "doubles"], "Stores lower prices to sell extra goods."],
  ["People who make goods or give services are…", "producers", ["consumers", "voters"], "Farmers and miners are producers."],
  ["People who buy goods and services are…", "consumers", ["producers", "miners"], "Shoppers are consumers."],
  ["SMART529 is West Virginia's plan to help families save money for…", "college or job training after high school", ["a new car", "a vacation"], "It is an education savings plan."],
  ["Saving a little money every month for school after high school helps because…", "the money adds up over time", ["money disappears in a bank", "school is always free", "it makes prices go up"], "Small savings grow."],
  ["Training after high school can help a person…", "get a job that needs special skills", ["stop learning", "skip work"], "Many jobs need training."],
  ["A bank account where money grows with interest is a…", "savings account", ["shopping cart", "tax"], "Interest is extra money the bank pays you."],
  ["A budget is a plan for…", "spending and saving money", ["a vacation route", "a garden"], "It lists money in and money out."],
  ["Why might fewer coal jobs mean new kinds of jobs in a town?", "people find other work, like tourism or health care", ["no one ever works again", "coal grows back", "the town moves away"], "Economies change over time.", true],
  ["Why do businesses that ship heavy goods often build near rivers or railroads?", "it is cheaper to move heavy goods that way", ["rivers make goods lighter", "railroads are free", "trucks cannot drive in valleys"], "Transport matters for business.", true],
  ["Why might a family start saving for college when a child is young?", "there is more time for savings to grow", ["prices go down later", "college is cheaper now", "banks close later"], "Time helps savings grow.", true],
];

export const SOCIAL_3: Unit[] = [
  bankUnit({
    id: "wv-g3-wv-regions",
    title: "West Virginia's Regions",
    emoji: "🗺️",
    blurb: "Plateau, ridges and valleys, cities and the nine travel regions",
    parentNote:
      "West Virginia's physical regions (the Appalachian Plateau with the Allegheny Mountains, the Ridge and Valley, and a corner of the Blue Ridge), its major communities and the resources around them, and the nine travel regions from the Northern Panhandle to the Hatfield-McCoy Mountains, with a county in each.",
    standards: ["SS.3.22; SS.3.23", "West Virginia's physical regions, major communities and natural resources, and its nine tourist regions and their counties"],
    items: REGIONS,
  }),
  bankUnit({
    id: "wv-g3-wv-at-work",
    title: "West Virginia at Work",
    emoji: "⛏️",
    blurb: "Jobs, resources, products and saving with SMART529",
    parentNote:
      "How West Virginia's work follows its resources (coal, natural gas, timber, chemicals, poultry, tourism and health care), the path from raw material to finished product, supply, demand and scarcity, producers and consumers, and saving for college or training with SMART529.",
    standards: ["SS.3.10; SS.3.9; SS.3.8; SS.3.11", "occupations and the resources of a region, the path from raw material to product, supply, demand and scarcity, and SMART529 and other college savings plans"],
    items: AT_WORK,
  }),
];
