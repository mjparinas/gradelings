# Contact page structured data (2026-11-20)

Follow-up to the hub page SEO pass (`2026-11-20-seo-hub-titles-and-structured-data.md`). The Contact page had the bare
title "Contact us" and no structured data. It now has a descriptive title (with shorter fallbacks for `fitTitle`), a
description naming the support address and `REPLY_TIME`, `BreadcrumbList`, and a `ContactPage` whose main entity is the
site's Organization (same `@id` as the home page) with a customer-support `ContactPoint`. Only facts the page states:
the email, English, no phone and no opening hours. `contactJsonLd` is in `src/components/site/jsonld.ts`.
