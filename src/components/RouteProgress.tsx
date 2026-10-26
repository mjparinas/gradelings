/**
 * A thin bar across the top of the screen while the next screen is being drawn (`useShownHash`). It waits a
 * moment before showing, so screens that open at once never flash it. Screen readers hear nothing: the new
 * screen arriving is the answer.
 */
export function RouteProgress({ pending }: { pending: boolean }) {
  return <div aria-hidden="true" data-pending={pending || undefined} className="route-progress" />;
}
