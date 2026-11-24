import LocalAuthentication

enum Biometrics {
  /// Unlocks the parent area when a PIN is already set. Falls back to the PIN keypad in the web UI on failure.
  static func unlock(reason: String = "Unlock the parent area") async -> Bool {
    let context = LAContext()
    var error: NSError?
    guard context.canEvaluatePolicy(.deviceOwnerAuthentication, error: &error) else {
      return false
    }
    do {
      return try await context.evaluatePolicy(.deviceOwnerAuthentication, localizedReason: reason)
    } catch {
      return false
    }
  }
}
