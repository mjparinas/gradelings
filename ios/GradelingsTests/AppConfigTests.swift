@testable import Gradelings
import XCTest

final class AppConfigTests: XCTestCase {
    func testOpensTheKidsAppWithTheIosFlag() {
        let config = AppConfig.fromBundle(Bundle(for: WebViewController.self))
        XCTAssertEqual(config.startPath, "/play/?app=ios")
        XCTAssertEqual(config.startURL.path, "/play/")
        XCTAssertEqual(config.startURL.query, "app=ios")
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

    func testSupportsEveryOrientationOnIpad() {
        let info = Bundle(for: WebViewController.self).infoDictionary ?? [:]
        XCTAssertEqual((info["UISupportedInterfaceOrientations~ipad"] as? [String])?.count, 4)
        XCTAssertEqual(info["UIRequiresFullScreen"] as? Bool, false, "Split View and Stage Manager")
    }
}
