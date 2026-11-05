# Raise the Android version for every Play upload

**Raise the Android version for every Play upload** (owner, November 4, 2026): Play rejects a bundle whose `appVersionCode` has been used before, so any change to `android/twa-manifest.json` or the app's icons that will be uploaded raises `appVersionCode` by 1 (and `appVersionName`) in the same pull request, before the `build` run. Site-only changes need no new app version.
