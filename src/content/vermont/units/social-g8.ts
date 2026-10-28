import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Vermont Grade 8 social studies, civics and economics in action: how Vermonters govern themselves and change laws, from
// town meeting and the citizen legislature to the courts and amendments to the state constitution (D2.Civ.2.6-8,
// D2.Civ.5.6-8, D2.Civ.12.6-8), how state policies answer public problems such as land use, recycling and school
// funding (D2.Civ.13.6-8, D2.Eco.8.6-8), and Vermont's economy of farms, co-ops and tourism (D2.Eco.1.6-8,
// D2.Eco.14.6-8). National government, rights and the economy are practised with adopted units (see ../plan/social.ts).

const IN_ACTION: Q[] = [
  ["Vermont's General Assembly is called a citizen legislature because its members…", "work only part of the year and have other jobs", ["are chosen by lottery", "are all teachers", "never meet in person"], "Many lawmakers are farmers, business owners or retirees."],
  ["On Town Meeting Day, voters in many towns debate the budget out loud and then vote. This is an example of…", "direct democracy", ["a monarchy", "a dictatorship", "a court trial"], "Citizens decide, not only their representatives."],
  ["Some Vermont towns vote on their budgets by paper ballot at the polls instead of at a floor meeting. This is called voting by…", "Australian ballot", ["show of hands", "coin toss", "phone poll"], "The ballot is secret."],
  ["Vermont sends how many members to the US House of Representatives?", "one", ["two", "ten", "fifty"], "The number of House seats depends on population."],
  ["Like every state, Vermont sends how many senators to the US Senate?", "two", ["one", "four", "ten"], "Each state has two, whatever its size."],
  ["Amendments to Vermont's constitution can be proposed by the state Senate only once every…", "four years", ["year", "hundred years", "week"], "The rule makes changes slow and careful."],
  ["After lawmakers approve a proposed amendment to Vermont's constitution, it must also be approved by…", "the voters", ["the President", "the governor of New York", "the town clerk alone"], "The people have the final say."],
  ["In 2022, Vermont voters changed the 1777 language in the state constitution to…", "ban slavery and indentured servitude completely", ["end town meeting", "move the capital", "lower the voting age to 10"], "The old wording had left exceptions."],
  ["In 1997, the Vermont Supreme Court ruled in Brigham v. State that…", "students must have equal access to education however rich their town is", ["schools could close", "only cities need schools", "school was optional"], "The case was named for a student from Whiting."],
  ["After the Brigham decision, lawmakers passed Act 60, which changed how…", "the state pays for public schools", ["people get driver's licenses", "maple syrup is graded", "the governor is elected"], "Property taxes now go into a statewide education fund."],
  ["Vermont's 1972 bottle bill pays people a deposit back when they return…", "cans and bottles", ["library books", "old shoes", "phone books"], "It cut roadside litter."],
  ["A law that requires people to separate food scraps from trash is meant to reduce…", "waste going into landfills", ["the number of farms", "the price of snow", "voting"], "Food scraps can become compost."],
  ["Act 250 makes large developments get a permit that looks at…", "effects on land, water, traffic and towns", ["only the color of the building", "the owner's favorite food", "nothing at all"], "It balances growth with protecting the land."],
  ["A cost that falls on people who aren't part of a sale, like pollution from a factory, is called…", "an external cost", ["a profit", "a wage", "an allowance"], "Policies such as Act 250 try to account for these."],
  ["A business owned by the farmers or customers who use it is called a…", "cooperative", ["monopoly", "colony", "kingdom"], "Many Vermont dairy farmers own their creamery together."],
  ["When maple syrup makers have a poor season and less syrup is made, the price usually…", "goes up", ["goes down", "stays at zero", "disappears"], "Lower supply raises prices."],
  ["Choosing to spend a Saturday working at the farm stand instead of skiing has an opportunity cost of…", "the skiing you gave up", ["the money you earned", "the farm stand", "nothing"], "Opportunity cost is the next best choice given up."],
  ["Vermont sells maple syrup, cheese and machine parts to other countries. These are Vermont's…", "exports", ["imports", "taxes", "budgets"], "Canada is Vermont's biggest trading partner."],
  ["Tourism is important to Vermont's economy because visitors spend money on…", "lodging, meals, skiing and shops", ["only their own homes", "taxes in other states", "nothing"], "Fall foliage and ski seasons bring many visitors."],
  ["A citizen who wants Vermont to change a law can…", "testify at a legislative committee hearing", ["write the law into the constitution alone", "veto it", "arrest the lawmakers"], "Committees hold hearings where the public can speak."],
  ["Vermont's governor can veto a bill, but the General Assembly can override the veto with…", "a two-thirds vote in each chamber", ["one vote", "a coin toss", "the President's permission"], "Checks and balances work at the state level too."],
  ["Why is it hard for small Vermont dairy farms to stay in business?", "milk prices change a lot while costs keep rising", ["cows are illegal", "no one drinks milk", "the state owns all farms"], "Prices and costs decide profits.", true],
  ["Why did Vermont's school funding case reach the state Supreme Court?", "students in poorer towns had far less spent on their schools", ["students wanted longer summers", "the schools had too much money", "teachers wanted to move to the moon"], "Courts decide whether laws fit the constitution.", true],
  ["A bottle deposit is an example of a positive incentive because it…", "rewards people for returning containers", ["punishes people for recycling", "makes bottles cost nothing", "bans drinks"], "Incentives change what people choose to do.", true],
  ["Many Vermont towns merged their small school districts into larger ones after 2015. Supporters said this would…", "share costs and offer more classes", ["close every school", "end school taxes", "stop all sports"], "Opponents worried about losing local control.", true],
  ["When a town debates a new solar farm, some neighbors worry about the view while others want clean energy. This shows that civic decisions…", "involve weighing different values and interests", ["have only one right answer", "never involve the public", "are made by luck"], "Deliberation means hearing every side.", true],
];

export const SOCIAL_8: Unit[] = [
  bankUnit({
    id: "vt-g8-vermont-in-action",
    title: "Vermont Civics in Action",
    emoji: "🗳️",
    blurb: "Town meeting, lawmaking, policy and Vermont's economy",
    parentNote: "How Vermonters govern themselves and change laws: town meeting and Australian ballot, the citizen legislature, vetoes and overrides, amending the state constitution (including the 2022 change banning slavery outright), Brigham v. State and Act 60, the bottle bill, Act 250 and recycling, external costs and incentives, co-ops, supply and opportunity cost, and Vermont's exports and tourism.",
    standards: ["D2.Civ.2.6-8; D2.Civ.12.6-8; D2.Civ.13.6-8; D2.Eco.8.6-8", "the roles of citizens, how laws and policies are changed and address public problems, and external costs and benefits"],
    items: IN_ACTION,
  }),
];
