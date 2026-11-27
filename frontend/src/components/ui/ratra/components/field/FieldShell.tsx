import { useId, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { FieldTone } from "./field-styles";

export interface FieldShellProps {
  id?: string;
  label: string;
  hideLabel?: boolean;
  optional?: boolean;
  optionalLabel?: string;
  message?: ReactNode;
  tone?: FieldTone;
  className?: string;
  children: (ids: { id: string; describedBy?: string }) => ReactNode;
}

export function FieldShell({
  id: givenId,
  label,
  hideLabel = false,
  optional = false,
  optionalLabel = "opsional",
  message,
  tone,
  className,
  children,
}: FieldShellProps) {
  const autoId = useId();
  const id = givenId ?? autoId;
  const messageId = message ? `${id}-message` : undefined;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className={cn(
          "px-1 text-footnote font-semibold text-label-secondary",
          hideLabel && "sr-only",
        )}
      >
        {label}
        {optional && <span className="font-normal"> ({optionalLabel})</span>}
      </label>
      {children({ id, describedBy: messageId })}
      {message && (
        <p
          id={messageId}
          className={cn(
            "px-1 text-footnote",
            tone === "error" && "text-danger",
            tone === "success" && "text-status-normal-fg",
            !tone && "text-label-secondary",
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
}
