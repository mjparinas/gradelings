import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Montana Grade 5 social studies: treaties and other documents that shaped the Tribal Nations of Montana and their
// sovereignty, American Indian perspectives on them, and which government does what (SS.H.5.5, SS.H.5.4, SS.CG.5.3);
// and money, saving, borrowing and interest, and choosing between wants and needs (SS.E.5.4, SS.E.5.6, SS.E.5.1).

const TREATIES: Q[] = [
  ["A treaty is…", "a formal agreement between nations", ["a kind of store", "a law one town makes"], "The United States made treaties with Tribal Nations."],
  ["The United States made treaties with Tribal Nations because they were…", "sovereign nations", ["parts of one state", "private clubs"], "Nations make treaties with other nations."],
  ["The US Constitution says treaties are part of the…", "supreme law of the land", ["state laws only", "school rules"], "Article VI says so."],
  ["In many treaties, Tribal Nations gave up land but kept certain rights, such as…", "hunting and fishing in their usual places", ["running the US Army", "printing money"], "These are called reserved rights."],
  ["The 1855 Hellgate Treaty was signed by the Salish, Pend d'Oreille and…", "Kootenai", ["Crow", "Sioux"], "It created the Flathead Reservation."],
  ["The Hellgate Treaty let the Salish stay in the Bitterroot Valley until the government studied it, but in 1891 they were…", "forced to move to the Flathead Reservation", ["given the whole state", "asked to move to the ocean"], "Chief Charlo led his people north."],
  ["The 1855 Lame Bull Treaty set aside a large common hunting ground and was signed by the…", "Blackfeet and Gros Ventre, with other Nations", ["Crow and Northern Cheyenne only", "Chippewa and Cree only"], "It was signed near the mouth of the Judith River."],
  ["The 1851 Fort Laramie Treaty set out the lands of the Crow and other Plains Nations and promised…", "yearly goods and peace along the trails", ["new states for each Nation", "railroads for every family"], "Many promises were later broken."],
  ["Many treaty councils were hard to understand fairly because…", "translations between languages were often poor", ["everyone spoke the same language", "no one wrote anything down"], "Words like 'own' meant different things."],
  ["Why do many Tribal Nations see treaties as still important today?", "they are agreements that protect their rights and land", ["they expired long ago", "they were only suggestions"], "Treaties are still the law."],
  ["The trust responsibility means the United States has promised to…", "protect Tribal lands, resources and rights", ["take all Tribal land", "run tribal councils"], "It comes from treaties and laws."],
  ["Which government runs the schools in a Montana town?", "the local school district", ["the US Congress", "a foreign country"], "Voters elect the school board."],
  ["Which government makes laws for the whole country?", "the national government", ["the city council", "the county"], "Congress meets in Washington, D.C."],
  ["Which government issues Montana driver's licenses?", "the state government", ["the national government", "the school board"], "States handle licenses."],
  ["Who makes laws for a Tribal Nation's reservation?", "the Nation's own government", ["the mayor of Helena", "the governor of another state"], "Tribal Nations are sovereign."],
  ["Montana's Indian Education for All law exists because the state constitution says Montana will…", "keep and teach the cultural heritage of American Indians", ["close tribal schools", "teach only one history"], "Every Montana student learns about the Tribal Nations."],
  ["Why might a Tribal elder and a government agent describe the same treaty differently?", "they had different understandings and goals", ["one of them did not exist", "treaties have only one meaning"], "Perspective matters.", true],
  ["The Dawes Act of 1887 was a law that hurt Tribal sovereignty because it…", "broke up land Nations held in common", ["gave Nations more land", "created tribal colleges"], "Much land passed to settlers.", true],
  ["The Fort Laramie Treaty of 1868 promised the Crow a reservation, but later laws…", "made it much smaller", ["made it ten times bigger", "moved it to the ocean"], "Land was taken by later acts of Congress.", true],
  ["An executive order created some reservations, like the Northern Cheyenne Reservation in 1884. An executive order comes from the…", "President", ["Supreme Court", "governor of Montana"], "It is a rule from the head of the executive branch.", true],
  ["Why do historians use Tribal oral histories alongside written treaties?", "the written words don't tell how Nations understood the agreement", ["oral histories are always shorter", "written treaties were never signed"], "Many voices give a fuller history.", true],
  ["The Indian Citizenship Act of 1924 made American Indians US citizens. Did they stop being citizens of their Nations?", "no, they are citizens of both", ["yes, they lost their Nations", "only children kept both"], "People can belong to a Tribal Nation and the United States.", true],
  ["Federal, state and tribal governments signing an agreement on water rights is an example of…", "governments working together", ["a war", "one government ruling all"], "Montana has signed water compacts with several Tribal Nations.", true],
  ["A reserved right means the Nation…", "kept that right and never gave it away", ["got the right from the state in 2020", "has to ask the city each time"], "Treaties list rights Nations kept.", true],
  ["Why did the United States want treaties with Tribal Nations in the 1850s?", "to open land and routes for settlers and railroads", ["to give Nations more land", "to start a war in Europe"], "Settlers and railroads were moving west.", true],
];

