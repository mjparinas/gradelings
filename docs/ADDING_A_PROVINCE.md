# Adding a province or state

Everything that differs by jurisdiction lives in a `Framework` (`src/content/frameworks.ts`). No screen changes are needed.

1. **Framework.** Create `src/content/<name>/framework.ts` exporting a `Framework`: id (add it to `FrameworkId` in `types.ts`), slug, `curriculumName`, grades, subjects offered, report-card scale and guide, and the scoring scheme. Register it in `frameworks.ts`. The province picker in Children, Settings and the Start screen reads that list, so it appears automatically.
2. **Official standards.** Save the official expectations under `docs/research/<name>/` with their source and date, and write a README like `docs/research/ontario/README.md`.
3. **Courses.** For each grade add `src/content/<name>/g<N>.ts` exporting `courses`. A course lists:
   - `units`: units written for this jurisdiction. Give them ids that do not clash with BC ids.
   - `shares`: BC (or other) unit ids to reuse. A framework can also share another framework's own units (Alberta shares some Ontario units); list that dependency in `EXTRA_DEPENDS` in `src/content/index.ts` so the other framework's file is downloaded too. Each gives the new standards text for that unit. Share only after sampling the unit's questions and confirming they fit the new curriculum.
   - `order`: the unit order for this framework.
   - `bigIdeas`: strand headings.
4. **Register the grade.** Add the grade loader to `src/content/index.ts` and `all.ts`. Each grade and framework is its own download.
5. **Check the standard codes.** Extend the test in `content.test.ts` so the codes in `standards` must exist in the official data.
6. **Parent and public pages.** A new region gets the same parent content as every other region, in the same change (see "Region parity" in AGENTS.md). Curriculum pages, the report-card page and the sitemap come from the framework automatically; the rest needs writing or checking:
   - **Parent guides** (the site's SEO content for parents): a `FrameworkGuides` entry in `GUIDES` (`src/content/guides.ts`, copy in `src/content/<name>/guides.ts`) with grade notes for every grade, the region's competencies or learning-skills page, its assessment page (provincial or state tests), and a French guide when it teaches French. Help pages and worksheets per grade and subject follow from the courses. If the competencies or assessment page needs a new URL segment, add its route folder under `src/app/guides/[framework]/`.
   - **Report card:** the framework's `reportCard` guide feeds `/report-cards/{slug}/` and the parent area, so make it say what that region's report card says.
   - **Teachers:** add the id to `TEACHER_FRAMEWORK_IDS` (`src/components/site/teachers.ts`) for `/for-teachers/` pages and classroom mode.
   - **Share cards:** check the guide and unit cards for the region read well (`ogText.ts`).
   - **Site-wide copy:** search for every hand-written list of regions, scales or prices and add the new one: help FAQs (`src/app/help/faqs.ts`), comparison pages (`src/content/compare.ts`), home and pricing pages, metadata, manifest and terms. Prefer reading names from `FRAMEWORKS` (`regionList`, `listRegions`).
   - **A new country** also needs its currency and prices (`plan.ts`), a spelling and number layer (`src/content/locale.ts`), grade wording (`gradeLabel`), its privacy and consent rules on `/privacy/` and in `docs/school/`, and comparison-page facts for its families (prices in its currency, its app store).
   - Anything not done goes in the PR description and under Open items in AGENTS.md.
7. **Run** `npm test`, `npm run lint`, `npx tsc --noEmit`, `npm run build`, and the e2e scripts in AGENTS.md.

Progress is shared across frameworks for shared unit ids, so a child who switches province keeps the progress they earned on units both provinces teach.
