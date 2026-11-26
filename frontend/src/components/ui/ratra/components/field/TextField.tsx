import type { ComponentProps, ReactNode } from "react";
import { CircleCheck, type LucideIcon } from "lucide-react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/Icon";
import { FieldShell } from "./FieldShell";
import { fieldBox, fieldInput } from "./field-styles";

export interface TextFieldProps extends ComponentProps<"input"> {
  label: string;
  hideLabel?: boolean;
  hint?: ReactNode;
  error?: ReactNode;
  success?: ReactNode;
  optional?: boolean;
  icon?: LucideIcon;
  unit?: string;
}

export function TextField({
  id,
  label,
  hideLabel,
  hint,
  error,
  success,
  optional,
  icon,
  unit,
  disabled,
  className,
  ...rest
}: TextFieldProps) {
  const tone = error ? "error" : success ? "success" : undefined;
  const numeric =
    rest.type === "number" ||
    rest.inputMode === "decimal" ||
    rest.inputMode === "numeric";
  return (
    <FieldShell
      id={id}
      label={label}
      hideLabel={hideLabel}
      optional={optional}
      message={error ?? success ?? hint}
      tone={tone}
      className={className}
    >
      {({ id, describedBy }) => (
        <div className={cn(fieldBox(tone, disabled), "h-12")}>
          {icon && <Icon icon={icon} className="text-label-tertiary" />}
          <input
            id={id}
            aria-describedby={describedBy}
            aria-invalid={error ? true : undefined}
            disabled={disabled}
            className={cn(fieldInput, numeric && "tabular-nums")}
            {...rest}
          />
          {unit && (
            <span className="text-body text-label-secondary">{unit}</span>
          )}
          {tone === "success" && (
            <Icon icon={CircleCheck} className="text-status-normal-fg" />
          )}
        </div>
      )}
    </FieldShell>
  );
}
