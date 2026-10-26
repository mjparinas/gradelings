import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Idaho Grade 5 social studies: the difference between reservations, state public lands and federal public lands
// (5.SS.4.7), how responsibilities are shared among national, state and tribal governments (5.SS.4.5, 5.SS.4.1), and
// Idaho's members of Congress (5.SS.4.8); and money choices: borrowing, saving and investing, taxes and what they fund,
// and tariffs and embargoes (5.SS.3.6, 5.SS.3.2). The colonies, the Revolution, the Constitution and westward expansion
// are practised with adopted units (see ../plan/social.ts).

const LANDS: Q[] = [
  ["About how much of Idaho's land is owned by the federal government?", "more than half", ["almost none", "about one tenth", "all of it"], "Most of Idaho's mountains and deserts are federal land."],
  ["National forests in Idaho are managed by the…", "US Forest Service", ["Idaho Legislature", "city councils", "school boards"], "It is part of the federal government."],
  ["Much of the sagebrush land in southern Idaho is federal land managed by the…", "Bureau of Land Management", ["State of Idaho", "city of Boise", "school districts"], "It is often called BLM land."],
  ["Craters of the Moon National Monument and Preserve is federal land cared for by the National Park Service and the…", "Bureau of Land Management", ["Boise City Council", "Idaho Supreme Court", "county fair"], "Two federal agencies share it."],
  ["Idaho's state endowment lands were given to the state at statehood to earn money for…", "public schools", ["private companies", "other states", "the president"], "Timber and grazing on the land earn money."],
  ["State parks, such as Bruneau Dunes State Park, are run by…", "the State of Idaho", ["the federal government", "a tribal council", "a private company"], "The state manages its own parks."],
  ["A reservation is land…", "reserved for a tribe, which governs it", ["owned by a city", "where no one lives", "that belongs to another country"], "Reservations were set by treaties and orders."],
  ["On a reservation, laws for tribal members are made mostly by…", "the tribal government", ["the mayor of Boise", "another state", "the school board"], "Tribes are sovereign."],
  ["Federal public lands belong to…", "all the people of the United States", ["one family", "the governor", "a single company"], "Every American shares them."],
  ["On many federal public lands, people may…", "hike, camp, hunt and fish, following the rules", ["build any house they want", "take whatever they like", "never visit"], "Public lands are open to the public."],
  ["Ranchers can get permits to graze cattle and sheep on…", "federal and state public lands", ["city parks", "school playgrounds", "airports"], "Permits set rules and fees."],
  ["The Frank Church-River of No Return Wilderness in central Idaho is…", "one of the largest wilderness areas in the lower 48 states", ["a big city", "a farm", "a shopping mall"], "There are no roads inside it."],
  ["Yellowstone National Park reaches a small corner of…", "eastern Idaho", ["northern Idaho", "the Treasure Valley", "the Panhandle"], "Most of the park is in a neighboring state."],
  ["In a federal system, power is shared among…", "national, state and tribal governments", ["only city governments", "one king", "private companies"], "Each government has its own responsibilities."],
  ["Which government prints money and makes treaties with other countries?", "the national government", ["the state government", "a city council", "a county"], "Some powers belong only to the national government."],
  ["Which government runs Idaho's public school system, with local school districts?", "the state government", ["the national government only", "a foreign country", "a private club"], "States are responsible for public schools."],
  ["Who makes and enforces laws for the whole United States?", "Congress makes them and the president enforces them", ["the governor of Idaho", "a tribal council", "a school board"], "That is the federal government."],
  ["Idaho's two US senators serve in…", "the US Senate in Washington, D.C.", ["the Idaho Legislature", "the Boise City Council", "the US Supreme Court"], "Every state has two senators."],
  ["Idaho sends how many members to the US House of Representatives?", "2", ["1", "10", "53"], "The number depends on population."],
  ["Who leads the executive branch of the United States?", "the President", ["the Speaker of the House", "the Chief Justice", "the governor of Idaho"], "The Vice President is next in line."],
  ["Why does it matter whether land is a reservation, state land or federal land?", "different governments make the rules for each", ["it doesn't matter at all", "all land has the same rules", "only cities make land rules"], "Ask who manages the land.", true],
  ["Why might a tribe and a federal agency work together on a river?", "both have responsibilities for the fish and land there", ["they want to drain it", "tribes have no say", "the river belongs to another country"], "Governments share some responsibilities.", true],
  ["Hunters who are tribal members may follow tribal hunting rules on a reservation because…", "tribes have sovereignty over their lands", ["there are no rules", "state laws are stricter everywhere", "the president said so that day"], "Tribal governments set rules on their lands.", true],
  ["Why does the federal government own so much land in Idaho?", "it kept large areas of mountains, forests and desert when the West was settled", ["Idaho sold all its land", "no one lives in Idaho", "it was a mistake on a map"], "Much western land was never homesteaded.", true],
  ["Why is selling timber from state endowment land important to Idaho families?", "the money helps pay for public schools", ["the money goes to other countries", "it makes the land federal", "it pays for private toys"], "Endowment land works for schools.", true],
];

