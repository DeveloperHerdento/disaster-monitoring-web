import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DARK_FIRST, type Platform } from "../../lib/platform";
import {
  THEME_STORAGE_KEY,
  ThemeContext,
  type ResolvedTheme,
  type ThemePreference,
} from "./theme-context";

const QUERY = "(prefers-color-scheme: dark)";

function readStored(key: string): ThemePreference | null {
  try {
    const v = localStorage.getItem(key);
    return v === "light" || v === "dark" || v === "system" ? v : null;
  } catch {
    return null; // private mode / blocked storage
  }
}

function systemTheme(): ResolvedTheme {
  return typeof window !== "undefined" && window.matchMedia(QUERY).matches
    ? "dark"
    : "light";
}

export interface ThemeProviderProps {
  children: ReactNode;
  /** Sets <html data-platform>, which drives the signal, ink and tile colours. May change at runtime (e.g. Aero ↔ Disaster). */
  platform?: Platform;
  /** Default when the user has not chosen. Defaults to "dark" for ops platforms, else "system". */
  defaultTheme?: ThemePreference;
  storageKey?: string;
}

/** Writes data-theme (always the RESOLVED value) and data-platform on <html>. */
export function ThemeProvider({
  children,
  platform,
  defaultTheme,
  storageKey = THEME_STORAGE_KEY,
}: ThemeProviderProps) {
  const fallback: ThemePreference =
    defaultTheme ??
    (platform && DARK_FIRST.includes(platform) ? "dark" : "system");
  const [theme, setThemeState] = useState<ThemePreference>(
    () => readStored(storageKey) ?? fallback,
  );
  const [system, setSystem] = useState<ResolvedTheme>(systemTheme);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setSystem(mq.matches ? "dark" : "light");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const resolved: ResolvedTheme = theme === "system" ? system : theme;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", resolved);
  }, [resolved]);

  useEffect(() => {
    if (!platform) return;
    document.documentElement.setAttribute("data-platform", platform);
  }, [platform]);

  const setTheme = useCallback(
    (next: ThemePreference) => {
      setThemeState(next);
      try {
        localStorage.setItem(storageKey, next);
      } catch {
        /* storage unavailable: preference lasts for this session only */
      }
    },
    [storageKey],
  );

  const value = useMemo(
    () => ({ theme, resolved, setTheme }),
    [theme, resolved, setTheme],
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
