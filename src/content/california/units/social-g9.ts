import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";
import { G9 as WASHINGTON } from "../../washington/units/social-59-g9";
import { OWN_SOCIAL_9 as OREGON } from "../../oregon/units/social-g9";

// California social studies, Grade 9: the Principles of American Democracy, standards 12.1 to 12.10. Washington's and
// Oregon's units are copied without their state's places or their Tribal items, with California items added;
// California's own units fill the rest. Content about American Indian nations is light and in the present tense, and
// religions are described factually and neutrally.

// ---------------------------------------------------------------------------------------------------------------
// Grade 9: Principles of American Democracy

const FOUNDATIONS_9: Q[] = [
  [
    "John Locke's idea that government needs the consent of the governed means…",
    "power comes from the people",
    [
      "power comes from the king's birth",
      "only judges hold power",
      "people have no say",
    ],
    "The Declaration says so too.",
  ],
  [
    "The idea of separation of powers in the US Constitution came largely from…",
    "Montesquieu",
    ["Machiavelli", "Confucius", "Hammurabi"],
    "He wrote The Spirit of the Laws.",
  ],
  [
    "Athenian democracy gave Americans the idea of…",
    "citizens taking part in government",
    ["rule by one king", "no written law", "military rule"],
    "Athens practiced direct democracy.",
  ],
  [
    "The Roman Republic gave Americans the idea of…",
    "elected representatives",
    ["rule by the pope", "absolute monarchy", "no laws"],
    "The Senate is named after Rome's.",
  ],
  [
    "The Magna Carta influenced the US by establishing that…",
    "even rulers must obey the law",
    ["kings are above the law", "Parliament has no power", "taxes are illegal"],
    "This is the rule of law.",
  ],
  [
    "Alexis de Tocqueville, who visited in the 1830s, praised Americans for…",
    "forming voluntary associations",
    ["obeying a king", "avoiding politics", "having no laws"],
    "He wrote Democracy in America.",
  ],
  [
    "Tocqueville warned of a danger in democracy he called the…",
    "tyranny of the majority",
    ["rule of law", "separation of powers", "Bill of Rights"],
    "A majority could trample minority rights.",
  ],
  [
    "The Founders created checks and balances because they believed…",
    "people in power can abuse it",
    [
      "leaders are always perfect",
      "government should have no limits",
      "only kings are trustworthy",
    ],
    '"If men were angels…" (Federalist 51).',
  ],
  [
    "Federalist No. 10, by James Madison, argued that a large republic…",
    "controls the effects of factions",
    ["should be ruled by one party", "will always fail", "needs a king"],
    "Many groups balance one another.",
  ],
  [
    "The Bill of Rights limits…",
    "the power of government over individuals",
    ["the rights of citizens", "the number of states", "voting"],
    "The 14th Amendment applied most of it to states.",
  ],
  [
    "Classical republicanism stresses…",
    "civic virtue and the common good",
    ["only private interests", "rule by force", "no public duties"],
    "Citizens serve the community.",
  ],
  [
    "Classical liberalism stresses…",
    "individual rights and limited government",
    ["a powerful king", "no rights", "rule by the military"],
    "Locke is a key thinker.",
  ],
  [
    "The Declaration of Independence says governments are created to…",
    "secure people's unalienable rights",
    ["make kings rich", "collect taxes only", "control trade"],
    "Life, liberty and the pursuit of happiness.",
  ],
  [
    "Popular sovereignty means…",
    "the people are the source of government's power",
    [
      "the most popular person rules",
      "kings own the land",
      "the courts choose leaders",
    ],
    '"We the People…"',
  ],
  [
    "Federalism divides power between…",
    "the national and state governments",
    [
      "the president and the pope",
      "two political parties",
      "cities and businesses",
    ],
    "Both levels govern the same people.",
  ],
  [
    "Which principle lets each branch limit the others?",
    "checks and balances",
    ["judicial restraint", "manifest destiny", "laissez-faire"],
    "The veto is one example.",
  ],
  [
    "The rule of law means…",
    "everyone, including leaders, must follow the law",
    ["leaders can break laws", "laws are optional", "only judges follow laws"],
    "No one is above the law.",
  ],
  [
    "Which document did the Constitution replace?",
    "the Articles of Confederation",
    [
      "the Magna Carta",
      "the Mayflower Compact",
      "the Declaration of Independence",
    ],
    "The Articles left the national government too weak.",
  ],
  [
    "The Mayflower Compact of 1620 was an early example of…",
    "self-government by agreement",
    ["a royal law", "a peace treaty with France", "a trade deal"],
    "Settlers agreed to make fair laws.",
  ],
  [
    "The Constitution's preamble begins with the words…",
    '"We the People"',
    ['"When in the course"', '"Four score and seven"', '"I pledge allegiance"'],
    "It names the people as the source of power.",
  ],
  [
    "Why did the Founders create a republic rather than a direct democracy?",
    "representatives could deliberate and protect minority rights",
    ["they wanted a king", "they banned voting", "the country was too small"],
    "Madison feared hasty majorities.",
    true,
  ],
  [
    "Tocqueville saw both promise and peril in American democracy, including…",
    "the danger of individualism weakening civic life",
    ["too many kings", "no elections", "no newspapers"],
    "He worried people might withdraw from public life.",
    true,
  ],
  [
    'Which Federalist Paper explains why each branch needs "the means to resist encroachments" of the others?',
    "No. 51",
    ["No. 10", "No. 78", "No. 1"],
    "Ambition must counteract ambition.",
    true,
  ],
  [
    "The Constitution balances majority rule with…",
    "protection of individual and minority rights",
    ["rule by the wealthy only", "no limits on majorities", "royal power"],
    "The Bill of Rights is one safeguard.",
    true,
  ],
  [
    "The idea of natural rights says rights come from…",
    "being human, not from government",
    ["the king's permission", "a person's wealth", "the army"],
    "Governments are formed to protect them.",
    true,
  ],
  [
    "An example of shared powers is…",
    "the Senate confirming the president's nominees",
    [
      "the president writing all laws",
      "courts electing Congress",
      "states printing money",
    ],
    "Branches must work together.",
    true,
  ],
];

