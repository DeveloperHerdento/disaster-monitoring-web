import type { ComponentProps } from "react";
import { Search } from "lucide-react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/Icon";
import { FieldShell } from "./FieldShell";
import { fieldBox, fieldInput } from "./field-styles";

export interface SearchFieldProps extends Omit<
  ComponentProps<"input">,
  "type"
> {
  label: string;
  hideLabel?: boolean;
  dense?: boolean;
  floating?: boolean;
}

export function SearchField({
  id,
  label,
  hideLabel,
  dense = false,
  floating = false,
  disabled,
  className,
  ...rest
}: SearchFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      hideLabel={hideLabel}
      className={className}
    >
      {({ id }) => (
        <div
          className={cn(
            fieldBox(undefined, disabled, floating),
            dense ? "h-11 rounded-full" : "h-12 rounded-full",
          )}
        >
          <Icon icon={Search} className="text-label-tertiary" />
          <input
            id={id}
            type="search"
            disabled={disabled}
            className={cn(fieldInput, dense && "text-callout")}
            {...rest}
          />
        </div>
      )}
    </FieldShell>
  );
}
