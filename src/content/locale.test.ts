import { describe, expect, it } from "vitest";
import { COURSES } from "./all";
import { canadianWords, gradeName, localeOf, localizeCopy, localizeQuestion, localizeText, localizeUnit, questionText, regionKind, US_SPELLING, usNumbers, usSpelling } from "./locale";
import { FRAMEWORKS, getFramework } from "./frameworks";
import { withSeed } from "./random";
import type { Question, Unit } from "./types";

describe("US spelling", () => {
  it("changes Canadian spellings and keeps the case", () => {
    expect(usSpelling("My favourite colour is grey.")).toBe("My favorite color is gray.");
    expect(usSpelling("Colour the CENTRE.")).toBe("Color the CENTER.");
    expect(usSpelling("She practised for 2 metres, then kept practising.")).toBe("She practiced for 2 meters, then kept practicing.");
    expect(usSpelling("Walk to the fire hall. Fire halls have trucks.")).toBe("Walk to the fire station. Fire stations have trucks.");
    expect(usSpelling("WHMIS (Workplace Hazardous Materials Information System) symbols show hazards. Check the WHMIS label.")).toBe(
      "GHS (Globally Harmonized System) symbols show hazards. Check the GHS label.",
    );
    expect(usSpelling("We travelled and labelled the neighbours' litres.")).toBe("We traveled and labeled the neighbors' liters.");
    expect(usSpelling("Organise and summarise, then analyse it.")).toBe("Organize and summarize, then analyze it.");
  });

  it("leaves words that are the same in both alone", () => {
    for (const text of ["Practice makes progress.", "Two analyses agree.", "The emphasis is on reading.", "A programmer is programming.", "Count the colours?"]) {
      const out = usSpelling(text);
      if (text.startsWith("Count")) expect(out).toBe("Count the colors?");
      else expect(out).toBe(text);
    }
  });

  it("only maps a Canadian word to a different word", () => {
    for (const [ca, us] of US_SPELLING) {
      expect(ca).not.toBe(us);
      expect(ca).toMatch(/^[a-z]+$/);
      expect(us).toMatch(/^[a-z]+$/);
    }
  });
});

describe("US numbers", () => {
  it("uses commas from 10 000 up", () => {
    expect(usNumbers("345 678 people")).toBe("345,678 people");
    expect(usNumbers("1 000 000 and 12 345.6")).toBe("1,000,000 and 12,345.6");
    expect(usNumbers("10 000")).toBe("10,000");
    expect(usNumbers("4726 and 3.14 and 2 + 3")).toBe("4726 and 3.14 and 2 + 3");
  });
});

describe("locales", () => {
  it("every framework today is Canadian, with the right region word", () => {
    for (const f of FRAMEWORKS) {
      expect(localeOf(f)).toBe(f.country === "US" ? "en-US" : "en-CA");
      expect(regionKind(f)).toBe(f.regionKind === "district" ? "district" : f.country === "US" ? "state" : ["ca-yt", "ca-nt", "ca-nu"].includes(f.id) ? "territory" : "province");
    }
    expect(regionKind({ country: "US" })).toBe("state");
    expect(regionKind({ country: "CA" })).toBe("province");
  });

  it("names grades the way each country does", () => {
    expect(gradeName("k", "en-US")).toBe("Kindergarten");
    expect(gradeName("1", "en-US")).toBe("1st grade");
    expect(gradeName("2", "en-US")).toBe("2nd grade");
    expect(gradeName("3", "en-US")).toBe("3rd grade");
    expect(gradeName("4", "en-US")).toBe("4th grade");
    expect(gradeName("9", "en-CA")).toBe("Grade 9");
  });

  it("Canadian text is untouched", () => {
    expect(localizeText("My favourite colour: 10 000", "en-CA")).toBe("My favourite colour: 10 000");
    expect(localizeText("My favourite colour: 10 000", "en-US")).toBe("My favorite color: 10,000");
  });
});

