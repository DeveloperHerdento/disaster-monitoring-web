import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface ChoiceLabelProps {
  htmlFor: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export function ChoiceLabel({
  htmlFor,
  label,
  description,
  disabled,
}: ChoiceLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "flex min-w-0 flex-1 cursor-pointer flex-col",
        disabled && "cursor-not-allowed text-label-tertiary",
      )}
    >
      <span className="text-body">{label}</span>
      {description && (
        <span
          className={cn(
            "text-footnote",
            disabled ? "text-label-tertiary" : "text-label-secondary",
          )}
        >
          {description}
        </span>
      )}
    </label>
  );
}
