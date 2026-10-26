import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Iowa Grade 5 social studies, Our Changing Nation: how railroads moved people into and across Iowa (SS.5.13), how
// the Industrial Revolution changed farm and city life (SS.5.15), Iowa laws and court cases about equal rights
// (SS.5.18), and young people's activism in Iowa (SS.5.20); and money choices: borrowing, saving and investing,
// long-term goals and taxes (SS.5.21 to SS.5.24). The Constitution, the Civil War and the national Civil Rights
// Movement are adopted units.

const CHANGE: Q[] = [
  ["By 1870, four railroads crossed Iowa from the Mississippi River to the…", "Missouri River", ["Pacific Ocean", "Great Lakes", "Gulf of Mexico"], "Trains crossed the whole state."],
  ["New towns sprang up every few miles along Iowa's railroad lines because…", "farmers needed places to ship grain and buy goods", ["the trains needed snow", "the law said so", "rivers were closed"], "Many towns grew around a depot."],
  ["Railroads let Iowa farmers send corn and hogs to faraway…", "cities like Chicago", ["islands", "mountains", "oceans"], "Chicago had big markets."],
  ["Railroads changed where people moved because they…", "made travel faster and cheaper", ["made travel slower", "stopped all travel", "only carried mail"], "Trips that took weeks took days."],
  ["In 1892, John Froelich of Clayton County built one of the first…", "gasoline tractors", ["airplanes", "telephones", "light bulbs"], "It could pull a threshing machine."],
  ["Maytag in Newton became famous for making…", "washing machines", ["tractors", "airplanes", "cars"], "They saved hours of work at home."],
  ["Cedar Rapids became home to a giant mill that made…", "oatmeal and cereal", ["steel", "cars", "glass"], "Oats from farms became breakfast."],
  ["As farm machines did more work, many young people moved from farms to…", "cities, for factory jobs", ["the ocean", "the mountains", "the moon"], "Fewer farm workers were needed."],
  ["Rural Free Delivery brought farm families…", "mail at their own homes", ["free tractors", "free land", "city apartments"], "Before, they had to go to town for mail."],
  ["Life in growing cities in the 1900s often meant crowded homes and…", "long factory hours", ["no work", "no neighbors", "no streets"], "Workers later fought for shorter hours."],
  ["In 1839, the first case of Iowa's territorial Supreme Court ruled that Ralph, who had been enslaved,…", "was free in Iowa", ["had to return to slavery", "could not stay", "owed money"], "Slavery was not allowed in Iowa."],
  ["In 1868, the Iowa Supreme Court ruled that Susan Clark, a 12-year-old Black girl, could…", "attend her neighborhood school", ["not go to school", "only learn at home", "only go at night"], "This was 86 years before Brown v. Board of Education."],
  ["In 1868, Iowa voters changed the state constitution so that…", "Black men could vote", ["no one could vote", "only judges could vote", "children could vote"], "Iowa did this before the Fifteenth Amendment."],
  ["Arabella Mansfield of Mount Pleasant became the first woman in the United States to be a…", "lawyer", ["pilot", "astronaut", "governor"], "She passed the Iowa bar in 1869."],
  ["In 1948, Edna Griffin and her friends were refused service at a Des Moines drugstore because…", "they were Black", ["they had no money", "the store was closed", "they were too young"], "They protested and won in court."],
  ["Edna Griffin is sometimes called the Rosa Parks of…", "Iowa", ["Canada", "Mexico", "France"], "She fought segregation in Des Moines."],
  ["In 1965, Iowa passed the Iowa Civil Rights Act to…", "ban discrimination in jobs and housing", ["build railroads", "raise taxes", "close schools"], "A state commission enforces it."],
  ["In 1965, Mary Beth Tinker, John Tinker and Christopher Eckhardt wore black armbands to school to…", "protest the Vietnam War", ["celebrate a holiday", "show their team", "keep warm"], "Their school suspended them."],
  ["In Tinker v. Des Moines (1969), the Supreme Court said students…", "keep their right to free speech at school", ["have no rights at school", "must wear uniforms", "cannot read newspapers"], "Rights don't stop at the schoolhouse gate."],
  ["The Tinker case shows that young people can…", "stand up for their beliefs peacefully", ["never take part", "only watch", "not have opinions"], "They were 13 to 16 years old."],
  ["A sit-in is a protest where people…", "sit and refuse to leave until treated fairly", ["run a race", "sing and leave", "stay home"], "Sit-ins spread across the nation."],
  ["Laws that protect equal rights help make sure people are treated fairly no matter their…", "race or sex", ["favorite food", "shoe size", "favorite color"], "Equal rights are for everyone."],
  ["George Washington Carver was the first Black student at…", "Iowa State", ["Harvard", "Yale", "Oxford"], "He studied plants in Ames.", true],
  ["Why were the Clark case and the Tinker case both important?", "they protected students' rights", ["they built railroads", "they raised taxes", "they started wars"], "Both began with students in Iowa schools.", true],
  ["The Waterloo Gasoline Engine Company's tractors became part of…", "John Deere", ["Maytag", "Quaker Oats", "the railroad"], "Waterloo still builds tractors.", true],
  ["The railroads helped Iowa's population grow because…", "settlers could reach new land quickly", ["they kept settlers out", "they only ran at night", "they replaced farms"], "Railroads sold land to settlers too.", true],
  ["Iowa students who marched or spoke out for civil rights in the 1960s showed that…", "youth can help change laws and minds", ["only adults matter", "laws never change", "protests never work"], "Youth activism is part of Iowa's story.", true],
  ["How did industry change life in rural Iowa?", "machines made farm work faster with fewer workers", ["farms disappeared", "no one used machines", "farms needed more workers"], "Tractors replaced many horses.", true],
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
  ["Much of the money for Iowa's public schools comes from…", "property and state taxes", ["bake sales only", "lemonade stands", "parking tickets"], "Taxes pay teachers and buildings."],
  ["Gas taxes in Iowa help pay for…", "roads and bridges", ["toys", "movies", "vacations"], "Drivers use the roads."],
  ["A public benefit that taxes pay for is…", "fire departments", ["your own toys", "private vacations", "movie popcorn"], "Public means for everyone."],
  ["The government collects income tax mostly through…", "paycheck deductions", ["piggy banks", "lemonade stands", "garage sales"], "Employers send it in.", true],
  ["You want to buy a $200 bike in 10 weeks. How much should you save each week?", "$20", ["$2", "$10", "$100"], "200 divided by 10."],
  ["You borrow $100 and pay $10 interest. How much do you pay back?", "$110", ["$90", "$100", "$10"], "Add the interest to the loan."],
  ["A savings account pays 5% a year on $100. After one year you have…", "$105", ["$100", "$95", "$150"], "5% of $100 is $5."],
  ["Which is a good reason to borrow money?", "to pay for college that leads to a good job", ["to buy candy every day", "to buy something you don't need", "to lend it to a stranger"], "Borrowing can be worth it for big goals."],
  ["Spreading savings among different investments is called…", "diversifying", ["borrowing", "spending", "taxing"], "Don't put all your eggs in one basket.", true],
  ["Iowa's College Savings Iowa plan helps families save for…", "college", ["vacations", "cars", "toys"], "Families can start when children are young.", true],
  ["Why do people pay taxes even if they don't use every service?", "taxes pay for things that help everyone", ["taxes are a game", "taxes are optional", "taxes buy private things"], "Roads, schools and parks serve the whole community.", true],
  ["If you pay only the smallest amount on a credit card each month, you…", "pay more interest over time", ["pay less in total", "never owe anything", "earn interest"], "Paying in full avoids interest.", true],
];

