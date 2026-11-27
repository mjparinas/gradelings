# Fix "the the" in curriculum descriptions; worksheet titles ask for answers

2026-11-27, from the Search Console export. Many US states' `curriculumName` already starts with "the" and some are possessive ("Wisconsin's academic standards"), so page descriptions read "matched to the the New Jersey Student Learning Standards" and "the Wisconsin's academic standards". Descriptions are the snippet people read, so they now go through `theCurriculum` (`src/lib/curriculumName.ts`); use it instead of typing "the ${f.curriculumName}" in new copy.

Worksheet page titles now lead with "Free {grade} {subject} worksheets with answers ({region})", because the queries that already rank are plural and ask for answers ("4th grade math worksheets wisconsin", "grade 8 maths worksheets with answers"). Shorter older wordings stay as fallbacks inside the 70-character limit.
