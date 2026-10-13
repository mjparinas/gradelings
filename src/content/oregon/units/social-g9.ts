import { pick, randInt, sample, shuffle, textChoice } from "../../random";
import type { Question, Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { mixUnit } from "./social-kit";

// Oregon Grade 9 social studies: civics and economics from Oregon's high school standards (2024). Oregon requires
// 0.5 credit of US civics; these units cover government, rights, voting and lawmaking in the US and Oregon, and
// market economics.

const FORMS: Q[] = [
  ["In a direct democracy,…", "citizens vote on laws themselves", ["citizens elect a king", "one party makes every decision"], "Ancient Athens used direct democracy."],
  ["In a republic like the United States,…", "citizens elect representatives to make laws", ["a monarch inherits power", "religious leaders rule"], "Representatives answer to voters."],
  ["A theocracy is ruled by…", "religious leaders or religious law", ["elected representatives", "a group of business owners"], "Theo means god."],
  ["An oligarchy is rule by…", "a small group of powerful people", ["all citizens", "one elected President"], "Oligo means few."],
  ["In an absolute monarchy,…", "a king or queen holds unlimited power", ["voters choose every law", "power is split among three branches"], "Power is inherited."],
  ["In a constitutional monarchy,…", "a monarch's power is limited by a constitution or law", ["the monarch has unlimited power", "there is no monarch"], "The United Kingdom is one example."],
  ["An authoritarian government…", "holds power without real limits or free elections", ["protects a free press", "shares power with courts"], "Opponents may be jailed."],
  ["Totalitarian governments try to control…", "nearly every part of public and private life", ["only the army", "nothing"], "They use propaganda and fear."],
  ["The name of the US Senate comes from…", "the Roman Republic", ["ancient Egypt", "the Mongol Empire"], "Rome's senate advised its leaders."],
  ["The English Bill of Rights (1689) influenced the US by…", "limiting the monarch and protecting some rights", ["creating the presidency", "ending slavery"], "It came after the Glorious Revolution."],
  ["Oregon's initiative process is an example of…", "direct democracy within a republic", ["monarchy", "oligarchy"], "Voters make some laws directly."],
  ["Which document first limited the English king's power, in 1215?", "the Magna Carta", ["the Mayflower Compact", "the Federalist Papers"], "Nobles forced King John to agree."],
  ["Federal systems divide power between…", "national and regional governments", ["two kings", "courts and churches"], "The US and Canada are federal."],
  ["A unitary system keeps most power in…", "the national government", ["the states", "city councils"], "France is a unitary state."],
  ["A parliamentary system chooses its leader…", "from the majority in the legislature", ["by inheritance", "by a separate national vote"], "The prime minister leads Parliament's majority."],
  ["In a presidential system,…", "the president is elected separately from the legislature", ["the legislature picks the president", "there is no legislature"], "The US is a presidential system."],
  ["Consent of the governed means…", "government's power comes from the people's agreement", ["the government needs no one's agreement", "only nobles consent"], "It's in the Declaration of Independence."],
  ["The Mayflower Compact was an early example of…", "self-government by agreement", ["absolute monarchy", "a theocracy run by a pope"], "Colonists agreed to make fair laws."],
  ["Limited government means…", "government's powers are restricted by law", ["the government can do anything", "there is no government"], "Constitutions limit power."],
  ["Which is a sign of authoritarian rule?", "censored news and banned opposition parties", ["regular free elections", "independent courts"], "Authoritarian rulers silence critics."],
  ["The First Amendment's establishment clause guards against…", "a government-run official religion", ["free speech", "a free press"], "Government may not establish a religion."],
  ["Popular sovereignty is shown when…", "citizens vote in free and fair elections", ["a general takes power", "a king names his heir"], "Power comes from the people."],
  ["In an oligarchy, ordinary people usually…", "have little say in decisions", ["make every decision", "vote on every law"], "A few hold power."],
  ["Which form of government did the Founders deliberately avoid?", "monarchy", ["republic", "federalism"], "They had just fought a king."],
  ["The Haudenosaunee Great Law of Peace set up…", "a council of leaders from several nations", ["a single hereditary king", "rule by the army"], "It united several nations.", true],
  ["The idea of separating government powers into branches came largely from…", "Montesquieu", ["Machiavelli", "Confucius"], "He wrote The Spirit of the Laws.", true],
  ["A confederation, like the US under the Articles, has…", "a weak central government and strong member states", ["a strong central government", "no member states"], "The Articles created a confederation.", true],
];

const BRANCHES: Q[] = [
  ["How many US senators are there?", "100", ["50", "435"], "Two from each state."],
  ["How many voting members are in the US House of Representatives?", "435", ["100", "538"], "Seats are divided by population."],
  ["How many senators does each state have?", "2", ["1", "depends on population"], "Every state gets two."],
  ["Since the 2020 census, how many members does Oregon send to the US House?", "6", ["5", "2"], "Oregon gained a sixth seat."],
  ["US senators serve terms of…", "six years", ["two years", "four years"], "One-third are elected every two years."],
  ["US representatives serve terms of…", "two years", ["six years", "four years"], "The whole House is elected every two years."],
  ["The President serves a term of…", "four years", ["six years", "two years"], "Elections are every four years."],
  ["A President can be elected at most…", "twice", ["once", "three times"], "The 22nd Amendment limits terms."],
  ["Who has the power to declare war?", "Congress", ["the President", "the Supreme Court"], "Article I gives Congress this power."],
  ["Who is commander in chief of the military?", "the President", ["the Speaker of the House", "the Chief Justice"], "Article II gives the President this role."],
  ["Treaties must be approved by…", "two-thirds of the Senate", ["the House alone", "the Supreme Court"], "The President negotiates, the Senate approves."],
  ["Who confirms federal judges?", "the Senate", ["the House", "the voters"], "The President nominates them."],
  ["How many justices are on the US Supreme Court?", "nine", ["seven", "twelve"], "Congress set the number at nine in 1869."],
  ["Federal judges usually serve…", "for life, during good behaviour", ["four years", "ten years"], "Life terms protect judicial independence."],
  ["Congress can override a President's veto with…", "a two-thirds vote in both houses", ["a simple majority in the House", "a court order"], "It's a check on the President."],
  ["Which house can impeach a federal official?", "the House of Representatives", ["the Senate", "the Supreme Court"], "Impeach means to formally charge."],
  ["After an impeachment, who holds the trial?", "the Senate", ["the House", "a state court"], "Conviction needs two-thirds."],
  ["Bills to raise taxes must start in…", "the House of Representatives", ["the Senate", "the White House"], "The House is closest to the voters."],
  ["The President's Cabinet is made up of…", "the heads of the executive departments", ["all members of Congress", "the Supreme Court justices"], "The Secretary of State is one."],
  ["Which department leads US diplomacy and foreign policy?", "the State Department", ["the Treasury Department", "the Department of Agriculture"], "The Secretary of State is the top diplomat."],
  ["If the President dies in office, who becomes President?", "the Vice President", ["the Speaker of the House", "the Chief Justice"], "The Vice President is first in line."],
  ["In the Senate, the Vice President…", "presides and breaks tie votes", ["writes every bill", "has no role"], "Ties are broken by the Vice President."],
  ["Executive agencies carry out…", "laws passed by Congress", ["court cases", "state elections only"], "Agencies make rules to enforce laws."],
  ["Judicial review lets courts…", "strike down laws that violate the Constitution", ["write new laws", "veto bills"], "It began with Marbury v. Madison."],
  ["Who is next in line for the presidency after the Vice President?", "the Speaker of the House", ["the Secretary of State", "the Chief Justice"], "The Speaker leads the House.", true],
  ["The minimum age to be a US senator is…", "30", ["25", "35"], "Representatives must be 25.", true],
  ["The minimum age to be President is…", "35", ["30", "40"], "Presidents must also be natural-born citizens.", true],
  ["Since the 1930s, the federal government has…", "grown in size and in what it does", ["shrunk to almost nothing", "stayed exactly the same"], "Debate over its size continues.", true],
];

const FEDERALISM: Q[] = [
  ["Federalism means…", "power is shared between the national and state governments", ["only states have power", "only the national government has power"], "Both levels have their own powers."],
  ["Which level of government issues driver's licences?", "state", ["federal", "school district"], "States set driving rules."],
  ["Which level of government prints money?", "federal", ["state", "county"], "Only the national government coins money."],
  ["Who runs most public schools day to day?", "local school districts", ["the President", "the US Senate"], "School boards are local."],
  ["The Tenth Amendment reserves powers not given to the national government to…", "the states or the people", ["the President", "the courts"], "Reserved powers stay with states."],
  ["The Supremacy Clause says…", "federal law wins when it conflicts with state law", ["state law always wins", "cities can ignore laws"], "The Constitution is the supreme law."],
  ["McCulloch v. Maryland (1819) ruled that…", "states cannot tax a federal bank", ["states can ignore federal laws", "banks are illegal"], "It strengthened national power."],
  ["Gibbons v. Ogden (1824) ruled that…", "Congress controls trade between states", ["states control all trade", "steamboats were illegal"], "It's about the Commerce Clause."],
  ["Oregon's governor is elected to a term of…", "four years", ["two years", "six years"], "Oregon limits governors to 8 years in any 12."],
  ["Oregon's Legislative Assembly has…", "30 senators and 60 representatives", ["100 senators and 435 representatives", "49 senators and 98 representatives"], "It meets in Salem."],
  ["Oregon's capital city is…", "Salem", ["Portland", "Eugene"], "Salem has been the capital since statehood."],
  ["The Oregon Secretary of State's jobs include…", "overseeing elections and auditing state agencies", ["commanding the army", "writing every law"], "The Secretary of State is next in line for governor."],
  ["How many federally recognized Tribes are in Oregon?", "nine", ["one", "thirty-six"], "Each is a sovereign government."],
  ["Tribal governments relate to the United States…", "as sovereign nations, government to government", ["as city departments", "as private clubs"], "Treaties and federal law recognize Tribal sovereignty."],
  ["Oregon state agencies work with the nine Tribes through…", "government-to-government relations set out in state law", ["no contact at all", "the US Navy"], "Oregon passed such a law in 2001."],
  ["Tribal governments in Oregon provide…", "courts, police, health care, schools and natural resource programs", ["only casinos", "nothing"], "They serve their members and communities."],
  ["Many Oregon counties are governed by…", "boards of county commissioners", ["the governor alone", "the President"], "Counties run roads, elections and more."],
  ["Which level of government usually runs city parks and police?", "city (local) government", ["the federal government", "the state Supreme Court"], "Cities provide many daily services."],
  ["Concurrent powers are powers…", "both national and state governments have, like taxing", ["only states have", "only the President has"], "Concurrent means at the same time."],
  ["Which power belongs only to the national government?", "making treaties with other countries", ["running elections", "setting up schools"], "Foreign policy is federal."],
  ["Which power is reserved to the states?", "running elections", ["declaring war", "printing money"], "States set many election rules."],
  ["Oregon's constitution was adopted in…", "1857", ["1776", "1912"], "Voters approved it before statehood in 1859."],
  ["Why might Oregon's laws differ from another state's?", "states make their own laws on reserved powers", ["Oregon ignores the Constitution", "all state laws must be identical"], "Federalism allows variety."],
  ["Oregon's 1902 initiative system was later adopted by…", "many other states, especially in the West", ["no other state", "the federal government"], "It was called the Oregon System."],
  ["United States v. Lopez (1995) limited Congress's power over commerce by…", "striking down a federal gun-free school zones law", ["banning all guns", "ending interstate trade"], "The Court said the law went beyond commerce.", true],
  ["After termination in the 1950s, restoration of Oregon Tribes began with…", "the Siletz, in 1977", ["the Klamath, in 1859", "no Tribes"], "Others followed in the 1980s.", true],
  ["If Oregon's governor's office becomes vacant, who usually becomes governor?", "the Secretary of State", ["the lieutenant governor", "the mayor of Salem"], "Oregon has no lieutenant governor.", true],
];

const RIGHTS: Q[] = [
  ["Which amendment abolished slavery?", "the 13th", ["the 1st", "the 19th"], "It was ratified in 1865."],
  ["Which amendment promises equal protection of the laws?", "the 14th", ["the 2nd", "the 26th"], "It was ratified in 1868."],
  ["Which amendment says the right to vote can't be denied because of race?", "the 15th", ["the 10th", "the 22nd"], "It was ratified in 1870."],
  ["Which amendment protects women's right to vote nationwide?", "the 19th", ["the 13th", "the 5th"], "It was ratified in 1920."],
  ["Which amendment lowered the voting age to 18?", "the 26th", ["the 21st", "the 15th"], "It was ratified in 1971."],
  ["Which amendment banned poll taxes in federal elections?", "the 24th", ["the 18th", "the 4th"], "Poll taxes kept many Black voters away."],
  ["Brown v. Board of Education (1954) ruled that…", "segregated public schools are unconstitutional", ["segregation was legal", "schools could charge tuition"], "It overturned 'separate but equal' in schools."],
  ["Plessy v. Ferguson (1896) allowed…", "'separate but equal' segregation", ["integration of schools", "women to vote"], "Brown later overturned it for schools."],
  ["The Voting Rights Act of 1965…", "banned literacy tests and protected voters of colour", ["ended voting", "raised the voting age"], "It led to a big rise in Black voter registration."],
  ["The Civil Rights Act of 1964 banned…", "discrimination in jobs and public places", ["all protests", "voting by mail"], "It outlawed segregation in public places."],
  ["Miranda v. Arizona (1966) requires police to…", "tell suspects their rights before questioning", ["search every home", "jail suspects without trial"], "'You have the right to remain silent.'"],
  ["Gideon v. Wainwright (1963) ruled that…", "states must provide lawyers to defendants who can't afford one", ["trials need no lawyers", "only rich people get lawyers"], "It applies to criminal cases."],
  ["Tinker v. Des Moines (1969) protected students'…", "right to peaceful symbolic speech at school", ["right to skip school", "right to vote at 16"], "Students wore armbands to protest a war."],
  ["Congress made all Native Americans born in the US citizens in…", "1924", ["1776", "1865"], "It was the Indian Citizenship Act."],
  ["In 1988, the US government apologized to Japanese Americans for wartime incarceration and…", "paid reparations to survivors", ["did nothing else", "banned them from voting"], "It was the Civil Liberties Act."],
  ["Oregon's 1857 constitution denied the vote to…", "Black and Chinese residents", ["landowners", "farmers"], "Its exclusionary language was later removed."],
  ["Oregon finally ratified the 15th Amendment in…", "1959", ["1870", "1920"], "It was a symbolic vote, nearly 90 years late."],
  ["Oregon voters removed the last racist wording from the state constitution in…", "2002", ["1859", "1926"], "The exclusion clause itself was repealed in 1926."],
  ["The 1965 marches from Selma to Montgomery pushed for…", "voting rights", ["lower taxes", "a new state"], "They led to the Voting Rights Act."],
  ["The Universal Declaration of Human Rights (1948) was adopted by…", "the United Nations", ["the US Congress", "the Oregon legislature"], "Eleanor Roosevelt helped draft it."],
  ["At first, the Bill of Rights limited only…", "the federal government", ["state governments", "private businesses"], "The 14th Amendment later applied most of it to states."],
  ["Through the 14th Amendment, courts have applied most of the Bill of Rights to…", "state governments", ["other countries", "private clubs"], "This is called incorporation."],
  ["Obergefell v. Hodges (2015) ruled that…", "same-sex couples have the right to marry", ["marriage is a state secret", "marriage requires a federal license"], "It applied the 14th Amendment."],
  ["The Americans with Disabilities Act (1990)…", "bans discrimination against people with disabilities", ["created Social Security", "lowered the voting age"], "It requires access to public places."],
  ["Loving v. Virginia (1967) struck down…", "bans on interracial marriage", ["school segregation", "poll taxes"], "Mildred and Richard Loving brought the case.", true],
  ["Korematsu v. United States (1944) upheld…", "the wartime incarceration of Japanese Americans", ["the right to a lawyer", "school integration"], "The Court later called it wrong.", true],
  ["Minoru Yasui, a lawyer from Hood River, deliberately broke a 1942 curfew to…", "test whether it was constitutional", ["start a business", "join the army"], "His conviction was overturned in 1986.", true],
  ["Mendez v. Westminster (1947) ended…", "segregation of Mexican American students in some California schools", ["the Gold Rush", "voting by mail"], "It came before Brown v. Board.", true],
];

const VOTING: Q[] = [
  ["To vote in Oregon you must be a US citizen, an Oregon resident and…", "at least 18 by Election Day", ["at least 21", "a property owner"], "Age 18 since the 26th Amendment."],
  ["In Oregon, young people can register to vote at age…", "16", ["12", "21"], "They can vote once they turn 18."],
  ["How do Oregonians vote?", "by mail, with a ballot sent to every registered voter", ["only in person at polling booths", "by phone"], "Ballots can be mailed or left in drop boxes."],
  ["Oregon became the first state to hold all its elections by mail after voters approved it in…", "1998", ["1859", "1912"], "It was Ballot Measure 60."],
  ["Oregon's Motor Voter law, starting in 2016, registers eligible people…", "automatically through the DMV", ["only at age 30", "only if they ask a judge"], "They can opt out."],
  ["Oregon's party primaries are mostly…", "closed, so voters choose among their own party's candidates", ["open to every voter in every race", "decided by the governor"], "Nonpartisan races are open to all."],
  ["In a general election, voters choose…", "who will hold office, from among candidates of different parties", ["only party leaders", "only judges"], "General elections are in November."],
  ["A ballot measure is…", "a proposed law or amendment that voters decide directly", ["a kind of tax form", "a court case"], "Oregon has many each year."],
  ["To get an initiative on Oregon's ballot, backers must collect…", "a set number of valid voter signatures", ["the governor's approval", "a court's permission"], "The number depends on the last governor's race."],
  ["Oregon's Voters' Pamphlet contains…", "information about candidates and ballot measures", ["only sports scores", "secret ballots"], "It is mailed before elections."],
  ["Why check several sources before voting on a measure?", "to avoid misleading ads and understand both sides", ["to waste time", "it is required by law"], "Ads try to persuade."],
  ["How many electoral votes does Oregon have?", "8", ["6", "10"], "6 House members + 2 senators."],
  ["A candidate needs… electoral votes to win the presidency.", "270", ["538", "100"], "That is a majority of 538."],
  ["After each census, redistricting…", "redraws the lines of voting districts", ["changes the Constitution", "picks new judges"], "Districts must have about equal populations."],
  ["Gerrymandering means…", "drawing districts to favour one party or group", ["counting votes by hand", "voting twice"], "It can weaken some voters' voices."],
  ["Which civic behaviour strengthens a pluralistic democracy?", "voting, staying informed and respecting others' views", ["spreading rumours", "refusing to listen"], "Democracy needs active citizens."],
  ["Which is NOT required to vote in Oregon?", "owning property", ["US citizenship", "being 18 or older"], "Property rules ended long ago."],
  ["In Oregon, a person convicted of a felony can vote again…", "once released from prison", ["never", "only after 20 years"], "Oregon restores voting rights on release."],
  ["Political parties help democracy by…", "organizing candidates and ideas for voters", ["counting ballots", "making court rulings"], "Parties nominate candidates."],
  ["Interest groups try to…", "influence laws and government policies", ["run elections", "write the Constitution"], "Unions and business groups are examples."],
  ["Lobbying means…", "trying to persuade lawmakers", ["counting votes", "drawing maps"], "Lobbyists meet with legislators."],
  ["Why is a free press important?", "it informs citizens and holds leaders accountable", ["it chooses the President", "it makes laws"], "The First Amendment protects it."],
  ["A political action committee (PAC)…", "raises and spends money to support candidates or causes", ["is a court", "counts ballots"], "PACs must report their spending."],
  ["Voter turnout means…", "the share of eligible voters who vote", ["the number of candidates", "the time polls close"], "Oregon's turnout is often high."],
  ["Which amendment protects the right to petition the government?", "the First", ["the Fifth", "the Tenth"], "Petitioning is one of its five freedoms.", true],
  ["Social movements change laws by…", "organizing, protesting peacefully, lobbying and voting", ["staying silent", "ignoring elections"], "The civil rights movement is an example.", true],
  ["Which is a warning sign of misinformation?", "a shocking claim with no named source", ["a claim with a cited source", "a report from several outlets"], "Check sources before sharing.", true],
  ["Testifying at an Oregon legislative hearing lets citizens…", "share their views on a bill", ["vote twice", "veto the bill"], "Hearings are open to the public.", true],
];

const LAWMAKING: Q[] = [
  ["A proposed law is called a…", "bill", ["veto", "verdict"], "A bill becomes a law if it passes."],
  ["In Congress, a bill is first studied by a…", "committee", ["court", "governor"], "Committees hold hearings and make changes."],
  ["A bill passed by the House must also pass…", "the Senate, in the same form", ["the Supreme Court", "every state legislature"], "Both houses must agree."],
  ["After both houses pass a bill, it goes to…", "the President to sign or veto", ["the Chief Justice", "the voters"], "The President has 10 days, not counting Sundays."],
  ["A bill becomes law without the President's signature if…", "the President doesn't act within 10 days while Congress is in session", ["the President leaves town", "a court says so"], "Not counting Sundays."],
  ["A pocket veto happens when…", "Congress adjourns and the President doesn't sign the bill", ["the President signs it", "the Senate rejects it"], "The bill dies."],
  ["A filibuster is…", "long debate in the Senate to delay or block a vote", ["a kind of bill", "a vote in the House"], "Senators can talk for hours."],
  ["Ending a filibuster usually takes… votes in the Senate.", "60", ["51", "100"], "This is called cloture."],
  ["In Oregon, a bill passed by the legislature goes to…", "the governor", ["the President", "the Oregon Supreme Court"], "The governor can sign or veto."],
  ["Oregon's legislature meets in long sessions in odd-numbered years and in short sessions in…", "even-numbered years", ["leap years only", "every month"], "Annual sessions began in 2012."],
  ["Oregon's governor can veto bills and also has a…", "line-item veto on spending items", ["power to dissolve the legislature", "vote in the Senate"], "The President has no line-item veto."],
  ["An Oregon legislative referral is when…", "the legislature sends a measure to the voters", ["voters send a measure to the courts", "the governor writes a law alone"], "Voters then decide."],
  ["Oregon citizens can propose a law themselves through an…", "initiative petition", ["executive order", "impeachment"], "Signatures put it on the ballot."],
  ["Oregon's initiative and referendum of 1902 were championed by…", "William U'Ren", ["John McLoughlin", "Tom McCall"], "He led the Oregon System."],
  ["Who was Oregon's governor when the 1971 Bottle Bill became law?", "Tom McCall", ["John Whiteaker", "William U'Ren"], "He also championed public beaches."],
  ["Public hearings on a bill let citizens…", "influence it before it passes", ["veto it", "vote twice"], "Testimony can change a bill."],
  ["Regulations are rules made by…", "executive agencies to carry out laws", ["the voters directly", "the Supreme Court"], "Agencies fill in details."],
  ["The civil rights movement helped pass the…", "Civil Rights Act of 1964", ["Louisiana Purchase", "Stamp Act"], "Activists pressed Congress for years."],
  ["The sponsor of a bill is…", "the lawmaker who introduces it", ["the President", "a judge"], "Bills need a sponsor."],
  ["A conference committee…", "settles differences between House and Senate versions of a bill", ["chooses the President", "hears court cases"], "Both houses must pass the final version."],
  ["A bill 'dies in committee' when…", "the committee never sends it forward", ["it is signed", "the President vetoes it"], "Most bills never leave committee."],
  ["Lobbyists may testify at hearings to…", "argue for their group's interests", ["vote on the bill", "veto the bill"], "Lobbying is protected as petitioning."],
  ["Why compare a past policy debate with a current one?", "to see how parties, groups and media shape issues over time", ["history never repeats", "to avoid all debate"], "Patterns can repeat."],
  ["Each house of Oregon's legislature needs… of its members present to do business.", "two-thirds", ["one-third", "all"], "Oregon's quorum rule is unusually high."],
  ["Bills that raise taxes in Oregon's legislature need…", "a three-fifths vote", ["a simple majority", "a unanimous vote"], "Voters added this rule in 1996.", true],
  ["Oregon's Measure 113 (2022) bars lawmakers from re-election if they…", "miss 10 or more floor sessions without an excuse", ["vote against a bill", "serve more than one term"], "It responded to walkouts.", true],
  ["Executive orders are…", "directives from the President to manage the executive branch", ["laws passed by Congress", "court rulings"], "Courts can strike them down.", true],
  ["Courts affect laws by…", "deciding whether they are constitutional", ["passing new taxes", "running elections"], "Judicial review is a check.", true],
];

const ECONOMICS: Q[] = [
  ["Scarcity means…", "limited resources and unlimited wants", ["unlimited resources", "no wants at all"], "Scarcity forces choices."],
  ["Opportunity cost is…", "the value of the next-best alternative given up", ["the price you pay", "a government tax"], "Every choice has one."],
  ["A trade-off is…", "giving up some of one thing to get more of another", ["getting everything free", "a type of tax"], "Time spent working is time not spent studying."],
  ["The Federal Reserve is…", "the central bank of the United States", ["a national park", "a branch of Congress"], "It was created in 1913."],
  ["The Federal Reserve usually fights high inflation by…", "raising interest rates", ["printing more money", "lowering all taxes"], "Higher rates slow borrowing and spending."],
  ["Inflation is…", "a general rise in prices", ["a general fall in prices", "a rise in wages only"], "Money buys less over time."],
  ["Deflation is…", "a general fall in prices", ["a general rise in prices", "a tax cut"], "It can lead to falling wages and spending."],
  ["GDP measures…", "the total value of final goods and services produced in a country in a year", ["the government's debt", "the number of workers"], "Gross Domestic Product."],
  ["The unemployment rate is…", "the share of the labour force without a job and looking for one", ["everyone without a job", "the number of retirees"], "Students and retirees not seeking work aren't counted."],
  ["Banks earn money mainly by…", "lending at higher interest than they pay on deposits", ["printing money", "collecting taxes"], "The difference is their profit."],
  ["A bank run happens when…", "many depositors try to withdraw their money at once", ["a bank opens a new branch", "a bank pays interest"], "Runs caused many failures in the 1930s."],
  ["The FDIC, created in 1933, protects…", "bank deposits up to a limit", ["stock investments", "lottery winnings"], "Insurance stops bank runs."],
  ["A monopoly is…", "a market with only one seller", ["a market with many sellers", "a kind of bank"], "A monopoly can set high prices."],
  ["An oligopoly is…", "a market with a few large sellers", ["a market with one seller", "a market with thousands of tiny sellers"], "Airlines are often oligopolies."],
  ["Perfect competition has…", "many sellers of identical products", ["one seller", "a few sellers"], "Wheat farming is close to it."],
  ["Monopolistic competition has…", "many sellers of similar but different products", ["one seller", "identical products"], "Restaurants are an example."],
  ["Comparative advantage means producing a good at…", "a lower opportunity cost than others", ["a higher price than others", "the same cost as everyone"], "It is the basis for trade."],
  ["Tariffs are…", "taxes on imported goods", ["taxes on income", "loans to farmers"], "They raise the price of imports."],
  ["One role of government in a market economy is…", "enforcing contracts and protecting property rights", ["setting every price", "owning every business"], "Markets need rules."],
  ["Public goods, like national defence, are usually provided by government because…", "markets don't provide enough of them", ["no one needs them", "they are illegal to sell"], "Everyone benefits whether or not they pay."],
  ["A recession is…", "a significant decline in economic activity", ["a rise in GDP", "a holiday"], "Unemployment usually rises."],
  ["The Great Depression began after the stock market crash of…", "1929", ["1865", "2008"], "It lasted through the 1930s."],
  ["Minimum wage laws can…", "raise pay for some workers but may reduce hiring", ["only lower prices", "end all unemployment"], "Economists debate the trade-offs."],
  ["Oregon's biggest exports include…", "computer chips, wood products and farm goods", ["oil and coal", "cotton and sugar cane"], "Oregon has a large semiconductor industry."],
  ["Fiscal policy uses… to steer the economy.", "government spending and taxes", ["interest rates", "tariffs only"], "Congress and the President set it.", true],
  ["Monetary policy is set by…", "the Federal Reserve", ["Congress", "the states"], "It controls interest rates and the money supply.", true],
  ["Before 1860, the US's leading export was cotton, grown by…", "enslaved people", ["Northern factory workers", "immigrant miners"], "Slavery was central to the economy.", true],
  ["Antitrust laws aim to…", "prevent monopolies and protect competition", ["create monopolies", "ban all trade"], "The Sherman Act was passed in 1890.", true],
];

/** Supply and demand: shifts from events, and equilibrium, shortages and surpluses from a schedule. */
const SHIFTS: { good: string; demandUp: string; demandDown: string; supplyUp: string; supplyDown: string }[] = [
  { good: "ice cream", demandUp: "A heat wave hits the city.", demandDown: "A week of cold, rainy weather arrives.", supplyUp: "A new ice cream factory opens.", supplyDown: "The price of milk and cream doubles." },
  { good: "umbrellas", demandUp: "Forecasters predict a month of rain.", demandDown: "A long, dry summer begins.", supplyUp: "Factories find a cheaper way to make umbrellas.", supplyDown: "A shipping strike stops umbrella deliveries." },
  { good: "pears", demandUp: "A study says pears are very healthy.", demandDown: "People start buying apples instead after apple prices fall.", supplyUp: "Hood River orchards have a record harvest.", supplyDown: "A late frost ruins many pear blossoms." },
  { good: "bicycles", demandUp: "Gas prices rise sharply.", demandDown: "A city closes its bike lanes.", supplyUp: "New machines make bike frames faster.", supplyDown: "The price of steel and aluminum jumps." },
  { good: "hazelnuts", demandUp: "A popular new snack uses hazelnuts.", demandDown: "Many people develop a taste for almonds instead.", supplyUp: "Farmers plant more hazelnut orchards that start producing.", supplyDown: "A tree disease damages many orchards." },
  { good: "winter coats", demandUp: "An early, snowy winter arrives.", demandDown: "The winter is unusually warm.", supplyUp: "A new coat factory opens.", supplyDown: "The cost of wool rises sharply." },
  { good: "concert tickets", demandUp: "A band becomes very popular.", demandDown: "The band cancels its promotion.", supplyUp: "The band adds more shows.", supplyDown: "The venue loses half its seats in a renovation." },
  { good: "lumber", demandUp: "Home building booms.", demandDown: "Home building slows sharply.", supplyUp: "New sawmills open in Oregon.", supplyDown: "Wildfires close many logging areas." },
];

function shiftQuestion(): Question {
  const s = pick(SHIFTS);
  const kind = pick(["demandUp", "demandDown", "supplyUp", "supplyDown"] as const);
  const event = s[kind];
  const effects = {
    demandUp: { curve: "demand increases", price: "rises" },
    demandDown: { curve: "demand decreases", price: "falls" },
    supplyUp: { curve: "supply increases", price: "falls" },
    supplyDown: { curve: "supply decreases", price: "rises" },
  } as const;
  const e = effects[kind];
  if (randInt(0, 1) === 0) {
    const all = ["demand increases", "demand decreases", "supply increases", "supply decreases"];
    return textChoice(`${event} What happens in the market for ${s.good}?`, e.curve, all.filter((x) => x !== e.curve), `Ask: does this change how much buyers want (demand) or how much sellers can offer (supply)? Here, ${e.curve}.`);
  }
  return textChoice(
    `${event} What will most likely happen to the equilibrium price of ${s.good}?`,
    `it ${e.price}`,
    [e.price === "rises" ? "it falls" : "it rises", "it stays exactly the same"],
    `${e.curve[0].toUpperCase()}${e.curve.slice(1)}, so the price ${e.price}.`,
  );
}

function scheduleQuestion(): Question {
  const pe = randInt(3, 6);
  const qe = randInt(4, 12) * 10;
  const b = randInt(1, 3) * 10;
  const s = randInt(1, 3) * 10;
  const prices = [1, 2, 3, 4, 5, 6, 7, 8].filter((p) => Math.abs(p - pe) <= 3 && qe + b * (pe - p) > 0 && qe + s * (p - pe) > 0);
  const rows = prices.map((p) => [`$${p}`, qe + b * (pe - p), qe + s * (p - pe)]);
  const visual = { type: "table" as const, title: "Market for a good", headers: ["Price", "Quantity demanded", "Quantity supplied"], rows };
  const kind = pick(["eq", "gap"] as const);
  if (kind === "eq") {
    const wrong = shuffle(prices.filter((p) => p !== pe)).slice(0, 3).map((p) => `$${p}`);
    const q = textChoice("Use the table. What is the equilibrium price?", `$${pe}`, wrong, "Equilibrium is where quantity demanded equals quantity supplied.");
    q.visual = visual;
    return q;
  }
  const p = pick(prices.filter((x) => x !== pe));
  const d = qe + b * (pe - p);
  const sup = qe + s * (p - pe);
  const gap = Math.abs(d - sup);
  const right = d > sup ? `a shortage of ${gap}` : `a surplus of ${gap}`;
  const opposite = d > sup ? `a surplus of ${gap}` : `a shortage of ${gap}`;
  const others = sample([opposite, d > sup ? `a shortage of ${d}` : `a surplus of ${sup}`, "no shortage or surplus"], 3);
  const q = textChoice(`Use the table. If the price is set at $${p}, what happens?`, right, others, `Compare demanded (${d}) and supplied (${sup}). More demanded than supplied is a shortage; more supplied is a surplus.`);
  q.visual = visual;
  return q;
}

export const OWN_SOCIAL_9: Unit[] = [
  bankUnit({
    id: "or-g9-forms-of-government",
    title: "Forms of Government",
    emoji: "👑",
    blurb: "Republics, monarchies and more",
    parentNote: "Comparing the US republic with direct democracy, theocracy, oligarchy, authoritarian rule and monarchy, and the older governments and documents that shaped the United States.",
    standards: ["HS.C.PI.1; HS.C.PI.2", "early governments that influenced the US, and comparing a republic with other forms of government"],
    items: FORMS,
  }),
  bankUnit({
    id: "or-g9-three-branches",
    title: "The Three Branches",
    emoji: "🏛️",
    blurb: "Congress, the President and the courts",
    parentNote: "The structure, powers and checks of Congress, the presidency and the federal courts, Oregon's seats in Congress, and the branches that handle foreign policy.",
    standards: ["HS.C.PI.3; HS.C.PI.5; HS.C.IR.11", "the institutions and processes of the federal government, debates over its size, and who makes foreign policy"],
    items: BRANCHES,
  }),
  bankUnit({
    id: "or-g9-federalism",
    title: "Federal, State, Local & Tribal",
    emoji: "🗂️",
    blurb: "Who does what, from Washington, D.C. to Salem",
    parentNote: "Federalism and landmark cases about it, Oregon's state and local governments, and the government-to-government relationship between Oregon and its nine federally recognized Tribes.",
    standards: ["HS.C.PI.4; HS.C.PI.6; HS.C.IR.8", "federalism and landmark federalism cases, Tribal governments, and the central ideas of US and Oregon government"],
    items: FEDERALISM,
  }),
  bankUnit({
    id: "or-g9-rights",
    title: "Rights & the Courts",
    emoji: "⚖️",
    blurb: "Amendments, cases and civil rights",
    parentNote: "The amendments and landmark cases that expanded or limited rights, the civil rights movement, and how Oregon's constitution excluded people and was changed.",
    standards: ["HS.C.PI.7; HS.C.DP.12; HS.C.DP.15; HS.C.CE.18", "documents protecting rights, efforts to close gaps between ideals and practice, Oregon's exclusionary constitution, and the fight for voting rights"],
    items: RIGHTS,
  }),
  bankUnit({
    id: "or-g9-voting",
    title: "Voting in Oregon",
    emoji: "🗳️",
    blurb: "Vote by mail, primaries and measures",
    parentNote: "Who can vote in Oregon and how (vote by mail, Motor Voter, closed primaries), ballot measures, the Electoral College, parties, interest groups and the media, and checking sources.",
    standards: ["HS.C.DP.16; HS.C.IR.9; HS.C.IR.10", "the requirements and process for voting, civic behaviours in a democracy, and how parties, groups and media influence people"],
    items: VOTING,
  }),
  bankUnit({
    id: "or-g9-lawmaking",
    title: "How Laws Are Made",
    emoji: "📑",
    blurb: "Bills in Congress and in Salem",
    parentNote: "How a bill becomes law in Congress and in Oregon's Legislative Assembly, vetoes, initiatives and referrals, and how citizens and movements influence lawmaking.",
    standards: ["HS.C.CE.17; HS.C.CE.19; HS.C.PI.3", "how citizens and movements affect lawmaking, comparing policy debates, and the processes of government"],
    items: LAWMAKING,
  }),
  bankUnit({
    id: "or-g9-economics",
    title: "Markets, Banks & Money",
    emoji: "💵",
    blurb: "Scarcity, the Fed and market structures",
    parentNote: "Scarcity and trade-offs, banks and the Federal Reserve, inflation, GDP and unemployment, market structures, comparative advantage and the role of government in the economy.",
    standards: ["HS.E.MI.4; HS.E.MI.5; HS.E.MI.6; HS.E.MI.7; HS.E.IC.8; HS.E.ST.11; HS.E.ST.12; HS.E.ST.15", "government's role in markets, banks and the Federal Reserve, economic indicators, scarcity, comparative advantage, market structures and slavery's role in the economy"],
    items: ECONOMICS,
  }),
  mixUnit({
    id: "or-g9-supply-demand",
    title: "Supply & Demand",
    emoji: "📈",
    blurb: "Shifts, prices, shortages and surpluses",
    parentNote: "How events shift supply or demand and change prices, finding the equilibrium price in a table, and what happens when a price is set too high or too low.",
    standards: ["HS.E.MI.1; HS.E.MI.2; HS.E.MI.3", "supply and demand, economic models of a market, and shortages and surpluses"],
    make: (d) => [
      ...Array.from({ length: d === 1 ? 5 : 4 }, () => shiftQuestion()),
      ...Array.from({ length: d === 1 ? 3 : 4 }, () => scheduleQuestion()),
    ],
  }),
];
