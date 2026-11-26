import { Moon, Sun } from "lucide-react";
import { IconButton, type IconButtonVariant } from "../icon-button/IconButton";
import { useTheme } from "./theme-context";

export interface ThemeToggleProps {
  labels?: { toLight: string; toDark: string };
  variant?: IconButtonVariant;
}

export function ThemeToggle({
  labels = { toLight: "Mode terang", toDark: "Mode gelap" },
  variant = "gray",
}: ThemeToggleProps) {
  const { resolved, setTheme } = useTheme();
  const toDark = resolved === "light";
  return (
    <IconButton
      icon={toDark ? Moon : Sun}
      label={toDark ? labels.toDark : labels.toLight}
      variant={variant}
      tooltipSide="bottom"
      onClick={() => setTheme(toDark ? "dark" : "light")}
    />
  );
}
