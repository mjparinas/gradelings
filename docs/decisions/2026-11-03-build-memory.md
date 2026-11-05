# Build memory

**Build memory** (November 3, 2026): the ~54,000-page production build peaked at 14.2 GB and was OOM-killed on 15 GB machines. Turbopack's build cache (`turbopackFileSystemCacheForBuild`) holds the compile graph in memory; it is off by default now (peak 10.6 GB, cold compile 4.0 min instead of 5.9). `TURBOPACK_BUILD_CACHE=1` turns it back on. The CI step that restores `.next/cache` no longer speeds up compiling. Static generation uses about 5.5 GB across 3 workers.
