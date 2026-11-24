import SwiftUI
import WebKit

@MainActor
final class WebModel: ObservableObject {
  @Published var showOffline = false
  @Published var offlineMessage = "Check your connection and try again."
  fileprivate weak var webView: WKWebView?
  private(set) var startURL: URL

  init() {
    let raw = Bundle.main.object(forInfoDictionaryKey: "SITE_URL") as? String ?? "https://gradelings.com"
    let base = raw.hasSuffix("/") ? String(raw.dropLast()) : raw
    startURL = URL(string: "\(base)/play/?app=ios")!
  }

  func retry() {
    showOffline = false
    webView?.load(URLRequest(url: startURL))
  }

  func attach(_ webView: WKWebView) {
    self.webView = webView
  }

  func failed(_ message: String) {
    offlineMessage = message
    showOffline = true
  }
}

struct WebContainer: UIViewRepresentable {
  @ObservedObject var model: WebModel

  func makeCoordinator() -> Coordinator {
    Coordinator(model: model)
  }

  func makeUIView(context: Context) -> WKWebView {
    let config = WKWebViewConfiguration()
    config.allowsInlineMediaPlayback = true
    config.mediaTypesRequiringUserActionForPlayback = []
    // Keep localStorage / IndexedDB so offline progress survives restarts.
    config.websiteDataStore = .default()

    let bridge = Bridge()
    config.userContentController.add(bridge, name: "gradelings")
    // Tell the page immediately that it is inside the App Store shell (in addition to ?app=ios).
    let boot = WKUserScript(
      source: "window.__gradelingsIOS=true;",
      injectionTime: .atDocumentStart,
      forMainFrameOnly: true
    )
    config.userContentController.addUserScript(boot)

    let webView = WKWebView(frame: .zero, configuration: config)
    webView.navigationDelegate = context.coordinator
    webView.uiDelegate = context.coordinator
    webView.scrollView.contentInsetAdjustmentBehavior = .never
    webView.isOpaque = false
    webView.backgroundColor = UIColor(red: 1, green: 250 / 255, blue: 241 / 255, alpha: 1)
    bridge.webView = webView
    context.coordinator.bridge = bridge
    model.attach(webView)
    webView.load(URLRequest(url: model.startURL))
    return webView
  }

  func updateUIView(_ uiView: WKWebView, context: Context) {}

  final class Coordinator: NSObject, WKNavigationDelegate, WKUIDelegate {
    let model: WebModel
    var bridge: Bridge?

    init(model: WebModel) {
      self.model = model
    }

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
      model.failed(friendly(error))
    }

    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
      model.failed(friendly(error))
    }

    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
      guard let url = navigationAction.request.url else {
        decisionHandler(.allow)
        return
      }
      // Keep first-party navigations in the WebView; open everything else in Safari so the reviewer can get back.
      if isOwnHost(url) || url.scheme == "about" || url.scheme == "blob" {
        decisionHandler(.allow)
        return
      }
      UIApplication.shared.open(url)
      decisionHandler(.cancel)
    }

    private func isOwnHost(_ url: URL) -> Bool {
      guard let host = url.host, let own = model.startURL.host else { return false }
      return host == own || host.hasSuffix(".\(own)")
    }

    private func friendly(_ error: Error) -> String {
      let ns = error as NSError
      if ns.domain == NSURLErrorDomain {
        return "You're offline. Connect once, then you can keep practising."
      }
      return "Check your connection and try again."
    }
  }
}