const CALIFORNIA_GOV_9: Q[] = [
  [
    "California voters can propose and pass laws directly through the…",
    "initiative",
    ["veto", "filibuster", "impeachment"],
    "Enough signatures put a measure on the ballot.",
  ],
  [
    "A referendum in California lets voters…",
    "approve or reject a law the legislature passed",
    [
      "choose the president",
      "name judges for life",
      "write the US Constitution",
    ],
    "Voters get the final word.",
  ],
  [
    "A recall lets California voters…",
    "remove an elected official before the term ends",
    ["change the US Constitution", "pardon criminals", "admit a new state"],
    "Governor Gray Davis was recalled in 2003.",
  ],
  [
    "California's direct democracy features were added in 1911 during the…",
    "Progressive Era",
    ["Gold Rush", "Civil War", "colonial era"],
    "Governor Hiram Johnson backed them.",
  ],
  [
    "The California Legislature has two houses: the Senate and the…",
    "Assembly",
    ["House of Commons", "Council", "Supreme Court"],
    "40 senators and 80 Assembly members.",
  ],
  [
    "The governor of California can veto a bill, and the legislature can override with…",
    "a two-thirds vote in each house",
    ["a simple majority in one house", "a court order", "a recall"],
    "Overrides are rare.",
  ],
  [
    "The governor's line-item veto lets the governor…",
    "cut specific spending items from the budget",
    [
      "veto parts of the US Constitution",
      "fire judges",
      "change election dates",
    ],
    "It applies to spending items.",
  ],
  [
    "Which is a major source of revenue for California's state government?",
    "personal income tax",
    ["tariffs on imports", "selling stamps", "printing money"],
    "It brings in the largest share.",
  ],
  [
    "Local governments in California rely heavily on…",
    "property and sales taxes",
    ["income tax only", "tariffs", "printing money"],
    "Proposition 13 (1978) limits property taxes.",
  ],
  [
    "Which is a responsibility of state and local governments?",
    "public schools, police and roads",
    ["the army", "foreign treaties", "printing currency"],
    "These are mostly state and local jobs.",
  ],
  [
    "Reserved powers are powers that…",
    "the Constitution leaves to the states",
    [
      "only the president holds",
      "belong to other countries",
      "courts may not use",
    ],
    "The 10th Amendment reserves them.",
  ],
  [
    "Concurrent powers are powers that…",
    "both the federal and state governments have",
    ["only states have", "only cities have", "no one has"],
    "Taxing and borrowing are examples.",
  ],
  [
    "The Tenth Amendment says powers not given to the federal government are…",
    "reserved to the states or the people",
    ["held by the president", "banned forever", "given to the courts"],
    "It protects state powers.",
  ],
  [
    "The Ninth Amendment says that…",
    "listing some rights does not deny others the people keep",
    [
      "only listed rights exist",
      "states may ban speech",
      "the president can add rights",
    ],
    "Rights are not limited to the list.",
  ],
  [
    "California's trial courts are called…",
    "superior courts",
    ["supreme courts", "appellate kingdoms", "federal district courts"],
    "Each county has one.",
  ],
  [
    "Appeals from California's superior courts go first to the…",
    "Courts of Appeal",
    ["US Senate", "governor", "county board"],
    "Then the California Supreme Court.",
  ],
  [
    "Federal and state courts both exist. A case about a federal law usually goes to…",
    "a federal court",
    ["a city council", "a school board", "the state legislature"],
    "Each system has its own jurisdiction.",
  ],
  [
    "Conflicts between federal and state law are resolved by the…",
    "Supremacy Clause, which makes federal law supreme",
    ["governor's choice", "majority of states", "oldest law"],
    "Courts apply it.",
  ],
  [
    "Tribal governments in California…",
    "are sovereign and deal with the state and federal governments as governments",
    ["are run by counties", "have no courts", "are part of the legislature"],
    "Over 100 tribes in California are federally recognized.",
  ],
  [
    "Public policy is formed when…",
    "issues reach the agenda and governments pass and carry out laws and rules",
    ["a single citizen decides", "courts close", "newspapers vote"],
    "Lobbying and media shape the agenda.",
  ],
  [
    "California's Citizens Redistricting Commission draws district lines to…",
    "keep lawmakers from drawing their own districts",
    ["choose the governor", "count taxes", "pick judges"],
    "Voters created it in 2008.",
    true,
  ],
  [
    "How does lawmaking in a city differ from the state?",
    "a city council passes ordinances, often with one house and a mayor",
    [
      "cities make treaties",
      "cities need Congress's approval for every rule",
      "cities have two houses always",
    ],
    "Local lawmaking is simpler.",
    true,
  ],
  [
    "Lobbying means…",
    "trying to influence lawmakers' decisions",
    ["counting votes", "running a court", "printing ballots"],
    "Groups and citizens lobby.",
    true,
  ],
  [
    "Why do some people criticize California's initiative process?",
    "costly campaigns and complex measures can confuse voters",
    ["it lets voters decide", "it has no rules", "it is never used"],
    "There are pros and cons.",
    true,
  ],
  [
    "The president's decision to drop the atomic bomb in 1945 is a case study of…",
    "the scope of presidential power in war",
    ["state budgets", "local zoning", "jury duty"],
    "Presidents command the armed forces.",
    true,
  ],
  [
    "Which body reviews whether a California law agrees with the state constitution?",
    "the California Supreme Court",
    ["the Assembly", "the governor's cabinet", "a county board"],
    "Courts interpret constitutions.",
    true,
  ],
];

