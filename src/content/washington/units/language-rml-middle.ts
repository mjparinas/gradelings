import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Washington Research and Media Literacy (RML), Grades 3 to 5: purposes of media and how they are achieved, comparing
// parts of messages, who makes them, reactions, research questions, reliable sources, fact and opinion online, and
// giving credit to sources.

const G3_MEDIA: Q[] = [
  ["What are the three main purposes of media messages?", "to inform, to persuade and to entertain", ["to sleep, to eat and to run", "to spell, to add and to draw", "to buy, to sell and to trade"], "Think: teach, convince or amuse."],
  ["A poster says “Vote for Kenji for class helper!” What is its purpose?", "to persuade", ["to inform about weather", "to entertain with a story", "to teach math"], "It wants you to do something."],
  ["A video explains how volcanoes erupt. What is its purpose?", "to inform", ["to persuade", "to sell a volcano", "to tell a joke"], "It gives facts."],
  ["A comic strip about a silly dog is mostly made to…", "entertain", ["persuade", "warn", "sell a dog"], "Comics are often made for fun."],
  ["Which sentence is a fact?", "The library opens at 9:00.", ["The library is the best place in town.", "Everyone loves the library.", "Reading is the most fun thing."], "A fact can be checked."],
  ["Which sentence is an opinion?", "Pizza is the tastiest food.", ["Pizza is often baked in an oven.", "Pizza can have cheese on it.", "Some pizzas are round."], "An opinion tells what someone thinks or feels."],
  ["An ad uses the words “amazing” and “awesome.” Why?", "to make you feel excited about the product", ["to give exact facts", "to teach new words", "to tell you the price"], "Strong feeling words persuade."],
  ["A cereal ad shows a sports star eating the cereal. What technique is this?", "using a famous person", ["giving a recipe", "showing a map", "listing the ingredients"], "Ads use people we admire."],
  ["Who decides what goes into a news report?", "the reporters and editors who make it", ["the readers", "the computer", "the weather"], "People make choices about what to include."],
  ["A toy ad shows only kids smiling. What might it leave out?", "that the toy can break easily", ["the name of the toy", "a picture of the toy", "that it is a toy"], "Ads choose what to show and what to hide."],
  ["You want to know how tall giraffes grow. Which source is best?", "an animal encyclopedia", ["a giraffe cartoon", "a giraffe toy ad", "a joke book"], "Pick a source made to inform."],
  ["What is a good research question?", "How do giraffes sleep?", ["Giraffes are tall.", "I saw a giraffe.", "Giraffes are my favourite."], "A research question asks something you can look up."],
  ["Ravi takes notes from a book. What should he also write down?", "the title and author of the book", ["his favourite colour", "the weather", "what he ate for lunch"], "Write down where your facts came from."],
  ["Lena and Noah watch the same scary movie. Lena loves it; Noah is upset. Why?", "people react to media in different ways", ["one of them is wrong", "the movie changed", "they watched different movies"], "Our feelings and experiences shape reactions."],
  ["How is a news article different from a story?", "a news article tells about real events", ["a story is always true", "they are the same", "a news article has no words"], "Compare: real or made up?"],
  ["A website has a moving box that says “Click to win a prize!” What is it most likely?", "an ad trying to get you to click", ["a true fact", "a school lesson", "a weather report"], "Prize pop-ups are usually ads."],
  ["Why do ads often repeat a catchy jingle?", "so you remember the product", ["to teach music", "to tell the news", "to make you sleepy"], "Repetition helps things stick."],
  ["What is a headline?", "the title at the top of a news story", ["the last sentence", "a picture", "the price"], "Headlines are big and at the top."],
  ["Why is the headline bigger than the rest of the article?", "to catch the reader's attention", ["to save paper", "to hide the story", "because it is the least important"], "Size shows what matters most."],
  ["You find a fact online that surprises you. What should you do?", "check it in another trusted source", ["share it with everyone", "believe it right away", "forget it"], "Check facts in more than one place."],
  ["A brochure about a zoo shows happy animals and big smiles. What is its purpose?", "to get people to visit the zoo", ["to teach spelling", "to warn about storms", "to tell a fairy tale"], "Brochures often persuade."],
  ["What part of a video helps viewers feel excited?", "fast, loud music", ["the page number", "a quiet pause", "the date it was made"], "Sound shapes feelings."],
  ["Which question should you ask about any message?", "Who made this, and why?", ["How many letters are in it?", "What font is it?", "Is it long?"], "Thinking about the maker helps you understand.", true],
  ["An ad says “Nine out of ten kids agree!” What does it want you to think?", "that you should agree too", ["that kids can count", "that the ad is a math lesson", "that the product is free"], "This is the “everybody is doing it” trick.", true],
  ["Which source is most likely to be reliable for a report on frogs?", "a science website from a museum", ["a post from someone selling frog toys", "a cartoon about frogs", "a joke about frogs"], "Museums and science groups are made to inform.", true],
  ["Why might two newspapers show different photos of the same event?", "each one made its own choices", ["one of the events was fake", "photos are always the same", "the event happened twice"], "Makers choose what to show.", true],
];

