import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Washington, DC's Grade 7 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with DC examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "language/dc-g7-info-analysis": lesson(
    [
      "Many texts have two central ideas. Show how people, events and ideas affect each other.",
      "Word choice matters: a metaphor like “a lifeline” suggests something that saves.",
      "Two writers can stress different evidence on the same topic. Transitions like consequently show cause and effect.",
    ],
    "Which transition shows a cause-and-effect relationship: consequently, similarly or meanwhile?",
    [
      "Cause and effect shows a result.",
      "Consequently means as a result.",
    ],
    "consequently",
  ),
  "language/dc-g7-story-analysis": lesson(
    [
      "Support an analysis with several pieces of evidence.",
      "Trace how a theme develops across the story, and summarize without opinions.",
      "Compare a story with a film version or a history text about the same time.",
    ],
    "What is a central idea?",
    [
      "It isn’t one detail.",
      "It is what the whole text keeps building.",
    ],
    "the main point the text develops over its course",
  ),
  "science/dc-g7-biodiversity": lesson(
    [
      "Biodiversity is the variety of life in an area.",
      "Ecosystem services include clean water, food and storm protection.",
      "Protecting wetlands, Great Bay and the pine barrens keeps habitat for species like the Karner blue butterfly.",
    ],
    "How do wetlands help people?",
    [
      "Wetland plants trap dirt.",
      "They also soak up floodwater.",
    ],
    "by filtering water and holding floodwater",
  ),
  "science/dc-g7-earth-surface": lesson(
    [
      "Matching coastlines, fossils and rocks on far-apart continents show they were once joined.",
      "Plates pull apart at mid-ocean ridges and collide to build mountains and volcanoes, such as the Andes.",
      "Some changes are sudden (earthquakes); others take millions of years (mountain building).",
    ],
    "Is a landslide a fast or a very slow change to Earth’s surface?",
    [
      "A landslide happens in minutes.",
      "Mountain building takes millions of years.",
    ],
    "fast",
  ),
  "science/dc-g7-resources": lesson(
    [
      "Minerals, energy and water are spread unevenly because of past geologic processes.",
      "Granite formed where melted rock cooled deep underground, and the sand and gravel under much of DC were laid down by ancient rivers.",
      "Using resources has costs: quarries and gravel pits change the land, and taking too much groundwater dries up wells and springs.",
      "Scientists map hazards such as floods and earthquakes, and monitoring networks help warn people early.",
    ],
    "Why is granite found in some places and not others?",
    [
      "Granite forms only where melted rock cooled slowly underground.",
      "That happened in some places and not others.",
    ],
    "past geologic processes put them there",
  ),
  "social/dc-g7-capital-of-a-new-nation": lesson(
    [
      "In the Compromise of 1790, the South got the capital on the Potomac and Hamilton got the war debts plan.",
      "George Washington stepped down after two terms, and he was also an enslaver.",
      "In 1800, power passed peacefully from Adams to Jefferson.",
      "DC ended the slave trade in 1850 and slavery in 1862, and many enslaved people freed themselves by escaping to Union lines.",
    ],
    "Why was George Washington stepping down after two terms important?",
    [
      "Many rulers held power for life.",
      "He showed that leaders can give up power.",
    ],
    "it set an example of a peaceful handover of power",
  ),
  "social/or-g5-encounters": lesson(
    ["European explorers wanted gold, land and a sea route to Asia.", "The Columbian Exchange moved crops, animals and diseases between hemispheres.", "Diseases like smallpox killed huge numbers of Native people. Jamestown (1607) was the first lasting English colony."],
    "Which went from the Americas to Europe: potatoes or horses?",
    ["Horses came from Europe.", "Potatoes were first grown in the Americas."],
    "potatoes",
  ),
  "social/ca-g8-revolutionary-ideas": lesson(
    ["The Revolution spread new ideas. Jefferson’s Virginia Statute for Religious Freedom (1786) said no one could be forced to attend or pay for a church.", "James Madison helped pass it and later wrote the First Amendment.", "American independence inspired others, like Simón Bolívar in South America. New states wrote their own constitutions."],
    "Which later document did the Virginia Statute for Religious Freedom help inspire?",
    ["James Madison helped pass the Statute.", "He later drafted the Bill of Rights.", "Its religious freedom is in the First Amendment."],
    "the First Amendment",
  ),
  "social/wa-g5-revolution": lesson(
    ["Order: Boston Tea Party (1773), war begins (1775), Declaration of Independence (1776), Saratoga (1777), Yorktown (1781).", "George Washington led the Continental Army. Benjamin Franklin won France as an ally.", "The Declaration says people have rights to life, liberty and the pursuit of happiness."],
    "Which came first: the Declaration of Independence or the Battle of Yorktown?",
    ["The Declaration was signed in 1776.", "Yorktown was in 1781."],
    "the Declaration of Independence",
  ),
  "social/wa-g8-civil-war": lesson(
    ["The main cause of the Civil War (1861–1865) was slavery and whether it would spread.", "Southern states seceded and formed the Confederate States of America; the North was the Union. Maryland, a border state, stayed in the Union.", "The war ended when Lee surrendered to Grant at Appomattox Court House, Virginia, in April 1865."],
    "What did the states that seceded form?",
    ["To secede means to leave the Union.", "Eleven Southern states left.", "They formed their own government."],
    "the Confederate States of America",
  ),
  "social/wa-g8-reconstruction": lesson(
    ["Reconstruction (1865–1877) rebuilt the South and brought Southern states back into the Union.", "The Reconstruction Amendments: the 13th ended slavery, the 14th made formerly enslaved people citizens, and the 15th protected the vote for Black men.", "After 1877, many of these rights were rolled back by Jim Crow laws."],
    "Which amendment made formerly enslaved people citizens?",
    ["13th: ended slavery.", "14th: citizenship and equal protection.", "15th: voting regardless of race."],
    "the 14th",
  ),
  "social/ca-g8-freedom-and-change": lesson(
    ["Before the Civil War, most white Southerners were small farmers who owned no enslaved people.", "Free Black communities and reformers worked for rights; Annie Bidwell of Chico, California, worked for women’s suffrage, temperance and education.", "After Reconstruction, Black Southerners who moved to Kansas in 1879 were called Exodusters."],
    "What were Black Southerners who moved to Kansas in 1879 called?",
    ["They left the South after Reconstruction ended.", "Their journey was named after the Exodus story.", "They were called Exodusters."],
    "Exodusters",
  ),
};
