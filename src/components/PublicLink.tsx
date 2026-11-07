import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * `next/link` for the public pages. Next prefetches every link that scrolls into view, and each prefetch is a
 * request to the CDN (the curriculum and guide hubs list hundreds of links, so one visit cost dozens of requests;
 * the project passed 9 million CDN requests in a month, November 2026). With `prefetch={false}` a link is
 * prefetched only when the pointer is over it, so a tap is still quick but a page view costs one request.
 * Pass `prefetch` explicitly to override.
 */
export default function PublicLink({ prefetch, ...props }: ComponentProps<typeof Link>) {
  return <Link {...props} prefetch={prefetch ?? false} />;
}
