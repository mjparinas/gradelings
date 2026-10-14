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

// Grade 8, California's own units: ideas of the Revolution (8.1.1; 8.1.3; 8.1.4; 8.2.5; 8.3.1), the Constitution at work
// (8.3.2; 8.3.3; 8.3.6; 8.3.7), the early republic (8.4.3; 8.4.4; 8.5.3; 8.6.7) and freedom and change (8.6.4; 8.7.3;
// 8.8.3; 8.11.2). American Indian nations are named as living nations; religions are described factually.

const REVOLUTION_IDEAS_8: Q[] = [
  ["The First Great Awakening taught that each person could have a direct relationship with God, which encouraged colonists to…", "question established authorities", ["obey every official without question", "give up religion", "support the king's taxes"], "Many left the official churches."],
  ["Some ministers of the Great Awakening and after preached that…", "liberty and resisting tyranny were moral duties", ["kings ruled by divine right in all things", "colonists should never protest", "politics did not matter"], "Religion and politics mixed in sermons."],
  ["The Great Awakening helped prepare colonists for revolution by…", "spreading ideas of equality and self-reliance across colonies", ["making them loyal to Parliament", "ending all churches", "uniting them with France"], "Shared experiences linked colonists."],
  ["The American Revolution inspired the French Revolution, which began in…", "1789", ["1776", "1812", "1848"], "The French Declaration of the Rights of Man followed."],
  ["The Marquis de Lafayette fought in the American Revolution and later…", "brought its ideas to France", ["became king of England", "led the British army", "founded Haiti"], "He helped draft the Declaration of the Rights of Man."],
  ["France's spending to help the American Revolution added to…", "the debts that helped cause the French Revolution", ["France's new wealth", "the end of all taxes", "the Louisiana Purchase being cancelled"], "The king needed new taxes."],
  ["Inspired partly by the American and French revolutions, enslaved people in Haiti, led by Toussaint Louverture…", "won independence and ended slavery there", ["joined the British Empire", "stayed colonists of Spain", "moved to Louisiana"], "Haiti became independent in 1804."],
  ["Simón Bolívar, inspired by American independence, led independence movements in…", "South America", ["Europe", "Asia", "Africa"], "Several nations call him the Liberator."],
  ["Civic republicanism stresses…", "citizens' duty to put the common good first", ["rule by one party", "obeying a king", "keeping citizens out of politics"], "Virtue mattered to the founders."],
  ["Classical liberal principles, as John Locke described them, stress…", "natural rights such as life, liberty and property", ["the divine right of kings", "rule by the army", "no limits on government"], "Government exists to protect rights."],
  ["English parliamentary traditions that shaped the US include…", "elected assemblies, the Magna Carta and the English Bill of Rights", ["a pharaoh's rule", "the caste system", "rule by shoguns"], "Colonists saw themselves as English subjects with rights."],
  ["The idea that government needs the consent of the governed comes from…", "classical liberal thinkers such as Locke", ["the Code of Hammurabi", "the Qin dynasty", "the pharaohs"], "It is in the Declaration of Independence."],
  ["Jefferson's Virginia Statute for Religious Freedom (1786) said that no one could be forced to…", "support or attend any church", ["pay any taxes", "serve on a jury", "vote"], "It ended Virginia's official church."],
  ["James Madison helped pass the Virginia Statute for Religious Freedom and later wrote the…", "First Amendment", ["Second Amendment", "Articles of Confederation", "Emancipation Proclamation"], "Madison drafted the Bill of Rights."],
  ["The First Amendment's establishment clause means the government may not…", "set up an official national religion", ["allow any religion", "let people pray", "protect speech"], "It keeps government from sponsoring a church."],
  ["The free exercise clause protects people's right to…", "practice their religion or none", ["avoid all laws", "vote twice", "own any weapon"], "Freedom of conscience."],
  ["Jefferson described the First Amendment as building a…", "wall of separation between church and state", ["bridge between church and state", "national church", "royal court"], "He wrote this in an 1802 letter."],
  ["Between 1776 and 1781, most states wrote constitutions that began with…", "a declaration or bill of rights", ["a list of kings", "a call for war", "a ban on elections"], "They listed freedoms first."],
  ["Most early state constitutions made the governor weak because Americans feared…", "executive power like a king's", ["too many voters", "a strong legislature", "free speech"], "Legislatures held most power."],
  ["The Massachusetts Constitution of 1780 was unusual because it was…", "approved by the people through a special convention and vote", ["written by the king", "never used", "kept secret"], "It is still in force today."],
  ["The early state constitutions gave Americans experience with…", "written constitutions and separated powers", ["rule by nobles", "military government", "no government at all"], "They were models for the US Constitution."],
  ["In most early states, voting was limited to…", "white men who owned property", ["all adults", "women only", "people under 21"], "Voting rights widened slowly over time.", true],
  ["How did the American Revolution affect people in other nations?", "it showed that people could overthrow a ruler and found a republic", ["it ended all monarchies at once", "it had no effect", "it made France a colony"], "Revolutions followed in France, Haiti and Latin America.", true],
  ["Why is the Virginia Statute called a forerunner of the First Amendment?", "it made religious freedom and no state church law in Virginia first", ["it banned religion", "it created an official church", "it was written after 1791"], "Compare 1786 and 1791.", true],
  ["How did state constitutions shape the US Constitution of 1787?", "framers borrowed tested ideas such as separation of powers and bills of rights", ["they were ignored completely", "the US Constitution banned them", "they gave all power to Britain"], "States were laboratories.", true],
];

