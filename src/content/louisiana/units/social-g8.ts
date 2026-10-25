import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Louisiana Grade 8 social studies: Louisiana in the 1900s, from the timber and oil booms, the Great Flood of 1927,
// Huey Long and the state's constitutions to its part in World War II (8.12 f to i, 8.14 k); then civil rights in
// Louisiana, Hurricanes Katrina and Rita and the 2008 election (8.15, 8.17).

const MODERN_1900S: Q[] = [
  ["Louisiana's first oil well was drilled near Jennings in…", "1901", ["1801", "1991"], "It started an oil boom."],
  ["In the early 1900s, Louisiana's forests were cut for…", "timber", ["gold", "coal"], "Longleaf pine was in demand."],
  ["Many timber companies in Louisiana practiced “cut out and get out,” which…", "left huge areas of forest stripped of trees", ["planted more trees than they cut", "saved all the old forests"], "Replanting came later."],
  ["Oil and natural gas helped Louisiana's economy by…", "creating jobs and tax money", ["ending all farming", "closing the ports"], "Refineries and wells hired workers."],
  ["The Great Mississippi River Flood of 1927 was caused by…", "months of heavy rain that overtopped and broke levees", ["a hurricane in one day", "an earthquake"], "The river swelled for months."],
  ["To protect New Orleans in 1927, officials blew up a levee at Caernarvon, which flooded…", "St. Bernard and Plaquemines parishes", ["Shreveport", "Lake Charles"], "People there lost their homes."],
  ["After the 1927 flood, the federal government…", "took charge of flood control on the Mississippi", ["stopped building levees", "moved New Orleans"], "Congress passed the Flood Control Act of 1928."],
  ["The Bonnet Carré Spillway was built to…", "send floodwater from the Mississippi into Lake Pontchartrain", ["store oil", "generate electricity"], "It protects New Orleans."],
  ["Huey Long became governor of Louisiana in…", "1928", ["1828", "1968"], "He was called “the Kingfish.”"],
  ["Which did Governor Huey Long build or provide?", "roads, bridges and free textbooks", ["the Superdome", "the French Quarter"], "He promised help for poor families."],
  ["Huey Long's national plan to spread wealth was called…", "Share Our Wealth", ["the New Deal", "the Square Deal"], "His slogan was “Every Man a King.”"],
  ["Critics said Huey Long…", "used too much power and punished opponents", ["never held office", "lived in France"], "He controlled much of state government."],
  ["Huey Long was killed in 1935 in the…", "Louisiana State Capitol", ["White House", "Superdome"], "He had built that Capitol."],
  ["Louisiana's 1898 constitution used poll taxes and other rules to…", "keep Black citizens from voting", ["give women the vote", "end segregation"], "Black voter numbers fell sharply."],
  ["Louisiana's current state constitution was adopted in…", "1974", ["1812", "1898"], "It is the state's eleventh."],
  ["The Louisiana Maneuvers of 1941 were…", "huge army training exercises before World War II", ["a dance contest", "a hurricane plan"], "About 400,000 soldiers took part."],
  ["Higgins boats, built in New Orleans, were used to…", "land troops on beaches, as on D-Day", ["fish for shrimp", "carry mail on the river"], "Andrew Higgins designed them."],
  ["Why did Eisenhower praise Andrew Higgins?", "his landing boats helped the Allies win", ["he was a general", "he wrote the Constitution"], "The boats carried troops ashore.", true],
  ["During World War II, Louisiana held thousands of German…", "prisoners of war in camps", ["tourists", "ambassadors"], "Many worked on farms.", true],
  ["World War II changed Louisiana's economy by…", "building up shipyards, refineries and military bases", ["closing every factory", "ending oil drilling"], "War work brought jobs.", true],
  ["The Great Migration was the movement of…", "Black Southerners to cities in the North and West", ["Europeans to Louisiana", "farmers to Alaska"], "They left to escape Jim Crow and find work.", true],
  ["Louis Armstrong, a jazz star of the 1920s, grew up in…", "New Orleans", ["Monroe", "Lafayette"], "He played the trumpet.", true],
  ["Why do states revise their constitutions?", "to change how government works as times change", ["to rename the state", "to elect a king"], "Louisiana has had eleven.", true],
  ["Which was a lasting effect of the 1927 flood?", "a national system of levees and spillways", ["the end of the river", "the moving of the capital"], "Engineers took control.", true],
  ["Huey Long served as a U.S. senator from…", "1932 to 1935", ["1812 to 1815", "1964 to 1968"], "He planned to run for President.", true],
];

