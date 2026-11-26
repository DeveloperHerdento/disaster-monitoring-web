import { useState, type ComponentProps, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { FieldShell } from "./FieldShell";
import { fieldBox, fieldInput } from "./field-styles";

export interface TextAreaProps extends ComponentProps<"textarea"> {
  label: string;
  hideLabel?: boolean;
  hint?: ReactNode;
  error?: ReactNode;
  optional?: boolean;
}

export function TextArea({
  id,
  label,
  hideLabel,
  hint,
  error,
  optional,
  disabled,
  maxLength,
  value,
  defaultValue,
  onChange,
  rows = 3,
  className,
  ...rest
}: TextAreaProps) {
  const [typed, setTyped] = useState(String(defaultValue ?? "").length);
  const count = typeof value === "string" ? value.length : typed;
  const tone = error ? "error" : undefined;
  return (
    <FieldShell
      id={id}
      label={label}
      hideLabel={hideLabel}
      optional={optional}
      message={error ?? hint}
      tone={tone}
      className={className}
    >
      {({ id, describedBy }) => (
        <div
          className={cn(
            fieldBox(tone, disabled),
            "flex-col items-stretch gap-1.5 py-3",
          )}
        >
          <textarea
            id={id}
            aria-describedby={describedBy}
            aria-invalid={error ? true : undefined}
            disabled={disabled}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            rows={rows}
            onChange={(e) => {
              setTyped(e.target.value.length);
              onChange?.(e);
            }}
            className={cn(fieldInput, "resize-none")}
            {...rest}
          />
          {maxLength !== undefined && (
            <span className="self-end text-footnote text-label-tertiary tabular-nums">
              {count} / {maxLength}
            </span>
          )}
        </div>
      )}
    </FieldShell>
  );
}
