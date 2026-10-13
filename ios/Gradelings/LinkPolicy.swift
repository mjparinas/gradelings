import Foundation

/// Decides where a link opens. The kids' app, the parent area and the account pages stay in the
/// app. Help and legal pages open in an in-app Safari sheet. Nothing opens pricing, checkout or
/// the marketing pages from inside the app, because the App Store doesn't allow pointing to a
/// payment outside Apple (guideline 3.1.1), and children shouldn't wander onto the open web.
enum LinkAction: Equatable {
    /// Load it in the app's web view.
    case stay
    /// Show it in a Safari sheet over the app.
    case safariSheet
    /// Hand it to the system (mail, phone).
    case system
    /// Do nothing.
    case block
}

struct LinkPolicy {
    /// The site's host, for example "gradelings.com".
    let host: String

    /// Paths of the site that are part of the app.
    static let appPaths = ["/play/", "/parents/", "/account/", "/shared/", "/api/"]

    /// Paths of the site a parent may read in a Safari sheet: help, privacy and legal pages.
    static let readingPaths = ["/help/", "/privacy/", "/terms/", "/accessibility/", "/contact/"]

    func action(for url: URL) -> LinkAction {
        switch url.scheme?.lowercased() {
        case "about", "blob", "data":
            return .stay
        case "mailto", "tel":
            return .system
        case "http", "https":
            break
        default:
            return .block
        }
        guard let urlHost = url.host?.lowercased() else { return .block }
        let ours = urlHost == host.lowercased() || urlHost == "www." + host.lowercased()
        // Outside sites (a voice credit, a curriculum source) open in a Safari sheet the parent can close.
        guard ours else { return .safariSheet }
        let path = url.path.isEmpty ? "/" : (url.path.hasSuffix("/") ? url.path : url.path + "/")
        if Self.appPaths.contains(where: { path.hasPrefix($0) }) { return .stay }
        if Self.readingPaths.contains(where: { path.hasPrefix($0) }) { return .safariSheet }
        // The home page, pricing, guides and anything else on the site: these carry prices and
        // sign-up buttons, so they're not opened from the app.
        return .block
    }
}
