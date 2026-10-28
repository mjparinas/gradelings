import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Washington, DC Grade 8 social studies, "Civics in Action: Power, Rights and Resistance" (the DC Social Studies
// Standards, 2023): the structure and powers of the District's government, its status in the federal government and
// how access to power in DC has changed (8.19; 8.20; 8.42; 8.49; 8.50), DC as a place for national protest and the
// tactics of social movements (8.53; 8.55; 8.58; 8.61), and human rights, from the Universal Declaration to
// international alliances (8.34; 8.35; 8.44; 8.65). The Constitution, rights, courts, media literacy and personal
// finance are practised with adopted units (see ../plan/social.ts).

const DISTRICT: Q[] = [
  ["The District of Columbia Home Rule Act, which created DC's elected mayor and Council, was passed by Congress in…", "1973", ["1790", "1961", "2016"], "It took effect in 1975."],
  ["DC's executive branch is led by the…", "mayor", ["governor", "Council chair", "delegate"], "The mayor is elected every four years."],
  ["DC's legislative branch is the…", "DC Council", ["House of Delegates", "General Assembly", "Board of Supervisors"], "It has 13 members."],
  ["The DC Council is made up of 8 ward members, 4 at-large members and…", "a chair elected citywide", ["the mayor", "two senators", "the delegate"], "13 in all."],
  ["DC's local judges are…", "appointed by the president and confirmed by the Senate", ["elected by the Council", "chosen by the mayor alone", "elected by each ward"], "This is unusual for a local court."],
  ["Under Home Rule, Congress has 30 legislative days to…", "block a law the DC Council passes", ["approve the president", "pick DC's mayor", "write the Constitution"], "Most DC laws must wait for this review."],
  ["Congress also must approve DC's…", "budget, even the part raised from local taxes", ["school lunch menus", "street names", "sports teams"], "No state needs Congress's approval for its budget."],
  ["DC's representative in the House can serve on committees but can't vote on…", "the final passage of bills", ["anything at all", "their own name", "committee reports"], "The office is called delegate."],
  ["Since 1961, DC residents have voted for president because of the…", "23rd Amendment", ["19th Amendment", "26th Amendment", "1st Amendment"], "DC gets 3 electoral votes."],
  ["How many electoral votes does DC have?", "3", ["0", "1", "10"], "No more than the least populous state."],
  ["DC residents pay federal income taxes. In total they pay more federal taxes than residents of…", "some states", ["every state", "no state", "the whole country"], "Hence \"taxation without representation.\""],
  ["Advisory Neighborhood Commissioners are elected for small areas and advise on…", "local issues like zoning, liquor licenses and traffic", ["foreign wars", "Supreme Court cases", "national taxes"], "Agencies must give their views great weight."],
  ["Before Home Rule, from 1874 to 1967, DC was governed by…", "three commissioners appointed by the president", ["an elected mayor", "the governor of Maryland", "a king"], "Residents had no local vote."],
  ["The DC statehood bill would create a new state while keeping a small federal district around the…", "Capitol, White House and National Mall", ["Metro system", "whole city", "suburbs of Maryland"], "The new state would be called Washington, Douglass Commonwealth."],
  ["Some people argue that DC statehood needs a constitutional amendment because of…", "the 23rd Amendment and the Constitution's District Clause", ["the Bill of Rights", "the 19th Amendment", "the Treaty of Paris"], "This is part of the debate.", true],
  ["Another proposal would give most of DC back to…", "Maryland", ["Virginia", "Delaware", "Pennsylvania"], "This is called retrocession.", true],
  ["The DC Council can override the mayor's veto with a vote of…", "two-thirds of its members", ["one member", "half of the wards", "the delegate alone"], "That is 9 of the 13 members.", true],
  ["Who appoints DC's US Attorney, who prosecutes most serious crimes in the District?", "the president", ["the mayor", "the DC Council", "the voters"], "In states, local prosecutors are usually elected.", true],
  ["DC's elected attorney general handles…", "civil cases and some local offenses", ["foreign treaties", "federal elections", "Supreme Court appointments"], "The office became elected in 2014.", true],
  ["A shadow senator for DC is elected to…", "push for statehood, with no vote in the Senate", ["vote on every bill", "lead the Senate", "replace the mayor"], "DC elects two shadow senators.", true],
  ["Which change gave DC residents more local power?", "the Home Rule Act", ["the end of the elected territorial government in 1874", "the Residence Act", "the 1846 retrocession"], "It let residents elect their leaders.", true],
  ["How does zoning affect power and opportunity in a city?", "it decides what can be built where, shaping housing and jobs", ["it chooses the mayor", "it sets the weather", "it has no effect"], "Zoning shapes neighborhoods.", true],
  ["Why might DC residents testify at a Council hearing?", "to influence a bill before it's voted on", ["to become senators", "to change the Constitution alone", "to appoint judges"], "Hearings are open to the public.", true],
  ["In 2016, about how much of DC's vote supported statehood?", "86 percent", ["14 percent", "50 percent", "100 percent"], "It was an advisory referendum.", true],
];

const PROTEST: Q[] = [
  ["The National Mall is a common place for protests because it is…", "near the seats of national power", ["far from any government", "closed to the public", "private property"], "The Capitol, White House and memorials surround it."],
  ["The right to protest peacefully is protected by the…", "First Amendment", ["Second Amendment", "Tenth Amendment", "23rd Amendment"], "It protects assembly and petition."],
  ["The 1913 Woman Suffrage Procession on Pennsylvania Avenue was organized by…", "Alice Paul", ["Susan B. Anthony", "Eleanor Roosevelt", "Rosa Parks"], "It was the day before Woodrow Wilson's inauguration."],
  ["In 1917, suffragists who picketed the White House were called the…", "Silent Sentinels", ["Bonus Army", "Freedom Riders", "Minutemen"], "Many were arrested and jailed."],
  ["Women won the right to vote nationwide with the 19th Amendment in…", "1920", ["1865", "1945", "1971"], "It was ratified in August 1920."],
  ["In 1932, World War I veterans called the Bonus Army camped in DC until they were…", "driven out by the army", ["paid in full that week", "made senators", "given land in DC"], "Their camp was burned."],
  ["The 1963 March on Washington for Jobs and Freedom was organized by A. Philip Randolph and…", "Bayard Rustin", ["Malcolm X", "Thurgood Marshall", "Booker T. Washington"], "Rustin was the chief planner."],
  ["The March on Washington helped build support for the…", "Civil Rights Act of 1964", ["Home Rule Act", "Bill of Rights", "Treaty of Paris"], "It passed the next year."],
  ["Breaking an unjust law on purpose, peacefully, and accepting the punishment is…", "civil disobedience", ["a filibuster", "a veto", "an amendment"], "Henry David Thoreau wrote about it."],
  ["In the Capitol Crawl of 1990, disability rights activists climbed the Capitol steps to support the…", "Americans with Disabilities Act", ["Voting Rights Act", "Clean Air Act", "Homestead Act"], "It passed that summer."],
  ["In 1969, about half a million people marched in DC against the…", "Vietnam War", ["Civil War", "War of 1812", "American Revolution"], "It was the Moratorium march."],
  ["A strike is when workers…", "stop working to demand changes", ["work extra for free", "vote for president", "start a business"], "Unions organize strikes."],
  ["The Poor People's Campaign of 1968 built a camp on the Mall called…", "Resurrection City", ["Tent Town", "Hooverville", "Freedmen's Village"], "Dr. King had planned it before he was killed.", true],
  ["The first national LGBTQ+ rights march in DC was held in…", "1979", ["1913", "1963", "2017"], "Bigger ones followed in 1987 and 1993.", true],
  ["The 2017 Women's March brought hundreds of thousands to DC the day after…", "a presidential inauguration", ["the Fourth of July", "a Super Bowl", "Election Day"], "Marches took place around the world.", true],
  ["In 2018, students led the March for Our Lives in DC to call for…", "stronger gun safety laws", ["longer school days", "lower taxes", "new highways"], "It was organized after a school shooting.", true],
  ["Why do many national organizations, called NGOs, have offices in DC?", "to lobby and work with the federal government", ["because rent is cheap", "because DC has no laws", "to avoid Congress"], "Being near lawmakers helps.", true],
  ["Which is a tactic the civil rights movement used?", "boycotts, sit-ins and marches", ["armed invasion", "censoring newspapers", "secret elections"], "Nonviolence was central.", true],
  ["The Supreme Court said in 1969 that students may wear armbands to protest, in…", "Tinker v. Des Moines", ["Plessy v. Ferguson", "Marbury v. Madison", "Bolling v. Sharpe"], "Students don't lose their rights at the schoolhouse gate.", true],
  ["Outside the United States, peaceful mass protests in 1986 in the Philippines helped…", "end a dictatorship", ["start a war", "build a canal", "found a new church"], "It was called the People Power Revolution.", true],
  ["In South Africa, protests, strikes and boycotts from around the world helped end…", "apartheid", ["monarchy", "the Olympics", "trade"], "Nelson Mandela became president in 1994.", true],
  ["Organizers of large protests in DC usually get a permit from the…", "National Park Service", ["Supreme Court", "Pentagon", "Smithsonian"], "The Park Service manages the Mall.", true],
  ["Why might a protest succeed in changing a law?", "it shows lawmakers that many voters care", ["it stops elections", "it replaces Congress", "it makes laws by itself"], "Pressure works through politics.", true],
  ["Social media changed protest movements by…", "spreading news and organizing people quickly", ["making protests illegal", "stopping all marches", "ending the First Amendment"], "Hashtags can draw crowds.", true],
];

const RIGHTS: Q[] = [
  ["The Universal Declaration of Human Rights was adopted by the United Nations in…", "1948", ["1776", "1865", "2001"], "It came after World War II."],
  ["Eleanor Roosevelt led the committee that wrote the…", "Universal Declaration of Human Rights", ["Constitution", "Declaration of Independence", "Magna Carta"], "She called it a Magna Carta for all humanity."],
  ["Human rights belong to…", "every person, everywhere", ["only citizens of rich countries", "only adults", "only leaders"], "The UDHR begins: all human beings are born free and equal."],
  ["The UDHR says everyone has the right to…", "education", ["a free car", "a mansion", "never pay taxes"], "Article 26."],
  ["NATO is an alliance of countries in North America and…", "Europe", ["Africa", "South America", "Antarctica"], "Members promise to defend one another."],
  ["NATO was formed in…", "1949", ["1919", "1989", "2001"], "It was a response to the Soviet Union."],
  ["The United Nations was created in 1945 to…", "keep peace and solve problems between nations", ["run the US government", "make one world army", "end all trade"], "Almost every country is a member."],
  ["Genocide is the attempt to destroy…", "a national, ethnic, racial or religious group", ["a sports team", "a city park", "a building"], "The word was created after the Holocaust."],
  ["The US Holocaust Memorial Museum is in…", "Washington, DC", ["Paris", "Tokyo", "Sydney"], "It is next to the National Mall."],
  ["Warning signs that a country may be at risk of genocide include…", "hate speech and laws targeting one group", ["more schools", "free elections", "a free press"], "Dehumanizing language comes first."],
  ["In 1994, a genocide in Rwanda killed about…", "800,000 people", ["8,000 people", "80 people", "8 million people"], "It happened in about 100 days."],
  ["Countries that violate rights may face economic penalties called…", "sanctions", ["refunds", "tariff gifts", "loans"], "Sanctions limit trade.", true],
  ["The International Criminal Court tries people for crimes such as…", "genocide and war crimes", ["parking tickets", "shoplifting", "speeding"], "It is in The Hague, Netherlands.", true],
  ["Diplomacy means countries try to solve problems by…", "talking and negotiating", ["going to war first", "closing all embassies", "ignoring each other"], "Embassies in DC help with this.", true],
  ["The rights in the US Bill of Rights limit the power of…", "the government", ["private stores", "families", "other countries"], "They protect people from the state.", true],
  ["The UDHR is not a treaty, so on its own it…", "is not legally binding", ["has its own army", "replaced the Constitution", "is only for children"], "Later treaties made many of its rights law.", true],
  ["Freedom of the press is limited in some countries, where the government…", "controls what news can say", ["prints no money", "has no laws", "lets anyone publish"], "Compare who controls information.", true],
  ["Which is an example of foreign aid?", "sending food after an earthquake", ["banning all trade", "declaring war", "closing borders"], "Aid is help to other countries.", true],
  ["The Convention on the Rights of the Child protects children's rights to…", "education, health and safety", ["drive cars", "vote at age 8", "skip all school"], "Almost every country has ratified it.", true],
  ["Why was the UDHR written after World War II?", "to prevent atrocities like the Holocaust from happening again", ["to start a new war", "to make the UN a country", "to end the Olympics"], "Nations wanted shared standards.", true],
  ["Comparing rights in three countries, a free country usually has…", "fair elections and a free press", ["one party only", "no courts", "censored news"], "Rights are protected by law and practice.", true],
  ["The UN Security Council has five permanent members: the US, the UK, France, Russia and…", "China", ["Brazil", "Egypt", "Japan"], "Each can veto a resolution.", true],
  ["The Geneva Conventions set rules for…", "how people are treated in war", ["sports tournaments", "school lunches", "traffic lights"], "They protect prisoners and civilians.", true],
  ["Amnesty International and Human Rights Watch are examples of…", "non-governmental organizations", ["armies", "governments", "banks"], "They report on rights abuses.", true],
  ["Which right is in both the US Bill of Rights and the UDHR?", "freedom of religion", ["the right to a car", "the right to never pay taxes", "the right to skip school"], "Both protect belief and worship.", true],
];

export const SOCIAL_8: Unit[] = [
  bankUnit({
    id: "dc-g8-governing-the-district",
    title: "Governing the District",
    emoji: "🏢",
    blurb: "DC's government, Congress's power over it and the statehood debate",
    parentNote: "How Washington, DC is governed: the mayor, the 13-member Council, local courts whose judges the president appoints, Advisory Neighborhood Commissions, Congress's review of DC's laws and budget, the House delegate and shadow senators, the 23rd Amendment, how local power has changed from appointed commissioners to Home Rule, and the arguments around statehood and retrocession, presented as a debate.",
    standards: ["8.19; 8.20; 8.42; 8.49; 8.50", "the structure and powers of DC's government, how DC residents are represented federally, the District's status, and how access to power in DC has changed"],
    items: DISTRICT,
  }),
  bankUnit({
    id: "dc-g8-capital-of-protest",
    title: "Capital of Protest",
    emoji: "📣",
    blurb: "Marches, movements and civil disobedience in DC and the world",
    parentNote: "Why Washington, DC is the nation's stage for protest, from the 1913 suffrage march and the Silent Sentinels to the Bonus Army, the March on Washington, the Capitol Crawl for disability rights and student-led marches, the First Amendment rights behind them, tactics such as boycotts, strikes and civil disobedience, and examples of citizen action in other countries.",
    standards: ["8.53; 8.54; 8.55; 8.58; 8.61", "citizen action around the world, the First Amendment and protest, social movements in the US, DC as a place for national protest, and civil disobedience"],
    items: PROTEST,
  }),
  bankUnit({
    id: "dc-g8-human-rights",
    title: "Human Rights & the World",
    emoji: "🕊️",
    blurb: "The Universal Declaration, alliances and preventing atrocities",
    parentNote: "Human rights around the world: the Universal Declaration of Human Rights and how it came to be, comparing rights in different countries, the United Nations and alliances such as NATO, the warning signs of genocide and how nations respond, and tools of foreign policy such as diplomacy, sanctions and aid.",
    standards: ["8.34; 8.35; 8.44; 8.64; 8.65", "rights in other countries, the Universal Declaration of Human Rights, international alliances, foreign policy tools, and the warning signs of genocide"],
    items: RIGHTS,
  }),
];