const COURT_9: Q[] = [
  [
    "Marbury v. Madison (1803) established…",
    "judicial review",
    ["the right to vote", "the income tax", "segregation"],
    "Courts can strike down unconstitutional laws.",
  ],
  [
    "McCulloch v. Maryland (1819) held that…",
    "Congress has implied powers and states cannot tax a federal bank",
    [
      "states can ignore federal laws",
      "banks are illegal",
      "Maryland owned the bank",
    ],
    "The necessary and proper clause.",
  ],
  [
    "Plessy v. Ferguson (1896) allowed…",
    'racial segregation under "separate but equal"',
    ["integration of schools", "women to vote", "child labor laws"],
    "It was overturned in 1954.",
  ],
  [
    "Brown v. Board of Education (1954) ruled that…",
    "segregated public schools are unconstitutional",
    [
      "separate but equal is fine",
      "schools may charge tuition",
      "states run all colleges",
    ],
    "It overturned Plessy.",
  ],
  [
    "Miranda v. Arizona (1966) requires police to…",
    "tell arrested people their rights",
    ["search any home", "hold people forever", "skip trials"],
    '"You have the right to remain silent."',
  ],
  [
    "Gideon v. Wainwright (1963) said that…",
    "people accused of serious crimes must be given a lawyer if they can't afford one",
    ["trials are optional", "only the rich get lawyers", "juries are banned"],
    "It applies the 6th Amendment to states.",
  ],
  [
    "Tinker v. Des Moines (1969) protected students' right to…",
    "peaceful symbolic speech at school",
    ["skip school", "carry weapons", "avoid homework"],
    "Students wore black armbands.",
  ],
  [
    "Brandenburg v. Ohio (1969) held that the government may punish speech only when it…",
    "is meant to and likely to stir up immediate lawless action",
    ["criticizes officials", "is unpopular", "is printed in a newspaper"],
    "It set a high bar for limiting speech.",
  ],
  [
    "Judicial activism describes judges who…",
    "are willing to strike down laws or expand rights broadly",
    ["never rule", "always defer to lawmakers", "refuse to hear cases"],
    "Critics and supporters disagree about it.",
  ],
  [
    "Judicial restraint describes judges who…",
    "defer to elected lawmakers and precedent when possible",
    ["make new laws", "overturn every law", "ignore the Constitution"],
    "They limit their own power.",
  ],
  [
    "Precedent, or stare decisis, means courts…",
    "follow earlier rulings in similar cases",
    ["ignore earlier rulings", "let juries write laws", "rule by coin toss"],
    "It keeps law stable.",
  ],
  [
    "Korematsu v. United States (1944) upheld…",
    "the forced removal of Japanese Americans during World War II",
    ["school integration", "the right to a lawyer", "free speech"],
    "The Court later called it wrong.",
  ],
  [
    "Loving v. Virginia (1967) struck down laws that…",
    "banned marriage between people of different races",
    ["allowed segregation", "required voting tests", "limited speech"],
    "The Lovings won.",
  ],
  [
    "Obergefell v. Hodges (2015) held that…",
    "same-sex couples have a constitutional right to marry",
    [
      "states may ban all marriages",
      "only courts can marry people",
      "marriage is a federal job",
    ],
    "It relied on the 14th Amendment.",
  ],
  [
    "New York Times v. United States (1971) allowed newspapers to publish…",
    "the Pentagon Papers",
    ["secret recipes", "ballots", "tax returns"],
    "It limited prior restraint.",
  ],
  [
    "Which amendment's equal protection clause is at the center of many civil rights cases?",
    "the 14th",
    ["the 2nd", "the 3rd", "the 21st"],
    "It was ratified in 1868.",
  ],
  [
    "Mapp v. Ohio (1961) held that…",
    "illegally seized evidence can't be used in state courts",
    ["police may search anywhere", "trials are secret", "juries are optional"],
    "This is the exclusionary rule.",
  ],
  [
    "Who appoints Supreme Court justices?",
    "the president, with the Senate's consent",
    ["the House alone", "state governors", "voters directly"],
    "The Senate holds hearings and votes.",
  ],
  [
    "Supreme Court justices serve…",
    "for life, during good behavior",
    ["four years", "six years", "until age 50"],
    "Lifetime terms protect independence.",
  ],
  [
    "How many justices sit on the US Supreme Court?",
    "9",
    ["7", "12", "50"],
    "One chief justice and eight associate justices.",
  ],
  [
    "Mendez v. Westminster (1947), a California case, ruled against…",
    "segregating Mexican American students",
    ["integrating schools", "free speech", "jury trials"],
    "It came seven years before Brown.",
    true,
  ],
  [
    "Regents of the University of California v. Bakke (1978) ruled that…",
    "racial quotas in admissions were unconstitutional, but race could be one factor",
    [
      "all admissions must be random",
      "universities must close",
      "race could never be considered in any way",
    ],
    "It was later revisited.",
    true,
  ],
  [
    "Why can interpretations of the Bill of Rights change over time?",
    "new cases, new facts and new justices lead to new readings",
    [
      "the text is rewritten every year",
      "presidents edit it",
      "it is never read",
    ],
    "The words stay; readings can change.",
    true,
  ],
  [
    "In Gibbons v. Ogden (1824), the Court ruled that…",
    "Congress controls interstate commerce",
    [
      "states control all trade",
      "steamboats were illegal",
      "New York could ban ships",
    ],
    "It strengthened federal power.",
    true,
  ],
  [
    "United States v. Nixon (1974) held that…",
    "the president must obey a subpoena; executive privilege is not absolute",
    [
      "the president is above the law",
      "tapes are private property",
      "Congress can't investigate",
    ],
    "Nixon resigned soon after.",
    true,
  ],
  [
    "Shelby County v. Holder (2013) changed the Voting Rights Act by…",
    "striking down the formula for which places needed federal approval to change voting rules",
    ["ending all voting", "giving women the vote", "banning mail ballots"],
    "Debate over its effects continues.",
    true,
  ],
];

