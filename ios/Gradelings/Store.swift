import StoreKit
import UIKit

/// StoreKit 2 purchases for the family plan. Product ids must match App Store Connect and `src/lib/ios.ts`.
enum Store {
  static let monthlyId = "ca.grademap.app.premium.month"
  static let yearlyId = "ca.grademap.app.premium.year"

  struct PurchaseResult: Encodable {
    let productId: String
    let signedTransaction: String
    let originalTransactionId: String
  }

  static func purchase(productId: String) async throws -> PurchaseResult {
    let products = try await Product.products(for: [productId])
    guard let product = products.first else {
      throw StoreError.productMissing
    }
    let result = try await product.purchase()
    switch result {
    case .success(let verification):
      let transaction = try check(verification)
      await transaction.finish()
      return PurchaseResult(
        productId: transaction.productID,
        signedTransaction: verification.jwsRepresentation,
        originalTransactionId: String(transaction.originalID)
      )
    case .userCancelled:
      throw StoreError.cancelled
    case .pending:
      throw StoreError.pending
    @unknown default:
      throw StoreError.failed
    }
  }

  static func restore() async throws -> [PurchaseResult] {
    try await AppStore.sync()
    var out: [PurchaseResult] = []
    for await result in Transaction.currentEntitlements {
      let transaction = try check(result)
      if transaction.productID == monthlyId || transaction.productID == yearlyId {
        out.append(
          PurchaseResult(
            productId: transaction.productID,
            signedTransaction: result.jwsRepresentation,
            originalTransactionId: String(transaction.originalID)
          )
        )
      }
    }
    return out
  }

  @MainActor
  static func manageSubscriptions() async throws {
    guard let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene else {
      throw StoreError.failed
    }
    try await AppStore.showManageSubscriptions(in: scene)
  }

  private static func check<T>(_ result: VerificationResult<T>) throws -> T {
    switch result {
    case .unverified:
      throw StoreError.unverified
    case .verified(let value):
      return value
    }
  }
}

enum StoreError: LocalizedError {
  case productMissing, cancelled, pending, failed, unverified

  var errorDescription: String? {
    switch self {
    case .productMissing: return "That plan isn't available right now."
    case .cancelled: return "Purchase cancelled."
    case .pending: return "Purchase is pending approval."
    case .failed: return "Purchase failed."
    case .unverified: return "Apple could not verify this purchase."
    }
  }
}
