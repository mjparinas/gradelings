import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { copyOf, from } from "./kit";
import { G8 as WASHINGTON } from "../../washington/units/social-59-g8";

// California social studies, Grade 8: the United States to 1914. Washington's and Oregon's units are copied without
// their state's places or their Tribal items, with California items added; California's own units fill the rest.
// Content about American Indian nations is light and in the present tense, and religions are described factually and
// neutrally.

// ---------------------------------------------------------------------------------------------------------------
// Grade 8

const INDUSTRIAL: Q[] = [
  [
    "After the Civil War, US industry grew because of…",
    "railroads, natural resources and new inventions",
    ["fewer workers", "no new machines", "less trade"],
    "The US became an industrial power.",
  ],
  [
    "Andrew Carnegie built a fortune in…",
    "steel",
    ["cotton", "gold mining", "movies"],
    "Steel built railroads and cities.",
  ],
  [
    "John D. Rockefeller built a fortune in…",
    "oil refining",
    ["steel", "fur trading", "farming"],
    "His company controlled most of the industry.",
  ],
  [
    "A monopoly is…",
    "one company controlling a whole industry",
    ["a small family farm", "a labor union", "a city park"],
    "Monopolies can raise prices.",
  ],
  [
    "The Sherman Antitrust Act of 1890 tried to…",
    "break up monopolies and protect competition",
    ["build railroads", "end immigration", "raise tariffs"],
    "Trusts limited competition.",
  ],
  [
    "Thomas Edison's inventions included the phonograph and a practical…",
    "light bulb",
    ["airplane", "telephone", "automobile"],
    "His lab was in Menlo Park, New Jersey.",
  ],
  [
    "Alexander Graham Bell is known for the…",
    "telephone",
    ["steel plow", "cotton gin", "telegraph"],
    "He patented it in 1876.",
  ],
  [
    "Between 1880 and 1914, many new immigrants came from…",
    "southern and eastern Europe",
    ["Australia", "Antarctica", "Canada only"],
    "Many came through Ellis Island.",
  ],
  [
    "Many immigrants arriving on the East Coast passed through…",
    "Ellis Island",
    ["Angel Island", "Alcatraz", "Plymouth Rock"],
    "It opened in 1892.",
  ],
  [
    "Many cities grew quickly because…",
    "factory jobs drew workers from farms and other countries",
    [
      "farms needed more workers",
      "cities banned newcomers",
      "factories were in the country",
    ],
    "This is urbanization.",
  ],
  [
    "Tenements were…",
    "crowded, unsafe apartment buildings",
    ["large farms", "factories", "railroad cars"],
    "Many immigrant families lived in them.",
  ],
  [
    "Jacob Riis's book How the Other Half Lives showed…",
    "the hard lives of the poor in tenements",
    ["the lives of kings", "the West's gold fields", "farm machines"],
    "He used photographs.",
  ],
  [
    "Child labor meant that many children…",
    "worked long hours in factories, mines and mills",
    ["went to college early", "ran companies", "had long vacations"],
    "Reformers fought to end it.",
  ],
  [
    "Workers formed labor unions to…",
    "bargain together for better pay and safer work",
    ["own the factories", "stop all trade", "raise prices"],
    "There is strength in numbers.",
  ],
  [
    "Samuel Gompers led the…",
    "American Federation of Labor",
    ["Sierra Club", "Grange", "Red Cross"],
    "It united skilled workers.",
  ],
  [
    "Laissez-faire means the government should…",
    "leave business mostly alone",
    ["run every business", "ban all trade", "set every price"],
    "It is French for 'let do'.",
  ],
  [
    "Farmers formed the Grange to…",
    "fight high railroad rates and help one another",
    ["build factories", "end farming", "mine gold"],
    "It began in 1867.",
  ],
  [
    "The Populist Party of the 1890s spoke for…",
    "farmers and workers",
    ["railroad owners", "bankers only", "foreign kings"],
    "It called for railroad regulation.",
  ],
  [
    "Jane Addams founded Hull House in Chicago to…",
    "help immigrants and the poor",
    ["build railroads", "sell steel", "run elections"],
    "It was a settlement house.",
  ],
  [
    "The government encouraged railroads by giving them…",
    "land grants",
    ["no help", "only taxes", "free airplanes"],
    "Railroads got millions of acres.",
  ],
  [
    "The Chinese Exclusion Act of 1882 shows that…",
    "some Americans turned against immigrants",
    [
      "immigration was always welcomed",
      "only Europeans faced limits",
      "China banned travel",
    ],
    "It was the first major limit by nationality.",
    true,
  ],
  [
    "How did federal Indian policy change Plains nations after the Civil War?",
    "the government forced nations onto reservations as settlers and railroads took land",
    ["nations gained more land", "nothing changed", "settlers moved east"],
    "Wars and broken agreements followed.",
    true,
  ],
  [
    "The slaughter of the buffalo in the 1870s and 1880s harmed Plains nations because…",
    "they depended on the buffalo for food and shelter",
    ["buffalo were pets", "buffalo pulled wagons", "it had no effect"],
    "Millions of bison were killed.",
    true,
  ],
  [
    "Why did farms in the West grow wheat and cattle while the South grew cotton?",
    "climate, soil and resources differed by region",
    [
      "laws banned other crops",
      "everyone chose randomly",
      "railroads chose the crops",
    ],
    "Geography shapes farming.",
    true,
  ],
  [
    "The Homestead Act of 1862 offered settlers…",
    "160 acres of land if they farmed it for five years",
    ["free railroad tickets", "gold coins", "a house in the city"],
    "Many families moved west.",
    true,
  ],
  [
    "The Triangle Shirtwaist Factory fire of 1911 led to…",
    "new workplace safety laws",
    ["more child labor", "lower wages", "the end of unions"],
    "Locked doors trapped workers.",
    true,
  ],
  [
    "Tariffs helped American industry by…",
    "making imported goods more expensive",
    [
      "banning all factories",
      "lowering prices on imports",
      "ending trade between states",
    ],
    "Higher prices on imports helped US makers.",
  ],
  [
    "George Westinghouse and Nikola Tesla helped spread…",
    "alternating current (AC) electricity",
    ["the steam engine", "the cotton gin", "the telegraph"],
    "AC power could travel long distances.",
  ],
  [
    "The Wright brothers made the first powered airplane flight in…",
    "1903",
    ["1869", "1849", "1776"],
    "They flew at Kitty Hawk, North Carolina.",
  ],
  [
    "Henry Ford's moving assembly line made cars…",
    "faster and cheaper to build",
    ["by hand one at a time", "more expensive", "only for kings"],
    "The Model T sold millions.",
  ],
  [
    "The Pullman Strike of 1894 began when the Pullman Company…",
    "cut wages but not rents in its company town",
    ["raised wages", "closed all railroads", "hired more children"],
    "Federal troops ended the strike.",
    true,
  ],
  [
    'Mary Harris "Mother" Jones was known for…',
    "organizing workers and fighting child labor",
    ["owning steel mills", "inventing the telephone", "running for president"],
    "She led a march of child workers in 1903.",
    true,
  ],
];

