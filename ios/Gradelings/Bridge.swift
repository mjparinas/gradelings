import WebKit

/// JS → native channel. The web app posts `{ id, method, args }`; we reply with
/// `window.__gradelingsNativeReply(id, resultJson, errorString)`.
final class Bridge: NSObject, WKScriptMessageHandler {
  weak var webView: WKWebView?

  func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
    guard
      let body = message.body as? [String: Any],
      let id = body["id"] as? Int,
      let method = body["method"] as? String
    else { return }
    let args = body["args"] as? [String: Any] ?? [:]
    Task { @MainActor in
      do {
        let result = try await handle(method: method, args: args)
        reply(id: id, result: result, error: nil)
      } catch {
        reply(id: id, result: nil, error: error.localizedDescription)
      }
    }
  }

  private func handle(method: String, args: [String: Any]) async throws -> Any? {
    switch method {
    case "purchase":
      guard let productId = args["productId"] as? String else { throw StoreError.productMissing }
      let purchase = try await Store.purchase(productId: productId)
      return encode(purchase)
    case "restore":
      let purchases = try await Store.restore()
      return purchases.map { encode($0) }
    case "manageSubscriptions":
      try await Store.manageSubscriptions()
      return true
    case "haptic":
      NativeHaptics.play(args["kind"] as? String ?? "tap")
      return true
    case "unlockParent":
      return await Biometrics.unlock()
    default:
      throw StoreError.failed
    }
  }

  private func encode<T: Encodable>(_ value: T) -> [String: Any] {
    let data = (try? JSONEncoder().encode(value)) ?? Data()
    return (try? JSONSerialization.jsonObject(with: data) as? [String: Any]) ?? [:]
  }

  private func reply(id: Int, result: Any?, error: String?) {
    guard let webView else { return }
    let resultJson: String
    if let result {
      if let data = try? JSONSerialization.data(withJSONObject: result),
         let s = String(data: data, encoding: .utf8) {
        resultJson = s
      } else if result is Bool || result is NSNumber {
        resultJson = "\(result)"
      } else {
        resultJson = "null"
      }
    } else {
      resultJson = "null"
    }
    let errLiteral: String
    if let error {
      let escaped = error
        .replacingOccurrences(of: "\\", with: "\\\\")
        .replacingOccurrences(of: "'", with: "\\'")
        .replacingOccurrences(of: "\n", with: "\\n")
      errLiteral = "'\(escaped)'"
    } else {
      errLiteral = "null"
    }
    let js = "window.__gradelingsNativeReply && window.__gradelingsNativeReply(\(id), \(resultJson), \(errLiteral));"
    webView.evaluateJavaScript(js, completionHandler: nil)
  }
}
