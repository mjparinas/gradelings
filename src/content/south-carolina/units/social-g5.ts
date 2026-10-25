import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// South Carolina's own Grade 5 social studies units (`sc-` ids), for United States and South Carolina Studies II: South
// Carolina from the textile mills to today's global industries, including the Great Depression and the changes in rural
// communities (5.2.CO, 5.5.CX), and the Civil Rights Movement in South Carolina (5.4.CE, 5.4.CC). Segregation and the
// violence used to defend it are told plainly.

const MODERN_SC: Q[] = [
  ["Around 1900, many new factories in South Carolina's Piedmont made…", "cotton cloth", ["cars", "computers", "airplanes"], "They were called textile mills."],
  ["Textile mills were built near the fall line and in the Piedmont because…", "fast rivers could power the machines", ["there were no people there", "it was near the ocean", "it never rained"], "Water wheels turned the machines."],
  ["Families who worked in a mill often lived in a…", "mill village owned by the company", ["castle", "fort", "big city apartment by the sea"], "The company owned the houses and the store."],
  ["Children as young as 10 worked in many mills around 1900. Laws later…", "limited child labor", ["required all children to work", "closed all schools", "made mills bigger"], "Reformers wanted children in school."],
  ["An insect that destroyed much of South Carolina's cotton in the early 1920s was the…", "boll weevil", ["honeybee", "ladybug", "monarch butterfly"], "It eats cotton bolls."],
  ["After the boll weevil, many Black South Carolinians moved north in the…", "Great Migration", ["Gold Rush", "Columbian Exchange", "Trail of Tears"], "They looked for jobs and fairer treatment."],
  ["The Great Depression began in 1929 when the…", "stock market crashed", ["Civil War started", "boll weevil arrived", "first car was built"], "Banks and businesses failed."],
  ["During the Great Depression, many South Carolina farmers…", "lost their farms because crop prices fell", ["got very rich", "moved to Europe", "stopped eating"], "Prices for cotton dropped low."],
  ["The New Deal's Civilian Conservation Corps (CCC) built many of South Carolina's…", "state parks", ["airports", "malls", "skyscrapers"], "Young men built cabins, trails and lakes."],
  ["The Santee Cooper project of the New Deal built dams that made…", "electricity and Lake Marion and Lake Moultrie", ["a new ocean", "a desert", "a gold mine"], "It brought power to rural homes."],
  ["During World War II, soldiers trained at Fort Jackson in…", "Columbia", ["London", "Paris", "Tokyo"], "It is still an Army training base."],
  ["Marines have trained for more than 100 years at…", "Parris Island", ["Sassafras Mountain", "Lake Murray", "Rock Hill"], "It is near Beaufort."],
  ["The Tuskegee Airmen, the first Black military pilots, trained in South Carolina at…", "Walterboro", ["Greenville only", "Myrtle Beach", "Columbia only"], "There is a memorial there today."],
  ["Today, factories in South Carolina make…", "cars, tires and airplanes", ["only cotton cloth", "nothing", "only rice"], "Companies from around the world build plants here."],
  ["One of the busiest ports on the East Coast is the Port of…", "Charleston", ["Columbia", "Spartanburg", "Rock Hill"], "Ships carry goods around the world."],
  ["One of the biggest industries in South Carolina today is…", "tourism", ["whaling", "gold mining", "fur trading"], "Visitors come for beaches, golf and history."],
  ["Hurricane Hugo struck South Carolina in…", "1989", ["1776", "1861", "1929"], "It hit near Charleston and caused huge damage."],
  ["When textile mills closed in the 1990s and 2000s, many mill towns…", "lost jobs and had to find new industries", ["got many new mills", "grew into big ports", "became islands"], "Factories moved to other countries.", true],
  ["Why have many rural South Carolina towns lost people?", "farms need fewer workers, so people moved to cities for jobs", ["the land turned to desert", "laws said to leave", "the ocean flooded them all"], "Machines changed farm work.", true],
  ["A company from Germany or Japan building a plant in South Carolina shows that the state is…", "part of a global economy", ["closed to trade", "a separate country", "only a farm state"], "Goods and jobs cross borders.", true],
  ["How did the New Deal change the role of the federal government?", "it took a bigger part in helping people and the economy", ["it stopped helping anyone", "it ended all taxes", "it closed the banks for good"], "Programs gave jobs and aid.", true],
  ["Rural electricity from projects like Santee Cooper meant farm families could…", "use lights, radios and refrigerators", ["stop farming", "move to the Moon", "skip school"], "Many farms had no power before.", true],
  ["Why did the 1920s feel less roaring in rural South Carolina than in big cities?", "farmers were already struggling with low prices and the boll weevil", ["there was no music", "everyone was rich", "it was always winter"], "Not every place shared the boom.", true],
  ["Military bases helped South Carolina's economy because they…", "brought jobs and people to nearby towns", ["closed all stores", "stopped trade", "had no workers"], "Bases need many services.", true],
];

