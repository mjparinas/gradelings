import UIKit

/// Plays a Web Vibration API pattern (vibrate, pause, vibrate, ... in milliseconds) as taps.
/// The web app keeps its patterns short and gentle (src/lib/haptics.ts) and checks the child's
/// settings and reduced motion before it asks.
enum Haptics {
    /// When each tap starts and how strong it is, from a pattern. Pauses are skipped; zero-length
    /// pulses and anything after the first second are dropped.
    static func taps(for pattern: [Double]) -> [(delay: Double, style: UIImpactFeedbackGenerator.FeedbackStyle)] {
        var at = 0.0
        var out: [(delay: Double, style: UIImpactFeedbackGenerator.FeedbackStyle)] = []
        for (i, ms) in pattern.enumerated() {
            let length = max(0, ms) / 1000
            if i % 2 == 0, length > 0, at <= 1 {
                out.append((delay: at, style: length >= 0.02 ? .medium : .light))
            }
            at += length
        }
        return out
    }

    static func play(_ pattern: [Double]) {
        for tap in taps(for: pattern) {
            DispatchQueue.main.asyncAfter(deadline: .now() + tap.delay) {
                let generator = UIImpactFeedbackGenerator(style: tap.style)
                generator.impactOccurred()
            }
        }
    }
}
