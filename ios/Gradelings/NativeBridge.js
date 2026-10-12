// Injected into every page of the app before the page's own scripts (WebViewController.swift).
// It fills in three web features WKWebView leaves out on iPhone and iPad, so the web app's own
// code works unchanged: navigator.share (the share sheet), navigator.vibrate (taps through the
// Taptic Engine) and window.print (AirPrint and Save to PDF).
(function () {
  var native = window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.gradelings;
  if (!native) return;
  var pending = {};
  var next = 1;

  // Swift calls this when the share sheet closes.
  window.__gradelingsShareDone = function (id, ok) {
    var p = pending[id];
    if (!p) return;
    delete pending[id];
    if (ok) p.resolve();
    else p.reject(new DOMException("Share canceled", "AbortError"));
  };

  if (typeof navigator.share !== "function") {
    navigator.share = function (data) {
      data = data || {};
      return new Promise(function (resolve, reject) {
        var id = next++;
        pending[id] = { resolve: resolve, reject: reject };
        native.postMessage({ type: "share", id: id, title: String(data.title || ""), text: String(data.text || ""), url: String(data.url || "") });
      });
    };
    navigator.canShare = function (data) {
      return Boolean(data && (data.title || data.text || data.url));
    };
  }

  if (typeof navigator.vibrate !== "function") {
    navigator.vibrate = function (pattern) {
      var list = Array.isArray(pattern) ? pattern : [pattern];
      native.postMessage({ type: "vibrate", pattern: list.map(function (n) { return Number(n) || 0; }).slice(0, 10) });
      return true;
    };
  }

  window.print = function () {
    native.postMessage({ type: "print" });
  };
})();
