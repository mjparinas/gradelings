# Hub page titles and structured data (2026-11-20)

Melvin asked for a pass over the site's SEO. A live audit of gradelings.com found the technical basics sound
(canonicals, sitemap index, robots, Open Graph, article/FAQ/LearningResource data on deep pages). The gaps were on
hub pages:

- Titles for Pricing, Parent guides, Report cards, About and What's new were a bare label. They now say what the page
  gives (pricing reads `TRIAL_DAYS` and `PRICES` from `plan.ts`, never typed), with shorter fallbacks for `fitTitle`.
- Hubs with no structured data now carry `BreadcrumbList` plus an `ItemList` of what they link to: Parent guides,
  Report cards, and each framework's curriculum hub (its grades). What's new has breadcrumbs, and each day's post is an
  `Article` with `datePublished` and `dateModified` set to its day.

Left for later: the `/curriculum/` hub is about 490 KB of HTML (every region's grades listed); trimming it is a
separate change.