const MEDIA_9: Q[] = [
  [
    "Why is a free press important in a democracy?",
    "it informs citizens and holds officials accountable",
    ["it tells people how to vote", "it replaces elections", "it makes laws"],
    "The First Amendment protects it.",
  ],
  [
    "Which amendment protects freedom of the press?",
    "the First",
    ["the Fifth", "the Second", "the Tenth"],
    "It also protects speech and religion.",
  ],
  [
    "A responsible press checks facts and…",
    "corrects its mistakes",
    ["hides its sources' errors", "only prints rumors", "never names sources"],
    "Accuracy builds trust.",
  ],
  [
    "Investigative journalism…",
    "digs deep to uncover wrongdoing",
    [
      "only reports sports",
      "prints press releases unchanged",
      "avoids officials",
    ],
    "The Watergate stories are an example.",
  ],
  [
    "Prior restraint means the government…",
    "stops something from being published",
    ["pays for newspapers", "reviews books after printing", "owns all TV"],
    "US courts rarely allow it.",
  ],
  [
    "Which is a broadcast medium?",
    "television and radio",
    ["newspapers", "magazines", "pamphlets"],
    "Broadcast signals go through the air.",
  ],
  [
    "Social media changed politics by…",
    "letting anyone share information instantly, true or false",
    ["ending all news", "banning campaigns", "making TV illegal"],
    "Speed can spread errors.",
  ],
  [
    "Misinformation is…",
    "false information shared, even by mistake",
    ["true information", "a type of ballot", "an official record"],
    "Check before sharing.",
  ],
  [
    "Disinformation is…",
    "false information spread on purpose to mislead",
    ["an honest mistake", "a correction", "a weather report"],
    "It is deliberate.",
  ],
  [
    "How can you check if a news story is reliable?",
    "look for named sources and check other trusted outlets",
    ["trust the headline", "count the likes", "believe it if it's shocking"],
    "Lateral reading helps.",
  ],
  [
    "A press conference lets officials…",
    "speak to reporters and the public directly",
    ["pass laws", "hold trials", "count votes"],
    "Reporters can ask questions.",
  ],
  [
    "Presidents have used radio talks, such as FDR's fireside chats, to…",
    "explain policies and build public support",
    ["avoid the public", "replace Congress", "sell products"],
    "Media helps leaders reach people.",
  ],
  [
    "An editorial is…",
    "an opinion piece from a news outlet",
    ["a news report with no opinion", "an advertisement", "a court ruling"],
    "It is labeled opinion.",
  ],
  [
    "Media bias means…",
    "a slant that favors one side",
    ["perfect balance", "only weather news", "a legal ruling"],
    "Compare several sources.",
  ],
  [
    "Agenda setting means the media…",
    "influences which issues people think about",
    ["writes laws", "counts votes", "appoints judges"],
    "Coverage signals importance.",
  ],
  [
    "A political ad's main goal is to…",
    "persuade voters",
    ["teach math", "report neutral facts only", "count ballots"],
    "Look for who paid for it.",
  ],
  [
    'Officials "spin" a story when they…',
    "present facts in the light that helps them most",
    ["read facts word for word", "refuse to speak", "count votes"],
    "Spin is selective framing.",
  ],
  [
    "Why do public officials post on social media?",
    "to speak directly to citizens without reporters in between",
    ["because it is required by law", "to hold trials", "to end elections"],
    "It shapes public opinion.",
  ],
  [
    "A primary source for a news story could be…",
    "a court document or an interview with a witness",
    ["a summary on a blog", "a rumor", "a meme"],
    "Primary sources are firsthand.",
  ],
  [
    "Which question helps you judge a source?",
    "Who made this, and why?",
    ["How many colors does it use?", "Is the font big?", "Is it short?"],
    "Purpose matters.",
    true,
  ],
  [
    "The Pentagon Papers case (1971) strengthened the press's right to…",
    "publish without government prior restraint",
    ["access any classified site", "vote in Congress", "run campaigns"],
    "The Times won.",
    true,
  ],
  [
    "Echo chambers form when people…",
    "only see views they already agree with",
    ["read many sources", "talk to opponents", "check facts"],
    "Algorithms can narrow what we see.",
    true,
  ],
  [
    "Polls reported in the news can mislead if…",
    "the sample is small or not representative",
    [
      "they ask many people",
      "they show a margin of error",
      "they explain methods",
    ],
    "Check the sample and margin.",
    true,
  ],
  [
    "Why might a story with no named source be less reliable?",
    "readers can't check who said it or why",
    ["it is always false", "it is always true", "sources are illegal"],
    "Anonymous sources need extra care.",
    true,
  ],
  [
    "The Fairness Doctrine, ended in 1987, once required broadcasters to…",
    "present contrasting views on public issues",
    ["show only sports", "avoid politics", "support the president"],
    "It applied to licensed broadcasters.",
    true,
  ],
  [
    "Deepfakes are…",
    "realistic fake videos or audio made with software",
    ["live news broadcasts", "court transcripts", "public records"],
    "Verify surprising clips.",
    true,
  ],
];

