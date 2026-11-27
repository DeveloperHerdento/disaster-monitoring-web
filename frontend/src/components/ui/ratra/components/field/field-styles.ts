import { cn } from "../../lib/cn";

export type FieldTone = "error" | "success";

export function fieldBox(
  tone?: FieldTone,
  disabled?: boolean,
  floating = false,
): string {
  return cn(
    "flex items-center gap-2.5 rounded-[14px] px-4 transition-shadow duration-150",
    floating ? "glass-float" : "bg-fill",
    tone === "error" && "bg-danger-fill shadow-[0_0_0_1.5px_var(--danger)]",
    tone === "success" && "shadow-[0_0_0_1.5px_var(--status-normal)]",
    "focus-within:bg-surface focus-within:shadow-[0_0_0_2px_var(--tint),0_0_0_6px_var(--tint-fill)]",
    disabled && "bg-fill-secondary text-label-tertiary",
  );
}

export const fieldInput =
  "min-w-0 flex-1 bg-transparent text-body text-label outline-none placeholder:text-label-tertiary focus-visible:outline-none disabled:cursor-not-allowed disabled:text-label-tertiary";