const ANTEBELLUM: Q[] = [
  [
    "The cotton gin, invented in 1793, made cotton farming…",
    "much more profitable, which increased slavery",
    ["impossible", "less common", "legal only in the North"],
    "Eli Whitney invented it.",
  ],
  [
    "The South's economy before the Civil War depended mostly on…",
    "farming cash crops like cotton with enslaved labor",
    ["factories", "fishing", "gold mining"],
    "Cotton was called 'King Cotton'.",
  ],
  [
    "Enslaved people resisted slavery by…",
    "escaping, slowing work, keeping culture and rebelling",
    ["never resisting", "buying plantations", "voting"],
    "Resistance took many forms.",
  ],
  [
    "Nat Turner led a rebellion against slavery in Virginia in…",
    "1831",
    ["1776", "1865", "1800"],
    "Southern states then passed harsher laws.",
  ],
  [
    "Frederick Douglass escaped slavery and became…",
    "a famous speaker and writer against slavery",
    ["a plantation owner", "a Confederate general", "president"],
    "He published the North Star newspaper.",
  ],
  [
    "Harriet Tubman made many trips south to…",
    "lead enslaved people to freedom",
    ["sell cotton", "join the Confederacy", "find gold"],
    "She was a conductor on the Underground Railroad.",
  ],
  [
    "Sojourner Truth spoke out for…",
    "abolition and women's rights",
    ["more slavery", "the gold rush", "railroads"],
    'Her famous speech is "Ain\'t I a Woman?"',
  ],
  [
    "William Lloyd Garrison published The Liberator to…",
    "call for an immediate end to slavery",
    ["sell newspapers about sports", "support slavery", "advertise farms"],
    "It began in 1831.",
  ],
  [
    "The Northwest Ordinance of 1787 banned slavery in…",
    "the territory north of the Ohio River",
    ["the whole country", "the South", "California"],
    "It also set up public schools.",
  ],
  [
    "Some Northern states ended slavery after the Revolution through…",
    "their state constitutions and laws",
    ["royal orders", "the Gold Rush", "foreign treaties"],
    "Vermont banned it first in 1777.",
  ],
  [
    "Free Black people in the North still faced…",
    "unfair laws and limits on voting and jobs",
    ["no limits at all", "free land", "special privileges"],
    "Freedom was not equality.",
  ],
  [
    "Free Black people in the South often had to…",
    "carry papers proving their freedom",
    ["own plantations", "serve in Congress", "live in castles"],
    "They risked being kidnapped into slavery.",
  ],
  [
    "The Missouri Compromise of 1820…",
    "admitted Missouri as a slave state and Maine as a free state",
    ["ended slavery", "made California a state", "started the Civil War"],
    "It drew a line at 36°30′.",
  ],
  [
    "The Wilmot Proviso proposed to…",
    "ban slavery in land won from Mexico",
    ["make slavery legal everywhere", "buy Alaska", "end the railroad"],
    "It never passed the Senate.",
  ],
  [
    "California's admission as a free state in 1850 was part of a compromise that also included…",
    "a stronger Fugitive Slave Act",
    ["the end of slavery", "the Louisiana Purchase", "the Missouri Compromise"],
    "It upset the balance of free and slave states.",
  ],
  [
    "The Fugitive Slave Act of 1850 required people in free states to…",
    "help return people who had escaped slavery",
    ["free all enslaved people", "move west", "pay no taxes"],
    "Many Northerners refused.",
  ],
  [
    "The Kansas-Nebraska Act of 1854 let settlers…",
    "vote on whether to allow slavery",
    ["ban all farming", "join Canada", "found missions"],
    "This was popular sovereignty.",
  ],
  [
    "Violence between pro- and antislavery settlers in the 1850s was called…",
    "Bleeding Kansas",
    ["the Boston Massacre", "the Trail of Tears", "the Whiskey Rebellion"],
    "Kansas became a battleground.",
  ],
  [
    "The Dred Scott decision of 1857 ruled that…",
    "Black Americans were not citizens and Congress could not ban slavery in territories",
    ["slavery was illegal", "all people were citizens", "Kansas was free"],
    "It inflamed the nation.",
  ],
  [
    "The annexation of Texas in 1845 raised the slavery issue because…",
    "Texas would enter as a slave state",
    ["Texas banned slavery", "Texas was part of Canada", "Texas had no people"],
    "It added slave-state power.",
    true,
  ],
  [
    "States' rights supporters argued that states could…",
    "reject federal laws they believed unconstitutional",
    [
      "print their own money only",
      "elect the president alone",
      "ignore the Constitution entirely",
    ],
    "This is called nullification.",
    true,
  ],
  [
    "John C. Calhoun of South Carolina was a leading voice for…",
    "states' rights and slavery",
    ["abolition", "women's suffrage", "free soil"],
    "He served as vice president.",
    true,
  ],
  [
    "Uncle Tom's Cabin, by Harriet Beecher Stowe, turned many Northerners against…",
    "slavery",
    ["railroads", "immigration", "the Constitution"],
    "It was published in 1852.",
    true,
  ],
  [
    "How did the South's warm climate and rich soil shape its society?",
    "large plantations grew cash crops worked by enslaved people",
    [
      "factories filled every town",
      "no one farmed",
      "it had the most railroads",
    ],
    "Geography shaped the economy.",
    true,
  ],
  [
    "The Underground Railroad was…",
    "a secret network of people and safe houses helping people escape slavery",
    [
      "a real train under the ground",
      "a railroad company",
      "a road to California",
    ],
    "Many routes led to the North and Canada.",
    true,
  ],
  [
    "The Free Soil Party wanted to…",
    "stop slavery from spreading into new territories",
    ["spread slavery west", "end all farming", "buy Cuba"],
    "Its slogan was free soil, free speech, free labor.",
    true,
  ],
];

