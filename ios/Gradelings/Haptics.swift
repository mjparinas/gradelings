import UIKit

enum NativeHaptics {
  static func play(_ kind: String) {
    switch kind {
    case "correct":
      UINotificationFeedbackGenerator().notificationOccurred(.success)
    case "tryAgain":
      UINotificationFeedbackGenerator().notificationOccurred(.warning)
    case "pop":
      UIImpactFeedbackGenerator(style: .light).impactOccurred()
    default:
      UIImpactFeedbackGenerator(style: .soft).impactOccurred()
    }
  }
}
