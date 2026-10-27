/**
 * A thin bar across the top of the screen from the frame after a tap until the next screen is drawn
 * (`useShownHash`). Screen readers hear nothing: the new screen arriving is the answer.
 */
export function RouteProgress({ pending }: { pending: boolean }) {
  return <div aria-hidden="true" data-pending={pending || undefined} className="route-progress" />;
}
