import type { Unit } from "../../types";
import { G8 as WASHINGTON_SOCIAL_8 } from "../../washington/units/social-59-g8";
import { UNITS as NEW_YORK_SOCIAL_8 } from "../../new-york/units/social-g8";
import { from, localCopy } from "./kit";

// Massachusetts copies of Grade 9 (United States History I) units that fit Massachusetts except for a few questions
// about Washington Territory or New York's own places, with Massachusetts items in their place.

export const SOCIAL_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_SOCIAL_8, "wa-g8-reconstruction"), "ma-g9-reconstruction", ["USI.T5.6", "the consequences of the Civil War and Reconstruction"], [
    ["Which Massachusetts senator was beaten in the Senate in 1856 after a speech against slavery?", "Charles Sumner", ["John Adams", "Daniel Shays", "Horace Mann"], "He later pushed for equal rights during Reconstruction."],
    ["The 13th Amendment, ratified in 1865,…", "ended slavery in the United States", ["gave women the vote", "created income tax", "ended Prohibition"], "Massachusetts ratified it quickly."],
    ["Many formerly enslaved people founded schools during Reconstruction with help from…", "the Freedmen's Bureau and Northern teachers", ["the British army", "the Confederate government", "no one"], "Some teachers came from New England."],
    ["Which amendment promised equal protection of the laws to all citizens?", "the 14th Amendment", ["the 1st Amendment", "the 10th Amendment", "the 19th Amendment"], "It was ratified in 1868."],
    ["Why did Reconstruction end in 1877?", "federal troops left the South in a political compromise", ["the South won the war", "all problems were solved", "a new king ruled"], "It is called the Compromise of 1877."],
  ]),
  localCopy(from(NEW_YORK_SOCIAL_8, "ny-g8-city-immigrants"), "ma-g9-city-immigrants", ["USI.T6.4", "immigration and the growing cities"], [
    ["Many immigrants to Boston in the late 1800s first lived in crowded neighborhoods such as the…", "North End", ["Berkshires", "Cape Cod National Seashore", "Quabbin Reservoir"], "Irish, then Italian and Jewish families lived there."],
    ["Many Portuguese and Cabo Verdean immigrants settled in New Bedford and Fall River to work in…", "fishing, whaling and the mills", ["gold mines", "oil fields", "cotton plantations"], "Both are port cities."],
    ["Settlement houses, like Denison House in Boston, offered immigrants…", "classes, child care and help finding work", ["free land in the West", "jobs as soldiers", "seats in Congress"], "Volunteers lived in the neighborhood."],
    ["The Immigration Restriction League, founded in Boston in 1894, wanted to…", "limit immigration with a reading test", ["welcome every immigrant", "end all trade", "build more ports"], "Congress passed a literacy test in 1917."],
    ["Boston's first subway, which opened in 1897, ran under…", "Tremont Street", ["the Charles River", "Plymouth Rock", "Faneuil Hall"], "It was the first subway in the United States."],
  ]),
];