// Copies of Washington's and Oregon's Grade 9 units, with California items. They come from that state's own grade
// file, which this grade's download already carries.
const K = (id: string) => from([...WASHINGTON, ...OREGON], id);

export const SOCIAL_9: Unit[] = [
  bankUnit({
    id: "ca-g9-foundations",
    title: "Foundations of Democracy",
    emoji: "📜",
    blurb: "Ideas behind the Constitution",
    parentNote:
      "Greek, Roman, English and Enlightenment roots of American government, Tocqueville's view of American democracy, republican and liberal ideas, the Federalist Papers and the Bill of Rights as a limit on government.",
    standards: [
      "12.1.1; 12.1.2; 12.1.3; 12.1.4; 12.1.5; 12.1.6",
      "the influence of earlier thinkers, Tocqueville on American democracy, the Constitution's balance of ideas, separated powers and the Bill of Rights as limits on government",
    ],
    items: FOUNDATIONS_9,
  }),
  copyOf(K("wa-g9-three-branches"), {
    id: "ca-g9-three-branches",
    title: "Three Branches",
    emoji: "🏛️",
    blurb: "Congress, the president and the courts",
    parentNote:
      "How Articles I, II and III set up Congress, the presidency and the courts, terms and numbers, amending the Constitution, and choosing and confirming justices.",
    standards: [
      "12.4.1; 12.4.2; 12.4.4; 12.4.5; 12.4.6",
      "Articles I, II and III, amending the Constitution, and selecting and confirming Supreme Court justices",
    ],
  }),
  copyOf(K("wa-g9-rights"), {
    id: "ca-g9-rights",
    title: "Rights & Responsibilities",
    emoji: "⚖️",
    blurb: "The Bill of Rights and citizens' duties",
    parentNote:
      "The rights in the Bill of Rights and later amendments, civil rights laws, citizens' duties such as jury service and paying taxes, and how rights are balanced with the common good.",
    standards: [
      "12.2.1; 12.2.3; 12.2.5; 12.5.4",
      "the rights in the Bill of Rights, citizens' legal obligations, the link between rights and obligations, and changing interpretations of civil rights",
    ],
  }),
  bankUnit({
    id: "ca-g9-supreme-court",
    title: "Landmark Supreme Court Cases",
    emoji: "👩‍⚖️",
    blurb: "How the Court reads the Constitution",
    parentNote:
      "Landmark decisions from Marbury v. Madison to recent cases, judicial activism and restraint, precedent, and how readings of the Bill of Rights and civil rights have changed, presented factually and from more than one side.",
    standards: [
      "12.5.1; 12.5.2; 12.5.3; 12.5.4",
      "landmark Supreme Court interpretations of the Constitution, judicial activism and restraint, and changing readings of rights",
    ],
    items: COURT_9,
  }),
  copyOf(
    K("wa-g9-elections"),
    {
      id: "ca-g9-elections",
      title: "Elections & Voting",
      emoji: "🗳️",
      blurb: "From pre-registering to the Electoral College",
      parentNote:
        "How Californians register and vote, the top-two primary, parties and nominations, the Electoral College, polls and campaign money, and redistricting.",
      standards: [
        "12.6.1; 12.6.2; 12.6.3; 12.6.4; 12.6.6",
        "political parties, presidential nominations, polls, ads and campaign funding, ways citizens take part, turnout and redistricting",
      ],
    },
    [
      [
        "In California, 16- and 17-year-olds can…",
        "pre-register to vote",
        ["vote in every election", "run for governor", "serve on juries"],
        "They are registered automatically at 18.",
      ],
      [
        "Since 2022, every registered California voter is…",
        "mailed a ballot for each statewide election",
        [
          "required to vote in person",
          "banned from mail voting",
          "sent a ballot only on request",
        ],
        "Voters can still vote in person.",
      ],
      [
        "California uses a top-two primary, which means…",
        "the top two vote-getters advance, whatever their party",
        [
          "only two parties may run",
          "each party picks one candidate",
          "there is no primary",
        ],
        "Voters passed it in 2010.",
      ],
      [
        "How many electoral votes does California have in the 2024 to 2028 elections?",
        "54",
        ["55", "38", "2"],
        "It has the most of any state.",
      ],
      [
        "How many members does California send to the US House?",
        "52",
        ["53", "2", "80"],
        "Seats are based on population.",
      ],
      [
        "Who oversees elections statewide in California?",
        "the Secretary of State",
        ["the governor's chef", "the chief justice", "the mayor of Sacramento"],
        "County registrars run local voting.",
      ],
      [
        "A California mail ballot counts if it is postmarked by Election Day and…",
        "arrives within seven days",
        [
          "arrives a month later",
          "is never signed",
          "is mailed after the results",
        ],
        "Signatures are checked.",
      ],
      [
        "Redistricting happens every ten years after the…",
        "census",
        ["Olympics", "World Cup", "Super Bowl"],
        "Lines shift as populations change.",
      ],
    ],
  ),
  copyOf(
    K("wa-g9-lawmaking"),
    {
      id: "ca-g9-lawmaking",
      title: "How Laws Are Made",
      emoji: "📑",
      blurb: "Bills, vetoes and initiatives",
      parentNote:
        "How a bill becomes law in Congress and in Sacramento, committees, vetoes and overrides, regulations, and how citizens and interest groups influence lawmaking.",
      standards: [
        "12.7.5; 12.7.6",
        "how public policy is formed and carried out, and lawmaking at the federal, state and local levels",
      ],
    },
    [
      [
        "In California, a bill passed by both houses goes to the governor, who has how long to act?",
        "12 days",
        ["1 year", "1 hour", "no limit"],
        "Otherwise it becomes law without a signature.",
      ],
      [
        "The California Legislature meets in the State Capitol in…",
        "Sacramento",
        ["Los Angeles", "San Francisco", "Fresno"],
        "It has a Senate and an Assembly.",
      ],
      [
        "To override a governor's veto, the California Legislature needs…",
        "a two-thirds vote in each house",
        ["a simple majority", "a court order", "a recall"],
        "Overrides are rare.",
      ],
      [
        "In California, citizens can put a proposed law on the ballot through…",
        "an initiative petition",
        ["a veto", "a filibuster", "an executive order"],
        "They must gather enough signatures.",
      ],
      [
        "Members of the public can speak about a bill at a…",
        "committee hearing",
        ["closed jury room", "private dinner", "governor's home"],
        "Committees take public testimony.",
      ],
      [
        "An interest group that hires people to talk to lawmakers is…",
        "lobbying",
        ["voting", "campaigning for president", "running a court"],
        "Lobbyists must register in California.",
      ],
    ],
  ),
  copyOf(K("wa-g9-civic-action"), {
    id: "ca-g9-civic-action",
    title: "Taking Part",
    emoji: "📣",
    blurb: "Speak up, check facts, decide together",
    parentNote:
      "Ways to take part before and after 18, volunteering and civil society, petitions and peaceful protest, deliberating about tensions in our democracy, and checking news for reliability.",
    standards: [
      "12.2.4; 12.3.1; 12.3.2; 12.10",
      "civic-mindedness, how civil society lets people associate and influence government, and tensions within our constitutional democracy",
    ],
  }),
  copyOf(K("or-g9-forms-of-government"), {
    id: "ca-g9-forms-of-government",
    title: "Forms of Government",
    emoji: "🌐",
    blurb: "Democracy, monarchy and more",
    parentNote:
      "Democracies, monarchies, oligarchies and authoritarian states, federal, confederal and unitary systems, and the roots of American ideas about limited government.",
    standards: [
      "12.9.1; 12.9.2; 12.9.3",
      "different political systems, how power is shared and limited, and federal, confederal and unitary systems",
    ],
  }),
  bankUnit({
    id: "ca-g9-california-government",
    title: "Governing California",
    emoji: "🐻",
    blurb: "State, local and tribal government",
    parentNote:
      "California's initiative, referendum and recall, its legislature, governor and courts, state and local revenue, reserved and concurrent powers, the Ninth and Tenth Amendments, tribal governments, and how conflicts between levels of government are resolved.",
    standards: [
      "12.6.5; 12.7.1; 12.7.2; 12.7.3; 12.7.4; 12.7.7; 12.7.8",
      "direct democracy, conflicts between levels of government, state and local revenue, reserved and concurrent powers, the courts and presidential power",
    ],
    items: CALIFORNIA_GOV_9,
  }),
  bankUnit({
    id: "ca-g9-media",
    title: "Media & Democracy",
    emoji: "📰",
    blurb: "A free press and a careful public",
    parentNote:
      "Why a free and responsible press matters, broadcast, print and online media, how officials use media to shape opinion, and how to spot misinformation, bias and spin.",
    standards: [
      "12.8.1; 12.8.2; 12.8.3",
      "a free and responsible press, the roles of broadcast, print and electronic media, and how officials use media to shape public opinion",
    ],
    items: MEDIA_9,
  }),
];