const MONEY: Q[] = [
  ["People often borrow money to buy something big, like a…", "house or car", ["pack of gum", "pencil", "apple"], "Big things cost a lot."],
  ["When you borrow money, you usually pay back more because of…", "interest", ["coupons", "allowance", "tips"], "Interest is the cost of borrowing."],
  ["Before borrowing money, a careful person asks…", "can I pay it back on time?", ["what color is it?", "is it Friday?", "who has a dog?"], "Borrowing is a promise."],
  ["A credit card lets you…", "borrow money to pay later", ["get money for free", "never pay", "print money"], "You must pay the bank back."],
  ["Money in a savings account at a bank earns…", "interest", ["fines", "taxes", "coupons"], "The bank pays you for keeping it there."],
  ["Buying stock means owning a small part of a…", "company", ["school", "river", "park"], "Its value can go up or down."],
  ["Which is usually safest for saving money?", "a savings account", ["buying one company's stock", "a lottery ticket", "hiding it under a rug"], "Bank savings are insured."],
  ["Investing can grow money faster than saving, but it has more…", "risk", ["coins", "colors", "pages"], "You could lose money too."],
  ["A long-term financial goal is something like…", "paying for college", ["buying a snack today", "a movie tonight", "a toy this week"], "Long-term goals take years."],
  ["To reach a long-term goal, it helps to…", "save a little regularly", ["spend everything", "wait until the last day", "never plan"], "Small amounts add up."],
  ["Compound interest means you earn interest on…", "your savings and the interest already earned", ["only your first dollar", "nothing", "other people's money"], "Money grows faster over time."],
  ["Why might someone start saving for retirement when they are young?", "their money has more time to grow", ["it is required by school", "retirement is next week", "banks pay less later"], "Time helps savings grow."],
  ["A tax is money people pay to the…", "government", ["grocery store", "movie theater", "toy store"], "Taxes pay for public services."],
  ["Sales tax is added when you…", "buy things at a store", ["sleep", "walk in a park", "read a library book"], "It is a small part of the price."],
  ["Income tax is taken from…", "the money people earn at work", ["the money they find", "the books they read", "the food they grow"], "It comes out of a paycheck."],
  ["Property tax is paid by people who own…", "homes and land", ["bicycles", "pets", "books"], "It helps pay for local schools."],
  ["Much of the money for Idaho's public schools comes from…", "state and local taxes", ["bake sales only", "lemonade stands", "parking tickets"], "Taxes pay teachers and buildings."],
  ["Gas taxes in Idaho help pay for…", "roads and bridges", ["toys", "movies", "vacations"], "Drivers use the roads."],
  ["A public benefit that taxes pay for is…", "fire departments", ["your own toys", "private vacations", "movie popcorn"], "Public means for everyone."],
  ["The government collects income tax mostly through…", "paycheck deductions", ["piggy banks", "lemonade stands", "garage sales"], "Employers send it in.", true],
  ["You want to buy a $200 bike in 10 weeks. How much should you save each week?", "$20", ["$2", "$10", "$100"], "200 divided by 10."],
  ["You borrow $100 and pay $10 interest. How much do you pay back?", "$110", ["$90", "$100", "$10"], "Add the interest to the loan."],
  ["A savings account pays 5% a year on $100. After one year you have…", "$105", ["$100", "$95", "$150"], "5% of $100 is $5."],
  ["Which is a good reason to borrow money?", "to pay for college that leads to a good job", ["to buy candy every day", "to buy something you don't need", "to lend it to a stranger"], "Borrowing can be worth it for big goals."],
  ["Spreading savings among different investments is called…", "diversifying", ["borrowing", "spending", "taxing"], "Don't put all your eggs in one basket.", true],
  ["A 529 college savings plan helps families save for…", "college", ["vacations", "cars", "toys"], "Families can start when children are young.", true],
  ["A tax on goods brought in from another country is a…", "tariff", ["wage", "loan", "coupon"], "Tariffs make imported goods cost more."],
  ["An embargo is…", "a ban on trade with another country", ["a kind of bank account", "a sale at a store", "a type of loan"], "Countries use embargoes to pressure each other.", true],
  ["Why do people pay taxes even if they don't use every service?", "taxes pay for things that help everyone", ["taxes are a game", "taxes are optional", "taxes buy private things"], "Roads, schools and parks serve the whole community.", true],
  ["If you pay only the smallest amount on a credit card each month, you…", "pay more interest over time", ["pay less in total", "never owe anything", "earn interest"], "Paying in full avoids interest.", true],
];

export const SOCIAL_5: Unit[] = [
  bankUnit({
    id: "id-g5-public-lands",
    title: "Whose Land Is It?",
    emoji: "🌲",
    blurb: "Reservations, state lands and federal public lands",
    parentNote: "The difference between reservations, Idaho's state lands (state parks and the endowment lands that earn money for schools) and federal public lands (national forests, Bureau of Land Management land, Craters of the Moon and wilderness areas), which cover more than half of Idaho; how national, state and tribal governments share responsibilities in a federal system; and Idaho's members of Congress.",
    standards: ["5.SS.4.7; 5.SS.4.5; 5.SS.4.1; 5.SS.4.8", "reservations, state public lands and federal public lands, and the responsibilities of national, state and tribal governments"],
    items: LANDS,
  }),
  bankUnit({
    id: "id-g5-money-choices",
    title: "Money Choices",
    emoji: "🪙",
    blurb: "Borrowing, saving, investing, taxes and tariffs",
    parentNote: "Money choices and how taxes touch them: reasons to borrow and what interest costs, saving and investing and the risks of each, long-term goals, the taxes people pay (sales, income, property and gas taxes) and what they fund, and tariffs and embargoes between countries.",
    standards: ["5.SS.3.6; 5.SS.3.2", "how taxes affect personal finance, and tariffs, taxation and embargoes"],
    items: MONEY,
  }),
];