const CONSTITUTION_AT_WORK_8: Q[] = [
  ["The Land Ordinance of 1785 had surveyors divide western land into…", "square townships of 36 sections", ["circles", "random plots", "plantations"], "Each section was one square mile."],
  ["The national government sold western land to…", "private buyers, to pay its debts", ["Britain", "only the army", "no one"], "Public land became private property."],
  ["Under the ordinances, one section in each township was set aside for…", "public schools", ["a palace", "a fort", "a church tax"], "Education was part of the plan."],
  ["The Northwest Ordinance of 1787 explained how territories could…", "become states equal to the original states", ["become British colonies", "never join the Union", "elect a king"], "It set steps toward statehood."],
  ["The grid of square townships from the 1785 ordinance can still be seen from the air across…", "much of the Midwest and West", ["New England only", "the original 13 colonies only", "nowhere"], "Roads follow the section lines."],
  ["Moving federal land into private hands helped…", "families start farms and towns grow", ["the British crown", "keep the West empty", "end trade"], "Towns grew around land offices."],
  ["The Commerce Clause gives Congress the power to…", "regulate trade among the states and with other nations", ["run every business", "set prices in stores", "ban all trade"], "It is in Article I."],
  ["Under the Constitution, states may not…", "put tariffs on goods from other states", ["build roads", "run schools", "hold elections"], "This made the states one common market."],
  ["A common market among the states means…", "goods move freely across state lines", ["each state prints its own money", "states tax each other's goods", "trade stops at state borders"], "Under the Articles, states taxed each other's goods."],
  ["The Constitution gave Congress the power to coin money, so that…", "the whole nation would use one currency", ["each state could make its own coins", "no one would use money", "Britain would control money"], "One currency makes trade easier."],
  ["The Contract Clause says that states may not…", "pass laws that cancel private contracts", ["make any laws", "collect taxes", "build schools"], "It protects agreements between people."],
  ["Why did a common market help the young economy grow?", "businesses could sell to buyers in every state", ["it raised prices everywhere", "it stopped trade", "it limited sales to one town"], "A bigger market means more customers."],
  ["A proposed law is called a…", "bill", ["veto", "verdict", "amendment"], "It becomes a law only if it passes."],
  ["After a bill is introduced, it is first studied by a…", "committee", ["court", "governor", "jury"], "Committees can change or stop bills."],
  ["To become a federal law, a bill must pass both houses of Congress and then be…", "signed by the president", ["approved by the Supreme Court first", "voted on by every state", "read on television"], "Or Congress can override a veto."],
  ["Congress can override a president's veto with a…", "two-thirds vote in both houses", ["simple majority in one house", "court ruling", "popular vote"], "It is hard to do."],
  ["Which is a way citizens can take part in the lawmaking process?", "contacting their representatives or testifying at a hearing", ["writing laws alone", "vetoing bills", "serving as president for a day"], "Lawmakers listen to constituents."],
  ["Which is another way citizens participate in government?", "voting, signing petitions and serving on juries", ["ignoring all elections", "paying no taxes", "breaking laws"], "The Constitution creates many chances."],
  ["A free press helps a democracy by…", "informing citizens and checking government power", ["telling people how to vote", "running the government", "keeping secrets from voters"], "Reporters act as watchdogs."],
  ["Which amendment protects freedom of the press?", "the First Amendment", ["the Fifth Amendment", "the Tenth Amendment", "the Thirteenth Amendment"], "It also protects speech and religion."],
  ["In 1735, printer John Peter Zenger was found not guilty of libel because…", "what he printed about the governor was true", ["he was the governor's friend", "he apologized", "the king pardoned him"], "His case helped establish freedom of the press."],
  ["A responsibility of a free press is to…", "report facts accurately and correct errors", ["print rumors as facts", "obey the president", "hide news voters need"], "Freedom comes with responsibility."],
  ["Why do newspapers separate news stories from opinion pages?", "so readers can tell facts from views", ["to save paper", "because opinions are illegal", "to confuse readers"], "Editorials share opinions.", true],
  ["Why did the Constitution give Congress, not the states, power over interstate commerce?", "states had been taxing and blocking each other's trade under the Articles", ["the states asked Britain to do it", "trade between states was illegal", "only one state had trade"], "Remember the Articles' weaknesses.", true],
  ["How did the ordinances of 1785 and 1787 shape the West?", "they turned public land into private farms and orderly towns with schools, and set a path to statehood", ["they kept all land federal forever", "they gave the West to Spain", "they banned settlement"], "Think of townships and statehood.", true],
];

