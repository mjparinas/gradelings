import SwiftUI

struct OfflineView: View {
  let message: String
  let onRetry: () -> Void

  var body: some View {
    VStack(spacing: 20) {
      Text("Something went wrong")
        .font(.system(size: 28, weight: .bold, design: .rounded))
        .foregroundStyle(Color(red: 15 / 255, green: 23 / 255, blue: 42 / 255))
      Text(message)
        .font(.system(size: 17, design: .rounded))
        .multilineTextAlignment(.center)
        .foregroundStyle(Color(red: 15 / 255, green: 23 / 255, blue: 42 / 255).opacity(0.7))
        .padding(.horizontal, 28)
      Button("Try again", action: onRetry)
        .font(.system(size: 18, weight: .bold, design: .rounded))
        .foregroundStyle(Color(red: 15 / 255, green: 23 / 255, blue: 42 / 255))
        .padding(.horizontal, 28)
        .padding(.vertical, 14)
        .background(Color(red: 79 / 255, green: 142 / 255, blue: 247 / 255))
        .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
        .frame(minHeight: 48)
    }
    .frame(maxWidth: .infinity, maxHeight: .infinity)
    .background(Color(red: 1, green: 250 / 255, blue: 241 / 255).ignoresSafeArea())
  }
}