const G4_MEDIA: Q[] = [
  ["What is the purpose of a public service poster that says “Wear a helmet”?", "to persuade people to stay safe", ["to sell helmets", "to entertain with a story", "to report sports scores"], "Safety posters persuade for a good cause."],
  ["An ad shows a slow-motion close-up of melting cheese. How does this persuade?", "it makes the food look delicious", ["it gives the price", "it lists healthy facts", "it explains how cheese is made"], "Close-ups make you want something."],
  ["What is a target audience?", "the group a message is made for", ["the people who made the message", "the price of the product", "the place an ad is shown"], "Who is it aimed at?"],
  ["A cartoon-style ad with bright colours and silly songs is aimed at…", "young children", ["grandparents", "doctors", "business owners"], "Look at the style for clues."],
  ["What is the purpose of a documentary about ocean animals?", "to inform viewers about ocean life", ["to sell boats", "to tell made-up jokes", "to advertise a game"], "Documentaries share real information."],
  ["Which is the best keyword search for a report on how bees make honey?", "how bees make honey", ["bees are cool", "my report", "yellow and black"], "Use the main words of your question."],
  ["Which source is most likely accurate for facts about the planet Mars?", "a space agency website", ["a post by a stranger", "an ad for a space toy", "a science-fiction movie"], "Experts who study the topic are more reliable."],
  ["Why should you check when a web page was last updated?", "information can go out of date", ["newer pages are prettier", "dates tell you the author", "old pages are always wrong"], "Facts can change over time."],
  ["Which sentence from a review is an opinion?", "This book is the funniest one ever.", ["The book has 120 pages.", "The book came out last year.", "The main character is named Zoe."], "Opinions tell feelings or judgments."],
  ["Which sentence is a fact you could check?", "The town pool is 25 metres long.", ["The town pool is the coolest place.", "Everyone should swim every day.", "The pool water feels the nicest."], "Facts can be measured or checked."],
  ["An ad says “Hurry! Only three left!” What technique is this?", "making you feel you must act fast", ["giving expert advice", "showing a fair comparison", "telling a funny story"], "This is called urgency."],
  ["Why might a news website and a store website describe the same new bike differently?", "they have different purposes", ["bikes change every day", "one is always lying", "they are the same website"], "Informing and selling lead to different choices."],
  ["Who might create a poster asking people to recycle?", "a city or a school group", ["a recycling bin", "the paper itself", "a rainstorm"], "Think about who cares about the message."],
  ["What is a caption?", "words under a photo that explain it", ["the title of the website", "the music in a video", "a list of sources"], "Captions tell about pictures."],
  ["How do sound effects change a video?", "they help create a feeling or mood", ["they show the price", "they make it longer only", "they add page numbers"], "Sound changes how we feel."],
  ["Amir feels hungry after seeing a burger ad. What does this show?", "ads can affect how we feel", ["Amir did not eat breakfast", "ads never work", "burgers are healthy"], "Media can change our reactions."],
  ["You are researching wolves. You have one book. What should you do next?", "find another source to compare facts", ["stop researching", "copy the whole book", "make up the rest"], "More than one source helps you check."],
  ["Which is a good research question for a report on rivers?", "Where does a river's water come from?", ["Rivers are nice.", "Do I like rivers?", "Rivers."], "Ask something you can answer with facts."],
  ["Why should you write the title and author of the sources you use?", "to give credit and let others check", ["to make the report longer", "to show off", "because it looks nice"], "Credit the people whose work you used."],
  ["A video game ad shows only the best graphics. What could it be leaving out?", "how long the game takes to load", ["the name of the game", "that it is a game", "the pictures"], "Ads leave out things that might not sell."],
  ["Compare a recipe in a cookbook and a food ad. What is different?", "the recipe teaches; the ad sells", ["both sell food", "both teach cooking", "the ad gives exact steps"], "Compare their purposes."],
  ["Which website ending often belongs to a government group in the United States?", ".gov", [".toy", ".fun", ".zip"], "Government sites usually end in .gov."],
  ["A photo in an ad has been edited to make a toy look bigger. Why is this a problem?", "it can trick buyers", ["it saves money", "it makes the toy safer", "it is a fact"], "Edited photos can mislead.", true],
  ["Kenji reads a post that says “Dogs can't see any colours.” How can he find out if it is accurate?", "check a science book or animal expert site", ["ask the person who posted it", "share it", "count the likes"], "Popular is not the same as true.", true],
  ["Why might a toy company pay a popular video maker to play with its toy?", "so viewers want the toy", ["so the video is about science", "to teach kids to read", "to warn kids about the toy"], "Paid videos are a kind of ad.", true],
  ["Which choice tells you the most about who made a website?", "an “About us” page", ["the background colour", "the number of pictures", "the font size"], "Look for who is behind the message.", true],
];