const EARLY_REPUBLIC_8: Q[] = [
  ["Capitalism is an economic system in which…", "private owners run businesses to make a profit", ["the government owns all businesses", "no one owns property", "trade is banned"], "Markets set most prices."],
  ["President Andrew Jackson opposed the Second Bank of the United States because he believed it…", "gave too much power to wealthy bankers", ["was too weak", "helped farmers too much", "was run by Britain"], "He called it a monster."],
  ["In 1832, Jackson vetoed the bill to…", "renew the Second Bank's charter", ["build the Erie Canal", "admit Texas", "end the War of 1812"], "This began the Bank War."],
  ["After the Bank War, an economic crisis struck in 1837, known as the…", "Panic of 1837", ["Great Depression", "Gold Rush", "Whiskey Rebellion"], "Banks failed and many lost jobs."],
  ["Many Southerners opposed high tariffs in 1828, calling one the…", "Tariff of Abominations", ["Stamp Act", "Bill of Rights", "Missouri Compromise"], "Tariffs raised prices of imported goods."],
  ["South Carolina's claim that it could cancel a federal tariff led to the…", "Nullification Crisis", ["Whiskey Rebellion", "XYZ Affair", "Trail of Tears"], "John C. Calhoun argued for nullification."],
  ["Northern factory owners often favored tariffs because tariffs…", "protected their goods from foreign competition", ["lowered all prices", "helped cotton exports", "ended factories"], "Imports became more expensive."],
  ["Noah Webster's dictionary (1828) helped create…", "American spellings such as color and center", ["the English alphabet", "the first newspaper", "the national anthem"], "He wanted an American language."],
  ["James Fenimore Cooper wrote novels about the frontier such as…", "The Last of the Mohicans", ["Moby-Dick", "Little Women", "Uncle Tom's Cabin"], "It is part of the Leatherstocking Tales."],
  ["Painters of the Hudson River School, such as Thomas Cole, painted…", "American landscapes and wilderness", ["only city streets", "portraits of kings", "factory machines"], "They celebrated nature."],
  ["Edgar Allan Poe is known for…", "poems and mysterious short stories such as The Raven", ["a dictionary", "the Declaration", "frontier novels only"], "He wrote in the 1830s and 1840s."],
  ["Transcendentalists such as Ralph Waldo Emerson believed in…", "self-reliance and finding truth in nature and one's own conscience", ["obeying every tradition", "living only in cities", "ending all writing"], "Emerson wrote the essay Self-Reliance."],
  ["Henry David Thoreau wrote Walden about…", "living simply near a pond", ["the War of 1812", "a whale hunt", "life in Paris"], "He built a cabin at Walden Pond."],
  ["Thoreau's essay Civil Disobedience argued that people should…", "peacefully refuse to obey unjust laws", ["always obey every law", "use violence", "never vote"], "It later inspired Gandhi and Martin Luther King Jr."],
  ["Herman Melville wrote…", "Moby-Dick", ["Walden", "The Raven", "Leaves of Grass"], "It is about a whaling voyage."],
  ["Walt Whitman's poems in Leaves of Grass celebrated…", "ordinary Americans and individualism", ["kings and nobles", "only ancient Rome", "silence"], "He wrote Song of Myself."],
  ["Louisa May Alcott wrote…", "Little Women", ["Moby-Dick", "Walden", "The Raven"], "It follows four sisters."],
  ["Under the first four presidents, the US made treaties with American Indian nations to…", "gain land and set boundaries", ["give the nations new states", "join the nations to Britain", "end all trade"], "Outcomes varied from nation to nation."],
  ["The Treaty of Canandaigua (1794) between the United States and the Haudenosaunee…", "is still honored today with a yearly gift of cloth", ["was cancelled at once", "made them a US state", "gave them California"], "The Six Nations still mark it."],
  ["The Treaty of New York (1790) was signed by President George Washington and leaders of the…", "Muscogee (Creek) Nation", ["Pomo", "Aztec", "Inca"], "It set a boundary with Georgia."],
  ["After the Creek War, the Treaty of Fort Jackson (1814) forced the Muscogee to give up…", "about 23 million acres of land", ["nothing at all", "one small farm", "the city of New York"], "Even Creek allies of the US lost land."],
  ["The Treaty of Fort Wayne (1809), which took land in Indiana, was opposed by…", "Tecumseh", ["Thomas Jefferson", "Lewis and Clark", "Noah Webster"], "He said no nation alone could sell shared land."],
  ["Why did outcomes of early treaties vary for different nations?", "terms, enforcement and settlers' pressure differed from place to place", ["every treaty was the same", "all treaties were kept fully", "no treaties were ever signed"], "Look at each treaty's story.", true],
  ["How did the Bank War show a conflict that came with capitalism?", "people disagreed over whether banks served ordinary people or the wealthy", ["everyone agreed on banks", "capitalism had no banks", "banks were illegal"], "Jackson saw himself as defending the common man.", true],
  ["What theme links Emerson, Thoreau and Whitman?", "the worth and independence of the individual", ["loyalty to kings", "rejection of nature", "the history of Rome"], "Individualism.", true],
];

