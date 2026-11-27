# The sitemap lists only a few US copies of a unit many regions share

2026-11-27, Melvin ("do 2"), after the Search Console page-indexing export: 30,302 URLs "Discovered, currently not indexed" and about 36,000 not indexed in all, against 16,900 indexed. About 5,200 distinct units were being published as 35,000 unit pages, because one math unit is on the page of every state.

**What changed:** `allCurriculumPaths` (`src/components/site/curriculum.ts`) lists a unit shared by `SHARED_UNIT_MIN` (10) or more regions for every Canadian province and for only the first `SHARED_UNIT_US_COPIES` (4) US states that carry it, in registry order. The curriculum sitemap went from 38,734 to 17,545 URLs.

**What did not change:** every state's page still exists, is linked from its grade and subject pages, canonical to itself and indexable. A unit a region owns, or one shared by fewer than 10 regions, is always listed, and at least one page of every unit is always listed (tested). Nothing is dropped from a framework, so the "never drop pages from a framework" rule is kept.

**Why not canonical links to one state:** Canadian provinces' copies of shared units are the pages that rank today (Ontario, Alberta and BC pages for shared units had about a quarter of the clicks among top pages), and a state's own copy of a shared unit also ranks. A canonical would hand those to another region's page. Revisit after three weeks of Search Console data; if indexed pages stall, a canonical for the US copies is the next step.
