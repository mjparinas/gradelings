import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Vermont's Grade 7 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Vermont examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "language/vt-g7-info-analysis": lesson(
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
  "language/vt-g7-story-analysis": lesson(
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
  "science/vt-g7-biodiversity": lesson(
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
  "science/vt-g7-earth-surface": lesson(
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
  "science/vt-g7-resources": lesson(
    [
      "Minerals, energy and water are spread unevenly because of past geologic processes.",
      "Vermont's granite formed as melted rock cooled deep underground, and its sand and gravel were left behind by melting glaciers.",
      "Using resources has costs: quarries and gravel pits change the land, and taking too much groundwater dries up wells and springs.",
      "Scientists map hazards such as floods and earthquakes, and monitoring networks help warn people early.",
    ],
    "Why is granite found in some places and not others?",
    [
      "Granite forms only where melted rock cooled slowly underground.",
      "That happened in some places, such as Vermont, and not others.",
    ],
    "past geologic processes put them there",
  ),
  "social/ny-g8-city-immigrants": lesson(
    ["From the 1890s, millions of immigrants came through Ellis Island, and many lived in crowded tenements in New York City.", "Jacob Riis’s 1890 book How the Other Half Lives used photographs to show the hard lives of the poor.", "In 1898 five boroughs joined to form Greater New York City; its first subway opened in 1904. Tammany Hall was a powerful political machine."],
    "Which five areas joined in 1898 to form Greater New York City?",
    ["They became the five boroughs.", "Manhattan, Brooklyn and the Bronx are three.", "Queens and Staten Island are the other two."],
    "Manhattan, Brooklyn, the Bronx, Queens and Staten Island",
  ),
  "social/ny-g8-workers-progressives": lesson(
    ["The Triangle Shirtwaist Factory fire (1911) killed 146 workers, leading to new safety laws.", "Workers formed unions; a strike is when workers stop working until their demands are met.", "Progressives pushed reform: Lewis Hine photographed child labour, and Frances Perkins became the first woman US Secretary of Labor."],
    "What is a strike?",
    ["Workers want better pay or conditions.", "They stop working together.", "They return when demands are met."],
    "when workers stop working until their demands are met",
  ),
  "social/ny-g8-world-war-i": lesson(
    ["World War I (1914–1918) had causes such as militarism, alliances, imperialism and nationalism; soldiers fought from trenches.", "The US joined in 1917 after Germany returned to unrestricted submarine warfare, attacking ships near Britain.", "In Schenck v. United States (1919), the Court ruled that speech creating a “clear and present danger” can be limited."],
    "Why did unrestricted submarine warfare push the US into the war?",
    ["German submarines would attack any ship near Britain.", "That included American ships.", "Americans were killed, and the US entered the war in 1917."],
    "Germany would attack American ships.",
  ),
  "social/ny-g8-roaring-twenties": lesson(
    ["The 1920s are called the Roaring Twenties because the economy boomed and new music, fashions and ideas spread.", "In the Great Migration, millions of Black Southerners moved to cities in the North and West.", "The Harlem Renaissance was a burst of Black art, writing and jazz in New York City."],
    "What was the Great Migration?",
    ["Many people left the rural South.", "They wanted jobs and to escape Jim Crow laws.", "They moved to cities in the North and West."],
    "the movement of millions of Black Southerners to northern and western cities",
  ),
  "social/ny-g8-great-depression": lesson(
    ["The stock market crash of 1929 began the Great Depression, and the Dust Bowl hit farmers on the Plains.", "FDR’s New Deal was a set of programs for relief, recovery and reform. As governor of New York, he had already set up a relief agency.", "Eleanor Roosevelt travelled the country and spoke up for the poor and for civil rights."],
    "The New Deal had three goals, all starting with R. What were they?",
    ["Relief helped people in need right away.", "Recovery helped the economy grow again.", "Reform tried to prevent another depression."],
    "relief, recovery and reform",
  ),
  "social/ny-g8-world-war-ii": lesson(
    ["Totalitarian leaders such as Hitler in Germany and Mussolini in Italy rose to power before World War II.", "The Axis powers were Germany, Italy and Japan. The US entered the war after Japan attacked Pearl Harbor in December 1941.", "On D-Day (6 June 1944) the Allies landed in France. At home, “Rosie the Riveter” stood for women taking factory jobs."],
    "Which event brought the US into World War II?",
    ["The war began in Europe in 1939.", "The US stayed out at first.", "Japan attacked Pearl Harbor on December 7, 1941."],
    "the attack on Pearl Harbor",
  ),
  "social/ny-g8-civil-rights": lesson(
    ["Brown v. Board of Education (1954) ended legal school segregation under the 14th Amendment’s equal protection clause.", "Leaders like Martin Luther King Jr. led peaceful protests; Shirley Chisholm of Brooklyn became the first Black woman in Congress in 1968.", "Other groups fought for equal rights too: César Chávez and Dolores Huerta organized farm workers."],
    "Brown v. Board was decided under which amendment?",
    ["The case was about equal treatment in schools.", "The equal protection clause is in one amendment.", "That is the 14th Amendment."],
    "the 14th",
  ),
  "social/vt-g7-modern-vermont": lesson(
    [
      "After the Civil War, many hill farms emptied as families moved west, and most farmers that stayed turned to dairy.",
      "Stone carvers from Italy and Scotland came to Barre's granite sheds, and French Canadian workers came to the mills in Winooski.",
      "The Great Flood of 1927 was Vermont's worst disaster. In the 1930s the Civilian Conservation Corps built flood-control dams, parks and ski trails.",
      "Ski areas and the interstates brought fast growth, and Act 250 (1970) made big projects think about land, water and towns.",
    ],
    "What does Act 250 require big building projects to do?",
    [
      "It was passed in 1970.",
      "It looks at effects on land, water and towns.",
    ],
    "get a permit that considers their effects",
  ),
};
