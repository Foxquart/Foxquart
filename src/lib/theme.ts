/*
 * Theme switching. Both modes live entirely in CSS variables (styles.css): :root
 * is the light palette and .dark on <html> overrides every token, so toggling the
 * class is the whole mode switch. This module owns three things: the pre-paint
 * script that applies the saved choice before first paint (no wrong-theme flash),
 * the runtime setter the toggle button calls, and the browser-chrome meta sync.
 */

export const THEME_KEY = "fq:theme";

export type Theme = "light" | "dark";

/** Browser-chrome grounds, mirrors --background in styles.css for each mode. */
const THEME_COLOR: Record<Theme, string> = {
  light: "#F1F0CC",
  dark: "#170B0D",
};

/*
 * Runs inline in <head> before paint. Storage order: explicit choice wins,
 * otherwise the OS preference. Kept dependency-free and wrapped in try/catch so
 * a storage-denied private tab still paints (light, then the system listener in
 * the toggle never fires because matchMedia still works).
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}if(t==="dark"){document.documentElement.classList.add("dark")}var m=document.querySelector('meta[name="theme-color"]');if(m&&t==="dark"){m.setAttribute("content","${THEME_COLOR.dark}")}var c=document.querySelector('meta[name="color-scheme"]');if(c&&t==="dark"){c.setAttribute("content","dark")}}catch(e){}})();`;

/** Effective theme right now, from the class the init script or toggle applied. */
export function getTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/** Applies a theme, persists the choice, and keeps browser chrome in sync. */
export function setTheme(theme: Theme): void {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Storage unavailable: the class still applies for this page view.
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLOR[theme]);
  document.querySelector('meta[name="color-scheme"]')?.setAttribute("content", theme);
}

export function toggleTheme(): Theme {
  const next: Theme = getTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}
