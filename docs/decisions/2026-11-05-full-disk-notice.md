# A full device gets a notice, not a Sentry error

Melvin, November 5, 2026 (after Sentry issues 1J and 1K, one device out of disk space).

When a write to the device fails because there is no room (`QuotaExceededError`, Chrome's "disk full", `FILE_ERROR_NO_SPACE`), the kids' app and the parent area show one dismissible card asking a grown-up to free up space by removing apps, photos or files they don't use (`StorageFullNotice`, `src/lib/storageFull.ts`, reported from `src/lib/localdb.ts`). The app carries on from memory for that visit. The same errors are on the browser's Sentry ignore list (`src/lib/sentry-noise.ts`), because nothing we ship can fix a full disk.
