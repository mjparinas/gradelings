import SafariServices
import UIKit
import WebKit

/// The whole app: one web view showing /play/ and /parents/, plus what iOS needs to make it feel
/// native. The site's service worker keeps lessons working offline (it runs in WKWebView because
/// the site is an app-bound domain, WKAppBoundDomains in Info.plist). The bridge script adds the
/// share sheet, haptics and printing, and file downloads (the parent's data export) open the
/// share sheet so they can be saved to Files.
final class WebViewController: UIViewController {
    /// Added to the user agent; `IOS_APP_AGENT` in src/lib/twa.ts reads it to hide purchases.
    static let agentName = "GradelingsApp-iOS"

    private let config: AppConfig
    private var webView: WKWebView!
    private let offlineView = OfflineView()
    private var hasLoadedPage = false
    private var downloads: [ObjectIdentifier: URL] = [:]

    init(config: AppConfig) {
        self.config = config
        super.init(nibName: nil, bundle: nil)
    }

    @available(*, unavailable)
    required init?(coder: NSCoder) { fatalError("init(coder:) is not used") }

    override func loadView() {
        let background = UIColor(named: "LaunchBackground") ?? .systemBackground
        let root = UIView()
        root.backgroundColor = background

        let configuration = WKWebViewConfiguration()
        configuration.limitsNavigationsToAppBoundDomains = true
        configuration.allowsInlineMediaPlayback = true
        configuration.mediaTypesRequiringUserActionForPlayback = []
        let version = Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String ?? "1"
        configuration.applicationNameForUserAgent = "Mobile/15E148 \(Self.agentName)/\(version)"
        let controller = WKUserContentController()
        if let url = Bundle.main.url(forResource: "NativeBridge", withExtension: "js"),
           let source = try? String(contentsOf: url, encoding: .utf8) {
            controller.addUserScript(WKUserScript(source: source, injectionTime: .atDocumentStart, forMainFrameOnly: true))
        }
        controller.add(WeakMessageHandler(self), name: "gradelings")
        configuration.userContentController = controller

        webView = WKWebView(frame: .zero, configuration: configuration)
        webView.navigationDelegate = self
        webView.uiDelegate = self
        webView.isOpaque = false
        webView.backgroundColor = background
        webView.scrollView.backgroundColor = background
        // The pages place their own bars with env(safe-area-inset-bottom).
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.allowsBackForwardNavigationGestures = true
        webView.allowsLinkPreview = false
        #if DEBUG
        if #available(iOS 16.4, *) { webView.isInspectable = true }
        #endif

        webView.translatesAutoresizingMaskIntoConstraints = false
        offlineView.translatesAutoresizingMaskIntoConstraints = false
        offlineView.isHidden = true
        offlineView.onRetry = { [weak self] in self?.loadStart() }
        root.addSubview(webView)
        root.addSubview(offlineView)
        // The status bar, the notch and the rounded corners on the sides stay clear; the page runs
        // to the bottom edge and pads its own bars above the home indicator.
        let safe = root.safeAreaLayoutGuide
        NSLayoutConstraint.activate([
            webView.topAnchor.constraint(equalTo: safe.topAnchor),
            webView.leadingAnchor.constraint(equalTo: safe.leadingAnchor),
            webView.trailingAnchor.constraint(equalTo: safe.trailingAnchor),
            webView.bottomAnchor.constraint(equalTo: root.bottomAnchor),
            offlineView.topAnchor.constraint(equalTo: root.topAnchor),
            offlineView.leadingAnchor.constraint(equalTo: root.leadingAnchor),
            offlineView.trailingAnchor.constraint(equalTo: root.trailingAnchor),
            offlineView.bottomAnchor.constraint(equalTo: root.bottomAnchor),
        ])
        view = root
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        loadStart()
    }

    override var preferredStatusBarStyle: UIStatusBarStyle { .darkContent }

    private func loadStart() {
        offlineView.isHidden = true
        // The service worker answers from its cache when there's no network, so this works offline
        // after the first visit.
        webView.load(URLRequest(url: config.startURL))
    }