const MODERN: Q[] = [
  ["The Baton Rouge Bus Boycott of 1953 was…", "one of the first organized bus boycotts of the civil rights era", ["a protest against high taxes", "a sports event"], "It came before the Montgomery boycott."],
  ["Who led the Baton Rouge Bus Boycott?", "Rev. T. J. Jemison", ["Huey Long", "Andrew Higgins"], "He was a Baptist minister."],
  ["The Baton Rouge Bus Boycott helped plan…", "the Montgomery Bus Boycott", ["the Louisiana Purchase", "the Space Race"], "Dr. King asked Jemison for advice."],
  ["In 1960, six-year-old Ruby Bridges integrated which New Orleans school?", "William Frantz Elementary", ["Tulane University", "St. Louis Cathedral"], "Federal marshals walked her in."],
  ["Brown v. Board of Education (1954) ruled that…", "segregated public schools are unconstitutional", ["women can vote", "slavery is legal"], "Separate is not equal."],
  ["A. P. Tureaud was a Louisiana lawyer who…", "fought segregation in court", ["led the Confederate army", "invented the Higgins boat"], "He worked with the NAACP."],
  ["Which Louisiana leader strongly opposed integration?", "Leander Perez", ["Ruby Bridges", "T. J. Jemison"], "He ran Plaquemines Parish."],
  ["The Voting Rights Act of 1965 helped Black Louisianans by…", "ending tests used to block voting", ["closing schools", "raising taxes"], "Voter numbers rose quickly."],
  ["The Civil Rights Act of 1964 banned…", "segregation in public places", ["all elections", "trade with Louisiana"], "Restaurants and hotels had to serve all."],
  ["CORE, which trained volunteers in Louisiana, used…", "nonviolent protest", ["armed fighting", "secret codes"], "Sit-ins and voter drives."],
  ["Hurricane Katrina struck Louisiana in…", "2005", ["1965", "2015"], "It hit in late August."],
  ["Most of the flooding in New Orleans during Katrina came from…", "failed levees and floodwalls", ["snowmelt", "melting glaciers"], "About 80 percent of the city flooded."],
  ["Hurricane Rita in 2005 hit…", "southwest Louisiana", ["North Louisiana only", "the Pacific coast"], "It came less than a month after Katrina."],
  ["After Katrina, many New Orleans residents…", "had to move away for months or years", ["were unaffected", "moved to the moon"], "Hundreds of thousands left."],
  ["After 2005, Louisiana rebuilt its storm protection with…", "stronger levees, floodwalls and pumps", ["no changes", "fewer levees"], "The new system cost billions."],
  ["Why are Louisiana's coastal wetlands important in hurricanes?", "they weaken storm surge before it reaches towns", ["they make storms stronger", "they cause hurricanes"], "Marshes slow water."],
  ["In 2008, Americans elected…", "Barack Obama, the first Black President", ["Huey Long", "Andrew Higgins"], "He took office in 2009."],
  ["The terrorist attacks of September 11, 2001 led the United States to create the…", "Department of Homeland Security", ["Louisiana Purchase", "Supreme Court"], "It protects against attacks.", true],
  ["Why was the Baton Rouge boycott successful in part?", "Black riders set up free car rides", ["the buses stopped running", "the governor joined it"], "Neighbors drove neighbors.", true],
  ["After Ruby Bridges's first day, many white parents…", "pulled their children out of her school", ["welcomed her with a party", "built her a new school"], "Only one teacher would teach her.", true],
  ["How did the federal government respond to the slow Katrina rescue?", "it was widely criticized and later reorganized", ["it was praised as perfect", "it did not respond at all"], "Lessons led to changes.", true],
  ["Which Louisiana city hosted many people who fled Katrina?", "Baton Rouge", ["New Orleans", "Houma"], "Its population jumped.", true],
  ["Why did the 1965 Voting Rights Act matter so much in Louisiana?", "many Black citizens had been kept from voting", ["Louisiana had no elections", "only women could vote"], "Literacy tests were used unfairly.", true],
  ["The Persian Gulf War of 1991 was fought to…", "push Iraq out of Kuwait", ["free Louisiana", "end the Civil War"], "The U.S. led a coalition.", true],
  ["How did Katrina affect Louisiana's population?", "New Orleans lost many residents for years", ["it doubled", "nothing changed"], "Many never returned.", true],
];

export const SOCIAL_8: Unit[] = [
  bankUnit({
    id: "la-g8-louisiana-1900s",
    title: "Louisiana in the 1900s",
    emoji: "🛢️",
    blurb: "Oil, the 1927 flood, Huey Long and World War II",
    parentNote:
      "Louisiana in the first half of the 1900s: the timber, oil and gas booms, the Great Mississippi River Flood of 1927 and federal flood control, Huey Long's career and its critics, changes to the state constitution from 1898 to 1974, and Louisiana's part in World War II: the Louisiana Maneuvers, Higgins boats and prisoner of war camps.",
    standards: ["8.12; 8.14", "Louisiana's economy, the 1927 flood, Huey Long and the state constitution, and Louisiana in World War II"],
    items: MODERN_1900S,
  }),
  bankUnit({
    id: "la-g8-modern-louisiana",
    title: "Civil Rights and Modern Louisiana",
    emoji: "✊",
    blurb: "Baton Rouge, Ruby Bridges, Katrina and Rita",
    parentNote:
      "Civil rights in Louisiana (the Baton Rouge Bus Boycott, Ruby Bridges, A. P. Tureaud and opposition from leaders such as Leander Perez) with the national laws that followed, then the modern era: September 11, Hurricanes Katrina and Rita and the rebuilding after them, and the 2008 election.",
    standards: ["8.15; 8.17", "the Civil Rights Movement in Louisiana and the nation, and key events of the modern era, including Hurricanes Katrina and Rita"],
    items: MODERN,
  }),
];