const FREEDOM_CHANGE_8: Q[] = [
  ["Richard Allen, a formerly enslaved man in Philadelphia, founded the…", "African Methodist Episcopal (AME) Church", ["Church of England", "Society of Jesus", "Freedmen's Bureau"], "It became a national church in 1816."],
  ["Free Black communities in the North founded schools such as the…", "African Free School in New York", ["University of Paris", "Sankore school", "Academy of Plato"], "It opened in 1787."],
  ["Freedom's Journal (1827) was the first…", "newspaper owned and run by Black Americans", ["dictionary in America", "US bank", "railroad"], "It was published in New York."],
  ["James Forten was a successful Black sailmaker in Philadelphia who used his wealth to…", "support abolition and civil rights", ["buy enslaved people", "move to Britain", "build castles"], "He funded The Liberator."],
  ["Prince Hall of Boston worked for…", "schools for Black children and an end to slavery", ["higher taxes", "a return to British rule", "the Bank of the United States"], "He petitioned the Massachusetts legislature."],
  ["Even in the North, free Black Americans often faced…", "discrimination, segregation and limits on voting", ["no problems at all", "special privileges", "rule by the pope"], "Freedom did not mean equality."],
  ["Black churches in the North served as…", "centers of community, education and the fight for rights", ["only places to sell goods", "military forts", "banks for the government"], "They were run by Black leaders."],
  ["Most white Southerners before the Civil War were…", "small farmers who owned no enslaved people", ["wealthy planters", "factory workers in big cities", "sailors"], "Planters were a small but powerful group."],
  ["Wealthy planters who owned many enslaved people…", "held most of the South's political power", ["had no influence", "lived mostly in the North", "worked in factories"], "They dominated state governments."],
  ["The South's long growing season and fertile soil were well suited to growing…", "cotton, tobacco and rice", ["wheat in cold climates only", "coffee", "apples only"], "Climate shaped the economy."],
  ["Navigable rivers in the South helped planters…", "ship crops to ports", ["avoid trade", "build factories", "mine gold"], "Plantations often sat along rivers."],
  ["Compared with the North, the South before the Civil War had…", "fewer cities, factories and railroads", ["more factories", "more immigrants", "more railroads"], "Its economy rested on farming."],
  ["Yeoman farmers in the South usually…", "grew food for their families and some crops to sell", ["owned huge plantations", "lived in big cities", "worked as bankers"], "They were the largest group of white Southerners."],
  ["Pioneer women on the frontier often…", "ran farms and homes, raised children and worked alongside men", ["did no work", "stayed in Europe", "only went to school"], "Frontier life needed everyone."],
  ["Laura Ingalls Wilder wrote the Little House books about…", "her childhood as a pioneer on the prairie", ["life in Paris", "the Gold Rush in Alaska", "a sea voyage"], "Her family moved many times."],
  ["Annie Bidwell, of Chico, California, worked for…", "women's suffrage, temperance and education", ["a return to British rule", "the end of schools", "higher tariffs"], "She and her husband John founded the town of Chico."],
  ["Biddy Mason, enslaved and brought to California, went to court in 1856 and…", "won her freedom", ["lost her case", "moved to Texas", "became a governor"], "She became a landowner in Los Angeles."],
  ["The first US territory to give women the right to vote, in 1869, was…", "Wyoming", ["New York", "Virginia", "Massachusetts"], "Western territories led the way."],
  ["Why did many western territories give women the vote before eastern states?", "they wanted settlers, and women's work on the frontier earned respect", ["women were banned in the East", "Congress ordered it", "there were no men in the West"], "Frontier life changed ideas."],
  ["After Reconstruction, many Black Southerners moved west to Kansas in 1879. They were called…", "Exodusters", ["Forty-Niners", "Loyalists", "Minutemen"], "Benjamin \"Pap\" Singleton encouraged them."],
  ["Which was a push factor that led formerly enslaved people to leave the South?", "violence, unfair Black Codes and sharecropping debt", ["free land handed out in the South", "equal rights in every Southern town", "too many jobs"], "Push factors drive people away."],
  ["Which was a pull factor that drew Black families to the West and North?", "the chance to own land and find jobs", ["higher taxes", "harsher laws", "fewer schools"], "Pull factors attract people."],
  ["Nicodemus, Kansas, is known as a town founded by…", "Black settlers after the Civil War", ["Spanish missionaries", "Gold Rush miners", "Loyalists"], "It is a national historic site."],
  ["In Northern cities, Black migrants found…", "more opportunity, but also discrimination in jobs and housing", ["complete equality", "no jobs at all", "slavery"], "Experiences differed.", true],
  ["How did the physical environment help shape white Southern society?", "farmland suited to cash crops led to plantations, slavery and few cities", ["deserts kept farming small", "cold winters favored factories", "mountains blocked all trade"], "Geography and economy are linked.", true],
  ["Why were schools and churches so important to free Black communities in the North?", "they built education, leadership and a voice for rights", ["they were required by the British", "they were only for travelers", "they collected federal taxes"], "Communities built their own institutions.", true],
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
  bankUnit({
    id: "ca-g8-revolutionary-ideas",
    title: "Ideas of the Revolution",
    emoji: "💡",
    blurb: "Faith, rights and the first state constitutions",
    parentNote:
      "How the Great Awakening fed revolutionary feeling, how the Revolution inspired France and others, the blend of republican, liberal and English ideas behind the nation, Jefferson's Statute for Religious Freedom and the First Amendment, and the first state constitutions.",
    standards: [
      "8.1.1; 8.1.3; 8.1.4; 8.2.5; 8.3.1",
      "the Great Awakening and revolutionary fervor, the Revolution's effect on other nations, the nation's blend of political traditions, the Statute for Religious Freedom, and the state constitutions of 1777 to 1781",
    ],
    items: REVOLUTION_IDEAS_8,
  }),
  bankUnit({
    id: "ca-g8-constitution-at-work",
    title: "The Constitution at Work",
    emoji: "⚖️",
    blurb: "Land, a common market, lawmaking and a free press",
    parentNote:
      "How the ordinances of 1785 and 1787 moved federal land into private hands, the common market the Constitution protects, how a bill becomes a law and how citizens take part, and the role of a free press.",
    standards: [
      "8.3.2; 8.3.3; 8.3.6; 8.3.7",
      "the land ordinances, a common market among the states, the law-making process and citizen participation, and a free press",
    ],
    items: CONSTITUTION_AT_WORK_8,
  }),
  bankUnit({
    id: "ca-g8-early-republic",
    title: "Life in the Early Republic",
    emoji: "🖋️",
    blurb: "Banks, books and treaties",
    parentNote:
      "Capitalism and its conflicts, such as Jackson's fight with the National Bank and the tariff debates, American art and writing from Noah Webster to Emerson and Thoreau, and the treaties made with American Indian nations under the first four presidents and their different outcomes.",
    standards: [
      "8.4.3; 8.4.4; 8.5.3; 8.6.7",
      "the rise of capitalism and its conflicts, art, music and literature of the early nation, treaties with American Indian nations under the first four presidents, and transcendentalism and individualism",
    ],
    items: EARLY_REPUBLIC_8,
  }),
  bankUnit({
    id: "ca-g8-freedom-and-change",
    title: "Freedom & Change",
    emoji: "🛤️",
    blurb: "Free communities, the South, the frontier and the Exodusters",
    parentNote:
      "Free Black Americans who founded schools and churches in the North, white Southern society and its environment, pioneer women and women in the West, and the push and pull factors behind the movement of formerly enslaved people to the North and West.",
    standards: [
      "8.6.4; 8.7.3; 8.8.3; 8.11.2",
      "free Black communities in the North, white Southern society, pioneer women in the West, and the movement of former slaves to Northern cities and the West",
    ],
    items: FREEDOM_CHANGE_8,
  }),
];