    private func open(_ url: URL, as action: LinkAction) {
        switch action {
        case .stay:
            webView.load(URLRequest(url: url))
        case .safariSheet:
            let safari = SFSafariViewController(url: url)
            safari.dismissButtonStyle = .close
            present(safari, animated: true)
        case .system:
            UIApplication.shared.open(url)
        case .block:
            break
        }
    }

    /// Presents a share sheet; on iPad it points at the middle of the screen.
    private func share(_ items: [Any], completion: ((Bool) -> Void)? = nil) {
        let sheet = UIActivityViewController(activityItems: items, applicationActivities: nil)
        sheet.completionWithItemsHandler = { _, completed, _, _ in completion?(completed) }
        if let popover = sheet.popoverPresentationController {
            popover.sourceView = view
            popover.sourceRect = CGRect(x: view.bounds.midX, y: view.bounds.midY, width: 0, height: 0)
            popover.permittedArrowDirections = []
        }
        present(sheet, animated: true)
    }

    private func printPage() {
        let printer = UIPrintInteractionController.shared
        let info = UIPrintInfo(dictionary: nil)
        info.outputType = .general
        info.jobName = webView.title ?? "Gradelings"
        printer.printInfo = info
        printer.printFormatter = webView.viewPrintFormatter()
        if traitCollection.horizontalSizeClass == .regular {
            _ = printer.present(from: CGRect(x: view.bounds.midX, y: view.bounds.midY, width: 0, height: 0), in: view, animated: true)
        } else {
            _ = printer.present(animated: true)
        }
    }

    private func showOffline(for error: Error) {
        let code = (error as NSError).code
        let offline: Set<Int> = [NSURLErrorNotConnectedToInternet, NSURLErrorNetworkConnectionLost, NSURLErrorTimedOut, NSURLErrorCannotFindHost, NSURLErrorCannotConnectToHost, NSURLErrorDataNotAllowed]
        guard (error as NSError).domain == NSURLErrorDomain, offline.contains(code), !hasLoadedPage else { return }
        offlineView.isHidden = false
    }
}

// MARK: - Messages from NativeBridge.js

extension WebViewController: WKScriptMessageHandler {
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard message.frameInfo.isMainFrame,
              let body = message.body as? [String: Any],
              let type = body["type"] as? String else { return }
        switch type {
        case "share":
            let id = (body["id"] as? Int) ?? 0
            let text = (body["text"] as? String) ?? ""
            var items: [Any] = []
            if !text.isEmpty { items.append(text) }
            if let raw = body["url"] as? String, let url = URL(string: raw), url.scheme != nil { items.append(url) }
            guard !items.isEmpty else {
                webView.evaluateJavaScript("window.__gradelingsShareDone(\(id), false)", completionHandler: nil)
                return
            }
            share(items) { [weak self] done in
                self?.webView.evaluateJavaScript("window.__gradelingsShareDone(\(id), \(done ? "true" : "false"))", completionHandler: nil)
            }
        case "vibrate":
            Haptics.play((body["pattern"] as? [NSNumber])?.map(\.doubleValue) ?? [])
        case "print":
            printPage()
        default:
            break
        }
    }
}

// MARK: - Navigation

