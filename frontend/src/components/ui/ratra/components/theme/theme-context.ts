import { createContext, useContext } from "react";

export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export interface ThemeContextValue {
  /** What the user chose. */
  theme: ThemePreference;
  /** What is on screen now (system resolved through prefers-color-scheme). */
  resolved: ResolvedTheme;
  setTheme: (theme: ThemePreference) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}

export const THEME_STORAGE_KEY = "ratra-theme";

/**
 * Inline this in index.html <head> (before CSS) to avoid a light flash on dark-first apps:
 *   <script>/* paste themeInitScript("dark") output *\/</script>
 * Kept as a string generator so apps without a build step for index.html can copy the output.
 */
export function themeInitScript(
  defaultTheme: ThemePreference,
  storageKey = THEME_STORAGE_KEY,
): string {
  return `(function(){try{var p=localStorage.getItem(${JSON.stringify(storageKey)})||${JSON.stringify(defaultTheme)};var d=p==="dark"||(p==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.setAttribute("data-theme",d?"dark":"light")}catch(e){}})();`;
}
