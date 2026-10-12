@testable import Gradelings
import XCTest

final class HapticsTests: XCTestCase {
    func testTapsOnPulsesAndSkipsPauses() {
        let taps = Haptics.taps(for: [10, 40, 18])
        XCTAssertEqual(taps.count, 2)
        XCTAssertEqual(taps[0].delay, 0, accuracy: 1e-9)
        XCTAssertEqual(taps[1].delay, 0.05, accuracy: 1e-9)
        XCTAssertEqual(taps.map(\.style), [.light, .light])
    }

    func testLongerPulsesAreStronger() {
        XCTAssertEqual(Haptics.taps(for: [28]).map(\.style), [.medium])
    }

    func testIgnoresEmptyAndRunawayPatterns() {
        XCTAssertTrue(Haptics.taps(for: []).isEmpty)
        XCTAssertTrue(Haptics.taps(for: [0]).isEmpty)
        XCTAssertEqual(Haptics.taps(for: [10, 5000, 10]).count, 1)
    }
}
