import { useId, type ComponentProps, type ReactNode } from "react";
import { Check } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { cn } from "../../lib/cn";
import { ChoiceLabel } from "./ChoiceLabel";

export interface CheckboxProps extends Omit<
  ComponentProps<typeof CheckboxPrimitive.Root>,
  "children"
> {
  label: string;
  description?: ReactNode;
  hideLabel?: boolean;
}

export function Checkbox({
  label,
  description,
  hideLabel = false,
  id,
  disabled,
  className,
  ...rest
}: CheckboxProps) {
  const autoId = useId();
  const boxId = id ?? autoId;
  const control = (
    <CheckboxPrimitive.Root
      id={boxId}
      aria-label={hideLabel ? label : undefined}
      disabled={disabled}
      className={cn(
        "grid size-6 shrink-0 cursor-pointer place-items-center rounded-full inset-ring-[1.5px] inset-ring-label/25 transition-colors duration-150",
        "data-[state=checked]:bg-tint data-[state=checked]:inset-ring-0 disabled:cursor-not-allowed disabled:opacity-50",
        hideLabel && className,
      )}
      {...rest}
    >
      <CheckboxPrimitive.Indicator className="text-white">
        <Check size={14} strokeWidth={2.25} aria-hidden="true" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
  if (hideLabel) return control;
  return (
    <div className={cn("flex flex-1 items-center gap-3", className)}>
      <ChoiceLabel
        htmlFor={boxId}
        label={label}
        description={description}
        disabled={disabled}
      />
      {control}
    </div>
  );
}
