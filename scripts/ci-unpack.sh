#!/usr/bin/env bash
# Unpacks the Build job's next-build.tar.zst (zstd with a 128 MB window, --long=27) into the
# working folder. The Playwright container image has no zstd program, so there Node's own zstd
# (Node 22.15 and later) does the work.
#
#   scripts/ci-unpack.sh next-build.tar.zst
set -euo pipefail
ARCHIVE="${1:-next-build.tar.zst}"
if command -v zstd >/dev/null; then
  zstd -d -q -c --long=27 "$ARCHIVE" | tar -xf -
else
  node --no-warnings -e '
    const zlib = require("node:zlib");
    const unzstd = zlib.createZstdDecompress({ params: { [zlib.constants.ZSTD_d_windowLogMax]: 27 } });
    require("node:stream").pipeline(require("node:fs").createReadStream(process.argv[1]), unzstd, process.stdout, (e) => e && (console.error(e), process.exit(1)));
  ' "$ARCHIVE" | tar -xf -
fi
rm -f "$ARCHIVE"