extension WebViewController: WKNavigationDelegate {
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, preferences: WKWebpagePreferences, decisionHandler: @escaping (WKNavigationActionPolicy, WKWebpagePreferences) -> Void) {
        if navigationAction.shouldPerformDownload {
            decisionHandler(.download, preferences)
            return
        }
        guard let url = navigationAction.request.url else {
            decisionHandler(.cancel, preferences)
            return
        }
        // Frames inside a page (none today) follow the page.
        if navigationAction.targetFrame?.isMainFrame == false {
            decisionHandler(.allow, preferences)
            return
        }
        let action = config.linkPolicy.action(for: url)
        if action == .stay {
            decisionHandler(.allow, preferences)
        } else {
            decisionHandler(.cancel, preferences)
            open(url, as: action)
        }
    }

    func webView(_ webView: WKWebView, decidePolicyFor navigationResponse: WKNavigationResponse, decisionHandler: @escaping (WKNavigationResponsePolicy) -> Void) {
        decisionHandler(navigationResponse.canShowMIMEType ? .allow : .download)
    }

    func webView(_ webView: WKWebView, navigationAction: WKNavigationAction, didBecome download: WKDownload) {
        download.delegate = self
    }

    func webView(_ webView: WKWebView, navigationResponse: WKNavigationResponse, didBecome download: WKDownload) {
        download.delegate = self
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        hasLoadedPage = true
        offlineView.isHidden = true
    }

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        showOffline(for: error)
    }

    func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
        // iOS can stop the page's process when memory runs low; start it again where it was.
        if webView.url != nil { webView.reload() } else { loadStart() }
    }
}

// MARK: - Downloads (the parent's data export)

extension WebViewController: WKDownloadDelegate {
    func download(_ download: WKDownload, decideDestinationUsing response: URLResponse, suggestedFilename: String, completionHandler: @escaping (URL?) -> Void) {
        let folder = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString, isDirectory: true)
        try? FileManager.default.createDirectory(at: folder, withIntermediateDirectories: true)
        let name = suggestedFilename.isEmpty ? "download" : suggestedFilename
        let file = folder.appendingPathComponent(name)
        downloads[ObjectIdentifier(download)] = file
        completionHandler(file)
    }

    func downloadDidFinish(_ download: WKDownload) {
        guard let file = downloads.removeValue(forKey: ObjectIdentifier(download)) else { return }
        share([file])
    }

    func download(_ download: WKDownload, didFailWithError error: Error, resumeData: Data?) {
        downloads.removeValue(forKey: ObjectIdentifier(download))
    }
}

// MARK: - Dialogs and new windows

extension WebViewController: WKUIDelegate {
    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        // target="_blank" links: no second window, the same rules as any other link.
        if let url = navigationAction.request.url { open(url, as: config.linkPolicy.action(for: url)) }
        return nil
    }

    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping () -> Void) {
        let alert = UIAlertController(title: nil, message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default) { _ in completionHandler() })
        presentOrSkip(alert) { completionHandler() }
    }

    func webView(_ webView: WKWebView, runJavaScriptConfirmPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (Bool) -> Void) {
        let alert = UIAlertController(title: nil, message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "Cancel", style: .cancel) { _ in completionHandler(false) })
        alert.addAction(UIAlertAction(title: "OK", style: .default) { _ in completionHandler(true) })
        presentOrSkip(alert) { completionHandler(false) }
    }

    func webView(_ webView: WKWebView, runJavaScriptTextInputPanelWithPrompt prompt: String, defaultText: String?, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (String?) -> Void) {
        let alert = UIAlertController(title: nil, message: prompt, preferredStyle: .alert)
        alert.addTextField { $0.text = defaultText }
        alert.addAction(UIAlertAction(title: "Cancel", style: .cancel) { _ in completionHandler(nil) })
        alert.addAction(UIAlertAction(title: "OK", style: .default) { [weak alert] _ in completionHandler(alert?.textFields?.first?.text) })
        presentOrSkip(alert) { completionHandler(nil) }
    }

    /// WebKit requires every dialog's handler to be called exactly once, even when something else is on screen.
    private func presentOrSkip(_ alert: UIAlertController, skipped: () -> Void) {
        guard presentedViewController == nil, viewIfLoaded?.window != nil else { return skipped() }
        present(alert, animated: true)
    }
}

/// Holds the controller weakly, because WKUserContentController keeps its handlers alive.
private final class WeakMessageHandler: NSObject, WKScriptMessageHandler {
    weak var target: WKScriptMessageHandler?
    init(_ target: WKScriptMessageHandler) { self.target = target }
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        target?.userContentController(userContentController, didReceive: message)
    }
}
