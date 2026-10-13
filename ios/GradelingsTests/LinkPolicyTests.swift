@testable import Gradelings
import XCTest

final class LinkPolicyTests: XCTestCase {
    private let policy = LinkPolicy(host: "gradelings.com")

    private func action(_ s: String) -> LinkAction { policy.action(for: URL(string: s)!) }

    func testKeepsTheKidsAppAndParentAreaInTheApp() {
        XCTAssertEqual(action("https://gradelings.com/play/?app=ios"), .stay)
        XCTAssertEqual(action("https://gradelings.com/play/#/session?mode=daily"), .stay)
        XCTAssertEqual(action("https://gradelings.com/parents/#/reports"), .stay)
        XCTAssertEqual(action("https://www.gradelings.com/parents/"), .stay)
        XCTAssertEqual(action("https://gradelings.com/play"), .stay)
        XCTAssertEqual(action("https://gradelings.com/account/verify/?token=abc"), .stay)
        XCTAssertEqual(action("https://gradelings.com/shared/abc123/"), .stay)
        XCTAssertEqual(action("blob:https://gradelings.com/1234"), .stay)
        XCTAssertEqual(action("about:blank"), .stay)
    }

    func testNeverOpensPricingOrTheMarketingPages() {
        XCTAssertEqual(action("https://gradelings.com/"), .block)
        XCTAssertEqual(action("https://gradelings.com/pricing/"), .block)
        XCTAssertEqual(action("https://gradelings.com/guides/bc/"), .block)
        XCTAssertEqual(action("https://gradelings.com/playground/"), .block)
        XCTAssertEqual(action("javascript:alert(1)"), .block)
    }

    func testOpensHelpAndLegalPagesAndOtherSitesInASafariSheet() {
        XCTAssertEqual(action("https://gradelings.com/privacy/"), .safariSheet)
        XCTAssertEqual(action("https://gradelings.com/terms/"), .safariSheet)
        XCTAssertEqual(action("https://gradelings.com/help/"), .safariSheet)
        XCTAssertEqual(action("https://curriculum.gov.bc.ca/"), .safariSheet)
        XCTAssertEqual(action("https://checkout.stripe.com/c/pay/abc"), .safariSheet)
    }

    func testHandsMailAndPhoneLinksToTheSystem() {
        XCTAssertEqual(action("mailto:hello@gradelings.com"), .system)
        XCTAssertEqual(action("tel:+15555550100"), .system)
    }
}
