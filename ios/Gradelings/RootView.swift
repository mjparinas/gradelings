import SwiftUI

/// Hosts the WebView and a native offline/error screen. The web app is the product;
/// this shell only exists for App Store rules and device features Safari cannot offer.
struct RootView: View {
  @StateObject private var model = WebModel()

  var body: some View {
    ZStack {
      Color(red: 1, green: 250 / 255, blue: 241 / 255).ignoresSafeArea()
      WebContainer(model: model)
        .ignoresSafeArea()
      if model.showOffline {
        OfflineView(message: model.offlineMessage) {
          model.retry()
        }
      }
    }
  }
}