const G5_RESEARCH: Q[] = [
  ["Which research question is focused enough for a short report?", "How do sea otters use tools to eat?", ["Animals", "Everything about the ocean", "Why is the world interesting?"], "A good question is narrow enough to answer."],
  ["What are keywords?", "the most important words to search with", ["the longest words in a book", "words with capital letters", "words you made up"], "Keywords carry the main idea."],
  ["Which is the best search for facts about the water cycle?", "water cycle evaporation condensation", ["stuff about water", "my homework please", "I need an answer"], "Use specific topic words."],
  ["Which source is most reliable for facts about earthquakes?", "a geological survey website run by scientists", ["a comment on a video", "an ad for an earthquake kit", "a movie about a disaster"], "Scientists who study it are experts."],
  ["What does it mean to paraphrase?", "put someone's idea in your own words", ["copy the words exactly", "add made-up facts", "skip the main idea"], "Paraphrasing uses your own words, and you still give credit."],
  ["Copying someone's words and saying they are yours is called…", "plagiarism", ["paraphrasing", "citing", "summarizing"], "Always give credit to your sources."],
  ["What do you need to cite a book?", "the author, title and year", ["the colour of the cover", "the number of pictures", "the price"], "A citation lets others find your source."],
  ["When should you use quotation marks in a report?", "when you use a source's exact words", ["for every sentence", "around your own ideas", "only in titles"], "Quotes show the words are someone else's."],
  ["What is sponsored content?", "something paid for by a company to look like regular content", ["a free school lesson", "a weather report", "a dictionary entry"], "Look for words like “sponsored” or “ad.”"],
  ["Which statement from a website is an opinion?", "Recycling is the most important thing anyone can do.", ["Aluminum cans can be recycled.", "Many cities collect recycling each week.", "Paper is made from wood fibres."], "Words like “most important” show a judgment."],
  ["A post has thousands of likes. Does that make it true?", "no, likes show popularity, not accuracy", ["yes, many people agree", "yes, if it has a picture", "yes, if it is short"], "Check facts with reliable sources."],
  ["You find two sources that disagree. What should you do?", "check a third reliable source", ["pick the shorter one", "use neither and guess", "use the one with more pictures"], "More reliable sources help settle it."],
  ["Which is a primary source about life on a farm 100 years ago?", "a diary written by a farmer at that time", ["a cartoon made last year", "a textbook summary", "an ad for farm toys"], "A primary source comes from the time and the people."],
  ["Why is the author's background important?", "it helps you judge if they know the topic", ["it tells you the price", "it shows the font", "it is not important"], "Experts are more likely to be accurate."],
  ["Which helps you take good research notes?", "writing key facts in short phrases with the source", ["copying every sentence", "writing nothing down", "drawing only the cover"], "Notes should be short and show where facts came from."],
  ["A website about healthy snacks is run by a candy company. What should you think?", "it might be one-sided", ["it is always fair", "it must be a science site", "it is a fairy tale"], "Think about who made it and why."],
  ["How do you know a website might be out of date?", "the last update was many years ago", ["it has pictures", "it has a title", "it has a search box"], "Look for the date."],
  ["What is a works cited list?", "a list of the sources you used", ["a list of your friends", "a table of contents", "a list of spelling words"], "It goes at the end of a report."],
  ["Priya writes, “According to a museum website, the oldest tree is over 4 000 years old.” What did she do well?", "she named her source", ["she used an opinion", "she made the fact up", "she left out the number"], "Telling where a fact came from builds trust."],
  ["Why do researchers ask new questions as they read?", "learning more often leads to new things to find out", ["they forgot the old question", "to make the report shorter", "to avoid reading"], "Research can grow as you learn."],
  ["Which question helps you judge a source?", "Who wrote this, and what do they know about it?", ["Is the font pretty?", "Is it long?", "Does it have a cartoon?"], "Ask about the author and their purpose."],
  ["You use a photo from a website in your slideshow. What should you do?", "give credit to who made it", ["say you took it", "change the colours and keep it", "hide where it came from"], "Pictures are someone's work too."],
  ["A chatbot gives you a fact for your report. What should you do?", "check it in a reliable source", ["copy it without checking", "trust it because a computer said it", "share it right away"], "Computer tools can make mistakes.", true],
  ["Which is a secondary source about the Moon landing?", "a book written years later about it", ["a photo taken by an astronaut", "an astronaut's own notes", "a recording from mission control"], "Secondary sources explain events after they happen.", true],
  ["An article says “Studies show kids love our shoes!” but names no study. What is the problem?", "the claim has no evidence you can check", ["it is too short", "it uses the word shoes", "it is a fact"], "Look for evidence you can check.", true],
  ["Why is a source written by a group that sells a product less reliable about that product?", "the group may want to make it look good", ["it has fewer pages", "groups cannot write", "it is always newer"], "Purpose can shape what a source says.", true],
];

