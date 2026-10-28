import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Washington, DC Grade 5 social studies, "The United States: Expansion to the Civil Rights Movement" (the DC Social
// Studies Standards, 2023): the Great Migration and the Black Renaissance, in Harlem and on DC's own U Street (5.42;
// 5.43), and activists, court cases and strategies that fought segregation, from Ida B. Wells to Bolling v. Sharpe and
// the Voting Rights Act (5.49 to 5.51; 5.53). Westward expansion, slavery and resistance, the Civil War,
// Reconstruction, World War II and the civil rights movement are practised with adopted units (see ../plan/social.ts).

const MIGRATION: Q[] = [
  ["Between about 1910 and 1970, millions of Black Americans moved from the South to cities in the North and West. This is called the…", "Great Migration", ["Gold Rush", "Dust Bowl", "Columbian Exchange"], "It was one of the biggest moves in US history."],
  ["One big reason for the Great Migration was to escape…", "Jim Crow laws and violence", ["cold weather", "ocean storms", "too many jobs"], "Segregation laws were harsh in the South."],
  ["Another reason Black families moved north was to find…", "factory jobs", ["gold mines", "whale hunting", "cattle drives"], "Factories needed workers, especially in wartime."],
  ["Many people in the Great Migration traveled north by…", "train", ["airplane", "rocket", "covered wagon"], "Rail lines ran from the South to Northern cities."],
  ["The Harlem Renaissance was a flowering of Black art, music and writing in…", "New York City", ["Los Angeles", "Miami", "Seattle"], "Harlem is a neighborhood in Manhattan."],
  ["The poet who wrote \"I, Too\" and lived for a time in Washington, DC was…", "Langston Hughes", ["Robert Frost", "Emily Dickinson", "Dr. Seuss"], "He worked in DC before moving to Harlem."],
  ["The music that grew in the Black Renaissance, with swing and improvising, was…", "jazz", ["opera", "polka", "heavy metal"], "Duke Ellington was a jazz great."],
  ["Duke Ellington, a jazz bandleader, grew up in…", "Washington, DC", ["Paris", "Chicago", "London"], "He learned piano as a boy in DC."],
  ["The DC neighborhood called \"Black Broadway\" in the 1920s centered on…", "U Street", ["K Street", "Wall Street", "Rodeo Drive"], "It had theaters, clubs and businesses."],
  ["Zora Neale Hurston, a writer of the Renaissance, studied at…", "Howard University", ["Oxford", "a military academy", "a cooking school"], "Howard is in DC."],
  ["Blues, gospel and jazz all have roots in the music of…", "enslaved Africans and their descendants", ["ancient Rome", "medieval knights", "Viking sailors"], "Spirituals and work songs came first."],
  ["The Great Migration changed Northern cities by…", "growing their Black communities", ["making them empty", "closing every factory", "moving them south"], "Neighborhoods, churches and businesses grew."],
  ["Black newspapers like the Chicago Defender urged Southern readers to…", "move north", ["stay quiet", "move to Europe", "stop reading"], "They printed job listings.", true],
  ["The painter Jacob Lawrence told the story of the Great Migration in a series of…", "60 paintings", ["songs", "statues of gold", "movies"], "Some hang in the Phillips Collection in DC.", true],
  ["Many families in the Great Migration still faced unfair treatment in the North, such as…", "segregated housing", ["free land", "no taxes", "equal pay everywhere"], "Discrimination was not only in the South.", true],
  ["Jean Toomer, born in DC, wrote a famous book of the Renaissance called…", "Cane", ["Moby-Dick", "Little Women", "Treasure Island"], "It mixes poems and stories.", true],
  ["Alain Locke, a Howard professor, edited a book that named the movement. It was called…", "The New Negro", ["The Great Gatsby", "The Hobbit", "Charlotte's Web"], "He is called the dean of the Harlem Renaissance.", true],
  ["Why was a Black-owned business district like U Street so important?", "segregation kept Black customers out of many other places", ["it was the only street in DC", "it had no customers", "it was owned by the government"], "Communities built their own places.", true],
  ["Which happened during the Great Migration?", "Black musicians made jazz famous across the country", ["the Pilgrims landed", "the Constitution was written", "the Civil War began"], "It was the 1920s.", true],
  ["The Great Migration happened in two waves, one around World War I and a bigger one around…", "World War II", ["the Revolution", "the War of 1812", "the Civil War"], "War factories needed workers.", true],
  ["About how many people moved in the Great Migration?", "about 6 million", ["about 600", "about 6,000", "about 600 million"], "It took place over 60 years.", true],
  ["Arts like music and painting helped Black Americans resist oppression by…", "telling their own stories with pride", ["staying silent", "hiding all culture", "copying others only"], "Joy and art were a kind of resistance.", true],
  ["Augusta Savage, a sculptor of the Harlem Renaissance, also…", "taught young artists", ["ran for president", "built railroads", "invented the airplane"], "Jacob Lawrence was one of her students.", true],
  ["Why did families write letters home to the South during the Great Migration?", "to tell others about jobs and life up north", ["to complain about trains", "to send gold", "to ask for snow"], "Word of mouth drew more people north.", true],
];

const JUSTICE: Q[] = [
  ["Ida B. Wells was a journalist who wrote to stop…", "lynching", ["baseball", "railroads", "voting"], "She risked her life to tell the truth."],
  ["W.E.B. Du Bois helped found the NAACP, which fights for…", "civil rights", ["lower taxes", "more highways", "new sports"], "NAACP stands for the National Association for the Advancement of Colored People."],
  ["A. Philip Randolph led a union of railroad workers called the Brotherhood of…", "Sleeping Car Porters", ["Pilots", "Firefighters", "Bakers"], "He also planned the March on Washington."],
  ["In Plessy v. Ferguson (1896), the Supreme Court said segregation was allowed if things were…", "\"separate but equal\"", ["always together", "free for all", "decided by vote"], "Separate places were rarely equal."],
  ["In 1954, Brown v. Board of Education said segregated public schools were…", "unconstitutional", ["required", "a good idea", "only for cities"], "The Supreme Court ruled together."],
  ["On the same day as Brown, the Supreme Court decided a case about DC schools called…", "Bolling v. Sharpe", ["Plessy v. Ferguson", "Marbury v. Madison", "Roe v. Wade"], "Spottswood Bolling was a DC student."],
  ["Bolling v. Sharpe ended segregation in the public schools of…", "Washington, DC", ["Kansas only", "California", "Hawaii"], "DC schools began to integrate that fall."],
  ["Why did DC need its own case, separate from Brown?", "DC is not a state, so the 14th Amendment's rule for states didn't fit", ["DC had no schools", "DC students asked not to", "the case was about trains"], "The Court used the Fifth Amendment instead."],
  ["Mendez v. Westminster (1947) ended the segregation of…", "Mexican American students in some California schools", ["DC's buses", "trains in Kansas", "lunch counters"], "It came seven years before Brown."],
  ["Rosa Parks refused to give up her seat on a bus in…", "Montgomery, Alabama", ["Washington, DC", "New York City", "Boston"], "Her arrest led to a bus boycott."],
  ["Refusing to use a service, like a bus, to protest is called a…", "boycott", ["parade", "concert", "census"], "The Montgomery boycott lasted over a year."],
  ["Students who sat at \"whites only\" lunch counters and refused to leave were holding a…", "sit-in", ["sleepover", "field trip", "race"], "Sit-ins spread across the South in 1960."],
  ["The 1963 March on Washington ended at the…", "Lincoln Memorial", ["White House", "Pentagon", "Capitol dome"], "Dr. King gave his \"I Have a Dream\" speech."],
  ["The Voting Rights Act of 1965 helped stop…", "unfair tests that kept Black citizens from voting", ["all elections", "voting by women", "new states"], "It passed after the march at Selma."],
  ["Mary Church Terrell, a DC leader, won a case in 1953 that ended segregation in DC's…", "restaurants", ["rivers", "farms", "airports"], "She was nearly 90 years old.", true],
  ["Charles Hamilton Houston, a Howard law professor, trained lawyers to fight…", "segregation in court", ["fires", "wars overseas", "storms"], "Thurgood Marshall was his student.", true],
  ["Thurgood Marshall, who argued Brown v. Board, later became the first Black…", "Supreme Court justice", ["president", "astronaut", "mayor of DC"], "He studied law at Howard.", true],
  ["Tape v. Hurley (1885) said a Chinese American girl in San Francisco had a right to…", "attend public school", ["own a railroad", "be mayor", "skip school"], "Mamie Tape's family went to court.", true],
  ["Redlining was when banks refused loans to people in…", "neighborhoods of color", ["rich suburbs only", "farms only", "other countries"], "Maps outlined those areas in red.", true],
  ["In 1939, the singer Marian Anderson was barred from a DC concert hall, so she sang at the…", "Lincoln Memorial", ["Super Bowl", "Grand Ole Opry", "Kennedy Center"], "About 75,000 people came to hear her.", true],
  ["Which strategy did the civil rights movement mostly use?", "nonviolent protest", ["armed invasion", "secret hiding", "doing nothing"], "Marches, boycotts and sit-ins.", true],
  ["The Civil Rights Act of 1964 banned segregation in…", "public places like restaurants and hotels", ["private homes", "the Moon", "only one city"], "It also banned job discrimination.", true],
  ["Fannie Lou Hamer worked to help Black citizens in Mississippi…", "register to vote", ["buy cars", "move to Europe", "stop farming"], "She said she was \"sick and tired of being sick and tired.\"", true],
  ["The Chicano movement and the American Indian Movement were inspired by the…", "civil rights movement", ["War of 1812", "Gold Rush", "Columbian Exchange"], "Many groups fought for equal rights.", true],
  ["John Lewis, who marched at Selma, later served in…", "Congress", ["the Supreme Court", "the army of Rome", "the DC Council"], "He spoke at the March on Washington at age 23.", true],
];

export const SOCIAL_5: Unit[] = [
  bankUnit({
    id: "dc-g5-great-migration",
    title: "The Great Migration & Renaissance",
    emoji: "🎷",
    blurb: "Moving north, and the art and music that bloomed",
    parentNote: "The Great Migration, when about 6 million Black Americans moved from the South to Northern and Western cities between about 1910 and 1970, why they moved and what they found, and the Black Renaissance in art, music and writing that bloomed in Harlem and on DC's own U Street, with Langston Hughes, Duke Ellington, Zora Neale Hurston, Jacob Lawrence and Howard University's Alain Locke.",
    standards: ["5.42; 5.43; 5.25", "the reasons for and impact of the Great Migration, the Black Renaissance, and the roots of blues, gospel and jazz"],
    items: MIGRATION,
  }),
  bankUnit({
    id: "dc-g5-voices-for-justice",
    title: "Voices for Justice",
    emoji: "✊🏾",
    blurb: "Activists, court cases and protests against segregation",
    parentNote: "The people and strategies that fought segregation: Ida B. Wells, W.E.B. Du Bois and A. Philip Randolph, court cases from Plessy v. Ferguson to Brown v. Board of Education and DC's own Bolling v. Sharpe, Mary Church Terrell's fight against segregated restaurants in DC, Howard's civil rights lawyers, boycotts, sit-ins and marches, and the Civil Rights and Voting Rights acts.",
    standards: ["5.49; 5.50; 5.51; 5.53", "activists and organizations for civil rights, landmark court cases on segregation, strategies of resistance to Jim Crow, and the fight for voting rights"],
    items: JUSTICE,
  }),
];