// Copies of Washington's Grade 8 units, with California items. They come from that state's own grade
// file, which this grade's download already carries.
const K = (id: string) => from([...WASHINGTON], id);

export const SOCIAL_8: Unit[] = [
  copyOf(
    K("wa-g8-founding-ideals"),
    {
      id: "ca-g8-founding-ideals",
      title: "Founding Ideals",
      emoji: "📜",
      blurb: "Declaration, Constitution and their roots",
      parentNote:
        "The Magna Carta, English Bill of Rights and Mayflower Compact, the Declaration of Independence, the debates of 1787, the Federalist Papers, and the principles of the Constitution.",
      standards: [
        "8.1.2; 8.2.1; 8.2.2; 8.2.3; 8.2.4; 8.2.7",
        "the Declaration of Independence, the roots and principles of the Constitution, and the debates over it",
      ],
    },
    [
      [
        "The Federalist Papers were written to persuade New York to…",
        "ratify the Constitution",
        ["reject the Constitution", "join Canada", "declare war"],
        "Hamilton, Madison and Jay wrote them.",
      ],
      [
        "Anti-Federalists worried the Constitution would…",
        "make the national government too strong",
        ["make states too strong", "end elections", "create a king"],
        "They pushed for a Bill of Rights.",
      ],
      [
        "Jefferson's Virginia Statute for Religious Freedom was a forerunner of…",
        "the First Amendment",
        [
          "the Second Amendment",
          "the Articles of Confederation",
          "the Electoral College",
        ],
        "It separated church and state in Virginia.",
      ],
    ],
  ),
  copyOf(
    K("wa-g8-new-nation"),
    {
      id: "ca-g8-new-nation",
      title: "A New Nation",
      emoji: "🦅",
      blurb: "The first presidents to the Monroe Doctrine",
      parentNote:
        "The first presidents and parties, judicial review, the Louisiana Purchase, Lewis and Clark, the War of 1812 and early foreign policy.",
      standards: [
        "8.3.4; 8.3.5; 8.4.1; 8.4.2; 8.5.1; 8.5.2",
        "the first political parties, early resistance movements, territorial growth, famous speeches, the War of 1812 and early foreign policy",
      ],
    },
    [
      [
        "The first two political parties formed around…",
        "Alexander Hamilton and Thomas Jefferson",
        ["Lincoln and Douglas", "Grant and Lee", "Adams and Kennedy"],
        "Federalists and Democratic-Republicans.",
      ],
      [
        "George Washington's Farewell Address warned against…",
        "political parties and permanent foreign alliances",
        ["building roads", "public schools", "farming"],
        "He gave it in 1796.",
      ],
      [
        "The Whiskey Rebellion of 1794 showed that…",
        "the new federal government could enforce its laws",
        [
          "states could ignore taxes",
          "the army was disbanded",
          "Britain still ruled",
        ],
        "George Washington sent troops to end it.",
      ],
      [
        "The Monroe Doctrine of 1823 warned European powers not to…",
        "start new colonies in the Americas",
        ["trade with the US", "visit Mexico", "cross the Atlantic"],
        "It became a pillar of US foreign policy.",
      ],
      [
        "During the War of 1812, British troops burned…",
        "the White House",
        ["the Alamo", "the Golden Gate", "Fort Ross"],
        "Dolley Madison saved a portrait.",
      ],
      [
        "The Star-Spangled Banner was written during the attack on…",
        "Fort McHenry in Baltimore",
        ["Bunker Hill", "Gettysburg", "Pearl Harbor"],
        "Francis Scott Key wrote it in 1814.",
      ],
      [
        "Jefferson's first inaugural address said…",
        '"We are all Republicans, we are all Federalists"',
        [
          '"Remember the Alamo"',
          '"Give me liberty"',
          '"Four score and seven years ago"',
        ],
        "He called for unity.",
      ],
      [
        "Shays' Rebellion (1786–1787) convinced many leaders that…",
        "the Articles of Confederation were too weak",
        [
          "the states needed kings",
          "taxes should end",
          "Britain should return",
        ],
        "Farmers rose up in Massachusetts.",
      ],
    ],
  ),
  copyOf(
    K("wa-g8-westward"),
    {
      id: "ca-g8-westward",
      title: "Westward Expansion",
      emoji: "🐂",
      blurb: "Manifest Destiny and its costs",
      parentNote:
        "Jackson and Indian removal, Manifest Destiny, Mexican California and the land grants, Texas and the Mexican-American War, and the Gold Rush, told accurately for the people who moved and the nations who lost their lands.",
      standards: [
        "8.8.1; 8.8.2; 8.8.4; 8.8.5; 8.8.6",
        "Jacksonian democracy and Indian removal, westward expansion, water rights, Mexican settlements, and the Texas and Mexican-American wars",
      ],
    },
    [
      [
        "The Indian Removal Act of 1830 was signed by President…",
        "Andrew Jackson",
        ["George Washington", "Abraham Lincoln", "James Polk"],
        "It forced nations from the Southeast.",
      ],
      [
        "The forced march of the Cherokee to Indian Territory in 1838 is called the…",
        "Trail of Tears",
        ["Oregon Trail", "Santa Fe Trail", "Pony Express"],
        "Thousands died on the way.",
      ],
      [
        "Mexican land grants in California created large…",
        "ranchos for raising cattle",
        ["factories", "railroad towns", "gold mines"],
        "Californios owned many.",
      ],
      [
        "The Treaty of Guadalupe Hidalgo (1848) promised Mexicans who stayed in the US…",
        "citizenship and protection of their property",
        ["free gold", "a new country", "nothing"],
        "Many still lost their land.",
      ],
      [
        "Why did water rights matter so much in the West?",
        "the dry land made river water scarce and valuable",
        ["it rained too much", "rivers were useless", "no one farmed"],
        "Whoever controls water controls farming.",
      ],
      [
        "Jacksonian democracy expanded voting to…",
        "most white men, without property requirements",
        ["women", "all people", "enslaved people"],
        "It was still limited.",
      ],
      [
        "President James K. Polk led the US into war with…",
        "Mexico in 1846",
        ["Spain in 1898", "Britain in 1812", "France in 1798"],
        "He wanted California and the Southwest.",
      ],
      [
        "At the Alamo in 1836, Texan defenders were defeated by…",
        "Mexican troops under Santa Anna",
        ["British troops", "the US Army", "Spanish missionaries"],
        '"Remember the Alamo" became a rallying cry.',
      ],
    ],
  ),
  copyOf(
    K("wa-g8-industry-reform"),
    {
      id: "ca-g8-industry-reform",
      title: "Factories & Reformers",
      emoji: "⚙️",
      blurb: "Inventions, immigrants and reform",
      parentNote:
        "The Industrial Revolution in the North, canals, roads and railroads, immigration, public schools, and the abolition and women's rights movements before 1861.",
      standards: [
        "8.6.1; 8.6.2; 8.6.3; 8.6.5; 8.6.6",
        "industrialization, transportation networks, immigration, the American education system and the women's suffrage movement",
      ],
    },
    [
      [
        "The Seneca Falls Convention of 1848 called for…",
        "equal rights for women, including the vote",
        ["ending all schools", "a new king", "closing factories"],
        "Elizabeth Cady Stanton wrote its Declaration of Sentiments.",
      ],
      [
        "Horace Mann worked to build…",
        "free public schools for all children",
        ["private castles", "railroads", "canals only"],
        "He led schools in Massachusetts.",
      ],
      [
        "The Lowell mills in Massachusetts hired many…",
        "young women from farms",
        ["kings", "soldiers", "sailors from Spain"],
        "They were called mill girls.",
      ],
    ],
  ),
  copyOf(
    K("wa-g8-civil-war"),
    {
      id: "ca-g8-civil-war",
      title: "The Civil War",
      emoji: "⚔️",
      blurb: "Slavery, secession and war",
      parentNote:
        "How the conflict over slavery led to secession and war, Lincoln's leadership, key events and people from Fort Sumter to Appomattox, and how enslaved people helped win their own freedom.",
      standards: [
        "8.10.1; 8.10.2; 8.10.3; 8.10.4; 8.10.5; 8.10.6; 8.10.7",
        "state and federal authority, the geography of North and South, secession, Lincoln, the war's leaders and major battles, and its effects",
      ],
    },
    [
      [
        "At the start of the Civil War, the North had more…",
        "factories, railroads and people",
        ["cotton plantations", "enslaved workers", "warm farmland"],
        "Industry gave the Union an advantage.",
      ],
      [
        "Which advantage did the South have early in the war?",
        "fighting on home ground with skilled generals",
        ["more factories", "a larger navy", "more railroads"],
        "Defenders knew the land.",
      ],
      [
        "The Union's Anaconda Plan aimed to…",
        "blockade Southern ports and control the Mississippi",
        ["invade Canada", "buy Cuba", "end the war in a week"],
        "Like a snake squeezing its prey.",
      ],
      [
        "California, a free state, mostly supported the…",
        "Union",
        ["Confederacy", "British", "neutral Mexico"],
        "Its gold helped pay for the war.",
      ],
      [
        "Ulysses S. Grant led the Union to victory at…",
        "Vicksburg in 1863",
        ["Fort Sumter in 1861", "Yorktown in 1781", "the Alamo in 1836"],
        "It split the Confederacy in two.",
      ],
    ],
  ),
  bankUnit({
    id: "ca-g8-divided-nation",
    title: "A Nation Divided",
    emoji: "🧭",
    blurb: "The South, abolition and compromise",
    parentNote:
      "Cotton and slavery in the South, the resistance of enslaved people, free Black Americans in the North and South, abolitionists, and the compromises and conflicts from the Missouri Compromise to the Dred Scott decision.",
    standards: [
      "8.7.1; 8.7.2; 8.7.4; 8.9.1; 8.9.2; 8.9.3; 8.9.4; 8.9.5; 8.9.6",
      "the South's economy and slavery, free Black Americans, the abolition movement, and the compromises and conflicts over slavery's spread",
    ],
    items: ANTEBELLUM,
  }),
  bankUnit({
    id: "ca-g8-industrial-america",
    title: "Industrial America",
    emoji: "🏭",
    blurb: "Big business, cities and workers",
    parentNote:
      "Industry, railroads and inventors after the Civil War, big business and monopolies, new immigrants and growing cities, child labor and unions, farmers' movements, and federal Indian policy on the Plains.",
    standards: [
      "8.12.1; 8.12.2; 8.12.3; 8.12.4; 8.12.5; 8.12.6; 8.12.7; 8.12.8; 8.12.9",
      "the transformation of the economy after the Civil War: industry, federal Indian policy, business, immigration and cities, labor, farmers' movements and inventors",
    ],
    items: INDUSTRIAL,
  }),
];
