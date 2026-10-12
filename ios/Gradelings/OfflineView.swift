import UIKit

/// Shown only when the very first page can't load: no internet and nothing saved yet. After one
/// visit online, the site's service worker opens the app offline and this never appears.
final class OfflineView: UIView {
    var onRetry: (() -> Void)?

    override init(frame: CGRect) {
        super.init(frame: frame)
        backgroundColor = UIColor(named: "LaunchBackground") ?? .systemBackground

        let logo = UIImageView(image: UIImage(named: "LaunchLogo"))
        logo.contentMode = .scaleAspectFit
        logo.accessibilityIgnoresInvertColors = true
        logo.heightAnchor.constraint(equalToConstant: 120).isActive = true
        logo.widthAnchor.constraint(equalToConstant: 120).isActive = true

        let title = UILabel()
        title.text = "Let's get connected"
        title.font = .preferredFont(forTextStyle: .title1).bold()
        title.adjustsFontForContentSizeCategory = true
        title.textColor = UIColor(red: 0.06, green: 0.09, blue: 0.16, alpha: 1)
        title.textAlignment = .center
        title.numberOfLines = 0
        title.accessibilityTraits = .header

        let body = UILabel()
        body.text = "Connect to Wi-Fi once to download your lessons. After that, they work without the internet."
        body.font = .preferredFont(forTextStyle: .title3)
        body.adjustsFontForContentSizeCategory = true
        body.textColor = UIColor(red: 0.28, green: 0.33, blue: 0.41, alpha: 1)
        body.textAlignment = .center
        body.numberOfLines = 0

        var style = UIButton.Configuration.filled()
        style.title = "Try again"
        style.baseBackgroundColor = UIColor(red: 0.15, green: 0.71, blue: 0.49, alpha: 1)
        style.baseForegroundColor = UIColor(red: 0.06, green: 0.09, blue: 0.16, alpha: 1)
        style.cornerStyle = .large
        style.contentInsets = NSDirectionalEdgeInsets(top: 16, leading: 32, bottom: 16, trailing: 32)
        style.titleTextAttributesTransformer = UIConfigurationTextAttributesTransformer { attrs in
            var a = attrs
            a.font = UIFont.preferredFont(forTextStyle: .title2).bold()
            return a
        }
        let retry = UIButton(configuration: style, primaryAction: UIAction { [weak self] _ in self?.onRetry?() })

        let stack = UIStackView(arrangedSubviews: [logo, title, body, retry])
        stack.axis = .vertical
        stack.alignment = .center
        stack.spacing = 20
        stack.translatesAutoresizingMaskIntoConstraints = false
        addSubview(stack)
        NSLayoutConstraint.activate([
            stack.centerYAnchor.constraint(equalTo: safeAreaLayoutGuide.centerYAnchor),
            stack.leadingAnchor.constraint(greaterThanOrEqualTo: safeAreaLayoutGuide.leadingAnchor, constant: 24),
            stack.trailingAnchor.constraint(lessThanOrEqualTo: safeAreaLayoutGuide.trailingAnchor, constant: -24),
            stack.centerXAnchor.constraint(equalTo: safeAreaLayoutGuide.centerXAnchor),
            stack.widthAnchor.constraint(lessThanOrEqualToConstant: 520),
        ])
    }

    @available(*, unavailable)
    required init?(coder: NSCoder) { fatalError("init(coder:) is not used") }
}

private extension UIFont {
    func bold() -> UIFont {
        guard let descriptor = fontDescriptor.withSymbolicTraits(.traitBold) else { return self }
        return UIFont(descriptor: descriptor, size: 0)
    }
}
