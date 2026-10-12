import Foundation

/// Where the app points, read from Info.plist (set from APP_ORIGIN and APP_DOMAIN in project.yml).
struct AppConfig: Equatable {
    let origin: URL
    let startPath: String

    var host: String { origin.host ?? "" }
    var startURL: URL { URL(string: startPath, relativeTo: origin)!.absoluteURL }
    var linkPolicy: LinkPolicy { LinkPolicy(host: host) }

    static let fallbackOrigin = URL(string: "https://gradelings.com")!

    static func fromBundle(_ bundle: Bundle = .main) -> AppConfig {
        from(info: bundle.infoDictionary ?? [:])
    }

    static func from(info: [String: Any]) -> AppConfig {
        let raw = (info["GradelingsOrigin"] as? String) ?? ""
        let origin = URL(string: raw).flatMap { $0.host == nil ? nil : $0 } ?? fallbackOrigin
        let path = (info["GradelingsStartPath"] as? String) ?? "/play/?app=ios"
        return AppConfig(origin: origin, startPath: path)
    }
}