const CIVIL_RIGHTS: Q[] = [
  ["Laws that kept Black and white people apart in schools, buses and restaurants were…", "Jim Crow laws", ["the Bill of Rights", "tariffs", "treaties"], "This was called segregation."],
  ["Briggs v. Elliott began when Black parents in Clarendon County asked for…", "equal schools and school buses", ["a new state capital", "more taxes", "a new flag"], "Their children had to walk miles to school."],
  ["Briggs v. Elliott became one of the five cases decided together in…", "Brown v. Board of Education", ["Marbury v. Madison", "Plessy v. Ferguson", "the Treaty of Paris"], "The Supreme Court ruled in 1954."],
  ["In 1954, the Supreme Court ruled that segregated public schools were…", "unconstitutional", ["fair", "required", "free"], "Separate is not equal."],
  ["Septima Poinsette Clark of Charleston started Citizenship Schools that taught adults to…", "read and register to vote", ["build ships", "grow rice", "play music"], "She was called the Queen Mother of the movement."],
  ["The Friendship Nine were college students arrested in 1961 for…", "sitting at a whites-only lunch counter in Rock Hill", ["robbing a bank", "starting a fire", "skipping school"], "They chose jail instead of paying bail."],
  ["A sit-in is a protest where people…", "sit in a place that refuses to serve them, and stay", ["sit at home", "run a race", "throw a party"], "It is peaceful and nonviolent."],
  ["In 1963, Harvey Gantt became the first Black student at…", "Clemson", ["the State House", "Fort Jackson", "the Citadel's football team"], "He later became a mayor and architect."],
  ["In 1968, state police fired on students protesting a segregated bowling alley in Orangeburg, killing three. This is the…", "Orangeburg Massacre", ["Stono Rebellion", "Battle of Cowpens", "Boston Tea Party"], "It happened at South Carolina State College."],
  ["The Civil Rights Act of 1964…", "outlawed segregation in public places", ["started segregation", "ended the Cold War", "built the interstates"], "Hotels and restaurants had to serve everyone."],
  ["The Voting Rights Act of 1965…", "protected the right to vote for Black Americans", ["ended voting", "lowered taxes", "started the Space Race"], "Unfair tests to block voters were banned."],
  ["Modjeska Monteith Simkins of Columbia was a leader who…", "fought for civil rights and health care", ["led the Confederate army", "invented the cotton gin", "wrote the state song"], "She worked for the NAACP."],
  ["The civil rights movement mostly used…", "nonviolent protest", ["armies", "secret wars", "pirates"], "Marches, boycotts and sit-ins."],
  ["Refusing to buy from a business to protest its unfair rules is a…", "boycott", ["sit-in", "tariff", "veto"], "It costs the business money."],
  ["In 1969, hospital workers in Charleston, most of them Black women, went on strike for…", "fair pay and respect", ["less work", "a new hospital name", "longer holidays"], "Coretta Scott King came to support them.", true],
  ["Why did Clarendon County parents risk their jobs to sue in Briggs v. Elliott?", "they wanted their children to have fair schools", ["they wanted to move away", "they were paid to", "they wanted more taxes"], "Many lost jobs because they spoke up.", true],
  ["The Supreme Court's 1896 ruling in Plessy v. Ferguson allowed segregation if facilities were…", "\"separate but equal\"", ["fully mixed", "closed", "privately owned"], "In practice they were never equal.", true],
  ["Why did change come slowly to South Carolina schools after 1954?", "many leaders resisted and delayed integration", ["everyone agreed at once", "there were no schools", "the court ruling was secret"], "Most schools were not integrated until about 1970.", true],
  ["\"Jail, no bail\" meant protesters…", "stayed in jail to show the unfairness of the law", ["paid to get out fast", "never protested", "hid from police"], "It drew attention to the cause.", true],
  ["How did the Voting Rights Act change South Carolina?", "many more Black citizens registered and were elected", ["fewer people voted", "elections stopped", "nothing changed"], "Black voters gained real power.", true],
  ["Which is a primary source about the Friendship Nine?", "a newspaper photo from 1961", ["a website written last year", "a textbook summary", "a poem written today"], "It was made at the time.", true],
  ["Why were students and young people so important to the movement?", "many were willing to march, sit in and go to jail", ["they had no school", "only children could vote", "adults were not allowed"], "Young people led many protests.", true],
  ["Comparing life before and after the Civil Rights Act shows…", "both changes and things that stayed the same", ["nothing ever changed", "every problem was solved", "the past did not matter"], "Look at continuity and change.", true],
  ["After the 1960s, more Black South Carolinians were elected to…", "the General Assembly and Congress", ["no offices at all", "the British Parliament", "the Confederacy"], "Voting rights led to new leaders.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "sc-g5-modern-sc",
    title: "South Carolina: Mills to Ports",
    emoji: "🏭",
    blurb: "Textile mills, the Depression, war years and new industries",
    parentNote:
      "How South Carolina changed from 1900 to today: textile mills and mill villages, the boll weevil and the Great Migration, the Great Depression and New Deal projects such as Santee Cooper, military bases, and today's car, airplane, port and tourism industries.",
    standards: ["5.2.CO; 5.5.CX", "the Depression's impact on South Carolina, and how rural communities changed within national and global industries"],
    items: MODERN_SC,
  }),
  bankUnit({
    id: "sc-g5-civil-rights",
    title: "Civil Rights in South Carolina",
    emoji: "🗳️",
    blurb: "Briggs v. Elliott, sit-ins, Orangeburg and the right to vote",
    parentNote:
      "The Civil Rights Movement in South Carolina: Jim Crow segregation, Briggs v. Elliott and Brown v. Board, Septima Clark's Citizenship Schools, the Friendship Nine, Harvey Gantt, the Orangeburg Massacre, and the Civil Rights and Voting Rights Acts.",
    standards: ["5.4.CE; 5.4.CC", "the causes and impact of social movements in South Carolina, and race relations after Brown v. Board"],
    items: CIVIL_RIGHTS,
  }),
];
