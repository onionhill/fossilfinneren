declare global {
  interface Window {
    plausible?: (event: string, options?: { u?: string }) => void;
  }
}

/**
 * Counts a page view with Plausible on public pages only. Nothing is counted
 * after login, and Plausible sets no cookies.
 */
export function countPageView(path: string, loggedIn: boolean): void {
  if (loggedIn) return;
  window.plausible?.("pageview", { u: `https://fossilfinneren.no${path}` });
}
