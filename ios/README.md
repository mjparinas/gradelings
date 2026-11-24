# iOS shell

Thin Swift `WKWebView` wrapper for the App Store. Full guide: [`docs/IOS.md`](../docs/IOS.md).

```bash
brew install xcodegen   # once
cd ios
xcodegen generate
open Gradelings.xcodeproj
```

Set your Development Team in Xcode, then run on a Simulator or device. The WebView loads `SITE_URL/play/?app=ios` (default `https://gradelings.com`).
