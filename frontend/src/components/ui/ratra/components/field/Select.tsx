import { useId, type ComponentProps, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/Icon";
import { FieldShell } from "./FieldShell";
import { fieldBox, fieldInput } from "./field-styles";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<
  ComponentProps<"select">,
  "children"
> {
  label: string;
  options: readonly SelectOption[];
  hideLabel?: boolean;
  hint?: ReactNode;
  error?: ReactNode;
  optional?: boolean;
  inline?: boolean;
}

function Options({ options }: { options: readonly SelectOption[] }) {
  return options.map((o) => (
    <option key={o.value} value={o.value} disabled={o.disabled}>
      {o.label}
    </option>
  ));
}

export function Select({
  id,
  label,
  options,
  hideLabel,
  hint,
  error,
  optional,
  inline = false,
  disabled,
  className,
  ...rest
}: SelectProps) {
  const autoId = useId();
  const inlineId = id ?? autoId;
  if (inline) {
    return (
      <div className={cn("flex flex-1 items-center gap-3", className)}>
        <label htmlFor={inlineId} className="flex-1 text-body">
          {label}
        </label>
        <span className="relative inline-flex items-center">
          <select
            id={inlineId}
            disabled={disabled}
            className="cursor-pointer appearance-none rounded-xs bg-transparent pr-5 text-right text-body text-label-secondary disabled:cursor-not-allowed"
            {...rest}
          >
            <Options options={options} />
          </select>
          <Icon
            icon={ChevronDown}
            size={16}
            className="pointer-events-none absolute right-0 text-label-tertiary"
          />
        </span>
      </div>
    );
  }
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
        <div className={cn(fieldBox(tone, disabled), "relative h-12")}>
          <select
            id={id}
            aria-describedby={describedBy}
            aria-invalid={error ? true : undefined}
            disabled={disabled}
            className={cn(
              fieldInput,
              "h-full cursor-pointer appearance-none pr-7",
            )}
            {...rest}
          >
            <Options options={options} />
          </select>
          <Icon
            icon={ChevronDown}
            className="pointer-events-none absolute right-4 text-label-tertiary"
          />
        </div>
      )}
    </FieldShell>
  );
}