const MONEY: Q[] = [
  ["Money makes trading easier because…", "everyone accepts it for goods and services", ["it is heavy", "you can eat it"], "Before money, people traded goods."],
  ["Trading goods without money is called…", "barter", ["banking", "taxing"], "Two fur traders swapping goods are bartering."],
  ["Money that you keep in a bank to use later is called…", "savings", ["a loan", "a tax"], "Banks keep savings safe."],
  ["When you borrow money, you usually have to pay it back with…", "interest", ["a smile", "nothing extra"], "Interest is the cost of borrowing."],
  ["When you save money in a bank account, the bank pays you…", "interest", ["a fine", "nothing ever"], "The bank uses your money and pays you for it."],
  ["If interest rates go up, borrowing money becomes…", "more expensive", ["free", "cheaper"], "You pay more to borrow."],
  ["If interest rates go up, saving money becomes…", "more rewarding", ["pointless", "against the law"], "Savers earn more."],
  ["A need is something you must have to live, like…", "food and shelter", ["a video game", "a new bike"], "Wants are nice but not needed."],
  ["A want is something you would like but can live without, like…", "a new toy", ["water", "warm clothes in winter"], "Needs come first."],
  ["A budget is a plan for…", "how to spend and save money", ["a vacation route", "a school play"], "Budgets help people make choices."],
  ["Giving up one thing to get another is called a…", "trade-off", ["gift", "loan"], "Every choice has a trade-off."],
  ["The thing you give up when you choose is the…", "opportunity cost", ["sales tax", "interest rate"], "It is the next best choice you didn't make."],
  ["If you put $100 in savings that earns 5% interest a year, how much interest do you earn in one year?", "$5", ["$50", "$105"], "5% of $100 is $5."],
  ["If you borrow $200 at 10% interest for one year, how much do you pay back in all?", "$220", ["$210", "$200"], "Interest is $20, plus the $200 you borrowed."],
  ["Prices printed on goods tell buyers…", "how much money they must give", ["how old the goods are", "who made them"], "Money measures value."],
  ["A debit card takes money…", "straight from your bank account", ["from a loan you repay later", "from nowhere"], "You can only spend what you have."],
  ["A credit card lets you…", "borrow money you must pay back", ["get free money", "save without a bank"], "Unpaid balances grow with interest."],
  ["Kai wants a $60 skateboard and saves $10 a week. How many weeks will it take?", "6", ["10", "60"], "60 ÷ 10 = 6."],
  ["Why do people sometimes borrow money to buy a house or a tractor?", "they can use it now and pay over many years", ["borrowing costs nothing", "banks give houses away"], "Big purchases are often paid over time.", true],
  ["Why might a family choose to wait and save instead of buying now with a loan?", "to avoid paying interest", ["prices always fall", "saving is not allowed"], "Interest makes things cost more.", true],
  ["When interest rates are low, many businesses…", "borrow to build and grow", ["close all their stores", "stop paying workers"], "Cheap loans encourage spending.", true],
  ["Why might paying a credit card late cost more?", "interest and late fees are added", ["the card company sends a gift", "the price goes down"], "Paying on time saves money.", true],
  ["Choosing to pay rent before buying a new phone shows…", "putting needs before wants", ["a bad choice", "barter"], "Shelter is a need.", true],
  ["A rancher chooses to buy feed instead of a new truck. What is the opportunity cost?", "the new truck", ["the feed", "the ranch"], "It is what she gave up.", true],
  ["Why is it wise to compare interest rates at different banks?", "to pay less when borrowing or earn more when saving", ["all banks charge the same", "rates never matter"], "A small rate difference adds up.", true],
];

export const SOCIAL_5: Unit[] = [
  bankUnit({
    id: "mt-g5-treaties",
    title: "Treaties & Sovereignty",
    emoji: "📜",
    blurb: "Treaties with Montana's Tribal Nations, and who governs what",
    parentNote:
      "What treaties are and why the United States made them with Tribal Nations, the 1851, 1855 and 1868 treaties in Montana, reserved rights and the trust responsibility, American Indian perspectives on these agreements, and which jobs belong to local, state, tribal and national governments.",
    standards: ["SS.H.5.5; SS.H.5.4; SS.CG.5.3", "historical documents and their impact on Tribal Nations and their sovereignty, American Indian perspectives, and the responsibilities of each government"],
    items: TREATIES,
  }),
  bankUnit({
    id: "mt-g5-money",
    title: "Money, Saving & Interest",
    emoji: "💰",
    blurb: "Why we use money, and how interest works",
    parentNote:
      "The role of money in trade (and barter before it), saving, borrowing and interest, how interest rates change choices, budgets, needs and wants, trade-offs and opportunity cost, with a few simple interest calculations.",
    standards: ["SS.E.5.4; SS.E.5.6; SS.E.5.1", "the role of money, how interest rates affect choices, and choosing between wants and needs"],
    items: MONEY,
  }),
];