export const RML_3: Unit = bankUnit({
  id: "wa-g3-media-messages",
  title: "Media Messages",
  emoji: "📣",
  blurb: "Inform, persuade or entertain?",
  parentNote: "Children sort media by purpose (to inform, persuade or entertain), notice how ads use music, famous people and strong words, tell facts from opinions, and choose good sources for research questions.",
  standards: ["ELA.3.RML.1; ELA.3.RML.2; ELA.3.RML.3; ELA.3.RML.4; ELA.3.RML.5", "the purposes and techniques of media messages, their makers, reactions to them and choosing sources"],
  items: G3_MEDIA,
});

export const RML_4: Unit = bankUnit({
  id: "wa-g4-media-and-sources",
  title: "Media and Sources",
  emoji: "🔍",
  blurb: "Target audiences, techniques and good sources",
  parentNote: "Children practise naming the target audience and purpose of a message, spotting techniques like close-ups and “hurry” words, telling facts from opinions, searching with keywords and judging whether a source is reliable.",
  standards: ["ELA.4.RML.1; ELA.4.RML.2; ELA.4.RML.3; ELA.4.RML.4; ELA.4.RML.5", "research and reliable sources, reactions to media, purposes and techniques, and who makes messages"],
  items: G4_MEDIA,
});

export const RML_5: Unit = bankUnit({
  id: "wa-g5-research-ready",
  title: "Research Ready",
  emoji: "📚",
  blurb: "Questions, sources, notes and credit",
  parentNote: "Children practise narrowing a research question, searching with keywords, judging sources, telling sponsored content from information, taking notes, paraphrasing and citing sources instead of copying.",
  standards: ["ELA.5.RML.1; ELA.5.RML.4; ELA.5.RML.5", "research questions, reliable and accurate sources, and the people and tools that make information"],
  items: G5_RESEARCH,
});
