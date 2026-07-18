import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

/**
 * Theme state, sourced from the `data-theme` the pre-paint script in
 * index.html already set. Toggling updates <html>, persists the choice,
 * and keeps the browser-chrome theme-color in sync.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === "light" ? "light" : "dark",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* private mode: preference just won't persist */
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#f5f7f3" : "#07080a");
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggle };
}
