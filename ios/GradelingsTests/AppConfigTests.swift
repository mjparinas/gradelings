@testable import Gradelings
import XCTest

final class AppConfigTests: XCTestCase {
    func testOpensTheKidsAppWithTheIosFlag() {
        let config = AppConfig.fromBundle(Bundle(for: WebViewController.self))
        XCTAssertEqual(config.startPath, "/play/?app=ios")
        // URL.path drops the trailing slash, so compare the whole URL.
        XCTAssertTrue(config.startURL.absoluteString.hasSuffix("/play/?app=ios"))
        XCTAssertFalse(config.host.isEmpty)
    }

    func testAppBoundDomainMatchesTheSite() {
        let info = Bundle(for: WebViewController.self).infoDictionary ?? [:]
        let config = AppConfig.from(info: info)
        let bound = info["WKAppBoundDomains"] as? [String] ?? []
        XCTAssertEqual(bound, [config.host], "the service worker only runs on app-bound domains")
    }

    func testFallsBackToTheProductionSite() {
        let config = AppConfig.from(info: ["GradelingsOrigin": "not a url"])
        XCTAssertEqual(config.host, "gradelings.com")
        XCTAssertEqual(AppConfig.from(info: ["GradelingsOrigin": "http://localhost:3000"]).startURL.absoluteString, "http://localhost:3000/play/?app=ios")
    }

    func testSupportsEveryOrientationOnIpad() throws {
        // The file as built: at runtime iOS folds the ~ipad keys into the plain ones on an iPad.
        let url = try XCTUnwrap(Bundle(for: WebViewController.self).url(forResource: "Info", withExtension: "plist"))
        let info = try XCTUnwrap(PropertyListSerialization.propertyList(from: Data(contentsOf: url), format: nil) as? [String: Any])
        XCTAssertEqual((info["UISupportedInterfaceOrientations~ipad"] as? [String])?.count, 4)
        XCTAssertEqual(info["UIRequiresFullScreen"] as? Bool, false, "Split View and Stage Manager")
    }
}