describe("localizing questions and units", () => {
  const q: Question = {
    kind: "choice",
    prompt: "Which colour has 10 000 dots?",
    speak: "Which colour has ten thousand dots?",
    hint: "Count by 1 000s from the centre.",
    visual: { type: "table", title: "Favourite colours", headers: ["Colour", "Votes"], rows: [["grey", 12]] },
    choices: [
      { id: "a", label: "grey" },
      { id: "b", label: "blue", speak: "the colour blue" },
    ],
    answer: "a",
  };

  it("converts every string the child sees or hears, and nothing else", () => {
    const us = localizeQuestion(q, "en-US");
    expect(us).toEqual({
      kind: "choice",
      prompt: "Which color has 10,000 dots?",
      speak: "Which color has ten thousand dots?",
      hint: "Count by 1,000s from the center.",
      visual: { type: "table", title: "Favorite colors", headers: ["Color", "Votes"], rows: [["gray", 12]] },
      choices: [
        { id: "a", label: "gray" },
        { id: "b", label: "blue", speak: "the color blue" },
      ],
      answer: "a",
    });
    expect(localizeQuestion(q, "en-CA")).toBe(q);
    // No keys appear that the question didn't have.
    expect(Object.keys(localizeQuestion({ kind: "build", prompt: "Build 23", hint: "Tens first", target: 23 }, "en-US")).sort()).toEqual(["hint", "kind", "prompt", "target"]);
  });

  it("wraps a unit once and keeps its id, standards and answers", () => {
    const unit: Unit = {
      id: "colours",
      title: "Colours",
      emoji: "🎨",
      blurb: "Name the colours.",
      parentNote: "Colour words.",
      standards: { "ca-bc": "x" },
      generate: () => [q],
    };
    const us = localizeUnit(unit, "en-US");
    expect(us).toBe(localizeUnit(unit, "en-US"));
    expect(localizeUnit(unit, "en-CA")).toBe(unit);
    expect(us.id).toBe("colours");
    expect(us.standards).toBe(unit.standards);
    expect(us.title).toBe("Colors");
    expect((us.generate()[0] as Extract<Question, { kind: "choice" }>).answer).toBe("a");
  });

  it("every existing unit can be localized without changing an answer", () => {
    // Spelling lessons ("colour or color?") can't be converted: two choices become the same word. They are
    // all language units, which a US framework writes for itself instead of sharing.
    const collide: string[] = [];
    for (const course of COURSES) {
      if (course.subject === "immersion" || course.subject === "core-french") continue;
      for (const unit of course.units) {
        const ca = withSeed(7, () => unit.generate({ difficulty: 2 }));
        const us = withSeed(7, () => localizeUnit(unit, "en-US").generate({ difficulty: 2 }));
        expect(us.length).toBe(ca.length);
        us.forEach((u, i) => {
          expect(u.kind).toBe(ca[i].kind);
          if (u.kind === "choice" && ca[i].kind === "choice") {
            expect(u.answer).toBe(ca[i].answer);
            expect(u.choices.some((c) => c.id === u.answer)).toBe(true);
            const labels = u.choices.map((c) => `${c.label}|${c.emoji ?? ""}|${c.coin ?? ""}|${c.shape ?? ""}`);
            if (new Set(labels).size !== labels.length) collide.push(`${course.grade}/${course.subject}/${unit.id}`);
          }
          if (u.kind === "input" && ca[i].kind === "input") expect(u.answer).toBe(ca[i].answer);
        });
      }
    }
    expect(collide.filter((k) => !k.includes("/language/"))).toEqual([]);
  });
});

describe("Canada words", () => {
  it("finds words that tie a question to Canada", () => {
    expect(canadianWords("Pay with a loonie in Ottawa.")).toEqual(["loonie", "Ottawa"]);
    expect(canadianWords("Which province is east of Manitoba?")).toEqual(["province", "Manitoba"]);
    expect(canadianWords("Add the GST, then use BEDMAS.")).toEqual(["GST", "BEDMAS"]);
    expect(canadianWords("Read the WHMIS label.")).toEqual(["WHMIS"]);
    expect(canadianWords("Count the apples.")).toEqual([]);
    // Whole words only.
    expect(canadianWords("Ontarians")).toEqual([]);
  });

  it("reads every visible string of a question", () => {
    const text = questionText({ kind: "choice", prompt: "Where?", hint: "Look", choices: [{ id: "a", label: "Toronto" }, { id: "b", label: "Paris" }], answer: "a" });
    expect(canadianWords(text)).toEqual(["Toronto"]);
  });

  it("flags BC's Canadian social studies units", () => {
    const g4 = COURSES.find((c) => c.grade === "4" && c.subject === "social")!;
    const flagged = g4.units.filter((u) => u.standards["ca-bc"] && withSeed(1, () => u.generate()).some((q) => canadianWords(questionText(q)).length));
    expect(flagged.length).toBeGreaterThan(0);
    expect(getFramework("ca-bc").country).toBe("CA");
  });
});

describe("family copy", () => {
  it("is US English with US grade names for a US family, and unchanged for a Canadian one", () => {
    const text = "Kindergarten and Grade 1 have it on. Last practised in Grade 4, a favourite.";
    expect(localizeCopy(text, "en-US")).toBe("Kindergarten and 1st grade have it on. Last practiced in 4th grade, a favorite.");
    expect(localizeCopy(text, "en-CA")).toBe(text);
  });
});
