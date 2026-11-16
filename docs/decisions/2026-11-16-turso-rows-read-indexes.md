# Cut Turso rows read: indexes and fewer scans (Melvin, November 15, 2026)

Turso bills every row a query reads, and the database was reading far more than it returned: unindexed lookups on `child_settings`, `sessions`, `parents` and `families`, a `COUNT(*)` over all of a family's events on every push, a full schema check on every cold start, and admin dashboard scans of `events`.

**What changed:** indexes on `child_settings(family_id)`, `parents(family_id, created_at)`, `sessions(parent_id)`, `sessions(family_id)`, partial indexes on `families(stripe_customer)` and `families(consent_token)`, and `events(t)`. A one-row schema fingerprint lets a cold start skip the setup when nothing changed, and setup runs as one batch. A `family_event_counts` row replaces the per-push count. The admin dashboard answer is cached about two minutes per server instance. Each index has an `EXPLAIN QUERY PLAN` test.

**Why:** lower Turso cost without changing any answer.

**How to apply:** a new query on a table that grows must use an index (checked with `EXPLAIN QUERY PLAN`; no `SCAN ` outside one-off admin work and the daily job), and its index goes into `INDEXES` in the same change. Never put a data fix (UPDATE or DELETE) in the startup schema check, since it runs on every cold start; run one-off fixes once. Cost to know: `events(t)` adds a little work to every event insert on the hottest table.