export const SOCIAL_5: Unit[] = [
  bankUnit({
    id: "ia-g5-iowa-and-change",
    title: "Iowa in a Changing Nation",
    emoji: "🚂",
    blurb: "Railroads, factories and the fight for fair laws",
    parentNote: "How railroads and the Industrial Revolution changed Iowa (new towns, tractors, washing machines, cereal mills and the move from farms to cities), and Iowa's laws and court cases about equal rights: Ralph in 1839, Susan Clark's school case and Black men's vote in 1868, Arabella Mansfield, Edna Griffin's 1948 sit-in, the 1965 Iowa Civil Rights Act and the students of Tinker v. Des Moines.",
    standards: ["SS.5.13; SS.5.15; SS.5.18; SS.5.20", "railroads and the movement of people, how the Industrial Revolution changed rural and city life, laws about equal rights, and youth activism in Iowa"],
    items: CHANGE,
  }),
  bankUnit({
    id: "ia-g5-money-choices",
    title: "Borrow, Save & Invest",
    emoji: "🏦",
    blurb: "Borrowing, saving, investing and taxes",
    parentNote: "Reasons to borrow and the cost of interest, credit cards, saving compared with investing, risk, compound interest, long-term goals such as college and retirement, and the taxes people pay (sales, income, property and gas taxes) and the public services they fund in Iowa.",
    standards: ["SS.5.21; SS.5.22; SS.5.23; SS.5.24", "reasons for borrowing, ways to save and invest, long-term financial goals, and types of taxes and what they fund"],
    items: MONEY,
  }),
];
